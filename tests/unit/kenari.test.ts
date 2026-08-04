import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");

const KENARI_CHAT_URL = "https://kenari.id/v1/chat/completions";
const KENARI_MODELS_URL = "https://kenari.id/v1/models";

test("Kenari is registered as an OpenAI-compatible API-key gateway", () => {
  const entry = APIKEY_PROVIDERS.kenari;
  assert.ok(entry, "APIKEY_PROVIDERS.kenari must be defined");
  assert.equal(entry.id, "kenari");
  assert.equal(entry.alias, "kenari");
  assert.equal(entry.name, "Kenari");
  assert.equal(entry.website, "https://kenari.id");
  assert.equal(entry.passthroughModels, true);
});

test("Kenari exposes the OpenAI-compatible chat completions endpoint", () => {
  assert.equal(PROVIDER_ENDPOINTS.kenari, KENARI_CHAT_URL);
});

test("Kenari registry entry uses OpenAI format with bearer API-key auth and passthrough models", () => {
  const entry = providerRegistry.kenari;
  assert.ok(entry, "providerRegistry.kenari must be defined");
  assert.equal(entry.id, "kenari");
  assert.equal(entry.alias, "kenari");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, KENARI_CHAT_URL);
  assert.equal(entry.modelsUrl, KENARI_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
  assert.deepEqual(
    entry.models,
    [],
    "Kenari ships no speculative seeded models — live catalog via passthrough only"
  );
});
