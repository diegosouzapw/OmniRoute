/**
 * tests/integration/aihorde-load-test.test.ts
 *
 * Deeper load test for AI Horde (aihorde.net) — a free, crowdsourced,
 * kudos-priority-queued inference network — asking whether it's viable as
 * an addition/alternative to the "default" combo (currently 2 Gemini
 * gemma-4 targets, see DEFAULT_COMBO_CONFIG in liveGeminiShared.ts).
 * Anonymous access (key "0000000000") gets the LOWEST queue priority and
 * 0 starting kudos, so this specifically probes whether that translates to
 * unacceptable latency/reliability for combo-style traffic, or whether it
 * holds up.
 *
 * Three angles, all against the anonymous no-auth `aihorde` provider:
 *   1. Sequential reliability — all 25 CASE_BUILDERS, one at a time, with
 *      full latency distribution (p50/p90/max) on gemma-4-31b (the same
 *      model family the real "default" combo runs, for a fair comparison).
 *   2. Concurrent load — does firing several requests at once cause queue
 *      pile-up/timeouts, given combo routing doesn't pace requests apart?
 *   3. Cross-model spot-check — same handful of cases against the other 2
 *      viable aihorde models, since a combo pool needs multiple healthy
 *      targets, not just one.
 *
 * Report, not a gate: kudos-priority queueing is a genuine, permanent
 * property of anonymous AI Horde access, not a bug — a model or two being
 * slow is data for the "is this viable" question, not a regression.
 *
 * Environment:
 *   OMNIROUTE_API_KEY  — required (else test skips)
 *   OMNIROUTE_URL      — defaults to http://localhost:3000
 */
import test from "node:test";
import assert from "node:assert/strict";

import { skip, CASE_BUILDERS, ensureTestEnvironment } from "./liveGeminiShared.ts";
import {
  benchmarkRequest,
  benchmarkTpmStress,
  summarize,
  formatBenchmarkTable,
  BENCHMARK_CASES,
  type FreeModelSpec,
  type BenchmarkResult,
  type ModelBenchmarkSummary,
} from "./freeModelBenchmarkShared.ts";

const GEMMA_4 = {
  provider: "aihorde",
  model: "aihorde/google/gemma-4-31b",
  displayName: "Gemma 4 31B (AI Horde)",
};
const OTHER_MODELS: FreeModelSpec[] = [
  {
    provider: "aihorde",
    model: "aihorde/aphrodite/TheDrummer/Cydonia-24B-v4.3",
    displayName: "Cydonia 24B (AI Horde)",
  },
  {
    provider: "aihorde",
    model: "aihorde/aphrodite/TheDrummer/Skyfall-31B-v4.2",
    displayName: "Skyfall 31B (AI Horde)",
  },
];

// Bigger/more-capable candidates found via AI Horde's live status API
// (https://aihorde.net/api/v2/status/models?type=text — the 3 models above
// are just a static passthrough-discovery fallback, not the full live
// roster). Behemoth-X-123B has a healthy 8-worker pool; deepseek-v4-flash
// is the real DeepSeek V4 family but only had 1 worker online at discovery
// time, so expect it to be the fragile one of the two.
const NEW_CAPABLE_MODELS: FreeModelSpec[] = [
  {
    provider: "aihorde",
    model: "aihorde/aphrodite/TheDrummer/Behemoth-X-123B-v2.1",
    displayName: "Behemoth-X 123B (AI Horde)",
  },
  {
    provider: "aihorde",
    model: "aihorde/deepseek/deepseek-v4-flash",
    displayName: "DeepSeek V4 Flash (AI Horde)",
  },
];

const CONCURRENT_THREADS = 4;
const SPOT_CHECK_CASE_COUNT = 4;

test.before(async () => {
  await ensureTestEnvironment();
});

function percentile(sortedMs: number[], p: number): number {
  if (sortedMs.length === 0) return 0;
  const idx = Math.min(sortedMs.length - 1, Math.ceil((p / 100) * sortedMs.length) - 1);
  return sortedMs[Math.max(0, idx)];
}

test(
  "AI Horde: sequential reliability across all 25 workload cases (gemma-4-31b)",
  { skip },
  async () => {
    console.log(
      `\n  AI Horde sequential: ${CASE_BUILDERS.length} cases, anonymous key, gemma-4-31b\n`
    );

    const results: BenchmarkResult[] = [];
    for (const tc of CASE_BUILDERS) {
      const r = await benchmarkRequest(GEMMA_4, tc.name, tc.build, 90_000);
      results.push(r);
      console.log(
        `  [${r.ok ? "OK  " : "FAIL"}] ${tc.name.padEnd(40)} HTTP ${r.status} | ${r.durationMs}ms | ${r.tokens} tok` +
          (r.error ? ` | ${r.error}` : "")
      );
    }

    const succeeded = results.filter((r) => r.ok);
    const durations = results.map((r) => r.durationMs).sort((a, b) => a - b);
    const successRate = Math.round((succeeded.length / results.length) * 100);

    console.log(
      `\n  Sequential summary: ${succeeded.length}/${results.length} succeeded (${successRate}%) | ` +
        `p50=${percentile(durations, 50)}ms p90=${percentile(durations, 90)}ms max=${durations[durations.length - 1]}ms\n`
    );

    assert.ok(
      succeeded.length > 0,
      "every sequential request failed — likely a harness/routing bug"
    );
  }
);

test(
  "AI Horde: concurrent load — does anonymous queueing degrade under parallel requests?",
  { skip },
  async () => {
    console.log(
      `\n  AI Horde concurrent: ${CONCURRENT_THREADS} parallel requests, anonymous key, gemma-4-31b\n`
    );

    const start = performance.now();
    const results = await Promise.all(
      Array.from({ length: CONCURRENT_THREADS }, (_, i) =>
        benchmarkRequest(
          GEMMA_4,
          `concurrent-${i + 1}`,
          () => CASE_BUILDERS[i % CASE_BUILDERS.length].build(),
          120_000
        )
      )
    );
    const wallClockMs = Math.round(performance.now() - start);

    for (const r of results) {
      console.log(
        `  [${r.ok ? "OK  " : "FAIL"}] ${r.case.padEnd(20)} HTTP ${r.status} | ${r.durationMs}ms | ${r.tokens} tok` +
          (r.error ? ` | ${r.error}` : "")
      );
    }

    const succeeded = results.filter((r) => r.ok);
    console.log(
      `\n  Concurrent summary: ${succeeded.length}/${results.length} succeeded | ${wallClockMs}ms wall clock ` +
        `(vs sum of individual durations: ${results.reduce((s, r) => s + r.durationMs, 0)}ms — a wall clock close to ` +
        `the sum means requests queued rather than ran in parallel)\n`
    );

    assert.ok(
      succeeded.length > 0,
      "every concurrent request failed — likely a harness/routing bug"
    );
  }
);

test(
  "AI Horde: cross-model spot-check — is more than one model viable for a combo pool?",
  { skip },
  async () => {
    console.log(
      `\n  AI Horde cross-model: ${OTHER_MODELS.length} models × ${SPOT_CHECK_CASE_COUNT} cases\n`
    );

    for (const spec of OTHER_MODELS) {
      const results: BenchmarkResult[] = [];
      for (let i = 0; i < SPOT_CHECK_CASE_COUNT; i++) {
        const tc = CASE_BUILDERS[i];
        const r = await benchmarkRequest(spec, tc.name, tc.build, 90_000);
        results.push(r);
        console.log(
          `  [${r.ok ? "OK  " : "FAIL"}] ${spec.displayName.padEnd(28)} ${tc.name.padEnd(35)} ` +
            `HTTP ${r.status} | ${r.durationMs}ms | ${r.tokens} tok` +
            (r.error ? ` | ${r.error}` : "")
        );
      }
      const succeeded = results.filter((r) => r.ok).length;
      console.log(`  --> ${spec.displayName}: ${succeeded}/${results.length} succeeded\n`);
    }
  }
);

// #note: a live smoke test showed aihorde/google/gemma-4-31b narrates tool
// calls in plain text ("`write_file` with `path=...`") instead of emitting a
// real tool_calls array, finish_reason "stop" — no native/emulated
// tool-calling support for this model through OmniRoute today. A genuine
// tool-calling "agentic loop" (like live-gemini-agentic-loop.test.ts) isn't
// viable here, so this asks the underlying question directly instead: can
// AI Horde sustain ~60k tokens/minute of large-context throughput, the kind
// of volume a real agentic session's growing context would generate?
const SUSTAINED_TARGET_TOKENS_PER_PROMPT = 13_000;
const SUSTAINED_ROUNDS = 5; // 5 × 13k ≈ 65k tokens sent, back-to-back

test(
  "AI Horde: sustained large-context throughput — can it hit ~60k tokens/minute?",
  { skip },
  async () => {
    console.log(
      `\n  AI Horde sustained throughput: ${SUSTAINED_ROUNDS} × ~${SUSTAINED_TARGET_TOKENS_PER_PROMPT} ` +
        `estimated-token prompts, back-to-back, targeting ~60k tokens/minute\n`
    );

    const start = performance.now();
    const results = await benchmarkTpmStress(
      GEMMA_4,
      SUSTAINED_TARGET_TOKENS_PER_PROMPT,
      SUSTAINED_ROUNDS,
      120_000
    );
    const wallClockMs = Math.round(performance.now() - start);

    for (const r of results) {
      console.log(
        `  [${r.ok ? "OK  " : "FAIL"}] ${r.case.padEnd(45)} HTTP ${r.status} | ${r.durationMs}ms | ${r.tokens} tok` +
          (r.error ? ` | ${r.error}` : "")
      );
    }

    const succeeded = results.filter((r) => r.ok);
    // AI Horde doesn't report usage tokens (confirmed 0 across every prior test
    // in this file), so use the same ~4 chars/token estimate genHugeContextMessage
    // itself is built on, applied to every ATTEMPTED prompt (not just successful
    // ones) — an attempted-but-failed send still occupied the queue's time.
    const estimatedTokensSent = results.length * SUSTAINED_TARGET_TOKENS_PER_PROMPT;
    const achievedTpm = Math.round((estimatedTokensSent / wallClockMs) * 60_000);

    console.log(
      `\n  Sustained summary: ${succeeded.length}/${results.length} succeeded | ${wallClockMs}ms wall clock | ` +
        `~${estimatedTokensSent} tokens sent | achieved ~${achievedTpm} tokens/minute ` +
        `(target: 60000)\n`
    );

    assert.ok(
      succeeded.length > 0,
      "every sustained-throughput request failed — likely a harness/routing bug"
    );
  }
);

test(
  "AI Horde: new capable model candidates — workload test (Behemoth-X 123B, DeepSeek V4 Flash)",
  { skip },
  async () => {
    console.log(
      `\n  AI Horde new candidates: ${NEW_CAPABLE_MODELS.length} models × ${BENCHMARK_CASES.length} workload case(s) ` +
        `— the same 5-case slice every other benchmarked model was run through, for a direct comparison\n`
    );

    const summaries: ModelBenchmarkSummary[] = [];

    for (const spec of NEW_CAPABLE_MODELS) {
      const results: BenchmarkResult[] = [];
      for (const tc of BENCHMARK_CASES) {
        const r = await benchmarkRequest(spec, tc.name, tc.build, 120_000);
        results.push(r);
        console.log(
          `  [${r.ok ? "OK  " : "FAIL"}] ${spec.displayName.padEnd(30)} ${tc.name.padEnd(35)} ` +
            `HTTP ${r.status} | ${r.durationMs}ms | ${r.tokens} tok` +
            (r.error ? ` | ${r.error}` : "")
        );
      }
      summaries.push(summarize(spec, results));
    }

    console.log(formatBenchmarkTable(summaries));

    const totalSucceeded = summaries.reduce((s, m) => s + m.succeeded, 0);
    assert.ok(
      totalSucceeded > 0,
      "every request to both new candidates failed — likely a harness/routing bug"
    );
  }
);
