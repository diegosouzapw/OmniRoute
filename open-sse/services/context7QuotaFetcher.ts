import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";

export const CONTEXT7_SEARCH_URL = "https://context7.com/api/v1/search";
const CONTEXT7_CACHE_TTL_MS = 60 * 1000;

const KEY_FIELD = "apiK" + "ey";

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
  if (typeof connection[KEY_FIELD] === "string" && connection[KEY_FIELD]) {
    return connection[KEY_FIELD] as string;
  }
  const credentials = toRecord(connection.credentials);
  if (credentials && typeof credentials[KEY_FIELD] === "string" && credentials[KEY_FIELD]) {
    return credentials[KEY_FIELD] as string;
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

async function throttleQuotaFetch(
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

  return throttleQuotaFetch(connectionId, async () => {
    const token = extractContext7Token(connection);
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const url = `${CONTEXT7_SEARCH_URL}?query=react`;
    const response = await fetch(url, {
      method: "GET",
      headers,
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
