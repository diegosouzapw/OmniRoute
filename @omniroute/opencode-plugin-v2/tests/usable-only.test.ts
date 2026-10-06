import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { publishCatalog } from "../src/catalog.js";
import { parsePluginOptions } from "../src/options.js";
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

function silence() {
  const origWarn = console.warn;
  const origLog = console.log;
  console.warn = () => {};
  console.log = () => {};
  return {
    restore() {
      console.warn = origWarn;
      console.log = origLog;
    },
  };
}
function enrichmentOf(...pairs: Array<[string, string]>) {
  return new Map(
    pairs.map(([alias, canonical]) => [
      `${alias}/model-x`,
      { providerAlias: alias, providerCanonical: canonical },
    ])
  );
}

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
};

describe("usableOnly option default", () => {
  it("defaults to false", () => {
    const opts = parsePluginOptions({ baseURL: "https://gw.example.com" });
    assert.equal(opts.usableOnly, false);
  });
});

describe("catalog usableOnly gating", () => {
  const stubModels = async () => [
    { id: "cc/keep-me" },
    { id: "dead/drop-me" },
    { id: "agentrouter/mystery" },
  ];

  it("usableOnly=false performs zero providers fetches", async () => {
    const { draft, models } = fakeDraft();
    let providersCalls = 0;
    const res = await publishCatalog(
      draft,
      { ...baseOpts, usableOnly: false },
      {
        fetcher: stubModels,
        combosFetcher: async () => [],
        providersFetcher: async () => {
          providersCalls += 1;
          return [];
        },
      }
    );
    assert.equal(providersCalls, 0);
    assert.equal(res.models, 3);
    assert.ok(models.has("omniroute/cc/keep-me"));
    assert.ok(models.has("omniroute/dead/drop-me"));
  });

  it("usableOnly=true drops known-but-not-provisioned models, keeps unknown prefixes", async () => {
    const { draft, models } = fakeDraft();
    const res = await publishCatalog(
      draft,
      {
        ...baseOpts,
        usableOnly: true,
        enrichment: enrichmentOf(["cc", "claude"], ["dead", "legacy"]),
      },
      {
        fetcher: stubModels,
        combosFetcher: async () => [],
        providersFetcher: async () => [
          { id: "c1", provider: "claude", isActive: true, testStatus: "active" },
        ],
      }
    );
    assert.equal(res.models, 2);
    assert.ok(models.has("omniroute/cc/keep-me"));
    assert.ok(!models.has("omniroute/dead/drop-me"));
    assert.ok(models.has("omniroute/agentrouter/mystery"));
  });

  it("usableOnly=true with providers soft-fail keeps the full catalog", async () => {
    const { draft, models } = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, usableOnly: true },
      {
        fetcher: stubModels,
        combosFetcher: async () => [],
        providersFetcher: async () => {
          throw new Error("down");
        },
      }
    );
    assert.equal(res.models, 3);
    assert.ok(models.has("omniroute/dead/drop-me"));
  });

  it("usableOnly=true filters combos by member usability", async () => {
    const { draft, models } = fakeDraft();
    const res = await publishCatalog(
      draft,
      {
        ...baseOpts,
        usableOnly: true,
        enrichment: enrichmentOf(["cc", "claude"], ["dead", "legacy"]),
      },
      {
        fetcher: async () => [{ id: "cc/x" }, { id: "dead/y" }],
        combosFetcher: async () => [
          { id: "good", name: "Good", models: [{ kind: "model", model: "cc/x" }] },
          { id: "bad", name: "Bad", models: [{ kind: "model", model: "dead/y" }] },
        ],
        providersFetcher: async () => [
          { id: "c1", provider: "claude", isActive: true, testStatus: "active" },
        ],
      }
    );
    assert.equal(res.combos, 1);
    assert.ok(models.has("omniroute/good"));
    assert.ok(!models.has("omniroute/bad"));
  });

  it("usableOnly=false issues no providers request through setup (gating)", async () => {
    const seen: string[] = [];
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      seen.push(href);
      if (href.includes("/api/combos/auto")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      if (href.includes("/api/combos")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => ({ data: [{ id: "m1" }] }),
      };
    }) as typeof fetch;
    const guard = silence();
    try {
      const plugin = (await import("../src/index.js")).default as unknown as {
        setup: (ctx: unknown) => Promise<void>;
      };
      const catalogCallbacks: Array<(draft: unknown) => Promise<void>> = [];
      await plugin.setup({
        options: { baseURL: "https://gw.example.com", providerId: "usable-gate" },
        provider: {
          transform: (cb: (editor: { add: (input: unknown) => void }) => void) => {
            catalogCallbacks.push(async () => {
              cb({ add: () => {} });
            });
            return Promise.resolve({ dispose: async () => {} });
          },
          },
          model: {
            transform: () => Promise.resolve({ dispose: async () => {} }),
          },
        integration: { transform: () => Promise.resolve({ dispose: async () => {} }) },
      });
      const { mkdtempSync } = await import("node:fs");
      const { tmpdir } = await import("node:os");
      const { join } = await import("node:path");
      const prevDataDir = process.env.OPENCODE_DATA_DIR;
      process.env.OPENCODE_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-usable-"));
      try {
        const { draft } = fakeDraft();
        await catalogCallbacks[0](draft as never);
      } finally {
        if (prevDataDir === undefined) delete process.env.OPENCODE_DATA_DIR;
        else process.env.OPENCODE_DATA_DIR = prevDataDir;
      }
      assert.ok(
        !seen.some((href) => href.includes("/api/providers")),
        `no providers fetch expected, got: ${JSON.stringify(seen)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      guard.restore();
    }
  });
});
