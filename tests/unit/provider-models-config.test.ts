import test from "node:test";
import assert from "node:assert/strict";

import {
  PROVIDER_ID_TO_ALIAS,
  PROVIDER_MODELS,
  findModelName,
  getDefaultModel,
  getModelTargetFormat,
  getModelsByProviderId,
  getProviderModels,
  isValidModel,
} from "../../open-sse/config/providerModels.ts";

test("provider models helpers expose model lists and defaults", () => {
  const openaiModels = getProviderModels("openai");

  assert.ok(Array.isArray(openaiModels));
  assert.ok(openaiModels.length > 0);
  assert.equal(getProviderModels("provider-that-does-not-exist").length, 0);
  assert.equal(getDefaultModel("openai"), openaiModels[0].id);
  assert.equal(getDefaultModel("provider-that-does-not-exist"), null);
});

test("provider models helpers validate and resolve model metadata", () => {
  const openaiModels = PROVIDER_MODELS.openai;
  const firstModel = openaiModels[0];

  assert.equal(isValidModel("openai", firstModel.id), true);
  assert.equal(isValidModel("openai", "missing-model"), false);
  assert.equal(
    isValidModel("passthrough-provider", "anything-goes", new Set(["passthrough-provider"])),
    true
  );

  assert.equal(findModelName("openai", firstModel.id), firstModel.name);
  assert.equal(findModelName("openai", "missing-model"), "missing-model");
  assert.equal(findModelName("missing-provider", "missing-model"), "missing-model");

  assert.equal(getModelTargetFormat("openai", firstModel.id), firstModel.targetFormat || null);
  assert.equal(getModelTargetFormat("openai", "missing-model"), null);
  assert.equal(getModelTargetFormat("missing-provider", "missing-model"), null);
});

test("provider models helpers resolve provider IDs through aliases", () => {
  const firstProviderId = Object.keys(PROVIDER_ID_TO_ALIAS)[0];
  const alias = PROVIDER_ID_TO_ALIAS[firstProviderId] || firstProviderId;

  assert.deepEqual(getModelsByProviderId(firstProviderId), PROVIDER_MODELS[alias] || []);
  assert.deepEqual(getModelsByProviderId("provider-that-does-not-exist"), []);
});
