import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../scripts/release/list-uncovered-commits.mjs");
const {
  refsOf,
  typeOf,
  computeUncovered,
  changelogRefWindow,
  fragmentFilenameRef,
  fragmentRefs,
  collectChangelogRefs,
} = mod;

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

// ── changelog.d fragment coverage (#6857) ────────────────────────────────────
// Since fragments-first (#6783) a merged PR's changelog entry usually lives in
// changelog.d/{features,fixes,maintenance}/<PR>-<slug>.md, NOT in CHANGELOG.md yet.
// A commit whose #N only exists in a fragment must count as covered.

test("fragmentFilenameRef reads the leading <N>- PR number from a fragment filename", () => {
  assert.equal(fragmentFilenameRef("6708-gemma4-thinkingconfig-guard.md"), 6708);
  assert.equal(fragmentFilenameRef("features/6072-ws-server.md"), 6072);
  assert.equal(fragmentFilenameRef("README.md"), null, "non-numeric prefix → null");
  assert.equal(fragmentFilenameRef(".gitkeep"), null);
});

test("fragmentRefs unions filename PR numbers with every #N in the body", () => {
  const fragments = [
    // no #N in the body — the ref lives ONLY in the filename (real case: 6708)
    { name: "6708-gemma4-thinkingconfig-guard.md", body: "- **fix(sse):** skip thinkingConfig\n" },
    // body cites additional refs beyond the filename
    { name: "6709-xai-responses.md", body: "- **feat:** xAI (#6710 relates #6711)\n" },
  ];
  const refs = fragmentRefs(fragments);
  assert.ok(refs.has(6708), "filename-only PR number is covered");
  assert.ok(refs.has(6709), "filename PR number of a body-ref fragment");
  assert.ok(refs.has(6710), "body #N is covered");
  assert.ok(refs.has(6711), "every body #N is covered");
});

test("collectChangelogRefs unions the CHANGELOG window with changelog.d fragment refs", () => {
  const cl = `# Changelog

## [Unreleased]

## [3.9.0] — x

- **fix(a):** landed ([#20](u))

---
`;
  const fragments = [{ name: "6708-gemma4.md", body: "- **fix(sse):** guard\n" }];
  const refs = collectChangelogRefs(cl, "3.9.0", fragments);
  assert.ok(refs.has(20), "still includes CHANGELOG.md refs");
  assert.ok(refs.has(6708), "ALSO includes fragment-only refs (the #6857 bug)");
});

test("computeUncovered: a fragment-only ref counts as covered (end-to-end #6857)", () => {
  // Repro: PR 6708 merged with a fragment (no #N in body, no CHANGELOG bullet yet).
  const cl = "# Changelog\n\n## [Unreleased]\n\n## [3.9.0] — x\n\n---\n";
  const fragments = [{ name: "6708-gemma4.md", body: "- **fix(sse):** guard\n" }];
  const commits = [{ hash: "aa", subject: "fix(sse): gemma thinkingConfig guard (#6708)" }];

  // BEFORE the fix, only the CHANGELOG window is scanned → the commit looks uncovered.
  const windowOnly = computeUncovered(commits, changelogRefWindow(cl, "3.9.0"));
  assert.equal(windowOnly.covered, 0, "sanity: CHANGELOG alone does not cover the fragment PR");

  // AFTER the fix, the fragment ref set covers it.
  const withFragments = computeUncovered(commits, collectChangelogRefs(cl, "3.9.0", fragments));
  assert.equal(withFragments.covered, 1, "fragment ref makes the commit covered");
  assert.equal(withFragments.uncovered.length, 0);
});
