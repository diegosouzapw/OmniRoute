/**
 * TDD (integration) — quota-share combo cooldown-aware retry (Variante A),
 * exercised through handleComboChat.
 *
 * Scenarios (modelled on model-lockout-max-cooldown.test.ts):
 *  1. strategy="quota-share", single connection, model hits a 429 with a SHORT
 *     retry-after → the combo WAITS out the cooldown and re-dispatches; the 2nd
 *     pass (lock expired) returns 200 instead of propagating the 429.
 *  2. A 403 (quota_exhausted, locked until midnight) → NO wait, the 403/429 is
 *     propagated immediately (the helper's critical exclusion).
 *  3. Client abort DURING the wait → 499 "Request aborted".
 *  4. strategy="priority" (non quota-share) → unchanged: the 429 is propagated
 *     immediately with NO wait.
 *  5. comboCooldownWait disabled in settings → unchanged: 429 propagated, no wait.
 *
 * The waits use a real (short) cooldown so the real setTimeout in
 * waitForCooldownAwareRetry elapses fast and the model lock expires naturally.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-combo-cooldown-wait-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-combo-cooldown-wait-secret";

const core = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");

function createLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}

// A short transient cooldown so the real wait is fast but the lock genuinely
// expires between passes. The 429 carries a retry-after hint slightly LONGER
// than baseCooldownMs so waiting it out guarantees the lock has cleared.
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

function okResponse() {
  return jsonResponse(200, { id: "ok", choices: [{ message: { content: "recovered" } }] });
}

function rateLimitResponse(status: number) {
  return jsonResponse(status, {
    error: { message: `rate limited (${status})` },
    // string ISO retry-after → computeClosestRetryAfter yields ~RETRY_AFTER_MS
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

test("quota-share: short 429 cooldown → waits and re-dispatches (2nd pass 200)", async () => {
  let calls = 0;
  const handleSingleModel = async () => {
    calls += 1;
    // 1st dispatch: transient 429 (records a rate_limit lock). 2nd dispatch
    // (after the wait, lock expired): success.
    return calls === 1 ? rateLimitResponse(429) : okResponse();
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

  assert.equal(res.status, 200, "expected the retried dispatch to succeed with 200");
  assert.equal(calls, 2, "expected exactly one wait+redispatch (2 upstream calls)");
  assert.ok(
    elapsed >= BASE_COOLDOWN_MS,
    `expected to have waited out the cooldown, only ${elapsed}ms elapsed`
  );
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
  assert.ok(elapsed < 1500, `quota_exhausted must not wait out a cooldown, but ${elapsed}ms elapsed`);
});

test("quota-share: client abort during the wait → 499", async () => {
  const controller = new AbortController();
  let calls = 0;
  const handleSingleModel = async () => {
    calls += 1;
    // Always 429 so the loop reaches the wait; abort fires during the wait.
    return rateLimitResponse(429);
  };

  // Abort shortly after the request starts — within the cooldown wait window.
  setTimeout(() => controller.abort(), 50);

  const res = await handleComboChat({
    body: { model: "openai/gpt-4" },
    combo: comboOf("quota-share"),
    handleSingleModel,
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings: shortModelLockoutSettings(),
    allCombos: null,
    signal: controller.signal,
  });

  assert.equal(res.status, 499, "abort during the cooldown wait must return 499");
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
  assert.ok(elapsed < 1500, `priority combo must not wait out a cooldown, but ${elapsed}ms elapsed`);
});

test("quota-share with comboCooldownWait disabled → 429 propagated, NO wait", async () => {
  let calls = 0;
  const handleSingleModel = async () => {
    calls += 1;
    return rateLimitResponse(429);
  };

  const res = await handleComboChat({
    body: { model: "openai/gpt-4" },
    combo: comboOf("quota-share"),
    handleSingleModel,
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings: {
      ...shortModelLockoutSettings(),
      resilienceSettings: { comboCooldownWait: { enabled: false } },
    },
    allCombos: null,
  });

  assert.equal(res.status, 429, "disabled feature must propagate the 429 unchanged");
  assert.equal(calls, 1, "disabled feature must NOT wait+redispatch");
});
