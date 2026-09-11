import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import * as rateLimitManager from "../../open-sse/services/rateLimitManager.ts";
import {
  getTrustedLocalRateLimitError,
  LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE,
} from "../../open-sse/services/rateLimitManager/errors.ts";
import { __setProviderDefaultRateLimitsForTests } from "../../open-sse/services/providerDefaultRateLimit.ts";

describe("queue wait bound - anti-orphan", () => {
  beforeEach(async () => {
    await rateLimitManager.__resetRateLimitManagerForTests();
    __setProviderDefaultRateLimitsForTests(null);
  });

  afterEach(async () => {
    await rateLimitManager.__resetRateLimitManagerForTests();
    __setProviderDefaultRateLimitsForTests(null);
  });

  it("queue wait bound - timeout before dispatch (<80ms not 200ms)", async () => {
    // Force a single concurrency slot so the second request queues behind the first.
    // Using a per-connection override isolates the fixture from other tests.
    const conn = "queue-bound-conn";
    rateLimitManager.enableRateLimitProtection(conn);
    rateLimitManager.refreshConnectionRateLimits(conn, { maxConcurrent: 1 });

    // First request occupies the only slot for 200ms.
    const p1 = rateLimitManager.withRateLimit(
      "openai",
      conn,
      "gpt-4",
      () => new Promise<string>((resolve) => setTimeout(() => resolve("ok"), 200)),
      null,
      1000
    );

    // Let p1 acquire the slot.
    await new Promise((r) => setTimeout(r, 15));

    // Second request targets the same limiter (same provider/connection/model)
    // with a tiny remaining budget (30ms). It should fail with queue timeout
    // quickly, not wait ~200ms for p1 to finish.
    let fnCalled = false;
    const start = Date.now();
    await assert.rejects(
      () =>
        rateLimitManager.withRateLimit(
          "openai",
          conn,
          "gpt-4",
          () => {
            fnCalled = true;
            return Promise.resolve("second");
          },
          null,
          30
        ),
      (err: unknown) => {
        const trusted = getTrustedLocalRateLimitError(err);
        assert.equal(trusted?.code, LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE);
        assert.equal(trusted?.status, 503);
        return true;
      }
    );
    const elapsed = Date.now() - start;
    assert.ok(
      elapsed < 80,
      `queue timeout should win quickly, elapsed=${elapsed}ms (expected <80ms)`
    );
    assert.ok(elapsed >= 15, `should have waited close to budget, elapsed=${elapsed}ms`);
    assert.equal(fnCalled, false, "queued function must not run after timeout");

    // Drain p1 to let Bottleneck dispatch and then reject the timed-out job.
    await p1.catch(() => {});
    // Bottleneck moves the queued job to EXECUTING only after a slot frees,
    // so wait briefly for the anti-orphan wrappedFn to reject.
    await new Promise((r) => setTimeout(r, 30));

    const stateAfter = await rateLimitManager.__getLimiterStateForTests("openai", conn, "gpt-4");
    if (stateAfter) assert.equal(stateAfter.queued, 0, "no orphan QUEUED after queue timeout");

    // Give the orphaned scheduled promise a chance to settle before next test.
    await new Promise((r) => setTimeout(r, 10));
  });

  it("remaining budget zero does not schedule work", async () => {
    const conn = "queue-remaining-zero";
    rateLimitManager.enableRateLimitProtection(conn);

    let fnCalled = false;
    await assert.rejects(
      () =>
        rateLimitManager.withRateLimit(
          "openai",
          conn,
          "gpt-4",
          async () => {
            fnCalled = true;
            return "ok";
          },
          null,
          0
        ),
      (err: unknown) => {
        const trusted = getTrustedLocalRateLimitError(err);
        return trusted?.code === LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE && trusted?.status === 503;
      }
    );
    assert.equal(fnCalled, false, "function must not be called when remaining is 0");
    const state = await rateLimitManager.__getLimiterStateForTests("openai", conn, "gpt-4");
    if (state) assert.equal(state.queued, 0);
  });

  it("abort and queue timeout are distinguished", async () => {
    const conn = "queue-abort-distinct";
    rateLimitManager.enableRateLimitProtection(conn);
    rateLimitManager.refreshConnectionRateLimits(conn, { maxConcurrent: 1 });

    // Occupy the slot so the abort-tracked request actually queues.
    const p1 = rateLimitManager.withRateLimit(
      "openai",
      conn,
      "gpt-4",
      () => new Promise<string>((r) => setTimeout(() => r("hold"), 300)),
      null,
      1000
    );
    await new Promise((r) => setTimeout(r, 10));

    const ac = new AbortController();
    setTimeout(() => ac.abort(), 15);

    await assert.rejects(
      () =>
        rateLimitManager.withRateLimit(
          "openai",
          conn,
          "gpt-4",
          () => new Promise(() => {}),
          ac.signal,
          1000
        ),
      (err: unknown) => {
        assert.equal((err as Error).name, "AbortError");
        // Abort must not be branded as a local queue timeout.
        const trusted = getTrustedLocalRateLimitError(err);
        assert.equal(trusted, null, "AbortError must not be branded as queue timeout");
        return true;
      }
    );

    await p1.catch(() => {});
  });

  it("negative remaining budget is rejected without enqueuing", async () => {
    const conn = "queue-negative-remaining";
    rateLimitManager.enableRateLimitProtection(conn);

    let fnCalled = false;
    await assert.rejects(
      () =>
        rateLimitManager.withRateLimit(
          "openai",
          conn,
          "gpt-4",
          async () => {
            fnCalled = true;
            return 1;
          },
          null,
          -5
        ),
      (err: unknown) =>
        getTrustedLocalRateLimitError(err)?.code === LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE
    );
    assert.equal(fnCalled, false);
  });
});
