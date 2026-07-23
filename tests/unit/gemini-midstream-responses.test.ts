/**
 * Regression test: Gemini mid-stream 503 error translated through the
 * Responses-API pipeline must emit a proper `response.completed` with
 * `status: "failed"` and close the reasoning item, instead of silently
 * aborting the stream.
 *
 * The event sequence from the Gemini SSE stream was:
 *   1. thought chunk (reasoning content)
 *   2. 503 error chunk
 *   3. provider closes connection (flush)
 */
import test from "node:test";
import assert from "node:assert/strict";

const { translateResponse, initState } =
  await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const THOUGHT_TEXT = "The user wants me to execute a cron job named `vibe-check`";

const THOUGHT_CHUNK = {
  responseId: "faxOavr4K52qxN8PntP3mAY",
  modelVersion: "gemma-4-31b-it",
  candidates: [
    {
      content: {
        parts: [{ text: THOUGHT_TEXT, thought: true }],
        role: "model",
      },
      index: 0,
    },
  ],
  usageMetadata: {
    promptTokenCount: 22865,
    totalTokenCount: 22879,
    promptTokensDetails: [{ modality: "TEXT", tokenCount: 22865 }],
    thoughtsTokenCount: 14,
    serviceTier: "standard",
  },
};

const ERROR_CHUNK = {
  error: {
    code: 503,
    message:
      "This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.",
    status: "UNAVAILABLE",
  },
};

test("mid-stream 503 error -> response.completed with status='failed'", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);

  // ── Step 1: Send thought chunk ──
  const thoughtEvents = translateResponse(
    FORMATS.GEMINI,
    FORMATS.OPENAI_RESPONSES,
    THOUGHT_CHUNK,
    state
  );

  assert.ok(
    thoughtEvents?.length > 0,
    "thought chunk should produce Responses API events"
  );

  // Verify reasoning was started
  const reasoningItemAdded = thoughtEvents.find(
    (e) => e?.data?.type === "response.output_item.added" && e.data.item?.type === "reasoning"
  );
  assert.ok(reasoningItemAdded, "should emit response.output_item.added for reasoning");

  const reasoningDelta = thoughtEvents.find(
    (e) => e?.data?.type === "response.reasoning_summary_text.delta"
  );
  assert.ok(reasoningDelta, "should emit reasoning delta");
  assert.equal(reasoningDelta.data.delta, THOUGHT_TEXT);

  // ── Step 2: Send 503 error chunk ──
  const errorEvents = translateResponse(
    FORMATS.GEMINI,
    FORMATS.OPENAI_RESPONSES,
    ERROR_CHUNK,
    state
  );

  // Error chunk itself should produce no events
  assert.equal(errorEvents?.length ?? 0, 0, "error chunk should produce no events");

  // But must be recorded in state
  assert.ok(state.upstreamError, "state.upstreamError should be set");
  assert.equal(state.upstreamError.status, 503);

  // ── Step 3: Flush stream ──
  const flushEvents = translateResponse(
    FORMATS.GEMINI,
    FORMATS.OPENAI_RESPONSES,
    null,
    state
  );

  assert.ok(flushEvents?.length > 0, "flush should produce events");

  // The reasoning item should be properly closed
  const reasoningDone = flushEvents.find(
    (e) => e?.data?.type === "response.output_item.done"
  );
  assert.ok(reasoningDone, "flush should emit response.output_item.done for reasoning");
  assert.equal(
    reasoningDone.data.item?.type,
    "reasoning",
    "done item should be type 'reasoning'"
  );

  // The response should be completed with status 'failed' and error info
  const completedEvent = flushEvents.find(
    (e) => e?.data?.type === "response.completed"
  );
  assert.ok(completedEvent, "flush should emit response.completed");
  assert.equal(
    completedEvent.data.response.status,
    "failed",
    "response should have status 'failed' when upstreamError is set"
  );
  assert.ok(
    completedEvent.data.response.error,
    "response.error should be present when upstreamError is set"
  );
  assert.ok(
    completedEvent.data.response.error?.code,
    "response.error.code should be truthy"
  );
  assert.match(
    completedEvent.data.response.error?.message || "",
    /high demand/
  );

  // ── Step 4: Verify the reverse — no upstreamError = status "completed" ──
  const cleanState = initState(FORMATS.OPENAI_RESPONSES);

  // Send thought chunk
  translateResponse(FORMATS.GEMINI, FORMATS.OPENAI_RESPONSES, THOUGHT_CHUNK, cleanState);

  // Flush without error
  const cleanFlush = translateResponse(
    FORMATS.GEMINI,
    FORMATS.OPENAI_RESPONSES,
    null,
    cleanState
  );

  const cleanCompleted = cleanFlush.find(
    (e) => e?.data?.type === "response.completed"
  );
  assert.ok(cleanCompleted, "clean flush should emit response.completed");
  assert.equal(
    cleanCompleted.data.response.status,
    "completed",
    "clean response should have status 'completed'"
  );
  assert.equal(
    cleanCompleted.data.response.error,
    null,
    "clean response should have error: null"
  );
});
