/**
 * usage/firecrawl.ts — Firecrawl team credit usage for Provider Limits.
 *
 * GET /v2/team/credit-usage via firecrawlQuotaFetcher; shapes remaining/plan
 * credits into the standard `{ plan, quotas }` response.
 */

import { fetchFirecrawlQuota, type FirecrawlQuota } from "../firecrawlQuotaFetcher.ts";
import { createQuotaFromUsage, parseResetTime } from "./quota.ts";

function createFirecrawlPlanQuota(q: FirecrawlQuota) {
  if (q.overPlan) {
    return {
      used: 0,
      total: q.planCredits,
      remaining: q.remainingCredits,
      remainingPercentage: q.planCredits > 0 ? (q.remainingCredits / q.planCredits) * 100 : 100,
      resetAt: parseResetTime(q.resetAt),
      unlimited: false,
      extraCreditsInferred: q.extraCreditsInferred,
      overPlan: true,
    };
  }

  return {
    ...createQuotaFromUsage(q.used, q.total, q.resetAt),
    extraCreditsInferred: 0,
    overPlan: false,
  };
}

export async function getFirecrawlUsage(connectionId: string, apiKey?: string) {
  if (!connectionId) {
    return { message: "Firecrawl: connection id unavailable." };
  }

  try {
    const live = await fetchFirecrawlQuota(connectionId, { apiKey });
    if (!live) {
      return { message: "Firecrawl API key not available or credit usage unavailable." };
    }

    const q = live as FirecrawlQuota;
    const monthly = createFirecrawlPlanQuota(q);

    return {
      plan: "Firecrawl · Monthly credits",
      quotas: {
        monthly,
      },
      remainingCredits: q.remainingCredits,
      planCredits: q.planCredits,
      extraCreditsInferred: q.extraCreditsInferred,
      overPlan: q.overPlan,
      limitReached: q.limitReached,
    };
  } catch (error) {
    return { message: `Firecrawl usage error: ${(error as Error).message}` };
  }
}
