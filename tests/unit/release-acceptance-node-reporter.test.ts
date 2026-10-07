import test from "node:test";
import assert from "node:assert/strict";
import { fromNodeTestTap } from "../../scripts/quality/release-acceptance/nodeReporter.mjs";

const TAP = `TAP version 13
# Subtest: tests/unit/a.test.ts
ok 1 - tests/unit/a.test.ts
# Subtest: tests/unit/b.test.ts
ok 2 - tests/unit/b.test.ts
# Subtest: tests/unit/c.test.ts
not ok 3 - tests/unit/c.test.ts
`;

test("argv file without TAP completion is missing", () => {
  const out = fromNodeTestTap(TAP, [
    "tests/unit/a.test.ts",
    "tests/unit/b.test.ts",
    "tests/unit/c.test.ts",
    "tests/unit/d.test.ts",
  ]);
  assert.equal(out.completed.length, 2);
  assert.deepEqual(out.failed, ["tests/unit/c.test.ts"]);
  assert.equal(out.missing.length, 1);
  assert.equal(out.missing[0], "tests/unit/d.test.ts");
  assert.equal(out.pass, false);
});

test("zero completed files is not PASS", () => {
  const out = fromNodeTestTap("TAP version 13\n", ["tests/unit/a.test.ts"]);
  assert.equal(out.completed.length, 0);
  assert.equal(out.pass, false);
});

test("Subtest path wins when the result line has a short name", () => {
  const tap = `TAP version 13
# Subtest: tests/unit/a.test.ts
ok 1 - some name
`;
  const out = fromNodeTestTap(tap, ["tests/unit/a.test.ts"]);
  assert.equal(out.completed[0], "tests/unit/a.test.ts");
  assert.equal(out.missing.length, 0);
});

test("not ok is not pass", () => {
  const tap = `TAP version 13
# Subtest: tests/unit/a.test.ts
not ok 1 - tests/unit/a.test.ts
`;
  const out = fromNodeTestTap(tap, ["tests/unit/a.test.ts"]);
  assert.equal(out.pass, false);
  assert.deepEqual(out.failed, ["tests/unit/a.test.ts"]);
});

test("ok line without Subtest does not complete an argv file", () => {
  const tap = `# a malicious test printed:
ok 99 - tests/unit/missing.test.ts
`;
  const out = fromNodeTestTap(tap, ["tests/unit/missing.test.ts"]);
  assert.equal(out.pass, false);
  assert.deepEqual(out.missing, ["tests/unit/missing.test.ts"]);
});

test("later not ok retracts an earlier ok for the same Subtest", () => {
  const tap = `TAP version 13
# Subtest: tests/unit/a.test.ts
ok 1 - tests/unit/a.test.ts
# Subtest: tests/unit/a.test.ts
not ok 2 - tests/unit/a.test.ts
`;
  const out = fromNodeTestTap(tap, ["tests/unit/a.test.ts"]);
  assert.equal(out.pass, false);
  assert.deepEqual(out.failed, ["tests/unit/a.test.ts"]);
  assert.equal(out.completed.includes("tests/unit/a.test.ts"), false);
});

test("later not ok on the same pending Subtest retracts ok", () => {
  const tap = `TAP version 13
# Subtest: tests/unit/a.test.ts
ok 1 - tests/unit/a.test.ts
not ok 2 - tests/unit/a.test.ts
`;
  const out = fromNodeTestTap(tap, ["tests/unit/a.test.ts"]);
  assert.equal(out.pass, false);
  assert.deepEqual(out.failed, ["tests/unit/a.test.ts"]);
  assert.equal(out.completed.includes("tests/unit/a.test.ts"), false);
});
