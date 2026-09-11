/**
 * Regression: regex grading must compile string patterns with the `s` (dotAll) flag.
 *
 * Issue #13138 — `evaluateCase()` compiles suite-supplied string patterns with no flags, so
 * `.` does not match a newline. Suite JSON can only carry a string, so the no-flags branch is
 * the one every custom and built-in suite takes. LLM answers are routinely multi-line and
 * several built-in cases join tokens with `.*`, so those cases fail on correct answers.
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";

import { evaluateCase, resetSuites } from "../../src/lib/evals/evalRunner.ts";

function grader(pattern: string) {
  return {
    id: "dotall-case",
    name: "dotall case",
    model: "gemini-2.5-flash",
    input: { messages: [{ role: "user", content: "irrelevant" }] },
    expected: { strategy: "regex", value: pattern },
  };
}

describe("evalRunner — regex dotAll grading (#13138)", () => {
  after(() => {
    resetSuites();
  });

  it("matches a multi-line answer against a `.*`-joined pattern (gs-09 Counting)", () => {
    const result = evaluateCase(grader("1.*2.*3.*4.*5"), "1\n2\n3\n4\n5");
    assert.equal(result.passed, true);
  });

  it("matches a multi-line SQL answer (code-03 SELECT query)", () => {
    const result = evaluateCase(
      grader("SELECT.*FROM.*WHERE"),
      "```sql\nSELECT *\nFROM users\nWHERE age > 25\n```"
    );
    assert.equal(result.passed, true);
  });

  it("matches a multi-line numbered list (instr-02 Numbered list format)", () => {
    const result = evaluateCase(
      grader("1\\..*2\\..*3\\..*4\\..*5\\."),
      "1. Mercury\n2. Venus\n3. Earth\n4. Mars\n5. Jupiter"
    );
    assert.equal(result.passed, true);
  });

  it("still fails an answer that genuinely does not match", () => {
    const result = evaluateCase(grader("1.*2.*3.*4.*5"), "I will not answer that.");
    assert.equal(result.passed, false);
  });

  it("still anchors single-line patterns correctly", () => {
    const result = evaluateCase(grader("^\\s*[Bb]lue\\s*\\.?\\s*$"), "Blue.");
    assert.equal(result.passed, true);
  });

  it("keeps the safeRegex guard and the 512-character source limit", () => {
    const catastrophic = evaluateCase(grader("(a+)+$"), `${"a".repeat(40)}b`);
    assert.equal(catastrophic.passed, false);
    assert.match(String(catastrophic.details?.error), /unsafe/i);

    const oversized = evaluateCase(grader("a".repeat(600)), "aaa");
    assert.equal(oversized.passed, false);
    assert.match(String(oversized.details?.error), /too large/i);
  });

  it("still honours an explicit RegExp instance's own flags", () => {
    const makeCase = (value: RegExp) => ({
      id: "regexp-instance",
      name: "regexp instance",
      model: "gpt-4o",
      input: { messages: [{ role: "user", content: "irrelevant" }] },
      expected: { strategy: "regex", value },
    });

    // An author-supplied `s` is preserved (the RegExp branch keeps the author's flags).
    assert.equal(evaluateCase(makeCase(/1.*5/s), "1\n5").passed, true);
    // An author who does not ask for dotAll keeps that choice.
    assert.equal(evaluateCase(makeCase(/1.*5/), "1\n5").passed, false);
  });
});
