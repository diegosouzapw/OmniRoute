import test from "node:test";
import assert from "node:assert/strict";
import { setBudgetSchema } from "../../src/shared/validation/schemas.ts";

// Regression for #3537: the budget dashboard sends 0 for unfilled limit fields, but
// `setBudgetSchema` used `.positive()` (rejects 0) + a superRefine requiring at least one
// limit > 0. Result: saving a budget with only one field filled 400'd, and clearing all
// limits was impossible. A limit of 0 means "no limit for this period" (checkBudget only
// enforces when activeLimitUsd > 0), so 0/all-zero must be accepted.

test("#3537 saving one limit with the others left at 0 succeeds (Bug 1)", () => {
  const r = setBudgetSchema.safeParse({
    apiKeyId: "key-1",
    dailyLimitUsd: 5,
    weeklyLimitUsd: 0,
    monthlyLimitUsd: 0,
  });
  assert.equal(r.success, true, r.success ? "" : JSON.stringify(r.error?.issues));
});

test("#3537 clearing all limits to 0 succeeds (Bug 2 — disables enforcement)", () => {
  const r = setBudgetSchema.safeParse({
    apiKeyId: "key-1",
    dailyLimitUsd: 0,
    weeklyLimitUsd: 0,
    monthlyLimitUsd: 0,
  });
  assert.equal(r.success, true, r.success ? "" : JSON.stringify(r.error?.issues));
});

test("#3537 a budget with no limit fields (only apiKeyId) is accepted as no-limit", () => {
  const r = setBudgetSchema.safeParse({ apiKeyId: "key-1" });
  assert.equal(r.success, true, r.success ? "" : JSON.stringify(r.error?.issues));
});

test("#3537 negative limits are still rejected", () => {
  const r = setBudgetSchema.safeParse({ apiKeyId: "key-1", dailyLimitUsd: -3 });
  assert.equal(r.success, false);
});

test("#3537 a normal positive limit still validates (regression)", () => {
  const r = setBudgetSchema.safeParse({ apiKeyId: "key-1", monthlyLimitUsd: 500 });
  assert.equal(r.success, true, r.success ? "" : JSON.stringify(r.error?.issues));
});
