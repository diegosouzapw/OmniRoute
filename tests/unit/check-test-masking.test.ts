import { test } from "node:test";
import assert from "node:assert";
import {
  countAssertions,
  countTautologies,
  evaluateMasking,
} from "../../scripts/check/check-test-masking.mjs";

test("countAssertions counts assert.* and expect() calls", () => {
  const src = `assert.equal(a, b);\nassert.ok(x);\nexpect(y).toBe(z);`;
  assert.equal(countAssertions(src), 3);
});

test("countTautologies counts assert.ok(true)", () => {
  assert.equal(countTautologies(`assert.ok(true);\nassert.ok( true );`), 2);
});

test("net removal of assertions in a changed test file is flagged", () => {
  const r = evaluateMasking([{ file: "a.test.ts", baseAsserts: 5, headAsserts: 3, baseTaut: 0, headTaut: 0 }]);
  assert.equal(r.length, 1);
  assert.match(r[0], /a\.test\.ts/);
});

test("adding assertions is not flagged", () => {
  const r = evaluateMasking([{ file: "a.test.ts", baseAsserts: 5, headAsserts: 7, baseTaut: 0, headTaut: 0 }]);
  assert.deepEqual(r, []);
});

test("new assert.ok(true) tautology is flagged even if assert count is stable", () => {
  const r = evaluateMasking([{ file: "a.test.ts", baseAsserts: 5, headAsserts: 5, baseTaut: 0, headTaut: 1 }]);
  assert.equal(r.length, 1);
  assert.match(r[0], /tautolog/i);
});
