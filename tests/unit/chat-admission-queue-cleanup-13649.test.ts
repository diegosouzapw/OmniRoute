// #13649: idle-queue TTL cleanup in ChatAdmissionController.
//
// The PR body claimed `#queues`/`#fairKeys` grow indefinitely because settled
// waiters are never removed. Tracing `#removeWaiter`/`#removeFairKey` shows
// every key already self-removes the instant its queue drains (unconditionally,
// on admit/timeout/abort) — the first test below reproduces a burst of many
// session keys settling and confirms that claim does NOT hold on this tip.
// The remaining tests cover the TTL sweep itself: it must never evict a key
// whose queue still has parked waiters, and `#queueTimestamps` must stay in
// lockstep with the normal drain path instead of depending on the sweep.
import test from "node:test";
import assert from "node:assert/strict";

const { ChatAdmissionController, CHAT_ADMISSION_QUEUE_IDLE_TTL_MS } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");

test("many session keys settling in a burst never leave #queues/#fairKeys growing (leak claim does not reproduce)", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const waits = Array.from({ length: 50 }, (_, i) =>
    controller.acquireHeavyWithin(20, undefined, 0, `session-${i}`)
  );
  const results = await Promise.all(waits);
  assert.ok(
    results.every((r) => r === null),
    "every waiter times out while capacity stays held"
  );

  assert.equal(controller.waitingCount, 0, "no waiter is left parked after settling");
  assert.equal(
    controller.waitersByKey.length,
    0,
    "#queues must not retain an entry per session key once its queue drains"
  );

  held.release();
  assert.equal(controller.activeHeavy, 0);
});

test("the TTL sweep never evicts a key whose queue still has a parked waiter", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const pending = controller.acquireHeavyWithin(5_000, undefined, 0, "long-parked");
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(controller.waitingCount, 1, "the waiter is parked");

  // Simulate the queue's creation timestamp aging well past the TTL without
  // waiting for real time — the waiter is still genuinely parked.
  const farFuture = Date.now() + CHAT_ADMISSION_QUEUE_IDLE_TTL_MS + 60_000;
  controller._runCleanupForTest(farFuture);

  assert.equal(
    controller.waitingCount,
    1,
    "an actively parked queue must survive the sweep no matter how old its timestamp is"
  );
  assert.deepEqual(
    controller.waitersByKey,
    [{ key: "long-parked", waiting: 1 }],
    "the key must still be tracked so #dispatchFair can wake it"
  );

  // A freed slot must still be able to wake it — it was never stranded outside
  // the fair-dispatch rotation by the sweep.
  held.release();
  const lease = await pending;
  assert.ok(lease, "the long-parked waiter must still be woken after the sweep ran");
  lease?.release();
  assert.equal(controller.activeHeavy, 0);
});

test("the TTL sweep frees an orphaned queue-timestamp entry with no matching live queue", () => {
  const controller = new ChatAdmissionController(1);
  // #removeFairKey already deletes #queueTimestamps in lockstep with #queues on
  // every normal drain, so an orphaned entry cannot occur via the public API
  // today — this seeds one directly to give the sweep's defensive branch (any
  // future desync) direct coverage.
  controller._seedQueueTimestampForTest(
    "orphaned",
    Date.now() - CHAT_ADMISSION_QUEUE_IDLE_TTL_MS - 1
  );
  assert.equal(controller._queueTimestampCountForTest(), 1);

  controller._runCleanupForTest();

  assert.equal(
    controller._queueTimestampCountForTest(),
    0,
    "an idle, queue-less timestamp entry must be freed by the sweep"
  );
});

test("#removeFairKey clears #queueTimestamps immediately on a normal drain, without waiting for the TTL sweep", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const pending = controller.acquireHeavyWithin(2_000, undefined, 0, "drains-normally");
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(
    controller._queueTimestampCountForTest(),
    1,
    "the timestamp is recorded on creation"
  );

  held.release();
  const lease = await pending;
  assert.ok(lease);
  lease?.release();

  assert.equal(
    controller._queueTimestampCountForTest(),
    0,
    "the drain path must remove the timestamp immediately, not just #queues/#fairKeys"
  );
});
