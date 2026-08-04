import test from "node:test";
import assert from "node:assert/strict";
import { renderTestGreen } from "../../../open-sse/services/compression/engines/rtk/renderers/testGreen.ts";

const det = (t: string) => ({
  type: t,
  command: "",
  confidence: 1,
  category: "test",
  matchedPatterns: [],
});

test("pytest all-green collapses to summary", () => {
  const input = `============ test session starts ============
collected 142 items
tests/a.py ....................
tests/b.py ....................
============ 142 passed in 3.21s ============`;
  const r = renderTestGreen(input, det("test-pytest"));
  assert.equal(r.changed, true);
  assert.ok(r.text.includes("142 passed"));
  assert.ok(!r.text.includes("...................."));
});

test("any failure ⇒ no-op (preserve diagnostics)", () => {
  const input = `tests/a.py ..F..
=== 1 failed, 4 passed in 1.0s ===
E   AssertionError: nope`;
  const r = renderTestGreen(input, det("test-pytest"));
  assert.equal(r.changed, false);
});

test("ANSI-colored FAIL with no numeric failed-count ⇒ no-op (regression: \\bFAIL\\b defeated by ANSI)", () => {
  // jest/vitest emit a colored FAIL header; the ESC[31m byte 'm' before 'F' kills the
  // word boundary. With the per-test failed-count line already stripped by an upstream
  // filter, the ANSI strip in the guard is the only thing preventing a collapsed failure.
  const input = "[1m[31mFAIL[39m[22m src/auth.test.ts\nTests: 3 passed, 3 total";
  const r = renderTestGreen(input, det("test-jest"));
  assert.equal(r.changed, false);
});
