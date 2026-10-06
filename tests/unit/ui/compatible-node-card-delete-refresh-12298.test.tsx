// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import CompatibleNodeCard from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/CompatibleNodeCard";

const router = vi.hoisted(() => ({
  push: vi.fn(),
  refresh: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => router,
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) => <button onClick={onClick}>{children}</button>,
}));

vi.mock("@/shared/components/ProviderIcon", () => ({
  default: () => null,
}));

function renderCard(container: HTMLDivElement) {
  const root = createRoot(container);
  return root;
}

describe("CompatibleNodeCard provider deletion (#12298)", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    router.push.mockClear();
    router.refresh.mockClear();
    vi.stubGlobal("confirm", vi.fn(() => true));

    container = document.createElement("div");
    document.body.appendChild(container);
    root = renderCard(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  async function clickDelete() {
    await act(async () => {
      root.render(
        <CompatibleNodeCard
          providerId="custom-node"
          providerNode={{ baseUrl: "https://example.test/v1", apiType: "openai" }}
          isCcCompatible={false}
          isAnthropicCompatible={false}
          isAnthropicProtocolCompatible={false}
          gateConnectionFlow={(callback) => callback()}
          openApiKeyAddFlow={vi.fn()}
          onOpenEditNodeModal={vi.fn()}
          t={(key) => key}
        />
      );
    });

    const deleteButton = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "delete"
    );
    expect(deleteButton).toBeDefined();

    await act(async () => {
      deleteButton?.click();
      await Promise.resolve();
      await Promise.resolve();
    });

    return deleteButton;
  }

  it("invalidates the cached providers page after a successful delete and navigation", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true } as Response));

    await clickDelete();

    expect(fetch).toHaveBeenCalledWith("/api/provider-nodes/custom-node", {
      method: "DELETE",
    });
    expect(router.push).toHaveBeenCalledWith("/dashboard/providers");
    expect(router.refresh).toHaveBeenCalledTimes(1);
    expect(router.push.mock.invocationCallOrder[0]).toBeLessThan(
      router.refresh.mock.invocationCallOrder[0]
    );
  });

  it("does not navigate or refresh when the user cancels the confirm dialog", async () => {
    vi.stubGlobal("confirm", vi.fn(() => false));
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true } as Response));

    await clickDelete();

    expect(fetch).not.toHaveBeenCalled();
    expect(router.push).not.toHaveBeenCalled();
    expect(router.refresh).not.toHaveBeenCalled();
  });

  it("does not navigate or refresh when the DELETE response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false } as Response));

    await clickDelete();

    expect(router.push).not.toHaveBeenCalled();
    expect(router.refresh).not.toHaveBeenCalled();
  });

  it("does not navigate or refresh when the DELETE request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    vi.spyOn(console, "error").mockImplementation(() => {});

    await clickDelete();

    expect(router.push).not.toHaveBeenCalled();
    expect(router.refresh).not.toHaveBeenCalled();
  });
});
