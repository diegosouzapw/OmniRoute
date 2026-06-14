import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import {
  registerHook,
  emitHook,
  emitHookBlocking,
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

  // ── IMPORTANT-8: emitHookBlocking must also rate-limit ──

  it("emitHookBlocking skips a rate-limited plugin", async () => {
    let callCount = 0;
    registerHook("onRequest", "blocking-rate-plugin", async () => {
      callCount++;
      return {};
    });
    // Exhaust the 100-call window
    for (let i = 0; i < 101; i++) {
      await emitHookBlocking("onRequest", {});
    }
    // After 101 calls, the 101st should have been suppressed
    assert.ok(callCount <= 100, `emitHookBlocking should rate-limit: expected <= 100, got ${callCount}`);
  });

  // ── IMPORTANT-4: resetHooks() clears rateLimitMap ──

  it("resetHooks clears rate-limit state so counts start fresh", async () => {
    let callCount = 0;
    registerHook("onRequest", "reset-plugin", async () => { callCount++; });
    // Exhaust the window
    for (let i = 0; i < 101; i++) await emitHook("onRequest", {});
    const countAfterExhaustion = callCount;
    assert.ok(countAfterExhaustion <= 100, "sanity: should have been rate-limited");

    // resetHooks() must clear the rate-limit state along with hooks
    resetHooks();
    callCount = 0;

    // Re-register and fire — should work from scratch (window cleared)
    registerHook("onRequest", "reset-plugin", async () => { callCount++; });
    for (let i = 0; i < 10; i++) await emitHook("onRequest", {});
    assert.strictEqual(callCount, 10, "after resetHooks, rate-limit window should be cleared");
  });
});
