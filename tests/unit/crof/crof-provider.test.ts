import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../../open-sse/config/providerRegistry.ts");

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
test("CrofAI reasoning seed models declare exactly the supported effort tiers", () => {
  const expectedEfforts = ["none", "low", "medium", "high", "max"];
  for (const model of providerRegistry.crof.models) {
    if (model.supportsReasoning !== true) continue;
    assert.deepEqual(model.supportedThinkingEfforts, expectedEfforts, `${model.id} effort tiers`);
    assert.equal(
      model.supportedThinkingEfforts?.includes("max"),
      true,
      `${model.id} must advertise max`
    );
  }
});
test("CrofAI seed list covers every live reasoning-capable model id", () => {
  // Regression guard: every model the live /v1/models roster flags with
  // `reasoning_effort: true` must have a seed entry with effort tiers, so a
  // stale synced cache never silently drops their effort aliases. Snapshot of
  // GET https://crof.ai/v1/models (2026-08-19; #10577 removed 10 retired ids
  // no longer served live) — update deliberately when the roster changes.
  const liveReasoningIds = [
    "deepseek-v4-flash",
    "deepseek-v4-flash-0731",
    "deepseek-v4-pro",
    "gemma-4-31b-it",
    "glm-5.1",
    "glm-5.2",
    "kimi-k2.6",
    "kimi-k2.7-code",
    "kimi-k3",
    "kimi-k3-eco",
    "mimo-v2.5-pro",
    "qwen3.5-397b-a17b",
    "qwen3.5-9b",
    "qwen3.6-27b",
  ];
  const seed = new Map(providerRegistry.crof.models.map((model) => [model.id, model]));
  for (const id of liveReasoningIds) {
    const model = seed.get(id);
    assert.ok(model, `seed list must include live reasoning model ${id}`);
    assert.equal(model.supportsReasoning, true, `${id} must be marked reasoning-capable`);
    assert.deepEqual(
      model.supportedThinkingEfforts,
      ["none", "low", "medium", "high", "max"],
      `${id} must declare the full effort tier list`
    );
  }
});
