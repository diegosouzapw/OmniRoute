import { test } from "node:test";
import assert from "node:assert/strict";
import {
  sanitizeRateLimitOverrides,
  sanitizeQuotaWindowThresholds,
} from "@/lib/db/providers/columns";

test("sanitizeRateLimitOverrides surfaces rejected keys (blocking, not silent)", () => {
  const r = sanitizeRateLimitOverrides({ rpm: 10, foo: 1, tpm: -1 });
  assert.deepEqual(r.sanitized, { rpm: 10 });
  assert.deepEqual(r.rejected.sort(), ["foo", "tpm"]);
});

test("sanitizeQuotaWindowThresholds surfaces key-too-long and out-of-range", () => {
  const r = sanitizeQuotaWindowThresholds({ ["a".repeat(65)]: 50, win: 101 });
  assert.ok(r.rejected.length >= 1);
  assert.ok(r.rejected.includes("win"));
});

test("valid input yields no rejected keys", () => {
  const r = sanitizeRateLimitOverrides({ rpm: 10, tpm: 20 });
  assert.deepEqual(r.rejected, []);
  assert.deepEqual(r.sanitized, { rpm: 10, tpm: 20 });
});

// #11251 added `maxWaitMs` to the Zod validation schema and the
// EditConnectionModal UI, but not to this separate allowlist — saving the
// field from the dashboard threw "Refusing to persist rateLimitOverrides
// with rejected keys: maxWaitMs" (500) on every attempt.
test("sanitizeRateLimitOverrides accepts maxWaitMs (#11251 follow-up)", () => {
  const r = sanitizeRateLimitOverrides({ minTime: 500, maxWaitMs: 30000 });
  assert.deepEqual(r.rejected, []);
  assert.deepEqual(r.sanitized, { minTime: 500, maxWaitMs: 30000 });
});

// `executionMaxWaitMs` has been accepted by the Zod schema
// (updateProviderConnectionSchema) but was missing from this allowlist, so a
// PATCH carrying it passed validation and then threw "Refusing to persist
// rateLimitOverrides with rejected keys: executionMaxWaitMs" — same class as
// the maxWaitMs bug above.
test("sanitizeRateLimitOverrides accepts executionMaxWaitMs (schema/allowlist parity)", () => {
  const r = sanitizeRateLimitOverrides({ maxWaitMs: 30000, executionMaxWaitMs: 300000 });
  assert.deepEqual(r.rejected, []);
  assert.deepEqual(r.sanitized, { maxWaitMs: 30000, executionMaxWaitMs: 300000 });
});
