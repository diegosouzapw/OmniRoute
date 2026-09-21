/**
 * STRICT_ZERO_COST — an opt-in, stricter sibling of `hidePaidModels`
 * (`paidModelFilter.ts`) for operators who need a hard guarantee against ANY
 * incremental monetary spend, not just "documented as free".
 *
 * `hidePaidModels` answers "is this model classified free in FREE_MODEL_BUDGETS
 * right now?" — a point-in-time catalog fact. It says nothing about whether a
 * `recurring-*`/`one-time-initial` candidate's allowance has since been
 * consumed, and nothing about whether exceeding it is a hard stop or silent
 * pay-as-you-go billing. STRICT_ZERO_COST adds exactly those two checks,
 * before ranking, before dispatch — never after.
 *
 * Design, kept deliberately close to `filterPaidOnlyCandidates`'s own stated
 * goal: "a pure, dependency-light function so the filter is unit-testable in
 * isolation". The live quota lookup (`getUsageForProvider`, cached with a TTL)
 * lives in `freeAccessQuota.ts` and is injected here as a plain function —
 * this file never imports the DB or makes a network call itself.
 *
 * No provider or model name appears anywhere in this file. A candidate passes
 * or fails purely on the metadata it carries (`freeType`, `tos`,
 * `hardStopGuaranteed`) plus, for quota-based types, a `FreeAccessState`
 * resolved elsewhere. A future provider that ships correct metadata is
 * handled automatically; one that doesn't is excluded automatically — see
 * `docs/routing/STRICT_ZERO_COST.md`.
 *
 * ## Connection safety (fixed after code review, see `docs/routing/STRICT_ZERO_COST.md`)
 *
 * A candidate from `virtualFactory.ts`'s connection-based pool represents ONE
 * provider/model pair with a set of *eligible* connections
 * (`allowedConnectionIds`) — the actual connection used at dispatch is chosen
 * later (session stickiness/LKGP), not by this filter. Two invariants follow:
 *
 *   1. The `keyless` shortcut (no live check needed, because no credential
 *      exists) is valid ONLY for candidates that genuinely came from the
 *      no-auth path — identified by `connectionId === SYNTHETIC_NOAUTH_CONNECTION_ID`
 *      (`resilienceCandidateFilter.ts`). A `keyless`-catalogued model reached
 *      through a real DB connection (the same provider also has a
 *      credentialed connection) does NOT get the shortcut — it falls through
 *      to the normal quota-based check like any other freeType, and is
 *      excluded unless that specific connection independently proves SAFE.
 *   2. For a multi-account candidate (`connectionId: null`,
 *      `allowedConnectionIds: [...]`), each connection is checked
 *      INDIVIDUALLY. The returned candidate's `allowedConnectionIds` is
 *      REWRITTEN to exactly the subset proven SAFE — never the full original
 *      list. `autoStrategy.ts` (`open-sse/services/combo/autoStrategy.ts:315-331`)
 *      already intersects further routing against `allowedConnectionIds`
 *      before connection selection, so rewriting it here is enough to make
 *      "verified this connection" and "dispatch used this connection" the
 *      same set, by construction — no new enforcement point needed.
 */
import {
  allowsNoAuthShortcut,
  FREE_MODEL_BUDGETS,
  grantsFreeAccess,
  type FreeModelBudget,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { SYNTHETIC_NOAUTH_CONNECTION_ID } from "./resilienceCandidateFilter";

export type FreeAccessStatus = "SAFE" | "EXHAUSTED" | "UNKNOWN";

/** Live-checked allowance state for one (provider, connection) pair. Resolved
 * and cached by `freeAccessQuota.ts`; passed in here as plain data so this
 * module stays free of DB/network dependencies. */
export interface FreeAccessState {
  status: FreeAccessStatus;
  /** Remaining free allowance in the provider's own unit (tokens, requests, or
   * USD-equivalent) — whatever `getUsageForProvider()` reports. `null` when
   * the provider's usage payload doesn't expose a numeric remaining figure. */
  remainingFreeAllowance: number | null;
  /** When the allowance next resets, if the provider reports it. */
  resetAt: string | null;
  /** When this state was fetched (ISO 8601) — used to detect staleness. */
  checkedAt: string;
}

/** A candidate as this module needs to see it — a structural subset of
 * `VirtualAutoComboCandidate` (`virtualFactory.ts`) so this file has no
 * dependency on that module's full type. */
export interface StrictZeroCostCandidate {
  provider: string;
  model: string;
  connectionId: string | null;
  allowedConnectionIds?: string[];
}

export interface StrictZeroCostOptions {
  /** Master switch — mirrors `hidePaidModels`'s own off-by-default shape. */
  enabled: boolean;
  /**
   * Resolves the live allowance state for ONE specific (provider, connection)
   * pair. Returns `undefined` when no usage capability exists for the
   * provider at all (no adapter registered in `USAGE_FETCHER_PROVIDERS`), or
   * when the cache has nothing fresh for this exact connection — both are a
   * meaningful, terminal UNKNOWN for that connection, not an error to retry.
   *
   * Synchronous by design: the caller (`virtualFactory.ts`) resolves and
   * caches state per candidate up front, once per pool build, so this filter
   * itself never awaits a network call and stays trivially testable.
   */
  resolveFreeAccessState: (provider: string, connectionId: string) => FreeAccessState | undefined;
  /** Minimum remaining allowance (in the unit `resolveFreeAccessState` reports
   * — percentage points for the built-in `freeAccessQuota.ts` resolver) a
   * quota-based connection must exceed to pass. Must be >= 0; a fully-exhausted
   * account (`remainingFreeAllowance === 0`) fails at any non-negative
   * threshold via the strict `>` comparison below. */
  minRemainingAllowance: number;
  /** Maximum age, in ms, a `FreeAccessState.checkedAt` may have before it's
   * treated as stale (→ UNKNOWN, excluded). */
  maxStateAgeMs: number;
  /** `now` injection for deterministic tests; defaults to `Date.now`. */
  now?: () => number;
  /**
   * The free-model catalog to look candidates up against. Defaults to the
   * real, live `FREE_MODEL_BUDGETS` — overridable so tests can prove the
   * autodiscovery contract (a provider/model that appears in the catalog is
   * automatically considered; one that's removed automatically disappears)
   * with synthetic fixtures instead of mutating global state. Production
   * callers should never pass this. Threaded through by
   * `filterStrictZeroCostCandidates` (previously accepted but silently
   * ignored — fixed alongside the connection-safety review).
   */
  catalog?: readonly FreeModelBudget[];
}

export function findBudgetEntry(
  candidate: Pick<StrictZeroCostCandidate, "provider" | "model">,
  catalog: readonly FreeModelBudget[] = FREE_MODEL_BUDGETS
): FreeModelBudget | undefined {
  return catalog.find((m) => m.provider === candidate.provider && m.modelId === candidate.model);
}

/** Why the guard cannot trust a candidate right now. */
export type StrictZeroCostExclusionReason =
  | "not-in-catalog"
  | "regime-not-free"
  | "no-hard-stop"
  | "contradictory-noauth"
  | "exhausted"
  | "state-unknown"
  | "no-connection";

export type StrictZeroCostVerdict =
  { outcome: "safe"; safeConnectionIds: string[] } | { outcome: StrictZeroCostExclusionReason };

/**
 * Why one connection cannot be trusted right now. Splitting "exhausted" from
 * "state-unknown" is the whole point: an exhausted allowance resets on its own
 * and the operator waits, while a missing or stale reading means the quota
 * lookup itself is not working and the operator has to go fix something.
 * Opposite actions, and until now the same silence.
 *
 * Freshness is checked before status, so a stale EXHAUSTED reading reports
 * "state-unknown" rather than asserting an exhaustion nobody has confirmed
 * lately. The exclusion verdict is identical either way -- only the reason
 * shown to the operator differs.
 */
export function classifyConnectionState(
  provider: string,
  connectionId: string,
  resolveFreeAccessState: StrictZeroCostOptions["resolveFreeAccessState"],
  options: Pick<StrictZeroCostOptions, "minRemainingAllowance" | "maxStateAgeMs" | "now">
): "safe" | "exhausted" | "state-unknown" {
  const state = resolveFreeAccessState(provider, connectionId);
  if (!state) return "state-unknown"; // no usage adapter for this provider, or lookup never ran

  const now = (options.now ?? Date.now)();
  const checkedAtMs = Date.parse(state.checkedAt);
  if (!Number.isFinite(checkedAtMs) || now - checkedAtMs > options.maxStateAgeMs)
    return "state-unknown";

  if (state.status === "EXHAUSTED") return "exhausted";
  if (state.status !== "SAFE") return "state-unknown";
  if (state.remainingFreeAllowance === null) return "state-unknown";
  // A negative threshold would let a negative/garbage reading pass; a caller
  // that genuinely wants "any allowance greater than zero" should pass 0.
  if (options.minRemainingAllowance < 0) return "state-unknown";
  return state.remainingFreeAllowance > options.minRemainingAllowance ? "safe" : "exhausted";
}

/**
 * Decide which of a candidate's connections satisfy STRICT_ZERO_COST. Pure —
 * `resolveFreeAccessState` is the only injected side-effecting dependency,
 * and it's a synchronous cache read (see `StrictZeroCostOptions` above).
 *
 * Returns the list of connection ids proven SAFE right now:
 *   - `[SYNTHETIC_NOAUTH_CONNECTION_ID]` for a genuine no-auth candidate whose
 *     catalog entry is `keyless` — no live check needed or possible.
 *   - a (possibly empty) subset of the candidate's real connection id(s) for
 *     every other case, each individually verified.
 * An empty array means the caller must exclude the candidate entirely.
 */
export function evaluateCandidateConnections(
  candidate: StrictZeroCostCandidate,
  budgetEntry: FreeModelBudget | undefined,
  resolveFreeAccessState: StrictZeroCostOptions["resolveFreeAccessState"],
  options: Pick<StrictZeroCostOptions, "minRemainingAllowance" | "maxStateAgeMs" | "now">
): string[] {
  const verdict = classifyStrictZeroCostCandidate(
    candidate,
    budgetEntry,
    resolveFreeAccessState,
    options
  );
  return verdict.outcome === "safe" ? verdict.safeConnectionIds : [];
}

/**
 * Same decision as `evaluateCandidateConnections`, but it says why instead of
 * answering with an empty list. The read-only candidate listing needs the why;
 * the pool filter only needs the list, so it reads this one and throws the
 * reason away.
 */
export function classifyStrictZeroCostCandidate(
  candidate: StrictZeroCostCandidate,
  budgetEntry: FreeModelBudget | undefined,
  resolveFreeAccessState: StrictZeroCostOptions["resolveFreeAccessState"],
  options: Pick<StrictZeroCostOptions, "minRemainingAllowance" | "maxStateAgeMs" | "now">
): StrictZeroCostVerdict {
  if (!budgetEntry) return { outcome: "not-in-catalog" }; // paid, or genuinely unknown

  const isGenuineNoAuthCandidate = candidate.connectionId === SYNTHETIC_NOAUTH_CONNECTION_ID;
  if (allowsNoAuthShortcut(budgetEntry.freeType)) {
    // The keyless shortcut is trustworthy ONLY when this specific candidate
    // instance actually has no credential behind it. A `keyless`-catalogued
    // model reached through a real DB connection (connectionId is a real id,
    // or the candidate carries allowedConnectionIds at all) must NOT take
    // this shortcut — it falls through to the quota-based check below like
    // any other freeType, and is excluded there unless hardStopGuaranteed is
    // also set for it (which the curated catalog does not do for keyless
    // entries today, so it will correctly exclude).
    if (isGenuineNoAuthCandidate)
      return { outcome: "safe", safeConnectionIds: [SYNTHETIC_NOAUTH_CONNECTION_ID] };
  }
  if (!grantsFreeAccess(budgetEntry.freeType)) return { outcome: "regime-not-free" };
  // no-auth path but a non-keyless catalog entry: contradictory metadata, fail closed
  if (isGenuineNoAuthCandidate) return { outcome: "contradictory-noauth" };

  // Every remaining freeType (recurring-*, one-time-initial, a keyless entry
  // reached via a real connection, and any future type this module doesn't
  // special-case) requires a documented hard stop before any live check even
  // runs — no point burning a quota lookup on a connection we could never
  // trust regardless of its answer.
  if (budgetEntry.hardStopGuaranteed !== true) return { outcome: "no-hard-stop" };

  const candidateConnectionIds = candidate.connectionId
    ? [candidate.connectionId]
    : (candidate.allowedConnectionIds ?? []);

  // No account at all to check. Reporting `state-unknown` here would send the
  // operator hunting a quota lookup that was never attempted; this is a wiring
  // problem, not a quota one.
  if (candidateConnectionIds.length === 0) return { outcome: "no-connection" };

  const safe: string[] = [];
  // An observed exhaustion outranks a missing reading: one is a fact, the other
  // is the absence of one, and the operator needs the fact. Without this rule the
  // reason would depend on the order the connections happen to be listed in.
  let sawExhausted = false;
  for (const connectionId of candidateConnectionIds) {
    if (connectionId === SYNTHETIC_NOAUTH_CONNECTION_ID) continue; // never reachable here, defensive
    const state = classifyConnectionState(
      candidate.provider,
      connectionId,
      resolveFreeAccessState,
      options
    );
    if (state === "safe") safe.push(connectionId);
    else if (state === "exhausted") sawExhausted = true;
  }
  if (safe.length > 0) return { outcome: "safe", safeConnectionIds: safe };
  return { outcome: sawExhausted ? "exhausted" : "state-unknown" };
}

/**
 * Pool-level filter, same off-by-default identity contract as
 * `filterPaidOnlyCandidates`. For a candidate that survives with a NARROWED
 * connection set (the multi-account case), the returned object has
 * `allowedConnectionIds` rewritten to exactly the SAFE subset — dispatch can
 * then never select a connection this filter didn't verify, because
 * `autoStrategy.ts` already enforces `allowedConnectionIds` as a hard
 * allowlist downstream (see the module docstring above).
 */
export function filterStrictZeroCostCandidates<T extends StrictZeroCostCandidate>(
  pool: T[],
  options: StrictZeroCostOptions
): T[] {
  if (!options.enabled) return pool;

  const kept: T[] = [];
  let changed = false;
  for (const candidate of pool) {
    const budgetEntry = findBudgetEntry(candidate, options.catalog);
    const safeConnectionIds = evaluateCandidateConnections(
      candidate,
      budgetEntry,
      options.resolveFreeAccessState,
      options
    );
    if (safeConnectionIds.length === 0) {
      changed = true;
      continue;
    }

    const isGenuineNoAuthCandidate = candidate.connectionId === SYNTHETIC_NOAUTH_CONNECTION_ID;
    const isSingleConnectionCandidate = candidate.connectionId !== null;
    if (isGenuineNoAuthCandidate || isSingleConnectionCandidate) {
      // Nothing to narrow — either the no-auth sentinel, or a candidate that
      // already pointed at exactly one connection which proved safe.
      kept.push(candidate);
      continue;
    }

    // Multi-account candidate: only rewrite if the safe subset is actually
    // narrower than what was there before, to preserve the same
    // identity-when-nothing-changed contract as `filterPaidOnlyCandidates`.
    const original = candidate.allowedConnectionIds ?? [];
    const isSameSet =
      original.length === safeConnectionIds.length &&
      safeConnectionIds.every((id) => original.includes(id));
    if (isSameSet) {
      kept.push(candidate);
    } else {
      changed = true;
      kept.push({ ...candidate, allowedConnectionIds: safeConnectionIds });
    }
  }
  return changed ? kept : pool;
}

/**
 * How many candidates the STRICT filter drops outright (the same verdict it keeps on),
 * and how many of those only for lack of a hard-stop guarantee.
 */
export function countStrictExclusions<T extends StrictZeroCostCandidate>(
  pool: T[],
  options: StrictZeroCostOptions
): { excluded: number; noHardStop: number } {
  let excluded = 0;
  let noHardStop = 0;
  for (const candidate of pool) {
    const budgetEntry = findBudgetEntry(candidate, options.catalog);
    const verdict = classifyStrictZeroCostCandidate(
      candidate,
      budgetEntry,
      options.resolveFreeAccessState,
      options
    );
    if (verdict.outcome === "safe") continue;
    excluded++;
    if (verdict.outcome === "no-hard-stop") noHardStop++;
  }
  return { excluded, noHardStop };
}

/**
 * Separate, optional ToS guard — kept independent from economic safety on
 * purpose (Marco's requirement): a model can be economically SAFE and still
 * excluded here for ToS reasons, or left in when this guard is off even if
 * STRICT_ZERO_COST is on. Reuses the same curated `tos` field, no new data.
 */
export function filterTosAvoidCandidates<T extends StrictZeroCostCandidate>(
  pool: T[],
  excludeTosAvoid: boolean,
  catalog?: readonly FreeModelBudget[]
): T[] {
  if (!excludeTosAvoid) return pool;
  return pool.filter((candidate) => {
    const budgetEntry = findBudgetEntry(candidate, catalog);
    return budgetEntry?.tos !== "avoid";
  });
}
