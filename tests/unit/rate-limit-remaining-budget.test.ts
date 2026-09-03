import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import {
  withRateLimit,
  __resetRateLimitManagerForTests,
  __getLimiterStateForTests,
  enableRateLimitProtection,
} from "../../open-sse/services/rateLimitManager.ts";
import {
  awaitProviderDefaultSlot,
  acquireProviderDefaultSlot,
  __setProviderDefaultRateLimitsForTests,
} from "../../open-sse/services/providerDefaultRateLimit.ts";
import {
  getTrustedLocalRateLimitError,
  LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE,
} from "../../open-sse/services/rateLimitManager/errors.ts";

describe("remaining budget shared across gate+slot+queue", () => {
  beforeEach(async () => {
    await __resetRateLimitManagerForTests();
    __setProviderDefaultRateLimitsForTests(null);
  });
  afterEach(async () => {
    await __resetRateLimitManagerForTests();
    __setProviderDefaultRateLimitsForTests(null);
  });

  it("remaining budget is enforced via withRateLimit (gate budget shared to queue)", async () => {
    // withRateLimit must honor remainingBudgetMs (per-connection queueBudgetMs minus elapsed).
    // Before: remaining was ignored and fn ran even when budget was exhausted.
    // After: remaining is the budget shared across gate+slot+queue.
    const conn = "test-remaining-1";
    enableRateLimitProtection(conn);
    // Use a provider without a default slot (openai) to isolate the queue guard.
    // A call with remaining 0 must throw LEGACY 503 without enqueuing.
    await assert.rejects(
      () => withRateLimit("openai", conn, "gpt-4", async () => "should-not-run", null, 0),
      (err: unknown) => {
        const trusted = getTrustedLocalRateLimitError(err);
        assert.equal(trusted?.code, LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE);
        assert.equal(trusted?.status, 503);
        return true;
      }
    );
    const state = await __getLimiterStateForTests("openai", conn, "gpt-4");
    if (state) assert.equal(state.queued, 0, "remaining<=0 must not enqueue");
  });

  it("remaining<=0 does not enqueue — no QUEUED increment, no timer", async () => {
    const conn = "test-remaining-2";
    enableRateLimitProtection(conn);
    // withRateLimit(..., remaining=0) must throw LEGACY 503 without limiter.schedule
    let fnCalled = false;
    await assert.rejects(
      () =>
        withRateLimit(
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
        return trusted?.code === LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE;
      }
    );
    assert.equal(fnCalled, false, "fn must not be called when remaining<=0");
    const state = await __getLimiterStateForTests("openai", conn, "gpt-4");
    if (state) assert.equal(state.queued, 0);
  });

  it("awaitProviderDefaultSlot fail-closed throws 503 instead of letting request through", async () => {
    // Use a short test window to keep the test fast.
    const provider = "budget-test-provider";
    const conn = "conn-budget";
    __setProviderDefaultRateLimitsForTests({ [provider]: { requests: 1, windowMs: 500 } });
    try {
      // Saturate the window - first request consumes the slot.
      const first = acquireProviderDefaultSlot(provider, conn);
      assert.equal(first, 0, "1st slot should be allowed");
      const start = Date.now();
      await assert.rejects(
        () => awaitProviderDefaultSlot(provider, conn, null, 100),
        (err: unknown) => {
          const trusted = getTrustedLocalRateLimitError(err);
          assert.equal(trusted?.code, LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE);
          assert.equal(trusted?.status, 503);
          return true;
        }
      );
      const elapsed = Date.now() - start;
      // Must fail-closed after ~100ms, not let it through after 500ms.
      assert.ok(elapsed < 400, `must fail-closed within 100ms budget, elapsed=${elapsed}ms`);
      assert.ok(elapsed >= 80, `must have waited close to budget, elapsed=${elapsed}ms`);
    } finally {
      __setProviderDefaultRateLimitsForTests(null);
    }
  });

  it("withRateLimit compat — no remaining falls back to queueBudgetMs (no regression)", async () => {
    const conn = "test-compat";
    enableRateLimitProtection(conn);
    const result = await withRateLimit("openai", conn, "gpt-4", async () => "ok-compat");
    assert.equal(result, "ok-compat");
    // also with a signal but no remaining
    const ac = new AbortController();
    const result2 = await withRateLimit("openai", conn, "gpt-4", async () => "ok2", ac.signal);
    assert.equal(result2, "ok2");
  });

  it("providerDefaultSlot guard remaining<=0 throws immediate 503", async () => {
    const provider = "budget-test-provider2";
    __setProviderDefaultRateLimitsForTests({ [provider]: { requests: 1, windowMs: 60000 } });
    try {
      await assert.rejects(
        () => awaitProviderDefaultSlot(provider, "any-conn", null, 0),
        (err: unknown) => {
          const t = getTrustedLocalRateLimitError(err);
          return t?.code === LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE && t?.status === 503;
        }
      );
      await assert.rejects(
        () => awaitProviderDefaultSlot(provider, "any-conn", null, -5),
        (err: unknown) =>
          getTrustedLocalRateLimitError(err)?.code === LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE
      );
    } finally {
      __setProviderDefaultRateLimitsForTests(null);
    }
  });
});
