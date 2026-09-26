import { describe, expect, it } from "vitest";
import {
  extractCatalogCapabilities,
  filterCatalogModels,
  flattenCatalog,
  getCatalogPage,
  sortCatalogModels,
  type CatalogFilters,
  type CatalogModelRow,
} from "@/app/(dashboard)/dashboard/models/modelCatalogUtils";
import type { CatalogTestResult } from "@/app/(dashboard)/dashboard/models/catalogTestStorage";

const models: CatalogModelRow[] = [
  {
    providerId: "zeta",
    provider: "Zeta AI",
    id: "zeta-chat",
    name: "Zeta Chat",
    type: "chat",
    subtype: "instruction",
    context_length: 128_000,
    max_output_tokens: 4_096,
    input_modalities: ["text", "image"],
    capabilities: { reasoning: true, vision: true },
  },
  {
    providerId: "alpha",
    provider: "Alpha Labs",
    id: "alpha-embed",
    name: "Alpha Embed",
    type: "embedding",
    subtype: "dense",
    context_length: 8_192,
    max_output_tokens: 512,
    capabilities: { tools: true },
    custom: true,
  },
  {
    providerId: "alpha",
    provider: "Alpha Labs",
    id: "alpha-chat",
    name: "Alpha Chat",
    type: "chat",
    max_output_tokens: 2_048,
    free: true,
  },
];

const defaultFilters: CatalogFilters = {
  query: "",
  providerId: "all",
  type: "all",
  subtype: "all",
  capability: "all",
  pricing: "all",
  providerHealth: "all",
  testResult: "all",
};

describe("flattenCatalog", () => {
  it("creates one row per model while retaining the provider identity", () => {
    expect(
      flattenCatalog({
        zeta: { provider: "Zeta AI", models: [models[0]] },
        alpha: { provider: "Alpha Labs", models: [models[1], models[2]] },
      })
    ).toEqual(models);
  });

  it("ignores malformed provider buckets and empty model lists", () => {
    expect(
      flattenCatalog({
        broken: null,
        empty: { provider: "Empty", models: [] },
      })
    ).toEqual([]);
  });
});

describe("extractCatalogCapabilities", () => {
  it("derives all unique capabilities from catalog models", () => {
    const caps = extractCatalogCapabilities(models);
    expect(caps).toContain("reasoning");
    expect(caps).toContain("vision");
    expect(caps).toContain("tools");
  });
});

describe("filterCatalogModels", () => {
  it("searches case-insensitively across provider, model, and capability metadata", () => {
    expect(filterCatalogModels(models, { ...defaultFilters, query: "IMAGE" })).toEqual([models[0]]);
    expect(filterCatalogModels(models, { ...defaultFilters, query: "alpha labs" })).toEqual([
      models[1],
      models[2],
    ]);
  });

  it("combines provider and type filters", () => {
    expect(
      filterCatalogModels(models, { ...defaultFilters, providerId: "alpha", type: "chat" })
    ).toEqual([models[2]]);
  });

  it("filters by subtype", () => {
    expect(filterCatalogModels(models, { ...defaultFilters, subtype: "instruction" })).toEqual([
      models[0],
    ]);
    expect(filterCatalogModels(models, { ...defaultFilters, subtype: "dense" })).toEqual([
      models[1],
    ]);
  });

  it("filters by capability", () => {
    expect(filterCatalogModels(models, { ...defaultFilters, capability: "reasoning" })).toEqual([
      models[0],
    ]);
    expect(filterCatalogModels(models, { ...defaultFilters, capability: "tools" })).toEqual([
      models[1],
    ]);
  });

  it("filters by minContextLength", () => {
    expect(filterCatalogModels(models, { ...defaultFilters, minContextLength: 8_000 })).toEqual([
      models[0],
      models[1],
    ]);
    expect(filterCatalogModels(models, { ...defaultFilters, minContextLength: 100_000 })).toEqual([
      models[0],
    ]);
  });

  it("filters by minMaxOutputTokens", () => {
    expect(filterCatalogModels(models, { ...defaultFilters, minMaxOutputTokens: 2_000 })).toEqual([
      models[0],
      models[2],
    ]);
    expect(filterCatalogModels(models, { ...defaultFilters, minMaxOutputTokens: 4_000 })).toEqual([
      models[0],
    ]);
  });

  it("filters by pricing (free vs paid)", () => {
    expect(filterCatalogModels(models, { ...defaultFilters, pricing: "free" })).toEqual([
      models[2],
    ]);
    expect(filterCatalogModels(models, { ...defaultFilters, pricing: "paid" })).toEqual([
      models[0],
      models[1],
    ]);
  });

  it("filters by providerHealth", () => {
    const healthMap: Record<string, "healthy" | "degraded" | "down"> = {
      zeta: "healthy",
      alpha: "degraded",
    };
    expect(
      filterCatalogModels(
        models,
        { ...defaultFilters, providerHealth: "healthy" },
        { providerHealthMap: healthMap }
      )
    ).toEqual([models[0]]);

    expect(
      filterCatalogModels(
        models,
        { ...defaultFilters, providerHealth: "degraded" },
        { providerHealthMap: healthMap }
      )
    ).toEqual([models[1], models[2]]);
  });

  it("filters by testResult", () => {
    const testResults: Record<string, CatalogTestResult> = {
      "model:zeta:zeta-chat": {
        id: "model:zeta:zeta-chat",
        targetType: "model",
        providerId: "zeta",
        modelId: "zeta-chat",
        status: "ok",
        testedAt: 1000,
      },
      "model:alpha:alpha-embed": {
        id: "model:alpha:alpha-embed",
        targetType: "model",
        providerId: "alpha",
        modelId: "alpha-embed",
        status: "error",
        error: "Failed",
        testedAt: 1000,
      },
    };

    expect(
      filterCatalogModels(models, { ...defaultFilters, testResult: "ok" }, { testResults })
    ).toEqual([models[0]]);

    expect(
      filterCatalogModels(models, { ...defaultFilters, testResult: "error" }, { testResults })
    ).toEqual([models[1]]);

    expect(
      filterCatalogModels(models, { ...defaultFilters, testResult: "untested" }, { testResults })
    ).toEqual([models[2]]);
  });
});

describe("sortCatalogModels", () => {
  it("sorts numeric fields and keeps unknown values at the end in either direction", () => {
    const values = [models[0], { ...models[1], context_length: 32_000 }, models[2]];
    expect(sortCatalogModels(values, "context_length", "desc").map((model) => model.id)).toEqual([
      "zeta-chat",
      "alpha-embed",
      "alpha-chat",
    ]);
    expect(sortCatalogModels(values, "context_length", "asc").map((model) => model.id)).toEqual([
      "alpha-embed",
      "zeta-chat",
      "alpha-chat",
    ]);
  });

  it("sorts text fields without mutating the source list", () => {
    expect(sortCatalogModels(models, "provider", "asc").map((model) => model.id)).toEqual([
      "alpha-chat",
      "alpha-embed",
      "zeta-chat",
    ]);
    expect(models[0].id).toBe("zeta-chat");
  });
});

describe("getCatalogPage", () => {
  it("returns the requested slice and clamps out-of-range pages", () => {
    expect(getCatalogPage(models, 1, 2)).toEqual({ rows: [models[2]], page: 1, pageCount: 2 });
    expect(getCatalogPage(models, 99, 2)).toEqual({ rows: [models[2]], page: 1, pageCount: 2 });
  });

  it("represents an empty result with page zero and no pages", () => {
    expect(getCatalogPage([], 5, 2)).toEqual({ rows: [], page: 0, pageCount: 0 });
  });
});
