import test from "node:test";
import assert from "node:assert/strict";

import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import {
  getVertexModelTargetFormat,
  getVertexModelTransport,
  isVertexXaiModel,
  normalizeVertexModelId,
} from "../../open-sse/config/vertexModels.ts";
import { parseVertexXaiModels } from "../../src/lib/providerModels/vertexXaiModelsParser.ts";

test("normalizeVertexModelId accepts Model Garden resource names and request names", () => {
  const cases = [
    "grok-4.6",
    "xai/grok-4.6",
    "xai/models/grok-4.6",
    "publishers/xai/models/grok-4.6",
    "projects/demo/locations/global/publishers/xai/models/grok-4.6",
    "vertex/publishers/xai/models/grok-4.6",
    "vp/xai/grok-4.6",
  ];

  for (const modelId of cases) {
    assert.equal(normalizeVertexModelId(modelId), "xai/grok-4.6", modelId);
    assert.equal(isVertexXaiModel(modelId), true, modelId);
  }

  assert.equal(normalizeVertexModelId("gemini-3.1-pro-preview"), "gemini-3.1-pro-preview");
  assert.equal(isVertexXaiModel("gemini-3.1-pro-preview"), false);
});

test("parseVertexXaiModels maps the Model Garden publisher envelope to routable models", () => {
  const models = parseVertexXaiModels({
    publisherModels: [
      {
        name: "publishers/xai/models/grok-4.6",
        displayName: "Grok 4.6",
        description: "xAI partner model",
      },
      {
        name: "projects/demo/locations/global/publishers/xai/models/grok-4.20-reasoning",
      },
    ],
  });

  assert.deepEqual(models, [
    {
      id: "xai/grok-4.6",
      name: "Grok 4.6",
      supportedEndpoints: ["chat"],
      targetFormat: "openai",
      description: "xAI partner model",
      owned_by: "xai",
    },
    {
      id: "xai/grok-4.20-reasoning",
      name: "xai/grok-4.20-reasoning",
      supportedEndpoints: ["chat"],
      targetFormat: "openai",
      owned_by: "xai",
    },
  ]);
});

test("Vertex xAI models always resolve to the OpenAI wire format", () => {
  const ids = ["grok-4.6", "xai/grok-4.6", "xai/models/grok-4.6", "publishers/xai/models/grok-4.6"];

  for (const provider of ["vertex", "vertex-partner", "vp"]) {
    for (const modelId of ids) {
      assert.equal(getModelTargetFormat(provider, modelId), "openai", `${provider}/${modelId}`);
    }
  }
});

test("all curated and generic Vertex partner IDs resolve away from Gemini format", () => {
  const openAiIds = [
    "deepseek-ai/deepseek-v3.2-maas",
    "qwen/qwen3-next-80b-a3b-instruct-maas",
    "zai-org/glm-5-maas",
    "mistralai/mistral-medium-3",
    "publishers/meta/models/llama-4-maverick-17b-128e-instruct-maas",
    "publishers/future-vendor/models/future-chat-maas",
  ];

  for (const provider of ["vertex", "vertex-partner", "vp"]) {
    for (const modelId of openAiIds) {
      assert.equal(getModelTargetFormat(provider, modelId), "openai", `${provider}/${modelId}`);
    }
    assert.equal(
      getModelTargetFormat(provider, "publishers/anthropic/models/claude-sonnet-5"),
      "claude",
      provider
    );
  }
});

test("Vertex routing covers native partner APIs and arbitrary OpenAI-compatible MaaS publishers", () => {
  assert.equal(
    normalizeVertexModelId("publishers/anthropic/models/claude-sonnet-5"),
    "claude-sonnet-5"
  );
  assert.equal(
    normalizeVertexModelId("publishers/mistralai/models/mistral-medium-3"),
    "mistral-medium-3"
  );
  assert.equal(
    normalizeVertexModelId("publishers/meta/models/llama-4-maverick-17b-128e-instruct-maas"),
    "meta/llama-4-maverick-17b-128e-instruct-maas"
  );
  assert.equal(
    normalizeVertexModelId("publishers/deepseek-ai/models/deepseek-v3.2-maas"),
    "deepseek-ai/deepseek-v3.2-maas"
  );
  assert.equal(normalizeVertexModelId("DeepSeek-V4-Pro"), "deepseek-ai/DeepSeek-V4-Pro");
  assert.equal(normalizeVertexModelId("Qwen3.6-35B-A3B"), "qwen/Qwen3.6-35B-A3B");
  assert.equal(normalizeVertexModelId("GLM-5.1-FP8"), "zai-org/GLM-5.1-FP8");

  assert.equal(getVertexModelTransport("gemini-3.1-pro-preview"), "gemini");
  assert.equal(getVertexModelTransport("anthropic/claude-sonnet-5"), "anthropic");
  assert.equal(getVertexModelTransport("mistralai/mistral-medium-3"), "mistral");
  assert.equal(getVertexModelTransport("future-publisher/future-chat-maas"), "openai");
  assert.equal(getVertexModelTargetFormat("anthropic/claude-sonnet-5"), "claude");
  assert.equal(getVertexModelTargetFormat("mistralai/mistral-medium-3"), "openai");
  assert.equal(getVertexModelTargetFormat("future-publisher/future-chat-maas"), "openai");
  assert.equal(getVertexModelTargetFormat("gemini-3.1-pro-preview"), null);
});

test("Vertex registries contain the documented xAI MaaS models as partial live catalogs", () => {
  for (const provider of ["vertex", "vertex-partner"]) {
    const entry = getRegistryEntry(provider);
    assert.ok(entry, provider);
    assert.equal(entry.liveCatalogAuthoritative, false, provider);

    const grok = entry.models.find((model) => model.id === "xai/grok-4.6");
    assert.ok(grok, `${provider} must expose grok-4.6`);
    assert.equal(grok.targetFormat, "openai");
    assert.equal(grok.supportsVision, true);
    assert.equal(grok.contextLength, 524288);
  }
});
