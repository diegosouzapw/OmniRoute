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

function oneQuota(
  used: number,
  total: number,
  remaining: number,
  resetAt: string | null,
  displayName: string
): UsageQuota {
  const t = Math.max(0, total);
  const u = Math.max(0, Math.min(t, used));
  const r = remaining > 0 ? remaining : Math.max(0, t - u);
  const remainingPercentage =
    t > 0 ? Math.round((r / t) * 1000) / 10 : r > 0 ? 100 : 0;
  return {
    used: u,
    total: t,
    remaining: r,
    remainingPercentage,
    resetAt,
    unlimited: false,
    displayName,
  };
}

/**
 * Build a **Record** of quotas (NOT an array). providerLimits only caches when
 * `isRecord(usage.quotas)` is true — arrays are ignored and Limits stays empty.
 */
export function buildAdobeFireflyCreditsQuota(
  balance: AdobeFireflyCreditsBalance
): UsageQuota {
  const resetAt = parseResetTime(balance.availableUntil);
  return oneQuota(
    balance.used,
    balance.total,
    balance.remaining,
    resetAt,
    "Firefly credits"
  );
}

export function buildAdobeFireflyQuotasRecord(
  balance: AdobeFireflyCreditsBalance
): Record<string, UsageQuota> {
  const resetAt = parseResetTime(balance.availableUntil);
  const quotas: Record<string, UsageQuota> = {};

  // Aggregate first (what Limits primarily shows)
  if (balance.total > 0 || balance.remaining > 0) {
    quotas["firefly_total"] = oneQuota(
      balance.used,
      balance.total,
      balance.remaining,
      resetAt,
      "Firefly credits"
    );
  }
  if (balance.freeTotal > 0) {
    quotas["firefly_free"] = oneQuota(
      balance.freeUsed,
      balance.freeTotal,
      balance.freeRemaining,
      resetAt,
      "Free credits"
    );
  }
  if (balance.planTotal > 0) {
    quotas["firefly_plan"] = oneQuota(
      balance.planUsed,
      balance.planTotal,
      balance.planRemaining,
      resetAt,
      "Plan credits"
    );
  }

  // Fallback if all zeros but we still got a parse
  if (Object.keys(quotas).length === 0) {
    quotas["firefly_total"] = oneQuota(0, 0, 0, resetAt, "Firefly credits");
  }
  return quotas;
}

export async function getAdobeFireflyUsage(
  apiKey?: string,
  accessToken?: string,
  providerSpecificData?: Record<string, unknown> | null,
  fetchImpl: typeof fetch = fetch
): Promise<
  | { quotas: Record<string, UsageQuota>; plan?: string }
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
    if (balance.total <= 0 && balance.remaining <= 0 && balance.planTotal <= 0 && balance.freeTotal <= 0) {
      return {
        message:
          "Adobe Firefly returned an empty credits balance. Paste a fresh IMS access_token JWT (Authorization: Bearer on firefly-3p generate/discovery) from a signed-in session — not firefly.adobe.com page cookies alone.",
      };
    }
    return {
      quotas: buildAdobeFireflyQuotasRecord(balance),
      plan: balance.planTotal > 0 ? "Firefly plan" : "Firefly free",
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // Surface a short Limits-friendly message for guest/cookie failures
    if (/guest|GUEST|Bearer|session cookies are empty|token invalid/i.test(msg)) {
      return {
        message:
          "Adobe Firefly Limits need a signed-in IMS JWT. Open firefly.adobe.com → F12 → Network → firefly-3p → Authorization → copy token after Bearer (eyJ…). Page Cookie alone only mints a guest token.",
      };
    }
    return { message: msg || "Failed to fetch Adobe Firefly credits balance" };
  }
}
