import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import {
  recordPluginExecution,
  getPluginAnalytics,
  getPluginAnalyticsSummary,
} from "../../src/lib/db/plugins.ts";
import { getDbInstance } from "../../src/lib/db/core.ts";

describe("plugin analytics", () => {
  beforeEach(() => {
    // The plugin_analytics table is created by migration 091 (run on getDbInstance);
    // this test relies on that migration rather than creating the table inline, so a
    // missing/renumbered migration would fail here instead of being masked.
    const db = getDbInstance();
    db.exec("DELETE FROM plugin_analytics");
  });

  afterEach(() => {
    const db = getDbInstance();
    db.exec("DELETE FROM plugin_analytics");
  });

  it("recordPluginExecution inserts a row", () => {
    recordPluginExecution("test-plugin", "onRequest", 42, true);
    const rows = getPluginAnalytics("test-plugin");
    assert.strictEqual(rows.length, 1);
    assert.strictEqual(rows[0].pluginName, "test-plugin");
    assert.strictEqual(rows[0].hook, "onRequest");
    assert.strictEqual(rows[0].durationMs, 42);
    assert.strictEqual(rows[0].success, true);
  });

  it("records failure with error message", () => {
    recordPluginExecution("fail-plugin", "onError", 100, false, "something broke");
    const rows = getPluginAnalytics("fail-plugin");
    assert.strictEqual(rows[0].success, false);
    assert.strictEqual(rows[0].errorMessage, "something broke");
  });

  it("getPluginAnalytics returns most recent first", () => {
    recordPluginExecution("order-plugin", "onRequest", 10, true);
    // Force different timestamp by inserting directly
    const db = getDbInstance();
    db.prepare("INSERT INTO plugin_analytics (plugin_name, hook, duration_ms, success, created_at) VALUES (?, ?, ?, ?, ?)")
      .run("order-plugin", "onResponse", 20, 1, "2099-01-01T00:00:00");
    const rows = getPluginAnalytics("order-plugin");
    assert.strictEqual(rows[0].hook, "onResponse");
    assert.strictEqual(rows[1].hook, "onRequest");
  });

  it("getPluginAnalyticsSummary counts correctly", () => {
    recordPluginExecution("sum-plugin", "onRequest", 100, true);
    recordPluginExecution("sum-plugin", "onRequest", 200, true);
    recordPluginExecution("sum-plugin", "onRequest", 300, false, "err");
    const summary = getPluginAnalyticsSummary("sum-plugin");
    assert.strictEqual(summary.totalCalls, 3);
    assert.strictEqual(summary.successCount, 2);
    assert.strictEqual(summary.failureCount, 1);
    assert.ok(summary.avgDurationMs > 0);
  });

  it("empty plugin returns zero summary", () => {
    const summary = getPluginAnalyticsSummary("nonexistent");
    assert.strictEqual(summary.totalCalls, 0);
  });
});
