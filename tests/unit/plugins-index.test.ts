import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  registerPlugin,
  unregisterPlugin,
  setPluginEnabled,
  listPlugins,
  runOnRequest,
  runOnResponse,
  runOnError,
  resetPlugins,
} from "../../src/lib/plugins/index.ts";

beforeEach(() => {
  resetPlugins();
});

const makeCtx = () => ({
  requestId: `req-${Date.now()}`,
  body: { model: "gpt-4", messages: [] },
  model: "gpt-4",
  provider: "openai",
  metadata: {},
});

describe("registerPlugin", () => {
  it("registers plugin with defaults", () => {
    registerPlugin({ name: "test", onRequest: () => {} });
    const list = listPlugins();
    assert.equal(list.length, 1);
    assert.equal(list[0].name, "test");
    assert.equal(list[0].priority, 100);
    assert.equal(list[0].enabled, true);
    assert.ok(list[0].hooks.includes("onRequest"));
  });

  it("sorts by priority", () => {
    registerPlugin({ name: "low", priority: 200, onRequest: () => {} });
    registerPlugin({ name: "high", priority: 10, onRequest: () => {} });
    registerPlugin({ name: "mid", priority: 100, onRequest: () => {} });
    const list = listPlugins();
    assert.equal(list[0].name, "high");
    assert.equal(list[1].name, "mid");
    assert.equal(list[2].name, "low");
  });

  it("re-registers plugin with same name", () => {
    registerPlugin({ name: "p1", onRequest: () => {} });
    registerPlugin({ name: "p1", onResponse: () => {} });
    const list = listPlugins();
    assert.equal(list.length, 1);
    assert.ok(list[0].hooks.includes("onResponse"));
  });

  it("lists hooks correctly", () => {
    registerPlugin({
      name: "multi",
      onRequest: () => {},
      onResponse: () => {},
      onError: () => {},
    });
    const list = listPlugins();
    assert.deepEqual(list[0].hooks.sort(), ["onError", "onRequest", "onResponse"]);
  });
});

describe("unregisterPlugin", () => {
  it("removes plugin by name", () => {
    registerPlugin({ name: "p1", onRequest: () => {} });
    assert.equal(unregisterPlugin("p1"), true);
    assert.equal(listPlugins().length, 0);
  });

  it("returns false for unknown plugin", () => {
    assert.equal(unregisterPlugin("unknown"), false);
  });
});

describe("setPluginEnabled", () => {
  it("enables/disables plugin", () => {
    registerPlugin({ name: "p1", onRequest: () => {} });
    assert.equal(setPluginEnabled("p1", false), true);
    assert.equal(listPlugins()[0].enabled, false);
    assert.equal(setPluginEnabled("p1", true), true);
    assert.equal(listPlugins()[0].enabled, true);
  });

  it("returns false for unknown plugin", () => {
    assert.equal(setPluginEnabled("unknown", false), false);
  });
});

describe("listPlugins", () => {
  it("returns empty array when no plugins", () => {
    assert.deepEqual(listPlugins(), []);
  });
});

describe("runOnRequest", () => {
  it("returns not blocked when no plugins", async () => {
    const result = await runOnRequest(makeCtx());
    assert.equal(result.blocked, false);
  });

  it("returns not blocked when plugin returns void", async () => {
    registerPlugin({ name: "p1", onRequest: () => {} });
    const result = await runOnRequest(makeCtx());
    assert.equal(result.blocked, false);
  });

  it("blocks request when plugin returns blocked", async () => {
    registerPlugin({
      name: "blocker",
      onRequest: () => ({ blocked: true, response: { error: "denied" } }),
    });
    const result = await runOnRequest(makeCtx());
    assert.equal(result.blocked, true);
    assert.deepEqual(result.response, { error: "denied" });
  });

  it("chains body/metadata through plugins", async () => {
    registerPlugin({
      name: "p1",
      priority: 10,
      onRequest: (ctx) => ({ body: { ...ctx.body, added: true }, metadata: { p1: true } }),
    });
    registerPlugin({
      name: "p2",
      priority: 20,
      onRequest: (ctx) => ({ metadata: { ...ctx.metadata, p2: true } }),
    });
    const result = await runOnRequest(makeCtx());
    assert.equal(result.blocked, false);
    assert.equal((result.ctx.body as any).added, true);
    assert.deepEqual(result.ctx.metadata, { p1: true, p2: true });
  });

  it("skips disabled plugins", async () => {
    registerPlugin({ name: "p1", enabled: false, onRequest: () => ({ blocked: true }) });
    const result = await runOnRequest(makeCtx());
    assert.equal(result.blocked, false);
  });

  it("swallows plugin errors", async () => {
    registerPlugin({ name: "p1", onRequest: () => { throw new Error("boom"); } });
    const result = await runOnRequest(makeCtx());
    assert.equal(result.blocked, false);
  });
});

describe("runOnResponse", () => {
  it("returns original response when no plugins", async () => {
    const resp = { choices: [{ message: { content: "hi" } }] };
    const result = await runOnResponse(makeCtx(), resp);
    assert.deepEqual(result, resp);
  });

  it("chains response through plugins", async () => {
    registerPlugin({
      name: "p1",
      onResponse: (_ctx, resp: any) => ({ ...resp, p1: true }),
    });
    registerPlugin({
      name: "p2",
      onResponse: (_ctx, resp: any) => ({ ...resp, p2: true }),
    });
    const result = await runOnResponse(makeCtx(), { original: true });
    assert.deepEqual(result, { original: true, p1: true, p2: true });
  });

  it("skips disabled plugins", async () => {
    registerPlugin({
      name: "p1",
      enabled: false,
      onResponse: () => ({ modified: true }),
    });
    const result = await runOnResponse(makeCtx(), { original: true });
    assert.deepEqual(result, { original: true });
  });

  it("swallows plugin errors", async () => {
    registerPlugin({ name: "p1", onResponse: () => { throw new Error("boom"); } });
    const result = await runOnResponse(makeCtx(), { original: true });
    assert.deepEqual(result, { original: true });
  });
});

describe("runOnError", () => {
  it("returns null when no plugins handle error", async () => {
    const result = await runOnError(makeCtx(), new Error("test"));
    assert.equal(result, null);
  });

  it("returns recovery when plugin handles error", async () => {
    registerPlugin({
      name: "recover",
      onError: () => ({ recovered: true }),
    });
    const result = await runOnError(makeCtx(), new Error("test"));
    assert.deepEqual(result, { recovered: true });
  });

  it("skips disabled plugins", async () => {
    registerPlugin({
      name: "p1",
      enabled: false,
      onError: () => ({ recovered: true }),
    });
    const result = await runOnError(makeCtx(), new Error("test"));
    assert.equal(result, null);
  });

  it("swallows plugin errors", async () => {
    registerPlugin({ name: "p1", onError: () => { throw new Error("boom"); } });
    const result = await runOnError(makeCtx(), new Error("test"));
    assert.equal(result, null);
  });
});

describe("resetPlugins", () => {
  it("clears all plugins", () => {
    registerPlugin({ name: "p1", onRequest: () => {} });
    registerPlugin({ name: "p2", onResponse: () => {} });
    resetPlugins();
    assert.equal(listPlugins().length, 0);
  });
});
