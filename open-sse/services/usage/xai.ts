/**
 * usage/xai.ts — xAI (Grok) self-tracked cumulative usage fetcher.
 *
 * Extracted from services/usage.ts (god-file decomposition): the xAI family —
 * xAI has no public per-account quota API (the billing console at console.x.ai
 * requires a session cookie, not an API key), so — exactly like the Xiaomi MiMo
 * self-track pattern — OmniRoute sums the tokens it itself routed to this
 * connection (from `usage_history`) instead of calling an upstream endpoint.
 * Unlike Xiaomi MiMo, xAI has no fixed monthly cap, so the aggregate is reported
 * as `unlimited: true` with `remaining: 100`. Depends only on the sibling
 * scalar/quota leaves + the usageStats dynamic import — no host coupling — so it
 * lives as a co-located provider leaf. usage.ts imports getXaiUsage (dispatcher
 * + __testing). Behavior-preserving move.
 */

import { type UsageQuota } from "./quota.ts";

/**
 * xAI (Grok) — SELF-TRACKED cumulative usage.
 *
 * xAI has no public per-account quota API (the billing console at console.x.ai
 * requires a session cookie, not an API key), so — exactly like the Xiaomi
 * MiMo self-track pattern above — OmniRoute sums the tokens it itself routed
 * to this connection (from `usage_history`) instead of calling an upstream
 * endpoint. Unlike Xiaomi MiMo, xAI has no fixed monthly cap, so the
 * aggregate is reported as `unlimited: true` with `remaining: 100` — this
 * renders the dashboard's green "100%" badge instead of a meaningless
 * progress bar against a `total: 0`.
 */
export async function getXaiUsage(connectionId: string) {
  if (!connectionId) {
    return { message: "xAI: connection id unavailable for self-tracked usage." };
  }
  try {
    const { getMonthlyProviderTokensForConnection } = await import("@/lib/usage/usageStats");
    const used = getMonthlyProviderTokensForConnection("xai", connectionId);
    return {
      plan: "xAI / Grok (OmniRoute-tracked)",
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
    return { message: `xAI self-tracked usage error: ${(error as Error).message}` };
  }
}
