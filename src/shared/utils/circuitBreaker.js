/**
 * Circuit Breaker — FASE-04 Observability & Resilience
 *
 * Implements the circuit breaker pattern for external API calls.
 * Prevents cascading failures by short-circuiting requests to
 * providers that are consistently failing.
 *
 * States: CLOSED → OPEN → HALF_OPEN → CLOSED
 *
 * @module shared/utils/circuitBreaker
 */

const STATE = {
  CLOSED: "CLOSED",
  OPEN: "OPEN",
  HALF_OPEN: "HALF_OPEN",
};

/**
 * @typedef {Object} CircuitBreakerOptions
 * @property {number} [failureThreshold=5] - Failures before opening
 * @property {number} [resetTimeout=30000] - Time (ms) before trying half-open
 * @property {number} [halfOpenRequests=1] - Requests allowed in half-open state
 * @property {Function} [onStateChange] - Callback when state changes
 * @property {Function} [isFailure] - Custom failure detection (default: thrown errors)
 */

export class CircuitBreaker {
  /**
   * @param {string} name - Circuit breaker name (e.g. provider ID)
   * @param {CircuitBreakerOptions} options
   */
  constructor(name, options = {}) {
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
  }

  _onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.state === STATE.HALF_OPEN) {
      this._transition(STATE.OPEN);
    } else if (this.failureCount >= this.failureThreshold) {
      this._transition(STATE.OPEN);
    }
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
  /**
   * @param {string} message
   * @param {string} circuitName
   * @param {number} retryAfterMs
   */
  constructor(message, circuitName, retryAfterMs) {
    super(message);
    this.name = "CircuitBreakerOpenError";
    this.circuitName = circuitName;
    this.retryAfterMs = retryAfterMs;
  }
}

// ─── Circuit Breaker Registry ────────────────────

const registry = new Map();

/**
 * Get or create a circuit breaker by name.
 *
 * @param {string} name - Circuit breaker identifier (e.g. provider ID)
 * @param {CircuitBreakerOptions} [options] - Options (only used on creation)
 * @returns {CircuitBreaker}
 */
export function getCircuitBreaker(name, options) {
  if (!registry.has(name)) {
    registry.set(name, new CircuitBreaker(name, options));
  }
  return registry.get(name);
}

/**
 * Get all circuit breaker statuses (for monitoring dashboard).
 * @returns {Array<{ name: string, state: string, failureCount: number }>}
 */
export function getAllCircuitBreakerStatuses() {
  return Array.from(registry.values()).map((cb) => cb.getStatus());
}

export { STATE };
