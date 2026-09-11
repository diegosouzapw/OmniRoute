/**
 * llmgatewayQuotaFetcher.ts — LLM Gateway DevPass Quota Fetcher
 *
 * Implements QuotaFetcher for the "llmgateway" provider (quotaPreflight.ts +
 * quotaMonitor.ts).
 *
 * LLM Gateway exposes one official, documented monitoring endpoint
 * (https://docs.llmgateway.io/developers/devpass-usage):
 *
 *   GET https://api.llmgateway.io/v1/key
 *     -> { data: { label, usage, limit, devPlan,
 *                  devPlanCreditsUsed, devPlanCreditsLimit, devPlanCreditsRemaining,
 *                  devPlanPremiumWeeklyLimit, devPlanPremiumCreditsUsed,
 *                  devPlanPremiumWeekResetsAt } }
 *
 * Authenticated with the connection's own gateway API key (`llmgtwy_…`) as a
 * Bearer token — no dashboard session needed. Every USD value comes back as a
 * decimal STRING and must be parsed before doing math (per the upstream docs).
 *
 * DevPass has two independent allowance windows, both surfaced here:
 *   - monthly: the plan credit cycle (devPlanCreditsUsed / …Limit / …Remaining) —
 *     this is the ~$87/mo DevPass allowance.
 *   - premium (weekly): the premium-model window (devPlanPremiumWeeklyLimit /
 *     …CreditsUsed / …WeekResetsAt). The window starts on the first premium
 *     request and lasts 7 days; when it expires the endpoint returns "0.00"
 *     used and a null reset (full allowance available again).
 *
 * Pay-as-you-go keys return devPlan "none" and zero for every DevPass field —
 * there is no subscription allowance to track, so we return null (no quota) and
 * let routing/preflight treat the connection as unlimited.
 *
 * Graceful "unknown" on any fetch failure — quota tracking must never block
 * routing (mirrors deepseekQuotaFetcher.ts / openrouterQuotaFetcher.ts). A 401
 * (invalid/inactive key) or 403 (publishable/session key, which cannot read
 * org-level plan state) drops the cache and returns null.
 *
 * Cache: in-memory TTL (45s) keyed by connectionId, so combo preflight/monitor
 * polling doesn't hammer the upstream on every request.
 *
 * Registration: call registerLlmgatewayQuotaFetcher() once at server startup.
 */

import {
  registerQuotaFetcher,
  registerQuotaWindows,
  type QuotaInfo,
  type QuotaWindowInfo,
} from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";

const LLMGATEWAY_CONFIG = {
  baseUrl: "https://api.llmgateway.io/v1",
  keyPath: "/key",
};

// Cache TTL — same 45s window as the OpenRouter fetcher.
const CACHE_TTL_MS = 45_000;

// Canonical window names surfaced to the dashboard cutoff modal + usage leaf.
export const LLMGATEWAY_WINDOW_MONTHLY = "devpass_monthly";
export const LLMGATEWAY_WINDOW_PREMIUM_WEEKLY = "devpass_premium_weekly";

export interface LlmgatewayQuota extends QuotaInfo {
  /** Plan tier: "lite" | "pro" | "max" | "none". */
  devPlan: string;
  /** Monthly plan credit cycle (USD). */
  monthlyUsed: number;
  monthlyLimit: number | null;
  monthlyRemaining: number | null;
  /** Weekly premium-model window (USD). */
  premiumWeeklyLimit: number | null;
  premiumUsed: number;
  premiumRemaining: number | null;
  premiumResetAt: string | null;
}

interface CacheEntry {
  quota: LlmgatewayQuota;
  fetchedAt: number;
}

const quotaCache = new Map<string, CacheEntry>();

const _cacheCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of quotaCache) {
    if (now - entry.fetchedAt > CACHE_TTL_MS * 5) {
      quotaCache.delete(key);
    }
  }
}, 5 * 60_000);

if (typeof _cacheCleanup === "object" && "unref" in _cacheCleanup) {
  (_cacheCleanup as { unref?: () => void }).unref?.();
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/**
 * Parse a DevPass USD value. Upstream returns decimal STRINGS ("31.42"), but we
 * also accept plain numbers defensively. Returns null for absent/blank/invalid.
 */
function toNullableNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function toFiniteNumber(value: unknown, fallback = 0): number {
  const n = toNullableNumber(value);
  return n === null ? fallback : n;
}

function toIsoOrNull(value: unknown): string | null {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime()) || date.getTime() <= 0) return null;
  return date.toISOString();
}

// ─── Response Parser ─────────────────────────────────────────────────────────

export interface LlmgatewayKeyFields {
  devPlan: string;
  monthlyUsed: number;
  monthlyLimit: number | null;
  monthlyRemaining: number | null;
  premiumWeeklyLimit: number | null;
  premiumUsed: number;
  premiumResetAt: string | null;
}

/**
 * Parse the `GET /v1/key` response body. Returns null when the payload doesn't
 * carry a recognizable `data` object (e.g. an unexpected shape).
 */
export function parseLlmgatewayKeyResponse(data: unknown): LlmgatewayKeyFields | null {
  const outer = toRecord(data);
  const inner = "data" in outer ? toRecord(outer.data) : outer;
  if (Object.keys(inner).length === 0) return null;

  const devPlan =
    typeof inner.devPlan === "string" && inner.devPlan.trim().length > 0 ? inner.devPlan : "none";

  return {
    devPlan,
    monthlyUsed: toFiniteNumber(inner.devPlanCreditsUsed, 0),
    monthlyLimit: toNullableNumber(inner.devPlanCreditsLimit),
    monthlyRemaining: toNullableNumber(inner.devPlanCreditsRemaining),
    premiumWeeklyLimit: toNullableNumber(inner.devPlanPremiumWeeklyLimit),
    premiumUsed: toFiniteNumber(inner.devPlanPremiumCreditsUsed, 0),
    premiumResetAt: toIsoOrNull(inner.devPlanPremiumWeekResetsAt),
  };
}

function percentUsedFrom(used: number, limit: number | null): number {
  if (limit === null || limit <= 0) return 0;
  const pct = used / limit;
  return Math.min(1, Math.max(0, pct));
}

/**
 * Build the QuotaInfo from parsed fields. Returns null for pay-as-you-go keys
 * (`devPlan === "none"`) — there is no subscription allowance to enforce, so the
 * connection is treated as unlimited by preflight/routing.
 */
export function buildLlmgatewayQuota(key: LlmgatewayKeyFields): LlmgatewayQuota | null {
  if (key.devPlan === "none") return null;

  const monthlyPercent = percentUsedFrom(key.monthlyUsed, key.monthlyLimit);
  const premiumPercent = percentUsedFrom(key.premiumUsed, key.premiumWeeklyLimit);

  const monthlyRemaining =
    key.monthlyRemaining ??
    (key.monthlyLimit !== null ? Math.max(0, key.monthlyLimit - key.monthlyUsed) : null);
  const premiumRemaining =
    key.premiumWeeklyLimit !== null ? Math.max(0, key.premiumWeeklyLimit - key.premiumUsed) : null;

  const monthlyExhausted = key.monthlyLimit !== null && monthlyPercent >= 1;
  const premiumExhausted = key.premiumWeeklyLimit !== null && premiumPercent >= 1;

  const windows: Record<string, QuotaWindowInfo> = {};
  const windowMonthly: QuotaWindowInfo | undefined =
    key.monthlyLimit !== null ? { percentUsed: monthlyPercent, resetAt: null } : undefined;
  const windowWeekly: QuotaWindowInfo | undefined =
    key.premiumWeeklyLimit !== null
      ? { percentUsed: premiumPercent, resetAt: key.premiumResetAt }
      : undefined;
  if (windowMonthly) windows[LLMGATEWAY_WINDOW_MONTHLY] = windowMonthly;
  if (windowWeekly) windows[LLMGATEWAY_WINDOW_PREMIUM_WEEKLY] = windowWeekly;

  // Legacy single-signal percentUsed = worst of the two windows.
  const worstPercent = Math.max(monthlyPercent, premiumPercent);

  return {
    used: worstPercent * 100,
    total: 100,
    percentUsed: worstPercent,
    resetAt: key.premiumResetAt,
    limitReached: monthlyExhausted || premiumExhausted,
    windows: Object.keys(windows).length > 0 ? windows : undefined,
    windowWeekly,
    windowMonthly,
    devPlan: key.devPlan,
    monthlyUsed: key.monthlyUsed,
    monthlyLimit: key.monthlyLimit,
    monthlyRemaining,
    premiumWeeklyLimit: key.premiumWeeklyLimit,
    premiumUsed: key.premiumUsed,
    premiumRemaining,
    premiumResetAt: key.premiumResetAt,
  };
}

// ─── Core Fetcher ────────────────────────────────────────────────────────────

async function fetchJson(
  url: string,
  apiKey: string
): Promise<{ status: number; data: unknown } | null> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return { status: response.status, data: null };
    const data = await response.json();
    return { status: response.status, data };
  } catch {
    return null;
  }
}

/**
 * Fetch current DevPass quota for an LLM Gateway connection.
 *
 * @param connectionId - Connection ID from the DB (used for cache keying)
 * @param connection - Optional connection object with apiKey
 * @returns LlmgatewayQuota, or null on no credentials / fetch failure / auth
 *          rejection / pay-as-you-go key
 */
export async function fetchLlmgatewayQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  const apiKey =
    typeof connection?.apiKey === "string" && connection.apiKey.trim().length > 0
      ? connection.apiKey
      : null;
  if (!apiKey) return null;

  try {
    await throttleQuotaFetch();

    const keyResult = await fetchJson(
      `${LLMGATEWAY_CONFIG.baseUrl}${LLMGATEWAY_CONFIG.keyPath}`,
      apiKey
    );

    // Auth-rejected (invalid key = 401, publishable/session key = 403) or a
    // network failure — fail open and drop any stale cache.
    if (!keyResult || keyResult.status !== 200) {
      quotaCache.delete(connectionId);
      return null;
    }

    const fields = parseLlmgatewayKeyResponse(keyResult.data);
    if (!fields) {
      quotaCache.delete(connectionId);
      return null;
    }

    const quota = buildLlmgatewayQuota(fields);
    if (!quota) {
      // Pay-as-you-go key: no subscription allowance to track.
      quotaCache.delete(connectionId);
      return null;
    }

    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    // Network error, timeout, etc. — fail open (graceful "unknown").
    return null;
  }
}

// ─── Invalidation ────────────────────────────────────────────────────────────

export function invalidateLlmgatewayQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * Register the LLM Gateway DevPass quota fetcher with the preflight and monitor
 * systems, plus its named windows for the dashboard cutoff modal. Call this once
 * at server startup (before registerGenericQuotaFetchers so the bespoke fetcher
 * wins over the generic path).
 */
export function registerLlmgatewayQuotaFetcher(): void {
  registerQuotaFetcher("llmgateway", fetchLlmgatewayQuota);
  registerMonitorFetcher("llmgateway", fetchLlmgatewayQuota);
  registerQuotaWindows("llmgateway", [LLMGATEWAY_WINDOW_MONTHLY, LLMGATEWAY_WINDOW_PREMIUM_WEEKLY]);
}
