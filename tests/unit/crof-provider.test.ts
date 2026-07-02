import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");

test("CrofAI is registered as an API-key provider with the canonical identity", () => {
  const crof = APIKEY_PROVIDERS.crof;
  assert.ok(crof, "APIKEY_PROVIDERS.crof must be defined");
  assert.equal(crof.id, "crof");
  assert.equal(crof.alias, "crof");
  assert.equal(crof.name, "CrofAI");
  assert.equal(crof.website, "https://crof.ai");
  assert.equal(typeof crof.textIcon, "string");
});

test("CrofAI exposes the OpenAI-compatible chat completions URL", () => {
  assert.equal(PROVIDER_ENDPOINTS.crof, "https://crof.ai/v1/chat/completions");
});

test("CrofAI registry entry uses OpenAI format with bearer apikey auth", () => {
  const entry = providerRegistry.crof;
  assert.ok(entry, "providerRegistry.crof must be defined");
  assert.equal(entry.id, "crof");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, "https://crof.ai/v1/chat/completions");
});

test("CrofAI seed model list includes the headline families and unique ids", () => {
  const ids = providerRegistry.crof.models.map((m: { id: string }) => m.id);
  assert.ok(ids.length >= 10, "expect a non-trivial seed list");
  assert.equal(new Set(ids).size, ids.length, "model ids must be unique");
  for (const family of ["deepseek-v", "kimi-k2", "glm-", "qwen3"]) {
    assert.ok(
      ids.some((id: string) => id.startsWith(family)),
      `seed list must include ${family}* model`
    );
  }
});
