/**
 * bailianQuotaFetcher.ts — Alibaba Coding Plan (Bailian) Triple-Window Quota Fetcher
 *
 * Implements QuotaFetcher for the bailian-coding-plan provider (quotaPreflight.ts + quotaMonitor.ts).
 * This fetcher is specific to the Alibaba Coding Plan quota API.
 *
 * Bailian Coding Plan has THREE independent quota windows:
 *   - 5h:       short-term rate limit, resets every 5 hours
 *   - weekly:   weekly limit, resets every week
 *   - monthly:  monthly billing limit
 *
 * We return percentUsed = max(5h%, weekly%, monthly%) so the system switches accounts when
 * ANY window approaches exhaustion (95% threshold).
 *
 * [Oracle CONDITIONAL] consoleApiKey is bailian-coding-plan specific. Do NOT reuse for other providers.
 *
 * Cache: in-memory TTL (60s) to avoid hammering the usage API on every request.
 *
 * Registration: call registerBailianCodingPlanQuotaFetcher() once at server startup.
 */

import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";

// Bailian quota hosts (international / china fallback)
const BAILIAN_QUOTA_HOSTS = {
  international: "https://modelstudio.console.alibabacloud.com",
  china: "https://bailian.console.aliyun.com",
} as const;

const BAILIAN_QUOTA_PATH =
  "/data/api.json?action=zeldaEasy.broadscope-bailian.codingPlan.queryCodingPlanInstanceInfoV2&product=broadscope-bailian&api=queryCodingPlanInstanceInfoV2";

// Cache TTL — short enough to be reactive, long enough to avoid rate limits
const CACHE_TTL_MS = 60_000; // 60 seconds

// Triple-window quota info (richer than QuotaInfo — includes all 3 windows)
// [Oracle CONDITIONAL] bailian-coding-plan only — do not reuse for other providers
export interface BailianTripleWindowQuota extends QuotaInfo {
  window5h: { percentUsed: number; resetAt: string | null };
  windowWeekly: { percentUsed: number; resetAt: string | null };
  windowMonthly: { percentUsed: number; resetAt: string | null };
}

interface CacheEntry {
  quota: BailianTripleWindowQuota;
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

function getAuthKey(
  providerSpecificData: Record<string, unknown> | undefined,
  apiKey: string
): string {
  // [Oracle CONDITIONAL] consoleApiKey is bailian-coding-plan specific only
  const consoleKey = providerSpecificData?.consoleApiKey;
  if (typeof consoleKey === "string" && consoleKey.trim().length > 0) {
    return consoleKey;
  }
  return apiKey;
}

function getHost(): string {
  return process.env.ALIBABA_CODING_PLAN_HOST || BAILIAN_QUOTA_HOSTS.international;
}

function getQuotaUrl(): string {
  return process.env.ALIBABA_CODING_PLAN_QUOTA_URL || `${getHost()}${BAILIAN_QUOTA_PATH}`;
}

function buildHeaders(authKey: string): Record<string, string> {
  return {
    Authorization: `Bearer ${authKey}`,
    "x-api-key": authKey,
    "X-DashScope-API-Key": authKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

// ─── Response Parser ─────────────────────────────────────────────────────────

function parseBailianQuotaResponse(data: unknown): BailianTripleWindowQuota | null {
  const obj = toRecord(data);

  if (obj["code"] === "ConsoleNeedLogin") {
    // Caller will handle fallback — return null here to signal no usable data
    return null;
  }

  if (obj["code"] !== "Success" && obj["code"] !== "200") {
    return null;
  }

  const dataObj = toRecord(obj["data"]);
  const instanceInfos = dataObj["codingPlanInstanceInfos"];

  if (!Array.isArray(instanceInfos) || instanceInfos.length === 0) {
    return null;
  }

  const instance = toRecord(instanceInfos[0]);
  const quotaInfo = toRecord(instance["codingPlanQuotaInfo"]);

  if (Object.keys(quotaInfo).length === 0) {
    return null;
  }

  // Parse 5h window
  const used5h = toNumber(quotaInfo["per5HourUsedQuota"]);
  const total5h = toNumber(quotaInfo["per5HourTotalQuota"]);
  const resetAt5h = toNumber(quotaInfo["per5HourQuotaNextRefreshTime"]);
  const pct5h = total5h > 0 ? used5h / total5h : 0;

  // Parse weekly window
  const usedWeekly = toNumber(quotaInfo["perWeekUsedQuota"]);
  const totalWeekly = toNumber(quotaInfo["perWeekTotalQuota"]);
  const resetAtWeekly = toNumber(quotaInfo["perWeekQuotaNextRefreshTime"]);
  const pctWeekly = totalWeekly > 0 ? usedWeekly / totalWeekly : 0;

  // Parse monthly window
  const usedMonthly = toNumber(quotaInfo["perBillMonthUsedQuota"]);
  const totalMonthly = toNumber(quotaInfo["perBillMonthTotalQuota"]);
  const resetAtMonthly = toNumber(quotaInfo["perBillMonthQuotaNextRefreshTime"]);
  const pctMonthly = totalMonthly > 0 ? usedMonthly / totalMonthly : 0;

  // Most restrictive window = highest percentUsed
  const worstPercentUsed = Math.max(pct5h, pctWeekly, pctMonthly);

  const window5h = {
    percentUsed: pct5h,
    resetAt: resetAt5h > 0 ? new Date(resetAt5h * 1000).toISOString() : null,
  };
  const windowWeekly = {
    percentUsed: pctWeekly,
    resetAt: resetAtWeekly > 0 ? new Date(resetAtWeekly * 1000).toISOString() : null,
  };
  const windowMonthly = {
    percentUsed: pctMonthly,
    resetAt: resetAtMonthly > 0 ? new Date(resetAtMonthly * 1000).toISOString() : null,
  };

  // Dominant reset = reset time of the most restrictive window
  const dominantResetAt =
    worstPercentUsed === pct5h
      ? window5h.resetAt
      : worstPercentUsed === pctWeekly
        ? windowWeekly.resetAt
        : windowMonthly.resetAt;

  return {
    used: Math.round(worstPercentUsed * 100),
    total: 100,
    percentUsed: worstPercentUsed,
    resetAt: dominantResetAt,
    window5h,
    windowWeekly,
    windowMonthly,
  };
}

// ─── Core Fetcher ────────────────────────────────────────────────────────────

/**
 * Fetch current quota for a Bailian Coding Plan connection.
 * Returns percentUsed = max(5h%, weekly%, monthly%) — worst-case across all 3 windows.
 *
 * @param connectionId - Connection ID from the DB (used to look up credentials)
 * @param connection - Optional connection object with apiKey / providerSpecificData
 * @returns BailianTripleWindowQuota or null if fetch fails
 */
export async function fetchBailianQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  // Check cache first
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  // Extract credentials from connection snapshot
  const providerSpecificData =
    connection?.providerSpecificData &&
    typeof connection.providerSpecificData === "object" &&
    !Array.isArray(connection.providerSpecificData)
      ? (connection.providerSpecificData as Record<string, unknown>)
      : undefined;

  const apiKey =
    typeof connection?.apiKey === "string" && connection.apiKey.trim().length > 0
      ? connection.apiKey
      : "";

  const authKey = getAuthKey(providerSpecificData, apiKey);

  if (!authKey) {
    return null;
  }

  const headers = buildHeaders(authKey);

  try {
    const url = getQuotaUrl();
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({}),
      signal: AbortSignal.timeout(8_000),
    });

    const rawData = await response.json();
    const obj = toRecord(rawData);

    // ConsoleNeedLogin → retry with China host exactly once
    if (obj["code"] === "ConsoleNeedLogin") {
      try {
        const chinaUrl = process.env.ALIBABA_CODING_PLAN_QUOTA_URL
          ? url
          : `${BAILIAN_QUOTA_HOSTS.china}${BAILIAN_QUOTA_PATH}`;

        const retryResponse = await fetch(chinaUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({}),
          signal: AbortSignal.timeout(8_000),
        });

        const retryData = await retryResponse.json();
        const quota = parseBailianQuotaResponse(retryData);

        if (quota) {
          quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
          return quota;
        }

        return null;
      } catch {
        // China host also failed — fail open
        return null;
      }
    }

    const quota = parseBailianQuotaResponse(rawData);

    if (!quota) return null;

    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    // Network error, timeout, etc. — fail open
    return null;
  }
}

// ─── Invalidation ────────────────────────────────────────────────────────────

/**
 * Force-invalidate the cache for a connection (e.g., after receiving quota headers).
 */
export function invalidateBailianQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * Register the Bailian quota fetcher with the preflight and monitor systems.
 * Call this once at server startup (in chat.ts or app entry point).
 */
export function registerBailianCodingPlanQuotaFetcher(): void {
  registerQuotaFetcher("bailian-coding-plan", fetchBailianQuota);
  registerMonitorFetcher("bailian-coding-plan", fetchBailianQuota);
}
