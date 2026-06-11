/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { fetchBailianQuota, type BailianTripleWindowQuota } from "../bailianQuotaFetcher.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";




/**
 * Bailian (Alibaba Coding Plan) Usage
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
      return { message: "Bailian Coding Plan connected. Unable to fetch quota." };
    }

    const bailianQuota = quota as BailianTripleWindowQuota;
    const used = bailianQuota.used;
    const total = bailianQuota.total;
    const remaining = Math.max(0, total - used);
    const remainingPercentage = Math.round(remaining);

    return {
      plan: "Alibaba Coding Plan",
      used,
      total,
      remaining,
      remainingPercentage,
      resetAt: bailianQuota.resetAt,
      unlimited: false,
      displayName: "Alibaba Coding Plan",
    };
  } catch (error) {
    return { message: `Bailian Coding Plan error: ${(error as Error).message}` };
  }
}

