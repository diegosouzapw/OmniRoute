/**
 * #4165 — surface a clear error when the request-queue (Bottleneck) drops a job.
 *
 * OmniRoute schedules every rate-limited request through Bottleneck with
 * `{ expiration: requestQueue.maxWaitMs }` (open-sse/services/rateLimitManager.ts).
 * When a job exceeds that budget Bottleneck throws the raw message
 * `"This job timed out after <N> ms."` — which is indistinguishable from an
 * upstream gateway timeout. In #4165 an operator spent ~3h misdiagnosing local
 * queue saturation as a provider outage because the 502 body / call-log
 * `last_error` carried that upstream-looking string across many providers.
 *
 * The fix rewrites that specific Bottleneck error into a clear, OmniRoute-owned
 * message that names the knob (`resilienceSettings.requestQueue.maxWaitMs`) and
 * explicitly says it is NOT an upstream timeout, while preserving the original
 * error as `.cause` and tagging `.code = "RATE_LIMIT_QUEUE_TIMEOUT"` so callers
 * can classify it. Behavior is unchanged: the job is still dropped.
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

// Drive a real Bottleneck `expiration` failure: a tiny maxWaitMs and a job that
// runs longer than it.
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

test("#4165 queue-timeout surfaces a clear OmniRoute error, not the raw upstream-looking string", async () => {
  let caught: (Error & { code?: string; cause?: { message?: string } }) | undefined;
  try {
    await triggerQueueTimeout();
    assert.fail("expected the queued job to be dropped");
  } catch (err) {
    caught = err as Error & { code?: string; cause?: { message?: string } };
  }
  assert.ok(caught, "an error should have been thrown");

  // Tagged so combo / callers can classify it as a local queue drop.
  assert.equal(caught.code, "RATE_LIMIT_QUEUE_TIMEOUT", "error must carry the queue-timeout code");

  // The surfaced message must read as a local queue limit, naming the knob,
  // and must NOT masquerade as an upstream "This job timed out" gateway error.
  assert.match(caught.message, /maxWaitMs/, "message should name the maxWaitMs knob");
  assert.match(
    caught.message,
    /not an upstream/i,
    "message should explicitly disclaim an upstream timeout"
  );
  assert.doesNotMatch(
    caught.message,
    /This job timed out/,
    "raw Bottleneck/upstream-looking string must not leak into the surfaced message"
  );

  // The original Bottleneck error is preserved for debugging.
  assert.ok(caught.cause, "original error should be preserved as cause");
  assert.match(String(caught.cause?.message ?? ""), /This job timed out/);
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
