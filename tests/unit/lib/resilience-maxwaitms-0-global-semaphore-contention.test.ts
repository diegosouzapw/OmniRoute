/**
 * #12902 mandatory item 3 — real-contention proof for maxWaitMs=0 (GLOBAL) against
 * the queue-wait gate #12715 introduced (open-sse/handlers/chatCore.ts calling
 * acquireMany({ timeoutMs: resilienceSettings.requestQueue.maxWaitMs }) from
 * open-sse/services/accountSemaphore.ts) — NOT the Bottleneck reservoir tested by
 * rate-limit-maxwaitms-disable-execution.test.ts.
 *
 * Finding: acquireMany() feeds timeoutMs straight into `setTimeout(reject, timeoutMs)`.
 * With timeoutMs=0, setTimeout fires on the very next tick, so a SECOND concurrent
 * request contending for an already-full gate (concurrentRequests/globalConcurrentRequests
 * etc. actually configured >0) gets rejected with SEMAPHORE_TIMEOUT almost immediately —
 * it does NOT reintroduce #12715's "unbounded queue hangs until the client aborts"
 * regression (confirmed below: the second acquire settles in low milliseconds, never
 * hangs). But it is also NOT the "no cap / wait as long as it takes" behavior the 0
 * sentinel implies elsewhere (normalize.ts's own comment, and the per-connection
 * override fallback in resolveRequestQueueMaxWaitMs) — with any concurrency gate
 * actually configured, maxWaitMs=0 makes the queue effectively INTOLERANT of any
 * contention at all, rejecting a request that only needed to wait a few ms for the
 * first job to finish. This asymmetry (0 means "no limit" in the Bottleneck reservoir
 * path, but "reject sub-millisecond contention immediately" in the semaphore path) is
 * the open question flagged in the plan-file — left for the owner/maintainer to decide
 * as a follow-up (not something this fix-agent pass can decide unilaterally).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { acquireMany, resetAll } from "../../../open-sse/services/accountSemaphore.ts";

test.afterEach(() => {
  resetAll();
});

test("maxWaitMs=0 as acquireMany timeoutMs does NOT hang — it rejects contended requests almost immediately (not #12715's unbounded queue)", async () => {
  const release1 = await acquireMany([{ key: "global-mwm0", maxConcurrency: 1 }], {
    timeoutMs: 0,
  });

  const start = Date.now();
  await assert.rejects(
    acquireMany([{ key: "global-mwm0", maxConcurrency: 1 }], { timeoutMs: 0 }),
    (err: Error & { code?: string }) => {
      assert.equal(err.code, "SEMAPHORE_TIMEOUT");
      return true;
    }
  );
  const elapsedMs = Date.now() - start;
  // Must settle near-instantly (never the multi-minute hang #12715 fixed).
  assert.ok(elapsedMs < 500, `expected near-instant rejection, took ${elapsedMs}ms`);

  release1();
});

test("maxWaitMs=0 rejects the second request even though the first releases moments later (0 != infinite wait for this gate)", async () => {
  const release1 = await acquireMany([{ key: "global-mwm0-b", maxConcurrency: 1 }], {
    timeoutMs: 0,
  });
  setTimeout(release1, 20);

  // A real operator setting maxWaitMs=0 to mean "no cap" would expect this second
  // request to eventually get the slot once release1() runs 20ms later. Instead it
  // is rejected before that ever happens, because timeoutMs=0 fires on the next tick.
  await assert.rejects(
    acquireMany([{ key: "global-mwm0-b", maxConcurrency: 1 }], { timeoutMs: 0 }),
    { code: "SEMAPHORE_TIMEOUT" }
  );
});
