import test from "node:test";
import assert from "node:assert/strict";
import * as semaphore from "../../open-sse/services/rateLimitSemaphore.ts";
import * as admission from "../../open-sse/services/accountSemaphore.ts";

test.afterEach(() => {
  semaphore.resetAll();
  admission.resetAll();
});

test("combo snapshots track acquisition, queued waiters, draining and deletion without aliasing", async () => {
  const key = "combo:alpha:step-1:openai/model:account-a";
  const release = await semaphore.acquire(key, { maxConcurrency: 1 });
  const waiting = semaphore.acquire(key, { maxConcurrency: 1 });
  const otherRelease = await semaphore.acquire("quota-share:account-a");
  try {
    const snapshot = semaphore.getStats("combo:");
    assert.deepEqual(snapshot, {
      [key]: { running: 1, queued: 1, max: 1, rateLimitedUntil: null },
    });
    assert.equal(Object.keys(semaphore.getStats()).length, 2);
    assert.deepEqual(semaphore.getStats("combo:absent:"), {});
    snapshot[key].running = 999;
    delete snapshot[key];
    assert.equal(semaphore.getStats("combo:")[key].running, 1);
    release();
    const nextRelease = await waiting;
    assert.deepEqual(semaphore.getStats("combo:")[key], {
      running: 1,
      queued: 0,
      max: 1,
      rateLimitedUntil: null,
    });
    nextRelease();
    assert.deepEqual(semaphore.getStats("combo:"), {});
  } finally {
    release();
    (await waiting)();
    otherRelease();
  }
});

test("the same two requests appear in combo, global, provider and account gates — counts are not additive", async () => {
  const comboKey = "combo:shared:step:provider/model:account";
  const keys = ["global", "provider:provider", "provider:account"];
  const requirements = keys.map((key) => ({ key, maxConcurrency: 1 }));
  const releaseCombo = await semaphore.acquire(comboKey, { maxConcurrency: 2 });
  const releaseAdmission = await admission.acquireMany(requirements);
  const secondCombo = await semaphore.acquire(comboKey, { maxConcurrency: 2 });
  const secondAdmission = admission.acquireMany(requirements);
  try {
    assert.equal(semaphore.getStats("combo:")[comboKey].running, 2);
    assert.equal(semaphore.getStats("combo:")[comboKey].queued, 0);
    for (const key of keys) {
      assert.equal(admission.getStats()[key].running, 1);
      assert.equal(admission.getStats()[key].queued, 1);
    }
    releaseAdmission();
    const releaseSecond = await secondAdmission;
    for (const key of keys) assert.equal(admission.getStats()[key].queued, 0);
    releaseSecond();
  } finally {
    releaseCombo();
    secondCombo();
    releaseAdmission();
    (await secondAdmission)();
  }
});

test("cooldown is exposed without changing the gate's configured limit or counters", async () => {
  const key = "combo:cooling:target";
  const release = await semaphore.acquire(key, { maxConcurrency: 1 });
  semaphore.markRateLimited(key, 20);
  const snapshot = semaphore.getStats("combo:")[key];
  assert.equal(snapshot.max, 1);
  assert.equal(snapshot.running, 1);
  assert.equal(snapshot.queued, 0);
  assert.ok(Number.isFinite(Date.parse(snapshot.rateLimitedUntil!)));
  assert.deepEqual(semaphore.getStats("combo:")[key], snapshot);
  release();
});
