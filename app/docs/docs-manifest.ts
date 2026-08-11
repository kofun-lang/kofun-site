import statusSnapshot from "./status-snapshot.json" with { type: "json" };

// Language-reference documents are read from the checked-out submodule while
// site-owned guides are read from this repository. `source` always stays
// relative to the repository where the document is authored and reviewed.
// Callers must use `sourceFile` rather than resolving `source` directly.
export const KOFUN_ROOT = "kofun";

export type DocRepository = "language" | "site";

export type DocEntry = {
  slug: string;
  title: string;
  summary: string;
  source: string;
  repository?: DocRepository;
  section:
    | "Start here"
    | "Guides"
    | "Language"
    | "Compiler"
    | "Contribute"
    | "Project";
};

export function docRepository(
  entry: Pick<DocEntry, "repository">,
): DocRepository {
  return entry.repository ?? "language";
}

export function sourceFile(
  entry: Pick<DocEntry, "repository" | "source">,
): string {
  return docRepository(entry) === "site"
    ? entry.source
    : `${KOFUN_ROOT}/${entry.source}`;
}

export function sourceKey(repository: DocRepository, source: string): string {
  return `${repository}:${source}`;
}

export const snapshot = {
  commit: statusSnapshot.source_commit,
  shortCommit: statusSnapshot.source_commit.slice(0, 7),
  reviewed: statusSnapshot.reviewed_at.slice(0, 10),
  verification: statusSnapshot.verification,
  issues: statusSnapshot.issues,
};

export const docs: DocEntry[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    summary: "From a clean machine to a checked compiler run and local documentation site.",
    source: "docs/GETTING_STARTED.md",
    section: "Start here",
  },
  {
    slug: "repository-guide",
    title: "Repository guide",
    summary: "A task-oriented map of every top-level area, compiler path, test family, and generated boundary.",
    source: "docs/REPOSITORY_GUIDE.md",
    section: "Start here",
  },
  {
    slug: "implemented-status",
    title: "Implemented status",
    summary: "The concise capability matrix. Active claims require an executable gate.",
    source: "docs/MVP_IMPLEMENTED.md",
    section: "Start here",
  },
  {
    slug: "one-day-tutorial",
    title: "One-day tutorial",
    summary: "An eight-hour learning path, with current compiler boundaries called out explicitly.",
    source: "content/docs/ONE_DAY_TUTORIAL.md",
    repository: "site",
    section: "Guides",
  },
  {
    slug: "scientific-computing",
    title: "Scientific computing",
    summary: "Long-range array, numerical computing, interoperability, and tooling design.",
    source: "content/docs/SCIENTIFIC_COMPUTING.md",
    repository: "site",
    section: "Guides",
  },
  {
    slug: "language-vision",
    title: "Language vision",
    summary: "The intended audience, product direction, values, and explicit non-goals.",
    source: "content/docs/LANGUAGE_VISION.md",
    repository: "site",
    section: "Language",
  },
  {
    slug: "syntax",
    title: "Syntax guide",
    summary: "Current syntax direction and the boundary between accepted Core and planned language.",
    source: "docs/SYNTAX.md",
    section: "Language",
  },
  {
    slug: "type-system",
    title: "Type system",
    summary: "Static typing direction, generics, ownership interaction, and current limits.",
    source: "docs/TYPE_SYSTEM.md",
    section: "Language",
  },
  {
    slug: "decimal",
    title: "Decimal design",
    summary: "Exact base-10 representation, literals, rounding, fixed point, and law evidence.",
    source: "docs/DECIMAL.md",
    section: "Language",
  },
  {
    slug: "memory-model",
    title: "Memory model",
    summary: "The read/edit/take ownership model and the distinction between design and active checks.",
    source: "docs/MEMORY_MODEL.md",
    section: "Language",
  },
  {
    slug: "native-backends",
    title: "Native backends",
    summary: "Direct x86-64 and AArch64 ELF checkpoints, debug metadata, and bounded profiles.",
    source: "docs/NATIVE_BACKEND.md",
    section: "Compiler",
  },
  {
    slug: "compiler-architecture",
    title: "Compiler architecture",
    summary: "Bootstrap layers, frontend artifacts, backends, and the trust boundary.",
    source: "docs/COMPILER_ARCHITECTURE.md",
    section: "Compiler",
  },
  {
    slug: "developer-discovery",
    title: "Developer discovery",
    summary: "One compiler-backed contract for inferred types, callable operations, and safe explanations.",
    source: "docs/DEVELOPER_DISCOVERY.md",
    section: "Compiler",
  },
  {
    slug: "self-hosting",
    title: "Self-hosting",
    summary: "The frozen profile, three-generation semantic fixed point, diverse double compilation, and independent-reproduction boundary.",
    source: "bootstrap/selfhost/README.md",
    section: "Compiler",
  },
  {
    slug: "contributing",
    title: "Contributing",
    summary: "Change recipes, test selection, repository conventions, review expectations, and definition of done.",
    source: "docs/CONTRIBUTING.md",
    section: "Contribute",
  },
  {
    slug: "issue-readiness",
    title: "Issue readiness",
    summary: "What the ready label means: one bounded artifact, a stamped current-behavior measurement, checkable criteria, and a named gate.",
    source: "docs/ISSUE_READINESS.md",
    section: "Contribute",
  },
  {
    slug: "specification",
    title: "Specification",
    summary: "Normative contracts, roadmap documents, and executable conformance evidence.",
    source: "spec/README.md",
    section: "Project",
  },
  {
    slug: "roadmap",
    title: "Roadmap",
    summary: "Milestone outcomes and the evidence required to advance project status.",
    source: "docs/ROADMAP.md",
    section: "Project",
  },
  {
    slug: "security",
    title: "Security",
    summary: "Threat boundaries, unsupported production claims, and hardening work.",
    source: "docs/SECURITY.md",
    section: "Project",
  },
  {
    slug: "rfc-process",
    title: "RFC process",
    summary: "How public semantic decisions are proposed, reviewed, amended, and kept separate from whether anything was implemented.",
    source: "content/docs/RFC_PROCESS.md",
    repository: "site",
    section: "Project",
  },
  {
    slug: "release-evidence",
    title: "Release evidence",
    summary: "The machine-checked join between published capability claims and the gates, boundaries, and reproduction commands that bound them.",
    source: "content/docs/RELEASE_EVIDENCE.md",
    repository: "site",
    section: "Project",
  },
];

export const docBySlug = new Map(docs.map((entry) => [entry.slug, entry]));
export const docBySource = new Map(
  docs.map((entry) => [
    sourceKey(docRepository(entry), entry.source),
    entry,
  ]),
);
