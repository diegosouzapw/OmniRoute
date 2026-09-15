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
  // OpenRouter #12256 + #12468: per-key USD cap and account-level credit pool
  // both flow through this builder. Per-key limit wins; PAYG accounts without
  // a key cap report `limit: null` plus a credit pool derived from
  // `totalCredits - totalUsage`. We use `totalCredits` as the bar denominator
  // when no key limit exists and the pool is positive; a non-positive pool
  // must never fabricate a 100% bar.
  if (quota.limit === null && quota.creditBalance === null) return null;
  const hasKeyLimit = quota.limit !== null;
  const hasPositivePool =
    quota.creditBalance !== null &&
    quota.creditBalance !== undefined &&
    Number.isFinite(quota.creditBalance) &&
    quota.creditBalance > 0;
  const totalCredits =
    quota.totalCredits !== null &&
    quota.totalCredits !== undefined &&
    Number.isFinite(quota.totalCredits) &&
    quota.totalCredits > 0
      ? quota.totalCredits
      : 0;
  const total = hasKeyLimit
    ? (quota.limit ?? 0)
    : totalCredits > 0
      ? totalCredits
      : hasPositivePool
        ? quota.creditBalance!
        : 0;
  const used = hasKeyLimit
    ? quota.limit! - (quota.limitRemaining ?? quota.limit!)
    : total > 0 && hasPositivePool
      ? Math.max(0, total - (quota.creditBalance ?? 0))
      : 0;
  const remaining = hasKeyLimit
    ? (quota.limitRemaining ?? 0)
    : hasPositivePool
      ? (quota.creditBalance ?? 0)
      : 0;
  const remainingPercentage = hasKeyLimit
    ? Math.max(0, Math.min(100, Math.round((1 - quota.percentUsed) * 100)))
    : total > 0 && totalCredits > 0 && hasPositivePool
      ? Math.max(0, Math.min(100, Math.round(((quota.creditBalance ?? 0) / totalCredits) * 100)))
      : undefined;
  return {
    used,
    total,
    remaining,
    remainingPercentage,
    resetAt: quota.resetAt ?? null,
    unlimited: !hasKeyLimit && !hasPositivePool,
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
      plan: "OpenRouter (credits endpoint unreachable)",
      quotas,
      message: "OpenRouter connected. /key and /credits both unreachable — no balance data.",
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
