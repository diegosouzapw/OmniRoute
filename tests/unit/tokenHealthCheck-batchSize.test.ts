/**
 * Regression test for #7875 — PR #7719 (perf: batch concurrency for the
 * OAuth token-health-check sweep) replaced the configurable healthcheck
 * batch size with a hardcoded `const BATCH_SIZE = 20;` in
 * src/lib/tokenHealthCheck.ts, losing all configurability.
 *
 * Fix: `sweep()` must read HEALTHCHECK_BATCH_SIZE (default 20) per call,
 * the same pattern already used for HEALTHCHECK_STAGGER_MS /
 * HEALTHCHECK_JITTER_MIN_MS / HEALTHCHECK_JITTER_MAX_MS.
 *
 * This proves the batch size is configurable by shrinking it below the
 * connection count and counting how many inter-batch stagger delays
 * `sweep()` schedules via `setTimeout`. With 5 connections and
 * HEALTHCHECK_BATCH_SIZE=2, batches are [2, 2, 1] => 2 inter-batch gaps.
 * With the batch size hardcoded at 20, all 5 connections run in a single
 * batch => 0 inter-batch gaps. `global.setTimeout` is intercepted (and
 * fires immediately) so the assertion is deterministic and does not rely
 * on noisy wall-clock timing.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-batchsize-health-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      const code = (error as NodeJS.ErrnoException)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  try {
    if (fs.existsSync(TEST_DATA_DIR)) {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    }
  } catch {
    /* best effort cleanup */
  }
});

test("sweep() respects HEALTHCHECK_BATCH_SIZE instead of a hardcoded 20", async () => {
  await resetStorage();

  // 5 connections, isActive=false so checkConnection() returns immediately
  // at the !conn.isActive guard without any OAuth network calls.
  for (let i = 1; i <= 5; i++) {
    await providersDb.createProviderConnection({
      provider: "openai",
      authType: "oauth",
      name: `BatchSize Test ${i}`,
      email: `bs${i}@example.com`,
      refreshToken: "test-rt",
      isActive: false,
    });
  }

  const origSetting = process.env.HEALTHCHECK_SKIP_PROVIDERS;
  const origBatchSize = process.env.HEALTHCHECK_BATCH_SIZE;
  const origStagger = process.env.HEALTHCHECK_STAGGER_MS;
  process.env.HEALTHCHECK_BATCH_SIZE = "2";
  process.env.HEALTHCHECK_STAGGER_MS = "3000"; // matches the default so a real stagger delay is scheduled
  delete process.env.HEALTHCHECK_SKIP_PROVIDERS;
  delete process.env.HEALTHCHECK_JITTER_MIN_MS;
  delete process.env.HEALTHCHECK_JITTER_MAX_MS;

  // Intercept setTimeout so the test runs instantly and deterministically —
  // we only care about the *delay values* sweep() schedules, not real elapsed time.
  const originalSetTimeout = global.setTimeout;
  const scheduledDelays: number[] = [];
  (global as unknown as { setTimeout: typeof setTimeout }).setTimeout = ((
    fn: (...args: unknown[]) => void,
    delay?: number,
    ...args: unknown[]
  ) => {
    scheduledDelays.push(delay ?? 0);
    return originalSetTimeout(fn, 0, ...args);
  }) as typeof setTimeout;

  try {
    const { sweep } = await import("../../src/lib/tokenHealthCheck.ts");
    await sweep();

    // Each inter-batch gap schedules a stagger-delay setTimeout (>= HEALTHCHECK_STAGGER_MS)
    // followed by a 0ms yield setTimeout. Count only the stagger-delay ones.
    const staggerCalls = scheduledDelays.filter((d) => d >= 3000);

    // 5 connections / batch size 2 -> batches of [2, 2, 1] -> 2 inter-batch gaps.
    // With the batch size hardcoded at 20, all 5 connections would run in a
    // single batch -> 0 inter-batch gaps.
    assert.equal(
      staggerCalls.length,
      2,
      `expected 2 inter-batch stagger delays with HEALTHCHECK_BATCH_SIZE=2 and 5 connections ` +
        `(batches of [2,2,1]), got ${staggerCalls.length} — scheduled delays: ${JSON.stringify(scheduledDelays)}`
    );
  } finally {
    global.setTimeout = originalSetTimeout;
    if (origSetting !== undefined) process.env.HEALTHCHECK_SKIP_PROVIDERS = origSetting;
    else delete process.env.HEALTHCHECK_SKIP_PROVIDERS;
    if (origBatchSize !== undefined) process.env.HEALTHCHECK_BATCH_SIZE = origBatchSize;
    else delete process.env.HEALTHCHECK_BATCH_SIZE;
    if (origStagger !== undefined) process.env.HEALTHCHECK_STAGGER_MS = origStagger;
    else delete process.env.HEALTHCHECK_STAGGER_MS;
  }
});
