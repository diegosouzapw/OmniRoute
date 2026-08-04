/**
 * usage/xiaomi-mimo.ts — Xiaomi MiMo self-tracked monthly quota fetcher.
 *
 * Extracted from services/usage.ts (god-file decomposition): the Xiaomi MiMo family —
 * Xiaomi exposes plan usage only behind the console session cookie (the API key
 * cannot reach the `tokenPlan/usage` endpoint), so OmniRoute self-tracks the
 * tokens it routed to the connection in the current UTC month (from usage_history)
 * and compares them to the known Token Plan monthly limit. Depends only on the
 * sibling scalar/quota leaves + the usageStats dynamic import — no host coupling
 * — so it lives as a co-located provider leaf. usage.ts imports getXiaomiMimoUsage
 * (dispatcher + __testing). Behavior-preserving move.
 */

import { createQuotaFromUsage } from "./quota.ts";

// Xiaomi MiMo Token Plan monthly limit (tokens). Keep in sync with the
// "xiaomi-mimo" preset in src/lib/quota/planRegistry.ts.
const XIAOMI_MIMO_MONTHLY_TOKEN_LIMIT = 4_100_000_000;

/**
 * Xiaomi MiMo — SELF-TRACKED monthly quota.
 *
 * Xiaomi exposes plan usage only behind the console session cookie (the API key
 * cannot reach the `tokenPlan/usage` endpoint), so there is no upstream usage
 * API to call. Instead we count the tokens OmniRoute itself routed to this
 * connection in the current UTC month (from `usage_history`) and compare them
 * to the known Token Plan monthly limit. This reflects only traffic that went
 * through OmniRoute, not the provider's own dashboard figure.
 */
export async function getXiaomiMimoUsage(connectionId: string) {
  if (!connectionId) {
    return { message: "Xiaomi MiMo: connection id unavailable for self-tracked quota." };
  }
  try {
    const { getMonthlyProviderTokensForConnection } = await import("@/lib/usage/usageStats");
    const used = getMonthlyProviderTokensForConnection("xiaomi-mimo", connectionId);
    const total = XIAOMI_MIMO_MONTHLY_TOKEN_LIMIT;
    const now = new Date();
    const resetAt = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
    ).toISOString();
    return {
      plan: "Xiaomi MiMo Token Plan (OmniRoute-tracked)",
      quotas: {
        monthly: createQuotaFromUsage(used, total, resetAt),
      },
    };
  } catch (error) {
    return { message: `Xiaomi MiMo self-tracked usage error: ${(error as Error).message}` };
  }
}
