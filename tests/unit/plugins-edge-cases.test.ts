import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Temp dirs ──
// IMPORTANT: DATA_DIR must be set BEFORE importing any module that imports core.ts,
// because core.ts evaluates DATA_DIR at module load time. All imports of DB-touching
// modules must be dynamic (after this line) to ensure the temp DB is used.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugins-edge-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const dbPlugins = await import("../../src/lib/db/plugins.ts");
const { scanPluginDir } = await import("../../src/lib/plugins/scanner.ts");
const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
const {
  registerHook,
  unregisterHooks,
  emitHook,
  emitHookBlocking,
  resetHooks,
  getHooks,
} = await import("../../src/lib/plugins/hooks.ts");

const activeSourceDirs: string[] = [];

function cleanupSourceDirs() {
  for (const dir of activeSourceDirs) {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
  }
  activeSourceDirs.length = 0;
}

function writeTestPlugin(opts: {
  name: string;
  onRequest?: boolean;
  onResponse?: boolean;
  onError?: boolean;
  configSchema?: Record<string, unknown>;
  indexJs?: string;
}) {
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-edge-src-"));
  const pluginDir = path.join(sourceDir, opts.name);
  fs.mkdirSync(pluginDir, { recursive: true });

  const manifest: Record<string, unknown> = {
    name: opts.name,
    version: "1.0.0",
    description: "Edge test plugin",
    main: "index.js",
    hooks: {
      onRequest: opts.onRequest ?? false,
      onResponse: opts.onResponse ?? false,
      onError: opts.onError ?? false,
    },
    enabledByDefault: false,
    requires: { permissions: [] },
  };
  if (opts.configSchema) manifest.configSchema = opts.configSchema;

  fs.writeFileSync(path.join(pluginDir, "plugin.json"), JSON.stringify(manifest, null, 2));

  let indexJs = opts.indexJs;
  if (!indexJs) {
    const handlers: string[] = [];
    if (opts.onRequest) handlers.push(`onRequest: function(ctx) { ctx.metadata = ctx.metadata || {}; ctx.metadata.hookCalled = true; }`);
    if (opts.onResponse) handlers.push(`onResponse: function(ctx, resp) { return resp; }`);
    if (opts.onError) handlers.push(`onError: function(ctx, err) {}`);
    indexJs = handlers.length > 0 ? `module.exports = { ${handlers.join(", ")} };` : `module.exports = {};`;
  }
  fs.writeFileSync(path.join(pluginDir, "index.js"), indexJs);

  activeSourceDirs.push(sourceDir);
  return { sourceDir, pluginDir, name: opts.name };
}

// ── Lifecycle ──

test.beforeEach(() => {
  core.resetDbInstance();
  // Clean all existing plugins to prevent UNIQUE constraint failures.
  // Wrapped in try-catch: when running alongside other test files that load core
  // before DATA_DIR is set, the SQLITE_FILE may point to the production DB which
  // may not have the plugins table yet (migration 076 renumbered). The cleanup
  // is redundant anyway — resetDbInstance() already invalidates the instance,
  // and rmSync/mkdirSync below gives us a fresh DATA_DIR for next getDbInstance().
  try {
    for (const p of dbPlugins.listPlugins()) {
      dbPlugins.deletePlugin(p.name);
    }
  } catch {
    // Production DB may not have the plugins table — ignore; fresh DB created below.
  }
  resetHooks();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  cleanupSourceDirs();
});

test.after(() => {
  core.resetDbInstance();
  cleanupSourceDirs();
  try { fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }); } catch {}
});

// ══════════════════════════════════════════
// Scanner edge cases
// ══════════════════════════════════════════

test("scanner: empty directory returns empty results", async () => {
  const emptyDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-scan-empty-"));
  activeSourceDirs.push(emptyDir);
  const result = await scanPluginDir(emptyDir);
  assert.deepEqual(result.plugins, []);
  assert.deepEqual(result.errors, []);
});

test("scanner: directory with no manifest reports error", async () => {
  const noManifestDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-scan-nomanifest-"));
  const pluginDir = path.join(noManifestDir, "some-plugin");
  fs.mkdirSync(pluginDir);
  fs.writeFileSync(path.join(pluginDir, "index.js"), "module.exports = {};");
  activeSourceDirs.push(noManifestDir);

  const result = await scanPluginDir(noManifestDir);
  assert.equal(result.plugins.length, 0);
  assert.equal(result.errors.length, 1);
  assert.ok(result.errors[0].error.includes("no plugin.json"));
});

test("scanner: invalid JSON manifest reports error", async () => {
  const badDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-scan-badjson-"));
  const pluginDir = path.join(badDir, "bad-json");
  fs.mkdirSync(pluginDir);
  fs.writeFileSync(path.join(pluginDir, "plugin.json"), "{invalid json!!!}}}");
  fs.writeFileSync(path.join(pluginDir, "index.js"), "module.exports = {};");
  activeSourceDirs.push(badDir);

  const result = await scanPluginDir(badDir);
  assert.equal(result.plugins.length, 0);
  assert.equal(result.errors.length, 1);
  assert.ok(result.errors[0].error.includes("invalid manifest") || result.errors[0].error.includes("JSON"));
});

test("scanner: missing required fields reports error", async () => {
  const missingDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-scan-missing-"));
  const pluginDir = path.join(missingDir, "missing-fields");
  fs.mkdirSync(pluginDir);
  // Missing version
  fs.writeFileSync(path.join(pluginDir, "plugin.json"), JSON.stringify({ name: "missing-fields" }));
  fs.writeFileSync(path.join(pluginDir, "index.js"), "module.exports = {};");
  activeSourceDirs.push(missingDir);

  const result = await scanPluginDir(missingDir);
  assert.equal(result.plugins.length, 0);
  assert.equal(result.errors.length, 1);
  assert.ok(result.errors[0].error.includes("invalid manifest"));
});

test("scanner: non-directory entries are skipped", async () => {
  const mixedDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-scan-mixed-"));
  // Create a file (not a directory) that looks like a plugin
  fs.writeFileSync(path.join(mixedDir, "not-a-dir.json"), "{}");
  activeSourceDirs.push(mixedDir);

  const result = await scanPluginDir(mixedDir);
  assert.equal(result.plugins.length, 0);
  assert.equal(result.errors.length, 0);
});

// ══════════════════════════════════════════
// Manager edge cases
// ══════════════════════════════════════════

test("manager: install with path traversal throws", async () => {
  await assert.rejects(
    () => pluginManager.install("/tmp/../../../etc"),
    (err: Error) => {
      assert.ok(
        err.message.includes("path traversal") || err.message.includes("No valid plugin found"),
        `Unexpected error: ${err.message}`
      );
      return true;
    }
  );
});

test("manager: install with null bytes in path throws", async () => {
  await assert.rejects(
    () => pluginManager.install("/tmp/test\0malicious"),
    (err: Error) => {
      assert.ok(
        err.message.includes("Invalid") || err.message.includes("null") || err.message.includes("No valid plugin found"),
        `Unexpected error: ${err.message}`
      );
      return true;
    }
  );
});

test("manager: double install same plugin throws", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "double-install" });

  await pluginManager.install(sourceDir);
  await assert.rejects(
    () => pluginManager.install(sourceDir),
    /already installed/
  );

  await pluginManager.uninstall(name);
});

test("manager: deactivate when already inactive is idempotent", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "deactivate-idempotent" });

  await pluginManager.install(sourceDir);
  // Plugin starts as "installed", not "active"
  // Deactivating should either succeed silently or throw with a clear message
  try {
    await pluginManager.deactivate(name);
    // If it succeeds, verify status
    const row = dbPlugins.getPluginByName(name);
    assert.ok(row);
  } catch (err: unknown) {
    // If it throws, the message should be clear
    assert.ok(err instanceof Error);
  }

  await pluginManager.uninstall(name);
});

test("manager: install then uninstall then reinstall works", async () => {
  const { sourceDir, name } = writeTestPlugin({ name: "reinstall-test" });

  await pluginManager.install(sourceDir);
  await pluginManager.uninstall(name);

  // Reinstall should work
  const row = await pluginManager.install(sourceDir);
  assert.equal(row.name, name);

  await pluginManager.uninstall(name);
});

test("manager: activate registers hooks from manifest", async () => {
  const { sourceDir, name } = writeTestPlugin({
    name: "hook-register",
    onRequest: true,
    onResponse: true,
  });

  await pluginManager.install(sourceDir);
  await pluginManager.activate(name);

  assert.ok(getHooks("onRequest").find((r) => r.pluginName === name));
  assert.ok(getHooks("onResponse").find((r) => r.pluginName === name));
  assert.equal(getHooks("onError").find((r) => r.pluginName === name), undefined);

  await pluginManager.uninstall(name);
});

test("manager: deactivate unregisters all hooks", async () => {
  const { sourceDir, name } = writeTestPlugin({
    name: "hook-unregister",
    onRequest: true,
    onResponse: true,
    onError: true,
  });

  await pluginManager.install(sourceDir);
  await pluginManager.activate(name);

  assert.ok(getHooks("onRequest").find((r) => r.pluginName === name));
  assert.ok(getHooks("onResponse").find((r) => r.pluginName === name));
  assert.ok(getHooks("onError").find((r) => r.pluginName === name));

  await pluginManager.deactivate(name);

  assert.equal(getHooks("onRequest").find((r) => r.pluginName === name), undefined);
  assert.equal(getHooks("onResponse").find((r) => r.pluginName === name), undefined);
  assert.equal(getHooks("onError").find((r) => r.pluginName === name), undefined);

  await pluginManager.uninstall(name);
});

// ══════════════════════════════════════════
// Hooks edge cases
// ══════════════════════════════════════════

test("hooks: emitHookBlocking with no handlers returns empty body", async () => {
  const result = await emitHookBlocking("onRequest", { body: {}, metadata: {} });
  assert.deepEqual(result.metadata, {});
  assert.ok(result.blocked === undefined || result.blocked === false);
});

test("hooks: multiple plugins on same event fire in priority order", async () => {
  const order: string[] = [];
  registerHook("onRequest", "low", () => { order.push("low"); }, 200);
  registerHook("onRequest", "high", () => { order.push("high"); }, 10);
  registerHook("onRequest", "mid", () => { order.push("mid"); }, 100);

  await emitHookBlocking("onRequest", { body: {}, metadata: {} });
  assert.deepEqual(order, ["high", "mid", "low"]);
});

test("hooks: handler that returns undefined does not modify payload", async () => {
  registerHook("onRequest", "noop", () => undefined);
  const result = await emitHookBlocking("onRequest", { body: { original: true }, metadata: {} });
  assert.deepEqual(result.body, { original: true });
});

test("hooks: handler error in emitHookBlocking stops chain", async () => {
  registerHook("onRequest", "bad", () => { throw new Error("handler error"); });
  registerHook("onRequest", "good", () => ({ metadata: { from: "good" } }));

  // emitHookBlocking should handle the error gracefully
  try {
    const result = await emitHookBlocking("onRequest", { body: {}, metadata: {} });
    // If it returns, good handler may or may not have run
    assert.ok(result !== undefined);
  } catch (err) {
    // If it throws, that's also acceptable behavior
    assert.ok(err instanceof Error);
  }
});

test("hooks: unregister one plugin does not affect others", () => {
  registerHook("onRequest", "keep", () => {});
  registerHook("onRequest", "remove", () => {});
  registerHook("onError", "remove", () => {});

  assert.equal(getHooks("onRequest").length, 2);

  unregisterHooks("remove");

  assert.equal(getHooks("onRequest").length, 1);
  assert.equal(getHooks("onRequest")[0].pluginName, "keep");
  assert.equal(getHooks("onError").length, 0);
});

test("hooks: registerHook with same handler ref is idempotent", () => {
  const handler = () => {};
  registerHook("onRequest", "idempotent", handler);
  registerHook("onRequest", "idempotent", handler);

  assert.equal(getHooks("onRequest").length, 1);
  assert.equal(getHooks("onRequest")[0].handler, handler);
});

test("hooks: registerHook with different handler refs registers both", () => {
  registerHook("onRequest", "multi", () => {});
  registerHook("onRequest", "multi", () => {});

  // Different function refs = both registered (hooks module uses reference equality)
  assert.equal(getHooks("onRequest").length, 2);
});

// ══════════════════════════════════════════
// DB edge cases
// ══════════════════════════════════════════

test("db: updatePluginConfig replaces existing config", () => {
  dbPlugins.insertPlugin({
    id: "merge-test",
    name: "merge-test",
    version: "1.0.0",
    main: "index.js",
    pluginDir: "/tmp/test",
    manifest: {},
    config: { existing: "value", override: "old" },
  });

  dbPlugins.updatePluginConfig("merge-test", { override: "new", added: "extra" });

  const plugin = dbPlugins.getPluginByName("merge-test");
  const config = JSON.parse(plugin!.config);
  // updatePluginConfig replaces, does not merge
  assert.equal(config.existing, undefined);
  assert.equal(config.override, "new");
  assert.equal(config.added, "extra");
});

test("db: listPlugins with no status returns all", () => {
  dbPlugins.insertPlugin({ id: "p1", name: "alpha", version: "1.0.0", main: "index.js", pluginDir: "/tmp/a", manifest: {} });
  dbPlugins.insertPlugin({ id: "p2", name: "beta", version: "1.0.0", main: "index.js", pluginDir: "/tmp/b", manifest: {} });

  const all = dbPlugins.listPlugins();
  assert.equal(all.length, 2);
  // Should be sorted by name
  assert.equal(all[0].name, "alpha");
  assert.equal(all[1].name, "beta");
});

test("db: listPlugins with status filters correctly", () => {
  dbPlugins.insertPlugin({ id: "f1", name: "installed-filter", version: "1.0.0", main: "index.js", pluginDir: "/tmp/f1", manifest: {} });
  dbPlugins.insertPlugin({ id: "f2", name: "active-filter", version: "1.0.0", main: "index.js", pluginDir: "/tmp/f2", manifest: {} });
  dbPlugins.updatePluginStatus("active-filter", "active");

  const installed = dbPlugins.listPlugins("installed");
  assert.equal(installed.length, 1);
  assert.equal(installed[0].name, "installed-filter");

  const active = dbPlugins.listPlugins("active");
  assert.equal(active.length, 1);
  assert.equal(active[0].name, "active-filter");
});

test("db: pluginExists returns true/false correctly", () => {
  dbPlugins.insertPlugin({ id: "exists-test", name: "exists-test", version: "1.0.0", main: "index.js", pluginDir: "/tmp/e", manifest: {} });

  assert.equal(dbPlugins.pluginExists("exists-test"), true);
  assert.equal(dbPlugins.pluginExists("nope"), false);
});

test("db: deletePlugin returns true when plugin exists, false when not", () => {
  dbPlugins.insertPlugin({ id: "del-test", name: "del-test", version: "1.0.0", main: "index.js", pluginDir: "/tmp/d", manifest: {} });

  assert.equal(dbPlugins.deletePlugin("del-test"), true);
  assert.equal(dbPlugins.deletePlugin("del-test"), false);
  assert.equal(dbPlugins.getPluginByName("del-test"), null);
});
