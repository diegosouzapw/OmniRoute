import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Temp dirs ──
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugins-tools-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// ── Dynamic imports (after DATA_DIR set) ──
const core = await import("../../src/lib/db/core.ts");
const dbPlugins = await import("../../src/lib/db/plugins.ts");
const hooks = await import("../../src/lib/plugins/hooks.ts");
const { pluginTools } = await import("../../open-sse/mcp-server/tools/pluginTools.ts");

// ── Helpers ──

function getTool(name: string) {
  const tool = pluginTools.find((t) => t.name === name);
  assert.ok(tool, `Tool ${name} not found`);
  return tool!;
}

function writeTestPlugin(opts?: { name?: string; onRequest?: boolean }) {
  const name = opts?.name ?? "test-tools-plugin";
  const onRequest = opts?.onRequest ?? true;
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugin-src-"));
  const pluginDir = path.join(sourceDir, name);
  fs.mkdirSync(pluginDir, { recursive: true });
  const manifest = {
    name,
    version: "1.0.0",
    description: "Tools test plugin",
    author: "test",
    main: "index.js",
    hooks: { onRequest, onResponse: false, onError: false },
    enabledByDefault: false,
    requires: { permissions: [] },
    configSchema: {
      apiUrl: { type: "string", description: "API endpoint" },
      maxRetries: { type: "number", min: 1, max: 10, default: 3 },
      debug: { type: "boolean", default: false },
      mode: { type: "string", enum: ["fast", "slow", "auto"], default: "auto" },
    },
  };
  fs.writeFileSync(path.join(pluginDir, "plugin.json"), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(pluginDir, "index.js"), onRequest
    ? `module.exports.onRequest = function(ctx) { ctx.metadata = ctx.metadata || {}; ctx.metadata.hookCalled = true; };`
    : `module.exports = {};`
  );
  return { sourceDir, pluginDir, name };
}

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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  cleanupSourceDirs();
});

test.after(() => {
  core.resetDbInstance();
  cleanupSourceDirs();
  try { fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }); } catch {}
});

// ── plugin_list ──

test("plugin_list: returns empty when no plugins", async () => {
  const tool = getTool("plugin_list");
  const result = await tool.handler({});
  assert.deepEqual(result.plugins, []);
});

test("plugin_list: returns installed plugins", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "list-test" });
  activeSourceDirs.push(sourceDir);
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);

  const tool = getTool("plugin_list");
  const result = await tool.handler({});
  assert.equal(result.plugins.length, 1);
  assert.equal(result.plugins[0].name, name);
  assert.equal(result.plugins[0].version, "1.0.0");
  assert.equal(result.plugins[0].enabled, false);
  assert.ok(Array.isArray(result.plugins[0].hooks));

  await pluginManager.uninstall(name);
});

test("plugin_list: filters by status", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "filter-test" });
  activeSourceDirs.push(sourceDir);
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);

  const tool = getTool("plugin_list");
  const activeResult = await tool.handler({ status: "active" });
  assert.equal(activeResult.plugins.length, 0);

  const installedResult = await tool.handler({ status: "installed" });
  assert.equal(installedResult.plugins.length, 1);

  await pluginManager.uninstall(name);
});

// ── plugin_install ──

test("plugin_install: installs a valid plugin", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "install-tool" });
  activeSourceDirs.push(sourceDir);

  const tool = getTool("plugin_install");
  const result = await tool.handler({ path: sourceDir });
  assert.equal(result.success, true);
  assert.equal(result.plugin.name, name);

  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.uninstall(name);
});

test("plugin_install: throws for invalid path", async () => {
  const tool = getTool("plugin_install");
  await assert.rejects(
    () => tool.handler({ path: "/nonexistent/path" }),
    (err: Error) => {
      assert.ok(err.message.includes("No valid plugin found"));
      return true;
    }
  );
});

// ── plugin_activate ──

test("plugin_activate: activates installed plugin", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "activate-tool" });
  activeSourceDirs.push(sourceDir);
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);

  const tool = getTool("plugin_activate");
  const result = await tool.handler({ name });
  assert.equal(result.success, true);
  assert.ok(result.message.includes(name));

  await pluginManager.uninstall(name);
});

test("plugin_activate: returns error for nonexistent plugin", async () => {
  const tool = getTool("plugin_activate");
  const result = await tool.handler({ name: "no-such-plugin" });
  assert.equal(result.success, false);
  assert.ok(result.error.includes("not found"));
});

test("plugin_activate: is idempotent", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "activate-idempotent" });
  activeSourceDirs.push(sourceDir);
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);

  const tool = getTool("plugin_activate");
  await tool.handler({ name });
  const result = await tool.handler({ name });
  assert.equal(result.success, true);

  await pluginManager.uninstall(name);
});

// ── plugin_deactivate ──

test("plugin_deactivate: deactivates active plugin", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "deactivate-tool" });
  activeSourceDirs.push(sourceDir);
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);
  await pluginManager.activate(name);

  const tool = getTool("plugin_deactivate");
  const result = await tool.handler({ name });
  assert.equal(result.success, true);

  await pluginManager.uninstall(name);
});

test("plugin_deactivate: succeeds silently for nonexistent plugin", async () => {
  const tool = getTool("plugin_deactivate");
  const result = await tool.handler({ name: "ghost-deactivate" });
  // manager.deactivate() doesn't throw for missing plugins — silently sets status to inactive
  assert.equal(result.success, true);
});

// ── plugin_uninstall ──

test("plugin_uninstall: removes plugin", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "uninstall-tool" });
  activeSourceDirs.push(sourceDir);
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);

  const tool = getTool("plugin_uninstall");
  const result = await tool.handler({ name });
  assert.equal(result.success, true);
  assert.equal(dbPlugins.getPluginByName(name), null);
});

test("plugin_uninstall: returns error for nonexistent plugin", async () => {
  const tool = getTool("plugin_uninstall");
  const result = await tool.handler({ name: "ghost-uninstall" });
  assert.equal(result.success, false);
  assert.ok(result.error.includes("not found"));
});

// ── plugin_configure ──

test("plugin_configure: reads config when no config arg", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "config-read" });
  activeSourceDirs.push(sourceDir);
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);

  const tool = getTool("plugin_configure");
  const result = await tool.handler({ name });
  assert.ok(result.config !== undefined);
  assert.ok(result.configSchema !== undefined);

  await pluginManager.uninstall(name);
});

test("plugin_configure: updates config", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "config-write" });
  activeSourceDirs.push(sourceDir);
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);

  const tool = getTool("plugin_configure");
  const result = await tool.handler({ name, config: { apiUrl: "https://example.com" } });
  assert.equal(result.success, true);
  assert.equal(result.config.apiUrl, "https://example.com");

  const fromDb = dbPlugins.getPluginByName(name);
  const config = JSON.parse(fromDb!.config);
  assert.equal(config.apiUrl, "https://example.com");

  await pluginManager.uninstall(name);
});

test("plugin_configure: returns error for nonexistent plugin", async () => {
  const tool = getTool("plugin_configure");
  const result = await tool.handler({ name: "ghost-config" });
  assert.equal(result.success, false);
  assert.ok(result.error.includes("not found"));
});

// ── IMPORTANT-7: plugin_configure validates config against configSchema ──

test("plugin_configure: rejects config with wrong type (number instead of string)", async () => {
  // writeTestPlugin produces a plugin with configSchema: { apiUrl: string, maxRetries: number, ... }
  const { sourceDir, name } = writeTestPlugin({ name: "config-invalid-type" });
  activeSourceDirs.push(sourceDir);
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);

  const tool = getTool("plugin_configure");
  // apiUrl expects a string — passing a number should fail validation
  const result = await tool.handler({ name, config: { apiUrl: 12345 } });
  assert.equal(result.success, false, "should fail validation for wrong type");
  assert.ok(
    result.error && result.error.includes("validation failed"),
    `expected 'validation failed' in error, got: ${result.error}`
  );

  await pluginManager.uninstall(name);
});

test("plugin_configure: rejects config with out-of-range number", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "config-invalid-range" });
  activeSourceDirs.push(sourceDir);
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);

  const tool = getTool("plugin_configure");
  // maxRetries has min:1, max:10 — 999 should fail
  const result = await tool.handler({ name, config: { maxRetries: 999 } });
  assert.equal(result.success, false, "should fail validation for out-of-range number");
  assert.ok(result.error && result.error.includes("validation failed"));

  await pluginManager.uninstall(name);
});

test("plugin_configure: accepts valid config matching schema", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "config-valid" });
  activeSourceDirs.push(sourceDir);
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);

  const tool = getTool("plugin_configure");
  const result = await tool.handler({ name, config: { apiUrl: "https://ok.example.com", maxRetries: 5 } });
  assert.equal(result.success, true, "should succeed for valid config");
  assert.equal(result.config.apiUrl, "https://ok.example.com");

  await pluginManager.uninstall(name);
});

test("plugin_configure: allows any config when plugin has no configSchema", async () => {
  // A plugin with no configSchema should accept any config values
  const { sourceDir, name } = writeTestPlugin({ name: "config-no-schema", onRequest: false });
  activeSourceDirs.push(sourceDir);

  // Overwrite plugin.json without configSchema
  const pluginDir = sourceDir + "/" + name;
  const fs = await import("node:fs");
  const path = await import("node:path");
  fs.writeFileSync(path.join(pluginDir, "plugin.json"), JSON.stringify({
    name,
    version: "1.0.0",
    main: "index.js",
    hooks: { onRequest: false, onResponse: false, onError: false },
    requires: { permissions: [] },
    // no configSchema
  }));

  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  await pluginManager.install(sourceDir);

  const tool = getTool("plugin_configure");
  const result = await tool.handler({ name, config: { anything: "goes", foo: 42 } });
  // No schema → validation skipped → should succeed
  assert.equal(result.success, true, "should accept any config when no schema is declared");

  await pluginManager.uninstall(name);
});

// ── plugin_scan ──

test("plugin_scan: returns discovery result", async () => {
  const tool = getTool("plugin_scan");
  const result = await tool.handler({});
  assert.ok(result !== undefined);
  assert.equal(typeof result.discovered, "number");
  assert.ok(Array.isArray(result.errors));
});

// ── plugin_executions ──

test("plugin_executions: returns execution list", async () => {
  const tool = getTool("plugin_executions");
  const result = await tool.handler({ limit: 10 });
  assert.ok(result !== undefined);
  assert.ok(Array.isArray(result.metrics));
});
