/**
 * OmniRoute Benchmarks Runner
 *
 * Standalone benchmark runner using Node.js performance API.
 * Run with: node --import tsx/esm scripts/run-benchmarks.mjs
 */

import { performance } from "node:perf_hooks";

// Import routing components
import { PolicyEngine } from "../src/domain/policyEngine.js";
import {
  registerFallback,
  resolveFallbackChain,
  getNextFallback,
  hasFallback,
  resetAllFallbacks,
} from "../src/domain/fallbackPolicy.js";

// ── Setup ────────────────────────────────────────────────────────────────────

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

// ── Benchmark Framework ──────────────────────────────────────────────────────

async function runBenchmark(name, fn, iterations = 10000) {
  const latencies = [];
  const warmupIterations = 100;

  // Warmup
  for (let i = 0; i < warmupIterations; i++) {
    await fn();
  }

  // Measure
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await fn();
    const end = performance.now();
    latencies.push(end - start);
  }

  latencies.sort((a, b) => a - b);

  const p50 = latencies[Math.floor(iterations * 0.5)];
  const p95 = latencies[Math.floor(iterations * 0.95)];
  const p99 = latencies[Math.floor(iterations * 0.99)];
  const avg = latencies.reduce((a, b) => a + b, 0) / iterations;

  return {
    name,
    opsPerSecond: 1000 / avg,
    p50,
    p95,
    p99,
  };
}

function formatResult(r) {
  const opsStr =
    r.opsPerSecond >= 1_000_000
      ? `${(r.opsPerSecond / 1_000_000).toFixed(2)}M`
      : r.opsPerSecond >= 1000
        ? `${(r.opsPerSecond / 1000).toFixed(2)}K`
        : r.opsPerSecond.toFixed(2);

  return `${r.name.padEnd(50)} ${opsStr.padStart(12)} ops/s  p50=${r.p50.toFixed(3)}ms  p95=${r.p95.toFixed(3)}ms  p99=${r.p99.toFixed(3)}ms`;
}

// ── Benchmarks ───────────────────────────────────────────────────────────────

async function runAllBenchmarks() {
  console.log("\n📊 OmniRoute Benchmarks");
  console.log("═".repeat(120));

  // Setup
  policyEngine.loadPolicies(testPolicies);
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

  const results = [];

  // ── Request Routing ─────────────────────────────────────────────────────
  console.log("\n🔀 Request Routing");
  console.log("─".repeat(120));

  results.push(
    await runBenchmark("PolicyEngine.evaluate (no policies)", () => {
      const engine = new PolicyEngine();
      engine.evaluate({ model: "gpt-4o" });
    })
  );

  results.push(
    await runBenchmark("PolicyEngine.evaluate (4 policies)", () => {
      policyEngine.evaluate({ model: "gpt-4o" });
    })
  );

  results.push(
    await runBenchmark("PolicyEngine.evaluate (claude pattern)", () => {
      policyEngine.evaluate({ model: "claude-3-5-sonnet" });
    })
  );

  results.push(
    await runBenchmark("Fallback chain resolution", () => {
      resolveFallbackChain("gpt-4o");
    })
  );

  results.push(
    await runBenchmark("Get next fallback", () => {
      getNextFallback("gpt-4o", []);
    })
  );

  results.push(
    await runBenchmark("Has fallback check", () => {
      hasFallback("gpt-4o");
    })
  );

  // ── Model Selection ─────────────────────────────────────────────────────
  console.log("\n🎯 Model Selection");
  console.log("─".repeat(120));

  results.push(
    await runBenchmark("String comparison (exact match)", () => {
      const model = "gpt-4o";
      model === "gpt-4o" || model === "claude-3-5-sonnet";
    })
  );

  results.push(
    await runBenchmark("String comparison (prefix match)", () => {
      const model = "claude-3-5-sonnet";
      model.startsWith("claude-");
    })
  );

  results.push(
    await runBenchmark("Token estimation (simple)", () => {
      const text = "This is a sample text for token estimation testing purposes.";
      Math.ceil(text.length / 4);
    })
  );

  results.push(
    await runBenchmark("Cost calculation (single provider)", () => {
      const inputTokens = 1000;
      const outputTokens = 500;
      const inputCost = (inputTokens / 1_000_000) * 2.5;
      const outputCost = (outputTokens / 1_000_000) * 10;
      inputCost + outputCost;
    })
  );

  // ── Provider Fallback Chains ────────────────────────────────────────────
  console.log("\n🔄 Provider Fallback Chains");
  console.log("─".repeat(120));

  results.push(
    await runBenchmark("Single fallback (1 primary, 1 backup)", () => {
      getNextFallback("gpt-4o", []);
      getNextFallback("gpt-4o", ["openai"]);
    })
  );

  results.push(
    await runBenchmark("Multi-fallback (1 primary, 3 backups)", () => {
      getNextFallback("gpt-4o", []);
      getNextFallback("gpt-4o", ["openai"]);
      getNextFallback("gpt-4o", ["openai", "anthropic"]);
    })
  );

  // ── Data Structures ─────────────────────────────────────────────────────
  console.log("\n📦 Data Structures");
  console.log("─".repeat(120));

  results.push(
    await runBenchmark("Map.get (10 elements)", () => {
      const map = new Map();
      map.set("gpt-4o", "openai");
      map.set("claude-3-5-sonnet", "anthropic");
      map.get("gpt-4o");
    })
  );

  results.push(
    await runBenchmark("Array.filter (10 elements)", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      arr.filter((x) => x > 5);
    })
  );

  results.push(
    await runBenchmark("Set.has (10 elements)", () => {
      const set = new Set(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);
      set.has("e");
    })
  );

  results.push(
    await runBenchmark("JSON.parse (simple object)", () => {
      JSON.parse('{"model":"gpt-4o","provider":"openai"}');
    })
  );

  results.push(
    await runBenchmark("JSON.stringify (simple object)", () => {
      JSON.stringify({ model: "gpt-4o", provider: "openai" });
    })
  );

  // ── Summary ────────────────────────────────────────────────────────────
  console.log("\n📈 Results Summary");
  console.log("═".repeat(120));
  for (const r of results) {
    console.log(formatResult(r));
  }

  // Save results
  const timestamp = new Date().toISOString().split("T")[0];
  const fs = await import("node:fs");
  const resultsDir = new URL("../benches/results", import.meta.url);
  fs.mkdirSync(resultsDir, { recursive: true });
  const resultsFile = new URL(`${timestamp}-routing-benchmarks.json`, resultsDir);
  fs.writeFileSync(resultsFile, JSON.stringify({ timestamp, results }, null, 2));
  console.log(`\n✅ Results saved to: ${resultsFile.pathname}`);

  return results;
}

runAllBenchmarks().catch(console.error);
