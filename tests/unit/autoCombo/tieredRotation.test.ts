/**
 * Tests for ScoreTierRotator and connectionDensity factor.
 * Verifies that multi-connection providers surface in ranked candidates
 * and that tiered rotation distributes traffic fairly.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { selectProvider, type AutoComboConfig } from "../../../open-sse/services/autoCombo/engine";
import {
  calculateFactors,
  calculateScore,
  DEFAULT_WEIGHTS,
  scorePool,
  type ProviderCandidate,
  type ScoredProvider,
} from "../../../open-sse/services/autoCombo/scoring";
import { getTaskFitness } from "../../../open-sse/services/autoCombo/taskFitness";
import { resetDiversity } from "../../../open-sse/services/autoCombo/providerDiversity";

function makeCandidate(overrides: Partial<ProviderCandidate>): ProviderCandidate {
  return {
    provider: "unknown",
    model: "unknown-model",
    quotaRemaining: 100,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 1,
    p95LatencyMs: 1000,
    latencyStdDev: 100,
    errorRate: 0.01,
    ...overrides,
  };
}

function makeConfig(name: string): AutoComboConfig {
  return {
    id: `test-${name}`,
    name,
    type: "auto",
    candidatePool: [],
    weights: { ...DEFAULT_WEIGHTS },
    explorationRate: 0,
    routerStrategy: "rules",
  };
}

describe("Connection Density Factor", () => {
  const baseCandidate = makeCandidate({ provider: "cerebras", model: "llama-70b" });

  it("multi-connection provider scores higher than single-connection at same quality", () => {
    const multiConn = makeCandidate({ provider: "cerebras", model: "llama-70b", connectionPoolSize: 43 });
    const singleConn = makeCandidate({ provider: "anthropic", model: "claude-sonnet", connectionPoolSize: 1 });
    const pool = [multiConn, singleConn];

    const multiFactors = calculateFactors(multiConn, pool, "coding", getTaskFitness);
    const singleFactors = calculateFactors(singleConn, pool, "coding", getTaskFitness);
    const multiScore = calculateScore(multiFactors, DEFAULT_WEIGHTS);
    const singleScore = calculateScore(singleFactors, DEFAULT_WEIGHTS);

    expect(multiFactors.connectionDensity).toBe(1.0);
    expect(singleFactors.connectionDensity).toBe(0.0);
    expect(multiScore).toBeGreaterThan(singleScore);
  });

  it("density scales linearly from 0 to 10 connections, caps at 10+", () => {
    const make = (size: number) => makeCandidate({ connectionPoolSize: size });
    const sizes = [1, 2, 5, 10, 20, 43];
    const densities = sizes.map((s) => {
      const c = make(s);
      const pool = [c];
      return calculateFactors(c, pool, "coding", getTaskFitness).connectionDensity;
    });

    expect(densities[0]).toBeCloseTo(0.0, 5);
    expect(densities[1]).toBeCloseTo(0.1, 5);
    expect(densities[2]).toBeCloseTo(0.4, 5);
    expect(densities[3]).toBeCloseTo(0.9, 5);
    expect(densities[4]).toBe(1.0);
    expect(densities[5]).toBe(1.0);
  });

  it("missing connectionPoolSize defaults to 1 (backward compat)", () => {
    const candidate = makeCandidate({ provider: "x" });
    const pool = [candidate];
    const factors = calculateFactors(candidate, pool, "coding", getTaskFitness);
    expect(factors.connectionDensity).toBe(0.0);
  });

  it("DEFAULT_WEIGHTS still sum to 1.0 after adding density", () => {
    const sum = Object.values(DEFAULT_WEIGHTS).reduce((a, b) => a + b, 0);
    expect(Math.abs(sum - 1.0)).toBeLessThan(0.01);
  });
});

describe("Tiered Rotation in selectProvider", () => {
  beforeEach(() => {
    resetDiversity();
  });

  it("smart combo rotates within top tier across many requests", () => {
    const topA = makeCandidate({ provider: "openai", model: "gpt-4o", quotaRemaining: 95 });
    const topB = makeCandidate({ provider: "anthropic", model: "claude-opus", quotaRemaining: 90 });
    const topC = makeCandidate({ provider: "google", model: "gemini-ultra", quotaRemaining: 88 });
    const mid = makeCandidate({ provider: "mistral", model: "mistral-large", quotaRemaining: 70 });
    const pool = [topA, topB, topC, mid];

    const config = makeConfig("smart");
    const seen = new Set<string>();
    for (let i = 0; i < 50; i++) {
      const result = selectProvider(config, pool, "coding");
      seen.add(`${result.provider}/${result.model}`);
    }
    expect(seen.size).toBeGreaterThanOrEqual(2);
    expect(seen.has("openai/gpt-4o") || seen.has("anthropic/claude-opus")).toBe(true);
  });

  it("cheap combo pulls from rest tier (lower scores) more often than smart", () => {
    const top = makeCandidate({ provider: "openai", model: "gpt-4o", quotaRemaining: 100 });
    const rest = makeCandidate({
      provider: "cheap-provider",
      model: "cheap-model",
      quotaRemaining: 100,
      costPer1MTokens: 0,
      p95LatencyMs: 5000,
    });
    const pool = [top, rest];

    const config = makeConfig("cheap");
    const counts: Record<string, number> = {};
    for (let i = 0; i < 200; i++) {
      const result = selectProvider(config, pool, "coding");
      counts[result.provider] = (counts[result.provider] ?? 0) + 1;
    }
    expect(counts["cheap-provider"]).toBeGreaterThan(0);
  });

  it("single-candidate pool always returns the same candidate", () => {
    const only = makeCandidate({ provider: "only", model: "only-model" });
    const config = makeConfig("smart");
    for (let i = 0; i < 10; i++) {
      const result = selectProvider(config, [only], "coding");
      expect(result.provider).toBe("only");
      expect(result.model).toBe("only-model");
    }
  });
});

describe("scorePool with connectionDensity", () => {
  it("Cerebras with 43 keys ranks above single-connection providers of similar quality", () => {
    const cerebras = makeCandidate({
      provider: "cerebras",
      model: "llama-3.1-70b",
      connectionPoolSize: 43,
      quotaRemaining: 100,
    });
    const anthropic = makeCandidate({
      provider: "anthropic",
      model: "claude-sonnet",
      connectionPoolSize: 1,
      quotaRemaining: 100,
    });
    const pool = [cerebras, anthropic];
    const scored = scorePool(pool, "coding", DEFAULT_WEIGHTS, getTaskFitness);
    expect(scored[0].provider).toBe("cerebras");
  });
});

describe("Per-Connection Rotation", () => {
  it("rotates across all 43 Cerebras connection IDs, not just one", () => {
    const cerebrasCandidates: ProviderCandidate[] = Array.from({ length: 43 }, (_, i) =>
      makeCandidate({
        provider: "cerebras",
        model: "llama-3.1-70b",
        connectionId: `cerebras-conn-${i + 1}`,
      })
    );
    const config = makeConfig("smart");

    const seenConnections = new Set<string>();
    for (let i = 0; i < 200; i++) {
      const result = selectProvider(config, cerebrasCandidates, "coding");
      if (result.connectionId) seenConnections.add(result.connectionId);
    }
    expect(seenConnections.size).toBeGreaterThanOrEqual(10);
  });

  it("different combos maintain independent round-robin state", () => {
    const candidates: ProviderCandidate[] = Array.from({ length: 5 }, (_, i) =>
      makeCandidate({ provider: "p", model: "m", connectionId: `c-${i}` })
    );
    const smartConfig = makeConfig("smart-A");
    const fastConfig = makeConfig("fast-B");

    for (let i = 0; i < 5; i++) {
      selectProvider(smartConfig, candidates, "coding");
    }
    const smartResults: string[] = [];
    for (let i = 0; i < 5; i++) {
      const r = selectProvider(smartConfig, candidates, "coding");
      if (r.connectionId) smartResults.push(r.connectionId);
    }

    for (let i = 0; i < 5; i++) {
      selectProvider(fastConfig, candidates, "coding");
    }
    const fastResults: string[] = [];
    for (let i = 0; i < 5; i++) {
      const r = selectProvider(fastConfig, candidates, "coding");
      if (r.connectionId) fastResults.push(r.connectionId);
    }

    expect(smartResults.length).toBe(5);
    expect(fastResults.length).toBe(5);
    expect(new Set(smartResults).size).toBeGreaterThan(1);
    expect(new Set(fastResults).size).toBeGreaterThan(1);
  });

  it("tied-score candidates from same provider+model are all reachable", () => {
    const candidates: ProviderCandidate[] = Array.from({ length: 5 }, (_, i) =>
      makeCandidate({ provider: "free", model: "free-model", connectionId: `key-${i}` })
    );
    const config = makeConfig("smart");
    const visited = new Set<string>();
    for (let i = 0; i < 20; i++) {
      const result = selectProvider(config, candidates, "coding");
      if (result.connectionId) visited.add(result.connectionId);
    }
    expect(visited.size).toBeGreaterThan(1);
  });
});
