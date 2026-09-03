import assert from "node:assert/strict";
import test from "node:test";

const { filterChatSelectableModels, getModelEndpointDecision, isChatSelectableModel } =
  await import("../../../open-sse/services/modelEndpointPolicy.ts");

test("OpenAI image models are not chat-selectable without upstream endpoint metadata", () => {
  for (const modelId of [
    "gpt-image-2",
    "gpt-image-1.5",
    "gpt-image-1-mini",
    "dall-e-3",
    "chatgpt-image-latest",
  ]) {
    assert.deepEqual(getModelEndpointDecision("openai", modelId), {
      kind: "image",
      chatSelectable: false,
      reason: "provider-policy",
    });
  }
});

test("OpenAI video models are not chat-selectable without upstream endpoint metadata", () => {
  assert.deepEqual(getModelEndpointDecision("openai", "sora-2-pro"), {
    kind: "video",
    chatSelectable: false,
    reason: "provider-policy",
  });
});

test("provider policy is scoped and does not classify another provider by model name", () => {
  assert.equal(
    isChatSelectableModel("custom-provider", { id: "gpt-image-shaped-chat-model" }),
    true
  );
});

test("explicit chat capability wins for a multi-endpoint model", () => {
  assert.equal(
    isChatSelectableModel("openai", {
      id: "gpt-image-shaped-multimodal-model",
      supportedEndpoints: ["/v1/images/generations", "/v1/responses"],
    }),
    true
  );
});

test("a synthetic chat default does not override a known OpenAI specialty model", () => {
  assert.equal(
    isChatSelectableModel("openai", {
      id: "sora-2",
      supportedEndpoints: ["chat"],
    }),
    false
  );
});

test("explicit non-chat endpoints are excluded even when the model ID is unknown", () => {
  assert.equal(
    isChatSelectableModel("openai-compatible", {
      id: "vendor-specialty-model",
      supportedEndpoints: ["videos/generations"],
    }),
    false
  );
});

test("chat import filtering keeps ordinary OpenAI models only", () => {
  assert.deepEqual(
    filterChatSelectableModels("openai", [
      { id: "gpt-5.6" },
      { id: "gpt-image-2" },
      { id: "sora-2" },
    ]).map((model) => model.id),
    ["gpt-5.6"]
  );
});
