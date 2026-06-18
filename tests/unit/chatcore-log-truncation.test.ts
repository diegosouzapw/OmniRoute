import test from "node:test";
import assert from "node:assert/strict";

import {
  capMemoryExtractionText,
  truncateChatLogText,
  cloneBoundedChatLogPayload,
  truncateForLog,
  MEMORY_EXTRACTION_TEXT_LIMIT,
} from "../../open-sse/handlers/chatCore/logTruncation.ts";
import {
  getChatLogTextLimit,
  getChatLogArrayTailItems,
  getChatLogMaxDepth,
  getChatLogMaxObjectKeys,
} from "../../src/lib/logEnv.ts";

test("MEMORY_EXTRACTION_TEXT_LIMIT is the documented 64KB constant", () => {
  assert.equal(MEMORY_EXTRACTION_TEXT_LIMIT, 64 * 1024);
});

test("capMemoryExtractionText returns short strings unchanged", () => {
  assert.equal(capMemoryExtractionText("hello"), "hello");
  // exactly at the limit is not truncated (<= limit)
  const exact = "x".repeat(MEMORY_EXTRACTION_TEXT_LIMIT);
  assert.equal(capMemoryExtractionText(exact), exact);
});

test("capMemoryExtractionText keeps the trailing window of over-limit strings", () => {
  const long = "a".repeat(MEMORY_EXTRACTION_TEXT_LIMIT) + "TAIL";
  const capped = capMemoryExtractionText(long);
  assert.equal(capped.length, MEMORY_EXTRACTION_TEXT_LIMIT);
  // slice(-LIMIT) keeps the end, so the appended TAIL survives.
  assert.ok(capped.endsWith("TAIL"));
});

test("truncateChatLogText passes through strings up to the configured limit", () => {
  const limit = getChatLogTextLimit();
  const under = "y".repeat(limit);
  assert.equal(truncateChatLogText(under), under);
});

test("truncateChatLogText builds head + marker + tail for over-limit strings", () => {
  const limit = getChatLogTextLimit();
  const head = "H".repeat(Math.floor(limit / 2));
  const tail = "T".repeat(Math.ceil(limit / 2));
  // make the total strictly larger than the limit by inserting a middle chunk
  const middle = "M".repeat(500);
  const value = head + middle + tail;
  const out = truncateChatLogText(value);
  const expectedHead = value.slice(0, Math.floor(limit / 2));
  const expectedTail = value.slice(-Math.ceil(limit / 2));
  assert.equal(
    out,
    `${expectedHead}\n[...truncated ${value.length - limit} chars...]\n${expectedTail}`
  );
  // sanity: the marker reports exactly the number of dropped chars
  assert.ok(out.includes(`[...truncated ${value.length - limit} chars...]`));
});

test("cloneBoundedChatLogPayload returns null/undefined/primitives as-is", () => {
  assert.equal(cloneBoundedChatLogPayload(null), null);
  assert.equal(cloneBoundedChatLogPayload(undefined), undefined);
  assert.equal(cloneBoundedChatLogPayload(42), 42);
  assert.equal(cloneBoundedChatLogPayload(true), true);
});

test("cloneBoundedChatLogPayload truncates long string leaves via truncateChatLogText", () => {
  const limit = getChatLogTextLimit();
  const big = "z".repeat(limit + 1000);
  const out = cloneBoundedChatLogPayload(big) as string;
  assert.equal(out, truncateChatLogText(big));
  assert.ok(out.includes("[...truncated"));
});

test("cloneBoundedChatLogPayload tail-truncates long arrays with a marker entry", () => {
  const maxTail = getChatLogArrayTailItems();
  const n = maxTail + 100;
  const cloned = cloneBoundedChatLogPayload(new Array(n).fill("a")) as unknown[];
  // marker prepended + the retained tail items
  assert.equal(cloned.length, maxTail + 1);
  const marker = cloned[0] as Record<string, unknown>;
  assert.equal(marker._omniroute_truncated_array, true);
  assert.equal(marker.originalLength, n);
  assert.equal(marker.retainedTailItems, maxTail);
});

test("cloneBoundedChatLogPayload leaves short arrays unmarked", () => {
  const cloned = cloneBoundedChatLogPayload(["a", "b", "c"]) as unknown[];
  assert.deepEqual(cloned, ["a", "b", "c"]);
});

test("cloneBoundedChatLogPayload caps object keys and records the dropped count", () => {
  const maxKeys = getChatLogMaxObjectKeys();
  const obj: Record<string, number> = {};
  for (let i = 0; i < maxKeys + 5; i += 1) obj[`k${i}`] = i;
  const cloned = cloneBoundedChatLogPayload(obj) as Record<string, unknown>;
  // first maxKeys keys retained + the synthetic _omniroute_truncated_keys field
  assert.equal(cloned._omniroute_truncated_keys, 5);
  assert.equal(cloned.k0, 0);
  assert.equal(cloned[`k${maxKeys - 1}`], maxKeys - 1);
  // a key beyond the cap is dropped
  assert.equal(cloned[`k${maxKeys}`], undefined);
});

test("cloneBoundedChatLogPayload stops at max depth with a [MaxDepth] sentinel", () => {
  const depth = getChatLogMaxDepth();
  // build nesting that goes one level past the cap
  let leaf: Record<string, unknown> = { deep: "value" };
  for (let i = 0; i < depth + 1; i += 1) leaf = { nested: leaf };
  const cloned = cloneBoundedChatLogPayload(leaf) as Record<string, unknown>;
  // walk down `depth` levels; the level at >= maxDepth becomes the sentinel string
  let cursor: unknown = cloned;
  for (let i = 0; i < depth; i += 1) {
    cursor = (cursor as Record<string, unknown>).nested;
  }
  assert.equal(cursor, "[MaxDepth]");
});

test("truncateForLog returns null/undefined and non-object primitives unchanged", () => {
  assert.equal(truncateForLog(null), null);
  assert.equal(truncateForLog(undefined), undefined);
  assert.equal(truncateForLog("hi" as unknown), "hi" as unknown);
});

test("truncateForLog passes small objects through untouched", () => {
  const small = { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] };
  assert.equal(truncateForLog(small), small);
});

test("truncateForLog summarizes oversized payloads instead of cloning", () => {
  const huge = {
    model: "gpt-4o",
    provider: "openai",
    stream: true,
    // distinct object references so estimateSizeFast (WeakSet-dedup) counts each one
    messages: Array.from({ length: 50000 }, () => ({ role: "user", content: "x".repeat(64) })),
    contents: [{ a: 1 }],
  };
  const summary = truncateForLog(huge) as Record<string, unknown>;
  assert.equal(summary._truncated, true);
  assert.equal(typeof summary._originalBytes, "number");
  assert.ok((summary._originalBytes as number) > 8 * 1024);
  assert.equal(summary.model, "gpt-4o");
  assert.equal(summary.provider, "openai");
  assert.equal(summary.messageCount, 50000);
  assert.equal(summary.contentCount, 1);
  assert.equal(summary.stream, true);
  // the original (huge) is NOT returned — it is a fresh summary object
  assert.notEqual(summary, huge);
});
