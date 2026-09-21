// #13376 — "Test all models" dispatched image/music/video generation models
// as chat completions, incurring real billable generations the operator never
// asked for. This test verifies detectTestKind flags non-chat generation models
// and runSingleModelTest skips them.

import test from "node:test";
import assert from "node:assert/strict";

import { detectTestKind } from "../../src/lib/api/modelTestRunner.ts";

const serial = { concurrency: false };

test("#13376 — detectTestKind flags image-generation-only models", serial, () => {
  const result = detectTestKind(
    "openai/dall-e-3",
    { supportedEndpoints: ["images"] },
    undefined
  );
  assert.equal(result.isNonChatGeneration, true, "image-only model should be flagged");
  assert.equal(result.isEmbedding, false);
  assert.equal(result.isRerank, false);
});

test("#13376 — detectTestKind flags music-generation-only models", serial, () => {
  const result = detectTestKind(
    "suno/suno-v3",
    { supportedEndpoints: ["music"] },
    undefined
  );
  assert.equal(result.isNonChatGeneration, true, "music-only model should be flagged");
});

test("#13376 — detectTestKind flags video-generation-only models", serial, () => {
  const result = detectTestKind(
    "runway/runway-gen3",
    { supportedEndpoints: ["videos"] },
    undefined
  );
  assert.equal(result.isNonChatGeneration, true, "video-only model should be flagged");
});

test("#13376 — detectTestKind does NOT flag chat+image models", serial, () => {
  const result = detectTestKind(
    "openai/gpt-4o",
    { supportedEndpoints: ["chat", "images"] },
    undefined
  );
  assert.equal(result.isNonChatGeneration, false, "chat-capable model should NOT be flagged");
});

test("#13376 — detectTestKind does NOT flag models with no supportedEndpoints", serial, () => {
  const result = detectTestKind(
    "openai/gpt-4o",
    { supportedEndpoints: [] },
    undefined
  );
  assert.equal(
    result.isNonChatGeneration,
    false,
    "model with empty supportedEndpoints should NOT be flagged"
  );
});

test("#13376 — detectTestKind does NOT flag plain chat models", serial, () => {
  const result = detectTestKind(
    "anthropic/claude-3.5-sonnet",
    { supportedEndpoints: ["chat"] },
    undefined
  );
  assert.equal(result.isNonChatGeneration, false, "chat-only model should NOT be flagged");
});

test("#13376 — detectTestKind does NOT flag embedding models", serial, () => {
  const result = detectTestKind(
    "openai/text-embedding-3-small",
    { supportedEndpoints: ["embeddings"] },
    undefined
  );
  assert.equal(result.isNonChatGeneration, false, "embedding model should NOT be flagged");
  assert.equal(result.isEmbedding, true);
});

test("#13376 — detectTestKind does NOT flag models with no customModel metadata", serial, () => {
  const result = detectTestKind("openai/gpt-4o", undefined, undefined);
  assert.equal(
    result.isNonChatGeneration,
    false,
    "model without metadata should NOT be flagged"
  );
});
