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

import type { EdgeProps } from "@xyflow/react";
import { WorkNode } from "@/app/(dashboard)/dashboard/orchestration/nodes/WorkNode";
import { SourceNode } from "@/app/(dashboard)/dashboard/orchestration/nodes/SourceNode";
import { OrchestratorNode } from "@/app/(dashboard)/dashboard/orchestration/nodes/OrchestratorNode";
import { ActivityNode } from "@/app/(dashboard)/dashboard/orchestration/nodes/ActivityNode";
import { OverflowNode } from "@/app/(dashboard)/dashboard/orchestration/nodes/OverflowNode";
import { StatusEdge } from "@/app/(dashboard)/dashboard/orchestration/edges/StatusEdge";

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

describe("orchestration nodes", () => {
  it("WorkNode shows label, state text and an aria-label", () => {
    const data = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "waiting_approval",
      label: "Fix CI",
      sublabel: "devin",
    };
    const { c, cleanup } = render(<WorkNode data={data as never} />);
    expect(c.textContent).toContain("Fix CI");
    expect(c.textContent).toContain("stateWaitingApproval");
    expect(c.querySelector("[aria-label]")).toBeTruthy();
    cleanup();
  });
  it("SourceNode with sourceIssue=error shows the warning marker", () => {
    const data = {
      id: "source:a2a",
      kind: "source",
      source: "a2a",
      label: "A2A",
      sublabel: "error",
      sourceIssue: "error",
    };
    const { c, cleanup } = render(<SourceNode data={data as never} />);
    expect(c.textContent).toContain("⚠");
    cleanup();
  });

  it("SourceNode with sourceIssue=error and a parseable staleSince renders the formatted time in sourceStale", () => {
    const staleSince = "2026-09-01T12:34:56.000Z";
    const data = {
      id: "source:a2a",
      kind: "source",
      source: "a2a",
      label: "A2A",
      sublabel: "error",
      sourceIssue: "error",
      staleSince,
    };
    const { c, cleanup } = render(<SourceNode data={data as never} />);
    // Mocked next-intl `t` returns `${key}:${JSON.stringify(values)}` when values are passed —
    // asserts the component actually forwards `{ since }`, not just the raw key.
    const since = new Date(staleSince).toLocaleTimeString();
    expect(c.textContent).toContain(`sourceStale:${JSON.stringify({ since })}`);
    cleanup();
  });

  it("SourceNode with sourceIssue=error and no staleSince falls back to an em dash", () => {
    const data = {
      id: "source:a2a",
      kind: "source",
      source: "a2a",
      label: "A2A",
      sublabel: "error",
      sourceIssue: "error",
    };
    const { c, cleanup } = render(<SourceNode data={data as never} />);
    expect(c.textContent).toContain(`sourceStale:${JSON.stringify({ since: "—" })}`);
    cleanup();
  });

  it("SourceNode with sourceIssue=error and an unparseable staleSince also falls back to an em dash", () => {
    const data = {
      id: "source:a2a",
      kind: "source",
      source: "a2a",
      label: "A2A",
      sublabel: "error",
      sourceIssue: "error",
      staleSince: "not-a-date",
    };
    const { c, cleanup } = render(<SourceNode data={data as never} />);
    expect(c.textContent).toContain(`sourceStale:${JSON.stringify({ since: "—" })}`);
    cleanup();
  });

  it("all 5 memo'd orchestration node components have a displayName", () => {
    expect(WorkNode.displayName).toBe("WorkNode");
    expect(SourceNode.displayName).toBe("SourceNode");
    expect(OrchestratorNode.displayName).toBe("OrchestratorNode");
    expect(ActivityNode.displayName).toBe("ActivityNode");
    expect(OverflowNode.displayName).toBe("OverflowNode");
  });

  it("OrchestratorNode renders the label as text content and as aria-label", () => {
    const data = { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" };
    const { c, cleanup } = render(<OrchestratorNode data={data as never} />);
    expect(c.textContent).toContain("OmniRoute");
    expect(c.querySelector('[aria-label="OmniRoute"]')).toBeTruthy();
    cleanup();
  });

  it("ActivityNode renders label + sublabel and exposes the label as aria-label", () => {
    const data = {
      id: "cloud-agent:t1:activity",
      kind: "activity",
      source: "cloud-agent",
      label: "npm test",
      sublabel: "command",
    };
    const { c, cleanup } = render(<ActivityNode data={data as never} />);
    expect(c.textContent).toContain("npm test");
    expect(c.textContent).toContain("command");
    expect(c.querySelector('[aria-label="npm test"]')).toBeTruthy();
    cleanup();
  });

  it("OverflowNode renders the overflowMore count in text + aria-label and a badge per non-zero state", () => {
    const data = {
      id: "overflow:cloud-agent",
      kind: "overflow",
      source: "cloud-agent",
      label: "+7 more",
      counts: { running: 5, failed: 2, queued: 0 },
    };
    const { c, cleanup } = render(<OverflowNode data={data as never} />);
    // Mocked next-intl `t` returns `${key}:${JSON.stringify(values)}` — asserts the
    // component forwards the summed total (5 + 2 = 7), not a raw/stale count.
    const expectedText = `overflowMore:${JSON.stringify({ count: 7 })}`;
    expect(c.textContent).toContain(expectedText);
    const labelled = c.querySelector("[aria-label]");
    expect(labelled?.getAttribute("aria-label")).toBe(expectedText);
    // One badge span per state with a non-zero count (running, failed) — queued (0) omitted.
    const badges = Array.from(c.querySelectorAll("div.flex.gap-1 span"));
    expect(badges.length).toBe(2);
    expect(badges.map((b) => b.textContent)).toEqual(["5", "2"]);
    cleanup();
  });

  it("OverflowNode with no counts renders a zero total and no per-state badges", () => {
    const data = { id: "overflow:a2a", kind: "overflow", source: "a2a", label: "+0 more" };
    const { c, cleanup } = render(<OverflowNode data={data as never} />);
    expect(c.textContent).toContain(`overflowMore:${JSON.stringify({ count: 0 })}`);
    expect(c.querySelectorAll("div.flex.gap-1 span").length).toBe(0);
    cleanup();
  });

  it("SourceNode shows a collapse caret + aria-expanded + title reflecting !data.collapsed", () => {
    const expandedData = { id: "source:a2a", kind: "source", source: "a2a", label: "A2A" };
    const r1 = render(<SourceNode data={expandedData as never} />);
    const expandedEl = r1.c.querySelector("[aria-expanded]");
    expect(expandedEl?.getAttribute("aria-expanded")).toBe("true");
    expect(expandedEl?.getAttribute("title")).toBe("sourceCollapse");
    expect(r1.c.textContent).toContain("▾");
    r1.cleanup();

    const collapsedData = { ...expandedData, collapsed: true };
    const r2 = render(<SourceNode data={collapsedData as never} />);
    const collapsedEl = r2.c.querySelector("[aria-expanded]");
    expect(collapsedEl?.getAttribute("aria-expanded")).toBe("false");
    expect(collapsedEl?.getAttribute("title")).toBe("sourceExpand");
    expect(r2.c.textContent).toContain("▸");
    r2.cleanup();
  });
});

describe("StatusEdge", () => {
  const baseProps = {
    id: "e1",
    source: "a",
    target: "b",
    sourceX: 0,
    sourceY: 0,
    targetX: 100,
    targetY: 100,
    sourcePosition: "bottom",
    targetPosition: "top",
  };

  it("data.active renders PARTICLES ellipses, each starting opacity=0 with a paired <set> reveal", () => {
    const props = { ...baseProps, data: { state: "running", active: true, mirror: false } };
    const { c, cleanup } = render(
      <svg>
        <StatusEdge {...(props as unknown as EdgeProps)} />
      </svg>
    );
    const ellipses = c.querySelectorAll("ellipse.orch-edge-particle");
    expect(ellipses.length).toBe(3);
    ellipses.forEach((ellipse) => {
      expect(ellipse.getAttribute("opacity")).toBe("0");
      const set = ellipse.querySelector("set");
      expect(set).toBeTruthy();
      expect(set?.getAttribute("attributeName")).toBe("opacity");
      expect(set?.getAttribute("to")).toBe("1");
      expect(set?.getAttribute("fill")).toBe("freeze");
      expect(ellipse.querySelector("animateMotion")).toBeTruthy();
    });
    cleanup();
  });

  it("without data.active there is no particle ellipse", () => {
    const props = { ...baseProps, data: { state: "succeeded", active: false, mirror: false } };
    const { c, cleanup } = render(
      <svg>
        <StatusEdge {...(props as unknown as EdgeProps)} />
      </svg>
    );
    expect(c.querySelectorAll("ellipse.orch-edge-particle").length).toBe(0);
    cleanup();
  });
});
