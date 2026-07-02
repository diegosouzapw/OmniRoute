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

  const delta: NonStreamingSseTerminalState = { currentEvent: "", pendingLine: "" };
  assert.equal(
    appendNonStreamingSseTerminalSignal(delta, 'data: {"type":"content_block_delta"}\n'),
    false
  );
});

test("parseNonStreamingSSEPayload parses an OpenAI-format SSE buffer", () => {
  const raw =
    'data: {"id":"x","choices":[{"delta":{"content":"hi"},"finish_reason":"stop"}]}\n\ndata: [DONE]\n';
  const result = parseNonStreamingSSEPayload(raw, FORMATS.OPENAI, "gpt-4o");
  assert.ok(result !== null);
  assert.equal(result?.format, FORMATS.OPENAI);
  assert.equal(typeof result?.body, "object");
});
