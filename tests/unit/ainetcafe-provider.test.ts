import assert from "node:assert/strict";
import test from "node:test";

import { ainetcafeProvider } from "../../open-sse/config/providers/registry/ainetcafe/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

const CHAT_URL = "https://microquickjs.com/v1/chat/completions";
const MODELS_URL = "https://microquickjs.com/v1/models";

test("ainetcafe is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(ainetcafeProvider.id, "ainetcafe");
  assert.equal(ainetcafeProvider.alias, "ainetcafe");
  assert.equal(ainetcafeProvider.format, "openai");
  assert.equal(ainetcafeProvider.executor, "default");
  assert.equal(ainetcafeProvider.authType, "apikey");
  assert.equal(ainetcafeProvider.authHeader, "bearer");
  assert.equal(ainetcafeProvider.baseUrl, CHAT_URL);
  assert.equal(ainetcafeProvider.modelsUrl, MODELS_URL);
  assert.equal(ainetcafeProvider.passthroughModels, true);
});

test("ainetcafe leaves model discovery to the live upstream catalog", () => {
  // The catalog is served live from /v1/models (Kimi K3 plus other open
  // models at the time of writing), so nothing is hardcoded: an empty list
  // plus passthroughModels keeps the picker in sync with the upstream.
  assert.deepEqual(ainetcafeProvider.models, []);
});

test("ainetcafe is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.ainetcafe?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS.ainetcafe, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.ainetcafe?.id, "ainetcafe");
  assert.equal(APIKEY_PROVIDERS.ainetcafe?.alias, "ainetcafe");
  assert.ok((await getExecutor("ainetcafe")) instanceof DefaultExecutor);
});

test("ainetcafe accepts any model name the upstream catalog returns", () => {
  // passthroughModels drives PASSTHROUGH_PROVIDERS, which is what isValidModel
  // consults -- membership of AGGREGATOR_PROVIDER_IDS is not what gates this.
  assert.equal(isValidModel("ainetcafe", "future/live-catalog-model"), true);
});

test("ainetcafe is not listed as an aggregator", () => {
  // It is an inference provider, not a router over other providers, which is
  // what that set means. Listing it there would misdescribe it in the UI.
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("ainetcafe"), false);
});

test("ainetcafe advertises its sign-up credit as the free allowance", () => {
  // New accounts get a small spendable sign-up credit; the note says the
  // amount is set by the provider so the badge never over-promises.
  assert.equal(APIKEY_PROVIDERS.ainetcafe?.hasFree, true);
  assert.match(String(APIKEY_PROVIDERS.ainetcafe?.freeNote), /sign-up credit/i);
});

test("ainetcafe claims no capability that was not exercised", () => {
  // Capabilities are advertised only once exercised through this executor, so
  // the entry carries no tool/vision capability declaration yet.
  const metadata = APIKEY_PROVIDERS.ainetcafe as Record<string, unknown>;
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});
