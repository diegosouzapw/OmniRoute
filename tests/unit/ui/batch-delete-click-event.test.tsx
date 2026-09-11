// @vitest-environment jsdom
/**
 * ConfirmModal wires onConfirm to <Button onClick={onConfirm}>. Native
 * buttons pass a MouseEvent. handleBatchDeleteConfirm's optional onAfter
 * used to treat any truthy first arg as a post-delete callback, so the
 * click event ran as `await onAfter()` after the success toast and the
 * catch block fired a second "batch delete failed" toast.
 */
import React, { act, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "moonshot-native" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/providers/moonshot-native",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) {
      return Object.entries(values).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        key
      );
    }
    return key;
  },
}));

const notify = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
};
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => notify,
}));

const CONNECTIONS = [
  { id: "conn-a", provider: "moonshot-native", name: "Key A" },
  { id: "conn-b", provider: "moonshot-native", name: "Key B" },
];

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
    headers: { get: () => null },
  } as Response;
}

function installFetchMock() {
  const fn = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const method = (init?.method || "GET").toUpperCase();
    if ((url === "/api/providers" || url.startsWith("/api/providers?")) && method === "GET") {
      return jsonResponse(200, { connections: CONNECTIONS });
    }
    if (url === "/api/provider-nodes" && method === "GET") {
      return jsonResponse(200, { nodes: [] });
    }
    if (url === "/api/providers" && method === "DELETE") {
      return jsonResponse(200, { message: "Deleted 2 connection(s)", deleted: 2 });
    }
    return jsonResponse(200, {});
  });
  vi.stubGlobal("fetch", fn);
  return fn;
}

const { useProviderConnections } =
  await import("@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderConnections");
type HookResult = ReturnType<typeof useProviderConnections>;

describe("useProviderConnections — batch delete click event must not toast failure after success", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
      true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    notify.success.mockClear();
    notify.error.mockClear();
    notify.info.mockClear();
    notify.warning.mockClear();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    vi.unstubAllGlobals();
  });

  async function mountHook() {
    let result: HookResult | null = null;

    function TestWrapper() {
      const hookResult = useProviderConnections("moonshot-native", false, true);
      useEffect(() => {
        result = hookResult;
      }, [hookResult]);
      return <span />;
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    return () => result as HookResult;
  }

  it("does not toast batchDeleteNetworkError when ConfirmModal forwards the click event", async () => {
    installFetchMock();
    const getHook = await mountHook();

    await act(async () => {
      getHook().handleToggleSelectAll();
    });
    expect(getHook().selectedIds.size).toBe(2);

    const clickEvent = { type: "click", preventDefault() {} } as unknown as MouseEvent;

    await act(async () => {
      await getHook().handleBatchDeleteConfirm(clickEvent as never);
    });

    expect(notify.success).toHaveBeenCalledTimes(1);
    expect(notify.error).not.toHaveBeenCalled();
  });

  it("still runs a real onAfter callback after a successful delete", async () => {
    installFetchMock();
    const getHook = await mountHook();
    const onAfter = vi.fn(async () => {});

    await act(async () => {
      getHook().handleToggleSelectAll();
    });

    await act(async () => {
      await getHook().handleBatchDeleteConfirm(onAfter);
    });

    expect(onAfter).toHaveBeenCalledTimes(1);
    expect(notify.success).toHaveBeenCalledTimes(1);
    expect(notify.error).not.toHaveBeenCalled();
  });
});
