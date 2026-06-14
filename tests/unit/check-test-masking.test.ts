import { test } from "node:test";
import assert from "node:assert";
import {
  countAssertions,
  countTautologies,
  countSkips,
  countExtendedTautologies,
  evaluateMasking,
  evaluateDeletedFiles,
} from "../../scripts/check/check-test-masking.mjs";

// ─── Existing tests (must stay green) ────────────────────────────────────────

test("countAssertions counts assert.* and expect() calls", () => {
  const src = `assert.equal(a, b);\nassert.ok(x);\nexpect(y).toBe(z);`;
  assert.equal(countAssertions(src), 3);
});

test("countTautologies counts assert.ok(true)", () => {
  assert.equal(countTautologies(`assert.ok(true);\nassert.ok( true );`), 2);
});

test("net removal of assertions in a changed test file is flagged", () => {
  const r = evaluateMasking([{ file: "a.test.ts", baseAsserts: 5, headAsserts: 3, baseTaut: 0, headTaut: 0, baseSkips: 0, headSkips: 0, baseExtTaut: 0, headExtTaut: 0 }]);
  assert.equal(r.length, 1);
  assert.match(r[0], /a\.test\.ts/);
});

test("adding assertions is not flagged", () => {
  const r = evaluateMasking([{ file: "a.test.ts", baseAsserts: 5, headAsserts: 7, baseTaut: 0, headTaut: 0, baseSkips: 0, headSkips: 0, baseExtTaut: 0, headExtTaut: 0 }]);
  assert.deepEqual(r, []);
});

test("new assert.ok(true) tautology is flagged even if assert count is stable", () => {
  const r = evaluateMasking([{ file: "a.test.ts", baseAsserts: 5, headAsserts: 5, baseTaut: 0, headTaut: 1, baseSkips: 0, headSkips: 0, baseExtTaut: 0, headExtTaut: 0 }]);
  assert.equal(r.length, 1);
  assert.match(r[0], /tautolog/i);
});

// ─── 6A.10 Subcheck 1: Deleted test files ────────────────────────────────────

test("evaluateDeletedFiles: deleted test file is flagged", () => {
  const flags = evaluateDeletedFiles(["tests/unit/foo.test.ts"]);
  assert.equal(flags.length, 1);
  assert.match(flags[0], /foo\.test\.ts/);
  assert.match(flags[0], /deletado|deleted/i);
});

test("evaluateDeletedFiles: deleted non-test file is not flagged", () => {
  const flags = evaluateDeletedFiles(["src/lib/foo.ts"]);
  assert.deepEqual(flags, []);
});

test("evaluateDeletedFiles: empty list returns no flags", () => {
  assert.deepEqual(evaluateDeletedFiles([]), []);
});

test("evaluateDeletedFiles: multiple deleted test files all flagged", () => {
  const flags = evaluateDeletedFiles([
    "tests/unit/a.test.ts",
    "tests/unit/b.spec.ts",
    "src/lib/utils.ts",
  ]);
  assert.equal(flags.length, 2);
});

// ─── 6A.10 Subcheck 2: Net increase of skip/todo/only ────────────────────────

test("countSkips counts .skip, .todo, .only and skip:true", () => {
  const src = `
    test.skip("foo", () => {});
    test.todo("bar");
    test.only("baz", () => {});
    test("qux", { skip: true }, () => {});
  `;
  assert.equal(countSkips(src), 4);
});

test("countSkips returns 0 for clean test file", () => {
  const src = `
    test("clean", () => { assert.ok(true); });
  `;
  assert.equal(countSkips(src), 0);
});

test("evaluateMasking: net increase in skips is flagged", () => {
  const r = evaluateMasking([{
    file: "a.test.ts",
    baseAsserts: 5, headAsserts: 5,
    baseTaut: 0, headTaut: 0,
    baseSkips: 1, headSkips: 3,
    baseExtTaut: 0, headExtTaut: 0,
  }]);
  assert.equal(r.length, 1);
  assert.match(r[0], /skip|todo|only/i);
});

test("evaluateMasking: net decrease in skips (fixes) is not flagged", () => {
  const r = evaluateMasking([{
    file: "a.test.ts",
    baseAsserts: 5, headAsserts: 5,
    baseTaut: 0, headTaut: 0,
    baseSkips: 3, headSkips: 1,
    baseExtTaut: 0, headExtTaut: 0,
  }]);
  assert.deepEqual(r, []);
});

test("evaluateMasking: adding .only is flagged (filters rest of suite)", () => {
  // .only additions are captured by countSkips net increase
  const r = evaluateMasking([{
    file: "a.test.ts",
    baseAsserts: 10, headAsserts: 10,
    baseTaut: 0, headTaut: 0,
    baseSkips: 0, headSkips: 1,
    baseExtTaut: 0, headExtTaut: 0,
  }]);
  assert.equal(r.length, 1);
});

// ─── 6A.10 Subcheck 3: Extended tautologies ──────────────────────────────────

test("countExtendedTautologies: detects expect(true).toBe(true)", () => {
  const src = `expect(true).toBe(true);`;
  assert.equal(countExtendedTautologies(src), 1);
});

test("countExtendedTautologies: detects assert.equal(1, 1)", () => {
  const src = `assert.equal(1, 1);`;
  assert.equal(countExtendedTautologies(src), 1);
});

test("countExtendedTautologies: detects assert.strictEqual(1, 1)", () => {
  const src = `assert.strictEqual(1, 1);`;
  assert.equal(countExtendedTautologies(src), 1);
});

test("countExtendedTautologies: detects assert.ok(true)", () => {
  // Note: assert.ok(true) already counted by countTautologies, but also in extended
  const src = `assert.ok(true);`;
  assert.equal(countExtendedTautologies(src), 1);
});

test("countExtendedTautologies: returns 0 for real assertions", () => {
  const src = `
    expect(result).toBe(42);
    assert.equal(a, b);
    assert.ok(someCondition);
  `;
  assert.equal(countExtendedTautologies(src), 0);
});

test("countExtendedTautologies: handles whitespace variants", () => {
  const src = `
    expect( true ).toBe( true );
    assert.equal( 1,  1 );
  `;
  assert.equal(countExtendedTautologies(src), 2);
});

test("evaluateMasking: new extended tautology is flagged", () => {
  const r = evaluateMasking([{
    file: "a.test.ts",
    baseAsserts: 5, headAsserts: 5,
    baseTaut: 0, headTaut: 0,
    baseSkips: 0, headSkips: 0,
    baseExtTaut: 0, headExtTaut: 1,
  }]);
  assert.equal(r.length, 1);
  assert.match(r[0], /tautolog/i);
});

test("evaluateMasking: no new extended tautology is not flagged", () => {
  const r = evaluateMasking([{
    file: "a.test.ts",
    baseAsserts: 5, headAsserts: 5,
    baseTaut: 0, headTaut: 0,
    baseSkips: 0, headSkips: 0,
    baseExtTaut: 1, headExtTaut: 1,
  }]);
  assert.deepEqual(r, []);
});
