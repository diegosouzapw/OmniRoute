import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";

/**
 * Context7 has no dedicated usage/billing endpoint, so quota is read from the
 * `ratelimit-*` headers of a real, cheap search call (`GET /search?query=react`).
 * Each uncached probe therefore consumes one unit of the limit it measures;
 * the 60 s cache keeps that cost bounded. Swap the probe if Context7 ever ships
 * a real usage endpoint.
 */
export const CONTEXT7_SEARCH_URL = "https://context7.com/api/v1/search";
const CONTEXT7_CACHE_TTL_MS = 60 * 1000;
const REQUEST_TIMEOUT_MS = 8_000;

export interface Context7Quota {
  used: number;
  total: number;
  percentUsed: number;
  resetAt: string | null;
  remainingCredits: number;
  planCredits: number;
  extraCreditsInferred: number;
  overPlan: boolean;
  limitReached: boolean;
  planName?: string;
}

interface CacheEntry {
  quota: Context7Quota | null;
  fetchedAt: number;
}

const quotaCache = new Map<string, CacheEntry>();
const inFlightRequests = new Map<string, Promise<Context7Quota | null>>();

function toRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

export function extractContext7Token(connection?: Record<string, unknown>): string | null {
  if (!connection) return null;
  if (typeof connection.apiKey === "string" && connection.apiKey) {
    return connection.apiKey;
  }
  const credentials = toRecord(connection.credentials);
  if (credentials && typeof credentials.apiKey === "string" && credentials.apiKey) {
    return credentials.apiKey;
  }
  if (typeof connection.accessToken === "string" && connection.accessToken) {
    return connection.accessToken;
  }
  return null;
}

export function parseContext7RateLimitHeaders(headers: Headers): Context7Quota | null {
  const limitStr = headers.get("ratelimit-limit");
  const remainingStr = headers.get("ratelimit-remaining");
  if (!limitStr || !remainingStr) return null;

  const total = parseInt(limitStr, 10);
  const remaining = parseInt(remainingStr, 10);
  if (Number.isNaN(total) || Number.isNaN(remaining) || total < 0 || remaining < 0) {
    return null;
  }

  const remainingCredits = Math.min(total, remaining);
  const used = Math.max(0, total - remainingCredits);
  const limitReached = remainingCredits <= 0;
  const percentUsed = total > 0 ? used / total : 0;

  let resetAt: string | null = null;
  const resetStr = headers.get("ratelimit-reset");
  if (resetStr) {
    const resetNum = parseInt(resetStr, 10);
    if (!Number.isNaN(resetNum) && resetNum > 0) {
      if (resetNum > 1_000_000_000) {
        resetAt = new Date(resetNum * 1000).toISOString();
      } else {
        resetAt = new Date(Date.now() + resetNum * 1000).toISOString();
      }
    }
  }

  return {
    used,
    total,
    percentUsed,
    resetAt,
    remainingCredits,
    planCredits: total,
    extraCreditsInferred: 0,
    overPlan: false,
    limitReached,
    planName: "Search Tier",
  };
}

async function dedupeQuotaFetch(
  connectionId: string,
  fetcher: () => Promise<Context7Quota | null>
): Promise<Context7Quota | null> {
  const existing = inFlightRequests.get(connectionId);
  if (existing) return existing;

  const p = (async () => {
    try {
      const quota = await fetcher();
      quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
      return quota;
    } catch {
      quotaCache.set(connectionId, { quota: null, fetchedAt: Date.now() });
      return null;
    } finally {
      inFlightRequests.delete(connectionId);
    }
  })();

  inFlightRequests.set(connectionId, p);
  return p;
}

export async function fetchContext7Quota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<Context7Quota | null> {
  if (!connectionId) return null;

  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CONTEXT7_CACHE_TTL_MS) {
    return cached.quota;
  }

  // Without a key the probe would read the ANONYMOUS (per-IP) rate limit and
  // attribute it to this connection — report "unknown" instead.
  const token = extractContext7Token(connection);
  if (!token) return null;

  return dedupeQuotaFetch(connectionId, async () => {
    await throttleQuotaFetch();
    const url = `${CONTEXT7_SEARCH_URL}?query=react`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    const quota = parseContext7RateLimitHeaders(response.headers);
    if (quota) {
      return quota;
    }

    quotaCache.set(connectionId, { quota: null, fetchedAt: Date.now() });
    return null;
  });
}

export function invalidateContext7QuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

export function registerContext7QuotaFetcher(): void {
  registerQuotaFetcher(
    "context7",
    fetchContext7Quota as (id: string, conn?: Record<string, unknown>) => Promise<QuotaInfo | null>
  );
  registerMonitorFetcher(
    "context7",
    fetchContext7Quota as (id: string, conn?: Record<string, unknown>) => Promise<QuotaInfo | null>
  );
}
