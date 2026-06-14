import test from "node:test";
import assert from "node:assert/strict";

import { setPluginEnabled } from "../../src/lib/plugins/index.ts";
import { registerHook, getHooks, resetHooks } from "../../src/lib/plugins/hooks.ts";

// #3473: the plugin index was thinned to a backward-compat re-export shim over
// hooks.ts, but `setPluginEnabled` (legacy public export) was dropped — every
// other legacy export (registerPlugin/listPlugins/unregisterPlugin/resetPlugins)
// was preserved. This restores it so external importers don't crash, mapping
// "disable" onto unregistering the plugin's hooks.

test("setPluginEnabled(false) unregisters a plugin's hooks and reports prior state (#3473)", () => {
  resetHooks();
  registerHook("onRequest", "demo-plugin", () => {}, 100);
  assert.ok(getHooks("onRequest").some((h) => h.pluginName === "demo-plugin"));

  const result = setPluginEnabled("demo-plugin", false);
  assert.strictEqual(result, true, "should report the plugin existed");
  assert.ok(
    !getHooks("onRequest").some((h) => h.pluginName === "demo-plugin"),
    "hooks should be unregistered after disable",
  );
  resetHooks();
});

test("setPluginEnabled(false) returns false for an unknown plugin (#3473)", () => {
  resetHooks();
  assert.strictEqual(setPluginEnabled("does-not-exist", false), false);
  resetHooks();
});

test("setPluginEnabled(true) reports current registration state (#3473)", () => {
  resetHooks();
  assert.strictEqual(setPluginEnabled("ghost", true), false, "no hooks → not active");
  registerHook("onResponse", "live-plugin", () => {}, 100);
  assert.strictEqual(setPluginEnabled("live-plugin", true), true, "registered → active");
  resetHooks();
});
