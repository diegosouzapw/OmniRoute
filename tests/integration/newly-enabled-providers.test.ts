/**
 * tests/integration/newly-enabled-providers.test.ts
 *
 * Workload benchmark for the batch of models the operator enabled on
 * 2026-07-22: a new Cerebras key, "free"-tagged OpenRouter models, and
 * OpenCode Zen's currently-live free roster. Uses the same 5-case
 * BENCHMARK_CASES slice every other model in freeModelBenchmarkShared.ts was
 * run through, for a direct, apples-to-apples comparison.
 *
 * Report, not a gate. Note from building this list: several of these models
 * are reasoning-heavy and looked "broken" (502 upstream_empty_response) under
 * a small max_tokens — the reasoning field alone consumed the whole budget
 * before any content was produced. All resolved cleanly once given a
 * realistic budget (this file uses benchmarkRequest's default, 2048) — none
 * of the models below are actually dead. OpenCode's *static* catalog had
 * drifted though: several previously-cataloged free model IDs (e.g.
 * minimax-m2.5-free, ling-2.6-1t-free) no longer exist upstream at all
 * (401) — the list here was refetched live from
 * https://opencode.ai/zen/v1/models instead of trusting the stale catalog.
 * Cerebras itself is excluded here: the new key hits a live 402 Payment
 * Required (account/billing issue, not testable from this deployment) — the
 * only 2 models it has (gpt-oss-120b, zai-glm-4.7) both hit the same
 * account-wide block, confirmed on retry.
 *
 * Environment:
 *   OMNIROUTE_API_KEY  — required (else test skips)
 *   OMNIROUTE_URL      — defaults to http://localhost:3000
 */
import test from "node:test";
import assert from "node:assert/strict";

import { skip, ensureTestEnvironment } from "./liveGeminiShared.ts";
import {
  NEWLY_ENABLED_MODELS,
  BENCHMARK_CASES,
  getActiveProviders,
  benchmarkRequest,
  summarize,
  formatBenchmarkTable,
  type BenchmarkResult,
  type ModelBenchmarkSummary,
} from "./freeModelBenchmarkShared.ts";

test.before(async () => {
  await ensureTestEnvironment();
});

test("newly-enabled providers: workload benchmark (2026-07-22 batch)", { skip }, async () => {
  const activeProviders = await getActiveProviders();
  const candidates = NEWLY_ENABLED_MODELS.filter((spec) => activeProviders.has(spec.provider));
  const skipped = NEWLY_ENABLED_MODELS.filter((spec) => !activeProviders.has(spec.provider));

  if (skipped.length > 0) {
    console.log(
      `\n  [setup] skipping ${skipped.length} model(s) — provider not active: ` +
        skipped.map((s) => s.provider).join(", ")
    );
  }

  if (candidates.length === 0) {
    console.log(
      "  [skip] no configured providers match NEWLY_ENABLED_MODELS — nothing to benchmark"
    );
    return;
  }

  console.log(
    `\n  Benchmarking ${candidates.length} newly-enabled model(s) × ${BENCHMARK_CASES.length} workload case(s) ` +
      `= ${candidates.length * BENCHMARK_CASES.length} requests\n`
  );

  const summaries: ModelBenchmarkSummary[] = [];

  for (const spec of candidates) {
    const results: BenchmarkResult[] = [];

    for (let i = 0; i < BENCHMARK_CASES.length; i++) {
      const tc = BENCHMARK_CASES[i];
      if (i > 0) await new Promise((r) => setTimeout(r, 2000));

      const r = await benchmarkRequest(spec, tc.name, tc.build, 60_000);
      results.push(r);

      const status = r.ok ? "OK  " : "FAIL";
      console.log(
        `  [${status}] ${spec.displayName.padEnd(45)} ${tc.name.padEnd(35)} ` +
          `HTTP ${r.status} | ${r.durationMs}ms | ${r.tokens} tok` +
          (r.error ? ` | ${r.error}` : "")
      );
    }

    summaries.push(summarize(spec, results));
    await new Promise((r) => setTimeout(r, 3000));
  }

  console.log(formatBenchmarkTable(summaries));

  const totalAttempted = summaries.reduce((s, m) => s + m.attempted, 0);
  const totalSucceeded = summaries.reduce((s, m) => s + m.succeeded, 0);
  console.log(
    `\n  Overall: ${totalSucceeded}/${totalAttempted} requests succeeded across ${summaries.length} models\n`
  );

  assert.ok(
    totalSucceeded > 0,
    `every one of ${totalAttempted} requests across ${summaries.length} models failed — ` +
      `likely a harness or routing bug, not free-tier flakiness`
  );
});
