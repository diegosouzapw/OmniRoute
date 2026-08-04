import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");

const CHENZK_CHAT_URL = "https://chenzk.top/v1/chat/completions";
const CHENZK_MODELS_URL = "https://chenzk.top/v1/models";

// Port of decolua/9router#2437 ("feat: add Chenzk API provider"), adapted to
// OmniRoute's directory-per-provider registry (`open-sse/config/providers/registry/`)
// and the `src/shared/constants/providers/apikey/*` metadata catalog, instead of
// upstream's flat `open-sse/providers/registry/*.js` + hardcoded model array. Chenzk
// exposes a "New API"-style OpenAI-compatible gateway with a live /v1/models catalog,
// so — matching the sibling kenari/x5lab/sumopod gateways already in this catalog —
// models are resolved via passthrough rather than a speculative hardcoded list.
test("Chenzk is registered as an OpenAI-compatible API-key gateway", () => {
  const entry = APIKEY_PROVIDERS.chenzk;
  assert.ok(entry, "APIKEY_PROVIDERS.chenzk must be defined");
  assert.equal(entry.id, "chenzk");
  assert.equal(entry.alias, "chenzk");
  assert.equal(entry.name, "Chenzk API");
  assert.equal(entry.website, "https://chenzk.top");
  assert.equal(entry.passthroughModels, true);
});

test("Chenzk exposes the OpenAI-compatible chat completions endpoint", () => {
  assert.equal(PROVIDER_ENDPOINTS.chenzk, CHENZK_CHAT_URL);
});

test("Chenzk registry entry uses OpenAI format with bearer API-key auth and passthrough models", () => {
  const entry = providerRegistry.chenzk;
  assert.ok(entry, "providerRegistry.chenzk must be defined");
  assert.equal(entry.id, "chenzk");
  assert.equal(entry.alias, "chenzk");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, CHENZK_CHAT_URL);
  assert.equal(entry.modelsUrl, CHENZK_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
  assert.deepEqual(
    entry.models,
    [],
    "Chenzk ships no speculative seeded models — live catalog via passthrough only"
  );
});
