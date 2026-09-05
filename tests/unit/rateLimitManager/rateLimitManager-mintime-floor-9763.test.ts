import test from "node:test";
import assert from "node:assert/strict";

const rlm = await import("../../../open-sse/services/rateLimitManager.ts");
const {
  enableRateLimitProtection,
  withRateLimit,
  updateFromHeaders,
  applyRequestQueueSettings,
  __setLimiterFactoryForTests,
  __resetRateLimitManagerForTests,
} = rlm;

test.beforeEach(async () => {
  await __resetRateLimitManagerForTests();
});

test("headroom relaxation respects operator minTimeBetweenRequestsMs floor (#9763)", async () => {
  // Apply an operator-configured minTime floor of 200ms
  await applyRequestQueueSettings({
    minTimeBetweenRequestsMs: 200,
    concurrentRequests: 0,
    requestsPerMinute: 0,
    maxWaitMs: 30000,
    autoEnableApiKeyProvider: false,
  });

  let capturedMinTime: number | undefined;

  // Inject a fake limiter whose updateSettings captures the minTime.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const noop = (): any => undefined;

  __setLimiterFactoryForTests(() => {
    const listeners: Record<string, Array<(...args: unknown[]) => void>> = {};
    const fake = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateSettings(updates: Record<string, any>) {
        capturedMinTime = typeof updates.minTime === "number" ? updates.minTime : undefined;
        return fake;
      },
      on(event: string, fn: (...args: unknown[]) => void) {
        (listeners[event] ??= []).push(fn);
        return fake;
      },
      schedule(arg0: unknown, arg1?: unknown) {
        const fn = typeof arg1 === "function" ? arg1 : typeof arg0 === "function" ? arg0 : noop;
        return fn();
      },
      disconnect() {
        return Promise.resolve();
      },
      chain() {
        return fake;
      },
      counts() {
        return { RECEIVED: 0, QUEUED: 0, RUNNING: 0, EXECUTING: 0 };
      },
      currentReservoir() {
        return Promise.resolve(null);
      },
      stop() {
        return Promise.resolve();
      },
    };
    return fake;
  });

  enableRateLimitProtection("test-mintime-floor");

  // Materialize the limiter with a dummy request
  await withRateLimit("openai", "test-mintime-floor", "gpt-4", async () => "ok");

  // Simulate a response with plenty of headroom: remaining=80 > limit*0.5=50
  const headers = new Headers({
    "x-ratelimit-limit-requests": "100",
    "x-ratelimit-remaining-requests": "80",
  });
  updateFromHeaders("openai", "test-mintime-floor", headers, 200, "gpt-4");

  // The operator configured minTime=200, so headroom relaxation MUST NOT
  // override it to 0. Before the fix, capturedMinTime === 0 (RED).
  assert.strictEqual(
    capturedMinTime,
    200,
    `Expected minTime=200 (operator floor), got ${capturedMinTime}`
  );
});
