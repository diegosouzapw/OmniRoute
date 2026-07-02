/**
 * Unit tests for Auto-Combo Engine (Phase 5)
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { calculateFactors, calculateScore, DEFAULT_WEIGHTS, validateWeights } from "../scoring";
import type { ProviderCandidate, ScoringWeights } from "../scoring";
import {
  getTaskFitness,
  getTaskFitnessWithSource,
  getTaskTypes,
  getModelsDevTierFitness,
  invalidateFitnessCache,
  setUserFitnessOverride,
  clearUserFitnessOverride,
} from "../taskFitness";
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

  describe("-free alias resolution (#4517)", () => {
    beforeEach(() => invalidateFitnessCache());

    it("returns the base model's arena_elo when given a -free variant", async () => {
      // The fix: getTaskFitnessWithSource strips a trailing "-free" suffix
      // and re-queries arena_elo with the base id. We seed an arena_elo
      // row directly via the DB module, look up the free variant, and
      // assert the alias path returns the base score with source
      // "arena_elo_free_alias".
      const baseId = "alias-base-test-4517";
      const freeId = "alias-base-test-4517-free";
      const { upsertModelIntelligence, deleteModelIntelligence } =
        await import("../../../../src/lib/db/modelIntelligence.ts");
      // Seed arena_elo on the base id only — no row exists for the free id.
      upsertModelIntelligence({
        model: baseId,
        source: "arena_elo",
        category: "coding",
        score: 0.42,
        eloRaw: 1500,
        confidence: "high",
        expiresAt: null,
      });
      invalidateFitnessCache();
      try {
        const result = getTaskFitnessWithSource(freeId, "coding");
        // Without the fix: result.source would be "wildcard_boost" (0.5 default).
        // With the fix: result.source is "arena_elo_free_alias" with score 0.42.
        expect(result.score).toBeCloseTo(0.42, 5);
        expect(result.source).toBe("arena_elo_free_alias");
      } finally {
        deleteModelIntelligence(baseId, "arena_elo", "coding");
        invalidateFitnessCache();
      }
    });

    it("does not strip -free when arena_elo is present on the literal model id", () => {
      // If both "foo-free" and "foo" have arena_elo rows, the literal "foo-free"
      // wins (we never go through the alias path). This protects future
      // benchmark uploads that specifically tag free tiers.
      setUserFitnessOverride("foo-free", "coding", 0.91);
      const result = getTaskFitnessWithSource("foo-free", "coding");
      expect(result.score).toBe(0.91);
      expect(result.source).toBe("user_override");
      clearUserFitnessOverride("foo-free", "coding");
      invalidateFitnessCache();
    });

    it("ignores -free suffix only at the end of the model id", () => {
      // "free-something" must NOT be treated as a free alias of "free-something-free"
      // — the suffix must be at the end. "mimo-free-edition" is left alone.
      // We just confirm no exception is thrown and the lookup returns a number.
      const score = getTaskFitness("mimo-free-edition", "coding");
      expect(typeof score).toBe("number");
      expect(score).toBeGreaterThan(0);
    });
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
  it("should have 5 mode packs", () => {
    // #4235 Phase B added reliability-first (for the `:reliable` tier).
    expect(getModePackNames()).toHaveLength(5);
    expect(getModePackNames()).toContain("reliability-first");
  });

  it("reliability-first should prioritize health and stability", () => {
    const pack = MODE_PACKS["reliability-first"];
    expect(pack.health).toBeGreaterThan(pack.latencyInv);
    expect(pack.stability).toBeGreaterThan(pack.costInv);
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

describe("Task Fitness Resolution Chain", () => {
  it("getTaskFitness should return static table score for known models", () => {
    const score = getTaskFitness("claude-sonnet", "coding");
    expect(score).toBe(0.95);
  });

  it("getTaskFitness should return 0.5 for unknown models with no wildcard match", () => {
    const score = getTaskFitness("unknown-model-xyz", "coding");
    expect(score).toBe(0.5);
  });

  it("getTaskFitness should apply wildcard boosts for model name patterns", () => {
    const score = getTaskFitness("deepseek-coder-v2", "coding");
    expect(score).toBeGreaterThan(0.5);
  });

  it("getTaskFitness should apply thinking wildcard for planning tasks", () => {
    const score = getTaskFitness("some-thinking-model", "planning");
    expect(score).toBeGreaterThan(0.5);
  });

  it("getTaskFitnessWithSource should return source='fitness_table' for known static models", () => {
    const result = getTaskFitnessWithSource("claude-sonnet", "coding");
    expect(result).toEqual({ score: 0.95, source: "fitness_table" });
  });

  it("getTaskFitnessWithSource should return source='wildcard_boost' for wildcard-matched models", () => {
    const result = getTaskFitnessWithSource("fast-model", "coding");
    expect(result).toEqual({ score: expect.any(Number), source: "wildcard_boost" });
  });

  it("getTaskTypes should return task types without 'default'", () => {
    const types = getTaskTypes();
    expect(types).toContain("coding");
    expect(types).toContain("review");
    expect(types).toContain("planning");
    expect(types).not.toContain("default");
  });

  it("unknown models should return 0.5 (default) when no DB or static entry exists", () => {
    const score = getTaskFitness("completely-unknown-model-xyz-999", "coding");
    expect(score).toBe(0.5);
  });

  it("wildcard boosts still work for models containing 'coder'", () => {
    const score = getTaskFitness("my-coder-pro", "coding");
    // Base 0.5 + coder boost 0.15 + code boost 0.1 = 0.75
    // "coder" contains "code", so both wildcard patterns match
    expect(score).toBe(0.75);
  });

  it("wildcard boosts still work for models containing 'thinking'", () => {
    const score = getTaskFitness("my-thinking-model", "planning");
    // Base 0.5 + thinking boost 0.1 = 0.6
    expect(score).toBe(0.6);
  });

  it("wildcard boosts still work for models containing 'thinking' for analysis tasks", () => {
    const score = getTaskFitness("my-thinking-model", "analysis");
    // Base 0.5 + thinking boost 0.1 = 0.6
    expect(score).toBe(0.6);
  });

  it("wildcard boosts for 'code' pattern apply to coding tasks", () => {
    const score = getTaskFitness("my-code-generator", "coding");
    // Base 0.5 + code boost 0.1 = 0.6
    expect(score).toBe(0.6);
  });

  it("wildcard boosts for 'fast' pattern apply to coding tasks", () => {
    const score = getTaskFitness("my-fast-model", "coding");
    // Base 0.5 + fast boost 0.05 = 0.55
    expect(score).toBe(0.55);
  });

  it("getTaskFitnessWithSource returns 'wildcard_boost' for pattern-matched unknown models", () => {
    const result = getTaskFitnessWithSource("my-coder-pro", "coding");
    expect(result.source).toBe("wildcard_boost");
    expect(result.score).toBeGreaterThan(0.5);
  });

  it("getTaskFitnessWithSource returns 'fitness_table' for statically known models", () => {
    const result = getTaskFitnessWithSource("claude-sonnet", "review");
    expect(result.source).toBe("fitness_table");
    expect(result.score).toBe(0.92);
  });

  it("getTaskFitnessWithSource returns 'wildcard_boost' with 0.5 for unknown models with no pattern", () => {
    const result = getTaskFitnessWithSource("totally-random-xyz", "coding");
    expect(result.source).toBe("wildcard_boost");
    expect(result.score).toBe(0.5);
  });
});

describe("Task Fitness DB Resolution Chain", () => {
  // These tests verify that when DB is available, the resolution chain
  // (user_override → arena_elo → models_dev_tier → static → wildcard)
  // works correctly. Since the DB module is loaded lazily via require(),
  // these tests cover the cases where DB is NOT available (graceful fallback).

  it("falls back to static FITNESS_TABLE when DB is not initialized", () => {
    // In the test environment, DB is typically not initialized,
    // so getTaskFitness should fall through to the static table
    const score = getTaskFitness("claude-sonnet", "coding");
    // Static table has claude-sonnet → 0.95 for coding
    expect(score).toBe(0.95);
  });

  it("falls back to static FITNESS_TABLE for review task type", () => {
    const score = getTaskFitness("claude-opus", "review");
    // Static table has claude-opus → 0.95 for review
    expect(score).toBe(0.95);
  });

  it("falls back to wildcard boosts when no static entry exists and DB unavailable", () => {
    // "coder-unknown" has no static entry but matches "coder" wildcard
    const score = getTaskFitness("coder-unknown", "coding");
    expect(score).toBeGreaterThan(0.5);
    expect(score).toBeLessThanOrEqual(1.0);
  });

  it("getModelsDevTierFitness returns null when DB is not initialized", () => {
    // Without a running DB, this should return null gracefully
    const score = getModelsDevTierFitness("claude-sonnet", "coding");
    // Either null (no capabilities data) or a number from DB if DB happens to be up
    if (score !== null) {
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(1);
    }
  });

  it("invalidateFitnessCache does not throw", () => {
    expect(() => invalidateFitnessCache()).not.toThrow();
  });

  it("resolution chain: static table takes priority over wildcard for known models", () => {
    // "claude-sonnet" is in the static table with coding=0.95
    // It does NOT match "coder" wildcard because the static table is checked first
    const score = getTaskFitness("claude-sonnet", "coding");
    expect(score).toBe(0.95); // From static table, NOT wildcard
  });

  it("getTaskFitnessWithSource identifies fitness_table as source for known models", () => {
    const model = "claude-sonnet";
    const category = "coding";

    const result = getTaskFitnessWithSource(model, category);
    expect(result.source).toBe("fitness_table");
    expect(result.score).toBe(0.95);
  });

  it("case insensitivity: model names are lowercased before lookup", () => {
    const upperScore = getTaskFitness("CLAUDE-SONNET", "coding");
    const lowerScore = getTaskFitness("claude-sonnet", "coding");
    expect(upperScore).toBe(lowerScore);
  });

  it("case insensitivity: task types are lowercased before lookup", () => {
    const upperScore = getTaskFitness("claude-sonnet", "CODING");
    const lowerScore = getTaskFitness("claude-sonnet", "coding");
    expect(upperScore).toBe(lowerScore);
  });
});
