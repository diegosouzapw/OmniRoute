/**
 * apiKeyRotator.ts — T07: API Key Round-Robin with Health Tracking
 *
 * Rotates between a primary API key and extra API keys stored in
 * providerSpecificData.extraApiKeys[]. Uses round-robin by default.
 *
 * Extra keys are stored as plain strings in providerSpecificData.extraApiKeys.
 * Example: { extraApiKeys: ["sk-abc...", "sk-def...", "sk-ghi..."] }
 *
 * The in-memory rotation index resets on process restart, which is intentional —
 * it ensures even distribution across restarts without persistence overhead.
 *
 * Health tracking: monitors per-key authentication failures. Keys that fail
 * 3+ consecutive times are marked as "invalid" and skipped during rotation.
 * Health status is persisted in providerSpecificData.apiKeyHealth.
 */

// In-memory round-robin index per connection
const _keyIndexes = new Map<string, number>();

// Tracks the last keyId selected by getValidApiKey() for a connection.
// Used by chatCore.ts to know which key to record failures/successes against.
const _lastUsedKeyId = new Map<string, string>();

// Tracks which connections have extra API keys (for A3 guard in chatCore.ts)
// Used to prevent disabling an entire connection when only one key fails.
const _connectionExtraKeys = new Map<string, boolean>();

/**
 * Record whether a connection has extra API keys.
 * Called by chatCore.ts when a 401 is detected, to inform the A3 guard.
 */
export function trackConnectionExtraKeys(connectionId: string, extraKeys: string[]): void {
  const validExtras = extraKeys.filter((k) => typeof k === "string" && k.trim().length > 0);
  _connectionExtraKeys.set(connectionId, validExtras.length > 0);
}

/**
 * Check if a connection has extra API keys (for the A3 guard).
 * Uses the in-memory cache (populated during request execution) and falls back
 * to direct extraKeys data when provided, ensuring reliability across restarts.
 */
export function connectionHasExtraKeys(connectionId: string, extraKeys?: string[]): boolean {
  // Direct data check is always authoritative
  if (extraKeys && extraKeys.length > 0) return true;
  // Fall back to in-memory cache (populated as side-effect during execution)
  return _connectionExtraKeys.get(connectionId) ?? false;
}

// In-memory health status (synced to DB on state changes)
// Key format: "primary" | "extra_0" | "extra_1" | ...
interface KeyHealth {
  status: "active" | "warning" | "invalid";
  failures: number; // consecutive failures
  lastFailure: string | null; // ISO timestamp
  lastSuccess: string | null; // ISO timestamp
  totalRequests: number;
  totalFailures: number;
}

const _keyHealth = new Map<string, KeyHealth>();

const FAILURE_THRESHOLD = 3; // Mark as invalid after 3 consecutive failures

/**
 * Get or create health status for a specific key within a connection scope.
 */
function getOrCreateHealth(connectionId: string, keyId: string): KeyHealth {
  const scopedKey = `${connectionId}:${keyId}`;
  if (!_keyHealth.has(scopedKey)) {
    _keyHealth.set(scopedKey, {
      status: "active",
      failures: 0,
      lastFailure: null,
      lastSuccess: null,
      totalRequests: 0,
      totalFailures: 0,
    });
  }
  return _keyHealth.get(scopedKey)!;
}

/**
 * Get the next valid API key in round-robin rotation.
 * Skips keys marked as "invalid" in health status.
 *
 * @param connectionId - Unique connection identifier (for index isolation)
 * @param primaryKey - The main api_key from the connection
 * @param extraKeys - Additional API keys from providerSpecificData.extraApiKeys
 * @param health - Optional health status from providerSpecificData.apiKeyHealth
 * @returns The selected API key, or null if no valid keys available
 */
export function getValidApiKey(
  connectionId: string,
  primaryKey: string,
  extraKeys: string[] = [],
  health?: Record<string, KeyHealth>
): string | null {
  const validExtras = extraKeys.filter((k) => typeof k === "string" && k.trim().length > 0);

  // Build list of all keys with their IDs
  const allKeys: Array<{ key: string; keyId: string }> = [];

  // Add primary key if valid
  if (primaryKey) {
    const primaryHealth = health?.["primary"] || getOrCreateHealth(connectionId, "primary");
    if (primaryHealth.status !== "invalid") {
      allKeys.push({ key: primaryKey, keyId: "primary" });
    }
  }

  // Add extra keys if valid
  for (let i = 0; i < validExtras.length; i++) {
    const keyId = `extra_${i}`;
    const keyHealth = health?.[keyId] || getOrCreateHealth(connectionId, keyId);
    if (keyHealth.status !== "invalid") {
      allKeys.push({ key: validExtras[i], keyId });
    }
  }

  if (allKeys.length === 0) return null;
  if (allKeys.length === 1) {
    _lastUsedKeyId.set(connectionId, allKeys[0].keyId);
    return allKeys[0].key;
  }

  // Round-robin among valid keys only
  const current = _keyIndexes.get(connectionId) ?? 0;
  const idx = current % allKeys.length;
  _keyIndexes.set(connectionId, current + 1);

  _lastUsedKeyId.set(connectionId, allKeys[idx].keyId);
  return allKeys[idx].key;
}

/**
 * Get the keyId that was last selected by getValidApiKey() for a connection.
 * Used by chatCore.ts to record failures/successes against the correct key.
 */
export function getLastUsedKeyId(connectionId: string): string | undefined {
  return _lastUsedKeyId.get(connectionId);
}

/**
 * Get the next API key in round-robin rotation (legacy, without health check).
 * @deprecated Use getValidApiKey() instead
 */
export function getRotatingApiKey(
  connectionId: string,
  primaryKey: string,
  extraKeys: string[] = []
): string {
  const validExtras = extraKeys.filter((k) => typeof k === "string" && k.trim().length > 0);

  if (validExtras.length === 0) return primaryKey;

  const allKeys = [primaryKey, ...validExtras].filter(Boolean);
  if (allKeys.length <= 1) return primaryKey;

  const current = _keyIndexes.get(connectionId) ?? 0;
  const idx = current % allKeys.length;
  _keyIndexes.set(connectionId, current + 1);

  return allKeys[idx];
}

/**
 * Record a failed authentication attempt for a key.
 * Increments failure count and marks as "invalid" if threshold exceeded.
 *
 * @param connectionId - Connection scope for health state isolation
 * @param keyId - Key identifier ("primary" | "extra_0" | ...)
 * @returns Updated health status
 */
export function recordKeyFailure(connectionId: string, keyId: string): KeyHealth {
  const health = getOrCreateHealth(connectionId, keyId);
  health.failures++;
  health.totalRequests++;
  health.totalFailures++;
  health.lastFailure = new Date().toISOString();

  if (health.failures >= FAILURE_THRESHOLD) {
    health.status = "invalid";
  } else if (health.failures > 0) {
    health.status = "warning";
  }

  return { ...health };
}

/**
 * Record a successful authentication attempt for a key.
 * Resets failure count and marks as "active".
 *
 * @param connectionId - Connection scope for health state isolation
 * @param keyId - Key identifier ("primary" | "extra_0" | ...)
 * @returns Updated health status
 */
export function recordKeySuccess(connectionId: string, keyId: string): KeyHealth {
  const health = getOrCreateHealth(connectionId, keyId);
  health.failures = 0;
  health.totalRequests++;
  health.lastSuccess = new Date().toISOString();
  health.status = "active";

  return { ...health };
}

/**
 * Get count of invalid keys (for notification).
 */
export function getInvalidKeyCount(health?: Record<string, KeyHealth>): number {
  if (!health) return 0;
  return Object.values(health).filter((h) => h.status === "invalid").length;
}

/**
 * Get health statistics for display.
 */
export function getKeyHealthStats(
  connectionId: string,
  primaryKey: string,
  extraKeys: string[] = [],
  health?: Record<string, KeyHealth>
): {
  total: number;
  active: number;
  warning: number;
  invalid: number;
} {
  const total = (primaryKey ? 1 : 0) + extraKeys.filter((k) => k.trim().length > 0).length;
  const keys = ["primary", ...extraKeys.map((_, i) => `extra_${i}`)];

  let active = 0;
  let warning = 0;
  let invalid = 0;

  for (const keyId of keys) {
    const h = health?.[keyId] || getOrCreateHealth(connectionId, keyId);
    if (h.status === "active") active++;
    else if (h.status === "warning") warning++;
    else if (h.status === "invalid") invalid++;
  }

  return { total, active, warning, invalid };
}

/**
 * Reset a key's health status to active.
 * Called manually from Dashboard to recover from false positives.
 */
export function resetKeyStatus(connectionId: string, keyId: string): KeyHealth {
  const health = getOrCreateHealth(connectionId, keyId);
  health.failures = 0;
  health.status = "active";
  health.lastFailure = null;
  return { ...health };
}

/**
 * Get full health status for all keys.
 */
export function getAllKeyHealth(): Record<string, KeyHealth> {
  const result: Record<string, KeyHealth> = {};
  for (const [keyId, health] of _keyHealth.entries()) {
    result[keyId] = { ...health };
  }
  return result;
}

/**
 * Sync health status from DB (on connection load).
 */
export function syncHealthFromDB(connectionId: string, health?: Record<string, KeyHealth>): void {
  if (!health) return;

  for (const [keyId, keyHealth] of Object.entries(health)) {
    _keyHealth.set(`${connectionId}:${keyId}`, keyHealth);
  }
}

/**
 * Reset the rotation index for a connection.
 * Call this when a key fails (401/403) to skip the bad key next time.
 *
 * @param connectionId - Connection to reset
 * @deprecated Use recordKeyFailure() instead
 */
export function resetRotationIndex(connectionId: string): void {
  _keyIndexes.delete(connectionId);
}

/**
 * Get the total number of API keys available for a connection.
 * Used for logging/observability.
 */
export function getApiKeyCount(primaryKey: string, extraKeys: string[] = []): number {
  const validExtras = extraKeys.filter((k) => typeof k === "string" && k.trim().length > 0);
  return (primaryKey ? 1 : 0) + validExtras.length;
}

export type { KeyHealth };
