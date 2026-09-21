import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { CatalogDraft } from "@opencode-ai/plugin/v2/promise";
import type { ModelV2Info, ProviderV2Info } from "@opencode-ai/sdk/v2/types";
import {
  publishCatalog,
  type BinaryCompatModel,
  type BinaryCompatProvider,
  type BinaryCompatVariant,
} from "../src/catalog.js";
import { detectHostContract, emitsLegacyFields } from "../src/compat.js";

/**
 * A host seed shape. `legacy` mirrors `Provider.Info.empty` as observed on
 * `@opencode-ai/cli` 0.0.0-beta-17823; `sdk` mirrors the pinned SDK contract;
 * `bare` is a host that discloses neither.
 */
type SeedKind = "legacy" | "sdk" | "bare";

function providerSeed(id: string, kind: SeedKind): ProviderV2Info {
  if (kind === "legacy") {
    return { id, name: id, activation: "auto", package: "" } as unknown as ProviderV2Info;
  }
  if (kind === "sdk") {
    return { id, name: id, api: { type: "aisdk", package: "", url: "" } } as ProviderV2Info;
  }
  return { id } as ProviderV2Info;
}

function fakeDraft(kind: SeedKind): {
  draft: CatalogDraft;
  providers: Map<string, ProviderV2Info>;
  models: Map<string, ModelV2Info>;
} {
  const providers = new Map<string, ProviderV2Info>();
  const models = new Map<string, ModelV2Info>();
  const draft = {
    provider: {
      list: () => [],
      get: (id: string) => providers.get(id) as never,
      update: (id: string, fn: (p: ProviderV2Info) => void) => {
        const p = providers.get(id) ?? providerSeed(id, kind);
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
  return { draft, providers, models };
}

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
};

const rawModel = {
  id: "af/chat-latest",
  capabilities: { effort_tiers: ["low", "high"] },
};

async function publish(kind: SeedKind) {
  const { draft, providers, models } = fakeDraft(kind);
  await publishCatalog(draft, baseOpts, {
    fetcher: async () => [rawModel],
    combosFetcher: async () => [],
  });
  const provider = providers.get("omniroute");
  const model = models.get("omniroute/af/chat-latest");
  assert.ok(provider, "provider must be published");
  assert.ok(model, "model must be published");
  return { provider: provider as BinaryCompatProvider, model: model as BinaryCompatModel };
}

describe("host contract detection", () => {
  it("reads the contract off the seeded object, not off a version", () => {
    assert.equal(detectHostContract({ id: "x", package: "" }), "legacy-package");
    assert.equal(detectHostContract({ id: "x", api: { type: "aisdk" } }), "sdk-api");
    assert.equal(detectHostContract({ id: "x" }), "unknown");
    assert.equal(detectHostContract({ id: "x", api: {}, package: "" }), "unknown");
    assert.equal(detectHostContract(undefined), "unknown");
    assert.equal(detectHostContract("nope"), "unknown");
  });

  it("publishes the legacy fields for every contract but the sdk one", () => {
    assert.equal(emitsLegacyFields("legacy-package"), true);
    assert.equal(emitsLegacyFields("unknown"), true);
    assert.equal(emitsLegacyFields("sdk-api"), false);
  });
});

describe("legacy-package host (cli 0.0.0-beta-17823)", () => {
  it("publishes package and settings.baseURL on the provider", async () => {
    const { provider } = await publish("legacy");
    assert.equal(provider.api.type, "aisdk");
    assert.equal(provider.package, "aisdk:@ai-sdk/openai-compatible");
    assert.equal(provider.settings.baseURL, "https://gw.example.com/v1");
  });

  it("publishes package, settings.baseURL and headers on the model", async () => {
    const { model } = await publish("legacy");
    if (model.api.type !== "aisdk") throw new Error("model api must be aisdk");
    assert.equal(model.package, `aisdk:${model.api.package}`);
    assert.equal(model.package, "aisdk:@ai-sdk/openai-compatible");
    assert.equal(model.settings.baseURL, model.api.url);
    assert.deepEqual(model.headers, model.request.headers);
  });

  it("publishes each variant in both shapes", async () => {
    const { model } = await publish("legacy");
    const variants = model.variants as BinaryCompatVariant[];
    assert.deepEqual(
      variants.map((v) => v.id),
      ["low", "high"]
    );
    for (const variant of variants) {
      assert.deepEqual(variant.settings, { reasoningEffort: variant.id });
      // The pinned-contract shape stays intact next to the legacy one.
      assert.deepEqual(variant.body, { reasoningEffort: variant.id });
      assert.deepEqual(variant.headers, {});
    }
  });
});

describe("sdk-api host", () => {
  it("publishes the api block only, with no legacy field", async () => {
    const { provider, model } = await publish("sdk");
    assert.equal(provider.api.type, "aisdk");
    assert.equal("package" in provider, false);
    assert.equal("settings" in provider, false);
    assert.equal("package" in model, false);
    assert.equal("settings" in model, false);
    assert.equal("headers" in model, false);
    for (const variant of model.variants) {
      assert.equal("settings" in variant, false);
      assert.deepEqual(variant.body, { reasoningEffort: variant.id });
    }
  });
});

describe("undisclosed host contract", () => {
  it("falls back to the superset so an unknown host still routes", async () => {
    const { provider, model } = await publish("bare");
    assert.equal(provider.package, "aisdk:@ai-sdk/openai-compatible");
    assert.equal(model.package, "aisdk:@ai-sdk/openai-compatible");
    assert.ok(model.settings.baseURL);
    assert.ok(model.api);
  });
});
