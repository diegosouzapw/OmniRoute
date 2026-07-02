import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import {
  acquire,
  buildAccountSemaphoreKey,
  getStats,
  markBlocked,
  reset,
  resetAll,
} from "../../open-sse/services/accountSemaphore";

afterEach(() => {
  resetAll();
});

describe("accountSemaphore", async () => {
  it("queues requests beyond the account cap and drains on release", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      accountKey: "acct-1",
    });

    const releaseA = await acquire(key, { maxConcurrency: 2, timeoutMs: 200 });
    const releaseB = await acquire(key, { maxConcurrency: 2, timeoutMs: 200 });
    const queued = acquire(key, { maxConcurrency: 2, timeoutMs: 200 });

    await new Promise((resolve) => setTimeout(resolve, 10));

    assert.deepEqual(getStats()[key], {
      running: 2,
      queued: 1,
      maxConcurrency: 2,
      blockedUntil: null,
    });

    releaseA();
    const releaseC = await queued;

    assert.deepEqual(getStats()[key], {
      running: 2,
      queued: 0,
      maxConcurrency: 2,
      blockedUntil: null,
    });

    releaseA();
    releaseB();
    releaseC();

    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.equal(getStats()[key], undefined);
  });

  it("returns a no-op release when concurrency is bypassed", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      accountKey: "acct-bypass",
    });

    const release = await acquire(key, { maxConcurrency: 0, timeoutMs: 50 });

    assert.deepEqual(getStats(), {});

    release();

    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.equal(getStats()[key], undefined);
  });

  it("uses SEMAPHORE_TIMEOUT for timed out queued requests", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      accountKey: "acct-timeout",
    });

    const releaseA = await acquire(key, { maxConcurrency: 1, timeoutMs: 200 });
    const queued = acquire(key, { maxConcurrency: 1, timeoutMs: 200 });
    const keepAlive = setTimeout(() => {}, 250);

    try {
      await queued;
      assert.fail("Expected timeout error");
    } catch (err: unknown) {
      assert.ok(err instanceof Error);
      const error = err as Error & { code?: string };
      assert.equal(error.code, "SEMAPHORE_TIMEOUT");
    } finally {
      clearTimeout(keepAlive);
    }

    releaseA();

    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.equal(getStats()[key], undefined);
  });

  it("keeps release idempotent for finally blocks", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      accountKey: "acct-idempotent",
    });

    const releaseA = await acquire(key, { maxConcurrency: 1, timeoutMs: 200 });

    // Simulate a finally block calling release twice
    releaseA();
    releaseA();
    releaseA();

    // The second acquire should succeed immediately (slot was released)
    const releaseB = await acquire(key, { maxConcurrency: 1, timeoutMs: 200 });

    assert.deepEqual(getStats()[key], {
      running: 1,
      queued: 0,
      maxConcurrency: 1,
      blockedUntil: null,
    });

    releaseB();

    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.equal(getStats()[key], undefined);
  });

  it("supports temporary blocking and explicit reset hooks", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      accountKey: "acct-blocked",
    });

    await acquire(key, { maxConcurrency: 1, timeoutMs: 200 });

    assert.deepEqual(getStats()[key], {
      running: 1,
      queued: 0,
      maxConcurrency: 1,
      blockedUntil: null,
    });

    markBlocked(key, 50);

    // Should block even though slot is available
    const acquired = acquire(key, { maxConcurrency: 1, timeoutMs: 100 });

    await new Promise((resolve) => setTimeout(resolve, 30));

    // Should still be queued because the gate is blocked
    const stats = getStats()[key];
    assert.equal(stats.running, 1);
    assert.equal(stats.queued, 1);
    assert.equal(stats.maxConcurrency, 1);
    assert.ok(stats.blockedUntil !== null, "blockedUntil should be set");

    reset(key);

    await assert.rejects(async () => {
      await acquired;
    });
  });

  it("preserves existing maxConcurrency when markBlocked is applied", async () => {
    const key = buildAccountSemaphoreKey({
      provider: "alibaba",
      accountKey: "acct-preserve",
    });

    await acquire(key, { maxConcurrency: 2, timeoutMs: 200 });
    markBlocked(key, 50);

    const stats = getStats()[key];
    assert.equal(stats.running, 1);
    assert.equal(stats.queued, 0);
    assert.equal(stats.maxConcurrency, 2);
    assert.ok(stats.blockedUntil !== null, "blockedUntil should be set");
  });
});
