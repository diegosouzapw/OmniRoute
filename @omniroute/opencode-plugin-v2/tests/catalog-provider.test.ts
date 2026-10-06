import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { collectCatalog, type ResolvedOptions } from "../src/catalog.js";
import { parsePluginOptions, toResolvedOptions } from "../src/options.js";
import type { Logger } from "../src/shared/logger.js";

function silentLogger(warns: string[]): Logger {
  return {
    error: () => {},
    warn: (msg: string) => {
      warns.push(String(msg));
    },
    info: () => {},
    debug: () => {},
    always: () => {},
    child: () => silentLogger(warns),
  } as unknown as Logger;
}

function resolvedWith(
  raw: Record<string, unknown>,
  warns: string[],
  extra?: Partial<ResolvedOptions>
): ResolvedOptions {
  // Real option resolution path: parse, then the catalog-shaping copy in
  // `../src/options.js` (re-exported by the entrypoint). Run with
  // `node --import tsx/esm --test` from the package directory.
  const parsed = parsePluginOptions({ baseURL: "https://gw.example.com", ...raw });
  const resolved = toResolvedOptions(parsed);
  resolved.logger = silentLogger(warns);
  resolved.modelCacheTtlMs = 300000;
  return { ...resolved, ...extra };
}

function enrichmentOf(...pairs: Array<[string, string]>) {
  return new Map(
    pairs.map(([alias, canonical]) => [
      `${alias}/model-x`,
      { providerAlias: alias, providerCanonical: canonical },
    ])
  );
}

const stubModels = async () => [{ id: "cc/a" }, { id: "alpha/b" }];
const stubCombos = async () => [
  {
    id: "mix",
    name: "Mix",
    models: [
      { kind: "model", model: "cc/a" },
      { kind: "model", model: "alpha/b" },
    ],
  },
];

function baseFetchers() {
  return {
    models: stubModels,
    combos: stubCombos,
    providers: async () => [],
    enrichment: async () => enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
  };
}

describe("provider filter integration (real option resolution)", () => {
  it("empty/absent allowlist publishes the full catalog with no warning", async () => {
    for (const raw of [{}, { providersAllow: [] }]) {
      const warns: string[] = [];
      const collected = await collectCatalog(
        resolvedWith(raw, warns, {
          enrichment: enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
        }),
        baseFetchers()
      );
      assert.equal(collected.counts.models, 2);
      assert.equal(collected.counts.combos, 1);
      assert.deepEqual(collected.counts, { models: 2, combos: 1 });
      assert.equal(
        warns.filter((w) => w.includes("providersAllow") || w.includes("provider filter")).length,
        0
      );
    }
  });

  it("single provider keeps only its models and combos via alias", async () => {
    const warns: string[] = [];
    const collected = await collectCatalog(
      resolvedWith({ providersAllow: ["claude"] }, warns, {
        enrichment: enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      }),
      baseFetchers()
    );
    assert.equal(collected.counts.models, 1);
    assert.ok([...collected.entries.keys()].some((k) => k.endsWith("/cc/a")));
    // Mixed combo survives: one member resolves through the alias.
    assert.equal(collected.counts.combos, 1);
    assert.deepEqual(collected.counts, { models: 1, combos: 1 });
  });

  it("keeps the full catalog when the allowlist names nothing known", async () => {
    const warns: string[] = [];
    // An allow name outside the vocabulary filters nothing: it warns once
    // and every entry keeps (fail-open on the unknown NAME, same bias as
    // unknown catalog prefixes).
    const sharedWarned = new Set<string>();
    const opts = resolvedWith({ providersAllow: ["nope"] }, warns, {
      enrichment: enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      collisionWarned: sharedWarned,
    });
    const first = await collectCatalog(opts, baseFetchers());
    assert.equal(first.counts.models, 2);
    assert.equal(first.counts.combos, 1);
    assert.deepEqual(first.counts, { models: 2, combos: 1 });
    assert.equal(warns.filter((w) => w.includes("unknown provider")).length, 1);
    const second = await collectCatalog(opts, baseFetchers());
    assert.equal(second.counts.models, 2);
    assert.equal(warns.filter((w) => w.includes("unknown provider")).length, 1);
  });

  it("unknown provider warns once while a known sibling still filters", async () => {
    const warns: string[] = [];
    // An unknown allow entry warns and filters nothing for THAT name; the
    // known sibling still restricts. Fail-open is per-name, not whole-filter.
    const sharedWarned = new Set<string>();
    const opts = resolvedWith({ providersAllow: ["mystery", "claude"] }, warns, {
      enrichment: enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      collisionWarned: sharedWarned,
    });
    const first = await collectCatalog(opts, baseFetchers());
    assert.equal(first.counts.models, 1);
    assert.equal(first.counts.combos, 1);
    assert.deepEqual(first.counts, { models: 1, combos: 1 });
    assert.equal(warns.filter((w) => w.includes("unknown provider")).length, 1);
    const second = await collectCatalog(opts, baseFetchers());
    assert.equal(second.counts.models, 1);
    assert.equal(warns.filter((w) => w.includes("unknown provider")).length, 1);
  });

  it("filter matching nothing publishes empty with an explicit warning", async () => {
    const warns: string[] = [];
    // "alpha" is KNOWN to the vocabulary (enrichment pair alpha/alpha) but
    // absent from the catalog rows, so the filter is active yet drops the
    // only model: empty catalog + explicit warning, no silent fallback.
    const collected = await collectCatalog(
      resolvedWith({ providersAllow: ["alpha"] }, warns, {
        enrichment: enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      }),
      {
        models: async () => [{ id: "cc/a" }],
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      }
    );
    assert.equal(collected.entries.size, 0);
    assert.ok(warns.some((w) => w.includes("matched nothing")));
  });

  it("drops a combo whose only member is excluded", async () => {
    const warns: string[] = [];
    const collected = await collectCatalog(
      resolvedWith({ providersAllow: ["alpha"] }, warns, {
        enrichment: enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      }),
      {
        models: async () => [{ id: "cc/a" }, { id: "alpha/b" }],
        combos: async () => [
          { id: "cc-only", name: "CcOnly", models: [{ kind: "model", model: "cc/a" }] },
        ],
        providers: async () => [],
        enrichment: async () => enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      }
    );
    assert.equal(collected.counts.combos, 0);
    assert.ok([...collected.entries.keys()].some((k) => k.endsWith("/alpha/b")));
  });

  it("combo-ref-only combos survive the filter", async () => {
    const warns: string[] = [];
    const collected = await collectCatalog(
      resolvedWith({ providersAllow: ["claude"] }, warns, {
        enrichment: enrichmentOf(["cc", "claude"]),
      }),
      {
        models: async () => [{ id: "cc/a" }],
        combos: async () => [
          { id: "child", name: "Child", models: [{ kind: "model", model: "cc/a" }] },
          { id: "parent", name: "Parent", models: [{ kind: "combo-ref", comboName: "Child" }] },
        ],
        providers: async () => [],
        enrichment: async () => enrichmentOf(["cc", "claude"]),
      }
    );
    assert.equal(collected.counts.combos, 2);
  });

  it("composes with visibleModels by AND (provider applies last)", async () => {
    const warns: string[] = [];
    const collected = await collectCatalog(
      resolvedWith({ visibleModels: ["cc/*"], providersAllow: ["alpha"] }, warns, {
        enrichment: enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      }),
      baseFetchers()
    );
    assert.equal(collected.counts.models, 0);
    assert.equal(warns.filter((w) => w.includes("unknown provider")).length, 0);
  });

  it("empty upstream plus active filter emits no matched-nothing warning", async () => {
    const warns: string[] = [];
    const collected = await collectCatalog(
      resolvedWith({ providersAllow: ["claude"] }, warns, {
        enrichment: enrichmentOf(["cc", "claude"]),
      }),
      {
        models: async () => [],
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => enrichmentOf(["cc", "claude"]),
      }
    );
    assert.equal(collected.entries.size, 0);
    assert.equal(warns.filter((w) => w.includes("matched nothing")).length, 0);
  });

  it("vocabulary-free run warns and keeps the full catalog", async () => {
    const warns: string[] = [];
    // No vocabulary means the filter stays inert: nothing is compared, every
    // entry keeps, and the run warns once that the full catalog is kept.
    const collected = await collectCatalog(
      resolvedWith({ providersAllow: ["alpha"] }, warns, { enrichment: new Map() }),
      {
        models: async () => [{ id: "cc/a" }, { id: "alpha/b" }],
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => new Map(),
      }
    );
    assert.equal(collected.counts.models, 2);
    assert.equal(warns.filter((w) => w.includes("no provider vocabulary")).length, 1);
    assert.equal(warns.filter((w) => w.includes("unknown provider")).length, 0);
  });

  it("ignores a retired fetcher entry the refresh no longer reads", async () => {
    const warns: string[] = [];
    const collected = await collectCatalog(
      resolvedWith({ providersAllow: ["claude"] }, warns, {
        enrichment: enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      }),
      {
        models: async () => [{ id: "cc/a" }],
        combos: async () => [],
        autoCombos: async () => [{ id: "auto", candidatePool: ["alpha"] }],
        providers: async () => [],
        enrichment: async () => enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      } as never
    );
    assert.equal(collected.counts.models, 1);
    assert.deepEqual(collected.counts, { models: 1, combos: 0 });
  });

  it("scales N+N models through the real pipeline", async () => {
    const N = 500;
    // The default view now caps entries per provider (#15484); the scale case wants all N.
    const models: Array<{ id: string }> = [];
    for (let i = 0; i < N; i++) models.push({ id: `cc/m-${i}` });
    for (let i = 0; i < N; i++) models.push({ id: `alpha/m-${i}` });
    const warns: string[] = [];
    const collected = await collectCatalog(
      resolvedWith({ providersAllow: ["claude"], showcasePerOwner: N, freshPerOwner: N }, warns, {
        enrichment: enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      }),
      {
        models: async () => models,
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      }
    );
    assert.equal(collected.counts.models, N);
  });
});
