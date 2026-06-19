/**
 * Compression budget gate (F2.4 / N4 ratchet).
 *
 * Runs the deterministic compression engines over BENCHMARK_CORPUS and fails if any engine's
 * mean compressed-tokens-per-task RISES beyond the tolerance versus the frozen baseline — i.e. a
 * change made compression worse. Falling cost (better compression) always passes.
 *
 *   node --import tsx scripts/check/check-compression-budget.ts            # check (CI)
 *   node --import tsx scripts/check/check-compression-budget.ts --update   # refresh the baseline
 *
 * The benchmark is deterministic + API-free (chars/4 estimate over a fixed corpus), so the
 * committed baseline is portable across local/CI.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  BENCHMARK_CORPUS,
  DEFAULT_BENCHMARK_ENGINES,
  benchmarkEngines,
  runBenchmarkGate,
} from "../../open-sse/services/compression/harness/benchmark.ts";
import { tokensPerTask, type BudgetBaseline } from "../../open-sse/services/compression/harness/budgetGate.ts";

const BASELINE_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "compression-budget-baseline.json"
);
const TOLERANCE_PERCENT = 2;

async function main(): Promise<void> {
  const update = process.argv.includes("--update");
  const reports = await benchmarkEngines(BENCHMARK_CORPUS, DEFAULT_BENCHMARK_ENGINES);

  if (update) {
    const baselines: Record<string, BudgetBaseline> = {};
    for (const [engine, report] of Object.entries(reports)) {
      baselines[engine] = { tasks: tokensPerTask(report) };
    }
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baselines, null, 2) + "\n");
    console.log(`Updated compression budget baseline (${Object.keys(baselines).length} engines).`);
    return;
  }

  if (!fs.existsSync(BASELINE_PATH)) {
    console.error("compression budget baseline missing — run with --update to generate it.");
    process.exit(1);
  }
  const baselines = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8")) as Record<
    string,
    BudgetBaseline
  >;

  const results = runBenchmarkGate(reports, baselines, TOLERANCE_PERCENT);
  const failed = results.filter((r) => !r.gate.passed);

  if (failed.length === 0) {
    console.log(`✓ compression budget gate: no regressions (tolerance ${TOLERANCE_PERCENT}%)`);
    return;
  }

  console.error("✗ compression budget gate: tokens-per-task regressed (compression got worse):");
  for (const { engine, gate } of failed) {
    for (const reg of gate.regressions) {
      console.error(
        `  ${engine}/${reg.task}: ${reg.baseline} -> ${reg.current} tokens (+${reg.deltaPercent}%)`
      );
    }
  }
  console.error(
    "\nIf this is an intentional improvement/change, refresh: npm run check:compression-budget -- --update"
  );
  process.exit(1);
}

main().catch((err) => {
  console.error("compression budget gate failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
