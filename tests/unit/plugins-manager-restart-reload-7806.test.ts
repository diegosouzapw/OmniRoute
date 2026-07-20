import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

/**
 * #7806: plugins left active in the DB never come back after a server restart.
 *
 * `activate()` used to early-return whenever the DB row said status==='active',
 * without checking in-memory state. `loadedPlugins` (and the hooks map) die with the
 * process while the DB row persists — so after a restart, `activate()` (and therefore
 * `loadAll()`, which calls it for every active row) silently skipped the load for
 * exactly the plugins that needed it. Hooks are fail-open, so a plugin that exists to
 * *block* traffic would fail open forever after a restart, with the UI still reporting
 * it as active.
 *
 * This simulates the post-restart state without an actual process restart: install
 * and activate a plugin (DB row status='active', plugin present in the in-memory
 * `loadedPlugins` map), then clear the in-memory map directly — mirroring what a
 * fresh process boot does to module state while leaving the DB row untouched — and
 * assert that `activate()` / `loadAll()` actually reload it rather than treating the
 * DB's status='active' as proof it is already loaded.
 */

const mod = await import("../../src/lib/plugins/manager.ts");
const db = await import("../../src/lib/db/plugins.ts");
const { getDbInstance } = await import("../../src/lib/db/core.ts");

function makeTmpPlugin(name: string, manifest: Record<string, unknown> = {}) {
  const tmp = mkdtempSync(join(tmpdir(), "mgr-restart-test-"));
  const pluginDir = join(tmp, name);
  mkdirSync(pluginDir, { recursive: true });
  writeFileSync(
    join(pluginDir, "plugin.json"),
    JSON.stringify({ name, version: "1.0.0", ...manifest })
  );
  writeFileSync(
    join(pluginDir, "index.js"),
    `module.exports = { onRequest: async (ctx) => ({ metadata: { banner: "hello" } }) };`
  );
  return pluginDir;
}

/** Simulate a process restart: DB row stays 'active', in-memory state is gone. */
function simulateRestart(name: string) {
  // loadedPlugins is private — this is exactly the module-state loss a real restart
  // causes (a fresh process never had this entry in the first place).
  (mod.pluginManager as unknown as { loadedPlugins: Map<string, unknown> }).loadedPlugins.delete(
    name
  );
}

describe("pluginManager reload after restart (#7806)", () => {
  const testPlugins: string[] = [];
  const tmpDirs: string[] = [];

  beforeEach(() => {
    getDbInstance();
    for (const name of testPlugins) {
      try {
        db.deletePlugin(name);
      } catch {
        // not present — fine
      }
    }
    testPlugins.length = 0;
  });

  it("activate() reloads a plugin whose DB row is 'active' but is absent from loadedPlugins", async () => {
    const name = "restart-reload-activate-test";
    const dir = makeTmpPlugin(name);
    testPlugins.push(name);
    tmpDirs.push(dir);
    try {
      await mod.pluginManager.install(dir);
      await mod.pluginManager.activate(name);
      assert.ok(mod.pluginManager.getLoaded(name), "sanity: plugin is loaded after activate()");

      simulateRestart(name);
      assert.equal(
        mod.pluginManager.getLoaded(name),
        undefined,
        "sanity: in-memory state cleared, mirroring a fresh process"
      );

      const dbRow = db.getPluginByName(name);
      assert.equal(dbRow!.status, "active", "DB row still says active across the 'restart'");

      await mod.pluginManager.activate(name);

      assert.ok(
        mod.pluginManager.getLoaded(name),
        "activate() must reload the plugin instead of treating DB status='active' as a no-op"
      );
    } finally {
      // Deactivate to kill the reloaded child process — otherwise it dangles and
      // keeps the test runner's event loop alive after the suite finishes.
      await mod.pluginManager.deactivate(name).catch(() => {});
      rmSync(dir.split("/").slice(0, -1).join("/"), { recursive: true, force: true });
    }
  });

  it("loadAll() reloads active plugins missing from loadedPlugins (boot path)", async () => {
    const name = "restart-reload-loadall-test";
    const dir = makeTmpPlugin(name);
    testPlugins.push(name);
    tmpDirs.push(dir);
    try {
      await mod.pluginManager.install(dir);
      await mod.pluginManager.activate(name);
      assert.ok(mod.pluginManager.getLoaded(name), "sanity: plugin is loaded after activate()");

      simulateRestart(name);
      assert.equal(mod.pluginManager.getLoaded(name), undefined, "sanity: state cleared");

      await mod.pluginManager.loadAll();

      assert.ok(
        mod.pluginManager.getLoaded(name),
        "loadAll() must reload every DB-active plugin missing from loadedPlugins"
      );
    } finally {
      // Deactivate to kill the reloaded child process — otherwise it dangles and
      // keeps the test runner's event loop alive after the suite finishes.
      await mod.pluginManager.deactivate(name).catch(() => {});
      rmSync(dir.split("/").slice(0, -1).join("/"), { recursive: true, force: true });
    }
  });
});
