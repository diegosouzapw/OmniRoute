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

interface FakeDraft {
  providers: Map<string, Record<string, any>>;
  models: Map<string, Record<string, any>>;
  warns: string[];
  provider: BetaDraft["provider"];
  model: BetaDraft["model"];
}

function fakeDraft(): FakeDraft {
  const providers = new Map<string, Record<string, any>>();
  const models = new Map<string, Record<string, any>>();
  return {
    providers,
    models,
    warns: [],
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
}

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
};

describe("catalog provider template", () => {
  it("writes provider api package/url plus integrationID", async () => {
    const draft = fakeDraft();
    await publishCatalog(draft, baseOpts, {
      fetcher: async () => [],
      combosFetcher: async () => [],
    });
    const p = draft.providers.get("omniroute");
    assert.ok(p);
    assert.equal(p?.name, "OmniRoute");
    assert.deepEqual(p?.api, {
      type: "aisdk",
      package: "@ai-sdk/openai-compatible",
      url: "https://gw.example.com/v1",
    });
    assert.equal(p?.integrationID, "omniroute");
  });

  it("publishes stub models with mapped fields, counts them", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(draft, baseOpts, {
      fetcher: async () => [
        {
          id: "gpt-x",
          context_length: 128000,
          max_output_tokens: 4096,
          input_modalities: ["text", "image"],
          capabilities: { tool_calling: true, reasoning: true },
        },
        { id: "plain" },
      ],
      combosFetcher: async () => [],
    });
    assert.deepEqual(res, { models: 2, combos: 0, autoCombos: 0 });
    const m = draft.models.get("omniroute/gpt-x");
    assert.ok(m);
    assert.equal(m?.providerID, "omniroute");
    assert.equal(m?.limit.context, 128000);
    assert.equal(m?.capabilities.tools, true);
    assert.equal(m?.status, "active");
  });
});

describe("catalog allowlist", () => {
  const stubModels = async () => [{ id: "cc/keep-me" }, { id: "cc/drop-me" }, { id: "bare-keep" }];

  it("visible exact allowlist keeps matches, drops the rest", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, visibleModels: ["cc/keep-me"] },
      { fetcher: stubModels, combosFetcher: async () => [] }
    );
    assert.equal(res.models, 1);
    assert.ok(draft.models.has("omniroute/cc/keep-me"));
    assert.ok(!draft.models.has("omniroute/cc/drop-me"));
  });

  it("hidden deny-wins over visible allow", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, visibleModels: ["cc/keep-me"], hiddenModels: ["cc/keep-me"] },
      { fetcher: stubModels, combosFetcher: async () => [] }
    );
    assert.equal(res.models, 0);
  });

  it("bare hidden id matches any prefix via suffix rule", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, hiddenModels: ["drop-me"] },
      { fetcher: stubModels, combosFetcher: async () => [] }
    );
    assert.equal(res.models, 2);
    assert.ok(!draft.models.has("omniroute/cc/drop-me"));
    assert.ok(draft.models.has("omniroute/bare-keep"));
  });
});

describe("catalog fail-open", () => {
  it("models fetch throw warns and returns zeros without throwing", async () => {
    const draft = fakeDraft();
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const res = await publishCatalog(draft, baseOpts, {
        fetcher: async () => {
          throw new Error("boom 500");
        },
        combosFetcher: async () => [],
      });
      assert.deepEqual(res, { models: 0, combos: 0, autoCombos: 0 });
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.length, 1);
    assert.match(warns[0], /models fetch failed/);
    assert.ok(draft.providers.has("omniroute"));
  });

  it("combos fetch throw keeps models, warns, returns models-only counts", async () => {
    const draft = fakeDraft();
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const res = await publishCatalog(draft, baseOpts, {
        fetcher: async () => [{ id: "m1" }],
        enrichmentFetcher: async () => new Map(),
        combosFetcher: async () => {
          throw Object.assign(new Error("Not Found"), { status: 404 });
        },
      });
      assert.deepEqual(res, { models: 1, combos: 0, autoCombos: 0 });
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.length, 1);
    assert.match(warns[0], /combos fetch failed/);
    assert.ok(draft.models.has("omniroute/m1"));
  });

  it("combos fetch 403 (PROD) keeps models, warns, never rejects", async () => {
    const draft = fakeDraft();
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const res = await publishCatalog(draft, baseOpts, {
        fetcher: async () => [{ id: "m1" }],
        enrichmentFetcher: async () => new Map(),
        combosFetcher: async () => {
          throw new Error(
            "[omniroute-v2] GET https://gw.example.com/api/combos failed: 403 Forbidden"
          );
        },
      });
      assert.deepEqual(res, { models: 1, combos: 0, autoCombos: 0 });
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.length, 1);
    assert.match(warns[0], /combos fetch failed/);
    assert.match(warns[0], /403/);
    assert.ok(draft.models.has("omniroute/m1"));
  });

  it("combos fetch 500 keeps models, warns, never rejects", async () => {
    const draft = fakeDraft();
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const res = await publishCatalog(draft, baseOpts, {
        fetcher: async () => [{ id: "m1" }],
        enrichmentFetcher: async () => new Map(),
        combosFetcher: async () => {
          throw new Error(
            "[omniroute-v2] GET https://gw.example.com/api/combos failed: 500 Internal Server Error"
          );
        },
      });
      assert.deepEqual(res, { models: 1, combos: 0, autoCombos: 0 });
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.length, 1);
    assert.match(warns[0], /combos fetch failed/);
    assert.match(warns[0], /500/);
    assert.ok(draft.models.has("omniroute/m1"));
  });

  it("combos fetch timeout (AbortError) keeps models, warns, never rejects", async () => {
    const draft = fakeDraft();
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const res = await publishCatalog(draft, baseOpts, {
        fetcher: async () => [{ id: "m1" }],
        enrichmentFetcher: async () => new Map(),
        combosFetcher: async () => {
          const err = new Error("This operation was aborted");
          err.name = "AbortError";
          throw err;
        },
      });
      assert.deepEqual(res, { models: 1, combos: 0, autoCombos: 0 });
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.length, 1);
    assert.match(warns[0], /combos fetch failed/);
    assert.ok(draft.models.has("omniroute/m1"));
  });
});

describe("catalog combo vs combo", () => {
  it("second combo with same id warns only once", async () => {
    const draft = fakeDraft();
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const res = await publishCatalog(draft, baseOpts, {
        fetcher: async () => [{ id: "dupe" }],
        enrichmentFetcher: async () => new Map(),
        combosFetcher: async () => [
          {
            id: "dupe",
            name: "Dupe Combo",
            models: [{ kind: "model", model: "dupe" }],
          },
          {
            id: "dupe",
            name: "Dupe Combo Again",
            models: [{ kind: "model", model: "dupe" }],
          },
        ],
      });
      assert.deepEqual(res, { models: 1, combos: 2, autoCombos: 0 });
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.length, 1);
    assert.match(warns[0], /collides with a model id; combo wins/);
    const m = draft.models.get("omniroute/dupe");
    assert.ok(m);
    assert.equal(m?.name, "Dupe Combo Again");
  });
});

describe("catalog model bare vs combo", () => {
  it("bare model id colliding with combo id warns exactly once", async () => {
    const draft = fakeDraft();
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const res = await publishCatalog(draft, baseOpts, {
        fetcher: async () => [{ id: "dupe" }],
        enrichmentFetcher: async () => new Map(),
        combosFetcher: async () => [
          {
            id: "dupe",
            name: "Dupe Combo",
            models: [{ kind: "model", model: "dupe" }],
          },
        ],
      });
      assert.deepEqual(res, { models: 1, combos: 1, autoCombos: 0 });
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.length, 1);
    assert.match(warns[0], /collides with a model id; combo wins/);
    assert.match(warns[0], /"omniroute\/dupe"/);
  });
});
