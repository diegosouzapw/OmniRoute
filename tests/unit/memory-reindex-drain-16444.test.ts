import test from "node:test";
import assert from "node:assert/strict";
import {
  createReindexDrainController,
  drainPendingReindex,
} from "../../src/lib/memory/reindexDrain.ts";

test("#16444 drains the entire queue instead of exactly one batch", async () => {
  let pending = 245;
  const sizes: number[] = [];
  const result = await drainPendingReindex({
    getPending: () => pending,
    runBatch: async (size) => {
      sizes.push(size);
      const processed = Math.min(pending, size);
      pending -= processed;
      return { processed, errors: 0 };
    },
  });
  assert.deepEqual(sizes, [100, 100, 100]);
  assert.deepEqual(result, {
    batches: 3,
    processed: 245,
    errors: 0,
    pending: 0,
    reason: "drained",
  });
});

test("#16444 stops on failed embeddings rather than spinning on the same records", async () => {
  let calls = 0;
  const result = await drainPendingReindex({
    getPending: () => 123,
    runBatch: async () => {
      calls += 1;
      return { processed: 0, errors: 100 };
    },
  });
  assert.equal(calls, 1);
  assert.deepEqual(result, {
    batches: 1,
    processed: 0,
    errors: 100,
    pending: 123,
    reason: "no-progress",
  });
});

test("#16444 continues after partial success and stops when only failed rows remain", async () => {
  let pending = 103;
  let calls = 0;
  const result = await drainPendingReindex({
    getPending: () => pending,
    runBatch: async () => {
      calls++;
      const processed = calls === 1 ? 99 : calls === 2 ? 3 : 0;
      pending -= processed;
      return { processed, errors: 1 };
    },
  });
  assert.equal(calls, 3);
  assert.deepEqual(result, {
    batches: 3,
    processed: 102,
    errors: 3,
    pending: 1,
    reason: "no-progress",
  });
});

test("#16444 caps work per invocation for an ever-growing queue", async () => {
  let pending = 10_000;
  const result = await drainPendingReindex({
    getPending: () => pending,
    runBatch: async () => {
      pending -= 100;
      return { processed: 100, errors: 0 };
    },
  }, { maxBatches: 2 });
  assert.deepEqual(result, {
    batches: 2,
    processed: 200,
    errors: 0,
    pending: 9_800,
    reason: "batch-limit",
  });
});

test("#16444 repeated reindex requests share one background drain, then unlock", async () => {
  let schedule!: () => void;
  let pending = 101;
  let calls = 0;
  const completed: string[] = [];
  const controller = createReindexDrainController({
    getPending: () => pending,
    runBatch: async (size) => {
      calls++;
      const processed = Math.min(size, pending);
      pending -= processed;
      return { processed, errors: 0 };
    },
    schedule: (callback) => { schedule = callback; },
    onComplete: (result) => completed.push(result.reason),
  });
  assert.equal(controller.start(), true);
  assert.equal(controller.start(), false);
  assert.equal(controller.isRunning(), true);
  assert.equal(calls, 0);
  schedule();
  assert.equal((await controller.waitForIdle())?.reason, "drained");
  assert.equal(controller.isRunning(), false);
  assert.equal(calls, 2);
  assert.deepEqual(completed, ["drained"]);
  assert.equal(controller.start(), true);
  schedule();
  assert.equal((await controller.waitForIdle())?.batches, 0);
  assert.equal(calls, 2);
});

test("#16444 background failures are reported and do not leave a permanent lock", async () => {
  let schedule!: () => void;
  let fail = true;
  let reported = 0;
  const controller = createReindexDrainController({
    getPending: () => 1,
    runBatch: async () => {
      if (fail) throw new Error("upstream unavailable");
      return { processed: 0, errors: 1 };
    },
    schedule: (callback) => { schedule = callback; },
    onError: () => { reported++; },
  });
  assert.equal(controller.start(), true);
  schedule();
  await assert.rejects(controller.waitForIdle(), /upstream unavailable/);
  assert.equal(controller.isRunning(), false);
  assert.equal(reported, 1);
  fail = false;
  assert.equal(controller.start(), true);
  schedule();
  assert.equal((await controller.waitForIdle())?.reason, "no-progress");
});

test("#16444 invalid batch parameters fail before embedding", async () => {
  let calls = 0;
  const deps = {
    getPending: () => 1,
    runBatch: async () => {
      calls++;
      return { processed: 1, errors: 0 };
    },
  };
  await assert.rejects(drainPendingReindex(deps, { batchSize: 0 }), /batchSize/);
  await assert.rejects(drainPendingReindex(deps, { maxBatches: 0 }), /maxBatches/);
  assert.equal(calls, 0);
});

test("#16444 duplicate force requests must not reset the reindex queue", async () => {
  let schedule!: () => void;
  let forced = 0;
  let pending = 1;
  const controller = createReindexDrainController({
    getPending: () => pending,
    runBatch: async () => {
      pending = 0;
      return { processed: 1, errors: 0 };
    },
    schedule: (callback) => { schedule = callback; },
  });

  assert.equal(controller.start(() => { forced++; }), true);
  assert.equal(forced, 1);
  // A repeated POST force=true must not mark every memory as pending again
  // while a previous drain is already in flight.
  assert.equal(controller.start(() => { forced++; }), false);
  assert.equal(forced, 1);
  schedule();
  assert.equal((await controller.waitForIdle())?.reason, "drained");

  pending = 1;
  assert.equal(controller.start(() => { forced++; }), true);
  assert.equal(forced, 2);
  schedule();
  await controller.waitForIdle();
});

test("#16444 failed forced reindex initialization does not retain a worker lock", async () => {
  let schedule!: () => void;
  const controller = createReindexDrainController({
    getPending: () => 0,
    runBatch: async () => ({ processed: 0, errors: 0 }),
    schedule: (callback) => { schedule = callback; },
  });
  assert.throws(() => controller.start(() => {
    throw new Error("failed SQLite update");
  }), /failed SQLite update/);
  assert.equal(controller.isRunning(), false);

  assert.equal(controller.start(), true);
  schedule();
  assert.equal((await controller.waitForIdle())?.reason, "drained");
});
