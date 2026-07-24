// Regression guard for #8331 — the DEFAULT_BUFFER_TOKENS (2000) context-window safety margin
// was leaking straight into the CLIENT-VISIBLE usage.prompt_tokens/input_tokens/total_tokens,
// so a real 69-token upstream request was reported to the client as 2069. call_logs.tokens_in
// and the raw upstream body always showed the true 69 — only the client-facing response was
// inflated.
//
// Fix: addBufferToUsage() (open-sse/utils/usageTracking.ts) no longer mutates the metering
// fields. The buffer is still computed (context-fit/CLI-headroom use is preserved) but is now
// surfaced only via separate context_budget_* fields, which filterUsageForFormat() does not
// allow-list — so it never reaches a client response, streaming or non-streaming.
//
// Covers both client-visible seams:
//   1. Non-streaming JSON usage — via applyClientUsageBuffer() (chatCore.ts:4236 call site).
//   2. Streaming SSE usage frame — via the same addBufferToUsage()+filterUsageForFormat() chain
//      used verbatim by open-sse/utils/stream.ts:1018 and :1897.
import test from "node:test";
import assert from "node:assert/strict";
import {
  addBufferToUsage,
  filterUsageForFormat,
  invalidateBufferTokensCache,
} from "../../open-sse/utils/usageTracking.ts";
import { applyClientUsageBuffer } from "../../open-sse/handlers/chatCore/clientUsageBuffer.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

function resetEnv(saved: string | undefined) {
  if (saved === undefined) {
    delete process.env.USAGE_TOKEN_BUFFER;
  } else {
    process.env.USAGE_TOKEN_BUFFER = saved;
  }
}

test("#8331 non-streaming: client-facing usage.prompt_tokens equals raw upstream value, not +2000", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  delete process.env.USAGE_TOKEN_BUFFER;
  invalidateBufferTokensCache();

  // Reporter's real-world shape: 69 prompt tokens, 5 completion tokens.
  const upstreamUsage = { prompt_tokens: 69, completion_tokens: 5, total_tokens: 74 };
  const translatedResponse: {
    usage?: unknown;
    choices?: Array<{ message?: { content?: unknown } }>;
  } = { usage: upstreamUsage };

  applyClientUsageBuffer(translatedResponse, { messages: [] }, "openai");

  const clientUsage = translatedResponse.usage as Record<string, unknown>;
  assert.equal(clientUsage.prompt_tokens, 69, "must report the real upstream prompt_tokens");
  assert.equal(clientUsage.completion_tokens, 5);
  assert.equal(clientUsage.total_tokens, 74, "must report the real upstream total_tokens");
  // The safety buffer must never leak into the client payload under any field name.
  assert.equal("context_budget_prompt_tokens" in clientUsage, false);
  assert.equal("context_budget_total_tokens" in clientUsage, false);

  resetEnv(saved);
  invalidateBufferTokensCache();
});

test("#8331 streaming: SSE usage frame (addBufferToUsage + filterUsageForFormat chain) is not inflated", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  delete process.env.USAGE_TOKEN_BUFFER;
  invalidateBufferTokensCache();

  // Mirrors the exact call chain used at stream.ts:1018/:1897 to build the final SSE usage chunk.
  const upstreamUsage = { prompt_tokens: 69, completion_tokens: 5, total_tokens: 74 };
  const buffered = addBufferToUsage(upstreamUsage);
  const clientFrameUsage = filterUsageForFormat(buffered, FORMATS.OPENAI) as Record<
    string,
    unknown
  >;

  assert.equal(clientFrameUsage.prompt_tokens, 69, "SSE usage frame must not be buffer-inflated");
  assert.equal(clientFrameUsage.total_tokens, 74);
  assert.equal("context_budget_prompt_tokens" in clientFrameUsage, false);

  resetEnv(saved);
  invalidateBufferTokensCache();
});

test("#8331 Claude-format streaming frame: input_tokens stays real, not buffered", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  delete process.env.USAGE_TOKEN_BUFFER;
  invalidateBufferTokensCache();

  const upstreamUsage = { input_tokens: 69, output_tokens: 5 };
  const buffered = addBufferToUsage(upstreamUsage);
  const clientFrameUsage = filterUsageForFormat(buffered, FORMATS.CLAUDE) as Record<
    string,
    unknown
  >;

  assert.equal(clientFrameUsage.input_tokens, 69);

  resetEnv(saved);
  invalidateBufferTokensCache();
});

test("#8331 addBufferToUsage still computes the safety margin internally (buffer not deleted)", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  delete process.env.USAGE_TOKEN_BUFFER;
  invalidateBufferTokensCache();

  // The context-fit safety margin must still be computable for internal/future consumers —
  // this fix decouples it from client metering, it does not remove the feature.
  const result = addBufferToUsage({
    prompt_tokens: 69,
    completion_tokens: 5,
    total_tokens: 74,
  }) as Record<string, unknown>;

  assert.equal(result.prompt_tokens, 69);
  assert.equal(result.context_budget_prompt_tokens, 2069, "buffer must still be computed");
  assert.equal(result.context_budget_total_tokens, 2074);

  resetEnv(saved);
  invalidateBufferTokensCache();
});

test("#8331 estimated usage remains fully unbuffered (unaffected by the fix)", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  delete process.env.USAGE_TOKEN_BUFFER;
  invalidateBufferTokensCache();

  const result = addBufferToUsage({
    prompt_tokens: 6,
    completion_tokens: 1,
    total_tokens: 7,
    estimated: true,
  }) as Record<string, unknown>;

  assert.equal(result.prompt_tokens, 6);
  assert.equal("context_budget_prompt_tokens" in result, false);

  resetEnv(saved);
  invalidateBufferTokensCache();
});
