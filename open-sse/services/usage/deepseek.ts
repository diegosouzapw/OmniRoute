/**
 * usage/deepseek.ts — DeepSeek usage fetcher.
 *
 * Extracted from services/usage.ts (god-file decomposition): the DeepSeek family —
 * delegates to the dedicated deepseekQuotaFetcher and shapes the balance result
 * into the standard `{ plan, quotas }` usage response (all balances surfaced as
 * credits-style entries). Depends only on the sibling scalar/quota leaves +
 * fetchDeepseekQuota — no host coupling — so it lives as a co-located provider
 * leaf. usage.ts imports getDeepseekUsage (dispatcher). Behavior-preserving move.
 */

import { fetchDeepseekQuota, type DeepseekQuota } from "../deepseekQuotaFetcher.ts";
import { type UsageQuota } from "./quota.ts";

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
