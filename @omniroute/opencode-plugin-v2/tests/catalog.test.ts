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
    });
    assert.deepEqual(res, { models: 2 });
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
      { fetcher: stubModels }
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
      { fetcher: stubModels }
    );
    assert.equal(res.models, 0);
  });

  it("bare hidden id matches any prefix via suffix rule", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, hiddenModels: ["drop-me"] },
      { fetcher: stubModels }
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
      });
      assert.deepEqual(res, { models: 0 });
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.length, 1);
    assert.match(warns[0], /models fetch failed/);
    assert.ok(draft.providers.has("omniroute"));
  });
});

describe("catalog combo rows from the models source", () => {
  it("two server-provided combo rows publish under their own ids", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(draft, baseOpts, {
      fetcher: async () => [
        { id: "dupe" },
        { id: "Dupe Combo", owned_by: "combo" },
        { id: "Dupe Combo Again", owned_by: "combo" },
      ],
      enrichmentFetcher: async () => new Map(),
    });
    assert.deepEqual(res, { models: 3 });
    const m = draft.models.get("omniroute/dupe");
    assert.ok(m, "raw model remains at its own key");
    assert.equal(m?.name, "dupe");
    const combo1 = draft.models.get("omniroute/Dupe Combo");
    assert.ok(combo1, "first combo row published under its id");
    const combo2 = draft.models.get("omniroute/Dupe Combo Again");
    assert.ok(combo2, "second combo row published under its id");
    assert.equal(combo2?.name, "Dupe Combo Again");
  });
});

describe("catalog model bare vs combo row", () => {
  it("bare model id and a same-suffix combo row do not collide", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(draft, baseOpts, {
      fetcher: async () => [{ id: "dupe" }, { id: "Dupe Combo", owned_by: "combo" }],
      enrichmentFetcher: async () => new Map(),
    });
    assert.deepEqual(res, { models: 2 });
    assert.ok(draft.models.get("omniroute/dupe"), "raw model keeps its id key");
    assert.ok(draft.models.get("omniroute/Dupe Combo"), "combo row published under its id");
  });
});

describe("catalog capability presets", () => {
  function captureWarns() {
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    return {
      warns,
      restore() {
        console.warn = origWarn;
      },
    };
  }

  it("freeOnly keeps only models with a free-tier enrichment entry", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, freeOnly: true },
      {
        fetcher: async () => [{ id: "free-m" }, { id: "paid-m" }],
        enrichmentFetcher: async () =>
          new Map([["free-m", { freeType: "recurring-monthly" as const }]]),
      }
    );
    assert.equal(res.models, 1);
    assert.ok(draft.models.has("omniroute/free-m"));
    assert.ok(!draft.models.has("omniroute/paid-m"));
  });

  it("freeOnly without enrichment publishes nothing and warns once", async () => {
    const draft = fakeDraft();
    const { warns, restore } = captureWarns();
    try {
      const res = await publishCatalog(
        draft,
        { ...baseOpts, freeOnly: true },
        {
          fetcher: async () => [{ id: "m1" }, { id: "m2" }],
          enrichmentFetcher: async () => new Map(),
        }
      );
      // #15392 stopped publishing auto combos, so counts no longer include autoCombos.
      assert.deepEqual(res, { models: 0 });
    } finally {
      restore();
    }
    assert.equal(warns.length, 1);
    assert.match(warns[0], /freeOnly.*enrichment|enrichment.*free/i);
  });

  it("freeOnly with enrichment disabled publishes nothing", async () => {
    const draft = fakeDraft();
    const { warns, restore } = captureWarns();
    try {
      const res = await publishCatalog(
        draft,
        { ...baseOpts, freeOnly: true, enrichment: false },
        {
          fetcher: async () => [{ id: "m1" }],
        }
      );
      assert.equal(res.models, 0);
    } finally {
      restore();
    }
    assert.equal(warns.length, 1);
    assert.match(warns[0], /freeOnly.*enrichment|enrichment.*free/i);
  });

  it("freeOnly drops a combo row without an enrichment entry", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, freeOnly: true },
      {
        fetcher: async () => [{ id: "m1" }, { id: "combo-a", owned_by: "combo" }],
        enrichmentFetcher: async () => new Map([["m1", { freeType: "keyless" as const }]]),
      }
    );
    assert.equal(res.models, 1);
    assert.ok(draft.models.has("omniroute/m1"));
    assert.ok(!draft.models.has("omniroute/combo-a"));
  });

  it("toolsOnly keeps only tool-calling models", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, toolsOnly: true },
      {
        fetcher: async () => [
          { id: "with-tools", capabilities: { tool_calling: true } },
          { id: "no-tools" },
        ],
      }
    );
    assert.equal(res.models, 1);
    assert.ok(draft.models.has("omniroute/with-tools"));
    assert.ok(!draft.models.has("omniroute/no-tools"));
  });

  it("toolsOnly drops a combo row lacking tool calls", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, toolsOnly: true },
      {
        fetcher: async () => [
          { id: "pure", owned_by: "combo", capabilities: { tool_calling: true } },
          { id: "mixed", owned_by: "combo" },
        ],
      }
    );
    assert.equal(res.models, 1);
    assert.ok(draft.models.has("omniroute/pure"));
    assert.ok(!draft.models.has("omniroute/mixed"));
  });

  it("visionOnly keeps image-input models from either server convention", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, visionOnly: true },
      {
        fetcher: async () => [
          { id: "img", input_modalities: ["text", "image"] },
          { id: "txt", input_modalities: ["text"] },
          { id: "vis", capabilities: { vision: true } },
        ],
      }
    );
    assert.equal(res.models, 2);
    assert.ok(draft.models.has("omniroute/img"));
    assert.ok(draft.models.has("omniroute/vis"));
    assert.ok(!draft.models.has("omniroute/txt"));
  });

  it("visionOnly drops auto combos (no image input)", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, visionOnly: true },
      {
        fetcher: async () => [],
      }
    );
    // #15392 no longer requests the virtual auto-combo route, so the entry is absent.
    assert.equal((res as { autoCombos?: number }).autoCombos, undefined);
    assert.ok(!draft.models.has("omniroute/auto"));
  });

  it("visibleModels allowlist composes with presets (both subtract)", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, visibleModels: ["a", "b"], toolsOnly: true },
      {
        fetcher: async () => [
          { id: "a", capabilities: { tool_calling: true } },
          { id: "b" },
          { id: "c", capabilities: { tool_calling: true } },
        ],
      }
    );
    assert.equal(res.models, 1);
    assert.ok(draft.models.has("omniroute/a"));
  });

  it("hiddenModels deny wins over presets", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, hiddenModels: ["a"], toolsOnly: true },
      {
        fetcher: async () => [
          { id: "a", capabilities: { tool_calling: true } },
          { id: "b", capabilities: { tool_calling: true } },
        ],
      }
    );
    assert.equal(res.models, 1);
    assert.ok(draft.models.has("omniroute/b"));
  });

  it("usableOnly and presets compose (both subtractive)", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      {
        ...baseOpts,
        usableOnly: true,
        toolsOnly: true,
        enrichment: new Map([
          ["cc/good", { providerAlias: "cc", providerCanonical: "claude" }],
          ["dead/bad", { providerAlias: "dead", providerCanonical: "legacy" }],
          ["cc/plain", { providerAlias: "cc", providerCanonical: "claude" }],
        ]),
      },
      {
        fetcher: async () => [
          { id: "cc/good", capabilities: { tool_calling: true } },
          { id: "dead/bad", capabilities: { tool_calling: true } },
          { id: "cc/plain" },
        ],
        providersFetcher: async () => [
          { id: "c1", provider: "claude", isActive: true, testStatus: "active" },
        ],
      }
    );
    assert.equal(res.models, 1);
    assert.ok(draft.models.has("omniroute/cc/good"));
  });

  it("toolsOnly: false opts out and publishes the full catalog", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, toolsOnly: false },
      {
        fetcher: async () => [
          { id: "paid", capabilities: { tool_calling: true }, input_modalities: ["text", "image"] },
          { id: "plain" },
        ],
      }
    );
    // #15392 stopped publishing auto combos, so counts no longer include autoCombos.
    assert.deepEqual(res, { models: 2 });
  });

  it("presets shrink a large stub catalog below threshold", async () => {
    const stubModels = async () =>
      Array.from({ length: 4000 }, (_, i) => ({
        id: `m${i}`,
        ...(i % 40 === 0 ? { capabilities: { tool_calling: true } } : {}),
        ...(i % 25 === 0 ? { input_modalities: ["text", "image"] } : {}),
      }));
    const freeEnrichment = async () =>
      new Map(
        Array.from({ length: 4000 }, (_, i) =>
          i % 80 === 0 ? [`m${i}`, { freeType: "recurring-monthly" as const }] : undefined
        ).filter((x): x is [`m${number}`, { freeType: "recurring-monthly" }] => x !== undefined)
      );
    // #15392 caps the default view before capability presets run. The `*`
    // sentinel publishes every stub id so these counts measure the preset,
    // not the per-owner showcase slice.
    const allVisible = { visibleModels: ["*"] };
    const draftTools = fakeDraft();
    const resTools = await publishCatalog(
      draftTools,
      { ...baseOpts, toolsOnly: true, ...allVisible },
      { fetcher: stubModels }
    );
    assert.ok(resTools.models < 200, `toolsOnly kept ${resTools.models}`);
    assert.equal(resTools.models, 100);
    const draftVision = fakeDraft();
    const resVision = await publishCatalog(
      draftVision,
      { ...baseOpts, visionOnly: true, ...allVisible },
      { fetcher: stubModels }
    );
    assert.ok(resVision.models < 200, `visionOnly kept ${resVision.models}`);
    assert.equal(resVision.models, 160);
    const draftFree = fakeDraft();
    const resFree = await publishCatalog(
      draftFree,
      { ...baseOpts, freeOnly: true, ...allVisible },
      { fetcher: stubModels, enrichmentFetcher: freeEnrichment }
    );
    assert.ok(resFree.models < 200, `freeOnly kept ${resFree.models}`);
    assert.equal(resFree.models, 50);
  });
});
