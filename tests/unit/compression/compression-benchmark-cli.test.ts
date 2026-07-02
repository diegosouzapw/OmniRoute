import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  BENCHMARK_CORPUS,
  DEFAULT_BENCHMARK_ENGINES,
  benchmarkEngines,
  compareReports,
  formatBenchmarkTable,
} from "../../../open-sse/services/compression/harness/benchmark.ts";

// F2.4: the benchmark harness existed but nothing invoked it and there was no report output.
// These cover the CLI's core: a markdown formatter + a default engine set that resolves and
// runs the corpus end-to-end, so `npm run bench:compression` produces a real A/B table.
describe("compression benchmark CLI core", () => {
  it("formatBenchmarkTable renders a markdown table with the best engine bolded", () => {
    const md = formatBenchmarkTable([
      { engine: "rtk", meanSavingsPercent: 42.5, meanRetention: 0.9, totalCompressedTokens: 100 },
      { engine: "lite", meanSavingsPercent: 10, meanRetention: 0.99, totalCompressedTokens: 200 },
    ]);
    assert.match(md, /\| Engine \|/, "has a header row");
    assert.match(md, /\*\*rtk\*\*/, "best (first) engine is bolded");
    assert.match(md, /42\.5/, "renders the savings number");
    assert.match(md, /\blite\b/, "renders the runner-up");
    assert.ok(!md.includes("**lite**"), "only the best engine is bolded");
  });

  it("DEFAULT_BENCHMARK_ENGINES all resolve and run the corpus end-to-end", async () => {
    assert.ok(DEFAULT_BENCHMARK_ENGINES.length > 0, "has a default engine set");
    assert.ok(
      !DEFAULT_BENCHMARK_ENGINES.includes("llmlingua"),
      "excludes llmlingua (needs the ONNX model at runtime)"
    );

    const reports = await benchmarkEngines(BENCHMARK_CORPUS, DEFAULT_BENCHMARK_ENGINES);
    const rows = compareReports(reports);
    assert.equal(rows.length, DEFAULT_BENCHMARK_ENGINES.length);
    for (const id of DEFAULT_BENCHMARK_ENGINES) {
      assert.ok(
        rows.some((r) => r.engine === id),
        `${id} present in the comparison table`
      );
    }
    // The formatted table is non-empty and lists every engine.
    const md = formatBenchmarkTable(rows);
    for (const id of DEFAULT_BENCHMARK_ENGINES) {
      assert.ok(md.includes(id), `${id} appears in the markdown table`);
    }
  });
});
