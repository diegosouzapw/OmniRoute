import test from "node:test";
import assert from "node:assert/strict";

import {
  capMemoryExtractionText,
  truncateForLog,
  cloneBoundedChatLogPayload,
  MEMORY_EXTRACTION_TEXT_LIMIT,
} from "../../open-sse/handlers/chatCore/logTruncation.ts";

test("capMemoryExtractionText keeps short strings and tail-truncates long ones", () => {
  assert.equal(capMemoryExtractionText("hello"), "hello");
  const long = "x".repeat(MEMORY_EXTRACTION_TEXT_LIMIT + 100);
  const capped = capMemoryExtractionText(long);
  assert.equal(capped.length, MEMORY_EXTRACTION_TEXT_LIMIT);
  assert.ok(capped.endsWith("x"));
});

test("truncateForLog summarizes oversized objects and passes through small ones", () => {
  const small = { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] };
  assert.equal(truncateForLog(small), small);

  const huge = {
    model: "gpt-4o",
    provider: "openai",
    stream: true,
    // Use Array.from to create distinct object references so estimateSizeFast
    // (which deduplicates via WeakSet) counts every message individually.
    messages: Array.from({ length: 50000 }, () => ({ role: "user", content: "x".repeat(64) })),
  };
  const summary = truncateForLog(huge) as Record<string, unknown>;
  assert.equal(summary._truncated, true);
  assert.equal(summary.model, "gpt-4o");
  assert.equal(summary.provider, "openai");
  assert.equal(summary.messageCount, 50000);
  assert.equal(summary.stream, true);
});

test("cloneBoundedChatLogPayload truncates long tail arrays with a marker", () => {
  const cloned = cloneBoundedChatLogPayload({ items: new Array(1000).fill("a") }) as {
    items: unknown[];
  };
  const marker = cloned.items[0] as Record<string, unknown>;
  assert.equal(marker._omniroute_truncated_array, true);
  assert.equal(marker.originalLength, 1000);
});
