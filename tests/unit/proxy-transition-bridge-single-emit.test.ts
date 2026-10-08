/**
 * One set-aside transition emits one `proxy.set_aside` bus event, even when
 * the bridge module is loaded twice (duplicated server module copies would
 * otherwise subscribe twice and emit twice).
 */
import test from "node:test";
import assert from "node:assert/strict";

const bridgeA = await import("../../src/lib/proxyEvents/proxyTransitionBridge.ts?copy=a");
const bridgeB = await import("../../src/lib/proxyEvents/proxyTransitionBridge.ts?copy=b");
const storeA = await import("../../open-sse/utils/proxyRefusalMemory.ts?copy=a");
const listenersA = await import("../../open-sse/utils/proxyTransitionListeners.ts?copy=a");
const bus = await import("../../src/lib/events/eventBus.ts");

const KEY = "http://user@bridge.example:8080";
const NOW = 10_000_000;

function resetAll(): void {
  bridgeA.__resetBridgeForTesting();
  bridgeB.__resetBridgeForTesting();
  storeA.__resetProxyRefusalMemoryForTesting();
  listenersA.__resetProxyTransitionListenersForTesting();
}

test.beforeEach(() => {
  resetAll();
});

test.afterEach(() => {
  resetAll();
  delete process.env.PROXY_WEBHOOK_REBOUND_MS;
});

test("transition seen by two bridge copies emits a single bus event", () => {
  const clock = () => NOW;
  bridgeA.__setBridgeNowForTesting(clock);
  bridgeB.__setBridgeNowForTesting(clock);
  bridgeA.registerProxyTransitionBridge();
  bridgeB.registerProxyTransitionBridge();
  const received: unknown[] = [];
  const off = bus.on("proxy.set_aside", (payload) => {
    received.push(payload);
  });
  try {
    const periodMs = storeA.noteProxyRefusal(KEY, "transport", NOW);
    assert.ok(typeof periodMs === "number");
    assert.equal(received.length, 1);
  } finally {
    off();
  }
});
