import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createReadStream } from "node:fs";
import { publishCatalog } from "../src/catalog.js";
import {
  mapRawModelToModelV2 as sharedMapModel,
  type OmniRouteModelsFetcher,
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

    const fetcher: OmniRouteModelsFetcher = async () => fixture.models;

    const recorded = await loadV1Parity();
    assert.equal(recorded.hookId, "opencode-omniroute", "v1 published under its own provider id");

    const stripX = (k: string): string =>
      k.startsWith("omniroute/") ? k.slice("omniroute/".length) : k;
    const v1Keys = recorded.publishedKeys;

    const draft = fakeDraft();
    const counts = await publishCatalog(draft, TEST_OPTS, { fetcher });
    assert.equal(counts.models, 5);
    assert.deepEqual(counts, { models: 5 });

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

    // The fixture raw model `good-combo` keeps its id key: no combo fetch
    // overwrites it anymore. v1 keyed the same-named combo by slug and let
    // it win over the raw model; v2 serves the `/v1/models` rows as-is.
    assert.ok(
      draft.models.has("omniroute/good-combo"),
      "raw model keeps its id key alongside any same-named server row"
    );
    const v1Models = v1Keys.filter((k) => !k.startsWith("combo-") && k !== "good-combo").sort();
    // Anchor v1 model keys as literals (modulo the slashed-id exclusion
    // documented above: the bare `cc/m-gamma` key fails the
    // `startsWith("omniroute/")` filter and is dropped here).
    assert.deepEqual(v1Models, ["local-delta", "m-alpha", "m-beta"]);
    const v2Models = [...draft.models.keys()]
      .map(stripX)
      .filter((k) => !k.includes("/"))
      .sort();
    assert.deepEqual(v2Models, ["good-combo", "local-delta", "m-alpha", "m-beta"]);
    // Raw-model keys are identical on both sides once the combo keys are
    // removed: v1's `good-combo` entry is the combo overwriting the raw
    // model, v2's is the raw model itself.
    assert.deepEqual(
      v2Models,
      [...v1Models, "good-combo"].sort(),
      "raw model keys parity modulo the v1 combo overwrite"
    );

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
  });

  it("fixture is rejected when it drifts from the 5-model shape (guard against silent shrink)", async () => {
    const fixture = await loadFixture();
    assert.ok(fixture.models.length >= 5, "fixture must keep at least 5 models");
  });
});

void (0 as unknown as ApiAuth);
void (0 as unknown as BetaDraft);
