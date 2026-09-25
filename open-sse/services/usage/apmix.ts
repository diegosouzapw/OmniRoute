/**
 * usage/apmix.ts — Apmix usage fetcher.
 *
 * GET https://api.apmix.ai/v1/usage with the Bearer key returns the
 * subscription allowance in weighted tokens (monthly, plan-scoped), any
 * self-imposed daily/weekly caps with their usage, and the one-time top-up
 * balance. Response shape (live-verified 2026-09-25):
 *
 *   { "object": "usage", "plan": "free", "allowance": 4000000, "used": 0,
 *     "remaining": 4000000, "topup_remaining": 0, "resets_at": null,
 *     "limits": { "daily": null, "daily_used": 0, "weekly": null, "weekly_used": 0 } }
 *
 * Depends only on the sibling scalar/quota leaves — no host coupling — so it
 * lives as a co-located provider leaf, mirroring usage/nanogpt.ts.
 */

import { toRecord, toNumber, clampPercentage } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

const APMIX_CONFIG = {
  usageUrl: "https://api.apmix.ai/v1/usage",
};

/** Bound the usage probe so a hung upstream cannot hold the limits panel. */
const FETCH_TIMEOUT_MS = 10_000;

/** Self-imposed daily caps reset at midnight UTC; weekly caps on Monday 00:00 UTC. */
function nextMidnightUtc(now = new Date()): string {
  const next = new Date(now);
  next.setUTCHours(24, 0, 0, 0);
  return next.toISOString();
}

function nextMondayUtc(now = new Date()): string {
  const next = new Date(now);
  const day = next.getUTCDay(); // 0 = Sunday
  const daysUntilMonday = day === 0 ? 1 : 8 - day;
  next.setUTCDate(next.getUTCDate() + daysUntilMonday);
  next.setUTCHours(0, 0, 0, 0);
  return next.toISOString();
}

/**
 * Apmix Usage
 * Fetches the monthly weighted-token allowance plus any self-imposed
 * daily/weekly caps and the top-up balance from the Apmix API.
 */
export async function getApmixUsage(apiKey: string) {
  if (!apiKey) {
    return { message: "Apmix API key not available. Add a key to view usage." };
  }

  try {
    const res = await fetch(APMIX_CONFIG.usageUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      if (res.status === 401) return { message: "Invalid Apmix API key." };
      return { message: `Apmix quota API error (${res.status})` };
    }

    const data = toRecord(await res.json());
    const quotas: Record<string, UsageQuota> = {};
    const plan = typeof data.plan === "string" && data.plan ? data.plan : null;

    // Monthly weighted-token allowance — the primary quota every plan has.
    const allowance = toNumber(data.allowance, 0);
    const used = toNumber(data.used, 0);
    const remaining = toNumber(data.remaining, 0);
    if (allowance > 0 || used > 0) {
      const total = allowance > 0 ? allowance : used + remaining;
      quotas["monthly"] = {
        used,
        total,
        remaining,
        remainingPercentage: total > 0 ? clampPercentage((remaining / total) * 100) : undefined,
        resetAt: parseResetTime(data.resets_at),
        unlimited: false,
        displayName: "Monthly (weighted tokens)",
      };
    }

    // Self-imposed caps — only present as windows when the operator set them.
    const limits = toRecord(data.limits);
    const dailyCap = toNumber(limits.daily, 0);
    if (dailyCap > 0) {
      quotas["daily"] = {
        used: toNumber(limits.daily_used, 0),
        total: dailyCap,
        remaining: Math.max(0, dailyCap - toNumber(limits.daily_used, 0)),
        unlimited: false,
        resetAt: nextMidnightUtc(),
        displayName: "Daily (self-set)",
      };
    }
    const weeklyCap = toNumber(limits.weekly, 0);
    if (weeklyCap > 0) {
      quotas["weekly"] = {
        used: toNumber(limits.weekly_used, 0),
        total: weeklyCap,
        remaining: Math.max(0, weeklyCap - toNumber(limits.weekly_used, 0)),
        unlimited: false,
        resetAt: nextMondayUtc(),
        displayName: "Weekly (self-set)",
      };
    }

    // One-time top-up balance — extra weighted tokens beyond the allowance.
    const topup = toNumber(data.topup_remaining, 0);
    if (topup > 0) {
      quotas["topup"] = {
        used: 0,
        total: topup,
        remaining: topup,
        remainingPercentage: 100,
        resetAt: null,
        unlimited: false,
        displayName: "Top-up credits",
      };
    }

    if (Object.keys(quotas).length === 0) {
      return {
        plan,
        message: "Apmix connected, but no usage data was returned for this key.",
      };
    }

    return { plan, quotas };
  } catch (error) {
    return {
      message: `Apmix connected. Unable to fetch usage: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`,
    };
  }
}
