/**
 * Unit tests for endpoint category resolution and API key endpoint restrictions.
 *
 * Tests:
 *   1. resolveEndpointCategory — path → category mapping
 *   2. enforceApiKeyPolicy — endpoint restriction enforcement
 */

import test from "node:test";
import assert from "node:assert/strict";

// ─── resolveEndpointCategory: pure function tests ─────────────────────────
// Import the pure resolver without DB dependencies

const { resolveCanonicalEndpointPath, resolveEndpointCategory } =
  await import("../../src/shared/constants/endpointCategories.ts");

test("resolveEndpointCategory: maps /v1/chat/completions to 'chat'", () => {
  assert.equal(resolveEndpointCategory("/v1/chat/completions"), "chat");
});

test("resolveEndpointCategory: maps /v1/completions to 'chat'", () => {
  assert.equal(resolveEndpointCategory("/v1/completions"), "chat");
});

test("resolveEndpointCategory: maps /v1/messages to 'chat'", () => {
  assert.equal(resolveEndpointCategory("/v1/messages"), "chat");
});

test("resolveEndpointCategory: maps /v1/responses to 'chat'", () => {
  assert.equal(resolveEndpointCategory("/v1/responses"), "chat");
});

test("resolveEndpointCategory: maps /v1/search to 'search'", () => {
  assert.equal(resolveEndpointCategory("/v1/search"), "search");
});

test("resolveEndpointCategory: maps /v1/search/analytics to 'search'", () => {
  assert.equal(resolveEndpointCategory("/v1/search/analytics"), "search");
});

test("resolveEndpointCategory: maps /v1/embeddings to 'embeddings'", () => {
  assert.equal(resolveEndpointCategory("/v1/embeddings"), "embeddings");
});

test("resolveEndpointCategory: maps /v1/multimodal-embeddings to 'embeddings'", () => {
  assert.equal(resolveEndpointCategory("/v1/multimodal-embeddings"), "embeddings");
});

test("resolveEndpointCategory: maps /v1/images/generations to 'images'", () => {
  assert.equal(resolveEndpointCategory("/v1/images/generations"), "images");
});

test("resolveEndpointCategory: maps /v1/images/edits to 'images'", () => {
  assert.equal(resolveEndpointCategory("/v1/images/edits"), "images");
});

test("resolveEndpointCategory: maps /v1/audio/speech to 'audio'", () => {
  assert.equal(resolveEndpointCategory("/v1/audio/speech"), "audio");
});

test("resolveEndpointCategory: maps /v1/audio/transcriptions to 'audio'", () => {
  assert.equal(resolveEndpointCategory("/v1/audio/transcriptions"), "audio");
});

test("resolveEndpointCategory: maps /v1/videos/generations to 'video'", () => {
  assert.equal(resolveEndpointCategory("/v1/videos/generations"), "video");
});

test("resolveEndpointCategory: maps /v1/music/generations to 'music'", () => {
  assert.equal(resolveEndpointCategory("/v1/music/generations"), "music");
});

test("resolveEndpointCategory: maps /v1/rerank to 'rerank'", () => {
  assert.equal(resolveEndpointCategory("/v1/rerank"), "rerank");
});

test("resolveEndpointCategory: maps /v1/models to 'models'", () => {
  assert.equal(resolveEndpointCategory("/v1/models"), "models");
});

test("resolveEndpointCategory: maps /v1/moderations to 'moderations'", () => {
  assert.equal(resolveEndpointCategory("/v1/moderations"), "moderations");
});

test("resolveEndpointCategory: maps /v1/ocr to 'ocr'", () => {
  assert.equal(resolveEndpointCategory("/v1/ocr"), "ocr");
});

test("resolveEndpointCategory: maps /v1/batches to 'batches'", () => {
  assert.equal(resolveEndpointCategory("/v1/batches"), "batches");
});

test("resolveEndpointCategory: maps /v1/files to 'files'", () => {
  assert.equal(resolveEndpointCategory("/v1/files"), "files");
});

test("resolveEndpointCategory: maps /v1/web/fetch to 'web-fetch'", () => {
  assert.equal(resolveEndpointCategory("/v1/web/fetch"), "web-fetch");
});

test("resolveEndpointCategory: maps /v1/agents/tasks to 'agents'", () => {
  assert.equal(resolveEndpointCategory("/v1/agents/tasks"), "agents");
});

test("resolveEndpointCategory: maps /v1/speech-to-text to 'elevenlabs'", () => {
  assert.equal(resolveEndpointCategory("/v1/speech-to-text"), "elevenlabs");
});

test("resolveEndpointCategory: maps /v1/text-to-speech/voice_123 to 'elevenlabs'", () => {
  assert.equal(resolveEndpointCategory("/v1/text-to-speech/voice_123"), "elevenlabs");
});

test("resolveEndpointCategory: maps /v1/voices to 'elevenlabs'", () => {
  assert.equal(resolveEndpointCategory("/v1/voices"), "elevenlabs");
});

test("resolveEndpointCategory: returns null for unknown path", () => {
  assert.equal(resolveEndpointCategory("/v1/unknown"), null);
});

test("resolveEndpointCategory: returns null for management /api/keys", () => {
  assert.equal(resolveEndpointCategory("/api/keys"), null);
});

test("resolveEndpointCategory: returns null for root path", () => {
  assert.equal(resolveEndpointCategory("/"), null);
});

test("resolveEndpointCategory: handles sub-paths under category", () => {
  assert.equal(resolveEndpointCategory("/v1/files/some-file-id"), "files");
  assert.equal(resolveEndpointCategory("/v1/batches/batch-123"), "batches");
  assert.equal(resolveEndpointCategory("/v1/responses/some/path"), "chat");
});

test("resolveEndpointCategory: maps /v1/batches/delete-completed to 'batches' (bulk sweep is policy-gated)", () => {
  assert.equal(resolveEndpointCategory("/v1/batches/delete-completed"), "batches");
});

// ─── resolveCanonicalEndpointPath: alias spellings from next.config.mjs ───
// A route handler sees the client's original URL, so an alias spelling has to
// be mapped onto the canonical `/v1/…` path or the category check is skipped
// altogether (#13685).

test("resolveCanonicalEndpointPath: maps /chat/completions onto the chat endpoint", () => {
  assert.equal(resolveCanonicalEndpointPath("/chat/completions"), "/v1/chat/completions");
  assert.equal(resolveEndpointCategory(resolveCanonicalEndpointPath("/chat/completions")), "chat");
});

test("resolveCanonicalEndpointPath: maps /responses and its sub-paths onto the responses endpoint", () => {
  assert.equal(resolveCanonicalEndpointPath("/responses"), "/v1/responses");
  assert.equal(
    resolveCanonicalEndpointPath("/responses/input_tokens"),
    "/v1/responses/input_tokens"
  );
  assert.equal(resolveEndpointCategory(resolveCanonicalEndpointPath("/responses")), "chat");
  assert.equal(
    resolveEndpointCategory(resolveCanonicalEndpointPath("/responses/input_tokens")),
    "chat"
  );
});

test("resolveCanonicalEndpointPath: maps /models onto the models endpoint", () => {
  assert.equal(resolveCanonicalEndpointPath("/models"), "/v1/models");
  assert.equal(resolveEndpointCategory(resolveCanonicalEndpointPath("/models")), "models");
});

test("resolveCanonicalEndpointPath: /codex/… lands on the responses endpoint", () => {
  assert.equal(resolveCanonicalEndpointPath("/codex"), "/v1/responses");
  assert.equal(resolveCanonicalEndpointPath("/codex/tasks/abc"), "/v1/responses/tasks/abc");
  assert.equal(resolveEndpointCategory(resolveCanonicalEndpointPath("/codex/tasks/abc")), "chat");
});

test("resolveCanonicalEndpointPath: collapses the doubled /v1/v1 prefix", () => {
  assert.equal(resolveCanonicalEndpointPath("/v1/v1/chat/completions"), "/v1/chat/completions");
  assert.equal(resolveCanonicalEndpointPath("/v1/v1/models"), "/v1/models");
  // `/v1/v1` alone maps onto the API root, which carries no category.
  assert.equal(resolveEndpointCategory(resolveCanonicalEndpointPath("/v1/v1")), null);
});

test("resolveCanonicalEndpointPath: the /api/v1 App Router shape stays canonical", () => {
  assert.equal(resolveCanonicalEndpointPath("/api/v1/chat/completions"), "/v1/chat/completions");
  assert.equal(
    resolveCanonicalEndpointPath("/api/v1/images/generations"),
    "/v1/images/generations"
  );
});

test("resolveCanonicalEndpointPath: canonical and uncategorised paths come back unchanged", () => {
  assert.equal(resolveCanonicalEndpointPath("/v1/chat/completions"), "/v1/chat/completions");
  assert.equal(resolveCanonicalEndpointPath("/v1/search/analytics"), "/v1/search/analytics");
  assert.equal(resolveCanonicalEndpointPath("/"), "/");
  assert.equal(resolveCanonicalEndpointPath("/api/keys"), "/api/keys");
  assert.equal(resolveCanonicalEndpointPath("/dashboard"), "/dashboard");
});
