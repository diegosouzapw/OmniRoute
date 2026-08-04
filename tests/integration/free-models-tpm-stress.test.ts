/**
 * tests/integration/free-models-tpm-stress.test.ts
 *
 * TPM-stress benchmark for the gemma-4-31b model family across its 3 free
 * hosts on this deployment (Gemini, NVIDIA, AI Horde). gemma-4 is
 * specifically documented (tests/integration/gemini-large-context-tpm.test.ts)
 * as hitting a hard 16000 tokens/minute ceiling on Gemini's free tier — this
 * test asks whether that's a Gemini-specific enforcement limit or a
 * per-model property that shows up on other free hosts too, by firing
 * back-to-back ~14k-token prompts (concentrated into one window, unlike the
 * paced general workload benchmark) at each host and recording what happens:
 * clean completion, a real 429/503, or a silent failure mode.
 *
 * Like free-models-benchmark.test.ts, this is a report, not a pass/fail
 * gate on individual hosts — hitting a real TPM ceiling and recovering
 * (or not) is the finding, not a bug. Only a total outage across every host
 * fails the test.
 *
 * Environment:
 *   OMNIROUTE_API_KEY  — required (else test skips)
 *   OMNIROUTE_URL      — defaults to http://localhost:3000
 */
import test from "node:test";
import assert from "node:assert/strict";

import { skip, ensureTestEnvironment } from "./liveGeminiShared.ts";
import {
  TPM_STRESS_MODELS,
  getActiveProviders,
  benchmarkTpmStress,
  summarize,
  formatBenchmarkTable,
  type ModelBenchmarkSummary,
} from "./freeModelBenchmarkShared.ts";

const DELAY_BETWEEN_MODELS_MS = 5000;
const APPROX_TOKENS_PER_PROMPT = 14_000; // squarely inside the 10-20k "critical" range
const ROUNDS = 2; // back-to-back, no delay — accumulates within one TPM window

test.before(async () => {
  await ensureTestEnvironment();
});

test("gemma-4 TPM-stress: ~14k-token prompts fired back-to-back per host", { skip }, async () => {
  const activeProviders = await getActiveProviders();
  const candidates = TPM_STRESS_MODELS.filter((spec) => activeProviders.has(spec.provider));

  if (candidates.length === 0) {
    console.log("  [skip] no configured providers match TPM_STRESS_MODELS — nothing to test");
    return;
  }

  console.log(
    `\n  TPM-stress: ${candidates.length} host(s) × ${ROUNDS} back-to-back ~${APPROX_TOKENS_PER_PROMPT}-token ` +
      `prompts (~${Math.round((candidates.length * ROUNDS * APPROX_TOKENS_PER_PROMPT) / 1000)}k tokens total)\n`
  );

  const summaries: ModelBenchmarkSummary[] = [];

  for (const spec of candidates) {
    const results = await benchmarkTpmStress(spec, APPROX_TOKENS_PER_PROMPT, ROUNDS);

    for (const r of results) {
      const status = r.ok ? "OK  " : "FAIL";
      console.log(
        `  [${status}] ${spec.displayName.padEnd(30)} ${r.case.padEnd(40)} ` +
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
    `\n  Overall: ${totalSucceeded}/${totalAttempted} TPM-stress requests succeeded across ` +
      `${summaries.length} host(s)\n`
  );

  assert.ok(
    totalSucceeded > 0,
    `every one of ${totalAttempted} TPM-stress requests across ${summaries.length} host(s) failed — ` +
      `likely a harness or routing bug, not a real TPM ceiling`
  );
});
