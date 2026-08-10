import { readFile } from "node:fs/promises";
import { posix } from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import DocsNav from "../docs-nav";
import {
  docBySlug,
  docBySource,
  docRepository,
  docs,
  sourceFile,
  sourceKey,
  type DocEntry,
  type DocRepository,
} from "../docs-manifest";

const repositories: Record<
  DocRepository,
  { blob: string; raw: string; tree: string; label: string }
> = {
  language: {
    blob: "https://github.com/kofun-lang/kofun/blob/main",
    raw: "https://raw.githubusercontent.com/kofun-lang/kofun/main",
    tree: "https://github.com/kofun-lang/kofun/tree/main",
    label: "kofun source",
  },
  site: {
    blob: "https://github.com/kofun-lang/kofun-site/blob/main",
    raw: "https://raw.githubusercontent.com/kofun-lang/kofun-site/main",
    tree: "https://github.com/kofun-lang/kofun-site/tree/main",
    label: "kofun-site source",
  },
};
const siteBasePath = process.env.KOFUN_BASE_PATH ?? "";

export const dynamicParams = false;

export function generateStaticParams() {
  return docs.map((entry) => ({ slug: entry.slug }));
}

function rewriteHref(href: string | undefined, entry: DocEntry) {
  if (!href || /^(?:[a-z]+:|#)/i.test(href)) return href;

  const repository = docRepository(entry);
  const github = repositories[repository];
  const [rawPath, fragment] = href.split("#", 2);
  const resolved = posix.normalize(
    posix.join(posix.dirname(entry.source), decodeURIComponent(rawPath)),
  );
  const localDoc = docBySource.get(sourceKey(repository, resolved));
  const suffix = fragment ? `#${fragment}` : "";

  if (localDoc) {
    return `${siteBasePath}/docs/${localDoc.slug}/${suffix}`;
  }
  if (rawPath.endsWith("/")) {
    return `${github.tree}/${resolved.replace(/\/$/, "")}${suffix}`;
  }
  return `${github.blob}/${resolved}${suffix}`;
}

function rewriteImageSrc(src: string | undefined, entry: DocEntry) {
  if (!src || /^(?:[a-z]+:|data:)/i.test(src)) return src;

  const github = repositories[docRepository(entry)];
  const resolved = posix.normalize(
    posix.join(posix.dirname(entry.source), decodeURIComponent(src)),
  );
  if (resolved.startsWith("public/")) {
    return `${siteBasePath}/${resolved.slice("public/".length)}`;
  }
  return `${github.raw}/${resolved}`;
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = docBySlug.get(slug);
  if (!entry) notFound();
  const entryIndex = docs.findIndex((candidate) => candidate.slug === slug);
  const previous = entryIndex > 0 ? docs[entryIndex - 1] : undefined;
  const next = entryIndex < docs.length - 1 ? docs[entryIndex + 1] : undefined;
  const repository = repositories[docRepository(entry)];

  const markdown = await readFile(
    posix.join(process.cwd(), sourceFile(entry)),
    "utf8",
  );

  return (
    <main className="docs-layout" id="main-content">
      <DocsNav active={entry.slug} />
      <div className="docs-main">
        <header className="docs-topbar">
          <Link href="/docs">← Documentation</Link>
          <div>
            <Link href="/">Project home</Link>
            <a href={`${repository.blob}/${entry.source}`}>Edit source</a>
          </div>
        </header>

        <article className="markdown-document">
          <div className="markdown-document-meta">
            <span>{entry.section} · {repository.label}</span>
            <h1>{entry.title}</h1>
            <p>{entry.summary}</p>
            <a href={`${repository.blob}/${entry.source}`}>{entry.source}</a>
          </div>

          <div className="markdown-body">
            <ReactMarkdown
              rehypePlugins={[
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
              ]}
              remarkPlugins={[remarkGfm]}
              components={{
                a({ href, ...props }) {
                  return (
                    <a
                      href={rewriteHref(href, entry)}
                      {...props}
                    />
                  );
                },
                img({ src, ...props }) {
                  return (
                    <img
                      src={
                        typeof src === "string"
                          ? rewriteImageSrc(src, entry)
                          : undefined
                      }
                      {...props}
                    />
                  );
                },
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>

          <nav className="docs-pagination" aria-label="Adjacent guides">
            {previous ? (
              <Link className="previous" href={`/docs/${previous.slug}`}>
                <span>← Previous</span>
                <strong>{previous.title}</strong>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <Link className="next" href={`/docs/${next.slug}`}>
                <span>Next →</span>
                <strong>{next.title}</strong>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </nav>
        </article>
      </div>
    </main>
  );
}
