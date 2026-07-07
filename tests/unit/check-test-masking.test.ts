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
  countSignificantTokens,
  extractProdConditions,
  extractImports,
  findReimplementedConditions,
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

test("evaluateDeletedFiles: deletion with verified replacement (allowlisted, replacement exists) is not flagged", () => {
  const allow = {
    "tests/unit/foo.test.ts": {
      replacement: "tests/unit/bar.test.ts",
      reason: "v9.9.9 #0000: rewritten as deterministic unit test",
    },
  };
  const flags = evaluateDeletedFiles(
    ["tests/unit/foo.test.ts"],
    allow,
    (p) => p === "tests/unit/bar.test.ts"
  );
  assert.deepEqual(flags, []);
});

test("evaluateDeletedFiles: allowlisted deletion whose replacement does NOT exist is still flagged", () => {
  const allow = {
    "tests/unit/foo.test.ts": {
      replacement: "tests/unit/missing.test.ts",
      reason: "v9.9.9 #0000: bogus",
    },
  };
  const flags = evaluateDeletedFiles(["tests/unit/foo.test.ts"], allow, () => false);
  assert.equal(flags.length, 1);
  assert.match(flags[0], /substituto|replacement/i);
});

test("evaluateDeletedFiles: allowlisted deletion whose replacement is not a test file is still flagged", () => {
  const allow = {
    "tests/unit/foo.test.ts": {
      replacement: "src/lib/notATest.ts",
      reason: "v9.9.9 #0000: bogus",
    },
  };
  const flags = evaluateDeletedFiles(["tests/unit/foo.test.ts"], allow, () => true);
  assert.equal(flags.length, 1);
});

test("evaluateDeletedFiles: deletion not present in the allowlist is flagged as before", () => {
  const allow = {
    "tests/unit/other.test.ts": {
      replacement: "tests/unit/bar.test.ts",
      reason: "v9.9.9 #0000: unrelated entry",
    },
  };
  const flags = evaluateDeletedFiles(["tests/unit/foo.test.ts"], allow, () => true);
  assert.equal(flags.length, 1);
  assert.match(flags[0], /foo\.test\.ts/);
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

// ─── 6348 Subcheck 4: inline-reimplemented prod conditions (REPORT-ONLY) ──────

test("countSignificantTokens: `status >= 500` has 3 significant tokens", () => {
  assert.equal(countSignificantTokens("status >= 500"), 3);
});

test("countSignificantTokens: `x === LIMIT && y` has 3 significant tokens", () => {
  assert.equal(countSignificantTokens("x === LIMIT && y"), 3);
});

test("countSignificantTokens: trivial `x > 0` has <3 significant tokens (noise guard)", () => {
  assert.ok(countSignificantTokens("x > 0") < 3);
});

test("extractProdConditions: pulls the if-condition and its owning symbol", () => {
  const prod = [
    "export function isServerError(status) {",
    "  if (status >= 500) {",
    "    return true;",
    "  }",
    "  return false;",
    "}",
  ].join("\n");
  const conds = extractProdConditions(prod);
  const hit = conds.find((c) => c.condition === "status >= 500");
  assert.ok(hit, "the ≥3-token condition is extracted");
  assert.equal(hit.owner, "isServerError");
});

test("extractProdConditions: ignores trivial <3-token conditions", () => {
  const prod = "export function f(x) {\n  if (x > 0) return 1;\n  return 0;\n}";
  assert.deepEqual(extractProdConditions(prod), []);
});

test("extractImports: collects named bindings and module specifiers", () => {
  const src = `import { isServerError, foo } from "../src/http";\nimport def from "./bar";`;
  const names = extractImports(src);
  assert.ok(names.has("isServerError"));
  assert.ok(names.has("foo"));
  assert.ok(names.has("def"));
});

const PROD_SERVER_ERROR = [
  "export function isServerError(status) {",
  "  if (status >= 500) {",
  "    return true;",
  "  }",
  "  return false;",
  "}",
].join("\n");

test("MASKED: test re-implements `status >= 500` without importing the owner → flagged", () => {
  const testSrc = [
    'import { test } from "node:test";',
    'import assert from "node:assert";',
    "// re-encodes the prod branch locally instead of importing isServerError",
    "function localCheck(status) {",
    "  return status >= 500;",
    "}",
    'test("server error", () => {',
    "  assert.equal(localCheck(503), true);",
    "});",
  ].join("\n");
  const flags = findReimplementedConditions(
    [PROD_SERVER_ERROR],
    testSrc,
    extractImports(testSrc)
  );
  assert.equal(flags.length, 1);
  assert.equal(flags[0].condition, "status >= 500");
  assert.equal(flags[0].owner, "isServerError");
});

test("CLEAN: test imports and calls the real function → not flagged", () => {
  const testSrc = [
    'import { test } from "node:test";',
    'import assert from "node:assert";',
    'import { isServerError } from "../../src/http";',
    'test("server error", () => {',
    "  assert.equal(isServerError(503), true);",
    "  assert.equal(isServerError(200), false);",
    "});",
  ].join("\n");
  const flags = findReimplementedConditions(
    [PROD_SERVER_ERROR],
    testSrc,
    extractImports(testSrc)
  );
  assert.deepEqual(flags, []);
});

test("CLEAN: importing the owner exempts even a textual copy of its condition", () => {
  // The test both imports the owner AND happens to spell the condition — importing
  // the owner means it exercises the real symbol, so the condition is not masked.
  const testSrc = [
    'import { isServerError } from "../../src/http";',
    "// documents that isServerError fires when status >= 500",
    'test("t", () => { isServerError(503); });',
  ].join("\n");
  const flags = findReimplementedConditions(
    [PROD_SERVER_ERROR],
    testSrc,
    extractImports(testSrc)
  );
  assert.deepEqual(flags, []);
});

test("CLEAN: trivial `x > 0` condition is never flagged (noise guard)", () => {
  const prod = "export function f(x) {\n  if (x > 0) return 1;\n  return 0;\n}";
  const testSrc = [
    'import { test } from "node:test";',
    "function local(x) { return x > 0; }",
    'test("t", () => { local(1); });',
  ].join("\n");
  const flags = findReimplementedConditions([prod], testSrc, extractImports(testSrc));
  assert.deepEqual(flags, []);
});

test("findReimplementedConditions: matches despite operator-spacing differences", () => {
  const prod = "export function big(status) {\n  if (status >= 500) return true;\n}";
  // test spells the same condition with no spaces around the operator
  const testSrc = "function local(status){ return status>=500; }";
  const flags = findReimplementedConditions([prod], testSrc, extractImports(testSrc));
  assert.equal(flags.length, 1);
  assert.equal(flags[0].condition, "status >= 500");
});
