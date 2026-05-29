import test from "node:test";
import assert from "node:assert/strict";

// Loader uses child_process.fork() — we test the module exports and types,
// not actual fork behavior (that requires integration tests with real plugins).

import type { LoadedPlugin } from "../../src/lib/plugins/loader.ts";
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
    onResponse: async (_ctx: PluginContext, response: any) => response,
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
