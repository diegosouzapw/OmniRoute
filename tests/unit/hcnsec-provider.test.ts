import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");

const HCNSEC_CHAT_URL = "https://api.hcnsec.cn/v1/chat/completions";
const HCNSEC_MODELS_URL = "https://api.hcnsec.cn/v1/models";

test("hcnsec is registered as an API-key regional provider", () => {
  const entry = APIKEY_PROVIDERS.hcnsec;
  assert.ok(entry, "APIKEY_PROVIDERS.hcnsec must be defined");
  assert.equal(entry.id, "hcnsec");
  assert.equal(entry.alias, "hcnsec");
  assert.equal(entry.name, "Huancheng Public API");
  assert.equal(entry.website, "https://api.hcnsec.cn");
  assert.equal(entry.passthroughModels, true);
  assert.equal(entry.hasFree, true);
});

test("hcnsec registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.hcnsec;
  assert.ok(entry, "providerRegistry.hcnsec must be defined");
  assert.equal(entry.id, "hcnsec");
  assert.equal(entry.alias, "hcnsec");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, HCNSEC_CHAT_URL);
  assert.equal(entry.modelsUrl, HCNSEC_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("hcnsec ships no static model seed — relies fully on passthrough + live catalog", () => {
  assert.deepEqual(providerRegistry.hcnsec.models, []);
});

test("hcnsec accepts any model id via passthrough", () => {
  assert.equal(isValidModel("hcnsec", "gpt-4o-mini"), true);
  assert.equal(isValidModel("hcnsec", "deepseek-v3"), true);
  assert.equal(isValidModel("hcnsec", "qwen-max"), true);
});
