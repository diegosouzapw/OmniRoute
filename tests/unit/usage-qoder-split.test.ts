// Characterization of the services/usage.ts qoder split (god-file decomposition): the Qoder
// /api/v3/user/status fetcher (getQoderUsage) + the pure status→quotas mapper
// (parseQoderUserStatusUsage) + the plan-label prettifier moved into services/usage/qoder.ts so
// usage.ts stays a thin dispatcher. Behavior-preserving move — these locks pin the export surface
// and the pure parser edges already covered via __testing in qoder-usage-quota.test.ts.
import { test } from "node:test";
import assert from "node:assert/strict";

const Q = await import("../../open-sse/services/usage/qoder.ts");

test("module exposes getQoderUsage + parseQoderUserStatusUsage", () => {
  assert.equal(typeof Q.getQoderUsage, "function");
  assert.equal(typeof Q.parseQoderUserStatusUsage, "function");
});

test("getQoderUsage returns a Personal Access Token prompt when no token is present", async () => {
  const r = (await Q.getQoderUsage(undefined, {})) as { message?: string };
  assert.match(r.message ?? "", /Personal Access Token/i);
});

test("parseQoderUserStatusUsage maps a Teams/pooled seat to an unlimited plan entry", () => {
  const { plan, quotas } = Q.parseQoderUserStatusUsage({
    userType: "teams",
    userTag: "Teams",
    plan: "PLAN_TIER_TEAM",
    quota: 0,
    isQuotaExceeded: false,
    nextResetAt: 1784736000000,
  });
  assert.equal(plan, "Teams");
  assert.deepEqual(Object.keys(quotas), ["Plan"]);
  assert.equal(quotas.Plan.unlimited, true);
  assert.equal(quotas.Plan.remainingPercentage, 100);
});

test("parseQoderUserStatusUsage maps an individual plan with remaining quota to a Requests entry", () => {
  const { plan, quotas } = Q.parseQoderUserStatusUsage({
    userType: "individual",
    plan: "PLAN_TIER_PRO",
    quota: 42,
    isQuotaExceeded: false,
    nextResetAt: 1784736000000,
  });
  assert.equal(plan, "Pro");
  assert.deepEqual(Object.keys(quotas), ["Requests"]);
  assert.equal(quotas.Requests.remaining, 42);
  assert.equal(quotas.Requests.unlimited, false);
});

test("parseQoderUserStatusUsage flags an exceeded quota", () => {
  const { quotas } = Q.parseQoderUserStatusUsage({
    userType: "individual",
    plan: "PLAN_TIER_FREE",
    quota: 100,
    isQuotaExceeded: true,
    nextResetAt: 1784736000000,
  });
  assert.deepEqual(Object.keys(quotas), ["Quota"]);
  assert.equal(quotas.Quota.remaining, 0);
  assert.match(quotas.Quota.displayName!, /exceeded/i);
});
