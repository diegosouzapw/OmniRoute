// @vitest-environment jsdom
// The live dashboard WebSocket server authorizes a client only after the HTTP
// upgrade completes (src/server/ws/liveServer.ts), so a rejected client sees
// `open`, then an UNAUTHORIZED error frame, then close(4001). useLiveDashboard
// must count that as a failed attempt: the reconnect delay grows 1s, 2s, 4s,
// 8s, 16s, 30s, and only an accepted session (the server's "welcome" frame)
// resets it. Before this guard the hook re-dialed twice a second forever.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useLiveConnectionStatus } from "../../src/hooks/useLiveDashboard";

type ServerBehavior = "reject" | "accept";
type TimelineEntry = { kind: "created" | "closed"; at: number; code?: number };

let timeline: TimelineEntry[] = [];
let behaviors: ServerBehavior[] = [];

/** Fake browser WebSocket driven by fake timers, modelling liveServer.ts. */
class FakeLiveSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  readyState = FakeLiveSocket.CONNECTING;
  onopen: ((event: Event) => void) | null = null;
  onmessage: ((event: { data: string }) => void) | null = null;
  onclose: ((event: { code: number }) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  private readonly behavior: ServerBehavior;

  constructor(readonly url: string) {
    this.behavior = behaviors.shift() ?? "reject";
    timeline.push({ kind: "created", at: Date.now() });
    setTimeout(() => {
      if (this.readyState !== FakeLiveSocket.CONNECTING) return;
      this.readyState = FakeLiveSocket.OPEN;
      this.onopen?.(new Event("open"));
    }, 5);
    if (this.behavior === "reject") {
      setTimeout(
        () => this.receive({ type: "error", code: "UNAUTHORIZED", message: "Missing token" }),
        6
      );
      setTimeout(() => this.finishClose(4001), 7);
    }
  }

  send(raw: string) {
    const msg = JSON.parse(raw);
    if (this.behavior === "accept" && msg.type === "subscribe") {
      setTimeout(() => this.receive({ type: "welcome", data: [] }), 1);
      // The server restarts ten seconds into the accepted session.
      setTimeout(() => this.finishClose(1006), 10_000);
    }
  }

  close() {
    if (this.readyState >= FakeLiveSocket.CLOSING) return;
    this.readyState = FakeLiveSocket.CLOSING;
    setTimeout(() => this.finishClose(1005), 1);
  }

  private receive(msg: unknown) {
    // Browsers drop frames that arrive after close() was called.
    if (this.readyState !== FakeLiveSocket.OPEN) return;
    this.onmessage?.({ data: JSON.stringify(msg) });
  }

  private finishClose(code: number) {
    if (this.readyState === FakeLiveSocket.CLOSED) return;
    this.readyState = FakeLiveSocket.CLOSED;
    timeline.push({ kind: "closed", at: Date.now(), code });
    this.onclose?.({ code });
  }
}

function Harness() {
  useLiveConnectionStatus({ wsUrl: "ws://127.0.0.1:1/live-ws" });
  return null;
}

/** Delay between each server-initiated close and the next socket the hook opens. */
function reconnectDelays(): number[] {
  const delays: number[] = [];
  timeline.forEach((entry, index) => {
    if (entry.kind !== "closed" || entry.code === 1005) return;
    const next = timeline.slice(index + 1).find((later) => later.kind === "created");
    if (next) delays.push(next.at - entry.at);
  });
  return delays;
}

/** Fire timers one at a time so React commits between socket events, as in a browser. */
async function runFor(ms: number) {
  const end = Date.now() + ms;
  for (let step = 0; step < 5_000 && Date.now() < end && vi.getTimerCount() > 0; step++) {
    await act(async () => {
      vi.advanceTimersToNextTimer();
    });
  }
}

describe("useLiveDashboard reconnect backoff", () => {
  let root: Root | null = null;
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers();
    vi.stubGlobal("WebSocket", FakeLiveSocket);
    vi.spyOn(console, "error").mockImplementation(() => {});
    timeline = [];
    behaviors = [];
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    root = null;
    container = null;
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it.each([
    ["production render", false],
    ["StrictMode render (next dev)", true],
  ])(
    "backs off 1s, 2s, 4s, 8s, 16s, 30s while the server rejects every session (%s)",
    async (_label, strict) => {
      await act(async () => {
        root!.render(
          strict ? (
            <React.StrictMode>
              <Harness />
            </React.StrictMode>
          ) : (
            <Harness />
          )
        );
      });

      await runFor(70_000);

      expect(reconnectDelays().slice(0, 6)).toEqual([1000, 2000, 4000, 8000, 16000, 30000]);
      const start = timeline[0].at;
      const rejectedWithinAMinute = timeline.filter(
        (entry) => entry.kind === "closed" && entry.code === 4001 && entry.at - start <= 60_000
      );
      expect(rejectedWithinAMinute).toHaveLength(6);
    }
  );

  it("resets the backoff only after the server accepts a session", async () => {
    behaviors = ["reject", "reject", "accept", "reject"];
    await act(async () => {
      root!.render(<Harness />);
    });

    await runFor(20_000);

    // Two rejections (1s, 2s), then an accepted session that later drops: the
    // next attempt waits the base 1s again instead of continuing at 4s.
    expect(reconnectDelays().slice(0, 3)).toEqual([1000, 2000, 1000]);
  });
});
