/**
 * Regression test for #9300 — getModelsDevPricing() called N times per catalog
 * build with no caching, causing ~3 GB native memory growth per build.
 *
 * Verifies that the in-memory cache returns the same object reference on
 * subsequent calls (proving SQLite is not hit again), and that the cache
 * is invalidated on save/clear.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pricing-cache-"));
process.env.DATA_DIR = testDataDir;

const modulePath = path.join(process.cwd(), "src/lib/modelsDevSync.ts");

async function importFresh(label: string) {
  const mod = await import(
    `${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}-${Math.random()}`
  );
  return mod;
}

const PRICING_DATA = {
  openai: {
    "gpt-4o": { input: 2.5, output: 10, cached: 1.25 },
  },
  anthropic: {
    "claude-sonnet-4-20250514": { input: 3, output: 15, cached: 0.3 },
  },
  google: {
    "gemini-2.5-pro": { input: 1.25, output: 5, cached: 0.1 },
  },
};

describe("getModelsDevPricing caching (#9300)", () => {
  let modelsDev: typeof import("../../src/lib/modelsDevSync.ts");
  let dbCore: typeof import("../../src/lib/db/core.ts");

  before(async () => {
    dbCore = await import("../../src/lib/db/core.ts");
    modelsDev = await importFresh("9300-cache");

    // Seed pricing data into DB
    modelsDev.saveModelsDevPricing(
      PRICING_DATA as Record<string, Record<string, Record<string, number>>>
    );

    // Reset cache to ensure a clean read from DB
    // (saveModelsDevPricing clears the cache, so next get will load from DB)
  });

  after(() => {
    // Clean up DB handles
    dbCore.resetDbInstance();
    try {
      fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // ignore
    }
  });

  it("returns correct pricing data from DB on first call", () => {
    const result = modelsDev.getModelsDevPricing();
    assert.ok(result.openai, "openai provider should be present");
    assert.equal(result.openai["gpt-4o"].input, 2.5);
    assert.equal(result.openai["gpt-4o"].output, 10);
    assert.equal(result.anthropic["claude-sonnet-4-20250514"].input, 3);
    assert.equal(result.google["gemini-2.5-pro"].input, 1.25);
  });

  it("returns the same object reference on second call (cache hit, no SQLite re-query)", () => {
    const first = modelsDev.getModelsDevPricing();
    const second = modelsDev.getModelsDevPricing();
    // Same object reference proves the cache returned the stored object
    // instead of re-loading from SQLite and building a new object.
    assert.strictEqual(first, second, "should return cached object reference");
  });

  it("returns the same object reference on third call (cache still valid)", () => {
    const first = modelsDev.getModelsDevPricing();
    const third = modelsDev.getModelsDevPricing();
    assert.strictEqual(first, third, "should return cached object reference on third call");
  });

  it("invalidates cache after saveModelsDevPricing", () => {
    const beforeSave = modelsDev.getModelsDevPricing();

    // Save updated pricing
    modelsDev.saveModelsDevPricing({
      openai: { "gpt-4o": { input: 5, output: 20 } },
    } as Record<string, Record<string, Record<string, number>>>);

    const afterSave = modelsDev.getModelsDevPricing();
    // Must be a different object (cache was invalidated, re-loaded from DB)
    assert.notStrictEqual(beforeSave, afterSave, "cache should be invalidated after save");
    // And the new data must be correct
    assert.equal(afterSave.openai["gpt-4o"].input, 5);
    assert.equal(afterSave.openai["gpt-4o"].output, 20);
  });

  it("invalidates cache after clearModelsDevPricing", () => {
    modelsDev.getModelsDevPricing(); // warm cache
    modelsDev.clearModelsDevPricing();

    const afterClear = modelsDev.getModelsDevPricing();
    // After clear, pricing should be empty
    assert.deepEqual(afterClear, {}, "pricing should be empty after clear");
  });
});
