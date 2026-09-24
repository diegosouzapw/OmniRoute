import { describe, expect, it } from "vitest";
import {
  filterCatalogModels,
  flattenCatalog,
  getCatalogPage,
  sortCatalogModels,
  type CatalogModelRow,
} from "@/app/(dashboard)/dashboard/models/modelCatalogUtils";

const models: CatalogModelRow[] = [
  {
    providerId: "zeta",
    provider: "Zeta AI",
    id: "zeta-chat",
    name: "Zeta Chat",
    type: "chat",
    context_length: 128_000,
    input_modalities: ["text", "image"],
  },
  {
    providerId: "alpha",
    provider: "Alpha Labs",
    id: "alpha-embed",
    name: "Alpha Embed",
    type: "embedding",
    capabilities: { tools: true },
    custom: true,
  },
  {
    providerId: "alpha",
    provider: "Alpha Labs",
    id: "alpha-chat",
    name: "Alpha Chat",
    type: "chat",
    free: true,
  },
];

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

describe("filterCatalogModels", () => {
  it("searches case-insensitively across provider, model, and capability metadata", () => {
    expect(filterCatalogModels(models, { query: "IMAGE", providerId: "all", type: "all" })).toEqual(
      [models[0]]
    );
    expect(
      filterCatalogModels(models, { query: "alpha labs", providerId: "all", type: "all" })
    ).toEqual([models[1], models[2]]);
  });

  it("combines provider and type filters", () => {
    expect(filterCatalogModels(models, { query: "", providerId: "alpha", type: "chat" })).toEqual([
      models[2],
    ]);
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
