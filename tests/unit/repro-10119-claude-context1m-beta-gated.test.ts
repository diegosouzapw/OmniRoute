import { test } from "node:test";
import assert from "node:assert/strict";

import { mergeClientAnthropicBeta, FORWARDABLE_CLIENT_BETAS } from "../../open-sse/config/anthropicHeaders.ts";

// Issue #10119: a client can negotiate `anthropic-beta: context-1m-2025-08-07` for ONE member
// of a combo and have the SAME request re-routed (combo/fallback) to a model that does not
// qualify for the long-context beta (e.g. claude-haiku-4-5-20251001). Previously
// mergeClientAnthropicBeta() forwarded any client-negotiated beta on the allowlist with ZERO
// model eligibility check, so the qualifying beta reached Haiku too and Anthropic rejected it
// with "long context beta is not yet available for this subscription". The merge must now drop
// context-1m-2025-08-07 when a resolved model is supplied and does not support the beta.

const CONTEXT_1M = "context-1m-2025-08-07";
const BASE = "claude-code-20250219,oauth-2025-04-20";

test("drops client-negotiated context-1m beta when the model does not support it", () => {
  const out = mergeClientAnthropicBeta(BASE, CONTEXT_1M, undefined, "claude-haiku-4-5-20251001");
  assert.ok(
    !out.split(",").includes(CONTEXT_1M),
    "context-1m must not be forwarded to a Haiku target"
  );
  assert.equal(out, BASE, "the base beta set is otherwise preserved");
});

test("keeps context-1m beta when the model supports it", () => {
  const out = mergeClientAnthropicBeta(BASE, CONTEXT_1M, undefined, "claude-sonnet-5");
  assert.ok(
    out.split(",").includes(CONTEXT_1M),
    "a context-1m-eligible model keeps the client's [1m] negotiation"
  );
});

test("preserves client-negotiated context-1m when no model context is supplied", () => {
  // Callers that do not thread a resolved model (legacy signature) keep the prior
  // forwarding behavior — gating only engages when a model is explicitly resolved.
  const out = mergeClientAnthropicBeta(BASE, CONTEXT_1M);
  assert.ok(out.split(",").includes(CONTEXT_1M), "no-model merge keeps prior forwarding behavior");
});

test("context-1m remains on the forwardable allowlist", () => {
  assert.ok(FORWARDABLE_CLIENT_BETAS.includes(CONTEXT_1M));
});