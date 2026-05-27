/**
 * Circuit Breaker — FASE-04 Observability & Resilience (v2.0)
 *
 * Implements the circuit breaker pattern with:
 * - States: CLOSED → DEGRADED → OPEN → HALF_OPEN → CLOSED
 * - Adaptive backoff: resetTimeout escalates on repeated open→probe→open cycles
 * - Failure-kind-aware thresholds: different limits per failure type
 * - Progressive degradation: high failure rate triggers warning before full open
 * - Transition history tracking for diagnostics
 * - DB persistence via domainState.js
 *
 * States:
 *   CLOSED    — Normal operation, requests pass through
 *   DEGRADED  — Failure rate elevated, requests pass through but warnings logged
 *   OPEN      — Requests are short-circuited
 *   HALF_OPEN — Probing: limited requests allowed to test recovery
 */

import {
  saveCircuitBreakerState,
  loadCircuitBreakerState,
  loadAllCircuitBreakerStates,
  deleteCircuitBreakerState,
  deleteAllCircuitBreakerStates,
} from "../../lib/db/domainState";
import type { FailureKind } from "./classify429";

export const STATE = {
  CLOSED: "CLOSED",
  DEGRADED: "DEGRADED",
  OPEN: "OPEN",
  HALF_OPEN: "HALF_OPEN",
} as const;

type CircuitState = (typeof STATE)[keyof typeof STATE];

/** Per-failure-kind threshold overrides */
interface FailureKindThresholds {
  /** Max failures of this kind before escalating to next state */
  threshold: number;
  /** Cooldown override for this failure kind */
  cooldown?: number;
  /** Whether this failure kind should trigger immediate OPEN (skip DEGRADED) */
  immediateOpen?: boolean;
}

interface CircuitBreakerOptions {
  failureThreshold?: number;
  resetTimeout?: number;
  halfOpenRequests?: number;
  onStateChange?: ((name: string, oldState: string, newState: string) => void) | null;
  isFailure?: (error: unknown) => boolean;
  cooldownByKind?: Partial<Record<FailureKind, number>>;
  classifyError?: (error: unknown) => FailureKind | undefined;
  /**
   * Per-failure-kind thresholds.
   * When set, different failure types have different limits.
   */
  kindThresholds?: Partial<Record<FailureKind, Partial<FailureKindThresholds>>>;
  /**
   * Degradation threshold — failure count at which state becomes DEGRADED.
   * Default: 60% of failureThreshold.
   */
  degradationThreshold?: number;
  /**
   * Max backoff multiplier (exponential). Default: 16x resetTimeout.
   */
  maxBackoffMultiplier?: number;
  /**
   * How many open→half_open→open cycles before escalating backoff.
   * Default: 3.
   */
  backoffEscalationCount?: number;
}

interface TransitionRecord {
  from: string;
  to: string;
  timestamp: number;
  failureCount: number;
  reason?: string;
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
  kindThresholds: Partial<Record<FailureKind, Partial<FailureKindThresholds>>>;
  degradationThreshold: number;
  maxBackoffMultiplier: number;
  backoffEscalationCount: number;

  /** Track failure counts per kind separately */
  kindFailureCounts: Record<string, number>;
  /** How many times has the breaker gone from OPEN → HALF_OPEN → OPEN */
  openCycleCount: number;
  /** State transition history */
  transitionHistory: TransitionRecord[];
  /** Max transition history entries */
  maxTransitionHistory: number;

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
    this.kindThresholds = options.kindThresholds ?? {};
    this.degradationThreshold =
      options.degradationThreshold ?? Math.ceil((this.failureThreshold * 60) / 100);
    this.maxBackoffMultiplier = options.maxBackoffMultiplier ?? 16;
    this.backoffEscalationCount = options.backoffEscalationCount ?? 3;

    this.kindFailureCounts = {};
    this.openCycleCount = 0;
    this.transitionHistory = [];
    this.maxTransitionHistory = 20;

    this._restoreFromDb();
  }

  _restoreFromDb() {
    try {
      const saved = loadCircuitBreakerState(this.name);
      if (saved) {
        if (
          saved.state === STATE.CLOSED ||
          saved.state === STATE.DEGRADED ||
          saved.state === STATE.OPEN ||
          saved.state === STATE.HALF_OPEN
        ) {
          this.state = saved.state;
        }
        this.failureCount = saved.failureCount;
        this.lastFailureTime = saved.lastFailureTime;
        const savedKind = saved.options?.lastFailureKind;
        if (
          savedKind === "rate_limit" ||
          savedKind === "quota_exhausted" ||
          savedKind === "transient"
        ) {
          this.lastFailureKind = savedKind;
        }
        this.openCycleCount = (saved.options?.openCycleCount as number) ?? 0;
        this.kindFailureCounts = (saved.options?.kindFailureCounts as Record<string, number>) ?? {};

        if (this.state === STATE.HALF_OPEN) {
          this.halfOpenAllowed = this.halfOpenRequests;
        }
      }
    } catch {
      // DB may not be ready yet (build phase)
    }
  }

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
          lastFailureKind: this.lastFailureKind,
          openCycleCount: this.openCycleCount,
          kindFailureCounts: this.kindFailureCounts,
        },
      });
    } catch {
      // Non-critical
    }
  }

  /**
   * Get the effective reset timeout, escalated by open cycle count.
   * Each open→half_open→open cycle multiplies the timeout.
   */
  _effectiveResetTimeout(): number {
    if (this.openCycleCount <= this.backoffEscalationCount) {
      return this.resetTimeout;
    }
    const escalationFactor = Math.pow(2, this.openCycleCount - this.backoffEscalationCount);
    return Math.min(
      this.resetTimeout * escalationFactor,
      this.resetTimeout * this.maxBackoffMultiplier
    );
  }

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
            kind = undefined;
          }
        }
        this._onFailure(kind);
      }
      throw error;
    }
  }

  canExecute() {
    this._refreshOpenState();
    if (this.state === STATE.CLOSED || this.state === STATE.DEGRADED) return true;
    if (this.state === STATE.OPEN) return false;
    if (this.state === STATE.HALF_OPEN) return this.halfOpenAllowed > 0;
    return false;
  }

  getStatus() {
    this._refreshOpenState();
    return {
      name: this.name,
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime,
      retryAfterMs: this.getRetryAfterMs(),
      lastFailureKind: this.lastFailureKind,
      openCycleCount: this.openCycleCount,
      kindFailureCounts: { ...this.kindFailureCounts },
      degradationThreshold: this.degradationThreshold,
      effectiveResetTimeout: this._effectiveResetTimeout(),
    };
  }

  getRetryAfterMs() {
    this._refreshOpenState();
    if (this.state === STATE.CLOSED || this.state === STATE.DEGRADED) return 0;
    return this._timeUntilReset();
  }

  reset() {
    this._transition(STATE.CLOSED, "manual-reset");
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = null;
    this.lastFailureKind = null;
    this.openCycleCount = 0;
    this.kindFailureCounts = {};
    this._persistToDb();
  }

  // ─── Internal ─────────────────────────────────

  _onSuccess() {
    if (this.state === STATE.OPEN) {
      this._transition(STATE.CLOSED, "success-recovery");
      this.failureCount = 0;
      this.successCount = 0;
      this.lastFailureTime = null;
      this.lastFailureKind = null;
      this.openCycleCount = 0;
      this.kindFailureCounts = {};
    } else if (this.state === STATE.HALF_OPEN) {
      this.successCount++;
      this._transition(STATE.CLOSED, "probe-success");
      this.failureCount = 0;
      this.lastFailureKind = null;
      this.openCycleCount = 0;
      this.kindFailureCounts = {};
    } else {
      // CLOSED or DEGRADED: reset counts
      this.failureCount = Math.max(0, this.failureCount - 1); // gradual recovery
      if (this.state === STATE.DEGRADED && this.failureCount <= this.degradationThreshold) {
        this._transition(STATE.CLOSED, "recovery");
      }
    }
    this._persistToDb();
  }

  _onFailure(kind?: FailureKind | null) {
    const failureKind = kind ?? null;
    this.failureCount++;
    this.lastFailureTime = Date.now();
    this.lastFailureKind = failureKind;

    // Track per-kind failure counts
    if (failureKind) {
      this.kindFailureCounts[failureKind] = (this.kindFailureCounts[failureKind] || 0) + 1;
    }

    // Check kind-specific thresholds
    if (failureKind) {
      const kindConfig = this.kindThresholds[failureKind];
      if (kindConfig) {
        const kindCount = this.kindFailureCounts[failureKind] || 0;

        // Immediate open for critical failure kinds
        if (kindConfig.immediateOpen && kindCount >= (kindConfig.threshold || 1)) {
          this._openCircuit(failureKind);
          return;
        }

        // Kind-specific threshold reached
        if (kindCount >= (kindConfig.threshold || this.failureThreshold)) {
          this._openCircuit(failureKind);
          return;
        }
      }
    }

    // State transitions based on total failure count
    if (this.state === STATE.OPEN) {
      // Already OPEN — just update persistence
    } else if (this.state === STATE.HALF_OPEN) {
      // Probe failed: OPEN with cycle count escalation
      this.openCycleCount++;
      this._transition(STATE.OPEN, `probe-failed (cycle ${this.openCycleCount})`);
    } else if (this.state === STATE.DEGRADED) {
      // Degraded → Open when threshold reached
      if (this.failureCount >= this.failureThreshold) {
        this._openCircuit(failureKind);
      }
    } else {
      // CLOSED → DEGRADED or OPEN
      if (this.failureCount >= this.failureThreshold) {
        this._openCircuit(failureKind);
      } else if (this.failureCount >= this.degradationThreshold) {
        this._transition(
          STATE.DEGRADED,
          `elevated-failures (${this.failureCount}/${this.failureThreshold})`
        );
      }
    }
    this._persistToDb();
  }

  _openCircuit(kind: FailureKind | null) {
    this._transition(STATE.OPEN, kind ? `kind:${kind}` : undefined);
  }

  _shouldAttemptReset() {
    if (!this.lastFailureTime) return true;
    const cooldown = this._effectiveCooldown();
    return Date.now() - this.lastFailureTime >= cooldown;
  }

  _effectiveCooldown() {
    const baseTimeout = this._effectiveResetTimeout();
    if (this.lastFailureKind !== null) {
      const override = this.cooldownByKind[this.lastFailureKind];
      if (typeof override === "number" && Number.isFinite(override) && override >= 0) {
        return override;
      }
    }
    return baseTimeout;
  }

  _timeUntilReset() {
    if (!this.lastFailureTime) return 0;
    const cooldown = this._effectiveCooldown();
    return Math.max(0, cooldown - (Date.now() - this.lastFailureTime));
  }

  _refreshOpenState() {
    if (this.state === STATE.OPEN && this._shouldAttemptReset()) {
      this._transition(STATE.HALF_OPEN, "timeout-elapsed");
      this._persistToDb();
    }
  }

  _transition(newState: CircuitState, reason?: string) {
    const oldState = this.state;
    this.state = newState;

    if (newState === STATE.HALF_OPEN) {
      this.halfOpenAllowed = this.halfOpenRequests;
    }

    // Record transition
    this.transitionHistory.push({
      from: oldState,
      to: newState,
      timestamp: Date.now(),
      failureCount: this.failureCount,
      reason,
    });
    if (this.transitionHistory.length > this.maxTransitionHistory) {
      this.transitionHistory.shift();
    }

    if (this.onStateChange && oldState !== newState) {
      this.onStateChange(this.name, oldState, newState);
    }
  }
}

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

// ─── Registry ─────────────────────────────────────

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
      breaker.cooldownByKind = {
        ...breaker.cooldownByKind,
        ...options.cooldownByKind,
      };
    }
    if (typeof options.classifyError === "function") {
      breaker.classifyError = options.classifyError;
    }
    if (options.kindThresholds) {
      breaker.kindThresholds = {
        ...breaker.kindThresholds,
        ...options.kindThresholds,
      };
    }
    if (typeof options.degradationThreshold === "number") {
      breaker.degradationThreshold = options.degradationThreshold;
    }
    if (typeof options.maxBackoffMultiplier === "number") {
      breaker.maxBackoffMultiplier = options.maxBackoffMultiplier;
    }
    if (typeof options.backoffEscalationCount === "number") {
      breaker.backoffEscalationCount = options.backoffEscalationCount;
    }
    breaker._persistToDb();
  }
  return breaker;
}

export function getAllCircuitBreakerStatuses() {
  try {
    const persisted = loadAllCircuitBreakerStates();
    for (const cb of persisted) {
      if (!registry.has(cb.name)) {
        getCircuitBreaker(cb.name);
      }
    }
  } catch {
    // Use registry only
  }
  return Array.from(registry.values()).map((cb) => cb.getStatus());
}

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
