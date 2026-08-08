/**
 * Coverage for the Openference API key provider (https://openference.com/).
 *
 * Validates wiring alongside the OAuth `openference` entry:
 *   1. APIKEY_PROVIDERS["openference-api"] — catalog entry (id, alias, name, website, hasFree)
 *   2. providerRegistry["openference-api"] — format=openai / executor=default / apikey / bearer
 *   3. PROVIDER_MODELS_CONFIG — live /v1/models discovery URL
 *   4. NAMED_OPENAI_STYLE_PROVIDERS — classified for live-fetch
 *   5. Seeded registry catalog — non-empty, unique ids
 */
import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { NAMED_OPENAI_STYLE_PROVIDERS, isNamedOpenAIStyleProvider } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");
const { PROVIDER_MODELS_CONFIG } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts");

const SPEC = {
  id: "openference-api",
  alias: "ofa",
  name: "Openference API",
  website: "https://openference.com",
  chatUrl: "https://api.openference.com/v1/chat/completions",
  modelsUrl: "https://api.openference.com/v1/models",
  expectedSeedIds: ["GLM-5.2"],
};

test("APIKEY_PROVIDERS.openference-api is registered with the canonical identity", () => {
  const entry = APIKEY_PROVIDERS[SPEC.id];
  assert.ok(entry, `APIKEY_PROVIDERS.${SPEC.id} must be defined`);
  assert.equal(entry.id, SPEC.id);
  assert.equal(entry.alias, SPEC.alias);
  assert.equal(entry.name, SPEC.name);
  assert.equal(entry.website, SPEC.website);
  assert.equal(entry.icon, "openference");
  assert.equal(typeof entry.textIcon, "string");
  assert.equal(entry.hasFree, true);
  assert.equal(typeof entry.freeNote, "string");
  assert.match(entry.color, /^#[0-9A-Fa-f]{6}$/);
});

test("providerRegistry exposes the OpenAI-compatible chat completions URL", () => {
  assert.equal(providerRegistry[SPEC.id].baseUrl, SPEC.chatUrl);
});

test("PROVIDER_MODELS_CONFIG exposes the live /v1/models discovery URL", () => {
  const cfg = PROVIDER_MODELS_CONFIG[SPEC.id];
  assert.ok(cfg, `PROVIDER_MODELS_CONFIG.${SPEC.id} must be defined`);
  assert.equal(cfg.url, SPEC.modelsUrl);
  assert.equal(cfg.method, "GET");
  assert.equal(cfg.authHeader, "Authorization");
  assert.equal(cfg.authPrefix, "Bearer ");
  assert.equal(typeof cfg.parseResponse, "function");
});

test("providerRegistry.openference-api uses OpenAI format with bearer apikey auth", () => {
  const entry = providerRegistry[SPEC.id];
  assert.ok(entry, `providerRegistry.${SPEC.id} must be defined`);
  assert.equal(entry.id, SPEC.id);
  assert.equal(entry.alias, SPEC.alias);
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, SPEC.chatUrl);
  assert.equal(entry.passthroughModels, true);
});

test("openference-api is classified as a named OpenAI-style provider (live-fetch path)", () => {
  assert.ok(
    NAMED_OPENAI_STYLE_PROVIDERS.has(SPEC.id),
    "openference-api must be in NAMED_OPENAI_STYLE_PROVIDERS for live /v1/models fetch"
  );
  assert.equal(isNamedOpenAIStyleProvider(SPEC.id), true);
});

test("openference-api ships a non-empty unique seed catalog", () => {
  const models = providerRegistry[SPEC.id].models;
  assert.ok(Array.isArray(models), "registry models must be an array");
  assert.ok(models.length >= 1, "seed list must be non-empty for the offline fallback");
  const ids = models.map((m: { id: string }) => m.id);
  assert.equal(new Set(ids).size, ids.length, "seed model ids must be unique");
  for (const expected of SPEC.expectedSeedIds) {
    assert.ok(ids.includes(expected), `seed list must include ${expected}`);
  }
});
