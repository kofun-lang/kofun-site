import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  PLAYGROUND_EXAMPLES,
  runKofun,
} from "../app/kofun-runtime.ts";
import { tokenizeKofunForHighlight } from "../app/kofun-highlight.ts";

const expectedOutput = new Map([
  ["lists", "4\n13"],
  ["branches", "good"],
  ["numbers", "-4\n1"],
  ["text", "Hello, Kofun"],
]);

const temporaryDirectory = await mkdtemp(path.join(tmpdir(), "kofun-site-playground-"));
try {
  for (const example of PLAYGROUND_EXAMPLES) {
    const expected = expectedOutput.get(example.id);
    const result = runKofun(example.source);
    assert.equal(result.error, undefined, `${example.id}: ${result.error?.message}`);
    assert.equal(result.output, expected, example.id);
    assert.ok(result.tokenCount > 0, `${example.id}: token count`);
    assert.ok(result.steps > 0, `${example.id}: step count`);

    const sourcePath = path.join(temporaryDirectory, `${example.id}.kofun`);
    await writeFile(sourcePath, `${example.source}\n`);
    const cli = spawnSync(
      fileURLToPath(new URL("../kofun/bin/kofun", import.meta.url)),
      ["run", sourcePath],
      {
        cwd: fileURLToPath(new URL("../kofun/", import.meta.url)),
        encoding: "utf8",
        timeout: 30_000,
      },
    );
    assert.equal(
      cli.status,
      0,
      `${example.id}: repository CLI failed\n${cli.stderr}`,
    );
    assert.equal(cli.stdout.trimEnd(), expected, `${example.id}: CLI output`);
  }
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}

const mutable = runKofun(`fn main() {
    let mut answer = 40
    answer = answer + 2
    print(answer)
}`);
assert.equal(mutable.error, undefined);
assert.equal(mutable.output, "42");

const unicode = runKofun(`fn main() {
    let world = "古墳🌍"
    print(world[2])
    print(len(world))
}`);
assert.equal(unicode.error, undefined);
assert.equal(unicode.output, "🌍\n3");

const immutable = runKofun(`fn main() {
    let answer = 40
    answer = 42
}`);
assert.equal(immutable.error?.code, "R002");
assert.equal(immutable.error?.line, 3);

const syntax = runKofun(`fn main() {
    print("unterminated)
}`);
assert.equal(syntax.error?.code, "P001");
assert.equal(syntax.error?.line, 2);

const bounded = runKofun(`fn main() {
    print(len(0 .. 10001))
}`);
assert.equal(bounded.error?.code, "R008");

const highlightedSource = `fn total(values: List[Int]) -> Int {
    # Keep syntax coloring lossless while a program is incomplete.
    let answer = values |> sum() + 12.5
    return answer != 0
}`;
const highlightTokens = tokenizeKofunForHighlight(highlightedSource);
assert.equal(
  highlightTokens.map((token) => token.value).join(""),
  highlightedSource,
  "syntax highlighting must preserve every source byte",
);
for (const kind of [
  "keyword",
  "function",
  "type",
  "comment",
  "operator",
  "number",
]) {
  assert.ok(
    highlightTokens.some((token) => token.kind === kind),
    `syntax highlighting should classify ${kind}`,
  );
}
assert.ok(
  tokenizeKofunForHighlight('let draft = "unfinished').some(
    (token) => token.kind === "string" && token.value === '"unfinished',
  ),
  "highlighting incomplete edits must remain tolerant",
);

console.log(
  `PASS: ${PLAYGROUND_EXAMPLES.length} examples, browser runtime diagnostics, and syntax highlighting`,
);
