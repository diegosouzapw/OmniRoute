import test from "node:test";
import assert from "node:assert/strict";

const collector = await import("../../open-sse/utils/streamPayloadCollector.ts");

test("compactStructuredStreamPayload returns null for null input", () => {
  assert.equal(collector.compactStructuredStreamPayload(null), null);
});

test("compactStructuredStreamPayload returns undefined for undefined input", () => {
  assert.equal(collector.compactStructuredStreamPayload(undefined), undefined);
});

test("compactStructuredStreamPayload passes through primitives", () => {
  assert.equal(collector.compactStructuredStreamPayload(42), 42);
  assert.equal(collector.compactStructuredStreamPayload("str"), "str");
  assert.equal(collector.compactStructuredStreamPayload(true), true);
});

test("compactStructuredStreamPayload compacts objects", () => {
  const input = { a: 1, b: "hello", c: [1, 2, 3] };
  const result = collector.compactStructuredStreamPayload(input);
  assert.ok(typeof result === "object");
  assert.ok(result !== null);
});

test("compactStructuredStreamPayload handles nested objects", () => {
  const input = { outer: { inner: { deep: "value" } } };
  const result = collector.compactStructuredStreamPayload(input);
  assert.ok(typeof result === "object");
});

test("compactStructuredStreamPayload handles arrays", () => {
  const input = [1, 2, { a: 3 }];
  const result = collector.compactStructuredStreamPayload(input);
  assert.ok(Array.isArray(result));
});

test("buildStreamSummaryFromEvents handles empty array", () => {
  const result = collector.buildStreamSummaryFromEvents([]);
  assert.ok(result === null || typeof result === "object");
});

test("buildStreamSummaryFromEvents handles single event", () => {
  const events = [{ data: { choices: [{ delta: { content: "hello" } }] } }];
  const result = collector.buildStreamSummaryFromEvents(events) as any;
  assert.ok(result !== null);
  assert.ok(typeof result === "object");
});

test("buildStreamSummaryFromEvents handles multiple events", () => {
  const events = [
    { data: { choices: [{ delta: { content: "hello" } }] } },
    { data: { choices: [{ delta: { content: " world" } }] } },
  ];
  const result = collector.buildStreamSummaryFromEvents(events) as any;
  assert.ok(result !== null);
  assert.ok(typeof result === "object");
});

test("createStructuredSSECollector returns collector object", () => {
  const result = collector.createStructuredSSECollector();
  assert.ok(typeof result === "object");
  assert.ok(result !== null);
});

test("createStructuredSSECollector with options", () => {
  const result = collector.createStructuredSSECollector({ maxEvents: 100 });
  assert.ok(typeof result === "object");
});

test("createStructuredSSECollector collector has expected methods", () => {
  const c = collector.createStructuredSSECollector();
  assert.ok(c !== null && typeof c === "object");
  const keys = Object.keys(c);
  assert.ok(keys.length > 0);
});
