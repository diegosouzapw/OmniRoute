/**
 * Tests for pure utility functions exported via usage.__testing
 *
 * Covers: parseResetTime, formatGitHubQuotaSnapshot, inferGitHubPlanName,
 *         getMiniMaxPlanLabel, inferMiniMaxPlanLabelFromTotals,
 *         extractCodeAssistSubscriptionTier, extractCodeAssistOnboardTierId.
 *
 * These are pure functions (no fetch, no DB) — run without DATA_DIR override.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

process.env.NODE_ENV = "test";

const usage = await import("../../open-sse/services/usage.ts");
const { __testing } = usage;

/* ------------------------------------------------------------------ */
/*  parseResetTime                                                     */
/* ------------------------------------------------------------------ */
describe("parseResetTime", () => {
  it("returns null for null / undefined", () => {
    assert.equal(__testing.parseResetTime(null), null);
    assert.equal(__testing.parseResetTime(undefined), null);
  });

  it("returns null for epoch-zero", () => {
    assert.equal(__testing.parseResetTime(0), null);
    assert.equal(__testing.parseResetTime("1970-01-01T00:00:00.000Z"), null);
  });

  it("parses a number as ms timestamp (value > 1e12)", () => {
    const ms = 1_700_000_000_000;
    const out = __testing.parseResetTime(ms);
    assert.equal(out, new Date(ms).toISOString());
  });

  it("parses a number as seconds (value < 1e12)", () => {
    const sec = 1_700_000_000; // < 1e12
    const out = __testing.parseResetTime(sec);
    assert.equal(out, new Date(sec * 1000).toISOString());
  });

  it("parses an ISO date string", () => {
    const iso = "2026-06-15T12:00:00.000Z";
    assert.equal(__testing.parseResetTime(iso), new Date(iso).toISOString());
  });

  it("parses a Date object", () => {
    const d = new Date("2026-07-01T00:00:00Z");
    assert.equal(__testing.parseResetTime(d), d.toISOString());
  });

  it("returns null for non-date values (objects, booleans)", () => {
    assert.equal(__testing.parseResetTime({}), null);
    assert.equal(__testing.parseResetTime(true), null);
  });

  it("returns null for invalid date strings", () => {
    assert.equal(__testing.parseResetTime("not-a-date"), null);
  });
});

/* ------------------------------------------------------------------ */
/*  formatGitHubQuotaSnapshot                                          */
/* ------------------------------------------------------------------ */
describe("formatGitHubQuotaSnapshot", () => {
  it("returns null for empty object", () => {
    assert.equal(__testing.formatGitHubQuotaSnapshot({}), null);
  });

  it("builds quota from snapshot with all fields", () => {
    const snap = {
      entitlement: 1000,
      used: 300,
      remaining: 700,
      percent_remaining: 70,
    };
    const q = __testing.formatGitHubQuotaSnapshot(snap, "2026-07-01T00:00:00.000Z");
    assert.equal(q.total, 1000);
    assert.equal(q.used, 300);
    assert.equal(q.remaining, 700);
    assert.equal(q.remainingPercentage, 70);
    assert.equal(q.resetAt, "2026-07-01T00:00:00.000Z");
    assert.equal(q.unlimited, false);
  });

  it("uses entitlement when total is missing", () => {
    const snap = { entitlement: 500, remaining: 0.5, percent_remaining: 50 };
    const q = __testing.formatGitHubQuotaSnapshot(snap);
    assert.equal(q.total, 500);
    assert.ok(q.remaining !== undefined);
  });

  it("detects unlimited plan", () => {
    const snap = { entitlement: 0, total: 0, unlimited: true };
    const q = __testing.formatGitHubQuotaSnapshot(snap);
    assert.equal(q.unlimited, true);
    assert.equal(q.total, 0); // total is 0 when percent_remaining is missing
  });

  it("clamps negative values to 0", () => {
    const snap = { used: -10, entitlement: 100, remaining: -5, percent_remaining: -1 };
    const q = __testing.formatGitHubQuotaSnapshot(snap);
    assert.equal(q.used, 0);
    assert.equal(q.remaining, 0);
    assert.equal(q.remainingPercentage, 0);
  });

  it("computes missing used from total - remaining", () => {
    const snap = { entitlement: 200, remaining: 50 };
    const q = __testing.formatGitHubQuotaSnapshot(snap);
    assert.equal(q.used, 150); // 200 - 50
  });

  it("computes missing remaining from total - used", () => {
    const snap = { used: 30, entitlement: 100 };
    const q = __testing.formatGitHubQuotaSnapshot(snap);
    assert.equal(q.remaining, 70);
  });
});

/* ------------------------------------------------------------------ */
/*  inferGitHubPlanName                                                */
/* ------------------------------------------------------------------ */
describe("inferGitHubPlanName", () => {
  it("detects Copilot Pro+ from combined string", () => {
    const data = { copilot_plan: "PRO_PLUS" };
    assert.equal(__testing.inferGitHubPlanName(data, null), "Copilot Pro+");
  });

  it("detects Copilot Enterprise", () => {
    const data = { copilot_plan: "ENTERPRISE" };
    assert.equal(__testing.inferGitHubPlanName(data, null), "Copilot Enterprise");
  });

  it("detects Copilot Business", () => {
    const data = { copilot_plan: "BUSINESS" };
    assert.equal(__testing.inferGitHubPlanName(data, null), "Copilot Business");
  });

  it("detects Copilot Student", () => {
    const data = { copilot_plan: "STUDENT" };
    assert.equal(__testing.inferGitHubPlanName(data, null), "Copilot Student");
  });

  it("detects Copilot Free", () => {
    const data = { copilot_plan: "FREE" };
    assert.equal(__testing.inferGitHubPlanName(data, null), "Copilot Free");
  });

  it("detects Copilot Pro", () => {
    const data = { copilot_plan: "PRO" };
    assert.equal(__testing.inferGitHubPlanName(data, null), "Copilot Pro");
  });

  it("infers Pro+ from premiumTotal >= 1400", () => {
    const data = { copilot_plan: "INDIVIDUAL" };
    const premium = { used: 0, total: 1500, remaining: 1500, remainingPercentage: 100, unlimited: false };
    assert.equal(__testing.inferGitHubPlanName(data, premium), "Copilot Pro+");
  });

  it("infers Enterprise from premiumTotal >= 900", () => {
    const data = { copilot_plan: "INDIVIDUAL" };
    const premium = { used: 0, total: 900, remaining: 900, remainingPercentage: 100, unlimited: false };
    assert.equal(__testing.inferGitHubPlanName(data, premium), "Copilot Enterprise");
  });

  it("infers Pro when premiumTotal >= 250 and combined has INDIVIDUAL", () => {
    const data = { copilot_plan: "INDIVIDUAL" };
    const premium = { used: 0, total: 300, remaining: 300, remainingPercentage: 100, unlimited: false };
    assert.equal(__testing.inferGitHubPlanName(data, premium), "Copilot Pro");
  });

  it("returns 'GitHub Copilot' fallback when nothing matches", () => {
    const data = {};
    assert.equal(__testing.inferGitHubPlanName(data, null), "GitHub Copilot");
  });

  it("falls back to sku label when planText is empty", () => {
    const data = { access_type_sku: "BUSINESS_SPO" };
    // "BUSINESS_SPO" upper-cased matches "BUSINESS" check first
    assert.equal(__testing.inferGitHubPlanName(data, null), "Copilot Business");
  });
});

/* ------------------------------------------------------------------ */
/*  getMiniMaxPlanLabel                                                */
/* ------------------------------------------------------------------ */
describe("getMiniMaxPlanLabel", () => {
  it("returns cleaned title from payload", () => {
    const payload = { current_subscribe_title: "MiniMax Coding Plan Pro" };
    assert.equal(__testing.getMiniMaxPlanLabel(payload), "Pro");
  });

  it("removes 'minimax ' prefix and 'coding plan' text", () => {
    const payload = { plan: "MiniMax Coding Plan Ultra" };
    assert.equal(__testing.getMiniMaxPlanLabel(payload), "Ultra");
  });

  it("calls inferMiniMaxPlanLabelFromTotals when no title present", () => {
    const models = [{ current_interval_total_count: 500, current_weekly_total_count: 200 }];
    const label = __testing.getMiniMaxPlanLabel({}, models);
    assert.ok(typeof label === "string");
    assert.ok(label.length > 0);
  });

  it("returns 'Coding Plan' fallback when nothing matches", () => {
    assert.equal(__testing.getMiniMaxPlanLabel({}), "Coding Plan");
  });

  it("picks first non-empty string from multiple candidate fields", () => {
    const payload = { combo_title: "", plan_name: "MiniMax Turbo", plan: "" };
    const label = __testing.getMiniMaxPlanLabel(payload);
    assert.equal(label, "Turbo");
  });
});

/* ------------------------------------------------------------------ */
/*  inferMiniMaxPlanLabelFromTotals                                    */
/* ------------------------------------------------------------------ */
describe("inferMiniMaxPlanLabelFromTotals", () => {
  it("returns 'Max' for totals >= 15K", () => {
    const models = [{ current_interval_total_count: 20_000 }];
    assert.equal(__testing.inferMiniMaxPlanLabelFromTotals(models), "Max");
  });

  it("returns 'Plus' for totals >= 4.5K but < 15K", () => {
    const models = [{ current_interval_total_count: 5_000 }];
    assert.equal(__testing.inferMiniMaxPlanLabelFromTotals(models), "Plus");
  });

  it("returns 'Starter' for totals >= 1.5K but < 4.5K", () => {
    const models = [{ current_interval_total_count: 2_000 }];
    assert.equal(__testing.inferMiniMaxPlanLabelFromTotals(models), "Starter");
  });

  it("returns null when models array is empty", () => {
    assert.equal(__testing.inferMiniMaxPlanLabelFromTotals([]), null);
  });
});

/* ------------------------------------------------------------------ */
/*  getGeminiCliPlanLabel                                              */
/* ------------------------------------------------------------------ */
describe("getGeminiCliPlanLabel", () => {
  it("returns a string label", () => {
    const label = __testing.getGeminiCliPlanLabel();
    assert.ok(typeof label === "string");
    assert.ok(label.length > 0);
  });
});

/* ------------------------------------------------------------------ */
/*  getAntigravityPlanLabel                                            */
/* ------------------------------------------------------------------ */
describe("getAntigravityPlanLabel", () => {
  it("returns a string label", () => {
    const label = __testing.getAntigravityPlanLabel();
    assert.ok(typeof label === "string");
    assert.ok(label.length > 0);
  });
});

/* ------------------------------------------------------------------ */
/*  extractCodeAssist helpers                                          */
/* ------------------------------------------------------------------ */
describe("extractCodeAssistOnboardTierId", () => {
  it("extracts tier id from paidTier", () => {
    const sub = { paidTier: { id: "pro-tier" } };
    assert.equal(__testing.extractCodeAssistOnboardTierId(sub), "pro-tier");
  });

  it("extracts tier id from currentTier when paidTier is absent", () => {
    const sub = { currentTier: { id: "starter-tier" } };
    assert.equal(__testing.extractCodeAssistOnboardTierId(sub), "starter-tier");
  });

  it("returns 'legacy-tier' when no tier data is present", () => {
    assert.equal(__testing.extractCodeAssistOnboardTierId({}), "legacy-tier");
  });
});

describe("extractCodeAssistSubscriptionTier", () => {
  it("reads tier name from paidTier.name", () => {
    const info = { paidTier: { name: "ULTRA" } };
    assert.equal(__testing.extractCodeAssistSubscriptionTier(info), "ULTRA");
  });

  it("reads tier from currentTier.name", () => {
    const info = { currentTier: { name: "Pro" } };
    assert.equal(__testing.extractCodeAssistSubscriptionTier(info), "Pro");
  });

  it("returns null when nothing matches", () => {
    assert.equal(__testing.extractCodeAssistSubscriptionTier({}), null);
  });
});

/* ------------------------------------------------------------------ */
/*  mapSubscriptionTierStringToPlanLabel — (RESTRICTED) strip + ReDoS  */
/* ------------------------------------------------------------------ */
describe("mapSubscriptionTierStringToPlanLabel", () => {
  it("resolves a code-assist tier id via the normalized-id path after stripping (RESTRICTED)", () => {
    // These reach the `normalizedId` branch (no early includes() match) and only
    // resolve to a label once the "(RESTRICTED)" suffix is stripped + trimmed.
    assert.equal(__testing.mapSubscriptionTierStringToPlanLabel("GOOGLE_ONE (RESTRICTED)"), "Pro");
    assert.equal(__testing.mapSubscriptionTierStringToPlanLabel("LEGACY (RESTRICTED)"), "Free");
  });

  it("does not hang on whitespace-heavy input (js/polynomial-redos guard)", () => {
    const start = process.hrtime.bigint();
    __testing.mapSubscriptionTierStringToPlanLabel(" ".repeat(100000) + "(");
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    assert.ok(ms < 500, `tier mapping took ${ms.toFixed(1)}ms on whitespace-heavy input — possible ReDoS`);
  });
});
