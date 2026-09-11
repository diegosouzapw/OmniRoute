// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const translate = (key: string) => {
      if (key === "pinnedSection") return "Pinned";
      if (key === "pinItem") return "Pin item";
      if (key === "unpinItem") return "Unpin item";
      if (key === "usage") return "Usage";
      if (key === "logs") return "Logs";
      return key;
    };
    translate.has = (key: string) =>
      ["pinnedSection", "pinItem", "unpinItem", "usage", "logs"].includes(key);
    return translate;
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/analytics",
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

describe("Sidebar pinned items shortcut (#pinned-items)", () => {
  let root: Root | undefined;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.clear();
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
    localStorage.clear();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("does not render PINNED section when no items are pinned", async () => {
    const { default: Sidebar } = await import("@/shared/components/Sidebar");
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root!.render(<Sidebar />);
    });

    const headers = Array.from(container.querySelectorAll("span")).map((s) => s.textContent);
    expect(headers).not.toContain("Pinned");
  });

  it("hydrates and renders PINNED section when items are stored in localStorage", async () => {
    localStorage.setItem("sidebar-pinned-items", JSON.stringify(["analytics", "logs"]));

    const { default: Sidebar } = await import("@/shared/components/Sidebar");
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root!.render(<Sidebar />);
    });

    // Pinned section should now appear
    const headers = Array.from(container.querySelectorAll("span")).map((s) => s.textContent);
    expect(headers).toContain("Pinned");

    // The pinned shortcuts should have links to /dashboard/analytics and /dashboard/logs
    const links = Array.from(container.querySelectorAll('a[href="/dashboard/analytics"]'));
    // Since it exists in PINNED and in its original section (ANALYTICS), there should be 2 links
    expect(links.length).toBe(2);
  });

  it("allows pinning and unpinning an item, persisting to localStorage", async () => {
    const { default: Sidebar } = await import("@/shared/components/Sidebar");
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root!.render(<Sidebar />);
    });

    // Expand ANALYTICS if not expanded
    const analyticsHeader = Array.from(container.querySelectorAll('div[role="button"]')).find(
      (el) => el.textContent?.includes("analyticsSection")
    );
    if (analyticsHeader) {
      await act(async () => {
        analyticsHeader.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    }

    // Find the pin button for analytics item
    const pinButtons = Array.from(
      container.querySelectorAll('button[title*="Pin item"], button[aria-label*="Pin item"]')
    );
    expect(pinButtons.length).toBeGreaterThan(0);

    // Click pin on the first item
    await act(async () => {
      pinButtons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // PINNED section should now appear
    const headers = Array.from(container.querySelectorAll("span")).map((s) => s.textContent);
    expect(headers).toContain("Pinned");

    // Check localStorage was updated
    const stored = JSON.parse(localStorage.getItem("sidebar-pinned-items") || "[]");
    expect(stored.length).toBe(1);

    // Now unpin the item by clicking its pin button
    const unpinButtons = Array.from(
      container.querySelectorAll('button[title*="Unpin item"], button[aria-label*="Unpin item"]')
    );
    expect(unpinButtons.length).toBeGreaterThan(0);

    await act(async () => {
      unpinButtons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // PINNED section should disappear
    const headersAfter = Array.from(container.querySelectorAll("span")).map((s) => s.textContent);
    expect(headersAfter).not.toContain("Pinned");
    expect(JSON.parse(localStorage.getItem("sidebar-pinned-items") || "[]")).toEqual([]);
  });

  it("renders pinned shortcuts in collapsed mode", async () => {
    localStorage.setItem("sidebar-pinned-items", JSON.stringify(["analytics"]));

    const { default: Sidebar } = await import("@/shared/components/Sidebar");
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root!.render(<Sidebar collapsed />);
    });

    // In collapsed mode, the link should still exist
    const links = Array.from(container.querySelectorAll('a[href="/dashboard/analytics"]'));
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it("allows collapsing and expanding the PINNED section", async () => {
    localStorage.setItem("sidebar-pinned-items", JSON.stringify(["analytics"]));

    const { default: Sidebar } = await import("@/shared/components/Sidebar");
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root!.render(<Sidebar />);
    });

    // Find the Pinned section header button
    const pinnedHeader = Array.from(container.querySelectorAll('div[role="button"]')).find((el) =>
      el.textContent?.includes("Pinned")
    );
    expect(pinnedHeader).toBeDefined();

    // Click to collapse
    await act(async () => {
      pinnedHeader!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // The shortcut item inside Pinned section should now be collapsed (hidden from DOM)
    // Only 1 link (in Analytics section) remains in DOM
    const linksCollapsed = Array.from(container.querySelectorAll('a[href="/dashboard/analytics"]'));
    expect(linksCollapsed.length).toBe(1);

    // Click to re-expand
    await act(async () => {
      pinnedHeader!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const linksExpanded = Array.from(container.querySelectorAll('a[href="/dashboard/analytics"]'));
    expect(linksExpanded.length).toBe(2);
  });

  it("renders proportional pin icon sizing on nav items and clean text header for PINNED", async () => {
    localStorage.setItem("sidebar-pinned-items", JSON.stringify(["analytics"]));

    const { default: Sidebar } = await import("@/shared/components/Sidebar");
    const container = makeContainer();
    root = createRoot(container);
    await act(async () => {
      root!.render(<Sidebar />);
    });

    // Nav item pin icon should have 13px fontSize (proportional to 14px item label)
    const navPinBtn = container.querySelector(
      'button[title*="Unpin item"], button[aria-label*="Unpin item"]'
    );
    expect(navPinBtn).toBeDefined();
    const navPinIcon = navPinBtn?.querySelector(".material-symbols-outlined");
    expect((navPinIcon as HTMLElement)?.style.fontSize).toBe("13px");

    // Section header PINNED should be clean text without redundant leading icon, consistent with other category headers
    const pinnedHeader = Array.from(container.querySelectorAll('div[role="button"]')).find((el) =>
      el.textContent?.includes("Pinned")
    );
    expect(pinnedHeader).toBeDefined();
    const headerPinIcon = pinnedHeader?.querySelector(
      ".material-symbols-outlined:not(:last-child)"
    );
    expect(headerPinIcon).toBeNull();
  });
});
