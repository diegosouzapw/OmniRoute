/**
 * Factory Droid OAuth billing limits. GET /api/billing/limits is OAuth-only.
 */
import { FACTORY_HEADERS, resolveFactoryApiBase } from "../../config/factory.ts";
import { randomTraceparent } from "../../executors/factory/request.ts";
import { toNumber, toRecord } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";

const BILLING_LIMITS_PATH = "/api/billing/limits";
const USAGE_TIMEOUT_MS = 10_000;

type JsonRecord = Record<string, unknown>;

const TIER_WINDOWS = [
  {
    tier: "standard",
    payloadKey: "fiveHour",
    quotaKey: "standard_5h",
    displayName: "Standard 5 Hour",
  },
  {
    tier: "standard",
    payloadKey: "weekly",
    quotaKey: "standard_weekly",
    displayName: "Standard Weekly",
  },
  {
    tier: "standard",
    payloadKey: "monthly",
    quotaKey: "standard_monthly",
    displayName: "Standard Monthly",
  },
  { tier: "core", payloadKey: "fiveHour", quotaKey: "core_5h", displayName: "Droid Core 5 Hour" },
  { tier: "core", payloadKey: "weekly", quotaKey: "core_weekly", displayName: "Droid Core Weekly" },
  {
    tier: "core",
    payloadKey: "monthly",
    quotaKey: "core_monthly",
    displayName: "Droid Core Monthly",
  },
] as const;

function formatFactoryWindow(window: unknown, fetchedAt: number): UsageQuota | null {
  const record = toRecord(window);
  if (Object.keys(record).length === 0) return null;

  const usedPercent = toNumber(record.usedPercent ?? record.used_percent, Number.NaN);
  if (!Number.isFinite(usedPercent)) return null;

  const used = Math.max(0, Math.min(100, usedPercent));
  const windowEnd = record.windowEnd ?? record.window_end;
  const secondsRemaining = toNumber(
    record.secondsRemaining ?? record.seconds_remaining,
    Number.NaN
  );
  const resetAt =
    parseResetTime(windowEnd) ??
    (Number.isFinite(secondsRemaining) && secondsRemaining >= 0
      ? new Date(fetchedAt + secondsRemaining * 1000).toISOString()
      : null);
  const hasActiveWindow =
    (resetAt !== null && Date.parse(resetAt) > fetchedAt) ||
    (Number.isFinite(secondsRemaining) && secondsRemaining >= 0);

  return {
    used,
    total: 100,
    remaining: Math.max(0, 100 - used),
    remainingPercentage: Math.max(0, 100 - used),
    resetAt,
    unlimited: false,
    fractionReported: hasActiveWindow,
  };
}

function firstNonemptyString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

export function parseFactoryUsagePayload(
  payload: unknown,
  fetchedAt = Date.now()
): {
  quotas: Record<string, UsageQuota>;
  plan: string | null;
  extraUsage: JsonRecord | null;
} | null {
  const data = toRecord(payload);
  const recognized =
    "limits" in data ||
    "planType" in data ||
    "extraUsageBalanceCents" in data ||
    "extraUsageAllowed" in data ||
    "overagePreference" in data ||
    "usesTokenRateLimitsBilling" in data ||
    "tokenRateLimitsRolloutEligible" in data;
  if (!recognized) return null;

  const limits = toRecord(data.limits);
  const standard = toRecord(limits.standard);
  const core = toRecord(limits.core);
  const quotas: Record<string, UsageQuota> = {};

  for (const spec of TIER_WINDOWS) {
    const bucket = spec.tier === "standard" ? standard[spec.payloadKey] : core[spec.payloadKey];
    const window = formatFactoryWindow(bucket, fetchedAt);
    if (!window) continue;
    quotas[spec.quotaKey] = { ...window, displayName: spec.displayName };
  }

  const extraUsageBalanceCents = toNumber(data.extraUsageBalanceCents, Number.NaN);
  const extraUsage = Number.isFinite(extraUsageBalanceCents)
    ? {
        balance: extraUsageBalanceCents / 100,
        allowed: data.extraUsageAllowed === true,
        overagePreference: data.overagePreference,
      }
    : null;

  return {
    quotas,
    plan: typeof data.planType === "string" ? data.planType : null,
    extraUsage,
  };
}

export async function getFactoryUsage(
  accessToken?: string,
  providerSpecificData: Record<string, unknown> = {}
) {
  if (!accessToken) {
    return { error: "Missing access token" };
  }

  let base: string;
  try {
    base = resolveFactoryApiBase(providerSpecificData);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Invalid Factory API endpoint" };
  }

  const headers: Record<string, string> = {
    ...FACTORY_HEADERS,
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    traceparent: randomTraceparent(),
  };
  const orgId = firstNonemptyString(providerSpecificData.orgId, providerSpecificData.workosOrgId);
  if (orgId) headers["X-Factory-Org-Id"] = orgId;

  try {
    const response = await fetch(`${base}${BILLING_LIMITS_PATH}`, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(USAGE_TIMEOUT_MS),
    });
    if (!response.ok) {
      return { error: `Factory billing API error: HTTP ${response.status}` };
    }
    const parsed = parseFactoryUsagePayload(await response.json());
    if (!parsed) {
      return { error: "Factory usage response was not a recognized billing-limits payload" };
    }
    return {
      quotas: parsed.quotas,
      plan: parsed.plan,
      ...(parsed.extraUsage ? { extraUsage: parsed.extraUsage } : {}),
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to fetch Factory usage" };
  }
}
