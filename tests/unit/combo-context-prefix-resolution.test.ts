// tests/unit/combo-context-prefix-resolution.test.ts
// Regression guard for computeComboContextLength()'s provider-prefix bug.
//
// resolveNestedComboTargets() returns target.modelStr in "provider/model" form
// (e.g. "glm/glm-5.2"), but computeComboContextLength() used to pass that
// qualified string straight into getCanonicalModelMetadata() without stripping
// the prefix first — unlike the catalog's own getComboTargetCatalogMetadata(),
// which strips it via getComboTargetModelId()/getProviderPrefixes() before the
// lookup. The alias-resolution chain (getResolvedModelCapabilities ->
// resolveCanonicalProviderModel -> resolveProviderModelAlias) does an exact-match
// lookup keyed by the BARE registry id, so a "provider/model" string only
// resolved for the handful of models with a curated MODEL_SPECS alias in that
// exact qualified form — every other registry-only model (the vast majority)
// silently fell out of the min() computation, and computed_context_length was
// dropped from the /api/combos response entirely.
//
// This test uses glm-5.2 (open-sse/config/providers/registry/glm — real
// 1,000,000-token context, no "glm/glm-5.2"-form curated alias) — the exact
// class of model the bug affected. Confirmed empirically before this fix
// landed: computeComboContextLength() returned `undefined` for a combo whose
// only member was "glm/glm-5.2", even though the bare "glm-5.2" resolves fine
// via getCanonicalModelMetadata() directly.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-combo-context-prefix-resolution-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { computeComboContextLength } = await import("../../src/lib/combos/comboContext.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("computeComboContextLength resolves a registry-known, prefixed member (glm/glm-5.2) to its real context window", () => {
  const combo = {
    name: "prefix-resolution-probe-single",
    models: ["glm/glm-5.2"],
  };

  const result = computeComboContextLength(combo, []);

  assert.equal(
    result,
    1000000,
    "glm/glm-5.2 is a real registry model with a 1,000,000-token context window " +
      "(open-sse/config/providers/registry/glm) — the prefix must be stripped " +
      "before the canonical-model lookup so it is not silently excluded"
  );
});

test("computeComboContextLength takes the minimum across multiple prefixed, registry-known members", () => {
  const combo = {
    name: "prefix-resolution-probe-multi",
    // glm-4.5 (128,000) is the smaller of the two known windows.
    models: ["glm/glm-5.2", "glm/glm-4.5"],
  };

  const result = computeComboContextLength(combo, []);

  assert.equal(
    result,
    128000,
    "the minimum across all resolved (prefix-stripped) members should win, " +
      "matching the catalog's minKnownNumber semantics"
  );
});
