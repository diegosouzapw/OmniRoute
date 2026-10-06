// @vitest-environment jsdom
//
// Fast regression guard for #10319 (live dashboard WS client never sends a
// heartbeat ping, so the server's 35s inactivity sweep terminates a healthy,
// idle-but-subscribed client). This is the cheap unit-ish check; the slow
// end-to-end confirmation (real server, ~50s window) lives in
// tests/integration/live-ws-heartbeat-keepalive.test.ts.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useLiveDashboard } from "../../src/hooks/useLiveDashboard";

class MockWebSocket {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;
  static instances: MockWebSocket[] = [];

  readyState = MockWebSocket.CONNECTING;
  sent: string[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((event: { data: string }) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;

  constructor(public url: string) {
    MockWebSocket.instances.push(this);
  }

  send(data: string): void {
    this.sent.push(data);
  }

  close(): void {
    if (this.readyState === MockWebSocket.CLOSED) return;
    this.readyState = MockWebSocket.CLOSED;
    this.onclose?.();
  }

  triggerOpen(): void {
    this.readyState = MockWebSocket.OPEN;
    this.onopen?.();
  }
}

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("useLiveDashboard heartbeat ping (#10319)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    MockWebSocket.instances = [];
    vi.stubGlobal("WebSocket", MockWebSocket);
    vi.useFakeTimers();
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("sends a periodic { type: 'ping' } frame after the connection opens", () => {
    const container = makeContainer();
    const root = createRoot(container);

    function C() {
      useLiveDashboard({ wsUrl: "ws://localhost:20132/live-ws", channels: ["requests"] });
      return null;
    }

    act(() => {
      root.render(<C />);
    });

    const instance = MockWebSocket.instances[0];
    expect(instance).toBeDefined();

    act(() => {
      instance.triggerOpen();
    });

    // On open, only the subscribe frame has been sent — no ping yet.
    expect(instance.sent.some((m) => JSON.parse(m).type === "ping")).toBe(false);
    expect(instance.sent.some((m) => JSON.parse(m).type === "subscribe")).toBe(true);

    // Advance past the client's heartbeat interval (15s) — must now have pinged.
    act(() => {
      vi.advanceTimersByTime(15_000);
    });

    const pings = instance.sent.filter((m) => JSON.parse(m).type === "ping");
    expect(pings.length).toBeGreaterThanOrEqual(1);

    // And it keeps pinging periodically (regression guard against a one-shot timer).
    act(() => {
      vi.advanceTimersByTime(30_000);
    });
    const pingsAfterMore = instance.sent.filter((m) => JSON.parse(m).type === "ping");
    expect(pingsAfterMore.length).toBeGreaterThan(pings.length);
  });

  it("stops pinging after the socket closes (no leaked interval)", () => {
    const container = makeContainer();
    const root = createRoot(container);

    function C() {
      useLiveDashboard({
        wsUrl: "ws://localhost:20132/live-ws",
        channels: ["requests"],
        autoReconnect: false,
      });
      return null;
    }

    act(() => {
      root.render(<C />);
    });

    const instance = MockWebSocket.instances[0];
    act(() => {
      instance.triggerOpen();
    });
    act(() => {
      vi.advanceTimersByTime(15_000);
    });
    const pingsBeforeClose = instance.sent.filter((m) => JSON.parse(m).type === "ping").length;
    expect(pingsBeforeClose).toBeGreaterThanOrEqual(1);

    act(() => {
      instance.close();
    });

    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    const pingsAfterClose = instance.sent.filter((m) => JSON.parse(m).type === "ping").length;
    expect(pingsAfterClose).toBe(pingsBeforeClose);
  });

  it("clears the ping interval on unmount", () => {
    const container = makeContainer();
    const root = createRoot(container);

    function C() {
      useLiveDashboard({ wsUrl: "ws://localhost:20132/live-ws", channels: ["requests"] });
      return null;
    }

    act(() => {
      root.render(<C />);
    });
    const instance = MockWebSocket.instances[0];
    act(() => {
      instance.triggerOpen();
    });
    act(() => {
      vi.advanceTimersByTime(15_000);
    });
    const pingsBeforeUnmount = instance.sent.filter((m) => JSON.parse(m).type === "ping").length;

    act(() => {
      root.unmount();
    });
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    const pingsAfterUnmount = instance.sent.filter((m) => JSON.parse(m).type === "ping").length;
    expect(pingsAfterUnmount).toBe(pingsBeforeUnmount);
  });
});
