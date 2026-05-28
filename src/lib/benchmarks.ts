/**
 * OmniRoute Benchmarks
 *
 * Micro-benchmarks for measuring core routing and model selection performance.
 * Run with: npx vitest run tests/unit/benchmarks.test.ts
 *
 * @module lib/benchmarks
 */

export interface BenchmarkResult {
  name: string;
  durationNs: number;
  opsPerSecond: number;
  memoryBytes: number;
  success: boolean;
  p50?: number;
  p95?: number;
  p99?: number;
}

export interface BenchmarkSuite {
  name: string;
  benchmarks: BenchmarkDefinition[];
}

export interface BenchmarkDefinition {
  name: string;
  fn: () => void | Promise<void>;
  warmupIterations?: number;
  iterations?: number;
}

/**
 * Run a single benchmark with timing
 */
export async function runBenchmark(def: BenchmarkDefinition): Promise<BenchmarkResult> {
  const iterations = def.iterations ?? 10000;
  const warmupIterations = def.warmupIterations ?? 100;

  // Warmup
  for (let i = 0; i < warmupIterations; i++) {
    await def.fn();
  }

  // Timed run
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    await def.fn();
  }
  const end = performance.now();

  const durationNs = (end - start) * 1_000_000;
  const opsPerSecond = (iterations / (end - start)) * 1000;

  return {
    name: def.name,
    durationNs,
    opsPerSecond,
    memoryBytes: 0,
    success: true,
  };
}

/**
 * Run all benchmarks and return results
 */
export async function runBenchmarks(suites: BenchmarkSuite[]): Promise<BenchmarkResult[]> {
  const results: BenchmarkResult[] = [];

  for (const suite of suites) {
    console.log(`\n📊 Running ${suite.name} benchmarks...`);
    for (const bench of suite.benchmarks) {
      try {
        const result = await runBenchmark(bench);
        results.push(result);
        const opsStr =
          result.opsPerSecond >= 1_000_000
            ? `${(result.opsPerSecond / 1_000_000).toFixed(2)}M`
            : result.opsPerSecond >= 1000
              ? `${(result.opsPerSecond / 1000).toFixed(2)}K`
              : result.opsPerSecond.toFixed(2);
        console.log(`  ✓ ${bench.name}: ${opsStr} ops/s`);
      } catch (err) {
        results.push({
          name: bench.name,
          durationNs: 0,
          opsPerSecond: 0,
          memoryBytes: 0,
          success: false,
        });
        console.error(`  ✗ ${bench.name}: ${err}`);
      }
    }
  }

  return results;
}

/**
 * Run multiple iterations and collect latency percentiles
 */
export async function runLatencyBenchmark(
  fn: () => void | Promise<void>,
  iterations: number = 1000
): Promise<{ p50: number; p95: number; p99: number; opsPerSecond: number }> {
  const latencies: number[] = [];

  // Warmup
  for (let i = 0; i < 100; i++) {
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
    p50,
    p95,
    p99,
    opsPerSecond: 1000 / avg,
  };
}

/**
 * Format benchmark results as a markdown table
 */
export function formatBenchmarkReport(results: BenchmarkResult[]): string {
  const lines = [
    "| Benchmark | Duration (ms) | Ops/sec | Status |",
    "|-----------|---------------|---------|--------|",
  ];

  for (const r of results) {
    const durationMs = (r.durationNs / 1_000_000).toFixed(4);
    const opsStr =
      r.opsPerSecond >= 1_000_000
        ? `${(r.opsPerSecond / 1_000_000).toFixed(2)}M`
        : r.opsPerSecond >= 1000
          ? `${(r.opsPerSecond / 1000).toFixed(2)}K`
          : r.opsPerSecond.toFixed(2);
    const status = r.success ? "✅" : "❌";

    lines.push(`| ${r.name} | ${durationMs} | ${opsStr} | ${status} |`);
  }

  return lines.join("\n");
}

/**
 * Format latency report with percentiles
 */
export function formatLatencyReport(
  name: string,
  result: { p50: number; p95: number; p99: number; opsPerSecond: number }
): string {
  return `${name}:
  p50: ${result.p50.toFixed(3)}ms
  p95: ${result.p95.toFixed(3)}ms
  p99: ${result.p99.toFixed(3)}ms
  ops/s: ${result.opsPerSecond.toFixed(2)}`;
}

// Re-export for backwards compatibility
export { runBenchmarks as default };
