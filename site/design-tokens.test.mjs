import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const fontSizeRules = css
  .split("\n")
  .map((line, index) => ({ line: line.trim(), number: index + 1 }))
  .filter(({ line }) => line.startsWith("font-size:"));
const rawFontSizeRules = fontSizeRules.filter(
  ({ line }) => !line.startsWith("font-size: var(--font-size-"),
);

assert.ok(fontSizeRules.length > 0, "expected typography rules to be present");
assert.deepEqual(
  rawFontSizeRules,
  [],
  `font-size declarations must use the shared type scale:\n${rawFontSizeRules
    .map(({ line, number }) => `  ${number}: ${line}`)
    .join("\n")}`,
);

for (const token of [
  "--font-size-micro",
  "--font-size-caption",
  "--font-size-ui",
  "--font-size-small",
  "--font-size-body",
  "--font-size-lead",
  "--font-size-title",
  "--font-size-subheading",
  "--font-size-hero",
  "--font-size-section",
  "--font-size-doc-hero",
  "--font-size-doc-title",
]) {
  assert.match(css, new RegExp(`${token}:`), `missing design token ${token}`);
}

// The scale is defined once, in :root, and nowhere else.
//
// This is the check that was missing. Every font-size already went through a
// token, so the gate reported a unified type system — while four media queries
// quietly redefined the tokens themselves, one of them pushing the docs
// heading back up to 4rem on exactly the narrow screens least able to take it.
// A token that can be reassigned per breakpoint is a token in name only.
const rootEnd = css.indexOf("}");
const outsideRoot = css.slice(rootEnd);
const reassigned = outsideRoot
  .split("\n")
  .map((line, index) => ({ line: line.trim(), number: index + 1 }))
  .filter(({ line }) => /^--font-size-[a-z-]+\s*:/.test(line));

assert.deepEqual(
  reassigned,
  [],
  `--font-size tokens may only be defined in :root; clamp() is how a size adapts to the viewport:\n${reassigned
    .map(({ line }) => `  ${line}`)
    .join("\n")}`,
);

// A ceiling, in rem, on everything the scale can produce.
//
// Documentation is read, not looked at. The scale ran to 7rem — 112px — which
// is a poster size: it fills a viewport before it has said anything, and it
// forced the tracking to -0.075em to fit, which then jammed the letters
// together at every other size. 2.5rem is the largest heading this site needs.
const CEILING_REM = 2.5;
const declarations = [...css.matchAll(/--font-size-([a-z-]+):\s*([^;]+);/g)];
const sizes = declarations.flatMap(([, name, value]) => {
  // Take the largest number in the declaration, so clamp() is judged by its
  // upper bound rather than by the value it usually renders at.
  const rems = [...value.matchAll(/([\d.]+)rem/g)].map(([, n]) => Number(n));
  return rems.length ? [{ name, largest: Math.max(...rems) }] : [];
});

assert.ok(sizes.length > 0, "expected the type scale to declare rem sizes");

const oversized = sizes.filter(({ largest }) => largest > CEILING_REM);
assert.deepEqual(
  oversized,
  [],
  `no type token may exceed ${CEILING_REM}rem:\n${oversized
    .map(({ name, largest }) => `  --font-size-${name} reaches ${largest}rem`)
    .join("\n")}`,
);

// And a floor. Below about 12px a label stops being small and starts being
// unreadable, and this site used its smallest token for real content — status
// rows, table captions, navigation — not for decoration.
const FLOOR_REM = 0.8125;
const undersized = sizes.filter(
  ({ name, largest }) => name !== "code-inline" && largest < FLOOR_REM,
);
assert.deepEqual(
  undersized,
  [],
  `no type token may fall below ${FLOOR_REM}rem:\n${undersized
    .map(({ name, largest }) => `  --font-size-${name} is ${largest}rem`)
    .join("\n")}`,
);

console.log(
  `design token checks passed (${sizes.length} sizes, ${FLOOR_REM}–${CEILING_REM}rem, defined only in :root)`,
);
