import assert from "node:assert/strict";
import test from "node:test";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");

const providers = [
  ["zylo-api", "zylo", "https://api.zyloai.net/v1/chat/completions"],
  ["unorouter", "unorouter", "https://api.unorouter.com/v1/chat/completions"],
  ["poolside", "poolside", "https://inference.poolside.ai/v1/chat/completions"],
  ["fastrouter", "fastrouter", "https://api.fastrouter.ai/api/v1/chat/completions"],
  ["anyapi", "anyapi", "https://api.anyapi.ai/v1/chat/completions"],
  ["electronhub", "electronhub", "https://api.electronhub.ai/v1/chat/completions"],
  ["llmgateway", "llmgateway", "https://api.llmgateway.io/v1/chat/completions"],
  ["llm-kiwi", "llmkiwi", "https://api.llm.kiwi/v1/chat/completions"],
] as const;

for (const [id, alias, endpoint] of providers) {
  test(`${id} is wired through registry, metadata, endpoint and default executor`, () => {
    const registry = REGISTRY[id];
    const metadata = APIKEY_PROVIDERS[id];

    assert.ok(registry);
    assert.ok(metadata);
    assert.equal(registry.id, id);
    assert.equal(registry.alias, alias);
    assert.equal(registry.baseUrl, endpoint);
    assert.equal(PROVIDER_ENDPOINTS[id], endpoint);
    assert.equal(metadata.id, id);
    assert.equal(metadata.alias, alias);
    assert.equal(metadata.hasFree, true);
    assert.equal(metadata.passthroughModels, true);
    assert.ok(typeof metadata.freeNote === "string" && metadata.freeNote.length > 0);
    assert.ok(getExecutor(id) instanceof DefaultExecutor);
    assert.equal(isValidModel(id, "future/live-catalog-model"), true);
    assert.equal(isValidModel(alias, "future/live-catalog-model"), true);
  });
}

test("gateway providers are classified as aggregators while direct Poolside is not", () => {
  const gatewayIds = providers.map(([id]) => id).filter((id) => id !== "poolside");
  for (const id of gatewayIds) assert.equal(AGGREGATOR_PROVIDER_IDS.has(id), true);
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("poolside"), false);
});

test("LLM.Kiwi statically exposes only the confirmed Free plan models", () => {
  assert.deepEqual(REGISTRY["llm-kiwi"].models, [
    { id: "auto", name: "Auto" },
    { id: "hrLLM", name: "hrLLM" },
  ]);
});
