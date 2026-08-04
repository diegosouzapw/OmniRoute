/**
 * Tests for comboMetrics memory management — eviction and TTL behavior.
 *
 * Verifies that:
 * - Recording and retrieval work correctly
 * - MAX_METRICS_ENTRIES (500) cap is enforced via eviction of oldest entries
 * - Shadow metrics are isolated from production metrics
 * - resetComboMetrics and resetAllComboMetrics clear state correctly
 * - getAllComboMetrics returns all entries
 * - recordComboIntent tracks intent counts
 */
import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../../open-sse/services/comboMetrics.ts");
const {
  recordComboRequest,
  recordComboShadowRequest,
  getComboMetrics,
  getAllComboMetrics,
  resetComboMetrics,
  resetAllComboMetrics,
  recordComboIntent,
} = mod;

// Reset all state before each test group to avoid cross-test pollution.
resetAllComboMetrics();

// ─── Basic record + retrieve ────────────────────────────────────────────────

test("recordComboRequest: basic recording and retrieval", () => {
  resetAllComboMetrics();
  recordComboRequest("test-combo", "gpt-4", {
    success: true,
    latencyMs: 100,
  });
  const metrics = getComboMetrics("test-combo");
  assert.ok(metrics, "metrics should exist for recorded combo");
  assert.equal(metrics.totalRequests, 1, "should have 1 total request");
  assert.equal(metrics.totalSuccesses, 1, "should have 1 success");
  assert.equal(metrics.totalFailures, 0, "should have 0 failures");
  assert.equal(metrics.successRate, 100, "success rate should be 100%");
  assert.equal(metrics.avgLatencyMs, 100, "avg latency should be 100ms");
});

test("recordComboRequest: tracks per-model metrics", () => {
  resetAllComboMetrics();
  recordComboRequest("combo-1", "gpt-4", { success: true, latencyMs: 100 });
  recordComboRequest("combo-1", "claude-3", { success: false, latencyMs: 200 });
  const metrics = getComboMetrics("combo-1");
  assert.ok(metrics);
  assert.equal(metrics.totalRequests, 2, "should have 2 total requests");
  assert.equal(metrics.successRate, 50, "success rate should be 50%");
  assert.ok(metrics.byModel["gpt-4"], "should have gpt-4 model metrics");
  assert.ok(metrics.byModel["claude-3"], "should have claude-3 model metrics");
  assert.equal(metrics.byModel["gpt-4"].successRate, 100);
  assert.equal(metrics.byModel["claude-3"].successRate, 0);
});

test("recordComboRequest: handles null model string gracefully", () => {
  resetAllComboMetrics();
  recordComboRequest("combo-null", null, { success: true, latencyMs: 50 });
  const metrics = getComboMetrics("combo-null");
  assert.ok(metrics, "metrics should exist even with null model");
  assert.equal(metrics.totalRequests, 1);
  // null model should not create per-model entries
  assert.equal(Object.keys(metrics.byModel).length, 0, "should have no model entries");
});

test("recordComboRequest: tracks fallback count", () => {
  resetAllComboMetrics();
  recordComboRequest("combo-fb", "gpt-4", {
    success: true,
    latencyMs: 200,
    fallbackCount: 2,
  });
  const metrics = getComboMetrics("combo-fb");
  assert.ok(metrics);
  assert.equal(metrics.totalFallbacks, 2, "should track 2 fallbacks");
  // fallbackRate = (totalFallbacks / totalRequests) * 100 = (2/1) * 100 = 200
  assert.equal(metrics.fallbackRate, 200, "fallback rate should be 200% (2 fallbacks on 1 request)");
});

// ─── getComboMetrics returns null for unknown combos ─────────────────────────

test("getComboMetrics: returns null for unknown combo", () => {
  const metrics = getComboMetrics("nonexistent-combo-xyz");
  assert.equal(metrics, null, "unknown combo should return null");
});

// ─── resetComboMetrics ───────────────────────────────────────────────────────

test("resetComboMetrics: clears a specific combo", () => {
  resetAllComboMetrics();
  recordComboRequest("to-keep", "gpt-4", { success: true, latencyMs: 100 });
  recordComboRequest("to-reset", "gpt-4", { success: true, latencyMs: 100 });
  resetComboMetrics("to-reset");
  assert.ok(getComboMetrics("to-keep"), "to-keep should still exist");
  assert.equal(getComboMetrics("to-reset"), null, "to-reset should be cleared");
});

// ─── resetAllComboMetrics ────────────────────────────────────────────────────

test("resetAllComboMetrics: clears all production and shadow metrics", () => {
  recordComboRequest("combo-a", "gpt-4", { success: true, latencyMs: 100 });
  recordComboShadowRequest("shadow-a", "gpt-4", { success: true, latencyMs: 100 });
  assert.ok(getComboMetrics("combo-a"), "combo-a should exist before reset");
  assert.ok(getComboMetrics("shadow-a"), "shadow-a should exist before reset");
  resetAllComboMetrics();
  assert.equal(getComboMetrics("combo-a"), null, "combo-a should be cleared");
  assert.equal(getComboMetrics("shadow-a"), null, "shadow-a should be cleared");
});

// ─── getAllComboMetrics ───────────────────────────────────────────────────────

test("getAllComboMetrics: returns all production and shadow entries", () => {
  resetAllComboMetrics();
  recordComboRequest("combo-x", "gpt-4", { success: true, latencyMs: 100 });
  recordComboRequest("combo-y", "claude-3", { success: false, latencyMs: 200 });
  recordComboShadowRequest("shadow-x", "gpt-4", { success: true, latencyMs: 150 });
  const all = getAllComboMetrics();
  assert.ok(all["combo-x"], "should include combo-x");
  assert.ok(all["combo-y"], "should include combo-y");
  assert.ok(all["shadow-x"], "should include shadow-x from shadow metrics");
});

// ─── Shadow metrics ──────────────────────────────────────────────────────────

test("recordComboShadowRequest: tracks shadow metrics separately from production", () => {
  resetAllComboMetrics();
  recordComboRequest("prod-combo", "gpt-4", { success: true, latencyMs: 100 });
  recordComboShadowRequest("prod-combo", "claude-3", { success: false, latencyMs: 200 });
  const metrics = getComboMetrics("prod-combo");
  assert.ok(metrics);
  // Production sees only gpt-4
  assert.equal(metrics.totalRequests, 1, "production should have 1 request");
  assert.equal(metrics.successRate, 100, "production success rate should be 100%");
  // Shadow is separate
  assert.ok(metrics.shadow, "shadow metrics should be present");
  assert.equal(metrics.shadow.totalRequests, 1, "shadow should have 1 request");
  assert.equal(metrics.shadow.successRate, 0, "shadow success rate should be 0%");
});

test("recordComboShadowRequest: shadow-only combo returns in getAllComboMetrics", () => {
  resetAllComboMetrics();
  recordComboShadowRequest("shadow-only", "gpt-4", { success: true, latencyMs: 50 });
  const all = getAllComboMetrics();
  assert.ok(all["shadow-only"], "shadow-only combo should appear in getAllComboMetrics");
});

// ─── recordComboIntent ───────────────────────────────────────────────────────

test("recordComboIntent: tracks intent counts on existing combo", () => {
  resetAllComboMetrics();
  recordComboRequest("intent-combo", "gpt-4", { success: true, latencyMs: 100 });
  recordComboIntent("intent-combo", "chat");
  recordComboIntent("intent-combo", "chat");
  recordComboIntent("intent-combo", "code");
  const metrics = getComboMetrics("intent-combo");
  assert.ok(metrics);
  assert.equal(metrics.intentCounts["chat"], 2, "should count 2 chat intents");
  assert.equal(metrics.intentCounts["code"], 1, "should count 1 code intent");
});

test("recordComboIntent: creates combo entry if not yet recorded", () => {
  resetAllComboMetrics();
  recordComboIntent("new-intent-combo", "search");
  const metrics = getComboMetrics("new-intent-combo");
  assert.ok(metrics, "combo should be created by recordComboIntent");
  assert.equal(metrics.intentCounts["search"], 1);
});

// ─── Eviction: MAX_METRICS_ENTRIES cap ───────────────────────────────────────

test("eviction: inserting a new combo at capacity evicts the oldest entry", () => {
  resetAllComboMetrics();
  const MAX = 500;
  // Fill to capacity with unique combos
  for (let i = 0; i < MAX; i++) {
    recordComboRequest(`fill-${i}`, "gpt-4", { success: true, latencyMs: 10 });
  }
  // All 500 should be present
  assert.ok(getComboMetrics("fill-0"), "first inserted combo should exist at capacity");
  assert.ok(getComboMetrics(`fill-${MAX - 1}`), "last inserted combo should exist at capacity");

  // Insert one more — should trigger eviction of the oldest entry
  recordComboRequest("new-after-capacity", "gpt-4", { success: true, latencyMs: 50 });
  const all = getAllComboMetrics();
  const totalProduction = Object.keys(all).filter((k) => {
    const m = all[k];
    return m && m.totalRequests > 0;
  }).length;
  // Map size should not exceed MAX (the new one replaced the oldest)
  assert.ok(totalProduction <= MAX, `production combos (${totalProduction}) should not exceed cap (${MAX})`);
  assert.ok(
    getComboMetrics("new-after-capacity"),
    "newly inserted combo should exist after eviction"
  );
});

test("eviction: shadow metrics respect their own MAX_METRICS_ENTRIES cap", () => {
  resetAllComboMetrics();
  const MAX = 500;
  // Fill shadow metrics to capacity
  for (let i = 0; i < MAX; i++) {
    recordComboShadowRequest(`shadow-fill-${i}`, "gpt-4", {
      success: true,
      latencyMs: 10,
    });
  }
  assert.ok(
    getComboMetrics("shadow-fill-0"),
    "first shadow combo should exist at capacity"
  );

  // Insert one more shadow — should trigger eviction
  recordComboShadowRequest("shadow-after-capacity", "gpt-4", {
    success: true,
    latencyMs: 50,
  });
  assert.ok(
    getComboMetrics("shadow-after-capacity"),
    "newly inserted shadow combo should exist after eviction"
  );
});

test("eviction: shadow overflow does not delete production metrics with the same name", () => {
  resetAllComboMetrics();
  const MAX = 500;

  recordComboRequest("shared-combo", "gpt-4", { success: true, latencyMs: 10 });

  for (let i = 0; i < MAX; i++) {
    recordComboShadowRequest(i === 0 ? "shared-combo" : "shadow-fill-" + i, "gpt-4", {
      success: true,
      latencyMs: 10,
    });
  }

  recordComboShadowRequest("shadow-after-capacity", "gpt-4", {
    success: true,
    latencyMs: 50,
  });

  const metrics = getComboMetrics("shared-combo");
  assert.ok(metrics, "production metrics must survive shadow-only eviction");
  assert.equal(metrics.productionTraffic, true);
  assert.equal(metrics.totalRequests, 1);
});

test("eviction: recordComboIntent respects MAX_METRICS_ENTRIES cap", () => {
  resetAllComboMetrics();
  const MAX = 500;
  // Fill production metrics to capacity
  for (let i = 0; i < MAX; i++) {
    recordComboRequest(`intent-fill-${i}`, "gpt-4", { success: true, latencyMs: 10 });
  }
  // Adding intent for a NEW combo should trigger eviction
  recordComboIntent("intent-after-capacity", "chat");
  assert.ok(
    getComboMetrics("intent-after-capacity"),
    "newly created intent combo should exist after eviction"
  );
});

test("eviction: updating an existing combo at capacity does NOT evict", () => {
  resetAllComboMetrics();
  const MAX = 500;
  // Fill to capacity
  for (let i = 0; i < MAX; i++) {
    recordComboRequest(`update-${i}`, "gpt-4", { success: true, latencyMs: 10 });
  }
  // Update an existing combo — should NOT trigger eviction since it's not a new key
  recordComboRequest("update-0", "gpt-4", { success: false, latencyMs: 50 });
  const metrics = getComboMetrics("update-0");
  assert.ok(metrics, "updated combo should still exist");
  assert.equal(metrics.totalRequests, 2, "updated combo should have 2 requests");
});

// ─── Strategy tracking ───────────────────────────────────────────────────────

test("recordComboRequest: stores the routing strategy", () => {
  resetAllComboMetrics();
  recordComboRequest("strat-combo", "gpt-4", {
    success: true,
    latencyMs: 100,
    strategy: "weighted",
  });
  const metrics = getComboMetrics("strat-combo");
  assert.ok(metrics);
  assert.equal(metrics.strategy, "weighted", "should store the strategy");
});

test("recordComboRequest: defaults strategy to 'priority'", () => {
  resetAllComboMetrics();
  recordComboRequest("default-strat", "gpt-4", { success: true, latencyMs: 100 });
  const metrics = getComboMetrics("default-strat");
  assert.ok(metrics);
  assert.equal(metrics.strategy, "priority", "default strategy should be 'priority'");
});
