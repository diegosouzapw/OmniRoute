import assert from "node:assert/strict";
import { describe, it, before, after, mock } from "node:test";
import { getDbInstance } from "../../src/lib/db/core.ts";
import {
  getModelsDevPricing,
  saveModelsDevPricing,
  clearModelsDevPricing,
  type PricingByProvider,
} from "../../src/lib/modelsDevSync.ts";

describe("getModelsDevPricing memoization (#8697)", () => {
  before(() => {
    const pricing: PricingByProvider = {
      openai: {
        "gpt-4o": { input: 2.5, output: 10 },
      },
    };
    saveModelsDevPricing(pricing);
  });

  after(() => {
    try {
      clearModelsDevPricing();
    } catch {
      // ignore
    }
  });

  it("hits the DB once for repeated reads within the same cache version", () => {
    const db = getDbInstance();
    const prepareSpy = mock.method(db, "prepare");
    const callsBefore = prepareSpy.mock.calls.length;

    getModelsDevPricing();
    getModelsDevPricing();
    getModelsDevPricing();

    const callsAfter = prepareSpy.mock.calls.length;
    prepareSpy.mock.restore();

    // The N+1 bug re-runs the SELECT + JSON.parse on every call — memoized,
    // 3 calls should cost at most 1 real DB round-trip (0 if a prior test
    // already warmed the cache at the same version).
    assert.ok(
      callsAfter - callsBefore <= 1,
      `expected at most 1 db.prepare() call across 3 reads, got ${callsAfter - callsBefore}`
    );
  });

  it("returns fresh data after a write invalidates the cache", () => {
    getModelsDevPricing(); // warm the cache
    saveModelsDevPricing({
      anthropic: { "claude-x": { input: 1, output: 2 } },
    });
    const pricing = getModelsDevPricing();
    assert.ok(pricing.anthropic, "cache should reflect the write, not a stale snapshot");
    assert.equal(pricing.anthropic["claude-x"].input, 1);
  });
});
