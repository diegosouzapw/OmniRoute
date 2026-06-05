/**
 * Tests for the MITM Proxy "page moved" banner (C4).
 * Validates:
 * - Banner renders with pageMoved.title text
 * - "Go now" button triggers router.replace
 * - Auto-redirect is set up via setTimeout
 */
// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

vi.mock("next-intl", () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("MitmProxyMovedPage — page-moved banner (C4)", { timeout: 30000 }, () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers();
    mockReplace.mockClear();
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("renders with pageMoved.title text", async () => {
    const { default: MitmProxyMovedPage } = await import(
      "../../../src/app/(dashboard)/dashboard/system/mitm-proxy/page"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(React.createElement(MitmProxyMovedPage));
    });

    expect(container.textContent).toContain("agentBridge.pageMoved.title");
  });

  it("renders pageMoved.message text", async () => {
    const { default: MitmProxyMovedPage } = await import(
      "../../../src/app/(dashboard)/dashboard/system/mitm-proxy/page"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(React.createElement(MitmProxyMovedPage));
    });

    expect(container.textContent).toContain("agentBridge.pageMoved.message");
  });

  it("clicking goNow button calls router.replace with agent-bridge path", async () => {
    const { default: MitmProxyMovedPage } = await import(
      "../../../src/app/(dashboard)/dashboard/system/mitm-proxy/page"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(React.createElement(MitmProxyMovedPage));
    });

    const goNowBtn = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("agentBridge.pageMoved.goNow")
    );
    expect(goNowBtn).not.toBeNull();

    await act(async () => {
      goNowBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(mockReplace).toHaveBeenCalledWith("/dashboard/tools/agent-bridge");
  });

  it("auto-redirect fires after 2500ms via setTimeout", async () => {
    const { default: MitmProxyMovedPage } = await import(
      "../../../src/app/(dashboard)/dashboard/system/mitm-proxy/page"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(React.createElement(MitmProxyMovedPage));
    });

    // Not yet redirected
    expect(mockReplace).not.toHaveBeenCalled();

    // Advance timers past the 2500ms threshold
    await act(async () => {
      vi.advanceTimersByTime(2600);
    });

    expect(mockReplace).toHaveBeenCalledWith("/dashboard/tools/agent-bridge");
  });
});
