import assert from "node:assert/strict";
import { describe, it, before, after } from "node:test";
import { enrichCatalogModelEntry } from "../../src/lib/modelMetadataRegistry.ts";
import {
  saveModelsDevPricing,
  clearModelsDevPricing,
  type PricingByProvider,
} from "../../src/lib/modelsDevSync.ts";

type CatalogPricing = {
  input?: number;
  output?: number;
  cached?: number;
  cache_creation?: number;
};

describe("catalog pricing surface (#8018)", () => {
  before(() => {
    const pricing: PricingByProvider = {
      openai: {
        "gpt-4o": { input: 2.5, output: 10 },
        "whisper-1": { input: 0.006, output: 0 },
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

  it("attaches models.dev pricing onto catalog entries", () => {
    const entry = enrichCatalogModelEntry({
      id: "openai/gpt-4o",
      owned_by: "openai",
      root: "gpt-4o",
    });
    assert.ok(entry.pricing);
    assert.equal((entry.pricing as CatalogPricing).input, 2.5);
    assert.equal((entry.pricing as CatalogPricing).output, 10);
  });

  it("attaches specialty pricing when present", () => {
    const entry = enrichCatalogModelEntry({
      id: "openai/whisper-1",
      owned_by: "openai",
      root: "whisper-1",
      type: "audio",
      subtype: "transcription",
    });
    assert.ok(entry.pricing);
    assert.equal((entry.pricing as CatalogPricing).input, 0.006);
  });

  it("omits pricing when unknown", () => {
    const entry = enrichCatalogModelEntry({
      id: "unknown/provider-model-xyz",
      owned_by: "unknown",
      root: "provider-model-xyz",
    });
    assert.equal(entry.pricing, undefined);
  });
});
