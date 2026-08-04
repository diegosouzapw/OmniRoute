// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Skip CloudSyncStatus entirely (it polls /api/sync/cloud + uses next/navigation's
// useRouter, which we don't otherwise need to mock for this component).
process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const translate = (key: string) => key;
    translate.has = () => false;
    return translate;
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/combos",
}));

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

function jsonResponse(body: unknown) {
  return { ok: true, status: 200, json: async () => body } as Response;
}

describe("Sidebar search/filter (#4013)", () => {
  let root: Root | undefined;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (String(url).includes("/api/settings")) return jsonResponse({});
        return jsonResponse({});
      })
    );
  });

  afterEach(() => {
    if (root) {
      act(() => root!.unmount());
      root = undefined;
    }
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("renders a search input at the top of the expanded sidebar", async () => {
    // First import in this file pays the one-time cost of compiling Sidebar's
    // large transitive dependency graph (sidebarVisibility sections, icons, etc).
    const { default: Sidebar } = await import("@/shared/components/Sidebar");
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root!.render(<Sidebar />);
    });

    const input = container.querySelector('input[type="search"]');
    expect(input).toBeTruthy();
  }, 20000);

  it("filters visible nav items down to those matching the typed query", async () => {
    const { default: Sidebar } = await import("@/shared/components/Sidebar");
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root!.render(<Sidebar />);
    });

    const linksBefore = container.querySelectorAll("nav a");
    expect(linksBefore.length).toBeGreaterThan(1);

    const input = container.querySelector('input[type="search"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    const nativeSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    )!.set!;

    await act(async () => {
      nativeSetter.call(input, "zzz-no-such-nav-item-zzz");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });

    const linksAfterNoMatch = container.querySelectorAll("nav a");
    expect(linksAfterNoMatch.length).toBe(0);
    expect(container.querySelector("nav")?.textContent).toBeTruthy();

    await act(async () => {
      nativeSetter.call(input, "");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });

    const linksAfterClear = container.querySelectorAll("nav a");
    expect(linksAfterClear.length).toBe(linksBefore.length);
  });
});
