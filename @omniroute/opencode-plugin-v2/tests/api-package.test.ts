import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { CatalogDraft } from "@opencode-ai/plugin/v2/promise";
import type { ModelV2Info, ProviderV2Info } from "@opencode-ai/sdk/v2/types";
import { publishCatalog } from "../src/catalog.js";

const SUPPORTED_PACKAGES = new Set(["@ai-sdk/openai-compatible", "@ai-sdk/anthropic"]);

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

function apiPackageOf(m: ModelV2Info | undefined): string {
  assert.ok(m, "model must be published");
  assert.equal(m?.api.type, "aisdk");
  if (m?.api.type !== "aisdk") throw new Error("model api must be aisdk");
  return m.api.package;
}

describe("catalog api package (models + combos + auto-combos)", () => {
  it("every published entry carries a non-empty supported api.package", async () => {
    const { models, draft } = fakeDraft();
    const res = await publishCatalog(draft, baseOpts, {
      fetcher: async () => [{ id: "gpt-x", context_length: 128000, max_output_tokens: 4096 }],
      combosFetcher: async () => [
        { id: "combo-a", name: "Combo A", models: [{ kind: "model", model: "gpt-x" }] },
      ],
      autoCombosFetcher: async () => [{ id: "auto", candidateCount: 6 }],
    });
    assert.deepEqual(res, { models: 1, combos: 1, autoCombos: 1 });
    for (const key of ["omniroute/gpt-x", "omniroute/combo-a", "omniroute/auto"]) {
      const pkg = apiPackageOf(models.get(key));
      assert.ok(pkg.length > 0, `${key} api.package must be non-empty`);
      assert.ok(SUPPORTED_PACKAGES.has(pkg), `${key} api.package must be supported, got ${pkg}`);
    }
  });

  it("auto-combos follow the same anthropic apiFormat rule as models", async () => {
    const { models, draft } = fakeDraft();
    await publishCatalog(
      draft,
      {
        ...baseOpts,
        apiFormat: { allowAnthropic: true, anthropicModels: ["anthropic/claude-x", "auto/coding"] },
      },
      {
        fetcher: async () => [{ id: "anthropic/claude-x" }],
        combosFetcher: async () => [],
        autoCombosFetcher: async () => [
          { id: "auto/coding", variant: "coding", candidateCount: 4 },
          { id: "auto/fast", variant: "fast", candidateCount: 2 },
        ],
      }
    );
    assert.equal(apiPackageOf(models.get("omniroute/anthropic/claude-x")), "@ai-sdk/anthropic");
    assert.equal(apiPackageOf(models.get("omniroute/auto/coding")), "@ai-sdk/anthropic");
    assert.equal(apiPackageOf(models.get("omniroute/auto/fast")), "@ai-sdk/openai-compatible");
  });
});
