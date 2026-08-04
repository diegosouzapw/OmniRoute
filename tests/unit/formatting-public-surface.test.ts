import test from "node:test";
import assert from "node:assert/strict";

const formatting = await import("../../src/shared/utils/formatting.ts");
const sseLogger = await import("../../src/sse/utils/logger.ts");

test("formatting utilities public surface excludes removed display helpers", () => {
  assert.equal(Object.hasOwn(formatting, "formatDateTime"), false);
  assert.equal(Object.hasOwn(formatting, "maskKey"), false);
  assert.equal(Object.hasOwn(formatting, "formatCostAbbreviated"), false);

  assert.equal(formatting.formatTime("2026-06-29T12:34:56Z").length, 8);
  assert.equal(formatting.formatDuration(1250), "1.3s");
  assert.equal(formatting.maskSegment("abcdef", 2, 2), "ab***ef");
  assert.equal(formatting.formatCost(0.0123), "$0.0123");
});

test("sse logger wrapper no longer re-exports formatting maskKey", () => {
  assert.equal(Object.hasOwn(sseLogger, "maskKey"), false);
  assert.equal(typeof sseLogger.debug, "function");
  assert.equal(typeof sseLogger.info, "function");
  assert.equal(typeof sseLogger.warn, "function");
  assert.equal(typeof sseLogger.error, "function");
  assert.equal(typeof sseLogger.request, "function");
});
