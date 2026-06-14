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
