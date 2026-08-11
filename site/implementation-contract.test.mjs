import assert from "node:assert/strict";

import {
  homepageCapabilityClaims,
  homepageCheckpoints,
  implementationClaim,
  kofunVersion,
} from "../app/kofun-release.ts";

assert.match(kofunVersion, /^\d+\.\d+\.\d+-seed$/);
assert.equal(homepageCheckpoints[0].label, kofunVersion);
assert.deepEqual(
  homepageCheckpoints.map((checkpoint) => checkpoint.claimId),
  [
    "source-extension",
    "self-recompile",
    "compiled-visibility-interfaces",
    "wasm32-arithmetic-core",
    "c-abi-profile",
  ],
);
for (const checkpoint of homepageCheckpoints) {
  assert.notEqual(implementationClaim(checkpoint.claimId).state, "open");
  assert.notEqual(implementationClaim(checkpoint.claimId).state, "design");
}

assert.equal(homepageCapabilityClaims.ownershipBoundary.state, "open");
assert.equal(homepageCapabilityClaims.parserBoundary.state, "open");
assert.equal(homepageCapabilityClaims.ownership.state, "checkpoint");
assert.equal(homepageCapabilityClaims.lists.state, "checkpoint");
assert.equal(homepageCapabilityClaims.decimal.state, "checkpoint");
assert.equal(homepageCapabilityClaims.native.state, "checkpoint");

console.log(
  `PASS: homepage follows Kofun ${kofunVersion} and ` +
    `${homepageCheckpoints.length} active release claims`,
);
