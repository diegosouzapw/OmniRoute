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
 *
 * Scenarios 2 and 4 assert a wall-clock ceiling and were extracted to
 * tests/unit/serial/combo-quota-share-cooldown-wait-timing.test.ts (#6803) —
 * see that file's header for why.
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

function rateLimitResponseWithRetryAfter(status: number, retryAfterMs: number) {
  return jsonResponse(status, {
    error: { message: `rate limited (${status})` },
    retryAfter: new Date(Date.now() + retryAfterMs).toISOString(),
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

// NOTE: "quota-share: 403 quota_exhausted → NO wait" and "non quota-share
// (priority): 429 propagated immediately, NO wait" were extracted to
// tests/unit/serial/combo-quota-share-cooldown-wait-timing.test.ts (#6803) —
// both assert a wall-clock ceiling that flaked under CI-runner load; the
// serial dir (--test-concurrency=1) removes the intra-suite contention that
// caused it.

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

// #7360: the "default" combo (strategy=auto, two gemma-4 models) was crystallizing
// a 503 "all targets exhausted" ~6s after both targets hit a real Gemini TPM/RPM
// 429 (retry-after ~58s), instead of holding the request and retrying once the
// lower-cooldown target recovered. Mirrors the quota-share scenario above but with
// TWO distinct model targets and two DIFFERENT retry-after hints, to prove the
// combo (a) extends the wait to the "auto" strategy and (b) picks the target with
// the SMALLER remaining cooldown to retry, not just the first one in the list.
test("auto strategy (2 models, both rate-limited) → waits for the SHORTER cooldown, then succeeds", async () => {
  const SHORT_RETRY_AFTER_MS = 200;
  const LONG_RETRY_AFTER_MS = 3000;
  const MODEL_A = "gemini/gemma-4-31b-it";
  const MODEL_B = "gemini/gemma-4-26b-a4b-it";
  const calls: string[] = [];

  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    calls.push(modelStr);
    const timesSeen = calls.filter((m) => m === modelStr).length;
    if (modelStr === MODEL_A && timesSeen === 1)
      return rateLimitResponseWithRetryAfter(429, SHORT_RETRY_AFTER_MS);
    if (modelStr === MODEL_B) return rateLimitResponseWithRetryAfter(429, LONG_RETRY_AFTER_MS);
    // 2nd time MODEL_A is dispatched (after the wait), its short cooldown has cleared.
    return okResponse();
  };

  const startedAt = Date.now();
  const res = await handleComboChat({
    body: { model: "default" },
    combo: {
      name: `default-${Math.random().toString(16).slice(2, 8)}`,
      strategy: "auto",
      models: [MODEL_A, MODEL_B],
      config: {
        auto: { explorationRate: 0 },
        maxRetries: 0,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        maxSetRetries: 0,
      },
    },
    handleSingleModel,
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings: shortModelLockoutSettings(),
    allCombos: null,
  });
  const elapsed = Date.now() - startedAt;

  assert.equal(res.status, 200, "expected the combo to wait out the shorter cooldown and succeed");
  assert.equal(calls.length, 3, `expected A, B, A again — got ${JSON.stringify(calls)}`);
  assert.equal(calls[0], MODEL_A, "first target tried should be MODEL_A");
  assert.equal(calls[1], MODEL_B, "second target tried should be MODEL_B");
  assert.equal(
    calls[2],
    MODEL_A,
    "should retry the LOWER-cooldown model (A), not wait for B's longer cooldown"
  );
  assert.ok(
    elapsed >= SHORT_RETRY_AFTER_MS,
    `expected to have waited out the shorter cooldown, only ${elapsed}ms elapsed`
  );
  assert.ok(
    elapsed < LONG_RETRY_AFTER_MS,
    `should NOT wait for the longer cooldown (waited ${elapsed}ms, B's cooldown was ${LONG_RETRY_AFTER_MS}ms)`
  );
});

// #7360 follow-up (live incident, log id 1784416706646-51): the test above uses
// maxSetRetries: 0, so it never exercises more than one setTry iteration — it
// missed a real bug where lastError/earliestRetryAfter/lastStatus were declared
// INSIDE the setTry loop body, resetting to null every retry. The real "default"
// combo config has maxSetRetries: 3 (see liveGeminiShared.ts's DEFAULT_COMBO_CONFIG
// and the live DB row), so when BOTH targets lock out on setTry 0, every
// subsequent setTry (1,2,3) pre-skips both via isModelLocked with no real
// dispatch — meaning lastStatus stayed null on the FINAL iteration, and the
// combo crystallized a bogus "all accounts inactive" 503 in ~6s instead of ever
// reaching the cooldown-aware wait, despite a real 429 with a clean ~150ms
// retry-after having been observed on setTry 0.
test("auto strategy with maxSetRetries > 0: both targets lock out on the FIRST setTry → still waits and succeeds, not a bogus 503", async () => {
  const SHORT_RETRY_AFTER_MS = 150;
  const MODEL_A = "gemini/gemma-4-31b-it";
  const MODEL_B = "gemini/gemma-4-26b-a4b-it";
  const calls: string[] = [];

  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    calls.push(modelStr);
    const timesSeen = calls.filter((m) => m === modelStr).length;
    if (timesSeen === 1) return rateLimitResponseWithRetryAfter(429, SHORT_RETRY_AFTER_MS);
    return okResponse();
  };

  const res = await handleComboChat({
    body: { model: "default" },
    combo: {
      name: `default-${Math.random().toString(16).slice(2, 8)}`,
      strategy: "auto",
      models: [MODEL_A, MODEL_B],
      config: {
        auto: { explorationRate: 0 },
        maxRetries: 0,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        // Real value from the "default" combo's stored config — this is the
        // field whose non-zero value exposed the bug (multiple setTry passes
        // needed for both targets to still be locked on the LAST pass).
        maxSetRetries: 3,
        setRetryDelayMs: 5,
      },
    },
    handleSingleModel,
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings: shortModelLockoutSettings(),
    allCombos: null,
  });

  assert.equal(
    res.status,
    200,
    `expected the combo to wait out the shared cooldown and succeed, got ${res.status} (${await res.clone().text()})`
  );
  // Both targets got a real dispatch on setTry 0 (locking them out), then every
  // pre-skipped setTry (1-3) should have led straight to the cooldown wait
  // rather than crystallizing early — so exactly one of A/B gets a genuine
  // 2nd dispatch after the wait, once its lock has cleared.
  assert.ok(calls.length >= 3, `expected at least 3 dispatch calls, got ${JSON.stringify(calls)}`);
});

// Live incident (log id 1784457764961-73): with the REAL "default" combo config
// (maxRetries: 3, not 0 — see liveGeminiShared.ts DEFAULT_COMBO_CONFIG), a plain
// RPM-style 429 (rate_limit_exceeded, NOT a token-limit breach) on the FIRST
// dispatch of setTry 0 enters the `retry < maxRetries` branch, immediately trips
// model-lockout recording (modelLockout enabled for 429), and hits the
// "lockoutRecorded" bail-out — which returned null WITHOUT ever setting
// lastStatus/lastError, even though earliestRetryAfter had already been captured
// from that same response a few lines earlier. When BOTH targets hit this on
// setTry 0, lastStatus stays null through every subsequent pre-skipped setTry, so
// the final `if (!lastStatus)` check won the race against `if (earliestRetryAfter)`
// and crystallized a bogus ALL_ACCOUNTS_INACTIVE 503 in ~6s — even though a real
// 429 with a clean ~1min retry-after was observed on both targets. Production
// symptom: the client (a real agentic loop) saw repeated immediate 503s and kept
// retrying the whole request every ~7s. maxRetries: 0 (used by every test above)
// never enters this branch at all, which is why the existing suite missed it.
test("auto strategy with maxRetries > 0 (matches real 'default' combo config): plain 429 on first dispatch still waits and succeeds, not a bogus 503", async () => {
  const SHORT_RETRY_AFTER_MS = 150;
  const MODEL_A = "gemini/gemma-4-31b-it";
  const MODEL_B = "gemini/gemma-4-26b-a4b-it";
  const calls: string[] = [];

  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    calls.push(modelStr);
    const timesSeen = calls.filter((m) => m === modelStr).length;
    if (timesSeen === 1) return rateLimitResponseWithRetryAfter(429, SHORT_RETRY_AFTER_MS);
    return okResponse();
  };

  const res = await handleComboChat({
    body: { model: "default" },
    combo: {
      name: `default-${Math.random().toString(16).slice(2, 8)}`,
      strategy: "auto",
      models: [MODEL_A, MODEL_B],
      config: {
        auto: { explorationRate: 0 },
        // Real values from the "default" combo's stored config (liveGeminiShared.ts
        // DEFAULT_COMBO_CONFIG) — maxRetries: 3 is the field that exposes the bug:
        // it's what lets the FIRST 429 enter the lockout-recording branch instead of
        // falling straight through to "done retrying this model".
        maxRetries: 3,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        maxSetRetries: 3,
        setRetryDelayMs: 5,
      },
    },
    handleSingleModel,
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings: shortModelLockoutSettings(),
    allCombos: null,
  });

  assert.equal(
    res.status,
    200,
    `expected the combo to wait out the shared cooldown and succeed, got ${res.status} (${await res.clone().text()})`
  );
  assert.ok(calls.length >= 3, `expected at least 3 dispatch calls, got ${JSON.stringify(calls)}`);
});

// Live incident (log id 1784457764961-73 follow-up, same production request as the
// test above): fixing lastStatus recording exposed a SECOND, distinct bug behind the
// same symptom. The pre-dispatch "all credentials already cooling down" rejection
// (buildModelCooldownBody / handleNoCredentials in src/sse/handlers/chatHelpers.ts)
// nests its retry hint as `error.retry_after` (ISO string) / `error.reset_seconds`
// (seconds) — NOT the top-level `retryAfter` field every other 429 response shape in
// this codebase uses (see rateLimitResponseWithRetryAfter above). Combo.ts's error
// extraction only ever read the top-level field, so earliestRetryAfter stayed null
// for this specific shape even after lastStatus was correctly recorded — landing on
// the generic "all combo models unavailable" error instead of the cooldown-wait
// decision. Symptom was identical to the fixed bug: a leaked error instead of a wait.
test("auto strategy: model_cooldown response shape (nested error.retry_after, not top-level) still waits and succeeds", async () => {
  const SHORT_RETRY_AFTER_MS = 150;
  const MODEL_A = "gemini/gemma-4-31b-it";
  const MODEL_B = "gemini/gemma-4-26b-a4b-it";
  const calls: string[] = [];

  // Mirrors buildModelCooldownBody's actual shape (open-sse/utils/error.ts) —
  // retry hint nested under `error`, not top-level `retryAfter`.
  function modelCooldownShapedResponse(model: string, retryAfterMs: number) {
    return jsonResponse(429, {
      error: {
        message: `All credentials for model ${model} are cooling down`,
        type: "rate_limit_error",
        code: "model_cooldown",
        model,
        reset_seconds: Math.max(Math.ceil(retryAfterMs / 1000), 1),
        retry_after: new Date(Date.now() + retryAfterMs).toISOString(),
      },
    });
  }

  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    calls.push(modelStr);
    const timesSeen = calls.filter((m) => m === modelStr).length;
    if (timesSeen === 1) return modelCooldownShapedResponse(modelStr, SHORT_RETRY_AFTER_MS);
    return okResponse();
  };

  const res = await handleComboChat({
    body: { model: "default" },
    combo: {
      name: `default-${Math.random().toString(16).slice(2, 8)}`,
      strategy: "auto",
      models: [MODEL_A, MODEL_B],
      config: {
        auto: { explorationRate: 0 },
        maxRetries: 3,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        maxSetRetries: 3,
        setRetryDelayMs: 5,
      },
    },
    handleSingleModel,
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings: shortModelLockoutSettings(),
    allCombos: null,
  });

  assert.equal(
    res.status,
    200,
    `expected the combo to wait out the shared cooldown and succeed, got ${res.status} (${await res.clone().text()})`
  );
  assert.ok(calls.length >= 3, `expected at least 3 dispatch calls, got ${JSON.stringify(calls)}`);
});
