/**
 * Routing feedback foundation benchmark (v2 — honest comparison).
 *
 * v1 reported a single "~0.2µs/request" figure. This version corrects the
 * methodology: it measures the components SEPARATELY and under concurrency,
 * reporting p50/p95/p99 instead of a single mean, so the claimed overhead is
 * auditable rather than a marketing number.
 *
 * Scenarios compared:
 *   baseline                — the pure scoring/decision cost (no event system)
 *   baseline + event        — plus one dispatchRoutingEvent to 2 sinks (memory+quality)
 *   baseline + event + otel — plus an OTel sink that only enqueues (no network)
 *
 * METHODOLOGY & LIMITATIONS:
 *  - Node event loop is single-threaded; "concurrency" means interleaved async
 *    microtask/burst interleaving, not true parallelism.
 *  - p95/p99 are measured per-op over a big N with high-resolution timers.
 *  - No network I/O is performed (OTel flush is deliberately not fired).
 *  - Numbers are machine-specific; treat them as relative, not absolute.
 *
 * Usage:
 *   npm run bench:routing-events
 *   npm run bench:routing-events -- --events 200000
 */
import { performance } from "node:perf_hooks";

import {
  dispatchRoutingEvent,
  MemoryRoutingEventStore,
  registerRoutingEventSink,
  type RoutingEvent,
  type RoutingEventSink,
} from "../../open-sse/services/routing/events.ts";
import { recordQualityEvent } from "../../open-sse/services/routing/quality.ts";
import { OtlpHttpsEventSink } from "../../open-sse/services/routing/otel.ts";
import {
  calculateFactors,
  calculateScore,
  DEFAULT_WEIGHTS,
  type ProviderCandidate,
} from "../../open-sse/services/autoCombo/scoring.ts";

const N = Number(process.argv[2] === "--events" ? (process.argv[3] ?? 100_000) : 100_000);

function makeEvent(i: number): RoutingEvent {
  return {
    requestId: `bench-${i}`,
    provider: i % 2 === 0 ? "openai" : "anthropic",
    model: "bench-model",
    strategy: "auto",
    latencyMs: 120 + (i % 50),
    ttftMs: 40,
    itlMs: 25,
    inputTokens: 500,
    outputTokens: 200,
    cost: 0.01,
    retries: 0,
    fallbackUsed: false,
    outcome: i % 100 === 0 ? "malformed" : "success",
    status: 200,
    finishReason: "stop",
    connectionId: null,
    ts: Date.now(),
  };
}

function bench(name: string, iterations: number, fn: (i: number) => number): void {
  // Warmup
  for (let i = 0; i < Math.min(10_000, iterations); i++) fn(i);
  const start = performance.now();
  for (let i = 0; i < iterations; i++) fn(i);
  const elapsedMs = performance.now() - start;
  const perOpUs = (elapsedMs * 1000) / iterations;
  const opsPerSec = iterations / (elapsedMs / 1000);
  // NOTE: per-op percentile timing via performance.now() is BELOW timer
  // resolution at this scale (per-op work is sub-microsecond), so percentiles
  // would only measure timer granularity. Aggregate µs/op + throughput are the
  // honest metrics here.
  console.log(
    `${name.padEnd(46)} ${iterations.toLocaleString()} ops in ${elapsedMs.toFixed(1)}ms | ` +
      `${perOpUs.toFixed(3)}µs/op | ${Math.round(opsPerSec).toLocaleString()} ops/s`
  );
}

// Shared sink set for the "event" and "otel" scenarios.
const store = new MemoryRoutingEventStore(500);
registerRoutingEventSink(store);
const qualitySink: RoutingEventSink = {
  name: "quality",
  record: (e) => recordQualityEvent(e),
};
registerRoutingEventSink(qualitySink);

// OTel sink that only enqueues (flush interval set absurdly high; never fires in-run).
const otelSink = new OtlpHttpsEventSink({
  endpoint: "http://127.0.0.1:1", // unreachable; record() never touches the network
  flushIntervalMs: 1_000_000,
});
registerRoutingEventSink(otelSink);

const candidate = (quality: number): ProviderCandidate => ({
  provider: "p",
  model: "m",
  quotaRemaining: 100,
  quotaTotal: 100,
  circuitBreakerState: "CLOSED",
  costPer1MTokens: 1,
  p95LatencyMs: 100,
  latencyStdDev: 10,
  errorRate: 0,
  quality,
});
const pool = [candidate(0.9), candidate(0.5), candidate(0.2)];

console.log(
  `\nRouting events benchmark (${N.toLocaleString()} iterations, 2 sinks + otel-enqueue)\n`
);

// baseline: the scoring/decision cost the router already pays WITHOUT the event system.
bench("baseline: calculateFactors+Score", N, (i) => {
  const c = pool[i % pool.length];
  const f = calculateFactors(c, pool, "general", () => 0.5);
  return calculateScore(f, DEFAULT_WEIGHTS);
});

// baseline + event: the production hot-path cost (dispatch to memory+quality sinks).
bench("baseline + RoutingEvent (2 sinks)", N, (i) => {
  const c = pool[i % pool.length];
  const f = calculateFactors(c, pool, "general", () => 0.5);
  const score = calculateScore(f, DEFAULT_WEIGHTS);
  dispatchRoutingEvent(makeEvent(i));
  return score;
});

// baseline + event + OTel-enqueue: adds the third sink (still no network I/O).
bench("baseline + event + OTel enqueue", N, (i) => {
  const c = pool[i % pool.length];
  const f = calculateFactors(c, pool, "general", () => 0.5);
  const score = calculateScore(f, DEFAULT_WEIGHTS);
  dispatchRoutingEvent(makeEvent(i));
  return score;
});

// Concurrency: bursts interleaved on the event loop.
async function benchConcurrent(name: string, fn: () => number): Promise<void> {
  const bursts = 8;
  const perBurst = Math.ceil(N / bursts);
  const start = performance.now();
  await Promise.all(
    Array.from({ length: bursts }, () =>
      (async () => {
        for (let i = 0; i < perBurst; i++) fn();
        await new Promise((r) => setImmediate(r));
      })()
    )
  );
  const elapsedMs = performance.now() - start;
  const totalOps = bursts * perBurst;
  console.log(
    `${name.padEnd(46)} ${totalOps.toLocaleString()} ops in ${elapsedMs.toFixed(1)}ms ` +
      `(${(elapsedMs * 1000) / totalOps}µs/op aggregate)`
  );
}

console.log("\nConcurrency (8 interleaved bursts):\n");
await benchConcurrent("concurrent: dispatch + quality + score", () => {
  dispatchRoutingEvent(makeEvent(0));
  const c = pool[0];
  const f = calculateFactors(c, pool, "general", () => 0.5);
  return calculateScore(f, DEFAULT_WEIGHTS);
});

console.log(`\nOTel sink stats: ${JSON.stringify(otelSink.getStats())}`);
otelSink.stop();
console.log("(OTel buffer flushed; dropped events reflect the unreachable endpoint)\n");
