// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SearchProviderCatalogItem } from "../../../src/shared/schemas/searchTools";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) =>
    React.createElement("a", { href, ...props }, children),
}));

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makeSearchProvider(id: string, status: SearchProviderCatalogItem["status"] = "configured"): SearchProviderCatalogItem {
  return {
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    kind: "search",
    costPerQuery: 0.001,
    freeMonthlyQuota: 100,
    searchTypes: ["web", "news"],
    status,
    configureHref: "/dashboard/providers",
  };
}

function makeFetchProvider(id: string, status: SearchProviderCatalogItem["status"] = "configured"): SearchProviderCatalogItem {
  return {
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    kind: "fetch",
    costPerQuery: 0.0005,
    freeMonthlyQuota: 500,
    fetchFormats: ["markdown", "html", "text"],
    status,
    configureHref: "/dashboard/providers",
  };
}

const SEARCH_PROVIDERS: SearchProviderCatalogItem[] = [
  "serper", "bing", "google", "brave", "tavily", "exa",
  "you", "kagi", "searxng", "duckduckgo", "perplexity", "jina-search",
].map((id) => makeSearchProvider(id));

const FETCH_PROVIDERS: SearchProviderCatalogItem[] = [
  "firecrawl", "jina-reader", "tavily-search",
].map((id) => makeFetchProvider(id));

const ALL_PROVIDERS = [...SEARCH_PROVIDERS, ...FETCH_PROVIDERS];

// ── Import component after mocks ──────────────────────────────────────────────

const { default: ProviderCatalog } = await import(
  "../../../src/app/(dashboard)/dashboard/search-tools/components/ProviderCatalog"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderCatalog(fetchResp: { providers: SearchProviderCatalogItem[] } = { providers: ALL_PROVIDERS }): HTMLDivElement {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fetchResp),
    } as Response),
  );

  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(React.createElement(ProviderCatalog));
  });
  containers.push({ root, el });
  return el;
}

async function waitForCatalog(el: HTMLDivElement): Promise<void> {
  const start = Date.now();
  while (!el.querySelector("[data-testid='provider-catalog']")) {
    if (Date.now() - start > 3000) throw new Error("Catalog did not load");
    await act(async () => {
      await new Promise((r) => setTimeout(r, 30));
    });
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ProviderCatalog", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("shows loading state initially", () => {
    const el = renderCatalog();
    expect(el.querySelector("[data-testid='catalog-loading']")).toBeTruthy();
  });

  it("renders 12 search + 3 fetch providers after load", async () => {
    const el = renderCatalog();
    await waitForCatalog(el);

    const cards = el.querySelectorAll("[data-testid^='provider-card-']");
    expect(cards.length).toBe(15);

    const searchCards = [...cards].filter((c) =>
      SEARCH_PROVIDERS.some((p) => c.getAttribute("data-testid") === `provider-card-${p.id}`),
    );
    const fetchCards = [...cards].filter((c) =>
      FETCH_PROVIDERS.some((p) => c.getAttribute("data-testid") === `provider-card-${p.id}`),
    );
    expect(searchCards.length).toBe(12);
    expect(fetchCards.length).toBe(3);
  });

  it("renders 'configured' status badge for configured providers", async () => {
    const el = renderCatalog({
      providers: [makeSearchProvider("serper", "configured")],
    });
    await waitForCatalog(el);

    const badge = el.querySelector("[data-testid='status-configured']");
    expect(badge).toBeTruthy();
  });

  it("renders 'missing' status badge for unconfigured providers", async () => {
    const el = renderCatalog({
      providers: [makeSearchProvider("serper", "missing")],
    });
    await waitForCatalog(el);

    const badge = el.querySelector("[data-testid='status-missing']");
    expect(badge).toBeTruthy();
  });

  it("renders 'rate_limited' status badge", async () => {
    const el = renderCatalog({
      providers: [makeSearchProvider("serper", "rate_limited")],
    });
    await waitForCatalog(el);

    const badge = el.querySelector("[data-testid='status-rate-limited']");
    expect(badge).toBeTruthy();
  });

  it("renders configure link for missing providers", async () => {
    const el = renderCatalog({
      providers: [makeSearchProvider("serper", "missing")],
    });
    await waitForCatalog(el);

    const link = el.querySelector("[data-testid='configure-link-serper']");
    expect(link).toBeTruthy();
    expect(link?.getAttribute("href")).toContain("/dashboard/providers");
  });

  it("filter 'search' shows only search providers", async () => {
    const el = renderCatalog();
    await waitForCatalog(el);

    const searchFilterBtn = el.querySelector("[data-testid='filter-search']") as HTMLButtonElement;
    act(() => {
      searchFilterBtn.click();
    });

    const cards = el.querySelectorAll("[data-testid^='provider-card-']");
    expect(cards.length).toBe(12);
  });

  it("filter 'fetch' shows only fetch providers", async () => {
    const el = renderCatalog();
    await waitForCatalog(el);

    const fetchFilterBtn = el.querySelector("[data-testid='filter-fetch']") as HTMLButtonElement;
    act(() => {
      fetchFilterBtn.click();
    });

    const cards = el.querySelectorAll("[data-testid^='provider-card-']");
    expect(cards.length).toBe(3);
  });

  it("shows error state when fetch fails", async () => {
    globalThis.fetch = vi.fn(() => Promise.reject(new Error("Network failure")));
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    act(() => {
      root.render(React.createElement(ProviderCatalog));
    });
    containers.push({ root, el });

    const start = Date.now();
    while (!el.querySelector("[data-testid='catalog-error']")) {
      if (Date.now() - start > 3000) throw new Error("Error state did not appear");
      await act(async () => {
        await new Promise((r) => setTimeout(r, 30));
      });
    }

    expect(el.querySelector("[data-testid='catalog-error']")).toBeTruthy();
  });
});
