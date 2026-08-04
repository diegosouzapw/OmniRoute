/**
 * xaiOauthQuotaFetcher.ts — Weekly quota for xAI OAuth (Grok) provider
 *
 * Live weekly pool for the `xai-oauth` provider (public alias `xao`).
 *
 * Endpoint (same unified weekly pool as grok-web / Grok CLI usage):
 *   GET https://cli-chat-proxy.grok.com/v1/billing?format=credits
 *   Authorization: Bearer <connection accessToken>
 *
 * Response mapping:
 *   creditUsagePercent (0–100, percent **used**) → QuotaInfo.percentUsed (0–1)
 *   currentPeriod.end → resetAt
 *
 * Auth comes from the OAuth connection (accessToken on the connection root or
 * under credentials), not from ~/.grok/auth.json.
 *
 * Fail-open: missing token or upstream errors return null — quota tracking must
 * never block routing.
 *
 * Cache: 60s in-memory TTL keyed by connectionId.
 *
 * Registration: registerXaiOauthQuotaFetcher() via quotaTrackersBatch side-effect
 * import (before registerGenericQuotaFetchers).
 */

import {
  fetchGrokBillingWithToken,
  grokBillingSnapshotToQuotaInfo,
  GROK_WINDOW_WEEKLY,
} from "./grokQuotaFetcher.ts";
import { registerQuotaFetcher, registerQuotaWindows, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";

const CACHE_TTL_MS = 60_000;
const REQUEST_TIMEOUT_MS = 10_000;

/** Provider id + public alias (registry.alias). */
const XAI_OAUTH_PROVIDER_IDS = ["xai-oauth", "xao"] as const;

interface CacheEntry {
  quota: QuotaInfo | null;
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
if (typeof _cacheCleanup === "object" && _cacheCleanup && "unref" in _cacheCleanup) {
  (_cacheCleanup as { unref?: () => void }).unref?.();
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/**
 * Resolve bearer token from Provider Limits (root accessToken) or executor
 * (credentials.accessToken) shapes.
 */
export function extractXaiOauthAccessToken(connection?: Record<string, unknown>): string | null {
  if (typeof connection?.accessToken === "string" && connection.accessToken.trim()) {
    return connection.accessToken.trim();
  }
  const credentials = toRecord(connection?.credentials);
  if (typeof credentials.accessToken === "string" && credentials.accessToken.trim()) {
    return credentials.accessToken.trim();
  }
  return null;
}

/**
 * Fetch weekly credit usage for an xai-oauth connection.
 *
 * @param connectionId - DB connection id (cache key)
 * @param connection - optional connection with accessToken
 * @returns QuotaInfo with weekly window, or null (fail-open)
 */
export async function fetchXaiOauthQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  const accessToken = extractXaiOauthAccessToken(connection);
  if (!accessToken) {
    quotaCache.set(connectionId, { quota: null, fetchedAt: Date.now() });
    return null;
  }

  try {
    await throttleQuotaFetch();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const snap = await fetchGrokBillingWithToken(accessToken, controller.signal);
      const quota = grokBillingSnapshotToQuotaInfo(snap);
      quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
      return quota;
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    // Fail-open: never disable the connection on quota fetch failure.
    // Provider Limits OAuth path refreshes tokens before a manual refresh.
    quotaCache.set(connectionId, { quota: null, fetchedAt: Date.now() });
    return null;
  }
}

export function invalidateXaiOauthQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

/**
 * Register weekly quota fetchers for preflight + monitor.
 * Call once at server startup (quotaTrackersBatch).
 */
export function registerXaiOauthQuotaFetcher(): void {
  for (const provider of XAI_OAUTH_PROVIDER_IDS) {
    registerQuotaFetcher(provider, fetchXaiOauthQuota);
    registerMonitorFetcher(provider, fetchXaiOauthQuota);
    registerQuotaWindows(provider, [GROK_WINDOW_WEEKLY]);
  }
}
