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

interface Captured {
  models: Map<string, Record<string, any>>;
  draft: BetaDraft;
  warns: string[];
  restore: () => void;
}

function fakeDraft(): Captured {
  const providers = new Map<string, Record<string, any>>();
  const models = new Map<string, Record<string, any>>();
  const warns: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warns.push(String(args[0]));
  };
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
  modelCacheTtlMs: 300000,
  usableOnly: false,
};

describe("catalog nested combo refs", () => {
  it("resolves a forward combo-ref: parent LCD follows the nested combo, not zero", async () => {
    const c = fakeDraft();
    try {
      const res = await publishCatalog(c.draft, baseOpts, {
        fetcher: async () => [
          {
            id: "a",
            context_length: 100000,
            max_output_tokens: 4000,
            capabilities: { tool_calling: true, reasoning: true },
          },
          {
            id: "b",
            context_length: 50000,
            max_output_tokens: 2000,
            capabilities: { tool_calling: true, reasoning: true },
          },
        ],
        combosFetcher: async () => [
          {
            id: "parent",
            name: "Parent",
            models: [
              { kind: "combo-ref", comboName: "Child" } as never,
              { kind: "model", model: "a" } as never,
            ],
          },
          {
            id: "child",
            name: "Child",
            models: [{ kind: "model", model: "b" } as never],
          },
        ],
      });
      assert.deepEqual(res, { models: 2, combos: 2, autoCombos: 0 });
      const parent = c.models.get("omniroute/parent");
      assert.ok(parent);
      assert.equal(parent?.limit.context, 50000);
      assert.equal(parent?.limit.output, 2000);
      assert.equal(parent?.capabilities.tools, true);
    } finally {
      c.restore();
    }
  });

  it("drops an unresolvable combo-ref after the fixpoint instead of claiming empty LCD", async () => {
    const c = fakeDraft();
    try {
      const res = await publishCatalog(c.draft, baseOpts, {
        fetcher: async () => [{ id: "a" }],
        combosFetcher: async () => [
          {
            id: "orphan",
            name: "Orphan",
            models: [{ kind: "combo-ref", comboName: "Missing" } as never],
          },
        ],
      });
      assert.deepEqual(res, { models: 1, combos: 0, autoCombos: 0 });
      assert.ok(!c.models.has("omniroute/orphan"));
      assert.ok(c.warns.some((w) => w.includes("could not resolve")));
    } finally {
      c.restore();
    }
  });

  it("resolves a two-level chain within the pass budget", async () => {
    const c = fakeDraft();
    try {
      await publishCatalog(c.draft, baseOpts, {
        fetcher: async () => [
          {
            id: "a",
            context_length: 80000,
            max_output_tokens: 3000,
            capabilities: { tool_calling: true },
          },
        ],
        combosFetcher: async () => [
          {
            id: "top",
            name: "Top",
            models: [{ kind: "combo-ref", comboName: "Mid" } as never],
          },
          {
            id: "mid",
            name: "Mid",
            models: [{ kind: "combo-ref", comboName: "Leaf" } as never],
          },
          {
            id: "leaf",
            name: "Leaf",
            models: [{ kind: "model", model: "a" } as never],
          },
        ],
      });
      const top = c.models.get("omniroute/top");
      assert.ok(top);
      assert.equal(top?.limit.context, 80000);
    } finally {
      c.restore();
    }
  });
});

describe("catalog collision dedupe", () => {
  it("warns once per key even across repeated publishes sharing collisionWarned", async () => {
    const c = fakeDraft();
    try {
      const collisionWarned = new Set<string>();
      const args = {
        fetcher: async () => [{ id: "dupe" }],
        combosFetcher: async () => [
          { id: "dupe", name: "Dupe Combo", models: [{ kind: "model", model: "dupe" } as never] },
        ],
      };
      await publishCatalog(c.draft, { ...baseOpts, collisionWarned }, args);
      await publishCatalog(c.draft, { ...baseOpts, collisionWarned }, args);
      const hits = c.warns.filter((w) => w.includes("collides with a model id"));
      assert.equal(hits.length, 1);
    } finally {
      c.restore();
    }
  });

  it("suppresses the warning for the intentional dedup pattern", async () => {
    const c = fakeDraft();
    try {
      // v1 pattern: /v1/models pre-mirrors the combo under its friendly
      // NAME and the combo is keyed by that name, so the overwritten model
      // id equals the combo name exactly and the draft key collides.
      const res = await publishCatalog(c.draft, baseOpts, {
        fetcher: async () => [{ id: "omniroute/Mirror Combo" }],
        combosFetcher: async () => [
          {
            id: "Mirror Combo",
            name: "Mirror Combo",
            models: [{ kind: "model", model: "omniroute/Mirror Combo" } as never],
          },
        ],
      });
      assert.deepEqual(res, { models: 1, combos: 1, autoCombos: 0 });
      assert.ok(!c.warns.some((w) => w.includes("collides")));
      assert.equal(c.models.get("omniroute/Mirror Combo")?.name, "Mirror Combo");
    } finally {
      c.restore();
    }
  });

  it("shares the dedupe set when the caller passes collisionWarned", async () => {
    const c = fakeDraft();
    try {
      const collisionWarned = new Set<string>();
      const args = {
        fetcher: async () => [{ id: "other" }],
        combosFetcher: async () => [
          {
            id: "other",
            name: "Other Combo",
            models: [{ kind: "model", model: "other" } as never],
          },
        ],
      };
      await publishCatalog(c.draft, { ...baseOpts, collisionWarned }, args);
      await publishCatalog(c.draft, { ...baseOpts, collisionWarned }, args);
      const hits = c.warns.filter((w) => w.includes("collides with a model id"));
      assert.equal(hits.length, 1);
    } finally {
      c.restore();
    }
  });
});
