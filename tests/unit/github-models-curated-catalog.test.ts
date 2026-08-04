import assert from "node:assert/strict";
import test from "node:test";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import { getEmbeddingProvider } from "../../open-sse/config/embeddingRegistry.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { deriveConfigFromRegistryModelsUrl } from "../../src/app/api/providers/[id]/models/discoveryConfig.ts";
import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";

const EXPECTED_CHAT_IDS = [
  "cohere/cohere-command-a",
  "deepseek/deepseek-r1-0528",
  "deepseek/deepseek-v3-0324",
  "meta/llama-4-maverick-17b-128e-instruct-fp8",
  "meta/llama-3.3-70b-instruct",
  "meta/llama-4-scout-17b-16e-instruct",
  "microsoft/phi-4-multimodal-instruct",
  "microsoft/phi-4-reasoning",
  "mistral-ai/codestral-2501",
  "mistral-ai/mistral-medium-2505",
  "openai/gpt-4.1",
  "openai/gpt-4.1-mini",
  "openai/gpt-4o",
  "openai/gpt-4o-mini",
  "openai/gpt-5",
  "openai/gpt-5-chat",
  "openai/gpt-5-mini",
  "openai/o3",
  "openai/o4-mini",
] as const;

const EXPECTED_EMBEDDING_IDS = [
  "openai/text-embedding-3-large",
  "openai/text-embedding-3-small",
] as const;

test("github-models curates the exact chat roster and preserves live discovery", () => {
  const provider = REGISTRY["github-models"];
  const ids = provider.models.map((model) => model.id);
  assert.deepEqual(ids, EXPECTED_CHAT_IDS);
  assert.equal(provider.modelsUrl, "https://models.github.ai/catalog/models");
  assert.ok(!ids.includes("xai/grok-3"));
  assert.ok(!ids.includes("openai/o1"));
  assert.ok(!ids.includes("meta/meta-llama-3.1-405b-instruct"));
  assert.ok(!ids.includes("meta/llama-3.2-11b-vision-instruct"));
  assert.ok(!ids.includes("meta/llama-3.2-90b-vision-instruct"));

  const scout = provider.models.find((model) => model.id === "meta/llama-4-scout-17b-16e-instruct");
  assert.deepEqual(scout, {
    id: "meta/llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Scout 17B 16E Instruct",
    contextLength: 10_000_000,
    maxInputTokens: 10_000_000,
    maxOutputTokens: 4_096,
    supportsVision: true,
    toolCalling: true,
  });

  const gpt5 = provider.models.find((model) => model.id === "openai/gpt-5");
  assert.equal(gpt5?.contextLength, 200_000);
  assert.equal(gpt5?.maxInputTokens, 200_000);
  assert.equal(gpt5?.maxOutputTokens, 100_000);
  assert.equal(gpt5?.supportsVision, true);
  assert.equal(gpt5?.supportsReasoning, true);
  assert.equal(gpt5?.toolCalling, true);
});

test("github-models registers embedding-only models outside the chat roster", () => {
  const chatIds = REGISTRY["github-models"].models.map((model) => model.id);
  const provider = getEmbeddingProvider("github-models");
  assert.ok(provider);
  assert.equal(provider.baseUrl, "https://models.github.ai/inference/embeddings");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "bearer");
  assert.deepEqual(
    provider.models.map((model) => model.id),
    EXPECTED_EMBEDDING_IDS
  );
  for (const id of EXPECTED_EMBEDDING_IDS) assert.ok(!chatIds.includes(id));

  const specialty = getStaticModelsForProvider("github-models") || [];
  assert.deepEqual(
    specialty.map((model) => ({
      id: model.id,
      apiFormat: model.apiFormat,
      supportedEndpoints: model.supportedEndpoints,
    })),
    EXPECTED_EMBEDDING_IDS.map((id) => ({
      id,
      apiFormat: "embeddings",
      supportedEndpoints: ["embeddings"],
    }))
  );
});

test("github-models free metadata matches the combined curated roster", () => {
  const freeIds = FREE_MODEL_BUDGETS.filter((entry) => entry.provider === "github-models").map(
    (entry) => entry.modelId
  );
  assert.deepEqual(freeIds, [...EXPECTED_CHAT_IDS, ...EXPECTED_EMBEDDING_IDS]);
  assert.equal(new Set(freeIds).size, 21);
});

test("github-models live discovery filters confirmed dead Llama 3.2 vision models", () => {
  const config = deriveConfigFromRegistryModelsUrl("github-models");
  assert.ok(config);
  assert.equal(config.url, "https://models.github.ai/catalog/models");
  assert.deepEqual(
    config.parseResponse([
      { id: "meta/llama-3.2-11b-vision-instruct", name: "dead-11b" },
      { id: "meta/llama-3.2-90b-vision-instruct", name: "dead-90b" },
      { id: "meta/llama-3.3-70b-instruct", name: "live" },
    ]),
    [{ id: "meta/llama-3.3-70b-instruct", name: "live" }]
  );
});
