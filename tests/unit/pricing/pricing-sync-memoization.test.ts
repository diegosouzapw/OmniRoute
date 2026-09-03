import assert from "node:assert/strict";
import { describe, it, before, after, mock } from "node:test";
import { getDbInstance } from "../../../src/lib/db/core.ts";
import {
  getSyncedPricing,
  saveSyncedPricing,
  clearSyncedPricing,
} from "../../../src/lib/pricingSync.ts";

describe("getSyncedPricing memoization", () => {
  before(() => {
    saveSyncedPricing({
      openai: {
        "gpt-4o": { input: 2.5, output: 10 },
      },
    });
  });

  after(() => {
    try {
      clearSyncedPricing();
    } catch {
      // ignore
    }
  });

  it("returns the same object reference for repeated reads within the same cache version", () => {
    const first = getSyncedPricing();
    const second = getSyncedPricing();
    const third = getSyncedPricing();
    // The saturation bug rebuilt a fresh object on every call; resolveCatalogPricing()
    // calls this per model, so a fresh object per call re-ran the SELECT + JSON.parse
    // and rebuilt the findInsensitive() lowercase index per lookup (~400 warnings/s).
    assert.equal(second, first);
    assert.equal(third, first);
  });

  it("hits the DB once for repeated reads within the same cache version", () => {
    const db = getDbInstance();
    const prepareSpy = mock.method(db, "prepare");
    const callsBefore = prepareSpy.mock.calls.length;

    getSyncedPricing();
    getSyncedPricing();
    getSyncedPricing();

    const callsAfter = prepareSpy.mock.calls.length;
    prepareSpy.mock.restore();

    // Memoized, 3 calls should cost at most 1 real DB round-trip (0 if a prior
    // test already warmed the cache at the same version).
    assert.ok(
      callsAfter - callsBefore <= 1,
      `expected at most 1 db.prepare() call across 3 reads, got ${callsAfter - callsBefore}`
    );
  });

  it("returns a new reference with fresh data after a pricing write invalidates the cache", () => {
    const warm = getSyncedPricing(); // warm the memo at the current cache version
    saveSyncedPricing({
      anthropic: { "claude-x": { input: 1, output: 2 } },
    });
    const pricing = getSyncedPricing();
    assert.notEqual(pricing, warm, "invalidation must rebuild, not reuse the stale object");
    assert.ok(pricing.anthropic, "cache should reflect the write, not a stale snapshot");
    assert.equal(pricing.anthropic["claude-x"].input, 1);
  });
});
