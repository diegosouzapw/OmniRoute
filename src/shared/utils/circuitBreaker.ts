// @ts-check
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
        this.state = saved.state;
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
  async execute(fn) {
    if (this.state === STATE.OPEN) {
      if (this._shouldAttemptReset()) {
        this._transition(STATE.HALF_OPEN);
      } else {
        throw new CircuitBreakerOpenError(
          `Circuit breaker "${this.name}" is OPEN. Try again later.`,
          this.name,
          this._timeUntilReset()
        );
      }
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
        this._onFailure();
      }
      throw error;
    }
  }

  /**
   * Check if a request can proceed (without executing).
   * @returns {boolean}
   */
  canExecute() {
    if (this.state === STATE.CLOSED) return true;
    if (this.state === STATE.OPEN) return this._shouldAttemptReset();
    if (this.state === STATE.HALF_OPEN) return this.halfOpenAllowed > 0;
    return false;
  }

  /**
   * Get the current state for monitoring.
   * @returns {{ name: string, state: string, failureCount: number, lastFailureTime: number|null }}
   */
  getStatus() {
    return {
      name: this.name,
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime,
    };
  }

  /**
   * Force reset the circuit breaker to CLOSED state.
   */
  reset() {
    this._transition(STATE.CLOSED);
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = null;
    this._persistToDb();
  }

  // ─── Internal Methods ────────────────────────

  _onSuccess() {
    if (this.state === STATE.HALF_OPEN) {
      this.successCount++;
      this._transition(STATE.CLOSED);
      this.failureCount = 0;
    }
    // In CLOSED state, just reset failure count
    this.failureCount = 0;
    this._persistToDb();
  }

  _onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.state === STATE.HALF_OPEN) {
      this._transition(STATE.OPEN);
    } else if (this.failureCount >= this.failureThreshold) {
      this._transition(STATE.OPEN);
    }
    this._persistToDb();
  }

  _shouldAttemptReset() {
    if (!this.lastFailureTime) return true;
    return Date.now() - this.lastFailureTime >= this.resetTimeout;
  }

  _timeUntilReset() {
    if (!this.lastFailureTime) return 0;
    return Math.max(0, this.resetTimeout - (Date.now() - this.lastFailureTime));
  }

  _transition(newState) {
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
  return registry.get(name)!;
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
