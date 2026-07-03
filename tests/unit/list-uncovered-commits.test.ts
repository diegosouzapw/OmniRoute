import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../scripts/release/list-uncovered-commits.mjs");
const { refsOf, typeOf, computeUncovered, changelogRefWindow } = mod;

test("refsOf extracts every #N from a subject", () => {
  assert.deepEqual(refsOf("fix(x): thing (#5842) (#5901)"), [5842, 5901]);
  assert.deepEqual(refsOf("chore: no refs here"), []);
});

test("typeOf reads the conventional-commit type", () => {
  assert.equal(typeOf("feat(api): x"), "feat");
  assert.equal(typeOf("fix: y"), "fix");
  assert.equal(typeOf("refactor(db)!: z"), "refactor");
  assert.equal(typeOf("Merge branch main"), "other");
});

test("computeUncovered: a commit is covered iff ANY of its refs is in the changelog window", () => {
  const commits = [
    { hash: "a1", subject: "fix(x): covered by issue ref (#100)" }, // issue 100 in changelog
    { hash: "b2", subject: "feat(y): uncovered feature (#200)" }, // 200 not in changelog
    { hash: "c3", subject: "refactor(z): internal (#300)" }, // rollup type, uncovered
    { hash: "d4", subject: "chore: no ref at all" }, // no ref → uncovered, rollup
  ];
  const refs = new Set([100]); // only #100 is documented
  const { covered, uncovered } = computeUncovered(commits, refs);
  assert.equal(covered, 1);
  assert.equal(uncovered.length, 3);
  const byHash = Object.fromEntries(uncovered.map((c) => [c.hash, c]));
  assert.equal(byHash.b2.rollup, false, "feat is user-facing, not a rollup candidate");
  assert.equal(byHash.c3.rollup, true, "refactor is a rollup candidate");
  assert.equal(byHash.d4.rollup, true, "chore is a rollup candidate");
});

test("changelogRefWindow scans [Unreleased] + the version section but not older versions", () => {
  const cl = `# Changelog

## [Unreleased]

- **fix:** something ([#10](u))

---

## [3.9.0] — x

### 🔧 Bug Fixes

- **fix(a):** landed ([#20](u))

---

## [3.8.99] — y

- **fix(old):** must not count ([#999](u))

---
`;
  const refs = changelogRefWindow(cl, "3.9.0");
  assert.ok(refs.has(10), "picks up [Unreleased] refs");
  assert.ok(refs.has(20), "picks up the target version refs");
  assert.ok(!refs.has(999), "does NOT bleed into the previous version");
});
