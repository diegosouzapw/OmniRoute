// tests/unit/build/check-pr-evidence.test.ts
// TDD tests for the evaluatePrBody() pure function in check-pr-evidence.mjs.
// Validates that the gate correctly detects outcome claims and evidence blocks.
import test from "node:test";
import assert from "node:assert/strict";
import { evaluatePrBody } from "../../../scripts/check/check-pr-evidence.mjs";

// ---------------------------------------------------------------------------
// (a) Body with claim + evidence block => PASS
// ---------------------------------------------------------------------------

test("evaluatePrBody: strong claim + fenced code block with test output => pass", () => {
  const body = `
## Summary
Fixed the null-pointer bug.

All tests pass.

## Output
\`\`\`
42 passing (3s)
0 failing
\`\`\`
`;
  const { result } = evaluatePrBody(body);
  assert.equal(result, "pass");
});

test("evaluatePrBody: strong claim + inline result code span => pass", () => {
  const body = "Typecheck is clean. Result: `42 passing`";
  const { result } = evaluatePrBody(body);
  assert.equal(result, "pass");
});

test("evaluatePrBody: strong claim + Evidence section header with content => pass", () => {
  const body = `
Fixed the regression.
Validated locally.

## Evidence
node --import tsx/esm --test tests/unit/foo.test.ts
14 tests passed, 0 failed.
`;
  const { result } = evaluatePrBody(body);
  assert.equal(result, "pass");
});

test("evaluatePrBody: 'all green' claim + fenced block with PASS token => pass", () => {
  const body = `
All tests are green.

\`\`\`
PASS src/foo.test.ts
Test Suites: 1 passed, 1 total
Tests: 5 passed, 5 total
\`\`\`
`;
  const { result } = evaluatePrBody(body);
  assert.equal(result, "pass");
});

test("evaluatePrBody: two weak triggers + fenced code block with output => pass", () => {
  const body = `
Added a new endpoint for health checks.
Resolves #123.

\`\`\`
npm run test
14 passing (1s)
\`\`\`
`;
  const { result } = evaluatePrBody(body);
  assert.equal(result, "pass");
});

// ---------------------------------------------------------------------------
// (b) Body with claim + NO evidence block => FAIL
// ---------------------------------------------------------------------------

test("evaluatePrBody: 'all tests pass' with no evidence => fail", () => {
  const body = "Fixed the bug. All tests pass and I added a new endpoint.";
  const { result, reason } = evaluatePrBody(body);
  assert.equal(result, "fail");
  assert.ok(reason.includes("Rule #18"), `reason should mention Rule #18, got: ${reason}`);
});

test("evaluatePrBody: 'typecheck is clean' with no evidence => fail", () => {
  const body = "Refactored the module. Typecheck pass and lint is clean.";
  const { result } = evaluatePrBody(body);
  assert.equal(result, "fail");
});

test("evaluatePrBody: 'tests passing' + fenced block with no output-like content => fail", () => {
  const body = `
Tests are passing!

\`\`\`ts
// just a code snippet, not output
export function foo() { return 42; }
\`\`\`
`;
  const { result } = evaluatePrBody(body);
  assert.equal(result, "fail");
});

test("evaluatePrBody: two weak triggers + no evidence => fail", () => {
  const body = "Fixed the issue. Resolves #456. Looks good to me.";
  const { result } = evaluatePrBody(body);
  assert.equal(result, "fail");
});

test("evaluatePrBody: 'validated on VPS' with no evidence block => fail", () => {
  const body = "Validated on VPS. Everything works correctly.";
  const { result } = evaluatePrBody(body);
  assert.equal(result, "fail");
});

// ---------------------------------------------------------------------------
// (c) Body with no claim terms => PASS
// ---------------------------------------------------------------------------

test("evaluatePrBody: body without any claim terms => pass", () => {
  const body = `
## Summary
Update the README with new provider list.
Adds documentation for the new streaming format.
`;
  const { result } = evaluatePrBody(body);
  assert.equal(result, "pass");
});

test("evaluatePrBody: body with only one weak trigger => pass (not enough to fire)", () => {
  const body = "Resolves #789 by updating the config file.";
  const { result } = evaluatePrBody(body);
  assert.equal(result, "pass");
});

test("evaluatePrBody: body describing a pure docs change with no claims => pass", () => {
  const body = "Updates ARCHITECTURE.md to reflect the new combo routing design.";
  const { result } = evaluatePrBody(body);
  assert.equal(result, "pass");
});

// ---------------------------------------------------------------------------
// (d) Empty/missing body => SKIP (or pass — no blocking)
// ---------------------------------------------------------------------------

test("evaluatePrBody: empty string => skip", () => {
  const { result } = evaluatePrBody("");
  assert.equal(result, "skip");
});

test("evaluatePrBody: whitespace-only string => skip", () => {
  const { result } = evaluatePrBody("   \n  \t  ");
  assert.equal(result, "skip");
});

test("evaluatePrBody: undefined body => skip (treat as empty)", () => {
  // @ts-expect-error — testing defensive path
  const { result } = evaluatePrBody(undefined);
  assert.equal(result, "skip");
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

test("evaluatePrBody: fenced block with exit-code output => pass (strong trigger present)", () => {
  const body = `
Fixes the build. Zero errors after this change.

\`\`\`
$ npm run typecheck
exit code 0
\`\`\`
`;
  const { result } = evaluatePrBody(body);
  assert.equal(result, "pass");
});

test("evaluatePrBody: evidence section header present but with minimal content => pass (strong trigger)", () => {
  // "Validated locally" is a strong trigger.  Evidence section has 25+ chars.
  const body = `
Validated locally on the production VPS.

## Validation
Ran the full test suite and observed 0 failures from the terminal.
`;
  const { result } = evaluatePrBody(body);
  assert.equal(result, "pass");
});

test("evaluatePrBody: inline PASSED span counts as evidence", () => {
  const body = "All tests pass. Result: `PASSED 14 tests`";
  const { result } = evaluatePrBody(body);
  assert.equal(result, "pass");
});
