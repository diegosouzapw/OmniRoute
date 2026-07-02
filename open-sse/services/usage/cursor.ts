/**
 * usage/cursor.ts — Cursor (Pro) usage fetcher + JWT/config helpers.
 *
 * Extracted from services/usage.ts (god-file decomposition): the Cursor family — the
 * dashboard usage-API config, the WorkOS JWT `sub` decoder, and the getCursorUsage fetcher
 * that probes the cursor.com/dashboard/spending endpoint. Depends only on the sibling
 * scalar/quota leaves — no host coupling — so it lives as a co-located provider leaf.
 * usage.ts imports getCursorUsage (dispatcher). Behavior-preserving move.
 */

import { toRecord, toNumber, clampPercentage } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";

// Cursor dashboard usage API config
// The endpoint that powers https://cursor.com/dashboard/spending. Validates the WorkOS
// session via the WorkosCursorSessionToken cookie (format: `${userId}::${jwt}`) and
// rejects requests without a matching Origin/Referer (Invalid origin for state-changing request).
const CURSOR_USAGE_CONFIG = {
  usageUrl: "https://cursor.com/api/dashboard/get-current-period-usage",
  origin: "https://cursor.com",
  referer: "https://cursor.com/dashboard/spending",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
};

/**
 * Decode the `sub` claim of a Cursor JWT (the WorkOS user id).
 * Returns null if the token is not a parseable JWT.
 */
function decodeCursorJwtSub(token: string): string | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    let payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (payload.length % 4 !== 0) payload += "=";
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
    const sub = decoded?.sub;
    return typeof sub === "string" && sub.length > 0 ? sub : null;
  } catch {
    return null;
  }
}

/**
 * Cursor Pro Plan Usage
 * Fetches current-billing-cycle spend from the cursor.com dashboard API and exposes three
 * windows that mirror the cursor.com/dashboard/spending UI: Total / Auto + Composer / API.
 */
export async function getCursorUsage(accessToken: string, providerSpecificData?: unknown) {
  if (!accessToken) {
    return { message: "Cursor access token missing. Re-import the connection from Cursor IDE." };
  }

  const storedUserId = (() => {
    const raw = toRecord(providerSpecificData).userId;
    return typeof raw === "string" && raw.length > 0 ? raw : null;
  })();
  const userId = storedUserId || decodeCursorJwtSub(accessToken);

  if (!userId) {
    return {
      message: "Cursor token missing user id. Re-import the connection from Cursor IDE.",
    };
  }

  try {
    const response = await fetch(CURSOR_USAGE_CONFIG.usageUrl, {
      method: "POST",
      redirect: "manual",
      headers: {
        Cookie: `WorkosCursorSessionToken=${userId}::${accessToken}`,
        Origin: CURSOR_USAGE_CONFIG.origin,
        Referer: CURSOR_USAGE_CONFIG.referer,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": CURSOR_USAGE_CONFIG.userAgent,
      },
      body: "{}",
    });

    // 3xx redirect to WorkOS authkit means the session cookie was rejected.
    if (response.status >= 300 && response.status < 400) {
      return {
        plan: "Cursor",
        message: "Cursor session expired. Re-import the token from Cursor IDE.",
      };
    }

    if (!response.ok) {
      const errorText = (await response.text()).slice(0, 200);
      if (response.status === 401 || response.status === 403) {
        return {
          plan: "Cursor",
          message: "Cursor session unauthorized. Re-import the token from Cursor IDE.",
        };
      }
      return {
        plan: "Cursor",
        message: `Cursor usage endpoint error (${response.status}): ${errorText}`,
      };
    }

    const data = toRecord(await response.json());
    const planUsage = toRecord(data.planUsage);

    if (Object.keys(planUsage).length === 0) {
      return {
        plan: "Cursor",
        message: "Cursor connected. No active plan usage returned.",
      };
    }

    const limitCents = Math.max(0, toNumber(planUsage.limit, 0));
    const totalSpendCents = Math.max(0, toNumber(planUsage.totalSpend, 0));
    const autoPercentUsed = clampPercentage(toNumber(planUsage.autoPercentUsed, 0));
    const apiPercentUsed = clampPercentage(toNumber(planUsage.apiPercentUsed, 0));
    const totalPercentUsed = clampPercentage(toNumber(planUsage.totalPercentUsed, 0));

    // billingCycleEnd is a numeric-string in ms; coerce so parseResetTime sees a number.
    const billingCycleEndMs = toNumber(data.billingCycleEnd, 0);
    const resetAt = billingCycleEndMs > 0 ? parseResetTime(billingCycleEndMs) : null;

    // Convert cents → dollars rounded to 2 decimal places.
    const toDollars = (cents: number) => Math.round(cents) / 100;

    const limitDollars = toDollars(limitCents);
    const buildWindow = (percentUsed: number, usedCentsOverride?: number): UsageQuota => {
      const usedCents =
        typeof usedCentsOverride === "number"
          ? usedCentsOverride
          : Math.round((limitCents * percentUsed) / 100);
      const used = toDollars(Math.min(usedCents, limitCents));
      const remaining = toDollars(Math.max(limitCents - Math.min(usedCents, limitCents), 0));
      return {
        used,
        total: limitDollars,
        remaining,
        remainingPercentage: clampPercentage(100 - percentUsed),
        resetAt,
        unlimited: false,
      };
    };

    const quotas: Record<string, UsageQuota> = {
      Total: buildWindow(totalPercentUsed, totalSpendCents),
      "Auto + Composer": buildWindow(autoPercentUsed),
      API: buildWindow(apiPercentUsed),
    };

    return {
      plan: "Cursor Pro",
      quotas,
    };
  } catch (error) {
    return {
      plan: "Cursor",
      message: `Cursor connected. Unable to fetch usage: ${(error as Error).message}`,
    };
  }
}
