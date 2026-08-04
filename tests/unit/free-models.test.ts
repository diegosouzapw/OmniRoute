import { test } from "node:test";
import assert from "node:assert/strict";

import {
  isFreeModel,
  providerHasFreeModels,
  selectModelsForImport,
  sortModelsFreeFirst,
} from "@/shared/utils/freeModels";
import { FREE_MODEL_BUDGETS } from "@omniroute/open-sse/config/freeModelCatalog";

test("providerHasFreeModels: true for a provider in the free catalog", () => {
  assert.equal(providerHasFreeModels("openrouter"), true);
});

test("providerHasFreeModels: false for an unknown provider", () => {
  assert.equal(providerHasFreeModels("totally-not-a-real-provider-xyz"), false);
});

test("providerHasFreeModels: resolves a provider alias to its canonical id", () => {
  // "ollamacloud" is the dashboard alias for the canonical id "ollama-cloud".
  assert.equal(providerHasFreeModels("ollamacloud"), true);
});

test("isFreeModel: catalog membership works when called with the provider alias", () => {
  // deepseek-v4-pro is a free ollama-cloud model; the list view calls with the alias.
  assert.equal(isFreeModel("ollamacloud", { id: "deepseek-v4-pro" }), true);
});

test("isFreeModel: model id ending in :free is free", () => {
  assert.equal(isFreeModel("openrouter", { id: "deepseek/deepseek-r1:free" }), true);
});

test("isFreeModel: zero prompt+completion price is free", () => {
  assert.equal(
    isFreeModel("openrouter", { id: "x/y", pricing: { prompt: "0", completion: "0" } }),
    true
  );
});

test("isFreeModel: a priced model is NOT free", () => {
  assert.equal(
    isFreeModel("openrouter", {
      id: "openai/gpt-4o",
      pricing: { prompt: "0.0000025", completion: "0.00001" },
    }),
    false
  );
});

test("isFreeModel: a model with no pricing and no :free suffix is NOT free", () => {
  assert.equal(isFreeModel("openrouter", { id: "some/paid-model" }), false);
});

test("isFreeModel: a model id listed in the free catalog for that provider is free", () => {
  const sample = FREE_MODEL_BUDGETS[0];
  assert.equal(isFreeModel(sample.provider, { id: sample.modelId }), true);
});

test("isFreeModel: NVIDIA GLM 5.2 is included in the reviewed trial catalog", () => {
  assert.equal(isFreeModel("nvidia", { id: "z-ai/glm-5.2" }), true);
});

test("selectModelsForImport: passthrough when importFreeOnly is false", () => {
  const models = [
    { id: "a:free" },
    { id: "b", pricing: { prompt: "0.01", completion: "0.02" } },
  ];
  const result = selectModelsForImport("openrouter", models, false);
  assert.equal(result.models.length, 2);
  assert.equal(result.freeFilterEmpty, false);
});

test("selectModelsForImport: keeps only free models when importFreeOnly is true", () => {
  const models = [
    { id: "free-one:free" },
    { id: "paid-one", pricing: { prompt: "0.01", completion: "0.02" } },
    { id: "free-two", pricing: { prompt: "0", completion: "0" } },
  ];
  const result = selectModelsForImport("openrouter", models, true);
  assert.deepEqual(
    result.models.map((m) => m.id),
    ["free-one:free", "free-two"]
  );
  assert.equal(result.freeFilterEmpty, false);
});

test("selectModelsForImport: flags freeFilterEmpty when models exist but none are free", () => {
  const models = [{ id: "paid", pricing: { prompt: "0.01", completion: "0.02" } }];
  const result = selectModelsForImport("openrouter", models, true);
  assert.equal(result.models.length, 0);
  assert.equal(result.freeFilterEmpty, true);
});

test("selectModelsForImport: empty fetched list is not flagged as freeFilterEmpty", () => {
  const result = selectModelsForImport("openrouter", [], true);
  assert.equal(result.models.length, 0);
  assert.equal(result.freeFilterEmpty, false);
});

test("sortModelsFreeFirst: free models come before paid ones", () => {
  const items = [
    { id: "z-paid", isFree: false },
    { id: "a-free", isFree: true },
    { id: "m-paid", isFree: false },
    { id: "b-free", isFree: true },
  ];
  const sorted = sortModelsFreeFirst(items, { isFree: (m) => m.isFree, key: (m) => m.id });
  assert.deepEqual(
    sorted.map((m) => m.id),
    ["a-free", "b-free", "m-paid", "z-paid"]
  );
});

test("sortModelsFreeFirst: deterministic (alphabetical) within each group, regardless of input order", () => {
  const a = sortModelsFreeFirst(
    [
      { id: "c", isFree: true },
      { id: "a", isFree: true },
      { id: "b", isFree: true },
    ],
    { isFree: (m) => m.isFree, key: (m) => m.id }
  );
  // Re-sorting a shuffled copy yields the same order — stable across refetch/re-render.
  const b = sortModelsFreeFirst(
    [
      { id: "b", isFree: true },
      { id: "c", isFree: true },
      { id: "a", isFree: true },
    ],
    { isFree: (m) => m.isFree, key: (m) => m.id }
  );
  assert.deepEqual(a.map((m) => m.id), ["a", "b", "c"]);
  assert.deepEqual(b.map((m) => m.id), ["a", "b", "c"]);
});

test("sortModelsFreeFirst: does not mutate the input array", () => {
  const items = [
    { id: "z", isFree: false },
    { id: "a", isFree: true },
  ];
  const before = items.map((m) => m.id);
  sortModelsFreeFirst(items, { isFree: (m) => m.isFree, key: (m) => m.id });
  assert.deepEqual(items.map((m) => m.id), before);
});
