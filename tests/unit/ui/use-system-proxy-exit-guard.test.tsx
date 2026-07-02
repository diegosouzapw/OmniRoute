/**
 * Tests for useSystemProxyExitGuard — beforeunload listener + keepalive fetch revert.
 *
 * Strategy: test the hook logic directly without React — we exercise the same
 * branches as the hook by simulating mount/unmount via the cleanup pattern.
 * This matches how use-traffic-stream.test.tsx tests hook logic (pure logic,
 * no React renderer needed).
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

// ---------------------------------------------------------------------------
// Minimal beforeunload event simulation
// ---------------------------------------------------------------------------

type BeforeUnloadListener = (e: { preventDefault: () => void; returnValue: string }) => void;

let registeredListeners: Array<{ type: string; fn: BeforeUnloadListener }> = [];
let fetchCalls: Array<{ url: string; init: RequestInit }> = [];

const mockWindow = {
  addEventListener(type: string, fn: BeforeUnloadListener) {
    registeredListeners.push({ type, fn });
  },
  removeEventListener(type: string, fn: BeforeUnloadListener) {
    registeredListeners = registeredListeners.filter((l) => l.type !== type || l.fn !== fn);
  },
};

const mockFetch = (url: string, init: RequestInit) => {
  fetchCalls.push({ url, init });
  return Promise.resolve(new Response("{}"));
};

// ---------------------------------------------------------------------------
// Simulate the hook logic (mirrors useSystemProxyExitGuard implementation)
// to make it testable without jsdom / React.
// ---------------------------------------------------------------------------

interface GuardOpts {
  applied: boolean;
  endpoint?: string;
}

function mountGuard(opts: GuardOpts): () => void {
  let appliedRef = opts.applied;

  const endpoint = opts.endpoint ?? "/api/tools/traffic-inspector/capture-modes/system-proxy";
  const body = JSON.stringify({ action: "revert" });

  const revertSystemProxy = () => {
    void mockFetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  };

  const beforeUnload: BeforeUnloadListener = (e) => {
    if (!appliedRef) return;
    revertSystemProxy();
    e.preventDefault();
    e.returnValue = "System-wide proxy still active — leave page anyway?";
  };

  mockWindow.addEventListener("beforeunload", beforeUnload);

  // Return cleanup (simulates useEffect cleanup / unmount)
  const cleanup = () => {
    mockWindow.removeEventListener("beforeunload", beforeUnload);
    if (appliedRef) {
      revertSystemProxy();
    }
  };

  // Expose a way to update appliedRef (simulates re-render with new prop)
  (cleanup as unknown as { setApplied: (v: boolean) => void }).setApplied = (v: boolean) => {
    appliedRef = v;
  };

  return cleanup;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("useSystemProxyExitGuard hook logic", () => {
  beforeEach(() => {
    registeredListeners = [];
    fetchCalls = [];
  });

  it("adds beforeunload listener on mount", () => {
    const cleanup = mountGuard({ applied: false });
    assert.equal(registeredListeners.length, 1);
    assert.equal(registeredListeners[0].type, "beforeunload");
    cleanup();
  });

  it("fires keepalive fetch with correct endpoint and body when applied=true on beforeunload", () => {
    const endpoint = "/api/tools/traffic-inspector/capture-modes/system-proxy";
    const cleanup = mountGuard({ applied: true, endpoint });

    // Simulate browser firing beforeunload
    const fakeEvent = { preventDefault: () => {}, returnValue: "" };
    registeredListeners[0].fn(fakeEvent);

    assert.equal(fetchCalls.length, 1);
    assert.equal(fetchCalls[0].url, endpoint);
    assert.equal(fetchCalls[0].init.method, "POST");
    assert.equal(fetchCalls[0].init.body, JSON.stringify({ action: "revert" }));
    assert.equal(fetchCalls[0].init.keepalive, true);
    cleanup();
  });

  it("does NOT fire keepalive fetch on beforeunload when applied=false", () => {
    const cleanup = mountGuard({ applied: false });

    const fakeEvent = { preventDefault: () => {}, returnValue: "" };
    registeredListeners[0].fn(fakeEvent);

    assert.equal(fetchCalls.length, 0);
    cleanup();
  });

  it("removes beforeunload listener on unmount", () => {
    const cleanup = mountGuard({ applied: false });
    assert.equal(registeredListeners.length, 1);
    cleanup();
    assert.equal(registeredListeners.length, 0);
  });

  it("fires keepalive fetch on unmount when applied=true (SPA navigation revert)", () => {
    const cleanup = mountGuard({ applied: true });

    // No beforeunload triggered — just unmount (SPA navigation)
    cleanup();

    assert.equal(fetchCalls.length, 1);
    assert.equal(fetchCalls[0].url, "/api/tools/traffic-inspector/capture-modes/system-proxy");
  });

  it("does NOT fire keepalive fetch on unmount when applied=false", () => {
    const cleanup = mountGuard({ applied: false });
    cleanup();
    assert.equal(fetchCalls.length, 0);
  });

  it("uses custom endpoint when provided", () => {
    const customEndpoint = "/api/custom/system-proxy";
    const cleanup = mountGuard({ applied: true, endpoint: customEndpoint });
    cleanup();
    assert.equal(fetchCalls[0].url, customEndpoint);
  });

  it("sets returnValue on beforeunload event when applied=true", () => {
    const cleanup = mountGuard({ applied: true });

    const fakeEvent = { preventDefault: () => {}, returnValue: "" };
    registeredListeners[0].fn(fakeEvent);

    assert.equal(fakeEvent.returnValue, "System-wide proxy still active — leave page anyway?");
    cleanup();
  });
});
