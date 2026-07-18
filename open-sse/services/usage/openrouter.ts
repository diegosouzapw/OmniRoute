/**
 * usage/openrouter.ts — OpenRouter usage-dashboard builder (#6842)
 *
 * Extracted as a leaf module (not inlined in usage.ts) so the god-file stays
 * flat: this owns turning an OpenrouterQuota into the `UsageQuota` shape the
 * Dashboard → Usage page renders, mirroring getDeepseekUsage's pattern.
 */

import { fetchOpenrouterQuota, type OpenrouterQuota } from "../openrouterQuotaFetcher.ts";
import { getFreeWindowStatus, resolveAccountKey } from "../openrouterFreeWindow.ts";
import { type UsageQuota } from "./quota.ts";

function buildCreditsQuota(quota: OpenrouterQuota): UsageQuota | null {
  if (quota.limit === null && quota.creditBalance === null) return null;
  return {
    used: quota.limit !== null ? quota.limit - (quota.limitRemaining ?? quota.limit) : 0,
    total: quota.limit ?? 0,
    remaining: quota.creditBalance ?? undefined,
    remainingPercentage: quota.limit !== null ? Math.round((1 - quota.percentUsed) * 100) : 100,
    resetAt: quota.resetAt ?? null,
    unlimited: quota.limit === null,
    currency: "USD",
  };
}

function buildFreeWindowQuota(connectionId: string, connection?: Record<string, unknown>) {
  const accountKey = resolveAccountKey(connectionId, connection);
  const status = getFreeWindowStatus(accountKey);
  const dailyQuota: UsageQuota = {
    used: status.dailyUsed,
    total: status.dailyLimit,
    remaining: status.dailyRemaining,
    remainingPercentage: Math.round((status.dailyRemaining / status.dailyLimit) * 100),
    resetAt: status.dailyResetAt,
    unlimited: false,
    displayName: "Free-tier requests (daily)",
  };
  const rpmQuota: UsageQuota = {
    used: status.rpmUsed,
    total: status.rpmLimit,
    remaining: status.rpmRemaining,
    remainingPercentage: Math.round((status.rpmRemaining / status.rpmLimit) * 100),
    resetAt: null,
    unlimited: false,
    displayName: "Free-tier requests (per minute)",
  };
  return { dailyQuota, rpmQuota };
}

/**
 * OpenRouter Usage — merges the /key + /credits polling fetcher with the
 * locally-tracked `:free`-variant request window into one usage payload.
 */
export async function getOpenrouterUsage(
  connectionId: string,
  apiKey: string,
  providerSpecificData?: Record<string, unknown> | null
) {
  if (!apiKey) {
    return { message: "OpenRouter API key not available. Add a key to view usage." };
  }

  const connection = { apiKey, providerSpecificData: providerSpecificData ?? {} };
  const quota = (await fetchOpenrouterQuota(connectionId, connection)) as OpenrouterQuota | null;

  const quotas: Record<string, UsageQuota> = {};
  const { dailyQuota, rpmQuota } = buildFreeWindowQuota(connectionId, connection);
  quotas.free_daily = dailyQuota;
  quotas.free_rpm = rpmQuota;

  if (!quota) {
    return {
      plan: "OpenRouter (usage endpoint unreachable)",
      quotas,
      message: "OpenRouter connected. Balance/credit-cap data temporarily unavailable.",
    };
  }

  const creditsQuota = buildCreditsQuota(quota);
  if (creditsQuota) quotas.credits = creditsQuota;

  return {
    plan: quota.isFreeTier ? "OpenRouter (Free Tier)" : "OpenRouter",
    quotas,
    isFreeTier: quota.isFreeTier,
    usageDaily: quota.usageDaily,
    usageWeekly: quota.usageWeekly,
    usageMonthly: quota.usageMonthly,
  };
}
