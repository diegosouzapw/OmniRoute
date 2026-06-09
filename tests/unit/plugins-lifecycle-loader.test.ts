import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import { loadPlugin } from "../../src/lib/plugins/loader.ts";
import type { PluginManifestWithDefaults } from "../../src/lib/plugins/manifest.ts";

function makeManifest(overrides?: Partial<PluginManifestWithDefaults>): PluginManifestWithDefaults {
  return {
    name: "lifecycle-test-plugin",
    version: "1.0.0",
    description: "Test",
    hooks: {
      onRequest: false,
      onResponse: false,
      onError: false,
      onInstall: true,
      onActivate: true,
      onDeactivate: true,
      onUninstall: true,
    },
    requires: { permissions: [] },
    enabledByDefault: true,
    source: "local",
    ...overrides,
  };
}

/**
 * Write a minimal plugin that exports lifecycle hooks.
 * The child process will load this via dynamic import.
 */
function writePluginFile(dir: string): string {
  const entryPath = path.join(dir, "index.mjs");
  fs.writeFileSync(entryPath, `
export default {
  onRequest: (ctx) => ({ body: ctx.body }),
  onInstall: (payload) => { /* install hook */ },
  onActivate: (payload) => { /* activate hook */ },
  onDeactivate: (payload) => { /* deactivate hook */ },
  onUninstall: (payload) => { /* uninstall hook */ },
};
`);
  return entryPath;
}

test("loadPlugin creates proxy for lifecycle hooks when declared in manifest", async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lifecycle-test-"));
  try {
    const entryPath = writePluginFile(tmpDir);
    const manifest = makeManifest();
    const loaded = await loadPlugin(entryPath, manifest);

    // Verify the plugin object has lifecycle hook functions
    assert.equal(typeof loaded.plugin.onInstall, "function", "onInstall should be a function");
    assert.equal(typeof loaded.plugin.onActivate, "function", "onActivate should be a function");
    assert.equal(typeof loaded.plugin.onDeactivate, "function", "onDeactivate should be a function");
    assert.equal(typeof loaded.plugin.onUninstall, "function", "onUninstall should be a function");

    // Verify the plugin name matches
    assert.equal(loaded.plugin.name, "lifecycle-test-plugin");

    // Cleanup child process
    loaded.cleanup();
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("loadPlugin skips lifecycle proxy when manifest flag is false", async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lifecycle-test-"));
  try {
    const entryPath = writePluginFile(tmpDir);
    const manifest = makeManifest({
      hooks: {
        onRequest: true,
        onResponse: false,
        onError: false,
        onInstall: false,
        onActivate: false,
        onDeactivate: false,
        onUninstall: false,
      },
    });
    const loaded = await loadPlugin(entryPath, manifest);

    // Lifecycle hooks should NOT be present when manifest flags are false
    assert.equal(loaded.plugin.onInstall, undefined, "onInstall should be undefined when flag is false");
    assert.equal(loaded.plugin.onActivate, undefined, "onActivate should be undefined when flag is false");
    assert.equal(loaded.plugin.onDeactivate, undefined, "onDeactivate should be undefined when flag is false");
    assert.equal(loaded.plugin.onUninstall, undefined, "onUninstall should be undefined when flag is false");

    // onRequest should still work
    assert.equal(typeof loaded.plugin.onRequest, "function", "onRequest should be a function");

    loaded.cleanup();
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("loadPlugin lifecycle hooks can be called without throwing", async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lifecycle-test-"));
  try {
    const entryPath = writePluginFile(tmpDir);
    const manifest = makeManifest();
    const loaded = await loadPlugin(entryPath, manifest);

    // Call each lifecycle hook — they should resolve without error
    // (the child process just runs the handler and returns)
    await loaded.plugin.onInstall!({ name: "test", version: "1.0.0" });
    await loaded.plugin.onActivate!({ name: "test", version: "1.0.0" });
    await loaded.plugin.onDeactivate!({ name: "test", version: "1.0.0" });
    await loaded.plugin.onUninstall!({ name: "test", version: "1.0.0" });

    loaded.cleanup();
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});