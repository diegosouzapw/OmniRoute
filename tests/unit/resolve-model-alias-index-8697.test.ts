import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveModelAlias } from "../../src/shared/constants/modelSpecs.ts";

describe("resolveModelAlias lookup index (#8697-adjacent)", () => {
  it("still resolves a known exact alias", () => {
    // Real MODEL_SPECS alias, case-sensitive exact match.
    assert.equal(resolveModelAlias("openai/gpt-5.6"), "gpt-5.6");
  });

  it("does not match a case-varied alias (case-sensitive semantics preserved)", () => {
    // resolveModelAlias uses Array.includes(), never .toLowerCase() — a case-varied
    // input must NOT resolve, unlike the case-insensitive getCanonicalModelSpecId().
    assert.equal(resolveModelAlias("OpenAI/GPT-5.6"), "OpenAI/GPT-5.6");
  });

  it("returns the input unchanged for an unknown alias", () => {
    assert.equal(
      resolveModelAlias("definitely-not-a-real-alias-xyz"),
      "definitely-not-a-real-alias-xyz"
    );
  });

  it("does not rescan MODEL_SPECS per call (regression guard for O(n) scans)", () => {
    // Warm up outside the measured window.
    resolveModelAlias("openai/gpt-5.6");

    const originalEntries = Object.entries;
    let calls = 0;
    Object.entries = function patchedEntries(...args: Parameters<typeof Object.entries>) {
      calls++;
      return originalEntries.apply(this, args as never);
    } as typeof Object.entries;

    try {
      for (let i = 0; i < 500; i++) {
        resolveModelAlias("openai/gpt-5.6");
      }
    } finally {
      Object.entries = originalEntries;
    }

    // Pre-fix: every call re-ran Object.entries(MODEL_SPECS). Indexed: the lazy
    // index is built once and reused, so no further Object.entries calls happen.
    assert.equal(
      calls,
      0,
      `expected 0 Object.entries() calls across 500 repeated lookups, got ${calls}`
    );
  });
});
