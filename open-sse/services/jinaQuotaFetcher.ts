import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";

/**
 * Jina's wallet-balance endpoint only accepts the key as the `api_key` QUERY
 * parameter. Verified 2026-09-24: sending `Authorization: Bearer <key>` with
 * no query param returns HTTP 422 `{"loc":["query","api_key"],"msg":"field
 * required"}`, while `?api_key=<invalid>` returns 401 "Invalid API key."
 *
 * The request URL therefore carries a credential. NEVER log, echo or return
 * the URL built in `fetchJinaQuota` (or `response.url`) — redact `api_key`
 * first if a debug log is ever added here.
 */
export const JINA_BALANCE_URL = "https://dash.jina.ai/api/v1/api_key/fe_user";
const JINA_CACHE_TTL_MS = 60 * 1000;
const REQUEST_TIMEOUT_MS = 8_000;

export interface JinaQuotaInfo {
  used: number;
  total: number;
  remainingCredits: number;
  percentUsed: number;
  limitReached: boolean;
  raw?: unknown;
}

const quotaCache = new Map<string, { quota: JinaQuotaInfo | null; fetchedAt: number }>();
const inFlightRequests = new Map<string, Promise<JinaQuotaInfo | null>>();

export function extractJinaToken(credentials: unknown): string | null {
  if (!credentials || typeof credentials !== "object") return null;
  const c = credentials as Record<string, unknown>;
  if (typeof c.apiKey === "string" && c.apiKey.trim()) {
    return c.apiKey.trim();
  }
  const nested = c.credentials;
  if (nested && typeof nested === "object") {
    const n = nested as Record<string, unknown>;
    if (typeof n.apiKey === "string" && n.apiKey.trim()) {
      return n.apiKey.trim();
    }
  }
  return null;
}

export function parseJinaCreditUsage(data: unknown): JinaQuotaInfo | null {
  if (!data || typeof data !== "object") return null;
  const root = data as Record<string, unknown>;

  let wallet: Record<string, unknown> | undefined;

  if (root.code === 200 && root.data && typeof root.data === "object") {
    const body = root.data as Record<string, unknown>;
    if (body.wallet && typeof body.wallet === "object") {
      wallet = body.wallet as Record<string, unknown>;
    }
  } else if (root.code === undefined && root.wallet && typeof root.wallet === "object") {
    wallet = root.wallet as Record<string, unknown>;
  }

  if (!wallet) return null;

  const totalBalance =
    typeof wallet.total_balance === "number" && !Number.isNaN(wallet.total_balance)
      ? wallet.total_balance
      : null;

  if (totalBalance === null || totalBalance < 0) return null;

  const remainingCredits = totalBalance;
  const used = 0;
  const total = totalBalance;
  const limitReached = remainingCredits <= 0;
  const percentUsed = limitReached ? 1 : 0;

  return {
    used,
    total,
    remainingCredits,
    percentUsed,
    limitReached,
    raw: data,
  };
}

async function dedupeQuotaFetch(
  connectionId: string,
  fetcher: () => Promise<JinaQuotaInfo | null>
): Promise<JinaQuotaInfo | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < JINA_CACHE_TTL_MS) {
    return cached.quota;
  }

  const inFlight = inFlightRequests.get(connectionId);
  if (inFlight) return inFlight;

  const p = (async () => {
    try {
      const q = await fetcher();
      quotaCache.set(connectionId, { quota: q, fetchedAt: Date.now() });
      return q;
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

export async function fetchJinaQuota(
  connectionId: string,
  credentials: unknown
): Promise<JinaQuotaInfo | null> {
  const token = extractJinaToken(credentials);
  if (!token) return null;

  return dedupeQuotaFetch(connectionId, async () => {
    await throttleQuotaFetch();
    // Credential-bearing URL (see module header) — keep it local, never log it.
    const url = `${JINA_BALANCE_URL}?api_key=${encodeURIComponent(token)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      quotaCache.set(connectionId, { quota: null, fetchedAt: Date.now() });
      return null;
    }

    const json = await response.json();
    return parseJinaCreditUsage(json);
  });
}

export function invalidateJinaQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
  inFlightRequests.delete(connectionId);
}

export const JINA_PROVIDER_ALIASES = ["jina-search", "jina", "jina-ai", "jina-reader"] as const;

export function registerJinaQuotaFetcher(): void {
  for (const alias of JINA_PROVIDER_ALIASES) {
    registerQuotaFetcher(
      alias,
      fetchJinaQuota as (id: string, conn?: Record<string, unknown>) => Promise<QuotaInfo | null>
    );
    registerMonitorFetcher(
      alias,
      fetchJinaQuota as (id: string, conn?: Record<string, unknown>) => Promise<QuotaInfo | null>
    );
  }
}
