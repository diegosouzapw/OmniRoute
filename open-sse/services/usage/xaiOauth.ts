/**
 * usage/xaiOauth.ts — xAI OAuth (Grok) weekly quota fetcher.
 *
 * Extracted from services/usage.ts (god-file decomposition): the xAI OAuth
 * variant uses a live billing endpoint (`cli-chat-proxy.grok.com/v1/billing`)
 * with the connection's OAuth access token, falling back to OmniRoute's own
 * self-tracked token totals when the live quota is unavailable.
 *
 * `creditUsagePercent` is percent **used** (0–100), matching grok.com Usage.
 */

import { type UsageQuota, createQuotaFromUsage } from "./quota.ts";

type JsonRecord = Record<string, unknown>;
type UsageProviderConnection = JsonRecord & {
  id?: string;
  provider?: string;
  accessToken?: string;
  apiKey?: string;
  providerSpecificData?: JsonRecord;
  projectId?: string;
  email?: string;
};

/**
 * Weekly quota for xAI OAuth (Grok) — live credit pool.
 *
 * Same billing endpoint as grok-web / Grok CLI usage
 * (`cli-chat-proxy.grok.com/v1/billing?format=credits`) using the connection
 * OAuth access token (not ~/.grok/auth.json).
 * `creditUsagePercent` is percent **used** (0–100), matching grok.com Usage.
 */
export async function getXaiOauthUsage(
  connectionId: string,
  accessToken?: string,
  connection?: UsageProviderConnection
) {
  if (!connectionId) {
    return { message: "xAI OAuth: connection id unavailable." };
  }

  try {
    const { fetchXaiOauthQuota } = await import("../xaiOauthQuotaFetcher.ts");
    const live = await fetchXaiOauthQuota(connectionId, {
      ...(connection || {}),
      accessToken: accessToken || connection?.accessToken,
      credentials: {
        accessToken: accessToken || connection?.accessToken,
      },
    } as Record<string, unknown>);

    if (live && typeof live.percentUsed === "number") {
      // QuotaInfo.percentUsed is a 0–1 fraction used
      const usedPct = Math.round(Math.min(100, Math.max(0, live.percentUsed * 100)));
      return {
        plan: "xAI OAuth (Grok) · Weekly",
        quotas: {
          weekly: createQuotaFromUsage(usedPct, 100, live.resetAt ?? null),
        },
      };
    }
  } catch (error) {
    console.warn(
      "[usage] xai-oauth live quota failed, falling back to self-track:",
      (error as Error)?.message || error
    );
  }

  try {
    const { getMonthlyProviderTokensForConnection } = await import("@/lib/usage/usageStats");
    const used =
      getMonthlyProviderTokensForConnection("xai-oauth", connectionId) ||
      getMonthlyProviderTokensForConnection("xao", connectionId) ||
      0;
    return {
      plan: "xAI OAuth (Grok) · OmniRoute-tracked",
      message: "Live weekly quota unavailable; showing OmniRoute-routed token totals only.",
      quotas: {
        monthly: {
          used,
          total: 0,
          remaining: 100,
          remainingPercentage: 100,
          resetAt: null,
          unlimited: true,
        } as UsageQuota,
      },
    };
  } catch (error) {
    return { message: `xAI OAuth usage error: ${(error as Error).message}` };
  }
}
