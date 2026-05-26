// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Stub localStorage before importing the component
const lsStore: Record<string, string> = {};
const localStorageMock = {
  getItem: (k: string) => lsStore[k] ?? null,
  setItem: (k: string, v: string) => { lsStore[k] = v; },
  removeItem: (k: string) => { delete lsStore[k]; },
  clear: () => { for (const k in lsStore) delete lsStore[k]; },
};
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
  configurable: true,
});

// ── Import component after mocks ─────────────────────────────────────────────

const { default: FreePoolTab } = await import(
  "../../src/app/(dashboard)/dashboard/settings/components/proxy/FreePoolTab"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const defaultStats = { total: 0, inPool: 0, avgQuality: null, lastSyncAt: null };

function okJson(data: unknown) {
  return Promise.resolve({ ok: true, json: () => Promise.resolve(data) } as Response);
}

function setupFetch(items: unknown[] = [], stats = defaultStats) {
  const mockFetch = vi.fn((url: string) => {
    if (String(url).includes("/stats")) return okJson({ stats });
    return okJson({ items });
  });
  vi.stubGlobal("fetch", mockFetch);
  return mockFetch;
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderTab() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => { root.render(<FreePoolTab />); });
  containers.push({ root, el });
  return el;
}

async function waitForCondition(fn: () => boolean, timeoutMs = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitForCondition timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
  setupFetch();
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("FreePoolTab source toggles", () => {
  it("renders a toggle group with exactly 3 buttons", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector("[role='group']") !== null);
    const bar = el.querySelector("[role='group']")!;
    expect(bar).toBeTruthy();
    const buttons = bar.querySelectorAll("button");
    expect(buttons.length).toBe(3);
  });

  it("all toggles start enabled (aria-pressed=true)", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector("[role='group']") !== null);
    const buttons = Array.from(el.querySelector("[role='group']")!.querySelectorAll("button"));
    buttons.forEach((btn) => expect(btn.getAttribute("aria-pressed")).toBe("true"));
  });

  it("clicking a toggle disables it (aria-pressed=false)", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector("[role='group']") !== null);
    const bar = el.querySelector("[role='group']")!;
    const first = bar.querySelectorAll("button")[0];
    act(() => { first.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(first.getAttribute("aria-pressed")).toBe("false");
  });

  it("clicking a disabled toggle re-enables it", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector("[role='group']") !== null);
    const bar = el.querySelector("[role='group']")!;
    const first = bar.querySelectorAll("button")[0];
    act(() => { first.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(first.getAttribute("aria-pressed")).toBe("false");
    act(() => { first.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(first.getAttribute("aria-pressed")).toBe("true");
  });

  it("multiple sources can be disabled independently", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector("[role='group']") !== null);
    const buttons = el.querySelector("[role='group']")!.querySelectorAll("button");
    act(() => { buttons[0].dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    act(() => { buttons[2].dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(buttons[0].getAttribute("aria-pressed")).toBe("false");
    expect(buttons[1].getAttribute("aria-pressed")).toBe("true"); // second still enabled
    expect(buttons[2].getAttribute("aria-pressed")).toBe("false");
  });

  it("disabled source is persisted in localStorage", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector("[role='group']") !== null);
    const first = el.querySelector("[role='group']")!.querySelectorAll("button")[0];
    act(() => { first.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    const stored = JSON.parse(localStorageMock.getItem("freePool.disabledSources") ?? "[]");
    expect(Array.isArray(stored)).toBe(true);
    expect(stored).toContain("1proxy");
  });

  it("button labels are 1proxy, Proxifly, IPLocate", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector("[role='group']") !== null);
    const texts = Array.from(el.querySelector("[role='group']")!.querySelectorAll("button")).map(
      (b) => b.textContent?.trim()
    );
    expect(texts).toContain("1proxy");
    expect(texts).toContain("Proxifly");
    expect(texts).toContain("IPLocate");
  });
});

describe("FreePoolTab data loading", () => {
  it("shows 'No proxies found' message when list is empty", async () => {
    const el = renderTab();
    await waitForCondition(() => el.textContent?.includes("No proxies found") === true);
    expect(el.textContent).toMatch(/No proxies found/i);
  });

  it("calls /api/settings/free-proxies on mount", async () => {
    const mockFetch = setupFetch();
    renderTab();
    await waitForCondition(() =>
      mockFetch.mock.calls.some(([url]) => String(url).includes("/free-proxies"))
    );
    expect(
      mockFetch.mock.calls.some(([url]) => String(url).includes("/free-proxies"))
    ).toBe(true);
  });

  it("calls /api/settings/free-proxies/stats on mount", async () => {
    const mockFetch = setupFetch();
    renderTab();
    await waitForCondition(() =>
      mockFetch.mock.calls.some(([url]) => String(url).includes("/stats"))
    );
    expect(mockFetch.mock.calls.some(([url]) => String(url).includes("/stats"))).toBe(true);
  });

  it("disabling a source re-fetches with sources= filter", async () => {
    const mockFetch = vi.fn((url: string) => {
      if (String(url).includes("/stats")) return okJson({ stats: defaultStats });
      return okJson({ items: [] });
    });
    vi.stubGlobal("fetch", mockFetch);

    const el = renderTab();
    // Wait for initial load
    await waitForCondition(() =>
      mockFetch.mock.calls.some(([url]) => String(url).includes("/free-proxies"))
    );

    const initialCallCount = mockFetch.mock.calls.length;

    const bar = el.querySelector("[role='group']")!;
    const first = bar.querySelectorAll("button")[0]; // disable 1proxy
    act(() => { first.dispatchEvent(new MouseEvent("click", { bubbles: true })); });

    await waitForCondition(() => mockFetch.mock.calls.length > initialCallCount);

    const proxiesCalls = mockFetch.mock.calls
      .slice(initialCallCount)
      .map(([url]) => String(url))
      .filter((u) => u.includes("/free-proxies?") && !u.includes("/stats"));

    expect(proxiesCalls.length).toBeGreaterThan(0);
    expect(proxiesCalls.some((u) => u.includes("sources="))).toBe(true);
  });

  it("displays stats when available", async () => {
    setupFetch([], { total: 7, inPool: 2, avgQuality: null, lastSyncAt: null });
    const el = renderTab();
    await waitForCondition(() => el.textContent?.includes("Total: 7") === true);
    expect(el.textContent).toMatch(/Total: 7/);
    expect(el.textContent).toMatch(/In pool: 2/);
  });
});
