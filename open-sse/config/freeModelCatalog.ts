import type { TosVerdict } from "./freeTierCatalog.ts";
export { FREE_MODEL_BUDGETS } from "./freeModelCatalog.data.ts";
import { FREE_MODEL_BUDGETS } from "./freeModelCatalog.data.ts";

export type FreeModelFreeType =
  | "recurring-daily"
  | "recurring-monthly"
  | "recurring-credit"
  | "recurring-uncapped"
  | "one-time-initial"
  | "keyless"
  | "discontinued";

/**
 * A real, recurring quota that only opens after an identity check tied to a
 * region (e.g. 实名认证 with a mainland-China ID). One member today; extend the
 * union when a second kind of gate is catalogued.
 */
export type FreeEligibilityGate = "regional-identity";

export interface FreeModelBudget {
  provider: string;
  modelId: string;
  displayName: string;
  monthlyTokens: number;
  creditTokens: number;
  freeType: FreeModelFreeType;
  poolKey: string | null;
  tos: TosVerdict;
  /**
   * Provider states it may train on user prompts. Surfaced in the UI so the
   * privacy cost of a "free" tier is visible next to the quota. Kilo's gateway
   * reports this per model as `mayTrainOnYourPrompts` on its public catalog.
   */
  trainsOnPrompts?: boolean;
  /**
   * True only when the provider's own published terms document that exceeding
   * the free allowance is a hard stop (request refused / rate-limited) and NOT
   * automatic pay-as-you-go billing — e.g. an explicit "no credit card
   * required" claim on the provider's pricing page. This is a curated fact
   * about the upstream provider, not something derivable from `freeType` or
   * from any live API response, so it must be set by hand per entry with the
   * source of the claim in a comment. Leave unset (undefined) whenever this
   * isn't independently documented — `undefined` and `false` are both treated
   * as "not guaranteed" by `strictZeroCostFilter.ts`; never default to `true`
   * to grow the catalog. See STRICT_ZERO_COST in
   * `open-sse/services/autoCombo/strictZeroCostFilter.ts`.
   */
  hardStopGuaranteed?: boolean;
  /**
   * Set when the quota is real and recurring but only reachable after a
   * region-bound identity verification. Affects COUNTING only: the row
   * leaves the steady headline and lands in `gatedRecurringTokens`.
   * Routing, `isFreeModel` and STRICT_ZERO_COST read `freeType` alone.
   * Put the gate's source in a comment next to the entry.
   */
  eligibilityGate?: FreeEligibilityGate;
}

export interface FreeModelTotals {
  /** Pool-deduped recurring tokens/month — the headline "steady" number. */
  steadyRecurringTokens: number;
  /**
   * Steady + recurring credit grants (e.g. monthly $-credit plans).
   * Eligibility-gated rows contribute nothing, exactly like the steady headline.
   */
  steadyWithRecurringCreditsTokens: number;
  /**
   * Steady + recurring + one-time signup credits — first-month only.
   * Eligibility-gated rows contribute nothing, exactly like the steady headline.
   */
  firstMonthRealisticTokens: number;
  /**
   * Extra recurring tokens/month unlocked by a one-time small deposit
   * (e.g. OpenRouter: 50→1000 req/day after a $10 lifetime top-up).
   * Reported separately so it never inflates the steady headline.
   */
  boostMonthlyTokens: number;
  /**
   * Providers that are permanently free but publish NO token cap
   * (rate/concurrency-limited). Real access, but un-quantifiable — listed,
   * never summed into the headline (avoids the rate-limit×24/7 inflation).
   * Eligibility-gated rows are excluded: the list reads as "open to anyone".
   */
  uncappedProviders: string[];
  /**
   * Pool-deduped tokens/month behind an eligibility gate (same rule as the
   * headline). Never summed into `steadyRecurringTokens`.
   */
  gatedRecurringTokens: number;
  /** Providers (sorted) contributing to `gatedRecurringTokens`. */
  gatedProviders: string[];
  modelCount: number;
  poolCount: number;
  perModel: FreeModelBudget[];
  headline: string;
}

/**
 * Which figure a regime's allowance belongs to. Every regime lands in exactly
 * one bucket, so a regime added tomorrow cannot quietly contribute to nothing:
 * the compiler asks which figure it feeds.
 */
export type FreeRegimeTokenBucket =
  | "steady-monthly" // summed into the steady recurring headline
  | "recurring-credit" // credit that refills, reported next to the steady figure
  | "one-time-credit" // signup credit, first month only
  | "uncapped" // real access, no published cap — listed, never summed
  | "none"; // grants nothing, so it feeds no figure

interface FreeRegimeTraits {
  /** Can a request route here without paying? */
  grantsFreeAccess: boolean;
  /** Which totals figure this regime's allowance belongs to. */
  tokenBucket: FreeRegimeTokenBucket;
  /**
   * May a candidate of this regime skip the live allowance check when it is
   * reached through the synthetic no-auth path? True only where the catalogue
   * says no credential exists at all, so no request against it can be billed.
   *
   * This is NOT "this provider needs no API key". `providerCredentialRequirement.ts`
   * answers that other question and documents (`:1-16`) the cost of confusing the
   * two: blackbox, friendliai, iflytek and sparkdesk are catalogued `keyless` yet
   * answer 401 without a credential. Keep the two questions apart.
   */
  allowsNoAuthShortcut: boolean;
}

/**
 * What each free-tier regime engages, for every question the codebase asks of a
 * regime. Exhaustive by construction: adding a member to `FreeModelFreeType`
 * will not compile until it is classified here, on every axis.
 *
 * `discontinued` is the regime a provider uses to retire a free tier behind a
 * paid key — it grants no access, so the shared predicate (`isFreeModel`) reads
 * this table instead of treating every catalogued id as free.
 */
export const FREE_REGIME_TRAITS = {
  "recurring-daily": {
    grantsFreeAccess: true,
    tokenBucket: "steady-monthly",
    allowsNoAuthShortcut: false,
  },
  "recurring-monthly": {
    grantsFreeAccess: true,
    tokenBucket: "steady-monthly",
    allowsNoAuthShortcut: false,
  },
  "recurring-credit": {
    grantsFreeAccess: true,
    tokenBucket: "recurring-credit",
    allowsNoAuthShortcut: false,
  },
  "recurring-uncapped": {
    grantsFreeAccess: true,
    tokenBucket: "uncapped",
    allowsNoAuthShortcut: false,
  },
  "one-time-initial": {
    grantsFreeAccess: true,
    tokenBucket: "one-time-credit",
    allowsNoAuthShortcut: false,
  },
  keyless: {
    grantsFreeAccess: true,
    tokenBucket: "steady-monthly",
    allowsNoAuthShortcut: true,
  },
  discontinued: {
    grantsFreeAccess: false,
    tokenBucket: "none",
    allowsNoAuthShortcut: false,
  },
} satisfies Record<FreeModelFreeType, FreeRegimeTraits>;

export function grantsFreeAccess(freeType: FreeModelFreeType): boolean {
  return FREE_REGIME_TRAITS[freeType].grantsFreeAccess;
}

/** The regimes whose allowance belongs to `bucket`, derived from the table. */
export function freeTypesInBucket(bucket: FreeRegimeTokenBucket): Set<FreeModelFreeType> {
  return new Set(
    (Object.keys(FREE_REGIME_TRAITS) as FreeModelFreeType[]).filter(
      (freeType) => FREE_REGIME_TRAITS[freeType].tokenBucket === bucket
    )
  );
}

/** See `FreeRegimeTraits.allowsNoAuthShortcut` — routing question, not a credential one. */
export function allowsNoAuthShortcut(freeType: FreeModelFreeType): boolean {
  return FREE_REGIME_TRAITS[freeType].allowsNoAuthShortcut;
}

const STEADY_MONTHLY = freeTypesInBucket("steady-monthly");
const RECURRING_CREDIT = freeTypesInBucket("recurring-credit");
const ONE_TIME_CREDIT = freeTypesInBucket("one-time-credit");
const UNCAPPED = freeTypesInBucket("uncapped");

/**
 * Deposit-unlock boosts: a one-time small top-up that permanently raises a
 * provider's recurring free quota. Kept OUT of the steady headline and surfaced
 * as a separate "unlock more" figure. Keyed by the provider's recurring poolKey.
 */
export const FREE_TIER_BOOSTS: Record<
  string,
  { provider: string; boostMonthlyTokens: number; note: string }
> = {
  "openrouter-free": {
    provider: "openrouter",
    boostMonthlyTokens: 24_000_000,
    note: "A one-time $10 lifetime top-up raises the free pool from 50 to 1000 requests/day (~24M tokens/month).",
  },
};

function fmt(n: number): string {
  return n >= 1e9 ? (n / 1e9).toFixed(2) + "B" : Math.round(n / 1e6) + "M";
}

// Sum a per-model numeric field, counting each shared pool once (max within the pool);
// poolKey null => the model is independent and counts on its own.
function dedupedSum(
  models: FreeModelBudget[],
  pick: (m: FreeModelBudget) => number,
  include: (m: FreeModelBudget) => boolean
): number {
  const poolMax = new Map<string, number>();
  let loose = 0;
  for (const m of models) {
    if (!include(m)) continue;
    const key = m.poolKey;
    if (key) poolMax.set(key, Math.max(poolMax.get(key) ?? 0, pick(m)));
    else loose += pick(m);
  }
  for (const v of poolMax.values()) loose += v;
  return loose;
}

export function computeFreeModelTotals(
  opts: {
    excludeTosAvoid?: boolean;
    /**
     * The catalog to aggregate. Defaults to the static release baseline, so
     * every existing caller is unchanged. Callers that resolve a fresher
     * catalog (e.g. the Radar overlay) pass their entries here; an entry with
     * `enabled: false` contributes nothing, exactly as if it were absent.
     */
    entries?: Array<FreeModelBudget & { enabled?: boolean }>;
  } = {}
): FreeModelTotals {
  const catalog: ReadonlyArray<FreeModelBudget & { enabled?: boolean }> =
    opts.entries ?? FREE_MODEL_BUDGETS;
  const models = catalog.filter(
    (m) => !(opts.excludeTosAvoid && m.tos === "avoid") && m.enabled !== false
  );

  const isGated = (m: FreeModelBudget) => m.eligibilityGate !== undefined;

  const steadyRecurringTokens = dedupedSum(
    models,
    (m) => m.monthlyTokens,
    (m) => STEADY_MONTHLY.has(m.freeType) && !isGated(m)
  );
  const gatedRecurringTokens = dedupedSum(
    models,
    (m) => m.monthlyTokens,
    (m) => STEADY_MONTHLY.has(m.freeType) && isGated(m)
  );
  const gatedProviders = [
    ...new Set(
      models.filter((m) => STEADY_MONTHLY.has(m.freeType) && isGated(m)).map((m) => m.provider)
    ),
  ].sort();
  const recurringCredits = dedupedSum(
    models,
    (m) => m.creditTokens,
    (m) => RECURRING_CREDIT.has(m.freeType) && !isGated(m)
  );
  const oneTimeCredits = dedupedSum(
    models,
    (m) => m.creditTokens,
    (m) => ONE_TIME_CREDIT.has(m.freeType) && !isGated(m)
  );

  const steadyWithRecurringCreditsTokens = steadyRecurringTokens + recurringCredits;
  const firstMonthRealisticTokens = steadyWithRecurringCreditsTokens + oneTimeCredits;

  const poolCount = new Set(
    models
      .filter((m) => STEADY_MONTHLY.has(m.freeType) && m.poolKey && !isGated(m))
      .map((m) => m.poolKey)
  ).size;

  // Deposit-unlock boost: sum the FREE_TIER_BOOSTS whose pool still has a live
  // recurring model in the (optionally ToS-filtered) set.
  const livePools = new Set(
    models
      .filter((m) => STEADY_MONTHLY.has(m.freeType) && m.poolKey && !isGated(m))
      .map((m) => m.poolKey)
  );
  const boostMonthlyTokens = Object.entries(FREE_TIER_BOOSTS)
    .filter(([pool]) => livePools.has(pool))
    .reduce((s, [, b]) => s + b.boostMonthlyTokens, 0);

  // Permanently-free-but-uncapped providers (real access, no published cap).
  // Gated rows are excluded: the list is read as "anyone can use this, forever".
  const uncappedProviders = [
    ...new Set(
      models.filter((m) => UNCAPPED.has(m.freeType) && !isGated(m)).map((m) => m.provider)
    ),
  ].sort();

  return {
    steadyRecurringTokens,
    steadyWithRecurringCreditsTokens,
    firstMonthRealisticTokens,
    boostMonthlyTokens,
    uncappedProviders,
    gatedRecurringTokens,
    gatedProviders,
    modelCount: models.length,
    poolCount,
    perModel: models.slice().sort((a, b) => b.monthlyTokens - a.monthlyTokens),
    headline: `~${fmt(steadyRecurringTokens)} documented free tokens/month (steady), up to ~${fmt(firstMonthRealisticTokens)} in your first month with signup credits`,
  };
}
