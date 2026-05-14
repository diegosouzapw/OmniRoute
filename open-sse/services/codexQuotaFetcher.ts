/**
 * codexQuotaFetcher.ts — Codex Dual-Window Quota Fetcher
 *
 * Implements QuotaFetcher for the Codex provider (quotaPreflight.ts + quotaMonitor.ts).
 *
 * Codex has TWO independent quota windows:
 *   - Primary (5h):   short-term rate limit, resets every 5 hours
 *   - Secondary (7d): weekly limit, resets every 7 days
 *
 * We return percentUsed = max(5h%, 7d%) so the system switches accounts when
 * EITHER window approaches exhaustion (95% threshold).
 *
 * Cache: in-memory TTL (60s) to avoid hammering the usage API on every request.
 * The connection pool is keyed by connectionId (providerConnection.id from DB).
 *
 * Registration: call registerCodexQuotaFetcher() once at server startup.
 */

import { registerQuotaFetcher, registerQuotaWindows, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";

/**
 * Stable identifiers for Codex's quota windows. These match the quota keys
 * surfaced by `getCodexUsage` (in usage.ts) and rendered by the dashboard,
 * so per-window thresholds set in the UI line up with the keys persisted
 * in `provider_connections.quota_window_thresholds_json`. The dedicated
 * Codex fetcher exposes only session + weekly today; the plan-dependent
 * code_review window is surfaced by the generic path when present.
 */
export const CODEX_WINDOW_SESSION = "session"; // primary 5-hour window
export const CODEX_WINDOW_WEEKLY = "weekly"; //  secondary 7-day window

// Codex usage endpoint (same as usage.ts CODEX_CONFIG)
const CODEX_USAGE_URL = "https://chatgpt.com/backend-api/wham/usage";

// Cache TTL — short enough to be reactive, long enough to avoid rate limits
const CACHE_TTL_MS = 60_000; // 60 seconds

// Per-account quota window info (richer than QuotaInfo — includes both windows)
export interface CodexDualWindowQuota extends QuotaInfo {
  window5h: { percentUsed: number; resetAt: string | null };
  window7d: { percentUsed: number; resetAt: string | null };
  limitReached: boolean;
}

interface CacheEntry {
  quota: CodexDualWindowQuota;
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

// ─── Connection registry ─────────────────────────────────────────────────────
// We need the accessToken + workspaceId to call the API.
// chatCore.ts registers connection metadata here before requests.

interface CodexConnectionMeta {
  accessToken: string;
  workspaceId?: string;
}

const connectionRegistry = new Map<string, CodexConnectionMeta>();

/**
 * Register Codex connection metadata for quota fetching.
 * Called by chatCore.ts when a Codex connection is resolved.
 *
 * @param connectionId - The connection ID from the DB (providerConnection.id)
 * @param meta - Access token and optional workspace ID
 */
export function registerCodexConnection(connectionId: string, meta: CodexConnectionMeta): void {
  connectionRegistry.set(connectionId, meta);
}

function getCodexConnectionMeta(
  connectionId: string,
  connection?: Record<string, unknown>
): CodexConnectionMeta | null {
  if (connection && typeof connection === "object") {
    const providerSpecificData =
      connection.providerSpecificData &&
      typeof connection.providerSpecificData === "object" &&
      !Array.isArray(connection.providerSpecificData)
        ? (connection.providerSpecificData as Record<string, unknown>)
        : {};
    const accessToken =
      typeof connection.accessToken === "string" && connection.accessToken.trim().length > 0
        ? connection.accessToken
        : null;
    const workspaceId =
      typeof providerSpecificData.workspaceId === "string" &&
      providerSpecificData.workspaceId.trim().length > 0
        ? providerSpecificData.workspaceId
        : undefined;

    if (accessToken) {
      const meta = { accessToken, ...(workspaceId ? { workspaceId } : {}) };
      connectionRegistry.set(connectionId, meta);
      return meta;
    }
  }

  return connectionRegistry.get(connectionId) || null;
}

function getDominantResetAt(quota: {
  window5h: { percentUsed: number; resetAt: string | null };
  window7d: { percentUsed: number; resetAt: string | null };
}): string | null {
  if (quota.window7d.percentUsed > quota.window5h.percentUsed) {
    return quota.window7d.resetAt || quota.window5h.resetAt;
  }
  if (quota.window5h.percentUsed > quota.window7d.percentUsed) {
    return quota.window5h.resetAt || quota.window7d.resetAt;
  }
  return quota.window7d.resetAt || quota.window5h.resetAt;
}

// ─── Core Fetcher ────────────────────────────────────────────────────────────

/**
 * Fetch current quota for a Codex connection.
 * Returns percentUsed = max(5h%, 7d%) — worst-case across both windows.
 *
 * @param connectionId - Connection ID from the DB (used to look up credentials)
 * @returns QuotaInfo or null if fetch fails / no credentials
 */
export async function fetchCodexQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  // Check cache first
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  // Look up credentials
  const meta = getCodexConnectionMeta(connectionId, connection);
  if (!meta?.accessToken) {
    // No credentials registered — skip preflight gracefully
    return null;
  }

  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${meta.accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (meta.workspaceId) {
      headers["chatgpt-account-id"] = meta.workspaceId;
    }

    const response = await fetch(CODEX_USAGE_URL, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      // Non-2xx: could be token expired or quota API down.
      // Return null to proceed (fail-open — don't block on API errors).
      if (response.status === 401 || response.status === 403) {
        // Token expired — remove from cache so next call re-fetches
        quotaCache.delete(connectionId);
        connectionRegistry.delete(connectionId);
      }
      return null;
    }

    const data = await response.json();
    const quota = parseCodexUsageResponse(data);

    if (!quota) return null;

    // Store in cache
    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    // Network error, timeout, etc. — fail open
    return null;
  }
}

// ─── Response Parser ─────────────────────────────────────────────────────────

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

function parseWindowReset(window: Record<string, unknown>): string | null {
  const resetAt = toNumber(window["reset_at"] ?? window["resetAt"], 0);
  if (resetAt > 0) {
    return new Date(resetAt * 1000).toISOString();
  }
  const resetAfterSeconds = toNumber(
    window["reset_after_seconds"] ?? window["resetAfterSeconds"],
    0
  );
  if (resetAfterSeconds > 0) {
    return new Date(Date.now() + resetAfterSeconds * 1000).toISOString();
  }
  return null;
}

function parseCodexUsageResponse(data: unknown): CodexDualWindowQuota | null {
  const obj = toRecord(data);
  const rateLimit = toRecord(obj["rate_limit"] ?? obj["rateLimit"]);
  const primaryWindow = toRecord(rateLimit["primary_window"] ?? rateLimit["primaryWindow"]);
  const secondaryWindow = toRecord(rateLimit["secondary_window"] ?? rateLimit["secondaryWindow"]);

  // Require at least one window to be present
  const hasPrimary = Object.keys(primaryWindow).length > 0;
  const hasSecondary = Object.keys(secondaryWindow).length > 0;
  if (!hasPrimary && !hasSecondary) return null;

  // Parse 5h window
  const usedPercent5h = hasPrimary
    ? toNumber(primaryWindow["used_percent"] ?? primaryWindow["usedPercent"], 0)
    : 0;
  const resetAt5h = hasPrimary ? parseWindowReset(primaryWindow) : null;

  // Parse 7d window
  const usedPercent7d = hasSecondary
    ? toNumber(secondaryWindow["used_percent"] ?? secondaryWindow["usedPercent"], 0)
    : 0;
  const resetAt7d = hasSecondary ? parseWindowReset(secondaryWindow) : null;

  // Worst-case across both windows (triggers switch when EITHER is at 95%)
  const worstPercentUsed = Math.max(usedPercent5h, usedPercent7d);
  const percentUsedNormalized = worstPercentUsed / 100; // QuotaInfo uses 0..1

  const limitReached = Boolean(rateLimit["limit_reached"] ?? rateLimit["limitReached"]);

  const window5h = { percentUsed: usedPercent5h / 100, resetAt: resetAt5h };
  const window7d = { percentUsed: usedPercent7d / 100, resetAt: resetAt7d };

  return {
    used: worstPercentUsed,
    total: 100,
    percentUsed: percentUsedNormalized,
    resetAt: getDominantResetAt({ window5h, window7d }),
    // Per-window breakdown for the preflight evaluator. Keys match what the
    // dashboard renders (session = 5h, weekly = 7d) so user-set cutoffs and
    // displayed quotas refer to the same windows.
    windows: {
      ...(hasPrimary ? { [CODEX_WINDOW_SESSION]: window5h } : {}),
      ...(hasSecondary ? { [CODEX_WINDOW_WEEKLY]: window7d } : {}),
    },
    // Legacy fields preserved for existing consumers (quotaMonitor, cooldown
    // computation in accountFallback). These mirror the new windows entries
    // but keep the historical names — do not remove without checking callers.
    window5h,
    window7d,
    limitReached,
  };
}

// ─── Quota-Aware Reset Time ───────────────────────────────────────────────────

/**
 * Get the cooldown duration (ms) for a Codex account based on its quota state.
 *
 * Logic:
 *   - If 7d window >= threshold → cooldown until 7d reset (longer)
 *   - If 5h window >= threshold → cooldown until 5h reset (shorter)
 *   - Otherwise → 0 (no cooldown)
 *
 * @param quota - The dual-window quota snapshot
 * @param threshold - The fraction (0-1) that triggers a switch (default: 0.95)
 * @returns Cooldown duration in milliseconds
 */
export function getCodexQuotaCooldownMs(quota: CodexDualWindowQuota, threshold = 0.95): number {
  const now = Date.now();

  // 7d window takes priority (if exhausted, must wait longer)
  if (quota.window7d.percentUsed >= threshold && quota.window7d.resetAt) {
    const resetTime = new Date(quota.window7d.resetAt).getTime();
    if (resetTime > now) return resetTime - now;
  }

  // 5h window
  if (quota.window5h.percentUsed >= threshold && quota.window5h.resetAt) {
    const resetTime = new Date(quota.window5h.resetAt).getTime();
    if (resetTime > now) return resetTime - now;
  }

  return 0;
}

// ─── Invalidation ────────────────────────────────────────────────────────────

/**
 * Force-invalidate the cache for a connection (e.g., after receiving quota headers).
 * Ensures the next preflight call fetches fresh data.
 */
export function invalidateCodexQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * Register the Codex quota fetcher with the preflight and monitor systems.
 * Call this once at server startup (in chatCore.ts or app entry point).
 */
export function registerCodexQuotaFetcher(): void {
  registerQuotaFetcher("codex", fetchCodexQuota);
  registerMonitorFetcher("codex", fetchCodexQuota);
  registerQuotaWindows("codex", [CODEX_WINDOW_SESSION, CODEX_WINDOW_WEEKLY]);
}
