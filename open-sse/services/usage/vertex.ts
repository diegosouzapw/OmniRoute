/**
 * Vertex AI usage fetcher
 */

import type { JsonRecord } from "./types.ts";
import { getConnectionSpendUsdSinceAdded } from "@/lib/usage/usageStats.ts";

export async function getVertexUsage(connectionId: string, provider: string) {
  if (!connectionId) {
    return { message: "Vertex connected. Connection id unavailable for usage tracking." };
  }
  try {
    const { costUsd, requests } = await getConnectionSpendUsdSinceAdded(provider, connectionId);

    const spend: JsonRecord = {
      used: Number(costUsd.toFixed(6)),
      displayName: "Spend (USD)",
      quotaSource: "localUsageHistory",
      resetAt: null,
      unlimited: false,
    };

    if (requests === 0) {
      return {
        plan: "Vertex AI",
        message: "Vertex connected. No usage recorded through OmniRoute yet for this account.",
        quotas: { spend },
      };
    }

    const costStr = costUsd >= 1 ? costUsd.toFixed(2) : costUsd.toFixed(4);
    return {
      plan: "Vertex AI",
      message: `$${costStr} used since this account was added \u00b7 ${requests} request${
        requests === 1 ? "" : "s"
      }`,
      quotas: { spend },
    };
  } catch (error) {
    return { message: `Vertex usage tracking error: ${(error as Error).message}` };
  }
}
