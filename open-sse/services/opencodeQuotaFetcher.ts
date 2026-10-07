/**
 * OpenCode Go / OpenCode / OpenCode Zen quota fetcher.
 *
 * The official API exposes rolling, weekly, and monthly usage percentages:
 *   GET https://opencode.ai/zen/go/v1/usage
 *   Authorization: Bearer <apiKey>
 *
 * Successful responses are cached for 60 seconds. Network, HTTP, and response
 * parsing failures remain fail-open so quota checks never block on missing data.
 */

import { registerQuotaFetcher, registerQuotaWindows, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";

const OPENCODE_QUOTA_URL =
  process.env.OMNIROUTE_OPENCODE_QUOTA_URL ?? "https://opencode.ai/zen/go/v1/usage";

const CACHE_TTL_MS = 60_000;

// Window keys surfaced to the quota UI and quota-window registry
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
  apiKey: string;
}

// In-memory cache: connectionId → successful quota bound to its normalized API key
const quotaCache = new Map<string, CacheEntry>();

// One-time 404 warning per URL (avoids spamming on every request)
const _warned404Urls = new Set<string>();

/**
 * Reset the 404-warning latch (test-only).
 * Exported for unit tests that want to verify the warning fires on each fresh
 * 404 response.
 */
export function _resetWarned404Urls(): void {
  _warned404Urls.clear();
}

/**
 * Check whether a URL has had its 404 warning already emitted (test-only).
 */
export function _hasWarned404(url: string): boolean {
  return _warned404Urls.has(url);
}

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

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

type ParsedUsageWindow = {
  percentUsed: number;
  resetAt: string;
  limitReached: boolean;
};

function parseUsageWindow(value: unknown): ParsedUsageWindow | null {
  const window = toRecord(value);
  const { status, percent, resetsAt } = window;
  if (
    (status !== "ok" && status !== "rate-limited") ||
    typeof percent !== "number" ||
    !Number.isFinite(percent) ||
    percent < 0 ||
    percent > 100 ||
    typeof resetsAt !== "string" ||
    !resetsAt ||
    !Number.isFinite(Date.parse(resetsAt))
  ) {
    return null;
  }

  return {
    percentUsed: status === "rate-limited" ? 1 : percent / 100,
    resetAt: resetsAt,
    limitReached: status === "rate-limited" || percent === 100,
  };
}

function parseOpencodeQuotaResponse(data: unknown): OpencodeTripleWindowQuota | null {
  const usage = toRecord(toRecord(data).usage);
  const rolling = parseUsageWindow(usage.rolling);
  const weekly = parseUsageWindow(usage.weekly);
  const monthly = parseUsageWindow(usage.monthly);
  if (!rolling || !weekly || !monthly) return null;

  const window5h = { percentUsed: rolling.percentUsed, resetAt: rolling.resetAt };
  const windowWeekly = { percentUsed: weekly.percentUsed, resetAt: weekly.resetAt };
  const windowMonthly = { percentUsed: monthly.percentUsed, resetAt: monthly.resetAt };
  const worstPercent = Math.max(
    window5h.percentUsed,
    windowWeekly.percentUsed,
    windowMonthly.percentUsed
  );
  const dominantResetAt =
    worstPercent === window5h.percentUsed
      ? window5h.resetAt
      : worstPercent === windowWeekly.percentUsed
        ? windowWeekly.resetAt
        : windowMonthly.resetAt;

  return {
    used: worstPercent * 100,
    total: 100,
    percentUsed: worstPercent,
    resetAt: dominantResetAt,
    windows: {
      [OPENCODE_WINDOW_5H]: window5h,
      [OPENCODE_WINDOW_WEEKLY]: windowWeekly,
      [OPENCODE_WINDOW_MONTHLY]: windowMonthly,
    },
    window5h,
    windowWeekly,
    windowMonthly,
    limitReached: rolling.limitReached || weekly.limitReached || monthly.limitReached,
  };
}

// ─── Core Fetcher ─────────────────────────────────────────────────────────────
/**
 * Fetch current quota for an OpenCode connection.
 * Returns null on missing credentials, HTTP errors, malformed responses, and
 * network failures so callers preserve fail-open behavior.
 */
export async function fetchOpencodeQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<OpencodeTripleWindowQuota | null> {
  const apiKey =
    typeof connection?.apiKey === "string"
      ? connection.apiKey
          .trim()
          .replace(/^Bearer\s+/i, "")
          .trim()
      : "";
  if (!apiKey) return null;

  const cached = quotaCache.get(connectionId);
  if (cached && cached.apiKey === apiKey && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  try {
    await throttleQuotaFetch();
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
      if (response.status === 404 && !_warned404Urls.has(OPENCODE_QUOTA_URL)) {
        _warned404Urls.add(OPENCODE_QUOTA_URL);
        console.warn(
          `[opencodeQuotaFetcher] Official usage endpoint ${OPENCODE_QUOTA_URL} returned 404. ` +
            "Verify OMNIROUTE_OPENCODE_QUOTA_URL when using a relay or test server."
        );
      }
      if (response.status === 401 || response.status === 403) quotaCache.delete(connectionId);
      return null;
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      return null;
    }

    const quota = parseOpencodeQuotaResponse(data);
    if (!quota) return null;

    quotaCache.set(connectionId, { quota, fetchedAt: Date.now(), apiKey });
    return quota;
  } catch {
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
