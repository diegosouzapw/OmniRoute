import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-metrics-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const hooks = await import("../../src/lib/plugins/hooks.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  hooks.resetHooks();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  try { fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }); } catch {}
});

test("recordPluginMetric stores call count", async () => {
  const { recordPluginMetric, getPluginMetrics } = await import("../../src/lib/db/pluginMetrics.ts");
  recordPluginMetric("test-plugin", "onRequest", 5.2, false);
  recordPluginMetric("test-plugin", "onRequest", 3.1, false);

  const metrics = getPluginMetrics("test-plugin");
  assert.ok(metrics.length > 0, "should have metrics");
  const m = metrics.find((r: { event: string }) => r.event === "onRequest");
  assert.ok(m, "should have onRequest metric");
  assert.ok(m.calls >= 2, `expected calls >= 2, got ${m.calls}`);
});

test("recordPluginMetric tracks errors", async () => {
  const { recordPluginMetric, getPluginMetrics } = await import("../../src/lib/db/pluginMetrics.ts");
  recordPluginMetric("err-plugin", "onRequest", 1.0, true);

  const metrics = getPluginMetrics("err-plugin");
  const m = metrics.find((r: { event: string }) => r.event === "onRequest");
  assert.ok(m, "should have onRequest metric");
  assert.ok(m.errors >= 1, `expected errors >= 1, got ${m.errors}`);
});

test("recordPluginMetric tracks latency", async () => {
  const { recordPluginMetric, getPluginMetrics } = await import("../../src/lib/db/pluginMetrics.ts");
  recordPluginMetric("latency-plugin", "onRequest", 42.5, false);

  const metrics = getPluginMetrics("latency-plugin");
  const m = metrics.find((r: { event: string }) => r.event === "onRequest");
  assert.ok(m, "should have onRequest metric");
  assert.ok(m.totalDurationMs >= 42, `expected totalDurationMs >= 42, got ${m.totalDurationMs}`);
});

test("getPluginMetrics returns all plugins when no filter", async () => {
  const { recordPluginMetric, getPluginMetrics } = await import("../../src/lib/db/pluginMetrics.ts");
  recordPluginMetric("p1", "onRequest", 1, false);
  recordPluginMetric("p2", "onResponse", 2, false);

  const all = getPluginMetrics();
  assert.ok(all.length >= 2, `expected >= 2, got ${all.length}`);
});

test("clearPluginMetrics removes metrics", async () => {
  const { recordPluginMetric, clearPluginMetrics, getPluginMetrics } = await import("../../src/lib/db/pluginMetrics.ts");
  recordPluginMetric("clear-test", "onRequest", 1, false);
  clearPluginMetrics("clear-test");

  const metrics = getPluginMetrics("clear-test");
  const m = metrics.find((r: { event: string }) => r.event === "onRequest");
  assert.equal(m, undefined, "should be cleared");
});
