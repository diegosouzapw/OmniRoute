/**
 * usage/cursor.ts — Cursor (Pro) usage fetcher + JWT/config helpers.
 *
 * Prefer Bearer APIs on api2.cursor.sh (works with deep-control PKCE JWTs).
 * Fall back to the cookie-based cursor.com dashboard endpoint for IDE-imported
 * WorkOS sessions. OpenCodex-compatible chain:
 *   GetCurrentPeriodUsage → /api/usage/summary → /auth/usage → cookie dashboard.
 */

import { toRecord, toNumber, clampPercentage } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";

const REQUEST_TIMEOUT_MS = 12_000;

const CURSOR_API2 = "https://api2.cursor.sh";
const CURSOR_PERIOD_USAGE_URL = `${CURSOR_API2}/aiserver.v1.DashboardService/GetCurrentPeriodUsage`;
const CURSOR_USAGE_SUMMARY_URL = `${CURSOR_API2}/api/usage/summary`;
const CURSOR_AUTH_USAGE_URL = `${CURSOR_API2}/auth/usage`;

/** Legacy IDE/session cookie path (last resort). */
const CURSOR_COOKIE_USAGE_CONFIG = {
  usageUrl: "https://cursor.com/api/dashboard/get-current-period-usage",
  origin: "https://cursor.com",
  referer: "https://cursor.com/dashboard/spending",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
};

const REAUTH_HINT = "Use Cursor Login (PKCE) or re-import the connection from Cursor IDE.";

export type CursorUsageResult = {
  plan?: string;
  quotas?: Record<string, UsageQuota>;
  message?: string;
};

/**
 * Decode the `sub` claim of a Cursor JWT (the WorkOS user id).
 * Returns null if the token is not a parseable JWT.
 */
export function decodeCursorJwtSub(token: string): string | null {
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

function bearerHeaders(accessToken: string): Record<string, string> {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
    "User-Agent": "omniroute-cursor-quota",
  };
}

function toDollars(cents: number): number {
  return Math.round(cents) / 100;
}

function buildPlanUsageQuotas(
  planUsage: Record<string, unknown>,
  billingCycleEnd: unknown
): Record<string, UsageQuota> | null {
  const limitCents = Math.max(
    0,
    toNumber(planUsage.limit ?? planUsage.limitCents ?? planUsage.totalLimitCents, 0)
  );
  const includedSpendRaw = toNumber(
    planUsage.includedSpend ?? planUsage.usedCents ?? planUsage.used,
    NaN
  );
  const totalSpendCents = Number.isFinite(includedSpendRaw)
    ? Math.max(0, includedSpendRaw)
    : Math.max(0, toNumber(planUsage.totalSpend, 0));

  const rawTotalPct = toNumber(planUsage.totalPercentUsed ?? planUsage.percentUsed, NaN);
  let totalPercentUsed: number;
  if (Number.isFinite(rawTotalPct)) {
    totalPercentUsed = clampPercentage(rawTotalPct);
  } else if (limitCents > 0) {
    totalPercentUsed = clampPercentage((totalSpendCents / limitCents) * 100);
  } else {
    return null;
  }

  const autoPercentUsed = clampPercentage(toNumber(planUsage.autoPercentUsed, 0));
  const apiPercentUsed = clampPercentage(toNumber(planUsage.apiPercentUsed, 0));
  const effectiveLimitCents = limitCents > 0 ? limitCents : 100;

  const billingCycleEndMs = toNumber(billingCycleEnd, 0);
  const resetAt = billingCycleEndMs > 0 ? parseResetTime(billingCycleEndMs) : null;
  const limitDollars = toDollars(effectiveLimitCents);

  const buildWindow = (percentUsed: number, usedCentsOverride?: number): UsageQuota => {
    const usedCents =
      typeof usedCentsOverride === "number"
        ? usedCentsOverride
        : Math.round((effectiveLimitCents * percentUsed) / 100);
    const clampedUsed = Math.min(usedCents, effectiveLimitCents);
    return {
      used: toDollars(clampedUsed),
      total: limitDollars,
      remaining: toDollars(Math.max(effectiveLimitCents - clampedUsed, 0)),
      remainingPercentage: clampPercentage(100 - percentUsed),
      resetAt,
      unlimited: false,
    };
  };

  return {
    Total: buildWindow(totalPercentUsed, limitCents > 0 ? totalSpendCents : undefined),
    "Auto + Composer": buildWindow(autoPercentUsed),
    API: buildWindow(apiPercentUsed),
  };
}

async function fetchJson(
  url: string,
  init: RequestInit
): Promise<{ ok: true; data: Record<string, unknown> } | { ok: false }> {
  try {
    const response = await fetch(url, {
      ...init,
      signal: init.signal ?? AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) return { ok: false };
    const data = toRecord(await response.json().catch(() => null));
    if (Object.keys(data).length === 0) return { ok: false };
    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}

function tryPeriodUsage(data: Record<string, unknown>): CursorUsageResult | null {
  const planUsage = toRecord(data.planUsage);
  if (Object.keys(planUsage).length === 0) return null;
  const quotas = buildPlanUsageQuotas(planUsage, data.billingCycleEnd ?? planUsage.billingCycleEnd);
  if (!quotas) return null;
  return { plan: "Cursor Pro", quotas };
}

function tryUsageSummary(data: Record<string, unknown>): CursorUsageResult | null {
  const individual = toRecord(data.individualUsage);
  const plan = toRecord(individual.plan);
  if (Object.keys(plan).length === 0) return null;
  const used = toNumber(plan.used, NaN);
  const limit = toNumber(plan.limit, NaN);
  const percent = clampPercentage(
    toNumber(
      plan.totalPercentUsed,
      Number.isFinite(used) && Number.isFinite(limit) && limit > 0 ? (used / limit) * 100 : NaN
    )
  );
  if (
    !Number.isFinite(toNumber(plan.totalPercentUsed, NaN)) &&
    !(Number.isFinite(used) && limit > 0)
  ) {
    return null;
  }
  const quotas = buildPlanUsageQuotas(
    {
      limit: Number.isFinite(limit) ? limit : 100,
      totalSpend: Number.isFinite(used) ? used : Math.round(percent),
      totalPercentUsed: percent,
      autoPercentUsed: percent,
      apiPercentUsed: 0,
    },
    data.billingCycleEnd
  );
  if (!quotas) return null;
  return { plan: "Cursor Pro", quotas };
}

function tryAuthUsage(data: Record<string, unknown>): CursorUsageResult | null {
  let used: number | undefined;
  let limit: number | undefined;
  const gpt4 = toRecord(data["gpt-4"]);
  if (Object.keys(gpt4).length > 0) {
    used = toNumber(gpt4.numRequests ?? gpt4.used, NaN);
    limit = toNumber(gpt4.maxRequestUsage ?? gpt4.limit ?? gpt4.maxRequests, NaN);
  }
  if (!Number.isFinite(used) || !Number.isFinite(limit) || (limit as number) <= 0) {
    for (const [key, value] of Object.entries(data)) {
      if (key === "startOfMonth" || key === "billingCycleStart") continue;
      const bucket = toRecord(value);
      if (Object.keys(bucket).length === 0) continue;
      const bucketUsed = toNumber(bucket.numRequests ?? bucket.used, NaN);
      const bucketLimit = toNumber(
        bucket.maxRequestUsage ?? bucket.limit ?? bucket.maxRequests,
        NaN
      );
      if (Number.isFinite(bucketUsed) && Number.isFinite(bucketLimit) && bucketLimit > 0) {
        used = bucketUsed;
        limit = bucketLimit;
        break;
      }
    }
  }
  if (!Number.isFinite(used) || !Number.isFinite(limit) || (limit as number) <= 0) return null;
  const percent = clampPercentage(((used as number) / (limit as number)) * 100);
  const startOfMonth = parseResetTime(data.startOfMonth ?? data.billingCycleStart);
  let monthlyResetAt: string | null = null;
  if (startOfMonth) {
    const start = new Date(startOfMonth);
    monthlyResetAt = new Date(
      Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, start.getUTCDate())
    ).toISOString();
  }
  const limitNum = limit as number;
  const usedNum = used as number;
  return {
    plan: "Cursor Pro",
    quotas: {
      Total: {
        used: usedNum,
        total: limitNum,
        remaining: Math.max(limitNum - usedNum, 0),
        remainingPercentage: clampPercentage(100 - percent),
        resetAt: monthlyResetAt,
        unlimited: false,
      },
    },
  };
}

async function fetchCookieDashboardUsage(
  accessToken: string,
  userId: string
): Promise<CursorUsageResult> {
  try {
    const response = await fetch(CURSOR_COOKIE_USAGE_CONFIG.usageUrl, {
      method: "POST",
      redirect: "manual",
      headers: {
        Cookie: `WorkosCursorSessionToken=${userId}::${accessToken}`,
        Origin: CURSOR_COOKIE_USAGE_CONFIG.origin,
        Referer: CURSOR_COOKIE_USAGE_CONFIG.referer,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": CURSOR_COOKIE_USAGE_CONFIG.userAgent,
      },
      body: "{}",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (response.status >= 300 && response.status < 400) {
      return {
        plan: "Cursor",
        message: `Cursor session expired. ${REAUTH_HINT}`,
      };
    }

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return {
          plan: "Cursor",
          message: `Cursor session unauthorized. ${REAUTH_HINT}`,
        };
      }
      return {
        plan: "Cursor",
        message: `Cursor usage endpoint error (${response.status}). ${REAUTH_HINT}`,
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
    const quotas = buildPlanUsageQuotas(planUsage, data.billingCycleEnd);
    if (!quotas) {
      return {
        plan: "Cursor",
        message: "Cursor connected. No active plan usage returned.",
      };
    }
    return { plan: "Cursor Pro", quotas };
  } catch (error) {
    return {
      plan: "Cursor",
      message: `Cursor connected. Unable to fetch usage: ${(error as Error).message}`,
    };
  }
}

/**
 * Cursor Pro Plan Usage — Bearer APIs first (PKCE), cookie dashboard last (IDE import).
 */
export async function getCursorUsage(
  accessToken: string,
  providerSpecificData?: unknown
): Promise<CursorUsageResult> {
  if (!accessToken) {
    return { message: `Cursor access token missing. ${REAUTH_HINT}` };
  }

  const auth = bearerHeaders(accessToken);

  const period = await fetchJson(CURSOR_PERIOD_USAGE_URL, {
    method: "POST",
    headers: {
      ...auth,
      "Content-Type": "application/json",
      "Connect-Protocol-Version": "1",
    },
    body: "{}",
  });
  if (period.ok) {
    const mapped = tryPeriodUsage(period.data);
    if (mapped) return mapped;
  }

  const summary = await fetchJson(CURSOR_USAGE_SUMMARY_URL, {
    method: "GET",
    headers: auth,
  });
  if (summary.ok) {
    const mapped = tryUsageSummary(summary.data);
    if (mapped) return mapped;
  }

  const authUsage = await fetchJson(CURSOR_AUTH_USAGE_URL, {
    method: "GET",
    headers: auth,
  });
  if (authUsage.ok) {
    const mapped = tryAuthUsage(authUsage.data);
    if (mapped) return mapped;
  }

  const storedUserId = (() => {
    const raw = toRecord(providerSpecificData).userId;
    return typeof raw === "string" && raw.length > 0 ? raw : null;
  })();
  const userId = storedUserId || decodeCursorJwtSub(accessToken);

  if (!userId) {
    return {
      plan: "Cursor",
      message: `Cursor usage unavailable via API and token has no user id for cookie fallback. ${REAUTH_HINT}`,
    };
  }

  return fetchCookieDashboardUsage(accessToken, userId);
}
