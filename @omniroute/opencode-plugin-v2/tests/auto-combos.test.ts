import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { CatalogDraft } from "@opencode-ai/plugin/v2/promise";
import type { ModelV2Info, ProviderV2Info } from "@opencode-ai/sdk/v2/types";
import { publishCatalog } from "../src/catalog.js";

function fakeDraft(): {
  models: Map<string, ModelV2Info>;
  draft: CatalogDraft;
  warns: string[];
  restore: () => void;
} {
  const providers = new Map<string, ProviderV2Info>();
  const models = new Map<string, ModelV2Info>();
  const warns: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warns.push(String(args[0]));
  };
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
  return {
    models,
    draft,
    warns,
    restore: () => {
      console.warn = origWarn;
    },
  };
}

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  timeouts: { autoCombos: 5000 },
  modelCacheTtlMs: 300000,
  usableOnly: false,
};

describe("catalog auto combos (v1 parity)", () => {
  it("publishes auto/* ids from the auto-combos fetcher", async () => {
    const { models, draft, warns, restore } = fakeDraft();
    try {
      const res = await publishCatalog(draft, baseOpts, {
        fetcher: async () => [],
        combosFetcher: async () => [],
        autoCombosFetcher: async () => [
          { id: "auto", variant: undefined, candidateCount: 6 },
          { id: "auto/coding", variant: "coding", candidateCount: 4 },
        ],
      });
      assert.deepEqual(res, { models: 0, combos: 0, autoCombos: 2 });
      assert.ok(models.has("omniroute/auto"), "auto entry must be published");
      assert.ok(models.has("omniroute/auto/coding"), "auto/coding entry must be published");
      const coding = models.get("omniroute/auto/coding");
      assert.equal(coding?.limit.context, 128_000);
      assert.equal(coding?.limit.output, 8_192);
    } finally {
      restore();
    }
    assert.ok(!warns.some((w) => w.includes("auto combo") && w.includes("failed")));
  });

  it("auto-combos fetch throw stays fail-open (warn, models kept)", async () => {
    const { models, draft, warns, restore } = fakeDraft();
    try {
      const res = await publishCatalog(draft, baseOpts, {
        fetcher: async () => [{ id: "m1" }],
        combosFetcher: async () => [],
        autoCombosFetcher: async () => {
          throw new Error("GET https://gw.example.com/api/combos/auto failed: 500 boom");
        },
      });
      assert.deepEqual(res, { models: 1, combos: 0, autoCombos: 0 });
      assert.ok(models.has("omniroute/m1"));
    } finally {
      restore();
    }
    assert.ok(warns.some((w) => w.includes("auto combos") || w.includes("auto-combos")));
  });

  it("forwards the 5s auto-combos timeout to the fetcher", async () => {
    const seen: number[] = [];
    const { draft, restore } = fakeDraft();
    try {
      await publishCatalog(
        draft,
        { ...baseOpts, timeoutMs: 9999, timeouts: { autoCombos: 5000 } },
        {
          fetcher: async () => [],
          combosFetcher: async () => [],
          autoCombosFetcher: async (_base, _key, timeoutMs) => {
            seen.push(timeoutMs ?? -1);
            return [];
          },
        }
      );
    } finally {
      restore();
    }
    assert.deepEqual(seen, [5000]);
  });

  it("hidden auto combos are skipped", async () => {
    const { models, draft, restore } = fakeDraft();
    try {
      const res = await publishCatalog(draft, baseOpts, {
        fetcher: async () => [],
        combosFetcher: async () => [],
        autoCombosFetcher: async () => [
          { id: "auto/offline", variant: "offline", isHidden: true },
          { id: "auto/fast", variant: "fast" },
        ],
      });
      assert.deepEqual(res, { models: 0, combos: 0, autoCombos: 1 });
      assert.ok(!models.has("omniroute/auto/offline"));
      assert.ok(models.has("omniroute/auto/fast"));
    } finally {
      restore();
    }
  });
});

describe("auto combos obey the same allowlists as everything else", () => {
  it("hides an auto combo the user hid, and keeps the rest", async () => {
    const { publishCatalog } = await import("../src/catalog.js");
    const published = new Map<string, Record<string, unknown>>();
    const draft = {
      provider: { update: (_i: string, fn: (p: Record<string, unknown>) => void) => fn({}) },
      model: {
        update: (pid: string, mid: string, fn: (m: Record<string, unknown>) => void) => {
          const e: Record<string, unknown> = { id: mid, providerID: pid };
          fn(e);
          published.set(`${pid}/${mid}`, e);
        },
      },
    };
    await publishCatalog(
      draft as never,
      {
        providerId: "omni",
        baseURL: "https://gw.example.com",
        apiKey: "k",
        timeoutMs: 1000,
        modelCacheTtlMs: 1000,
        usableOnly: false,
        enrichment: new Map(),
        hiddenModels: ["auto/best-chaos"],
      } as never,
      {
        models: async () => [{ id: "m1" }],
        combos: async () => [],
        autoCombos: async () =>
          [
            { id: "auto/best-coding", variant: "best-coding", candidateCount: 3 },
            { id: "auto/best-chaos", variant: "best-chaos", candidateCount: 2 },
          ] as never,
        providers: async () => [],
        enrichment: async () => new Map(),
      }
    );
    const keys = [...published.keys()];
    assert.ok(
      keys.some((k) => k.includes("best-coding")),
      `the other auto combo stays, got ${JSON.stringify(keys)}`
    );
    assert.equal(
      keys.some((k) => k.includes("best-chaos")),
      false,
      `a hidden auto combo must not reach the picker, got ${JSON.stringify(keys)}`
    );
  });
});
