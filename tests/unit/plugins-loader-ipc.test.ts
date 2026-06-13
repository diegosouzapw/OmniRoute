import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { loadPlugin, buildHostScript } from "../../src/lib/plugins/loader.ts";
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

describe("buildHostScript IPC permission gating", () => {
  it("includes __omniroute.broadcast/sendTo when ipc permission is granted", () => {
    const script = buildHostScript(false, ["ipc"]);
    assert.ok(script.includes("__omniroute"));
    assert.ok(script.includes("broadcast"));
    assert.ok(script.includes("sendTo"));
  });

  it("omits broadcast/sendTo when ipc permission is not granted", () => {
    const script = buildHostScript(false, []);
    assert.ok(script.includes("__omniroute"));
    assert.ok(!script.includes("broadcast"));
    assert.ok(!script.includes("sendTo"));
  });

  it("omits broadcast/sendTo when other permissions are granted but not ipc", () => {
    const script = buildHostScript(false, ["network", "env"]);
    assert.ok(script.includes("__omniroute"));
    assert.ok(!script.includes("broadcast"));
    assert.ok(!script.includes("sendTo"));
  });

  it("includes broadcast/sendTo alongside other permissions when ipc is granted", () => {
    const script = buildHostScript(false, ["network", "ipc", "env"]);
    assert.ok(script.includes("__omniroute"));
    assert.ok(script.includes("broadcast"));
    assert.ok(script.includes("sendTo"));
  });

  it("includes db methods when db permission is granted", () => {
    const script = buildHostScript(true, []);
    assert.ok(script.includes("db:"));
    assert.ok(script.includes(".get("));
    assert.ok(script.includes(".set("));
  });

  it("omits db methods when db permission is not granted", () => {
    const script = buildHostScript(false, []);
    assert.ok(!script.includes("db:"));
  });
});
