// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (k: string, v?: Record<string, unknown>) =>
    v ? `${k}:${JSON.stringify(v)}` : k,
}));

const replaceMock = vi.fn();
const searchState = { current: "tab=overview" };
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(searchState.current),
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => "/dashboard/orchestration",
}));

const DEFAULT_SNAPSHOT = {
  nodes: [{ id: "orchestrator", kind: "orchestrator", label: "OmniRoute" }],
  edges: [],
  sources: [],
  generatedAt: "x",
};
let snapshot: typeof DEFAULT_SNAPSHOT = DEFAULT_SNAPSHOT;
const setShowCompletedMock = vi.fn();
const refetchMock = vi.fn();
vi.mock("@/app/(dashboard)/dashboard/orchestration/hooks/useOrchestrationSnapshot", () => ({
  useOrchestrationSnapshot: () => ({
    snapshot,
    isLoading: false,
    showCompleted: false,
    setShowCompleted: setShowCompletedMock,
    refetch: refetchMock,
  }),
}));

vi.mock("@/hooks/useLiveDashboard", () => ({
  useLiveComboStatus: () => ({
    comboEvents: [],
    activeCombos: new Set<string>(),
    isConnected: true,
  }),
}));

vi.mock("@/hooks/useProviderBreakerHealth", () => ({
  useProviderBreakerHealth: () => ({ providerHealth: {}, connectionHealth: {} }),
}));

const agentsTabCalls: Record<string, unknown>[] = [];
vi.mock("@/app/(dashboard)/dashboard/orchestration/tabs/AgentsTab", () => ({
  AgentsTab: (props: Record<string, unknown>) => {
    agentsTabCalls.push(props);
    return <div data-testid="agents-tab-stub" />;
  },
}));
vi.mock("@/app/(dashboard)/dashboard/orchestration/tabs/RoutingTab", () => ({
  RoutingTab: () => <div data-testid="routing-tab-stub" />,
}));
const overviewTabCalls: Record<string, unknown>[] = [];
vi.mock("@/app/(dashboard)/dashboard/orchestration/tabs/OverviewTab", () => ({
  OverviewTab: (props: Record<string, unknown>) => {
    overviewTabCalls.push(props);
    return <div data-testid="overview-tab-stub" />;
  },
}));

const drawerCalls: Record<string, unknown>[] = [];
vi.mock("@/app/(dashboard)/dashboard/orchestration/drawer/OrchestrationDrawer", () => ({
  OrchestrationDrawer: (props: Record<string, unknown>) => {
    drawerCalls.push(props);
    return <div data-testid="drawer-stub" />;
  },
}));

// HistoryTab fetches its own data on mount (see tests/unit/ui/orchestrationHistoryTab.test.tsx
// for that behavior) — stubbed here so this page-level suite stays about URL/tab wiring only.
vi.mock("@/app/(dashboard)/dashboard/orchestration/tabs/HistoryTab", () => ({
  HistoryTab: () => <div data-testid="history-tab-stub" />,
}));

import OrchestrationPageClient from "@/app/(dashboard)/dashboard/orchestration/OrchestrationPageClient";

function render(el: React.ReactElement) {
  const c = document.createElement("div");
  document.body.appendChild(c);
  const root = createRoot(c);
  act(() => root.render(el));
  return {
    c,
    cleanup: () => {
      act(() => root.unmount());
      c.remove();
    },
  };
}
afterEach(() => {
  document.body.innerHTML = "";
  replaceMock.mockClear();
  searchState.current = "tab=overview";
  snapshot = DEFAULT_SNAPSHOT;
  agentsTabCalls.length = 0;
  overviewTabCalls.length = 0;
  drawerCalls.length = 0;
});

describe("OrchestrationPageClient", () => {
  it("renders the tab selected by the URL (?tab=overview)", () => {
    const { c, cleanup } = render(<OrchestrationPageClient />);
    expect(c.querySelector('[data-testid="overview-tab-stub"]')).toBeTruthy();
    expect(c.querySelector('[data-testid="agents-tab-stub"]')).toBeFalsy();
    expect(c.querySelector('[data-testid="routing-tab-stub"]')).toBeFalsy();
    cleanup();
  });

  it("clicking the Agents tab button pushes ?tab=agents via router.replace", () => {
    const { c, cleanup } = render(<OrchestrationPageClient />);
    const agentsTabButton = Array.from(c.querySelectorAll('[role="tab"]')).find(
      (el) => el.textContent === "tabAgents"
    ) as HTMLButtonElement;
    expect(agentsTabButton).toBeTruthy();
    act(() => {
      agentsTabButton.click();
    });
    expect(replaceMock).toHaveBeenCalledTimes(1);
    const [url, opts] = replaceMock.mock.calls[0];
    expect(url).toContain("tab=agents");
    expect(opts).toEqual({ scroll: false });
    cleanup();
  });

  it("?q=login filters the snapshot passed to OverviewTab down to matching work nodes", () => {
    snapshot = {
      nodes: [
        { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" },
        {
          id: "cloud-agent:1",
          kind: "work",
          source: "cloud-agent",
          state: "running",
          label: "login flow fix",
        },
        {
          id: "a2a:2",
          kind: "work",
          source: "a2a",
          state: "failed",
          label: "unrelated task",
        },
      ],
      edges: [],
      sources: [],
      generatedAt: "x",
    } as never;
    searchState.current = "tab=overview&q=login";
    const { cleanup } = render(<OrchestrationPageClient />);
    const lastProps = overviewTabCalls.at(-1) as { snapshot: typeof DEFAULT_SNAPSHOT };
    const ids = lastProps.snapshot.nodes.map((n) => n.id);
    expect(ids).toContain("cloud-agent:1");
    expect(ids).not.toContain("a2a:2");
    cleanup();
  });

  it("clicking a state chip in the toolbar sets ?state= via router.replace", () => {
    searchState.current = "tab=agents";
    const { c, cleanup } = render(<OrchestrationPageClient />);
    const runningChip = Array.from(c.querySelectorAll("button")).find(
      (el) => el.textContent === "stateRunning"
    ) as HTMLButtonElement;
    expect(runningChip).toBeTruthy();
    act(() => {
      runningChip.click();
    });
    expect(replaceMock).toHaveBeenCalledTimes(1);
    const [url] = replaceMock.mock.calls[0];
    expect(url).toContain("state=running");
    cleanup();
  });

  it("toggling a collapse from AgentsTab writes ?collapsed= via router.replace", () => {
    searchState.current = "tab=agents";
    const { cleanup } = render(<OrchestrationPageClient />);
    const props = agentsTabCalls.at(-1) as { onToggleCollapse: (s: string) => void };
    act(() => {
      props.onToggleCollapse("a2a");
    });
    expect(replaceMock).toHaveBeenCalledTimes(1);
    const [url] = replaceMock.mock.calls[0];
    expect(url).toContain("collapsed=a2a");
    cleanup();
  });

  it("shows a clear-filters button only when the filter is non-empty, and it resets q/state/source/provider", () => {
    searchState.current = "tab=agents";
    const r1 = render(<OrchestrationPageClient />);
    expect(
      Array.from(r1.c.querySelectorAll("button")).find((el) => el.textContent === "clearFilters")
    ).toBeFalsy();
    r1.cleanup();

    searchState.current =
      "tab=agents&q=login&state=running&source=a2a&provider=devin&collapsed=a2a";
    const r2 = render(<OrchestrationPageClient />);
    const clearButton = Array.from(r2.c.querySelectorAll("button")).find(
      (el) => el.textContent === "clearFilters"
    ) as HTMLButtonElement;
    expect(clearButton).toBeTruthy();
    act(() => {
      clearButton.click();
    });
    expect(replaceMock).toHaveBeenCalledTimes(1);
    const [url] = replaceMock.mock.calls[0];
    expect(url).not.toContain("q=");
    expect(url).not.toContain("state=");
    expect(url).not.toContain("source=");
    expect(url).not.toContain("provider=");
    expect(url).toContain("collapsed=a2a");
    r2.cleanup();
  });

  it("?node=<id> opens the drawer with the matching node; removing the param closes it", () => {
    snapshot = {
      nodes: [
        { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" },
        {
          id: "cloud-agent:1",
          kind: "work",
          source: "cloud-agent",
          state: "running",
          label: "task A",
        },
      ],
      edges: [],
      sources: [],
      generatedAt: "x",
    } as never;

    searchState.current = "tab=agents&node=cloud-agent:1";
    const r1 = render(<OrchestrationPageClient />);
    expect((drawerCalls.at(-1) as { node: { id: string } | null }).node?.id).toBe("cloud-agent:1");
    r1.cleanup();

    searchState.current = "tab=agents";
    const r2 = render(<OrchestrationPageClient />);
    expect((drawerCalls.at(-1) as { node: { id: string } | null }).node).toBeNull();
    r2.cleanup();
  });

  it("clicking an overflow node (via AgentsTab's onNodeClick) navigates to ?tab=overview and clears ?node", () => {
    searchState.current = "tab=agents&node=cloud-agent:1";
    const { cleanup } = render(<OrchestrationPageClient />);
    const props = agentsTabCalls.at(-1) as { onNodeClick: (id: string) => void };
    act(() => {
      props.onNodeClick("overflow:cloud-agent");
    });
    expect(replaceMock).toHaveBeenCalledTimes(1);
    const [url] = replaceMock.mock.calls[0];
    expect(url).toContain("tab=overview");
    expect(url).not.toContain("node=");
    cleanup();
  });

  it("switching to the History tab while ?node= is set clears the param and does not render the page-level drawer", () => {
    snapshot = {
      nodes: [
        { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" },
        {
          id: "cloud-agent:1",
          kind: "work",
          source: "cloud-agent",
          state: "running",
          label: "task A",
        },
      ],
      edges: [],
      sources: [],
      generatedAt: "x",
    } as never;

    searchState.current = "tab=agents&node=cloud-agent:1";
    const { c, cleanup } = render(<OrchestrationPageClient />);
    // Sanity: the page-level drawer is up before switching, open on the selected node.
    expect((drawerCalls.at(-1) as { node: { id: string } | null }).node?.id).toBe(
      "cloud-agent:1"
    );

    const historyTabButton = Array.from(c.querySelectorAll('[role="tab"]')).find(
      (el) => el.textContent === "tabHistory"
    ) as HTMLButtonElement;
    expect(historyTabButton).toBeTruthy();
    act(() => {
      historyTabButton.click();
    });

    expect(replaceMock).toHaveBeenCalledTimes(1);
    const [url] = replaceMock.mock.calls[0];
    expect(url).toContain("tab=history");
    expect(url).not.toContain("node=");
    cleanup();
  });

  it("?tab=history (including a deep link with ?node= still present) never renders the page-level drawer", () => {
    const drawerCallsBefore = drawerCalls.length;
    searchState.current = "tab=history&node=cloud-agent:1";
    const { c, cleanup } = render(<OrchestrationPageClient />);
    expect(c.querySelector('[data-testid="history-tab-stub"]')).toBeTruthy();
    expect(c.querySelector('[data-testid="drawer-stub"]')).toBeFalsy();
    expect(drawerCalls.length).toBe(drawerCallsBefore);
    cleanup();
  });
});
