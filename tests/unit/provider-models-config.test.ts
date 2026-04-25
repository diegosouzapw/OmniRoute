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

test("GitHub Copilot registry reflects the current supported model lineup", () => {
  const githubModels = getProviderModels("gh");
  const ids = new Set(githubModels.map((model) => model.id));

  assert.ok(ids.has("gpt-5.3-codex"));
  assert.ok(ids.has("gpt-5.4"));
  assert.ok(ids.has("gpt-5.4-mini"));
  assert.ok(ids.has("gpt-5.4-nano"));
  assert.ok(ids.has("claude-opus-4.7"));
  assert.ok(ids.has("claude-sonnet-4.6"));
  assert.ok(ids.has("gemini-3-flash-preview"));
  assert.equal(getModelTargetFormat("gh", "gpt-5.3-codex"), "openai-responses");
  assert.equal(ids.has("gpt-5.1"), false);
  assert.equal(ids.has("gpt-5.1-codex"), false);
  assert.equal(ids.has("claude-opus-4.1"), false);
});

test("Kiro registry exposes the current CLI model lineup with context windows", () => {
  const kiroModels = getProviderModels("kr");
  const byId = new Map(kiroModels.map((model) => [model.id, model]));

  assert.ok(byId.has("claude-opus-4.7"));
  assert.equal(byId.get("claude-opus-4.7")?.contextLength, undefined); // Uses default
  assert.ok(byId.has("claude-sonnet-4.6"));
  assert.ok(byId.has("claude-haiku-4.5"));
});
