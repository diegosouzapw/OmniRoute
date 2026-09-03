import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../../src/shared/constants/models.ts");

// Canonical host is .com — api.unorouter.ai 301-redirects there (verified live 2026-08-12,
// base-reds round 3 #9985); wave4 (#9584) moved the registry to the canonical host.
const UNOROUTER_CHAT_URL = "https://api.unorouter.com/v1/chat/completions";

test("unorouter is registered as an API-key gateway provider", () => {
  const entry = APIKEY_PROVIDERS.unorouter;
  assert.ok(entry, "APIKEY_PROVIDERS.unorouter must be defined");
  assert.equal(entry.id, "unorouter");
  assert.equal(entry.alias, "unorouter");
  assert.equal(entry.name, "UnoRouter");
  assert.equal(entry.website, "https://unorouter.ai");
  assert.equal(entry.passthroughModels, true);
});

test("unorouter registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.unorouter;
  assert.ok(entry, "providerRegistry.unorouter must be defined");
  assert.equal(entry.id, "unorouter");
  assert.equal(entry.alias, "unorouter");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, UNOROUTER_CHAT_URL);
  assert.equal(entry.passthroughModels, true);
});

test("unorouter discovers models live via passthrough (no static seed list)", () => {
  // Wave4 (#9584) replaced the static auto-model seed with live /v1/models discovery.
  assert.deepEqual(providerRegistry.unorouter.models, []);
  assert.equal(providerRegistry.unorouter.passthroughModels, true);
  assert.equal(providerRegistry.unorouter.modelsUrl, "https://api.unorouter.com/v1/models");
});

test("unorouter accepts any model id via passthrough", () => {
  assert.equal(isValidModel("unorouter", "openai/gpt-4o"), true);
  assert.equal(isValidModel("unorouter", "anthropic/claude-3-5-sonnet"), true);
});
