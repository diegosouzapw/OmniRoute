import test from "node:test";
import assert from "node:assert/strict";

import {
  registerHook,
  unregisterHooks,
  emitHook,
  emitHookBlocking,
  runOnRequest,
  runOnResponse,
  runOnError,
  getHooks,
  getActiveEvents,
  resetHooks,
  type HookRegistration,
} from "../../src/lib/plugins/hooks.ts";

// ── Setup ──

test.afterEach(() => {
  resetHooks();
});

// ── Registration ──

test("registerHook adds a handler", () => {
  registerHook("onRequest", "test-plugin", () => {});
  const hooks = getHooks("onRequest");
  assert.equal(hooks.length, 1);
  assert.equal(hooks[0].pluginName, "test-plugin");
});

test("registerHook prevents duplicate registration", () => {
  const handler = () => {};
  registerHook("onRequest", "test-plugin", handler);
  registerHook("onRequest", "test-plugin", handler);
  assert.equal(getHooks("onRequest").length, 1);
});

test("registerHook sorts by priority", () => {
  registerHook("onRequest", "low-priority", () => {}, 200);
  registerHook("onRequest", "high-priority", () => {}, 10);
  const hooks = getHooks("onRequest");
  assert.equal(hooks[0].pluginName, "high-priority");
  assert.equal(hooks[1].pluginName, "low-priority");
});

test("unregisterHooks removes all handlers for a plugin", () => {
  registerHook("onRequest", "plugin-a", () => {});
  registerHook("onResponse", "plugin-a", () => {});
  registerHook("onRequest", "plugin-b", () => {});
  unregisterHooks("plugin-a");
  assert.equal(getHooks("onRequest").length, 1);
  assert.equal(getHooks("onResponse").length, 0);
});

// ── emitHook (fire-and-forget) ──

test("emitHook calls all handlers", async () => {
  let called = 0;
  registerHook("onError", "p1", () => {
    called++;
  });
  registerHook("onError", "p2", () => {
    called++;
  });
  await emitHook("onError", {});
  assert.equal(called, 2);
});

test("emitHook swallows handler errors", async () => {
  let called = false;
  registerHook("onError", "bad", () => {
    throw new Error("oops");
  });
  registerHook("onError", "good", () => {
    called = true;
  });
  await emitHook("onError", {});
  assert.ok(called);
});

test("emitHook returns void", async () => {
  const result = await emitHook("onError", {});
  assert.equal(result, undefined);
});

// ── emitHookBlocking ──

test("emitHookBlocking returns empty when no handlers", async () => {
  const result = await emitHookBlocking("onRequest", {});
  assert.deepEqual(result, { body: undefined, metadata: {} });
});

test("emitHookBlocking accumulates body/metadata", async () => {
  registerHook("onRequest", "p1", () => ({ body: { modified: true } }));
  registerHook("onRequest", "p2", () => ({ metadata: { key: "value" } }));
  const result = await emitHookBlocking("onRequest", { body: { original: true }, metadata: {} });
  assert.deepEqual(result.body, { modified: true });
  assert.deepEqual(result.metadata, { key: "value" });
});

test("emitHookBlocking returns on first blocker", async () => {
  registerHook("onRequest", "p1", () => ({ metadata: { from: "p1" } }));
  registerHook("onRequest", "blocker", () => ({ blocked: true, response: { error: "blocked" } }));
  registerHook("onRequest", "p3", () => ({ metadata: { from: "p3" } }));
  const result = await emitHookBlocking("onRequest", {});
  assert.ok(result.blocked);
  assert.deepEqual(result.response, { error: "blocked" });
});

test("emitHookBlocking preserves accumulated body/metadata on block", async () => {
  registerHook("onRequest", "p1", () => ({ body: { from: "p1" }, metadata: { key: "value" } }));
  registerHook("onRequest", "blocker", (payload: unknown) => {
    const p = payload as Record<string, unknown>;
    return {
      blocked: true,
      response: "blocked",
      body: p.body,
      metadata: { ...((p.metadata as Record<string, unknown>) || {}), extra: "from-blocker" },
    };
  });
  const result = await emitHookBlocking("onRequest", { body: {}, metadata: {} });
  assert.ok(result.blocked);
  assert.deepEqual(result.metadata, { key: "value", extra: "from-blocker" });
});

// ── runOnRequest ──

test("runOnRequest delegates to emitHookBlocking", async () => {
  registerHook("onRequest", "p1", () => ({ body: { modified: true } }));
  const result = await runOnRequest({ requestId: "test", body: {}, model: "test", metadata: {} });
  assert.deepEqual(result.body, { modified: true });
});

test("runOnRequest can block", async () => {
  registerHook("onRequest", "blocker", () => ({ blocked: true, response: { error: "nope" } }));
  const result = await runOnRequest({ requestId: "test", body: {}, model: "test", metadata: {} });
  assert.ok(result.blocked);
});

// ── runOnResponse ──

test("runOnResponse chains response through handlers", async () => {
  registerHook("onResponse", "p1", () => ({ response: { modified: "by-p1" } }));
  const result = await runOnResponse(
    { requestId: "test", body: {}, model: "test", metadata: {} },
    { original: true }
  );
  assert.deepEqual(result, { modified: "by-p1" });
});

test("runOnResponse passes through if no modification", async () => {
  registerHook("onResponse", "p1", () => undefined);
  const result = await runOnResponse(
    { requestId: "test", body: {}, model: "test", metadata: {} },
    { original: true }
  );
  assert.deepEqual(result, { original: true });
});

// ── runOnError ──

test("runOnError fires emitHook", async () => {
  let errorReceived: Error | null = null;
  registerHook("onError", "p1", (payload: unknown) => {
    errorReceived = (payload as Record<string, unknown>).error as Error;
  });
  await runOnError(
    { requestId: "test", body: {}, model: "test", metadata: {} },
    new Error("test error")
  );
  assert.ok(errorReceived);
});

// ── getHooks / getActiveEvents ──

test("getHooks returns empty for unregistered event", () => {
  assert.deepEqual(getHooks("nonexistent"), []);
});

test("getActiveEvents returns registered event names", () => {
  registerHook("onRequest", "p1", () => {});
  registerHook("onError", "p1", () => {});
  const events = getActiveEvents();
  assert.ok(events.includes("onRequest"));
  assert.ok(events.includes("onError"));
});

// ── resetHooks ──

test("resetHooks clears all registrations", () => {
  registerHook("onRequest", "p1", () => {});
  registerHook("onError", "p2", () => {});
  resetHooks();
  assert.deepEqual(getHooks("onRequest"), []);
  assert.deepEqual(getHooks("onError"), []);
});
