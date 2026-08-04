/**
 * TDD — shouldWaitForComboCooldown (pure decision helper for the quota-share
 * combo cooldown-aware retry, Variante A).
 *
 * The helper decides whether a quota-share (qtSd/) combo that would otherwise
 * crystallize a 429 `model_cooldown` should instead WAIT for a short transient
 * cooldown and re-dispatch. It is pure (no I/O, no clock) so every branch is
 * exhaustively covered here:
 *   - happy path (short transient cooldown within budget → wait)
 *   - reason === "quota_exhausted" EXCLUDED (would otherwise wait until midnight)
 *   - reason in the extra non-retryable set (auth_error/not_found/...) EXCLUDED
 *   - waitMs above the configured ceiling → no wait
 *   - waitMs <= 0 → no wait
 *   - attempt >= maxAttempts → no wait
 *   - budget insufficient (budgetLeftMs < waitMs) → no wait
 *   - settings.enabled === false → no wait
 *
 * Security note (auth.ts:533 isRetryableModelLockoutReason): `quota_exhausted`
 * is classified RETRYABLE there, so the helper MUST exclude it explicitly or a
 * combo would wait until midnight. This file pins that exclusion.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { shouldWaitForComboCooldown, resolveComboCooldownWaitDecision, COMBO_COOLDOWN_WAIT_MARGIN_MS } =
  await import("../../open-sse/services/combo/comboCooldownRetry.ts");

function baseSettings(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    enabled: true,
    maxWaitMs: 5000,
    maxAttempts: 2,
    budgetMs: 8000,
    ...overrides,
  };
}

function baseInput(overrides: Record<string, unknown> = {}) {
  return {
    reason: "rate_limit",
    waitMs: 3000,
    attempt: 0,
    budgetLeftMs: 8000,
    settings: baseSettings(),
    ...overrides,
  };
}

test("happy path: short transient cooldown within budget → wait=true", () => {
  const r = shouldWaitForComboCooldown(baseInput() as never);
  assert.equal(r.wait, true);
  assert.equal(r.waitMs, 3000);
});

test("reason quota_exhausted is EXCLUDED even though it is otherwise 'retryable'", () => {
  const r = shouldWaitForComboCooldown(baseInput({ reason: "quota_exhausted" }) as never);
  assert.equal(r.wait, false);
});

test("reason auth_error is EXCLUDED (non-retryable safety set)", () => {
  const r = shouldWaitForComboCooldown(baseInput({ reason: "auth_error" }) as never);
  assert.equal(r.wait, false);
});

test("reason not_found is EXCLUDED", () => {
  const r = shouldWaitForComboCooldown(baseInput({ reason: "not_found" }) as never);
  assert.equal(r.wait, false);
});

test("reason not_found_local is EXCLUDED", () => {
  const r = shouldWaitForComboCooldown(baseInput({ reason: "not_found_local" }) as never);
  assert.equal(r.wait, false);
});

test("missing/unknown reason (null) → no wait (only an explicit transient reason qualifies)", () => {
  const r = shouldWaitForComboCooldown(baseInput({ reason: null }) as never);
  assert.equal(r.wait, false);
});

test("waitMs above the configured ceiling → no wait", () => {
  const r = shouldWaitForComboCooldown(
    baseInput({ waitMs: 5001, settings: baseSettings({ maxWaitMs: 5000 }) }) as never
  );
  assert.equal(r.wait, false);
  // waitMs is still surfaced for logging even when we decline to wait.
  assert.equal(r.waitMs, 5001);
});

test("waitMs exactly at the ceiling → wait (inclusive bound)", () => {
  const r = shouldWaitForComboCooldown(
    baseInput({ waitMs: 5000, settings: baseSettings({ maxWaitMs: 5000 }) }) as never
  );
  assert.equal(r.wait, true);
});

test("waitMs <= 0 → no wait", () => {
  assert.equal(shouldWaitForComboCooldown(baseInput({ waitMs: 0 }) as never).wait, false);
  assert.equal(shouldWaitForComboCooldown(baseInput({ waitMs: -10 }) as never).wait, false);
});

test("attempt >= maxAttempts → no wait", () => {
  const r = shouldWaitForComboCooldown(
    baseInput({ attempt: 2, settings: baseSettings({ maxAttempts: 2 }) }) as never
  );
  assert.equal(r.wait, false);
});

test("attempt below maxAttempts (last allowed) → wait", () => {
  const r = shouldWaitForComboCooldown(
    baseInput({ attempt: 1, settings: baseSettings({ maxAttempts: 2 }) }) as never
  );
  assert.equal(r.wait, true);
});

test("budget insufficient (budgetLeftMs < waitMs) → no wait", () => {
  const r = shouldWaitForComboCooldown(baseInput({ waitMs: 3000, budgetLeftMs: 2999 }) as never);
  assert.equal(r.wait, false);
});

test("budget exactly equal to waitMs → wait (inclusive bound)", () => {
  const r = shouldWaitForComboCooldown(baseInput({ waitMs: 3000, budgetLeftMs: 3000 }) as never);
  assert.equal(r.wait, true);
});

test("settings.enabled === false → no wait", () => {
  const r = shouldWaitForComboCooldown(
    baseInput({ settings: baseSettings({ enabled: false }) }) as never
  );
  assert.equal(r.wait, false);
});

test("non-finite / garbage waitMs → no wait (defensive)", () => {
  assert.equal(shouldWaitForComboCooldown(baseInput({ waitMs: Number.NaN }) as never).wait, false);
  assert.equal(
    shouldWaitForComboCooldown(baseInput({ waitMs: Number.POSITIVE_INFINITY }) as never).wait,
    false
  );
});

test("returned waitMs is clamped to a finite number (0 when input invalid)", () => {
  const r = shouldWaitForComboCooldown(baseInput({ waitMs: Number.NaN }) as never);
  assert.equal(Number.isFinite(r.waitMs), true);
  assert.equal(r.waitMs, 0);
});

// ── resolveComboCooldownWaitDecision (target resolution + hint/fallback) ──────

const M = COMBO_COOLDOWN_WAIT_MARGIN_MS;

function decisionInput(overrides: Record<string, unknown> = {}) {
  return {
    targets: [{ provider: "openai", connectionId: "conn-1" }],
    earliestRetryAfter: new Date(Date.now() + 2000).toISOString(),
    attempt: 0,
    budgetLeftMs: 8000,
    settings: baseSettings(),
    lookupLock: (_p: string, _c: string) => ({ reason: "rate_limit", remainingMs: 2000 }),
    computeWaitMs: (_r: unknown) => 2000,
    ...overrides,
  };
}

test("resolve: locked target with transient reason within budget → wait", () => {
  const r = resolveComboCooldownWaitDecision(decisionInput() as never);
  assert.equal(r.wait, true);
  // wait = max(lock remaining, hint) + margin so the lock reliably clears.
  assert.equal(r.waitMs, 2000 + M);
  assert.equal(r.reason, "rate_limit");
});

test("resolve: quota_exhausted lock → no wait (the critical security guard)", () => {
  const r = resolveComboCooldownWaitDecision(
    decisionInput({
      lookupLock: () => ({ reason: "quota_exhausted", remainingMs: 3000 }),
    }) as never
  );
  assert.equal(r.wait, false);
});

test("resolve: settings.enabled false short-circuits before any lookup", () => {
  let lookups = 0;
  const r = resolveComboCooldownWaitDecision(
    decisionInput({
      settings: baseSettings({ enabled: false }),
      lookupLock: () => {
        lookups += 1;
        return { reason: "rate_limit", remainingMs: 3000 };
      },
    }) as never
  );
  assert.equal(r.wait, false);
  assert.equal(lookups, 0);
});

test("resolve: no locked target → no wait", () => {
  const r = resolveComboCooldownWaitDecision(decisionInput({ lookupLock: () => null }) as never);
  assert.equal(r.wait, false);
  assert.equal(r.reason, null);
});

test("resolve: expired lock (remainingMs <= 0) is ignored → no wait", () => {
  const r = resolveComboCooldownWaitDecision(
    decisionInput({ lookupLock: () => ({ reason: "rate_limit", remainingMs: 0 }) }) as never
  );
  assert.equal(r.wait, false);
});

test("resolve: picks the soonest-to-recover locked target across many", () => {
  const r = resolveComboCooldownWaitDecision(
    decisionInput({
      targets: [
        { provider: "openai", connectionId: "a" },
        { provider: "openai", connectionId: "b" },
      ],
      // 'a' recovers in 3s, 'b' in 2s → 'b' wins; both rate_limit so 'b' (2s)
      // drives the wait. No usable hint → wait = lock remaining + margin.
      lookupLock: (_p: string, c: string) =>
        c === "b"
          ? { reason: "rate_limit", remainingMs: 2000 }
          : { reason: "rate_limit", remainingMs: 3000 },
      computeWaitMs: () => null,
    }) as never
  );
  assert.equal(r.wait, true);
  assert.equal(r.waitMs, 2000 + M);
});

test("resolve: uses lock remainingMs (+margin) when the retry-after hint yields nothing", () => {
  const r = resolveComboCooldownWaitDecision(
    decisionInput({
      computeWaitMs: () => null,
      lookupLock: () => ({ reason: "rate_limit", remainingMs: 1500 }),
    }) as never
  );
  assert.equal(r.wait, true);
  assert.equal(r.waitMs, 1500 + M);
});

test("resolve: honors a LONGER upstream hint over the lock remaining (still capped)", () => {
  // lock says 1s left but upstream hint says 3s → wait the longer 3s (+margin).
  const r = resolveComboCooldownWaitDecision(
    decisionInput({
      computeWaitMs: () => 3000,
      lookupLock: () => ({ reason: "rate_limit", remainingMs: 1000 }),
    }) as never
  );
  assert.equal(r.wait, true);
  assert.equal(r.waitMs, 3000 + M);
});

test("resolve: hint above the ceiling → no wait even if lock remaining is short", () => {
  const r = resolveComboCooldownWaitDecision(
    decisionInput({
      settings: baseSettings({ maxWaitMs: 5000 }),
      computeWaitMs: () => 6000,
      lookupLock: () => ({ reason: "rate_limit", remainingMs: 1000 }),
    }) as never
  );
  assert.equal(r.wait, false);
});

test("resolve: lock remaining above the ceiling → no wait (not a SHORT cooldown)", () => {
  const r = resolveComboCooldownWaitDecision(
    decisionInput({
      settings: baseSettings({ maxWaitMs: 5000 }),
      computeWaitMs: () => null,
      lookupLock: () => ({ reason: "rate_limit", remainingMs: 6000 }),
    }) as never
  );
  assert.equal(r.wait, false);
});
