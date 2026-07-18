/**
 * #6593 — rate-limit queue admission control (maxQueueDepth) + 15s default.
 *
 * RFC bundles 2 grounded changes to the local rate-limit request queue:
 *   1. `RequestQueueSettings.maxQueueDepth` — opt-in admission cap (default 0
 *      = disabled). When the queue already holds `maxQueueDepth` requests, a
 *      new request is fast-rejected with a typed `RATE_LIMIT_QUEUE_FULL`
 *      error instead of joining Bottleneck's queue.
 *   2. `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` lowered 120000 -> 15000.
 *
 * (Item #3 from the RFC, `bypassCompressionOnRateLimit`, has no matching
 * code path in this repo's compression pipeline — see the plan-file — and is
 * intentionally not implemented.)
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { checkQueueAdmission } from "../../open-sse/services/rateLimitManager/admission.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rl-admission-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const resilienceSettings = await import("../../src/lib/resilience/settings.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Bottleneck moves a job from QUEUED -> RUNNING/EXECUTING across a few event
// loop ticks (not synchronously on schedule()), so a fixed sleep is flaky
// under load. Poll the live counts instead of guessing a wall-clock delay.
async function pollUntil(
  predicate: () => boolean,
  { timeoutMs = 2000, intervalMs = 5 } = {}
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!predicate()) {
    if (Date.now() > deadline) {
      throw new Error(`pollUntil: condition not met within ${timeoutMs}ms`);
    }
    await wait(intervalMs);
  }
}

test.afterEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// --- Pure unit tests for the extracted admission check -------------------

test("#6593 checkQueueAdmission: disabled (maxQueueDepth<=0) always admits", () => {
  assert.equal(checkQueueAdmission(0, 0, "openai"), null);
  assert.equal(checkQueueAdmission(1000, 0, "openai"), null);
  assert.equal(checkQueueAdmission(5, -1, "openai"), null);
});

test("#6593 checkQueueAdmission: admits while queued count is below the cap", () => {
  assert.equal(checkQueueAdmission(0, 2, "openai"), null);
  assert.equal(checkQueueAdmission(1, 2, "openai"), null);
});

test("#6593 checkQueueAdmission: rejects with a typed error at/over the cap", () => {
  const err = checkQueueAdmission(2, 2, "openai/gpt-4o");
  assert.ok(err, "expected a queue_full error at the cap");
  assert.equal(err?.code, "RATE_LIMIT_QUEUE_FULL");
  // #7649: must carry an explicit HTTP status of 429 (not 502) — chatCore's
  // generic fallback reads `error.status` and otherwise defaults to 502, which
  // also risks tripping the whole-provider circuit breaker for a purely local
  // admission decision.
  assert.equal(err?.status, 429);
  assert.match(err?.message ?? "", /maxQueueDepth/);
  assert.match(err?.message ?? "", /openai\/gpt-4o/);

  const overErr = checkQueueAdmission(5, 2, "openai");
  assert.ok(overErr, "expected a queue_full error over the cap");
  assert.equal(overErr?.code, "RATE_LIMIT_QUEUE_FULL");
  assert.equal(overErr?.status, 429);
});

// --- Integration: wired into withRateLimit() ------------------------------

test("#6593 withRateLimit: fast-fails once the queue is at the configured maxQueueDepth", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    concurrentRequests: 1,
    requestsPerMinute: 100000,
    minTimeBetweenRequestsMs: 0,
    maxWaitMs: 5000,
    maxQueueDepth: 1,
  });
  rateLimitManager.enableRateLimitProtection("conn-admission-cap");
  const statusKey = "openai:conn-admission-cap";
  const status = () => rateLimitManager.getAllRateLimitStatus()[statusKey];

  // Job 1 occupies the single concurrent slot. Poll (not a fixed sleep) until
  // Bottleneck has actually dispatched it, since QUEUED -> EXECUTING takes a
  // few event-loop ticks, not one.
  const job1 = rateLimitManager.withRateLimit("openai", "conn-admission-cap", "gpt-4o", async () => {
    await wait(150);
    return "job1";
  });
  await pollUntil(() => (status()?.executing ?? 0) + (status()?.running ?? 0) >= 1);

  // Job 2 has to wait behind job1 -> occupies the one allowed queue slot (QUEUED=1).
  const job2 = rateLimitManager.withRateLimit("openai", "conn-admission-cap", "gpt-4o", async () => {
    return "job2";
  });
  await pollUntil(() => (status()?.queued ?? 0) >= 1);

  // Job 3 arrives while QUEUED (1) is already at maxQueueDepth (1) -> fast-rejected.
  await assert.rejects(
    rateLimitManager.withRateLimit("openai", "conn-admission-cap", "gpt-4o", async () => "job3"),
    (err: Error & { code?: string; status?: number }) => {
      assert.equal(err.code, "RATE_LIMIT_QUEUE_FULL");
      assert.equal(err.status, 429);
      assert.match(err.message, /maxQueueDepth/);
      return true;
    }
  );

  assert.equal(await job1, "job1");
  assert.equal(await job2, "job2");
});

test("#6593 withRateLimit: default maxQueueDepth=0 preserves unbounded-queue behavior", async () => {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    concurrentRequests: 1,
    requestsPerMinute: 100000,
    minTimeBetweenRequestsMs: 0,
    maxWaitMs: 5000,
    maxQueueDepth: 0,
  });
  rateLimitManager.enableRateLimitProtection("conn-unbounded");

  const jobs = [1, 2, 3, 4].map((n) =>
    rateLimitManager.withRateLimit("openai", "conn-unbounded", "gpt-4o", async () => {
      await wait(15);
      return `job${n}`;
    })
  );

  const results = await Promise.all(jobs);
  assert.deepEqual(results, ["job1", "job2", "job3", "job4"]);
});

// --- Default maxWaitMs lowered 120000 -> 15000 ----------------------------

test("#6593 DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS is 15s absent RATE_LIMIT_MAX_WAIT_MS", () => {
  assert.equal(process.env.RATE_LIMIT_MAX_WAIT_MS, undefined);
  assert.equal(resilienceSettings.DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS, 15000);
  assert.equal(
    resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue.maxWaitMs,
    15000
  );
});

test("#6593 DEFAULT_REQUEST_QUEUE_MAX_DEPTH defaults to 0 (disabled) absent an env override", () => {
  assert.equal(process.env.RATE_LIMIT_MAX_QUEUE_DEPTH, undefined);
  assert.equal(resilienceSettings.DEFAULT_REQUEST_QUEUE_MAX_DEPTH, 0);
  assert.equal(resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue.maxQueueDepth, 0);
});
