import { normalizeConolCookie } from "./conolAuth.ts";

interface UsageQuota {
  used: number;
  total: number;
  remaining: number;
  remainingPercentage: number;
  resetAt: null;
  unlimited: boolean;
}

interface ConolBalance {
  dailyCredits?: unknown;
  subscriptionCredits?: unknown;
  subscriptionAmount?: unknown;
  extraCredits?: unknown;
  total?: unknown;
}

interface ConolUsageResult {
  plan: string;
  quotas: Record<"credits" | "daily" | "subscription" | "extra", UsageQuota>;
  message: string | null;
}

function numberValue(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function remainingQuota(remaining: number, total = remaining): UsageQuota {
  const boundedTotal = Math.max(total, remaining);
  const used = Math.max(0, boundedTotal - remaining);
  return {
    used,
    total: boundedTotal,
    remaining,
    remainingPercentage:
      boundedTotal > 0 ? Math.round((remaining / boundedTotal) * 1000) / 10 : 0,
    resetAt: null,
    unlimited: false,
  };
}

export function buildConolUsageResult(balance: ConolBalance): ConolUsageResult {
  const daily = numberValue(balance.dailyCredits);
  const subscription = numberValue(balance.subscriptionCredits);
  const subscriptionAmount = numberValue(balance.subscriptionAmount);
  const extra = numberValue(balance.extraCredits);
  const aggregate = numberValue(balance.total) || daily + subscription + extra;

  return {
    plan: subscriptionAmount > 0 ? "Subscription" : "Free",
    quotas: {
      credits: remainingQuota(aggregate),
      daily: remainingQuota(daily),
      subscription: remainingQuota(subscription, subscriptionAmount || subscription),
      extra: remainingQuota(extra),
    },
    message: null,
  };
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readProviderValue(data: unknown, keys: readonly string[]): string {
  if (!data || typeof data !== "object" || Array.isArray(data)) return "";
  const record = data as Record<string, unknown>;
  for (const key of keys) {
    const value = readString(record[key]);
    if (value) return value;
  }
  return "";
}

export async function getConolUsage(
  apiKey: unknown,
  providerSpecificData?: unknown
): Promise<ConolUsageResult | { message: string }> {
  const raw =
    readProviderValue(providerSpecificData, [
      "cookie",
      "__Secure-better-auth.session_token",
      "sessionToken",
    ]) || readString(apiKey);
  const cookie = normalizeConolCookie(raw);
  if (!cookie) return { message: "Missing Conol session cookie" };

  try {
    const response = await fetch("https://conol.ai/api/billing/balance", {
      method: "GET",
      headers: {
        accept: "application/json",
        cookie,
        referer: "https://conol.ai/home",
      },
      signal: AbortSignal.timeout(15_000),
    });
    if (response.status === 401 || response.status === 403) {
      return { message: "Conol session expired or is invalid" };
    }
    if (!response.ok) {
      return { message: `Conol balance request failed (HTTP ${response.status})` };
    }
    return buildConolUsageResult((await response.json()) as ConolBalance);
  } catch {
    return { message: "Conol balance request failed" };
  }
}
