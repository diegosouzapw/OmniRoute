/**
 * Regression test for #4177 — Gemini mid-stream error silently swallowed.
 *
 * When the upstream Gemini SSE stream emits a JSON error object
 * (e.g. `{"error":{"code":503,"message":"...","status":"UNAVAILABLE"}}`) instead of a
 * `candidates` payload — typically after some partial reasoning content — the
 * translator must surface it as `state.upstreamError` so the streaming pipeline can
 * error the response out (and trigger combo fallback) rather than ending the stream
 * with a default `finish_reason: "stop"` and a misleading HTTP 200.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");

type StreamState = {
  toolCalls: Map<string, unknown>;
  messageId?: string;
  model?: string;
  upstreamError?: { status: number; type: string; code: string; message: string };
};

function createStreamingState(): StreamState {
  return {
    toolCalls: new Map(),
  };
}

test("#4177 Gemini mid-stream 503 UNAVAILABLE is surfaced as upstreamError, not dropped", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      error: {
        code: 503,
        message:
          "This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.",
        status: "UNAVAILABLE",
      },
    },
    state
  );

  // The error chunk produces no delta output...
  assert.equal(result, null);
  // ...but it MUST be recorded so stream.ts can error the stream out.
  assert.ok(state.upstreamError, "expected state.upstreamError to be set for a 503 error chunk");
  assert.equal(state.upstreamError.status, 503);
  assert.equal(state.upstreamError.type, "server_error");
  assert.equal(state.upstreamError.code, "UNAVAILABLE");
  assert.match(state.upstreamError.message, /high demand/);
});

test("#4177 Gemini RESOURCE_EXHAUSTED maps to a 429 rate-limit upstreamError", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      error: {
        code: 429,
        message: "Resource has been exhausted (e.g. check quota).",
        status: "RESOURCE_EXHAUSTED",
      },
    },
    state
  );

  assert.equal(result, null);
  assert.ok(state.upstreamError);
  assert.equal(state.upstreamError.status, 429);
  assert.equal(state.upstreamError.type, "rate_limit_error");
  assert.equal(state.upstreamError.code, "RESOURCE_EXHAUSTED");
});

test("#4177 Antigravity/Cloud Code error wrapped in a `response` envelope is detected", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      response: {
        error: { code: 503, message: "overloaded", status: "UNAVAILABLE" },
      },
    },
    state
  );

  assert.equal(result, null);
  assert.ok(state.upstreamError);
  assert.equal(state.upstreamError.status, 503);
});

test("#4177 a valid candidate chunk does NOT set upstreamError (no false positive)", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-ok",
      modelVersion: "gemini-2.5-flash",
      candidates: [
        {
          content: { role: "model", parts: [{ text: "hello" }] },
          index: 0,
        },
      ],
      usageMetadata: { promptTokenCount: 1, totalTokenCount: 2 },
    },
    state
  );

  assert.ok(result, "expected normal chunk to translate to OpenAI deltas");
  assert.equal(state.upstreamError, undefined);
});
