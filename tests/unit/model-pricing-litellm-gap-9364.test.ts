import assert from "node:assert/strict";
import { describe, it, before, after } from "node:test";
import { enrichCatalogModelEntry } from "../../src/lib/modelMetadataRegistry.ts";
import {
  saveModelsDevPricing,
  clearModelsDevPricing,
  type PricingByProvider as ModelsDevPricingByProvider,
} from "../../src/lib/modelsDevSync.ts";
import {
  saveSyncedPricing,
  clearSyncedPricing,
  type PricingByProvider as SyncedPricingByProvider,
} from "../../src/lib/pricingSync.ts";

type CatalogPricing = {
  input?: number;
  output?: number;
  cached?: number;
  cache_creation?: number;
};

// #9364: resolveCatalogPricing() only consults models_dev_pricing and hardcoded
// defaults, skipping the LiteLLM `pricing_synced` namespace entirely. A model
// whose pricing exists ONLY in pricing_synced (the documented Layer 3) gets
// `pricing: null` in the /v1/models catalog. This test seeds pricing_synced
// with pricing for a model absent from both models_dev_pricing and hardcoded
// defaults, then asserts enrichCatalogModelEntry() surfaces it.

describe("catalog pricing LiteLLM gap (#9364)", () => {
  before(() => {
    // Seed ONLY the LiteLLM namespace with a model that is absent from both
    // models.dev and hardcoded defaults (babbage-002 is not in default-pricing
    // and not registered in the provider registry, so neither layer can match).
    const synced: SyncedPricingByProvider = {
      openai: {
        "babbage-002": { input: 0.4, output: 0.4 },
      },
    };
    saveSyncedPricing(synced);

    // Ensure models_dev_pricing has a different model so we prove the LiteLLM
    // layer is being consulted, not accidentally overlapping with models.dev.
    const modelsDev: ModelsDevPricingByProvider = {
      openai: {
        "gpt-4o": { input: 2.5, output: 10 },
      },
    };
    saveModelsDevPricing(modelsDev);
  });

  after(() => {
    try {
      clearSyncedPricing();
      clearModelsDevPricing();
    } catch {
      // ignore
    }
  });

  it("attaches LiteLLM-synced pricing onto catalog entries absent from models.dev and defaults", () => {
    const entry = enrichCatalogModelEntry({
      id: "openai/babbage-002",
      owned_by: "openai",
      root: "babbage-002",
    });
    assert.ok(entry.pricing, "pricing should resolve from pricing_synced (LiteLLM) layer");
    assert.equal((entry.pricing as CatalogPricing).input, 0.4);
    assert.equal((entry.pricing as CatalogPricing).output, 0.4);
  });

  it("still resolves models.dev pricing when present (precedence preserved)", () => {
    const entry = enrichCatalogModelEntry({
      id: "openai/gpt-4o",
      owned_by: "openai",
      root: "gpt-4o",
    });
    assert.ok(entry.pricing);
    assert.equal((entry.pricing as CatalogPricing).input, 2.5);
    assert.equal((entry.pricing as CatalogPricing).output, 10);
  });
});
