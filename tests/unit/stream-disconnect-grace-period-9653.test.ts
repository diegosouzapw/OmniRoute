/**
 * Regression tests for #9653 — a client that closes its connection right after
 * reading a fully-completed SSE stream could race OmniRoute's own completion
 * bookkeeping, persisting a false 499/0-tokens for a request that actually
 * delivered its full response. createClientDisconnectGraceHandler gives a
 * delayed completion a grace period to land before finalizing as a failure.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { createClientDisconnectGraceHandler } from "../../open-sse/utils/streamFailureFinalization.ts";

/** Fake scheduler: setTimeoutFn calls are queued instead of run on a real clock;
 * the test advances them one at a time by calling `runNext()`. */
function createFakeScheduler() {
  const queue: Array<() => void> = [];
  return {
    setTimeoutFn: (callback: () => void) => {
      queue.push(callback);
      return 0;
    },
    runNext: () => {
      const callback = queue.shift();
      if (!callback) throw new Error("no pending timer to run");
      callback();
    },
    pending: () => queue.length,
  };
}

test("#9653: a completion already recorded before disconnect finalizes immediately, never calls finalize", () => {
  const scheduler = createFakeScheduler();
  let finalizeCalls = 0;
  const handler = createClientDisconnectGraceHandler({
    isStreamCompletionRecorded: () => true,
    gracePeriodMs: 10_000,
    finalize: () => {
      finalizeCalls++;
    },
    setTimeoutFn: scheduler.setTimeoutFn,
  });

  const result = handler({ reason: "request_signal_aborted", duration: 100 });

  assert.equal(result, true);
  assert.equal(finalizeCalls, 0);
  assert.equal(scheduler.pending(), 0);
});

test("#9653: gracePeriodMs <= 0 finalizes immediately (old pre-#9653 behavior)", () => {
  const scheduler = createFakeScheduler();
  let finalizeCalls = 0;
  const handler = createClientDisconnectGraceHandler({
    isStreamCompletionRecorded: () => false,
    gracePeriodMs: 0,
    finalize: () => {
      finalizeCalls++;
    },
    setTimeoutFn: scheduler.setTimeoutFn,
  });

  const result = handler({ reason: "request_signal_aborted", duration: 100 });

  assert.equal(result, true);
  assert.equal(finalizeCalls, 1);
  assert.equal(scheduler.pending(), 0);
});

test("#9653: a real completion landing during the grace period skips finalize entirely", () => {
  const scheduler = createFakeScheduler();
  let finalizeCalls = 0;
  let completed = false;
  const realNow = Date.now;
  let fakeNow = 0;
  Date.now = () => fakeNow;
  try {
    const handler = createClientDisconnectGraceHandler({
      isStreamCompletionRecorded: () => completed,
      gracePeriodMs: 1000,
      finalize: () => {
        finalizeCalls++;
      },
      pollIntervalMs: 100,
      setTimeoutFn: scheduler.setTimeoutFn,
    });

    const result = handler({ reason: "request_signal_aborted", duration: 100 });
    assert.equal(result, true, "claims handled immediately, poll is pending");
    assert.equal(finalizeCalls, 0);
    assert.equal(scheduler.pending(), 1);

    // The real completion lands mid-grace-period.
    completed = true;
    fakeNow += 100;
    scheduler.runNext();

    assert.equal(finalizeCalls, 0, "completion landed — must not finalize as a failure");
    assert.equal(scheduler.pending(), 0, "poll must stop once completion is recorded");
  } finally {
    Date.now = realNow;
  }
});

test("#9653: no completion ever lands — finalizes as a failure once the deadline passes", () => {
  const scheduler = createFakeScheduler();
  let finalizeCalls = 0;
  let finalizedEvent: unknown = null;
  const realNow = Date.now;
  let fakeNow = 0;
  Date.now = () => fakeNow;
  try {
    const handler = createClientDisconnectGraceHandler({
      isStreamCompletionRecorded: () => false,
      gracePeriodMs: 1000,
      finalize: (event) => {
        finalizeCalls++;
        finalizedEvent = event;
      },
      pollIntervalMs: 250,
      setTimeoutFn: scheduler.setTimeoutFn,
    });

    const event = { reason: "request_signal_aborted", duration: 100 };
    const result = handler(event);
    assert.equal(result, true);
    assert.equal(finalizeCalls, 0);

    // Advance through the grace period in 250ms polling steps; completion never lands.
    for (let i = 0; i < 3; i++) {
      fakeNow += 250;
      scheduler.runNext();
      assert.equal(finalizeCalls, 0, `must not finalize before the deadline (step ${i})`);
    }

    fakeNow += 250; // now at 1000ms, deadline reached
    scheduler.runNext();

    assert.equal(finalizeCalls, 1, "must finalize as a failure once the deadline passes");
    assert.deepEqual(finalizedEvent, event);
    assert.equal(scheduler.pending(), 0, "must stop polling after finalizing");
  } finally {
    Date.now = realNow;
  }
});
