import { test } from "node:test";
import assert from "node:assert/strict";
import { isPaidModelTarget, matchesOnlyPaidModels } from "@/shared/utils/freeModels";

test("isPaidModelTarget — documented free model → 'free'", () => {
  assert.equal(isPaidModelTarget("openrouter/auto"), "free");
});

test("isPaidModelTarget — provider in free catalog but model not listed free → 'paid'", () => {
  assert.equal(isPaidModelTarget("together/Qwen/Qwen3-235B-A22B"), "paid");
});

test("isPaidModelTarget — no separator (combo/alias name) → 'unknown' (fail open)", () => {
  assert.equal(isPaidModelTarget("my-combo-name"), "unknown");
});

test("isPaidModelTarget — provider not in free catalog at all → 'unknown' (fail open)", () => {
  assert.equal(isPaidModelTarget("totally-unknown-provider/whatever"), "unknown");
});

test("isPaidModelTarget — comma-separated form matches slash form", () => {
  assert.equal(isPaidModelTarget("openrouter,auto"), isPaidModelTarget("openrouter/auto"));
});

test("isPaidModelTarget — empty/non-string input → 'unknown'", () => {
  assert.equal(isPaidModelTarget(""), "unknown");
  // @ts-expect-error — exercising runtime guard against non-string input
  assert.equal(isPaidModelTarget(undefined), "unknown");
});

test("matchesOnlyPaidModels — true when every match is paid", () => {
  assert.equal(matchesOnlyPaidModels("together/*"), true);
});

test("matchesOnlyPaidModels — false when at least one match is free", () => {
  assert.equal(matchesOnlyPaidModels("openrouter/*"), false);
});

test("matchesOnlyPaidModels — false (fail open) when there are zero matches", () => {
  assert.equal(matchesOnlyPaidModels("zzz-totally-nonexistent-pattern-*"), false);
});

test("matchesOnlyPaidModels — false on empty pattern", () => {
  assert.equal(matchesOnlyPaidModels(""), false);
});
