/**
 * Regression tests for the switchAuth signal propagation fix.
 *
 * When Google returns a 429 with no parseable retry hint, decide429 classifies
 * it as short_cooldown_switch_auth. The executor must NOT sleep on the same
 * URL/account -- it should fall through to URL/account fallback immediately.
 *
 * Row table from WO3 section 2.1:
 *   parsed hint      decide429 kind               retryMs        guard behavior
 *   none (null)      short_cooldown_switch_auth   60_000 default skip sleep (THE FIX)
 *   "reset after 0s" soft_retry                   2_000 floor    sleep 2s
 *   <= 60s           soft_retry                   as parsed      sleep that
 *   60s .. 5min      soft_retry                   as parsed      over threshold, skip
 *   > 5min           short_cooldown_switch_auth   as parsed      over threshold, skip
 */

import test from "node:test";
import assert from "node:assert/strict";

import { classify429, decide429 } from "../../../open-sse/services/antigravity429Engine.ts";
import { AntigravityExecutor } from "../../../open-sse/executors/antigravity.ts";

// -- Helpers -----------------------------------------------------------------

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

function make429Response(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 429,
    headers: { "content-type": "application/json" },
  });
}

// Rate_limited body: "Too many requests" triggers classify429 -> rate_limited
const RATE_LIMITED_BODY = {
  error: {
    code: 429,
    message: "Too many requests",
    status: "RESOURCE_EXHAUSTED",
  },
};

function makeCtx(response: Response) {
  return {
    response,
    log: noopLog(),
    urlIndex: 0,
    retryAttemptsByUrl: { 0: 0 } as Record<number, number>,
    fallbackCount: 2,
    url: "https://example.com/test",
    headers: { "Content-Type": "application/json" },
    transformedBody: {},
    credentials: { accessToken: "test-token" },
    stream: true,
    signal: undefined as AbortSignal | undefined,
    finalHeaders: { "Content-Type": "application/json" },
    accountId: "test-account",
    creditsMode: "off" as const,
    creditsRetryState: { attempted: false },
  };
}

// -- Engine contract: decide429 returns correct kind -------------------------

test("Row 1: rate_limited with no hint -> short_cooldown_switch_auth, retryAfterMs=60000", () => {
  const decision = decide429("rate_limited", null);
  assert.equal(decision.kind, "short_cooldown_switch_auth");
  assert.equal(decision.retryAfterMs, 60_000);
});

test("Row 2: rate_limited with 0s hint -> soft_retry (floor at 2000ms)", () => {
  const decision = decide429("rate_limited", 2000);
  assert.equal(decision.kind, "soft_retry");
  assert.equal(decision.retryAfterMs, 2000);
});

test("Row 3: rate_limited with <=60s hint -> soft_retry", () => {
  const decision = decide429("rate_limited", 30_000);
  assert.equal(decision.kind, "soft_retry");
  assert.equal(decision.retryAfterMs, 30_000);
});

test("Row 4: rate_limited with 60s..5min hint -> soft_retry", () => {
  const decision = decide429("rate_limited", 240_000);
  assert.equal(decision.kind, "soft_retry");
  assert.equal(decision.retryAfterMs, 240_000);
});

test("Row 5: rate_limited with >5min hint -> short_cooldown_switch_auth", () => {
  const decision = decide429("rate_limited", 360_000);
  assert.equal(decision.kind, "short_cooldown_switch_auth");
  assert.equal(decision.retryAfterMs, 360_000);
});

// -- THE FIX: real production path via handleAntigravityRateLimit ------------

test("THE FIX: 429 rate_limited with no hint -> no sleep, falls through to fallback", async () => {
  const executor = new AntigravityExecutor();
  const response = make429Response(RATE_LIMITED_BODY);
  const ctx = makeCtx(response);

  const originalSetTimeout = globalThis.setTimeout;
  let setTimeoutCalled = false;
  // @ts-expect-error -- mock replacement for spy
  globalThis.setTimeout = (...args: unknown[]) => {
    setTimeoutCalled = true;
    return originalSetTimeout(...(args as [() => void, number]));
  };

  try {
    const result = await executor.handleAntigravityRateLimit(ctx);

    assert.equal(setTimeoutCalled, false, "must not sleep when switchAuth=true");
    assert.equal(result.action, "retryNextUrl", "must fall through to next URL");
  } finally {
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("Regression: 429 with 30s hint -> sleeps and retries same URL", async () => {
  const executor = new AntigravityExecutor();
  const response = make429Response({
    error: {
      code: 429,
      message: "Too many requests. Resets after 30s",
      status: "RESOURCE_EXHAUSTED",
    },
  });
  const ctx = makeCtx(response);

  const originalSetTimeout = globalThis.setTimeout;
  let sleepMs = 0;
  let setTimeoutCallCount = 0;
  // @ts-expect-error -- mock replacement for spy
  globalThis.setTimeout = (fn: () => void, ms?: number) => {
    setTimeoutCallCount++;
    sleepMs = ms ?? 0;
    return originalSetTimeout(fn, 0); // resolve immediately for test
  };

  try {
    const result = await executor.handleAntigravityRateLimit(ctx);

    assert.ok(setTimeoutCallCount > 0, `setTimeout must be called (was ${setTimeoutCallCount})`);
    assert.ok(sleepMs > 0, `must sleep for parsed retry hint (sleepMs=${sleepMs})`);
    assert.equal(result.action, "retrySameUrl", "must retry same URL");
  } finally {
    globalThis.setTimeout = originalSetTimeout;
  }
});

// -- classify429: rate_limited detection -------------------------------------

test("classify429: 'queries per minute limit was reached' -> rate_limited", () => {
  assert.equal(
    classify429("RESOURCE_EXHAUSTED: queries per minute limit was reached"),
    "rate_limited"
  );
});

test("classify429: 'too many requests' -> rate_limited", () => {
  assert.equal(classify429("Too many requests"), "rate_limited");
});

test("classify429: 'RPM' -> rate_limited", () => {
  assert.equal(classify429("RPM limit exceeded"), "rate_limited");
});
