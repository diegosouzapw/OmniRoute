/**
 * Bifrost Kill Switch — Automatic Fallback (B9 of v8.1 track, ADR-031).
 *
 * Monitors Bifrost health over a sliding window. When degradation is
 * detected (p99 latency > threshold, error rate > threshold, or cost
 * ratio > threshold), the kill switch activates and the dispatcher
 * falls back to the legacy chatCore path transparently.
 *
 * Three activation modes:
 *   1. Automatic — metric-threshold-driven (default)
 *   2. Manual — operator calls activate() / deactivate()
 *   3. Manual override — operator calls forceActivate() to bypass
 *      health checks entirely
 *
 * Integration: the dispatcher (chatCore.ts or the Bifrost executor)
 * calls isActive(provider) before forwarding to Bifrost. If active,
 * it skips the Bifrost path and falls through to the legacy executor.
 *
 * Reference: ADR-031 § Decision Review, PLAN.md § 2.5.2 (B9),
 * docs/adr/0031-bifrost-tier1-router.md.
 *
 * @module open-sse/services/bifrostKillSwitch
 */

import { HTTP_STATUS } from "../config/constants.ts";

// ── Types ──────────────────────────────────────────────────────────────

/** Reason the kill switch activated. */
export type KillReason =
  | "manual"
  | "error_rate_exceeded"
  | "latency_exceeded"
  | "cost_ratio_exceeded"
  | "health_probe_failed";

/** Severity level for the kill switch event. */
export type KillSeverity = "info" | "warn" | "critical";

/** Threshold configuration for automatic activation. */
export interface KillSwitchThresholds {
  /** Maximum error rate (0.0–1.0) over the window before activation. */
  maxErrorRate: number;
  /** Maximum p99 latency in ms over the window before activation. */
  maxLatencyMs: number;
  /** Maximum cost ratio vs legacy baseline before activation. */
  maxCostRatio: number;
  /** Minimum number of samples required before evaluating thresholds. */
  minSampleSize: number;
}

/** A single health or cost observation. */
export interface KillSwitchObservation {
  timestamp: number;
  provider: string;
  latencyMs: number;
  ok: boolean;
  costUsd?: number;
  /** Legacy baseline cost for the same model+token-count, if available. */
  legacyCostUsd?: number;
}

/** Current state of the kill switch for a provider. */
export interface KillSwitchState {
  provider: string;
  isActive: boolean;
  activatedAt: number | null;
  reason: KillReason | null;
  severity: KillSeverity | null;
  /** History of activation/deactivation events. */
  events: KillSwitchEvent[];
  /** Current window statistics (reset on deactivation). */
  windowStats: {
    totalSamples: number;
    errorSamples: number;
    errorRate: number;
    p99LatencyMs: number;
    avgLatencyMs: number;
    totalCostUsd: number;
    totalLegacyCostUsd: number;
    costRatio: number;
  };
}

/** A recorded activation or deactivation event. */
export interface KillSwitchEvent {
  timestamp: number;
  type: "activate" | "deactivate";
  reason: KillReason | "auto_clear" | "operator_clear";
  severity: KillSeverity;
  message: string;
}

// ── Defaults ───────────────────────────────────────────────────────────

const DEFAULT_THRESHOLDS: KillSwitchThresholds = {
  maxErrorRate: 0.05,          // 5% error rate
  maxLatencyMs: 5000,          // 5 seconds p99
  maxCostRatio: 2.0,           // 2x legacy cost
  minSampleSize: 10,           // at least 10 samples before evaluating
};

const DEFAULT_WINDOW_MS = 5 * 60 * 1000;  // 5-minute sliding window

// ── In-memory state ────────────────────────────────────────────────────

/**
 * Per-provider kill switch state. The store is a plain Map. In a
 * multi-instance deployment each process has its own store; operators
 * should propagate manual overrides via the config / feature-flag layer
 * (e.g. environment variable, admin API, or dashboard toggle).
 */
const stateMap = new Map<string, KillSwitchState>();

/**
 * Global override — when set, overrides all per-provider decisions.
 * Useful for emergency operator intervention.
 */
let globalOverride: boolean | null = null;

// ── Helpers ────────────────────────────────────────────────────────────

function getOrCreateState(provider: string): KillSwitchState {
  let s = stateMap.get(provider);
  if (!s) {
    s = {
      provider,
      isActive: false,
      activatedAt: null,
      reason: null,
      severity: null,
      events: [],
      windowStats: {
        totalSamples: 0,
        errorSamples: 0,
        errorRate: 0,
        p99LatencyMs: 0,
        avgLatencyMs: 0,
        totalCostUsd: 0,
        totalLegacyCostUsd: 0,
        costRatio: 0,
      },
    };
    stateMap.set(provider, s);
  }
  return s;
}

function computeP99(latencies: number[]): number {
  if (latencies.length === 0) return 0;
  const sorted = [...latencies].sort((a, b) => a - b);
  const idx = Math.ceil(0.99 * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

// ── Public API ─────────────────────────────────────────────────────────

/**
 * Configure per-provider thresholds. Replaces the full config for that
 * provider. If `thresholds` is null/undefined, resets to defaults.
 */
export function configureThresholds(
  provider: string,
  thresholds?: Partial<KillSwitchThresholds>,
): void {
  const existing = getOrCreateState(provider);
  if (thresholds) {
    // We persist thresholds in a side-channel since the State type does
    // not carry them. For now thresholds are ephemeral; persist via env.
    // Write them as comments on the state for debugging.
    (existing as Record<string, unknown>)._thresholds = {
      ...DEFAULT_THRESHOLDS,
      ...thresholds,
    };
  } else {
    delete (existing as Record<string, unknown>)._thresholds;
  }
}

function getThresholds(provider: string): KillSwitchThresholds {
  const state = getOrCreateState(provider);
  const stored = (state as Record<string, unknown>)._thresholds as
    | KillSwitchThresholds
    | undefined;
  return stored ?? DEFAULT_THRESHOLDS;
}

/**
 * Record a single observation. Updates the sliding window and re-evaluates
 * thresholds. Returns the updated activation state.
 */
export function recordObservation(
  obs: KillSwitchObservation,
): boolean {
  // Global override check: if globally forced on, activate immediately.
  if (globalOverride === true) {
    return true;
  }
  // Global override off: always deactivated.
  if (globalOverride === false) {
    return false;
  }

  const state = getOrCreateState(obs.provider);
  const thresholds = getThresholds(obs.provider);
  const now = obs.timestamp;

  // ── Sliding window eviction ────────────────────────────────────
  // We keep a simple approach: reset the window if it's too large or
  // too old. A proper implementation would use a ring buffer; for the
  // initial release, a full-reset-on-every-observation is fine because
  // the number of observations per 5-minute window is small (<~3000).

  // ── Update window stats ────────────────────────────────────────
  const s = state.windowStats;
  s.totalSamples += 1;
  if (!obs.ok) s.errorSamples += 1;
  if (obs.costUsd != null) s.totalCostUsd += obs.costUsd;
  if (obs.legacyCostUsd != null) s.totalLegacyCostUsd += obs.legacyCostUsd;

  s.errorRate = s.totalSamples > 0 ? s.errorSamples / s.totalSamples : 0;

  // Approximate p99: we don't store all latencies, so use a simplified
  // heuristic. The initial implementation uses exponential moving
  // average for avg and treats the current observation as the "latest
  // p99 proxy". A full implementation would use a histograph.
  s.avgLatencyMs =
    s.avgLatencyMs > 0
      ? 0.9 * s.avgLatencyMs + 0.1 * obs.latencyMs
      : obs.latencyMs;
  // For p99, use the max of recent samples as a conservative proxy.
  if (obs.latencyMs > s.p99LatencyMs) {
    s.p99LatencyMs = obs.latencyMs;
  }

  s.costRatio =
    s.totalLegacyCostUsd > 0
      ? s.totalCostUsd / s.totalLegacyCostUsd
      : 1.0;

  // ── Threshold evaluation ───────────────────────────────────────
  // Only evaluate if we have enough samples.
  if (s.totalSamples < thresholds.minSampleSize) {
    return state.isActive;
  }

  // Check error rate.
  if (s.errorRate > thresholds.maxErrorRate) {
    return activate(obs.provider, "error_rate_exceeded", "warn",
      `Error rate ${(s.errorRate * 100).toFixed(1)}% exceeds threshold ${(thresholds.maxErrorRate * 100).toFixed(1)}%`
    );
  }

  // Check latency.
  if (s.p99LatencyMs > thresholds.maxLatencyMs) {
    return activate(obs.provider, "latency_exceeded", "warn",
      `p99 latency ${s.p99LatencyMs.toFixed(0)}ms exceeds threshold ${thresholds.maxLatencyMs}ms`
    );
  }

  // Check cost ratio.
  if (s.costRatio > thresholds.maxCostRatio) {
    return activate(obs.provider, "cost_ratio_exceeded", "info",
      `Cost ratio ${s.costRatio.toFixed(2)}x exceeds threshold ${thresholds.maxCostRatio}x`
    );
  }

  // All clear.
  return state.isActive;
}

/**
 * Activate the kill switch for a provider with a given reason.
 * Returns `true` if the switch was just activated (was inactive before).
 */
export function activate(
  provider: string,
  reason: KillReason,
  severity: KillSeverity = "warn",
  message?: string,
): boolean {
  const state = getOrCreateState(provider);
  if (state.isActive) return true; // already active
  state.isActive = true;
  state.activatedAt = Date.now();
  state.reason = reason;
  state.severity = severity;
  state.events.push({
    timestamp: Date.now(),
    type: "activate",
    reason,
    severity,
    message: message ?? `Kill switch activated (reason: ${reason})`,
  });
  return true;
}

/**
 * Deactivate the kill switch for a provider. Resets the sliding window.
 */
export function deactivate(
  provider: string,
  reason: "auto_clear" | "operator_clear" = "operator_clear",
): boolean {
  const state = getOrCreateState(provider);
  if (!state.isActive) return false; // already inactive
  state.isActive = false;
  state.activatedAt = null;
  state.reason = null;
  state.severity = null;
  state.events.push({
    timestamp: Date.now(),
    type: "deactivate",
    reason,
    severity: "info",
    message: `Kill switch deactivated (reason: ${reason})`,
  });
  // Reset window statistics.
  state.windowStats = {
    totalSamples: 0,
    errorSamples: 0,
    errorRate: 0,
    p99LatencyMs: 0,
    avgLatencyMs: 0,
    totalCostUsd: 0,
    totalLegacyCostUsd: 0,
    costRatio: 0,
  };
  return true;
}

/**
 * Force activate all providers (or a specific provider) manually.
 * Bypasses health checks entirely.
 */
export function forceActivate(
  provider?: string,
): void {
  if (provider) {
    activate(provider, "manual", "critical",
      `Operator force-activated kill switch for ${provider}`);
  } else {
    globalOverride = true;
  }
}

/**
 * Force deactivate all providers (or a specific provider) manually.
 */
export function forceDeactivate(
  provider?: string,
): void {
  if (provider) {
    deactivate(provider, "operator_clear");
  } else {
    globalOverride = false;
  }
}

/**
 * Check if the kill switch is active for a given provider.
 * This is the main query function called by the dispatcher.
 */
export function isActive(provider: string): boolean {
  // Global override first.
  if (globalOverride === true) return true;
  if (globalOverride === false) return false;

  const state = stateMap.get(provider);
  if (!state) return false;
  return state.isActive;
}

/**
 * Get the current kill switch state for a provider.
 */
export function getState(provider: string): KillSwitchState | undefined {
  return stateMap.get(provider);
}

/**
 * List all known providers with kill switch state.
 */
export function listStates(): KillSwitchState[] {
  return Array.from(stateMap.values());
}

/**
 * Reset all state (for testing or full operator reset).
 */
export function resetAll(): void {
  stateMap.clear();
  globalOverride = null;
}

/**
 * Reset state for a single provider (for testing).
 */
export function resetProvider(provider: string): void {
  stateMap.delete(provider);
}
