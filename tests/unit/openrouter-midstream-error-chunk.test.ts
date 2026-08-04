/**
 * Regression test: OpenRouter mid-stream error chunk silently swallowed.
 *
 * OpenRouter (and other OpenAI-compatible aggregators) can send an HTTP 200 SSE
 * stream whose body carries a `chat.completion.chunk` with an empty `choices`
 * array and a top-level `error` object instead of any delta — e.g. when the
 * underlying provider (Nvidia, hosting a free model) hits its own capacity limit
 * mid-request:
 *   {"choices":[],"error":{"code":502,"message":"Upstream error from Nvidia: ...
 *   Worker local total request limit reached (33/32)","metadata":{"error_type":
 *   "provider_unavailable"}}}
 *
 * Before this fix, `openaiToOpenAIResponsesResponse()`'s `!chunk.choices?.length`
 * branch treated this exactly like a legitimate trailing-usage/no-op chunk and
 * dropped it, so the stream ended with `response.completed` / `error: null` /
 * `output: []` — a false "successful but empty" response instead of surfacing
 * the real 502 upstream failure. Mirrors the Gemini mid-stream error fix (#4177).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test("OpenRouter mid-stream 502 provider_unavailable is surfaced as upstreamError, not dropped", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);

  const errorChunk = {
    id: "gen-1784726796-AJw13XXRnwqcRL2kieNm",
    object: "chat.completion.chunk",
    created: 1784726796,
    model: "nvidia/nemotron-3-ultra-550b-a55b:free",
    provider: "Nvidia",
    choices: [],
    error: {
      code: 502,
      message:
        "Upstream error from Nvidia: ResourceExhausted: Worker local total request limit reached (33/32)",
      metadata: { error_type: "provider_unavailable" },
    },
  };

  const immediateEvents = openaiToOpenAIResponsesResponse(errorChunk, state);
  assert.deepEqual(immediateEvents, [], "the error chunk itself emits no delta events");

  // End of stream (chunk === null) flushes the deferred completion.
  const flushEvents = openaiToOpenAIResponsesResponse(null, state);
  const completedEvent = flushEvents.find((e) => e.event === "response.completed");
  assert.ok(completedEvent, "should have a response.completed event");
  assert.equal(
    completedEvent.data.response.status,
    "failed",
    "status must be 'failed', not a false 'completed'"
  );
  assert.ok(completedEvent.data.response.error, "error must not be null");
  assert.match(
    completedEvent.data.response.error.message,
    /Worker local total request limit reached/
  );
  assert.equal(completedEvent.data.response.output.length, 0);
});

test("OpenRouter mid-stream error with a rate-limit code maps to a 429 upstreamError", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);

  openaiToOpenAIResponsesResponse(
    {
      choices: [],
      error: {
        code: 429,
        message: "Rate limit exceeded, please try again later.",
        metadata: { error_type: "rate_limited" },
      },
    },
    state
  );

  const flushEvents = openaiToOpenAIResponsesResponse(null, state);
  const completedEvent = flushEvents.find((e) => e.event === "response.completed");
  assert.ok(completedEvent);
  assert.equal(completedEvent.data.response.status, "failed");
  assert.equal(completedEvent.data.response.error.code, "429");
});
