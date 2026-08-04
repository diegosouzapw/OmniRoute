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
    const connection = { apiKey, providerSpecificData };
    const quota = await fetchBailianQuota(connectionId, connection);

    if (!quota) {
      return { message: "Alibaba Token Plan connected. Unable to fetch quota." };
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
