/**
 * tests/unit/serial/combo-quota-share-cooldown-wait-timing.test.ts
 *
 * Extracted from tests/unit/combo-quota-share-cooldown-wait.test.ts (#6803).
 *
 * The quota_exhausted scenario below asserts a wall-clock ceiling
 * (`elapsed < 10000`) around a handleComboChat() call that also performs real
 * SQLite I/O (test.beforeEach does fs.rmSync+fs.mkdirSync +
 * core.resetDbInstance()). Under CI-runner CPU/IO contention (multiple
 * concurrent sibling shard jobs) this ceiling can be exceeded even though the
 * functional behavior (no wait, single dispatch) is correct — this is a "did
 * NOT wait out a cooldown" ceiling, not a behavior-under-test assertion, so it
 * is timing-sensitive by nature.
 *
 * Running these in tests/unit/serial/ (--test-concurrency=1, see
 * package.json's test:unit:serial) removes the intra-suite parallelism that
 * was the dominant source of contention, matching the repo's established
 * remedy pattern for this class of test.
 *
 * The non-quota-share (priority) scenario was UPDATED for the "universal
 * cooldown-aware retry" change: comboCooldownWait is no longer gated on
 * `strategy === "quota-share"` — every combo strategy now waits out a SHORT
 * transient 429 and re-dispatches (using a "rate_limit" reason and the
 * earliest retry-after hint directly, since non quota-share strategies have no
 * per-connection model-lockout tracking to consult). It used to assert the
 * OPPOSITE (immediate propagation, no wait) — that assertion is now testing
 * dead behavior, so it was rewritten to assert the new intended behavior
 * instead of being deleted or weakened.
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

function rateLimitResponse(status: number, retryAfterMs: number = RETRY_AFTER_MS) {
  return jsonResponse(status, {
    error: { message: `rate limited (${status})` },
    retryAfter: new Date(Date.now() + retryAfterMs).toISOString(),
  });
}

function okResponse() {
  return jsonResponse(200, { id: "ok", choices: [{ message: { content: "recovered" } }] });
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

test("non quota-share (priority): short 429 cooldown → waits and re-dispatches (2nd pass 200)", async () => {
  let calls = 0;
  const handleSingleModel = async () => {
    calls += 1;
    // 1st dispatch: transient 429 with a short retry-after hint. 2nd dispatch
    // (after the universal cooldown wait): success. Priority combos have no
    // per-connection model-lockout tracking, so this exercises the
    // `shouldWaitForComboCooldown({ reason: "rate_limit", ... })` path fed
    // directly by the earliest retry-after hint (not resolveComboCooldownWaitDecision's
    // per-target lock lookup, which stays quota-share-only).
    return calls === 1 ? rateLimitResponse(429) : okResponse();
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

  assert.equal(res.status, 200, "expected the retried dispatch to succeed with 200");
  assert.equal(calls, 2, "expected exactly one wait+redispatch (2 upstream calls)");
  assert.ok(
    elapsed >= RETRY_AFTER_MS - 50,
    `expected to have waited out the cooldown, only ${elapsed}ms elapsed`
  );
});

test("non quota-share (priority): a quota_exhausted lock drives the decision with a SHORT wait → NO wait (the reason allow-list is the PRIMARY barrier; the maxWaitMs ceiling does NOT cover this)", async () => {
  // THE regression guard for the two-barrier policy documented in
  // comboCooldownRetry.ts ("SECURITY — quota_exhausted must be excluded" /
  // "The small maxWaitMs ceiling is the second barrier").
  //
  // Barrier 1 = the reason allow-list. Barrier 2 = the maxWaitMs ceiling.
  // This scenario is engineered so ONLY barrier 1 can stop the wait:
  //   - modelLockout.errorCodes is [403] ONLY, so model-a's 429 crystallizes
  //     status 429 (the sole status that opens the cooldown-wait branch) WITHOUT
  //     recording a competing `rate_limit` lock.
  //   - model-b's 403 records the only lock in play: `quota_exhausted`. It is
  //     therefore the lock resolveComboCooldownWaitDecision picks, so its reason
  //     is what drives the decision.
  //   - The resulting wait is SHORT (well under maxWaitMs=5000), so barrier 2
  //     lets it through. Only the allow-list can reject it.
  //
  // With the reason hardcoded to "rate_limit" (as the non-quota-share path did
  // before), barrier 1 is gone and this exact input waits + redispatches against
  // a quota-exhausted model — verified: the same test yields 6 dispatches.
  const calls: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    calls.push(modelStr);
    return modelStr === "openai/gpt-4" ? rateLimitResponse(429) : rateLimitResponse(403);
  };

  const res = await handleComboChat({
    body: { model: "openai/gpt-4" },
    combo: {
      name: "priority-quota-exhausted-short-wait",
      strategy: "priority",
      models: ["openai/gpt-4", "anthropic/claude-3-5-sonnet"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, maxSetRetries: 0 },
    },
    handleSingleModel,
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings: {
      modelLockout: {
        ...shortModelLockoutSettings().modelLockout,
        // 429 deliberately excluded: only the 403 records a lock, so the
        // quota_exhausted reason is unambiguously the one under test.
        errorCodes: [403],
      },
    },
    allCombos: null,
  });

  assert.equal(res.status, 429, "the crystallized 429 must be propagated, not retried");
  // Deterministic proof (no wall-clock dependency, so it cannot flake under
  // CI-runner contention): each target is dispatched EXACTLY ONCE. Had the wait
  // fired, the whole set loop would re-run — maxAttempts=2 within the 8s budget
  // produces 6 dispatches, not 2.
  assert.deepEqual(
    calls,
    ["openai/gpt-4", "anthropic/claude-3-5-sonnet"],
    "a quota_exhausted lock must NOT trigger a wait+redispatch, even when the wait would be short enough to clear the maxWaitMs ceiling"
  );
});

test("non quota-share (priority) with comboCooldownWait disabled → 429 propagated, NO wait", async () => {
  let calls = 0;
  const handleSingleModel = async () => {
    calls += 1;
    return rateLimitResponse(429);
  };

  const res = await handleComboChat({
    body: { model: "openai/gpt-4" },
    combo: { ...comboOf("priority"), name: "priority-combo-disabled" },
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
