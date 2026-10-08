/**
 * usage/lyceum.ts — Lyceum credit-balance usage-dashboard builder
 *
 * Leaf module (not inlined in usage.ts) that turns a LyceumQuota into the
 * `UsageQuota` row the Dashboard → Usage / Limits page renders, mirroring
 * getLlmgatewayUsage's pattern. Lyceum is pay-per-use, so a single credit
 * balance row is surfaced.
 */

import {
  fetchLyceumQuota,
  type LyceumQuota,
  LYCEUM_WINDOW_CREDITS,
} from "../lyceumQuotaFetcher.ts";
import { type UsageQuota } from "./quota.ts";

function buildCreditsQuota(quota: LyceumQuota): UsageQuota {
  const total = quota.usedCredits + quota.remainingCredits;
  return {
    used: quota.usedCredits,
    total,
    remaining: quota.remainingCredits,
    remainingPercentage: total > 0 ? Math.round((quota.remainingCredits / total) * 100) : 100,
    resetAt: null,
    unlimited: false,
    displayName: "Credits balance",
    currency: "USD",
  };
}

/**
 * Lyceum Usage — reads the credit balance from GET /billing/credits and returns
 * it as a dashboard quota row.
 */
export async function getLyceumUsage(connectionId: string, apiKey: string) {
  if (!apiKey) {
    return { message: "Lyceum API key not available. Add a key to view usage." };
  }

  const connection = { apiKey };
  const quota = (await fetchLyceumQuota(connectionId, connection)) as LyceumQuota | null;

  if (!quota) {
    return {
      plan: "Lyceum (pay-as-you-go)",
      quotas: {},
      message: "Lyceum connected. Credit balance endpoint unreachable — no balance data.",
    };
  }

  const quotas: Record<string, UsageQuota> = {
    [LYCEUM_WINDOW_CREDITS]: buildCreditsQuota(quota),
  };

  return {
    plan: "Lyceum (pay-as-you-go)",
    quotas,
    monthlyFreeCredits: quota.monthlyFreeCredits,
    purchasedCredits: quota.purchasedCredits,
  };
}
