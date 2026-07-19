/**
 * v0QuotaFetcher.ts — v0 (Vercel) Dual-Window Quota Fetcher
 *
 * Implements QuotaFetcher for the `v0-vercel` provider (quotaPreflight.ts + quotaMonitor.ts).
 *
 * v0 has two independent quota signals, both reachable with the same routing API key:
 *   - credits:  GET https://api.v0.dev/v1/user/billing
 *               -> { billingType, data: { remaining, limit, reset } }
 *   - dailyOps: GET https://api.v0.dev/v1/rate-limits
 *               -> { remaining, limit, reset } (Platform-API daily operation quota)
 *
 * v0 has migrated its billing model before (message-based -> token/credit-based). We
 * defensively degrade to an "unknown" billingType rather than misparse an unrecognized
 * shape — matches the fail-open convention used by antigravityCredits.ts: an unknown or
 * failed fetch never disables the connection, it just yields no quota signal.
 *
 * Cache: in-memory TTL (60s), same pattern as sibling fetchers.
 *
 * Registration: call registerV0QuotaFetcher() once at server startup.
 */

import { registerQuotaFetcher, registerQuotaWindows, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";

const V0_CONFIG = {
  baseUrl: "https://api.v0.dev",
  billingPath: "/v1/user/billing",
  rateLimitsPath: "/v1/rate-limits",
};

export const V0_WINDOW_CREDITS = "credits";
export const V0_WINDOW_DAILY_OPS = "dailyOps";

const CACHE_TTL_MS = 60_000; // 60 seconds

export interface V0Quota extends QuotaInfo {
  windows: Record<string, { percentUsed: number; resetAt: string | null }>;
  billingType: string | "unknown";
}

interface CacheEntry {
  quota: V0Quota;
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

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function toIsoOrNull(value: unknown): string | null {
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    // v0 reset values are observed as ms-epoch timestamps in the documented shape.
    return new Date(value).toISOString();
  }
  return null;
}

/**
 * Parse a `{ remaining, limit, reset }`-shaped window. Returns null when the shape is
 * not recognized (defensive against future billing-model migrations).
 */
function parseWindow(data: unknown): { percentUsed: number; resetAt: string | null } | null {
  const obj = toRecord(data);
  if (!("remaining" in obj) || !("limit" in obj)) return null;

  const remaining = toNumber(obj.remaining, -1);
  const limit = toNumber(obj.limit, -1);
  if (remaining < 0 || limit <= 0) return null;

  const used = Math.max(0, limit - remaining);
  const percentUsed = Math.min(1, used / limit);

  return { percentUsed, resetAt: toIsoOrNull(obj.reset) };
}

interface WindowFetchResult {
  window: { percentUsed: number; resetAt: string | null } | null;
  billingType: string | null;
  invalidCredential: boolean;
}

/**
 * Fetch + parse a single v0 quota endpoint. Shared by the billing (credits) and
 * rate-limits (dailyOps) calls — the only difference is the response shape parser.
 */
async function fetchWindow(
  url: string,
  headers: Record<string, string>,
  parse: (data: unknown) => { billingType: string | null; window: WindowFetchResult["window"] }
): Promise<WindowFetchResult> {
  try {
    await throttleQuotaFetch();
    const response = await fetch(url, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(8_000),
    });

    if (response.status === 401 || response.status === 403) {
      return { window: null, billingType: null, invalidCredential: true };
    }
    if (!response.ok) {
      return { window: null, billingType: null, invalidCredential: false };
    }

    const data = await response.json();
    const parsed = parse(data);
    return { window: parsed.window, billingType: parsed.billingType, invalidCredential: false };
  } catch {
    return { window: null, billingType: null, invalidCredential: false };
  }
}

function parseRateLimitsResponse(data: unknown): {
  billingType: string | null;
  window: WindowFetchResult["window"];
} {
  return { billingType: null, window: parseWindow(data) };
}

function parseBillingResponse(data: unknown): {
  billingType: string | null;
  window: WindowFetchResult["window"];
} {
  const obj = toRecord(data);
  const billingType = typeof obj.billingType === "string" ? obj.billingType : "unknown";
  return { billingType, window: parseWindow(obj.data) };
}

/**
 * Merge the two fetched windows into the final V0Quota shape, or null when neither
 * endpoint returned a usable window (both failed / both unrecognized shapes).
 */
function buildV0Quota(
  windows: Record<string, { percentUsed: number; resetAt: string | null }>,
  billingType: string
): V0Quota | null {
  if (Object.keys(windows).length === 0) return null;

  const worstPercentUsed = Math.max(0, ...Object.values(windows).map((w) => w.percentUsed));
  const dominantWindow =
    Object.values(windows).find((w) => w.percentUsed === worstPercentUsed) ?? null;

  return {
    used: Math.round(worstPercentUsed * 100),
    total: 100,
    percentUsed: worstPercentUsed,
    resetAt: dominantWindow?.resetAt ?? null,
    windows,
    billingType,
  };
}

/**
 * Fetch current quota for a v0-vercel connection. Combines the billing (credits) window
 * with the daily Platform-API operation window into a single QuotaInfo. A partial
 * failure (one endpoint unreachable) still returns whatever window succeeded.
 *
 * @param connectionId - Connection ID from the DB (used to key the cache)
 * @param connection - Optional connection object with apiKey
 * @returns V0Quota or null if both fetches fail / no credentials
 */
export async function fetchV0Quota(
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

  if (!apiKey) {
    return null;
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const windows: Record<string, { percentUsed: number; resetAt: string | null }> = {};
  let billingType = "unknown";

  const billingResult = await fetchWindow(
    `${V0_CONFIG.baseUrl}${V0_CONFIG.billingPath}`,
    headers,
    parseBillingResponse
  );
  if (billingResult.window) {
    windows[V0_WINDOW_CREDITS] = billingResult.window;
    billingType = billingResult.billingType ?? "unknown";
  }

  const rateLimitsResult = await fetchWindow(
    `${V0_CONFIG.baseUrl}${V0_CONFIG.rateLimitsPath}`,
    headers,
    parseRateLimitsResponse
  );
  if (rateLimitsResult.window) {
    windows[V0_WINDOW_DAILY_OPS] = rateLimitsResult.window;
  }

  if (billingResult.invalidCredential || rateLimitsResult.invalidCredential) {
    quotaCache.delete(connectionId);
    return null;
  }

  const quota = buildV0Quota(windows, billingType);
  if (!quota) return null;

  quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
  return quota;
}

/**
 * Force-invalidate the cache for a connection (e.g. after a 429 to trigger reconciliation).
 */
export function invalidateV0QuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

/**
 * Register the v0 quota fetcher with the preflight and monitor systems.
 * Call this once at server startup (in chat.ts).
 */
export function registerV0QuotaFetcher(): void {
  registerQuotaFetcher("v0-vercel", fetchV0Quota);
  registerMonitorFetcher("v0-vercel", fetchV0Quota);
  registerQuotaWindows("v0-vercel", [V0_WINDOW_CREDITS, V0_WINDOW_DAILY_OPS]);
}
