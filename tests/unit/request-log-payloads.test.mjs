import test from "node:test";
import assert from "node:assert/strict";

const {
  normalizePayloadForLog,
  protectPayloadForLog,
  serializePayloadForStorage,
  parseStoredPayload,
} = await import("../../src/lib/logPayloads.ts");
const {
  createStructuredSSECollector,
  buildStreamSummaryFromEvents,
  compactStructuredStreamPayload,
} = await import("../../open-sse/utils/streamPayloadCollector.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test("normalizes JSON strings before log protection and redacts sensitive keys", () => {
  const protectedPayload = protectPayloadForLog(
    JSON.stringify({
      authorization: "Bearer secret-token-value",
      nested: {
        apiKey: "top-secret-key",
      },
    })
  );

  assert.deepEqual(protectedPayload, {
    authorization: "[REDACTED]",
    nested: {
      apiKey: "[REDACTED]",
    },
  });
});

test("wraps raw text payloads in JSON-safe objects", () => {
  const normalized = normalizePayloadForLog("event: ping\ndata: plain-text\n\n");

  assert.deepEqual(normalized, {
    _rawText: "event: ping\ndata: plain-text\n\n",
  });
});

test("serializes truncated payloads as valid JSON objects", () => {
  const stored = serializePayloadForStorage({ text: "x".repeat(200) }, 80);
  const parsed = parseStoredPayload(stored);

  assert.equal(parsed._truncated, true);
  assert.equal(parsed._originalSize > 80, true);
  assert.equal(typeof parsed._preview, "string");
});

test("structured SSE collector preserves event order and marks truncation", () => {
  const collector = createStructuredSSECollector({ maxEvents: 2, maxBytes: 200 });

  collector.push({ type: "response.created", id: "r1" });
  collector.push({ type: "response.output_text.delta", delta: "hi" });
  collector.push({ type: "response.completed" });

  const payload = collector.build({ done: true });

  assert.equal(payload._streamed, true);
  assert.equal(payload._eventCount, 3);
  assert.equal(payload._truncated, true);
  assert.equal(payload._droppedEvents, 1);
  assert.equal(payload.events.length, 2);
  assert.equal(payload.events[0].event, "response.created");
  assert.equal(payload.events[1].event, "response.output_text.delta");
  assert.deepEqual(payload.summary, { done: true });
});

test("builds compact OpenAI stream summary for detailed logs", () => {
  const collector = createStructuredSSECollector({ stage: "provider_response" });

  collector.push({
    id: "chatcmpl_1",
    object: "chat.completion.chunk",
    created: 123,
    model: "gpt-4.1-mini",
    choices: [{ index: 0, delta: { role: "assistant", content: "Hello " } }],
  });
  collector.push({
    id: "chatcmpl_1",
    object: "chat.completion.chunk",
    created: 123,
    model: "gpt-4.1-mini",
    choices: [{ index: 0, delta: { content: "world" } }],
  });
  collector.push({
    id: "chatcmpl_1",
    object: "chat.completion.chunk",
    created: 123,
    model: "gpt-4.1-mini",
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    usage: { prompt_tokens: 5, completion_tokens: 2, total_tokens: 7 },
  });

  const summary = buildStreamSummaryFromEvents(
    collector.getEvents(),
    FORMATS.OPENAI,
    "gpt-4.1-mini"
  );
  const compact = compactStructuredStreamPayload(
    collector.build(summary, { includeEvents: false })
  );

  assert.equal(compact.object, "chat.completion");
  assert.equal(compact.choices[0].message.content, "Hello world");
  assert.equal(compact.choices[0].finish_reason, "stop");
  assert.equal(compact._omniroute_stream.stage, "provider_response");
  assert.equal(compact._omniroute_stream.eventCount, 3);
  assert.equal("events" in compact, false);
});

test("builds compact Claude stream summary for detailed logs", () => {
  const collector = createStructuredSSECollector({ stage: "provider_response" });

  collector.push({
    type: "message_start",
    message: {
      id: "msg_1",
      model: "claude-sonnet-4",
      role: "assistant",
      usage: { input_tokens: 11 },
    },
  });
  collector.push({
    type: "content_block_start",
    index: 0,
    content_block: { type: "text", text: "" },
  });
  collector.push({
    type: "content_block_delta",
    index: 0,
    delta: { type: "text_delta", text: "你好" },
  });
  collector.push({
    type: "message_delta",
    delta: { stop_reason: "end_turn" },
    usage: { output_tokens: 7 },
  });

  const summary = buildStreamSummaryFromEvents(
    collector.getEvents(),
    FORMATS.CLAUDE,
    "claude-sonnet-4"
  );
  const compact = compactStructuredStreamPayload(
    collector.build(summary, { includeEvents: false })
  );

  assert.equal(compact.type, "message");
  assert.equal(compact.model, "claude-sonnet-4");
  assert.deepEqual(compact.content, [{ type: "text", text: "你好" }]);
  assert.equal(compact.usage.input_tokens, 11);
  assert.equal(compact.usage.output_tokens, 7);
  assert.equal(compact._omniroute_stream.eventCount, 4);
});
