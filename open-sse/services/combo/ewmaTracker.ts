/**
 * EWMA Tracker — Exponentially Weighted Moving Average tracker for
 * P2C (Power of Two Choices) routing strategy enhancement.
 *
 * Provides EWMA-smoothed latency tracking, peak detection, variance tracking,
 * and time-decay correction per tracked key (e.g., per combo target).
 *
 * @module open-sse/services/combo/ewmaTracker
 */

import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";
import { getComboMetrics } from "../comboMetrics.ts";
import type { ResolvedComboTarget } from "./types.ts";

// ────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────

/** Configuration for EWMA computation. */
export interface EwmaConfig {
  /**
   * Smoothing factor (0 < alpha ≤ 1).
   * Higher values weight the latest observation more heavily.
   * @default 0.3
   */
  alpha: number;

  /**
   * Peak decay factor (0 < beta ≤ 1).
   * Controls how quickly the peak decays when not reinforced.
   * @default 0.5
   */
  beta: number;

  /**
   * Time-weight decay half-life in milliseconds.
   * Must be > 0. Older observations are exponentially downweighted beyond this window.
   * @default 30_000 (30 seconds)
   */
  halfLife: number;
}

/** Runtime state for a single tracked key. */
export interface EwmaState {
  /** E[T] — Exponentially weighted moving average value. */
  value: number;

  /** P[T] — Peak EWMA (decays via beta * time-decay, never below value). */
  peak: number;

  /** V[T] — Exponentially weighted variance. */
  variance: number;

  /** Timestamp (ms epoch) of the most recent update. */
  lastUpdate: number;

  /** Total number of observations received. */
  count: number;

  /** Minimum observed value. */
  min: number;

  /** Maximum observed value. */
  max: number;
}

/** System load report for factoring into P2C scoring. */
export interface NodeHealthReport {
  nodeId: string;

  /** Composite health score in [0.0, 1.0] where 1.0 = healthy. */
  compositeScore: number;

  /** Individual component scores (each in [0.0, 1.0]). */
  components: {
    cpu: number;
    memory: number;
    io: number;
    network: number;
    gpu: number;
    requests: number;
  };

  /** Timestamp of the health assessment. */
  timestamp: number;
}

/**
 * Validate EWMA config fields and return sanitized defaults for invalid ones.
 */
function validateConfig(config: EwmaConfig): EwmaConfig {
  if (config.halfLife <= 0) {
    throw new RangeError(
      `Invalid halfLife: ${config.halfLife}. Must be > 0.`
    );
  }
  if (config.alpha <= 0 || config.alpha > 1) {
    throw new RangeError(
      `Invalid alpha: ${config.alpha}. Must be 0 < alpha ≤ 1.`
    );
  }
  if (config.beta <= 0 || config.beta > 1) {
    throw new RangeError(
      `Invalid beta: ${config.beta}. Must be 0 < beta ≤ 1.`
    );
  }
  return config;
}

/** Public API returned by `createEwmaTracker()`. */
export interface EwmaTracker {
  /** Get existing state or create a new zero-initialized state. */
  getOrCreate(key: string): EwmaState;

  /**
   * Record a new observation and update EWMA state for the given key.
   * Creates the state if it does not exist yet.
   */
  update(key: string, observation: number, config?: Partial<EwmaConfig>): EwmaState;

  /** Get current state for a key without updating (returns undefined if absent). */
  get(key: string): EwmaState | undefined;

  /**
   * Return 1 / log10(value + 10) for P2C scoring.
   * Returns 0.25 when no data exists (matches the default latency score
   * used in the original getP2CTargetScore).
   */
  getScore(key: string): number;

  /** Reset (delete) state for a single key. */
  reset(key: string): void;

  /** Reset (delete) all tracked states. */
  resetAll(): void;

  /** Return a snapshot Map of all tracked key → state pairs. */
  getAll(): Map<string, EwmaState>;
}

// ────────────────────────────────────────────
//  Defaults
// ────────────────────────────────────────────

const DEFAULT_CONFIG: EwmaConfig = {
  alpha: 0.3,
  beta: 0.5,
  halfLife: 30_000,
};

// ────────────────────────────────────────────
//  Factory
// ────────────────────────────────────────────

/**
 * Create an EWMA tracker instance with private per-key state.
 *
 * @param config - Optional default configuration overrides for alpha, beta, halfLife.
 * @returns An EwmaTracker instance.
 */
export function createEwmaTracker(config?: Partial<EwmaConfig>): EwmaTracker {
  const effectiveConfig: EwmaConfig = validateConfig({ ...DEFAULT_CONFIG, ...config });
  const states = new Map<string, EwmaState>();

  function createInitialState(observation?: number): EwmaState {
    const now = Date.now();
    return {
      value: observation ?? 0,
      peak: observation ?? 0,
      variance: 0,
      lastUpdate: now,
      count: observation !== undefined ? 1 : 0,
      min: observation ?? Infinity,
      max: observation ?? -Infinity,
    };
  }

  return {
    getOrCreate(key: string): EwmaState {
      let state = states.get(key);
      if (!state) {
        state = createInitialState();
        states.set(key, state);
      }
      return state;
    },

    update(key: string, observation: number, updateConfig?: Partial<EwmaConfig>): EwmaState {
      if (!Number.isFinite(observation)) {
        throw new TypeError(
          `Invalid observation: ${observation}. Must be a finite number.`
        );
      }

      const mergedUpdateConfig: EwmaConfig = updateConfig
        ? validateConfig({ ...effectiveConfig, ...updateConfig })
        : effectiveConfig;
      const config = mergedUpdateConfig;
      let state = states.get(key);

      // First observation for this key — set values directly, no EWMA.
      if (!state) {
        state = createInitialState(observation);
        states.set(key, state);
        return state;
      }

      if (state.count === 0) {
        state.value = observation;
        state.peak = observation;
        state.variance = 0;
        state.lastUpdate = Date.now();
        state.count = 1;
        state.min = observation;
        state.max = observation;
        return state;
      }

      // ── Standard EWMA update with time-decay ──────────────────
      const now = Date.now();
      const elapsed = now - state.lastUpdate;
      const decay = Math.pow(0.5, elapsed / config.halfLife);

      const oldValue = state.value;
      const oldVariance = state.variance;
      const oldPeak = state.peak;

      // E[T]: weighted combination of new observation and time-decayed prior
      const newValue = config.alpha * observation + (1 - config.alpha) * oldValue * decay;

      // V[T]: EWMA variance (delta measured against the updated mean)
      const delta = observation - newValue;
      const newVariance = (1 - config.alpha) * (oldVariance + config.alpha * delta * delta);

      // P[T]: peak follows current value up, decays via beta * time-decay
      const newPeak = Math.max(newValue, oldPeak * decay * config.beta);

      state.value = newValue;
      state.peak = newPeak;
      state.variance = newVariance;
      state.lastUpdate = now;
      state.count++;
      state.min = Math.min(state.min, observation);
      state.max = Math.max(state.max, observation);

      return state;
    },

    get(key: string): EwmaState | undefined {
      return states.get(key);
    },

    getScore(key: string): number {
      const state = states.get(key);
      if (!state || state.count === 0) return 0.25;
      const value = state.value;
      if (value <= 0) return 0.25;
      if (!Number.isFinite(value)) return 0.25;
      return 1 / Math.log10(value + 10);
    },

    reset(key: string): void {
      states.delete(key);
    },

    resetAll(): void {
      states.clear();
    },

    getAll(): Map<string, EwmaState> {
      // Return a shallow clone of each state so mutations to the originals
      // do not affect the returned snapshot.
      const result = new Map<string, EwmaState>();
      for (const [key, state] of states) {
        result.set(key, { ...state });
      }
      return result;
    },
  };
}

// ────────────────────────────────────────────
//  EWMA-backed P2C Score Function
// ────────────────────────────────────────────

/** Parameters for the EWMA-backed P2C score function. */
/**
 * Factory that returns a `getP2CTargetScore`-compatible function which
 * uses EWMA latency (from the tracker) in place of raw `avgLatencyMs`
 * and optionally applies a node-health multiplier.
 *
 * @param ewmaTracker - An EwmaTracker instance with per-target latency data.
 * @returns A scoring function for P2C selection.
 */
export function createEwmaP2CScoreFn(ewmaTracker: EwmaTracker) {
  return function getEwmaP2CTargetScore(
    target: ResolvedComboTarget,
    metrics: ReturnType<typeof getComboMetrics>,
    nodeHealth?: NodeHealthReport | null
  ): number {
    // Circuit breaker: open = immediately disqualify
    const breakerState = getCircuitBreaker(target.provider)?.getStatus?.()?.state;
    if (breakerState === "OPEN") return -Infinity;

    const modelMetric = metrics?.byModel?.[target.modelStr] ?? null;
    const successRate = Number(modelMetric?.successRate);

    // ── Latency score: prefer EWMA tracker value over raw metrics ──
    const ewmaState = ewmaTracker.get(target.executionKey);
    const ewmaLatency = ewmaState?.value;
    const rawAvgLatency = Number(modelMetric?.avgLatencyMs);

    let effectiveLatency: number;
    if (ewmaLatency !== undefined && ewmaLatency > 0) {
      effectiveLatency = ewmaLatency;
    } else if (Number.isFinite(rawAvgLatency) && rawAvgLatency > 0) {
      effectiveLatency = rawAvgLatency;
    } else {
      effectiveLatency = 0;
    }

    const successScore = Number.isFinite(successRate) ? successRate / 100 : 0.5;
    const latencyScore = effectiveLatency > 0 ? 1 / Math.log10(effectiveLatency + 10) : 0.25;
    const breakerPenalty = breakerState === "HALF_OPEN" ? 0.25 : 0;

    let score = successScore + latencyScore - breakerPenalty;

    // Apply node health multiplier when provided
    if (nodeHealth && typeof nodeHealth.compositeScore === "number") {
      score *= Math.max(0.1, nodeHealth.compositeScore);
    }

    return score;
  };
}
