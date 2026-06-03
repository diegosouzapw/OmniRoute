import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Temp dirs ──

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugins-lifecycle-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// ── Dynamic imports (after DATA_DIR set) ──

const core = await import("../../src/lib/db/core.ts");
const dbPlugins = await import("../../src/lib/db/plugins.ts");
const hooks = await import("../../src/lib/plugins/hooks.ts");
const { pluginManager } = await import("../../src/lib/plugins/manager.ts");

// ── Fixture: create a valid plugin in a temp directory ──
// Scanner expects: sourceDir/<plugin-name>/plugin.json + index.js
// Returns the sourceDir (parent) to pass to pluginManager.install()

function writeTestPlugin(opts?: { name?: string; onRequest?: boolean; enabledByDefault?: boolean }) {
  const name = opts?.name ?? "test-lifecycle-plugin";
  const onRequest = opts?.onRequest ?? true;
  const enabledByDefault = opts?.enabledByDefault ?? false;

  // Create a fresh source dir for this plugin (scanner scans for subdirs)
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugin-src-"));
  const pluginDir = path.join(sourceDir, name);
  fs.mkdirSync(pluginDir, { recursive: true });

  const manifest = {
    name,
    version: "1.0.0",
    description: "Integration test plugin",
    author: "test",
    main: "index.js",
    hooks: { onRequest, onResponse: false, onError: false },
    enabledByDefault,
    requires: { permissions: [] },
  };

  fs.writeFileSync(path.join(pluginDir, "plugin.json"), JSON.stringify(manifest, null, 2));

  // Plugin exports an onRequest handler that returns metadata (child-process isolation means
  // the handler cannot mutate the parent's ctx object directly — it must return the result).
  const indexJs = onRequest
    ? `module.exports.onRequest = function(ctx) { return { metadata: { hookCalled: true } }; };`
    : `module.exports = {};`;

  fs.writeFileSync(path.join(pluginDir, "index.js"), indexJs);

  return { sourceDir, pluginDir, name };
}

// ── Helpers ──

function cleanupDir(dir: string) {
  fs.rmSync(dir, { recursive: true, force: true });
}

// Track temp source dirs for cleanup
const activeSourceDirs: string[] = [];

function cleanupSourceDirs() {
  for (const dir of activeSourceDirs) {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
  }
  activeSourceDirs.length = 0;
}

// ── Lifecycle ──

test.beforeEach(() => {
  core.resetDbInstance();
  hooks.resetHooks();
  cleanupDir(TEST_DATA_DIR);
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  cleanupSourceDirs();
});

test.after(() => {
  core.resetDbInstance();
  cleanupSourceDirs();
  try { cleanupDir(TEST_DATA_DIR); } catch {}
});

// ── Tests: Install ──

test("install: copies plugin and creates DB row", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "install-test" });
  activeSourceDirs.push(sourceDir);

  const row = await pluginManager.install(sourceDir);

  assert.equal(row.name, name);
  assert.equal(row.version, "1.0.0");
  assert.equal(row.description, "Integration test plugin");
  assert.equal(row.status, "installed");

  // Verify DB lookup works
  const fromDb = dbPlugins.getPluginByName(name);
  assert.ok(fromDb, "plugin should be retrievable from DB");
  assert.equal(fromDb!.name, name);
  assert.equal(fromDb!.version, "1.0.0");

  await pluginManager.uninstall(name);
});

test("install: throws on duplicate install", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "dup-test" });
  activeSourceDirs.push(sourceDir);

  await pluginManager.install(sourceDir);
  await assert.rejects(() => pluginManager.install(sourceDir), /already installed/);

  await pluginManager.uninstall(name);
});

test("install: throws on invalid source directory", async () => {
  const emptyDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-empty-"));
  activeSourceDirs.push(emptyDir);
  await assert.rejects(() => pluginManager.install(emptyDir), /No valid plugin found/);
});

// ── Tests: Activate ──

test("activate: transitions DB status to active", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "activate-status" });
  activeSourceDirs.push(sourceDir);

  await pluginManager.install(sourceDir);
  await pluginManager.activate(name);

  const row = dbPlugins.getPluginByName(name);
  assert.ok(row, "plugin should exist in DB");
  assert.equal(row!.status, "active");
  assert.equal(row!.enabled, 1);

  await pluginManager.uninstall(name);
});

test("activate: registers manifest-declared hooks", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "activate-hooks" });
  activeSourceDirs.push(sourceDir);

  await pluginManager.install(sourceDir);
  await pluginManager.activate(name);

  // onRequest should be registered (manifest declares it)
  const registered = hooks.getHooks("onRequest");
  const found = registered.find((r) => r.pluginName === name);
  assert.ok(found, "onRequest hook should be registered for the plugin");

  // onResponse should NOT be registered (manifest says false)
  const responseHooks = hooks.getHooks("onResponse");
  const notFound = responseHooks.find((r) => r.pluginName === name);
  assert.equal(notFound, undefined, "onResponse hook should not be registered");

  await pluginManager.uninstall(name);
});

test("activate: plugin handler fires on hook emit", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "activate-emit" });
  activeSourceDirs.push(sourceDir);

  await pluginManager.install(sourceDir);
  await pluginManager.activate(name);

  // Fire the onRequest hook with a PluginContext-like payload.
  // Plugins run in isolated child processes and cannot mutate the parent's object
  // in-place — use emitHookBlocking and inspect the returned merged metadata.
  const payload = { requestId: "test-req", body: {}, model: "test", metadata: {} };
  const result = await hooks.emitHookBlocking("onRequest", payload);

  // The handler sets metadata.hookCalled = true; it is returned in the merged result.
  assert.deepEqual((result as Record<string, unknown>).metadata, { hookCalled: true });

  await pluginManager.uninstall(name);
});

test("activate: is idempotent for already-active plugin", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "activate-idempotent" });
  activeSourceDirs.push(sourceDir);

  await pluginManager.install(sourceDir);
  await pluginManager.activate(name);
  // Second activate should not throw
  await pluginManager.activate(name);

  const row = dbPlugins.getPluginByName(name);
  assert.equal(row!.status, "active");

  await pluginManager.uninstall(name);
});

test("activate: throws for nonexistent plugin", async () => {
  await assert.rejects(() => pluginManager.activate("no-such-plugin"), /not found/);
});

// ── Tests: Deactivate ──

test("deactivate: transitions DB status to inactive", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "deactivate-status" });
  activeSourceDirs.push(sourceDir);

  await pluginManager.install(sourceDir);
  await pluginManager.activate(name);
  await pluginManager.deactivate(name);

  const row = dbPlugins.getPluginByName(name);
  assert.ok(row, "plugin should still exist in DB after deactivation");
  assert.equal(row!.status, "inactive");

  await pluginManager.uninstall(name);
});

test("deactivate: unregisters all hooks for the plugin", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "deactivate-hooks" });
  activeSourceDirs.push(sourceDir);

  await pluginManager.install(sourceDir);
  await pluginManager.activate(name);

  // Verify hook is registered before deactivation
  assert.ok(hooks.getHooks("onRequest").find((r) => r.pluginName === name));

  await pluginManager.deactivate(name);

  // Hook should be gone
  const after = hooks.getHooks("onRequest");
  assert.equal(after.find((r) => r.pluginName === name), undefined, "hook should be unregistered");

  await pluginManager.uninstall(name);
});

test("deactivate: hook no longer fires after deactivation", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "deactivate-nofire" });
  activeSourceDirs.push(sourceDir);

  await pluginManager.install(sourceDir);
  await pluginManager.activate(name);

  // Verify hook fires while active (use emitHookBlocking — child-process isolation
  // means plugins cannot mutate the parent's in-memory payload object in-place).
  const payload = { requestId: "req-1", body: {}, model: "test", metadata: {} };
  const result1 = await hooks.emitHookBlocking("onRequest", payload);
  assert.deepEqual((result1 as Record<string, unknown>).metadata, { hookCalled: true });

  await pluginManager.deactivate(name);

  // After deactivation, hook is unregistered — emitHookBlocking returns empty metadata.
  const payload2 = { requestId: "req-2", body: {}, model: "test", metadata: {} };
  const result2 = await hooks.emitHookBlocking("onRequest", payload2);
  assert.deepEqual((result2 as Record<string, unknown>).metadata, {});

  await pluginManager.uninstall(name);
});

// ── Tests: Uninstall ──

test("uninstall: removes DB row", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "uninstall-db" });
  activeSourceDirs.push(sourceDir);

  await pluginManager.install(sourceDir);
  assert.ok(dbPlugins.getPluginByName(name), "should exist before uninstall");

  await pluginManager.uninstall(name);

  assert.equal(dbPlugins.getPluginByName(name), null, "should be removed from DB");
});

test("uninstall: removes plugin directory from disk", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "uninstall-dir" });
  activeSourceDirs.push(sourceDir);

  const row = await pluginManager.install(sourceDir);
  const installedDir = row.pluginDir;
  assert.ok(fs.existsSync(installedDir), "plugin dir should exist after install");

  await pluginManager.uninstall(name);

  assert.ok(!fs.existsSync(installedDir), "plugin dir should be removed after uninstall");
});

test("uninstall: deactivates before removing if active", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "uninstall-active" });
  activeSourceDirs.push(sourceDir);

  await pluginManager.install(sourceDir);
  await pluginManager.activate(name);

  // Verify active + hook registered
  assert.equal(dbPlugins.getPluginByName(name)!.status, "active");
  assert.ok(hooks.getHooks("onRequest").find((r) => r.pluginName === name));

  await pluginManager.uninstall(name);

  // Plugin should be fully gone
  assert.equal(dbPlugins.getPluginByName(name), null);
  assert.equal(hooks.getHooks("onRequest").find((r) => r.pluginName === name), undefined);
});

test("uninstall: throws for nonexistent plugin", async () => {
  await assert.rejects(() => pluginManager.uninstall("ghost-plugin"), /not found/);
});

// ── Tests: Full lifecycle ──

test("full lifecycle: install -> activate -> hook fires -> deactivate -> uninstall", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "full-lifecycle" });
  activeSourceDirs.push(sourceDir);

  // 1. Install
  const row = await pluginManager.install(sourceDir);
  assert.equal(row.status, "installed");
  assert.ok(dbPlugins.getPluginByName(name), "exists in DB after install");

  // 2. Activate
  await pluginManager.activate(name);
  const afterActivate = dbPlugins.getPluginByName(name);
  assert.equal(afterActivate!.status, "active");
  assert.ok(hooks.getHooks("onRequest").find((r) => r.pluginName === name), "hook registered");

  // 3. Fire hook (use emitHookBlocking — child-process isolation means plugins cannot
  //    mutate the parent's in-memory payload object; check the returned merged result).
  const payload = { requestId: "lifecycle-req", body: {}, model: "test", metadata: {} };
  const hookResult = await hooks.emitHookBlocking("onRequest", payload);
  assert.deepEqual(
    (hookResult as Record<string, unknown>).metadata,
    { hookCalled: true },
    "hook handler executed"
  );

  // 4. Deactivate
  await pluginManager.deactivate(name);
  const afterDeactivate = dbPlugins.getPluginByName(name);
  assert.equal(afterDeactivate!.status, "inactive");
  assert.equal(
    hooks.getHooks("onRequest").find((r) => r.pluginName === name),
    undefined,
    "hook unregistered after deactivation"
  );

  // 5. Uninstall
  await pluginManager.uninstall(name);
  assert.equal(dbPlugins.getPluginByName(name), null, "removed from DB");
});

// ── Tests: Multi-plugin isolation ──

test("multiple plugins: hooks are isolated per plugin", async () => {
  const p1 = writeTestPlugin({ name: "multi-p1" });
  const p2 = writeTestPlugin({ name: "multi-p2" });
  activeSourceDirs.push(p1.sourceDir, p2.sourceDir);

  await pluginManager.install(p1.sourceDir);
  await pluginManager.install(p2.sourceDir);
  await pluginManager.activate("multi-p1");
  await pluginManager.activate("multi-p2");

  // Both should have onRequest hooks
  const onRequest = hooks.getHooks("onRequest");
  assert.ok(onRequest.find((r) => r.pluginName === "multi-p1"));
  assert.ok(onRequest.find((r) => r.pluginName === "multi-p2"));

  // Deactivate only p1
  await pluginManager.deactivate("multi-p1");

  const afterDeactivate = hooks.getHooks("onRequest");
  assert.equal(afterDeactivate.find((r) => r.pluginName === "multi-p1"), undefined);
  assert.ok(afterDeactivate.find((r) => r.pluginName === "multi-p2"), "p2 hook still registered");

  // Cleanup
  await pluginManager.uninstall("multi-p1");
  await pluginManager.uninstall("multi-p2");
});
