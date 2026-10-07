import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const mod = await import("../../src/lib/plugins/scanner.ts");

function makePluginDir(tmpDir: string, name: string, manifest: Record<string, unknown>) {
  const pluginDir = join(tmpDir, name);
  mkdirSync(pluginDir, { recursive: true });
  writeFileSync(join(pluginDir, "plugin.json"), JSON.stringify(manifest, null, 2));
  writeFileSync(join(pluginDir, "index.js"), "module.exports = {};");
  return pluginDir;
}

const validManifest = { name: "scan-test", version: "1.0.0" };

describe("plugin scanner", () => {
  describe("getDefaultPluginDir", () => {
    // Every case pins all three inputs so the result never depends on the
    // ambient environment of the test runner.
    const ENV_KEYS = ["OMNIROUTE_PLUGINS_DIR", "HOME", "USERPROFILE"] as const;

    function withEnv<T>(env: Partial<Record<(typeof ENV_KEYS)[number], string>>, fn: () => T): T {
      const saved = ENV_KEYS.map((key) => [key, process.env[key]] as const);
      try {
        for (const key of ENV_KEYS) {
          const value = env[key];
          if (value === undefined) delete process.env[key];
          else process.env[key] = value;
        }
        return fn();
      } finally {
        for (const [key, value] of saved) {
          if (value === undefined) delete process.env[key];
          else process.env[key] = value;
        }
      }
    }

    it("returns a string path", () => {
      const dir = mod.getDefaultPluginDir();
      assert.equal(typeof dir, "string");
      assert.ok(dir.includes("plugins") || dir.includes("omniroute"));
    });

    it("honors OMNIROUTE_PLUGINS_DIR regardless of HOME", () => {
      const dir = withEnv(
        { OMNIROUTE_PLUGINS_DIR: "/opt/omniroute/plugins", HOME: "/home/somebody-else" },
        () => mod.getDefaultPluginDir()
      );
      assert.equal(dir, "/opt/omniroute/plugins");
    });

    it("honors OMNIROUTE_PLUGINS_DIR when the process has no HOME at all", () => {
      const dir = withEnv({ OMNIROUTE_PLUGINS_DIR: "/mnt/plugins" }, () =>
        mod.getDefaultPluginDir()
      );
      assert.equal(dir, "/mnt/plugins");
    });

    it("keeps the home-derived default when the override is unset", () => {
      const dir = withEnv({ HOME: "/home/tester" }, () => mod.getDefaultPluginDir());
      assert.equal(dir, join("/home/tester", ".omniroute", "plugins"));
    });

    it("treats a blank override as unset", () => {
      const dir = withEnv({ OMNIROUTE_PLUGINS_DIR: "   ", HOME: "/home/tester" }, () =>
        mod.getDefaultPluginDir()
      );
      assert.equal(dir, join("/home/tester", ".omniroute", "plugins"));
    });

    it("falls back to /tmp when neither the override nor a home is set", () => {
      const dir = withEnv({}, () => mod.getDefaultPluginDir());
      assert.equal(dir, join("/tmp", ".omniroute", "plugins"));
    });

    it("makes the scanner read the overridden directory (Docker bind-mount case)", async () => {
      const mounted = mkdtempSync(join(tmpdir(), "plugins-dir-"));
      try {
        makePluginDir(mounted, "bind-mounted", { name: "bind-mounted", version: "1.0.0" });
        // A container image that never exports HOME: before the override existed the
        // scanner silently landed on /tmp/.omniroute/plugins and found nothing.
        const dir = withEnv({ OMNIROUTE_PLUGINS_DIR: mounted }, () => mod.getDefaultPluginDir());
        const result = await mod.scanPluginDir(dir);
        assert.equal(result.plugins.length, 1);
        assert.equal(result.plugins[0].name, "bind-mounted");
      } finally {
        rmSync(mounted, { recursive: true, force: true });
      }
    });
  });

  describe("scanPluginDir", () => {
    it("discovers valid plugins", async () => {
      const tmp = mkdtempSync(join(tmpdir(), "scan-test-"));
      try {
        makePluginDir(tmp, "my-plugin", validManifest);
        const result = await mod.scanPluginDir(tmp);
        assert.equal(result.plugins.length, 1);
        assert.equal(result.plugins[0].name, "scan-test");
        assert.ok(result.plugins[0].manifest);
        assert.ok(result.plugins[0].pluginDir);
      } finally {
        rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
    });

    it("skips directories without plugin.json", async () => {
      const tmp = mkdtempSync(join(tmpdir(), "scan-test-"));
      try {
        mkdirSync(join(tmp, "not-a-plugin"));
        writeFileSync(join(tmp, "not-a-plugin", "index.js"), "");
        const result = await mod.scanPluginDir(tmp);
        assert.equal(result.plugins.length, 0);
      } finally {
        rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
    });

    it("skips plugins with invalid manifest", async () => {
      const tmp = mkdtempSync(join(tmpdir(), "scan-test-"));
      try {
        makePluginDir(tmp, "bad-plugin", { name: "INVALID NAME!", version: "nope" });
        const result = await mod.scanPluginDir(tmp);
        assert.equal(result.plugins.length, 0);
      } finally {
        rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
    });

    it("handles non-existent directory", async () => {
      const result = await mod.scanPluginDir("/nonexistent/path");
      assert.equal(result.plugins.length, 0);
    });

    it("discovers multiple plugins", async () => {
      const tmp = mkdtempSync(join(tmpdir(), "scan-test-"));
      try {
        makePluginDir(tmp, "plugin-a", { name: "plugin-a", version: "1.0.0" });
        makePluginDir(tmp, "plugin-b", { name: "plugin-b", version: "2.0.0" });
        const result = await mod.scanPluginDir(tmp);
        assert.equal(result.plugins.length, 2);
      } finally {
        rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
    });
  });
});
