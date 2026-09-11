import assert from "node:assert/strict";
import test from "node:test";

import { greenptProvider } from "../../open-sse/config/providers/registry/greenpt/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

const CHAT_URL = "https://api.greenpt.ai/v1/chat/completions";
const MODELS_URL = "https://api.greenpt.ai/v1/models";

test("greenpt is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(greenptProvider.id, "greenpt");
  assert.equal(greenptProvider.alias, "greenpt");
  assert.equal(greenptProvider.format, "openai");
  assert.equal(greenptProvider.executor, "default");
  assert.equal(greenptProvider.authType, "apikey");
  assert.equal(greenptProvider.authHeader, "bearer");
  assert.equal(greenptProvider.baseUrl, CHAT_URL);
  assert.equal(greenptProvider.modelsUrl, MODELS_URL);
  assert.equal(greenptProvider.passthroughModels, true);
});

test("greenpt leaves model discovery to the live upstream catalog", () => {
  // No account was available to enumerate the catalog, so nothing is hardcoded:
  // an empty list plus passthroughModels is the honest shape.
  assert.deepEqual(greenptProvider.models, []);
});

test("greenpt is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.greenpt?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS.greenpt, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.greenpt?.id, "greenpt");
  assert.equal(APIKEY_PROVIDERS.greenpt?.alias, "greenpt");
  assert.ok((await getExecutor("greenpt")) instanceof DefaultExecutor);
});

test("greenpt accepts any model name the upstream catalog returns", () => {
  // passthroughModels drives PASSTHROUGH_PROVIDERS, which is what isValidModel
  // consults -- membership of AGGREGATOR_PROVIDER_IDS is not what gates this.
  assert.equal(isValidModel("greenpt", "future/live-catalog-model"), true);
});

test("greenpt is not listed as an aggregator", () => {
  // It is an inference provider, not a router over other providers, which is
  // what that set means. Listing it there would misdescribe it in the UI.
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("greenpt"), false);
});

test("greenpt advertises no free inference allowance", () => {
  // The published docs describe a free API subscription with pay-per-token
  // inference. That is a billing shape, not a free tier, and hasFree drives a
  // "Free" badge in the picker.
  assert.equal(APIKEY_PROVIDERS.greenpt?.hasFree, false);
});

test("greenpt claims no capability that was not exercised", () => {
  // #12986 asks that tool support be advertised only if exercised. No key was
  // available, so the entry carries no tool/vision capability declaration.
  const metadata = APIKEY_PROVIDERS.greenpt as Record<string, unknown>;
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});
