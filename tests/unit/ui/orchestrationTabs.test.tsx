// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeAll, afterEach, vi } from "vitest";

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});
vi.mock("@xyflow/react", async () => {
  const actual = (await vi.importActual("@xyflow/react")) as Record<string, unknown>;
  return { ...actual, Handle: () => null, Position: { Top: "top", Bottom: "bottom" } };
});
vi.mock("next-intl", () => ({
  useTranslations: () => (k: string, v?: Record<string, unknown>) =>
    v ? `${k}:${JSON.stringify(v)}` : k,
}));

const flowProps: Record<string, unknown>[] = [];
vi.mock("@/shared/components/flow/FlowCanvas", () => ({
  FlowCanvas: (props: Record<string, unknown>) => {
    flowProps.push(props);
    return <div data-testid="flow-canvas" />;
  },
}));
vi.mock("@/app/(dashboard)/dashboard/combos/live/ComboLiveStudio", () => ({
  ComboLiveStudio: () => <div data-testid="combo-live-studio" />,
}));

import { AgentsTab } from "@/app/(dashboard)/dashboard/orchestration/tabs/AgentsTab";
import { OverviewTab } from "@/app/(dashboard)/dashboard/orchestration/tabs/OverviewTab";
import { RoutingTab } from "@/app/(dashboard)/dashboard/orchestration/tabs/RoutingTab";

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
});

describe("AgentsTab", () => {
  it("feeds FlowCanvas with converted nodes and a stable fitKey; empty snapshot shows CTAs", () => {
    const snap = {
      nodes: [{ id: "orchestrator", kind: "orchestrator", label: "OmniRoute" }],
      edges: [],
      sources: [],
      generatedAt: "x",
    };
    const { c, cleanup } = render(
      <AgentsTab
        snapshot={snap as never}
        onNodeClick={() => {}}
        showCompleted={false}
        onToggleCompleted={() => {}}
      />
    );
    expect(c.textContent).toContain("emptyTitle"); // only the root → empty state, no canvas
    cleanup();
    const withWork = {
      ...snap,
      nodes: [
        ...snap.nodes,
        { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" },
      ],
    };
    const r2 = render(
      <AgentsTab
        snapshot={withWork as never}
        onNodeClick={() => {}}
        showCompleted={false}
        onToggleCompleted={() => {}}
      />
    );
    expect(r2.c.querySelector('[data-testid="flow-canvas"]')).toBeTruthy();
    expect(flowProps.at(-1)?.fitKey).toBe("a2a:1");
    expect(r2.c.querySelector(".orchestration-canvas")).toBeTruthy();
    r2.cleanup();
  });

  it("passes the collapsed set to orchestrationToFlow, dropping that source's work nodes", () => {
    const snap = {
      nodes: [
        { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" },
        { id: "source:a2a", kind: "source", source: "a2a", label: "A2A" },
        { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "a2a task" },
        {
          id: "cloud-agent:1",
          kind: "work",
          source: "cloud-agent",
          state: "running",
          label: "ca task",
        },
      ],
      edges: [],
      sources: [],
      generatedAt: "x",
    };
    const { cleanup } = render(
      <AgentsTab
        snapshot={snap as never}
        onNodeClick={() => {}}
        showCompleted={false}
        onToggleCompleted={() => {}}
        collapsed={new Set(["a2a"])}
        onToggleCollapse={() => {}}
      />
    );
    const nodes = flowProps.at(-1)?.nodes as Array<{ id: string }>;
    expect(nodes.some((n) => n.id === "a2a:1")).toBe(false);
    expect(nodes.some((n) => n.id === "cloud-agent:1")).toBe(true);
    cleanup();
  });

  it("clicking a source node calls onToggleCollapse with its source, not onNodeClick", () => {
    const toggle = vi.fn();
    const onNodeClick = vi.fn();
    const snap = {
      nodes: [
        { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" },
        { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "a2a task" },
      ],
      edges: [],
      sources: [],
      generatedAt: "x",
    };
    const { cleanup } = render(
      <AgentsTab
        snapshot={snap as never}
        onNodeClick={onNodeClick}
        showCompleted={false}
        onToggleCompleted={() => {}}
        collapsed={new Set()}
        onToggleCollapse={toggle}
      />
    );
    const handleClick = flowProps.at(-1)?.onNodeClick as (e: unknown, node: unknown) => void;
    handleClick(undefined, { id: "source:a2a", type: "source", data: { source: "a2a" } });
    expect(toggle).toHaveBeenCalledWith("a2a");
    expect(onNodeClick).not.toHaveBeenCalled();
    cleanup();
  });

  it("clicking the orchestrator node is a no-op — neither onNodeClick nor onToggleCollapse fires", () => {
    const toggle = vi.fn();
    const onNodeClick = vi.fn();
    const snap = {
      nodes: [
        { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" },
        { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "a2a task" },
      ],
      edges: [],
      sources: [],
      generatedAt: "x",
    };
    const { cleanup } = render(
      <AgentsTab
        snapshot={snap as never}
        onNodeClick={onNodeClick}
        showCompleted={false}
        onToggleCompleted={() => {}}
        collapsed={new Set()}
        onToggleCollapse={toggle}
      />
    );
    const handleClick = flowProps.at(-1)?.onNodeClick as (e: unknown, node: unknown) => void;
    handleClick(undefined, { id: "orchestrator", type: "orchestrator", data: {} });
    expect(toggle).not.toHaveBeenCalled();
    expect(onNodeClick).not.toHaveBeenCalled();
    cleanup();
  });

  it("toggling the showCompleted checkbox calls onToggleCompleted with the new checked value", () => {
    const onToggleCompleted = vi.fn();
    const snap = {
      nodes: [
        { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" },
        { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "a2a task" },
      ],
      edges: [],
      sources: [],
      generatedAt: "x",
    };
    const { c, cleanup } = render(
      <AgentsTab
        snapshot={snap as never}
        onNodeClick={() => {}}
        showCompleted={false}
        onToggleCompleted={onToggleCompleted}
      />
    );
    const checkbox = c.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).toBeTruthy();
    expect(checkbox.checked).toBe(false);
    act(() => {
      // React listens to the native "click" event for checkboxes to trigger the
      // synthetic onChange (same pattern as engineConfigForm.test.tsx).
      checkbox.click();
    });
    expect(onToggleCompleted).toHaveBeenCalledWith(true);
    cleanup();
  });
});

describe("OverviewTab", () => {
  const snap = {
    nodes: [
      { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" },
      {
        id: "cloud-agent:1",
        kind: "work",
        source: "cloud-agent",
        state: "running",
        label: "task A",
      },
      {
        id: "a2a:2",
        kind: "work",
        source: "a2a",
        state: "failed",
        label: "task B",
        updatedAt: "2026-08-30T11:00:00Z",
      },
    ],
    edges: [],
    sources: [],
    generatedAt: "x",
  };
  it("renders per-state counters and kanban cards; card click bubbles the node id", () => {
    let clicked = "";
    const { c, cleanup } = render(
      <OverviewTab
        snapshot={snap as never}
        comboEvents={[]}
        onCardClick={(id) => {
          clicked = id;
        }}
        onSeeInGraph={() => {}}
      />
    );
    expect(c.textContent).toContain("stateRunning");
    expect(c.textContent).toContain("task A");
    const card = Array.from(c.querySelectorAll("[data-orch-card]")).find((el) =>
      el.textContent?.includes("task A")
    );
    act(() => {
      (card as HTMLElement).click();
    });
    expect(clicked).toBe("cloud-agent:1");
    cleanup();
  });
  it("formatElapsed guards against an unparseable startedAt and renders an em dash", () => {
    const snapBadStart = {
      ...snap,
      nodes: [
        ...snap.nodes,
        {
          id: "a2a:bad",
          kind: "work",
          source: "a2a",
          state: "running",
          label: "task bad start",
          startedAt: "not-a-date",
        },
      ],
    };
    const { c, cleanup } = render(
      <OverviewTab
        snapshot={snapBadStart as never}
        comboEvents={[]}
        onCardClick={() => {}}
        onSeeInGraph={() => {}}
      />
    );
    const card = Array.from(c.querySelectorAll("[data-orch-card]")).find((el) =>
      el.textContent?.includes("task bad start")
    );
    expect(card?.textContent).toContain("—");
    cleanup();
  });
});

describe("RoutingTab", () => {
  it("renders ComboLiveStudio with the props received", () => {
    const { c, cleanup } = render(
      <RoutingTab
        comboEvents={[]}
        combos={[]}
        isConnected={false}
        providerHealth={{}}
        connectionHealth={{}}
      />
    );
    expect(c.querySelector('[data-testid="combo-live-studio"]')).toBeTruthy();
    cleanup();
  });
});
