// Characterization of the services/usage.ts quota-core split (god-file decomposition): the shared
// UsageQuota shape + the two pure builders (parseResetTime, createQuotaFromUsage) moved into
// services/usage/quota.ts so the per-provider fetcher leaves can share them without a cycle.
// Behavior-preserving move — these locks pin the timestamp normalization (sec vs ms, epoch-zero →
// null, numeric strings) and the used/total → quota assembly (clamping, remaining %).
import { test } from "node:test";
import assert from "node:assert/strict";

const Q = await import("../../open-sse/services/usage/quota.ts");

test("parseResetTime normalizes seconds, millis, numeric strings; epoch-zero → null", () => {
  // seconds (< 1e12) get *1000
  assert.equal(Q.parseResetTime(1_700_000_000), new Date(1_700_000_000_000).toISOString());
  // millis pass through
  assert.equal(Q.parseResetTime(1_700_000_000_000), new Date(1_700_000_000_000).toISOString());
  // numeric string as seconds
  assert.equal(Q.parseResetTime("1700000000"), new Date(1_700_000_000_000).toISOString());
  // ISO string passes through
  assert.equal(Q.parseResetTime("2026-01-02T03:04:05.000Z"), "2026-01-02T03:04:05.000Z");
  // epoch-zero / falsy / junk → null
  assert.equal(Q.parseResetTime(0), null);
  assert.equal(Q.parseResetTime(null), null);
  assert.equal(Q.parseResetTime("not a date"), null);
});

test("createQuotaFromUsage clamps used to total and computes remaining %", () => {
  const q = Q.createQuotaFromUsage(30, 100, null);
  assert.equal(q.total, 100);
  assert.equal(q.used, 30);
  assert.equal(q.remaining, 70);
  assert.equal(q.remainingPercentage, 70);
  assert.equal(q.unlimited, false);
  assert.equal(q.resetAt, null);

  // used above total is clamped
  const over = Q.createQuotaFromUsage(250, 100, null);
  assert.equal(over.used, 100);
  assert.equal(over.remaining, 0);
  assert.equal(over.remainingPercentage, 0);

  // total 0 → everything zeroed
  const zero = Q.createQuotaFromUsage(5, 0, null);
  assert.equal(zero.total, 0);
  assert.equal(zero.used, 0);
  assert.equal(zero.remaining, 0);
  assert.equal(zero.remainingPercentage, 0);
});

test("createQuotaFromUsage threads the reset timestamp through parseResetTime", () => {
  const q = Q.createQuotaFromUsage(1, 10, 1_700_000_000);
  assert.equal(q.resetAt, new Date(1_700_000_000_000).toISOString());
});
