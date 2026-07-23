// Characterization of the services/usage.ts scalar-helpers split (god-file decomposition): the pure
// coercion/format primitives the per-provider usage fetchers share moved into services/usage/scalars.ts.
// Behavior-preserving move — these locks pin the coercion edges (NaN/empty fallbacks, percentage
// clamping, snake/camel field lookup precedence, copilot-prefix stripping in display labels).
import { test } from "node:test";
import assert from "node:assert/strict";

const S = await import("../../open-sse/services/usage/scalars.ts");

test("module exposes the nine scalar helpers", () => {
  for (const name of [
    "toRecord",
    "toNumber",
    "toPercentage",
    "toTitleCase",
    "getFieldValue",
    "clampPercentage",
    "roundCurrency",
    "toDisplayLabel",
    "pickFirstNonEmptyString",
  ]) {
    assert.equal(typeof (S as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("toRecord only passes through plain objects", () => {
  assert.deepEqual(S.toRecord({ a: 1 }), { a: 1 });
  assert.deepEqual(S.toRecord([1, 2]), {});
  assert.deepEqual(S.toRecord(null), {});
  assert.deepEqual(S.toRecord("x"), {});
});

test("toNumber coerces strings, falls back on NaN/empty", () => {
  assert.equal(S.toNumber(42), 42);
  assert.equal(S.toNumber("3.5"), 3.5);
  assert.equal(S.toNumber("", 7), 7);
  assert.equal(S.toNumber("abc", 9), 9);
  assert.equal(S.toNumber(undefined, -1), -1);
});

test("toPercentage / clampPercentage clamp into 0..100", () => {
  assert.equal(S.toPercentage(150), 100);
  assert.equal(S.toPercentage(-5), 0);
  assert.equal(S.toPercentage("42"), 42);
  assert.equal(S.clampPercentage(250), 100);
  assert.equal(S.clampPercentage(-3), 0);
});

test("getFieldValue prefers snake key, then camel, else null", () => {
  assert.equal(S.getFieldValue({ plan_name: "a", planName: "b" }, "plan_name", "planName"), "a");
  assert.equal(S.getFieldValue({ planName: "b" }, "plan_name", "planName"), "b");
  assert.equal(S.getFieldValue({}, "plan_name", "planName"), null);
});

test("roundCurrency rounds to two decimals", () => {
  assert.equal(S.roundCurrency(1.005), 1.0); // standard JS rounding edge
  assert.equal(S.roundCurrency(2.347), 2.35);
});

test("toTitleCase / toDisplayLabel format labels", () => {
  assert.equal(S.toTitleCase("pro_plus plan"), "Pro Plus Plan");
  assert.equal(S.toDisplayLabel("copilot_pro+"), "Pro+");
  assert.equal(S.toDisplayLabel("copilot business"), "Business");
});

test("pickFirstNonEmptyString returns first trimmed non-empty string", () => {
  assert.equal(S.pickFirstNonEmptyString(null, 3, "  ", " hi "), "hi");
  assert.equal(S.pickFirstNonEmptyString(null, 1), undefined);
});
