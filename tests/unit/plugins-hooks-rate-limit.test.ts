import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import {
  registerHook,
  emitHook,
  resetHooks,
} from "../../src/lib/plugins/hooks.ts";

describe("hooks rate limiting", () => {
  beforeEach(() => resetHooks());

  it("allows hooks up to rate limit", async () => {
    let callCount = 0;
    registerHook("onRequest", "test-plugin", async () => { callCount++; });
    for (let i = 0; i < 10; i++) {
      await emitHook("onRequest", {});
    }
    assert.strictEqual(callCount, 10);
  });

  it("blocks hooks after rate limit exceeded", async () => {
    let callCount = 0;
    registerHook("onRequest", "rate-plugin", async () => { callCount++; });
    // Fire 110 calls rapidly — 100 should pass, 10 should be blocked
    for (let i = 0; i < 110; i++) {
      await emitHook("onRequest", {});
    }
    assert.ok(callCount <= 100, `Expected <= 100 calls, got ${callCount}`);
  });

  it("rate limit resets after window", async () => {
    let callCount = 0;
    registerHook("onRequest", "window-plugin", async () => { callCount++; });
    for (let i = 0; i < 100; i++) await emitHook("onRequest", {});
    // Wait for window reset
    await new Promise((r) => setTimeout(r, 1100));
    await emitHook("onRequest", {});
    assert.strictEqual(callCount, 101);
  });
});
