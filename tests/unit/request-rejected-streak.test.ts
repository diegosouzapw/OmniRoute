/**
 * open-sse/services/requestRejectedStreak.ts (#12859): per-connection streak
 * of upstream per-request refusals → growing cooldown, escalation only for
 * consecutive refusals. One cooldown episode counts once: refusals landing
 * while the connection is already excluded were in flight before the cooldown
 * and are not new evidence.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  recordRequestRejected,
  seedRequestRejectedStreak,
  hasRequestRejectedStreak,
  clearRequestRejectedStreak,
  __resetRequestRejectedStreaksForTests,
  REQUEST_REJECTED_WINDOW_MS,
  REQUEST_REJECTED_ESCALATION_THRESHOLD,
  REQUEST_REJECTED_COOLDOWNS_MS,
} = await import("../../open-sse/services/requestRejectedStreak.ts");
const { COOLDOWN_MS } = await import("../../open-sse/config/errorConfig.ts");

const MIN = 60 * 1000;
const T0 = 1_000_000;

test.beforeEach(() => __resetRequestRejectedStreaksForTests());

test("ladder comes from COOLDOWN_MS and has one rung per non-escalating refusal", () => {
  assert.deepEqual(REQUEST_REJECTED_COOLDOWNS_MS, [
    COOLDOWN_MS.requestRejected,
    COOLDOWN_MS.requestRejectedRepeat,
  ]);
  assert.equal(REQUEST_REJECTED_COOLDOWNS_MS.length, REQUEST_REJECTED_ESCALATION_THRESHOLD - 1);
});

test("first refusal: first cooldown rung, counted, no escalation", () => {
  const v = recordRequestRejected("conn-a", T0);
  assert.equal(v.streak, 1);
  assert.equal(v.counted, true);
  assert.equal(v.escalate, false);
  assert.equal(v.cooldownMs, COOLDOWN_MS.requestRejected);
  assert.equal(v.threshold, REQUEST_REJECTED_ESCALATION_THRESHOLD);
  assert.equal(v.windowMs, REQUEST_REJECTED_WINDOW_MS);
});

test("refusals that land while the connection is already excluded are the same episode", () => {
  const first = recordRequestRejected("conn-a", T0);
  // Three parallel requests that were in flight when the first 403 came back.
  const inFlight = [1, 2, 3].map((s) => recordRequestRejected("conn-a", T0 + s * 1000));
  for (const v of inFlight) {
    assert.equal(v.counted, false, "not new evidence");
    assert.equal(v.streak, 1, "streak stays at 1");
    assert.equal(v.escalate, false, "a burst must never ban");
    assert.ok(v.cooldownMs > 0 && v.cooldownMs <= first.cooldownMs, "remaining cooldown");
  }
});

test("consecutive episodes grow the cooldown and escalate at the threshold", () => {
  const first = recordRequestRejected("conn-a", T0);
  const second = recordRequestRejected("conn-a", T0 + first.cooldownMs + 1);
  assert.equal(second.streak, 2);
  assert.equal(second.counted, true);
  assert.equal(second.cooldownMs, COOLDOWN_MS.requestRejectedRepeat);
  assert.equal(second.escalate, false);

  const third = recordRequestRejected("conn-a", T0 + first.cooldownMs + second.cooldownMs + 2);
  assert.equal(third.streak, 3);
  assert.equal(third.escalate, true, "third consecutive refusal escalates");
  assert.equal(third.cooldownMs, 0, "terminal state replaces the cooldown");
  assert.equal(hasRequestRejectedStreak("conn-a"), false, "escalation clears the streak");

  // A reconnected connection starts from 1 again.
  const afterBan = recordRequestRejected("conn-a", T0 + 60 * MIN);
  assert.equal(afterBan.streak, 1);
  assert.equal(afterBan.escalate, false);
});

test("a refusal outside the staleness window starts a new streak", () => {
  recordRequestRejected("conn-a", T0);
  const late = recordRequestRejected("conn-a", T0 + REQUEST_REJECTED_WINDOW_MS + 1);
  assert.equal(late.streak, 1);
  assert.equal(late.cooldownMs, COOLDOWN_MS.requestRejected);
});

test("a success (clearRequestRejectedStreak) resets the count", () => {
  const first = recordRequestRejected("conn-a", T0);
  clearRequestRejectedStreak("conn-a");
  const next = recordRequestRejected("conn-a", T0 + first.cooldownMs + 1);
  assert.equal(next.streak, 1, "sporadic refusals separated by successes never accumulate");
  assert.equal(next.cooldownMs, COOLDOWN_MS.requestRejected);
});

test("streaks are per connection", () => {
  const a1 = recordRequestRejected("conn-a", T0);
  recordRequestRejected("conn-a", T0 + a1.cooldownMs + 1);
  const other = recordRequestRejected("conn-b", T0 + a1.cooldownMs + 2);
  assert.equal(other.streak, 1);
});

test("seedRequestRejectedStreak restores one refusal from before a restart", () => {
  const lastRefusalAt = T0 - 10 * MIN;
  assert.equal(seedRequestRejectedStreak("conn-a", lastRefusalAt, T0), true);
  assert.equal(hasRequestRejectedStreak("conn-a"), true);
  const v = recordRequestRejected("conn-a", T0);
  assert.equal(v.streak, 2, "the seeded refusal counts as the first of the streak");
  assert.equal(v.counted, true, "the seeded refusal's cooldown is not re-applied");
});

test("seedRequestRejectedStreak ignores stale rows and existing state", () => {
  assert.equal(seedRequestRejectedStreak("conn-a", T0 - REQUEST_REJECTED_WINDOW_MS, T0), false);
  assert.equal(seedRequestRejectedStreak("conn-a", Number.NaN, T0), false);
  assert.equal(hasRequestRejectedStreak("conn-a"), false);

  recordRequestRejected("conn-b", T0);
  assert.equal(seedRequestRejectedStreak("conn-b", T0 - MIN, T0), false, "already tracked");
});
