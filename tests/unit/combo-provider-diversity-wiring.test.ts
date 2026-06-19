/**
 * tests/unit/combo-provider-diversity-wiring.test.ts
 *
 * Regression: `recordProviderUsage` (open-sse/services/autoCombo/providerDiversity.ts)
 * had ZERO production callers, so `/api/analytics/diversity` always reported
 * `score: 1.0` with an empty `providers` map — a dead dashboard.
 *
 * Fix: `recordComboRequest` (the single chokepoint every combo strategy funnels
 * through) records the successful target's provider into the diversity window.
 */
import test from "node:test";
import assert from "node:assert/strict";

test("recordComboRequest feeds the provider-diversity report on success", async () => {
  const { recordComboRequest } = await import("../../open-sse/services/comboMetrics.ts");
  const { getDiversityReport, resetDiversity } = await import(
    "../../open-sse/services/autoCombo/providerDiversity.ts"
  );
  resetDiversity();

  recordComboRequest("combo-diversity-x", "openai/gpt-4", {
    success: true,
    latencyMs: 100,
    strategy: "priority",
    target: { provider: "openai" },
  });
  recordComboRequest("combo-diversity-x", "claude/sonnet", {
    success: true,
    latencyMs: 120,
    strategy: "priority",
    target: { provider: "claude" },
  });
  recordComboRequest("combo-diversity-x", "openai/gpt-4", {
    success: true,
    latencyMs: 90,
    strategy: "priority",
    target: { provider: "openai" },
  });

  const report = getDiversityReport();
  assert.equal(report.totalRequests, 3, "all 3 successful dispatches recorded");
  assert.equal(report.providers.openai?.count, 2);
  assert.equal(report.providers.claude?.count, 1);
  assert.ok(report.score > 0, "diversity score reflects multiple providers (was always 1.0/empty)");
});

test("recordComboRequest does NOT pollute diversity on failure", async () => {
  const { recordComboRequest } = await import("../../open-sse/services/comboMetrics.ts");
  const { getDiversityReport, resetDiversity } = await import(
    "../../open-sse/services/autoCombo/providerDiversity.ts"
  );
  resetDiversity();

  recordComboRequest("combo-diversity-y", "openai/gpt-4", {
    success: false,
    latencyMs: 100,
    strategy: "priority",
    target: { provider: "openai" },
  });
  // Terminal "all targets failed" call (modelStr null, no provider) must also be safe.
  recordComboRequest("combo-diversity-y", null, {
    success: false,
    latencyMs: 200,
    strategy: "priority",
  });

  const report = getDiversityReport();
  assert.equal(report.totalRequests, 0, "failures must not enter the diversity window");
});
