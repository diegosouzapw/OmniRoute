/**
 * #4165 — classify Bottleneck's execution expiration accurately.
 *
 * OmniRoute passes the legacy `requestQueue.maxWaitMs` value to Bottleneck as
 * the job `expiration`. Bottleneck starts that timer only after a job leaves
 * QUEUED, so it bounds limiter-managed execution and does not bound queue wait.
 *
 * The raw Bottleneck message (`This job timed out after <N> ms.`) still needs an
 * OmniRoute-owned code and message so it cannot masquerade as an upstream-
 * generated timeout. The original error remains available as `.cause`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rl-execution-timeout-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports are required because DATA_DIR must be set before DB modules evaluate.
const core = await import("../../src/lib/db/core.ts");
const resilienceSettings = await import("../../src/lib/resilience/settings.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");
const { getClientSafeLocalRateLimitError, getTrustedLocalRateLimitError } =
  await import("../../open-sse/services/rateLimitManager/errors.ts");
const { formatProviderError } = await import("../../open-sse/utils/error.ts");

// This contract test deliberately drives Bottleneck's real expiration timer.
function wait(ms: number) {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, ms);
  return promise;
}

test.afterEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Drive a real Bottleneck execution expiration with a function that outlives it.
async function triggerExecutionExpiration() {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    concurrentRequests: 1,
    requestsPerMinute: 100000,
    minTimeBetweenRequestsMs: 0,
    // The execution backstop (not the queue-wait budget) feeds Bottleneck's
    // `expiration`, so shrink the backstop to force a real expiration here.
    executionMaxWaitMs: 40,
  });
  rateLimitManager.enableRateLimitProtection("conn-execution-timeout");

  return rateLimitManager.withRateLimit("openai", "conn-execution-timeout", "gpt-4o", async () => {
    await wait(400); // > executionMaxWaitMs (40ms) → Bottleneck fails the job
    return "should-not-reach";
  });
}

test("#4165 execution expiration is local and accurately named", async () => {
  let caught: (Error & { code?: string; cause?: { message?: string } }) | undefined;
  try {
    await triggerExecutionExpiration();
    assert.fail("expected the limiter-managed execution to expire");
  } catch (err) {
    caught = err as Error & { code?: string; cause?: { message?: string } };
  }
  assert.ok(caught, "an error should have been thrown");

  assert.equal(
    caught.code,
    "RATE_LIMIT_EXECUTION_TIMEOUT",
    "error must carry the local execution-expiration code"
  );

  assert.match(caught.message, /execution expiration/i);
  assert.match(caught.message, /does not bound queue wait/i);
  assert.match(
    caught.message,
    /not an upstream-generated timeout/i,
    "message should explicitly disclaim an upstream-generated timeout"
  );
  assert.doesNotMatch(
    caught.message,
    /This job timed out/,
    "raw Bottleneck/upstream-looking string must not leak into the surfaced message"
  );

  // The original Bottleneck error is preserved for debugging.
  assert.ok(caught.cause, "original error should be preserved as cause");
  assert.match(String(caught.cause?.message ?? ""), /This job timed out/);

  assert.deepEqual(getTrustedLocalRateLimitError(caught), {
    code: "RATE_LIMIT_EXECUTION_TIMEOUT",
    status: 504,
  });
  const safeError = getClientSafeLocalRateLimitError(caught);
  assert.ok(safeError);
  const clientMessage = formatProviderError(safeError, "openai", "gpt-4o", 504);
  assert.match(clientMessage, /execution expiration/i);
  assert.doesNotMatch(
    clientMessage,
    /This job timed out/,
    "client and call-log formatting must not append the retained Bottleneck cause"
  );
});

test("execution outliving the queue-wait budget completes (opencode-go 504 regression)", async () => {
  // Regression: the queue-wait budget (maxWaitMs) used to be passed to
  // Bottleneck as the execution `expiration`, so a legitimate execution that
  // outlived it (e.g. glm-5.3-flash thinking for >45s before first bytes) was
  // killed mid-flight with a false 504. The backstop must come from
  // executionMaxWaitMs instead.
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    concurrentRequests: 1,
    requestsPerMinute: 100000,
    minTimeBetweenRequestsMs: 0,
    maxWaitMs: 40, // queue-wait budget: 40ms
    executionMaxWaitMs: 5000, // execution backstop: 5s
  });
  rateLimitManager.enableRateLimitProtection("conn-slow-exec");

  const result = await rateLimitManager.withRateLimit(
    "openai",
    "conn-slow-exec",
    "gpt-4o",
    async () => {
      await wait(300); // outlives maxWaitMs, well within the execution backstop
      return "ok";
    }
  );
  assert.equal(result, "ok", "execution must not be killed by the queue-wait budget");
});


test("#4165 a job that completes within the execution expiration is unaffected", async () => {
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
