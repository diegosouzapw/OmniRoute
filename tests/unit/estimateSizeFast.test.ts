import test from "node:test";
import assert from "node:assert/strict";

const { estimateSizeFast, isSmallEnoughForSemanticCache } = await import(
  "../../open-sse/utils/estimateSize.ts"
);

test("estimateSizeFast returns 0 for null/undefined", () => {
  assert.equal(estimateSizeFast(null), 0);
  assert.equal(estimateSizeFast(undefined), 0);
});

test("estimateSizeFast counts string lengths", () => {
  assert.equal(estimateSizeFast("hello"), 5);
  assert.equal(estimateSizeFast(""), 0);
});

test("estimateSizeFast counts numbers as 8 bytes", () => {
  assert.equal(estimateSizeFast(42), 8);
  assert.equal(estimateSizeFast(0), 8);
  assert.equal(estimateSizeFast(3.14), 8);
});

test("estimateSizeFast counts booleans as 4 bytes", () => {
  assert.equal(estimateSizeFast(true), 4);
  assert.equal(estimateSizeFast(false), 4);
});

test("estimateSizeFast walks arrays recursively", () => {
  const arr = ["abc", "de", 42];
  assert.equal(estimateSizeFast(arr), 3 + 2 + 8); // 13
});

test("estimateSizeFast walks objects recursively", () => {
  const obj = { a: "hello", b: 42 };
  assert.equal(estimateSizeFast(obj), 5 + 8); // 13
});

test("estimateSizeFast walks nested structures", () => {
  const nested = { messages: [{ role: "user", content: "hi" }] };
  // role=4, content=2
  assert.equal(estimateSizeFast(nested), 4 + 2); // 6
});

test("estimateSizeFast handles circular references without infinite loop", () => {
  const circular: Record<string, unknown> = { a: "test" };
  circular.self = circular; // Create circular ref
  // Should not hang — WeakSet skips already-visited objects
  const result = estimateSizeFast(circular);
  assert.equal(result, 4); // Only "test" (4) counted; circular ref skipped
});

test("estimateSizeFast handles deeply nested circular refs", () => {
  const a: Record<string, unknown> = { val: "x" };
  const b: Record<string, unknown> = { ref: a };
  a.back = b;
  const result = estimateSizeFast({ root: a });
  assert.equal(result, 1); // "x" = 1
});

test("estimateSizeFast early-exits at 262144 bytes (256KB)", () => {
  // Create a string > 256KB
  const bigStr = "x".repeat(300_000);
  const result = estimateSizeFast(bigStr);
  assert.ok(result >= 262144, `Should early-exit, got ${result}`);
});

test("estimateSizeFast handles mixed object/array nesting", () => {
  const data = {
    choices: [
      {
        delta: { content: "Hello world" },
        index: 0,
      },
    ],
  };
  // content=11, index=8 (number), delta keys: content+delta=7, choices=8
  const result = estimateSizeFast(data);
  assert.ok(result > 0);
  assert.ok(result < 100);
});

test("estimateSizeFast does not count keys, only values", () => {
  // Object with long keys but short values
  const obj = { aLongKeyName: "x", anotherLongKeyName: "y" };
  assert.equal(estimateSizeFast(obj), 2); // "x" + "y"
});

test("isSmallEnoughForSemanticCache returns true for small payloads", () => {
  assert.ok(isSmallEnoughForSemanticCache({ msg: "hi" }));
});

test("isSmallEnoughForSemanticCache returns false for huge payloads", () => {
  const huge = { data: "x".repeat(300_000) };
  assert.ok(!isSmallEnoughForSemanticCache(huge));
});

test("isSmallEnoughForSemanticCache handles circular refs gracefully", () => {
  const circular: Record<string, unknown> = {};
  circular.self = circular;
  // Should not hang; estimateSizeFast has WeakSet protection
  const result = isSmallEnoughForSemanticCache(circular);
  assert.equal(result, true); // 0 bytes < 256KB
});

test("estimateSizeFast handles Map-like objects (no infinite loop on iterables)", () => {
  const map = new Map<string, unknown>([["key", "value"]]);
  // Maps are objects but have no enumerable own properties via for-in
  const result = estimateSizeFast(map);
  assert.ok(typeof result === "number");
});
