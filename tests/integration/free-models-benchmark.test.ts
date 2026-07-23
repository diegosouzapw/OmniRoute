/**
 * tests/integration/free-models-benchmark.test.ts
 *
 * Live benchmark: how well do the free-tier models OmniRoute exposes handle
 * a representative slice of the general workload (the same CASE_BUILDERS
 * used by live-gemini-workload.test.ts)? Unlike the pass/fail live-gemini
 * suite, this is a report, not a gate — free-tier providers are expected to
 * be flakier than paid ones (rate limits, capacity, ToS-ambiguous
 * availability per freeModelCatalog.data.ts), so a single model performing
 * badly is a benchmark finding, not a regression. Only a total outage across
 * every model (the harness itself broken) fails the test.
 *
 * Environment:
 *   OMNIROUTE_API_KEY  — required (else test skips)
 *   OMNIROUTE_URL      — defaults to http://localhost:3000
 *
 * Models benchmarked are restricted to providers with an active connection
 * on this deployment (checked live via GET /api/providers) — see
 * FREE_MODELS in freeModelBenchmarkShared.ts for the full candidate list and
 * how it was curated from open-sse/config/freeModelCatalog.data.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { skip, ensureTestEnvironment } from "./liveGeminiShared.ts";
import {
  FREE_MODELS,
  BENCHMARK_CASES,
  getActiveProviders,
  benchmarkRequest,
  summarize,
  formatBenchmarkTable,
  type BenchmarkResult,
  type ModelBenchmarkSummary,
} from "./freeModelBenchmarkShared.ts";

const DELAY_BETWEEN_REQUESTS_MS = Number(process.env.TEST_DELAY_MS) || 2000;
const DELAY_BETWEEN_MODELS_MS = 3000;

test.before(async () => {
  await ensureTestEnvironment();
});

test(
  "free-model workload benchmark: representative CASE_BUILDERS slice per model",
  { skip },
  async () => {
    const activeProviders = await getActiveProviders();
    const candidates = FREE_MODELS.filter((spec) => activeProviders.has(spec.provider));
    const skipped = FREE_MODELS.filter((spec) => !activeProviders.has(spec.provider));

    if (skipped.length > 0) {
      console.log(
        `\n  [setup] skipping ${skipped.length} model(s) — provider not active: ` +
          skipped.map((s) => s.provider).join(", ")
      );
    }

    if (candidates.length === 0) {
      console.log("  [skip] no configured providers match FREE_MODELS — nothing to benchmark");
      return;
    }

    console.log(
      `\n  Benchmarking ${candidates.length} free model(s) × ${BENCHMARK_CASES.length} workload case(s) ` +
        `= ${candidates.length * BENCHMARK_CASES.length} requests\n`
    );

    const summaries: ModelBenchmarkSummary[] = [];

    for (const spec of candidates) {
      const results: BenchmarkResult[] = [];

      for (let i = 0; i < BENCHMARK_CASES.length; i++) {
        const tc = BENCHMARK_CASES[i];
        if (i > 0) await new Promise((r) => setTimeout(r, DELAY_BETWEEN_REQUESTS_MS));

        const r = await benchmarkRequest(spec, tc.name, tc.build);
        results.push(r);

        const status = r.ok ? "OK  " : "FAIL";
        console.log(
          `  [${status}] ${spec.displayName.padEnd(38)} ${tc.name.padEnd(35)} ` +
            `HTTP ${r.status} | ${r.durationMs}ms | ${r.tokens} tok` +
            (r.error ? ` | ${r.error}` : "")
        );
      }

      summaries.push(summarize(spec, results));
      await new Promise((r) => setTimeout(r, DELAY_BETWEEN_MODELS_MS));
    }

    console.log(formatBenchmarkTable(summaries));

    const totalAttempted = summaries.reduce((s, m) => s + m.attempted, 0);
    const totalSucceeded = summaries.reduce((s, m) => s + m.succeeded, 0);
    console.log(
      `\n  Overall: ${totalSucceeded}/${totalAttempted} requests succeeded across ${summaries.length} models\n`
    );

    // Only a total-outage catches a real regression here — free-tier providers
    // are individually allowed to be unreliable (that's the finding, not a
    // bug), but a harness-wide 0% success rate means the benchmark itself (or
    // OmniRoute's routing) is broken, not that every free provider failed at
    // once.
    assert.ok(
      totalSucceeded > 0,
      `every one of ${totalAttempted} requests across ${summaries.length} models failed — ` +
        `likely a harness or routing bug, not free-tier flakiness`
    );
  }
);
