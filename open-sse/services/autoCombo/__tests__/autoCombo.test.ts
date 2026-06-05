/**
 * Unit tests for Auto-Combo Engine (Phase 5)
 */

import { describe, it, expect, beforeEach } from "vitest";
import { calculateFactors, calculateScore, DEFAULT_WEIGHTS, validateWeights } from "../scoring";
import type { ProviderCandidate, ScoringWeights } from "../scoring";
import { getTaskFitness, getTaskTypes } from "../taskFitness";
import { SelfHealingManager } from "../selfHealing";
import { MODE_PACKS, getModePack, getModePackNames } from "../modePacks";
import { getStrategy } from "../routerStrategy";
import type { RoutingContext } from "../routerStrategy";

describe("Scoring", () => {
  const candidate: ProviderCandidate = {
    provider: "anthropic",
    model: "claude-sonnet",
    quotaRemaining: 80,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 3,
    p95LatencyMs: 1200,
    latencyStdDev: 120,
    errorRate: 0.02,
  };

  it("should calculate a score between 0 and 1", () => {
    const pool: ProviderCandidate[] = [
      candidate,
      {
        ...candidate,
        provider: "google",
        model: "gemini-pro",
        costPer1MTokens: 6,
        p95LatencyMs: 1800,
        latencyStdDev: 300,
        quotaRemaining: 70,
      },
    ];
    const factors = calculateFactors(candidate, pool, "coding", getTaskFitness);
    const score = calculateScore(factors, DEFAULT_WEIGHTS);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(1);
  });

  it("OPEN circuit breaker should reduce score", () => {
    const unhealthyCandidate: ProviderCandidate = { ...candidate, circuitBreakerState: "OPEN" };
    const pool: ProviderCandidate[] = [candidate, unhealthyCandidate];

    const healthyFactors = calculateFactors(candidate, pool, "coding", getTaskFitness);
    const unhealthyFactors = calculateFactors(unhealthyCandidate, pool, "coding", getTaskFitness);

    const healthy = calculateScore(healthyFactors, DEFAULT_WEIGHTS);
    const unhealthy = calculateScore(unhealthyFactors, DEFAULT_WEIGHTS);
    expect(healthy).toBeGreaterThan(unhealthy);
  });

  it("should validate weights sum to 1.0", () => {
    expect(validateWeights(DEFAULT_WEIGHTS)).toBe(true);
    expect(validateWeights({ ...DEFAULT_WEIGHTS, quota: 0.5 })).toBe(false);
  });
});

describe("Task Fitness", () => {
  it("should return fitness score for known model+task", () => {
    const score = getTaskFitness("claude-sonnet", "coding");
    expect(score).toBeGreaterThan(0.5);
  });

  it("should return 0.5 default for unknown model", () => {
    const score = getTaskFitness("totally-unknown-model", "coding");
    expect(score).toBe(0.5);
  });

  it("should list all task types", () => {
    const types = getTaskTypes();
    expect(types).toContain("coding");
    expect(types).toContain("review");
    expect(types).toContain("planning");
    expect(types.length).toBeGreaterThanOrEqual(6);
  });

  it("should boost wildcard patterns", () => {
    const coderScore = getTaskFitness("some-coder-model", "coding");
    const normalScore = getTaskFitness("some-random-model", "coding");
    expect(coderScore).toBeGreaterThan(normalScore);
  });
});

describe("Self-Healing", () => {
  let healer: SelfHealingManager;

  beforeEach(() => {
    healer = new SelfHealingManager();
  });

  it("should exclude provider with low score", () => {
    const result = healer.evaluate("bad-provider", 0.1, "CLOSED");
    expect(result.excluded).toBe(true);
    expect(result.reason).toContain("below threshold");
  });

  it("should keep healthy providers", () => {
    const result = healer.evaluate("good-provider", 0.8, "CLOSED");
    expect(result.excluded).toBe(false);
  });

  it("should auto-exclude OPEN circuit breakers", () => {
    const result = healer.evaluate("broken-provider", 0.8, "OPEN");
    expect(result.excluded).toBe(true);
  });

  it("should detect incident mode when >50% providers are OPEN", () => {
    healer.updateIncidentMode(["OPEN", "OPEN", "CLOSED"]);
    expect(healer.isInIncidentMode()).toBe(true);
  });

  it("should not be in incident mode when most are CLOSED", () => {
    healer.updateIncidentMode(["CLOSED", "CLOSED", "OPEN"]);
    expect(healer.isInIncidentMode()).toBe(false);
  });

  it("should track exclusion count", () => {
    healer.evaluate("p1", 0.1, "CLOSED");
    healer.evaluate("p2", 0.1, "CLOSED");
    const status = healer.getStatus();
    expect(status.exclusionCount).toBe(2);
  });
});

describe("Mode Packs", () => {
  it("should have 4 mode packs", () => {
    expect(getModePackNames()).toHaveLength(4);
  });

  it("all mode pack weights should sum to 1.0", () => {
    for (const name of getModePackNames()) {
      const pack = getModePack(name);
      if (pack) {
        const sum = Object.values(pack).reduce((a, b) => a + b, 0);
        expect(Math.abs(sum - 1.0)).toBeLessThan(0.001);
      }
    }
  });

  it("ship-fast should prioritize latency", () => {
    const pack = MODE_PACKS["ship-fast"];
    expect(pack.latencyInv).toBeGreaterThan(pack.costInv);
  });

  it("cost-saver should prioritize cost", () => {
    const pack = MODE_PACKS["cost-saver"];
    expect(pack.costInv).toBeGreaterThan(pack.latencyInv);
  });

  it("quality-first should prioritize task fit", () => {
    const pack = MODE_PACKS["quality-first"];
    expect(pack.taskFit).toBeGreaterThan(pack.costInv);
  });

  it("undefined pack should return undefined", () => {
    expect(getModePack("nonexistent")).toBeUndefined();
  });
});

describe("SLA-aware Strategy", () => {
  const pool: ProviderCandidate[] = [
    {
      provider: "fast-flaky",
      model: "fast-model",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 2,
      p95LatencyMs: 800,
      latencyStdDev: 200,
      errorRate: 0.2,
    },
    {
      provider: "steady",
      model: "steady-model",
      quotaRemaining: 80,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 6,
      p95LatencyMs: 1400,
      latencyStdDev: 100,
      errorRate: 0.01,
    },
    {
      provider: "cheap-slow",
      model: "cheap-model",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 0.2,
      p95LatencyMs: 3500,
      latencyStdDev: 150,
      errorRate: 0.01,
    },
  ];

  it("should prefer candidates that satisfy latency and error-rate SLOs", () => {
    const strategy = getStrategy("sla-aware");
    const result = strategy.select(pool, {
      taskType: "coding",
      sla: {
        targetP95Ms: 2000,
        maxErrorRate: 0.05,
        maxCostPer1MTokens: 10,
      },
    });

    expect(result.strategy).toBe("sla-aware");
    expect(result.provider).toBe("steady");
    expect(result.reason).toContain("p95=1400ms/2000ms");
  });

  it("should support the sla alias and soft-fallback when no candidate satisfies all SLOs", () => {
    const strategy = getStrategy("sla");
    const result = strategy.select(pool, {
      taskType: "coding",
      sla: {
        targetP95Ms: 500,
        maxErrorRate: 0.005,
        maxCostPer1MTokens: 1,
        hardConstraints: true,
      },
    });

    expect(result.strategy).toBe("sla-aware");
    expect(result.candidatesConsidered).toBe(3);
    expect(result.reason).toContain("no candidate met all SLA constraints");
  });

  it("should use pure score ranking in soft mode even when a compliant candidate exists", () => {
    const strategy = getStrategy("sla-aware");
    const softPool: ProviderCandidate[] = [
      {
        provider: "slightly-over-error",
        model: "fast-reliable-enough",
        quotaRemaining: 100,
        quotaTotal: 100,
        circuitBreakerState: "CLOSED",
        costPer1MTokens: 1,
        p95LatencyMs: 500,
        latencyStdDev: 10,
        errorRate: 0.06,
      },
      {
        provider: "compliant-but-risky",
        model: "threshold-model",
        quotaRemaining: 100,
        quotaTotal: 100,
        circuitBreakerState: "HALF_OPEN",
        costPer1MTokens: 5,
        p95LatencyMs: 2_000,
        latencyStdDev: 1_000,
        errorRate: 0.05,
      },
    ];

    const result = strategy.select(softPool, {
      taskType: "coding",
      sla: {
        targetP95Ms: 2_000,
        maxErrorRate: 0.05,
        maxCostPer1MTokens: 5,
      },
    });

    expect(result.provider).toBe("slightly-over-error");
    expect(result.reason).not.toContain("no candidate met all SLA constraints");
  });

  it("should prefer compliant candidates before score when hard constraints are enabled", () => {
    const strategy = getStrategy("sla-aware");
    const hardPool: ProviderCandidate[] = [
      {
        provider: "slightly-over-error",
        model: "fast-reliable-enough",
        quotaRemaining: 100,
        quotaTotal: 100,
        circuitBreakerState: "CLOSED",
        costPer1MTokens: 1,
        p95LatencyMs: 500,
        latencyStdDev: 10,
        errorRate: 0.06,
      },
      {
        provider: "compliant-but-risky",
        model: "threshold-model",
        quotaRemaining: 100,
        quotaTotal: 100,
        circuitBreakerState: "HALF_OPEN",
        costPer1MTokens: 5,
        p95LatencyMs: 2_000,
        latencyStdDev: 1_000,
        errorRate: 0.05,
      },
    ];

    const result = strategy.select(hardPool, {
      taskType: "coding",
      sla: {
        targetP95Ms: 2_000,
        maxErrorRate: 0.05,
        maxCostPer1MTokens: 5,
        hardConstraints: true,
      },
    });

    expect(result.provider).toBe("compliant-but-risky");
  });

  it("should give full SLO-factor credit to candidates exactly at configured thresholds", () => {
    const strategy = getStrategy("sla-aware");
    const result = strategy.select(
      [
        {
          provider: "threshold-provider",
          model: "threshold-model",
          quotaRemaining: 100,
          quotaTotal: 100,
          circuitBreakerState: "CLOSED",
          costPer1MTokens: 5,
          p95LatencyMs: 1_000,
          latencyStdDev: 50,
          errorRate: 0.1,
        },
      ],
      {
        taskType: "coding",
        sla: {
          targetP95Ms: 1_000,
          maxErrorRate: 0.1,
          maxCostPer1MTokens: 5,
        },
      }
    );

    expect(result.finalScore).toBeGreaterThan(0.9);
  });
});

describe("LKGP Strategy", () => {
  const pool: ProviderCandidate[] = [
    {
      provider: "anthropic",
      model: "claude-sonnet",
      quotaRemaining: 80,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 3,
      p95LatencyMs: 1200,
      latencyStdDev: 120,
      errorRate: 0.02,
    },
    {
      provider: "openai",
      model: "gpt-4o",
      quotaRemaining: 90,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 5,
      p95LatencyMs: 800,
      latencyStdDev: 80,
      errorRate: 0.01,
    },
  ];

  it("should fall back to rules strategy when lkgpEnabled is false", () => {
    const context: RoutingContext = {
      taskType: "coding",
      lastKnownGoodProvider: "anthropic",
      lkgpEnabled: false,
    };
    const lkgpStrategy = getStrategy("lkgp");
    const rulesStrategy = getStrategy("rules");

    const lkgpResult = lkgpStrategy.select(pool, context);
    const rulesResult = rulesStrategy.select(pool, context);

    expect(lkgpResult.strategy).toBe("rules");
    expect(lkgpResult.provider).toBe(rulesResult.provider);
  });

  it("should use LKGP provider when lkgpEnabled is true", () => {
    const context: RoutingContext = {
      taskType: "coding",
      lastKnownGoodProvider: "anthropic",
      lkgpEnabled: true,
    };
    const lkgpStrategy = getStrategy("lkgp");
    const result = lkgpStrategy.select(pool, context);

    expect(result.strategy).toBe("lkgp");
    expect(result.provider).toBe("anthropic");
  });

  it("should use LKGP provider when lkgpEnabled is undefined (default)", () => {
    const context: RoutingContext = {
      taskType: "coding",
      lastKnownGoodProvider: "openai",
    };
    const lkgpStrategy = getStrategy("lkgp");
    const result = lkgpStrategy.select(pool, context);

    expect(result.strategy).toBe("lkgp");
    expect(result.provider).toBe("openai");
  });
});
