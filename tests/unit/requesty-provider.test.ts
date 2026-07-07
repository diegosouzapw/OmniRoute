import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");

const REQUESTY_CHAT_URL = "https://router.requesty.ai/v1/chat/completions";
const REQUESTY_MODELS_URL = "https://router.requesty.ai/v1/models";

test("requesty is registered as an API-key gateway provider", () => {
  const entry = APIKEY_PROVIDERS.requesty;
  assert.ok(entry, "APIKEY_PROVIDERS.requesty must be defined");
  assert.equal(entry.id, "requesty");
  assert.equal(entry.alias, "requesty");
  assert.equal(entry.name, "Requesty");
  assert.equal(entry.website, "https://requesty.ai");
  assert.equal(entry.passthroughModels, true);
  assert.equal(entry.hasFree, true);
});

test("requesty registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.requesty;
  assert.ok(entry, "providerRegistry.requesty must be defined");
  assert.equal(entry.id, "requesty");
  assert.equal(entry.alias, "requesty");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, REQUESTY_CHAT_URL);
  assert.equal(entry.modelsUrl, REQUESTY_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("requesty ships no static model seed — relies fully on passthrough + live catalog", () => {
  assert.deepEqual(providerRegistry.requesty.models, []);
});

test("requesty accepts any model id via passthrough (GPT/Claude/Gemini/Kimi behind one key)", () => {
  assert.equal(isValidModel("requesty", "openai/gpt-5.2"), true);
  assert.equal(isValidModel("requesty", "anthropic/claude-opus-4-5"), true);
  assert.equal(isValidModel("requesty", "google/gemini-3-pro"), true);
  assert.equal(isValidModel("requesty", "coding/gpt-4o-mini"), true);
});
