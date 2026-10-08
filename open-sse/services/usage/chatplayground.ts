/**
 * ChatPlayground billing & query quota fetcher for Limits page.
 *
 * Calls GET https://app.chatplayground.ai/api/user with auto-minted Clerk JWT.
 * Lifetime subscription provides 300 credits daily.
 */
import { type UsageQuota } from "./quota.ts";
import { resolveChatPlaygroundAuth } from "../chatplaygroundAuth.ts";
import { CHATPLAYGROUND_USER_URL } from "../chatplaygroundModels.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

export interface ChatPlaygroundUsageResult {
  plan: string;
  quotas: Record<"daily" | "credits", UsageQuota>;
  message?: string | null;
}

type ChatPlaygroundSubscription = {
  key?: string;
  name?: string;
  fullName?: string;
  proMaxQueries?: number;
  unlimited?: { queries?: boolean };
};

export type ChatPlaygroundUser = {
  name?: string;
  email?: string;
  proQueriesCount?: number;
  basicQueriesCount?: number;
  advancedQueriesCount?: number;
  dailyQueriesCount?: number;
  lastDailyQueryDate?: string;
  stripeSubscriptionId?: string;
  stripeCurrentPeriodEnd?: string;
  appsumoLicenseKey?: string | null;
  appsumoLicenseTier?: string | null;
  subscription?: ChatPlaygroundSubscription;
};

export type ChatPlaygroundPlanClass = {
  resolvedPlan: string;
  total: number;
  used: number;
  displayName: string;
  isDailyReset: boolean;
};

function remainingPct(remaining: number, total: number): number {
  return total > 0 ? Math.round((remaining / total) * 1000) / 10 : 0;
}

function nextUtcMidnightIso(): string {
  const nextMidnight = new Date();
  nextMidnight.setUTCHours(24, 0, 0, 0);
  return nextMidnight.toISOString();
}

function isUnlimitedAccount(sub: ChatPlaygroundSubscription, planLower: string): boolean {
  return (
    sub.unlimited?.queries === true ||
    (sub.name || "").toLowerCase() === "unlimited" ||
    planLower.includes("unlimited") ||
    (typeof sub.proMaxQueries === "number" && sub.proMaxQueries >= 99999)
  );
}

function isLifetimeAccount(
  user: ChatPlaygroundUser,
  planLower: string,
  sub: ChatPlaygroundSubscription
): boolean {
  const stripeId = user.stripeSubscriptionId;
  return (
    planLower.includes("lifetime") ||
    (sub.key || "").toLowerCase().includes("lifetime") ||
    Boolean(user.appsumoLicenseKey) ||
    Boolean(user.appsumoLicenseTier) ||
    (typeof stripeId === "string" && stripeId.toLowerCase().includes("lifetime"))
  );
}

function isProAccount(
  planLower: string,
  appsumoTier: string,
  sub: ChatPlaygroundSubscription
): boolean {
  const cap = sub.proMaxQueries;
  return (
    planLower.includes("pro") ||
    appsumoTier.includes("pro") ||
    (typeof cap === "number" && cap >= 1500 && cap < 99999)
  );
}

function isBasicAccount(
  planLower: string,
  appsumoTier: string,
  sub: ChatPlaygroundSubscription
): boolean {
  const cap = sub.proMaxQueries;
  return (
    planLower.includes("basic") ||
    appsumoTier.includes("basic") ||
    (typeof cap === "number" && cap > 0 && cap <= 500)
  );
}

function resolveProAllowance(sub: ChatPlaygroundSubscription, lifetime: boolean): number {
  const cap = sub.proMaxQueries;
  if (typeof cap === "number" && cap > 0 && cap < 99999) return cap;
  return lifetime ? 2000 : 1500;
}

function resolveBasicAllowance(sub: ChatPlaygroundSubscription): number {
  const cap = sub.proMaxQueries;
  if (typeof cap === "number" && cap > 0) return cap;
  return 500;
}

function resolveFreeAllowance(sub: ChatPlaygroundSubscription): number {
  const cap = sub.proMaxQueries;
  if (typeof cap === "number" && cap < 99999) return cap;
  return 0;
}

function firstCount(...vals: Array<number | undefined>): number {
  for (const value of vals) {
    if (typeof value === "number") return Math.max(0, value);
  }
  return 0;
}

function lifetimeLabel(lifetime: boolean, name: string): string {
  return lifetime ? `Lifetime ${name}` : name;
}

function readRawPlanName(sub: ChatPlaygroundSubscription): string {
  if (typeof sub.fullName === "string" && sub.fullName.trim()) return sub.fullName.trim();
  if (typeof sub.name === "string" && sub.name.trim()) return sub.name.trim();
  return "Free";
}

function monthlyPlanClass(
  resolvedPlan: string,
  total: number,
  used: number
): ChatPlaygroundPlanClass {
  return {
    resolvedPlan,
    total,
    used,
    displayName: `Monthly Queries (${total.toLocaleString()}/mo)`,
    isDailyReset: false,
  };
}

export function classifyChatPlaygroundPlan(user: ChatPlaygroundUser): ChatPlaygroundPlanClass {
  const sub = user.subscription || {};
  const rawPlan = readRawPlanName(sub);
  const planLower = rawPlan.toLowerCase();
  const appsumoTier =
    typeof user.appsumoLicenseTier === "string" ? user.appsumoLicenseTier.toLowerCase() : "";
  const lifetime = isLifetimeAccount(user, planLower, sub);

  if (isUnlimitedAccount(sub, planLower)) {
    return {
      resolvedPlan: lifetimeLabel(lifetime, "Unlimited"),
      total: 300,
      used: firstCount(user.dailyQueriesCount),
      displayName: "Daily Credits (300/day)",
      isDailyReset: true,
    };
  }
  if (isProAccount(planLower, appsumoTier, sub)) {
    return monthlyPlanClass(
      lifetimeLabel(lifetime, "Pro"),
      resolveProAllowance(sub, lifetime),
      firstCount(user.proQueriesCount, user.advancedQueriesCount)
    );
  }
  if (isBasicAccount(planLower, appsumoTier, sub)) {
    return monthlyPlanClass(
      lifetimeLabel(lifetime, "Basic"),
      resolveBasicAllowance(sub),
      firstCount(user.proQueriesCount, user.basicQueriesCount)
    );
  }
  return {
    resolvedPlan: rawPlan,
    total: resolveFreeAllowance(sub),
    used: firstCount(user.proQueriesCount, user.dailyQueriesCount),
    displayName: "Queries",
    isDailyReset: false,
  };
}

export function buildChatPlaygroundQuotas(
  user: ChatPlaygroundUser,
  classified: ChatPlaygroundPlanClass
): Record<string, UsageQuota> {
  const { total, used, displayName, isDailyReset } = classified;
  const remaining = Math.max(0, total - used);
  const resetAt = isDailyReset ? nextUtcMidnightIso() : user.stripeCurrentPeriodEnd || null;
  const quota: UsageQuota = {
    used,
    total,
    remaining,
    remainingPercentage: remainingPct(remaining, total),
    resetAt,
    unlimited: false,
    displayName,
  };

  const dailyUsed = Math.max(0, user.dailyQueriesCount ?? 0);
  const dailyRemaining = Math.max(0, total - dailyUsed);
  const quotas: Record<string, UsageQuota> = {
    credits: quota,
    daily: isDailyReset
      ? quota
      : {
          used: dailyUsed,
          total,
          remaining: dailyRemaining,
          remainingPercentage: remainingPct(dailyRemaining, total),
          resetAt: nextUtcMidnightIso(),
          unlimited: false,
          displayName: "Daily Queries",
        },
  };
  if (!isDailyReset) quotas.monthly = quota;
  return quotas;
}

export async function getChatPlaygroundUsage(
  apiKey?: string,
  providerSpecificData?: Record<string, unknown> | null
): Promise<{
  plan?: string;
  quotas?: Record<string, UsageQuota>;
  message?: string | null;
}> {
  try {
    const auth = await resolveChatPlaygroundAuth({
      apiKey,
      providerSpecificData,
    });

    const res = await fetch(CHATPLAYGROUND_USER_URL, {
      method: "GET",
      headers: auth.headers,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return {
        message: `ChatPlayground user API HTTP ${res.status}: ${sanitizeErrorMessage(errText.slice(0, 160))}`,
        plan: "ChatPlayground",
      };
    }

    const data = (await res.json()) as { user?: ChatPlaygroundUser };
    const user = data.user || {};
    const classified = classifyChatPlaygroundPlan(user);
    return {
      plan: classified.resolvedPlan,
      quotas: buildChatPlaygroundQuotas(user, classified),
      message: null,
    };
  } catch (err) {
    // Best-effort: the dashboard quota fetch must never throw back to the caller
    // that only renders the returned plan/quotas object.
    const msg = err instanceof Error ? err.message : String(err);
    return {
      message: `ChatPlayground quota fetch failed: ${sanitizeErrorMessage(msg)}`,
      plan: "ChatPlayground",
    };
  }
}
