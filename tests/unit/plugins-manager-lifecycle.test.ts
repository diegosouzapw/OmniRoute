import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const mod = await import("../../src/lib/plugins/manager.ts");
const db = await import("../../src/lib/db/plugins.ts");
const { getDbInstance } = await import("../../src/lib/db/core.ts");

function makeTmpPlugin(name: string, manifest: Record<string, unknown> = {}) {
  const tmp = mkdtempSync(join(tmpdir(), "mgr-test-"));
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

function cleanup(name: string) {
  try { db.deletePlugin(name); } catch {}
}

describe("pluginManager lifecycle", () => {
  const testPlugins: string[] = [];

  beforeEach(() => {
    // Ensure migrations ran (creates the `plugins` table via migration 076)
    // before any lifecycle call touches it — uses the real migration, not an
    // inline CREATE TABLE, so a missing/renumbered migration fails loudly.
    getDbInstance();
    // Clean up test plugins
    for (const name of testPlugins) {
      try { db.deletePlugin(name); } catch {}
    }
    testPlugins.length = 0;
  });

  describe("install", () => {
    it("installs a valid plugin from directory", async () => {
      const dir = makeTmpPlugin("install-test");
      testPlugins.push("install-test");
      try {
        const result = await mod.pluginManager.install(dir);
        assert.ok(result);
        assert.equal(result.name, "install-test");
        const dbRow = db.getPluginByName("install-test");
        assert.ok(dbRow);
        assert.equal(dbRow!.status, "installed");
      } finally {
        rmSync(dir.split("/").slice(0, -1).join("/"), { recursive: true, force: true });
      }
    });

    it("rejects invalid directory", async () => {
      await assert.rejects(() => mod.pluginManager.install("/nonexistent/path"));
    });
  });

  describe("activate / deactivate", () => {
    it("activates an installed plugin", async () => {
      const dir = makeTmpPlugin("activate-test");
      testPlugins.push("activate-test");
      try {
        await mod.pluginManager.install(dir);
        await mod.pluginManager.activate("activate-test");
        const dbRow = db.getPluginByName("activate-test");
        assert.equal(dbRow!.status, "active");
      } finally {
        rmSync(dir.split("/").slice(0, -1).join("/"), { recursive: true, force: true });
      }
    });

    it("deactivates an active plugin", async () => {
      const dir = makeTmpPlugin("deactivate-test");
      testPlugins.push("deactivate-test");
      try {
        await mod.pluginManager.install(dir);
        await mod.pluginManager.activate("deactivate-test");
        await mod.pluginManager.deactivate("deactivate-test");
        const dbRow = db.getPluginByName("deactivate-test");
        assert.equal(dbRow!.status, "inactive");
      } finally {
        rmSync(dir.split("/").slice(0, -1).join("/"), { recursive: true, force: true });
      }
    });

    it("throws for unknown plugin", async () => {
      await assert.rejects(() => mod.pluginManager.activate("nonexistent"));
    });
  });

  describe("uninstall", () => {
    it("removes plugin completely", async () => {
      const dir = makeTmpPlugin("uninstall-test");
      testPlugins.push("uninstall-test");
      try {
        await mod.pluginManager.install(dir);
        await mod.pluginManager.uninstall("uninstall-test");
        const dbRow = db.getPluginByName("uninstall-test");
        assert.equal(dbRow, null);
      } finally {
        rmSync(dir.split("/").slice(0, -1).join("/"), { recursive: true, force: true });
      }
    });
  });

  describe("getLoaded / listAll / getPlugin", () => {
    it("getLoaded returns undefined for unloaded plugin", () => {
      assert.equal(mod.pluginManager.getLoaded("not-loaded"), undefined);
    });

    it("listAll returns array", async () => {
      const list = await mod.pluginManager.listAll();
      assert.ok(Array.isArray(list));
    });

    it("getPlugin returns null for unknown", async () => {
      const result = await mod.pluginManager.getPlugin("nonexistent");
      assert.equal(result, null);
    });
  });
});
