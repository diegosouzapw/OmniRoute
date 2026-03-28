import test from "node:test";
import assert from "node:assert/strict";

const {
  normalizePayloadForLog,
  protectPayloadForLog,
  serializePayloadForStorage,
  parseStoredPayload,
} = await import("../../src/lib/logPayloads.ts");
const { createStructuredSSECollector } =
  await import("../../open-sse/utils/streamPayloadCollector.ts");

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
