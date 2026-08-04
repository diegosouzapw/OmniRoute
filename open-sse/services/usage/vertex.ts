/**
 * usage/vertex.ts — Vertex AI self-tracked spend usage fetcher.
 *
 * Extracted from services/usage.ts (god-file decomposition): the Vertex family —
 * Vertex AI exposes no usage/quota API for an API key or Service Account, so
 * OmniRoute self-tracks the USD it spent through the connection (summed from
 * usage_history via getConnectionSpendUsdSinceAdded) and surfaces a `spend`
 * quota entry plus a `$X used · N requests` message. Depends only on the
 * sibling scalar/quota leaves + the usageStats dynamic import — no host
 * coupling — so it lives as a co-located provider leaf. usage.ts imports
 * getVertexUsage (dispatcher + __testing). Behavior-preserving move.
 */

type JsonRecord = Record<string, unknown>;

/**
 * Vertex AI — SELF-TRACKED spend.
 *
 * Vertex AI exposes no usage/quota API for an API key or Service Account (billing/credit balance
 * lives behind the Cloud Billing API, which the proxy credential can't reach). Instead we report
 * the USD that OmniRoute has spent through this connection since the account was added — summed
 * from `usage_history` and priced via the backend pricing table. Returns a `message` (with the $
 * figure) plus a `spend` quota entry so the limits cache persists it (a message-only result is
 * treated as a transient error and not cached).
 */
export async function getVertexUsage(connectionId: string, provider: string) {
  if (!connectionId) {
    return { message: "Vertex connected. Connection id unavailable for usage tracking." };
  }
  try {
    const { getConnectionSpendUsdSinceAdded } = await import("@/lib/usage/usageStats");
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
