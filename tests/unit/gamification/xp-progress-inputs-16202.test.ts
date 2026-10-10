import assert from "node:assert/strict";
import test from "node:test";
import { calculateLevel, xpToNextLevel } from "../../../src/lib/gamification/xp.ts";

for (const [label, totalXp] of [
  ["NaN", Number.NaN],
  ["positive infinity", Number.POSITIVE_INFINITY],
  ["negative infinity", Number.NEGATIVE_INFINITY],
] as const) {
  test(`non-finite XP (${label}) needs 282 XP from level one`, () => {
    assert.equal(calculateLevel(totalXp), 1);
    assert.equal(xpToNextLevel(totalXp), 282);
  });
}

for (const [label, totalXp] of [
  ["first unsafe integer", Number.MAX_SAFE_INTEGER + 1],
  ["largest finite number", Number.MAX_VALUE],
] as const) {
  test(`XP beyond the safe range (${label}) shares the capped level's progress`, () => {
    const cappedProgress = xpToNextLevel(Number.MAX_SAFE_INTEGER);
    const progress = xpToNextLevel(totalXp);
    assert.ok(Number.isFinite(cappedProgress) && cappedProgress >= 0);
    assert.equal(calculateLevel(totalXp), calculateLevel(Number.MAX_SAFE_INTEGER));
    assert.equal(progress, cappedProgress);
    assert.ok(Number.isFinite(progress) && progress >= 0);
  });
}

const progressExamples = [
  { label: "zero", totalXp: 0, expected: 282 },
  { label: "negative zero", totalXp: -0, expected: 282 },
  { label: "five XP debt", totalXp: -5, expected: 287 },
  { label: "one hundred XP debt", totalXp: -100, expected: 382 },
  { label: "one before level two", totalXp: 281, expected: 1 },
  { label: "fraction before level two", totalXp: 281.5, expected: 0.5 },
  { label: "level two boundary", totalXp: 282, expected: 519 },
  { label: "one into level two", totalXp: 283, expected: 518 },
  { label: "one before level three", totalXp: 800, expected: 1 },
  { label: "level three boundary", totalXp: 801, expected: 800 },
  { label: "one into level three", totalXp: 802, expected: 799 },
  { label: "five thousand", totalXp: 5000, expected: 1040 },
  { label: "one before level ten", totalXp: 14163, expected: 1 },
  { label: "level ten boundary", totalXp: 14164, expected: 3648 },
  { label: "one million", totalXp: 1_000_000, expected: 2661 },
];

for (const { label, totalXp, expected } of progressExamples) {
  test(`finite XP preserves the existing curve: ${label}`, () => {
    assert.equal(xpToNextLevel(totalXp), expected);
  });
}

test("the largest finite XP debt still has a finite, non-negative distance", () => {
  const progress = xpToNextLevel(-Number.MAX_VALUE);
  assert.equal(calculateLevel(-Number.MAX_VALUE), 1);
  assert.ok(Number.isFinite(progress) && progress >= 0);
});
