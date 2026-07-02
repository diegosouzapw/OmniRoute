import { test } from "node:test";
import assert from "node:assert";
import {
  countAssertions,
  countTautologies,
  countSkips,
  countExtendedTautologies,
  evaluateMasking,
  evaluateDeletedFiles,
  partitionDeletedRenamed,
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
  const r = evaluateMasking([
    {
      file: "a.test.ts",
      baseAsserts: 5,
      headAsserts: 3,
      baseTaut: 0,
      headTaut: 0,
      baseSkips: 0,
      headSkips: 0,
      baseExtTaut: 0,
      headExtTaut: 0,
    },
  ]);
  assert.equal(r.length, 1);
  assert.match(r[0], /a\.test\.ts/);
});

test("adding assertions is not flagged", () => {
  const r = evaluateMasking([
    {
      file: "a.test.ts",
      baseAsserts: 5,
      headAsserts: 7,
      baseTaut: 0,
      headTaut: 0,
      baseSkips: 0,
      headSkips: 0,
      baseExtTaut: 0,
      headExtTaut: 0,
    },
  ]);
  assert.deepEqual(r, []);
});

test("new assert.ok(true) tautology is flagged even if assert count is stable", () => {
  const r = evaluateMasking([
    {
      file: "a.test.ts",
      baseAsserts: 5,
      headAsserts: 5,
      baseTaut: 0,
      headTaut: 1,
      baseSkips: 0,
      headSkips: 0,
      baseExtTaut: 0,
      headExtTaut: 0,
    },
  ]);
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
  const r = evaluateMasking([
    {
      file: "a.test.ts",
      baseAsserts: 5,
      headAsserts: 5,
      baseTaut: 0,
      headTaut: 0,
      baseSkips: 1,
      headSkips: 3,
      baseExtTaut: 0,
      headExtTaut: 0,
    },
  ]);
  assert.equal(r.length, 1);
  assert.match(r[0], /skip|todo|only/i);
});

test("evaluateMasking: net decrease in skips (fixes) is not flagged", () => {
  const r = evaluateMasking([
    {
      file: "a.test.ts",
      baseAsserts: 5,
      headAsserts: 5,
      baseTaut: 0,
      headTaut: 0,
      baseSkips: 3,
      headSkips: 1,
      baseExtTaut: 0,
      headExtTaut: 0,
    },
  ]);
  assert.deepEqual(r, []);
});

test("evaluateMasking: adding .only is flagged (filters rest of suite)", () => {
  // .only additions are captured by countSkips net increase
  const r = evaluateMasking([
    {
      file: "a.test.ts",
      baseAsserts: 10,
      headAsserts: 10,
      baseTaut: 0,
      headTaut: 0,
      baseSkips: 0,
      headSkips: 1,
      baseExtTaut: 0,
      headExtTaut: 0,
    },
  ]);
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
  const r = evaluateMasking([
    {
      file: "a.test.ts",
      baseAsserts: 5,
      headAsserts: 5,
      baseTaut: 0,
      headTaut: 0,
      baseSkips: 0,
      headSkips: 0,
      baseExtTaut: 0,
      headExtTaut: 1,
    },
  ]);
  assert.equal(r.length, 1);
  assert.match(r[0], /tautolog/i);
});

test("evaluateMasking: no new extended tautology is not flagged", () => {
  const r = evaluateMasking([
    {
      file: "a.test.ts",
      baseAsserts: 5,
      headAsserts: 5,
      baseTaut: 0,
      headTaut: 0,
      baseSkips: 0,
      headSkips: 0,
      baseExtTaut: 1,
      headExtTaut: 1,
    },
  ]);
  assert.deepEqual(r, []);
});

test("evaluateMasking: net reduction is NOT flagged for an allowlisted file", () => {
  const perFile = [
    {
      file: "legit.test.ts",
      baseAsserts: 5,
      headAsserts: 3,
      baseTaut: 0,
      headTaut: 0,
      baseSkips: 0,
      headSkips: 0,
      baseExtTaut: 0,
      headExtTaut: 0,
    },
  ];
  const flagged = evaluateMasking(perFile);
  assert.equal(flagged.length, 1, "without allowlist the reduction is flagged");
  const allowed = evaluateMasking(perFile, new Set(["legit.test.ts"]));
  assert.deepEqual(allowed, [], "with allowlist the reduction is exempt");
});

// ─── Rename-aware deletion detection (subcheck-1 contract) ───────────────────

test("partitionDeletedRenamed: a true test-file deletion is captured as deleted", () => {
  const out = "D\ttests/unit/foo.test.ts";
  const { deletedTests, renames } = partitionDeletedRenamed(out);
  assert.deepEqual(deletedTests, ["tests/unit/foo.test.ts"]);
  assert.deepEqual(renames, []);
});

test("partitionDeletedRenamed: a test→test rename is a relocation, NOT a deletion", () => {
  const out =
    "R085\ttests/unit/cli/live-ws-startup.test.ts\ttests/integration/live-ws-startup.test.ts";
  const { deletedTests, renames } = partitionDeletedRenamed(out);
  assert.deepEqual(deletedTests, [], "relocation must not be flagged as a deletion");
  assert.equal(renames.length, 1);
  assert.equal(renames[0].from, "tests/unit/cli/live-ws-startup.test.ts");
  assert.equal(renames[0].to, "tests/integration/live-ws-startup.test.ts");
});

test("partitionDeletedRenamed: a test→non-test rename is recorded (caller treats as removed)", () => {
  const out = "R070\ttests/unit/foo.test.ts\tsrc/foo.ts";
  const { deletedTests, renames } = partitionDeletedRenamed(out);
  assert.deepEqual(deletedTests, []);
  assert.equal(renames.length, 1);
  assert.equal(renames[0].to, "src/foo.ts");
});

test("partitionDeletedRenamed: non-test deletions/renames are ignored", () => {
  const out = ["D\tsrc/lib/foo.ts", "R090\tsrc/a.ts\tsrc/b.ts", ""].join("\n");
  const { deletedTests, renames } = partitionDeletedRenamed(out);
  assert.deepEqual(deletedTests, []);
  assert.deepEqual(renames, []);
});

test("relocated test with preserved asserts is NOT masking (evaluateMasking on the rename)", () => {
  // Simulates the rename pipeline: base(old) vs head(new) for a clean relocation.
  const r = evaluateMasking([
    {
      file: "tests/integration/live-ws-startup.test.ts",
      baseAsserts: 2,
      headAsserts: 2, // preserved across the move
      baseTaut: 0,
      headTaut: 0,
      baseSkips: 0,
      headSkips: 0,
      baseExtTaut: 0,
      headExtTaut: 0,
    },
  ]);
  assert.deepEqual(r, []);
});

test("a rename that DROPS asserts still fires (gutting-via-rename)", () => {
  const r = evaluateMasking([
    {
      file: "tests/integration/gutted.test.ts",
      baseAsserts: 8,
      headAsserts: 2, // asserts removed during the move
      baseTaut: 0,
      headTaut: 0,
      baseSkips: 0,
      headSkips: 0,
      baseExtTaut: 0,
      headExtTaut: 0,
    },
  ]);
  assert.equal(r.length, 1);
  assert.match(r[0], /REMO/);
});

test("evaluateMasking: allowlist exempts ONLY reduction — tautology/skip still flagged", () => {
  const r = evaluateMasking(
    [
      {
        file: "legit.test.ts",
        baseAsserts: 5,
        headAsserts: 3, // net reduction — exempt for allowlisted file
        baseTaut: 0,
        headTaut: 1, // a new tautology — NOT exempt
        baseSkips: 0,
        headSkips: 1, // a new skip marker — NOT exempt
        baseExtTaut: 0,
        headExtTaut: 0,
      },
    ],
    new Set(["legit.test.ts"])
  );
  assert.equal(r.length, 2, "tautology + skip still flagged despite allowlist");
  assert.ok(r.some((f) => /tautolog/i.test(f)));
  assert.ok(r.some((f) => /skip/i.test(f)));
});
