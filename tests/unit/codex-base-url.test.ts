import test from "node:test";
import assert from "node:assert/strict";

import { normalizeCodexBaseUrl } from "../../src/shared/utils/codexBaseUrl.ts";

test("normalizeCodexBaseUrl keeps Codex responses base URLs at the canonical v1 root", () => {
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128/v1/responses", "responses"),
    "http://127.0.0.1:20128/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128/api/v1/responses", "responses"),
    "http://127.0.0.1:20128/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128/v1", "responses"),
    "http://127.0.0.1:20128/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128/v1/responses/responses", "responses"),
    "http://127.0.0.1:20128/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128/v1/responses/compact", "responses"),
    "http://127.0.0.1:20128/v1"
  );
});

test("normalizeCodexBaseUrl uses the bridge-compatible v1 path for chat", () => {
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20131/v1", "chat"),
    "http://127.0.0.1:20131/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20131", "chat"),
    "http://127.0.0.1:20131/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("https://api.example.com/api/v1", "chat"),
    "https://api.example.com/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("https://api.example.com/proxy/api/v1?source=ui#config", "chat"),
    "https://api.example.com/proxy/v1"
  );
});

test("normalizeCodexBaseUrl keeps relative fallback URLs on v1", () => {
  assert.equal(normalizeCodexBaseUrl("/proxy/api/v1", "chat"), "/proxy/v1");
});
