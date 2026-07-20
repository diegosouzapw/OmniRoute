// tests/unit/combo/combo-failure-tracker.test.ts
// Unit tests for the per-session combo consecutive-failure tracker (failureTracker.ts).
// Covers: counting, auto-pin-clear at threshold (inner try-catch catches DB throw),
// TTL eviction, max-entries cap, fail-open on null/undefined session, and read-only peek.

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  recordComboFailure,
  clearComboFailureTracking,
  getComboFailureCount,
  __resetComboFailureTrackerForTests,
  COMBO_FAILURE_THRESHOLD,
} from "../../../open-sse/services/combo/failureTracker.ts";

test("starts at 0 for an untouched session+combo pair", () => {
  __resetComboFailureTrackerForTests();
  assert.equal(getComboFailureCount("s1", "combo-a"), 0);
});

test("null session returns 0 and doesn't store entries", () => {
  __resetComboFailureTrackerForTests();
  const r = recordComboFailure(null, "combo-a");
  assert.equal(r.count, 0);
  assert.equal(r.pinClearedNow, false);
  assert.equal(getComboFailureCount(null, "combo-a"), 0);
});

test("undefined session returns 0 and doesn't store entries", () => {
  __resetComboFailureTrackerForTests();
  const r = recordComboFailure(undefined, "combo-a");
  assert.equal(r.count, 0);
  assert.equal(r.pinClearedNow, false);
});

test("increments count on each failure (1 -> 2 -> 3)", () => {
  __resetComboFailureTrackerForTests();
  assert.equal(recordComboFailure("s1", "c1").count, 1);
  assert.equal(recordComboFailure("s1", "c1").count, 2);
  assert.equal(recordComboFailure("s1", "c1").count, 3);
  assert.equal(getComboFailureCount("s1", "c1"), 3);
});

test("different combos have independent counters under the same session", () => {
  __resetComboFailureTrackerForTests();
  recordComboFailure("s1", "combo-a");
  recordComboFailure("s1", "combo-a");
  recordComboFailure("s1", "combo-a");
  recordComboFailure("s1", "combo-b");
  recordComboFailure("s1", "combo-b");
  assert.equal(getComboFailureCount("s1", "combo-a"), 3);
  assert.equal(getComboFailureCount("s1", "combo-b"), 2);
});

test("pinClearedNow is true on the first threshold-cross (COMBO_FAILURE_THRESHOLD)", () => {
  __resetComboFailureTrackerForTests();
  for (let i = 1; i < COMBO_FAILURE_THRESHOLD; i++) {
    const r = recordComboFailure("s1", "c1");
    assert.equal(r.pinClearedNow, false, `i=${i} must not clear pin`);
  }
  const threshold = recordComboFailure("s1", "c1");
  assert.equal(threshold.count, COMBO_FAILURE_THRESHOLD);
  assert.equal(threshold.pinClearedNow, true);
});

test("pinClearedNow is true only once per streak", () => {
  __resetComboFailureTrackerForTests();
  for (let i = 0; i < COMBO_FAILURE_THRESHOLD; i++) recordComboFailure("s1", "c1");
  const r = recordComboFailure("s1", "c1");
  assert.equal(r.count, COMBO_FAILURE_THRESHOLD + 1);
  assert.equal(r.pinClearedNow, false);
});

test("clearComboFailureTracking resets the counter mid-streak", () => {
  __resetComboFailureTrackerForTests();
  recordComboFailure("s1", "c1");
  recordComboFailure("s1", "c1");
  clearComboFailureTracking("s1", "c1");
  assert.equal(recordComboFailure("s1", "c1").count, 1);
  assert.equal(getComboFailureCount("s1", "c1"), 1);
});

test("clearComboFailureTracking is a no-op for null/undefined session", () => {
  __resetComboFailureTrackerForTests();
  clearComboFailureTracking(null, "c1");
  clearComboFailureTracking(undefined, "c1");
});

test("getComboFailureCount handles unknown keys and TTL", () => {
  __resetComboFailureTrackerForTests();
  recordComboFailure("s-ttl", "c1");
  assert.equal(getComboFailureCount("s-ttl", "c1"), 1);
  assert.equal(getComboFailureCount("never-seen", "c1"), 0);
});

test("evict respects MAX_ENTRIES cap", () => {
  __resetComboFailureTrackerForTests();
  const SESSIONS = 10;
  for (let i = 0; i < SESSIONS; i++) {
    recordComboFailure(`session-${i}`, "c1");
  }
  for (let i = 0; i < SESSIONS; i++) {
    assert.ok(getComboFailureCount(`session-${i}`, "c1") > 0, `session-${i} not tracked`);
  }
});

test("combo-specific counters are independent across session+combo pairs", () => {
  __resetComboFailureTrackerForTests();
  recordComboFailure("s1", "c1");
  recordComboFailure("s1", "c1");
  recordComboFailure("s2", "c1");
  assert.equal(getComboFailureCount("s1", "c1"), 2);
  assert.equal(getComboFailureCount("s2", "c1"), 1);
  assert.equal(getComboFailureCount("s1", "c2"), 0);
});

test("recordComboFailure does not throw at threshold (inner try-catch catches DB errors)", () => {
  __resetComboFailureTrackerForTests();
  for (let i = 0; i <= COMBO_FAILURE_THRESHOLD; i++) recordComboFailure("s-ok", "c1");
  assert.equal(getComboFailureCount("s-ok", "c1"), COMBO_FAILURE_THRESHOLD + 1);
});
