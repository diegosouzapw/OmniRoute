import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");

const DO_CHAT_URL = "https://inference.do-ai.run/v1/chat/completions";
const DO_MODELS_URL = "https://inference.do-ai.run/v1/models";

test("digitalocean is registered as an API-key inference-host provider", () => {
  const entry = APIKEY_PROVIDERS.digitalocean;
  assert.ok(entry, "APIKEY_PROVIDERS.digitalocean must be defined");
  assert.equal(entry.id, "digitalocean");
  assert.equal(entry.alias, "digitalocean");
  assert.equal(entry.name, "DigitalOcean");
  assert.equal(entry.website, "https://docs.digitalocean.com/products/ai-platform/");
  assert.equal(entry.passthroughModels, true);
});

test("digitalocean registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.digitalocean;
  assert.ok(entry, "providerRegistry.digitalocean must be defined");
  assert.equal(entry.id, "digitalocean");
  assert.equal(entry.alias, "digitalocean");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, DO_CHAT_URL);
  assert.equal(entry.modelsUrl, DO_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("digitalocean ships no static model seed — relies fully on passthrough + live catalog", () => {
  assert.deepEqual(providerRegistry.digitalocean.models, []);
});

test("digitalocean accepts any model id via passthrough (serverless inference catalog)", () => {
  assert.equal(isValidModel("digitalocean", "openai-gpt-oss-120b"), true);
  assert.equal(isValidModel("digitalocean", "llama3.3-70b-instruct"), true);
  assert.equal(isValidModel("digitalocean", "anthropic-claude-3.5-sonnet"), true);
});
