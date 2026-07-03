/**
 * Tests for AnomalyDetector pure logic.
 *
 * Wall-clock tests in scanWindow would be brittle (many samples each), so we
 * synthesise tiny windows of steady-state + a single outlier and pin:
 *  - mean/stdev correctness
 *  - cold-start short-circuit
 *  - flat-window divide-by-zero guard
 *  - per-dimension thresholds
 */

import { describe, test, expect } from "vitest";
import {
  computeRollingStats,
  detect,
  scanWindow,
  valueOf,
  DEFAULT_ANOMALY_DETECTOR_CONFIG,
} from "../anomalyDetector";
import type { ProviderHealthSample } from "@/lib/db/providerHealthHistory";

function mkSample(
  index: number,
  partial: Partial<ProviderHealthSample> = {}
): ProviderHealthSample {
  return {
    providerKey: "openai/gpt-4o",
    sampledAt: 1_700_000_000 + index,
    errorRate: 0.01,
    p95LatencyMs: 800,
    activeComboCount: 1,
    consecutiveFailures: 0,
    samplesWindow: 60,
    ...partial,
  };
}

describe("computeRollingStats", () => {
  test("returns null on empty input", () => {
    expect(computeRollingStats([])).toBeNull();
  });

  test("computes population mean and stdev (no N-1 correction)", () => {
    const stats = computeRollingStats([2, 4, 4, 4, 5, 5, 7, 9]);
    expect(stats).not.toBeNull();
    expect(stats!.mean).toBeCloseTo(5.0, 10);
    // Population stdev here is 2.0 (not 2.138... sample stdev).
    expect(stats!.stdev).toBeCloseTo(2.0, 10);
  });

  test("single-sample window returns stdev 0", () => {
    const stats = computeRollingStats([7]);
    expect(stats).toEqual({ mean: 7, stdev: 0 });
  });
});

describe("valueOf", () => {
  test("projects each dimension to its numeric value", () => {
    const s = mkSample(0, {
      errorRate: 0.2,
      p95LatencyMs: 1234,
      consecutiveFailures: 9,
    });
    expect(valueOf(s, "error_rate")).toBeCloseTo(0.2, 10);
    expect(valueOf(s, "p95_latency_ms")).toBe(1234);
    expect(valueOf(s, "consecutive_failures")).toBe(9);
  });
});

describe("detect", () => {
  test("returns no signals when prior window is empty (cold start)", () => {
    const latest = mkSample(100);
    expect(detect(latest, [])).toEqual([]);
  });

  test("returns no signals on a perfectly flat window (stdev 0 guard)", () => {
    const prior = Array.from({ length: 30 }, (_, i) =>
      mkSample(i, { errorRate: 0.05 })
    );
    const latest = mkSample(31, { errorRate: 0.99, p95LatencyMs: 800 });
    const out = detect(latest, prior);
    // error_rate: prior stdev is 0, so signal should be skipped.
    expect(out.find((s) => s.dimension === "error_rate")).toBeUndefined();
  });

  test("flags an outlier in error_rate when z >= warn threshold", () => {
    const prior = Array.from({ length: 30 }, (_, i) =>
      mkSample(i, {
        errorRate: i % 2 === 0 ? 0.01 : 0.02,
        p95LatencyMs: 800,
        consecutiveFailures: 0,
      })
    );
    const latest = mkSample(31, { errorRate: 0.03 });
    const out = detect(latest, prior);
    const errRateSignal = out.find((s) => s.dimension === "error_rate");
    expect(errRateSignal).toBeDefined();
    expect(errRateSignal!.zScore).toBeGreaterThanOrEqual(2.5);
    expect(errRateSignal!.severity).toBe("warn");
  });

  test("escalates to critical when z >= critical threshold", () => {
    const prior = Array.from({ length: 30 }, (_, i) =>
      mkSample(i, {
        errorRate: i % 2 === 0 ? 0.01 : 0.02,
        p95LatencyMs: 800,
        consecutiveFailures: 0,
      })
    );
    const latest = mkSample(31, { errorRate: 0.99 });
    const out = detect(latest, prior);
    const errRateSignal = out.find((s) => s.dimension === "error_rate")!;
    expect(errRateSignal.severity).toBe("critical");
  });

  test("respects minSamplesForDetection cold-start guard", () => {
    const cfg = { ...DEFAULT_ANOMALY_DETECTOR_CONFIG, minSamplesForDetection: 100 };
    const prior = Array.from({ length: 10 }, (_, i) => mkSample(i));
    const latest = mkSample(11, { errorRate: 0.99 });
    expect(detect(latest, prior, cfg)).toEqual([]);
  });

  test("perDimension override raises the threshold for that dimension only", () => {
    const cfg = {
      ...DEFAULT_ANOMALY_DETECTOR_CONFIG,
      warnThreshold: 2.5,
      criticalThreshold: 6.0,
      perDimension: {
        error_rate: {
          warnThreshold: 8.0,
          criticalThreshold: 12.0,
        },
      },
    };
    const prior = Array.from({ length: 30 }, (_, i) =>
      mkSample(i, {
        errorRate: i % 2 === 0 ? 0.01 : 0.02,
        p95LatencyMs: 800,
        consecutiveFailures: 0,
      })
    );
    const latest = mkSample(31, { errorRate: 0.03 }); // would normally flag
    const out = detect(latest, prior, cfg);
    expect(out.find((s) => s.dimension === "error_rate")).toBeUndefined();
  });
});

describe("scanWindow", () => {
  test("scores every point after the first against the running history", () => {
    const window: ProviderHealthSample[] = [
      ...Array.from({ length: 30 }, (_, i) =>
        mkSample(i, {
          errorRate: i % 2 === 0 ? 0.01 : 0.02,
          p95LatencyMs: i % 2 === 0 ? 800 : 820,
        })
      ),
      mkSample(31, { errorRate: 0.5 }), // anomaly
      ...Array.from({ length: 5 }, (_, i) =>
        mkSample(32 + i, { errorRate: 0.01 })
      ),
    ];
    const out = scanWindow(window);
    // The anomaly sample should produce exactly 3 signals (one per
    // dimension) IF each dimension's stdev > epsilon. We'll just check
    // there's at least one error_rate signal — that's the contract.
    expect(out.some((s) => s.dimension === "error_rate")).toBe(true);
  });
});
