import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { CatalogDraft } from "@opencode-ai/plugin/v2/promise";
import type { ModelV2Info, ProviderV2Info } from "@opencode-ai/sdk/v2/types";
import type { OmniRouteEnrichmentMap } from "../src/shared/index.js";
import { publishCatalog } from "../src/catalog.js";

function fakeDraft(): { models: Map<string, ModelV2Info>; draft: CatalogDraft } {
  const providers = new Map<string, ProviderV2Info>();
  const models = new Map<string, ModelV2Info>();
  const draft = {
    provider: {
      list: () => [],
      get: (id: string) => providers.get(id) as never,
      update: (id: string, fn: (p: ProviderV2Info) => void) => {
        const p = (providers.get(id) ?? { id }) as ProviderV2Info;
        fn(p);
        providers.set(id, p);
      },
      remove: () => {},
    },
    model: {
      get: () => undefined,
      update: (pid: string, mid: string, fn: (m: ModelV2Info) => void) => {
        const k = pid + "/" + mid;
        const m = (models.get(k) ?? { id: mid, providerID: pid }) as ModelV2Info;
        fn(m);
        models.set(k, m);
      },
      remove: () => {},
      default: { get: () => undefined, set: () => {} },
    },
  } as CatalogDraft;
  return { models, draft };
}

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
};

const stubModels = async () => [{ id: "cc/m1", context_length: 1000 }];

describe("catalog enrichment source", () => {
  it("applies names and pricing from an injected enrichmentFetcher", async () => {
    const { models, draft } = fakeDraft();
    const enrichment: OmniRouteEnrichmentMap = new Map([
      ["cc/m1", { name: "Model One", pricing: { input: 3, output: 15 } }],
      ["m1", { name: "Model One", pricing: { input: 3, output: 15 } }],
    ]);
    const res = await publishCatalog(draft, baseOpts, {
      fetcher: stubModels,
      combosFetcher: async () => [],
      enrichmentFetcher: async () => enrichment,
    });
    assert.deepEqual(res, { models: 1, combos: 0, autoCombos: 0 });
    const m = models.get("omniroute/cc/m1");
    assert.ok(m);
    assert.equal(m?.name, "Model One");
    assert.equal(m?.cost[0].input, 3);
    assert.equal(m?.cost[0].output, 15);
  });

  it("stays fail-open when the enrichment fetch throws", async () => {
    const { models, draft } = fakeDraft();
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const res = await publishCatalog(draft, baseOpts, {
        fetcher: stubModels,
        combosFetcher: async () => [],
        enrichmentFetcher: async () => {
          throw new Error("pricing down");
        },
      });
      assert.deepEqual(res, { models: 1, combos: 0, autoCombos: 0 });
      assert.ok(models.get("omniroute/cc/m1"));
    } finally {
      console.warn = origWarn;
    }
    assert.ok(warns.some((w) => w.includes("enrichment fetch failed")));
  });

  it("forwards the enrichment timeout and skips the fetch when enrichment is false", async () => {
    const { draft } = fakeDraft();
    let seenTimeout: number | undefined;
    await publishCatalog(
      draft,
      { ...baseOpts, timeouts: { enrichment: 4321 } },
      {
        fetcher: stubModels,
        combosFetcher: async () => [],
        enrichmentFetcher: async (_base, _key, timeout) => {
          seenTimeout = timeout;
          return new Map();
        },
      }
    );
    assert.equal(seenTimeout, 4321);

    const { draft: draft2 } = fakeDraft();
    let called = 0;
    await publishCatalog(
      draft2,
      { ...baseOpts, enrichment: false },
      {
        fetcher: stubModels,
        combosFetcher: async () => [],
        enrichmentFetcher: async () => {
          called += 1;
          return new Map();
        },
      }
    );
    assert.equal(called, 0);
  });
});
