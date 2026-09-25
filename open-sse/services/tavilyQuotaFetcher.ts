/**
 * tavilyQuotaFetcher.ts — Tavily credit usage and quota
 *
 * Live credit pool for `tavily-search` and `tavily` connections.
 *
 * Endpoint:
 *   GET https://api.tavily.com/usage
 *   Authorization: Bearer <key>
 *
 * Response:
 *   {
 *     "key": { "usage": number, "limit": number | null, ... },
 *     "account": { "current_plan": string, "plan_usage": number, "plan_limit": number, ... }
 *   }
 *
 * Fail-open: missing key or upstream errors return null.
 * Cache: 60s in-memory TTL keyed by connectionId.
 */

import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";
import { toNumberOrNull } from "@/shared/utils/numeric";

const TAVILY_USAGE_URL = "https://api.tavily.com/usage";
const CACHE_TTL_MS = 60_000;
const REQUEST_TIMEOUT_MS = 8_000;

export interface TavilyQuota extends QuotaInfo {
  remainingCredits: number;
  planCredits: number;
  extraCreditsInferred: number;
  overPlan: boolean;
  limitReached: boolean;
  planName?: string;
}

interface CacheEntry {
  quota: TavilyQuota | null;
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

export function extractTavilyToken(connection?: Record<string, unknown>): string | null {
  if (typeof connection?.apiKey === "string" && connection.apiKey.trim()) {
    return connection.apiKey.trim();
  }
  const credentials = toRecord(connection?.credentials);
  if (typeof credentials.apiKey === "string" && credentials.apiKey.trim()) {
    return credentials.apiKey.trim();
  }
  return null;
}

export function parseTavilyCreditUsage(data: unknown): TavilyQuota | null {
  const root = toRecord(data);
  const keyObj = toRecord(root.key);
  const accountObj = toRecord(root.account);

  const planName =
    typeof accountObj.current_plan === "string" && accountObj.current_plan.trim()
      ? accountObj.current_plan.trim()
      : "Standard";

  const keyLimit = toNumberOrNull(keyObj.limit);
  const keyUsage = toNumberOrNull(keyObj.usage);

  const planLimit = toNumberOrNull(accountObj.plan_limit);
  const planUsage = toNumberOrNull(accountObj.plan_usage);
  const paygoLimit = toNumberOrNull(accountObj.paygo_limit);
  const paygoUsage = toNumberOrNull(accountObj.paygo_usage);

  // If a key-specific limit is specified, honor the key-specific limit & usage
  let planCredits: number | null = null;
  let totalCredits: number | null = null;
  let used: number | null = null;

  if (keyLimit !== null && keyLimit > 0) {
    planCredits = keyLimit;
    totalCredits = keyLimit;
    used = keyUsage !== null ? keyUsage : 0;
  } else if (planLimit !== null && planLimit >= 0) {
    // Tavily paygo allows overflow usage beyond plan_limit up to paygo_limit.
    // Total capacity is the base plan plus any paygo allowance (or actual paygo usage if uncapped).
    const paygoCap = Math.max(
      paygoLimit !== null && paygoLimit > 0 ? paygoLimit : 0,
      paygoUsage !== null && paygoUsage > 0 ? paygoUsage : 0
    );
    planCredits = planLimit;
    totalCredits = planLimit + paygoCap;
    used = (planUsage !== null ? planUsage : 0) + (paygoUsage !== null ? paygoUsage : 0);
  }

  if (planCredits === null || totalCredits === null || used === null) return null;

  const remainingCredits = Math.max(0, totalCredits - used);
  const extraCreditsInferred = Math.max(0, remainingCredits - planCredits);
  const overPlan = extraCreditsInferred > 0;
  const percentUsed = totalCredits > 0 ? used / totalCredits : 0;

  return {
    used,
    total: totalCredits,
    percentUsed,
    resetAt: null,
    remainingCredits,
    planCredits,
    extraCreditsInferred,
    overPlan,
    limitReached: remainingCredits <= 0 || percentUsed >= 1,
    planName,
  };
}

export function getTavilyBaseUrl(connection?: Record<string, unknown>): string | null {
  const envBase = process.env.TAVILY_BASE_URL?.trim();
  if (envBase && !envBase.includes("api.tavily.com")) {
    return envBase.replace(/\/+$/, "");
  }
  const providerData = toRecord(connection?.providerSpecificData);
  const connBase =
    typeof connection?.baseUrl === "string" ? connection.baseUrl : providerData?.baseUrl;
  if (typeof connBase === "string" && connBase.trim() && !connBase.includes("api.tavily.com")) {
    return connBase.trim().replace(/\/+$/, "");
  }
  return null;
}

export async function fetchTavilyQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<TavilyQuota | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  const customBase = getTavilyBaseUrl(connection);
  if (customBase) {
    return {
      used: 0,
      total: 0,
      percentUsed: 0,
      resetAt: null,
      remainingCredits: 0,
      planCredits: 0,
      extraCreditsInferred: 0,
      overPlan: false,
      limitReached: false,
      planName: "Self-Hosted",
    };
  }

  const token = extractTavilyToken(connection);
  if (!token) {
    quotaCache.set(connectionId, { quota: null, fetchedAt: Date.now() });
    return null;
  }

  try {
    await throttleQuotaFetch();

    const response = await fetch(TAVILY_USAGE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      quotaCache.set(connectionId, { quota: null, fetchedAt: Date.now() });
      return null;
    }

    const body = await response.json();
    const quota = parseTavilyCreditUsage(body);
    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    quotaCache.set(connectionId, { quota: null, fetchedAt: Date.now() });
    return null;
  }
}

export function invalidateTavilyQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

export function registerTavilyQuotaFetcher(): void {
  registerQuotaFetcher("tavily-search", fetchTavilyQuota);
  registerQuotaFetcher("tavily", fetchTavilyQuota);
  registerMonitorFetcher("tavily-search", fetchTavilyQuota);
  registerMonitorFetcher("tavily", fetchTavilyQuota);
}
