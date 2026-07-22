import { test } from "node:test";
import assert from "node:assert/strict";
import { CANONICAL_EFFORT_VALUES } from "@/shared/reasoning/effortStandardization";

test("#8072 — CANONICAL_EFFORT_VALUES is a non-empty string array", () => {
  assert.ok(Array.isArray(CANONICAL_EFFORT_VALUES));
  assert.ok(CANONICAL_EFFORT_VALUES.length > 0);
  for (const v of CANONICAL_EFFORT_VALUES) {
    assert.equal(typeof v, "string");
    assert.ok(v.length > 0);
  }
});

test("#8072 — includes standard reasoning effort values", () => {
  assert.ok(CANONICAL_EFFORT_VALUES.includes("low"));
  assert.ok(CANONICAL_EFFORT_VALUES.includes("medium"));
  assert.ok(CANONICAL_EFFORT_VALUES.includes("high"));
});
