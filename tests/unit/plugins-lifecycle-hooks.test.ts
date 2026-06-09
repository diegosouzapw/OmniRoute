import test from "node:test";
import assert from "node:assert/strict";

import {
  registerHook,
  unregisterHooks,
  emitHook,
  getHooks,
  getActiveEvents,
  resetHooks,
} from "../../src/lib/plugins/hooks.ts";

// ── Setup ──

test.afterEach(() => {
  resetHooks();
});

// ── Lifecycle hook registration via emitHook ──

test("emitHook fires onInstall handler", async () => {
  let fired = false;
  registerHook("onInstall", "test-plugin", () => { fired = true; });
  await emitHook("onInstall", { name: "test-plugin", version: "1.0.0" });
  assert.equal(fired, true);
});

test("emitHook fires onActivate handler", async () => {
  let payload: unknown = null;
  registerHook("onActivate", "test-plugin", (p) => { payload = p; });
  await emitHook("onActivate", { name: "test-plugin", version: "1.0.0" });
  assert.deepEqual(payload, { name: "test-plugin", version: "1.0.0" });
});

test("emitHook fires onDeactivate handler", async () => {
  let fired = false;
  registerHook("onDeactivate", "test-plugin", () => { fired = true; });
  await emitHook("onDeactivate", { name: "test-plugin", version: "1.0.0" });
  assert.equal(fired, true);
});

test("emitHook fires onUninstall handler", async () => {
  let fired = false;
  registerHook("onUninstall", "test-plugin", () => { fired = true; });
  await emitHook("onUninstall", { name: "test-plugin", version: "1.0.0" });
  assert.equal(fired, true);
});

// ── Lifecycle hooks are fire-and-forget: errors don't propagate ──

test("emitHook swallows onDeactivate handler error", async () => {
  registerHook("onDeactivate", "bad-plugin", () => { throw new Error("deactivate oops"); });
  // emitHook should NOT throw — it logs but continues
  await emitHook("onDeactivate", { name: "bad-plugin", version: "1.0.0" });
  // If we reach here, the error was swallowed as expected
});

test("emitHook swallows onUninstall handler error", async () => {
  registerHook("onUninstall", "bad-plugin", () => { throw new Error("uninstall oops"); });
  await emitHook("onUninstall", { name: "bad-plugin", version: "1.0.0" });
});

// ── Lifecycle hooks can be unregistered ──

test("unregisterHooks removes lifecycle hooks", async () => {
  let fired = false;
  registerHook("onDeactivate", "test-plugin", () => { fired = true; });
  unregisterHooks("test-plugin");
  await emitHook("onDeactivate", { name: "test-plugin", version: "1.0.0" });
  assert.equal(fired, false, "handler should not fire after unregister");
});

// ── Multiple lifecycle hooks fire in order ──

test("emitHook fires multiple onActivate handlers", async () => {
  const order: string[] = [];
  registerHook("onActivate", "plugin-a", () => { order.push("a"); });
  registerHook("onActivate", "plugin-b", () => { order.push("b"); });
  await emitHook("onActivate", { name: "test", version: "1.0.0" });
  assert.deepEqual(order, ["a", "b"]);
});

// ── getHooks returns lifecycle hook registrations ──

test("getHooks returns onDeactivate registrations", () => {
  registerHook("onDeactivate", "test-plugin", () => {});
  const hooks = getHooks("onDeactivate");
  assert.equal(hooks.length, 1);
  assert.equal(hooks[0].pluginName, "test-plugin");
});

test("getActiveEvents includes lifecycle events when registered", () => {
  registerHook("onActivate", "test-plugin", () => {});
  const events = getActiveEvents();
  assert.ok(events.includes("onActivate"), `onActivate should be in active events: ${events}`);
});

// ── Async lifecycle handlers work ──

test("emitHook awaits async onDeactivate handler", async () => {
  let resolved = false;
  const { promise, resolve } = Promise.withResolvers<void>();
  registerHook("onDeactivate", "async-plugin", async () => {
    resolve();
    resolved = true;
  });
  await emitHook("onDeactivate", { name: "async-plugin", version: "1.0.0" });
  assert.equal(resolved, true, "async handler should have completed before emitHook returns");
  await promise; // consume the promise to avoid unhandled rejection
});