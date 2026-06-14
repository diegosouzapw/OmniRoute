// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) =>
    React.createElement("a", { href, ...props }, children),
}));

// Mock next/dynamic to synchronously render the loaded module
vi.mock("next/dynamic", () => ({
  default: (loader: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>) => {
    // Run the loader eagerly. Since modules are already mocked via vi.mock(),
    // the dynamic wrappers will just render the mocked components directly.
    const Loaded = React.lazy(loader as Parameters<typeof React.lazy>[0]);
    function DynamicWrapper(props: Record<string, unknown>) {
      return React.createElement(
        React.Suspense,
        { fallback: React.createElement("div", { "data-testid": "dyn-fallback" }) },
        React.createElement(Loaded, props),
      );
    }
    return DynamicWrapper;
  },
}));

// Mock sub-components
vi.mock(
  "../../../src/app/(dashboard)/dashboard/search-tools/components/SearchToolsTopBar",
  () => ({
    default: ({
      activeTab,
      onTabChange,
      latencyMs,
      costUsd,
    }: {
      activeTab: string;
      onTabChange: (t: string) => void;
      latencyMs?: number | null;
      costUsd?: number | null;
    }) =>
      React.createElement(
        "div",
        {
          "data-testid": "search-tools-topbar",
          "data-active-tab": activeTab,
          "data-latency": latencyMs ?? "",
          "data-cost": costUsd ?? "",
        },
        React.createElement("button", { onClick: () => onTabChange("search"), "data-testid": "tab-search" }, "Search"),
        React.createElement("button", { onClick: () => onTabChange("scrape"), "data-testid": "tab-scrape" }, "Scrape"),
        React.createElement("button", { onClick: () => onTabChange("compare"), "data-testid": "tab-compare" }, "Compare"),
      ),
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/search-tools/components/SearchToolsConfigPane",
  () => ({
    default: ({ config, activeTab }: { config: Record<string, unknown>; activeTab: string }) =>
      React.createElement("div", {
        "data-testid": "config-pane",
        "data-tab": activeTab,
        "data-provider": String(config.provider ?? ""),
      }),
    ConfigState: {},
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/search-tools/components/SearchConceptCard",
  () => ({
    default: () => React.createElement("div", { "data-testid": "search-concept-card" }),
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/search-tools/components/tabs/SearchTab",
  () => ({
    default: () => React.createElement("div", { "data-testid": "search-tab-content" }),
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/search-tools/components/tabs/ScrapeTab",
  () => ({
    default: () => React.createElement("div", { "data-testid": "scrape-tab-content" }),
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/search-tools/components/tabs/CompareTab",
  () => ({
    default: () => React.createElement("div", { "data-testid": "compare-tab-content" }),
  }),
);

// Mock global fetch
globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ providers: [] }),
  } as Response),
);

// ── Import component after mocks ──────────────────────────────────────────────

const { default: SearchToolsClient } = await import(
  "../../../src/app/(dashboard)/dashboard/search-tools/SearchToolsClient"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderClient(): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(React.createElement(SearchToolsClient));
  });
  containers.push({ root, el });
  return el;
}

async function waitFor(fn: () => boolean, ms = 2000): Promise<void> {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > ms) throw new Error("waitFor timed out");
    await act(async () => { await new Promise((r) => setTimeout(r, 30)); });
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("SearchToolsClient (Studio)", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    vi.clearAllMocks();
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ providers: [] }),
      } as Response),
    );
  });

  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
  });

  it("renders the Studio with topbar", () => {
    const el = renderClient();
    expect(el.querySelector("[data-testid='search-tools-studio']")).toBeTruthy();
    expect(el.querySelector("[data-testid='search-tools-topbar']")).toBeTruthy();
  });

  it("renders concept card", () => {
    const el = renderClient();
    expect(el.querySelector("[data-testid='search-concept-card']")).toBeTruthy();
  });

  it("renders config pane", () => {
    const el = renderClient();
    expect(el.querySelector("[data-testid='config-pane']")).toBeTruthy();
  });

  it("defaults to 'search' tab", () => {
    const el = renderClient();
    const topbar = el.querySelector("[data-testid='search-tools-topbar']") as HTMLElement;
    expect(topbar?.getAttribute("data-active-tab")).toBe("search");
  });

  it("shows search tab content after loading", async () => {
    const el = renderClient();
    await waitFor(() => !!el.querySelector("[data-testid='search-tab-content']"));
    expect(el.querySelector("[data-testid='search-tab-content']")).toBeTruthy();
  });

  it("switches to scrape tab when Scrape button clicked", async () => {
    const el = renderClient();
    const scrapeBtn = el.querySelector("[data-testid='tab-scrape']") as HTMLButtonElement;
    act(() => {
      scrapeBtn.click();
    });
    // Config pane data-tab should update immediately
    const topbar = el.querySelector("[data-testid='search-tools-topbar']") as HTMLElement;
    expect(topbar?.getAttribute("data-active-tab")).toBe("scrape");
    // Scrape tab content should appear after lazy load
    await waitFor(() => !!el.querySelector("[data-testid='scrape-tab-content']"));
    expect(el.querySelector("[data-testid='scrape-tab-content']")).toBeTruthy();
    expect(el.querySelector("[data-testid='search-tab-content']")).toBeNull();
  });

  it("switches to compare tab when Compare button clicked", async () => {
    const el = renderClient();
    const compareBtn = el.querySelector("[data-testid='tab-compare']") as HTMLButtonElement;
    act(() => {
      compareBtn.click();
    });
    const topbar = el.querySelector("[data-testid='search-tools-topbar']") as HTMLElement;
    expect(topbar?.getAttribute("data-active-tab")).toBe("compare");
    await waitFor(() => !!el.querySelector("[data-testid='compare-tab-content']"));
    expect(el.querySelector("[data-testid='compare-tab-content']")).toBeTruthy();
    expect(el.querySelector("[data-testid='search-tab-content']")).toBeNull();
  });

  it("config pane persists across tab switches", async () => {
    const el = renderClient();
    const scrapeBtn = el.querySelector("[data-testid='tab-scrape']") as HTMLButtonElement;
    act(() => {
      scrapeBtn.click();
    });
    expect(el.querySelector("[data-testid='config-pane']")).toBeTruthy();

    const compareBtn = el.querySelector("[data-testid='tab-compare']") as HTMLButtonElement;
    act(() => {
      compareBtn.click();
    });
    expect(el.querySelector("[data-testid='config-pane']")).toBeTruthy();
  });

  it("config pane data-tab updates when tab switches", () => {
    const el = renderClient();
    const scrapeBtn = el.querySelector("[data-testid='tab-scrape']") as HTMLButtonElement;
    act(() => {
      scrapeBtn.click();
    });
    const configPane = el.querySelector("[data-testid='config-pane']") as HTMLElement;
    expect(configPane?.getAttribute("data-tab")).toBe("scrape");
  });

  it("config pane data-tab is compare after switching to compare", () => {
    const el = renderClient();
    const compareBtn = el.querySelector("[data-testid='tab-compare']") as HTMLButtonElement;
    act(() => {
      compareBtn.click();
    });
    const configPane = el.querySelector("[data-testid='config-pane']") as HTMLElement;
    expect(configPane?.getAttribute("data-tab")).toBe("compare");
  });
});
