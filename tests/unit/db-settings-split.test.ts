/**
 * Characterization test: settings.ts god-file decomposition.
 * Verifies that:
 *   1. toRecord in shared.ts has correct behavior (DB-free, pure function).
 *   2. The host settings.ts still re-exports the full public API surface.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── 1. shared.ts — toRecord ──────────────────────────────────────────────────

import { toRecord } from "../../src/lib/db/settings/shared.ts";

describe("toRecord", () => {
  it("returns the object as-is when given a plain object", () => {
    const obj = { a: 1, b: "two" };
    assert.deepStrictEqual(toRecord(obj), obj);
  });

  it("returns {} for null", () => {
    assert.deepStrictEqual(toRecord(null), {});
  });

  it("returns {} for undefined", () => {
    assert.deepStrictEqual(toRecord(undefined), {});
  });

  it("returns {} for a string", () => {
    assert.deepStrictEqual(toRecord("hello"), {});
  });

  it("returns {} for a number", () => {
    assert.deepStrictEqual(toRecord(42), {});
  });

  it("returns {} for an array (arrays are objects but toRecord returns the array cast)", () => {
    // toRecord casts arrays as JsonRecord — they ARE objects, so the cast succeeds.
    const arr = [1, 2, 3];
    assert.strictEqual(toRecord(arr), arr);
  });
});

// ── 2. settings.ts — public API surface ─────────────────────────────────────

const settingsModule = await import("../../src/lib/db/settings.ts");

describe("settings.ts public API surface", () => {
  const expectedFunctions = [
    // Settings core
    "getSettings",
    "updateSettings",
    "isCloudEnabled",
    // Proxy helpers (exported)
    "bumpProxyConfigGeneration",
    // Proxy config
    "getProxyConfig",
    "getProxyForLevel",
    "setProxyForLevel",
    "deleteProxyForLevel",
    "resolveProxyForConnection",
    "setProxyConfig",
    // Pricing (re-exported from ./settings/pricing)
    "getPricing",
    "getPricingWithSources",
    "getPricingForModel",
    "updatePricing",
    "resetPricing",
    "resetAllPricing",
    // LKGP (re-exported from ./settings/lkgp)
    "getLKGP",
    "setLKGP",
    "clearAllLKGP",
    // Cache metrics (re-exported from ./settings/cacheMetrics)
    "getCacheMetrics",
    "updateCacheMetrics",
    "getCacheTrend",
    "resetCacheMetrics",
  ] as const;

  for (const name of expectedFunctions) {
    it(`exports "${name}" as a function`, () => {
      assert.strictEqual(
        typeof (settingsModule as Record<string, unknown>)[name],
        "function",
        `Expected "${name}" to be exported as a function`
      );
    });
  }
});
