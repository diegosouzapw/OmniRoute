/**
 * Compression eval/benchmark harness (F0.3 — C1 + N4 gate + TV3 replay).
 *
 * API-free, CI-safe primitives to answer "did meaning survive?" (retention) and
 * "did cost/task get worse?" (budget gate), plus a replay path over real
 * transcripts. Engines and the studios consume these to keep compression honest.
 */
export {
  extractEntities,
  computeRetention,
  measureCompression,
  type RetentionScore,
  type CompressionMeasurement,
} from "./measure.ts";

export {
  runCompressionEval,
  type EvalCase,
  type CompressFn,
  type EvalResult,
  type EvalReport,
} from "./runner.ts";

export {
  tokensPerTask,
  checkTokensPerTaskGate,
  type BudgetBaseline,
  type BudgetRegression,
  type BudgetGateResult,
} from "./budgetGate.ts";

export {
  transcriptsToCorpus,
  replayTranscripts,
  type Transcript,
  type TranscriptTurn,
} from "./replay.ts";

export {
  BENCHMARK_CORPUS,
  DEFAULT_BENCHMARK_ENGINES,
  engineToCompressFn,
  benchmarkEngines,
  compareReports,
  runBenchmarkGate,
  formatBenchmarkTable,
  type EngineSummaryRow,
  type EngineBenchmarkGateRow,
} from "./benchmark.ts";
