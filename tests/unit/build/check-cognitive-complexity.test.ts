// tests/unit/build/check-cognitive-complexity.test.ts
// Unit tests for the JSON-parsing helper in check-cognitive-complexity.mjs.
// These tests validate countCognitiveViolations() against synthetic ESLint
// JSON output — no filesystem access, no ESLint subprocess.
import test from "node:test";
import assert from "node:assert/strict";
import { countCognitiveViolations } from "../../../scripts/check/check-cognitive-complexity.mjs";

// Minimal ESLint JSON message shape used in fixtures.
type EslintMessage = {
  ruleId: string;
  severity: number;
  message: string;
  line: number;
  column: number;
};
type EslintFileResult = {
  filePath: string;
  messages: EslintMessage[];
  errorCount: number;
  warningCount: number;
};

function makeResult(filePath: string, messages: EslintMessage[]): EslintFileResult {
  return {
    filePath,
    messages,
    errorCount: messages.filter((m) => m.severity === 2).length,
    warningCount: messages.filter((m) => m.severity === 1).length,
  };
}

function makeMsg(ruleId: string): EslintMessage {
  return { ruleId, severity: 2, message: "violation", line: 1, column: 1 };
}

test("countCognitiveViolations: empty report returns 0", () => {
  assert.equal(countCognitiveViolations([]), 0);
});

test("countCognitiveViolations: no cognitive-complexity messages returns 0", () => {
  const report = [
    makeResult("src/foo.ts", [makeMsg("complexity"), makeMsg("max-lines-per-function")]),
  ];
  assert.equal(countCognitiveViolations(report), 0);
});

test("countCognitiveViolations: single cognitive-complexity violation in one file", () => {
  const report = [
    makeResult("src/foo.ts", [makeMsg("sonarjs/cognitive-complexity")]),
  ];
  assert.equal(countCognitiveViolations(report), 1);
});

test("countCognitiveViolations: multiple cognitive-complexity violations across files", () => {
  const report = [
    makeResult("src/foo.ts", [
      makeMsg("sonarjs/cognitive-complexity"),
      makeMsg("sonarjs/cognitive-complexity"),
    ]),
    makeResult("open-sse/bar.ts", [
      makeMsg("sonarjs/cognitive-complexity"),
    ]),
  ];
  assert.equal(countCognitiveViolations(report), 3);
});

test("countCognitiveViolations: ignores unrelated sonarjs rules", () => {
  const report = [
    makeResult("src/baz.ts", [
      makeMsg("sonarjs/no-duplicate-string"),
      makeMsg("sonarjs/cognitive-complexity"),
      makeMsg("sonarjs/no-identical-functions"),
    ]),
  ];
  assert.equal(countCognitiveViolations(report), 1);
});

test("countCognitiveViolations: file with no messages contributes 0", () => {
  const report = [
    makeResult("src/clean.ts", []),
    makeResult("src/complex.ts", [makeMsg("sonarjs/cognitive-complexity")]),
  ];
  assert.equal(countCognitiveViolations(report), 1);
});

test("countCognitiveViolations: mixes of rule IDs only counts cognitive-complexity", () => {
  const report = [
    makeResult("src/mixed.ts", [
      makeMsg("complexity"),
      makeMsg("sonarjs/cognitive-complexity"),
      makeMsg("max-lines-per-function"),
      makeMsg("sonarjs/cognitive-complexity"),
    ]),
  ];
  assert.equal(countCognitiveViolations(report), 2);
});
