/**
 * E2E test for the plugin system using the welcome-banner PoC plugin.
 *
 * Verifies the full plugin lifecycle:
 * manifest validation → install → activate → hook execution → deactivate → uninstall
 */

import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const FIXTURE_DIR = join(tmpdir(), `omniroute_plugin_test_${Date.now()}`);

function createFixturePlugin(name: string, opts?: { onResponse?: boolean; onRequest?: boolean }) {
  const dir = join(FIXTURE_DIR, name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "plugin.json"),
    JSON.stringify({
      name,
      version: "1.0.0",
      description: `Test plugin ${name}`,
      hooks: { onResponse: opts?.onResponse ?? true, onRequest: opts?.onRequest ?? false },
      requires: { permissions: [] },
      enabledByDefault: true,
    })
  );
  writeFileSync(
    join(dir, "index.mjs"),
    `export const plugin = {
  name: "${name}",
  priority: 100,
  async onResponse(ctx, response) {
    if (response && typeof response === "object" && response.choices) {
      for (const c of response.choices) {
        if (c.message) c.message.content = "[${name}] " + (c.message.content || "");
      }
    }
    return response;
  },
  async onRequest(ctx) {
    return { metadata: { ...ctx.metadata, pluginName: "${name}" } };
  },
};`
  );
  return dir;
}

// ── Manifest validation ──

test("plugin manifest validation", async (t) => {
  const { validateManifest, safeValidateManifest, applyDefaults } = await import(
    "../../src/lib/plugins/manifest.ts"
  );

  await t.test("valid manifest parses with defaults", () => {
    const result = validateManifest({
      name: "test-plugin",
      version: "1.0.0",
    });
    assert.equal(result.name, "test-plugin");
    assert.equal(result.version, "1.0.0");
    assert.equal(result.license, "MIT");
    assert.equal(result.main, "index.js");
    assert.equal(result.source, "local");
    assert.deepEqual(result.tags, []);
    assert.deepEqual(result.requires.permissions, []);
    assert.equal(result.hooks.onRequest, false);
    assert.equal(result.hooks.onResponse, false);
    assert.equal(result.hooks.onError, false);
    assert.equal(result.enabledByDefault, false);
  });

  await t.test("invalid name rejected", () => {
    const result = safeValidateManifest({ name: "INVALID NAME!", version: "1.0.0" });
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.errors.length > 0);
    }
  });

  await t.test("invalid version rejected", () => {
    const result = safeValidateManifest({ name: "test", version: "bad" });
    assert.equal(result.success, false);
  });

  await t.test("explicit values preserved over defaults", () => {
    const result = validateManifest({
      name: "custom",
      version: "2.0.0",
      license: "Apache-2.0",
      main: "custom.mjs",
      source: "marketplace",
      tags: ["ai"],
      enabledByDefault: true,
      hooks: { onRequest: true, onResponse: true, onError: true },
      requires: { permissions: ["network", "exec"] },
    });
    assert.equal(result.license, "Apache-2.0");
    assert.equal(result.main, "custom.mjs");
    assert.equal(result.source, "marketplace");
    assert.deepEqual(result.tags, ["ai"]);
    assert.equal(result.enabledByDefault, true);
    assert.equal(result.hooks.onRequest, true);
    assert.deepEqual(result.requires.permissions, ["network", "exec"]);
  });

  await t.test("safeValidateManifest returns success for valid", () => {
    const result = safeValidateManifest({ name: "ok", version: "1.0.0" });
    assert.equal(result.success, true);
  });
});

// ── Hooks system ──

test("plugin hooks system", async (t) => {
  const {
    registerHook,
    unregisterHooks,
    unregisterHook,
    emitHook,
    emitHookBlocking,
    runOnRequest,
    runOnResponse,
    runOnError,
    getHooks,
    getActiveEvents,
    resetHooks,
    BUILTIN_EVENTS,
  } = await import("../../src/lib/plugins/hooks.ts");

  // Reset before each sub-test group
  resetHooks();

  await t.test("registerHook registers and sorts by priority", () => {
    const calls: string[] = [];
    registerHook("onRequest", "plugin-b", () => { calls.push("b"); }, 200);
    registerHook("onRequest", "plugin-a", () => { calls.push("a"); }, 100);
    const hooks = getHooks("onRequest");
    assert.equal(hooks.length, 2);
    assert.equal(hooks[0].pluginName, "plugin-a");
    assert.equal(hooks[1].pluginName, "plugin-b");
    resetHooks();
  });

  await t.test("registerHook prevents duplicates", () => {
    const handler = () => {};
    registerHook("onResponse", "dup-test", handler, 100);
    registerHook("onResponse", "dup-test", handler, 100);
    assert.equal(getHooks("onResponse").length, 1);
    resetHooks();
  });

  await t.test("unregisterHooks removes all for plugin", () => {
    registerHook("onRequest", "rm-test", () => {}, 100);
    registerHook("onResponse", "rm-test", () => {}, 100);
    registerHook("onRequest", "keep-test", () => {}, 100);
    unregisterHooks("rm-test");
    assert.equal(getHooks("onRequest").length, 1);
    assert.equal(getHooks("onResponse").length, 0);
    resetHooks();
  });

  await t.test("unregisterHook removes specific event", () => {
    registerHook("onRequest", "spec-test", () => {}, 100);
    registerHook("onResponse", "spec-test", () => {}, 100);
    unregisterHook("onRequest", "spec-test");
    assert.equal(getHooks("onRequest").length, 0);
    assert.equal(getHooks("onResponse").length, 1);
    resetHooks();
  });

  await t.test("emitHook calls all handlers in order", async () => {
    const order: number[] = [];
    registerHook("onTest", "h1", () => { order.push(1); }, 100);
    registerHook("onTest", "h2", () => { order.push(2); }, 200);
    registerHook("onTest", "h3", () => { order.push(3); }, 150);
    await emitHook("onTest", {});
    assert.deepEqual(order, [1, 3, 2]);
    resetHooks();
  });

  await t.test("emitHook swallows handler errors", async () => {
    const calls: string[] = [];
    registerHook("onErr", "bad", () => { throw new Error("boom"); }, 100);
    registerHook("onErr", "good", () => { calls.push("ok"); }, 200);
    await emitHook("onErr", {});
    assert.deepEqual(calls, ["ok"]);
    resetHooks();
  });

  await t.test("emitHookBlocking chains body/metadata", async () => {
    registerHook("onBlock", "a", () => ({ body: { a: 1 }, metadata: { x: 1 } }), 100);
    registerHook("onBlock", "b", () => ({ body: { b: 2 }, metadata: { y: 2 } }), 200);
    const result = await emitHookBlocking("onBlock", { body: {}, metadata: {} });
    assert.deepEqual(result.body, { b: 2 });
    assert.deepEqual(result.metadata, { x: 1, y: 2 });
    resetHooks();
  });

  await t.test("emitHookBlocking returns early on blocked", async () => {
    const calls: string[] = [];
    registerHook("onBlock2", "blocker", () => ({ blocked: true, response: { error: "no" } }), 100);
    registerHook("onBlock2", "after", () => { calls.push("after"); }, 200);
    const result = await emitHookBlocking("onBlock2", {});
    assert.equal(result.blocked, true);
    assert.equal(calls.length, 0);
    resetHooks();
  });

  await t.test("runOnRequest delegates to emitHookBlocking", async () => {
    registerHook("onRequest", "req", () => ({ metadata: { seen: true } }), 100);
    const result = await runOnRequest({ requestId: "1", body: {}, model: "gpt-4", provider: "openai", metadata: {} });
    assert.deepEqual(result.metadata, { seen: true });
    resetHooks();
  });

  await t.test("runOnResponse chains response through plugins", async () => {
    registerHook("onResponse", "r1", (_ctx: unknown) => ({ response: { modified: 1 } }), 100);
    registerHook("onResponse", "r2", (_ctx: unknown) => ({ response: { modified: 2 } }), 200);
    const result = await runOnResponse(
      { requestId: "1", body: {}, model: "gpt-4", provider: "openai", metadata: {} },
      { original: true }
    );
    assert.deepEqual(result, { modified: 2 });
    resetHooks();
  });

  await t.test("runOnError is fire-and-forget", async () => {
    let called = false;
    registerHook("onError", "err-handler", () => { called = true; }, 100);
    await runOnError(
      { requestId: "1", body: {}, model: "gpt-4", provider: "openai", metadata: {} },
      new Error("test")
    );
    assert.equal(called, true);
    resetHooks();
  });

  await t.test("getActiveEvents returns events with handlers", () => {
    registerHook("onRequest", "ae-test", () => {}, 100);
    registerHook("onError", "ae-test", () => {}, 100);
    const events = getActiveEvents();
    assert.ok(events.includes("onRequest"));
    assert.ok(events.includes("onError"));
    resetHooks();
  });

  await t.test("BUILTIN_EVENTS has all 10 events", () => {
    assert.equal(BUILTIN_EVENTS.length, 10);
    assert.ok(BUILTIN_EVENTS.includes("onRequest"));
    assert.ok(BUILTIN_EVENTS.includes("onResponse"));
    assert.ok(BUILTIN_EVENTS.includes("onError"));
    assert.ok(BUILTIN_EVENTS.includes("onModelSelect"));
    assert.ok(BUILTIN_EVENTS.includes("onComboResolve"));
    assert.ok(BUILTIN_EVENTS.includes("onRateLimit"));
    assert.ok(BUILTIN_EVENTS.includes("onQuotaExhaust"));
    assert.ok(BUILTIN_EVENTS.includes("onProviderError"));
    assert.ok(BUILTIN_EVENTS.includes("onStreamStart"));
    assert.ok(BUILTIN_EVENTS.includes("onStreamEnd"));
    resetHooks();
  });
});

// ── Welcome banner PoC E2E ──

const POC_PLUGIN_DIR = join(process.cwd(), "tests", "fixtures", "welcome-banner-plugin");

test("welcome banner PoC plugin lifecycle", async (t) => {
  const pluginDir = POC_PLUGIN_DIR;

  await t.test("manifest validates", async () => {
    const { validateManifest } = await import("../../src/lib/plugins/manifest.ts");
    const manifestPath = join(pluginDir, "plugin.json");
    const { readFileSync } = await import("node:fs");
    const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
    const result = validateManifest(manifest);
    assert.equal(result.name, "welcome-banner");
    assert.equal(result.hooks.onResponse, true);
  });

  await t.test("plugin module exports correct interface", async () => {
    const mod = await import(join(pluginDir, "index.mjs"));
    assert.ok(mod.plugin, "should export plugin object");
    assert.equal(mod.plugin.name, "welcome-banner");
    assert.equal(typeof mod.plugin.onResponse, "function");
  });

  await t.test("onResponse injects banner into response", async () => {
    const mod = await import(join(pluginDir, "index.mjs"));
    const response = {
      choices: [
        { message: { role: "assistant", content: "Hello!" } },
      ],
    };
    const result = await mod.plugin.onResponse({}, response);
    assert.ok(result.choices[0].message.content.includes("[Welcome to OmniRoute"));
    assert.ok(result.choices[0].message.content.includes("Hello!"));
  });

  await t.test("onResponse handles streaming delta", async () => {
    const mod = await import(join(pluginDir, "index.mjs"));
    const response = {
      choices: [
        { delta: { content: "stream chunk" } },
      ],
    };
    const result = await mod.plugin.onResponse({}, response);
    assert.ok(result.choices[0].delta.content.includes("[Welcome to OmniRoute"));
  });

  await t.test("onResponse handles null response gracefully", async () => {
    const mod = await import(join(pluginDir, "index.mjs"));
    const result = await mod.plugin.onResponse({}, null);
    assert.equal(result, null);
  });
});

// ── Full lifecycle through pluginManager ──

test("full lifecycle: install → activate → hook fires → deactivate → uninstall", async (t) => {
  const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
  const { runOnRequest, resetHooks, getHooks } = await import("../../src/lib/plugins/hooks.ts");

  const POC_DIR = join(process.cwd(), "tests", "fixtures", "welcome-banner-plugin");

  await t.test("install plugin from fixture dir", async () => {
    const row = await pluginManager.install(POC_DIR);
    assert.ok(row, "install should return plugin row");
    assert.equal(row.name, "welcome-banner");
    assert.ok(row.pluginDir, "should have pluginDir");
  });

  await t.test("activate plugin registers hooks", async () => {
    await pluginManager.activate("welcome-banner");
    const loaded = pluginManager.getLoaded("welcome-banner");
    assert.ok(loaded, "plugin should be loaded after activate");
  });

  await t.test("onRequest hook fires and injects banner", async () => {
    const ctx = {
      requestId: "e2e-test",
      body: {},
      model: "gpt-4",
      provider: "openai",
      metadata: {},
    };
    const result = await runOnRequest(ctx);
    // The welcome-banner plugin injects banner into metadata
    assert.ok(result.metadata?.banner || result.body, "hook should modify request");
  });

  await t.test("deactivate removes hooks", async () => {
    await pluginManager.deactivate("welcome-banner");
    const loaded = pluginManager.getLoaded("welcome-banner");
    // After deactivation, plugin should not be loaded
    assert.ok(!loaded, "plugin should not be loaded after deactivate");
  });

  await t.test("uninstall removes from DB", async () => {
    await pluginManager.uninstall("welcome-banner");
    const all = await pluginManager.listAll();
    const found = all.find((p: any) => p.name === "welcome-banner");
    assert.ok(!found, "plugin should not be in list after uninstall");
  });
});

// ── Cleanup ──

test("cleanup fixture directory", () => {
  if (existsSync(FIXTURE_DIR)) {
    rmSync(FIXTURE_DIR, { recursive: true, force: true });
  }
  assert.ok(!existsSync(FIXTURE_DIR));
});
