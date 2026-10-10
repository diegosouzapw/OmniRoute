// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";
import { FlowCanvas } from "@/shared/components/flow/FlowCanvas";

beforeAll(() => {
  // ReactFlow relies on ResizeObserver, which jsdom does not implement.
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const mountedRoots: Array<{ container: HTMLElement; root: Root }> = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  mountedRoots.push({ container, root });
  act(() => {
    root.render(ui);
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

function cleanupMountedRoots() {
  while (mountedRoots.length > 0) {
    const { root, container } = mountedRoots.pop()!;
    act(() => {
      root.unmount();
    });
    container.remove();
  }
  document.body.innerHTML = "";
}

afterEach(cleanupMountedRoots);

const nodes = [
  { id: "a", position: { x: 0, y: 0 }, data: { label: "A" } },
  { id: "b", position: { x: 120, y: 0 }, data: { label: "B" } },
];
const edges = [{ id: "a-b", source: "a", target: "b" }];

describe("FlowCanvas (U0 — shared ReactFlow wrapper)", () => {
  it("cleans up React effects and timers before removing mounted containers", () => {
    vi.useFakeTimers();
    const cleanedUp = vi.fn();
    function LifecycleProbe() {
      React.useEffect(() => {
        const timer = setTimeout(() => {}, 1000);
        return () => {
          clearTimeout(timer);
          cleanedUp();
        };
      }, []);
      return <div>mounted</div>;
    }
    try {
      const container = mount(<LifecycleProbe />);
      expect(container.isConnected).toBe(true);
      expect(cleanedUp).not.toHaveBeenCalled();
      cleanupMountedRoots();
      expect(cleanedUp).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
      expect(container.isConnected).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it("renders the canvas with Controls and hides the attribution", () => {
    const container = mount(<FlowCanvas nodes={nodes} edges={edges} fitKey="x" />);
    expect(container.querySelector(".react-flow.omniroute-flow")).toBeTruthy();
    expect(container.querySelector(".react-flow__controls")).toBeTruthy();
    // proOptions.hideAttribution => the attribution element must not render.
    expect(container.querySelector(".react-flow__attribution")).toBeNull();
  });

  it("applies the provided container className for sizing/theming", () => {
    const container = mount(
      <FlowCanvas nodes={nodes} edges={edges} className="omni-test-canvas h-[300px]" />
    );
    expect(container.querySelector(".omni-test-canvas")).toBeTruthy();
  });

  it("themes controls through React Flow variables so library shorthands cannot override them", () => {
    const css = readFileSync(resolve("src/app/globals.css"), "utf8");

    expect(css).toContain(".react-flow.omniroute-flow");
    expect(css).toContain("--xy-controls-button-background-color: var(--color-surface)");
    expect(css).toContain("--xy-controls-button-color: var(--color-text-main)");
    expect(css).toContain("--xy-controls-button-border-color: var(--color-border)");
  });
});
