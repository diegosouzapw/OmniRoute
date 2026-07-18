/**
 * Issue #1382 (upstream decolua/9router) — a streaming Claude response that
 * opens a `content_block_start` (type "text", initial text "") and then
 * immediately `content_block_stop`s WITHOUT ever emitting a
 * `content_block_delta` carrying real text/tool_use content must be treated
 * as an empty/malformed response, not a valid completion.
 *
 * Before this fix, `validateResponseQuality`'s bounded SSE peek stopped
 * buffering (and reported `valid: true`) as soon as ANY content_block_*
 * event was observed — including a content_block_start whose block never
 * carries usable text. Tool-heavy requests against backends that mishandle
 * tool definitions (reported: DeepSeek, GLM via claude→openai translation)
 * can emit exactly this shape: a lifecycle that "completes" successfully at
 * the transport layer while the client receives no usable content. The
 * combo loop never saw this as a failure, so no failover to the next model
 * in the combo ever happened.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");

const encoder = new TextEncoder();
const silentLog = { warn: () => {} };

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
 * Build a mock Claude 200 streaming response with a content_block_start/stop
 * pair carrying EMPTY text and no tool_use block — the shape reported in
 * #1382 for tool-heavy claude→openai requests against DeepSeek/GLM.
 */
function makeEmptyTextBlockStream(): Response {
  const events = [
    `event: message_start\ndata: ${JSON.stringify({
      type: "message_start",
      message: {
        id: "msg_test_1382",
        type: "message",
        role: "assistant",
        model: "deepseek-v4-pro-max",
        content: [],
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 19882, output_tokens: 0 },
      },
    })}`,
    "",
    `event: content_block_start\ndata: ${JSON.stringify({
      type: "content_block_start",
      index: 0,
      content_block: { type: "text", text: "" },
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
      usage: { input_tokens: 0, output_tokens: 25 },
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

test("#1382 streaming Claude response with empty content_block (no text, no tool_use) is marked invalid", async () => {
  const res = makeEmptyTextBlockStream();
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(
    out.valid,
    false,
    `expected invalid for empty content_block stream, got valid=true (reason: ${out.reason})`
  );
  assert.match(out.reason ?? "", /empty/i, `reason should mention 'empty', got: "${out.reason}"`);
});

test("#1382 streaming Claude response with a real tool_use content_block_start remains valid", async () => {
  const events = [
    `event: message_start\ndata: ${JSON.stringify({
      type: "message_start",
      message: {
        id: "msg_test_1382_tool",
        type: "message",
        role: "assistant",
        model: "deepseek-v4-pro-max",
        content: [],
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 100, output_tokens: 0 },
      },
    })}`,
    "",
    `event: content_block_start\ndata: ${JSON.stringify({
      type: "content_block_start",
      index: 0,
      content_block: { type: "tool_use", id: "toolu_1", name: "Bash", input: {} },
    })}`,
    "",
    `event: content_block_stop\ndata: ${JSON.stringify({
      type: "content_block_stop",
      index: 0,
    })}`,
    "",
    `event: message_delta\ndata: ${JSON.stringify({
      type: "message_delta",
      delta: { stop_reason: "tool_use", stop_sequence: null },
      usage: { input_tokens: 0, output_tokens: 12 },
    })}`,
    "",
    `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}`,
    "",
  ];
  const res = new Response(claudeSseStream(events), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true, `expected valid for tool_use stream, got invalid: ${out.reason}`);
  assert.ok(out.clonedResponse, "clonedResponse must be present for valid streaming response");
});
