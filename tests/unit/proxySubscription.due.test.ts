import test from "node:test";
import assert from "node:assert/strict";

const due = await import("../../src/lib/proxySubscription/due.ts");
const { isSubscriptionDue } = due;

const base = { enabled: true, lastFetchedAt: null, updateIntervalMinutes: 60 };

test("never-fetched subscription is immediately due", () => {
  assert.equal(isSubscriptionDue({ ...base, lastFetchedAt: null }, 1_000), true);
});

test("disabled subscription is never due, even if stale", () => {
  const lastIso = new Date(0).toISOString();
  assert.equal(
    isSubscriptionDue({ enabled: false, lastFetchedAt: lastIso, updateIntervalMinutes: 60 }, 3_600_000),
    false
  );
});

test("becomes due exactly at the interval boundary (>=)", () => {
  const last = new Date("2026-01-01T00:00:00.000Z").getTime();
  const lastIso = new Date(last).toISOString();
  const intervalMs = 60 * 60_000;
  // exactly one interval elapsed → due (>= comparison)
  assert.equal(isSubscriptionDue({ enabled: true, lastFetchedAt: lastIso, updateIntervalMinutes: 60 }, last + intervalMs), true);
  // one millisecond before → not due
  assert.equal(isSubscriptionDue({ enabled: true, lastFetchedAt: lastIso, updateIntervalMinutes: 60 }, last + intervalMs - 1), false);
  // half interval elapsed → not due
  assert.equal(isSubscriptionDue({ enabled: true, lastFetchedAt: lastIso, updateIntervalMinutes: 60 }, last + intervalMs / 2), false);
});

test("respects a custom update interval", () => {
  const last = new Date("2026-01-01T00:00:00.000Z").getTime();
  const lastIso = new Date(last).toISOString();
  // 10-min interval, 5 min elapsed → not due
  assert.equal(isSubscriptionDue({ enabled: true, lastFetchedAt: lastIso, updateIntervalMinutes: 10 }, last + 5 * 60_000), false);
  // 10-min interval, 11 min elapsed → due
  assert.equal(isSubscriptionDue({ enabled: true, lastFetchedAt: lastIso, updateIntervalMinutes: 10 }, last + 11 * 60_000), true);
});

test("unparseable lastFetchedAt is treated as never-fetched (due)", () => {
  assert.equal(isSubscriptionDue({ enabled: true, lastFetchedAt: "not-a-real-date", updateIntervalMinutes: 60 }, 1_000), true);
});

test("a zero/negative interval is clamped to 0 (always due once fetched)", () => {
  const last = new Date("2026-01-01T00:00:00.000Z").getTime();
  const lastIso = new Date(last).toISOString();
  assert.equal(isSubscriptionDue({ enabled: true, lastFetchedAt: lastIso, updateIntervalMinutes: 0 }, last + 1), true);
  assert.equal(isSubscriptionDue({ enabled: true, lastFetchedAt: lastIso, updateIntervalMinutes: -5 }, last + 1), true);
});
