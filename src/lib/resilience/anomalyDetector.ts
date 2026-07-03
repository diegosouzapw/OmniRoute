/**
 * anomalyDetector.ts — Phase 3 self-healing v2.
 *
 * Streaming detector: scores the most recent sample against the rolling
 * mean + stdev of the prior N samples and flags z-scores above a tunable
 * threshold. Pure logic — does NOT touch the DB or replay samples. The
 * SelfHealingManager is responsible for fetching the rolling window from
 * `providerHealthHistory.recentSamplesFor()`.
 */

import type {
  AnomalyDetectorConfig,
  AnomalySignal,
  AnomalySeverity,
  AnomalyDimension,
} from "@/learning/types";
import type { ProviderHealthSample } from "@/lib/db/providerHealthHistory";

/**
 * Default detector config. Wires up the same threshold the dossier §3.2
 * calls out (warn = 2.5, critical = 4.0).
 */
export const DEFAULT_ANOMALY_DETECTOR_CONFIG: AnomalyDetectorConfig = {
  windowSize: 60,
  warnThreshold: 2.5,
  criticalThreshold: 4.0,
  minSamplesForDetection: 15,
};

export interface DetectorConfig {
  windowSize: number;
  zScoreThreshold: number;
  minSamples: number;
}

export interface LegacyAnomalyDetection {
  zScore: number;
  value: number;
  mean: number;
  stdev: number;
}

export interface AnomalyDetector {
  detect(
    window: readonly { metric: string; value: number }[],
    config: DetectorConfig,
    metric: string
  ): LegacyAnomalyDetection | null;
}

export function createAnomalyDetector(): AnomalyDetector {
  return {
    detect(window, config, metric) {
      const matching = window.filter((sample) => sample.metric === metric);
      if (matching.length <= config.minSamples) return null;
      const latest = matching[matching.length - 1]!;
      const prior = matching.slice(
        Math.max(0, matching.length - 1 - config.windowSize),
        matching.length - 1
      );
      if (prior.length < config.minSamples) return null;
      const stats = computeRollingStats(prior.map((sample) => sample.value));
      if (!stats || stats.stdev <= Number.EPSILON) return null;
      const zScore = (latest.value - stats.mean) / stats.stdev;
      if (zScore < config.zScoreThreshold) return null;
      return {
        zScore,
        value: latest.value,
        mean: stats.mean,
        stdev: stats.stdev,
      };
    },
  };
}

/**
 * Compute the rolling mean and population stdev for `values`.
 * Population stdev (divide by N, not N-1) is intentional: we are scoring
 * the latest sample against the same population the window was sampled
 * from, so bias correction would misalign the anomaly logic.
 *
 * Returns `null` when the window is empty so callers can short-circuit.
 */
export function computeRollingStats(
  values: readonly number[]
): { mean: number; stdev: number } | null {
  if (values.length === 0) return null;
  let sum = 0;
  for (const v of values) sum += v;
  const mean = sum / values.length;
  let sqDiffSum = 0;
  for (const v of values) {
    const diff = v - mean;
    sqDiffSum += diff * diff;
  }
  const variance = sqDiffSum / values.length;
  return { mean, stdev: Math.sqrt(variance) };
}

/** Pull the value for `dimension` from a sample. */
export function valueOf(
  sample: ProviderHealthSample,
  dimension: AnomalyDimension
): number {
  switch (dimension) {
    case "error_rate":
      return sample.errorRate;
    case "p95_latency_ms":
      return sample.p95LatencyMs;
    case "consecutive_failures":
      return sample.consecutiveFailures;
    default: {
      const _exhaustive: never = dimension;
      return _exhaustive;
    }
  }
}

/** Severity tier lookup. `none` lives outside the type because it is a
 * sentinel "below threshold" — the detector returns an empty signal
 * array in that case. */
function classifyZ(
  z: number,
  warn: number,
  critical: number
): AnomalySeverity | "none" {
  if (z >= critical) return "critical";
  if (z >= warn) return "warn";
  return "none";
}

/**
 * Detect outliers across all three dimensions for a single new sample
 * given the prior window. The `window` parameter is `samples` sorted
 * oldest -> newest.
 *
 * Does NOT mutate inputs. Returns at most 3 signals per call (one per
 * dimension). Cold start returns empty.
 */
export function detect(
  latest: ProviderHealthSample,
  prior: readonly ProviderHealthSample[],
  config: AnomalyDetectorConfig = DEFAULT_ANOMALY_DETECTOR_CONFIG
): AnomalySignal[] {
  if (prior.length === 0) return [];

  const dims: AnomalyDimension[] = [
    "error_rate",
    "p95_latency_ms",
    "consecutive_failures",
  ];
  const out: AnomalySignal[] = [];

  for (const dim of dims) {
    const override = config.perDimension?.[dim];
    const minSamples = override?.minSamplesForDetection ?? config.minSamplesForDetection;
    if (prior.length < minSamples) continue;

    const values = prior.map((s) => valueOf(s, dim));
    const stats = computeRollingStats(values);
    if (!stats) continue;
    // Avoid divide-by-zero when window is perfectly flat. Treat that as
    // "this dimension does not deviate, ever"; skip.
    if (stats.stdev <= Number.EPSILON) continue;

    const value = valueOf(latest, dim);
    const z = (value - stats.mean) / stats.stdev;

    const warnThreshold = override?.warnThreshold ?? config.warnThreshold;
    const criticalThreshold =
      override?.criticalThreshold ?? config.criticalThreshold;
    const severity = classifyZ(z, warnThreshold, criticalThreshold);
    if (severity === "none") continue;

    out.push({
      providerKey: latest.providerKey,
      dimension: dim,
      value,
      zScore: z,
      mean: stats.mean,
      stdev: stats.stdev,
      sampleCount: prior.length,
      sampledAt: latest.sampledAt,
      severity,
    });
  }

  return out;
}

/**
 * Score a window in-place. Convenience wrapper for callers that already
 * have a sorted window. Does NOT touch the DB. Returns at most
 * `3 * (window.length - 1)` signals — every prior point is scored
 * against the running window behind it.
 */
export function scanWindow(
  window: readonly ProviderHealthSample[],
  config: AnomalyDetectorConfig = DEFAULT_ANOMALY_DETECTOR_CONFIG
): AnomalySignal[] {
  if (window.length < 2) return [];
  const out: AnomalySignal[] = [];
  // Window[0..i) is the rolling history; window[i] is the latest to score.
  for (let i = 1; i < window.length; i += 1) {
    const prior = window.slice(0, i);
    const latest = window[i]!;
    out.push(...detect(latest, prior, config));
  }
  return out;
}
