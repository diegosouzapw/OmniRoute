import assert from "node:assert/strict";
import test from "node:test";

import { freeAiProvider } from "../../open-sse/config/providers/registry/free-ai/index.ts";
import {
  DefaultExecutor,
  getExecutor,
  hasSpecializedExecutor,
} from "../../open-sse/executors/index.ts";

test("Free.ai exposes its exact OpenAI-compatible endpoint and live catalog", () => {
  assert.equal(freeAiProvider.id, "free-ai");
  assert.equal(freeAiProvider.alias, "free-ai");
  assert.equal(freeAiProvider.format, "openai");
  assert.equal(freeAiProvider.executor, "default");
  assert.equal(freeAiProvider.authType, "apikey");
  assert.equal(freeAiProvider.authHeader, "bearer");
  assert.equal(freeAiProvider.baseUrl, "https://api.free.ai/v1/chat/");
  assert.equal(freeAiProvider.modelsUrl, "https://api.free.ai/v1/models");
  assert.deepEqual(freeAiProvider.models, []);
  assert.equal(freeAiProvider.passthroughModels, true);
});

test("Free.ai uses DefaultExecutor without a specialized executor", async () => {
  assert.ok(await getExecutor("free-ai") instanceof DefaultExecutor);
  assert.equal(hasSpecializedExecutor("free-ai"), false);
});
