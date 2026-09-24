/**
 * SYNTX.ai subscription + rolling-window limits → UsageQuota for Limits.
 *
 * Live:
 *   GET https://api.syntx.ai/api/v1/user/subscription?ref=false  → tokens (wallet string)
 *   GET https://api.syntx.ai/api/v1/llm/limits                   → plan, window_6h/7d percent_left
 */
import { SYNTX_API_BASE, looksLikeJwt, resolveSyntxToken, syntxAuthHeaders } from "../syntxAuth.ts";
import { parseResetTime, type UsageQuota } from "./quota.ts";

export type SyntxSubscription = {
  active?: unknown;
  type?: unknown;
  tokens?: unknown;
};

export type SyntxLimitWindow = {
  percent_left?: unknown;
  started_at?: unknown;
  expires_at?: unknown;
};

export type SyntxLimits = {
  plan?: unknown;
  window_6h?: SyntxLimitWindow;
  window_7d?: SyntxLimitWindow;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

const SIX_HOURS_MS = 6 * 3600_000;
const SEVEN_DAYS_MS = 7 * 24 * 3600_000;

export function parseSyntxTokenBalance(raw: unknown): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw !== "string") return 0;
  const n = Number.parseFloat(raw.replace(",", ".").trim());
  return Number.isFinite(n) ? n : 0;
}

export function parseSyntxPercentLeft(raw: unknown): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw !== "string") return 0;
  const n = Number.parseFloat(raw.replace("%", "").replace(",", ".").trim());
  return Number.isFinite(n) ? n : 0;
}

/** Live `/llm/limits` often sends expires_at:null — derive the next window from started_at. */
export function syntxWindowResetAt(window: Record<string, unknown>, durationMs: number): string | null {
  const expires = parseResetTime(window.expires_at ?? window.expiresAt);
  if (expires) return expires;
  const started = parseResetTime(window.started_at ?? window.startedAt);
  if (!started) return null;
  const t = Date.parse(started);
  if (!Number.isFinite(t)) return null;
  return new Date(t + durationMs).toISOString();
}

function percentQuota(percentLeft: unknown, resetAt: string | null, displayName: string): UsageQuota {
  const remaining = parseSyntxPercentLeft(percentLeft);
  const clamped = Math.max(0, Math.min(100, remaining));
  return {
    used: Math.round((100 - clamped) * 10) / 10,
    total: 100,
    remaining: clamped,
    remainingPercentage: clamped,
    resetAt,
    unlimited: false,
    displayName,
  };
}

function remainingWallet(tokens: number): UsageQuota {
  return {
    used: 0,
    total: tokens,
    remaining: tokens,
    remainingPercentage: tokens > 0 ? 100 : 0,
    resetAt: null,
    unlimited: false,
    displayName: "Token wallet",
  };
}

export function buildSyntxUsageResult(subscription: SyntxSubscription, limits: SyntxLimits) {
  const tokens = parseSyntxTokenBalance(subscription.tokens);
  const planRaw =
    (typeof limits.plan === "string" && limits.plan.trim()) ||
    (typeof subscription.type === "string" && subscription.type.trim()) ||
    "free";
  const plan = planRaw.charAt(0).toUpperCase() + planRaw.slice(1);
  const window6h = asRecord(limits.window_6h);
  const window7d = asRecord(limits.window_7d);
  return {
    plan: `SYNTX ${plan}`,
    quotas: {
      credits: remainingWallet(tokens),
      hours: percentQuota(
        window6h.percent_left,
        syntxWindowResetAt(window6h, SIX_HOURS_MS),
        "Hours (6h)"
      ),
      weekly: percentQuota(
        window7d.percent_left,
        syntxWindowResetAt(window7d, SEVEN_DAYS_MS),
        "Weekly (7d)"
      ),
    },
    message: null as string | null,
  };
}

export async function getSyntxUsage(
  apiKey?: unknown,
  accessToken?: unknown,
  providerSpecificData?: unknown
) {
  const token = resolveSyntxToken({ apiKey, accessToken, providerSpecificData });
  if (!looksLikeJwt(token)) {
    return { message: "Paste a SYNTX.ai Bearer JWT to view usage." };
  }

  try {
    const headers = syntxAuthHeaders(token);
    const [subRes, limRes] = await Promise.all([
      fetch(`${SYNTX_API_BASE}/api/v1/user/subscription?ref=false`, {
        method: "GET",
        headers,
        signal: AbortSignal.timeout(15_000),
      }),
      fetch(`${SYNTX_API_BASE}/api/v1/llm/limits`, {
        method: "GET",
        headers,
        signal: AbortSignal.timeout(15_000),
      }),
    ]);

    if (subRes.status === 401 || subRes.status === 403 || limRes.status === 401 || limRes.status === 403) {
      return { message: "SYNTX JWT expired or is invalid. Paste a fresh token from syntx.ai." };
    }
    if (!subRes.ok) return { message: `SYNTX subscription failed (HTTP ${subRes.status})` };
    if (!limRes.ok) return { message: `SYNTX limits failed (HTTP ${limRes.status})` };

    const subscription = (await subRes.json()) as SyntxSubscription;
    const limits = (await limRes.json()) as SyntxLimits;
    return buildSyntxUsageResult(subscription, limits);
  } catch (error) {
    return {
      message: `SYNTX usage failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
