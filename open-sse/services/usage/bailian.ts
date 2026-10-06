/**
 * usage/bailian.ts — Bailian (Alibaba Token Plan) usage fetcher.
 *
 * Extracted from services/usage.ts (god-file decomposition): the Bailian family —
 * delegates to the dedicated bailianQuotaFetcher and shapes the triple-window
 * (5h, weekly, monthly) worst-case quota into the standard usage response.
 * Depends only on the sibling scalar/quota leaves + fetchBailianQuota — no host
 * coupling — so it lives as a co-located provider leaf. usage.ts imports
 * getBailianCodingPlanUsage (dispatcher). Behavior-preserving move.
 */

import { fetchBailianQuota, type BailianTripleWindowQuota } from "../bailianQuotaFetcher.ts";
import { getQwenTokenPlanUsage } from "./qwen-token-plan.ts";

/**
 * Bailian (Alibaba Token Plan) Usage
 * Fetches triple-window quota (5h, weekly, monthly) and returns worst-case.
 */
export async function getBailianCodingPlanUsage(
  connectionId: string,
  apiKey: string,
  providerSpecificData?: Record<string, unknown>
) {
  try {
    // The catalog entry is "Alibaba Token Plan" and now points at the Token Plan
    // endpoint, so prefer the Token Plan quota (console cookie) when one is
    // configured. The Coding Plan path below stays as the fallback for accounts
    // that really do hold a Coding Plan key (#9603).
    const tokenPlanUsage = await getQwenTokenPlanUsage(
      connectionId,
      apiKey,
      providerSpecificData,
      "bailian-coding-plan"
    );
    if ("quotas" in tokenPlanUsage) return tokenPlanUsage;

    const connection = { apiKey, providerSpecificData };
    const quota = await fetchBailianQuota(connectionId, connection);

    if (!quota) {
      // Neither surface answered — surface the Token Plan guidance, which tells the
      // operator how to supply the cookie the console gateway requires.
      return tokenPlanUsage;
    }

    const bailianQuota = quota as BailianTripleWindowQuota;
    const used = bailianQuota.used;
    const total = bailianQuota.total;
    const remaining = Math.max(0, total - used);
    const remainingPercentage = Math.round(remaining);

    return {
      plan: "Alibaba Token Plan",
      used,
      total,
      remaining,
      remainingPercentage,
      resetAt: bailianQuota.resetAt,
      unlimited: false,
      displayName: "Alibaba Token Plan",
    };
  } catch (error) {
    return { message: `Alibaba Token Plan error: ${(error as Error).message}` };
  }
}
