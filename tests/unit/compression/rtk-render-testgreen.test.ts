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
