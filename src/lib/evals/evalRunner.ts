/**
 * Eval Runner — T-42
 *
 * Framework for evaluating LLM responses against a golden set.
 * Supports multiple evaluation strategies: exact match, contains,
 * regex, and custom functions.
 *
 * @module lib/evals/evalRunner
 */

import { getCustomEvalSuite, listCustomEvalSuites } from "@/lib/db/evals";
import {
  goldenSet,
  codingSuite,
  reasoningSuite,
  multilingualSuite,
  safetySuite,
  instructionSuite,
  codexComparisonSuite,
  builtInSuites,
} from "./evalRunner/builtinSuites";

/**
 * @typedef {Object} EvalCase
 * @property {string} id - Unique case ID
 * @property {string} name - Human-readable name
 * @property {string} model - Target model
 * @property {Object} input - Request input (messages, etc.)
 * @property {Object} expected - Expected output criteria
 * @property {string} expected.strategy - "exact" | "contains" | "regex" | "custom"
 * @property {string|RegExp} [expected.value] - Expected value for match strategies
 * @property {Function} [expected.fn] - Custom evaluation function
 * @property {string[]} [tags] - Tags for filtering
 */

/**
 * @typedef {Object} EvalResult
 * @property {string} caseId
 * @property {string} caseName
 * @property {boolean} passed
 * @property {number} durationMs
 * @property {string} [error]
 * @property {Object} [details]
 */

/**
 * @typedef {Object} EvalSuite
 * @property {string} id
 * @property {string} name
 * @property {EvalCase[]} cases
 * @property {string} [description]
 */

/** @type {Map<string, EvalSuite>} */
const suites = new Map();

/**
 * Register an evaluation suite.
 *
 * @param {EvalSuite} suite
 */
export function registerSuite(suite: any) {
  suites.set(suite.id, suite);
}

/**
 * Get a registered suite by ID.
 *
 * @param {string} suiteId
 * @returns {EvalSuite | null}
 */
export function getSuite(suiteId: string) {
  return suites.get(suiteId) || getCustomEvalSuite(suiteId) || null;
}

/**
 * List all registered suites.
 *
 * @returns {Array<{ id: string, name: string, caseCount: number }>}
 */
export function listSuites() {
  const builtInSuites = Array.from(suites.values()).map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description || "",
    source: "built-in",
    caseCount: s.cases.length,
    cases: s.cases.map((c) => ({
      id: c.id,
      name: c.name,
      model: c.model,
      input: c.input,
      expected: c.expected,
      tags: c.tags || [],
    })),
  }));

  const customSuites = listCustomEvalSuites().map((suite) => ({
    id: suite.id,
    name: suite.name,
    description: suite.description || "",
    source: "custom",
    caseCount: suite.cases.length,
    updatedAt: suite.updatedAt,
    cases: suite.cases.map((c) => ({
      id: c.id,
      name: c.name,
      model: c.model,
      input: c.input,
      expected: c.expected,
      tags: c.tags || [],
    })),
  }));

  return [...builtInSuites, ...customSuites];
}

/**
 * Evaluate a single case against actual output.
 *
 * @param {EvalCase} evalCase
 * @param {string} actualOutput - The actual LLM response text
 * @returns {EvalResult}
 */
export function evaluateCase(evalCase: any, actualOutput: string) {
  const start = Date.now();

  try {
    let passed = false;
    const details: Record<string, any> = {};
    details.actualSnippet =
      typeof actualOutput === "string" ? actualOutput.slice(0, 240) : String(actualOutput ?? "");

    switch (evalCase.expected.strategy) {
      case "exact":
        passed = actualOutput === evalCase.expected.value;
        details.expected = evalCase.expected.value;
        details.actual = actualOutput;
        break;

      case "contains":
        passed =
          typeof evalCase.expected.value === "string" &&
          actualOutput.toLowerCase().includes(evalCase.expected.value.toLowerCase());
        details.searchTerm = evalCase.expected.value;
        break;

      case "regex": {
        const expectedValue = evalCase.expected.value;
        if (!(expectedValue instanceof RegExp) && typeof expectedValue !== "string") {
          passed = false;
          details.error = "No regex value provided for evaluation.";
          break;
        }
        const regex =
          expectedValue instanceof RegExp
            ? new RegExp(expectedValue.source, expectedValue.flags.replace(/[gy]/g, ""))
            : new RegExp(expectedValue);
        if (regex.source.length > 512) {
          passed = false;
          details.error = "Regex pattern too large for safe evaluation.";
          break;
        }
        passed = regex.test(actualOutput);
        details.pattern = String(expectedValue);
        break;
      }

      case "custom":
        if (typeof evalCase.expected.fn === "function") {
          passed = evalCase.expected.fn(actualOutput, evalCase);
        }
        break;

      default:
        return {
          caseId: evalCase.id,
          caseName: evalCase.name,
          passed: false,
          durationMs: Date.now() - start,
          error: `Unknown strategy: ${evalCase.expected.strategy}`,
        };
    }

    return {
      caseId: evalCase.id,
      caseName: evalCase.name,
      passed,
      durationMs: Date.now() - start,
      details,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      caseId: evalCase.id,
      caseName: evalCase.name,
      passed: false,
      durationMs: Date.now() - start,
      error: errorMessage,
    };
  }
}

/**
 * Run all cases in a suite against provided outputs.
 *
 * @param {string} suiteId
 * @param {Record<string, string>} outputs - Map of caseId → actualOutput
 * @param {Record<string, { durationMs?: number, error?: string }>} [caseMetrics]
 * @returns {{ suiteId: string, suiteName: string, results: EvalResult[], summary: { total: number, passed: number, failed: number, passRate: number } }}
 */
export function runSuite(
  suiteId: string,
  outputs: Record<string, string>,
  caseMetrics: Record<string, { durationMs?: number; error?: string }> = {}
) {
  const suite = getSuite(suiteId);
  if (!suite) {
    throw new Error(`Suite not found: ${suiteId}`);
  }

  const results = suite.cases.map((c) => {
    const output = outputs[c.id] || "";
    const result = evaluateCase(c, output);
    const metrics = caseMetrics[c.id];

    if (metrics && Number.isFinite(Number(metrics.durationMs))) {
      result.durationMs = Math.max(0, Math.round(Number(metrics.durationMs)));
    }

    if (metrics?.error && !result.error) {
      result.error = metrics.error;
    }

    return result;
  });

  const passed = results.filter((r) => r.passed).length;
  const total = results.length;

  return {
    suiteId: suite.id,
    suiteName: suite.name,
    results,
    summary: {
      total,
      passed,
      failed: total - passed,
      passRate: total > 0 ? Math.round((passed / total) * 100) : 0,
    },
  };
}

/**
 * Create a scorecard from multiple suite runs.
 *
 * @param {Array<ReturnType<typeof runSuite>>} runs
 * @returns {{ suites: number, totalCases: number, totalPassed: number, overallPassRate: number, perSuite: Array<{ id: string, name: string, passRate: number }> }}
 */
export function createScorecard(runs: any[]) {
  const totalCases = runs.reduce((sum, r) => sum + r.summary.total, 0);
  const totalPassed = runs.reduce((sum, r) => sum + r.summary.passed, 0);

  return {
    suites: runs.length,
    totalCases,
    totalPassed,
    overallPassRate: totalCases > 0 ? Math.round((totalPassed / totalCases) * 100) : 0,
    perSuite: runs.map((r) => ({
      id: r.suiteId,
      name: r.suiteName,
      passRate: r.summary.passRate,
    })),
  };
}

/**
 * Reset test-registered suites and restore built-in suites.
 */
export function resetSuites() {
  suites.clear();
  registerBuiltInSuites();
}

// ─── Built-in suite registration ───────────────────────────────────────
// Suite data lives in ./evalRunner/builtinSuites (pure data, zero imports).
// Registration runs at module load, mirroring the original inline calls.

registerSuite(goldenSet);
registerSuite(codingSuite);
registerSuite(reasoningSuite);
registerSuite(multilingualSuite);
registerSuite(safetySuite);
registerSuite(instructionSuite);
registerSuite(codexComparisonSuite);

function registerBuiltInSuites() {
  for (const suite of builtInSuites) {
    registerSuite(suite);
  }
}
