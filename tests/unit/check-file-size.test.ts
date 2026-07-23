import { test } from "node:test";
import assert from "node:assert";
import { evaluateFileSizes } from "../../scripts/check/check-file-size.mjs";

const cap = 800;

test("frozen file at exactly its baseline passes", () => {
  const r = evaluateFileSizes({ "a.ts": 1000 }, { "a.ts": 1000 }, cap);
  assert.deepEqual(r.violations, []);
  assert.deepEqual(r.improvements, []);
});

test("frozen file that grew is a violation", () => {
  const r = evaluateFileSizes({ "a.ts": 1001 }, { "a.ts": 1000 }, cap);
  assert.equal(r.violations.length, 1);
  assert.match(r.violations[0], /a\.ts/);
});

test("frozen file that shrank is an improvement, not a violation", () => {
  const r = evaluateFileSizes({ "a.ts": 950 }, { "a.ts": 1000 }, cap);
  assert.deepEqual(r.violations, []);
  assert.deepEqual(r.improvements, [["a.ts", 950]]);
});

test("new file over the cap is a violation", () => {
  const r = evaluateFileSizes({ "new.ts": 801 }, {}, cap);
  assert.equal(r.violations.length, 1);
  assert.match(r.violations[0], /new\.ts/);
});

test("new file at or under the cap passes", () => {
  const r = evaluateFileSizes({ "new.ts": 800 }, {}, cap);
  assert.deepEqual(r.violations, []);
});

// --- Test-file path (Layer 1 anti-reinflation: same evaluateFileSizes, testCap=800) ---
// The test-file gate reuses evaluateFileSizes with (currentTestLoc, testFrozen, testCap),
// so we exercise it directly with test-file-shaped inputs.

const testCap = 800;

test("new test file over the testCap is a violation", () => {
  const r = evaluateFileSizes({ "tests/unit/huge.test.ts": 1200 }, {}, testCap);
  assert.equal(r.violations.length, 1);
  assert.match(r.violations[0], /huge\.test\.ts/);
});

test("new test file at or under the testCap passes", () => {
  const r = evaluateFileSizes({ "tests/unit/small.test.ts": 800 }, {}, testCap);
  assert.deepEqual(r.violations, []);
  assert.deepEqual(r.improvements, []);
});

test("frozen test file that grew is a violation", () => {
  const r = evaluateFileSizes(
    { "tests/unit/combo-routing-engine.test.ts": 3300 },
    { "tests/unit/combo-routing-engine.test.ts": 3213 },
    testCap
  );
  assert.equal(r.violations.length, 1);
  assert.match(r.violations[0], /combo-routing-engine\.test\.ts/);
});

test("frozen test file that shrank is an improvement, not a violation", () => {
  const r = evaluateFileSizes(
    { "tests/unit/combo-routing-engine.test.ts": 3000 },
    { "tests/unit/combo-routing-engine.test.ts": 3213 },
    testCap
  );
  assert.deepEqual(r.violations, []);
  assert.deepEqual(r.improvements, [["tests/unit/combo-routing-engine.test.ts", 3000]]);
});
