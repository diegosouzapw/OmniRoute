// Regression guard for the Morph curated-model catalog refresh (PR #7314):
// adds morph-glm52-744b and morph-minimax3-428b, removes the retired
// morph-minimax27-230b. CHAT_OPENAI_COMPAT_MODELS.morph in
// open-sse/config/providers/shared.ts is the single source of truth consumed
// by the OpenAI-compat chat provider wiring (see tests/unit/chat-openai-compat-providers.test.ts).

import test from "node:test";
import assert from "node:assert/strict";

import { CHAT_OPENAI_COMPAT_MODELS } from "../../open-sse/config/providers/shared.ts";

const morphModels = CHAT_OPENAI_COMPAT_MODELS.morph;

test("morph catalog is registered and non-empty", () => {
  assert.ok(Array.isArray(morphModels), "CHAT_OPENAI_COMPAT_MODELS.morph must be an array");
  assert.ok(morphModels.length > 0, "morph catalog must not be empty");
});

test("morph catalog includes the newly-added morph-glm52-744b", () => {
  const model = morphModels.find((m) => m.id === "morph-glm52-744b");
  assert.ok(model, "morph-glm52-744b missing from CHAT_OPENAI_COMPAT_MODELS.morph");
  assert.equal(model.name, "GLM-5.2 744B (Morph)");
  assert.equal(model.contextLength, 1048576);
});

test("morph catalog includes the newly-added morph-minimax3-428b", () => {
  const model = morphModels.find((m) => m.id === "morph-minimax3-428b");
  assert.ok(model, "morph-minimax3-428b missing from CHAT_OPENAI_COMPAT_MODELS.morph");
  assert.equal(model.name, "MiniMax M3 (Morph)");
  assert.equal(model.contextLength, 262144);
});

test("morph catalog no longer includes the retired morph-minimax27-230b (MiniMax M2.7)", () => {
  const ids = morphModels.map((m) => m.id);
  assert.equal(
    ids.includes("morph-minimax27-230b"),
    false,
    "morph-minimax27-230b (MiniMax M2.7) should have been removed by the curated-model refresh"
  );
});

test("morph catalog keeps the untouched pre-existing models", () => {
  const ids = new Set(morphModels.map((m) => m.id));
  for (const id of [
    "morph-v3-large",
    "morph-v3-fast",
    "morph-qwen35-397b",
    "morph-qwen36-27b",
    "morph-dsv4flash",
  ]) {
    assert.ok(ids.has(id), `${id} should still be present in the morph catalog`);
  }
});

test("morph catalog has no duplicate model ids", () => {
  const ids = morphModels.map((m) => m.id);
  const uniqueIds = new Set(ids);
  assert.equal(uniqueIds.size, ids.length, "morph catalog contains duplicate model ids");
});
