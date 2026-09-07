/**
 * moonshotQuotaFetcher.ts — Moonshot Open Platform balance quota fetcher
 *
 * GET {origin}/v1/users/me/balance
 *   { code: 0, data: { available_balance, voucher_balance, cash_balance } }
 *
 * Origin comes from the connection baseUrl (api.moonshot.cn or api.moonshot.ai).
 * Do not hardcode .ai as a fallback for .cn keys.
 *
 * Cache: 60s in-memory. Registration: registerMoonshotQuotaFetcher() at startup.
 */

import { toNumber } from "@/shared/utils/numeric";
import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";
import {
  isMoonshotOpenPlatformConnection,
  moonshotBalanceUrl,
  resolveMoonshotOrigin,
} from "./usage/moonshotOpenPlatform.ts";
import type { UsageQuota } from "./usage/quota.ts";

const CACHE_TTL_MS = 60_000;

export interface MoonshotQuota extends QuotaInfo {
  availableBalance: number;
  voucherBalance: number;
  cashBalance: number;
  origin: string;
  limitReached: boolean;
}

interface CacheEntry {
  quota: MoonshotQuota;
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

function parseMoonshotQuotaResponse(data: unknown, origin: string): MoonshotQuota | null {
  const obj = toRecord(data);
  const code = obj.code;
  if (code !== 0 && code !== undefined) return null;
  const payload = toRecord(obj.data);
  if (!("available_balance" in payload) && !("availableBalance" in payload)) return null;
  const availableBalance = toNumber(payload.available_balance ?? payload.availableBalance, 0);
  const voucherBalance = toNumber(payload.voucher_balance ?? payload.voucherBalance, 0);
  const cashBalance = toNumber(payload.cash_balance ?? payload.cashBalance, 0);
  const limitReached = availableBalance <= 0;
  const percentUsed = limitReached ? 1 : 0;
  return {
    used: percentUsed * 100,
    total: 100,
    percentUsed,
    resetAt: null,
    availableBalance,
    voucherBalance,
    cashBalance,
    origin,
    limitReached,
    windows: { balance: { percentUsed, resetAt: null } },
  };
}

function connectionApiKey(connection?: Record<string, unknown>): string | null {
  const apiKey = connection?.apiKey;
  return typeof apiKey === "string" && apiKey.trim().length > 0 ? apiKey : null;
}

export async function fetchMoonshotQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  const apiKey = connectionApiKey(connection);
  if (!apiKey) return null;

  const origin = resolveMoonshotOrigin({
    provider: typeof connection?.provider === "string" ? connection.provider : undefined,
    providerSpecificData: connection?.providerSpecificData,
  });
  if (!origin) return null;

  const url = moonshotBalanceUrl(origin);
  const authHeader = ["Bearer", apiKey].join(" ");

  try {
    await throttleQuotaFetch();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8_000),
    });

    if (response.status === 401 || response.status === 403) {
      quotaCache.delete(connectionId);
      return null;
    }
    if (!response.ok) return null;

    const data = await response.json();
    const quota = parseMoonshotQuotaResponse(data, origin);
    if (!quota) return null;
    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    return null;
  }
}

export function invalidateMoonshotQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

export type MoonshotUsageConnection = {
  id?: string;
  provider?: string;
  apiKey?: string;
  providerSpecificData?: unknown;
};

export async function getMoonshotOpenPlatformUsage(
  connection: MoonshotUsageConnection
): Promise<{
  plan?: string;
  quotas?: Record<string, UsageQuota>;
  message?: string;
  limitReached?: boolean;
}> {
  const origin = resolveMoonshotOrigin(connection);
  if (!origin) {
    return { message: "Not a Moonshot Open Platform connection." };
  }
  const quota = (await fetchMoonshotQuota(connection.id || "moonshot", {
    apiKey: connection.apiKey,
    provider: connection.provider,
    providerSpecificData: connection.providerSpecificData,
  })) as MoonshotQuota | null;
  if (!quota) {
    return { message: "Moonshot API key not available. Add a key to view usage." };
  }
  const domestic = origin.includes("moonshot.cn");
  return {
    plan: domestic ? "Kimi 开放平台（国内）" : "Kimi Open Platform",
    quotas: buildMoonshotBalanceQuotas(quota, domestic ? "CNY" : "USD"),
    limitReached: quota.limitReached,
  };
}

function balanceQuota(
  remaining: number,
  remainingPercentage: number,
  currency: string
): UsageQuota {
  return {
    used: 0,
    total: 0,
    remaining,
    remainingPercentage,
    resetAt: null,
    unlimited: true,
    currency,
  };
}

function buildMoonshotBalanceQuotas(
  quota: MoonshotQuota,
  currency: string
): Record<string, UsageQuota> {
  return {
    available: balanceQuota(quota.availableBalance, quota.limitReached ? 0 : 100, currency),
    voucher: balanceQuota(quota.voucherBalance, 100, currency),
    cash: balanceQuota(quota.cashBalance, 100, currency),
  };
}

export function registerMoonshotQuotaFetcher(): void {
  registerQuotaFetcher("moonshot", fetchMoonshotQuota);
  registerQuotaFetcher("kimi", fetchMoonshotQuota);
  registerMonitorFetcher("moonshot", fetchMoonshotQuota);
  registerMonitorFetcher("kimi", fetchMoonshotQuota);
}

export function registerMoonshotFetchersForNodes(
  nodes: Array<{ id?: string | null; prefix?: string | null; baseUrl?: string | null }>
): void {
  for (const node of nodes) {
    const origin = resolveMoonshotOrigin({}, node.baseUrl);
    if (!origin) continue;
    if (typeof node.id === "string" && node.id) {
      registerQuotaFetcher(node.id, fetchMoonshotQuota);
      registerMonitorFetcher(node.id, fetchMoonshotQuota);
    }
    if (typeof node.prefix === "string" && node.prefix) {
      registerQuotaFetcher(node.prefix, fetchMoonshotQuota);
      registerMonitorFetcher(node.prefix, fetchMoonshotQuota);
    }
  }
}

export { isMoonshotOpenPlatformConnection };
