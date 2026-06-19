/**
 * Issue #3685 — streaming combos must fail over to the next target when the
 * upstream Claude stream emits a complete lifecycle (message_start →
 * message_delta with stop_reason → message_stop) but ZERO content_block_*
 * events (e.g. content_filter). Previously `validateResponseQuality` returned
 * `{ valid: true }` for ALL streaming responses, so the combo loop never saw
 * the empty response as a failure and never advanced to the next target.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");

const encoder = new TextEncoder();
const silentLog = { warn: () => {} };

/** Build a ReadableStream from an array of SSE-formatted strings (single chunk). */
function claudeSseStream(events: string[]): ReadableStream<Uint8Array> {
  const body = events.join("\n") + "\n";
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(body));
      controller.close();
    },
  });
}

/**
 * Build a ReadableStream that emits each SSE event as a SEPARATE chunk,
 * simulating a real incremental network delivery.
 */
function claudeSseStreamMultiChunk(events: string[]): ReadableStream<Uint8Array> {
  const chunks = events.map((e) => encoder.encode(e + "\n"));
  let idx = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (idx < chunks.length) {
        controller.enqueue(chunks[idx++]);
      } else {
        controller.close();
      }
    },
  });
}

/** Build a mock Claude 200 streaming response with no content blocks (content_filter case). */
function makeEmptyClaudeStream(): Response {
  const events = [
    `event: message_start\ndata: ${JSON.stringify({
      type: "message_start",
      message: {
        id: "msg_test_empty",
        type: "message",
        role: "assistant",
        model: "claude-sonnet-4-6",
        content: [],
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 10, output_tokens: 0 },
      },
    })}`,
    "",
    `event: message_delta\ndata: ${JSON.stringify({
      type: "message_delta",
      delta: { stop_reason: "content_filter", stop_sequence: null },
      usage: { input_tokens: 0, output_tokens: 0 },
    })}`,
    "",
    `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}`,
    "",
  ];

  return new Response(claudeSseStream(events), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

/** Build a mock Claude 200 streaming response WITH a content block (normal case). */
function makeNonEmptyClaudeStream(): Response {
  const events = [
    `event: message_start\ndata: ${JSON.stringify({
      type: "message_start",
      message: {
        id: "msg_test_content",
        type: "message",
        role: "assistant",
        model: "claude-sonnet-4-6",
        content: [],
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 10, output_tokens: 0 },
      },
    })}`,
    "",
    `event: content_block_start\ndata: ${JSON.stringify({
      type: "content_block_start",
      index: 0,
      content_block: { type: "text", text: "" },
    })}`,
    "",
    `event: content_block_delta\ndata: ${JSON.stringify({
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "Hello, world!" },
    })}`,
    "",
    `event: content_block_stop\ndata: ${JSON.stringify({
      type: "content_block_stop",
      index: 0,
    })}`,
    "",
    `event: message_delta\ndata: ${JSON.stringify({
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { input_tokens: 0, output_tokens: 5 },
    })}`,
    "",
    `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}`,
    "",
  ];

  return new Response(claudeSseStream(events), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("#3685 empty Claude stream (content_filter, no content blocks) is marked invalid", async () => {
  const res = makeEmptyClaudeStream();
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(
    out.valid,
    false,
    `expected invalid for empty content-filtered stream, got valid=true (reason: ${out.reason})`
  );
  assert.match(
    out.reason ?? "",
    /empty/i,
    `reason should mention 'empty', got: "${out.reason}"`
  );
});

test("#3685 non-empty Claude stream (has content blocks) remains valid", async () => {
  const res = makeNonEmptyClaudeStream();
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(
    out.valid,
    true,
    `expected valid for non-empty stream, got invalid: ${out.reason}`
  );
  // The clonedResponse must be present so the combo loop can pipe the stream body
  assert.ok(out.clonedResponse, "clonedResponse must be returned for valid streaming response");
  assert.ok(out.clonedResponse!.body, "clonedResponse must have a body stream");
});

test("#3685 non-SSE streaming response (e.g. plain JSON 200) still passes through as valid", async () => {
  // A streaming=true call that returns plain JSON is not our target — preserve existing behavior.
  const res = new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true, "non-SSE streaming response should still be valid");
});

test("#3685 empty Claude stream without message_start lifecycle → valid (incomplete lifecycle, not content_filter)", async () => {
  // A stream that only has partial events (e.g. disconnected before message_start)
  // should not trigger the failover since the lifecycle isn't complete — this is
  // handled by other mechanisms (stream readiness timeout).
  const partialEvents = [
    `event: ping\ndata: ${JSON.stringify({ type: "ping" })}`,
    "",
  ];
  const res = new Response(claudeSseStream(partialEvents), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true, "incomplete lifecycle (no message_start) should pass through");
});

test("#3685 streaming is preserved for non-empty response: clonedResponse body yields full original SSE byte sequence in order", async () => {
  // Use a multi-chunk stream to simulate real incremental delivery.
  // The content_block_start arrives in its own chunk so the peek loop can
  // detect it mid-stream and stop buffering — the rest should forward via
  // the original reader.
  const events = [
    `event: message_start\ndata: ${JSON.stringify({
      type: "message_start",
      message: {
        id: "msg_multipart",
        type: "message",
        role: "assistant",
        model: "claude-sonnet-4-6",
        content: [],
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 5, output_tokens: 0 },
      },
    })}`,
    "",
    `event: content_block_start\ndata: ${JSON.stringify({
      type: "content_block_start",
      index: 0,
      content_block: { type: "text", text: "" },
    })}`,
    "",
    `event: content_block_delta\ndata: ${JSON.stringify({
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "Hello" },
    })}`,
    "",
    `event: content_block_delta\ndata: ${JSON.stringify({
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: ", world!" },
    })}`,
    "",
    `event: content_block_stop\ndata: ${JSON.stringify({ type: "content_block_stop", index: 0 })}`,
    "",
    `event: message_delta\ndata: ${JSON.stringify({
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { input_tokens: 0, output_tokens: 7 },
    })}`,
    "",
    `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}`,
    "",
  ];

  // Build the original byte sequence for comparison.
  const originalBody = events.map((e) => e + "\n").join("");
  const originalBytes = encoder.encode(originalBody);

  const res = new Response(claudeSseStreamMultiChunk(events), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });

  const out = await validateResponseQuality(res, true, silentLog);

  assert.equal(out.valid, true, "non-empty multi-chunk stream must be valid");
  assert.ok(out.clonedResponse, "clonedResponse must be present");
  assert.ok(out.clonedResponse!.body, "clonedResponse must have a readable body");

  // Drain the clonedResponse body and reconstruct the full byte sequence.
  const reader = out.clonedResponse!.body!.getReader();
  const receivedChunks: Uint8Array[] = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    receivedChunks.push(value);
  }
  const totalLength = receivedChunks.reduce((sum, c) => sum + c.length, 0);
  const reconstructed = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of receivedChunks) {
    reconstructed.set(chunk, offset);
    offset += chunk.length;
  }

  // The reconstructed bytes must exactly match the original SSE byte sequence —
  // no data is lost, duplicated, or reordered by the bounded-peek mechanism.
  assert.deepEqual(
    reconstructed,
    originalBytes,
    "clonedResponse body must reproduce the FULL original SSE byte sequence (buffered prefix + piped remainder = original)"
  );

  // Verify the response carries SSE content blocks in the decoded text,
  // confirming real content was streamed through.
  const decoded = new TextDecoder().decode(reconstructed);
  assert.ok(decoded.includes("content_block_start"), "decoded body must contain content_block_start");
  assert.ok(decoded.includes("Hello"), "decoded body must contain the actual text content");
  assert.ok(decoded.includes(", world!"), "decoded body must contain the full text delta");
});
