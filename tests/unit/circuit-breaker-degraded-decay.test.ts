/**
 * DEGRADED must decay with time.
 *
 * DEGRADED is an early-warning band: traffic still flows, but the breaker only left it on a
 * success (`_onSuccess()` decrements the count). A provider that stopped receiving traffic,
 * because a router or an operator treats DEGRADED as unhealthy, never produced that success
 * and stayed DEGRADED indefinitely, with counts that also carried into the next unrelated blip.
 *
 * The breaker now forgets the warning once it has seen no failure for the longest it would hold
 * an OPEN provider for the same failure kind: the kind's `cooldownByKind` override when set, else
 * `resetTimeout`, times `maxBackoffMultiplier` (at least once). It decays lazily on read, like
 * the OPEN -> HALF_OPEN refresh. OPEN and HALF_OPEN are untouched.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { getCircuitBreaker } from "../../src/shared/utils/circuitBreaker.ts";

const RESET_MS = 30_000;
const DECAY_MS = RESET_MS * 16; // default maxBackoffMultiplier

function degradedBreaker(suffix: string) {
  const name = `degraded-decay-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  const breaker = getCircuitBreaker(name, {
    failureThreshold: 12,
    degradationThreshold: 7,
    resetTimeout: RESET_MS,
  });
  for (let i = 0; i < 7; i++) breaker._onFailure();
  assert.equal(breaker.getStatus().state, "DEGRADED");
  return breaker;
}

test("DEGRADED returns to CLOSED after a quiet window with no new failure", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  const breaker = degradedBreaker("quiet");

  t.mock.timers.tick(DECAY_MS - 1);
  assert.equal(breaker.getStatus().state, "DEGRADED", "still inside the quiet window");

  t.mock.timers.tick(1);
  const status = breaker.getStatus();
  assert.equal(status.state, "CLOSED");
  assert.equal(status.failureCount, 0);
  assert.deepEqual(status.kindFailureCounts, {});
  assert.equal(status.transitionHistory.at(-1)?.reason, "failure-decay");
});

test("a failure inside the window keeps the breaker DEGRADED and counting", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  const breaker = degradedBreaker("active");

  t.mock.timers.tick(DECAY_MS - 1_000);
  breaker._onFailure();
  t.mock.timers.tick(DECAY_MS - 1_000);

  const status = breaker.getStatus();
  assert.equal(status.state, "DEGRADED");
  assert.equal(status.failureCount, 8);
});

test("stale DEGRADED counts do not carry into a new failure after the window", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  const breaker = degradedBreaker("stale");
  breaker._onFailure(); // 8 of 12

  t.mock.timers.tick(DECAY_MS);
  breaker._onFailure(); // written without a read in between

  assert.equal(breaker.state, "CLOSED");
  assert.equal(breaker.failureCount, 1);
});

test("a DEGRADED state restored long ago decays on its first read", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 10 * 24 * 3_600_000 });
  const breaker = getCircuitBreaker(`degraded-decay-restored-${Date.now()}`, {
    failureThreshold: 12,
    degradationThreshold: 7,
    resetTimeout: RESET_MS,
  });
  // Same fields _restoreFromDb() sets from a persisted row written five days ago.
  breaker.state = "DEGRADED";
  breaker.failureCount = 9;
  breaker.lastFailureTime = Date.now() - 5 * 24 * 3_600_000;

  assert.equal(breaker.canExecute(), true);
  assert.equal(breaker.getStatus().state, "CLOSED");
  assert.equal(breaker.failureCount, 0);
});

test("the decay never touches an OPEN breaker", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  const breaker = degradedBreaker("open");
  for (let i = 0; i < 5; i++) breaker._onFailure();
  assert.equal(breaker.state, "OPEN");

  t.mock.timers.tick(DECAY_MS);
  // The existing lazy refresh moves an expired OPEN to HALF_OPEN; only a probe closes it.
  assert.equal(breaker.getStatus().state, "HALF_OPEN");
  assert.equal(breaker.failureCount, 12);
});

test("a DEGRADED state restored without a failure time decays on its first read", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  const breaker = getCircuitBreaker(`degraded-decay-no-time-${Date.now()}`, {
    failureThreshold: 12,
    degradationThreshold: 7,
    resetTimeout: RESET_MS,
  });
  // loadCircuitBreakerState() maps a zero/missing last_failure_time to null.
  breaker.state = "DEGRADED";
  breaker.failureCount = 9;
  breaker.lastFailureTime = null;

  assert.equal(breaker.getStatus().state, "CLOSED");
  assert.equal(breaker.failureCount, 0);
});

test("the quiet window follows the per-kind cooldown of the last failure", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  const QUOTA_MS = 3_600_000;
  const breaker = getCircuitBreaker(`degraded-decay-kind-${Date.now()}`, {
    failureThreshold: 12,
    degradationThreshold: 7,
    resetTimeout: RESET_MS,
    cooldownByKind: { quota_exhausted: QUOTA_MS },
  });
  for (let i = 0; i < 7; i++) breaker._onFailure("quota_exhausted");
  assert.equal(breaker.getStatus().state, "DEGRADED");

  // The base window would have elapsed, but OPEN would still hold a quota failure this long.
  t.mock.timers.tick(DECAY_MS);
  assert.equal(breaker.getStatus().state, "DEGRADED");

  t.mock.timers.tick(QUOTA_MS * 16 - DECAY_MS);
  assert.equal(breaker.getStatus().state, "CLOSED");
});

test("a zero backoff multiplier still holds DEGRADED for one reset timeout", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  const breaker = getCircuitBreaker(`degraded-decay-zero-mult-${Date.now()}`, {
    failureThreshold: 12,
    degradationThreshold: 7,
    resetTimeout: RESET_MS,
    maxBackoffMultiplier: 0, // the env knobs accept 0
  });
  for (let i = 0; i < 7; i++) breaker._onFailure();
  assert.equal(breaker.getStatus().state, "DEGRADED", "a zero window would decay at once");

  t.mock.timers.tick(RESET_MS - 1);
  assert.equal(breaker.getStatus().state, "DEGRADED");

  t.mock.timers.tick(1);
  assert.equal(breaker.getStatus().state, "CLOSED");
});
