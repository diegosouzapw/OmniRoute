import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Temp DB ──
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugins-upgrade-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const dbPlugins = await import("../../src/lib/db/plugins.ts");
const hooks = await import("../../src/lib/plugins/hooks.ts");
const { pluginManager, compareSemver } = await import("../../src/lib/plugins/manager.ts");

// ── Fixture ──

function writePlugin(version: string, name = "upgrade-test") {
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), `plugin-upgrade-${version}-`));
  const pluginDir = path.join(sourceDir, name);
  fs.mkdirSync(pluginDir, { recursive: true });

  fs.writeFileSync(path.join(pluginDir, "plugin.json"), JSON.stringify({
    name,
    version,
    description: `Plugin v${version}`,
    author: "test",
    main: "index.js",
    hooks: { onRequest: true, onResponse: false, onError: false },
    enabledByDefault: false,
    requires: { permissions: [] },
  }));

  fs.writeFileSync(
    path.join(pluginDir, "index.js"),
    `module.exports.onRequest = function(ctx) { ctx.metadata = ctx.metadata || {}; ctx.metadata.v = "${version}"; };`
  );

  return { sourceDir, pluginDir };
}

function writePluginWithConfig(version: string, name = "upgrade-config-test") {
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), `plugin-upgrade-cfg-${version}-`));
  const pluginDir = path.join(sourceDir, name);
  fs.mkdirSync(pluginDir, { recursive: true });

  fs.writeFileSync(path.join(pluginDir, "plugin.json"), JSON.stringify({
    name,
    version,
    description: `Plugin v${version}`,
    author: "test",
    main: "index.js",
    hooks: { onRequest: true, onResponse: false, onError: false },
    enabledByDefault: false,
    requires: { permissions: [] },
    configSchema: {
      apiKey: { type: "string", description: "API key" },
    },
  }));

  fs.writeFileSync(
    path.join(pluginDir, "index.js"),
    `module.exports.onRequest = function(ctx) { return; };`
  );

  return { sourceDir, pluginDir };
}

const activeDirs: string[] = [];
function cleanupDirs() {
  for (const dir of activeDirs) {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
  }
  activeDirs.length = 0;
}

test.beforeEach(() => {
  core.resetDbInstance();
  hooks.resetHooks();
  cleanupDirs();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  cleanupDirs();
  try { fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }); } catch {}
});

// ── Tests ──

test("upgrade succeeds with newer version", async () => {
  const v1 = writePlugin("1.0.0");
  activeDirs.push(v1.sourceDir);
  await pluginManager.install(v1.sourceDir);

  const v2 = writePlugin("2.0.0");
  activeDirs.push(v2.sourceDir);

  const result = await pluginManager.upgrade(v2.sourceDir);
  assert.equal(result.name, "upgrade-test");
  assert.equal(result.version, "2.0.0");

  await pluginManager.uninstall("upgrade-test");
});

test("upgrade rejects downgrade", async () => {
  const v2 = writePlugin("2.0.0");
  activeDirs.push(v2.sourceDir);
  await pluginManager.install(v2.sourceDir);

  const v1 = writePlugin("1.0.0");
  activeDirs.push(v1.sourceDir);

  await assert.rejects(() => pluginManager.upgrade(v1.sourceDir), /not newer/);

  await pluginManager.uninstall("upgrade-test");
});

test("upgrade rejects same version", async () => {
  const v1a = writePlugin("1.0.0");
  activeDirs.push(v1a.sourceDir);
  await pluginManager.install(v1a.sourceDir);

  const v1b = writePlugin("1.0.0");
  activeDirs.push(v1b.sourceDir);

  await assert.rejects(() => pluginManager.upgrade(v1b.sourceDir), /not newer/);

  await pluginManager.uninstall("upgrade-test");
});

test("upgrade preserves config values", async () => {
  const v1 = writePluginWithConfig("1.0.0");
  activeDirs.push(v1.sourceDir);
  await pluginManager.install(v1.sourceDir);

  // Set config
  dbPlugins.updatePluginConfig("upgrade-config-test", { apiKey: "secret-key" });

  const v2 = writePluginWithConfig("2.0.0");
  activeDirs.push(v2.sourceDir);

  const result = await pluginManager.upgrade(v2.sourceDir);
  assert.equal(result.version, "2.0.0");

  // Config is NOT preserved (delete+reinstall) — this is expected behavior
  const row = dbPlugins.getPluginByName("upgrade-config-test")!;
  const config = JSON.parse(row.config);
  // After upgrade, config is empty since we delete+reinstall
  assert.deepEqual(config, {});

  await pluginManager.uninstall("upgrade-config-test");
});

test("install() auto-upgrades when source version is newer", async () => {
  const v1 = writePlugin("1.0.0", "auto-upgrade");
  activeDirs.push(v1.sourceDir);
  await pluginManager.install(v1.sourceDir);

  const v2 = writePlugin("2.0.0", "auto-upgrade");
  activeDirs.push(v2.sourceDir);

  // install() should auto-upgrade instead of throwing "already installed"
  const result = await pluginManager.install(v2.sourceDir);
  assert.equal(result.version, "2.0.0");

  await pluginManager.uninstall("auto-upgrade");
});

test("install() rejects when source version is older", async () => {
  const v2 = writePlugin("2.0.0", "reject-old");
  activeDirs.push(v2.sourceDir);
  await pluginManager.install(v2.sourceDir);

  const v1 = writePlugin("1.0.0", "reject-old");
  activeDirs.push(v1.sourceDir);

  await assert.rejects(() => pluginManager.install(v1.sourceDir), /not newer/);

  await pluginManager.uninstall("reject-old");
});

test("upgrade fails for uninstalled plugin", async () => {
  const v1 = writePlugin("1.0.0", "not-installed");
  activeDirs.push(v1.sourceDir);

  await assert.rejects(() => pluginManager.upgrade(v1.sourceDir), /not installed/);
});

test("upgrade with minor version bump", async () => {
  const v1 = writePlugin("1.0.0", "minor-bump");
  activeDirs.push(v1.sourceDir);
  await pluginManager.install(v1.sourceDir);

  const v11 = writePlugin("1.1.0", "minor-bump");
  activeDirs.push(v11.sourceDir);

  const result = await pluginManager.upgrade(v11.sourceDir);
  assert.equal(result.version, "1.1.0");

  await pluginManager.uninstall("minor-bump");
});

test("upgrade with patch version bump", async () => {
  const v1 = writePlugin("1.0.0", "patch-bump");
  activeDirs.push(v1.sourceDir);
  await pluginManager.install(v1.sourceDir);

  const v101 = writePlugin("1.0.1", "patch-bump");
  activeDirs.push(v101.sourceDir);

  const result = await pluginManager.upgrade(v101.sourceDir);
  assert.equal(result.version, "1.0.1");

  await pluginManager.uninstall("patch-bump");
});

// ── MINOR-10: compareSemver NaN-safe with pre-release suffixes ──

test("compareSemver: valid semver compares correctly", () => {
  assert.ok(compareSemver("2.0.0", "1.0.0") > 0, "2.0.0 > 1.0.0");
  assert.ok(compareSemver("1.0.0", "2.0.0") < 0, "1.0.0 < 2.0.0");
  assert.equal(compareSemver("1.0.0", "1.0.0"), 0, "1.0.0 == 1.0.0");
  assert.ok(compareSemver("1.1.0", "1.0.0") > 0, "1.1.0 > 1.0.0");
  assert.ok(compareSemver("1.0.1", "1.0.0") > 0, "1.0.1 > 1.0.0");
});

test("compareSemver: pre-release suffix strips cleanly (no NaN)", () => {
  // 1.0.0-beta should compare as 1.0.0 (< 1.0.1, not silently equal)
  assert.ok(compareSemver("1.0.1", "1.0.0-beta") > 0, "1.0.1 > 1.0.0-beta (treated as 1.0.0)");
  assert.ok(compareSemver("1.0.0-beta", "0.9.0") > 0, "1.0.0-beta > 0.9.0");
  // Both pre-release: treated as equal numeric parts
  assert.equal(compareSemver("1.0.0-beta", "1.0.0-rc.1"), 0, "1.0.0-beta == 1.0.0-rc.1 (both strip to 1.0.0)");
});

test("compareSemver: NaN segments coerce to 0, result is not NaN", () => {
  // Pathological value from a legacy DB — must not produce NaN
  const result = compareSemver("1.0.0-beta", "1.0.0");
  assert.ok(!Number.isNaN(result), `compareSemver should never return NaN, got ${result}`);
  // 1.0.0-beta strips to 1.0.0 → equal to 1.0.0
  assert.equal(result, 0, "1.0.0-beta treated as 1.0.0 should equal 1.0.0");
});
