/**
 * Issue #3811 — a round-robin combo serving a STREAMING response returned a 500
 * (`TypeError: Invalid state: The ReadableStream is locked`, ERR_INVALID_STATE).
 *
 * validateResponseQuality() peeks streaming bodies via `response.body.getReader()`
 * to detect empty/content-filtered streams. That call LOCKS `result.body` and hands
 * back an unlocked replay stream in `quality.clonedResponse`. The priority strategy
 * returns `quality.clonedResponse ?? result`, but the round-robin success path
 * returned the original (now-locked) `result`, so Next.js could not pipe the body and
 * surfaced a 500 even though the upstream call succeeded.
 *
 * Regression guard: a round-robin combo whose target returns a streaming response with
 * content must return a response whose body is READABLE (not locked) and reproduces the
 * streamed content.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-rr-3811-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const encoder = new TextEncoder();

function createLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}

/** Claude 200 streaming response WITH a content block, one chunk per SSE event. */
function makeClaudeContentStream(): Response {
  const events = [
    `event: message_start\ndata: ${JSON.stringify({
      type: "message_start",
      message: {
        id: "msg_rr_3811",
        type: "message",
        role: "assistant",
        model: "claude-sonnet-4-6",
        content: [],
        stop_reason: null,
        usage: { input_tokens: 5, output_tokens: 0 },
      },
    })}\n\n`,
    `event: content_block_start\ndata: ${JSON.stringify({
      type: "content_block_start",
      index: 0,
      content_block: { type: "text", text: "" },
    })}\n\n`,
    `event: content_block_delta\ndata: ${JSON.stringify({
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "hello round-robin" },
    })}\n\n`,
    `event: content_block_stop\ndata: ${JSON.stringify({ type: "content_block_stop", index: 0 })}\n\n`,
    `event: message_delta\ndata: ${JSON.stringify({
      type: "message_delta",
      delta: { stop_reason: "end_turn" },
      usage: { output_tokens: 3 },
    })}\n\n`,
    `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`,
  ];
  const chunks = events.map((e) => encoder.encode(e));
  let idx = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (idx < chunks.length) controller.enqueue(chunks[idx++]);
      else controller.close();
    },
  });
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

test("#3811 round-robin streaming response returns an unlocked, replayable body", async () => {
  const result = await handleComboChat({
    body: { stream: true },
    combo: {
      name: "rr-streaming-lock-3811",
      strategy: "round-robin",
      models: ["model-a"],
      config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
    },
    handleSingleModel: async () => makeClaudeContentStream(),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.ok(result.body, "combo response must expose a body stream");
  // Without the fix the round-robin path returns the original `result` whose body was
  // locked by validateResponseQuality's getReader() peek.
  assert.equal(
    result.body!.locked,
    false,
    "round-robin streaming body must not be locked (must return quality.clonedResponse)"
  );

  // Draining the body must succeed (a locked body throws here) and replay the content.
  const text = await result.text();
  assert.match(text, /hello round-robin/, "replayed stream must contain the upstream content");
});
