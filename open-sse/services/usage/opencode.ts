/**
 * usage/opencode.ts — OpenCode / OpenCode Zen usage fetcher.
 *
 * Extracted from services/usage.ts (god-file decomposition): the OpenCode family —
 * delegates to the dedicated opencodeQuotaFetcher and shapes the triple-window
 * ($12/5h, $30/wk, $60/mo) result into the standard `{ plan, quotas }` usage
 * response expected by the limits page. Depends only on the sibling scalar/quota
 * leaves + fetchOpencodeQuota + sanitizeErrorMessage — no host coupling — so it
 * lives as a co-located provider leaf. usage.ts imports getOpencodeUsage
 * (dispatcher + __testing). Behavior-preserving move.
 */

import { fetchOpencodeQuota } from "../opencodeQuotaFetcher.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { type UsageQuota } from "./quota.ts";

/**
 * OpenCode Go / OpenCode / OpenCode Zen Usage
 * Delegates to the dedicated opencodeQuotaFetcher and shapes the result into
 * the standard `{ plan, quotas }` usage response expected by the limits page.
 *
 * Three rolling windows are surfaced: $12/5h, $30/wk, $60/mo.
 */
export async function getOpencodeUsage(connectionId: string, apiKey: string) {
  if (!apiKey) {
    return { message: "OpenCode API key not available. Add a key to view usage." };
  }

  try {
    const quota = await fetchOpencodeQuota(connectionId, { apiKey });

    if (!quota) {
      return {
        message: "OpenCode connected. Unable to fetch quota data from the official usage endpoint.",
      };
    }

    const { window5h, windowWeekly, windowMonthly, limitReached } = quota;

    const quotas: Record<string, UsageQuota> = {
      session: {
        used: window5h.percentUsed * 12,
        total: 12,
        remaining: (1 - window5h.percentUsed) * 12,
        remainingPercentage: (1 - window5h.percentUsed) * 100,
        resetAt: window5h.resetAt,
        unlimited: false,
        displayName: "$12 / 5-hour",
        currency: "USD",
      },
      weekly: {
        used: windowWeekly.percentUsed * 30,
        total: 30,
        remaining: (1 - windowWeekly.percentUsed) * 30,
        remainingPercentage: (1 - windowWeekly.percentUsed) * 100,
        resetAt: windowWeekly.resetAt,
        unlimited: false,
        displayName: "$30 / week",
        currency: "USD",
      },
      mcp_monthly: {
        used: windowMonthly.percentUsed * 60,
        total: 60,
        remaining: (1 - windowMonthly.percentUsed) * 60,
        remainingPercentage: (1 - windowMonthly.percentUsed) * 100,
        resetAt: windowMonthly.resetAt,
        unlimited: false,
        displayName: "$60 / month",
        currency: "USD",
      },
    };

    return {
      plan: "OpenCode Go",
      quotas,
      limitReached,
    };
  } catch (error) {
    return { message: `OpenCode error: ${sanitizeErrorMessage(error)}` };
  }
}
