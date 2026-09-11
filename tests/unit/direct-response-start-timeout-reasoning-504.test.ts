// Regression guard for the 504 regression introduced by 142ae9349
// "fix(network): bound direct-path response-start timeout".
//
// Root cause: directResponseStartTimeout resolved a FLAT timeout
// (OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS or 30s default) with zero
// awareness of reasoning effort. GLM-5.2 reasoning.effort=max has ~78s
// TTFB; the stream-readiness layer already allows 180s for reasoning
// models (streamReadinessPolicy claude_format_heavy_reasoning /
// codex_gpt_5_5_high_reasoning bumps), but the fetch layer below it
// cut the request at 30s (×2 = 60s 504) — and even 90s was still short.
//
// The fix: resolveDirectHeadersTimeoutMs inspects the serialized
// request body for a high/max reasoning effort selector and raises the
// per-attempt TTFB budget to align with the stream-readiness ceiling
// (180s) so the fetch layer no longer pre-empts a warm reasoning
// response that the readiness layer would have permitted.
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveDirectHeadersTimeoutMs } from "../../open-sse/utils/directResponseStartTimeout.ts";

const REASONING_HIGH_BODY = JSON.stringify({
  model: "glm-5.2",
  reasoning_effort: "high",
  messages: [{ role: "user", content: "hi" }],
});
const REASONING_MAX_BODY = JSON.stringify({
  model: "glm-5.3",
  reasoning: { effort: "max" },
  messages: [{ role: "user", content: "hi" }],
});
const NON_REASONING_BODY = JSON.stringify({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "hi" }],
});

test("flat default is 30s when no body and no env override", () => {
  assert.equal(
    resolveDirectHeadersTimeoutMs({ OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined }),
    30_000
  );
});

test("env override is honored when no reasoning body is present", () => {
  assert.equal(
    resolveDirectHeadersTimeoutMs({ OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "90000" }),
    90_000
  );
});

test("reasoning_effort=high body raises TTFB budget to the readiness ceiling (180s)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined },
    REASONING_HIGH_BODY
  );
  assert.equal(got, 180_000, "high reasoning must align with the 180s readiness ceiling");
});

test("reasoning.effort=max nested body raises TTFB budget to the readiness ceiling (180s)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined },
    REASONING_MAX_BODY
  );
  assert.equal(got, 180_000, "max reasoning must align with the 180s readiness ceiling");
});

test("reasoning body never yields a budget BELOW an explicit env override above the ceiling", () => {
  // Operator override is a floor; reasoning awareness only raises, never lowers.
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "240000" },
    REASONING_HIGH_BODY
  );
  assert.equal(got, 240_000, "explicit override above ceiling is preserved");
});

test("non-reasoning body keeps the flat default (zombie-socket detection preserved)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined },
    NON_REASONING_BODY
  );
  assert.equal(got, 30_000, "non-reasoning requests keep 30s to detect zombie sockets");
});

test("non-reasoning body keeps the env override (no reasoning bump applied)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "90000" },
    NON_REASONING_BODY
  );
  assert.equal(got, 90_000);
});
