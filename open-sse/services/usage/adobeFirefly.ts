/**
 * Adobe Firefly credits balance → UsageQuota for Limits page.
 *
 * Live capture (adobe/balance.txt):
 *   GET https://firefly.adobe.io/v1/credits/balance
 *   Authorization: Bearer <IMS access_token>
 *   x-api-key: SunbreakWebUI1
 *   x-account-id: <user_id from JWT>
 *
 * Response shape:
 * {
 *   total: { quota: { total, used, available }, availableUntil },
 *   credits: {
 *     firefly_free_credit: { quota: { total, used, available } },
 *     firefly_plan_credit: { quota: { total, used, available } }
 *   }
 * }
 */

import {
  fetchAdobeCreditsBalance,
  parseAdobeCreditsBalance,
  resolveAdobeAccessToken,
  type AdobeFireflyCreditsBalance,
} from "../adobeFireflyClient.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";

export { parseAdobeCreditsBalance };

export function buildAdobeFireflyCreditsQuota(
  balance: AdobeFireflyCreditsBalance
): UsageQuota {
  const total = Math.max(0, balance.total);
  const used = Math.max(0, Math.min(total, balance.used));
  const remaining =
    balance.remaining > 0 ? balance.remaining : Math.max(0, total - used);
  const remainingPercentage =
    total > 0 ? Math.round((remaining / total) * 1000) / 10 : remaining > 0 ? 100 : 0;

  const details: Array<{ name: string; used: number }> = [];
  if (balance.freeTotal > 0) {
    details.push({
      name: `Free credits (${balance.freeRemaining}/${balance.freeTotal} left)`,
      used: balance.freeUsed,
    });
  }
  if (balance.planTotal > 0) {
    details.push({
      name: `Plan credits (${balance.planRemaining}/${balance.planTotal} left)`,
      used: balance.planUsed,
    });
  }

  return {
    used,
    total,
    remaining,
    remainingPercentage,
    resetAt: parseResetTime(balance.availableUntil),
    unlimited: false,
    displayName: "Firefly credits",
    details: details.length > 0 ? details : undefined,
  };
}

export async function getAdobeFireflyUsage(
  apiKey?: string,
  accessToken?: string,
  providerSpecificData?: Record<string, unknown> | null,
  fetchImpl: typeof fetch = fetch
): Promise<
  | { quotas: UsageQuota[]; plan?: string }
  | { message: string }
> {
  try {
    const token = await resolveAdobeAccessToken(
      {
        apiKey,
        accessToken,
        providerSpecificData: providerSpecificData as {
          cookie?: unknown;
          access_token?: unknown;
          accessToken?: unknown;
        } | null,
      },
      fetchImpl
    );
    const balance = await fetchAdobeCreditsBalance(token, fetchImpl);
    if (balance.total <= 0 && balance.remaining <= 0 && balance.planTotal <= 0) {
      return {
        message:
          "Adobe Firefly returned an empty credits balance. Re-auth with a fresh Cookie or IMS access_token from firefly.adobe.com.",
      };
    }
    const quota = buildAdobeFireflyCreditsQuota(balance);
    return {
      quotas: [quota],
      plan: balance.planTotal > 0 ? "Firefly plan" : "Firefly free",
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { message: msg || "Failed to fetch Adobe Firefly credits balance" };
  }
}
