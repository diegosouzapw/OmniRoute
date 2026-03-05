/**
 * Quota Cache — Domain Layer
 *
 * In-memory cache of provider quota data per connectionId.
 * Populated by:
 *   - Dashboard usage endpoint (GET /api/usage/[connectionId])
 *   - 429 responses marking account as exhausted
 *
 * Background refresh runs every 1 minute:
 *   - Active accounts (quota > 0%): refetch every 5 minutes
 *   - Exhausted accounts: refetch every 20 minutes (or immediately after resetAt passes)
 *
 * @module domain/quotaCache
 */

import { getUsageForProvider } from "@omniroute/open-sse/services/usage.ts";
import { getProviderConnectionById, resolveProxyForConnection } from "@/lib/localDb";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";

// ─── Types ──────────────────────────────────────────────────────────────────

interface QuotaInfo {
  remainingPercentage: number;
  resetAt: string | null;
}

interface QuotaCacheEntry {
  connectionId: string;
  provider: string;
  quotas: Record<string, QuotaInfo>;
  fetchedAt: number;
  exhausted: boolean;
  nextResetAt: string | null;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const ACTIVE_TTL_MS = 5 * 60 * 1000; // 5 minutes for active accounts
const EXHAUSTED_TTL_MS = 5 * 60 * 1000; // 5 minutes for 429-sourced entries (no resetAt)
const EXHAUSTED_REFRESH_MS = 20 * 60 * 1000; // 20 minutes: recheck exhausted accounts
const REFRESH_INTERVAL_MS = 60 * 1000; // Background tick every 1 minute

// ─── State ──────────────────────────────────────────────────────────────────

const cache = new Map<string, QuotaCacheEntry>();
let refreshTimer: ReturnType<typeof setInterval> | null = null;

// ─── Helpers ────────────────────────────────────────────────────────────────

function isExhausted(quotas: Record<string, QuotaInfo>): boolean {
  const entries = Object.values(quotas);
  if (entries.length === 0) return false;
  return entries.every((q) => q.remainingPercentage <= 0);
}

function earliestResetAt(quotas: Record<string, QuotaInfo>): string | null {
  let earliest: string | null = null;
  for (const q of Object.values(quotas)) {
    if (q.resetAt && (!earliest || new Date(q.resetAt) < new Date(earliest))) {
      earliest = q.resetAt;
    }
  }
  return earliest;
}

function normalizeQuotas(rawQuotas: Record<string, any>): Record<string, QuotaInfo> {
  const result: Record<string, QuotaInfo> = {};
  for (const [key, q] of Object.entries(rawQuotas)) {
    if (q && typeof q === "object") {
      result[key] = {
        remainingPercentage:
          q.remainingPercentage ??
          (q.total ? Math.round(((q.total - (q.used || 0)) / q.total) * 100) : 100),
        resetAt: q.resetAt || null,
      };
    }
  }
  return result;
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Store quota data for a connection (called by usage endpoint and background refresh).
 */
export function setQuotaCache(
  connectionId: string,
  provider: string,
  rawQuotas: Record<string, any>
) {
  const quotas = normalizeQuotas(rawQuotas);
  const exhausted = isExhausted(quotas);
  cache.set(connectionId, {
    connectionId,
    provider,
    quotas,
    fetchedAt: Date.now(),
    exhausted,
    nextResetAt: exhausted ? earliestResetAt(quotas) : null,
  });
}

/**
 * Get cached quota entry (returns null if not cached).
 */
export function getQuotaCache(connectionId: string): QuotaCacheEntry | null {
  return cache.get(connectionId) || null;
}

/**
 * Check if an account's quota is exhausted based on cached data.
 * Returns false if no cache entry exists (unknown = assume available).
 */
export function isAccountQuotaExhausted(connectionId: string): boolean {
  const entry = cache.get(connectionId);
  if (!entry) return false;

  // If exhausted and we have a resetAt that has passed, consider it available
  if (entry.exhausted && entry.nextResetAt) {
    if (new Date(entry.nextResetAt).getTime() <= Date.now()) {
      return false; // Reset time passed, assume available until refresh confirms
    }
  }

  // Check TTL based on state
  const age = Date.now() - entry.fetchedAt;
  if (entry.exhausted) {
    // Exhausted entries without resetAt use fixed TTL
    if (!entry.nextResetAt && age > EXHAUSTED_TTL_MS) return false;
    // Exhausted entries with resetAt stay valid until resetAt or refresh
    return true;
  }

  // Active entries expire after ACTIVE_TTL
  if (age > ACTIVE_TTL_MS) return false;

  return entry.exhausted;
}

/**
 * Mark an account as quota-exhausted from a 429 response (no quota data available).
 * Uses 5-minute fixed TTL since we don't know the actual resetAt.
 */
export function markAccountExhaustedFrom429(connectionId: string, provider: string) {
  cache.set(connectionId, {
    connectionId,
    provider,
    quotas: {},
    fetchedAt: Date.now(),
    exhausted: true,
    nextResetAt: null,
  });
}

// ─── Background Refresh ─────────────────────────────────────────────────────

async function refreshEntry(entry: QuotaCacheEntry) {
  try {
    const connection = await getProviderConnectionById(entry.connectionId);
    if (!connection || connection.authType !== "oauth" || !connection.isActive) {
      cache.delete(entry.connectionId);
      return;
    }

    const proxyInfo = await resolveProxyForConnection(entry.connectionId);
    const usage = await runWithProxyContext(proxyInfo?.proxy || null, () =>
      getUsageForProvider(connection)
    );

    if (usage?.quotas) {
      setQuotaCache(entry.connectionId, entry.provider, usage.quotas);
    }
  } catch {
    // Refresh failed silently — keep stale entry
  }
}

async function backgroundRefreshTick() {
  const now = Date.now();

  for (const entry of cache.values()) {
    const age = now - entry.fetchedAt;

    if (entry.exhausted) {
      // If resetAt has passed, refetch immediately
      if (entry.nextResetAt && new Date(entry.nextResetAt).getTime() <= now) {
        refreshEntry(entry);
        continue;
      }
      // Recheck exhausted accounts every 20 minutes
      if (age >= EXHAUSTED_REFRESH_MS) {
        refreshEntry(entry);
      }
    } else {
      // Refresh active accounts every 5 minutes
      if (age >= ACTIVE_TTL_MS) {
        refreshEntry(entry);
      }
    }
  }
}

/**
 * Start the background refresh timer.
 */
export function startBackgroundRefresh() {
  if (refreshTimer) return;
  refreshTimer = setInterval(backgroundRefreshTick, REFRESH_INTERVAL_MS);
  // Don't prevent process exit
  if (refreshTimer && typeof refreshTimer === "object" && "unref" in refreshTimer) {
    (refreshTimer as any).unref();
  }
}

/**
 * Stop the background refresh timer.
 */
export function stopBackgroundRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
}

/**
 * Get cache stats (for debugging/dashboard).
 */
export function getQuotaCacheStats() {
  const entries: Array<{
    connectionId: string;
    provider: string;
    exhausted: boolean;
    nextResetAt: string | null;
    ageMs: number;
  }> = [];

  for (const entry of cache.values()) {
    entries.push({
      connectionId: entry.connectionId.slice(0, 8) + "...",
      provider: entry.provider,
      exhausted: entry.exhausted,
      nextResetAt: entry.nextResetAt,
      ageMs: Date.now() - entry.fetchedAt,
    });
  }

  return { total: cache.size, entries };
}
