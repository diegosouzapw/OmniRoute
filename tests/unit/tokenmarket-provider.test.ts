import test from "node:test";
import assert from "node:assert/strict";

import { tokenmarketProvider } from "../../open-sse/config/providers/registry/tokenmarket/index.ts";

const { APIKEY_PROVIDERS, AGGREGATOR_PROVIDER_IDS } =
  await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { NAMED_OPENAI_STYLE_PROVIDERS, isNamedOpenAIStyleProvider } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");

const SPEC = {
  id: "tokenmarket",
  alias: "tokenmarket",
  name: "Token Market",
  website: "https://www.tokensmarket.ai",
  chatUrl: "https://api.tokensmarket.ai/v1/chat/completions",
  modelsUrl: "https://api.tokensmarket.ai/v1/models",
};

test("Token Market registry entry uses the standard OpenAI-compatible path", () => {
  assert.equal(tokenmarketProvider.id, SPEC.id);
  assert.equal(tokenmarketProvider.alias, SPEC.alias);
  assert.equal(tokenmarketProvider.format, "openai");
  assert.equal(tokenmarketProvider.executor, "default");
  assert.equal(tokenmarketProvider.authType, "apikey");
  assert.equal(tokenmarketProvider.authHeader, "bearer");
  assert.equal(tokenmarketProvider.baseUrl, SPEC.chatUrl);
  assert.equal(tokenmarketProvider.modelsUrl, SPEC.modelsUrl);
  assert.equal(tokenmarketProvider.passthroughModels, true);
  assert.deepEqual(tokenmarketProvider.models, []);
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
  assert.equal(providerRegistry[SPEC.id], tokenmarketProvider);
});

test("Token Market is classified for aggregator UI and live model discovery", () => {
  assert.equal(AGGREGATOR_PROVIDER_IDS.has(SPEC.id), true);
  assert.equal(NAMED_OPENAI_STYLE_PROVIDERS.has(SPEC.id), true);
  assert.equal(isNamedOpenAIStyleProvider(SPEC.id), true);
});
