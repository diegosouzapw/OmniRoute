/**
 * Subscription-first routing: the rung model, its two groupings, and the
 * reset re-entry rules.
 *
 * OmniRoute already answers "is this model free?" (`paidModelFilter.ts`) and
 * "can this connection ever bill me?" (`strictZeroCostFilter.ts`). Both fail
 * CLOSED — an exhausted free pool is an empty pool, never a step up to a paid
 * option. And every paid-side mechanism (`cost-optimized`, `budgetCap`,
 * the `cost-saver` mode pack) is tier-agnostic. Neither side answers:
 *
 *   "use the quota I already pay for; when it runs out either stop, or step up
 *    one rung at a time; and come back the moment it resets."
 *
 * This module supplies both halves of that, sharing one rung model:
 *
 *   - `filterSubscriptionOnlyCandidates` — the strict grouping (`auto/subscription`).
 *     Rung 0 only, overage-safe connections only, verified live. Fails CLOSED.
 *   - `orderPoolByRung` — the escalating grouping (`auto/thrifty`). All rungs,
 *     ordered, with exhausted rungs gated out. Fails OPEN, one rung at a time.
 *
 * Design mirrors `strictZeroCostFilter.ts` deliberately: pure functions, the
 * live quota lookup injected as a synchronous resolver, no DB or network
 * import, and the SAME connection-safety invariant — every connection in a
 * candidate's `allowedConnectionIds` is verified INDIVIDUALLY and the array is
 * rewritten to exactly the surviving subset, never the full original list.
 * `autoStrategy.ts` enforces `allowedConnectionIds` as a hard allowlist before
 * selecting a connection at dispatch, so rewriting it here is sufficient to
 * make "verified" and "actually used" the same set by construction.
 */
import {
  classifyConnectionBilling,
  isOverageSafe,
  type BillableConnection,
} from "./connectionBilling";
import type { ConnectionBillingEntry } from "@omniroute/open-sse/config/connectionBillingCatalog.ts";
import type { FreeAccessState } from "./strictZeroCostFilter";

/**
 * Rungs in escalation order. Index is the ordering key; membership is decided
 * by `assignRung` below.
 *
 * The rungs differ in more than price — each has its OWN exhaustion signal,
 * which is why this is not just a sort:
 *
 *   subscription / keyless / free → exhausted on QUOTA (observable, tracked)
 *   cheap / premium              → exhausted on BUDGET (no quota exists; a paid
 *                                  connection serves forever)
 */
export const RUNG_ORDER = ["subscription", "keyless", "free", "cheap", "premium"] as const;

export type LadderRung = (typeof RUNG_ORDER)[number];

/** Rungs whose exhaustion is observable from provider quota state. */
const QUOTA_BEARING_RUNGS: ReadonlySet<LadderRung> = new Set<LadderRung>([
  "subscription",
  "keyless",
  "free",
]);

export function rungIndex(rung: LadderRung): number {
  return RUNG_ORDER.indexOf(rung);
}

/** A candidate as this module needs to see it — a structural subset of
 * `VirtualAutoComboCandidate` (`virtualFactory.ts`), so this file has no
 * dependency on that module's full type. */
export interface LadderCandidate {
  provider: string;
  model: string;
  connectionId: string | null;
  allowedConnectionIds?: string[];
}

export interface LadderOptions {
  /** Master switch. When false every exported filter is the identity function
   * — the same off-by-default contract `filterPaidOnlyCandidates` holds. */
  enabled: boolean;
  /**
   * Live allowance/quota state for ONE (provider, connection) pair, resolved
   * from the cache in `freeAccessQuota.ts`. Synchronous by design: nothing in
   * a candidate-pool build may await a network call.
   *
   * `undefined` means "no usage adapter for this provider, or nothing fresh
   * cached". The two groupings interpret that OPPOSITELY on purpose — see
   * `admitUnknownQuota` below.
   */
  resolveFreeAccessState: (provider: string, connectionId: string) => FreeAccessState | undefined;
  /**
   * `authType` for a connection id (`provider_connections.auth_type`), needed
   * to classify billing. Unknown ids resolve to `null` → the provider-wide
   * catalog entry, or `unknown` billing.
   */
  resolveAuthType: (connectionId: string) => string | null;
  /** Economic tier of a (provider, model) pair — `classifyTier()` in
   * production, injected so this module needs no registry/pricing import. */
  resolveEconomicTier: (provider: string, model: string) => "free" | "cheap" | "premium";
  /**
   * Remaining-percent at or below which a quota-bearing connection counts as
   * exhausted. Default 2, matching `quotaPreflight.defaultThresholdPercent`
   * (`src/lib/resilience/settings/types.ts`) so the two agree.
   */
  exitCutoffPercent?: number;
  /**
   * Remaining-percent a quota-bearing connection must EXCEED to be re-admitted
   * after having been exhausted. Strictly greater than `exitCutoffPercent`;
   * the gap is the hysteresis band that stops a connection hovering at the
   * cutoff from oscillating between rungs on consecutive requests. Default 5.
   */
  reentryMinRemainingPercent?: number;
  /** Max age of a `FreeAccessState.checkedAt` before it is treated as stale. */
  maxStateAgeMs: number;
  /**
   * Whether a connection with no usable quota reading is admitted.
   *
   *   - `auto/thrifty` passes TRUE: trying a plan-included connection costs
   *     nothing, and if it turns out to be exhausted the dispatcher's
   *     fall-through reaches the next rung anyway. Refusing to try it would
   *     send a request to a PAID rung on missing telemetry — the exact
   *     outcome the grouping exists to avoid.
   *   - `auto/subscription` passes FALSE: its promise is that no request can
   *     cost extra, and an unverifiable connection cannot support that promise.
   */
  admitUnknownQuota: boolean;
  /**
   * Budget consumed so far on a paid rung, in USD, for the operator's current
   * budget window. `null`/`undefined` means no spend accounting is available,
   * in which case paid rungs are NOT budget-gated (they still order after
   * every plan-included rung). See the spec's open question on the ledger.
   */
  resolveRungSpendUsd?: (rung: LadderRung) => number | null;
  /** Per-rung budget in USD. A rung mapped to 0 is disabled outright. */
  rungBudgetUsd?: Partial<Record<LadderRung, number>>;
  /** `now` injection for deterministic tests. */
  now?: () => number;
  /** Catalog override for tests; production callers never pass this. */
  catalog?: readonly ConnectionBillingEntry[];
}

const DEFAULT_EXIT_CUTOFF_PERCENT = 2;
const DEFAULT_REENTRY_MIN_REMAINING_PERCENT = 5;

/**
 * Which rung a specific (candidate, connection) pair belongs to.
 *
 * Billing class decides first because it is the fact that actually determines
 * whether money moves; only a genuinely metered connection falls through to
 * the model's economic tier. `unknown` billing is metered by definition
 * (`connectionBilling.ts`), so an uncurated provider lands on a paid rung
 * rather than silently joining the subscription rung.
 */
export function assignRung(
  candidate: Pick<LadderCandidate, "provider" | "model">,
  connection: BillableConnection,
  options: Pick<LadderOptions, "resolveEconomicTier" | "catalog">
): LadderRung {
  const verdict = classifyConnectionBilling(connection, options.catalog);
  if (verdict.billing === "subscription") return "subscription";
  if (verdict.billing === "keyless") return "keyless";
  return options.resolveEconomicTier(candidate.provider, candidate.model);
}

/**
 * Is this connection's plan allowance usable right now?
 *
 * `hasBeenExhausted` selects which side of the hysteresis band applies: a
 * connection that is currently in play only has to stay above the exit cutoff,
 * while one that already dropped out has to climb back above the (higher)
 * re-entry threshold before it is admitted again.
 */
export function isQuotaUsable(
  state: FreeAccessState | undefined,
  options: Pick<
    LadderOptions,
    | "exitCutoffPercent"
    | "reentryMinRemainingPercent"
    | "maxStateAgeMs"
    | "admitUnknownQuota"
    | "now"
  >,
  hasBeenExhausted = false
): boolean {
  if (!state) return options.admitUnknownQuota;
  if (state.status === "EXHAUSTED") return false;
  if (state.status === "UNKNOWN") return options.admitUnknownQuota;

  const now = (options.now ?? Date.now)();
  const checkedAtMs = Date.parse(state.checkedAt);
  if (!Number.isFinite(checkedAtMs) || now - checkedAtMs > options.maxStateAgeMs) {
    return options.admitUnknownQuota;
  }

  if (state.remainingFreeAllowance === null) return options.admitUnknownQuota;

  const exitCutoff = options.exitCutoffPercent ?? DEFAULT_EXIT_CUTOFF_PERCENT;
  const reentryFloor = Math.max(
    options.reentryMinRemainingPercent ?? DEFAULT_REENTRY_MIN_REMAINING_PERCENT,
    exitCutoff
  );
  const threshold = hasBeenExhausted ? reentryFloor : exitCutoff;
  return state.remainingFreeAllowance > threshold;
}

/**
 * Decision 3 — re-entry after a plan quota resets.
 *
 * A cached state whose own `resetAt` has already passed describes a window
 * that no longer exists. Waiting out the cache TTL before re-reading it is
 * pure lag on the single transition subscription-first routing cares most
 * about, so such an entry is stale REGARDLESS of its age.
 *
 * Consumed by `freeAccessQuota.ts`, which owns the cache; kept here so the
 * rule sits with the rest of the ladder's semantics and is testable without
 * touching the cache.
 */
export function isStateStaleForReset(
  state: Pick<FreeAccessState, "resetAt"> | undefined,
  now: number = Date.now()
): boolean {
  if (!state?.resetAt) return false;
  const resetAtMs = Date.parse(state.resetAt);
  if (!Number.isFinite(resetAtMs)) return false;
  return resetAtMs <= now;
}

/**
 * Decision 3, second half — never hold a plan-included connection in cooldown
 * past the moment its own upstream says the quota is back.
 *
 * The exhausting 429 sets `rateLimitedUntil` from exponential backoff
 * (`baseCooldownMs * 2 ** failureIndex`, `src/sse/services/auth.ts`), which for
 * a subscription connection routinely overshoots the real reset — leaving
 * routing stuck on paid rungs long after the plan refilled.
 *
 * This only ever NARROWS a cooldown, and only when the upstream itself
 * supplied the reset instant. An absent, unparseable, or already-past
 * `resetAt` returns the original cooldown untouched.
 */
export function clampCooldownToReset(
  cooldownMs: number,
  resetAt: string | null | undefined,
  now: number = Date.now()
): number {
  if (!resetAt) return cooldownMs;
  const resetAtMs = Date.parse(resetAt);
  if (!Number.isFinite(resetAtMs)) return cooldownMs;
  const untilResetMs = resetAtMs - now;
  if (untilResetMs <= 0) return cooldownMs;
  return Math.min(cooldownMs, untilResetMs);
}

/** True when a paid rung has consumed its configured budget for the window. */
export function isRungBudgetExhausted(rung: LadderRung, options: LadderOptions): boolean {
  const budget = options.rungBudgetUsd?.[rung];
  if (budget === undefined) return false;
  if (budget <= 0) return true; // explicitly disabled
  const spent = options.resolveRungSpendUsd?.(rung);
  if (spent === null || spent === undefined) return false; // no accounting → not gated
  return spent >= budget;
}

/**
 * Connections on a candidate that are usable right now, paired with the rung
 * each one sits on. Quota-bearing rungs are verified per connection; paid
 * rungs have nothing per-connection to verify (they are gated per rung).
 */
function evaluateConnections(
  candidate: LadderCandidate,
  options: LadderOptions,
  accept: (rung: LadderRung) => boolean
): { rung: LadderRung; connectionIds: string[] } | null {
  const connectionIds = candidate.connectionId
    ? [candidate.connectionId]
    : (candidate.allowedConnectionIds ?? []);
  if (connectionIds.length === 0) return null;

  let bestRung: LadderRung | null = null;
  const usable: string[] = [];

  for (const connectionId of connectionIds) {
    const rung = assignRung(
      candidate,
      {
        provider: candidate.provider,
        authType: options.resolveAuthType(connectionId),
        connectionId,
      },
      options
    );
    if (!accept(rung)) continue;

    if (QUOTA_BEARING_RUNGS.has(rung)) {
      const state = options.resolveFreeAccessState(candidate.provider, connectionId);
      if (!isQuotaUsable(state, options)) continue;
    } else if (isRungBudgetExhausted(rung, options)) {
      continue;
    }

    usable.push(connectionId);
    // A candidate reachable through several accounts is represented by its
    // CHEAPEST usable rung: that is the rung a request through it would
    // actually land on once dispatch picks from the surviving allowlist.
    if (bestRung === null || rungIndex(rung) < rungIndex(bestRung)) bestRung = rung;
  }

  if (usable.length === 0 || bestRung === null) return null;
  return { rung: bestRung, connectionIds: usable };
}

/** Rewrite a candidate's connection allowlist to the verified subset, keeping
 * the identity-when-nothing-changed contract the sibling filters hold. */
function withVerifiedConnections<T extends LadderCandidate>(
  candidate: T,
  connectionIds: string[]
): { candidate: T; changed: boolean } {
  if (candidate.connectionId !== null) return { candidate, changed: false };
  const original = candidate.allowedConnectionIds ?? [];
  const isSameSet =
    original.length === connectionIds.length && connectionIds.every((id) => original.includes(id));
  if (isSameSet) return { candidate, changed: false };
  return { candidate: { ...candidate, allowedConnectionIds: connectionIds }, changed: true };
}

/**
 * `auto/subscription` — the strict grouping. Keeps only candidates servable by
 * a plan-included connection whose overage is a documented hard stop, with
 * live quota headroom verified per connection.
 *
 * Fails CLOSED in every ambiguous case: uncurated provider, unverifiable
 * quota, or an overage that meters to paid. An empty result is the correct,
 * intended answer for an operator who asked never to spend extra — the
 * caller's existing empty-pool path handles it, exactly as `hidePaidModels`
 * already does.
 */
export function filterSubscriptionOnlyCandidates<T extends LadderCandidate>(
  pool: T[],
  options: LadderOptions
): T[] {
  if (!options.enabled) return pool;

  const strictOptions: LadderOptions = { ...options, admitUnknownQuota: false };
  const kept: T[] = [];
  let changed = false;

  for (const candidate of pool) {
    const connectionIds = candidate.connectionId
      ? [candidate.connectionId]
      : (candidate.allowedConnectionIds ?? []);

    const safe = connectionIds.filter((connectionId) => {
      const connection: BillableConnection = {
        provider: candidate.provider,
        authType: options.resolveAuthType(connectionId),
        connectionId,
      };
      const verdict = classifyConnectionBilling(connection, options.catalog);
      // `keyless` is plan-included in the ladder's sense but is NOT a
      // subscription: this grouping is "the plan I pay for", so a no-auth
      // backend does not belong in it.
      if (verdict.billing !== "subscription") return false;
      if (!isOverageSafe(verdict)) return false;
      const state = strictOptions.resolveFreeAccessState(candidate.provider, connectionId);
      return isQuotaUsable(state, strictOptions);
    });

    if (safe.length === 0) {
      changed = true;
      continue;
    }
    const result = withVerifiedConnections(candidate, safe);
    if (result.changed) changed = true;
    kept.push(result.candidate);
  }

  return changed ? kept : pool;
}

/**
 * `auto/thrifty` — the escalating grouping. Returns the pool ordered by rung,
 * with candidates whose every connection is exhausted (quota) or whose rung is
 * budget-exhausted removed.
 *
 * Ordering only — the `auto` engine still scores WITHIN the surviving pool, so
 * this decides which rungs are in play, not which candidate wins on one. The
 * combo dispatcher already walks targets in order and falls through on
 * failure, so a runtime exhaustion the preflight did not catch still escalates
 * to the next rung inside the same request.
 *
 * Rung eligibility is recomputed from live state on every pool build and
 * nothing is persisted: there is deliberately no sticky "currently on rung 3"
 * record that could outlive a quota reset and wedge routing on paid rungs.
 */
export function orderPoolByRung<T extends LadderCandidate>(pool: T[], options: LadderOptions): T[] {
  if (!options.enabled) return pool;

  const ranked: Array<{ candidate: T; rung: LadderRung; order: number }> = [];
  for (const [order, candidate] of pool.entries()) {
    const evaluated = evaluateConnections(candidate, options, () => true);
    if (!evaluated) continue;
    const result = withVerifiedConnections(candidate, evaluated.connectionIds);
    ranked.push({ candidate: result.candidate, rung: evaluated.rung, order });
  }

  ranked.sort((a, b) => {
    const byRung = rungIndex(a.rung) - rungIndex(b.rung);
    // Stable within a rung: preserve the pool's incoming order so the auto
    // scorer's own ranking is not reshuffled by this overlay.
    return byRung !== 0 ? byRung : a.order - b.order;
  });

  return ranked.map((entry) => entry.candidate);
}
