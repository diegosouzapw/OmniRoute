import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");

const SUMOPOD_CHAT_URL = "https://ai.sumopod.com/v1/chat/completions";
const SUMOPOD_MODELS_URL = "https://ai.sumopod.com/v1/models";

const X5LAB_CHAT_URL = "https://api.x5lab.dev/v1/chat/completions";
const X5LAB_MODELS_URL = "https://api.x5lab.dev/v1/models";

test("SumoPod is registered as an OpenAI-compatible API-key gateway", () => {
  const entry = APIKEY_PROVIDERS.sumopod;
  assert.ok(entry, "APIKEY_PROVIDERS.sumopod must be defined");
  assert.equal(entry.id, "sumopod");
  assert.equal(entry.alias, "sumopod");
  assert.equal(entry.name, "SumoPod");
  assert.equal(entry.website, "https://ai.sumopod.com");
  assert.equal(entry.passthroughModels, true);
});

test("X5Lab is registered as an OpenAI-compatible API-key gateway", () => {
  const entry = APIKEY_PROVIDERS.x5lab;
  assert.ok(entry, "APIKEY_PROVIDERS.x5lab must be defined");
  assert.equal(entry.id, "x5lab");
  assert.equal(entry.alias, "x5lab");
  assert.equal(entry.name, "X5Lab");
  assert.equal(entry.website, "https://x5lab.dev");
  assert.equal(entry.passthroughModels, true);
});

test("SumoPod exposes the OpenAI-compatible chat completions endpoint", () => {
  assert.equal(PROVIDER_ENDPOINTS.sumopod, SUMOPOD_CHAT_URL);
});

test("X5Lab exposes the OpenAI-compatible chat completions endpoint", () => {
  assert.equal(PROVIDER_ENDPOINTS.x5lab, X5LAB_CHAT_URL);
});

test("SumoPod registry entry uses OpenAI format with bearer API-key auth and passthrough models", () => {
  const entry = providerRegistry.sumopod;
  assert.ok(entry, "providerRegistry.sumopod must be defined");
  assert.equal(entry.id, "sumopod");
  assert.equal(entry.alias, "sumopod");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, SUMOPOD_CHAT_URL);
  assert.equal(entry.modelsUrl, SUMOPOD_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
  assert.deepEqual(entry.models, [], "SumoPod ships no speculative seeded models — passthrough only");
});

test("X5Lab registry entry uses OpenAI format with bearer API-key auth and passthrough models", () => {
  const entry = providerRegistry.x5lab;
  assert.ok(entry, "providerRegistry.x5lab must be defined");
  assert.equal(entry.id, "x5lab");
  assert.equal(entry.alias, "x5lab");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, X5LAB_CHAT_URL);
  assert.equal(entry.modelsUrl, X5LAB_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
  assert.deepEqual(entry.models, [], "X5Lab ships no speculative seeded models — passthrough only");
});
