/**
 * Regression guard for #12812: idle eviction must terminate the worker thread.
 *
 * Root cause: finish() scheduled `remove(slot, false)`, so the idle timer dropped the slot
 * from the pool WITHOUT calling worker.terminate(). The OS thread, its MessagePort and its
 * private heap then survived for the whole process lifetime. Nothing in
 * process.memoryUsage() reports that, which is why a 16h instance showed rss=660MB while
 * holding 5.7GB of commit charge.
 *
 * The assertion measures the real thing: a worker that was evicted must no longer be able
 * to run code. A live-but-unreferenced thread still responds; a terminated one cannot.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Worker } from "node:worker_threads";
import { CompressionWorkerPool } from "../../../open-sse/services/compression/compressionWorkerPool.ts";

const body = {
  model: "gpt-test",
  messages: [{ role: "user", content: "please kindly actually simplify this text ".repeat(40) }],
};

/** Reach into the pool's private slot set — the leak is only observable there. */
function slotsOf(pool: CompressionWorkerPool): Set<{ worker: Worker }> {
  return (pool as unknown as { workers: Set<{ worker: Worker }> }).workers;
}

describe("compression worker pool idle eviction (#12812)", () => {
  it("terminates the worker thread when the idle timer fires", async () => {
    // Idle window short enough to fire during the test.
    const pool = new CompressionWorkerPool({ size: 1, idleMs: 50 });

    await pool.run(body, "stacked", undefined, undefined);

    const slots = [...slotsOf(pool)];
    assert.equal(slots.length, 1, "one worker should have been spawned");
    const { worker } = slots[0];

    // The observable difference between 'evicted' and 'terminated' is the exit event:
    // a leaked thread stays alive and never emits it. Arm the listener BEFORE the idle
    // window so we cannot miss the event.
    const exited = new Promise<boolean>((resolve) => {
      worker.once("exit", () => resolve(true));
      setTimeout(() => resolve(false), 3_000).unref?.();
    });

    await new Promise((r) => setTimeout(r, 400));
    assert.equal(slotsOf(pool).size, 0, "slot should be evicted from the pool");

    assert.equal(
      await exited,
      true,
      "idle eviction must terminate the thread, not just drop the reference (#12812)"
    );

    await pool.close();
  });

  it("close() terminates every pooled worker", async () => {
    const pool = new CompressionWorkerPool({ size: 2, idleMs: 60_000 });
    await Promise.all([
      pool.run(body, "stacked", undefined, undefined),
      pool.run(body, "stacked", undefined, undefined),
    ]);
    assert.ok(slotsOf(pool).size >= 1, "pool should hold workers before close");
    await pool.close();
    assert.equal(slotsOf(pool).size, 0, "close() must drain the pool");
  });
});
