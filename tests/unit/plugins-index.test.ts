import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  registerHook,
  unregisterHooks,
  emitHookBlocking,
  emitHook,
  runOnRequest,
  runOnResponse,
  runOnError,
  resetHooks,
  getHooks,
} from "../../src/lib/plugins/hooks.ts";

beforeEach(() => {
  resetHooks();
});

const makeCtx = () => ({
  requestId: `req-${Date.now()}`,
  body: { model: "gpt-4", messages: [] },
  model: "gpt-4",
  provider: "openai",
  metadata: {},
});

describe("registerHook", () => {
  it("registers a hook for an event", () => {
    registerHook("onRequest", "test-plugin", () => {});
    const list = getHooks("onRequest");
    assert.equal(list.length, 1);
    assert.equal(list[0].pluginName, "test-plugin");
    assert.equal(list[0].priority, 100);
  });

  it("sorts hooks by priority", () => {
    registerHook("onRequest", "low", () => {}, 200);
    registerHook("onRequest", "high", () => {}, 10);
    registerHook("onRequest", "mid", () => {}, 100);
    const list = getHooks("onRequest");
    assert.equal(list[0].pluginName, "high");
    assert.equal(list[1].pluginName, "mid");
    assert.equal(list[2].pluginName, "low");
  });

  it("prevents duplicate registration", () => {
    const handler = () => {};
    registerHook("onRequest", "p1", handler);
    registerHook("onRequest", "p1", handler);
    const list = getHooks("onRequest");
    assert.equal(list.length, 1);
  });

  it("allows same plugin with different handlers", () => {
    registerHook("onRequest", "p1", () => {});
    registerHook("onRequest", "p1", () => {});
    const list = getHooks("onRequest");
    assert.equal(list.length, 2);
  });
});

describe("unregisterHooks", () => {
  it("removes all hooks for a plugin", () => {
    registerHook("onRequest", "p1", () => {});
    registerHook("onResponse", "p1", () => {});
    registerHook("onRequest", "p2", () => {});
    unregisterHooks("p1");
    assert.equal(getHooks("onRequest").length, 1);
    assert.equal(getHooks("onResponse").length, 0);
  });
});

describe("emitHookBlocking", () => {
  it("returns empty when no hooks registered", async () => {
    const result = await emitHookBlocking("onRequest", makeCtx());
    assert.equal(result.blocked, undefined);
  });

  it("blocks request when hook returns blocked", async () => {
    registerHook("onRequest", "blocker", () => ({
      blocked: true,
      response: { error: "denied" },
    }));
    const result = await emitHookBlocking("onRequest", makeCtx());
    assert.equal(result.blocked, true);
    assert.deepEqual(result.response, { error: "denied" });
  });

  it("chains body/metadata through hooks", async () => {
    registerHook("onRequest", "p1", (payload: any) => ({
      body: { ...payload.body, added: true },
      metadata: { p1: true },
    }), 10);
    registerHook("onRequest", "p2", (payload: any) => ({
      metadata: { ...payload.metadata, p2: true },
    }), 20);
    const result = await emitHookBlocking("onRequest", makeCtx());
    assert.equal(result.blocked, undefined);
    assert.equal((result.body as any).added, true);
    assert.deepEqual(result.metadata, { p1: true, p2: true });
  });

  it("swallows hook errors", async () => {
    registerHook("onRequest", "p1", () => { throw new Error("boom"); });
    const result = await emitHookBlocking("onRequest", makeCtx());
    assert.equal(result.blocked, undefined);
  });
});

describe("runOnRequest", () => {
  it("returns not blocked when no hooks", async () => {
    const result = await runOnRequest(makeCtx());
    assert.equal(result.blocked, undefined);
  });

  it("blocks request when hook returns blocked", async () => {
    registerHook("onRequest", "blocker", () => ({
      blocked: true,
      response: { error: "denied" },
    }));
    const result = await runOnRequest(makeCtx());
    assert.equal(result.blocked, true);
    assert.deepEqual(result.response, { error: "denied" });
  });

  it("chains body/metadata through hooks", async () => {
    registerHook("onRequest", "p1", (payload: any) => ({
      body: { ...payload.body, added: true },
      metadata: { p1: true },
    }), 10);
    registerHook("onRequest", "p2", (payload: any) => ({
      metadata: { ...payload.metadata, p2: true },
    }), 20);
    const result = await runOnRequest(makeCtx());
    assert.equal(result.blocked, undefined);
    assert.equal((result.body as any).added, true);
    assert.deepEqual(result.metadata, { p1: true, p2: true });
  });

  it("swallows hook errors", async () => {
    registerHook("onRequest", "p1", () => { throw new Error("boom"); });
    const result = await runOnRequest(makeCtx());
    assert.equal(result.blocked, undefined);
  });
});

describe("runOnResponse", () => {
  it("returns original response when no hooks", async () => {
    const resp = { choices: [{ message: { content: "hi" } }] };
    const result = await runOnResponse(makeCtx(), resp);
    assert.deepEqual(result, resp);
  });

  it("chains response through hooks", async () => {
    registerHook("onResponse", "p1", (payload: any) => ({
      response: { ...payload.response, p1: true },
    }));
    registerHook("onResponse", "p2", (payload: any) => ({
      response: { ...payload.response, p2: true },
    }));
    const result = await runOnResponse(makeCtx(), { original: true });
    assert.deepEqual(result, { original: true, p1: true, p2: true });
  });

  it("swallows hook errors", async () => {
    registerHook("onResponse", "p1", () => { throw new Error("boom"); });
    const result = await runOnResponse(makeCtx(), { original: true });
    assert.deepEqual(result, { original: true });
  });
});

describe("runOnError", () => {
  it("fires error hooks", async () => {
    let caught = false;
    registerHook("onError", "p1", (payload: any) => {
      caught = true;
    });
    await runOnError(makeCtx(), new Error("test"));
    assert.equal(caught, true);
  });
});

describe("resetHooks", () => {
  it("clears all hooks", () => {
    registerHook("onRequest", "p1", () => {});
    registerHook("onResponse", "p2", () => {});
    resetHooks();
    assert.equal(getHooks("onRequest").length, 0);
    assert.equal(getHooks("onResponse").length, 0);
  });
});
