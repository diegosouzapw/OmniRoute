import test from "node:test";
import assert from "node:assert/strict";

import { dahlProvider } from "../../open-sse/config/providers/registry/dahl/index.ts";

test("dahlProvider registry entry has correct configuration", () => {
  assert.equal(dahlProvider.id, "dahl");
  assert.equal(dahlProvider.alias, "dahl");
  assert.equal(dahlProvider.format, "openai");
  assert.equal(dahlProvider.executor, "openai-compatible");
  assert.equal(
    dahlProvider.baseUrl,
    "https://inference.dahl.global/v1/chat/completions",
  );
  assert.equal(dahlProvider.authType, "apikey");
  assert.equal(dahlProvider.passthroughModels, false);
  assert.equal(dahlProvider.models.length, 2);
  assert.equal(dahlProvider.models[0].id, "MiniMaxAI/MiniMax-M2.7");
  assert.equal(dahlProvider.models[1].id, "moonshotai/Kimi-K2.6");
});
