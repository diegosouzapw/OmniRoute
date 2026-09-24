/**
 * usage/llmgateway.ts — LLM Gateway DevPass usage-dashboard builder
 *
 * Extracted as a leaf module (not inlined in usage.ts) so the god-file stays
 * flat: this owns turning an LlmgatewayQuota into the `UsageQuota` rows the
 * Dashboard → Usage / Limits page renders, mirroring getOpenrouterUsage's
 * pattern.
 *
 * DevPass exposes two allowance windows:
 *   - monthly plan credits (the ~$87/mo DevPass allowance)
 *   - weekly premium-model credits (7-day rolling window)
 * Each maps to one UsageQuota row. Pay-as-you-go keys (devPlan "none") have no
 * allowance, so the fetcher returns null and we surface a plain connected state.
 */

import {
  fetchLlmgatewayQuota,
  type LlmgatewayQuota,
  LLMGATEWAY_WINDOW_MONTHLY,
  LLMGATEWAY_WINDOW_PREMIUM_WEEKLY,
} from "../llmgatewayQuotaFetcher.ts";
import { type UsageQuota } from "./quota.ts";

function remainingPct(used: number, limit: number | null): number {
  if (limit === null || limit <= 0) return 100;
  return Math.max(0, Math.round((1 - used / limit) * 100));
}

function buildMonthlyQuota(quota: LlmgatewayQuota): UsageQuota | null {
  if (quota.monthlyLimit === null) return null;
  return {
    used: quota.monthlyUsed,
    total: quota.monthlyLimit,
    remaining: quota.monthlyRemaining ?? undefined,
    remainingPercentage: remainingPct(quota.monthlyUsed, quota.monthlyLimit),
    resetAt: null,
    unlimited: false,
    displayName: "DevPass credits (monthly)",
    currency: "USD",
  };
}

function buildPremiumQuota(quota: LlmgatewayQuota): UsageQuota | null {
  if (quota.premiumWeeklyLimit === null) return null;
  return {
    used: quota.premiumUsed,
    total: quota.premiumWeeklyLimit,
    remaining: quota.premiumRemaining ?? undefined,
    remainingPercentage: remainingPct(quota.premiumUsed, quota.premiumWeeklyLimit),
    resetAt: quota.premiumResetAt,
    unlimited: false,
    displayName: "Premium credits (weekly)",
    currency: "USD",
  };
}

function planLabel(devPlan: string): string {
  const tier = devPlan.charAt(0).toUpperCase() + devPlan.slice(1);
  return `LLM Gateway DevPass (${tier})`;
}

/**
 * LLM Gateway Usage — reads the DevPass allowance from GET /v1/key and returns
 * the monthly + weekly premium windows as dashboard quota rows.
 */
export async function getLlmgatewayUsage(connectionId: string, apiKey: string) {
  if (!apiKey) {
    return { message: "LLM Gateway API key not available. Add a key to view usage." };
  }

  const connection = { apiKey };
  const quota = (await fetchLlmgatewayQuota(connectionId, connection)) as LlmgatewayQuota | null;

  if (!quota) {
    // No DevPass allowance (pay-as-you-go key), unreachable endpoint, or an
    // invalid/publishable key — surface a plain connected state.
    return {
      plan: "LLM Gateway (pay-as-you-go)",
      quotas: {},
      message: "LLM Gateway connected. No DevPass allowance on this key.",
    };
  }

  const quotas: Record<string, UsageQuota> = {};
  const monthly = buildMonthlyQuota(quota);
  const premium = buildPremiumQuota(quota);
  if (monthly) quotas[LLMGATEWAY_WINDOW_MONTHLY] = monthly;
  if (premium) quotas[LLMGATEWAY_WINDOW_PREMIUM_WEEKLY] = premium;

  return {
    plan: planLabel(quota.devPlan),
    quotas,
    devPlan: quota.devPlan,
  };
}
