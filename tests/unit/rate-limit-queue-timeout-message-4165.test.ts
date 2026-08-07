/**
 * #4165 — surface a clear error when the request-queue (Bottleneck) drops a job.
 *
 * Queue waiting is bounded by a separate timer. Bottleneck's job expiration is
 * intentionally not used because it measures the entire scheduled lifetime and
 * would kill an already-dispatched provider call that is making progress.
 *
 * The queue-only timer still rewrites pre-dispatch expiry into a clear,
 * OmniRoute-owned error that names the knob (`resilienceSettings.requestQueue.maxWaitMs`)
 * and explicitly says it is NOT an upstream timeout.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rl-queue-timeout-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const resilienceSettings = await import("../../src/lib/resilience/settings.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test.afterEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// A dispatched provider call may run longer than maxWaitMs without being killed.
async function triggerQueueTimeout() {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    concurrentRequests: 1,
    requestsPerMinute: 100000,
    minTimeBetweenRequestsMs: 0,
    maxWaitMs: 40,
  });
  rateLimitManager.enableRateLimitProtection("conn-queue-timeout");

  return rateLimitManager.withRateLimit("openai", "conn-queue-timeout", "gpt-4o", async () => {
    await wait(400); // > maxWaitMs (40ms) → Bottleneck fails the job
    return "should-not-reach";
  });
}

async function triggerQueuedTimeout() {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    concurrentRequests: 1,
    requestsPerMinute: 0,
    minTimeBetweenRequestsMs: 0,
    maxWaitMs: 40,
  });
  const connectionId = "conn-queued-timeout";
  rateLimitManager.enableRateLimitProtection(connectionId);

  let resolveFirstExecuting: () => void = () => undefined;
  const firstExecuting = new Promise<void>((resolve) => {
    resolveFirstExecuting = resolve;
  });
  let releaseFirst: () => void = () => undefined;
  const first = rateLimitManager.withRateLimit("test-provider", connectionId, null, async () => {
    resolveFirstExecuting();
    await new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });
  });
  await firstExecuting;

  let caught: unknown;
  try {
    await rateLimitManager.withRateLimit(
      "test-provider",
      connectionId,
      null,
      async () => "should-not-dispatch"
    );
    assert.fail("expected the queued job to expire");
  } catch (error) {
    caught = error;
  } finally {
    releaseFirst();
    await first;
  }
  return caught;
}

test("#4165 a dispatched provider call is not killed by the queue budget", async () => {
  const result = await triggerQueueTimeout();
  assert.equal(result, "should-not-reach");
});

test("#4165 queue expiry surfaces a clear local error", async () => {
  const caught = (await triggerQueuedTimeout()) as Error & { code?: string };
  assert.equal(caught.code, "RATE_LIMIT_QUEUE_TIMEOUT");
  assert.match(caught.message, /maxWaitMs/);
  assert.match(caught.message, /not an upstream/i);
  assert.doesNotMatch(caught.message, /This job timed out/);
});

test("#4165 a job that completes within maxWaitMs is unaffected", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    concurrentRequests: 1,
    requestsPerMinute: 100000,
    minTimeBetweenRequestsMs: 0,
    maxWaitMs: 5000,
  });
  rateLimitManager.enableRateLimitProtection("conn-fast");

  const result = await rateLimitManager.withRateLimit(
    "openai",
    "conn-fast",
    "gpt-4o",
    async () => "ok"
  );
  assert.equal(result, "ok");
});
