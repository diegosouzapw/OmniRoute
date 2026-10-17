import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { collectCatalog } from "../src/catalog.js";
import { catalogContentFingerprint } from "../src/shared/fingerprint.js";

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
};

describe("combos source is never requested", () => {
  it("collects without calling the injected combos fetcher", async () => {
    let combosCalls = 0;
    const collected = await collectCatalog(baseOpts, {
      models: async () => [{ id: "m1" }],
      combos: async () => {
        combosCalls += 1;
        return [];
      },
      providers: async () => [],
      enrichment: async () => new Map(),
    } as never);
    assert.equal(combosCalls, 0);
    assert.deepEqual(collected.counts, { models: 1 });
  });

  it("ignores a legacy combos fetcher entry the refresh no longer reads", async () => {
    let combosCalls = 0;
    const collected = await collectCatalog(baseOpts, {
      models: async () => [{ id: "m1" }],
      combos: async () => {
        combosCalls += 1;
        return [{ id: "combo-one", name: "Combo One", models: [{ kind: "model", model: "m1" }] }];
      },
      combosFetcher: async () => {
        combosCalls += 1;
        return [{ id: "combo-two", name: "Combo Two", models: [{ kind: "model", model: "m1" }] }];
      },
      providers: async () => [],
      enrichment: async () => new Map(),
    } as never);
    assert.equal(combosCalls, 0);
    assert.deepEqual(collected.counts, { models: 1 });
  });

  it("never issues a combos request on the default fetch path", async () => {
    const requested: string[] = [];
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      requested.push(new URL(href).pathname);
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => ({ data: [{ id: "m1", capabilities: { tool_calling: true } }] }),
      };
    }) as typeof fetch;
    try {
      const { defaultOmniRouteModelsFetcher } = await import("../src/shared/models-map.js");
      const models = await defaultOmniRouteModelsFetcher("https://gw.example.com", "k", 1000);
      assert.equal(models.length, 1);
    } finally {
      globalThis.fetch = origFetch;
    }
    assert.ok(
      requested.every((path) => path !== "/api/combos"),
      `no /api/combos request expected, got ${JSON.stringify(requested)}`
    );
  });

  it("publishes server-provided combo rows from /v1/models as-is", async () => {
    const collected = await collectCatalog(baseOpts, {
      models: async () => [
        { id: "m1", context_length: 64000, max_output_tokens: 4000 },
        { id: "c1", owned_by: "combo", context_length: 32000, max_output_tokens: 2000 },
      ],
      providers: async () => [],
      enrichment: async () => new Map(),
    } as never);
    assert.ok(
      collected.entries.has("omniroute/c1"),
      `server-provided combo row c1 must stay published, got ${JSON.stringify([...collected.entries.keys()])}`
    );
  });

  it("matches combo rows by picker id against visible and hidden lists", async () => {
    const rows = () => [
      { id: "m1", context_length: 64000, max_output_tokens: 4000 },
      { id: "c1", owned_by: "combo", context_length: 32000, max_output_tokens: 2000 },
    ];
    const visible = await collectCatalog({ ...baseOpts, visibleModels: ["c1"] }, {
      models: async () => rows(),
      providers: async () => [],
      enrichment: async () => new Map(),
    } as never);
    assert.ok(visible.entries.has("omniroute/c1"), "allowlisted combo id c1 must publish");
    assert.equal(visible.entries.has("omniroute/m1"), false, "m1 outside the allowlist stays out");
    const hidden = await collectCatalog({ ...baseOpts, hiddenModels: ["c1"] }, {
      models: async () => rows(),
      providers: async () => [],
      enrichment: async () => new Map(),
    } as never);
    assert.equal(hidden.entries.has("omniroute/c1"), false, "hidden combo id c1 must drop");
    assert.ok(hidden.entries.has("omniroute/m1"), "m1 must still publish");
    const hiddenMember = await collectCatalog({ ...baseOpts, hiddenModels: ["m1"] }, {
      models: async () => rows(),
      providers: async () => [],
      enrichment: async () => new Map(),
    } as never);
    assert.ok(
      hiddenMember.entries.has("omniroute/c1"),
      "hiding member m1 no longer drops combo c1: the picker id rules"
    );
  });

  it("keeps a stable fingerprint over two identical refreshes", async () => {
    const rows = () => [
      { id: "m1", release_date: "2026-01-01" },
      { id: "c1", release_date: "2026-01-02" },
    ];
    const first = catalogContentFingerprint(rows());
    const second = catalogContentFingerprint(rows());
    assert.equal(first, second);
    assert.equal(catalogContentFingerprint.length, 1);
  });
});
