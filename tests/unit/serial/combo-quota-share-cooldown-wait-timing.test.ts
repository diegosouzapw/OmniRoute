/**
 * tests/unit/serial/combo-quota-share-cooldown-wait-timing.test.ts
 *
 * Extracted from tests/unit/combo-quota-share-cooldown-wait.test.ts (#6803).
 *
 * These two scenarios assert a wall-clock ceiling (`elapsed < 1500`) around a
 * handleComboChat() call that also performs real SQLite I/O (test.beforeEach
 * does fs.rmSync+fs.mkdirSync + core.resetDbInstance()). Under CI-runner
 * CPU/IO contention (multiple concurrent sibling shard jobs) this ceiling can
 * be exceeded even though the functional behavior (no wait, single dispatch)
 * is correct — this is a "did NOT wait out a cooldown" ceiling, not a
 * behavior-under-test assertion, so it is timing-sensitive by nature.
 *
 * Running these in tests/unit/serial/ (--test-concurrency=1, see
 * package.json's test:unit:serial) removes the intra-suite parallelism that
 * was the dominant source of contention, matching the repo's established
 * remedy pattern for this class of test.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-combo-cooldown-wait-timing-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-combo-cooldown-wait-timing-secret";

const core = await import("../../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { clearAllModelLockouts } = await import("../../../open-sse/services/accountFallback.ts");

function createLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}

const BASE_COOLDOWN_MS = 150;
const RETRY_AFTER_MS = 250;

function shortModelLockoutSettings() {
  return {
    modelLockout: {
      enabled: true,
      errorCodes: [403, 429],
      baseCooldownMs: BASE_COOLDOWN_MS,
      maxCooldownMs: 5000,
      maxBackoffSteps: 0,
      useExponentialBackoff: false,
    },
  };
}

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function rateLimitResponse(status: number) {
  return jsonResponse(status, {
    error: { message: `rate limited (${status})` },
    retryAfter: new Date(Date.now() + RETRY_AFTER_MS).toISOString(),
  });
}

function comboOf(strategy: string) {
  return {
    name: `qtSd/${strategy}-${Math.random().toString(16).slice(2, 8)}`,
    strategy,
    models: ["openai/gpt-4"],
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, maxSetRetries: 0 },
  };
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  clearAllModelLockouts();
  await resetStorage();
});

test.after(async () => {
  clearAllModelLockouts();
  try {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    /* best effort */
  }
});

test("quota-share: 403 quota_exhausted → NO wait, error propagated immediately", async () => {
  let calls = 0;
  const handleSingleModel = async () => {
    calls += 1;
    return rateLimitResponse(403);
  };

  const startedAt = Date.now();
  const res = await handleComboChat({
    body: { model: "openai/gpt-4" },
    combo: comboOf("quota-share"),
    handleSingleModel,
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings: shortModelLockoutSettings(),
    allCombos: null,
  });
  const elapsed = Date.now() - startedAt;

  assert.notEqual(res.status, 200, "quota_exhausted must not be retried into a success");
  // The real signal that the cooldown wait did NOT fire: a single upstream
  // dispatch (no redispatch). The 403 lock cooldown is multi-second, so the
  // wait — had it fired — would dominate the elapsed time; assert we stayed far
  // below that (loose bound; the first combo dispatch pays DB/import overhead).
  assert.equal(calls, 1, "quota_exhausted must NOT trigger a wait+redispatch");
  // Widened from 1500ms (#6803): the primary signal is calls===1 above (no
  // redispatch happened at all); this ceiling is a secondary sanity check
  // that we didn't accidentally wait out a real (multi-second-to-hours)
  // quota_exhausted lock, so a generous bound still catches a real
  // regression while tolerating CI-runner DB/import contention.
  assert.ok(elapsed < 10000, `quota_exhausted must not wait out a cooldown, but ${elapsed}ms elapsed`);
});

test("non quota-share (priority): 429 propagated immediately, NO wait", async () => {
  let calls = 0;
  const handleSingleModel = async () => {
    calls += 1;
    return rateLimitResponse(429);
  };

  const startedAt = Date.now();
  const res = await handleComboChat({
    body: { model: "openai/gpt-4" },
    combo: { ...comboOf("priority"), name: "priority-combo" },
    handleSingleModel,
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings: shortModelLockoutSettings(),
    allCombos: null,
  });
  const elapsed = Date.now() - startedAt;

  assert.equal(res.status, 429, "priority combo must propagate the 429 unchanged");
  assert.equal(calls, 1, "priority combo must NOT wait+redispatch");
  // Widened from 1500ms (#6803) — see the sibling test above for rationale.
  assert.ok(elapsed < 10000, `priority combo must not wait out a cooldown, but ${elapsed}ms elapsed`);
});
