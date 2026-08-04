/**
 * comboCooldownRetry.ts — pure decision helper for the quota-share combo
 * cooldown-aware retry (Variante A).
 *
 * Problem it solves
 * -----------------
 * In a single-connection quota-share combo (`qtSd/…`), when the upstream
 * returns a SHORT transient 429 (reset in a few seconds), the combo loop
 * treats the only target as locked-by-resilience, skips it, and crystallizes a
 * 429 `model_cooldown` to the client immediately — even though waiting a couple
 * of seconds would let the same connection succeed. This helper decides whether
 * `handleComboChat` should WAIT for that short cooldown and re-dispatch instead
 * of propagating the 429.
 *
 * Why a pure helper
 * -----------------
 * The actual wait (`waitForCooldownAwareRetry`) and the lock lookup
 * (`getModelLockoutInfo`) live in `handleComboChat`; only the *gating policy*
 * lives here. Keeping the policy pure (no I/O, no clock) means every branch is
 * unit-testable deterministically and the orchestration in combo.ts stays thin.
 *
 * SECURITY — `quota_exhausted` must be excluded
 * ---------------------------------------------
 * `isRetryableModelLockoutReason` (src/sse/services/auth.ts:533) considers
 * `quota_exhausted` RETRYABLE — its NON_RETRYABLE set only holds
 * `not_found`/`not_found_local`. But `recordModelLockoutFailure`
 * (accountFallback.ts) locks a quota-exhausted model UNTIL MIDNIGHT. If this
 * helper trusted that classifier, a combo would wait until midnight. So this
 * helper uses its OWN allow-list semantics: a reason qualifies for a wait only
 * when it is a known short/transient reason AND is not in the explicit
 * non-retryable set below. The small `maxWaitMs` ceiling is the second barrier.
 */

/**
 * Reasons that must NEVER trigger a wait, regardless of the upstream-provided
 * retry hint. `quota_exhausted` is the critical one (locked until midnight);
 * the auth/not-found reasons can never be cured by waiting a few seconds.
 */
export const COMBO_COOLDOWN_NON_RETRYABLE_REASONS: ReadonlySet<string> = new Set([
  "quota_exhausted",
  "auth_error",
  "not_found",
  "not_found_local",
]);

/**
 * Reasons recognised as short/transient and therefore eligible for a wait. We
 * use an allow-list (rather than "anything not in the deny-list") so an unknown
 * or empty reason fails closed — only an explicit transient reason qualifies.
 * These match the model-lockout reasons produced by classifyLockoutReason /
 * recordModelLockoutFailure for rate-limit-class failures.
 */
export const COMBO_COOLDOWN_RETRYABLE_REASONS: ReadonlySet<string> = new Set([
  "rate_limit",
  "rate_limited",
  "transient",
  "overloaded",
  "server_error",
]);

export interface ComboCooldownWaitSettings {
  /** Master switch — when false the helper always returns wait=false. */
  enabled: boolean;
  /** Hard ceiling (ms) on a single wait. Inclusive upper bound. */
  maxWaitMs: number;
  /** Maximum number of wait+redispatch attempts for one request. */
  maxAttempts: number;
  /** Total wait budget (ms) for the request — combo.ts decrements it. */
  budgetMs: number;
}

export interface ShouldWaitForComboCooldownInput {
  /** Lock reason from getModelLockoutInfo (may be null/unknown). */
  reason: unknown;
  /** Computed wait derived from the upstream retry-after hint (ms). */
  waitMs: unknown;
  /** Zero-based count of waits already performed for this request. */
  attempt: number;
  /** Remaining wait budget (ms) for this request. */
  budgetLeftMs: number;
  settings: ComboCooldownWaitSettings;
}

export interface ShouldWaitForComboCooldownResult {
  wait: boolean;
  /**
   * The wait duration the caller should pass to waitForCooldownAwareRetry. It
   * is surfaced even when `wait` is false (clamped to a finite >= 0 value) so
   * the caller can log "would have waited Xms" without re-deriving it.
   */
  waitMs: number;
}

function toFiniteWaitMs(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }
  return 0;
}

function isRetryableComboCooldownReason(reason: unknown): boolean {
  if (typeof reason !== "string" || reason.length === 0) return false;
  if (COMBO_COOLDOWN_NON_RETRYABLE_REASONS.has(reason)) return false;
  return COMBO_COOLDOWN_RETRYABLE_REASONS.has(reason);
}

/**
 * Decide whether a quota-share combo should wait for a short cooldown and
 * re-dispatch. Pure — no I/O, no clock. All inputs are explicit.
 *
 * Returns wait=true only when ALL hold:
 *   - settings.enabled
 *   - reason is a recognised transient reason AND not in the non-retryable set
 *     (quota_exhausted / auth_error / not_found / not_found_local)
 *   - waitMs is finite and 0 < waitMs <= settings.maxWaitMs
 *   - attempt < settings.maxAttempts
 *   - budgetLeftMs >= waitMs
 */
export function shouldWaitForComboCooldown(
  input: ShouldWaitForComboCooldownInput
): ShouldWaitForComboCooldownResult {
  const { reason, attempt, budgetLeftMs, settings } = input;
  const waitMs = toFiniteWaitMs(input.waitMs);

  const wait =
    settings.enabled === true &&
    isRetryableComboCooldownReason(reason) &&
    waitMs > 0 &&
    waitMs <= settings.maxWaitMs &&
    attempt < settings.maxAttempts &&
    budgetLeftMs >= waitMs;

  return { wait, waitMs };
}

/** Minimal lock shape resolved from getModelLockoutInfo. */
export interface ComboCooldownLockInfo {
  reason: unknown;
  remainingMs: number;
}

/** Minimal combo-target shape this helper inspects. */
export interface ComboCooldownTarget {
  provider?: string | null;
  connectionId?: string | null;
  /**
   * The target's own model. Heterogeneous combos (priority, weighted,
   * round-robin, …) hold a DIFFERENT model per target, so the lock lookup must
   * be keyed on each target's own model — keying every lookup on the first
   * target's model would miss every other target's lock and silently degrade
   * the reason allow-list to "no lock found".
   */
  modelStr?: string | null;
}

export interface ResolveComboCooldownDecisionInput {
  /** Combo targets to inspect for an active short lock. */
  targets: ReadonlyArray<ComboCooldownTarget>;
  /** Earliest retry-after the loop crystallized (string | number | Date | null). */
  earliestRetryAfter: unknown;
  attempt: number;
  budgetLeftMs: number;
  settings: ComboCooldownWaitSettings;
  /**
   * Per-target lock lookup (getModelLockoutInfo). Receives the target itself so
   * the caller can key the lookup on that target's own model.
   */
  lookupLock: (
    provider: string,
    connectionId: string,
    target: ComboCooldownTarget
  ) => ComboCooldownLockInfo | null;
  /** Derives the wait (ms) from the retry-after hint (computeClosestRetryAfter). */
  computeWaitMs: (retryAfter: unknown) => number | null;
}

export interface ResolveComboCooldownDecisionResult extends ShouldWaitForComboCooldownResult {
  /** Reason that drove the decision (for logging); null when none resolved. */
  reason: string | null;
}

/**
 * Small safety margin (ms) added on top of the wait so the model lock is
 * reliably EXPIRED when the loop re-checks `isModelLocked` after the wait (real
 * clocks drift a few ms between locking and re-evaluation; under-waiting would
 * make the 2nd pass skip the target again and crystallize a 503/429).
 */
export const COMBO_COOLDOWN_WAIT_MARGIN_MS = 50;

/**
 * Resolve, from the combo targets and the crystallized retry-after, whether the
 * quota-share combo should wait and re-dispatch. Picks the locked target with
 * the SMALLEST positive remaining cooldown (the soonest to recover) and uses its
 * reason. The wait must last long enough to actually clear that lock, so it is
 * `max(lock remainingMs, upstream retry-after hint) + margin` — the lock's own
 * remaining time is authoritative (it already folds in a longer upstream hint
 * via selectLockoutCooldownMs), and we honor an even longer hint if present. The
 * ceiling check in shouldWaitForComboCooldown then gates on that real duration,
 * so only genuinely SHORT cooldowns are waited. Pure given the injected
 * `lookupLock`/`computeWaitMs` — no I/O, no clock — so it is unit-testable.
 */
export function resolveComboCooldownWaitDecision(
  input: ResolveComboCooldownDecisionInput
): ResolveComboCooldownDecisionResult {
  const {
    targets,
    earliestRetryAfter,
    attempt,
    budgetLeftMs,
    settings,
    lookupLock,
    computeWaitMs,
  } = input;

  // Short-circuit before any lookup when the feature is off.
  if (!settings.enabled) return { wait: false, waitMs: 0, reason: null };

  let best: { reason: unknown; remainingMs: number } | null = null;
  for (const target of targets) {
    const provider = typeof target.provider === "string" ? target.provider : "";
    if (!provider) continue;
    const connectionId = typeof target.connectionId === "string" ? target.connectionId : "";
    const info = lookupLock(provider, connectionId, target);
    if (!info) continue;
    const remainingMs =
      typeof info.remainingMs === "number" && Number.isFinite(info.remainingMs)
        ? info.remainingMs
        : 0;
    if (remainingMs <= 0) continue;
    if (!best || remainingMs < best.remainingMs) {
      best = { reason: info.reason, remainingMs };
    }
  }

  if (!best) return { wait: false, waitMs: 0, reason: null };

  // Wait long enough to actually clear the lock: the larger of the lock's own
  // remaining time and the upstream retry-after hint, plus a small margin.
  const rawHintWaitMs = computeWaitMs(earliestRetryAfter);
  const hintWaitMs =
    typeof rawHintWaitMs === "number" && Number.isFinite(rawHintWaitMs) && rawHintWaitMs > 0
      ? rawHintWaitMs
      : 0;
  const waitMs = Math.max(best.remainingMs, hintWaitMs) + COMBO_COOLDOWN_WAIT_MARGIN_MS;

  const decision = shouldWaitForComboCooldown({
    reason: best.reason,
    waitMs,
    attempt,
    budgetLeftMs,
    settings,
  });

  return {
    ...decision,
    reason: typeof best.reason === "string" ? best.reason : null,
  };
}
