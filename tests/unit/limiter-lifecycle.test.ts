/**
 * TDD regression test — Section B fix:
 * limiter lifecycle: no .stop() during runtime reset, evict cache only.
 *
 * Bug: calling .stop() on a Bottleneck instance permanently rejects future
 * .schedule() calls with "This limiter has been stopped". In-flight requests
 * holding a reference to the now-stopped limiter cannot be redirected, causing
 * spurious 502 bursts during container recreation / model registry refresh.
 *
 * Observed incidents (2026-05-12):
 *   - xiaomi-mimo: 13x burst at 17:14:28 (reset 3s)
 *   - mistral: 13x burst at 15:42:36 (reset 3s)
 *   - claude: 1 hit at 19:01:00 (post reboot)
 *
 * Design note: tests B and C use `wait(0)` instead of `wait(50)` to avoid
 * creating a long-running Promise that can interfere with the Node.js v25
 * test runner IPC serialization window.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-limiter-lifecycle-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Flush lingering microtasks and Bottleneck yieldLoop(0) timers after each test.
// Without this, leftover timers from a previous test's _free→_drainAll chain can
// interleave with the next test's Bottleneck timer chain, causing timing-sensitive
// IPC deserialization failures in Node.js v24 test runner subprocesses.
// Pattern borrowed from rate-limit-manager.test.ts.
async function flushBackgroundWork() {
  await wait(50);
  await new Promise((resolve) => setImmediate(resolve));
}

// Allow all DB migration async work and Bottleneck internal setup to fully settle
// before the test runner starts IPC communication.  Without this, the subprocess
// can be mid-migration when the runner sends its first IPC probe, causing an
// "Unable to deserialize cloned data" failure in Node.js v24.
await flushBackgroundWork();

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  await flushBackgroundWork();
});

test.after(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  await flushBackgroundWork();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

/**
 * Core regression: after disableRateLimitProtection + enableRateLimitProtection,
 * the next withRateLimit must succeed on a fresh limiter instance.
 *
 * Bug vector: disableRateLimitProtection() called limiter.stop({dropWaitingJobs:true}).
 */
test("after disable+re-enable, withRateLimit must succeed without stopped-limiter error", async () => {
  const provider = "openai";
  const connectionId = "lifecycle-test-conn-a";

  rateLimitManager.enableRateLimitProtection(connectionId);
  const r1 = await rateLimitManager.withRateLimit(
    provider,
    connectionId,
    null,
    async () => "job-1"
  );
  assert.equal(r1, "job-1");

  // Reset cycle: disable then re-enable (hot-reload / container recreation scenario)
  rateLimitManager.disableRateLimitProtection(connectionId);
  rateLimitManager.enableRateLimitProtection(connectionId);

  let error = null;
  let r2 = null;
  try {
    r2 = await rateLimitManager.withRateLimit(provider, connectionId, null, async () => "job-2");
  } catch (err) {
    error = err;
  }

  assert.equal(
    error,
    null,
    "Expected no error after disable+re-enable, but got: " + (error && error.message)
  );
  assert.equal(r2, "job-2", "post-reset request must return its value");
});

/**
 * In-flight safety: a job started BEFORE disable must still complete.
 *
 * Bug vector: disableRateLimitProtection() called limiter.stop({dropWaitingJobs:true}).
 *
 * Bottleneck's yieldLoop(0) chain defers job execution by several event-loop ticks.
 * Leftover timers from the previous test's _free→_drainAll chain can interleave and
 * delay the new job in Node.js v24 test runner subprocesses. flushBackgroundWork()
 * at the start drains those timers before we schedule the test job.
 */
test("in-flight job before disable must complete without stopped-limiter error", async () => {
  // Drain any leftover Bottleneck timers from test 1 so this test's timer chain
  // is not competed away by the previous test's cleanup residuals.
  await flushBackgroundWork();

  const provider = "openai";
  const connectionId = "lifecycle-test-conn-b";

  rateLimitManager.enableRateLimitProtection(connectionId);

  // Two-phase job: phase 1 signals the fn has started; phase 2 is the async body.
  // disableRateLimitProtection is called only after phase 1, so the job is EXECUTING
  // (not queued) when disconnect() is invoked.
  let phase1Resolve: () => void;
  const phase1 = new Promise<void>((r) => {
    phase1Resolve = r;
  });

  const jobPromise = rateLimitManager.withRateLimit(provider, connectionId, null, async () => {
    phase1Resolve!();
    await wait(0);
    return "in-flight-ok";
  });

  await phase1;
  rateLimitManager.disableRateLimitProtection(connectionId);

  let error = null;
  let result = null;
  try {
    result = await jobPromise;
  } catch (err) {
    error = err;
  }

  assert.equal(
    error,
    null,
    "In-flight job must not throw after disable, but got: " + (error && error.message)
  );
  assert.equal(result, "in-flight-ok", "in-flight job must return its value");
});

/**
 * 429 teardown: after a 429 evicts the limiter, the next request must succeed.
 *
 * Bug vector: updateFromHeaders() 429 path called limiter.stop() before this fix.
 *
 * Drain leftover timers from test 2's _free→_drainAll chain before scheduling
 * the pre-429 job, same rationale as test B above.
 */
test("after 429 teardown, next withRateLimit must get a fresh limiter and succeed", async () => {
  await flushBackgroundWork();

  const provider = "openai";
  const connectionId = "lifecycle-test-conn-c";

  rateLimitManager.enableRateLimitProtection(connectionId);
  await rateLimitManager.withRateLimit(provider, connectionId, null, async () => "pre-429");

  // Simulate 429 — evicts the limiter from cache
  rateLimitManager.updateFromHeaders(provider, connectionId, { "retry-after": "1s" }, 429, null);

  let error = null;
  let result = null;
  try {
    result = await rateLimitManager.withRateLimit(
      provider,
      connectionId,
      null,
      async () => "post-429"
    );
  } catch (err) {
    error = err;
  }

  assert.equal(
    error,
    null,
    "Post-429 request must not throw, but got: " + (error && error.message)
  );
  assert.equal(result, "post-429", "post-429 request must return its value");
});

test("request queue refresh treats zero limits as unbounded for existing limiters", async () => {
  await flushBackgroundWork();

  const provider = "openai";
  const connectionId = "lifecycle-test-conn-d";

  rateLimitManager.enableRateLimitProtection(connectionId);
  assert.equal(
    await rateLimitManager.withRateLimit(
      provider,
      connectionId,
      null,
      async () => "before-refresh"
    ),
    "before-refresh"
  );

  await rateLimitManager.applyRequestQueueSettings({
    enabled: true,
    autoEnableApiKeyProviders: false,
    maxWaitMs: 100,
    requestsPerMinute: 0,
    concurrentRequests: 0,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });

  assert.equal(
    await rateLimitManager.withRateLimit(provider, connectionId, null, async () => "after-refresh"),
    "after-refresh"
  );
});
