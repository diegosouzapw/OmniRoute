import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { loadPlugin, type LoadedPlugin } from "../../src/lib/plugins/loader.ts";
import type { Plugin, PluginContext, PluginResult } from "../../src/lib/plugins/index.ts";

// ── Type checks ──

test("LoadedPlugin interface has required fields", () => {
  // Verify the type structure exists by checking the module exports
  const mock: LoadedPlugin = {
    name: "test",
    manifest: {
      name: "test",
      version: "1.0.0",
      license: "MIT",
      main: "index.js",
      source: "local",
      tags: [],
      requires: { permissions: [] },
      hooks: { onRequest: false, onResponse: false, onError: false },
      skills: [],
      enabledByDefault: false,
      configSchema: {},
    },
    plugin: { name: "test" },
    cleanup: () => {},
  };
  assert.equal(mock.name, "test");
  assert.equal(typeof mock.cleanup, "function");
});

test("Plugin interface supports lifecycle hooks", () => {
  const plugin: Plugin = {
    name: "test",
    onRequest: async (_ctx: PluginContext): Promise<PluginResult | void> => {
      return { blocked: false };
    },
    onResponse: async (_ctx: PluginContext, response: unknown) => response,
    onError: async (_ctx: PluginContext, _error: Error) => null,
  };
  assert.equal(typeof plugin.onRequest, "function");
  assert.equal(typeof plugin.onResponse, "function");
  assert.equal(typeof plugin.onError, "function");
});

test("PluginContext has required fields", () => {
  const ctx: PluginContext = {
    requestId: "test-123",
    body: { model: "gpt-4" },
    model: "gpt-4",
    provider: "openai",
    metadata: {},
  };
  assert.equal(ctx.requestId, "test-123");
  assert.equal(ctx.model, "gpt-4");
});

test("PluginResult supports blocking", () => {
  const blocked: PluginResult = {
    blocked: true,
    response: { error: "denied" },
  };
  assert.ok(blocked.blocked);
  assert.deepEqual(blocked.response, { error: "denied" });
});

test("PluginResult supports body modification", () => {
  const modified: PluginResult = {
    body: { model: "gpt-4-turbo" },
    metadata: { plugin: "model-switcher" },
  };
  assert.equal(modified.body.model, "gpt-4-turbo");
  assert.equal(modified.metadata?.plugin, "model-switcher");
});

test(
  "loadPlugin runs hooks in an isolated child process over IPC",
  { timeout: 5_000 },
  async (t) => {
    const pluginDir = await mkdtemp(join(tmpdir(), "omniroute-plugin-loader-"));
    const entryPoint = join(pluginDir, "index.mjs");
    let loaded: LoadedPlugin | undefined;

    t.after(async () => {
      loaded?.cleanup();
      await rm(pluginDir, { recursive: true, force: true });
    });

    await writeFile(
      entryPoint,
      `
export async function onRequest(ctx) {
  return {
    body: { ...ctx.body, touchedByPlugin: true },
    metadata: { pluginHook: "onRequest" },
  };
}
`,
      "utf-8"
    );

    loaded = await loadPlugin(entryPoint, {
      name: "ipc-test",
      version: "1.0.0",
      license: "MIT",
      main: "index.mjs",
      source: "local",
      tags: [],
      requires: { permissions: [] },
      hooks: { onRequest: true, onResponse: false, onError: false },
      skills: [],
      enabledByDefault: false,
      configSchema: {},
    });

    const result = await loaded.plugin.onRequest?.({
      requestId: "test-request",
      body: { model: "gpt-4" },
      model: "gpt-4",
      metadata: {},
    });

    assert.deepEqual(result, {
      body: { model: "gpt-4", touchedByPlugin: true },
      metadata: { pluginHook: "onRequest" },
    });
  }
);

// Regression (PR #3562, Hard Rule #18): the loader must build the plugin's
// lifecycle-hook methods (onInstall/onActivate/onDeactivate/onUninstall) when —
// and only when — the manifest declares them. manager.ts registers exactly these
// methods with emitHook; before #3562 the loader only wired onRequest/onResponse/
// onError, so the lifecycle hooks were declared-but-dead (manager registered
// `undefined` and the fire-and-forget emitHook never reached the plugin).
test(
  "loadPlugin wires declared lifecycle hooks and skips undeclared ones",
  { timeout: 5_000 },
  async (t) => {
    const pluginDir = await mkdtemp(join(tmpdir(), "omniroute-plugin-lifecycle-"));
    const entryPoint = join(pluginDir, "index.mjs");
    let loaded: LoadedPlugin | undefined;

    t.after(async () => {
      loaded?.cleanup();
      await rm(pluginDir, { recursive: true, force: true });
    });

    await writeFile(
      entryPoint,
      `
export async function onInstall(_payload) {}
export async function onActivate(_payload) {}
export async function onDeactivate(_payload) {}
export async function onUninstall(_payload) {}
`,
      "utf-8"
    );

    loaded = await loadPlugin(entryPoint, {
      name: "lifecycle-test",
      version: "1.0.0",
      license: "MIT",
      main: "index.mjs",
      source: "local",
      tags: [],
      requires: { permissions: [] },
      hooks: {
        onRequest: false,
        onResponse: false,
        onError: false,
        onInstall: true,
        onActivate: true,
        onDeactivate: false, // declared in code but disabled in manifest — must NOT be wired
        onUninstall: true,
      },
      skills: [],
      enabledByDefault: false,
      configSchema: {},
    });

    // Hooks enabled in the manifest must be wired as callable methods — this is
    // exactly what manager.ts hands to registerHook(hookName, name, handler).
    assert.equal(typeof loaded.plugin.onInstall, "function", "onInstall must be wired");
    assert.equal(typeof loaded.plugin.onActivate, "function", "onActivate must be wired");
    assert.equal(typeof loaded.plugin.onUninstall, "function", "onUninstall must be wired");

    // A hook disabled in the manifest must NOT be wired, even if the plugin
    // exports it (gated by the manifest flag).
    assert.equal(loaded.plugin.onDeactivate, undefined, "disabled onDeactivate must not be wired");

    // The wired method must bridge to the worker without throwing (fire-and-forget).
    await loaded.plugin.onActivate?.({ name: "lifecycle-test", version: "1.0.0" });
  }
);
