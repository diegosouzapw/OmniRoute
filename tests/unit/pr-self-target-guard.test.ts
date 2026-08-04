/**
 * Guard for the self-targeting-PR check (gap 23).
 *
 * PR #8912 has head == base == release/v3.8.50 — a PR from a branch to itself. No diff, can
 * never merge, and it sits in the queue with a full check board attached, burning review
 * attention and CI minutes on every push to that branch. It survived precisely because nothing
 * looks wrong: the checks pass (there is nothing to check) and mergeability just reads unknown.
 *
 * The distinction these tests protect is the one that makes the check safe to block on: an
 * equal head/base BRANCH is conclusive, an equal head/base SHA is not. A branch cut moments ago
 * has an identical tip and is perfectly legitimate — failing on that would block real work.
 */
import test from "node:test";
import assert from "node:assert/strict";

// @ts-expect-error — plain .mjs gate script, no type declarations by design
import { classifyPrTarget } from "../../scripts/check/check-pr-self-target.mjs";

test("the #8912 shape is rejected: same branch on both sides", () => {
  const r = classifyPrTarget({
    headRef: "release/v3.8.50",
    baseRef: "release/v3.8.50",
    headSha: "abc1234567",
    baseSha: "abc1234567",
  });
  assert.equal(r.verdict, "self-targeting");
  assert.match(r.reason, /release\/v3\.8\.50/);
  assert.match(r.reason, /never merge/);
});

test("a normal PR passes", () => {
  const r = classifyPrTarget({
    headRef: "fix/something",
    baseRef: "release/v3.8.50",
    headSha: "aaaaaaaaaa",
    baseSha: "bbbbbbbbbb",
  });
  assert.equal(r.verdict, "ok");
});

test("equal SHAs on DIFFERENT branches only warn — a fresh branch cut is legitimate", () => {
  // This is the case that must not block: branch created, nothing pushed yet.
  const r = classifyPrTarget({
    headRef: "fix/just-cut",
    baseRef: "release/v3.8.50",
    headSha: "cccccccccc",
    baseSha: "cccccccccc",
  });
  assert.equal(r.verdict, "empty-diff", "must NOT be self-targeting");
  assert.match(r.reason, /nothing to review yet/);
});

test("branch equality wins over SHA difference", () => {
  // Same branch but the tip moved between the two reads — still self-targeting.
  const r = classifyPrTarget({
    headRef: "release/v3.8.50",
    baseRef: "release/v3.8.50",
    headSha: "aaaaaaaaaa",
    baseSha: "bbbbbbbbbb",
  });
  assert.equal(r.verdict, "self-targeting");
});

test("no PR context is a skip, not a failure", () => {
  // The same job runs on push and workflow_dispatch, where these vars are empty.
  assert.equal(classifyPrTarget({}).verdict, "no-pr-context");
  assert.equal(classifyPrTarget({ headRef: "", baseRef: "" }).verdict, "no-pr-context");
  assert.equal(classifyPrTarget().verdict, "no-pr-context");
});

test("whitespace does not create a false pass", () => {
  const r = classifyPrTarget({ headRef: " release/v3.8.50 ", baseRef: "release/v3.8.50" });
  assert.equal(r.verdict, "self-targeting", "a stray space must not disguise the same branch");
});

test("only one ref present is not conclusive either way", () => {
  // Half a signal must not fail the PR — the check blocks, so it has to be certain.
  assert.equal(classifyPrTarget({ headRef: "fix/x", baseRef: "" }).verdict, "ok");
  assert.equal(classifyPrTarget({ headRef: "", baseRef: "main" }).verdict, "ok");
});
