import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import {
  acquire,
  acquireMany,
  buildAccountSemaphoreKey,
  getStats,
  markBlocked,
  reset,
  resetAll,
} from "../../../open-sse/services/accountSemaphore";

afterEach(() => {
  resetAll();
});

describe("accountSemaphore acquireMany", () => {
  it("atomically acquires every enabled gate and releases them once", async () => {
    const release = await acquireMany([
      { key: "global", maxConcurrency: 2 },
      { key: "provider:codex", maxConcurrency: 1 },
      { key: "account:codex:one", maxConcurrency: 1 },
      { key: "disabled", maxConcurrency: 0 },
    ]);

    assert.deepEqual(getStats(), {
      global: { running: 1, queued: 0, maxConcurrency: 2, blockedUntil: null },
      "provider:codex": { running: 1, queued: 0, maxConcurrency: 1, blockedUntil: null },
      "account:codex:one": { running: 1, queued: 0, maxConcurrency: 1, blockedUntil: null },
    });

    release();
    release();
    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.deepEqual(getStats(), {});
  });

  it("queues one atomic request without partially reserving free gates", async () => {
    const releaseProvider = await acquire("provider:codex", { maxConcurrency: 1 });
    const waiting = acquireMany(
      [
        { key: "global", maxConcurrency: 1 },
        { key: "provider:codex", maxConcurrency: 1 },
        { key: "account:codex:two", maxConcurrency: 1 },
      ],
      { timeoutMs: 200 }
    );
    await new Promise((resolve) => setTimeout(resolve, 10));

    assert.equal(getStats().global?.running ?? 0, 0);
    assert.equal(getStats()["account:codex:two"]?.running ?? 0, 0);
    assert.equal(getStats()["provider:codex"]?.queued, 1);

    releaseProvider();
    const release = await waiting;
    assert.equal(getStats().global?.running, 1);
    assert.equal(getStats()["provider:codex"]?.running, 1);
    assert.equal(getStats()["account:codex:two"]?.running, 1);
    release();
  });

  it("removes an atomic waiter from every gate on abort", async () => {
    const releaseGlobal = await acquire("global", { maxConcurrency: 1 });
    const controller = new AbortController();
    const waiting = acquireMany(
      [
        { key: "global", maxConcurrency: 1 },
        { key: "provider:codex", maxConcurrency: 1 },
      ],
      { signal: controller.signal, timeoutMs: 200 }
    );
    await new Promise((resolve) => setTimeout(resolve, 10));
    controller.abort();
    await assert.rejects(waiting, { name: "AbortError" });
    assert.equal(getStats().global?.queued, 0);
    assert.equal(getStats()["provider:codex"]?.queued ?? 0, 0);
    releaseGlobal();
  });

  it("times out an atomic waiter without leaking reservations", async () => {
    const releaseGlobal = await acquire("global", { maxConcurrency: 1 });
    await assert.rejects(
      acquireMany(
        [
          { key: "global", maxConcurrency: 1 },
          { key: "provider:codex", maxConcurrency: 1 },
        ],
        { timeoutMs: 10 }
      ),
      (error: Error & { code?: string }) => error.code === "SEMAPHORE_TIMEOUT"
    );
    assert.equal(getStats().global?.queued, 0);
    assert.equal(getStats()["provider:codex"]?.running ?? 0, 0);
    releaseGlobal();
  });

  it("rejects an atomic waiter when any required gate queue is full", async () => {
    const releaseGlobal = await acquire("global", { maxConcurrency: 1 });
    const queued = acquire("global", { maxConcurrency: 1, maxQueueSize: 1, timeoutMs: 200 });
    await new Promise((resolve) => setTimeout(resolve, 10));

    await assert.rejects(
      acquireMany(
        [
          { key: "global", maxConcurrency: 1 },
          { key: "provider:codex", maxConcurrency: 1 },
        ],
        { maxQueueSize: 1, timeoutMs: 200 }
      ),
      (error: Error & { code?: string }) => error.code === "SEMAPHORE_QUEUE_FULL"
    );
    assert.equal(getStats()["provider:codex"]?.queued ?? 0, 0);

    releaseGlobal();
    (await queued)();
  });
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
