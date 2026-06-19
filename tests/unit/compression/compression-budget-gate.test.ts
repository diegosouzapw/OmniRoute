import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  BENCHMARK_CORPUS,
  DEFAULT_BENCHMARK_ENGINES,
  benchmarkEngines,
  runBenchmarkGate,
} from "../../../open-sse/services/compression/harness/benchmark.ts";
import { tokensPerTask, type BudgetBaseline } from "../../../open-sse/services/compression/harness/budgetGate.ts";

const BASELINE_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../scripts/check/compression-budget-baseline.json"
);

describe("compression budget gate (F2.4 / N4 ratchet)", () => {
  it("the committed baseline matches the current benchmark (not stale, no regression)", async () => {
    const baselines = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8")) as Record<
      string,
      BudgetBaseline
    >;
    const reports = await benchmarkEngines(BENCHMARK_CORPUS, DEFAULT_BENCHMARK_ENGINES);
    const failed = runBenchmarkGate(reports, baselines, 2).filter((r) => !r.gate.passed);
    assert.equal(
      failed.length,
      0,
      `tokens-per-task regressed vs the committed baseline: ${JSON.stringify(failed)} — ` +
        `if intentional, run: npm run check:compression-budget -- --update`
    );
  });

  it("flags a regression when tokens-per-task rises beyond tolerance", async () => {
    // ultra is stateless/deterministic. Build a baseline tighter than reality → current regresses.
    const reports = await benchmarkEngines(BENCHMARK_CORPUS, ["ultra"]);
    const tight: Record<string, BudgetBaseline> = {
      ultra: {
        tasks: Object.fromEntries(
          Object.entries(tokensPerTask(reports.ultra)).map(([task, n]) => [task, Math.max(1, Math.floor(n / 2))])
        ),
      },
    };
    const failed = runBenchmarkGate(reports, tight, 2).filter((r) => !r.gate.passed);
    assert.ok(failed.length > 0, "a halved baseline must be flagged as a regression");
  });
});
