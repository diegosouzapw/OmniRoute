// #13137 — Eval cases whose upstream call failed must never score as passed.
// #13138 — Regex grading must compile patterns with dotAll so "." matches
// newlines in multi-line LLM answers.

import test from "node:test";
import assert from "node:assert/strict";

import { evaluateCase, runSuite } from "../../src/lib/evals/evalRunner.ts";

const serial = { concurrency: false };

// ── #13138: dotAll regex tests ──────────────────────────────────────────

test("#13138 — regex from string matches across newlines", serial, () => {
  const evalCase = {
    id: "dotall-1",
    name: "Multi-line regex match",
    expected: { strategy: "regex", value: "1.*2.*3.*4.*5" },
  };
  const output = "1\n2\n3\n4\n5";
  const result = evaluateCase(evalCase, output);
  assert.equal(result.passed, true, "dotAll regex should match across newlines");
});

test("#13138 — regex from string with SQL pattern matches multiline", serial, () => {
  const evalCase = {
    id: "dotall-2",
    name: "SQL regex",
    expected: { strategy: "regex", value: "SELECT.*FROM.*WHERE" },
  };
  const output = "```sql\nSELECT *\nFROM users\nWHERE age > 25```";
  const result = evaluateCase(evalCase, output);
  assert.equal(result.passed, true, "SQL regex should match multiline SQL");
});

test("#13138 — regex from string with numbered list format", serial, () => {
  const evalCase = {
    id: "dotall-3",
    name: "Numbered list",
    expected: { strategy: "regex", value: "1\\..*2\\..*3\\..*4\\..*5\\." },
  };
  const output = "1. Mercury\n2. Venus\n3. Earth\n4. Mars\n5. Jupiter";
  const result = evaluateCase(evalCase, output);
  assert.equal(result.passed, true, "numbered list regex should match across lines");
});

test("#13138 — RegExp object preserves dotAll flag", serial, () => {
  const evalCase = {
    id: "dotall-4",
    name: "RegExp with dotAll",
    expected: { strategy: "regex", value: /1.*2.*3/s },
  };
  const output = "1\n2\n3";
  const result = evaluateCase(evalCase, output);
  assert.equal(result.passed, true, "RegExp with dotAll should match across newlines");
});

test("#13138 — RegExp object without dotAll gets it added", serial, () => {
  const evalCase = {
    id: "dotall-5",
    name: "RegExp without dotAll",
    expected: { strategy: "regex", value: /hello.*world/ },
  };
  const output = "hello\nworld";
  const result = evaluateCase(evalCase, output);
  assert.equal(result.passed, true, "RegExp without dotAll should still get it added");
});

test("#13138 — dotAll does not break single-line matching", serial, () => {
  const evalCase = {
    id: "dotall-6",
    name: "Single-line still works",
    expected: { strategy: "regex", value: "foo.*bar" },
  };
  const output = "foo bar baz";
  const result = evaluateCase(evalCase, output);
  assert.equal(result.passed, true, "single-line regex should still work");
});

// ── #13137: failed-upstream-must-not-pass tests ─────────────────────────

test("#13137 — runSuite forces passed=false when caseMetrics has an error", serial, () => {
  const suiteId = "golden-set";
  const outputs: Record<string, string> = {
    "gs-01": "[ERROR] 503 Service Unavailable",
  };
  const caseMetrics = {
    "gs-01": { error: "503 Service Unavailable", durationMs: 1000 },
  };

  const result = runSuite(suiteId, outputs, caseMetrics);
  const gs01 = result.results.find((r) => r.caseId === "gs-01");
  assert.ok(gs01, "gs-01 result should exist");
  assert.equal(gs01.passed, false, "case with upstream error must not pass");
  assert.equal(gs01.error, "503 Service Unavailable");
});

test("#13137 — runSuite passes when no error in metrics", serial, () => {
  const suiteId = "golden-set";
  const outputs: Record<string, string> = {
    "gs-01": "Hello, world!",
  };
  const caseMetrics = {
    "gs-01": { durationMs: 500 },
  };

  const result = runSuite(suiteId, outputs, caseMetrics);
  const gs01 = result.results.find((r) => r.caseId === "gs-01");
  assert.ok(gs01, "gs-01 result should exist");
  // gs-01 in golden-set uses "exact" strategy — "Hello, world!" should match
  assert.equal(gs01.passed, true, "case without error should pass if output matches");
});

test("#13137 — runSuite fails even if error text matches the expected pattern", serial, () => {
  const suiteId = "golden-set";
  // gs-01 exact strategy expects "Hello, world!" — an error message that
  // coincidentally contains this string should still be forced to fail.
  const outputs: Record<string, string> = {
    "gs-01": "[ERROR] Hello, world! (from upstream)",
  };
  const caseMetrics = {
    "gs-01": { error: "Hello, world! (from upstream)", durationMs: 500 },
  };

  const result = runSuite(suiteId, outputs, caseMetrics);
  const gs01 = result.results.find((r) => r.caseId === "gs-01");
  assert.ok(gs01, "gs-01 result should exist");
  assert.equal(gs01.passed, false, "error text matching expected pattern must still fail");
});
