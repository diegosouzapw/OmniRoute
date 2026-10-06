import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isNamedOpenAIStyleProvider } = await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");

test("Token Kiosk is registered as an API-key gateway provider", () => {
  const entry = APIKEY_PROVIDERS["token-kiosk"];
  assert.ok(entry, "APIKEY_PROVIDERS['token-kiosk'] must be defined");
  assert.equal(entry.id, "token-kiosk");
  assert.equal(entry.alias, "tk");
  assert.equal(entry.name, "Token Kiosk");
  assert.equal(entry.website, "https://agent-router.gaib.ai");
});

test("Token Kiosk exposes the OpenAI-compatible chat completions URL", () => {
  assert.equal(PROVIDER_ENDPOINTS["token-kiosk"], "https://agent-router.gaib.ai/v1/chat/completions");
});

test("Token Kiosk registry entry uses OpenAI format with bearer apikey auth", () => {
  const entry = providerRegistry["token-kiosk"];
  assert.ok(entry, "providerRegistry['token-kiosk'] must be defined");
  assert.equal(entry.id, "token-kiosk");
  assert.equal(entry.alias, "tk");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, "https://agent-router.gaib.ai/v1/chat/completions");
  assert.equal(entry.modelsUrl, "https://agent-router.gaib.ai/v1/models");
});

test("Token Kiosk is registered as a named OpenAI-style provider for live model discovery", () => {
  assert.ok(isNamedOpenAIStyleProvider("token-kiosk"));
});
