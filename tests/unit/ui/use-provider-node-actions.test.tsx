// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useProviderNodeActions } from "../../../src/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderNodeActions";

type Hook = ReturnType<typeof useProviderNodeActions>;

const t = ((key: string) => key) as Parameters<typeof useProviderNodeActions>[0]["t"];

function response(ok: boolean, body: unknown): Response {
  return {
    ok,
    json: async () => body,
  } as Response;
}

describe("useProviderNodeActions.handleUpdateNode", () => {
  let root: Root | null = null;
  let container: HTMLDivElement | null = null;
  let captured: Hook | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (root) act(() => root?.unmount());
    root = null;
    container?.remove();
    container = null;
    captured = null;
    vi.unstubAllGlobals();
  });

  async function renderHook(overrides: Partial<Parameters<typeof useProviderNodeActions>[0]> = {}) {
    const params: Parameters<typeof useProviderNodeActions>[0] = {
      providerId: "node-1",
      fetchConnections: vi.fn(async () => {}),
      selectedConnection: null,
      setProviderNode: vi.fn(),
      setShowEditNodeModal: vi.fn(),
      setShowEditModal: vi.fn(),
      t,
      ...overrides,
    };

    function Probe() {
      const hook = useProviderNodeActions(params);
      React.useEffect(() => {
        captured = hook;
      }, [hook]);
      return null;
    }

    await act(async () => {
      root = createRoot(container!);
      root.render(<Probe />);
    });
    return params;
  }

  it("throws the server message and keeps the modal open when PUT fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>(async () => response(false, { error: { message: "Icon URL too large" } }))
    );
    const params = await renderHook();

    await expect(captured!.handleUpdateNode({ iconUrl: "bad" })).rejects.toThrow(
      "Icon URL too large"
    );
    expect(params.setProviderNode).not.toHaveBeenCalled();
    expect(params.fetchConnections).not.toHaveBeenCalled();
    expect(params.setShowEditNodeModal).not.toHaveBeenCalled();
  });

  it("does not report a successful PUT as a save failure when refresh rejects", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>(async () => response(true, { node: { id: "node-1" } }))
    );
    const fetchConnections = vi.fn(async () => {
      throw new Error("refresh failed");
    });
    const params = await renderHook({ fetchConnections });

    await expect(
      captured!.handleUpdateNode({ iconUrl: "data:image/png;base64,QUJD" })
    ).resolves.toBe(undefined);
    expect(params.setProviderNode).toHaveBeenCalledWith({ id: "node-1" });
    expect(params.setShowEditNodeModal).toHaveBeenCalledWith(false);
    expect(fetchConnections).toHaveBeenCalledOnce();
  });
});
