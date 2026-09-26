/**
 * Unpriced-usage report for administrators (#12341).
 *
 * Per-key USD limits price every successful `usage_history` row through
 * `calculateCostDetailed`. A provider/model with no pricing row either blocks
 * the key (UNPRICED_USAGE_BUDGET_POLICY=fail_closed, the default) or is counted
 * as $0 (count_as_zero). Either way the operator needs to know which models are
 * missing a price and which keys they affect — this module computes exactly
 * that, with the same lookup enforcement uses, so the dashboard notice and the
 * enforcement decision can never disagree.
 */
import {
  countLimitedApiKeysUsingModelsSince,
  getSuccessfulUsageModelGroupsSince,
} from "@/lib/db/usageModelGroups";
import { calculateCostDetailed } from "./costCalculator";
import {
  getUnpricedUsageBudgetPolicy,
  type UnpricedUsageBudgetPolicy,
} from "@/shared/utils/featureFlags";

/** Covers the longest per-key enforcement window (weekly) plus provider reset drift. */
export const UNPRICED_USAGE_LOOKBACK_DAYS = 8;
const DAY_MS = 24 * 60 * 60 * 1000;

export interface UnpricedUsageModel {
  provider: string;
  model: string;
  requests: number;
  /** Distinct API keys with this usage in the lookback window. */
  apiKeys: number;
  /** Of those, keys with an enforceable per-key USD limit — the ones enforcement affects. */
  limitedApiKeys: number;
  lastSeenAt: string | null;
}

export interface UnpricedUsageReport {
  policy: UnpricedUsageBudgetPolicy;
  sinceIso: string;
  models: UnpricedUsageModel[];
  /** Distinct limited API keys across all unpriced models. */
  limitedApiKeysAffected: number;
}

export interface UnpricedUsageReportDeps {
  now?: () => number;
  getPolicy?: () => UnpricedUsageBudgetPolicy;
}

export async function getUnpricedUsageReport(
  deps: UnpricedUsageReportDeps = {}
): Promise<UnpricedUsageReport> {
  const now = (deps.now ?? Date.now)();
  const policy = (deps.getPolicy ?? getUnpricedUsageBudgetPolicy)();
  const sinceIso = new Date(now - UNPRICED_USAGE_LOOKBACK_DAYS * DAY_MS).toISOString();

  // One row per distinct provider/model; each lookup below is served from the
  // in-memory pricing cache (getCachedPricing), so the loop does no per-row I/O.
  const models: UnpricedUsageModel[] = [];
  for (const group of getSuccessfulUsageModelGroupsSince(sinceIso)) {
    // Token counts do not affect whether a price row exists; a minimal probe
    // reuses the exact provider-alias / model-normalization lookup enforcement uses.
    const { priced, failed } = await calculateCostDetailed(
      group.provider,
      group.model,
      { input: 1 },
      { provider: group.provider, model: group.model }
    );
    // A lookup that threw is a transient store problem, not a missing price.
    if (!priced && !failed) models.push(group);
  }

  models.sort(
    (a, b) =>
      b.limitedApiKeys - a.limitedApiKeys ||
      b.requests - a.requests ||
      `${a.provider}/${a.model}`.localeCompare(`${b.provider}/${b.model}`)
  );

  const limitedApiKeysAffected = countLimitedApiKeysUsingModelsSince(
    sinceIso,
    models.map((m) => `${m.provider}/${m.model}`)
  );

  return { policy, sinceIso, models, limitedApiKeysAffected };
}
