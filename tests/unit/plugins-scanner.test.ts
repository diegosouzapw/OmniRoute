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
    it("returns a string path", () => {
      const dir = mod.getDefaultPluginDir();
      assert.equal(typeof dir, "string");
      assert.ok(dir.includes("plugins") || dir.includes("omniroute"));
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
        rmSync(tmp, { recursive: true, force: true });
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
        rmSync(tmp, { recursive: true, force: true });
      }
    });

    it("skips plugins with invalid manifest", async () => {
      const tmp = mkdtempSync(join(tmpdir(), "scan-test-"));
      try {
        makePluginDir(tmp, "bad-plugin", { name: "INVALID NAME!", version: "nope" });
        const result = await mod.scanPluginDir(tmp);
        assert.equal(result.plugins.length, 0);
      } finally {
        rmSync(tmp, { recursive: true, force: true });
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
        rmSync(tmp, { recursive: true, force: true });
      }
    });
  });
});
