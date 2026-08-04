import test from "node:test";
import assert from "node:assert/strict";

// Unit tests for the circuit breaker + refreshWithRetry leaf extracted from
// tokenRefresh.ts. refreshWithRetry wraps a refresh attempt with exponential
// backoff, a 30s per-attempt timeout, and a per-provider circuit breaker
// (5 consecutive failures → 30min pause). Unrecoverable refresh errors
// short-circuit retries.

const { isProviderBlocked, getCircuitBreakerStatus, refreshWithRetry } =
  await import("../../open-sse/services/tokenRefresh/circuitBreaker.ts");

const silentLog = {
  info() {},
  warn() {},
  error() {},
  debug() {},
};

function makeLog() {
  const entries = [];
  const log = (level) => (scope, message) => entries.push({ level, scope, message });
  return {
    entries,
    debug: log("debug"),
    info: log("info"),
    warn: log("warn"),
    error: log("error"),
  };
}

test("isProviderBlocked returns false for an unknown provider", () => {
  assert.equal(isProviderBlocked("never-seen"), false);
});

test("getCircuitBreakerStatus returns an empty object when no failures recorded", () => {
  assert.deepEqual(getCircuitBreakerStatus(), {});
});

test("refreshWithRetry returns the result on the first success and clears prior failures", async () => {
  const provider = "cb-success-" + Math.random().toString(36).slice(2);
  // Seed a failure so we can verify success clears it.
  await refreshWithRetry(async () => null, 1, silentLog, provider);
  assert.equal(getCircuitBreakerStatus()[provider].failures, 1);

  const result = await refreshWithRetry(
    async () => ({ accessToken: "ok" }),
    3,
    silentLog,
    provider
  );
  assert.equal(result.accessToken, "ok");
  assert.equal(getCircuitBreakerStatus()[provider], undefined, "success resets the breaker");
});

test("refreshWithRetry retries to success within maxRetries", async () => {
  const provider = "cb-retry-" + Math.random().toString(36).slice(2);
  let attempts = 0;
  const result = await refreshWithRetry(
    async () => {
      attempts++;
      if (attempts < 2) return null;
      return { accessToken: "ok-after-retry" };
    },
    3,
    silentLog,
    provider
  );
  assert.equal(result.accessToken, "ok-after-retry");
  assert.equal(attempts, 2);
  assert.equal(getCircuitBreakerStatus()[provider], undefined);
});

test("refreshWithRetry bails immediately on an unrecoverable error without retrying", async () => {
  const provider = "cb-unrecoverable-" + Math.random().toString(36).slice(2);
  let attempts = 0;
  const result = await refreshWithRetry(
    async () => {
      attempts++;
      return { error: "invalid_grant" };
    },
    3,
    silentLog,
    provider
  );
  assert.equal(attempts, 1, "unrecoverable errors must not be retried");
  assert.equal(result.error, "invalid_grant");
  assert.equal(
    getCircuitBreakerStatus()[provider],
    undefined,
    "no failure recorded for unrecoverable"
  );
});

test("refreshWithRetry bails immediately on refresh_token_reused", async () => {
  const provider = "cb-reused-" + Math.random().toString(36).slice(2);
  let attempts = 0;
  const result = await refreshWithRetry(
    async () => {
      attempts++;
      return { error: "refresh_token_reused" };
    },
    3,
    silentLog,
    provider
  );
  assert.equal(attempts, 1);
  assert.equal(result.error, "refresh_token_reused");
});

test("refreshWithRetry trips the circuit breaker after repeated failures", async () => {
  const provider = "cb-trip-" + Math.random().toString(36).slice(2);
  // 5 consecutive single-retry failures trip the breaker.
  for (let i = 0; i < 5; i++) {
    await refreshWithRetry(async () => null, 1, silentLog, provider);
  }
  assert.equal(isProviderBlocked(provider), true);
  assert.equal(getCircuitBreakerStatus()[provider].blocked, true);
  assert.ok(getCircuitBreakerStatus()[provider].blockedUntil);

  // A blocked provider short-circuits without calling refreshFn.
  let called = false;
  const blocked = await refreshWithRetry(
    async () => {
      called = true;
      return { accessToken: "x" };
    },
    1,
    silentLog,
    provider
  );
  assert.equal(called, false, "refreshFn must not run while the breaker is open");
  assert.equal(blocked, null);
});

test("refreshWithRetry records a failure when all retries are exhausted", async () => {
  const provider = "cb-exhaust-" + Math.random().toString(36).slice(2);
  const log = makeLog();
  const result = await refreshWithRetry(async () => null, 2, log, provider);
  assert.equal(result, null);
  assert.equal(getCircuitBreakerStatus()[provider].failures, 1);
  assert.ok(
    log.entries.some((e) => e.level === "error" && /All 2 retry attempts failed/.test(e.message))
  );
});

test("refreshWithRetry propagates thrown errors as retry failures (not crashes)", async () => {
  const provider = "cb-throw-" + Math.random().toString(36).slice(2);
  const log = makeLog();
  let attempts = 0;
  const result = await refreshWithRetry(
    async () => {
      attempts++;
      throw new Error("upstream boom");
    },
    2,
    log,
    provider
  );
  assert.equal(result, null);
  assert.equal(attempts, 2, "thrown errors are retried, not fatal");
  assert.equal(getCircuitBreakerStatus()[provider].failures, 1);
  assert.ok(log.entries.some((e) => e.level === "warn" && /failed: upstream boom/.test(e.message)));
});

test("refreshWithRetry defaults: maxRetries=3, provider='unknown'", async () => {
  // With defaults, an always-null refresh exhausts 3 attempts and records a
  // failure under the "unknown" provider.
  let attempts = 0;
  await refreshWithRetry(async () => {
    attempts++;
    return null;
  });
  assert.equal(attempts, 3);
  assert.ok(getCircuitBreakerStatus()["unknown"], "default provider is 'unknown'");
});
