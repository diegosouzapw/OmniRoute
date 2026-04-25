import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { REGISTRY, getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { PROVIDERS } from "../../open-sse/config/constants.ts";
import { getModelsByProviderId, isValidModel } from "../../src/shared/constants/models.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { validateBody, createProviderSchema } from "../../src/shared/validation/schemas.ts";

test("qianfan registers Baidu ERNIE as an OpenAI-compatible API key provider", () => {
  const registryEntry = getRegistryEntry("qianfan");

  assert.ok(registryEntry, "qianfan should be in the provider registry");
  assert.equal(registryEntry, REGISTRY.qianfan);
  assert.equal(registryEntry.id, "qianfan");
  assert.equal(registryEntry.alias, "qianfan");
  assert.equal(registryEntry.format, "openai");
  assert.equal(registryEntry.executor, "default");
  assert.equal(registryEntry.authType, "apikey");
  assert.equal(registryEntry.authHeader, "bearer");
  assert.equal(registryEntry.baseUrl, "https://qianfan.baidubce.com/v2/chat/completions");
  assert.equal(registryEntry.defaultContextLength, 128000);
  assert.equal(registryEntry.passthroughModels, true);

  assert.ok(APIKEY_PROVIDERS.qianfan, "qianfan should be visible in API key providers");
  assert.equal(APIKEY_PROVIDERS.qianfan.name, "Baidu Qianfan");
  assert.equal(APIKEY_PROVIDERS.qianfan.website, "https://cloud.baidu.com/product/wenxinworkshop");
  assert.equal(APIKEY_PROVIDERS.qianfan.passthroughModels, true);

  assert.equal(PROVIDERS.qianfan.baseUrl, registryEntry.baseUrl);
  assert.equal(PROVIDERS.qianfan.format, "openai");
  assert.equal("modelsUrl" in PROVIDERS.qianfan, false);
  assert.equal("passthroughModels" in PROVIDERS.qianfan, false);
});

test("qianfan exposes ERNIE chat models in the local model catalog", () => {
  const models = getModelsByProviderId("qianfan");
  const modelIds = models.map((model) => model.id);

  assert.ok(modelIds.includes("ernie-4.5-turbo-128k"));
  assert.ok(modelIds.includes("ernie-x1-turbo-32k"));
  assert.ok(modelIds.includes("ernie-4.5-8k-preview"));
  assert.ok(models.every((model) => typeof model.name === "string" && model.name.length > 0));
});

test("qianfan accepts known and passthrough model IDs", () => {
  assert.equal(isValidModel("qianfan", "ernie-4.5-turbo-128k"), true);
  assert.equal(isValidModel("qianfan", "future-qianfan-openai-compatible-model"), true);
});

test("qianfan provider creation schema accepts API-key connections", () => {
  const validation = validateBody(createProviderSchema, {
    provider: "qianfan",
    apiKey: "bce-v3/test-key",
    name: "Baidu Qianfan",
  });

  assert.equal(validation.success, true);
  if (validation.success) {
    assert.equal(validation.data.provider, "qianfan");
    assert.equal(validation.data.apiKey, "bce-v3/test-key");
  }
});

test("qianfan has a static provider icon asset", () => {
  assert.equal(existsSync(join(process.cwd(), "public/providers/qianfan.svg")), true);
});
