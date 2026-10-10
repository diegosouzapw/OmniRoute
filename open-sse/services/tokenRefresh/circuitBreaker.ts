// @ts-nocheck
//
// Per-provider circuit breaker + refreshWithRetry — extracted from
// open-sse/services/tokenRefresh.ts. See ../shared.ts for provenance notes.
//
// refreshWithRetry wraps a refresh attempt with exponential backoff, a 30s
// per-attempt timeout, and a per-provider circuit breaker (5 consecutive
// failures → 30min pause). Unrecoverable refresh errors (invalid_grant,
// refresh_token_reused, …) short-circuit retries so the HealthCheck can
// deactivate the account instead of looping every 60s.
import type { RefreshLogger } from "./shared.ts";
import { isUnrecoverableRefreshError, NO_REFRESH_NEEDED } from "./shared.ts";

// ─── Circuit Breaker State ──────────────────────────────────────────────────
const _circuitBreaker: Record<string, { failures: number; blockedUntil: number }> = {};
const CIRCUIT_BREAKER_THRESHOLD = 5; // consecutive failures before tripping
const CIRCUIT_BREAKER_COOLDOWN = 30 * 60 * 1000; // 30 minutes
const CIRCUIT_BREAKER_REGISTRY_CAP = 500; // max entries; blocked entries are never evicted
const REFRESH_TIMEOUT_MS = 30_000; // 30s max per refresh attempt

export type TokenRefreshBreakerScope = "provider" | "connection";

export interface TokenRefreshBreakerOptions {
  connectionId?: string;
  scope?: TokenRefreshBreakerScope;
  failureThreshold?: number;
  cooldownMs?: number;
}

function resolveBreakerOptions(options?: TokenRefreshBreakerOptions): {
  scope: TokenRefreshBreakerScope;
  failureThreshold: number;
  cooldownMs: number;
} {
  const raw = options ?? {};
  return {
    scope: raw.scope === "connection" ? "connection" : "provider",
    failureThreshold:
      typeof raw.failureThreshold === "number" &&
      Number.isFinite(raw.failureThreshold) &&
      raw.failureThreshold >= 1
        ? Math.min(100, Math.trunc(raw.failureThreshold))
        : CIRCUIT_BREAKER_THRESHOLD,
    cooldownMs:
      // Direct callers (tests) may inject short cooldowns; production values
      // come from normalized settings (>= 60s).
      typeof raw.cooldownMs === "number" && Number.isFinite(raw.cooldownMs) && raw.cooldownMs > 0
        ? Math.min(24 * 60 * 60 * 1000, Math.max(1, Math.trunc(raw.cooldownMs)))
        : CIRCUIT_BREAKER_COOLDOWN,
  };
}

// Same key shape as the connection-scoped request breaker
// (open-sse/services/connectionCircuitBreaker.ts): one dead account must not
// block the sibling accounts on the same provider. Falls back to the provider
// key when no usable connection id is given.
function breakerKey(
  provider: string,
  connectionId: string | undefined,
  scope: TokenRefreshBreakerScope
): string {
  if (scope !== "connection") return provider;
  const trimmed = typeof connectionId === "string" ? connectionId.trim() : "";
  return trimmed ? `${provider}::conn::${trimmed}` : provider;
}

function evictExpiredBreakerEntries(now: number): void {
  for (const [key, state] of Object.entries(_circuitBreaker)) {
    if (state.blockedUntil && state.blockedUntil <= now) {
      delete _circuitBreaker[key];
    }
  }
}

function makeBreakerRoom(now: number): boolean {
  evictExpiredBreakerEntries(now);
  if (Object.keys(_circuitBreaker).length < CIRCUIT_BREAKER_REGISTRY_CAP) return true;
  // Full of live entries: evict one non-blocked entry, never a blocked one.
  // When every entry is blocked, refuse the insert instead of growing
  // unbounded or evicting live protection.
  for (const [key, state] of Object.entries(_circuitBreaker)) {
    if (!state.blockedUntil || state.blockedUntil <= now) {
      delete _circuitBreaker[key];
      return true;
    }
  }
  return false;
}

interface CircuitBreakerStatusEntry {
  failures: number;
  blocked: boolean;
  blockedUntil: string | null;
  remainingMs: number;
}

interface RefreshLoggerLike {
  error?: (scope: string, message: string) => void;
  warn?: (scope: string, message: string) => void;
}

/**
 * Check if a provider is circuit-breaker blocked.
 */
export function isProviderBlocked(provider: string, options?: TokenRefreshBreakerOptions): boolean {
  const { scope } = resolveBreakerOptions(options);
  const key = breakerKey(provider, options?.connectionId, scope);
  const state = _circuitBreaker[key];
  if (!state) return false;
  if (!state.blockedUntil) return false;
  // Absolute expiry: the trip instant is fixed at recordFailure time, so any
  // read past the stored timestamp resets — regardless of the cooldown the
  // current read carries. A read is never "more blocked" than the trip.
  if (state.blockedUntil > Date.now()) return true;
  // Cooldown expired — reset
  delete _circuitBreaker[key];
  return false;
}

/**
 * Get circuit breaker status for all providers (for diagnostics).
 */
export function getCircuitBreakerStatus(): Record<string, CircuitBreakerStatusEntry> {
  const result: Record<string, CircuitBreakerStatusEntry> = {};
  for (const [provider, state] of Object.entries(_circuitBreaker)) {
    result[provider] = {
      failures: state.failures,
      blocked: state.blockedUntil > Date.now(),
      blockedUntil:
        state.blockedUntil > Date.now() ? new Date(state.blockedUntil).toISOString() : null,
      remainingMs: Math.max(0, state.blockedUntil - Date.now()),
    };
  }
  return result;
}

/**
 * Record a successful refresh — resets circuit breaker for provider.
 */
function recordSuccess(key: string) {
  if (_circuitBreaker[key]) {
    delete _circuitBreaker[key];
  }
}

/**
 * Record a failed refresh — increments circuit breaker counter.
 */
function recordFailure(
  key: string,
  threshold: number,
  cooldownMs: number,
  log: RefreshLoggerLike | null = null
) {
  if (
    Object.keys(_circuitBreaker).length >= CIRCUIT_BREAKER_REGISTRY_CAP &&
    !_circuitBreaker[key]
  ) {
    if (!makeBreakerRoom(Date.now())) {
      log?.warn?.(
        "TOKEN_REFRESH",
        `Circuit breaker registry full (${CIRCUIT_BREAKER_REGISTRY_CAP} blocked entries), skipping record for ${key}`
      );
      return;
    }
  }
  if (!_circuitBreaker[key]) {
    _circuitBreaker[key] = { failures: 0, blockedUntil: 0 };
  }
  _circuitBreaker[key].failures++;

  if (_circuitBreaker[key].failures >= threshold) {
    _circuitBreaker[key].blockedUntil = Date.now() + cooldownMs;
    log?.error?.(
      "TOKEN_REFRESH",
      `🔴 Circuit breaker tripped for ${key}: ${threshold} consecutive failures. ` +
        `Blocked for ${cooldownMs / 60000}min. Provider needs re-authentication.`
    );
  }
}

/**
 * Execute a function with a timeout.
 */
async function withTimeout<T>(fn: () => Promise<T>, timeoutMs: number): Promise<T | null> {
  return await new Promise<T | null>((resolve, reject) => {
    const timer = setTimeout(() => resolve(null), timeoutMs);
    if (typeof timer === "object" && "unref" in timer) {
      (timer as { unref?: () => void }).unref?.();
    }

    fn().then(
      (result) => {
        clearTimeout(timer);
        resolve(result);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

/**
 * Refresh token with retry and exponential backoff
 * Retries on failure with increasing delay: 1s, 2s, 3s...
 *
 * Includes:
 * - Per-provider circuit breaker (5 consecutive failures → 30min pause)
 * - 30s timeout per refresh attempt to prevent hanging connections
 *
 * @param {function} refreshFn - Async function that returns token or null
 * @param {number} maxRetries - Max retry attempts (default 3)
 * @param {object} log - Logger instance (optional)
 * @param {string} provider - Provider ID for circuit breaker tracking (optional)
 * @returns {Promise<object|null>} Token result or null if all retries fail
 */
export async function refreshWithRetry(
  refreshFn,
  maxRetries = 3,
  log: RefreshLogger = null,
  provider = "unknown",
  options?: TokenRefreshBreakerOptions
) {
  const effective = resolveBreakerOptions(options);
  const key = breakerKey(provider, options?.connectionId, effective.scope);
  // Circuit breaker check
  if (isProviderBlocked(provider, options)) {
    log?.warn?.("TOKEN_REFRESH", `⚡ Circuit breaker active for ${key}, skipping refresh`);
    return null;
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (attempt > 0) {
      const delay = attempt * 1000;
      log?.debug?.("TOKEN_REFRESH", `Retry ${attempt}/${maxRetries} after ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }

    try {
      const result = await withTimeout(refreshFn, REFRESH_TIMEOUT_MS);
      if (isUnrecoverableRefreshError(result)) {
        if (result === NO_REFRESH_NEEDED) return null;
        log?.warn?.(
          "TOKEN_REFRESH",
          `Unrecoverable refresh error for ${key}: ${result.error} — skipping retries`
        );
        return result;
      }
      if (result) {
        recordSuccess(key);
        return result;
      }
    } catch (error) {
      log?.warn?.("TOKEN_REFRESH", `Attempt ${attempt + 1}/${maxRetries} failed: ${error.message}`);
    }
  }

  // All retries exhausted — record failure for circuit breaker
  recordFailure(key, effective.failureThreshold, effective.cooldownMs, log);
  log?.error?.("TOKEN_REFRESH", `All ${maxRetries} retry attempts failed for ${key}`);
  return null;
}
