/**
 * OmniRoute Routing Benchmarks
 *
 * Tests for measuring request routing, model selection, and fallback chain performance.
 *
 * Run with: npx vitest run tests/unit/benchmarks.test.ts
 * Or with: npm run test:benchmarks
 */

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import {
  runBenchmark,
  runBenchmarks,
  runLatencyBenchmark,
  formatBenchmarkReport,
  formatLatencyReport,
  type BenchmarkResult,
  type BenchmarkSuite,
} from "../../src/lib/benchmarks";

// Import routing components
import { PolicyEngine } from "../../src/domain/policyEngine";
import {
  registerFallback,
  resolveFallbackChain,
  getNextFallback,
  hasFallback,
  resetAllFallbacks,
} from "../../src/domain/fallbackPolicy";

// ── Test Fixtures ────────────────────────────────────────────────────────────

const policyEngine = new PolicyEngine();

const testPolicies = [
  {
    id: "routing-1",
    name: "Prefer Anthropic for claude models",
    type: "routing",
    enabled: true,
    priority: 1,
    conditions: { model_pattern: "claude-*" },
    actions: { prefer_provider: ["anthropic", "openai"] },
  },
  {
    id: "routing-2",
    name: "Prefer OpenAI for gpt models",
    type: "routing",
    enabled: true,
    priority: 2,
    conditions: { model_pattern: "gpt-*" },
    actions: { prefer_provider: ["openai", "anthropic"] },
  },
  {
    id: "access-1",
    name: "Block dangerous models",
    type: "access",
    enabled: true,
    priority: 3,
    conditions: {},
    actions: { block_model: ["dangerous-*"] },
  },
  {
    id: "budget-1",
    name: "Limit expensive models",
    type: "budget",
    enabled: true,
    priority: 4,
    conditions: {},
    actions: { max_tokens: 4096 },
  },
];

const testModels = [
  "claude-3-5-sonnet",
  "claude-3-opus",
  "gpt-4o",
  "gpt-4o-mini",
  "gemini-1.5-pro",
  "o1-preview",
];

// ── Benchmark Suites ─────────────────────────────────────────────────────────

const routingBenchmarks: BenchmarkSuite = {
  name: "Request Routing",
  benchmarks: [
    {
      name: "PolicyEngine.evaluate (no policies)",
      fn: () => {
        const engine = new PolicyEngine();
        engine.evaluate({ model: "gpt-4o" });
      },
      iterations: 100000,
    },
    {
      name: "PolicyEngine.evaluate (with 4 policies)",
      fn: () => {
        policyEngine.evaluate({ model: "gpt-4o" });
      },
      iterations: 50000,
    },
    {
      name: "PolicyEngine.evaluate (claude pattern match)",
      fn: () => {
        policyEngine.evaluate({ model: "claude-3-5-sonnet" });
      },
      iterations: 50000,
    },
    {
      name: "PolicyEngine.evaluate (block pattern match)",
      fn: () => {
        policyEngine.evaluate({ model: "dangerous-model" });
      },
      iterations: 50000,
    },
    {
      name: "Single model lookup (Map.get)",
      fn: () => {
        const map = new Map<string, string>();
        map.set("gpt-4o", "openai");
        map.set("claude-3-5-sonnet", "anthropic");
        map.get("gpt-4o");
      },
      iterations: 100000,
    },
    {
      name: "Fallback chain resolution",
      fn: () => {
        resolveFallbackChain("gpt-4o");
      },
      iterations: 50000,
    },
    {
      name: "Get next fallback",
      fn: () => {
        getNextFallback("gpt-4o", []);
      },
      iterations: 50000,
    },
    {
      name: "Has fallback check",
      fn: () => {
        hasFallback("gpt-4o");
      },
      iterations: 50000,
    },
  ],
};

const modelSelectionBenchmarks: BenchmarkSuite = {
  name: "Model Selection",
  benchmarks: [
    {
      name: "String comparison (exact match)",
      fn: () => {
        const model = "gpt-4o";
        model === "gpt-4o" || model === "claude-3-5-sonnet";
      },
      iterations: 100000,
    },
    {
      name: "String comparison (prefix match)",
      fn: () => {
        const model = "claude-3-5-sonnet";
        model.startsWith("claude-");
      },
      iterations: 100000,
    },
    {
      name: "Model alias resolution (small map)",
      fn: () => {
        const aliases = new Map<string, string>();
        aliases.set("claude", "claude-3-5-sonnet");
        aliases.set("gpt4", "gpt-4o");
        aliases.set("mini", "gpt-4o-mini");
        aliases.get("claude");
      },
      iterations: 100000,
    },
    {
      name: "Model alias resolution (large map)",
      fn: () => {
        const aliases = new Map<string, string>();
        // Simulate 100 model aliases
        for (let i = 0; i < 100; i++) {
          aliases.set(`alias-${i}`, `model-${i}`);
        }
        aliases.get("alias-50");
      },
      iterations: 10000,
    },
    {
      name: "Token estimation (simple)",
      fn: () => {
        const text = "This is a sample text for token estimation testing purposes.";
        Math.ceil(text.length / 4);
      },
      iterations: 100000,
    },
    {
      name: "Cost calculation (single provider)",
      fn: () => {
        const inputTokens = 1000;
        const outputTokens = 500;
        const inputCost = (inputTokens / 1_000_000) * 2.5; // $2.5/M tokens
        const outputCost = (outputTokens / 1_000_000) * 10; // $10/M tokens
        inputCost + outputCost;
      },
      iterations: 100000,
    },
  ],
};

const fallbackBenchmarks: BenchmarkSuite = {
  name: "Provider Fallback Chains",
  benchmarks: [
    {
      name: "Single fallback (1 primary, 1 backup)",
      fn: () => {
        getNextFallback("gpt-4o", []);
        getNextFallback("gpt-4o", ["openai"]);
      },
      iterations: 50000,
    },
    {
      name: "Multi-fallback (1 primary, 3 backups)",
      fn: () => {
        getNextFallback("gpt-4o", []);
        getNextFallback("gpt-4o", ["openai"]);
        getNextFallback("gpt-4o", ["openai", "anthropic"]);
        getNextFallback("gpt-4o", ["openai", "anthropic", "google"]);
      },
      iterations: 25000,
    },
    {
      name: "Exhausted fallback chain",
      fn: () => {
        getNextFallback("gpt-4o", ["openai", "anthropic", "google", "mistral"]);
      },
      iterations: 50000,
    },
    {
      name: "Fallback chain iteration (3 providers)",
      fn: () => {
        const excluded: string[] = [];
        for (let i = 0; i < 3; i++) {
          const next = getNextFallback("gpt-4o", excluded);
          if (next) excluded.push(next);
        }
      },
      iterations: 25000,
    },
  ],
};

const dataStructuresBenchmarks: BenchmarkSuite = {
  name: "Data Structures",
  benchmarks: [
    {
      name: "Array.filter (small, 10 elements)",
      fn: () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        arr.filter((x) => x > 5);
      },
      iterations: 50000,
    },
    {
      name: "Array.filter (medium, 100 elements)",
      fn: () => {
        const arr = Array.from({ length: 100 }, (_, i) => i);
        arr.filter((x) => x > 50);
      },
      iterations: 10000,
    },
    {
      name: "Set.has (small, 10 elements)",
      fn: () => {
        const set = new Set(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);
        set.has("e");
      },
      iterations: 100000,
    },
    {
      name: "Map.has (small, 10 elements)",
      fn: () => {
        const map = new Map<string, string>();
        map.set("a", "1");
        map.set("b", "2");
        map.set("c", "3");
        map.has("b");
      },
      iterations: 100000,
    },
    {
      name: "JSON.parse (simple object)",
      fn: () => {
        JSON.parse('{"model":"gpt-4o","provider":"openai"}');
      },
      iterations: 10000,
    },
    {
      name: "JSON.stringify (simple object)",
      fn: () => {
        JSON.stringify({ model: "gpt-4o", provider: "openai" });
      },
      iterations: 20000,
    },
  ],
};

// ── Test Suite ──────────────────────────────────────────────────────────────

describe("OmniRoute Benchmarks", () => {
  beforeEach(() => {
    // Setup: load policies and register fallback chains
    policyEngine.loadPolicies(testPolicies);

    // Register fallback chains for test models
    resetAllFallbacks();
    registerFallback("gpt-4o", [
      { provider: "openai", priority: 0 },
      { provider: "anthropic", priority: 1 },
      { provider: "google", priority: 2 },
    ]);
    registerFallback("claude-3-5-sonnet", [
      { provider: "anthropic", priority: 0 },
      { provider: "openai", priority: 1 },
    ]);
  });

  describe("Request Routing Performance", () => {
    it("should benchmark policy engine evaluation", async () => {
      const result = await runBenchmark(routingBenchmarks.benchmarks[1]);
      assert.equal(result.success, true);
      // Policy engine should handle 50K+ ops/sec
      assert.ok(result.opsPerSecond > 10000);
    });

    it("should benchmark model pattern matching", async () => {
      const result = await runBenchmark(routingBenchmarks.benchmarks[2]);
      assert.equal(result.success, true);
      // Pattern matching should handle 10K+ ops/sec
      assert.ok(result.opsPerSecond > 10000);
    });
  });

  describe("Model Selection Latency", () => {
    it("should benchmark token estimation", async () => {
      const result = await runBenchmark(modelSelectionBenchmarks.benchmarks[4]);
      assert.equal(result.success, true);
      // Token estimation should be very fast
      assert.ok(result.opsPerSecond > 50000);
    });

    it("should benchmark cost calculation", async () => {
      const result = await runBenchmark(modelSelectionBenchmarks.benchmarks[5]);
      assert.equal(result.success, true);
      assert.ok(result.opsPerSecond > 50000);
    });
  });

  describe("Provider Fallback Chains", () => {
    it("should benchmark fallback chain resolution", async () => {
      const result = await runBenchmark(fallbackBenchmarks.benchmarks[0]);
      assert.equal(result.success, true);
      assert.ok(result.opsPerSecond > 10000);
    });
  });

  describe("Latency Percentiles", () => {
    it("should measure p50/p95/p99 latency for policy evaluation", async () => {
      const result = await runLatencyBenchmark(() => {
        policyEngine.evaluate({ model: "gpt-4o" });
      }, 1000);

      // p99 should be under 1ms for simple policy evaluation
      assert.ok(result.p99 < 1);

      console.log(formatLatencyReport("Policy Evaluation", result));
    });

    it("should measure p50/p95/p99 latency for fallback chain", async () => {
      const result = await runLatencyBenchmark(() => {
        getNextFallback("gpt-4o", []);
      }, 1000);

      assert.ok(result.p99 < 0.5);

      console.log(formatLatencyReport("Fallback Chain", result));
    });
  });

  describe("Full Benchmark Suite", () => {
    it("should run all routing benchmarks", async () => {
      const results = await runBenchmarks([routingBenchmarks]);

      const report = formatBenchmarkReport(results);
      console.log("\n" + report);

      // All should succeed
      assert.ok(results.every((r) => r.success));
    });

    it("should run all model selection benchmarks", async () => {
      const results = await runBenchmarks([modelSelectionBenchmarks]);

      const report = formatBenchmarkReport(results);
      console.log("\n" + report);

      assert.ok(results.every((r) => r.success));
    });

    it("should run all fallback benchmarks", async () => {
      const results = await runBenchmarks([fallbackBenchmarks]);

      const report = formatBenchmarkReport(results);
      console.log("\n" + report);

      assert.ok(results.every((r) => r.success));
    });

    it("should run all data structure benchmarks", async () => {
      const results = await runBenchmarks([dataStructuresBenchmarks]);

      const report = formatBenchmarkReport(results);
      console.log("\n" + report);

      assert.ok(results.every((r) => r.success));
    });
  });
});

// ── Performance Targets (from plan) ────────────────────────────────────────
//
// | Scenario          | Target     |
// |-------------------|------------|
// | Route Only        | <5ms       |
// | With Model Select | <50ms      |
// | 100 RPS           | <200ms p99 |
// | 500 RPS           | <500ms p99 |
