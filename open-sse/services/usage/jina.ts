/**
 * usage/jina.ts — Jina wallet token usage for Provider Limits.
 *
 * GET /api/v1/api_key/fe_user via jinaQuotaFetcher; shapes total_balance
 * into the standard `{ plan, quotas }` response.
 */

import { fetchJinaQuota, type JinaQuotaInfo } from "../jinaQuotaFetcher.ts";
import { createQuotaFromUsage } from "./quota.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

function createJinaPlanQuota(q: JinaQuotaInfo) {
  const base = createQuotaFromUsage(q.used, q.total, null);
  return {
    ...base,
    remaining: q.remainingCredits,
    percentUsed: q.percentUsed,
    limitReached: q.limitReached,
  };
}

export async function getJinaUsage(
  connectionId: string,
  apiKey?: string,
  connection?: Record<string, unknown>
) {
  if (!connectionId) {
    return { message: "Jina: connection id unavailable." };
  }

  try {
    const resolvedConnection = apiKey ? { ...(connection || {}), apiKey } : connection;
    const live = await fetchJinaQuota(connectionId, resolvedConnection);
    if (!live) {
      return { message: "Jina API key not available or token balance unavailable." };
    }

    const q = live as JinaQuotaInfo;
    const tokens = createJinaPlanQuota(q);

    return {
      plan: "Jina · Token Balance",
      quotas: {
        tokens,
      },
      remainingCredits: q.remainingCredits,
      totalCredits: q.total,
      limitReached: q.limitReached,
    };
  } catch (error) {
    return {
      message: `Jina usage error: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`,
    };
  }
}
