import test from "node:test";
import assert from "node:assert/strict";

import { PROVIDER_MAX_TOKENS } from "../../open-sse/config/constants.ts";
import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";

test("SenseNova Token Plan catalog exposes only supported chat models with 64K output", () => {
  const models = getModelsByProviderId("sensenova");
  const ids = new Set(models.map((model) => model.id));

  assert.ok(ids.has("sensenova-6.7-flash-lite"));
  assert.ok(ids.has("deepseek-v4-flash"));
  assert.ok(ids.has("glm-5.2"));
  assert.equal(ids.has("sensenova-u1-fast"), false, "U1 Fast is not a chat-completions model");

  for (const model of models) {
    assert.equal(
      model.maxOutputTokens,
      65536,
      `${model.id} should use Token Plan's 64K output cap`
    );
  }

  assert.equal(PROVIDER_MAX_TOKENS.sensenova, 65536);
});
