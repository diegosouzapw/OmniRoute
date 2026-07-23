import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/quotaMonitor.ts");

describe("quotaMonitor", () => {
  describe("isQuotaMonitorEnabled", () => {
    it("returns true when providerSpecificData.quotaMonitorEnabled is true", () => {
      assert.equal(mod.isQuotaMonitorEnabled({ providerSpecificData: { quotaMonitorEnabled: true } }), true);
    });

    it("returns false when providerSpecificData is missing", () => {
      assert.equal(mod.isQuotaMonitorEnabled({}), false);
    });

    it("returns false when quotaMonitorEnabled is false", () => {
      assert.equal(mod.isQuotaMonitorEnabled({ providerSpecificData: { quotaMonitorEnabled: false } }), false);
    });

    it("returns false when providerSpecificData is null", () => {
      assert.equal(mod.isQuotaMonitorEnabled({ providerSpecificData: null }), false);
    });
  });

  describe("getActiveMonitorCount", () => {
    it("returns a number", () => {
      assert.equal(typeof mod.getActiveMonitorCount(), "number");
    });
  });

  describe("getQuotaMonitorSnapshot", () => {
    it("returns null for unknown session", () => {
      assert.equal(mod.getQuotaMonitorSnapshot("nonexistent-" + Date.now()), null);
    });
  });

  describe("getQuotaMonitorSnapshots", () => {
    it("returns an array", () => {
      const result = mod.getQuotaMonitorSnapshots();
      assert.ok(Array.isArray(result));
    });
  });

  describe("getQuotaMonitorSummary", () => {
    it("returns expected shape", () => {
      const summary = mod.getQuotaMonitorSummary();
      assert.equal(typeof summary.active, "number");
      assert.equal(typeof summary.alerting, "number");
      assert.equal(typeof summary.exhausted, "number");
      assert.equal(typeof summary.errors, "number");
      assert.ok(typeof summary.statusCounts === "object");
      assert.ok(typeof summary.byProvider === "object");
    });
  });

  describe("clearQuotaMonitors", () => {
    it("clears without throwing", () => {
      mod.clearQuotaMonitors();
      assert.equal(mod.getActiveMonitorCount(), 0);
    });
  });
});
