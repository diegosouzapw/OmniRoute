/**
 * tests/unit/combo/quota-share-concurrency.test.ts
 *
 * FASE 2.1: the per-connection concurrency slot for quota-share combos. These
 * tests pin the contract of acquireQuotaShareConcurrencySlot against the real
 * semaphore module: no limit when there is no cap, a stable connection-scoped
 * key, genuine serialization (a second request WAITS until the first releases),
 * and fail-open behavior when the queue is saturated.
 */

import test from "node:test";
import assert from "node:assert/strict";
import * as semaphore from "../../../open-sse/services/rateLimitSemaphore.ts";
import {
  quotaShareConcurrencyKey,
  acquireQuotaShareConcurrencySlot,
} from "../../../open-sse/services/combo/quotaShareConcurrency.ts";

const noopLog = { warn: () => {} };

function target(connectionId: string) {
  return {
    connectionId,
    modelStr: "p/m",
    executionKey: "p/m",
    provider: "p",
    stepId: "s",
    label: "p/m",
  } as never;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("quotaShareConcurrencyKey is stable and connection-scoped", () => {
  assert.equal(quotaShareConcurrencyKey("abc"), "qsconn:abc");
  assert.equal(quotaShareConcurrencyKey("abc"), quotaShareConcurrencyKey("abc"));
  assert.notEqual(quotaShareConcurrencyKey("a"), quotaShareConcurrencyKey("b"));
});

test("no slot when cap is null (no per-connection limit → unchanged behavior)", async () => {
  semaphore.resetAll();
  const release = await acquireQuotaShareConcurrencySlot(
    target("c1"),
    null,
    { queueTimeoutMs: 50, maxQueueSize: 10 },
    noopLog
  );
  assert.equal(release, null);
});

test("no slot when cap <= 0", async () => {
  semaphore.resetAll();
  assert.equal(
    await acquireQuotaShareConcurrencySlot(
      target("c1"),
      0,
      { queueTimeoutMs: 50, maxQueueSize: 10 },
      noopLog
    ),
    null
  );
});

test("no slot when connectionId is empty", async () => {
  semaphore.resetAll();
  const release = await acquireQuotaShareConcurrencySlot(
    target(""),
    1,
    { queueTimeoutMs: 50, maxQueueSize: 10 },
    noopLog
  );
  assert.equal(release, null);
});

test("acquires a slot when a positive cap is set", async () => {
  semaphore.resetAll();
  const release = await acquireQuotaShareConcurrencySlot(
    target("c1"),
    1,
    { queueTimeoutMs: 50, maxQueueSize: 10 },
    noopLog
  );
  assert.equal(typeof release, "function");
  release!();
});

test("cap=1 serializes: a second concurrent request WAITS until the first releases", async () => {
  semaphore.resetAll();
  const opts = { queueTimeoutMs: 1000, maxQueueSize: 10 };
  const r1 = await acquireQuotaShareConcurrencySlot(target("c1"), 1, opts, noopLog);
  assert.equal(typeof r1, "function", "first request acquires the only slot");

  let secondResolved = false;
  const p2 = acquireQuotaShareConcurrencySlot(target("c1"), 1, opts, noopLog).then((r) => {
    secondResolved = true;
    return r;
  });

  await wait(60);
  assert.equal(
    secondResolved,
    false,
    "second request is still queued while the first holds the slot"
  );

  r1!(); // release the first
  const r2 = await p2;
  assert.equal(secondResolved, true, "second request resolves only after the first releases");
  assert.equal(typeof r2, "function", "second request then acquires the freed slot");
  r2!();
});

test("fail-open: a saturated queue proceeds without a slot (null), never blocks", async () => {
  semaphore.resetAll();
  const opts = { queueTimeoutMs: 1000, maxQueueSize: 0 };
  const r1 = await acquireQuotaShareConcurrencySlot(target("c1"), 1, opts, noopLog);
  assert.equal(typeof r1, "function", "first request acquires");
  const r2 = await acquireQuotaShareConcurrencySlot(target("c1"), 1, opts, noopLog);
  assert.equal(r2, null, "queue full → fail-open null (availability never worsened)");
  r1!();
});

test("different connections have independent gates (no cross-contention)", async () => {
  semaphore.resetAll();
  const opts = { queueTimeoutMs: 50, maxQueueSize: 0 };
  const r1 = await acquireQuotaShareConcurrencySlot(target("c1"), 1, opts, noopLog);
  const r2 = await acquireQuotaShareConcurrencySlot(target("c2"), 1, opts, noopLog);
  assert.equal(typeof r1, "function");
  assert.equal(typeof r2, "function", "a different connection has its own slot");
  r1!();
  r2!();
});
