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
  {
    id: "void-ai",
    endpoint: "https://api.voidai.app/v1/chat/completions",
    modelsUrl: "https://api.voidai.app/v1/models",
    hasFree: true,
  },
  {
    id: "helixmind",
    endpoint: "https://helixmind.online/v1/chat/completions",
    modelsUrl: "https://helixmind.online/v1/models",
    hasFree: false,
  },
] as const;

for (const { id, endpoint, modelsUrl, hasFree } of providers) {
  test(`${id} is fully wired through the public provider interfaces`, async () => {
    const registry = REGISTRY[id];
    const metadata = APIKEY_PROVIDERS[id];

    assert.ok(registry);
    assert.ok(metadata);
    assert.equal(registry.id, id);
    assert.equal(registry.alias, id);
    assert.equal(registry.format, "openai");
    assert.equal(registry.executor, "default");
    assert.equal(registry.authType, "apikey");
    assert.equal(registry.authHeader, "bearer");
    assert.equal(registry.baseUrl, endpoint);
    assert.equal(registry.modelsUrl, modelsUrl);
    assert.equal(registry.passthroughModels, true);
    assert.deepEqual(registry.models, []);

    assert.equal(PROVIDER_ENDPOINTS[id], endpoint);
    assert.equal(metadata.id, id);
    assert.equal(metadata.alias, id);
    assert.equal(metadata.hasFree, hasFree);
    assert.equal(metadata.passthroughModels, true);
    assert.equal(AGGREGATOR_PROVIDER_IDS.has(id), true);
    assert.equal(hasSpecializedExecutor(id), false);

    const executor = await getExecutor(id);
    assert.ok(executor instanceof DefaultExecutor);
    assert.equal(executor.buildUrl("live-model", false), endpoint);
    assert.equal(isValidModel(id, "future/live-catalog-model"), true);

    const discovery = deriveConfigFromRegistryModelsUrl(id);
    assert.ok(discovery);
    assert.equal(discovery.url, modelsUrl);
    assert.deepEqual(discovery.parseResponse({ object: "list", data: [{ id: "live-model" }] }), [
      { id: "live-model" },
    ]);
  });
}

test("Void AI metadata keeps the free-plan signal conditional", () => {
  const metadata = APIKEY_PROVIDERS["void-ai"];

  assert.match(metadata.freeNote ?? "", /free plan/i);
  assert.match(metadata.freeNote ?? "", /conditional/i);
  assert.match(metadata.freeNote ?? "", /no numeric quota/i);
  assert.match(metadata.apiHint ?? "", /authentication.*account.*terms/i);
});

test("HelixMind exposes its verified alternate API surfaces without reviving old quota claims", () => {
  const registry = REGISTRY.helixmind;
  const metadata = APIKEY_PROVIDERS.helixmind;

  assert.equal(registry.responsesBaseUrl, "https://helixmind.online/v1/responses");
  assert.deepEqual(registry.alternateFormats, [
    {
      format: "claude",
      baseUrl: "https://helixmind.online/v1/messages",
      authHeader: "x-api-key",
      label: "Anthropic-compatible",
    },
    {
      format: "openai-responses",
      baseUrl: "https://helixmind.online/v1/responses",
      authHeader: "bearer",
      label: "OpenAI Responses",
    },
  ]);
  assert.match(metadata.freeNote ?? "", /3 RPM\/50 RPD/i);
  assert.match(metadata.freeNote ?? "", /no-card/i);
  assert.match(metadata.freeNote ?? "", /not confirmed/i);
  assert.doesNotMatch(metadata.freeNote ?? "", /free forever|unlimited/i);
});
