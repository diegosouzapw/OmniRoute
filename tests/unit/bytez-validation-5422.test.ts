import test from "node:test";
import assert from "node:assert/strict";

import { bytezValidationResultFromStatus } from "../../src/lib/providers/validation.ts";
import { bytezProvider } from "../../open-sse/config/providers/registry/bytez/index.ts";

// #5422 — Bytez key validation cannot use a chat probe. A Bytez account only serves models
// that have been added to its catalog, so even Bytez's own documented model ids return 404
// ("Model does not exist or has yet to be added to the Bytez catalog") for a fresh/free key —
// the generic OpenAI-like chat probe misreads that 404 as "endpoint not supported". The fix
// validates against the model-independent, auth-only tasks endpoint instead (verified live):
//   GET …/models/v2/list/tasks → 200 (valid key) | 401 { error: "Unauthorized" } (invalid).
// The pure status→result mapping below is the unit-testable core of that validator.

test("#5422 bytez status→result: 200 is valid", () => {
  assert.deepEqual(bytezValidationResultFromStatus(200), { valid: true, error: null });
});

test("#5422 bytez status→result: 401/403 is an invalid API key", () => {
  assert.deepEqual(bytezValidationResultFromStatus(401), {
    valid: false,
    error: "Invalid API key",
  });
  assert.deepEqual(bytezValidationResultFromStatus(403), {
    valid: false,
    error: "Invalid API key",
  });
});

test("#5422 bytez status→result: other non-OK is a generic validation failure", () => {
  assert.deepEqual(bytezValidationResultFromStatus(500), {
    valid: false,
    error: "Validation failed: 500",
  });
});

// Part A — the registry baseUrl must carry the full OpenAI-compat chat path so chat resolves
// once an account has catalog models (the bare `…/models/v2` base made the probe hit
// `…/models/v2/chat/completions` → 404).
test("#5422 bytez registry baseUrl carries the full OpenAI-compat chat path", () => {
  assert.ok(
    bytezProvider.baseUrl.endsWith("/models/v2/openai/v1/chat/completions"),
    `baseUrl must end with the OpenAI-compat chat path, got: ${bytezProvider.baseUrl}`
  );
});
