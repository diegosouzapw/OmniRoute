/**
 * Unit tests for the speed-optimized provider×model ranking engine.
 *
 * Covers the pure `rankBySpeed` function used by:
 *   - the runtime `LatencyStrategyImpl` (routerStrategy.ts)
 *   - the `omniroute_pick_fastest_model` MCP tool
 *   - the latency-optimized playground preview (via the same shared core)
 */

import { describe, it, expect } from "vitest";
import {
  rankBySpeed,
  pickFastest,
  DEFAULT_SPEED_WEIGHTS,
} from "../speedRanking";
import type { SpeedCandidate } from "../speedRanking";

function candidate(overrides: Partial<SpeedCandidate> = {}): SpeedCandidate {
  return {
    provider: "anthropic",
    model: "claude-sonnet",
    circuitBreakerState: "CLOSED",
    errorRate: 0,
    failureRate: 0,
    quotaRemaining: 100,
    quotaTotal: 100,
    costPer1MTokens: 3,
    p95LatencyMs: 1000,
    latencyStdDev: 100,
    ...overrides,
  };
}

describe("rankBySpeed — selection", () => {
  it("returns an empty list when the pool is empty", () => {
    expect(rankBySpeed([])).toEqual([]);
  });

  it("filters out OPEN circuit-breaker candidates by default", () => {
    const pool: SpeedCandidate[] = [
      candidate({ provider: "broken", model: "x", circuitBreakerState: "OPEN" }),
      candidate({ provider: "ok", model: "y", avgTtftMs: 200 }),
    ];
    const ranked = rankBySpeed(pool);
    expect(ranked).toHaveLength(1);
    expect(ranked[0].provider).toBe("ok");
  });

  it("keeps OPEN candidates when includeUnhealthy is set, sorted to the bottom", () => {
    const pool: SpeedCandidate[] = [
      candidate({ provider: "broken", model: "x", circuitBreakerState: "OPEN" }),
      candidate({ provider: "ok", model: "y", avgTtftMs: 200, avgE2ELatencyMs: 1000 }),
    ];
    const ranked = rankBySpeed(pool, DEFAULT_SPEED_WEIGHTS, { includeUnhealthy: true });
    expect(ranked).toHaveLength(2);
    expect(ranked[0].provider).toBe("ok");
    expect(ranked[1].provider).toBe("broken");
  });
});

describe("rankBySpeed — metric weighting", () => {
  it("picks the lower-TTFT provider×model when TTFT dominates", () => {
    const fast: SpeedCandidate = candidate({
      provider: "fast",
      model: "m",
      avgTtftMs: 120,
      avgE2ELatencyMs: 1000,
      avgTokensPerSecond: 80,
      p95LatencyMs: 1100,
    });
    const slow: SpeedCandidate = candidate({
      provider: "slow",
      model: "m",
      avgTtftMs: 900,
      avgE2ELatencyMs: 6000,
      avgTokensPerSecond: 20,
      p95LatencyMs: 7000,
    });
    const ranked = rankBySpeed([slow, fast]);
    expect(ranked[0].provider).toBe("fast");
  });

  it("penalizes high failure rate so a flaky fast provider loses to a steady slower one", () => {
    const flakyFast: SpeedCandidate = candidate({
      provider: "flaky",
      model: "m",
      avgTtftMs: 250,
      avgE2ELatencyMs: 1500,
      avgTokensPerSecond: 90,
      p95LatencyMs: 1700,
      errorRate: 0.3,
      failureRate: 0.3,
    });
    const steadySlow: SpeedCandidate = candidate({
      provider: "steady",
      model: "m",
      avgTtftMs: 400,
      avgE2ELatencyMs: 2200,
      avgTokensPerSecond: 70,
      p95LatencyMs: 2500,
      errorRate: 0.01,
      failureRate: 0.01,
    });
    const ranked = rankBySpeed([flakyFast, steadySlow]);
    expect(ranked[0].provider).toBe("steady");
  });

  it("penalizes high latency stdDev so a bursty fast provider loses to a steady slow one", () => {
    const bursty: SpeedCandidate = candidate({
      provider: "bursty",
      model: "m",
      avgTtftMs: 100,
      avgE2ELatencyMs: 900,
      avgTokensPerSecond: 100,
      p95LatencyMs: 950,
      latencyStdDev: 1500,
    });
    const steady: SpeedCandidate = candidate({
      provider: "steady",
      model: "m",
      avgTtftMs: 350,
      avgE2ELatencyMs: 1500,
      avgTokensPerSecond: 60,
      p95LatencyMs: 1600,
      latencyStdDev: 50,
    });
    const ranked = rankBySpeed([bursty, steady]);
    expect(ranked[0].provider).toBe("steady");
  });

  it("rewards higher tokens-per-second when everything else ties", () => {
    const base = {
      avgTtftMs: 300,
      avgE2ELatencyMs: 1500,
      p95LatencyMs: 1600,
    };
    const lowTps: SpeedCandidate = candidate({ provider: "low", model: "m", ...base, avgTokensPerSecond: 20 });
    const highTps: SpeedCandidate = candidate({ provider: "high", model: "m", ...base, avgTokensPerSecond: 200 });
    const ranked = rankBySpeed([lowTps, highTps]);
    expect(ranked[0].provider).toBe("high");
  });
});

describe("rankBySpeed — factor breakdown", () => {
  it("emits per-factor values in [0..1] and an explanation", () => {
    const ranked = rankBySpeed([
      candidate({
        provider: "a",
        model: "m",
        avgTtftMs: 100,
        avgE2ELatencyMs: 1000,
        avgTokensPerSecond: 100,
        p95LatencyMs: 1100,
        latencyStdDev: 50,
      }),
    ]);
    expect(ranked).toHaveLength(1);
    const factors = ranked[0].factors;
    for (const value of Object.values(factors)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }
    expect(ranked[0].reason).toMatch(/SpeedRanking\[/);
    expect(ranked[0].reason).toMatch(/ttft=100ms/);
  });

  it("falls back to 0.5 per missing metric so new providers are not crushed", () => {
    const ranked = rankBySpeed([
      candidate({
        provider: "fresh",
        model: "m",
        p95LatencyMs: undefined,
        latencyStdDev: undefined,
      }),
    ]);
    expect(ranked).toHaveLength(1);
    // No telemetry at all → weighted sum lands near 0.5 with reliability multiplier 1
    expect(ranked[0].factors.reliability).toBe(1);
    expect(ranked[0].factors.health).toBe(1);
    expect(ranked[0].factors.ttft).toBe(0.5);
    expect(ranked[0].factors.tps).toBe(0.5);
  });

  it("uses p95 latency when TTFT and E2E telemetry are unavailable", () => {
    const ranked = rankBySpeed([
      candidate({ provider: "slow-tail", model: "m", p95LatencyMs: 4000 }),
      candidate({ provider: "fast-tail", model: "m", p95LatencyMs: 1000 }),
    ]);
    const fast = ranked.find((entry) => entry.provider === "fast-tail");
    const slow = ranked.find((entry) => entry.provider === "slow-tail");

    expect(fast?.factors.ttft).toBeGreaterThan(slow?.factors.ttft ?? 1);
    expect(fast?.factors.e2e).toBeGreaterThan(slow?.factors.e2e ?? 1);
  });
});

describe("rankBySpeed — weight overrides", () => {
  it("respects caller weight overrides (e.g. heavy TTFT bias)", () => {
    const fastTtft: SpeedCandidate = candidate({
      provider: "fast",
      model: "m",
      avgTtftMs: 100,
      avgE2ELatencyMs: 5000,
      avgTokensPerSecond: 5,
      p95LatencyMs: 6000,
    });
    const slowTtft: SpeedCandidate = candidate({
      provider: "slow",
      model: "m",
      avgTtftMs: 800,
      avgE2ELatencyMs: 1200,
      avgTokensPerSecond: 120,
      p95LatencyMs: 1300,
    });

    const normal = rankBySpeed([fastTtft, slowTtft]);
    // Normal weights still pick slowTtft because TPS/E2E dominate over TTFT gaps.
    expect(normal[0].provider).toBe("slow");

    const heavyTtft = rankBySpeed([fastTtft, slowTtft], {
      ...DEFAULT_SPEED_WEIGHTS,
      ttft: 0.7,
      tps: 0.05,
      e2e: 0.05,
      p95: 0.05,
      health: 0.05,
      reliability: 0.05,
      stability: 0.05,
    });
    expect(heavyTtft[0].provider).toBe("fast");
  });
});

describe("pickFastest", () => {
  it("returns null on an empty pool", () => {
    expect(pickFastest([])).toBeNull();
  });

  it("returns the top-ranked candidate", () => {
    const fast = candidate({ provider: "fast", model: "m", avgTtftMs: 100 });
    const slow = candidate({ provider: "slow", model: "m", avgTtftMs: 900 });
    const winner = pickFastest([slow, fast]);
    expect(winner?.provider).toBe("fast");
  });
});
