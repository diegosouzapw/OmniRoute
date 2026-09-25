/**
 * usage/tavily.ts — Tavily credit usage for Provider Limits.
 *
 * GET /usage via tavilyQuotaFetcher; shapes remaining/plan credits into the
 * standard `{ plan, quotas }` response.
 */

import { fetchTavilyQuota, getTavilyBaseUrl, type TavilyQuota } from "../tavilyQuotaFetcher.ts";
import { createQuotaFromUsage } from "./quota.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

function createTavilyPlanQuota(q: TavilyQuota) {
  const base = createQuotaFromUsage(q.used, q.total, q.resetAt);
  return {
    ...base,
    extraCreditsInferred: q.extraCreditsInferred,
    overPlan: q.overPlan,
  };
}

export async function getTavilyUsage(
  connectionId: string,
  apiKey?: string,
  connection?: Record<string, unknown>
) {
  if (!connectionId) {
    return { message: "Tavily: connection id unavailable." };
  }

  const customBase = getTavilyBaseUrl(connection);
  if (customBase) {
    return {
      plan: "Tavily · Self-Hosted Local",
      quotas: {},
      message: `Connected to self-hosted Tavily instance (${customBase})`,
    };
  }

  try {
    const resolvedConnection = apiKey ? { ...(connection || {}), apiKey } : connection;
    const live = await fetchTavilyQuota(connectionId, resolvedConnection);
    if (!live) {
      return { message: "Tavily API key not available or credit usage unavailable." };
    }

    const q = live as TavilyQuota;
    const monthly = createTavilyPlanQuota(q);

    return {
      plan: `Tavily · ${q.planName || "Researcher"}`,
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
    return {
      message: `Tavily usage error: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`,
    };
  }
}
