import test from "node:test";
import assert from "node:assert/strict";

import { tokensmarketProvider } from "../../open-sse/config/providers/registry/tokensmarket/index.ts";

const { APIKEY_PROVIDERS, AGGREGATOR_PROVIDER_IDS } = await import(
  "../../src/shared/constants/providers.ts"
);
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import(
  "../../open-sse/config/providerRegistry.ts"
);
const { NAMED_OPENAI_STYLE_PROVIDERS, isNamedOpenAIStyleProvider } = await import(
  "../../src/app/api/providers/[id]/models/discovery/providerSets.ts"
);

const SPEC = {
  id: "tokensmarket",
  alias: "tokensmarket",
  name: "Token Market",
  website: "https://www.tokensmarket.ai",
  chatUrl: "https://api.tokensmarket.ai/v1/chat/completions",
  modelsUrl: "https://api.tokensmarket.ai/v1/models",
};

test("Token Market registry entry uses the standard OpenAI-compatible path", () => {
  assert.equal(tokensmarketProvider.id, SPEC.id);
  assert.equal(tokensmarketProvider.alias, SPEC.alias);
  assert.equal(tokensmarketProvider.format, "openai");
  assert.equal(tokensmarketProvider.executor, "default");
  assert.equal(tokensmarketProvider.authType, "apikey");
  assert.equal(tokensmarketProvider.authHeader, "bearer");
  assert.equal(tokensmarketProvider.baseUrl, SPEC.chatUrl);
  assert.equal(tokensmarketProvider.modelsUrl, SPEC.modelsUrl);
  assert.equal(tokensmarketProvider.passthroughModels, true);
  assert.deepEqual(tokensmarketProvider.models, []);
});

test("Token Market is registered in the provider catalog and endpoint map", () => {
  const entry = APIKEY_PROVIDERS[SPEC.id];
  assert.ok(entry, `APIKEY_PROVIDERS.${SPEC.id} must be defined`);
  assert.equal(entry.id, SPEC.id);
  assert.equal(entry.alias, SPEC.alias);
  assert.equal(entry.name, SPEC.name);
  assert.equal(entry.website, SPEC.website);
  assert.equal(entry.passthroughModels, true);
  assert.equal(PROVIDER_ENDPOINTS[SPEC.id], SPEC.chatUrl);
  assert.equal(providerRegistry[SPEC.id], tokensmarketProvider);
});

test("Token Market is classified for aggregator UI and live model discovery", () => {
  assert.equal(AGGREGATOR_PROVIDER_IDS.has(SPEC.id), true);
  assert.equal(NAMED_OPENAI_STYLE_PROVIDERS.has(SPEC.id), true);
  assert.equal(isNamedOpenAIStyleProvider(SPEC.id), true);
});
