import assert from "node:assert/strict";
import test from "node:test";

import { atlascloudProvider } from "../../open-sse/config/providers/registry/atlascloud/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

const CHAT_URL = "https://api.atlascloud.ai/v1/chat/completions";
const MODELS_URL = "https://api.atlascloud.ai/v1/models";

test("Atlas Cloud is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(atlascloudProvider.id, "atlascloud");
  assert.equal(atlascloudProvider.alias, "atlascloud");
  assert.equal(atlascloudProvider.format, "openai");
  assert.equal(atlascloudProvider.executor, "default");
  assert.equal(atlascloudProvider.authType, "apikey");
  assert.equal(atlascloudProvider.authHeader, "bearer");
  assert.equal(atlascloudProvider.baseUrl, CHAT_URL);
  assert.equal(atlascloudProvider.modelsUrl, MODELS_URL);
  assert.equal(atlascloudProvider.passthroughModels, true);
});

test("Atlas Cloud leaves its catalog to live discovery", () => {
  // /v1/models lists only text-output chat models and the roster changes, so nothing is hardcoded.
  assert.deepEqual(atlascloudProvider.models, []);
});

test("Atlas Cloud is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.atlascloud?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS.atlascloud, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.atlascloud?.id, "atlascloud");
  assert.equal(APIKEY_PROVIDERS.atlascloud?.alias, "atlascloud");
  assert.equal(APIKEY_PROVIDERS.atlascloud?.name, "Atlas Cloud");
  assert.ok((await getExecutor("atlascloud")) instanceof DefaultExecutor);
  // Model ids are vendor-prefixed and come from live discovery.
  assert.equal(isValidModel("atlascloud", "deepseek-ai/deepseek-v4-flash"), true);
});

test("Atlas Cloud is listed as an aggregator", () => {
  // Its catalog spans many vendors' models (DeepSeek, Z.ai, Moonshot, Qwen, Anthropic, OpenAI, …).
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("atlascloud"), true);
});

test("Atlas Cloud shows no Free badge and its hint names the base URL", () => {
  assert.equal(APIKEY_PROVIDERS.atlascloud?.hasFree, false);
  const hint = String(APIKEY_PROVIDERS.atlascloud?.apiHint ?? "");
  assert.match(hint, /https:\/\/api\.atlascloud\.ai\/v1/);
  assert.match(hint, /vendor-prefixed/i);
});

test("Atlas Cloud claims no capability that was not exercised", () => {
  const metadata = APIKEY_PROVIDERS.atlascloud as Record<string, unknown>;
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});
