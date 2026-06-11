/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { fetchDeepseekQuota, type DeepseekQuota } from "../deepseekQuotaFetcher.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { UsageQuota } from "./types.ts";

/**
 * DeepSeek Usage
 * Fetches balance from the DeepSeek balance API.
 * Returns all balances (USD and CNY) as "credits" for credits-style UI display.
 */
export async function getDeepseekUsage(connectionId: string, apiKey: string) {
  try {
    const connection = { apiKey };
    const quota = await fetchDeepseekQuota(connectionId, connection);

    if (!quota) {
      return { message: "DeepSeek API key not available. Add a key to view usage." };
    }

    const deepseekQuota = quota as DeepseekQuota;
    const { balances, isAvailable, limitReached } = deepseekQuota;

    const quotas: Record<string, UsageQuota> = {};

    // Show all balances as credits-style entries (e.g., credits_usd, credits_cny)
    // The UI will display them as "🪙 Balance (USD) $50.00"
    for (const balanceInfo of balances) {
      const key = `credits_${balanceInfo.currency.toLowerCase()}`;
      quotas[key] = {
        used: 0,
        total: 0,
        remaining: balanceInfo.balance,
        remainingPercentage: 100,
        resetAt: null,
        unlimited: true,
        currency: balanceInfo.currency,
        grantedBalance: balanceInfo.grantedBalance,
        toppedUpBalance: balanceInfo.toppedUpBalance,
      };
    }

    const plan = isAvailable ? "DeepSeek" : "DeepSeek (Insufficient Balance)";

    return {
      plan,
      quotas,
      isAvailable,
      limitReached,
    };
  } catch (error) {
    return { message: `DeepSeek error: ${(error as Error).message}` };
  }
}
