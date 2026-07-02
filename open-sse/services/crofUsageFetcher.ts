/**
 * crofUsageFetcher.ts — CrofAI Usage Fetcher
 *
 * Implements QuotaFetcher for the crof provider (quotaPreflight.ts + quotaMonitor.ts).
 *
 * CrofAI exposes `GET https://crof.ai/usage_api/` (Bearer auth) returning:
 *
 *   { "usable_requests": 450 | null, "credits": 12.3456 }
 *
 * - `usable_requests`: requests left today on a subscription plan; `null` if
 *   the account is on pay-as-you-go (credits only).
 * - `credits`: USD-denominated credit balance.
 *
 * Mapping to QuotaInfo:
 * - Subscription account (usable_requests is a number):
 *     used = 0, total = usable_requests, percentUsed = usable_requests > 0 ? 0 : 1
 *   We do not know the daily allotment from the API response, so we surface
 *   "remaining" only and only block (percentUsed = 1) when the bucket hits 0.
 * - Pay-as-you-go (usable_requests null):
 *     percentUsed = credits > 0 ? 0 : 1
 *   Same blocking semantics — reserve account-switching for the credits-empty
 *   case rather than guessing a burn rate.
 *
 * Preflight is OFF by default (per quotaPreflight.isQuotaPreflightEnabled).
 * Monitor display is always available once the fetcher is registered.
 *
 * Cache: 60s in-memory, keyed by connectionId.
 *
 * Registration: call registerCrofUsageFetcher() once at server startup.
 */

import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";

const CROF_USAGE_URL = "https://crof.ai/usage_api/";
const CACHE_TTL_MS = 60_000;

/** Crof-specific quota info: surfaces both raw signals so the UI can show them. */
export interface CrofQuota extends QuotaInfo {
  /** Requests left today (null when not on a subscription plan). */
  usableRequests: number | null;
  /** USD credit balance. */
  credits: number;
}

interface CacheEntry {
  quota: CrofQuota;
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

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function getApiKey(connection: Record<string, unknown> | undefined): string | null {
  const raw = connection?.apiKey;
  if (typeof raw === "string" && raw.trim().length > 0) return raw.trim();
  return null;
}

// ─── Response parser ─────────────────────────────────────────────────────────

export function parseCrofUsageResponse(data: unknown): CrofQuota | null {
  const obj = toRecord(data);
  if (Object.keys(obj).length === 0) return null;

  const usableRequestsRaw = obj["usable_requests"];
  const usableRequests =
    usableRequestsRaw === null || usableRequestsRaw === undefined
      ? null
      : toNumber(usableRequestsRaw);

  const credits = toNumber(obj["credits"]) ?? 0;

  // Block (percentUsed = 1) only when the active bucket hits zero. Otherwise
  // surface the raw counts and leave switching decisions to the caller.
  let percentUsed = 0;
  if (usableRequests !== null) {
    percentUsed = usableRequests > 0 ? 0 : 1;
  } else {
    percentUsed = credits > 0 ? 0 : 1;
  }

  return {
    used: 0,
    total: usableRequests ?? 0,
    percentUsed,
    resetAt: null,
    usableRequests,
    credits,
  };
}

// ─── Core fetcher ────────────────────────────────────────────────────────────

export async function fetchCrofUsage(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  const apiKey = getApiKey(connection);
  if (!apiKey) {
    // No credentials available — fail open, never block requests on this.
    return null;
  }

  try {
    const response = await fetch(CROF_USAGE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        quotaCache.delete(connectionId);
      }
      return null;
    }

    const data = await response.json();
    const quota = parseCrofUsageResponse(data);
    if (!quota) return null;

    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    // Network error / timeout — fail open
    return null;
  }
}

/** Force-invalidate the cache for a connection (e.g., after a manual top-up). */
export function invalidateCrofUsageCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

// ─── Registration ────────────────────────────────────────────────────────────

/**
 * Register the CrofAI usage fetcher with both the preflight and monitor systems.
 * Call this once at server startup.
 */
export function registerCrofUsageFetcher(): void {
  registerQuotaFetcher("crof", fetchCrofUsage);
  registerMonitorFetcher("crof", fetchCrofUsage);
}
