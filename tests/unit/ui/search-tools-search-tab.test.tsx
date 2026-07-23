// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/dynamic", () => ({
  default: (loader: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>) => {
    return function DynamicComponent(props: Record<string, unknown>) {
      const [Comp, setComp] = React.useState<React.ComponentType<Record<string, unknown>> | null>(null);
      React.useEffect(() => {
        loader().then((m) => setComp(() => m.default));
      }, []);
      if (!Comp) return React.createElement("div", { "data-testid": "dyn-loading" });
      return React.createElement(Comp, props);
    };
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) =>
    React.createElement("a", { href, ...props }, children),
}));

// Mock SearchHistory (no-op)
vi.mock(
  "../../../src/app/(dashboard)/dashboard/search-tools/components/SearchHistory",
  () => ({ default: () => React.createElement("div", { "data-testid": "search-history" }) }),
);

// Mock RerankPanel (no-op)
vi.mock(
  "../../../src/app/(dashboard)/dashboard/search-tools/components/RerankPanel",
  () => ({ default: () => React.createElement("div", { "data-testid": "rerank-panel" }) }),
);

// Mock Monaco Editor (to avoid heavy dep in tests)
vi.mock("@/shared/components/MonacoEditor", () => ({
  default: () => React.createElement("div", { "data-testid": "monaco-editor" }),
}));

vi.mock("@/shared/components", () => ({
  Badge: ({ children, ...props }: { children: React.ReactNode }) =>
    React.createElement("span", props, children),
  Select: ({ value, onChange, options }: { value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: { value: string; label: string }[] }) =>
    React.createElement(
      "select",
      { value, onChange },
      options.map((o) => React.createElement("option", { key: o.value, value: o.value }, o.label)),
    ),
  Button: ({ children, onClick, disabled, ...props }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) =>
    React.createElement("button", { onClick, disabled, ...props }, children),
}));

// ── Test fixtures ─────────────────────────────────────────────────────────────

const ACTIVE_PROVIDERS = [
  { id: "serper", name: "Serper", status: "active" as const, cost_per_query: 0.001 },
];

const NO_PROVIDERS: typeof ACTIVE_PROVIDERS = [];

const MOCK_RESPONSE = {
  id: "search-1",
  provider: "serper",
  query: "AI trends",
  results: [
    { title: "AI Trends 2026", url: "https://example.com", snippet: "Latest AI trends" },
  ],
  cached: false,
  usage: { queries_used: 1, search_cost_usd: 0.001 },
  metrics: { response_time_ms: 200, upstream_latency_ms: 180, total_results_available: null },
};

// ── Import components after mocks ─────────────────────────────────────────────

const [{ default: SearchTab }, { default: SearchForm }, { default: ResultsPanel }] =
  await Promise.all([
    import("../../../src/app/(dashboard)/dashboard/search-tools/components/tabs/SearchTab"),
    import("../../../src/app/(dashboard)/dashboard/search-tools/components/SearchForm"),
    import("../../../src/app/(dashboard)/dashboard/search-tools/components/ResultsPanel"),
  ]);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

interface SearchTabTestProps {
  providers?: typeof ACTIVE_PROVIDERS;
}

function renderSearchTab({ providers = ACTIVE_PROVIDERS }: SearchTabTestProps = {}): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      React.createElement(SearchTab, {
        configState: { provider: "auto", searchType: "web", fetchFormat: "markdown", fullPage: false, rerankModel: "" },
        providers,
      }),
    );
  });
  containers.push({ root, el });
  return el;
}

function renderResultsPanel(props: {
  noProvidersConfigured?: boolean;
  response?: typeof MOCK_RESPONSE | null;
  loading?: boolean;
  error?: string;
}): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      React.createElement(ResultsPanel, {
        response: props.response ?? null,
        rawJson: props.response ? JSON.stringify(props.response) : "",
        loading: props.loading ?? false,
        error: props.error ?? "",
        statusCode: props.response ? 200 : 0,
        duration: 100,
        noProvidersConfigured: props.noProvidersConfigured,
      }),
    );
  });
  containers.push({ root, el });
  return el;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("SearchTab", () => {
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

  it("renders search-tab data-testid", () => {
    const el = renderSearchTab();
    expect(el.querySelector("[data-testid='search-tab']")).toBeTruthy();
  });

  it("shows empty state when no response", async () => {
    globalThis.fetch = vi.fn();
    const el = renderResultsPanel({});
    const emptyState = el.querySelector("[data-testid='empty-state']");
    expect(emptyState).toBeTruthy();
  });

  it("shows CTA empty state when no providers configured", () => {
    const el = renderResultsPanel({ noProvidersConfigured: true });
    const cta = el.querySelector("[data-testid='no-providers-cta']");
    expect(cta).toBeTruthy();
    const link = el.querySelector("[data-testid='configure-providers-link']");
    expect(link).toBeTruthy();
    expect(link?.getAttribute("href")).toContain("/dashboard/providers");
  });

  it("does NOT show configure CTA when providers are present", () => {
    const el = renderResultsPanel({ noProvidersConfigured: false });
    expect(el.querySelector("[data-testid='no-providers-cta']")).toBeNull();
    expect(el.querySelector("[data-testid='empty-state']")).toBeTruthy();
  });

  it("shows results when response is present", () => {
    const el = renderResultsPanel({ response: MOCK_RESPONSE });
    // Should show the results section, not the empty state
    expect(el.querySelector("[data-testid='empty-state']")).toBeNull();
    expect(el.querySelector("[data-testid='no-providers-cta']")).toBeNull();
  });

  it("SearchForm renders with provider selector", async () => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    act(() => {
      root.render(
        React.createElement(SearchForm, {
          onSearch: vi.fn(),
          loading: false,
          onCancel: vi.fn(),
          providers: ACTIVE_PROVIDERS,
        }),
      );
    });
    containers.push({ root, el });

    // Should render a select with provider options
    const selects = el.querySelectorAll("select");
    expect(selects.length).toBeGreaterThan(0);
  });

  it("SearchForm with no active providers shows disabled submit", async () => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    act(() => {
      root.render(
        React.createElement(SearchForm, {
          onSearch: vi.fn(),
          loading: false,
          onCancel: vi.fn(),
          providers: NO_PROVIDERS,
        }),
      );
    });
    containers.push({ root, el });

    // The search button should be disabled when no providers
    const buttons = el.querySelectorAll("button");
    const searchBtn = [...buttons].find(
      (b) => b.textContent?.trim() === "search" || b.disabled,
    );
    // At least one button should be disabled when no providers
    const hasDisabled = [...buttons].some((b) => b.disabled);
    expect(hasDisabled).toBe(true);
  });
});

describe("ResultsPanel empty states", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
  });

  it("shows loading spinner when loading=true", () => {
    const el = renderResultsPanel({ loading: true });
    const spinner = el.querySelector(".animate-spin");
    expect(spinner).toBeTruthy();
  });

  it("shows error message when error is set", () => {
    const el = renderResultsPanel({ error: "Provider error occurred" });
    expect(el.textContent).toContain("Provider error occurred");
  });

  it("shows results count in meta bar", () => {
    const el = renderResultsPanel({ response: MOCK_RESPONSE });
    expect(el.textContent).toContain("serper");
  });
});
