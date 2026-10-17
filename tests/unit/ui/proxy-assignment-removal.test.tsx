// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProxyConfigModal from "@/shared/components/ProxyConfigModal";
import DistributeProxiesButton from "@/shared/components/DistributeProxiesButton";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Removing distributed account proxy assignments", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  function mockAssignment(clearStatus = 200, legacyStatus = 200) {
    return vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const status =
        init?.method === "PUT" ? clearStatus : init?.method === "DELETE" ? legacyStatus : 200;
      const body =
        status !== 200
          ? { error: { message: "Removal rejected" } }
          : url === "/api/settings/proxies"
            ? {
                items: [{ id: "proxy-a", name: "Shared proxy", host: "proxy.local", port: 8080 }],
              }
            : url.includes("/assignments?")
              ? {
                  items: [{ scope: "account", scopeId: "account-a", proxyId: "proxy-a" }],
                }
              : { proxy: null };
      return { ok: status === 200, status, json: async () => body } as Response;
    });
  }

  async function click(text: string) {
    const button = Array.from(container.querySelectorAll("button")).find((item) =>
      item.textContent?.includes(text)
    );
    expect(button).toBeTruthy();
    await act(async () => button!.click());
  }

  async function mountModal(clearStatus = 200, legacyStatus = 200) {
    const fetchMock = mockAssignment(clearStatus, legacyStatus);
    vi.stubGlobal("fetch", fetchMock);
    const onSaved = vi.fn();
    const onClose = vi.fn();
    await act(async () =>
      root.render(
        <ProxyConfigModal
          isOpen
          level="key"
          levelId="account-a"
          onSaved={onSaved}
          onClose={onClose}
        />
      )
    );
    return { fetchMock, onSaved, onClose };
  }

  it("clears the account assignment and legacy config without deleting the saved proxy", async () => {
    const { fetchMock, onSaved, onClose } = await mountModal();
    await click("clear");
    const writes = fetchMock.mock.calls.filter(([, init]) => init?.method);
    expect(writes.map(([url, init]) => [url, init?.method])).toEqual([
      ["/api/settings/proxies/assignments", "PUT"],
      ["/api/settings/proxy?level=key&id=account-a", "DELETE"],
    ]);
    expect(JSON.parse(String(writes[0][1]?.body))).toEqual({
      scope: "account",
      scopeId: "account-a",
      proxyId: null,
    });
    expect(onSaved).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("keeps the modal open and reports a rejected assignment removal", async () => {
    const { fetchMock, onSaved, onClose } = await mountModal(500);
    await click("clear");
    expect(container.textContent).toContain("Removal rejected");
    expect(onSaved).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    expect(fetchMock.mock.calls.some(([, init]) => init?.method === "DELETE")).toBe(false);
  });

  it("keeps the modal open if legacy cleanup fails", async () => {
    const { onSaved, onClose } = await mountModal(200, 500);
    await click("clear");
    expect(container.textContent).toContain("Removal rejected");
    expect(onSaved).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("requires confirmation before distributing and allows cancellation", async () => {
    const onDistribute = vi.fn().mockResolvedValue(undefined);
    await act(async () => root.render(<DistributeProxiesButton onDistribute={onDistribute} />));
    await click("Distribute Proxies");
    expect(onDistribute).not.toHaveBeenCalled();
    expect(container.querySelector('[role="dialog"]')).toBeTruthy();
    await click("cancel");
    expect(onDistribute).not.toHaveBeenCalled();
    await click("Distribute Proxies");
    await click("confirmDistribute");
    expect(onDistribute).toHaveBeenCalledOnce();
  });
});
