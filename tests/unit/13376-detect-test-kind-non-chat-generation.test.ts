/**
 * #13376 — detectTestKind must classify image/music/video/audio generation
 * models as non-chat-testable so Test all models doesn't burn billable generations.
 *
 * Before the fix, detectTestKind only recognized embeddings and rerank.
 * Everything else (including image/music/video/audio) fell through to chat
 * completion, dispatching real billable requests for non-chat generation models.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { detectTestKind } = await import("../../src/lib/api/modelTestRunner.ts");

// ── Embedding detection (unchanged baseline) ─────────────────────────────

test("detectTestKind: embedding model is detected", () => {
  const result = detectTestKind("openai/text-embedding-3-small", {
    supportedEndpoints: ["embeddings"],
  });
  assert.equal(result.isEmbedding, true);
  assert.equal(result.isRerank, false);
  assert.equal(result.isNonChatGeneration, false);
});

test("detectTestKind: rerank model is detected", () => {
  const result = detectTestKind("openai/cross-encoder-rerank", {
    supportedEndpoints: ["rerank"],
  });
  assert.equal(result.isRerank, true);
  assert.equal(result.isEmbedding, false);
  assert.equal(result.isNonChatGeneration, false);
});

// ── Chat model (no false positives) ──────────────────────────────────────

test("detectTestKind: chat model is not flagged as non-chat", () => {
  const result = detectTestKind("openai/gpt-4o", {
    supportedEndpoints: ["chat"],
  });
  assert.equal(result.isEmbedding, false);
  assert.equal(result.isRerank, false);
  assert.equal(result.isNonChatGeneration, false);
});

test("detectTestKind: unknown model defaults to chat", () => {
  const result = detectTestKind("openai/some-new-model", null);
  assert.equal(result.isEmbedding, false);
  assert.equal(result.isRerank, false);
  assert.equal(result.isNonChatGeneration, false);
});

// ── #13376: non-chat generation models ───────────────────────────────────

test("detectTestKind: image generation model is detected via supportedEndpoints", () => {
  const result = detectTestKind("openai/dall-e-3", {
    supportedEndpoints: ["images"],
  });
  assert.equal(result.isNonChatGeneration, true, "image model must be flagged");
  assert.equal(result.isEmbedding, false);
  assert.equal(result.isRerank, false);
});

test("detectTestKind: music generation model is detected via supportedEndpoints", () => {
  const result = detectTestKind("suno/suno-v4.0", {
    supportedEndpoints: ["music"],
  });
  assert.equal(result.isNonChatGeneration, true, "music model must be flagged");
});

test("detectTestKind: video generation model is detected via supportedEndpoints", () => {
  const result = detectTestKind("runwayml/gen-3", {
    supportedEndpoints: ["video"],
  });
  assert.equal(result.isNonChatGeneration, true, "video model must be flagged");
});

test("detectTestKind: audio model is detected via supportedEndpoints", () => {
  const result = detectTestKind("openai/whisper-1", {
    supportedEndpoints: ["audio"],
  });
  assert.equal(result.isNonChatGeneration, true, "audio model must be flagged");
});

test("detectTestKind: image generation detected via apiFormat", () => {
  const result = detectTestKind("provider/dall-e-3", {
    apiFormat: "image-generation",
  });
  assert.equal(result.isNonChatGeneration, true, "image-generation apiFormat must be flagged");
});

test("detectTestKind: music generation detected via apiFormat", () => {
  const result = detectTestKind("suno/suno-v4", {
    apiFormat: "music-generation",
  });
  assert.equal(result.isNonChatGeneration, true, "music-generation apiFormat must be flagged");
});

test("detectTestKind: model with multiple endpoints including images", () => {
  const result = detectTestKind("provider/multi-model", {
    supportedEndpoints: ["chat", "images"],
  });
  assert.equal(result.isNonChatGeneration, true, "model with images endpoint must be flagged");
  assert.equal(result.isEmbedding, false);
  assert.equal(result.isRerank, false);
});

test("detectTestKind: model with only chat endpoint is not flagged", () => {
  const result = detectTestKind("provider/chat-model", {
    supportedEndpoints: ["chat"],
  });
  assert.equal(result.isNonChatGeneration, false);
});

test("detectTestKind: customModel without supportedEndpoints defaults to chat", () => {
  const result = detectTestKind("openai/gpt-4o", {});
  assert.equal(result.isNonChatGeneration, false);
});
