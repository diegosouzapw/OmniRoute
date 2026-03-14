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
 *   - Exhausted accounts: refetch every 5 minutes (or immediately after resetAt passes)
 *
 * @module domain/quotaCache
 */

import { getUsageForProvider } from "@omniroute/open-sse/services/usage.ts";
import { getProviderConnectionById, resolveProxyForConnection } from "@/lib/localDb";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { safePercentage } from "@/shared/utils/formatting";

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
  windowDurationMs?: number | null; // T08: optional rolling window duration
}

interface QuotaWindowStatus {
  remainingPercentage: number;
  usedPercentage: number;
  resetAt: string | null;
  reachedThreshold: boolean;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const ACTIVE_TTL_MS = 5 * 60 * 1000; // 5 minutes for active accounts
const EXHAUSTED_TTL_MS = 5 * 60 * 1000; // 5 minutes for 429-sourced entries (no resetAt)
const EXHAUSTED_REFRESH_MS = 5 * 60 * 1000; // 5 minutes: recheck exhausted accounts (aligned with TTL)
const REFRESH_INTERVAL_MS = 60 * 1000; // Background tick every 1 minute

// ─── State ──────────────────────────────────────────────────────────────────

const cache = new Map<string, QuotaCacheEntry>();
const MAX_CONCURRENT_REFRESHES = 5;
let refreshTimer: ReturnType<typeof setInterval> | null = null;
let tickRunning = false;

// ─── Helpers ────────────────────────────────────────────────────────────────

function isExhausted(quotas: Record<string, QuotaInfo>): boolean {
  const entries = Object.values(quotas);
  if (entries.length === 0) return false;
  return entries.every((q) => q.remainingPercentage <= 0);
}

/**
 * T08 — Auto-advance quota window.
 * If we know the window duration, advance past the expired window(s) to
 * avoid blocking requests when the quota reset already happened but the
 * background refresh hasn't run yet.
 */
function advancedWindowResetAt(entry: QuotaCacheEntry, now: number): { exhausted: false } | null {
  if (!entry.nextResetAt) return null;

  const resetMs = parseDate(entry.nextResetAt);
  if (resetMs === null) return null;

  // If the window's resetAt is in the past, the quota has been renewed.
  // Eagerly mark as available so requests don't wait for the 5-min TTL.
  if (resetMs <= now) {
    return { exhausted: false };
  }

  // If we know the window duration, check if the *next* window also passed.
  if (entry.windowDurationMs && entry.windowDurationMs > 0) {
    const elapsed = now - resetMs;
    if (elapsed >= 0) return { exhausted: false };
  }

  return null;
}

function parseDate(value: string): number | null {
  const ms = new Date(value).getTime();
  return Number.isNaN(ms) ? null : ms;
}

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

function earliestResetAt(quotas: Record<string, QuotaInfo>): string | null {
  let earliest: string | null = null;
  let earliestMs = Infinity;
  for (const q of Object.values(quotas)) {
    if (!q.resetAt) continue;
    const ms = parseDate(q.resetAt);
    if (ms !== null && ms < earliestMs) {
      earliestMs = ms;
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
          safePercentage(q.remainingPercentage) ??
          (q.total > 0 ? Math.round(((q.total - (q.used || 0)) / q.total) * 100) : 0),
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
  if (!entry.exhausted) return false;

  const now = Date.now();

  // T08 — Auto window advance: if resetAt is in the past, eagerly treat as not exhausted.
  // This prevents stale exhaustion blocking when background refresh hasn't run yet.
  const advanced = advancedWindowResetAt(entry, now);
  if (advanced) {
    // Optimistically clear the exhausted flag so we unblock requests immediately.
    // The next background refresh will update with the real quota state.
    entry.exhausted = false;
    return false;
  }

  // Exhausted entries without resetAt expire after fixed TTL
  const age = now - entry.fetchedAt;
  if (!entry.nextResetAt && age > EXHAUSTED_TTL_MS) return false;

  return true;
}

/**
 * Return quota window status for a connection (e.g., session/weekly).
 * Returns null when no cache or no window data is available.
 */
export function getQuotaWindowStatus(
  connectionId: string,
  windowName: string,
  thresholdPercent = 90
): QuotaWindowStatus | null {
  const entry = cache.get(connectionId);
  if (!entry) return null;

  const now = Date.now();

  const window = entry.quotas[windowName];
  if (!window) return null;

  const remainingPercentage = clampPercent(window.remainingPercentage);
  const usedPercentage = clampPercent(100 - remainingPercentage);

  let resetAt = window.resetAt || null;
  let windowExpired = false;
  if (resetAt) {
    const resetMs = parseDate(resetAt);
    if (resetMs !== null && resetMs <= now) {
      resetAt = null;
      windowExpired = true;
    }
  }

  return {
    remainingPercentage,
    usedPercentage,
    resetAt,
    // If reset time has already passed, avoid stale cached percentages blocking selection.
    reachedThreshold: windowExpired ? false : usedPercentage >= thresholdPercent,
  };
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

const refreshingSet = new Set<string>();

async function refreshEntry(entry: QuotaCacheEntry) {
  if (refreshingSet.has(entry.connectionId)) return;
  refreshingSet.add(entry.connectionId);

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
  } catch (err) {
    console.warn(
      `[QuotaCache] Refresh failed for ${entry.connectionId.slice(0, 8)}:`,
      (err as any)?.message || err
    );
  } finally {
    refreshingSet.delete(entry.connectionId);
  }
}

function needsRefresh(entry: QuotaCacheEntry, now: number): boolean {
  const age = now - entry.fetchedAt;
  if (entry.exhausted) {
    if (entry.nextResetAt) {
      const resetMs = parseDate(entry.nextResetAt);
      if (resetMs !== null && resetMs <= now) return true;
    }
    return age >= EXHAUSTED_REFRESH_MS;
  }
  return age >= ACTIVE_TTL_MS;
}

async function backgroundRefreshTick() {
  if (tickRunning) return;
  tickRunning = true;

  try {
    const now = Date.now();
    const pending = [...cache.values()].filter((e) => needsRefresh(e, now));

    // Refresh in batches to avoid thundering herd
    for (let i = 0; i < pending.length; i += MAX_CONCURRENT_REFRESHES) {
      const batch = pending.slice(i, i + MAX_CONCURRENT_REFRESHES);
      await Promise.allSettled(batch.map(refreshEntry));
    }
  } finally {
    tickRunning = false;
  }
}

/**
 * Start the background refresh timer.
 */
export function startBackgroundRefresh() {
  if (refreshTimer) return;
  refreshTimer = setInterval(backgroundRefreshTick, REFRESH_INTERVAL_MS);
  refreshTimer?.unref?.();
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
