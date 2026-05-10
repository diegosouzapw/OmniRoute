/**
 * deepseekQuotaFetcher.ts — DeepSeek Balance Quota Fetcher
 *
 * Implements QuotaFetcher for the DeepSeek provider (quotaPreflight.ts + quotaMonitor.ts).
 *
 * DeepSeek provides a balance API:
 *   GET https://api.deepseek.com/user/balance
 *
 * Response format:
 *   {
 *     "is_available": true,
 *     "balance_infos": [
 *       { "currency": "USD", "total_balance": "10.00", "granted_balance": "0.00", "topped_up_balance": "10.00" }
 *     ]
 *   }
 *
 * We prefer USD if available, otherwise use CNY. When balance is zero or is_available is false,
 * the account quota is considered exhausted.
 *
 * Cache: in-memory TTL (60s) to avoid hammering the balance API on every request.
 *
 * Registration: call registerDeepseekQuotaFetcher() once at server startup.
 */

import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";

// DeepSeek API config
const DEEPSEEK_CONFIG = {
  baseUrl: "https://api.deepseek.com",
  balancePath: "/user/balance",
};

// Cache TTL — short enough to be reactive, long enough to avoid rate limits
const CACHE_TTL_MS = 60_000; // 60 seconds

// DeepSeek quota interface
export interface DeepseekQuota extends QuotaInfo {
  balances: BalanceInfo[];
  isAvailable: boolean;
  limitReached: boolean;
  windowDaily?: { percentUsed: number; resetAt: string | null };
}

export interface BalanceInfo {
  currency: string;
  balance: number;
  totalBalance: number;
  grantedBalance: number;
  toppedUpBalance: number;
}

interface CacheEntry {
  quota: DeepseekQuota;
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

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

// ─── Response Parser ─────────────────────────────────────────────────────────

function parseDeepseekQuotaResponse(data: unknown): DeepseekQuota | null {
  const obj = toRecord(data);

  // Check is_available field
  const isAvailable = obj.is_available ?? obj.isAvailable;
  const isAvailableBool = isAvailable === true;

  // Parse all balance infos
  const balanceInfos = parseAllBalanceInfos(obj);

  if (!balanceInfos || balanceInfos.length === 0) {
    return null;
  }

  // Check if any balance is exhausted
  const hasPositiveBalance = balanceInfos.some((b) => b.balance > 0);
  const limitReached = !isAvailableBool || !hasPositiveBalance;

  // percentUsed is inverse: 0% used when balance is full, 100% when exhausted
  const percentUsed = limitReached ? 1 : 0;

  return {
    used: percentUsed * 100,
    total: 100,
    percentUsed,
    resetAt: null, // DeepSeek doesn't expose reset times
    balances: balanceInfos,
    isAvailable: isAvailableBool,
    limitReached,
    windowDaily: { percentUsed, resetAt: null },
  };
}

function parseAllBalanceInfos(data: unknown): BalanceInfo[] {
  const obj = toRecord(data);
  const balanceInfos = toArray(obj.balance_infos);

  const results: BalanceInfo[] = [];

  for (const item of balanceInfos) {
    const record = toRecord(item);
    const currency = typeof record.currency === "string" ? record.currency.toUpperCase() : "";
    const totalBalance = toNumber(record.total_balance ?? record.totalBalance, 0);
    const grantedBalance = toNumber(record.granted_balance ?? record.grantedBalance, 0);
    const toppedUpBalance = toNumber(record.topped_up_balance ?? record.toppedUpBalance, 0);

    if (currency) {
      results.push({
        currency,
        totalBalance,
        balance: totalBalance,
        grantedBalance,
        toppedUpBalance,
      });
    }
  }

  return results;
}

// ─── Core Fetcher ────────────────────────────────────────────────────────────

/**
 * Fetch current quota for a DeepSeek connection.
 * Returns quota info based on balance API response.
 *
 * @param connectionId - Connection ID from the DB (used to look up credentials)
 * @param connection - Optional connection object with apiKey
 * @returns DeepseekQuota or null if fetch fails / no credentials
 */
export async function fetchDeepseekQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
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

  const url = `${DEEPSEEK_CONFIG.baseUrl}${DEEPSEEK_CONFIG.balancePath}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8_000),
    });

    // 401/403: token invalid — remove from cache
    if (response.status === 401 || response.status === 403) {
      quotaCache.delete(connectionId);
      return null;
    }

    if (!response.ok) {
      // Other errors — fail open
      return null;
    }

    const data = await response.json();
    const quota = parseDeepseekQuotaResponse(data);

    if (!quota) return null;

    // Store in cache
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
export function invalidateDeepseekQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * Register the DeepSeek quota fetcher with the preflight and monitor systems.
 * Call this once at server startup (in chat.ts or app entry point).
 */
export function registerDeepseekQuotaFetcher(): void {
  registerQuotaFetcher("deepseek", fetchDeepseekQuota);
  registerMonitorFetcher("deepseek", fetchDeepseekQuota);
}
