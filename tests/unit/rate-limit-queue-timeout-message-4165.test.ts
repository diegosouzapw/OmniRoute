/**
 * Queue-wait semantics: maxWaitMs applies only before limiter admission.
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

async function configure(maxWaitMs: number, connectionId: string) {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    concurrentRequests: 1,
    requestsPerMinute: 100000,
    minTimeBetweenRequestsMs: 0,
    maxWaitMs,
  });
  rateLimitManager.enableRateLimitProtection(connectionId);
}

test.afterEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("a running job may exceed maxWaitMs because the budget is queue-only", async () => {
  const connectionId = "conn-long-running";
  await configure(40, connectionId);

  const result = await rateLimitManager.withRateLimit(
    "openai",
    connectionId,
    "gpt-4o",
    async () => {
      await wait(140);
      return "ok";
    }
  );

  assert.equal(result, "ok");
});

test("a queued job times out before admission and never invokes upstream work", async () => {
  const connectionId = "conn-queue-timeout";
  await configure(40, connectionId);

  let releaseFirst!: () => void;
  let markFirstStarted!: () => void;
  const firstStarted = new Promise<void>((resolve) => {
    markFirstStarted = resolve;
  });
  const firstBlocker = new Promise<void>((resolve) => {
    releaseFirst = resolve;
  });

  const first = rateLimitManager.withRateLimit("openai", connectionId, "gpt-4o", async () => {
    markFirstStarted();
    await firstBlocker;
    return "first";
  });
  await firstStarted;

  let secondInvoked = false;
  const second = rateLimitManager.withRateLimit("openai", connectionId, "gpt-4o", async () => {
    secondInvoked = true;
    return "second";
  });

  await assert.rejects(second, (error: Error & { code?: string; status?: number }) => {
    assert.equal(error.code, "RATE_LIMIT_QUEUE_TIMEOUT");
    assert.equal(error.status, 429);
    assert.match(error.message, /maxWaitMs/);
    assert.match(error.message, /not an upstream/i);
    return true;
  });

  assert.equal(secondInvoked, false, "timed-out queued work must not start upstream");
  releaseFirst();
  assert.equal(await first, "first");
  await wait(80);
  assert.equal(secondInvoked, false, "the stale queue placeholder must remain non-executable");
});
