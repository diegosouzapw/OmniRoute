import assert from "node:assert/strict";
import test from "node:test";

import { deriveConfigFromRegistryModelsUrl } from "../../src/app/api/providers/[id]/models/discoveryConfig.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor, hasSpecializedExecutor } =
  await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");

const providers = [
  ["freeinference", "https://freeinference.org/v1/chat/completions"],
  ["free-ai", "https://api.free.ai/v1/chat/"],
] as const;

for (const [id, endpoint] of providers) {
  test(`${id} is fully wired without a specialized executor`, () => {
    const registry = REGISTRY[id];
    const metadata = APIKEY_PROVIDERS[id];

    assert.ok(registry);
    assert.ok(metadata);
    assert.equal(registry.id, id);
    assert.equal(registry.alias, id);
    assert.equal(registry.baseUrl, endpoint);
    assert.equal(PROVIDER_ENDPOINTS[id], endpoint);
    assert.equal(metadata.id, id);
    assert.equal(metadata.alias, id);
    assert.equal(metadata.hasFree, true);
    assert.equal(metadata.passthroughModels, true);
    assert.equal(AGGREGATOR_PROVIDER_IDS.has(id), true);
    assert.equal(hasSpecializedExecutor(id), false);
    const executor = getExecutor(id);
    assert.ok(executor instanceof DefaultExecutor);
    assert.equal(executor.buildUrl("live-model", false), endpoint);
    assert.equal(isValidModel(id, "future/live-catalog-model"), true);
    assert.deepEqual(registry.models, []);
  });
}

test("Wave 4 model discovery accepts both public catalog response envelopes", () => {
  const freeInferenceDiscovery = deriveConfigFromRegistryModelsUrl("freeinference");
  const freeAiDiscovery = deriveConfigFromRegistryModelsUrl("free-ai");

  assert.ok(freeInferenceDiscovery);
  assert.ok(freeAiDiscovery);
  assert.deepEqual(freeInferenceDiscovery.parseResponse({ data: [{ id: "glm-5.1" }] }), [
    { id: "glm-5.1" },
  ]);
  assert.deepEqual(freeAiDiscovery.parseResponse({ models: [{ id: "qwen7b" }] }), [
    { id: "qwen7b" },
  ]);
});

test("Wave 4 metadata preserves approval, logging and overage warnings", () => {
  assert.match(APIKEY_PROVIDERS.freeinference.freeNote ?? "", /manual approval/i);
  assert.match(APIKEY_PROVIDERS.freeinference.apiHint ?? "", /logging/i);
  assert.match(APIKEY_PROVIDERS["free-ai"].freeNote ?? "", /30,000 tokens\/day/i);
  assert.match(APIKEY_PROVIDERS["free-ai"].freeNote ?? "", /premium external models are paid/i);
  assert.match(APIKEY_PROVIDERS["free-ai"].apiHint ?? "", /\/v1\/chat\//i);
});
