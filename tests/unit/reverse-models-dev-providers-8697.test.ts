import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";
import { MODELS_DEV_PROVIDER_MAP } from "../../src/lib/modelsDevSync/transform.ts";

describe("reverseModelsDevProviders memoization (#8697-adjacent)", () => {
  it("stays correct across repeated calls for the same provider", () => {
    // codex/claude only list their alias (cx/cc) in MODELS_DEV_PROVIDER_MAP — exercises
    // the reverse-lookup fallback this function builds (#8429).
    const first = getResolvedModelCapabilities({ provider: "codex", model: "gpt-5.6" });
    const second = getResolvedModelCapabilities({ provider: "codex", model: "gpt-5.6" });
    assert.deepEqual(first, second, "memoized reverse-provider lookup must not change results");
  });

  it("does not rescan MODELS_DEV_PROVIDER_MAP per call (regression guard for O(n) scans)", () => {
    // Warm up outside the measured window.
    getResolvedModelCapabilities({ provider: "codex", model: "gpt-5.6" });

    // getResolvedModelCapabilities' wider call chain legitimately calls Object.entries()
    // on unrelated objects (e.g. once per call, elsewhere in the chain) — count only calls
    // targeting MODELS_DEV_PROVIDER_MAP specifically, the object reverseModelsDevProviders()
    // scans, to isolate this fix's contribution precisely.
    const originalEntries = Object.entries;
    let mapScans = 0;
    Object.entries = function patchedEntries(...args: Parameters<typeof Object.entries>) {
      if (args[0] === MODELS_DEV_PROVIDER_MAP) mapScans++;
      return originalEntries.apply(this, args as never);
    } as typeof Object.entries;

    try {
      for (let i = 0; i < 300; i++) {
        getResolvedModelCapabilities({ provider: "codex", model: "gpt-5.6" });
      }
    } finally {
      Object.entries = originalEntries;
    }

    // Pre-fix: reverseModelsDevProviders() rescanned Object.entries(MODELS_DEV_PROVIDER_MAP)
    // on every call → mapScans would be ~300. Memoized by provider key: 0 scans once the
    // "codex" entry is cached (the warm-up call above already populated it).
    assert.equal(
      mapScans,
      0,
      `expected 0 Object.entries(MODELS_DEV_PROVIDER_MAP) scans across 300 repeated calls, got ${mapScans}`
    );
  });
});
