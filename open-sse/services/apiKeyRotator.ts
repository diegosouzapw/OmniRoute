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

// Tracks which connections have extra API keys (for A3 guard in chatCore.ts)
// Used to prevent disabling an entire connection when only one key fails.
const _connectionExtraKeys = new Map<string, boolean>();
// Eviction limits to prevent unbounded memory growth under heavy load
const MAX_KEY_HEALTH_ENTRIES = 500;
const MAX_CONNECTION_EXTRA_KEYS = 500;

/**
 * Record whether a connection has extra API keys.
 * Called by chatCore.ts when a 401 is detected, to inform the A3 guard.
 */
export function trackConnectionExtraKeys(connectionId: string, extraKeys: string[]): void {
  const validExtras = extraKeys.filter((k) => typeof k === "string" && k.trim().length > 0);
  if (
    !_connectionExtraKeys.has(connectionId) &&
    _connectionExtraKeys.size >= MAX_CONNECTION_EXTRA_KEYS
  ) {
    const oldest = _connectionExtraKeys.keys().next().value;
    if (oldest !== undefined) _connectionExtraKeys.delete(oldest);
  }
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
  // #14573: per-key 429 cooldown. A rate-limited key is skipped by the rotator
  // until this ISO timestamp passes; unlike "invalid" it recovers automatically
  // and does not count as a credential failure.
  cooldownUntil?: string | null;
}

const _keyHealth = new Map<string, KeyHealth>();

const FAILURE_THRESHOLD = 2; // Mark as invalid after 2 consecutive failures

/**
 * Default per-key cooldown when a 429 carries no Retry-After (#14573).
 * Overridable via OMNIROUTE_API_KEY_COOLDOWN_MS (milliseconds).
 */
export const DEFAULT_KEY_COOLDOWN_MS = (() => {
  const raw = Number(process.env.OMNIROUTE_API_KEY_COOLDOWN_MS);
  return Number.isFinite(raw) && raw > 0 ? raw : 60_000;
})();

/**
 * Parse a Retry-After header value into milliseconds.
 * Handles delta-seconds ("30") and HTTP-date (RFC 9110 §10.2.3).
 * Returns 0 for an already-expired HTTP-date, null when unparseable/absent.
 */
export function parseRetryAfterMs(value: string | null | undefined): number | null {
  if (value == null) return null;
  const trimmed = value.trim();
  if (trimmed === "") return null;
  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed) * 1000;
  }
  const dateMs = Date.parse(trimmed);
  if (Number.isNaN(dateMs)) return null;
  return Math.max(dateMs - Date.now(), 0);
}

/**
 * True when the key's cooldown window has not elapsed yet. An existing
 * in-memory record is fully authoritative — including an explicit `null`
 * cooldown left by recordKeySuccess — so a stale DB-provided snapshot can
 * never resurrect a cooldown that was just cleared. The `provided` fallback
 * only applies when no in-memory record exists (e.g. first touch after
 * startup hydration).
 */
function isCooling(
  connectionId: string,
  keyId: string,
  provided?: KeyHealth | undefined
): boolean {
  const inMemory = _keyHealth.get(`${connectionId}:${keyId}`);
  const until = inMemory
    ? inMemory.cooldownUntil ?? null
    : (provided?.cooldownUntil ?? null);
  if (!until) return false;
  const untilMs = Date.parse(until);
  return Number.isFinite(untilMs) && untilMs > Date.now();
}

/**
 * Record a per-key rate-limit cooldown (#14573). Unlike recordKeyFailure,
 * this never changes `status` or `failures` — a 429 is temporary. The key is
 * skipped by getValidApiKey until `cooldownUntil` passes, then eligible again.
 *
 * @param connectionId - Connection scope for health state isolation
 * @param keyId - Key identifier ("primary" | "extra_0" | ...)
 * @param cooldownMs - Cooldown window in milliseconds (Retry-After or default)
 * @returns Updated health status
 */
export function recordKeyCooldown(
  connectionId: string,
  keyId: string,
  cooldownMs: number
): KeyHealth {
  const health = getOrCreateHealth(connectionId, keyId);
  health.cooldownUntil = new Date(Date.now() + Math.max(cooldownMs, 0)).toISOString();
  health.totalRequests++;
  return { ...health };
}

/**
 * Get or create health status for a specific key within a connection scope.
 */
function getOrCreateHealth(connectionId: string, keyId: string): KeyHealth {
  const scopedKey = `${connectionId}:${keyId}`;
  if (!_keyHealth.has(scopedKey)) {
    if (_keyHealth.size >= MAX_KEY_HEALTH_ENTRIES) {
      const oldest = _keyHealth.keys().next().value;
      if (oldest !== undefined) _keyHealth.delete(oldest);
    }
    _keyHealth.set(scopedKey, {
      status: "active",
      failures: 0,
      lastFailure: null,
      lastSuccess: null,
      totalRequests: 0,
      totalFailures: 0,
      cooldownUntil: null,
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
): { key: string; keyId: string } | null {
  const validExtras = extraKeys.filter((k) => typeof k === "string" && k.trim().length > 0);

  // Build list of all keys with their IDs
  const allKeys: Array<{ key: string; keyId: string }> = [];

  // Add primary key if valid
  if (primaryKey) {
    const primaryHealth = health?.["primary"] || getOrCreateHealth(connectionId, "primary");
    if (primaryHealth.status !== "invalid" && !isCooling(connectionId, "primary", primaryHealth)) {
      allKeys.push({ key: primaryKey, keyId: "primary" });
    } else {
      const reason = primaryHealth.status === "invalid" ? "invalid" : "cooling";
      console.warn(
        `[KeyRotator] Skipping ${reason} primary key for connection ${connectionId.slice(0, 8)}`
      );
    }
  }

  // Add extra keys if valid
  for (let i = 0; i < validExtras.length; i++) {
    const keyId = `extra_${i}`;
    const keyHealth = health?.[keyId] || getOrCreateHealth(connectionId, keyId);
    if (keyHealth.status !== "invalid" && !isCooling(connectionId, keyId, keyHealth)) {
      allKeys.push({ key: validExtras[i], keyId });
    }
  }

  if (allKeys.length === 0) return null;
  if (allKeys.length === 1) {
    return { key: allKeys[0].key, keyId: allKeys[0].keyId };
  }

  // Round-robin among valid keys only
  const current = _keyIndexes.get(connectionId) ?? 0;
  const idx = current % allKeys.length;
  _keyIndexes.set(connectionId, current + 1);

  return { key: allKeys[idx].key, keyId: allKeys[idx].keyId };
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
 * Record a terminal failure for a key — e.g. HTTP 402 "Insufficient account
 * balance". Unlike recordKeyFailure() (which only invalidates after
 * FAILURE_THRESHOLD consecutive failures), this marks the key "invalid"
 * immediately in a single call, because the condition will not recover
 * mid-session (the depleted key must not be returned by the rotator again
 * until credits are added / an operator resets it).
 *
 * @param connectionId - Connection scope for health state isolation
 * @param keyId - Key identifier ("primary" | "extra_0" | ...)
 * @returns Updated health status
 */
export function recordKeyTerminal(connectionId: string, keyId: string): KeyHealth {
  const health = getOrCreateHealth(connectionId, keyId);
  health.failures = Math.max(health.failures + 1, FAILURE_THRESHOLD);
  health.totalRequests++;
  health.totalFailures++;
  health.lastFailure = new Date().toISOString();
  health.status = "invalid";

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
  // A genuine success proves the key works again — clear any 429 cooldown (#14573).
  health.cooldownUntil = null;

  return { ...health };
}

/**
 * True when the rotator can still produce an eligible key for this connection
 * (#14573). Used by the chatCore quota-exhausted guard: if extra keys exist
 * and at least one remains usable, a single hot key must not take the whole
 * connection down.
 */
export function hasEligibleKey(
  connectionId: string,
  primaryKey: string,
  extraKeys: string[] = [],
  health?: Record<string, KeyHealth>
): boolean {
  // Pure predicate: never mutates the round-robin index. chatCore consults
  // this on the quota-exhausted guard path, and a predicate that consumed a
  // rotation step would desync the next real key selection (#14573 review).
  const validExtras = extraKeys.filter((k) => typeof k === "string" && k.trim().length > 0);
  const candidates: Array<{ keyId: string; provided?: KeyHealth | undefined }> = [];
  if (primaryKey) candidates.push({ keyId: "primary", provided: health?.["primary"] });
  validExtras.forEach((_, i) =>
    candidates.push({ keyId: `extra_${i}`, provided: health?.[`extra_${i}`] })
  );
  for (const { keyId, provided } of candidates) {
    const inMemory = _keyHealth.get(`${connectionId}:${keyId}`);
    const status = provided?.status ?? inMemory?.status ?? "active";
    if (status !== "invalid" && !isCooling(connectionId, keyId, provided)) return true;
  }
  return false;
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
    const scopedKey = `${connectionId}:${keyId}`;
    if (!_keyHealth.has(scopedKey) && _keyHealth.size >= MAX_KEY_HEALTH_ENTRIES) {
      const oldest = _keyHealth.keys().next().value;
      if (oldest !== undefined) _keyHealth.delete(oldest);
    }
    _keyHealth.set(scopedKey, keyHealth);
  }
}

/** Recover one authoritatively validated key without changing sibling-key health. */
export function recoverKeyHealth(
  connectionId: string,
  keyId: string,
  providerSpecificData: unknown
): Record<string, unknown> | undefined {
  const data =
    providerSpecificData && typeof providerSpecificData === "object"
      ? (providerSpecificData as Record<string, unknown>)
      : {};
  const health = data.apiKeyHealth as Record<string, KeyHealth> | undefined;
  const currentHealth = health?.[keyId];
  if (!currentHealth || (currentHealth.status === "active" && currentHealth.failures === 0)) {
    return undefined;
  }

  syncHealthFromDB(connectionId, health);
  return {
    ...data,
    apiKeyHealth: { ...health, [keyId]: recordKeySuccess(connectionId, keyId) },
  };
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

/**
 * Resolve the API key and its health status for an ongoing request.
 *
 * Unlike getValidApiKey() (which does round-robin for every call), this
 * method re-uses the previously selected keyId when available — ensuring
 * that a multi-turn request stream keeps using the same key. If no key
 * was selected yet or the stored key is no longer valid, it falls back
 * to fresh round-robin via getValidApiKey().
 *
 * @returns The resolved key+keyId, or null if no valid keys remain.
 */
export function resolveKeyForRequest(
  connectionId: string,
  primaryKey: string,
  extraKeys: string[],
  selectedKeyId: string | null
): { key: string; keyId: string } | null {
  if (selectedKeyId) {
    const health = getOrCreateHealth(connectionId, selectedKeyId);
    if (health.status !== "invalid") {
      if (selectedKeyId === "primary" && primaryKey) {
        return { key: primaryKey, keyId: "primary" };
      }
      const match = /^extra_(\d+)$/.exec(selectedKeyId);
      if (match) {
        const idx = Number.parseInt(match[1], 10);
        if (idx >= 0 && idx < extraKeys.length && extraKeys[idx].trim().length > 0) {
          return { key: extraKeys[idx], keyId: selectedKeyId };
        }
      }
    }
  }

  return getValidApiKey(connectionId, primaryKey, extraKeys);
}

export function removeConnectionHealth(connectionId: string): void {
  for (const key of _keyHealth.keys()) {
    if (key.startsWith(`${connectionId}:`)) {
      _keyHealth.delete(key);
    }
  }
}

export function removeConnectionIndex(connectionId: string): void {
  _keyIndexes.delete(connectionId);
  _connectionExtraKeys.delete(connectionId);
  for (const key of _keyHealth.keys()) {
    if (key.startsWith(`${connectionId}:`)) {
      _keyHealth.delete(key);
    }
  }
}

export type { KeyHealth };
