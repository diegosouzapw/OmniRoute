/**
 * lyceumQuotaFetcher.ts — Lyceum credit-balance quota fetcher
 *
 * Implements QuotaFetcher for the "lyceum" provider (quotaPreflight.ts +
 * quotaMonitor.ts).
 *
 * Lyceum is pay-per-use (credit-based, like OpenRouter). It exposes a documented
 * credit-balance endpoint (https://docs.lyceum.technology/api-reference/billing/get-user-credits):
 *
 *   GET https://api.lyceum.technology/api/v2/external/billing/credits
 *     -> { available_credits, used_credits, total_credits_used,
 *          remaining_credits, monthly_free_credits, purchased_credits,
 *          signup_grant_claimed_at }
 *
 * Authenticated with the connection's own API key (`lk_…`) as a Bearer token.
 * All values are USD-denominated credit numbers. `remaining_credits` is the
 * authoritative balance; `used_credits` is spend within the current cycle.
 *
 * There is no reset window on this endpoint, so a single "credits" window is
 * surfaced (resetAt = null). limitReached fires when the balance hits zero.
 *
 * Graceful "unknown" on any fetch failure — quota tracking must never block
 * routing (mirrors llmgatewayQuotaFetcher.ts / openrouterQuotaFetcher.ts). A 401
 * (invalid/inactive key) or 403 drops the cache and returns null.
 *
 * Cache: in-memory TTL (45s) keyed by connectionId, so combo preflight/monitor
 * polling doesn't hammer the upstream on every request.
 *
 * Registration: call registerLyceumQuotaFetcher() once at server startup.
 */

import {
  registerQuotaFetcher,
  registerQuotaWindows,
  type QuotaInfo,
  type QuotaWindowInfo,
} from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";

const LYCEUM_CONFIG = {
  creditsUrl: "https://api.lyceum.technology/api/v2/external/billing/credits",
};

const CACHE_TTL_MS = 45_000;

export const LYCEUM_WINDOW_CREDITS = "credits";

export interface LyceumQuota extends QuotaInfo {
  availableCredits: number;
  usedCredits: number;
  remainingCredits: number;
  monthlyFreeCredits: number;
  purchasedCredits: number;
}

interface CacheEntry {
  quota: LyceumQuota;
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

function toFiniteNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

// ─── Response Parser ─────────────────────────────────────────────────────────

export interface LyceumCreditsFields {
  availableCredits: number;
  usedCredits: number;
  remainingCredits: number;
  monthlyFreeCredits: number;
  purchasedCredits: number;
}

/**
 * Parse the `GET /billing/credits` response body. Returns null when the payload
 * doesn't carry a recognizable credit object (unexpected shape).
 */
export function parseLyceumCreditsResponse(data: unknown): LyceumCreditsFields | null {
  const inner = toRecord(data);
  const hasBalance =
    "remaining_credits" in inner || "available_credits" in inner || "used_credits" in inner;
  if (!hasBalance) return null;

  const availableCredits = toFiniteNumber(inner.available_credits, 0);
  return {
    availableCredits,
    usedCredits: toFiniteNumber(inner.used_credits, 0),
    remainingCredits: toFiniteNumber(inner.remaining_credits, availableCredits),
    monthlyFreeCredits: toFiniteNumber(inner.monthly_free_credits, 0),
    purchasedCredits: toFiniteNumber(inner.purchased_credits, 0),
  };
}

/**
 * Build the QuotaInfo from parsed fields. Total is used + remaining, so
 * percentUsed reflects consumption of the current credit balance. A zero
 * balance (remaining <= 0) with any spend marks the connection exhausted.
 */
export function buildLyceumQuota(fields: LyceumCreditsFields): LyceumQuota {
  const remaining = Math.max(0, fields.remainingCredits);
  const used = Math.max(0, fields.usedCredits);
  const total = used + remaining;
  const percentUsed = total > 0 ? Math.min(1, Math.max(0, used / total)) : 0;
  const limitReached = total > 0 && remaining <= 0;

  const window: QuotaWindowInfo = { percentUsed, resetAt: null };

  return {
    used: percentUsed * 100,
    total: 100,
    percentUsed,
    resetAt: null,
    limitReached,
    windows: { [LYCEUM_WINDOW_CREDITS]: window },
    availableCredits: fields.availableCredits,
    usedCredits: fields.usedCredits,
    remainingCredits: remaining,
    monthlyFreeCredits: fields.monthlyFreeCredits,
    purchasedCredits: fields.purchasedCredits,
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
 * Fetch current credit balance for a Lyceum connection.
 *
 * @param connectionId - Connection ID from the DB (used for cache keying)
 * @param connection - Optional connection object with apiKey
 * @returns LyceumQuota, or null on no credentials / fetch failure / auth rejection
 */
export async function fetchLyceumQuota(
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

    const result = await fetchJson(LYCEUM_CONFIG.creditsUrl, apiKey);
    if (!result || result.status !== 200) {
      quotaCache.delete(connectionId);
      return null;
    }

    const fields = parseLyceumCreditsResponse(result.data);
    if (!fields) {
      quotaCache.delete(connectionId);
      return null;
    }

    const quota = buildLyceumQuota(fields);
    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    return null;
  }
}

// ─── Invalidation ────────────────────────────────────────────────────────────

export function invalidateLyceumQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * Register the Lyceum credit-balance quota fetcher with the preflight and
 * monitor systems, plus its named window for the dashboard cutoff modal. Call
 * once at server startup (via quotaTrackersBatch, before the generic path so the
 * bespoke fetcher wins).
 */
export function registerLyceumQuotaFetcher(): void {
  registerQuotaFetcher("lyceum", fetchLyceumQuota);
  registerMonitorFetcher("lyceum", fetchLyceumQuota);
  registerQuotaWindows("lyceum", [LYCEUM_WINDOW_CREDITS]);
}
