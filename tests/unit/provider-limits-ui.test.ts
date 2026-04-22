import test from "node:test";
import assert from "node:assert/strict";

const providerLimitUtils =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");
const providerConstants = await import("../../src/shared/constants/providers.ts");

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

test("quota labels normalize session and weekly windows while preserving readable titles", () => {
  assert.equal(providerLimitUtils.formatQuotaLabel("session"), "Session");
  assert.equal(providerLimitUtils.formatQuotaLabel("session (5h)"), "Session");
  assert.equal(providerLimitUtils.formatQuotaLabel("weekly"), "Weekly");
  assert.equal(providerLimitUtils.formatQuotaLabel("weekly (7d)"), "Weekly");
  assert.equal(providerLimitUtils.formatQuotaLabel("weekly sonnet (7d)"), "Weekly Sonnet");
  assert.equal(providerLimitUtils.formatQuotaLabel("code_review"), "Code Review");
});

test("MiniMax providers are exposed to the limits dashboard support list", () => {
  assert.ok(providerConstants.USAGE_SUPPORTED_PROVIDERS.includes("minimax"));
  assert.ok(providerConstants.USAGE_SUPPORTED_PROVIDERS.includes("minimax-cn"));
});

test("MiniMax quota payloads use generic provider parsing and stale resets still refill", () => {
  const future = new Date(Date.now() + 5 * 60_000).toISOString();
  const past = new Date(Date.now() - 5 * 60_000).toISOString();

  const parsed = providerLimitUtils.parseQuotaData("minimax", {
    quotas: {
      "session (5h)": {
        used: 400,
        total: 1500,
        remaining: 1100,
        remainingPercentage: 73.3,
        resetAt: future,
      },
      "weekly (7d)": {
        used: 1200,
        total: 15000,
        remaining: 13800,
        remainingPercentage: 92,
        resetAt: past,
      },
    },
  });

  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].name, "session (5h)");
  assert.equal(parsed[0].used, 400);
  assert.equal(parsed[0].total, 1500);
  assert.equal(parsed[1].name, "weekly (7d)");
  assert.equal(parsed[1].used, 0);
  assert.equal(parsed[1].remainingPercentage, 100);
  assert.equal(providerLimitUtils.formatQuotaLabel(parsed[0].name), "Session");
  assert.equal(providerLimitUtils.formatQuotaLabel(parsed[1].name), "Weekly");
});
