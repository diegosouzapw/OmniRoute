/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { fetchOpencodeQuota, type OpencodeTripleWindowQuota } from "../opencodeQuotaFetcher.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { UsageQuota } from "./types.ts";

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
    const quota = (await fetchOpencodeQuota(connectionId, {
      apiKey,
    })) as OpencodeTripleWindowQuota | null;

    if (!quota) {
      return { message: "OpenCode connected. Unable to fetch quota data." };
    }

    const { window5h, windowWeekly, windowMonthly, limitReached } = quota;

    const quotas: Record<string, UsageQuota> = {};

    // $12 / 5-hour rolling window
    quotas["window_5h"] = {
      used: window5h.percentUsed * 12,
      total: 12,
      remaining: (1 - window5h.percentUsed) * 12,
      remainingPercentage: (1 - window5h.percentUsed) * 100,
      resetAt: window5h.resetAt,
      unlimited: false,
      displayName: "$12 / 5-hour",
      currency: "USD",
    };

    // $30 / weekly window
    quotas["window_weekly"] = {
      used: windowWeekly.percentUsed * 30,
      total: 30,
      remaining: (1 - windowWeekly.percentUsed) * 30,
      remainingPercentage: (1 - windowWeekly.percentUsed) * 100,
      resetAt: windowWeekly.resetAt,
      unlimited: false,
      displayName: "$30 / week",
      currency: "USD",
    };

    // $60 / monthly window
    quotas["window_monthly"] = {
      used: windowMonthly.percentUsed * 60,
      total: 60,
      remaining: (1 - windowMonthly.percentUsed) * 60,
      remainingPercentage: (1 - windowMonthly.percentUsed) * 100,
      resetAt: windowMonthly.resetAt,
      unlimited: false,
      displayName: "$60 / month",
      currency: "USD",
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
