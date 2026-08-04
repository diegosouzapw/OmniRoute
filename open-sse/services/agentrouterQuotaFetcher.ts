/**
 * agentrouterQuotaFetcher.ts — AgentRouter (New-API) Balance Quota Fetcher
 *
 * Implements QuotaFetcher for the `agentrouter` provider (quotaPreflight.ts + quotaMonitor.ts).
 *
 * AgentRouter is built on the New-API (QuantumNous/new-api) gateway, which exposes an
 * admin balance API distinct from the routing `sk-...` API key:
 *
 *   GET https://agentrouter.org/api/user/self
 *     Authorization: Bearer {systemAccessToken}
 *     New-Api-User: {userId}
 *   -> { "data": { "quota": <int> } }  (raw New-API credit units)
 *
 * `quota_per_unit` (units per $1) is a New-API-wide constant. The issue reporter notes it
 * can be hardcoded to 500000 without an extra call — we do that here to avoid a second
 * upstream round-trip per fetch (see #6850 open questions).
 *
 * Credentials: the System Access Token + New-Api-User id are read from
 * `connection.providerSpecificData.consoleApiKey` (reusing the existing generic field,
 * same precedent as Bailian's console token) and
 * `connection.providerSpecificData.newApiUserId` respectively — NOT the routing apiKey.
 *
 * Cache: in-memory TTL (60s), same pattern as sibling fetchers.
 *
 * Registration: call registerAgentrouterQuotaFetcher() once at server startup.
 */

import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";

const AGENTROUTER_CONFIG = {
  baseUrl: "https://agentrouter.org",
  selfPath: "/api/user/self",
};

// New-API-wide constant: units per $1. See #6850 — reporter confirms this can be
// hardcoded rather than fetched from /api/status on every call.
const QUOTA_PER_UNIT = 500_000;

const CACHE_TTL_MS = 60_000; // 60 seconds

export interface AgentrouterQuota extends QuotaInfo {
  rawQuota: number;
  dollarBalance: number;
  limitReached: boolean;
}

interface CacheEntry {
  quota: AgentrouterQuota;
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

function extractCredentials(connection?: Record<string, unknown>): {
  systemAccessToken: string | null;
  userId: string | null;
} {
  const providerSpecificData = toRecord(connection?.providerSpecificData);
  const systemAccessToken =
    typeof providerSpecificData.consoleApiKey === "string" &&
    providerSpecificData.consoleApiKey.trim().length > 0
      ? providerSpecificData.consoleApiKey
      : null;
  const userId =
    typeof providerSpecificData.newApiUserId === "string" &&
    providerSpecificData.newApiUserId.trim().length > 0
      ? providerSpecificData.newApiUserId
      : null;
  return { systemAccessToken, userId };
}

function parseAgentrouterQuotaResponse(data: unknown): AgentrouterQuota | null {
  const obj = toRecord(data);
  const dataObj = toRecord(obj.data);

  const rawQuotaValue = "quota" in dataObj ? dataObj.quota : obj.quota;
  if (rawQuotaValue === undefined) return null;

  const rawQuota = toNumber(rawQuotaValue, -1);
  if (rawQuota < 0) return null;

  const dollarBalance = rawQuota / QUOTA_PER_UNIT;
  const limitReached = rawQuota <= 0;
  // No known upstream "total" grant to compute a real percentage against — follow
  // DeepSeek's boolean-availability precedent (0% used = has balance, 100% = exhausted).
  const percentUsed = limitReached ? 1 : 0;

  return {
    used: percentUsed * 100,
    total: 100,
    percentUsed,
    resetAt: null,
    rawQuota,
    dollarBalance,
    limitReached,
  };
}

/**
 * Fetch current quota for an AgentRouter connection.
 *
 * @param connectionId - Connection ID from the DB (used to key the cache)
 * @param connection - Optional connection object with providerSpecificData credentials
 * @returns AgentrouterQuota or null if fetch fails / no credentials
 */
export async function fetchAgentrouterQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  const { systemAccessToken, userId } = extractCredentials(connection);
  if (!systemAccessToken || !userId) {
    return null;
  }

  const url = `${AGENTROUTER_CONFIG.baseUrl}${AGENTROUTER_CONFIG.selfPath}`;

  try {
    await throttleQuotaFetch();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${systemAccessToken}`,
        "New-Api-User": userId,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8_000),
    });

    if (response.status === 401 || response.status === 403) {
      quotaCache.delete(connectionId);
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const quota = parseAgentrouterQuotaResponse(data);

    if (!quota) return null;

    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    return null;
  }
}

/**
 * Force-invalidate the cache for a connection.
 */
export function invalidateAgentrouterQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

/**
 * Register the AgentRouter quota fetcher with the preflight and monitor systems.
 * Call this once at server startup (in chat.ts).
 */
export function registerAgentrouterQuotaFetcher(): void {
  registerQuotaFetcher("agentrouter", fetchAgentrouterQuota);
  registerMonitorFetcher("agentrouter", fetchAgentrouterQuota);
}
