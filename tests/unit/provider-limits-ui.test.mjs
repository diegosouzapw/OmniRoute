import test from "node:test";
import assert from "node:assert/strict";

const providerLimitUtils =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");

test("provider plan fallbacks normalize to Unknown instead of repeating provider labels", () => {
  const tier = providerLimitUtils.normalizePlanTier("Claude Code");

  assert.equal(tier.key, "unknown");
  assert.equal(tier.label, "Unknown");
});

test("paid individual tiers use non-gray badge variants", () => {
  assert.equal(providerLimitUtils.normalizePlanTier("Plus").variant, "success");
  assert.equal(providerLimitUtils.normalizePlanTier("Pro").variant, "success");
  assert.equal(providerLimitUtils.normalizePlanTier("Student").variant, "success");
  assert.equal(providerLimitUtils.normalizePlanTier("Free").variant, "default");
});

test("Codex workspacePlanType is used when live plan is missing or unknown", () => {
  const resolvedPlan = providerLimitUtils.resolvePlanValue("unknown", {
    workspacePlanType: "plus",
  });

  assert.equal(resolvedPlan, "plus");
  const tier = providerLimitUtils.normalizePlanTier(resolvedPlan);
  assert.equal(tier.key, "plus");
  assert.equal(tier.variant, "success");
});

test("remaining percentage helpers reflect remaining quota and stale resets refill to 100", () => {
  assert.equal(providerLimitUtils.calculatePercentage(0, 100), 100);
  assert.equal(providerLimitUtils.calculatePercentage(17, 100), 83);
  assert.equal(providerLimitUtils.calculatePercentage(60, 100), 40);

  const past = new Date(Date.now() - 60_000).toISOString();
  const parsed = providerLimitUtils.parseQuotaData("codex", {
    quotas: {
      session: { used: 83, total: 100, resetAt: past },
    },
  });

  assert.equal(parsed.length, 1);
  assert.equal(providerLimitUtils.calculatePercentage(parsed[0].used, parsed[0].total), 100);
});
