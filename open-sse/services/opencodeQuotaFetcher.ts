/**
 * opencodeQuotaFetcher.ts — OpenCode Go / OpenCode / OpenCode Zen Quota Fetcher
 *
 * Implements QuotaFetcher for the opencode-go, opencode, and opencode-zen providers
 * (quotaPreflight.ts + quotaMonitor.ts).
 *
 * OpenCode Go has THREE independent quota windows per subscription:
 *   - 5-hour (rolling):  $12 of usage
 *   - Weekly:            $30 of usage
 *   - Monthly:           $60 of usage
 *
 * Upstream endpoint (defensive — pending full API confirmation):
 *   GET https://opencode.ai/zen/go/v1/quota
 *   Authorization: Bearer <apiKey>
 *
 * Expected response shape:
 *   {
 *     quota: {
 *       window_5h:      { used: number, limit: number, reset_at: number | null },
 *       window_weekly:  { used: number, limit: number, reset_at: number | null },
 *       window_monthly: { used: number, limit: number, reset_at: number | null }
 *     }
 *   }
 *
 * NOTE: This fetcher is implemented defensively based on the community plugin
 * (guyinwonder168/opencode-glm-quota) and the quota windows reported in issue #2852.
 * On any non-200 / parse failure it returns null (fail-open) with a log.debug —
 * not log.warn — so users not on opencode-go don't see noise. Once the upstream
 * API endpoint is publicly documented, the endpoint path can be confirmed/updated
 * without touching this logic.
 *
 * Cache: in-memory TTL (60s) to avoid hammering the quota API on every request.
 *
 * Registration: call registerOpencodeQuotaFetcher() once at server startup.
 */

import { registerQuotaFetcher, registerQuotaWindows, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";

// OpenCode quota endpoint — same key works across opencode, opencode-go, opencode-zen
// (#2852) Defensive: based on provider baseUrl + /quota suffix (community plugin pattern)
const OPENCODE_QUOTA_URL =
  process.env.OMNIROUTE_OPENCODE_QUOTA_URL ?? "https://opencode.ai/zen/go/v1/quota";

// Cache TTL — matches Codex / DeepSeek / Bailian pattern (60s)
const CACHE_TTL_MS = 60_000;

// Window keys as surfaced to the dashboard and quota-window registry
export const OPENCODE_WINDOW_5H = "window_5h";
export const OPENCODE_WINDOW_WEEKLY = "window_weekly";
export const OPENCODE_WINDOW_MONTHLY = "window_monthly";

// Triple-window quota info
export interface OpencodeTripleWindowQuota extends QuotaInfo {
  window5h: { percentUsed: number; resetAt: string | null };
  windowWeekly: { percentUsed: number; resetAt: string | null };
  windowMonthly: { percentUsed: number; resetAt: string | null };
  limitReached: boolean;
}

interface CacheEntry {
  quota: OpencodeTripleWindowQuota;
  fetchedAt: number;
}

// In-memory cache: connectionId → { quota, fetchedAt }
const quotaCache = new Map<string, CacheEntry>();

// Auto-cleanup stale entries every 5 minutes
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function parseWindowResetAt(window: Record<string, unknown>): string | null {
  const resetAt = toNumber(window["reset_at"] ?? window["resetAt"], 0);
  if (resetAt > 0) {
    // Unix timestamp in seconds (< 1e12) or milliseconds (>= 1e12)
    return new Date(resetAt < 1e12 ? resetAt * 1000 : resetAt).toISOString();
  }
  const resetAfterSeconds = toNumber(
    window["reset_after_seconds"] ?? window["resetAfterSeconds"],
    0
  );
  if (resetAfterSeconds > 0) {
    return new Date(Date.now() + resetAfterSeconds * 1000).toISOString();
  }
  return null;
}

function parseWindowPercent(window: Record<string, unknown>): number {
  const used = toNumber(window["used"] ?? window["used_amount"], 0);
  const limit = toNumber(window["limit"] ?? window["limit_amount"], 0);
  if (limit <= 0) return 0;
  return Math.max(0, Math.min(1, used / limit));
}

// ─── Response Parser ──────────────────────────────────────────────────────────

function parseOpencodeQuotaResponse(data: unknown): OpencodeTripleWindowQuota | null {
  const obj = toRecord(data);
  const quotaObj = toRecord(obj["quota"] ?? obj["data"] ?? obj["usage"]);

  // Look for windows under various possible keys
  const w5h = toRecord(
    quotaObj[OPENCODE_WINDOW_5H] ?? quotaObj["5h"] ?? quotaObj["hourly"] ?? quotaObj["short"]
  );
  const wWeekly = toRecord(
    quotaObj[OPENCODE_WINDOW_WEEKLY] ??
      quotaObj["weekly"] ??
      quotaObj["week"] ??
      quotaObj["wk"]
  );
  const wMonthly = toRecord(
    quotaObj[OPENCODE_WINDOW_MONTHLY] ??
      quotaObj["monthly"] ??
      quotaObj["month"] ??
      quotaObj["mo"]
  );

  const has5h = Object.keys(w5h).length > 0;
  const hasWeekly = Object.keys(wWeekly).length > 0;
  const hasMonthly = Object.keys(wMonthly).length > 0;

  // Need at least one window to be meaningful
  if (!has5h && !hasWeekly && !hasMonthly) return null;

  const percent5h = has5h ? parseWindowPercent(w5h) : 0;
  const percentWeekly = hasWeekly ? parseWindowPercent(wWeekly) : 0;
  const percentMonthly = hasMonthly ? parseWindowPercent(wMonthly) : 0;

  const resetAt5h = has5h ? parseWindowResetAt(w5h) : null;
  const resetAtWeekly = hasWeekly ? parseWindowResetAt(wWeekly) : null;
  const resetAtMonthly = hasMonthly ? parseWindowResetAt(wMonthly) : null;

  const worstPercent = Math.max(percent5h, percentWeekly, percentMonthly);
  const limitReached = Boolean(obj["limit_reached"] ?? quotaObj["limit_reached"]) || worstPercent >= 1;

  // Dominant reset: pick the window with the worst usage
  let dominantResetAt: string | null = null;
  if (worstPercent === percent5h) {
    dominantResetAt = resetAt5h ?? resetAtWeekly ?? resetAtMonthly;
  } else if (worstPercent === percentWeekly) {
    dominantResetAt = resetAtWeekly ?? resetAt5h ?? resetAtMonthly;
  } else {
    dominantResetAt = resetAtMonthly ?? resetAtWeekly ?? resetAt5h;
  }

  const window5h = { percentUsed: percent5h, resetAt: resetAt5h };
  const windowWeekly = { percentUsed: percentWeekly, resetAt: resetAtWeekly };
  const windowMonthly = { percentUsed: percentMonthly, resetAt: resetAtMonthly };

  const windows: Record<string, { percentUsed: number; resetAt: string | null }> = {};
  if (has5h) windows[OPENCODE_WINDOW_5H] = window5h;
  if (hasWeekly) windows[OPENCODE_WINDOW_WEEKLY] = windowWeekly;
  if (hasMonthly) windows[OPENCODE_WINDOW_MONTHLY] = windowMonthly;

  return {
    used: worstPercent * 100,
    total: 100,
    percentUsed: worstPercent,
    resetAt: dominantResetAt,
    windows,
    window5h,
    windowWeekly,
    windowMonthly,
    limitReached,
  };
}

// ─── Core Fetcher ─────────────────────────────────────────────────────────────

/**
 * Fetch current quota for an OpenCode connection.
 * Returns percentUsed = max(5h%, weekly%, monthly%) — worst-case across all windows.
 *
 * Defensive implementation: returns null on any non-200 / parse failure (fail-open).
 * See module-level JSDoc for upstream API stability note.
 *
 * @param connectionId - Connection ID from the DB (used for cache keying)
 * @param connection - Optional connection snapshot with apiKey
 * @returns OpencodeTripleWindowQuota or null if fetch fails / no credentials
 */
export async function fetchOpencodeQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<OpencodeTripleWindowQuota | null> {
  // Check cache first
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  // Extract API key from connection
  const apiKey =
    typeof connection?.apiKey === "string" && connection.apiKey.trim().length > 0
      ? connection.apiKey
      : null;

  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(OPENCODE_QUOTA_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      // Fail-open on all non-2xx responses — log.debug, not log.warn, to avoid
      // spam for users who aren't on opencode-go. 401/403 additionally clear cache.
      if (response.status === 401 || response.status === 403) {
        quotaCache.delete(connectionId);
      }
      return null;
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      // Malformed JSON — fail open
      return null;
    }

    const quota = parseOpencodeQuotaResponse(data);
    if (!quota) return null;

    // Store in cache
    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    // Network error, timeout, etc. — fail open
    return null;
  }
}

// ─── Invalidation ─────────────────────────────────────────────────────────────

/**
 * Force-invalidate the cache for a connection (e.g., after receiving quota headers).
 */
export function invalidateOpencodeQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * Register the OpenCode quota fetcher with the preflight and monitor systems
 * for all three provider variants: opencode-go, opencode, opencode-zen.
 *
 * Call this once at server startup (in chat.ts, before registerGenericQuotaFetchers).
 */
export function registerOpencodeQuotaFetcher(): void {
  for (const provider of ["opencode-go", "opencode", "opencode-zen"] as const) {
    registerQuotaFetcher(provider, fetchOpencodeQuota);
    registerMonitorFetcher(provider, fetchOpencodeQuota);
    registerQuotaWindows(provider, [
      OPENCODE_WINDOW_5H,
      OPENCODE_WINDOW_WEEKLY,
      OPENCODE_WINDOW_MONTHLY,
    ]);
  }
}
