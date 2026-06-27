// Regression test for #1475 — duplicate case-variant Anthropic headers.
//
// Node/undici's fetch lowercases and MERGES same-name headers, so an outbound
// set carrying both "anthropic-version" and "Anthropic-Version" collapses into
// a single "anthropic-version: 2023-06-01, 2023-06-01" value, which the
// Anthropic API rejects. normalizeAnthropicHeaderVariants() reconciles the two
// case variants down to one canonical lowercase header with a single value
// (and a deduped, joined comma-list for anthropic-beta) before the request is
// dispatched in BaseExecutor.buildHeaders / DefaultExecutor.buildHeaders.

import test from "node:test";
import assert from "node:assert/strict";

import { normalizeAnthropicHeaderVariants } from "../../open-sse/config/anthropicHeaders.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("normalizeAnthropicHeaderVariants collapses case-variant anthropic-version into one value", () => {
  const headers: Record<string, string> = {
    "anthropic-version": "2023-06-01",
    "Anthropic-Version": "2023-06-01",
  };

  normalizeAnthropicHeaderVariants(headers);

  // The mixed-case variant must be gone, and the lowercase one must carry a
  // single value (no "v, v" duplication that Anthropic rejects).
  assert.equal(headers["Anthropic-Version"], undefined);
  assert.equal(headers["anthropic-version"], "2023-06-01");
  assert.ok(!headers["anthropic-version"].includes(","));
});

test("normalizeAnthropicHeaderVariants dedupes and joins anthropic-beta variants", () => {
  const headers: Record<string, string> = {
    "anthropic-beta": "oauth-2025-04-20, prompt-caching",
    "Anthropic-Beta": "prompt-caching, fine-grained",
  };

  normalizeAnthropicHeaderVariants(headers);

  assert.equal(headers["Anthropic-Beta"], undefined);
  assert.equal(headers["anthropic-beta"], "oauth-2025-04-20,prompt-caching,fine-grained");
});

test("normalizeAnthropicHeaderVariants leaves a single lowercase header untouched", () => {
  const headers: Record<string, string> = { "anthropic-version": "2023-06-01" };
  normalizeAnthropicHeaderVariants(headers);
  assert.equal(headers["anthropic-version"], "2023-06-01");
  assert.equal(headers["Anthropic-Version"], undefined);
});

test("normalizeAnthropicHeaderVariants is a no-op when no anthropic headers are present", () => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  normalizeAnthropicHeaderVariants(headers);
  assert.deepEqual(headers, { "Content-Type": "application/json" });
});

test("DefaultExecutor.buildHeaders does not emit duplicate anthropic-version variants for an anthropic-compatible provider", () => {
  const executor = new DefaultExecutor("anthropic-compatible-test");
  const headers = executor.buildHeaders({ apiKey: "sk-test" }, true) as Record<string, string>;

  // Whatever case the upstream registry/auth path used, only the canonical
  // lowercase header survives, with exactly one value.
  assert.equal(headers["Anthropic-Version"], undefined);
  if (headers["anthropic-version"] !== undefined) {
    assert.ok(!headers["anthropic-version"].includes(","));
  }
});
