/**
 * A/B benchmark for compression engines (F2.4 / L2).
 *
 * Runs the deterministic compression engines through the C1 harness and applies
 * the N4 tokens-per-task gate so a human or CI job can choose the default engine
 * from real numbers rather than intuition.
 *
 * Design notes
 * ─────────────
 * - Engine → compressFn adapter: wraps a plain string into the minimal
 *   `{messages:[{role:"user",content:text}]}` body that every engine expects,
 *   calls `applyAsync` when the engine declares one (H10-ready), else `apply`,
 *   then extracts `messages[0].content` back out. Engines that return
 *   non-string content fall back to the original string (fail-open).
 *
 * - Deterministic: no `Date.now()` / `Math.random()` calls here; the harness
 *   runner is already deterministic. Running `benchmarkEngines` twice on the
 *   same corpus MUST yield identical numbers.
 *
 * - `llmlingua` real-model A/B is a VPS-validated follow-up (Hard Rule #18 /
 *   L3). The sandbox benchmark covers the deterministic engines (rtk, caveman,
 *   lite, aggressive, ultra, session-dedup, headroom, ccr). The framework is
 *   engine-agnostic: adding llmlingua later is just another id in the engines
 *   array once the MobileBERT ONNX model file is available at runtime. The
 *   `llmlingua` engine registered here is already present in the registry but
 *   its `applyAsync` requires the backend service; without it the sync `apply`
 *   is a pass-through (fail-open) — reflected in 0% savings / 100% retention
 *   results that make the A/B table honest about the sandbox limitation.
 */

import { registerBuiltinCompressionEngines } from "../engines/index.ts";
import { getCompressionEngine } from "../engines/registry.ts";
import { runCompressionEval, type EvalCase, type CompressFn, type EvalReport } from "./runner.ts";
import {
  checkTokensPerTaskGate,
  type BudgetBaseline,
  type BudgetGateResult,
} from "./budgetGate.ts";

// Register all built-in engines once (idempotent).
registerBuiltinCompressionEngines();

// ── Types ────────────────────────────────────────────────────────────────────

export interface EngineSummaryRow {
  engine: string;
  /** Mean token savings % across the corpus (higher = better). */
  meanSavingsPercent: number;
  /** Mean technical-entity retention score 0..1 (higher = better). */
  meanRetention: number;
  /** Total compressed tokens across all corpus items. */
  totalCompressedTokens: number;
}

export interface EngineBenchmarkGateRow {
  engine: string;
  gate: BudgetGateResult;
}

// ── Fixture corpus (BENCHMARK_CORPUS) ────────────────────────────────────────
// Representative samples for reproducible A/B runs in CI and local dev.
// Three task groups mirror real OmniRoute workloads:
//   "prose"       — conversational / documentation turns
//   "tool-output" — bash/CLI raw output with repeated structural noise
//   "json"        — structured tool results / API responses

export const BENCHMARK_CORPUS: EvalCase[] = [
  // ── Prose ────────────────────────────────────────────────────────────────
  {
    id: "prose-1",
    task: "prose",
    input: [
      "Actually, I think what you basically want to do is essentially iterate over the list",
      "of files and then kind of process each one in turn. So basically what I mean is that",
      "you should loop through them one by one. In other words, just go through each file",
      "in the directory and perform the operation. Does that make sense? Let me know if you",
      "need any clarification on this matter whatsoever.",
      "",
      "So anyway, the main takeaway here is that you need to call processFile() for each",
      "item in the files array. That is essentially the core of what I am trying to convey.",
    ].join("\n"),
  },
  {
    id: "prose-2",
    task: "prose",
    input: [
      "I would like to add that, at the end of the day, the solution involves calling",
      "https://api.example.com/v2/process with the API_KEY environment variable set.",
      "The endpoint version is v2.3.1 and you must pass X-Request-Id in the headers.",
      "",
      "Please note that basically every request needs authentication via the Bearer token.",
      "So in other words you should include Authorization: Bearer <token> in every call.",
      "The error.message field will contain details when a 401 or 403 occurs.",
    ].join("\n"),
  },
  // ── Tool output ──────────────────────────────────────────────────────────
  {
    id: "tool-output-1",
    task: "tool-output",
    input: [
      "$ npm install",
      "npm warn deprecated inflight@1.0.6: This module is not supported",
      "npm warn deprecated inflight@1.0.6: This module is not supported",
      "npm warn deprecated inflight@1.0.6: This module is not supported",
      "npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported",
      "npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported",
      "npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported",
      "npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported",
      "",
      "added 1234 packages, and audited 1234 packages in 42s",
      "",
      "found 0 vulnerabilities",
    ].join("\n"),
  },
  {
    id: "tool-output-2",
    task: "tool-output",
    input: [
      "tests/unit/foo.test.ts ..........",
      "tests/unit/bar.test.ts ..........",
      "tests/unit/baz.test.ts ..........",
      "tests/unit/qux.test.ts ..........",
      "tests/unit/foo.test.ts ..........",
      "tests/unit/bar.test.ts ..........",
      "tests/unit/baz.test.ts ..........",
      "tests/unit/qux.test.ts ..........",
      "  ✓ all 80 tests passed",
      "  coverage: 87.3% statements",
      "Error: ENOENT: no such file or directory '/tmp/cache/build.lock'",
    ].join("\n"),
  },
  // ── JSON / structured ────────────────────────────────────────────────────
  {
    id: "json-1",
    task: "json",
    input: JSON.stringify(
      {
        model: "gpt-4o",
        usage: { prompt_tokens: 1200, completion_tokens: 350, total_tokens: 1550 },
        choices: [
          {
            index: 0,
            finish_reason: "stop",
            message: {
              role: "assistant",
              content:
                "The file src/lib/db/core.ts exports getDbInstance() which returns the WAL-mode SQLite singleton.",
            },
          },
          {
            index: 1,
            finish_reason: "stop",
            message: {
              role: "assistant",
              content: "Call getDbInstance() from src/lib/db/core.ts to obtain the DB handle.",
            },
          },
        ],
        id: "chatcmpl-abc123",
        created: 1718000000,
      },
      null,
      2
    ),
  },
];

// ── Core API ──────────────────────────────────────────────────────────────────

/**
 * Adapt a registered compression engine into the `CompressFn` interface that
 * `runCompressionEval` expects.
 *
 * Wraps the input string as `{messages:[{role:"user",content:text}]}`, calls
 * `applyAsync` when available or `apply` otherwise, then extracts the resulting
 * `messages[0].content` string. Falls back to the original text on any error
 * or if the engine returns a non-string content value (fail-open).
 *
 * Registers builtin engines on first call (idempotent).
 */
export function engineToCompressFn(engineId: string): CompressFn {
  const engine = getCompressionEngine(engineId);
  if (!engine) {
    throw new Error(`Unknown compression engine: "${engineId}"`);
  }

  return async (text: string): Promise<string> => {
    const body: Record<string, unknown> = {
      messages: [{ role: "user", content: text }],
    };

    try {
      let result;
      if (typeof engine.applyAsync === "function") {
        result = await engine.applyAsync(body);
      } else {
        result = engine.apply(body);
      }

      const messages = result.body["messages"];
      if (Array.isArray(messages) && messages.length > 0) {
        const content = (messages[0] as Record<string, unknown>)["content"];
        if (typeof content === "string") return content;
      }
      // Fallback: content was an array of blocks or engine left body unchanged
      return text;
    } catch {
      // Fail-open: engine error → return original text unchanged
      return text;
    }
  };
}

/**
 * Run the C1 harness on `corpus` for each engine id in `engineIds`.
 *
 * Returns a map of `engineId → EvalReport`. All engines run sequentially to
 * keep determinism; the corpus order is preserved.
 *
 * No `Date.now()` or `Math.random()` calls — deterministic by construction.
 */
export async function benchmarkEngines(
  corpus: EvalCase[],
  engineIds: string[]
): Promise<Record<string, EvalReport>> {
  const reports: Record<string, EvalReport> = {};
  for (const id of engineIds) {
    const compress = engineToCompressFn(id);
    reports[id] = await runCompressionEval(corpus, compress);
  }
  return reports;
}

/**
 * Build a flat, sortable A/B summary table from an engine→report map.
 *
 * Sort order: `meanSavingsPercent` descending (best token saver first).
 * Ties are broken by `meanRetention` descending (better entity preservation).
 * The sort is deterministic and documented here so the decision rationale is
 * reproducible: "most savings, then most retention when savings are equal".
 */
export function compareReports(reports: Record<string, EvalReport>): EngineSummaryRow[] {
  const rows: EngineSummaryRow[] = Object.entries(reports).map(([engine, report]) => ({
    engine,
    meanSavingsPercent: report.meanSavingsPercent,
    meanRetention: report.meanRetention,
    totalCompressedTokens: report.totalCompressedTokens,
  }));

  rows.sort((a, b) => {
    if (b.meanSavingsPercent !== a.meanSavingsPercent) {
      return b.meanSavingsPercent - a.meanSavingsPercent;
    }
    return b.meanRetention - a.meanRetention;
  });

  return rows;
}

/**
 * Apply the N4 tokens-per-task gate to each engine's report against provided
 * per-engine baselines.
 *
 * `baselines` is keyed by engineId. Engines absent from `baselines` are
 * reported as passed (no baseline to regress against).
 *
 * `tolerancePercent` defaults to 2 (same default as `checkTokensPerTaskGate`).
 */
export function runBenchmarkGate(
  reports: Record<string, EvalReport>,
  baselines: Record<string, BudgetBaseline>,
  tolerancePercent = 2
): EngineBenchmarkGateRow[] {
  return Object.entries(reports).map(([engine, report]) => {
    const baseline = baselines[engine];
    if (!baseline) {
      // No baseline for this engine → unconditional pass (nothing to regress against)
      return {
        engine,
        gate: { passed: true, regressions: [], tolerancePercent },
      };
    }
    const gate = checkTokensPerTaskGate(report, baseline, tolerancePercent);
    return { engine, gate };
  });
}
