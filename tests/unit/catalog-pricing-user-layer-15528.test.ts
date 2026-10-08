import assert from "node:assert/strict";
import { describe, it, before, after } from "node:test";
import { enrichCatalogModelEntry } from "../../src/lib/modelMetadataRegistry.ts";
import { saveModelsDevPricing, clearModelsDevPricing } from "../../src/lib/modelsDevSync.ts";
import { updatePricing, getPricingWithSources } from "../../src/lib/db/settings/pricing.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

type CatalogPricing = { input?: number; output?: number; cached?: number };

describe("catalog pricing honours the user layer (#15528)", () => {
  before(() => {
    saveModelsDevPricing({
      "opencode-go": {
        "deepseek-v4.1-flash": { input: 0.15, output: 0.6, cached: 0.003 },
        "partial-model": { input: 1, output: 2, cached: 0.5 },
      },
    });
  });
  after(() => {
    try {
      clearModelsDevPricing();
    } catch {}
    resetDbInstance();
  });

  it("user override (PATCH /api/pricing) wins over models.dev in enrichCatalogModelEntry", async () => {
    await updatePricing({
      "opencode-go": { "deepseek-v4.1-flash": { input: 0.3, output: 1.2, cached: 0.01 } },
    });
    const { sourceMap } = await getPricingWithSources();
    assert.equal(sourceMap["opencode-go"]["deepseek-v4.1-flash"], "user");

    const entry = enrichCatalogModelEntry({
      id: "opencode-go/deepseek-v4.1-flash",
      owned_by: "opencode-go",
      root: "deepseek-v4.1-flash",
    });
    const p = entry.pricing as CatalogPricing;
    assert.ok(p);
    assert.equal(p.input, 0.3);
    assert.equal(p.output, 1.2);
    assert.equal(p.cached, 0.01);
  });

  it("partial user override keeps the remaining fields from lower layers", async () => {
    await updatePricing({ "opencode-go": { "partial-model": { input: 9 } } });
    const entry = enrichCatalogModelEntry({
      id: "opencode-go/partial-model",
      owned_by: "opencode-go",
      root: "partial-model",
    });
    const p = entry.pricing as CatalogPricing;
    assert.equal(p.input, 9);
    assert.equal(p.output, 2);
    assert.equal(p.cached, 0.5);
  });

  it("uses the bulk-loaded snapshot userPricing when provided", () => {
    const entry = enrichCatalogModelEntry(
      { id: "opencode-go/partial-model", owned_by: "opencode-go", root: "partial-model" },
      undefined,
      {
        modelsDevPricing: null,
        userPricing: { "opencode-go": { "partial-model": { input: 7, output: 8 } } },
      }
    );
    const p = entry.pricing as CatalogPricing;
    assert.equal(p.input, 7);
    assert.equal(p.output, 8);
  });
});
