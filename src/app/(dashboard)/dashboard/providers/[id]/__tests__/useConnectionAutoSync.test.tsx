// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useConnectionAutoSync } from "../hooks/useConnectionAutoSync";
import type { ConnectionRowConnection } from "../components/ConnectionRow";

const t = ((key: string) => key) as ((key: string) => string) & {
  has: (key: string) => boolean;
};
t.has = () => false;

const notify = { success: vi.fn(), error: vi.fn(), info: vi.fn() };

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderHandler(initial: ConnectionRowConnection[]) {
  let latest: {
    handler: (id: string, enabled: boolean) => Promise<void>;
    connections: ConnectionRowConnection[];
  } | null = null;
  function Wrapper() {
    const [connections, setConnections] = React.useState(initial);
    const handler = useConnectionAutoSync(
      connections,
      setConnections as React.Dispatch<React.SetStateAction<ConnectionRowConnection[]>>,
      notify,
      t
    );
    React.useEffect(() => {
      latest = { handler, connections };
    });
    return null;
  }
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(<Wrapper />));
  roots.push({ root, el });
  return {
    get: () => {
      if (!latest) throw new Error("Hook did not render");
      return latest;
    },
  };
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubGlobal("fetch", vi.fn());
  vi.clearAllMocks();
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

describe("useConnectionAutoSync", () => {
  it("PUTs the autoSync flag and notifies success", async () => {
    const conns: ConnectionRowConnection[] = [
      { id: "conn-1", providerSpecificData: { autoSync: false } },
    ];
    const h = renderHandler(conns);
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);

    await act(async () => {
      await h.get().handler("conn-1", true);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/providers/conn-1",
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify({
          providerSpecificData: { autoSync: true },
        }),
      })
    );
    expect(notify.success).toHaveBeenCalled();
  });

  it("spreads existing providerSpecificData instead of replacing it", async () => {
    const conns: ConnectionRowConnection[] = [
      { id: "conn-1", providerSpecificData: { someOtherFlag: 42, autoSync: false } },
    ];
    const h = renderHandler(conns);
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);

    await act(async () => {
      await h.get().handler("conn-1", true);
    });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body).toEqual({
      providerSpecificData: { someOtherFlag: 42, autoSync: true },
    });
    expect(h.get().connections).toEqual([
      { id: "conn-1", providerSpecificData: { someOtherFlag: 42, autoSync: true } },
    ]);
  });

  it("notifies error when the PUT fails", async () => {
    const conns: ConnectionRowConnection[] = [
      { id: "conn-1", providerSpecificData: { autoSync: false } },
    ];
    const h = renderHandler(conns);
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500 } as Response);

    await act(async () => {
      await h.get().handler("conn-1", true);
    });

    expect(notify.error).toHaveBeenCalled();
    expect(notify.success).not.toHaveBeenCalled();
  });

  it("notifies autoSyncDisabled (info) when disabling autoSync", async () => {
    const conns: ConnectionRowConnection[] = [
      { id: "conn-1", providerSpecificData: { autoSync: true } },
    ];
    const h = renderHandler(conns);
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);

    await act(async () => {
      await h.get().handler("conn-1", false);
    });

    expect(notify.info).toHaveBeenCalledWith("autoSyncDisabled");
    expect(notify.success).not.toHaveBeenCalled();
  });
});
