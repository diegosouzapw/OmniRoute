import test from "node:test";
import assert from "node:assert/strict";

import { normalizeCodexBaseUrl } from "../../src/shared/utils/codexBaseUrl.ts";

test("normalizeCodexBaseUrl keeps Codex responses base URLs at the API root", () => {
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128/v1/responses", "responses"),
    "http://127.0.0.1:20128/api/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128/api/v1/responses", "responses"),
    "http://127.0.0.1:20128/api/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128/v1", "responses"),
    "http://127.0.0.1:20128/api/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128/v1/responses/responses", "responses"),
    "http://127.0.0.1:20128/api/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128/v1/responses/compact", "responses"),
    "http://127.0.0.1:20128/api/v1"
  );
});

test("normalizeCodexBaseUrl leaves chat normalization behavior intact", () => {
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128/v1", "chat"),
    "http://127.0.0.1:20128/api/v1"
  );
  assert.equal(
    normalizeCodexBaseUrl("http://127.0.0.1:20128", "chat"),
    "http://127.0.0.1:20128/api/v1"
  );
});
