// Characterization of the services/usage.ts github split (god-file decomposition): the GitHub
// Copilot fetcher (getGitHubUsage) + the paid/limited quota snapshot formatter
// (formatGitHubQuotaSnapshot) + the plan-name inference (inferGitHubPlanName) + the display gate
// (shouldDisplayGitHubQuota) moved into services/usage/github.ts so usage.ts stays a thin
// dispatcher. Behavior-preserving move — these locks pin the export surface and the pure-helper
// edges already covered via __testing in usage-utils / usage-service-hardening.
import { test } from "node:test";
import assert from "node:assert/strict";

const G = await import("../../open-sse/services/usage/github.ts");

test("module exposes the four github helpers", () => {
  for (const name of [
    "getGitHubUsage",
    "formatGitHubQuotaSnapshot",
    "inferGitHubPlanName",
    "shouldDisplayGitHubQuota",
  ]) {
    assert.equal(typeof (G as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("shouldDisplayGitHubQuota hides unlimited-with-zero-total and empty quotas", () => {
  assert.equal(G.shouldDisplayGitHubQuota(null), false);
  assert.equal(
    G.shouldDisplayGitHubQuota({ used: 0, total: 0, resetAt: null, unlimited: true }),
    false
  );
  assert.equal(
    G.shouldDisplayGitHubQuota({ used: 0, total: 0, resetAt: null, unlimited: false }),
    false
  );
  assert.equal(
    G.shouldDisplayGitHubQuota({ used: 0, total: 100, resetAt: null, unlimited: false }),
    true
  );
  assert.equal(
    G.shouldDisplayGitHubQuota({
      used: 0,
      total: 0,
      remainingPercentage: 50,
      resetAt: null,
      unlimited: false,
    }),
    true
  );
});

test("formatGitHubQuotaSnapshot returns null for empty objects and synthesizes total from percent", () => {
  assert.equal(G.formatGitHubQuotaSnapshot({}), null);
  const fromPercent = G.formatGitHubQuotaSnapshot({ percent_remaining: 30 })!;
  assert.equal(fromPercent.total, 100);
  assert.equal(fromPercent.used, 70);
  assert.equal(fromPercent.remaining, 30);
  assert.equal(fromPercent.remainingPercentage, 30);
});

test("inferGitHubPlanName maps sku/plan strings and entitlement tiers", () => {
  assert.equal(
    G.inferGitHubPlanName({ access_type_sku: "copilot_business_seat" }, null),
    "Copilot Business"
  );
  assert.equal(
    G.inferGitHubPlanName(
      { copilot_plan: "individual" },
      { used: 0, total: 300, resetAt: null, unlimited: false }
    ),
    "Copilot Pro"
  );
  assert.equal(G.inferGitHubPlanName({}, null), "GitHub Copilot");
});
