/**
 * Credential Health Cache
 *
 * In-memory cache for provider credential health status.
 * Follows the same pattern as localHealthCheck.ts — globalThis singleton
 * survives HMR re-evaluation.
 *
 * Tracks testStatus, lastError, lastTested per connectionId with
 * configurable TTL. Auto-expiry on read for stale entries.
 */

export interface CredentialHealthStatus {
  connectionId: string;
  provider: string;
  /** "active" | "error" | "unknown" — mirrors testStatus from provider_connections */
  status: "active" | "error" | "unknown";
  lastTested: Date;
  lastError?: string;
  lastErrorType?: string;
  lastErrorSource?: string;
  /** Consecutive failures since last success */
  consecutiveFailures: number;
  /** Response time of the last test in ms */
  responseTimeMs?: number;
}

export interface CredentialCacheEntry {
  status: CredentialHealthStatus;
  /** Expiry timestamp (epoch ms) */
  expiresAt: number;
}

// ── Config ────────────────────────────────────────────────────────────────

const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes
const STALE_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes — considered stale
const MAX_ENTRIES = 500;

// ── State (globalThis singleton) ──────────────────────────────────────────

declare global {
  var __omnirouteCredentialCache:
    | {
        initialized: boolean;
        cache: Map<string, CredentialCacheEntry>;
      }
    | undefined;
}

function getCacheState() {
  if (!globalThis.__omnirouteCredentialCache) {
    globalThis.__omnirouteCredentialCache = {
      initialized: false,
      cache: new Map(),
    };
  }
  return globalThis.__omnirouteCredentialCache;
}

// ── Public API ────────────────────────────────────────────────────────────

/**
 * Get cached credential health for a connection.
 * Returns undefined if not cached or expired.
 */
export function getCredentialHealth(connectionId: string): CredentialHealthStatus | undefined {
  const state = getCacheState();
  const entry = state.cache.get(connectionId);

  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    // Expired — remove and return undefined
    state.cache.delete(connectionId);
    return undefined;
  }

  return entry.status;
}

/**
 * Check if a connection's credential health is "active" (recently tested and passing).
 * Returns:
 *   - true  → healthy, proceed
 *   - false → known-bad, skip
 *   - undefined → unknown / not cached (proceed but mark as unchecked)
 */
export function isCredentialHealthy(connectionId: string): boolean | undefined {
  const status = getCredentialHealth(connectionId);
  if (!status) return undefined;

  if (status.status === "active") return true;
  if (status.status === "error") return false;

  return undefined;
}

/**
 * Check if a connection's credential status is stale (not tested recently).
 */
export function isCredentialStale(connectionId: string): boolean {
  const status = getCredentialHealth(connectionId);
  if (!status) return true; // Not cached = stale

  const age = Date.now() - status.lastTested.getTime();
  return age > STALE_THRESHOLD_MS;
}

/**
 * Update the cached health status for a connection.
 */
export function setCredentialHealth(
  connectionId: string,
  provider: string,
  status: "active" | "error" | "unknown",
  lastError?: string,
  lastErrorType?: string,
  lastErrorSource?: string,
  responseTimeMs?: number
): void {
  const state = getCacheState();

  // Enforce max entries (evict oldest if full)
  if (state.cache.size >= MAX_ENTRIES) {
    const oldest = state.cache.entries().next().value;
    if (oldest) state.cache.delete(oldest[0]);
  }

  const prev = state.cache.get(connectionId);
  const consecutiveFailures =
    status === "error"
      ? (prev?.status.consecutiveFailures ?? 0) + 1
      : status === "active"
        ? 0
        : (prev?.status.consecutiveFailures ?? 0);

  state.cache.set(connectionId, {
    status: {
      connectionId,
      provider,
      status,
      lastTested: new Date(),
      lastError,
      lastErrorType,
      lastErrorSource,
      consecutiveFailures,
      responseTimeMs,
    },
    expiresAt: Date.now() + DEFAULT_TTL_MS,
  });
}

/**
 * Remove a connection from the cache (e.g., connection deleted).
 */
export function removeCredentialHealth(connectionId: string): void {
  const state = getCacheState();
  state.cache.delete(connectionId);
}

/**
 * Get all cached credential health statuses (for monitoring API).
 */
export function getAllCredentialHealth(): Record<string, CredentialHealthStatus> {
  const state = getCacheState();
  const result: Record<string, CredentialHealthStatus> = {};

  for (const [id, entry] of state.cache.entries()) {
    if (Date.now() <= entry.expiresAt) {
      result[id] = entry.status;
    } else {
      state.cache.delete(id); // Clean expired on read
    }
  }

  return result;
}

/**
 * Get cache summary stats for health API.
 */
export function getCredentialHealthSummary(): {
  total: number;
  healthy: number;
  failed: number;
  unknown: number;
  stale: number;
} {
  const all = getAllCredentialHealth();
  const entries = Object.values(all);
  const now = Date.now();

  return {
    total: entries.length,
    healthy: entries.filter((e) => e.status === "active").length,
    failed: entries.filter((e) => e.status === "error").length,
    unknown: entries.filter((e) => e.status === "unknown").length,
    stale: entries.filter((e) => now - e.lastTested.getTime() > STALE_THRESHOLD_MS).length,
  };
}

/**
 * Mark cache as initialized (called by scheduler on startup).
 */
export function initCredentialCache(): void {
  getCacheState().initialized = true;
}
