import { test } from "node:test";
import assert from "node:assert/strict";

import { stripUnsupportedParams } from "../../../open-sse/translator/paramSupport.ts";

/**
 * Regression guard for the Azure gpt-4o-mini completion-token ceiling.
 *
 * Observed against a live Azure deployment:
 *   azure-openai/gpt-4o-mini-dz
 *     -> 400 "max_tokens is too large: 32000. This model supports at most
 *            16384 completion tokens, whereas you provided 32000."
 *
 * The 32000 is OmniRoute's own doing: `adjustMaxTokens` raises any smaller
 * max_tokens to DEFAULT_MIN_TOKENS (32000) whenever tools are present, so an
 * agentic client trips this on its first turn even when it asked for far less.
 */

test("azure gpt-4o-mini clamps max_tokens to the 16384 ceiling", () => {
  const out = stripUnsupportedParams("azure-openai", "gpt-4o-mini-dz", {
    max_tokens: 32000,
    messages: [],
  }) as Record<string, unknown>;

  assert.equal(out.max_tokens, 16384);
});

test("the clamp applies on the azure-ai wire path too", () => {
  const out = stripUnsupportedParams("azure-ai", "gpt-4o-mini", {
    max_completion_tokens: 32000,
  }) as Record<string, unknown>;

  assert.equal(out.max_completion_tokens, 16384);
});

test("a value already under the ceiling is left alone", () => {
  const out = stripUnsupportedParams("azure-openai", "gpt-4o-mini", {
    max_tokens: 800,
  }) as Record<string, unknown>;

  assert.equal(out.max_tokens, 800);
});

test("the clamp is scoped — larger Azure deployments keep their budget", () => {
  const out = stripUnsupportedParams("azure-ai", "gpt-5.1", {
    max_tokens: 32000,
  }) as Record<string, unknown>;

  assert.equal(out.max_tokens, 32000);
});

test("the clamp does not leak to gpt-4o-mini on other providers", () => {
  const out = stripUnsupportedParams("openai", "gpt-4o-mini", {
    max_tokens: 32000,
  }) as Record<string, unknown>;

  assert.equal(out.max_tokens, 32000);
});
