import test from "node:test";
import assert from "node:assert/strict";

// Manager is a singleton that depends on DB, scanner, and loader.
// We test the module structure and type contracts here.
// Full lifecycle tests require integration setup with SQLite.

import { pluginManager } from "../../src/lib/plugins/manager.ts";

// ── Singleton ──

test("pluginManager is a singleton", () => {
  const a = pluginManager;
  const b = pluginManager;
  assert.strictEqual(a, b);
});

test("pluginManager has all lifecycle methods", () => {
  assert.equal(typeof pluginManager.install, "function");
  assert.equal(typeof pluginManager.activate, "function");
  assert.equal(typeof pluginManager.deactivate, "function");
  assert.equal(typeof pluginManager.uninstall, "function");
  assert.equal(typeof pluginManager.scan, "function");
  assert.equal(typeof pluginManager.loadAll, "function");
  assert.equal(typeof pluginManager.getLoaded, "function");
  assert.equal(typeof pluginManager.listAll, "function");
  assert.equal(typeof pluginManager.getPlugin, "function");
});

test("pluginManager.getLoaded returns undefined for unknown plugin", () => {
  const result = pluginManager.getLoaded("nonexistent-plugin");
  assert.equal(result, undefined);
});

test("pluginManager.install throws for invalid directory", async () => {
  await assert.rejects(
    () => pluginManager.install("/nonexistent/path"),
    (err: Error) => {
      assert.ok(err.message.includes("No valid plugin found"));
      return true;
    }
  );
});

test("pluginManager.activate throws for unknown plugin", async () => {
  await assert.rejects(() => pluginManager.activate("nonexistent-plugin"));
});

test("pluginManager.uninstall throws for unknown plugin", async () => {
  await assert.rejects(() => pluginManager.uninstall("nonexistent-plugin"));
});
