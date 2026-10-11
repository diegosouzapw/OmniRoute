/** Quota-window trend and plan-capacity hints for the account `expiry-first` picker. */

import { getQuotaCache } from "@/domain/quotaCache";
import { filterQuotaBurnMetrics, type QuotaBurnMetrics } from "@/domain/quotaBurnMetrics";
import {
  isAntigravityQuotaProvider,
  selectAntigravityQuotaWindowNames,
} from "@omniroute/open-sse/services/antigravityQuotaFamily.ts";
import { getCodexQuotaWindowFilterForModel } from "@omniroute/open-sse/config/codexQuotaScopes.ts";

const DEFAULT_PLAN_WEIGHTS: Readonly<Record<string, number>> = Object.freeze({
  ultra: 4,
  enterprise: 3,
  business: 3,
  pro: 2,
  plus: 1.5,
  lite: 1,
  free: 1,
});

export type ExpiryFirstScope = {
  provider: string;
  requestedModel: string | null;
  planWeights?: Record<string, number>;
};

export type ExpiryFirstQuotaMetrics = {
  capacityWeight: number;
  burnFractionPerHourByWindow: Record<string, number>;
};

type QuotaCacheEntryView = {
  quotas?: Record<
    string,
    { remainingPercentage?: number; resetAt?: string | null; windowSeconds?: number | null }
  >;
  burnMetrics?: QuotaBurnMetrics;
};

function normalizedPlan(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function resolveExpiryFirstPlanWeight(
  plan: unknown,
  overrides?: Record<string, number>
): number {
  const normalized = normalizedPlan(plan);
  if (!normalized) return 1;

  for (const [name, weight] of Object.entries(overrides || {})) {
    if (normalizedPlan(name) === normalized && Number.isFinite(weight) && weight > 0) {
      return Math.min(100, weight);
    }
  }

  return DEFAULT_PLAN_WEIGHTS[normalized] ?? 1;
}

export function selectExpiryFirstQuotaWindowNames(
  quotaNames: string[],
  scope: Pick<ExpiryFirstScope, "provider" | "requestedModel">
): string[] {
  if (!scope.requestedModel) return quotaNames;
  if (isAntigravityQuotaProvider(scope.provider)) {
    const scoped = selectAntigravityQuotaWindowNames(quotaNames, scope.requestedModel);
    return scoped.length > 0 ? scoped : quotaNames;
  }
  if (scope.provider === "codex") {
    const filterWindow = getCodexQuotaWindowFilterForModel(scope.requestedModel);
    const scoped = filterWindow ? quotaNames.filter(filterWindow) : quotaNames;
    return scoped.length > 0 ? scoped : quotaNames;
  }
  return quotaNames;
}

/** Reads cached quota trends and plan metadata; no database access on the hot path. */
export function getExpiryFirstQuotaMetrics(
  connectionId: string,
  plan: unknown,
  scope: ExpiryFirstScope
): ExpiryFirstQuotaMetrics {
  const entry = getQuotaCache(connectionId) as QuotaCacheEntryView | null;
  const quotas = entry?.quotas || {};
  const scopedNames = selectExpiryFirstQuotaWindowNames(Object.keys(quotas), scope);
  const cachedBurnMetrics = filterQuotaBurnMetrics(entry?.burnMetrics, scopedNames);
  const burnFractionPerHourByWindow: Record<string, number> = Object.fromEntries(
    Object.entries(cachedBurnMetrics?.rates || {}).map(([key, rate]) => [key, rate.fractionPerHour])
  );
  return {
    capacityWeight: resolveExpiryFirstPlanWeight(plan, scope.planWeights),
    burnFractionPerHourByWindow,
  };
}
