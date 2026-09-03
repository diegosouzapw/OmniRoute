/**
 * #9971 — Non-stream MALFORMED-200/empty_choices false positive on `cc/` routes.
 *
 * A content-less-but-valid Claude body — thinking-only (with no visible text AND
 * no signature), redacted_thinking-only, or a truncated extended-thinking-only
 * stream cut before any text/signature landed — must be treated as VALID output,
 * not flagged as `empty_choices` (which became a false 502 / BAD_GATEWAY).
 *
 * Root cause (plan-file): the Claude Code OAuth subscription upstream can truncate
 * long large-input+large-output generations around the ~3-min turn boundary; the
 * non-stream path's `detectMalformedNonStream` then misclassified the resulting
 * content-less/thinking-only Claude body as `empty_choices`. The guard may only
 * fire for a genuinely malformed upstream response — a non-200 or a truly empty
 * *terminal* completion (terminal stop_reason with no usable output).
 *
 * Live note: the exact large-recvBytes+empty signature (33–65KB) needs a live VPS
 * capture to confirm the upstream truncation; this test encodes the
 * offline-reproducible mechanism (content-less thinking/redacted bodies), which
 * failed to `empty_choices` on the unfixed code and must pass after the fix.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { detectMalformedNonStream } from "../../../open-sse/utils/diagnostics.ts";

const claudeMsg = (content: unknown[], stopReason = "end_turn") => ({
  type: "message",
  role: "assistant",
  id: "msg_x",
  model: "claude-sonnet-4-5",
  content,
  stop_reason: stopReason,
  usage: { input_tokens: 30000, output_tokens: 120 },
});

// ── Content-less-but-valid Claude bodies must NOT be empty_choices ───────────

test("#9971 content-less thinking-only body (no text, no signature) is valid output", () => {
  // Truncated extended-thinking stream: a thinking block arrived but the model
  // never emitted its final text (and was cut before producing a signature).
  const body = claudeMsg([{ type: "thinking", thinking: "", signature: "" }], "");
  assert.equal(detectMalformedNonStream(body), null);
});

test("#9971 redacted_thinking-only body is valid output", () => {
  // OAuth-style redacted footprint: the control plane suppresses the raw thinking
  // text, leaving only a redacted_thinking marker — still a valid completion.
  const body = claudeMsg([{ type: "redacted_thinking", data: "" }]);
  assert.equal(detectMalformedNonStream(body), null);
});

test("#9971 thinking-only body with visible thinking text is valid output", () => {
  const body = claudeMsg([
    { type: "thinking", thinking: "working through the request", signature: "" },
  ]);
  assert.equal(detectMalformedNonStream(body), null);
});

test("#9971 functional/structural tool_use body is valid output", () => {
  const body = claudeMsg([
    { type: "tool_use", id: "toolu_1", name: "bash", input: { command: "ls" } },
  ]);
  assert.equal(detectMalformedNonStream(body), null);
});

// ── Genuinely malformed / truly-empty terminal bodies must STILL be flagged ──

test("#9971 genuinely empty terminal content:[] is still flagged", () => {
  // Terminal stop_reason + no blocks at all = a truly empty completion.
  assert.equal(detectMalformedNonStream(claudeMsg([], "end_turn")), "empty_choices");
});

test("#9971 terminal '(empty response)' text sentinel is still flagged", () => {
  // The OpenAI->Claude converter's sentinel for an upstream that produced no
  // content: a terminal body carrying only that sentinel is genuinely empty.
  const body = claudeMsg([{ type: "text", text: "(empty response)" }], "end_turn");
  assert.equal(detectMalformedNonStream(body), "empty_choices");
});

test("#9971 truncated non-terminal empty body is valid (no false 502)", () => {
  // Upstream cut mid-turn before a stop_reason landed: not a terminal completion,
  // so the guard must not fire even though there is no output block yet.
  const body = claudeMsg([], "");
  assert.equal(detectMalformedNonStream(body), null);
});
