import assert from "node:assert/strict";
import test from "node:test";

import { unificallyProvider } from "../../open-sse/config/providers/registry/unifically/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

const CHAT_URL = "https://api.unifically.com/v1/chat/completions";
const MODELS_URL = "https://api.unifically.com/v1/models?category=llm";

test("unifically is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(unificallyProvider.id, "unifically");
  assert.equal(unificallyProvider.alias, "unifically");
  assert.equal(unificallyProvider.format, "openai");
  assert.equal(unificallyProvider.executor, "default");
  assert.equal(unificallyProvider.authType, "apikey");
  assert.equal(unificallyProvider.authHeader, "bearer");
  assert.equal(unificallyProvider.baseUrl, CHAT_URL);
  assert.equal(unificallyProvider.passthroughModels, true);
});

test("unifically discovery is scoped to chat models", () => {
  // /v1/models returns image, video and audio models too. Those run through
  // POST /v1/tasks, not chat completions, so an unscoped listing would offer
  // models that fail on every request.
  assert.equal(unificallyProvider.modelsUrl, MODELS_URL);
  assert.ok(new URL(String(unificallyProvider.modelsUrl)).searchParams.get("category") === "llm");
  assert.deepEqual(unificallyProvider.models, []);
});

test("unifically is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.unifically?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS.unifically, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.unifically?.id, "unifically");
  assert.equal(APIKEY_PROVIDERS.unifically?.alias, "unifically");
  assert.deepEqual(APIKEY_PROVIDERS.unifically?.serviceKinds, ["llm"]);
  assert.ok((await getExecutor("unifically")) instanceof DefaultExecutor);
  assert.equal(isValidModel("unifically", "future/live-catalog-model"), true);
});

test("unifically is listed as an aggregator", () => {
  // It routes to third-party model providers rather than serving its own inference.
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("unifically"), true);
});

test("unifically advertises no free tier", () => {
  // New accounts get a one-time starting balance. That is not a recurring free
  // allowance, so no Free badge is claimed.
  assert.equal(APIKEY_PROVIDERS.unifically?.hasFree, false);
  assert.equal(APIKEY_PROVIDERS.unifically?.freeNote, undefined);
});

test("unifically copy says media models are out of scope for this entry", () => {
  const hint = String(APIKEY_PROVIDERS.unifically?.apiHint ?? "");
  assert.ok(hint.includes("https://api.unifically.com/v1"));
  assert.ok(hint.toLowerCase().includes("chat models only"));
});

test("unifically claims no capability that was not exercised", () => {
  const metadata = APIKEY_PROVIDERS.unifically as Record<string, unknown>;
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});
