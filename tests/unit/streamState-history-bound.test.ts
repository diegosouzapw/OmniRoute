import test from "node:test";
import assert from "node:assert/strict";

const { resolveMaxCompletedHistory } = await import("../../src/sse/services/streamState.ts");

// STREAM_HISTORY_MAX is read from the environment. A non-numeric value made parseInt
// return NaN, so the "length > MAX" trim never ran and completed-stream history grew
// without bound (a slow leak in a long-lived SSE process). The parse must fall back.
test("resolveMaxCompletedHistory: falls back to 50 on non-numeric / negative input", () => {
  assert.equal(resolveMaxCompletedHistory("unlimited"), 50, "non-numeric -> default 50");
  assert.equal(resolveMaxCompletedHistory(undefined), 50, "unset -> default 50");
  assert.equal(resolveMaxCompletedHistory("-5"), 50, "negative -> default 50");
  assert.equal(resolveMaxCompletedHistory("100"), 100, "valid number honoured");
  assert.equal(resolveMaxCompletedHistory("0"), 0, "zero is a valid bound");
});
