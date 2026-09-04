/**
 * ChatPlayground billing & query quota fetcher for Limits page.
 *
 * Calls GET https://app.chatplayground.ai/api/user with auto-minted Clerk JWT.
 * Lifetime subscription provides 300 credits daily.
 */
import { type UsageQuota } from "./quota.ts";
import { resolveChatPlaygroundAuth } from "../chatplaygroundAuth.ts";
import { CHATPLAYGROUND_USER_URL } from "../chatplaygroundModels.ts";

export interface ChatPlaygroundUsageResult {
  plan: string;
  quotas: Record<"daily" | "credits", UsageQuota>;
  message?: string | null;
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
        message: `ChatPlayground user API HTTP ${res.status}: ${errText.slice(0, 160)}`,
        plan: "ChatPlayground",
      };
    }

    const data = (await res.json()) as {
      user?: {
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
        subscription?: {
          key?: string;
          name?: string;
          fullName?: string;
          proMaxQueries?: number;
          unlimited?: {
            queries?: boolean;
          };
        };
      };
    };

    const user = data.user || {};
    const sub = user.subscription || {};

    const rawPlan =
      (typeof sub.fullName === "string" && sub.fullName.trim()) ||
      (typeof sub.name === "string" && sub.name.trim()) ||
      "Free";

    const planLower = rawPlan.toLowerCase();
    const subNameLower = (sub.name || "").toLowerCase();
    const subKeyLower = (sub.key || "").toLowerCase();
    const appsumoTier = (typeof user.appsumoLicenseTier === "string" ? user.appsumoLicenseTier : "").toLowerCase();

    const isUnlimited =
      sub.unlimited?.queries === true ||
      subNameLower === "unlimited" ||
      planLower.includes("unlimited") ||
      (typeof sub.proMaxQueries === "number" && sub.proMaxQueries >= 99999);

    const isLifetime =
      planLower.includes("lifetime") ||
      subKeyLower.includes("lifetime") ||
      Boolean(user.appsumoLicenseKey) ||
      Boolean(user.appsumoLicenseTier) ||
      (typeof user.stripeSubscriptionId === "string" &&
        user.stripeSubscriptionId.toLowerCase().includes("lifetime"));

    let total = 300;
    let used = 0;
    let displayName = "Daily Credits (300/day)";
    let resolvedPlan = "Free";
    let isDailyReset = false;

    if (isUnlimited) {
      // Unlimited Tier (Lifetime or $25/mo): 300 daily credits fair-use
      resolvedPlan = isLifetime ? "Lifetime Unlimited" : "Unlimited";
      total = 300;
      used = Math.max(0, user.dailyQueriesCount ?? 0);
      displayName = "Daily Credits (300/day)";
      isDailyReset = true;
    } else if (
      planLower.includes("pro") ||
      appsumoTier.includes("pro") ||
      (typeof sub.proMaxQueries === "number" && sub.proMaxQueries >= 1500 && sub.proMaxQueries < 99999)
    ) {
      // Pro Tier: 2,000 queries/mo for Lifetime/StackSocial, or 1,500 for Monthly Pro
      const monthlyAllowance =
        typeof sub.proMaxQueries === "number" && sub.proMaxQueries > 0 && sub.proMaxQueries < 99999
          ? sub.proMaxQueries
          : isLifetime
            ? 2000
            : 1500;
      resolvedPlan = isLifetime ? "Lifetime Pro" : "Pro";
      total = monthlyAllowance;
      used = Math.max(0, user.proQueriesCount ?? user.advancedQueriesCount ?? 0);
      displayName = `Monthly Queries (${total.toLocaleString()}/mo)`;
      isDailyReset = false;
    } else if (
      planLower.includes("basic") ||
      appsumoTier.includes("basic") ||
      (typeof sub.proMaxQueries === "number" && sub.proMaxQueries > 0 && sub.proMaxQueries <= 500)
    ) {
      // Basic Tier (StackSocial Lifetime 500 msgs/mo)
      const monthlyAllowance =
        typeof sub.proMaxQueries === "number" && sub.proMaxQueries > 0 ? sub.proMaxQueries : 500;
      resolvedPlan = isLifetime ? "Lifetime Basic" : "Basic";
      total = monthlyAllowance;
      used = Math.max(0, user.proQueriesCount ?? user.basicQueriesCount ?? 0);
      displayName = `Monthly Queries (${total.toLocaleString()}/mo)`;
      isDailyReset = false;
    } else {
      // Free or unsubscribed
      resolvedPlan = rawPlan;
      total =
        typeof sub.proMaxQueries === "number" && sub.proMaxQueries < 99999
          ? sub.proMaxQueries
          : 0;
      used = Math.max(0, user.proQueriesCount ?? user.dailyQueriesCount ?? 0);
      displayName = "Queries";
      isDailyReset = false;
    }

    const remaining = Math.max(0, total - used);
    const remainingPct =
      total > 0 ? Math.round((remaining / total) * 1000) / 10 : 0;

    const nextMidnight = new Date();
    nextMidnight.setUTCHours(24, 0, 0, 0);

    let resetAt: string | null = null;
    if (isDailyReset) {
      resetAt = nextMidnight.toISOString();
    } else if (user.stripeCurrentPeriodEnd) {
      resetAt = user.stripeCurrentPeriodEnd;
    }

    const quota: UsageQuota = {
      used,
      total,
      remaining,
      remainingPercentage: remainingPct,
      resetAt,
      unlimited: false,
      displayName,
    };

    // Construct multi-window quotas: primary credits, daily activity/cap, and monthly allowance
    const quotas: Record<string, UsageQuota> = {
      credits: quota,
      daily: isDailyReset
        ? quota
        : {
            used: Math.max(0, user.dailyQueriesCount ?? 0),
            total: total > 0 ? Math.min(total, 300) : 300,
            remaining: Math.max(0, (total > 0 ? Math.min(total, 300) : 300) - Math.max(0, user.dailyQueriesCount ?? 0)),
            remainingPercentage:
              Math.round(
                (Math.max(0, (total > 0 ? Math.min(total, 300) : 300) - Math.max(0, user.dailyQueriesCount ?? 0)) /
                  (total > 0 ? Math.min(total, 300) : 300)) *
                  1000
              ) / 10,
            resetAt: nextMidnight.toISOString(),
            unlimited: false,
            displayName: "Daily Activity",
          },
    };

    if (!isDailyReset) {
      quotas.monthly = quota;
    }

    return {
      plan: resolvedPlan,
      quotas,
      message: null,
    };
  } catch (err) {
    return {
      message: `ChatPlayground quota fetch failed: ${err instanceof Error ? err.message : String(err)}`,
      plan: "ChatPlayground",
    };
  }
}
