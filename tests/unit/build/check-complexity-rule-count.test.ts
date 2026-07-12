/**
 * Locks that complexity vs cognitive counts stay isolated when sharing one ESLint report.
 * Existence reason: merging tree walks must NOT change either ratchet baseline semantics.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  countCognitiveViolations,
  countComplexityViolations,
} from "../../../scripts/check/complexityEslintReport.mjs";

test("countComplexityViolations ignores cognitive-complexity messages", () => {
  const report = [
    {
      messages: [
        { ruleId: "complexity" },
        { ruleId: "max-lines-per-function" },
        { ruleId: "sonarjs/cognitive-complexity" },
        { ruleId: "sonarjs/cognitive-complexity" },
      ],
    },
  ];
  assert.equal(countComplexityViolations(report), 2);
  assert.equal(countCognitiveViolations(report), 2);
});

test("empty report → 0 for both counters", () => {
  assert.equal(countComplexityViolations([]), 0);
  assert.equal(countCognitiveViolations([]), 0);
});
