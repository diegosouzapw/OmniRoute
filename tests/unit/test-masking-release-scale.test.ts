/**
 * Guard for the test-masking gate's release-scale escape hatch (gap 6).
 *
 * The gate diffs `base...HEAD` — three dots, so already merge-base relative, which is right
 * for a normal PR. It is not the base choice that hurts. Releases SQUASH-merge into `main`, so
 * a release PR's merge-base is the PREVIOUS cycle's fork point and the diff legitimately spans
 * the entire cycle. In the v3.8.49 run that was ~1277 changed test files, each costing a
 * `git show base:file` process plus a full regex pass: the check ran twice without finishing,
 * >30 min pegged on a single core, with the release waiting on it.
 *
 * Measured while writing this, and worth recording because it refutes the obvious diagnosis:
 *
 *     tracked test files ................. 3977
 *     absolute tautology scan ............ ~1 s   (runs unconditionally, always)
 *     diff vs release branch ............. 0 changed test files, 0 s
 *     diff vs main (today) ............... 3 changed test files, 0 s
 *
 * It cannot be reproduced today at all, because `main` has since received the v3.8.49 squash
 * and the merge-base is recent. The pathology only appears DURING a release, in the window
 * before `main` receives it — the same squash-merge topology behind gap 4.
 *
 * So the threshold is what these tests pin. An off-by-one here either blocks a release or
 * silently disables the check on a large-but-legitimate PR, and the second failure mode is the
 * dangerous one.
 */
import test from "node:test";
import assert from "node:assert/strict";

// @ts-expect-error — plain .mjs gate script, no type declarations by design
import { shouldSkipDiffSubchecks } from "../../scripts/check/check-test-masking.mjs";

test("a normal PR is always analyzed", () => {
  assert.equal(shouldSkipDiffSubchecks(0, 300), false);
  assert.equal(shouldSkipDiffSubchecks(1, 300), false);
  assert.equal(shouldSkipDiffSubchecks(42, 300), false);
});

test("the boundary is exclusive — exactly at the cap is still analyzed", () => {
  assert.equal(shouldSkipDiffSubchecks(300, 300), false, "at the cap: analyze");
  assert.equal(shouldSkipDiffSubchecks(301, 300), true, "one past the cap: skip");
});

test("release scale skips (the measured v3.8.49 case)", () => {
  assert.equal(shouldSkipDiffSubchecks(1277, 300), true);
});

test("a cap of zero or below disables the skip — always analyze", () => {
  // The documented escape hatch for anyone who wants the full pass regardless of size.
  assert.equal(shouldSkipDiffSubchecks(999999, 0), false);
  assert.equal(shouldSkipDiffSubchecks(999999, -1), false);
});

test("a huge explicit cap forces full analysis", () => {
  // TEST_MASKING_MAX_CHANGED_TESTS=999999, the override the skip message advertises.
  assert.equal(shouldSkipDiffSubchecks(1277, 999999), false);
});

test("garbage inputs never skip — an unparseable count must not disable the gate", () => {
  // The safe direction: if we cannot tell how big the diff is, do the work.
  assert.equal(shouldSkipDiffSubchecks(NaN, 300), false);
  assert.equal(shouldSkipDiffSubchecks(-5, 300), false);
  assert.equal(shouldSkipDiffSubchecks(500, NaN), false);
  assert.equal(shouldSkipDiffSubchecks(500, undefined), false);
  assert.equal(shouldSkipDiffSubchecks(undefined, 300), false);
});
