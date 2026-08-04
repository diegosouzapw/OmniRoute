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

const { resolveEndpointCategory } = await import(
  "../../src/shared/constants/endpointCategories.ts"
);

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
