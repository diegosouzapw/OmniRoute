import test from "node:test";
import assert from "node:assert/strict";

import {
  convertNDJSONToSSE,
  normalizeNonStreamingEventPayload,
  isTruthyStreamBody,
  isEventStreamAccepted,
  shouldTreatBufferedEventResponseAsExpected,
  parseNonStreamingSSEPayload,
  appendNonStreamingSseTerminalSignal,
  type NonStreamingSseTerminalState,
} from "../../open-sse/handlers/chatCore/nonStreamingSse.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("convertNDJSONToSSE wraps each non-empty line as a data: frame", () => {
  const out = convertNDJSONToSSE('{"a":1}\n{"b":2}\n');
  assert.ok(out.includes('data: {"a":1}\n'));
  assert.ok(out.includes('data: {"b":2}\n'));
  assert.equal(convertNDJSONToSSE(""), "");
});

test("normalizeNonStreamingEventPayload only converts x-ndjson content", () => {
  const raw = '{"a":1}';
  assert.equal(normalizeNonStreamingEventPayload(raw, "application/json"), raw);
  assert.notEqual(normalizeNonStreamingEventPayload(raw, "application/x-ndjson"), raw);
});

test("stream-body and event-stream acceptance predicates", () => {
  assert.equal(isTruthyStreamBody({ stream: true }), true);
  assert.equal(isTruthyStreamBody({ stream: false }), false);
  assert.equal(isTruthyStreamBody(null), false);

  assert.equal(isEventStreamAccepted({ accept: "text/event-stream" }), true);
  assert.equal(isEventStreamAccepted({ accept: "application/json" }), false);

  assert.equal(
    shouldTreatBufferedEventResponseAsExpected(
      false,
      { accept: "application/json" },
      { stream: true }
    ),
    true
  );
  assert.equal(
    shouldTreatBufferedEventResponseAsExpected(false, { accept: "application/json" }, {}),
    false
  );
});

test("appendNonStreamingSseTerminalSignal detects [DONE] and terminal event types", () => {
  const done: NonStreamingSseTerminalState = { currentEvent: "", pendingLine: "" };
  assert.equal(appendNonStreamingSseTerminalSignal(done, "data: [DONE]\n"), true);

  const stop: NonStreamingSseTerminalState = { currentEvent: "", pendingLine: "" };
  assert.equal(appendNonStreamingSseTerminalSignal(stop, "event: message_stop\ndata: {}\n"), true);

  const responseTerminalEvents = [
    "response.completed",
    "response.done",
    "response.cancelled",
    "response.canceled",
    "response.failed",
    "response.incomplete",
  ];
  for (const eventType of responseTerminalEvents) {
    const typed: NonStreamingSseTerminalState = { currentEvent: "", pendingLine: "" };
    assert.equal(
      appendNonStreamingSseTerminalSignal(typed, `data: {"type":"${eventType}"}\n`),
      true,
      eventType
    );

    const eventOnly: NonStreamingSseTerminalState = { currentEvent: "", pendingLine: "" };
    assert.equal(
      appendNonStreamingSseTerminalSignal(eventOnly, `event: ${eventType}\n\n`),
      true,
      eventType
    );
  }

  const splitTerminalData: NonStreamingSseTerminalState = { currentEvent: "", pendingLine: "" };
  assert.equal(
    appendNonStreamingSseTerminalSignal(splitTerminalData, "event: response.completed\n"),
    false
  );
  assert.equal(
    appendNonStreamingSseTerminalSignal(
      splitTerminalData,
      'data: {"response":{"status":"completed"}}\n'
    ),
    true
  );

  const messageDeltaWithType: NonStreamingSseTerminalState = { currentEvent: "", pendingLine: "" };
  assert.equal(
    appendNonStreamingSseTerminalSignal(
      messageDeltaWithType,
      'data: {"type":"message_delta","delta":{"stop_reason":"end_turn"}}\n'
    ),
    true
  );

  const messageDeltaFromEvent: NonStreamingSseTerminalState = { currentEvent: "", pendingLine: "" };
  assert.equal(
    appendNonStreamingSseTerminalSignal(
      messageDeltaFromEvent,
      'event: message_delta\ndata: {"delta":{"stop_reason":"end_turn"}}\n'
    ),
    true
  );

  const delta: NonStreamingSseTerminalState = { currentEvent: "", pendingLine: "" };
  assert.equal(
    appendNonStreamingSseTerminalSignal(delta, 'data: {"type":"content_block_delta"}\n'),
    false
  );
});

test("parseNonStreamingSSEPayload still parses Claude event/data buffers", () => {
  const raw =
    'event: message_start\ndata: {"type":"message_start","message":{"id":"msg_1","model":"claude","role":"assistant","usage":{"input_tokens":1}}}\n\n' +
    'event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}\n\n' +
    'event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"hi"}}\n\n' +
    'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":1}}\n\n' +
    'event: message_stop\ndata: {"type":"message_stop"}\n\n';
  const result = parseNonStreamingSSEPayload(raw, FORMATS.CLAUDE, "claude");
  assert.ok(result !== null);
  assert.equal(result?.format, FORMATS.CLAUDE);
  assert.deepEqual(result?.body.content, [{ type: "text", text: "hi" }]);
  assert.equal(result?.body.stop_reason, "end_turn");
});

test("parseNonStreamingSSEPayload parses an OpenAI-format SSE buffer", () => {
  const raw =
    'data: {"id":"x","choices":[{"delta":{"content":"hi"},"finish_reason":"stop"}]}\n\ndata: [DONE]\n';
  const result = parseNonStreamingSSEPayload(raw, FORMATS.OPENAI, "gpt-4o");
  assert.ok(result !== null);
  assert.equal(result?.format, FORMATS.OPENAI);
  assert.equal(typeof result?.body, "object");
});
