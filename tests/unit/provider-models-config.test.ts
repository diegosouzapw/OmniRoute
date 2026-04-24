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

  assert.ok(byId.has("auto"));
  assert.equal(byId.get("claude-opus-4.7")?.contextLength, 1000000);
  assert.equal(byId.get("claude-sonnet-4.6")?.contextLength, 1000000);
  assert.equal(byId.get("glm-5")?.contextLength, 200000);
  assert.equal(byId.get("deepseek-3.2")?.contextLength, 128000);
  assert.equal(byId.get("qwen3-coder-next")?.contextLength, 256000);
});

test("Chutes registry exposes a current TEE-heavy public lineup", () => {
  const chutesModels = getProviderModels("chutes");
  const ids = new Set(chutesModels.map((model) => model.id));

  assert.ok(ids.has("Qwen/Qwen3-32B-TEE"));
  assert.ok(ids.has("deepseek-ai/DeepSeek-V3.2-TEE"));
  assert.ok(ids.has("openai/gpt-oss-120b-TEE"));
  assert.ok(ids.has("moonshotai/Kimi-K2.6-TEE"));
});

test("DataRobot registry exposes gateway-friendly fallback examples", () => {
  const datarobotModels = getProviderModels("datarobot");
  const ids = new Set(datarobotModels.map((model) => model.id));

  assert.ok(ids.has("azure/gpt-5-mini-2025-08-07"));
  assert.ok(ids.has("azure/gpt-4o-mini"));
});

test("Clarifai registry exposes current OpenAI-compatible examples", () => {
  const clarifaiModels = getProviderModels("clarifai");
  const ids = new Set(clarifaiModels.map((model) => model.id));

  assert.ok(ids.has("openai/chat-completion/models/gpt-oss-120b"));
  assert.ok(ids.has("openai/chat-completion/models/gpt-4o"));
  assert.ok(ids.has("anthropic/completion/models/claude-sonnet-4"));
  assert.ok(ids.has("gcp/generate/models/gemini-2_5-flash"));
});

test("Poe registry exposes current OpenAI-compatible examples", () => {
  const poeModels = getProviderModels("poe");
  const ids = new Set(poeModels.map((model) => model.id));

  assert.ok(ids.has("Claude-Sonnet-4.5"));
  assert.ok(ids.has("GPT-5-Pro"));
  assert.ok(ids.has("GPT-5-Codex"));
  assert.ok(ids.has("Gemini-2.5-Pro"));
});

test("Nous Research registry exposes current official Hermes examples", () => {
  const nousModels = getProviderModels("nous");
  const ids = new Set(nousModels.map((model) => model.id));

  assert.ok(ids.has("nousresearch/hermes-4-70b"));
  assert.ok(ids.has("nousresearch/hermes-4-405b"));
  assert.ok(ids.has("nousresearch/hermes-3-llama-3.1-70b"));
  assert.ok(ids.has("nousresearch/hermes-3-llama-3.1-405b"));
});

test("Petals registry exposes the current public HTTP API fallback model", () => {
  const petalsModels = getProviderModels("petals");
  const ids = new Set(petalsModels.map((model) => model.id));

  assert.ok(ids.has("stabilityai/StableBeluga2"));
});

test("Azure AI Foundry registry exposes fallback marketplace examples", () => {
  const azureAiModels = getProviderModels("azure-ai");
  const ids = new Set(azureAiModels.map((model) => model.id));

  assert.ok(ids.has("claude-opus-4-6"));
  assert.ok(ids.has("deepseek-v3.2"));
  assert.ok(ids.has("kimi-k2.5"));
});

test("Bedrock registry exposes current OpenAI-compatible mantle examples", () => {
  const bedrockModels = getProviderModels("bedrock");
  const ids = new Set(bedrockModels.map((model) => model.id));

  assert.ok(ids.has("openai.gpt-oss-20b"));
  assert.ok(ids.has("openai.gpt-oss-120b"));
  assert.ok(ids.has("mistral.mistral-large-3-675b-instruct"));
});

test("watsonx registry exposes gateway-friendly fallback examples", () => {
  const watsonxModels = getProviderModels("watsonx");
  const ids = new Set(watsonxModels.map((model) => model.id));

  assert.ok(ids.has("ibm/granite-3-3-8b-instruct"));
  assert.ok(ids.has("meta-llama/llama-3-3-70b-instruct"));
  assert.ok(ids.has("openai/gpt-4o"));
});

test("OCI registry exposes current OpenAI-compatible enterprise examples", () => {
  const ociModels = getProviderModels("oci");
  const ids = new Set(ociModels.map((model) => model.id));

  assert.ok(ids.has("openai.gpt-oss-20b"));
  assert.ok(ids.has("openai.gpt-oss-120b"));
  assert.ok(ids.has("google.gemini-2.5-pro"));
});

test("SAP registry exposes current Generative AI Hub examples", () => {
  const sapModels = getProviderModels("sap");
  const ids = new Set(sapModels.map((model) => model.id));

  assert.ok(ids.has("gpt-4o"));
  assert.ok(ids.has("gpt-5-mini"));
  assert.ok(ids.has("mistralai--mistral-medium-instruct"));
});

test("Modal registry exposes current OpenAI-compatible deployment examples", () => {
  const modalModels = getProviderModels("modal");
  const ids = new Set(modalModels.map((model) => model.id));

  assert.ok(ids.has("Qwen/Qwen3-4B-Thinking-2507-FP8"));
  assert.ok(ids.has("google/gemma-4-26B-A4B-it"));
  assert.ok(ids.has("gpt-oss-20B"));
});

test("Reka registry exposes current OpenAI-compatible chat examples", () => {
  const rekaModels = getProviderModels("reka");
  const ids = new Set(rekaModels.map((model) => model.id));

  assert.ok(ids.has("reka-core"));
  assert.ok(ids.has("reka-flash"));
  assert.ok(ids.has("reka-edge-2603"));
});

test("NLP Cloud registry exposes the current chatbot model lineup", () => {
  const nlpCloudModels = getModelsByProviderId("nlpcloud");
  const ids = new Set(nlpCloudModels.map((model) => model.id));

  assert.ok(ids.has("gpt-oss-120b"));
  assert.ok(ids.has("llama-3-1-405b"));
  assert.ok(ids.has("finetuned-llama-3-70b"));
  assert.ok(ids.has("chatdolphin"));
  assert.ok(ids.has("dolphin-yi-34b"));
  assert.ok(ids.has("dolphin-mixtral-8x7b"));
});

test("GitLab registry exposes the public code suggestions fallback model", () => {
  const gitlabModels = getProviderModels("gitlab");

  assert.deepEqual(gitlabModels, [
    { id: "gitlab-duo-code-suggestions", name: "GitLab Duo Code Suggestions" },
  ]);
});

test("GitLab Duo OAuth registry reuses the same fallback model catalog", () => {
  const gitlabDuoModels = getModelsByProviderId("gitlab-duo");

  assert.deepEqual(gitlabDuoModels, [
    { id: "gitlab-duo-code-suggestions", name: "GitLab Duo Code Suggestions" },
  ]);
});
