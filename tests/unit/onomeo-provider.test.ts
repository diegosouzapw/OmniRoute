import assert from "node:assert/strict";
import test from "node:test";

import { onomeoProvider } from "../../open-sse/config/providers/registry/onomeo/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

const CHAT_URL = "https://onomeo.com/v1/chat/completions";
const MODELS_URL = "https://onomeo.com/v1/models";

test("onomeo is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(onomeoProvider.id, "onomeo");
  assert.equal(onomeoProvider.alias, "onomeo");
  assert.equal(onomeoProvider.format, "openai");
  assert.equal(onomeoProvider.executor, "default");
  assert.equal(onomeoProvider.authType, "apikey");
  assert.equal(onomeoProvider.authHeader, "bearer");
  assert.equal(onomeoProvider.baseUrl, CHAT_URL);
  assert.equal(onomeoProvider.modelsUrl, MODELS_URL);
  assert.equal(onomeoProvider.passthroughModels, true);
});

test("onomeo leaves its catalog to live discovery", () => {
  // /v1/models needs the key and the roster changes, so nothing is hardcoded.
  assert.deepEqual(onomeoProvider.models, []);
});

test("onomeo is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.onomeo?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS.onomeo, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.onomeo?.id, "onomeo");
  assert.equal(APIKEY_PROVIDERS.onomeo?.alias, "onomeo");
  assert.ok((await getExecutor("onomeo")) instanceof DefaultExecutor);
  assert.equal(isValidModel("onomeo", "future/live-catalog-model"), true);
});

test("onomeo is listed as an aggregator", () => {
  // It routes to third-party upstreams rather than serving its own inference.
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("onomeo"), true);
});

test("onomeo's free note states the check-in allowance and the rate limits", () => {
  // The allowance is small and depends on a daily check-in; the note says so
  // instead of implying a standing free quota.
  assert.equal(APIKEY_PROVIDERS.onomeo?.hasFree, true);
  const note = String(APIKEY_PROVIDERS.onomeo?.freeNote ?? "");
  assert.match(note, /check in daily/i);
  assert.match(note, /12 requests\/min per key/);
  assert.match(note, /60 requests per 5 hours per account/);
  assert.doesNotMatch(note, /unlimited/i);
});

test("onomeo's hint says models are served by third-party upstreams", () => {
  const hint = String(APIKEY_PROVIDERS.onomeo?.apiHint ?? "");
  assert.match(hint, /third-party upstreams/i);
  assert.match(hint, /train on prompts/i);
});

test("onomeo claims no capability that was not exercised", () => {
  const metadata = APIKEY_PROVIDERS.onomeo as Record<string, unknown>;
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});
