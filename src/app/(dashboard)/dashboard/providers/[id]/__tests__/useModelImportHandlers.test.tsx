// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useModelImportHandlers,
  type UseModelImportHandlersParams,
  type UseModelImportHandlersReturn,
} from "../hooks/useModelImportHandlers";

type HookResult = UseModelImportHandlersReturn;

const t = ((key: string) => key) as ((key: string) => string) & {
  has: (key: string) => boolean;
};
t.has = () => false;

const notify = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
};

function buildParams(
  overrides: Partial<UseModelImportHandlersParams>
): UseModelImportHandlersParams {
  return {
    providerId: "cloudflare-ai",
    models: [],
    modelMeta: { customModels: [] },
    modelAliases: {},
    connections: [],
    isFreeNoAuth: false,
    handleSetAlias: vi.fn().mockResolvedValue(undefined),
    fetchAliases: vi.fn().mockResolvedValue(undefined),
    fetchProviderModelMeta: vi.fn().mockResolvedValue(undefined),
    fetchConnections: vi.fn().mockResolvedValue(undefined),
    notify,
    t,
    providerStorageAlias: "cloudflare-ai",
    ...overrides,
  };
}

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderHook(params: UseModelImportHandlersParams): { get: () => HookResult } {
  let latestResult: HookResult | null = null;
  function Wrapper() {
    const result = useModelImportHandlers(params);
    React.useEffect(() => {
      latestResult = result;
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
      if (!latestResult) throw new Error("Hook did not render");
      return latestResult;
    },
  };
}

function conn(id: string, active: boolean, autoSync?: boolean) {
  return {
    id,
    isActive: active,
    providerSpecificData: autoSync === undefined ? {} : { autoSync },
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

describe("useModelImportHandlers — master autoSync", () => {
  it("isAutoSyncEnabled is true only when every active connection has autoSync on", () => {
    const mixed = renderHook(
      buildParams({ connections: [conn("a", true, true), conn("b", true, false)] })
    );
    expect(mixed.get().isAutoSyncEnabled).toBe(false);

    const allOn = renderHook(
      buildParams({ connections: [conn("a", true, true), conn("b", true, true)] })
    );
    expect(allOn.get().isAutoSyncEnabled).toBe(true);

    const oneOff = renderHook(
      buildParams({ connections: [conn("a", true, true), conn("b", false, true)] })
    );
    expect(oneOff.get().isAutoSyncEnabled).toBe(true);
  });

  it("handleToggleAutoSync fans out a PUT to every active connection (bug repro)", async () => {
    const fetchConnections = vi.fn().mockResolvedValue(undefined);
    const hook = renderHook(
      buildParams({
        connections: [conn("conn-a", true, false), conn("conn-b", true, false)],
        fetchConnections,
      })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({ ok: true } as Response);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/providers/conn-a",
      expect.objectContaining({ method: "PUT" })
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/providers/conn-b",
      expect.objectContaining({ method: "PUT" })
    );
    expect(fetchConnections).toHaveBeenCalled();
  });

  it("excludes inactive connections from the fan-out", async () => {
    const hook = renderHook(
      buildParams({
        connections: [conn("conn-a", true, false), conn("conn-inactive", false, false)],
      })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({ ok: true } as Response);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/providers/conn-a",
      expect.objectContaining({ method: "PUT" })
    );
  });

  it("toggling from a mixed state (one on, one off) turns all active connections on", async () => {
    const hook = renderHook(
      buildParams({
        connections: [conn("conn-a", true, true), conn("conn-b", true, false)],
      })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({ ok: true } as Response);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(hook.get().isAutoSyncEnabled).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/providers/conn-a",
      expect.objectContaining({ method: "PUT" })
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/providers/conn-b",
      expect.objectContaining({ method: "PUT" })
    );
    const firstBody = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    const secondBody = JSON.parse(fetchMock.mock.calls[1][1].body as string);
    expect(firstBody.providerSpecificData).toEqual({ autoSync: true });
    expect(secondBody.providerSpecificData).toEqual({ autoSync: true });
    expect(notify.success).toHaveBeenCalled();
  });

  it("still calls fetchConnections when a fan-out PUT fails (partial failure)", async () => {
    const fetchConnections = vi.fn().mockResolvedValue(undefined);
    const hook = renderHook(
      buildParams({
        connections: [conn("conn-a", true, false), conn("conn-b", true, false)],
        fetchConnections,
      })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500 } as Response);
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(fetchConnections).toHaveBeenCalled();
    expect(notify.success).not.toHaveBeenCalled();
    expect(notify.error).not.toHaveBeenCalled();
    expect(notify.warning).toHaveBeenCalledWith("autoSyncPartialFailure");
  });

  it("notifies error when every fan-out PUT fails", async () => {
    const hook = renderHook(
      buildParams({
        connections: [conn("conn-a", true, false), conn("conn-b", true, false)],
      })
    );
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({ ok: false, status: 500 } as Response);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(notify.error).toHaveBeenCalledWith("autoSyncToggleFailed");
    expect(notify.success).not.toHaveBeenCalled();
    expect(notify.warning).not.toHaveBeenCalled();
  });

  it("no-ops without a PUT or notification when there are no active connections", async () => {
    const hook = renderHook(buildParams({ connections: [conn("conn-a", false, false)] }));
    const fetchMock = vi.mocked(fetch);

    await act(async () => {
      await hook.get().handleToggleAutoSync();
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(notify.success).not.toHaveBeenCalled();
    expect(notify.error).not.toHaveBeenCalled();
  });
});
