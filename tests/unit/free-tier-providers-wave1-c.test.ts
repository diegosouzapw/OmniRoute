import assert from "node:assert/strict";
import test from "node:test";

import { llmKiwiProvider } from "../../open-sse/config/providers/registry/llm-kiwi/index.ts";
import { llmgatewayProvider } from "../../open-sse/config/providers/registry/llmgateway/index.ts";

test("llmgateway uses a dynamic OpenAI-compatible Bearer API", () => {
  assert.equal(llmgatewayProvider.id, "llmgateway");
  assert.equal(llmgatewayProvider.alias, "llmgateway");
  assert.equal(llmgatewayProvider.format, "openai");
  assert.equal(llmgatewayProvider.executor, "default");
  assert.equal(llmgatewayProvider.authType, "apikey");
  assert.equal(llmgatewayProvider.authHeader, "bearer");
  assert.equal(llmgatewayProvider.baseUrl, "https://api.llmgateway.io/v1/chat/completions");
  assert.equal(llmgatewayProvider.modelsUrl, "https://api.llmgateway.io/v1/models");
  assert.equal(llmgatewayProvider.passthroughModels, true);
  assert.deepEqual(llmgatewayProvider.models, []);
});

test("llm-kiwi seeds only its confirmed free models while retaining live discovery", () => {
  assert.equal(llmKiwiProvider.id, "llm-kiwi");
  assert.equal(llmKiwiProvider.alias, "llmkiwi");
  assert.equal(llmKiwiProvider.format, "openai");
  assert.equal(llmKiwiProvider.executor, "default");
  assert.equal(llmKiwiProvider.authType, "apikey");
  assert.equal(llmKiwiProvider.authHeader, "bearer");
  assert.equal(llmKiwiProvider.baseUrl, "https://api.llm.kiwi/v1/chat/completions");
  assert.equal(llmKiwiProvider.modelsUrl, "https://api.llm.kiwi/v1/models");
  assert.equal(llmKiwiProvider.passthroughModels, true);
  assert.deepEqual(llmKiwiProvider.models, [
    { id: "auto", name: "Auto" },
    { id: "hrLLM", name: "hrLLM" },
  ]);
});
