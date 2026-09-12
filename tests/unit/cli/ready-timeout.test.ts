import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { resolveReadyTimeoutMs } from "../../../bin/cli/utils/pid.mjs";

describe("resolveReadyTimeoutMs", () => {
  const savedEnv = process.env.OMNIROUTE_READY_TIMEOUT_MS;

  beforeEach(() => {
    // Reset env between tests
    if (savedEnv === undefined) {
      delete process.env.OMNIROUTE_READY_TIMEOUT_MS;
    } else {
      process.env.OMNIROUTE_READY_TIMEOUT_MS = savedEnv;
    }
  });

  test("returns 60000 by default (no env, no override)", () => {
    delete process.env.OMNIROUTE_READY_TIMEOUT_MS;
    assert.equal(resolveReadyTimeoutMs(), 60_000);
  });

  test("honours explicit override when provided", () => {
    delete process.env.OMNIROUTE_READY_TIMEOUT_MS;
    assert.equal(resolveReadyTimeoutMs({ timeoutMs: 120_000 }), 120_000);
  });

  test("explicit override wins over env var", () => {
    process.env.OMNIROUTE_READY_TIMEOUT_MS = "300000";
    assert.equal(resolveReadyTimeoutMs({ timeoutMs: 90_000 }), 90_000);
  });

  test("reads OMNIROUTE_READY_TIMEOUT_MS env var", () => {
    process.env.OMNIROUTE_READY_TIMEOUT_MS = "180000";
    assert.equal(resolveReadyTimeoutMs(), 180_000);
  });

  test("falls back to default when env var is non-numeric", () => {
    process.env.OMNIROUTE_READY_TIMEOUT_MS = "not-a-number";
    assert.equal(resolveReadyTimeoutMs(), 60_000);
  });

  test("falls back to default when env var is zero", () => {
    process.env.OMNIROUTE_READY_TIMEOUT_MS = "0";
    assert.equal(resolveReadyTimeoutMs(), 60_000);
  });

  test("falls back to default when env var is negative", () => {
    process.env.OMNIROUTE_READY_TIMEOUT_MS = "-5000";
    assert.equal(resolveReadyTimeoutMs(), 60_000);
  });

  test("falls back to default when override is zero", () => {
    delete process.env.OMNIROUTE_READY_TIMEOUT_MS;
    assert.equal(resolveReadyTimeoutMs({ timeoutMs: 0 }), 60_000);
  });

  test("falls back to default when override is negative", () => {
    delete process.env.OMNIROUTE_READY_TIMEOUT_MS;
    assert.equal(resolveReadyTimeoutMs({ timeoutMs: -1 }), 60_000);
  });

  test("accepts fractional seconds as milliseconds", () => {
    process.env.OMNIROUTE_READY_TIMEOUT_MS = "65536";
    assert.equal(resolveReadyTimeoutMs(), 65_536);
  });

  test("handles empty string env var as unset", () => {
    process.env.OMNIROUTE_READY_TIMEOUT_MS = "";
    assert.equal(resolveReadyTimeoutMs(), 60_000);
  });
});
