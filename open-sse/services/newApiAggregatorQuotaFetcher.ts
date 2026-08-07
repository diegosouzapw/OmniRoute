/**
 * newApiAggregatorQuotaFetcher.ts — Generalized New-API / One-API / Sub2API
 * Aggregator Balance Quota Fetcher
 *
 * Generalizes the AgentRouter (agentrouterQuotaFetcher.ts) balance detection
 * so any OpenAI/Anthropic-compatible custom node pointing at a self-hosted
 * New-API / One-API / Sub2API gateway can report its balance.
 *
 * New-API (QuantumNous/new-api, a fork of One API) exposes:
 *
 *   GET {base}/api/user/self
 *     Authorization: Bearer {systemAccessToken}
 *     New-Api-User: {userId}
 *   -> { "data": { "quota": <int> } }  (raw New-API credit units)
 *
 * `quota_per_unit` (units per $1) defaults to 500000, overridable via
 * `providerSpecificData.quotaPerUnit`.
 *
 * Credentials: the System Access Token + New-Api-User id are read from
 * `connection.providerSpecificData.consoleApiKey` (reusing the existing generic
 * field, same precedent as AgentRouter/Bailian) and
 * `connection.providerSpecificData.newApiUserId` respectively.
 *
 * The `newApiAggregatorBalance` boolean flag in providerSpecificData must be
 * `true` for the fetcher to activate — this is the opt-in toggle.
 *
 * Cache: in-memory TTL (60s), same pattern as sibling fetchers.
 *
 * Registration: this module exports fetchNewApiAggregatorQuota for dynamic
 * dispatch; it does NOT self-register against a static provider key.
 * Dynamic dispatch is handled by quotaPreflight.ts + quotaMonitor.ts.
 */

import type { QuotaInfo } from "./quotaPreflight.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";
import { toNumber } from "@/shared/utils/numeric";

const SELF_PATH = "/api/user/self";

// New-API-wide default: units per $1. See #6850 — can be hardcoded rather
// than fetched from /api/status on every call.
const DEFAULT_QUOTA_PER_UNIT = 500_000;

const CACHE_TTL_MS = 60_000; // 60 seconds

export interface NewApiAggregatorQuota extends QuotaInfo {
  rawQuota: number;
  dollarBalance: number;
  limitReached: boolean;
}

interface CacheEntry {
  quota: NewApiAggregatorQuota;
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

/**
 * Strip trailing `/v1` (or `/v1/`) from a baseUrl so that node URLs like
 * `https://host/v1` still hit `{host}/api/user/self` rather than
 * `{host}/v1/api/user/self`.
 */
function stripV1Suffix(baseUrl: string): string {
  return baseUrl.replace(/\/v1\/?$/, "");
}

function extractCredentials(connection?: Record<string, unknown>): {
  systemAccessToken: string | null;
  userId: string | null;
  baseUrl: string | null;
  quotaPerUnit: number;
  aggregatorFlag: boolean;
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
  const rawBaseUrl =
    typeof providerSpecificData.baseUrl === "string" &&
    providerSpecificData.baseUrl.trim().length > 0
      ? providerSpecificData.baseUrl.trim()
      : null;
  const baseUrl = rawBaseUrl ? stripV1Suffix(rawBaseUrl) : null;

  const rawQuotaPerUnit = toNumber(providerSpecificData.quotaPerUnit, 0);
  const quotaPerUnit = rawQuotaPerUnit > 0 ? rawQuotaPerUnit : DEFAULT_QUOTA_PER_UNIT;

  const aggregatorFlag = providerSpecificData.newApiAggregatorBalance === true;

  return { systemAccessToken, userId, baseUrl, quotaPerUnit, aggregatorFlag };
}

function parseNewApiAggregatorQuotaResponse(
  data: unknown,
  quotaPerUnit: number
): NewApiAggregatorQuota | null {
  const obj = toRecord(data);
  const dataObj = toRecord(obj.data);

  const rawQuotaValue = "quota" in dataObj ? dataObj.quota : obj.quota;
  if (rawQuotaValue === undefined) return null;

  const rawQuota = toNumber(rawQuotaValue, -1);
  if (rawQuota < 0) return null;

  const dollarBalance = rawQuota / quotaPerUnit;
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
 * Fetch current quota for a New-API / One-API / Sub2API aggregator connection.
 *
 * @param connectionId - Connection ID from the DB (used to key the cache)
 * @param connection - Optional connection object with providerSpecificData credentials
 * @returns NewApiAggregatorQuota or null if fetch fails / no credentials / not opted in
 */
export async function fetchNewApiAggregatorQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  const { systemAccessToken, userId, baseUrl, quotaPerUnit, aggregatorFlag } =
    extractCredentials(connection);

  if (!aggregatorFlag) return null;
  if (!systemAccessToken || !userId || !baseUrl) return null;

  const url = `${baseUrl}${SELF_PATH}`;

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
    const quota = parseNewApiAggregatorQuotaResponse(data, quotaPerUnit);

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
export function invalidateNewApiAggregatorQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

/**
 * Check whether a connection has opted in to New-API aggregator balance
 * detection. Used by the dynamic dispatch in quotaPreflight / quotaMonitor.
 */
export function isNewApiAggregatorBalanceConnection(
  connection?: Record<string, unknown>
): boolean {
  const providerSpecificData = toRecord(connection?.providerSpecificData);
  return providerSpecificData.newApiAggregatorBalance === true;
}
