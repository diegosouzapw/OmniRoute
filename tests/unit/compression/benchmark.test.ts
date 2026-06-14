import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

import {
  BENCHMARK_CORPUS,
  engineToCompressFn,
  benchmarkEngines,
  compareReports,
  runBenchmarkGate,
} from "../../../open-sse/services/compression/harness/benchmark.ts";

// ── RED/GREEN proof: all assertions here must hold once benchmark.ts exists ──

describe("benchmark — engineToCompressFn adapter", () => {
  it("returns a function for a known engine id", () => {
    const fn = engineToCompressFn("rtk");
    assert.equal(typeof fn, "function");
  });

  it("compressFn returns a string for any text input", async () => {
    const fn = engineToCompressFn("rtk");
    const noisy =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n".repeat(10) +
      "Unnecessary filler words that add no value whatsoever indeed actually.";
    const out = await fn(noisy);
    assert.equal(typeof out, "string");
  });

  it("compressFn output is shorter or equal for clearly compressible prose", async () => {
    // A highly redundant input that caveman rules should shorten
    const fn = engineToCompressFn("caveman");
    const repetitive =
      "This is a very redundant message. This is a very redundant message.\n".repeat(8);
    const out = await fn(repetitive);
    // The adapter must return a string and it must not be longer than the input
    assert.ok(
      out.length <= repetitive.length,
      `expected shorter output, got ${out.length} vs ${repetitive.length}`
    );
  });
});

describe("benchmark — benchmarkEngines", () => {
  let reports: Awaited<ReturnType<typeof benchmarkEngines>>;

  before(async () => {
    reports = await benchmarkEngines(BENCHMARK_CORPUS, ["rtk", "caveman", "headroom"]);
  });

  it("returns one report per requested engine", () => {
    assert.deepEqual(Object.keys(reports).sort(), ["caveman", "headroom", "rtk"]);
  });

  it("each report has a valid meanSavingsPercent (a number)", () => {
    for (const [engineId, report] of Object.entries(reports)) {
      assert.equal(
        typeof report.meanSavingsPercent,
        "number",
        `${engineId}: meanSavingsPercent must be a number`
      );
    }
  });

  it("each report has meanRetention in [0, 1]", () => {
    for (const [engineId, report] of Object.entries(reports)) {
      assert.ok(
        report.meanRetention >= 0 && report.meanRetention <= 1,
        `${engineId}: meanRetention ${report.meanRetention} must be in [0,1]`
      );
    }
  });

  it("each report has results for every corpus item", () => {
    for (const [engineId, report] of Object.entries(reports)) {
      assert.equal(
        report.results.length,
        BENCHMARK_CORPUS.length,
        `${engineId}: expected ${BENCHMARK_CORPUS.length} result(s), got ${report.results.length}`
      );
    }
  });
});

describe("benchmark — compareReports", () => {
  it("returns one summary row per engine", async () => {
    const reports = await benchmarkEngines(BENCHMARK_CORPUS, ["rtk", "caveman"]);
    const summary = compareReports(reports);
    assert.equal(summary.length, 2);
    for (const row of summary) {
      assert.ok("engine" in row);
      assert.ok("meanSavingsPercent" in row);
      assert.ok("meanRetention" in row);
      assert.ok("totalCompressedTokens" in row);
    }
  });

  it("is sorted by meanSavingsPercent descending (best saver first)", async () => {
    const reports = await benchmarkEngines(BENCHMARK_CORPUS, ["rtk", "caveman"]);
    const summary = compareReports(reports);
    for (let i = 1; i < summary.length; i++) {
      assert.ok(
        summary[i - 1].meanSavingsPercent >= summary[i].meanSavingsPercent,
        `row ${i - 1} savings ${summary[i - 1].meanSavingsPercent} should be >= row ${i} savings ${summary[i].meanSavingsPercent}`
      );
    }
  });
});

describe("benchmark — runBenchmarkGate (N4)", () => {
  it("passes when baselines match current costs", async () => {
    const reports = await benchmarkEngines(BENCHMARK_CORPUS, ["rtk"]);
    // Baseline = exact current tokensPerTask → must pass
    const rtkReport = reports["rtk"];
    const baselines: Record<string, { tasks: Record<string, number> }> = {};
    const taskTotals: Record<string, { sum: number; count: number }> = {};
    for (const r of rtkReport.results) {
      const t = taskTotals[r.task] ?? { sum: 0, count: 0 };
      t.sum += r.compressedTokens;
      t.count += 1;
      taskTotals[r.task] = t;
    }
    baselines["rtk"] = {
      tasks: Object.fromEntries(
        Object.entries(taskTotals).map(([k, v]) => [k, Math.round(v.sum / v.count)])
      ),
    };

    const gateResults = runBenchmarkGate(reports, baselines);
    const rtkGate = gateResults.find((g) => g.engine === "rtk");
    assert.ok(rtkGate, "rtk gate result missing");
    assert.equal(rtkGate.gate.passed, true, "gate should pass when baseline matches current");
  });

  it("fails (regression) when baseline is tighter than actual cost", async () => {
    const reports = await benchmarkEngines(BENCHMARK_CORPUS, ["rtk"]);
    // Set an impossibly tight baseline (1 token per task) → regression guaranteed
    const impossibleBaselines: Record<string, { tasks: Record<string, number> }> = {
      rtk: { tasks: { prose: 1, "tool-output": 1, json: 1 } },
    };
    const gateResults = runBenchmarkGate(reports, impossibleBaselines);
    const rtkGate = gateResults.find((g) => g.engine === "rtk");
    assert.ok(rtkGate, "rtk gate result missing");
    assert.equal(rtkGate.gate.passed, false, "gate should fail when baseline is impossibly tight");
    assert.ok(rtkGate.gate.regressions.length > 0, "regressions array must be non-empty");
  });
});

describe("benchmark — reproducibility", () => {
  it("two runs on the same corpus yield identical meanSavingsPercent", async () => {
    const engines = ["rtk", "caveman"];
    const [r1, r2] = await Promise.all([
      benchmarkEngines(BENCHMARK_CORPUS, engines),
      benchmarkEngines(BENCHMARK_CORPUS, engines),
    ]);
    for (const id of engines) {
      assert.equal(
        r1[id].meanSavingsPercent,
        r2[id].meanSavingsPercent,
        `${id}: non-deterministic meanSavingsPercent`
      );
      assert.equal(
        r1[id].meanRetention,
        r2[id].meanRetention,
        `${id}: non-deterministic meanRetention`
      );
      assert.equal(
        r1[id].totalCompressedTokens,
        r2[id].totalCompressedTokens,
        `${id}: non-deterministic totalCompressedTokens`
      );
    }
  });
});
