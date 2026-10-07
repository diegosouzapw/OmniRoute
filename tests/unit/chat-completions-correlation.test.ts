import test from "node:test";
import assert from "node:assert/strict";

const { resolveIncomingCorrelationId } = await import(
  "../../src/shared/utils/correlationPreserve.ts"
);

test("resolveIncomingCorrelationId preserves valid caller ID", () => {
  assert.equal(resolveIncomingCorrelationId("caller-correlation"), "caller-correlation");
  assert.equal(resolveIncomingCorrelationId("  spaced-id  "), "spaced-id");
  assert.equal(resolveIncomingCorrelationId("abc-123_XYZ"), "abc-123_XYZ");
});

test("resolveIncomingCorrelationId sanitizes header injection", () => {
  assert.equal(resolveIncomingCorrelationId("evil\r\nInjected: true"), "evilInjected: true");
  assert.equal(resolveIncomingCorrelationId("with\nnewline"), "withnewline");
  assert.equal(resolveIncomingCorrelationId("with\rcarriage"), "withcarriage");
});

test("resolveIncomingCorrelationId rejects empty and overlong", () => {
  assert.equal(resolveIncomingCorrelationId(null), null);
  assert.equal(resolveIncomingCorrelationId(undefined), null);
  assert.equal(resolveIncomingCorrelationId(""), null);
  assert.equal(resolveIncomingCorrelationId("   "), null);
  const long = "a".repeat(257);
  assert.equal(resolveIncomingCorrelationId(long), null);
  assert.equal(resolveIncomingCorrelationId("a".repeat(256)), "a".repeat(256));
});

test("resolveIncomingCorrelationId trims before length check", () => {
  // 256 chars plus surrounding spaces should still be valid after trim
  const spacedLong = "  " + "a".repeat(256) + "  ";
  assert.equal(resolveIncomingCorrelationId(spacedLong), "a".repeat(256));
  // 257 after trim should be rejected
  const spacedTooLong = " " + "a".repeat(257) + " ";
  assert.equal(resolveIncomingCorrelationId(spacedTooLong), null);
});
