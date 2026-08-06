/**
 * TDD regression test — Bottleneck reservoir heartbeat death after updateSettings().
 *
 * Bug: Bottleneck 2.19.5 (frozen upstream dependency, no release since 2019) has a
 * defect in `LocalDatastore#_startHeartbeat()`
 * (node_modules/bottleneck/lib/LocalDatastore.js:26-58). The guard
 * `if (this.heartbeat == null && ...)` only (re)creates the periodic
 * reservoir-refresh `setInterval` the FIRST time it runs. Every later call —
 * including the one `updateSettings()` itself triggers internally via
 * `__updateSettings__` — falls into the `else` branch and does
 * `clearInterval(this.heartbeat)` WITHOUT resetting `this.heartbeat` back to
 * `null`. Because the stale (now-invalid) reference is left in place, every
 * future `_startHeartbeat()` call keeps taking the same dead `else` branch:
 * the periodic reservoir refresh is gone forever after the FIRST manual
 * `limiter.updateSettings()` call.
 *
 * Every limiter created by rateLimitManager.ts starts with a live heartbeat
 * (the constructor call inside `getLimiter()` always sets
 * reservoirRefreshInterval/reservoirRefreshAmount — see buildLimiterDefaults()),
 * so the very first `updateFromHeaders()`/`updateFromResponseBody()`/
 * `applyRequestQueueSettings()` call against that limiter permanently kills its
 * refresh. Once the reservoir then hits 0, it never refills again.
 *
 * Production symptom: an auto-enrolled apikey connection accumulates its
 * default 60 requests, the reservoir zeroes, the request queue freezes for
 * ~120s, the watchdog fires a synthetic 502 (RATE_LIMIT_QUEUE_WEDGED), the
 * connection cools down and is excluded from weighted combo pools — turning a
 * configured 70/30 split into ~50/50 (see
 * tests/integration/combo-matrix/weighted.test.ts, the E2E proof for this
 * same bug).
 *
 * This test drives the exact same sequence directly against
 * open-sse/services/rateLimitManager.ts's public surface, without any DB or
 * HTTP layer, to isolate the Bottleneck heartbeat defect on its own.
 */
import test from "node:test";
import assert from "node:assert/strict";

const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const PROVIDER = "reservoir-refresh-test-provider";
const CONNECTION_ID = "reservoir-refresh-test-conn";

test.after(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test("reservoir keeps refreshing after updateSettings() touches an already-heartbeating limiter", async () => {
  rateLimitManager.enableRateLimitProtection(CONNECTION_ID);

  // 1. First call creates the limiter. Bottleneck's LocalDatastore constructor
  // starts heartbeat #1 (alive) because the default reservoirRefreshInterval/
  // reservoirRefreshAmount are always set (buildLimiterDefaults()).
  const warmup = await rateLimitManager.withRateLimit(
    PROVIDER,
    CONNECTION_ID,
    null,
    async () => "warmup"
  );
  assert.equal(warmup, "warmup");

  // 2. Header-learned update — the first *manual* updateSettings() call on this
  // limiter. remaining(2) < limit(6000)*0.1 takes updateFromHeaders' "throttle"
  // branch, which sets a real reservoir=2 with a 1s refresh window (limit=6000
  // keeps minTime at 0 so it doesn't pace the slot consumption below). This is
  // exactly the call that kills the heartbeat under the unfixed Bottleneck bug.
  rateLimitManager.updateFromHeaders(
    PROVIDER,
    CONNECTION_ID,
    {
      "x-ratelimit-limit-requests": "6000",
      "x-ratelimit-remaining-requests": "2",
      "x-ratelimit-reset-requests": "1s",
    },
    200
  );

  // updateFromHeaders applies the limiter update asynchronously (fire-and-forget
  // — see trackAsyncOperation in rateLimitManager.ts). Poll the test-only state
  // hook until the reservoir actually lands at 2 instead of assuming a fixed
  // number of event-loop ticks: Bottleneck's own updateSettings() goes through
  // at least one real setTimeout(0) (yieldLoop) before storeOptions reflects the
  // new value.
  const pollDeadline = Date.now() + 2000;
  let state = await rateLimitManager.__getLimiterStateForTests(PROVIDER, CONNECTION_ID, null);
  while (state?.reservoir !== 2 && Date.now() < pollDeadline) {
    await wait(10);
    state = await rateLimitManager.__getLimiterStateForTests(PROVIDER, CONNECTION_ID, null);
  }
  assert.equal(state?.reservoir, 2, "reservoir must land at 2 before the slots below are consumed");

  // 3. Consume both reservoir slots.
  assert.equal(
    await rateLimitManager.withRateLimit(PROVIDER, CONNECTION_ID, null, async () => "slot-1"),
    "slot-1"
  );
  assert.equal(
    await rateLimitManager.withRateLimit(PROVIDER, CONNECTION_ID, null, async () => "slot-2"),
    "slot-2"
  );

  // 4. Reservoir is now 0. A healthy Bottleneck heartbeat refills it ~1s later
  // from the reservoirRefreshInterval/reservoirRefreshAmount configured above.
  // Race a 3rd request against a 5s timer: if the heartbeat died (unfixed bug),
  // the request stays QUEUED forever and the timer wins instead.
  const RACE_TIMEOUT_MS = 5000;
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<"timed-out">((resolve) => {
    timeoutHandle = setTimeout(() => resolve("timed-out"), RACE_TIMEOUT_MS);
  });
  const request = rateLimitManager.withRateLimit(
    PROVIDER,
    CONNECTION_ID,
    null,
    async () => "slot-3" as const
  );

  const result = await Promise.race([request, timeout]);
  if (timeoutHandle) clearTimeout(timeoutHandle);

  assert.equal(
    result,
    "slot-3",
    'reservoir must refresh ~1s after being exhausted; "timed-out" means the Bottleneck ' +
      "heartbeat died after updateSettings() and the reservoir never refilled " +
      "(node_modules/bottleneck/lib/LocalDatastore.js _startHeartbeat clearInterval-without-null bug)"
  );
});
