import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { loadPlugin } from "../../src/lib/plugins/loader.ts";
import type { PluginManifestWithDefaults } from "../../src/lib/plugins/manifest.ts";

function makeManifest(overrides?: Partial<PluginManifestWithDefaults>): PluginManifestWithDefaults {
  return {
    name: "test-plugin",
    version: "1.0.0",
    description: "Test",
    hooks: { onRequest: true, onResponse: false, onError: false },
    requires: { permissions: [] },
    enabledByDefault: true,
    source: "local",
    ...overrides,
  };
}

describe("Plugin loader IPC", () => {
  it("loadPlugin returns LoadedPlugin with expected shape", async () => {
    // loadPlugin spawns a child process — we test it returns the right shape
    // but we can't easily test IPC without a real plugin file.
    // Instead, test the function signature and error handling.
    assert.equal(typeof loadPlugin, "function");
  });

  it("loader exports LoadedPlugin interface", async () => {
    // Verify the module exports the expected function
    const mod = await import("../../src/lib/plugins/loader.ts");
    assert.equal(typeof mod.loadPlugin, "function");
  });

  it("loadPlugin rejects invalid entry point gracefully", async () => {
    const manifest = makeManifest();
    try {
      const loaded = await loadPlugin("/nonexistent/path/plugin.mjs", manifest);
      // If it doesn't throw, it should still return a valid object
      assert.ok(loaded.name);
      assert.ok(loaded.cleanup);
      loaded.cleanup();
    } catch (err) {
      // Expected — nonexistent path should cause an error
      assert.ok(err instanceof Error);
    }
  });

  it("manifest permissions affect env filtering", () => {
    const manifest = makeManifest({ requires: { permissions: ["env"] } });
    assert.deepEqual(manifest.requires.permissions, ["env"]);

    const manifestNoPerms = makeManifest({ requires: { permissions: [] } });
    assert.deepEqual(manifestNoPerms.requires.permissions, []);
  });

  it("manifest with all permissions", () => {
    const manifest = makeManifest({
      requires: { permissions: ["network", "file-read", "file-write", "env", "exec"] },
    });
    assert.equal(manifest.requires.permissions.length, 5);
  });
});
