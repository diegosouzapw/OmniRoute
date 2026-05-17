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
});

test.after(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
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
 * Uses wait(0) (immediate tick) to minimize cross-test async interference.
 *
 * Bug vector: disableRateLimitProtection() called limiter.stop({dropWaitingJobs:true}).
 */
test("in-flight job before disable must complete without stopped-limiter error", async () => {
  const provider = "openai";
  const connectionId = "lifecycle-test-conn-b";

  rateLimitManager.enableRateLimitProtection(connectionId);

  // Start job (completes in next tick), disable immediately
  const jobPromise = rateLimitManager.withRateLimit(provider, connectionId, null, () =>
    wait(0).then(() => "in-flight-ok")
  );

  // Disable before the job resolves (it's queued/executing in Bottleneck)
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
 */
test("after 429 teardown, next withRateLimit must get a fresh limiter and succeed", async () => {
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
