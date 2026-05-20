/**
 * genericQuotaFetcher.ts — Generic preflight quota fetcher
 *
 * Wraps the existing per-provider usage fetchers in `usage.ts` so that any
 * provider with a `getUsageForProvider` implementation gets per-window
 * preflight enforcement automatically. This is the bridge between the
 * dashboard's "Provider Limits" data (which already supports ~16 providers)
 * and the quotaPreflight system (which previously only had Codex).
 *
 * For providers that ship their own custom QuotaFetcher (Codex, CROF,
 * DeepSeek, Bailian Coding Plan, etc.) the registrar skips them — their
 * bespoke fetchers stay in charge.
 *
 * Each provider's first successful response also populates the static
 * `registerQuotaWindows` registry so other callers (UI window catalog,
 * tests) can discover which windows that provider exposes.
 */

import { getUsageForProvider, USAGE_FETCHER_PROVIDERS } from "./usage.ts";
import {
  getQuotaFetcher,
  registerQuotaFetcher,
  registerQuotaWindows,
  type QuotaFetcher,
  type QuotaInfo,
} from "./quotaPreflight.ts";

// 60s — matches Codex's TTL. Long enough to avoid hammering upstream usage
// endpoints on every routing decision, short enough that a near-exhausted
// account is skipped within one minute of crossing its threshold.
const CACHE_TTL_MS = 60_000;

interface CacheEntry {
  quota: QuotaInfo;
  fetchedAt: number;
}

const cache = new Map<string, CacheEntry>();

function cacheKey(provider: string, connectionId: string): string {
  return `${provider}::${connectionId}`;
}

// Auto-cleanup stale entries — same shape as codexQuotaFetcher.
const _cacheCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of cache) {
    if (now - entry.fetchedAt > CACHE_TTL_MS * 5) cache.delete(key);
  }
}, 5 * 60_000);
if (typeof _cacheCleanup === "object" && "unref" in _cacheCleanup) {
  (_cacheCleanup as { unref?: () => void }).unref?.();
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

/**
 * Compute percentUsed (0-1) for a single quota entry. Prefers the explicit
 * remainingPercentage / used / total fields surfaced by per-provider
 * fetchers (see `usage.ts`). Returns null when the entry is unlimited or
 * doesn't expose enough data to compute a percent — preflight ignores
 * those windows.
 */
function percentUsedForQuota(entry: unknown): number | null {
  if (!entry || typeof entry !== "object") return null;
  const q = entry as Record<string, unknown>;
  if (q.unlimited === true) return null;

  const remainingPercentage = toNumber(q.remainingPercentage);
  if (remainingPercentage !== null) {
    // remainingPercentage is 0-100 in the usage.ts contract.
    const used = (100 - Math.max(0, Math.min(100, remainingPercentage))) / 100;
    return used;
  }

  const used = toNumber(q.used);
  const total = toNumber(q.total);
  if (used !== null && total !== null && total > 0) {
    return Math.max(0, Math.min(1, used / total));
  }

  return null;
}

function resetAtForQuota(entry: unknown): string | null {
  if (!entry || typeof entry !== "object") return null;
  const q = entry as Record<string, unknown>;
  return typeof q.resetAt === "string" ? q.resetAt : null;
}

interface ConnectionInputs {
  id?: string;
  provider?: string;
  accessToken?: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
  projectId?: string;
  email?: string;
}

/**
 * Reshape a raw `getUsageForProvider` response into the preflight `QuotaInfo`
 * contract. Returns `null` if there are no measurable windows (all unlimited
 * / shape-unknown / missing). Exported for unit testing — the production path
 * is `fetchGenericQuota`, which adds caching + the upstream call.
 */
export function convertUsageToQuotaInfo(usage: unknown): QuotaInfo | null {
  if (!usage || typeof usage !== "object") return null;
  const usageRecord = usage as Record<string, unknown>;
  if (
    typeof usageRecord.message === "string" &&
    (!usageRecord.quotas || typeof usageRecord.quotas !== "object")
  ) {
    // Provider explicitly told us it couldn't fetch (auth expired, etc.).
    // Fail open — let the request proceed and surface the failure through
    // its normal error path.
    return null;
  }

  const quotasObj = usageRecord.quotas;
  if (!quotasObj || typeof quotasObj !== "object" || Array.isArray(quotasObj)) {
    return null;
  }

  const windows: Record<string, { percentUsed: number; resetAt: string | null }> = {};
  let worstPercent = 0;
  let worstResetAt: string | null = null;
  for (const [name, entry] of Object.entries(quotasObj as Record<string, unknown>)) {
    const percentUsed = percentUsedForQuota(entry);
    if (percentUsed === null) continue;
    const resetAt = resetAtForQuota(entry);
    windows[name] = { percentUsed, resetAt };
    if (percentUsed > worstPercent) {
      worstPercent = percentUsed;
      worstResetAt = resetAt;
    }
  }

  if (Object.keys(windows).length === 0) return null;

  return {
    used: 0,
    total: 0,
    percentUsed: worstPercent,
    resetAt: worstResetAt,
    windows,
  };
}

/**
 * Fetch quota for a connection by delegating to the appropriate
 * provider-specific usage fetcher and reshaping its output into the
 * preflight `QuotaInfo` contract (with a `windows` map for per-window
 * threshold evaluation).
 */
export const fetchGenericQuota: QuotaFetcher = async (connectionId, connection) => {
  if (!connection) return null;
  const conn = connection as ConnectionInputs;
  const provider = typeof conn.provider === "string" ? conn.provider : null;
  if (!provider) return null;

  const key = cacheKey(provider, connectionId);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  let usage: unknown;
  try {
    usage = await getUsageForProvider(conn as Parameters<typeof getUsageForProvider>[0]);
  } catch {
    return null;
  }

  const quota = convertUsageToQuotaInfo(usage);
  if (!quota) return null;

  // Refresh the static window catalog so the dashboard can render the right
  // modal inputs without waiting for the user to open the page.
  registerQuotaWindows(provider, Object.keys(quota.windows || {}));

  cache.set(key, { quota, fetchedAt: Date.now() });
  return quota;
};

/**
 * Force-invalidate the cache for a connection — call after the connection
 * receives an upstream 429 / quota-reset event so the next preflight gets
 * fresh data instead of a 60s stale window.
 */
export function invalidateGenericQuotaCache(provider: string, connectionId: string): void {
  cache.delete(cacheKey(provider, connectionId));
}

/**
 * Register the generic fetcher for every provider that has a usage
 * implementation. Providers with bespoke fetchers (Codex, CROF, DeepSeek,
 * Bailian Coding Plan) MUST be registered before this runs so the defensive
 * `getQuotaFetcher` check below preserves them — see `src/sse/handlers/chat.ts`
 * for the registration order. Idempotent: re-running this is a no-op.
 */
export function registerGenericQuotaFetchers(): void {
  for (const provider of USAGE_FETCHER_PROVIDERS) {
    if (getQuotaFetcher(provider)) continue; // bespoke fetcher already registered — leave it alone
    registerQuotaFetcher(provider, fetchGenericQuota);
  }
}
