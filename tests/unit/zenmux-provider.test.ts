import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");

test("ZenMux is registered as an API-key provider with the canonical identity", () => {
  const zenmux = APIKEY_PROVIDERS.zenmux;
  assert.ok(zenmux, "APIKEY_PROVIDERS.zenmux must be defined");
  assert.equal(zenmux.id, "zenmux");
  assert.equal(zenmux.alias, "zm");
  assert.equal(zenmux.name, "ZenMux");
  assert.equal(zenmux.website, "https://zenmux.ai");
  assert.equal(typeof zenmux.textIcon, "string");
  assert.equal(zenmux.hasFree, true);
});

test("ZenMux exposes the OpenAI-compatible chat completions URL", () => {
  assert.equal(
    PROVIDER_ENDPOINTS.zenmux,
    "https://zenmux.ai/api/v1/chat/completions"
  );
});

test("ZenMux registry entry uses OpenAI format with bearer apikey auth", () => {
  const entry = providerRegistry.zenmux;
  assert.ok(entry, "providerRegistry.zenmux must be defined");
  assert.equal(entry.id, "zenmux");
  assert.equal(entry.alias, "zm");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, "https://zenmux.ai/api/v1/chat/completions");
  assert.equal(entry.modelsUrl, "https://zenmux.ai/api/v1/models");
});

test("ZenMux seed model list includes the headline families and unique ids", () => {
  const models = providerRegistry.zenmux.models;
  const ids = models.map((m: { id: string }) => m.id);
  assert.ok(ids.length >= 8, "expect a non-trivial seed list of 8+ models");
  assert.equal(new Set(ids).size, ids.length, "model ids must be unique");
  // Provider-prefixed family coverage matching ZenMux's multi-protocol router
  for (const family of [
    "google/gemini-3",
    "openai/gpt-5",
    "anthropic/claude-sonnet",
    "deepseek/deepseek",
    "x-ai/grok-",
    "mistralai/mistral",
  ]) {
    assert.ok(
      ids.some((id: string) => id.startsWith(family)),
      `seed list must include ${family}* model`
    );
  }
});

test("ZenMux models use provider/model naming convention", () => {
  for (const model of providerRegistry.zenmux.models) {
    assert.ok(
      model.id.includes("/"),
      `model id "${model.id}" must follow provider/model format (e.g. google/gemini-3.1-pro-preview)`
    );
  }
});
