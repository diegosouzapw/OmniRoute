// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AccountProxyResetButton from "@/app/(dashboard)/dashboard/providers/[id]/components/AccountProxyResetButton";

const notify = { success: vi.fn(), error: vi.fn(), warning: vi.fn() };
vi.mock("@/store/notificationStore", () => ({ useNotificationStore: () => notify }));

describe("Account proxy reset", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.clearAllMocks();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  async function mount(failedAccount?: string) {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const body = typeof init?.body === "string" ? JSON.parse(init.body) : null;
      const fails = !!failedAccount && body?.scopeId === failedAccount;
      return { ok: !fails, json: async () => ({}) } as Response;
    });
    vi.stubGlobal("fetch", fetchMock);
    const onReset = vi.fn().mockResolvedValue(undefined);
    await act(async () =>
      root.render(
        <AccountProxyResetButton connectionIds={["active", "disabled"]} onReset={onReset} />
      )
    );
    return { fetchMock, onReset };
  }

  async function click(label: string) {
    const button = Array.from(container.querySelectorAll("button")).find((item) =>
      item.textContent?.includes(label)
    );
    expect(button).toBeTruthy();
    await act(async () => button!.click());
  }

  it("waits for confirmation and removes only account assignments, including disabled accounts", async () => {
    const { fetchMock, onReset } = await mount();
    await click("Remove account proxies");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(container.textContent).toContain("2");
    await click("Cancel");
    expect(fetchMock).not.toHaveBeenCalled();
    await click("Remove account proxies");
    await click("Remove assignments");
    expect(
      fetchMock.mock.calls.map(([url, init]) => [
        String(url),
        init?.method,
        init?.body ? JSON.parse(String(init.body)) : null,
      ])
    ).toEqual([
      [
        "/api/settings/proxies/assignments",
        "PUT",
        { scope: "account", scopeId: "active", proxyId: null },
      ],
      ["/api/settings/proxy?level=key&id=active", "DELETE", null],
      ["/api/providers/active", "PUT", { perKeyProxyEnabled: false }],
      [
        "/api/settings/proxies/assignments",
        "PUT",
        { scope: "account", scopeId: "disabled", proxyId: null },
      ],
      ["/api/settings/proxy?level=key&id=disabled", "DELETE", null],
      ["/api/providers/disabled", "PUT", { perKeyProxyEnabled: false }],
    ]);
    expect(onReset).toHaveBeenCalledOnce();
    expect(notify.success).toHaveBeenCalledOnce();
    expect(notify.error).not.toHaveBeenCalled();
  });

  it("reports partial failures and refreshes the actual remaining assignments", async () => {
    const { fetchMock, onReset } = await mount("disabled");
    await click("Remove account proxies");
    await click("Remove assignments");
    expect(fetchMock.mock.calls).toHaveLength(4);
    expect(onReset).toHaveBeenCalledOnce();
    expect(notify.success).not.toHaveBeenCalled();
    expect(notify.error).toHaveBeenCalledWith(expect.stringContaining("1"));
  });
});
