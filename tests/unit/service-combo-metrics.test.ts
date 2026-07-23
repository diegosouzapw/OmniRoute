import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/comboMetrics.ts");

describe("comboMetrics", () => {
  describe("recordComboRequest / getComboMetrics", () => {
    it("records and retrieves metrics for a combo", () => {
      mod.resetAllComboMetrics();
      mod.recordComboRequest("test-combo-" + Date.now(), "gpt-4", {
        success: true,
        latencyMs: 150,
      });
      const metrics = mod.getComboMetrics("test-combo-" + Date.now());
      // Different timestamp so this is a different combo
      // Use same key
      const key = "test-metrics-" + Date.now();
      mod.recordComboRequest(key, "gpt-4", { success: true, latencyMs: 200 });
      mod.recordComboRequest(key, "gpt-4", { success: false, latencyMs: 300 });
      const m = mod.getComboMetrics(key);
      assert.notEqual(m, null);
      assert.equal(m!.totalRequests, 2);
      assert.equal(m!.totalSuccesses, 1);
      assert.equal(m!.totalFailures, 1);
      assert.equal(m!.totalLatencyMs, 500);
      mod.resetAllComboMetrics();
    });

    it("returns null for unknown combo", () => {
      mod.resetAllComboMetrics();
      assert.equal(mod.getComboMetrics("nonexistent-" + Date.now()), null);
    });

    it("tracks per-model metrics", () => {
      mod.resetAllComboMetrics();
      const key = "model-test-" + Date.now();
      mod.recordComboRequest(key, "gpt-4", { success: true, latencyMs: 100 });
      mod.recordComboRequest(key, "claude-3", { success: true, latencyMs: 200 });
      const m = mod.getComboMetrics(key);
      assert.notEqual(m!.byModel["gpt-4"], undefined);
      assert.notEqual(m!.byModel["claude-3"], undefined);
      mod.resetAllComboMetrics();
    });
  });

  describe("getAllComboMetrics", () => {
    it("returns all recorded metrics", () => {
      mod.resetAllComboMetrics();
      mod.recordComboRequest("combo-a-" + Date.now(), "m1", { success: true, latencyMs: 10 });
      mod.recordComboRequest("combo-b-" + Date.now(), "m2", { success: true, latencyMs: 20 });
      const all = mod.getAllComboMetrics();
      assert.ok(Object.keys(all).length >= 2);
      mod.resetAllComboMetrics();
    });
  });

  describe("resetComboMetrics / resetAllComboMetrics", () => {
    it("resetComboMetrics clears specific combo", () => {
      mod.resetAllComboMetrics();
      const key = "reset-test-" + Date.now();
      mod.recordComboRequest(key, "m", { success: true, latencyMs: 10 });
      mod.resetComboMetrics(key);
      assert.equal(mod.getComboMetrics(key), null);
    });

    it("resetAllComboMetrics clears everything", () => {
      mod.recordComboRequest("a-" + Date.now(), "m", { success: true, latencyMs: 10 });
      mod.recordComboRequest("b-" + Date.now(), "m", { success: true, latencyMs: 10 });
      mod.resetAllComboMetrics();
      const all = mod.getAllComboMetrics();
      assert.equal(Object.keys(all).length, 0);
    });
  });

  describe("recordComboShadowRequest", () => {
    it("records shadow request without throwing", () => {
      mod.resetAllComboMetrics();
      const key = "shadow-test-" + Date.now();
      mod.recordComboShadowRequest(key, "m", { success: true, latencyMs: 50 });
      // Shadow metrics may be visible via getComboMetrics depending on implementation
      // Just verify no throw and getAllComboMetrics works
      const all = mod.getAllComboMetrics();
      assert.ok(typeof all === "object");
      mod.resetAllComboMetrics();
    });
  });
});
