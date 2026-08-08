import type { AdmissionPressure, AdmissionReleaseOutcome } from "./types.ts";

export interface AdaptationParams {
  minLimit: number;
  maxLimit: number;
  windowMs: number;
  shortLatencyAlpha: number;
  longLatencyAlpha: number;
  increaseStep: number;
  decreaseFactor: number;
  criticalDecreaseFactor: number;
  highUtilizationThreshold: number;
  lowUtilizationThreshold: number;
  latencyGradientThreshold: number;
  maxIncreasePerWindow: number;
}

export interface AdaptationState {
  currentLimit: number;
  shortLatencyEwma: number;
  longLatencyEwma: number;
  pressure: AdmissionPressure;
  /** Sum of admitted cost * time contribution proxies in the open window. */
  windowActiveCostIntegral: number;
  windowCompleted: number;
  windowLatencySamples: number;
  windowStartMs: number;
  freezeGrowth: boolean;
  /**
   * When true, critical multiplicative decrease already applied for this window
   * (e.g. via immediate observePressure). Window close must not re-apply it.
   */
  criticalDecreaseConsumed: boolean;
  utilization: number;
}

export function clampLimit(value: number, minLimit: number, maxLimit: number): number {
  if (!Number.isFinite(value)) return minLimit;
  return Math.min(maxLimit, Math.max(minLimit, Math.floor(value)));
}

export function createAdaptationState(
  initialLimit: number,
  minLimit: number,
  maxLimit: number,
  nowMs: number
): AdaptationState {
  return {
    currentLimit: clampLimit(initialLimit, minLimit, maxLimit),
    shortLatencyEwma: 0,
    longLatencyEwma: 0,
    pressure: "normal",
    windowActiveCostIntegral: 0,
    windowCompleted: 0,
    windowLatencySamples: 0,
    windowStartMs: nowMs,
    freezeGrowth: false,
    criticalDecreaseConsumed: false,
    utilization: 0,
  };
}

export function noteLatency(
  state: AdaptationState,
  latencyMs: number,
  params: AdaptationParams
): void {
  const sample = Number.isFinite(latencyMs) && latencyMs >= 0 ? latencyMs : 0;
  state.windowLatencySamples += 1;
  const sa = params.shortLatencyAlpha;
  const la = params.longLatencyAlpha;
  if (state.shortLatencyEwma <= 0 && state.longLatencyEwma <= 0) {
    state.shortLatencyEwma = sample;
    state.longLatencyEwma = sample;
    return;
  }
  state.shortLatencyEwma = sa * sample + (1 - sa) * state.shortLatencyEwma;
  state.longLatencyEwma = la * sample + (1 - la) * state.longLatencyEwma;
}

export function noteOutcome(state: AdaptationState, outcome: AdmissionReleaseOutcome): void {
  // A single upstream business error freezes growth for the current window; it must not
  // apply critical multiplicative collapse on its own.
  if (outcome === "upstream_error") {
    state.freezeGrowth = true;
    return;
  }
  if (outcome === "timeout") {
    state.freezeGrowth = true;
  }
}

export function setPressure(state: AdaptationState, pressure: AdmissionPressure): void {
  const severity: Record<AdmissionPressure, number> = { normal: 0, high: 1, critical: 2 };
  if (severity[pressure] > severity[state.pressure]) state.pressure = pressure;
}

/**
 * Close the current feedback window and adjust the limit.
 * Recovery (increase) is slower than decrease; idle/low utilization does not inflate.
 */
export function closeAdaptationWindow(
  state: AdaptationState,
  params: AdaptationParams,
  nowMs: number
): void {
  const elapsed = Math.max(1, Math.min(params.windowMs, nowMs - state.windowStartMs));
  // sampleActiveIntegral already accounts for every interval exactly once.
  const avgActive = state.windowActiveCostIntegral / elapsed;
  const util = state.currentLimit > 0 ? avgActive / state.currentLimit : 0;
  state.utilization = Math.max(0, Math.min(1, util));

  let next = state.currentLimit;
  const gradient =
    state.longLatencyEwma > 0
      ? (state.shortLatencyEwma - state.longLatencyEwma) / state.longLatencyEwma
      : 0;

  if (state.pressure === "critical") {
    // Immediate observePressure may already have applied the critical factor once.
    if (!state.criticalDecreaseConsumed) {
      next = Math.floor(next * params.criticalDecreaseFactor);
    }
  } else if (
    state.pressure === "high" ||
    (state.windowLatencySamples > 0 && gradient >= params.latencyGradientThreshold)
  ) {
    next = Math.floor(next * params.decreaseFactor);
  } else if (
    !state.freezeGrowth &&
    state.pressure === "normal" &&
    state.utilization >= params.highUtilizationThreshold &&
    state.windowCompleted > 0
  ) {
    const step = Math.min(params.increaseStep, params.maxIncreasePerWindow);
    next = next + step;
  }
  // A genuinely low-utilization window recovers the latency baseline so stale gradients expire.
  if (state.utilization <= params.lowUtilizationThreshold) {
    state.shortLatencyEwma = state.longLatencyEwma;
  }

  state.currentLimit = clampLimit(next, params.minLimit, params.maxLimit);
  state.windowActiveCostIntegral = 0;
  state.windowCompleted = 0;
  state.windowLatencySamples = 0;
  state.windowStartMs = nowMs;
  state.freezeGrowth = false;
  state.criticalDecreaseConsumed = false;
  state.pressure = "normal";
}

export function sampleActiveIntegral(
  state: AdaptationState,
  activeCost: number,
  dtMs: number
): void {
  if (dtMs <= 0 || activeCost <= 0) return;
  const boundedActiveCost = Math.min(activeCost, state.currentLimit);
  const contribution =
    dtMs > Math.floor(Number.MAX_SAFE_INTEGER / boundedActiveCost)
      ? Number.MAX_SAFE_INTEGER
      : boundedActiveCost * dtMs;
  state.windowActiveCostIntegral =
    contribution >= Number.MAX_SAFE_INTEGER - state.windowActiveCostIntegral
      ? Number.MAX_SAFE_INTEGER
      : state.windowActiveCostIntegral + contribution;
}
