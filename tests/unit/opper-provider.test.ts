import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");

const OPPER_CHAT_URL = "https://api.opper.ai/v3/compat/chat/completions";
const OPPER_MODELS_URL = "https://api.opper.ai/v3/compat/models";

test("opper is registered as an API-key gateway provider", () => {
  const entry = APIKEY_PROVIDERS.opper;
  assert.ok(entry, "APIKEY_PROVIDERS.opper must be defined");
  assert.equal(entry.id, "opper");
  assert.equal(entry.alias, "opper");
  assert.equal(entry.name, "Opper");
  assert.equal(entry.website, "https://opper.ai");
  assert.equal(entry.passthroughModels, true);
});

test("opper registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.opper;
  assert.ok(entry, "providerRegistry.opper must be defined");
  assert.equal(entry.id, "opper");
  assert.equal(entry.alias, "opper");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, OPPER_CHAT_URL);
  assert.equal(entry.modelsUrl, OPPER_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("opper ships no static model seed — relies fully on passthrough + live catalog", () => {
  assert.deepEqual(providerRegistry.opper.models, []);
});

test("opper accepts provider/model ids via passthrough (OpenAI, Anthropic, DeepSeek, Mistral behind one key)", () => {
  assert.equal(isValidModel("opper", "anthropic/claude-sonnet-4-6"), true);
  assert.equal(isValidModel("opper", "openai/gpt-5"), true);
  assert.equal(isValidModel("opper", "deepseek/deepseek-v4-pro"), true);
  assert.equal(isValidModel("opper", "mistral/mistral-large-latest"), true);
});
