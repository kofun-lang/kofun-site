import { readFileSync } from "node:fs";
import path from "node:path";

type ClaimState = "implemented" | "checkpoint" | "design" | "open";

type ReleaseClaim = {
  id: string;
  public_status: string;
  public_wording: string;
  state: ClaimState;
};

type ClaimsManifest = {
  claims: ReleaseClaim[];
  manifest_version: number;
};

const languageRoot = path.join(process.cwd(), "kofun");
const version = readFileSync(path.join(languageRoot, "VERSION"), "utf8").trim();
const manifest = JSON.parse(
  readFileSync(path.join(languageRoot, "release", "claims.json"), "utf8"),
) as ClaimsManifest;

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
  throw new Error(`Invalid Kofun VERSION: ${JSON.stringify(version)}`);
}
if (manifest.manifest_version !== 1 || !Array.isArray(manifest.claims)) {
  throw new Error("Unsupported Kofun release claims manifest");
}

const claimsById = new Map(
  manifest.claims.map((claim) => [claim.id, Object.freeze(claim)]),
);

export function implementationClaim(id: string): Readonly<ReleaseClaim> {
  const claim = claimsById.get(id);
  if (!claim) throw new Error(`Kofun release claim not found: ${id}`);
  return claim;
}

function activeCheckpoint(label: string, claimId: string) {
  const claim = implementationClaim(claimId);
  if (claim.state === "open" || claim.state === "design") {
    throw new Error(
      `Homepage checkpoint ${claimId} is not active: ${claim.state}`,
    );
  }
  return Object.freeze({ label, claimId, status: claim.public_status });
}

export const kofunVersion = version;

// These labels stay compact enough for the landing-page signal strip. Their
// status comes from the language repository's release manifest, so advancing
// the submodule fails the site build if an advertised checkpoint disappears or
// becomes design-only.
export const homepageCheckpoints = Object.freeze([
  Object.freeze({
    label: version,
    claimId: "source-extension",
    status: "Current seed release; release claims define its capabilities.",
  }),
  activeCheckpoint("3-gen fixed point", "self-recompile"),
  activeCheckpoint("KIF v2", "compiled-visibility-interfaces"),
  activeCheckpoint("Int64 wasm32", "wasm32-arithmetic-core"),
  activeCheckpoint("C ABI", "c-abi-profile"),
]);

export const homepageCapabilityClaims = Object.freeze({
  ownership: implementationClaim("affine-resource-handle"),
  lists: implementationClaim("c11-list-int-values"),
  decimal: implementationClaim("decimal-arithmetic-v1"),
  native: implementationClaim("elf64-image-writer"),
  ownershipBoundary: implementationClaim("general-ownership-checking"),
  parserBoundary: implementationClaim("general-parser-type-checker"),
});
