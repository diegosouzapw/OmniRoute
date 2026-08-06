import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getCanonicalModelSpecId, getModelSpec } from "../../src/shared/constants/modelSpecs.ts";

describe("model spec lookup index (#8697-adjacent — getCanonicalModelSpecId)", () => {
  it("still resolves case-insensitive exact matches", () => {
    // Real MODEL_SPECS entries — exercised via a mixed-case id, forcing the
    // case-insensitive fallback the index covers.
    const canonical = getCanonicalModelSpecId("GPT-5.6");
    assert.ok(
      canonical,
      "expected a canonical id to resolve for a known model, case-insensitively"
    );
    assert.equal(getModelSpec("GPT-5.6"), getModelSpec(canonical!));
  });

  it("returns null for a genuinely unknown model id", () => {
    assert.equal(getCanonicalModelSpecId("definitely-not-a-real-model-xyz-123"), null);
  });

  it("does not rescan MODEL_SPECS per lookup (regression guard for O(n) scans)", () => {
    // Warm the lazy index outside the measured window.
    getCanonicalModelSpecId("gpt-5.6");

    const originalEntries = Object.entries;
    const originalKeys = Object.keys;
    let entriesCalls = 0;
    let keysCalls = 0;
    Object.entries = function patchedEntries(...args: Parameters<typeof Object.entries>) {
      entriesCalls++;
      return originalEntries.apply(this, args as never);
    } as typeof Object.entries;
    Object.keys = function patchedKeys(...args: Parameters<typeof Object.keys>) {
      keysCalls++;
      return originalKeys.apply(this, args as never);
    } as typeof Object.keys;

    try {
      for (let i = 0; i < 500; i++) {
        getCanonicalModelSpecId("gpt-5.6");
      }
    } finally {
      Object.entries = originalEntries;
      Object.keys = originalKeys;
    }

    // Pre-fix: every miss re-ran Object.keys()/Object.entries() up to 3x per call.
    // Indexed: the lazy index is built once and reused, so no further
    // Object.keys/entries calls should happen at all across 500 repeated lookups.
    assert.equal(entriesCalls, 0, `expected 0 Object.entries() calls, got ${entriesCalls}`);
    assert.equal(keysCalls, 0, `expected 0 Object.keys() calls, got ${keysCalls}`);
  });
});
