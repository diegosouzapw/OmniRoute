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

import {
  CODEX_SPARK_QUOTA_SESSION,
  CODEX_SPARK_QUOTA_WEEKLY,
  getCodexModelScope,
  isCodexSparkLimitDescriptor,
} from "../config/codexQuotaScopes.ts";
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
  /** All known Codex quota windows, including Spark when the upstream exposes it. */
  allWindows?: Record<string, { percentUsed: number; resetAt: string | null }>;
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

const MAX_CONNECTIONS = 100;
const connectionRegistry = new Map<string, CodexConnectionMeta>();
const MAX_QUOTA_CACHE_ENTRIES = 200;

/**
 * Register Codex connection metadata for quota fetching.
 * Called by chatCore.ts when a Codex connection is resolved.
 *
 * @param connectionId - The connection ID from the DB (providerConnection.id)
 * @param meta - Access token and optional workspace ID
 */
export function registerCodexConnection(connectionId: string, meta: CodexConnectionMeta): void {
  if (!connectionRegistry.has(connectionId) && connectionRegistry.size >= MAX_CONNECTIONS) {
    const oldestKey = connectionRegistry.keys().next().value;
    if (oldestKey !== undefined) {
      deleteQuotaCacheForConnection(oldestKey);
      connectionRegistry.delete(oldestKey);
    }
  }
  connectionRegistry.set(connectionId, meta);
}

function getQuotaCacheKey(connectionId: string, requestedModel?: string | null): string {
  return `${connectionId}:${getCodexModelScope(requestedModel)}`;
}

function deleteQuotaCacheForConnection(connectionId: string): void {
  quotaCache.delete(connectionId);
  const scopedKeys = Array.from(quotaCache.keys()).filter((key) =>
    key.startsWith(`${connectionId}:`)
  );
  for (const key of scopedKeys) quotaCache.delete(key);
}

export function unregisterCodexConnection(connectionId: string): void {
  deleteQuotaCacheForConnection(connectionId);
  connectionRegistry.delete(connectionId);
}

function getRequestedModel(connection?: Record<string, unknown>): string | null {
  if (!connection || typeof connection !== "object") return null;
  const directModel = connection.requestedModel ?? connection.model;
  return typeof directModel === "string" && directModel.trim().length > 0
    ? directModel.trim()
    : null;
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
      if (!connectionRegistry.has(connectionId) && connectionRegistry.size >= MAX_CONNECTIONS) {
        const oldestKey = connectionRegistry.keys().next().value;
        if (oldestKey !== undefined) {
          deleteQuotaCacheForConnection(oldestKey);
          connectionRegistry.delete(oldestKey);
        }
      }
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
): Promise<CodexDualWindowQuota | null> {
  const requestedModel = getRequestedModel(connection);
  const cacheKey = getQuotaCacheKey(connectionId, requestedModel);

  // Check cache first
  const cached = quotaCache.get(cacheKey);
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
        deleteQuotaCacheForConnection(connectionId);
        connectionRegistry.delete(connectionId);
      }
      return null;
    }

    const data = await response.json();
    const quota = parseCodexUsageResponse(data, requestedModel);

    if (!quota) return null;

    // Store in cache
    if (!quotaCache.has(connectionId) && quotaCache.size >= MAX_QUOTA_CACHE_ENTRIES) {
      const oldestCacheKey = quotaCache.keys().next().value;
      if (oldestCacheKey !== undefined) quotaCache.delete(oldestCacheKey);
    }
    quotaCache.set(cacheKey, { quota, fetchedAt: Date.now() });
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

function parseCodexWindow(
  window: Record<string, unknown> | null | undefined
): { percentUsed: number; resetAt: string | null } | null {
  if (!window || Object.keys(window).length === 0) return null;
  const percentUsed = toNumber(window["used_percent"] ?? window["usedPercent"], 0) / 100;
  return { percentUsed, resetAt: parseWindowReset(window) };
}

function findSparkRateLimit(data: Record<string, unknown>): Record<string, unknown> | null {
  const additional = data["additional_rate_limits"] ?? data["additionalRateLimits"];
  if (!Array.isArray(additional)) return null;

  for (const entryValue of additional) {
    const entry = toRecord(entryValue);
    if (
      !isCodexSparkLimitDescriptor(
        entry["limit_name"],
        entry["limitName"],
        entry["metered_feature"],
        entry["meteredFeature"],
        entry["limit_id"],
        entry["limitId"],
        entry["id"],
        entry["name"],
        entry["title"],
        entry["model"],
        entry["model_id"],
        entry["modelId"]
      )
    ) {
      continue;
    }
    return toRecord(entry["rate_limit"] ?? entry["rateLimit"]);
  }

  return null;
}

function getCodexRateLimitWindows(rateLimit: Record<string, unknown>): {
  primary: { percentUsed: number; resetAt: string | null } | null;
  secondary: { percentUsed: number; resetAt: string | null } | null;
} {
  return {
    primary: parseCodexWindow(toRecord(rateLimit["primary_window"] ?? rateLimit["primaryWindow"])),
    secondary: parseCodexWindow(
      toRecord(rateLimit["secondary_window"] ?? rateLimit["secondaryWindow"])
    ),
  };
}

function assignCodexWindows(
  target: Record<string, { percentUsed: number; resetAt: string | null }>,
  rateLimit: Record<string, unknown>,
  names: { primary: string; secondary: string }
): void {
  const { primary, secondary } = getCodexRateLimitWindows(rateLimit);
  if (primary) target[names.primary] = primary;
  if (secondary) target[names.secondary] = secondary;
}

function getSelectedCodexRateLimit(
  normalRateLimit: Record<string, unknown>,
  sparkRateLimit: Record<string, unknown> | null,
  useSparkWindows: boolean
): Record<string, unknown> | null {
  if (useSparkWindows) return sparkRateLimit;
  return normalRateLimit;
}

function parseCodexUsageResponse(
  data: unknown,
  requestedModel?: string | null
): CodexDualWindowQuota | null {
  const obj = toRecord(data);
  const normalRateLimit = toRecord(obj["rate_limit"] ?? obj["rateLimit"]);
  const sparkRateLimit = findSparkRateLimit(obj);
  const useSparkWindows = getCodexModelScope(requestedModel) === "spark";
  const selectedRateLimit = getSelectedCodexRateLimit(
    normalRateLimit,
    sparkRateLimit,
    useSparkWindows
  );
  if (!selectedRateLimit) return null;

  // Require at least one window to be present for the requested scope.
  const { primary: parsedPrimary, secondary: parsedSecondary } =
    getCodexRateLimitWindows(selectedRateLimit);
  if (!parsedPrimary && !parsedSecondary) return null;

  const window5h = parsedPrimary ?? { percentUsed: 0, resetAt: null };
  const window7d = parsedSecondary ?? { percentUsed: 0, resetAt: null };
  const worstPercentUsed = Math.max(window5h.percentUsed, window7d.percentUsed);
  const limitReached = Boolean(
    selectedRateLimit["limit_reached"] ?? selectedRateLimit["limitReached"]
  );

  const windows: Record<string, { percentUsed: number; resetAt: string | null }> = {};
  assignCodexWindows(windows, selectedRateLimit, {
    primary: useSparkWindows ? CODEX_SPARK_QUOTA_SESSION : CODEX_WINDOW_SESSION,
    secondary: useSparkWindows ? CODEX_SPARK_QUOTA_WEEKLY : CODEX_WINDOW_WEEKLY,
  });
  const allWindows: Record<string, { percentUsed: number; resetAt: string | null }> = {
    ...windows,
  };

  if (sparkRateLimit) {
    assignCodexWindows(allWindows, sparkRateLimit, {
      primary: CODEX_SPARK_QUOTA_SESSION,
      secondary: CODEX_SPARK_QUOTA_WEEKLY,
    });
  }
  assignCodexWindows(allWindows, normalRateLimit, {
    primary: CODEX_WINDOW_SESSION,
    secondary: CODEX_WINDOW_WEEKLY,
  });

  return {
    used: Math.round(worstPercentUsed * 100),
    total: 100,
    percentUsed: worstPercentUsed,
    resetAt: getDominantResetAt({ window5h, window7d }),
    // Per-window breakdown for the preflight evaluator. For Spark requests this
    // intentionally contains ONLY Spark windows, so Spark exhaustion does not
    // preflight-block normal Codex requests (and vice versa).
    windows,
    allWindows,
    // Legacy fields preserved for existing consumers (quotaMonitor, cooldown
    // computation in accountFallback). These mirror the selected scope entries
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
  deleteQuotaCacheForConnection(connectionId);
}

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * Register the Codex quota fetcher with the preflight and monitor systems.
 * Call this once at server startup (in chatCore.ts or app entry point).
 */
export function registerCodexQuotaFetcher(): void {
  registerQuotaFetcher("codex", fetchCodexQuota);
  registerMonitorFetcher("codex", fetchCodexQuota);
  registerQuotaWindows("codex", [
    CODEX_WINDOW_SESSION,
    CODEX_WINDOW_WEEKLY,
    CODEX_SPARK_QUOTA_SESSION,
    CODEX_SPARK_QUOTA_WEEKLY,
  ]);
}
