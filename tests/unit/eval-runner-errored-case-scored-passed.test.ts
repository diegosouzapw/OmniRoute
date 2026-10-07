/**
 * Regression: an eval case whose upstream call failed must never be scored as passed.
 *
 * Issue #13137 — `runSuite()` attaches `caseMetrics[id].error` to the graded result but
 * never forces `passed` to `false`. Because `executeEvalCase()` (src/lib/evals/runtime.ts)
 * returns the failure as an ordinary output string (`[ERROR] ${error}`), any expected
 * pattern that happens to match that text scores a pass — so a run in which no model was
 * ever reached still reports a non-zero pass rate.
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";

import { registerSuite, runSuite, resetSuites } from "../../src/lib/evals/evalRunner.ts";

describe("evalRunner — errored case scoring (#13137)", () => {
  after(() => {
    // Remove test-registered suites while preserving built-ins.
    resetSuites();
  });

  it("fails a case whose call errored even when the error text matches the pattern", () => {
    registerSuite({
      id: "test-errored-case",
      name: "Errored case",
      cases: [
        {
          id: "errored-01",
          name: "Error handling pattern",
          model: "codex",
          input: { messages: [{ role: "user", content: "Add error handling" }] },
          // Mirrors built-in `codex-comparison` case codex-07, whose pattern matches the
          // runner's own "[ERROR] ..." string when the upstream call never resolves.
          expected: { strategy: "regex", value: "try|catch|throw|error|Error" },
        },
      ],
    });

    // Exact production text (open-sse/services/model.ts:851), wrapped by
    // executeEvalCase as `[ERROR] ${error}` (src/lib/evals/runtime.ts:232).
    // It contains "entry", so the pattern's `try` alternative matches it.
    const failure =
      "Unable to determine provider for model 'codex'. Use a provider/model prefix " +
      "(e.g. openai/codex) or ensure the model is added as a combo entry.";
    const run = runSuite(
      "test-errored-case",
      { "errored-01": `[ERROR] ${failure}` },
      { "errored-01": { durationMs: 3, error: failure } }
    );

    assert.equal(run.results[0].error, failure);
    assert.equal(
      run.results[0].passed,
      false,
      "a case that never reached a model has no measured behaviour to grade"
    );
    assert.equal(run.summary.passed, 0);
    assert.equal(run.summary.failed, 1);
    assert.equal(run.summary.passRate, 0);
  });

  it("still scores a matching case as passed when the call succeeded", () => {
    registerSuite({
      id: "test-healthy-case",
      name: "Healthy case",
      cases: [
        {
          id: "healthy-01",
          name: "Error handling pattern",
          model: "codex",
          input: { messages: [{ role: "user", content: "Add error handling" }] },
          expected: { strategy: "regex", value: "try|catch|throw|error|Error" },
        },
      ],
    });

    const run = runSuite(
      "test-healthy-case",
      { "healthy-01": "Wrap the read in a try/catch block." },
      { "healthy-01": { durationMs: 120 } }
    );

    assert.equal(run.results[0].passed, true);
    assert.equal(run.results[0].error, undefined);
    assert.equal(run.summary.passRate, 100);
  });
});
