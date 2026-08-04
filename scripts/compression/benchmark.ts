/**
 * Compression engine A/B benchmark CLI (F2.4 / L2).
 *
 * Runs the deterministic compression engines over BENCHMARK_CORPUS through the C1 harness and
 * prints a best-first markdown table, so the default engine can be chosen from real numbers
 * rather than intuition. Deterministic and API-free (safe in CI / local dev).
 *
 * Usage:
 *   npm run bench:compression            # the default deterministic engine set
 *   npm run bench:compression rtk lite   # a specific subset
 *
 * llmlingua is excluded by default — its real compression needs the ONNX model at runtime
 * (pass it explicitly once provisioned; the framework is engine-agnostic).
 */
import {
  BENCHMARK_CORPUS,
  DEFAULT_BENCHMARK_ENGINES,
  benchmarkEngines,
  compareReports,
  formatBenchmarkTable,
} from "../../open-sse/services/compression/harness/benchmark.ts";

async function main(): Promise<void> {
  const requested = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
  const engines = requested.length > 0 ? requested : DEFAULT_BENCHMARK_ENGINES;

  const reports = await benchmarkEngines(BENCHMARK_CORPUS, engines);
  const rows = compareReports(reports);

  console.log("# Compression engine A/B benchmark (F2.4)\n");
  console.log(`Corpus: ${BENCHMARK_CORPUS.length} cases · engines: ${engines.join(", ")}\n`);
  console.log(formatBenchmarkTable(rows));
  console.log("");
}

main().catch((err) => {
  console.error("benchmark failed:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
