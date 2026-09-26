import test from "node:test";
import assert from "node:assert/strict";

// resilience badge helper: closed badge set, flag-alone semantics, OR rule.

const { getResilienceBadges } =
  await import("../../src/shared/components/requestLoggerResilience.ts");

const format = (key: string, values?: Record<string, string | number>): string =>
  values && Object.keys(values).length > 0 ? `${key}:${JSON.stringify(values)}` : key;

test("1. null and non-object input yield no badges", () => {
  assert.deepEqual(getResilienceBadges(null, format), []);
  assert.deepEqual(getResilienceBadges("x", format), []);
  assert.deepEqual(getResilienceBadges({}, format), []);
});

test("2. stored-error badge fires on the flag alone (any status)", () => {
  const badges = getResilienceBadges({ stored_429: true }, format);
  assert.equal(badges.length, 1);
  assert.equal(badges[0]?.key, "stored-error");
  assert.equal(badges[0]?.label, "resilienceStoredError");
});

test("3. parked badge carries the wait duration", () => {
  const badges = getResilienceBadges({ parked: true, park_ms: 40000 }, format);
  assert.equal(badges[0]?.key, "parked");
  assert.ok(badges[0]?.label.includes("40000"));
});

test("4. rotations badge needs a positive count; continued uses the OR rule", () => {
  assert.deepEqual(getResilienceBadges({ rotations: 0 }, format), []);
  assert.equal(getResilienceBadges({ rotations: 2 }, format)[0]?.key, "rotations");
  assert.equal(getResilienceBadges({ continued: 1 }, format)[0]?.key, "continued");
  assert.equal(getResilienceBadges({ resumed: true }, format)[0]?.key, "continued");
  assert.deepEqual(getResilienceBadges({ continued: 0 }, format), []);
});

test("5. unknown keys never produce badges", () => {
  assert.deepEqual(getResilienceBadges({ frobnicate: true }, format), []);
});
