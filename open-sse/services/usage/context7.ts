/**
 * usage/context7.ts — Context7 rate limit quota for Provider Limits.
 *
 * GET /api/v1/search?query=react via context7QuotaFetcher; shapes ratelimit-* headers
 * into the standard `{ plan, quotas }` response.
 */

import { fetchContext7Quota, type Context7Quota } from "../context7QuotaFetcher.ts";
import { createQuotaFromUsage } from "./quota.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

function toRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

function createContext7PlanQuota(q: Context7Quota) {
  return {
    ...createQuotaFromUsage(q.used, q.total, q.resetAt),
    extraCreditsInferred: 0,
    overPlan: false,
  };
}

export async function getContext7Usage(
  connectionId: string,
  apiKey?: string,
  connection?: Record<string, unknown>
) {
  if (!connectionId) {
    return { message: "Context7: connection id unavailable." };
  }

  try {
    const resolvedConnection = apiKey
      ? {
          ...(connection || {}),
          apiKey,
          credentials: {
            ...toRecord(connection?.credentials),
            apiKey,
          },
        }
      : connection;
    const live = await fetchContext7Quota(connectionId, resolvedConnection);
    if (!live) {
      return { message: "Context7 rate limit headers unavailable." };
    }

    const q = live as Context7Quota;
    const monthly = createContext7PlanQuota(q);

    return {
      plan: "Context7 · Search Tier",
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
      message: `Context7 usage error: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`,
    };
  }
}
