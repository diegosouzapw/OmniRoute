/**
 * Circuit Breaker — FASE-04 Observability & Resilience
 *
 * Implements the circuit breaker pattern for external API calls.
 * Prevents cascading failures by short-circuiting requests to
 * providers that are consistently failing.
 *
 * States: CLOSED → OPEN → HALF_OPEN → CLOSED
 *
 * State is persisted in SQLite via domainState.js for restart durability.
 *
 * @module shared/utils/circuitBreaker
 */

import {
  saveCircuitBreakerState,
  loadCircuitBreakerState,
  loadAllCircuitBreakerStates,
  deleteCircuitBreakerState,
  deleteAllCircuitBreakerStates,
} from "../../lib/db/domainState";
import type { FailureKind } from "./classify429";

const STATE = {
  CLOSED: "CLOSED",
  OPEN: "OPEN",
  HALF_OPEN: "HALF_OPEN",
} as const;

type CircuitState = (typeof STATE)[keyof typeof STATE];

interface CircuitBreakerOptions {
  failureThreshold?: number;
  resetTimeout?: number;
  halfOpenRequests?: number;
  onStateChange?: ((name: string, oldState: string, newState: string) => void) | null;
  isFailure?: (error: unknown) => boolean;
  /**
   * Per-failure-kind cooldown override (Issue #2100).
   *
   * When set, `_timeUntilReset()` and `_shouldAttemptReset()` use
   * `cooldownByKind[lastFailureKind]` instead of `resetTimeout` whenever
   * the last failure had a known kind. Use this to give a longer cooldown
   * to `quota_exhausted` (period-end may be hours away) than to
   * `rate_limit` (typically 60s).
   */
  cooldownByKind?: Partial<Record<FailureKind, number>>;
  /**
   * Optional classifier called on `execute()` errors (Issue #2100).
   * Returns the kind to record. When omitted, all failures are recorded
   * as `lastFailureKind = null` (existing behavior preserved).
   *
   * Pair with `classify429()` from `./classify429.ts` for HTTP responses,
   * or supply a custom classifier for non-HTTP errors.
   */
  classifyError?: (error: unknown) => FailureKind | undefined;
}

export class CircuitBreaker {
  name: string;
  failureThreshold: number;
  resetTimeout: number;
  halfOpenRequests: number;
  onStateChange: ((name: string, oldState: string, newState: string) => void) | null;
  isFailure: (error: unknown) => boolean;
  state: CircuitState;
  failureCount: number;
  successCount: number;
  lastFailureTime: number | null;
  halfOpenAllowed: number;
  cooldownByKind: Partial<Record<FailureKind, number>>;
  classifyError: ((error: unknown) => FailureKind | undefined) | null;
  lastFailureKind: FailureKind | null;

  constructor(name: string, options: CircuitBreakerOptions = {}) {
    this.name = name;
    this.failureThreshold = options.failureThreshold ?? 5;
    this.resetTimeout = options.resetTimeout ?? 30000;
    this.halfOpenRequests = options.halfOpenRequests ?? 1;
    this.onStateChange = options.onStateChange || null;
    this.isFailure = options.isFailure || (() => true);

    this.state = STATE.CLOSED;
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = null;
    this.halfOpenAllowed = 0;
    this.cooldownByKind = options.cooldownByKind ?? {};
    this.classifyError = options.classifyError ?? null;
    this.lastFailureKind = null;

    // Try to restore state from DB
    this._restoreFromDb();
  }

  /**
   * Restore state from SQLite if available.
   * @private
   */
  _restoreFromDb() {
    try {
      const saved = loadCircuitBreakerState(this.name);
      if (saved) {
        if (
          saved.state === STATE.CLOSED ||
          saved.state === STATE.OPEN ||
          saved.state === STATE.HALF_OPEN
        ) {
          this.state = saved.state;
        }
        this.failureCount = saved.failureCount;
        this.lastFailureTime = saved.lastFailureTime;
        if (this.state === STATE.HALF_OPEN) {
          this.halfOpenAllowed = this.halfOpenRequests;
        }
      }
    } catch {
      // DB may not be ready yet (build phase)
    }
  }

  /**
   * Persist current state to SQLite.
   * @private
   */
  _persistToDb() {
    try {
      saveCircuitBreakerState(this.name, {
        state: this.state,
        failureCount: this.failureCount,
        lastFailureTime: this.lastFailureTime,
        options: {
          failureThreshold: this.failureThreshold,
          resetTimeout: this.resetTimeout,
          halfOpenRequests: this.halfOpenRequests,
        },
      });
    } catch {
      // Non-critical: in-memory still works
    }
  }

  /**
   * Execute a function through the circuit breaker.
   *
   * @template T
   * @param {() => Promise<T>} fn - Function to execute
   * @returns {Promise<T>}
   * @throws {Error} If circuit is OPEN
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    this._refreshOpenState();

    if (this.state === STATE.OPEN) {
      throw new CircuitBreakerOpenError(
        `Circuit breaker "${this.name}" is OPEN. Try again later.`,
        this.name,
        this._timeUntilReset()
      );
    }

    if (this.state === STATE.HALF_OPEN && this.halfOpenAllowed <= 0) {
      throw new CircuitBreakerOpenError(
        `Circuit breaker "${this.name}" is HALF_OPEN, no more probe requests allowed.`,
        this.name,
        this._timeUntilReset()
      );
    }

    if (this.state === STATE.HALF_OPEN) {
      this.halfOpenAllowed--;
    }

    try {
      const result = await fn();
      this._onSuccess();
      return result;
    } catch (error) {
      if (this.isFailure(error)) {
        let kind: FailureKind | undefined;
        if (this.classifyError) {
          try {
            kind = this.classifyError(error);
          } catch {
            // A user-supplied classifier must not mask the original error
            // or change failure-counting semantics; fall back to no kind.
            kind = undefined;
          }
        }
        this._onFailure(kind);
      }
      throw error;
    }
  }

  /**
   * Check if a request can proceed (without executing).
   * @returns {boolean}
   */
  canExecute() {
    this._refreshOpenState();

    if (this.state === STATE.CLOSED) return true;
    if (this.state === STATE.OPEN) return false;
    if (this.state === STATE.HALF_OPEN) return this.halfOpenAllowed > 0;
    return false;
  }

  /**
   * Get the current state for monitoring.
   * @returns {{ name: string, state: string, failureCount: number, lastFailureTime: number|null }}
   */
  getStatus() {
    this._refreshOpenState();

    return {
      name: this.name,
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime,
      retryAfterMs: this.getRetryAfterMs(),
    };
  }

  /**
   * Get remaining wait time before the breaker allows execution again.
   * @returns {number}
   */
  getRetryAfterMs() {
    this._refreshOpenState();

    if (this.state === STATE.CLOSED) return 0;
    return this._timeUntilReset();
  }

  /**
   * Force reset the circuit breaker to CLOSED state.
   */
  reset() {
    this._transition(STATE.CLOSED);
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = null;
    this.lastFailureKind = null;
    this._persistToDb();
  }

  // ─── Internal Methods ────────────────────────

  _onSuccess() {
    if (this.state === STATE.OPEN) {
      // Direct call from combo path: timeout elapsed and request succeeded
      // without going through execute(), so transition OPEN → CLOSED directly
      this._transition(STATE.CLOSED);
      this.failureCount = 0;
      this.successCount = 0;
      this.lastFailureTime = null;
      this.lastFailureKind = null;
    } else if (this.state === STATE.HALF_OPEN) {
      this.successCount++;
      this._transition(STATE.CLOSED);
      this.failureCount = 0;
      this.lastFailureKind = null;
    } else {
      // In CLOSED state, just reset failure count
      this.failureCount = 0;
    }
    this._persistToDb();
  }

  _onFailure(kind?: FailureKind | null) {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    this.lastFailureKind = kind ?? null;

    if (this.state === STATE.OPEN) {
      // Already OPEN — just update persistence (re-tripped by combo path)
    } else if (this.state === STATE.HALF_OPEN) {
      this._transition(STATE.OPEN);
    } else if (this.failureCount >= this.failureThreshold) {
      this._transition(STATE.OPEN);
    }
    this._persistToDb();
  }

  _shouldAttemptReset() {
    if (!this.lastFailureTime) return true;
    const cooldown = this._effectiveCooldown();
    return Date.now() - this.lastFailureTime >= cooldown;
  }

  /**
   * Resolve the cooldown for the current `lastFailureKind`. Falls back to
   * `resetTimeout` when no kind was recorded, no override exists for it,
   * or the override is not a finite non-negative number (NaN / Infinity /
   * negative all silently fall through to `resetTimeout`).
   * @private
   */
  _effectiveCooldown() {
    if (this.lastFailureKind !== null) {
      const override = this.cooldownByKind[this.lastFailureKind];
      if (typeof override === "number" && Number.isFinite(override) && override >= 0) {
        return override;
      }
    }
    return this.resetTimeout;
  }

  _timeUntilReset() {
    if (!this.lastFailureTime) return 0;
    const cooldown = this._effectiveCooldown();
    return Math.max(0, cooldown - (Date.now() - this.lastFailureTime));
  }

  _refreshOpenState() {
    if (this.state === STATE.OPEN && this._shouldAttemptReset()) {
      this._transition(STATE.HALF_OPEN);
      this._persistToDb();
    }
  }

  _transition(newState: CircuitState) {
    const oldState = this.state;
    this.state = newState;
    if (newState === STATE.HALF_OPEN) {
      this.halfOpenAllowed = this.halfOpenRequests;
    }
    if (this.onStateChange && oldState !== newState) {
      this.onStateChange(this.name, oldState, newState);
    }
  }
}

/**
 * Error thrown when circuit breaker is open.
 */
export class CircuitBreakerOpenError extends Error {
  circuitName: string;
  retryAfterMs: number;

  constructor(message: string, circuitName: string, retryAfterMs: number) {
    super(message);
    this.name = "CircuitBreakerOpenError";
    this.circuitName = circuitName;
    this.retryAfterMs = retryAfterMs;
  }
}

// ─── Circuit Breaker Registry ────────────────────

const registry = new Map<string, CircuitBreaker>();

export function getCircuitBreaker(name: string, options?: CircuitBreakerOptions): CircuitBreaker {
  if (!registry.has(name)) {
    registry.set(name, new CircuitBreaker(name, options));
  }
  const breaker = registry.get(name)!;
  if (options) {
    if (typeof options.failureThreshold === "number") {
      breaker.failureThreshold = options.failureThreshold;
    }
    if (typeof options.resetTimeout === "number") {
      breaker.resetTimeout = options.resetTimeout;
    }
    if (typeof options.halfOpenRequests === "number") {
      breaker.halfOpenRequests = options.halfOpenRequests;
      if (breaker.state === STATE.HALF_OPEN) {
        breaker.halfOpenAllowed = Math.min(breaker.halfOpenAllowed, breaker.halfOpenRequests);
      }
    }
    if (typeof options.onStateChange === "function") {
      breaker.onStateChange = options.onStateChange;
    }
    if (typeof options.isFailure === "function") {
      breaker.isFailure = options.isFailure;
    }
    if (options.cooldownByKind) {
      // Merge keys, don't replace: callers that add different kinds
      // (e.g. one sets `quota_exhausted`, another `rate_limit`) should
      // not silently lose each other's overrides.
      breaker.cooldownByKind = {
        ...breaker.cooldownByKind,
        ...options.cooldownByKind,
      };
    }
    if (typeof options.classifyError === "function") {
      breaker.classifyError = options.classifyError;
    }
    breaker._persistToDb();
  }
  return breaker;
}

/**
 * Get all circuit breaker statuses (for monitoring dashboard).
 * @returns {Array<{ name: string, state: string, failureCount: number }>}
 */
export function getAllCircuitBreakerStatuses() {
  // Merge registry with any persisted states not yet loaded
  try {
    const persisted = loadAllCircuitBreakerStates();
    for (const cb of persisted) {
      if (!registry.has(cb.name)) {
        // Load the breaker (will restore from DB in constructor)
        getCircuitBreaker(cb.name);
      }
    }
  } catch {
    // Use registry only
  }
  return Array.from(registry.values()).map((cb) => cb.getStatus());
}

/**
 * Reset all circuit breakers (for admin/testing).
 */
export function resetAllCircuitBreakers() {
  for (const cb of registry.values()) {
    cb.reset();
  }
  registry.clear();
  try {
    deleteAllCircuitBreakerStates();
  } catch {
    // Non-critical
  }
}

export { STATE };
