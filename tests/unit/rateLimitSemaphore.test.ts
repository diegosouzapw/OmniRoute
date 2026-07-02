/**
 * Issue #3872 — round-robin combos deep-queued a saturated member (the per-model
 * rate-limit semaphore had an UNBOUNDED queue and only ever emitted SEMAPHORE_TIMEOUT
 * after the full queueTimeoutMs), so failover to the next combo member happened far too
 * late (or the client died first). The fix bounds the queue with a configurable depth
 * and emits SEMAPHORE_QUEUE_FULL once the queue is full — the round-robin loop already
 * cascades to the next member on that code — so low depths fail over immediately.
 */
import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  acquire,
  getStats,
  resetAll,
} from "../../open-sse/services/rateLimitSemaphore.ts";

afterEach(() => {
  resetAll();
});

describe("rateLimitSemaphore queue depth (#3872)", () => {
  it("queues unbounded when maxQueueSize is omitted (backward-compatible default)", async () => {
    const model = "minimax/abab6.5";

    const releaseA = await acquire(model, { maxConcurrency: 1, timeoutMs: 500 });
    // Three more pile into the queue — none rejected, because no cap was requested.
    // Swallow the reset-rejection these emit when the gate is torn down below.
    const queued = [
      acquire(model, { maxConcurrency: 1, timeoutMs: 500 }).catch(() => {}),
      acquire(model, { maxConcurrency: 1, timeoutMs: 500 }).catch(() => {}),
      acquire(model, { maxConcurrency: 1, timeoutMs: 500 }).catch(() => {}),
    ];

    await new Promise((resolve) => setTimeout(resolve, 10));

    const stats = getStats()[model];
    assert.equal(stats.running, 1);
    assert.equal(stats.queued, 3);

    releaseA();
    resetAll();
    await Promise.all(queued);
  });

  it("rejects with SEMAPHORE_QUEUE_FULL once the bounded queue is full", async () => {
    const model = "minimax/abab6.5";

    // Slot taken; queue capacity is 1.
    const releaseA = await acquire(model, { maxConcurrency: 1, timeoutMs: 500, maxQueueSize: 1 });

    // First waiter fits in the single queue slot.
    const queued = acquire(model, { maxConcurrency: 1, timeoutMs: 500, maxQueueSize: 1 });
    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.equal(getStats()[model].queued, 1);

    // Second waiter overflows the queue → immediate SEMAPHORE_QUEUE_FULL (no 30s wait).
    await assert.rejects(
      acquire(model, { maxConcurrency: 1, timeoutMs: 500, maxQueueSize: 1 }),
      (err: unknown) => {
        assert.ok(err instanceof Error);
        assert.equal((err as Error & { code?: string }).code, "SEMAPHORE_QUEUE_FULL");
        return true;
      }
    );

    releaseA();
    await queued.then((release) => release());
    resetAll();
  });

  it("fails over immediately with maxQueueSize 0 (never queue → cascade now)", async () => {
    const model = "minimax/abab6.5";

    const releaseA = await acquire(model, { maxConcurrency: 1, timeoutMs: 500, maxQueueSize: 0 });

    // No queue allowed: the very next over-cap acquire rejects right away.
    await assert.rejects(
      acquire(model, { maxConcurrency: 1, timeoutMs: 500, maxQueueSize: 0 }),
      (err: unknown) => {
        assert.ok(err instanceof Error);
        assert.equal((err as Error & { code?: string }).code, "SEMAPHORE_QUEUE_FULL");
        return true;
      }
    );

    assert.equal(getStats()[model].queued, 0);

    releaseA();
    resetAll();
  });
});
