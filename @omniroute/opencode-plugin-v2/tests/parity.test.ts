import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createReadStream } from "node:fs";
import { publishCatalog } from "../src/catalog.js";
import {
  mapComboToModelV2 as sharedMapCombo,
  mapRawModelToModelV2 as sharedMapModel,
  type OmniRouteCombosFetcher,
  type OmniRouteModelsFetcher,
  type OmniRouteRawCombo,
  type OmniRouteRawModelEntry,
} from "../src/shared/index.js";
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

interface Fixture {
  models: OmniRouteRawModelEntry[];
  combos: OmniRouteRawCombo[];
}

/**
 * What the v1 plugin produces for the same fixture, recorded in
 * `fixtures/v1-parity.json`. Running v1 here instead would mean importing its
 * build output from a sibling package: it only exists on a machine that has
 * built v1, so the check silently passed locally and could not run in CI at
 * all. Recording it makes the claim reviewable in the diff and reproducible
 * anywhere.
 */
interface V1Parity {
  v1PluginVersion: string;
  hookId: string;
  publishedKeys: string[];
  comboSlugs: string[];
  mappedModels: Record<string, unknown>;
  mappedCombos: Record<string, unknown>;
}

async function loadFixture(): Promise<Fixture> {
  const chunks: Buffer[] = [];
  for await (const chunk of createReadStream(new URL("./fixtures/catalog.json", import.meta.url))) {
    chunks.push(chunk as Buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as Fixture;
}

async function loadV1Parity(): Promise<V1Parity> {
  const chunks: Buffer[] = [];
  for await (const chunk of createReadStream(
    new URL("./fixtures/v1-parity.json", import.meta.url)
  )) {
    chunks.push(chunk as Buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as V1Parity;
}

type ApiAuth = { type: "api"; key: string };

function fakeDraft() {
  const providers = new Map<string, Record<string, any>>();
  const models = new Map<string, Record<string, any>>();
  return {
    providers,
    models,
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

const TEST_OPTS = {
  baseURL: "https://gw.example.com",
  providerId: "omniroute",
  apiKey: "parity-key",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false as const,
};

describe("v1-vs-v2 catalog parity", () => {
  it("same fixture models publish the same key set modulo documented exclusions", async () => {
    const fixture = await loadFixture();
    assert.equal(fixture.models.length, 5);
    assert.equal(fixture.combos.length, 2);

    const fetcher: OmniRouteModelsFetcher = async () => fixture.models;
    const combosFetcher: OmniRouteCombosFetcher = async () => fixture.combos;

    const recorded = await loadV1Parity();
    assert.equal(recorded.hookId, "opencode-omniroute", "v1 published under its own provider id");

    const stripX = (k: string): string =>
      k.startsWith("omniroute/") ? k.slice("omniroute/".length) : k;
    const v1Keys = recorded.publishedKeys;

    const draft = fakeDraft();
    const counts = await publishCatalog(draft, TEST_OPTS, { fetcher, combosFetcher });
    assert.equal(counts.models, 5);
    assert.equal(counts.combos, 2);
    assert.deepEqual(counts, { models: 5, combos: 2 });

    // Final converted Record<string, any> shape (legacy→info boundary in
    // src/catalog.ts assignModelFields): api resolves to the
    // openai-compatible AISDK block, capabilities fold tool_calling into
    // tools, cost is zeroed (pricing lives server-side).
    const mAlpha = draft.models.get("omniroute/m-alpha");
    assert.ok(mAlpha, "m-alpha published in v2 draft");
    assert.equal(mAlpha.api.type, "aisdk");
    if (mAlpha.api.type !== "aisdk") throw new Error("m-alpha api must be aisdk");
    assert.equal(mAlpha.api.package, "@ai-sdk/openai-compatible");
    assert.equal(mAlpha.capabilities.tools, true);
    assert.equal(mAlpha.cost[0].input, 0);

    // Measured key shapes: v1 namespaces the friendly name
    // (`Combo Fast` -> `omniroute/combo-fast`) and keys the colliding combo
    // by its raw id (`good-combo` -> `omniroute/good-combo`, combo wins over
    // the same-named raw model). v2 publishes combos under their advertised
    // NAME verbatim (`Combo Fast` -> `omniroute/Combo Fast`,
    // `Good Combo` -> `omniroute/Good Combo`) — the string GET /v1/models
    // advertises and POST /v1/chat/completions routes (getComboByName), so
    // the raw model at `omniroute/good-combo` no longer collides with the
    // combo and survives alongside it. The raw-model key set is therefore
    // still identical on both sides; only the combo keys intentionally
    // diverge (slug vs advertised name).
    const v1Combo = v1Keys.filter((k) => k.startsWith("combo-") || k === "good-combo").sort();
    const comboNameKeys = new Set(["Combo Fast", "Good Combo"]);
    const v2Combo = [...draft.models.keys()]
      .map(stripX)
      .filter((k) => comboNameKeys.has(k))
      .sort();
    // slug("Combo Fast") = "combo-fast", slug("Good Combo") = "good-combo".
    assert.deepEqual(v1Combo, ["combo-fast", "good-combo"]);
    assert.deepEqual(v2Combo, ["Combo Fast", "Good Combo"]);
    assert.deepEqual(recorded.comboSlugs, ["combo-fast", "good-combo"]);
    const v1Models = v1Keys.filter((k) => !k.startsWith("combo-") && k !== "good-combo").sort();
    // Anchor v1 model keys as literals (modulo the slashed-id exclusion
    // documented above: the bare `cc/m-gamma` key fails the
    // `startsWith("omniroute/")` filter and is dropped here).
    assert.deepEqual(v1Models, ["local-delta", "m-alpha", "m-beta"]);
    const v2Models = [...draft.models.keys()]
      .map(stripX)
      .filter((k) => !k.includes("/") && !comboNameKeys.has(k))
      .sort();
    assert.deepEqual(v2Models, ["good-combo", "local-delta", "m-alpha", "m-beta"]);
    // Raw-model keys are identical on both sides once the combo keys are
    // removed: v1's `good-combo` entry is the combo overwriting the raw
    // model, v2's is the raw model itself (the combo moved to its name key).
    assert.deepEqual(
      v2Models,
      [...v1Models, "good-combo"].sort(),
      "raw model keys parity modulo the v1 combo overwrite"
    );

    // Under v2 the combo is published under its advertised name and the
    // same-id raw model survives untouched; the accidental-collision class
    // the v1 warn was written for no longer exists (no warn expected).
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const draft2 = fakeDraft();
      await publishCatalog(draft2, TEST_OPTS, { fetcher, combosFetcher });
      assert.ok(draft2.models.has("omniroute/Good Combo"), "combo keyed by its name in v2");
      assert.ok(
        draft2.models.has("omniroute/good-combo"),
        "raw model keeps its id key alongside the combo"
      );
    } finally {
      console.warn = origWarn;
    }
    assert.ok(!warns.some((w) => w.includes("collides with a model id")));

    // Mapper-level parity for the slashed-id exclusion: v1 and shared mappers
    // must produce identical ModelV2 payloads for every fixture entry.
    // (No apiFormat on either side — the parity scope is key publication,
    // not the v1-prefix vs v2-allowlist routing rule covered by A2 tests.
    // The `cc/m-gamma` fixture entry is therefore EXCLUDED from the mapper
    // comparison: v1 routes it to anthropic via its default
    // anthropicPrefixes while shared/v2 leave it openai-compatible without
    // an explicit anthropicModels allowlist.)
    // Mapper parity for the slashed-id exclusion: shared must still produce
    // the payloads v1 produced. (`cc/m-gamma` is excluded: v1 routes it to
    // anthropic through its default prefix list, while v2 leaves it
    // openai-compatible without an explicit allowlist — covered by the
    // apiFormat tests.)
    for (const entry of fixture.models.filter((m) => m.id !== "cc/m-gamma")) {
      const expected = recorded.mappedModels[entry.id];
      assert.ok(expected, `v1 output recorded for ${entry.id}`);
      const viaShared = sharedMapModel(entry, {
        providerId: "omniroute",
        baseURL: TEST_OPTS.baseURL,
      });
      assert.deepEqual(
        JSON.parse(JSON.stringify({ ...viaShared, providerID: undefined })),
        JSON.parse(JSON.stringify({ ...(expected as object), providerID: undefined })),
        `model mapper parity for ${entry.id}`
      );
    }
    const byId = new Map(fixture.models.map((m) => [m.id, m]));
    for (const combo of fixture.combos) {
      const members = (combo.models ?? [])
        .filter((s) => s?.kind !== "combo-ref" && typeof s?.model === "string")
        .map((s) => byId.get(s.model as string))
        .filter((m): m is OmniRouteRawModelEntry => m !== undefined);
      const viaSharedFull = sharedMapCombo(combo, members, "omniroute", TEST_OPTS.baseURL);
      const expected = recorded.mappedCombos[combo.id];
      assert.ok(expected, `v1 output recorded for ${combo.id}`);
      // The combo mapper now publishes `id: combo.name` (the advertised name
      // GET /v1/models routes — see combos-map.ts comment); v1 used the slug
      // of the name (`combo-fast`/`good-combo`). Strip `id` before comparing
      // so the payload parity stays focused on capabilities/limits/api.
      const viaShared = JSON.parse(JSON.stringify({ ...viaSharedFull, providerID: undefined }));
      const exp = JSON.parse(JSON.stringify({ ...(expected as object), providerID: undefined }));
      const sharedId: string = viaSharedFull.id;
      const expectedId: string = (expected as { id: string }).id;
      assert.equal(
        sharedId,
        combo.name ?? combo.id,
        `combo advertised id is its name for ${combo.id}`
      );
      delete (viaShared as { id?: unknown }).id;
      delete (exp as { id?: unknown }).id;
      assert.deepEqual(viaShared, exp, `combo mapper parity (minus id) for ${combo.id}`);
      assert.notEqual(sharedId, expectedId, `v1-vs-v2 id divergence documented for ${combo.id}`);
    }
  });

  it("fixture is rejected when it drifts from the 5+2 shape (guard against silent shrink)", async () => {
    const fixture = await loadFixture();
    assert.ok(fixture.models.length >= 5, "fixture must keep at least 5 models");
    assert.ok(fixture.combos.length >= 2, "fixture must keep at least 2 combos");
  });
});

void (0 as unknown as ApiAuth);
void (0 as unknown as BetaDraft);
