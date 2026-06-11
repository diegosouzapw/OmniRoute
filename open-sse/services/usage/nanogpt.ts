/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { NANOGPT_CONFIG } from "./constants.ts";
import { toRecord, toNumber, clampPercentage, parseResetTime } from "./utils.ts";
import { UsageQuota } from "./types.ts";

/**
 * NanoGPT Usage
 * Fetches subscription-level quota from the NanoGPT API.
 * Returns daily/weekly token limits and daily image limits for PRO accounts.
 */
export async function getNanoGptUsage(apiKey: string) {
  if (!apiKey) {
    return { message: "NanoGPT API key not available. Add a key to view usage." };
  }

  try {
    const res = await fetch(NANOGPT_CONFIG.usageUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      if (res.status === 401) return { message: "Invalid NanoGPT API key." };
      return { message: `NanoGPT quota API error (${res.status})` };
    }

    const data = toRecord(await res.json());
    const quotas: Record<string, UsageQuota> = {};

    // active -> PRO, otherwise FREE
    const plan = data.active ? "PRO" : "FREE";

    if (data.active) {
      // 1. Tokens limit
      // dailyInputTokens if exists, else weeklyInputTokens
      let tokenQuota = toRecord(data.dailyInputTokens);
      let tokenLabel = "Daily Tokens";
      if (!tokenQuota.resetAt) {
        const weeklyQuota = toRecord(data.weeklyInputTokens);
        if (weeklyQuota.remaining !== undefined) {
          tokenQuota = weeklyQuota;
          tokenLabel = "Weekly Tokens";
        }
      }

      if (tokenQuota.remaining !== undefined) {
        const used = toNumber(tokenQuota.used, 0);
        const remaining = toNumber(tokenQuota.remaining, 0);
        const total = used + remaining;
        quotas[tokenLabel] = {
          used,
          total,
          remaining,
          remainingPercentage: clampPercentage(100 - toNumber(tokenQuota.percentUsed, 0) * 100),
          resetAt: parseResetTime(tokenQuota.resetAt),
          unlimited: false,
        };
      }

      // 2. Images limit
      const imageQuota = toRecord(data.dailyImages);
      if (imageQuota.remaining !== undefined) {
        const used = toNumber(imageQuota.used, 0);
        const remaining = toNumber(imageQuota.remaining, 0);
        const total = used + remaining;
        quotas["Daily Images"] = {
          used,
          total,
          remaining,
          remainingPercentage: clampPercentage(100 - toNumber(imageQuota.percentUsed, 0) * 100),
          resetAt: parseResetTime(imageQuota.resetAt),
          unlimited: false,
        };
      }

      if (Object.keys(quotas).length === 0) {
        return { plan, message: "NanoGPT connected, but no active limits found." };
      }
    }

    return { plan, quotas };
  } catch (error) {
    return { message: `NanoGPT connected. Unable to fetch usage: ${(error as Error).message}` };
  }
}
