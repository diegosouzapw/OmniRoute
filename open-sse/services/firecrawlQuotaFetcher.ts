/**
 * firecrawlQuotaFetcher.ts — Firecrawl team credit quota
 *
 * Live credit pool for the `firecrawl` connection (web fetch + search).
 *
 * Endpoint:
 *   GET https://api.firecrawl.dev/v2/team/credit-usage
 *   Authorization: Bearer <apiKey>
 *
 * Response:
 *   {
 *     success: true,
 *     data: {
 *       remainingCredits: number,
 *       planCredits: number,
 *       billingPeriodStart?: string,
 *       billingPeriodEnd?: string
 *     }
 *   }
 *
 * Fail-open: missing key or upstream errors return null.
 * Cache: 60s in-memory TTL keyed by connectionId.
 */

import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";
import { toNumberOrNull } from "@/shared/utils/numeric";

const CREDIT_USAGE_URL = "https://api.firecrawl.dev/v2/team/credit-usage";
const CACHE_TTL_MS = 60_000;
const REQUEST_TIMEOUT_MS = 8_000;

export interface FirecrawlQuota extends QuotaInfo {
  remainingCredits: number;
  planCredits: number;
  extraCreditsInferred: number;
  overPlan: boolean;
  limitReached: boolean;
}

interface CacheEntry {
  quota: FirecrawlQuota | null;
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

export function extractFirecrawlApiKey(connection?: Record<string, unknown>): string | null {
  if (typeof connection?.apiKey === "string" && connection.apiKey.trim()) {
    return connection.apiKey.trim();
  }
  const credentials = toRecord(connection?.credentials);
  if (typeof credentials.apiKey === "string" && credentials.apiKey.trim()) {
    return credentials.apiKey.trim();
  }
  return null;
}

export function parseFirecrawlCreditUsage(data: unknown): FirecrawlQuota | null {
  const root = toRecord(data);
  const payload = toRecord(root.data);
  const remaining = toNumberOrNull(payload.remainingCredits ?? payload.remaining_credits);
  const plan = toNumberOrNull(payload.planCredits ?? payload.plan_credits);
  if (remaining === null || plan === null || plan < 0) return null;

  const planCredits = Math.max(0, plan);
  const remainingCredits = Math.max(0, remaining);
  const extraCreditsInferred = Math.max(0, remainingCredits - planCredits);
  const overPlan = extraCreditsInferred > 0;
  const used = planCredits > 0 ? Math.max(0, planCredits - remainingCredits) : 0;
  const percentUsed = planCredits > 0 ? used / planCredits : remainingCredits <= 0 ? 1 : 0;
  const resetRaw = payload.billingPeriodEnd ?? payload.billing_period_end;
  const resetAt = typeof resetRaw === "string" && resetRaw.trim() ? resetRaw.trim() : null;

  return {
    used,
    total: planCredits,
    percentUsed,
    resetAt,
    remainingCredits,
    planCredits,
    extraCreditsInferred,
    overPlan,
    limitReached: remainingCredits <= 0 || percentUsed >= 1,
  };
}

export function getFirecrawlBaseUrl(connection?: Record<string, unknown>): string | null {
  const envBase = process.env.FIRECRAWL_BASE_URL?.trim();
  if (envBase && !envBase.includes("api.firecrawl.dev")) {
    return envBase.replace(/\/+$/, "");
  }
  const providerData = toRecord(connection?.providerSpecificData);
  const connBase = typeof connection?.baseUrl === "string" ? connection.baseUrl : providerData?.baseUrl;
  if (typeof connBase === "string" && connBase.trim() && !connBase.includes("api.firecrawl.dev")) {
    return connBase.trim().replace(/\/+$/, "");
  }
  return null;
}

export async function fetchFirecrawlQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  const customBase = getFirecrawlBaseUrl(connection);
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
    };
  }

  const apiKey = extractFirecrawlApiKey(connection);
  if (!apiKey) {
    quotaCache.set(connectionId, { quota: null, fetchedAt: Date.now() });
    return null;
  }

  try {
    await throttleQuotaFetch();

    const response = await fetch(CREDIT_USAGE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (response.status === 401 || response.status === 403) {
      quotaCache.set(connectionId, { quota: null, fetchedAt: Date.now() });
      return null;
    }
    if (!response.ok) {
      return null;
    }

    const body = await response.json();
    const quota = parseFirecrawlCreditUsage(body);
    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    quotaCache.set(connectionId, { quota: null, fetchedAt: Date.now() });
    return null;
  }
}

export function invalidateFirecrawlQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

export function registerFirecrawlQuotaFetcher(): void {
  registerQuotaFetcher("firecrawl", fetchFirecrawlQuota);
  registerMonitorFetcher("firecrawl", fetchFirecrawlQuota);
}
