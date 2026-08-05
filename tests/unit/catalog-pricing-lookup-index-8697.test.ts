import assert from "node:assert/strict";
import { describe, it, before, after } from "node:test";
import { enrichCatalogModelEntry } from "../../src/lib/modelMetadataRegistry.ts";
import {
  saveModelsDevPricing,
  clearModelsDevPricing,
  type PricingByProvider,
} from "../../src/lib/modelsDevSync.ts";

const PROVIDER_COUNT = 180;
const MODELS_PER_PROVIDER = 34;
const ITERATIONS = 500;

describe("catalog pricing lookup index (#8697 second bottleneck — findInsensitive)", () => {
  before(() => {
    // Mixed-case keys force the case-insensitive fallback scan in
    // findInsensitive() — mirrors real models.dev data where provider/model
    // casing does not always match the catalog's, and a large provider count
    // mirrors the ~180 synced providers from the #8697 profiling run.
    const pricing: PricingByProvider = {};
    for (let p = 0; p < PROVIDER_COUNT; p++) {
      const providerKey = `Provider${p}`;
      pricing[providerKey] = {};
      for (let m = 0; m < MODELS_PER_PROVIDER; m++) {
        pricing[providerKey][`Model${m}`] = { input: p + m * 0.01, output: p + m * 0.02 };
      }
    }
    pricing.Openai = { "Gpt-4o": { input: 2.5, output: 10 } };
    saveModelsDevPricing(pricing);
  });

  after(() => {
    try {
      clearModelsDevPricing();
    } catch {
      // ignore
    }
  });

  it("resolves case-insensitive pricing correctly for every provider/model pair", () => {
    const entry = enrichCatalogModelEntry({
      id: "provider42/model7",
      owned_by: "provider42",
      root: "model7",
    });
    assert.ok(entry.pricing, "pricing should resolve via case-insensitive lookup");
    assert.equal((entry.pricing as { input: number }).input, 42.07);
  });

  it("does not rescan the pricing tables per lookup (regression guard for O(providers*models) scans)", () => {
    // `provider`/`gpt-4o` always resolve through the same fast metadata path
    // (real registered provider) so both scenarios below pay an identical
    // getCanonicalModelMetadata cost — isolating the delta to pricing
    // resolution alone, independent of unrelated catalog-metadata overhead.
    const entryWithPricingPreset = () =>
      enrichCatalogModelEntry({
        id: "openai/gpt-4o",
        owned_by: "openai",
        root: "gpt-4o",
        pricing: { input: 1, output: 1 }, // nextEntry.pricing != null → resolveCatalogPricing() never runs
      });
    const entryNeedingPricingResolution = () =>
      enrichCatalogModelEntry({
        id: "openai/gpt-4o",
        owned_by: "openai",
        root: "gpt-4o",
      });

    // Warm up (index build, module init) outside the measured window.
    entryWithPricingPreset();
    entryNeedingPricingResolution();

    const originalEntries = Object.entries;
    let calls = 0;
    Object.entries = function patchedEntries(...args: Parameters<typeof Object.entries>) {
      calls++;
      return originalEntries.apply(this, args as never);
    } as typeof Object.entries;

    let baselineCalls: number;
    let withPricingCalls: number;
    try {
      calls = 0;
      for (let i = 0; i < ITERATIONS; i++) entryWithPricingPreset();
      baselineCalls = calls;

      calls = 0;
      for (let i = 0; i < ITERATIONS; i++) entryNeedingPricingResolution();
      withPricingCalls = calls;
    } finally {
      Object.entries = originalEntries;
    }

    const delta = withPricingCalls - baselineCalls;
    // Pre-fix: findInsensitive() called Object.entries() on every miss, twice per
    // lookup (provider scan + model scan) → delta ≈ 2 * ITERATIONS. Indexed O(1)
    // lookup: the index is built once per distinct object and reused, so delta
    // stays a small constant regardless of ITERATIONS.
    assert.ok(
      delta < ITERATIONS,
      `expected Object.entries() call delta to stay constant (not scale with ${ITERATIONS} ` +
        `iterations), got delta=${delta} — findInsensitive() may have regressed to a linear scan per lookup`
    );
  });
});
