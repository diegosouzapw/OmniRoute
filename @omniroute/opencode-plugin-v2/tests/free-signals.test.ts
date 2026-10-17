import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { publishCatalog } from "../src/catalog.js";
import { inferFreeSignal } from "../src/shared/free-signals.js";
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

type Entry = Record<string, unknown>;

async function run(
  ids: string[],
  enrichment: Map<string, Entry>,
  extra: Record<string, unknown>
): Promise<Map<string, Record<string, any>>> {
  const draft = fakeDraft();
  await publishCatalog(draft, { ...baseOpts, freeOnly: true, ...extra } as never, {
    fetcher: async () => ids.map((id) => ({ id })),
    enrichmentFetcher: async () => enrichment as never,
    combosFetcher: async () => [],
  });
  return draft.models;
}

const zero = { input: 0, output: 0 };
const priced = (alias: string, model: string, p: Entry): [string, Entry] => [
  `${alias}/${model}`,
  { pricing: p, providerAlias: alias, providerCanonical: alias },
];

describe("freeSignals", () => {
  it("default keeps the declared-only rule", async () => {
    const m = await run(["nv/a", "nv/b"], new Map([priced("nv", "a", zero)]), {});
    assert.equal(m.size, 0);
  });

  it("priced admits a zero input and output price and labels it inferred", async () => {
    const m = await run(
      ["nv/a", "nv/b"],
      new Map([priced("nv", "a", zero), priced("nv", "b", { input: 1, output: 0 })]),
      {
        freeSignals: ["declared", "priced"],
      }
    );
    assert.deepEqual([...m.keys()], ["omniroute/nv/a"]);
    assert.match(String(m.get("omniroute/nv/a")?.name), /\(free, inferred\)$/);
  });

  it("priced skips router segments whose zero is a placeholder", async () => {
    const m = await run(
      ["or/auto", "or/auto-beta", "or/free"],
      new Map([
        priced("or", "auto", zero),
        priced("or", "auto-beta", zero),
        priced("or", "free", zero),
      ]),
      { freeSignals: ["priced"] }
    );
    assert.deepEqual([...m.keys()], ["omniroute/or/free"]);
  });

  it("priced does not trust a bare-id price", async () => {
    const m = await run(["nv/a"], new Map([["a", { pricing: zero }]]), { freeSignals: ["priced"] });
    assert.equal(m.size, 0);
  });

  it("priced resolves a canonical prefix through its alias", async () => {
    const m = await run(
      ["nvidia/a"],
      new Map([["nv/a", { pricing: zero, providerAlias: "nv", providerCanonical: "nvidia" }]]),
      {
        freeSignals: ["priced"],
      }
    );
    assert.equal(m.size, 1);
  });

  it("named admits a free suffix only without a price", async () => {
    const m = await run(
      ["p/x-free", "p/y:free", "p/z-free", "p/plain"],
      new Map([priced("p", "z-free", { input: 2, output: 2 })]),
      { freeSignals: ["named"] }
    );
    assert.deepEqual([...m.keys()].sort(), ["omniroute/p/x-free", "omniroute/p/y:free"]);
  });

  it("provider-named admits a -free prefix and listed providers", async () => {
    const m = await run(["llm7-free/a", "ovh/b", "other/c"], new Map(), {
      freeSignals: ["provider-named"],
      freeProviders: ["ovh"],
    });
    assert.deepEqual([...m.keys()].sort(), ["omniroute/llm7-free/a", "omniroute/ovh/b"]);
  });

  it("an explicit positive price vetoes provider-named", async () => {
    const m = await run(
      ["llm7-free/a"],
      new Map([priced("llm7-free", "a", { input: 1, output: 1 })]),
      {
        freeSignals: ["provider-named"],
      }
    );
    assert.equal(m.size, 0);
  });

  it("never promotes a bare id", async () => {
    const m = await run(["x-free"], new Map(), { freeSignals: ["named", "provider-named"] });
    assert.equal(m.size, 0);
  });

  it("a declared classification vetoes inference and keeps its own label", async () => {
    const m = await run(
      ["nv/a", "nv/b"],
      new Map<string, Entry>([
        [
          "nv/a",
          {
            freeType: "one-time-initial",
            pricing: zero,
            providerAlias: "nv",
            providerCanonical: "nv",
          },
        ],
        [
          "nv/b",
          {
            freeType: "recurring-monthly",
            pricing: zero,
            providerAlias: "nv",
            providerCanonical: "nv",
          },
        ],
      ]),
      { freeSignals: ["priced"] }
    );
    assert.deepEqual([...m.keys()], ["omniroute/nv/b"]);
    assert.doesNotMatch(String(m.get("omniroute/nv/b")?.name), /inferred/);
  });

  it("keeps warning on a fully empty overlay when only overlay-based signals are on", async () => {
    const warns: string[] = [];
    const orig = console.warn;
    console.warn = (...a: unknown[]) => void warns.push(String(a[0]));
    try {
      await run(["p/x-free"], new Map(), { freeSignals: ["named"] });
      assert.equal(warns.filter((w) => /freeOnly/.test(w)).length, 1);
      warns.length = 0;
      await run(["p/x-free"], new Map([priced("p", "other", { input: 3, output: 3 })]), {
        freeSignals: ["named"],
      });
      await run(["llm7-free/a"], new Map(), { freeSignals: ["provider-named"] });
    } finally {
      console.warn = orig;
    }
    assert.equal(warns.filter((w) => /freeOnly/.test(w)).length, 0);
  });

  it("a cache price above zero vetoes named", async () => {
    const m = await run(["p/x-free"], new Map([priced("p", "x-free", { cacheRead: 5 })]), {
      freeSignals: ["named"],
    });
    assert.equal(m.size, 0);
  });

  it("a NaN or negative price is not a proven zero", async () => {
    const m = await run(
      ["p/a-free", "p/b-free", "p/c"],
      new Map([
        priced("p", "a-free", { input: Number.NaN }),
        priced("p", "b-free", { input: -1, output: -1 }),
        priced("p", "c", { input: 0, output: Number.NaN }),
      ]),
      { freeSignals: ["named", "priced"] }
    );
    assert.equal(m.size, 0);
  });

  it("a zero price on a -free id is admitted by priced, not by named", async () => {
    const entries = new Map([priced("p", "x-free", zero)]);
    assert.equal((await run(["p/x-free"], entries, { freeSignals: ["named"] })).size, 0);
    assert.equal((await run(["p/x-free"], entries, { freeSignals: ["priced"] })).size, 1);
  });

  it("freeProviders matches an alias and its canonical name in both directions", async () => {
    const e = new Map([
      ["nv/a", { providerAlias: "nv", providerCanonical: "nvidia", pricing: { input: 1 } }],
    ]);
    const viaCanonical = await run(["nvidia/b"], e, {
      freeSignals: ["provider-named"],
      freeProviders: ["nv"],
    });
    const viaAlias = await run(["nv/b"], e, {
      freeSignals: ["provider-named"],
      freeProviders: ["nvidia"],
    });
    assert.equal(viaCanonical.size, 1);
    assert.equal(viaAlias.size, 1);
  });

  it("a classification stored under a bare id of another provider is not read", async () => {
    const m = await run(
      ["a/m"],
      new Map<string, Entry>([
        ["m", { freeType: "one-time-initial", providerAlias: "b" }],
        priced("a", "m", zero),
      ]),
      { freeSignals: ["priced"] }
    );
    assert.equal(m.size, 1);
  });

  it("a router segment anywhere after the provider prefix is skipped by priced", async () => {
    const m = await run(["or/auto/x"], new Map([priced("or", "auto/x", zero)]), {
      freeSignals: ["priced"],
    });
    assert.equal(m.size, 0);
  });

  it("combos with a slash id follow the same signals and label", async () => {
    const draft = fakeDraft();
    await publishCatalog(draft, { ...baseOpts, freeOnly: true, freeSignals: ["priced"] } as never, {
      fetcher: async () => [],
      enrichmentFetcher: async () => new Map([priced("grp", "combo", zero)]) as never,
      combosFetcher: async () => [{ id: "grp/combo", name: "grp/combo", models: [] }] as never,
    });
    const names = [...draft.models.values()].map((m) => String(m.name));
    assert.ok(
      names.every((n) => /\(free, inferred\)$/.test(n)),
      names.join("|")
    );
  });

  it("inferred models publish under the allow-all view too", async () => {
    const m = await run(["nv/a"], new Map([priced("nv", "a", zero)]), {
      freeSignals: ["priced"],
      visibleModels: ["*"],
    });
    assert.deepEqual([...m.keys()], ["omniroute/nv/a"]);
    assert.match(String(m.get("omniroute/nv/a")?.name), /\(free, inferred\)$/);
  });

  it("a restored entry named by usage follows the same signals and label", async () => {
    const ids = Array.from({ length: 10 }, (_v, i) => `nv/filler-${i}`).concat(["nv/target"]);
    const overlay = new Map<string, Entry>([priced("nv", "target", zero)]);
    const draft = fakeDraft();
    await publishCatalog(
      draft,
      {
        ...baseOpts,
        freeOnly: true,
        freeSignals: ["priced"],
        managementReadToken: "m",
      } as never,
      {
        fetcher: async () => ids.map((id) => ({ id })),
        enrichmentFetcher: async () => overlay as never,
        combosFetcher: async () => [],
        usageFetcher: async () => ["nv/target"],
      }
    );
    assert.ok(draft.models.has("omniroute/nv/target"));
    assert.match(String(draft.models.get("omniroute/nv/target")?.name), /\(free, inferred\)$/);
  });

  it("provider-named with a non-empty overlay warns the declared ratio", async () => {
    const warns: string[] = [];
    const orig = console.warn;
    console.warn = (...a: unknown[]) => void warns.push(String(a[0]));
    try {
      await run(["other/a"], new Map([["unrelated/x", { freeType: "keyless" }]]), {
        freeSignals: ["provider-named"],
      });
    } finally {
      console.warn = orig;
    }
    const ratio = warns.find((w) => w.includes("free-tier entries match"));
    assert.ok(ratio, "expected the declared match-ratio warning");
  });
});

describe("freeSignals gate cases", () => {
  it("a discontinued classification at a zero price stays dropped", async () => {
    const m = await run(
      ["nv/a"],
      new Map<string, Entry>([
        [
          "nv/a",
          { freeType: "discontinued", pricing: zero, providerAlias: "nv", providerCanonical: "nv" },
        ],
      ]),
      { freeSignals: ["priced", "named", "provider-named"] }
    );
    assert.equal(m.size, 0);
  });

  it("an auto:free id without a price is published by named", async () => {
    const m = await run(["or/auto:free"], new Map(), { freeSignals: ["named"] });
    assert.deepEqual([...m.keys()], ["omniroute/or/auto:free"]);
  });

  it("a cacheWrite price above zero vetoes named", async () => {
    const m = await run(["p/x-free"], new Map([priced("p", "x-free", { cacheWrite: 5 })]), {
      freeSignals: ["named"],
    });
    assert.equal(m.size, 0);
  });
});

describe("freeSignals options", () => {
  it("defaults to declared-only", async () => {
    const { parsePluginOptions } = await import("../src/options.js");
    const parsed = parsePluginOptions({ baseURL: "https://gw.example.com", apiKey: "k" } as never);
    assert.deepEqual(parsed.freeSignals, ["declared"]);
  });
});

describe("inferFreeSignal", () => {
  it("is false without inferred signals", () => {
    assert.equal(
      inferFreeSignal("p/x-free", {
        signals: ["declared"],
        enrichment: new Map(),
        canonicalToAlias: new Map(),
      }),
      false
    );
  });
});
