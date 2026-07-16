// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useLiveRequests } from "../../../src/hooks/useLiveDashboard";

function LiveRequestsHarness({ enabled }: { enabled: boolean }) {
  useLiveRequests({ enabled });
  return null;
}

describe("home topology hidden networking (#4596)", () => {
  const websocketMock = vi.fn();
  let root: ReturnType<typeof createRoot> | null = null;
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    websocketMock.mockClear();
    // useLiveDashboard runs a runtime handshake (GET /api/v1/ws?handshake=1) to
    // discover the public WS URL before it opens the socket, so it never
    // connects to the hardcoded default and then flaps to the public URL. Stub
    // it to fail fast instead of letting the real global fetch hit the network.
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("network unavailable in test")))
    );
    vi.stubGlobal(
      "WebSocket",
      class WebSocketMock {
        static OPEN = 1;
        readyState = 0;
        onopen: (() => void) | null = null;
        onmessage: ((event: MessageEvent) => void) | null = null;
        onclose: (() => void) | null = null;
        onerror: (() => void) | null = null;

        constructor(url: string) {
          websocketMock(url);
        }

        send() {}
        close() {}
      }
    );
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
    vi.unstubAllGlobals();
  });

  it("does NOT open a WebSocket when the topology section is disabled", () => {
    act(() => {
      root!.render(<LiveRequestsHarness enabled={false} />);
    });
    expect(websocketMock).not.toHaveBeenCalled();
  });

  it("opens a WebSocket when the topology section is enabled", async () => {
    await act(async () => {
      root!.render(<LiveRequestsHarness enabled={true} />);
      // Let the handshake fetch's rejection propagate through .catch()/.finally()
      // so `wsUrlResolved` flips to true and the connect effect re-runs.
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(websocketMock).toHaveBeenCalledTimes(1);
  });
});
