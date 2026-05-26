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
  setItem: (k: string, v: string) => {
    lsStore[k] = v;
  },
  removeItem: (k: string) => {
    delete lsStore[k];
  },
  clear: () => {
    for (const k in lsStore) delete lsStore[k];
  },
};
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
  configurable: true,
});

// ── Import component after mocks ─────────────────────────────────────────────

const { default: FreePoolTab } =
  await import("../../src/app/(dashboard)/dashboard/settings/components/proxy/FreePoolTab");

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
  act(() => {
    root.render(<FreePoolTab />);
  });
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
    act(() => {
      first.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(first.getAttribute("aria-pressed")).toBe("false");
  });

  it("clicking a disabled toggle re-enables it", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector("[role='group']") !== null);
    const bar = el.querySelector("[role='group']")!;
    const first = bar.querySelectorAll("button")[0];
    act(() => {
      first.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(first.getAttribute("aria-pressed")).toBe("false");
    act(() => {
      first.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(first.getAttribute("aria-pressed")).toBe("true");
  });

  it("multiple sources can be disabled independently", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector("[role='group']") !== null);
    const buttons = el.querySelector("[role='group']")!.querySelectorAll("button");
    act(() => {
      buttons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    act(() => {
      buttons[2].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(buttons[0].getAttribute("aria-pressed")).toBe("false");
    expect(buttons[1].getAttribute("aria-pressed")).toBe("true"); // second still enabled
    expect(buttons[2].getAttribute("aria-pressed")).toBe("false");
  });

  it("disabled source is persisted in localStorage", async () => {
    const el = renderTab();
    await waitForCondition(() => el.querySelector("[role='group']") !== null);
    const first = el.querySelector("[role='group']")!.querySelectorAll("button")[0];
    act(() => {
      first.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
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
    expect(mockFetch.mock.calls.some(([url]) => String(url).includes("/free-proxies"))).toBe(true);
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
    act(() => {
      first.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

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

// ── Add-to-pool flow (Plan 10 §7 final scenario) ─────────────────────────────

describe("FreePoolTab add-to-pool flow", () => {
  function setupFetchWithRow(item: Record<string, unknown>, stats = defaultStats) {
    const mockFetch = vi.fn((url: string, init?: RequestInit) => {
      const u = String(url);
      if (u.includes("/stats")) return okJson({ stats });
      // Add-to-pool POST: return success + flip inPool flag on the row
      if (u.includes("/add-to-pool") && init?.method === "POST") {
        return okJson({ success: true, alreadyInPool: false });
      }
      // Listing: return our item (refresh after add updates inPool=true)
      return okJson({ items: [{ ...item, inPool: u.includes("?inPool=") ? true : item.inPool }] });
    });
    vi.stubGlobal("fetch", mockFetch);
    return mockFetch;
  }

  it("clicking ⊕ on a row POSTs to /add-to-pool", async () => {
    const row = {
      id: "p-1",
      source: "1proxy",
      host: "1.2.3.4",
      port: 8080,
      type: "http",
      countryCode: "US",
      qualityScore: 80,
      latencyMs: 100,
      inPool: false,
    };
    const mockFetch = setupFetchWithRow(row);
    const el = renderTab();
    await waitForCondition(() => el.querySelector("button[aria-label^='Add ']") !== null);

    const addButton = el.querySelector("button[aria-label^='Add ']") as HTMLButtonElement;
    act(() => {
      addButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitForCondition(() =>
      mockFetch.mock.calls.some(
        ([url, init]) =>
          String(url).includes("/add-to-pool") &&
          (init as RequestInit | undefined)?.method === "POST"
      )
    );

    const addCall = mockFetch.mock.calls.find(
      ([url, init]) =>
        String(url).includes("/add-to-pool") && (init as RequestInit | undefined)?.method === "POST"
    );
    expect(addCall).toBeTruthy();
    expect(String(addCall![0])).toContain("/api/settings/free-proxies/p-1/add-to-pool");
  });

  it("after successful add-to-pool, the row badge flips to 'in pool' (optimistic update)", async () => {
    const row = {
      id: "p-2",
      source: "proxifly",
      host: "5.6.7.8",
      port: 1080,
      type: "socks5",
      countryCode: "DE",
      qualityScore: 70,
      latencyMs: 200,
      inPool: false,
    };
    setupFetchWithRow(row);
    const el = renderTab();
    await waitForCondition(() => el.querySelector("button[aria-label^='Add ']") !== null);

    // Before click: row's ⊕ button is present (item is NOT in the pool yet)
    expect(el.querySelector("button[aria-label^='Add ']")).toBeTruthy();

    const addButton = el.querySelector("button[aria-label^='Add ']") as HTMLButtonElement;
    act(() => {
      addButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // After click: component optimistically flips `inPool` on the row, so the ⊕
    // button is replaced by the "in pool" indicator (no more Add button for p-2).
    await waitForCondition(() => el.querySelector("button[aria-label^='Add 5.6.7.8:']") === null);
  });
});
