import assert from "node:assert/strict";
import test from "node:test";

import { freeinferenceProvider } from "../../open-sse/config/providers/registry/freeinference/index.ts";
import {
  DefaultExecutor,
  getExecutor,
  hasSpecializedExecutor,
} from "../../open-sse/executors/index.ts";

test("FreeInference exposes an OpenAI-compatible Bearer registry", () => {
  assert.equal(freeinferenceProvider.id, "freeinference");
  assert.equal(freeinferenceProvider.alias, "freeinference");
  assert.equal(freeinferenceProvider.format, "openai");
  assert.equal(freeinferenceProvider.executor, "default");
  assert.equal(freeinferenceProvider.authType, "apikey");
  assert.equal(freeinferenceProvider.authHeader, "bearer");
  assert.equal(freeinferenceProvider.baseUrl, "https://freeinference.org/v1/chat/completions");
  assert.equal(freeinferenceProvider.modelsUrl, "https://freeinference.org/v1/models");
  assert.deepEqual(freeinferenceProvider.models, []);
  assert.equal(freeinferenceProvider.passthroughModels, true);
});

test("FreeInference uses DefaultExecutor without specialized behavior", async () => {
  assert.equal(hasSpecializedExecutor("freeinference"), false);
  assert.ok(await getExecutor("freeinference") instanceof DefaultExecutor);
});
