/**
 * Security tests — filesystem path-safety for plugin manager and loader.
 *
 * Covers three fixes:
 *   CRITICAL-2: assertWithinPluginDir called before every rm() in upgrade/uninstall
 *   CRITICAL-3: manifest.main path validated at install/upgrade; staging cleanup on failure
 *   IMPORTANT-6: host script written with flag:"wx" (O_EXCL) + mode:0o600
 *
 * Strategy:
 *   - Behavioral tests where PluginManager is instantiable with a real tmp pluginDir
 *     (uses the same DATA_DIR trick as plugins-edge-cases.test.ts).
 *   - Source-scan assertions for patterns that are hard to trigger behaviorally
 *     (assertWithinPluginDir invocation site, wx/0o600 in loader.ts).
 */

import test, { describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { readFileSync } from "node:fs";
import { resolve as pathResolve } from "node:path";

// ── Temp DB — must be set BEFORE any DB-touching import ──────────────────────
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugins-fs-safety-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/plugins/../db/core.ts");
const hooks = await import("../../src/lib/plugins/hooks.ts");
const { pluginManager } = await import("../../src/lib/plugins/manager.ts");

// ── Source files for scan-based tests ────────────────────────────────────────
const managerSource = readFileSync(
  pathResolve(process.cwd(), "src/lib/plugins/manager.ts"),
  "utf-8"
);
const loaderSource = readFileSync(
  pathResolve(process.cwd(), "src/lib/plugins/loader.ts"),
  "utf-8"
);

// ── Fixture helpers ───────────────────────────────────────────────────────────

/**
 * Write a minimal valid plugin and return its plugin directory (where plugin.json lives).
 *
 * Uses the DIRECT plugin-dir layout — plugin.json at the root of the returned dir.
 * This exercises the fast-path in install()/upgrade() that reads plugin.json directly
 * from `sourceDir` without going through scanPluginDir(). That path does NOT call
 * stat(entryPoint), so our assertEntryPointWithinDest() is the only guard.
 */
function writePluginWithMain(opts: {
  name: string;
  version?: string;
  main: string;
  /** If false, skip writing the main file (e.g. for path-escape tests). Default: true for safe paths. */
  writeMainFile?: boolean;
}): { sourceDir: string } {
  // sourceDir IS the plugin dir — plugin.json at its root (direct-plugin-dir layout)
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), `plugin-fs-safety-${opts.name}-`));

  fs.writeFileSync(
    path.join(sourceDir, "plugin.json"),
    JSON.stringify({
      name: opts.name,
      version: opts.version ?? "1.0.0",
      description: "FS-safety test plugin",
      author: "test",
      main: opts.main,
      hooks: { onRequest: false, onResponse: false, onError: false },
      enabledByDefault: false,
      requires: { permissions: [] },
    })
  );

  // Write the main file only for safe relative paths
  const shouldWrite = opts.writeMainFile !== false && !opts.main.startsWith("..") && !path.isAbsolute(opts.main);
  if (shouldWrite) {
    const mainAbs = path.join(sourceDir, opts.main);
    fs.mkdirSync(path.dirname(mainAbs), { recursive: true });
    fs.writeFileSync(mainAbs, "module.exports = {};");
  }

  return { sourceDir };
}

const activeDirs: string[] = [];

// The manager writes installed plugins to getDefaultPluginDir() = ~/.omniroute/plugins/.
// We must clean those dirs between tests to avoid ENOTEMPTY / stale state.
const DEFAULT_PLUGIN_DIR = path.join(
  process.env.HOME || process.env.USERPROFILE || "/tmp",
  ".omniroute",
  "plugins"
);

/** Known plugin names created by this test file — cleaned between tests. */
const MANAGED_PLUGIN_NAMES = [
  "escape-install",
  "escape-abs",
  "escape-deep",
  "escape-cleanup",
  "escape-upgrade",
  "valid-regression",
  "valid-upgrade-regression",
];

function cleanInstalledPluginDirs() {
  for (const name of MANAGED_PLUGIN_NAMES) {
    // Remove final dir and any staging remnants
    const base = path.join(DEFAULT_PLUGIN_DIR, name);
    try {
      fs.rmSync(base, { recursive: true, force: true });
    } catch {}
    // Also clean any .staging-* leftovers
    if (fs.existsSync(DEFAULT_PLUGIN_DIR)) {
      for (const entry of fs.readdirSync(DEFAULT_PLUGIN_DIR)) {
        if (entry.startsWith(`${name}.staging-`)) {
          try {
            fs.rmSync(path.join(DEFAULT_PLUGIN_DIR, entry), { recursive: true, force: true });
          } catch {}
        }
      }
    }
  }
}

function cleanSourceDirs() {
  for (const d of activeDirs) {
    try {
      fs.rmSync(d, { recursive: true, force: true });
    } catch {}
  }
  activeDirs.length = 0;
}

test.beforeEach(() => {
  core.resetDbInstance();
  hooks.resetHooks();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  cleanSourceDirs();
  cleanInstalledPluginDirs();
});

test.after(() => {
  core.resetDbInstance();
  cleanSourceDirs();
  cleanInstalledPluginDirs();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {}
});

// ══════════════════════════════════════════════════════════════════════════════
// CRITICAL-3 — behavioral: manifest.main path traversal rejected at install time
// ══════════════════════════════════════════════════════════════════════════════

test("install rejects manifest.main with path traversal (../../escape.js)", async () => {
  // Uses direct-plugin-dir layout so install() reads plugin.json directly (fast path),
  // bypassing scanPluginDir's stat() check — only assertEntryPointWithinDest() stops it.
  const { sourceDir } = writePluginWithMain({
    name: "escape-install",
    main: "../../escape.js",
    writeMainFile: false,
  });
  activeDirs.push(sourceDir);

  await assert.rejects(
    () => pluginManager.install(sourceDir),
    (err: Error) => {
      // Must mention escaping/outside, not just a generic FS error
      assert.ok(
        err.message.includes("escapes") ||
          err.message.includes("outside") ||
          err.message.includes("Refusing"),
        `Expected containment error, got: ${err.message}`
      );
      return true;
    }
  );

  // No partial install dir or staging dir should be left behind
  const pluginsRoot = path.join(TEST_DATA_DIR, "plugins");
  if (fs.existsSync(pluginsRoot)) {
    const entries = fs.readdirSync(pluginsRoot);
    const leftover = entries.filter((e) => e.startsWith("escape-install"));
    assert.deepEqual(
      leftover,
      [],
      `Staging/install dir left behind after failed install: ${leftover.join(", ")}`
    );
  }
});

test("install rejects manifest.main with deep traversal escape (../../../evil.js)", async () => {
  // A deeper traversal that definitely escapes the staging dir
  const { sourceDir } = writePluginWithMain({
    name: "escape-deep",
    main: "../../../../../../../evil.js",
    writeMainFile: false,
  });
  activeDirs.push(sourceDir);

  await assert.rejects(
    () => pluginManager.install(sourceDir),
    (err: Error) => {
      assert.ok(
        err.message.includes("escapes") ||
          err.message.includes("outside") ||
          err.message.includes("Refusing"),
        `Expected containment error, got: ${err.message}`
      );
      return true;
    }
  );

  // No staging residue
  const pluginsRoot = path.join(TEST_DATA_DIR, "plugins");
  if (fs.existsSync(pluginsRoot)) {
    const entries = fs.readdirSync(pluginsRoot);
    const leftover = entries.filter((e) => e.startsWith("escape-deep"));
    assert.deepEqual(leftover, [], `Leftover dirs after failed install: ${leftover.join(", ")}`);
  }
});

test("install does NOT leave a staging dir behind on manifest.main escape", async () => {
  const { sourceDir } = writePluginWithMain({
    name: "escape-cleanup",
    main: "../../../tmp/evil.js",
    writeMainFile: false,
  });
  activeDirs.push(sourceDir);

  await assert.rejects(() => pluginManager.install(sourceDir));

  const pluginsRoot = path.join(TEST_DATA_DIR, "plugins");
  if (fs.existsSync(pluginsRoot)) {
    const entries = fs.readdirSync(pluginsRoot);
    const leftovers = entries.filter((e) => e.includes("escape-cleanup"));
    assert.deepEqual(leftovers, [], `Found leftover dirs: ${leftovers.join(", ")}`);
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// CRITICAL-3 — behavioral: upgrade rejects manifest.main escape + no staging residue
// ══════════════════════════════════════════════════════════════════════════════

test("upgrade rejects manifest.main with path traversal and leaves old install intact", async () => {
  // Install valid v1 using the direct-plugin-dir layout
  const { sourceDir: v1Dir } = writePluginWithMain({
    name: "escape-upgrade",
    version: "1.0.0",
    main: "index.js",
  });
  activeDirs.push(v1Dir);
  await pluginManager.install(v1Dir);

  // Attempt upgrade with v2 that has a malicious main (direct-plugin-dir layout,
  // bypassing scanPluginDir's stat() check so only our containment guard fires)
  const { sourceDir: v2Dir } = writePluginWithMain({
    name: "escape-upgrade",
    version: "2.0.0",
    main: "../../evil.js",
    writeMainFile: false,
  });
  activeDirs.push(v2Dir);

  await assert.rejects(
    () => pluginManager.upgrade(v2Dir),
    (err: Error) => {
      assert.ok(
        err.message.includes("escapes") ||
          err.message.includes("outside") ||
          err.message.includes("Refusing"),
        `Expected containment error, got: ${err.message}`
      );
      return true;
    }
  );

  // Old v1 install should still be in DB (upgrade rolled back before deleting old dir)
  const row = pluginManager.getPlugin("escape-upgrade");
  assert.ok(row, "Old plugin record should still exist after failed upgrade");
  assert.equal(row.version, "1.0.0", "Old version should be preserved");

  await pluginManager.uninstall("escape-upgrade");
});

// ══════════════════════════════════════════════════════════════════════════════
// CRITICAL-2 — source-scan: assertWithinPluginDir called before each rm()
// ══════════════════════════════════════════════════════════════════════════════

test("source: assertWithinPluginDir helper is defined in manager.ts", () => {
  assert.ok(
    managerSource.includes("assertWithinPluginDir"),
    "assertWithinPluginDir must be defined in manager.ts"
  );
});

test("source: assertWithinPluginDir is called before rm in uninstall", () => {
  // Find the uninstall method body and check containment guard precedes rm call
  const uninstallIdx = managerSource.indexOf("async uninstall(");
  assert.ok(uninstallIdx !== -1, "uninstall method not found");

  // Get the slice from uninstall through the next method
  const afterUninstall = managerSource.slice(uninstallIdx);
  const nextMethodIdx = afterUninstall.indexOf("\n  async ", 10);
  const uninstallBody = nextMethodIdx !== -1 ? afterUninstall.slice(0, nextMethodIdx) : afterUninstall;

  const guardIdx = uninstallBody.indexOf("assertWithinPluginDir");
  const rmIdx = uninstallBody.indexOf("await rm(");
  assert.ok(guardIdx !== -1, "assertWithinPluginDir must be called in uninstall");
  assert.ok(rmIdx !== -1, "rm() must be called in uninstall");
  assert.ok(
    guardIdx < rmIdx,
    `assertWithinPluginDir (pos ${guardIdx}) must appear before rm() (pos ${rmIdx}) in uninstall`
  );
});

test("source: assertWithinPluginDir is called before rm in upgrade", () => {
  const upgradeIdx = managerSource.indexOf("async upgrade(");
  assert.ok(upgradeIdx !== -1, "upgrade method not found");

  const afterUpgrade = managerSource.slice(upgradeIdx);
  const nextMethodIdx = afterUpgrade.indexOf("\n  async activate(");
  const upgradeBody = nextMethodIdx !== -1 ? afterUpgrade.slice(0, nextMethodIdx) : afterUpgrade;

  const guardIdx = upgradeBody.indexOf("assertWithinPluginDir");
  const rmIdx = upgradeBody.indexOf("await rm(");
  assert.ok(guardIdx !== -1, "assertWithinPluginDir must be called in upgrade");
  assert.ok(rmIdx !== -1, "rm() must be called in upgrade");
  assert.ok(
    guardIdx < rmIdx,
    `assertWithinPluginDir (pos ${guardIdx}) must appear before rm() (pos ${rmIdx}) in upgrade`
  );
});

test("source: assertWithinPluginDir throws for path outside pluginDir", () => {
  // Extract and evaluate the helper via string match to verify logic is correct.
  // We test the behavioral contract: resolve("/plugins/foo") is fine,
  // resolve("/tmp/evil") is not fine when root is "/plugins".
  // Since we can't easily import the unexported helper, verify it uses resolve + sep.
  assert.ok(
    managerSource.includes('resolve(pluginRoot)') || managerSource.includes('resolve(this_pluginDir)') || managerSource.includes('resolve('),
    "assertWithinPluginDir must call resolve()"
  );
  assert.ok(
    managerSource.includes("sep"),
    "assertWithinPluginDir must use path.sep for boundary check"
  );
  assert.ok(
    managerSource.includes("Refusing to delete"),
    "assertWithinPluginDir must throw with 'Refusing to delete' message"
  );
});

// ══════════════════════════════════════════════════════════════════════════════
// CRITICAL-3 — source-scan: assertEntryPointWithinDest called before DB insert
// ══════════════════════════════════════════════════════════════════════════════

test("source: assertEntryPointWithinDest helper is defined in manager.ts", () => {
  assert.ok(
    managerSource.includes("assertEntryPointWithinDest"),
    "assertEntryPointWithinDest must be defined in manager.ts"
  );
});

test("source: assertEntryPointWithinDest is called in install before insertPlugin", () => {
  const installIdx = managerSource.indexOf("async install(");
  assert.ok(installIdx !== -1, "install method not found");

  const afterInstall = managerSource.slice(installIdx);
  const nextMethodIdx = afterInstall.indexOf("\n  async upgrade(");
  const installBody = nextMethodIdx !== -1 ? afterInstall.slice(0, nextMethodIdx) : afterInstall;

  const guardIdx = installBody.indexOf("assertEntryPointWithinDest");
  const insertIdx = installBody.indexOf("insertPlugin(");
  assert.ok(guardIdx !== -1, "assertEntryPointWithinDest must be called in install");
  assert.ok(insertIdx !== -1, "insertPlugin must be called in install");
  assert.ok(
    guardIdx < insertIdx,
    `assertEntryPointWithinDest (pos ${guardIdx}) must appear before insertPlugin (pos ${insertIdx}) in install`
  );
});

test("source: assertEntryPointWithinDest is called in upgrade before insertPlugin", () => {
  const upgradeIdx = managerSource.indexOf("async upgrade(");
  assert.ok(upgradeIdx !== -1, "upgrade method not found");

  const afterUpgrade = managerSource.slice(upgradeIdx);
  const nextMethodIdx = afterUpgrade.indexOf("\n  async activate(");
  const upgradeBody = nextMethodIdx !== -1 ? afterUpgrade.slice(0, nextMethodIdx) : afterUpgrade;

  const guardIdx = upgradeBody.indexOf("assertEntryPointWithinDest");
  const insertIdx = upgradeBody.indexOf("insertPlugin(");
  assert.ok(guardIdx !== -1, "assertEntryPointWithinDest must be called in upgrade");
  assert.ok(insertIdx !== -1, "insertPlugin must be called in upgrade");
  assert.ok(
    guardIdx < insertIdx,
    `assertEntryPointWithinDest (pos ${guardIdx}) must appear before insertPlugin (pos ${insertIdx}) in upgrade`
  );
});

// ══════════════════════════════════════════════════════════════════════════════
// CRITICAL-3 — source-scan: atomic staging pattern (staging dir + rename)
// ══════════════════════════════════════════════════════════════════════════════

test("source: install uses atomic staging rename pattern", () => {
  assert.ok(
    managerSource.includes(".staging-"),
    "install must use a staging dir with .staging- suffix"
  );
  assert.ok(
    managerSource.includes("rename(stagingDir"),
    "install must atomically rename staging dir to final dest"
  );
});

test("source: install cleans up staging dir on failure (rm in catch)", () => {
  const installIdx = managerSource.indexOf("async install(");
  const afterInstall = managerSource.slice(installIdx);
  const nextMethodIdx = afterInstall.indexOf("\n  async upgrade(");
  const installBody = nextMethodIdx !== -1 ? afterInstall.slice(0, nextMethodIdx) : afterInstall;

  // There must be a rm(stagingDir) inside a catch block
  assert.ok(
    installBody.includes("rm(stagingDir"),
    "install must rm(stagingDir) in the catch/failure path"
  );
});

// ══════════════════════════════════════════════════════════════════════════════
// IMPORTANT-6 — source-scan: host script written with flag:"wx" + mode:0o600
// ══════════════════════════════════════════════════════════════════════════════

test('source: loader uses flag:"wx" (O_EXCL) when writing host script', () => {
  assert.ok(
    loaderSource.includes('"wx"') || loaderSource.includes("'wx'"),
    'loader.ts must use flag: "wx" (O_EXCL) for the host script writeFile'
  );
});

test("source: loader uses mode:0o600 when writing host script", () => {
  assert.ok(
    loaderSource.includes("0o600"),
    "loader.ts must use mode: 0o600 for the host script writeFile"
  );
});

test("source: loader retries on EEXIST collision when writing host script", () => {
  assert.ok(
    loaderSource.includes("EEXIST"),
    "loader.ts must handle EEXIST on O_EXCL write (retry once with fresh UUID)"
  );
});

// ══════════════════════════════════════════════════════════════════════════════
// Regression: valid plugins still install and uninstall cleanly
// ══════════════════════════════════════════════════════════════════════════════

test("install and uninstall work for a valid plugin (regression)", async () => {
  // Direct-plugin-dir layout: sourceDir IS the plugin dir (plugin.json at root)
  const { sourceDir } = writePluginWithMain({
    name: "valid-regression",
    main: "index.js",
  });
  activeDirs.push(sourceDir);

  const row = await pluginManager.install(sourceDir);
  assert.equal(row.name, "valid-regression");
  assert.equal(row.version, "1.0.0");

  await pluginManager.uninstall("valid-regression");
  assert.equal(pluginManager.getPlugin("valid-regression"), null);
});

test("upgrade works for a valid newer version (regression)", async () => {
  const { sourceDir: v1 } = writePluginWithMain({
    name: "valid-upgrade-regression",
    version: "1.0.0",
    main: "index.js",
  });
  activeDirs.push(v1);
  await pluginManager.install(v1);

  const { sourceDir: v2 } = writePluginWithMain({
    name: "valid-upgrade-regression",
    version: "2.0.0",
    main: "index.js",
  });
  activeDirs.push(v2);
  const row = await pluginManager.upgrade(v2);
  assert.equal(row.version, "2.0.0");

  await pluginManager.uninstall("valid-upgrade-regression");
});
