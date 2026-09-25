import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");

test("Apmix is registered as an API-key provider with the canonical identity", () => {
  const apmix = APIKEY_PROVIDERS.apmix;
  assert.ok(apmix, "APIKEY_PROVIDERS.apmix must be defined");
  assert.equal(apmix.id, "apmix");
  assert.equal(apmix.alias, "apmix");
  assert.equal(apmix.name, "Apmix");
  assert.equal(apmix.website, "https://apmix.ai");
  assert.equal(typeof apmix.textIcon, "string");
});

test("Apmix exposes the OpenAI-compatible chat completions URL", () => {
  assert.equal(PROVIDER_ENDPOINTS.apmix, "https://api.apmix.ai/v1/chat/completions");
});

test("Apmix registry entry uses OpenAI format with bearer apikey auth", () => {
  const entry = providerRegistry.apmix;
  assert.ok(entry, "providerRegistry.apmix must be defined");
  assert.equal(entry.id, "apmix");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, "https://api.apmix.ai/v1/chat/completions");
  assert.equal(entry.modelsUrl, "https://api.apmix.ai/v1/models");
});

test("Apmix seed model list covers the headline families with unique ids", () => {
  const ids = providerRegistry.apmix.models.map((m: { id: string }) => m.id);
  // 41-model snapshot of apmix.ai/models (2026-09-25) — the catalog is
  // plan-scoped per key; live discovery serves the key's actual slice.
  assert.ok(ids.length >= 40, "expect the full seed list");
  assert.equal(new Set(ids).size, ids.length, "model ids must be unique");
  for (const family of [
    "claude-",
    "gpt-",
    "gemini-",
    "grok-",
    "deepseek-v",
    "qwen",
    "glm-",
    "kimi-k",
    "minimax-",
  ]) {
    assert.ok(
      ids.some((id: string) => id.startsWith(family)),
      `seed list must include ${family}* model`
    );
  }
  // The two Free-plan models must be seeded so keyless-tier flows can find them.
  for (const freeId of ["gpt-6-luna-free", "deepseek-v4-flash-free"]) {
    assert.ok(ids.includes(freeId), `seed list must include the free-plan ${freeId}`);
  }
});

test("Apmix is served by live model discovery (plan-scoped catalog)", async () => {
  const { isNamedOpenAIStyleProvider } =
    await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");
  assert.equal(isNamedOpenAIStyleProvider("apmix"), true);
});
