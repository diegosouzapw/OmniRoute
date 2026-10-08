import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { publishCatalog } from "../src/catalog.js";
type BetaDraft = {
  provider: {
    list?: () => unknown[];
    get?: (id: string) => unknown;
    update: (id: string, fn: (p: Record<string, any>) => void) => void;
    remove?: () => void;
  };
  model: {
    get?: (...a: string[]) => unknown;
    update: (pid: string, mid: string, fn: (m: Record<string, any>) => void) => void;
    remove?: () => void;
    default?: { get: () => undefined; set: () => void };
  };
};

const SUPPORTED_PACKAGES = new Set(["@ai-sdk/openai-compatible", "@ai-sdk/anthropic"]);

function fakeDraft(): { models: Map<string, Record<string, any>>; draft: BetaDraft } {
  const providers = new Map<string, Record<string, any>>();
  const models = new Map<string, Record<string, any>>();
  const draft = {
    provider: {
      list: () => [],
      get: (id: string) => providers.get(id) as never,
      update: (id: string, fn: (p: Record<string, any>) => void) => {
        const p = (providers.get(id) ?? { id }) as Record<string, any>;
        fn(p);
        providers.set(id, p);
      },
      remove: () => {},
    },
    model: {
      get: () => undefined,
      update: (pid: string, mid: string, fn: (m: Record<string, any>) => void) => {
        const k = pid + "/" + mid;
        const m = (models.get(k) ?? { id: mid, providerID: pid }) as Record<string, any>;
        fn(m);
        models.set(k, m);
      },
      remove: () => {},
      default: { get: () => undefined, set: () => {} },
    },
  };
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

function apiPackageOf(m: Record<string, any> | undefined): string {
  assert.ok(m, "model must be published");
  assert.equal(m?.api.type, "aisdk");
  if (m?.api.type !== "aisdk") throw new Error("model api must be aisdk");
  return m.api.package;
}

describe("catalog api package (models + combos)", () => {
  it("every published entry carries a non-empty supported api.package", async () => {
    const { models, draft } = fakeDraft();
    const res = await publishCatalog(draft, baseOpts, {
      fetcher: async () => [{ id: "gpt-x", context_length: 128000, max_output_tokens: 4096 }],
      combosFetcher: async () => [
        { id: "combo-a", name: "Combo A", models: [{ kind: "model", model: "gpt-x" }] },
      ],
    });
    assert.deepEqual(res, { models: 1, combos: 1 });
    for (const key of ["omniroute/gpt-x", "omniroute/Combo A"]) {
      const pkg = apiPackageOf(models.get(key));
      assert.ok(pkg.length > 0, `${key} api.package must be non-empty`);
      assert.ok(SUPPORTED_PACKAGES.has(pkg), `${key} api.package must be supported, got ${pkg}`);
    }
  });

  it("models keep their gateway ids and api blocks after the virtual-entries removal", async () => {
    const { models, draft } = fakeDraft();
    const res = await publishCatalog(
      draft,
      {
        ...baseOpts,
        apiFormat: { allowAnthropic: true, anthropicModels: ["anthropic/claude-x"] },
      },
      {
        fetcher: async () => [{ id: "anthropic/claude-x" }, { id: "auto/coding" }],
        combosFetcher: async () => [],
      }
    );
    assert.deepEqual(res, { models: 2, combos: 0 });
    assert.equal(apiPackageOf(models.get("omniroute/anthropic/claude-x")), "@ai-sdk/anthropic");
    assert.ok(models.has("omniroute/auto/coding"), "gateway entries publish under their own id");
  });
});
