// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { SaliencyHeatmap } from "../../../src/app/(dashboard)/dashboard/compression/studio/SaliencyHeatmap.tsx";
import type { CompressionHeatmap } from "../../../open-sse/services/compression/diffHelper.ts";

const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => root.render(ui));
  return container;
}

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});
afterEach(async () => {
  await act(async () => {
    while (roots.length) roots.pop()?.unmount();
  });
  while (containers.length) containers.pop()?.remove();
  document.body.innerHTML = "";
});

describe("SaliencyHeatmap", () => {
  it("returns null when heatmap is undefined", () => {
    const container = mount(<SaliencyHeatmap heatmap={undefined} />);
    expect(container.textContent).toBe("");
  });

  it("renders N token spans with data-score attribute", () => {
    const heatmap: CompressionHeatmap = {
      mode: "ultra",
      tokens: [
        { text: "the", score: 0.1, kept: false },
        { text: " ", score: 0.5, kept: true },
        { text: "quick", score: 0.7, kept: true },
        { text: " ", score: 0.5, kept: true },
        { text: "42", score: 1.0, kept: true },
      ],
    };
    const container = mount(<SaliencyHeatmap heatmap={heatmap} />);
    const spans = container.querySelectorAll("[data-score]");
    expect(spans.length).toBe(5);
  });

  it("token text is visible in the rendered output", () => {
    const heatmap: CompressionHeatmap = {
      mode: "universal",
      tokens: [
        { text: "hello", score: 1, kept: true },
        { text: " ", score: 1, kept: true },
        { text: "world", score: 0, kept: false },
      ],
    };
    const container = mount(<SaliencyHeatmap heatmap={heatmap} />);
    expect(container.textContent).toContain("hello");
    expect(container.textContent).toContain("world");
  });

  it("applies data-kept attribute correctly", () => {
    const heatmap: CompressionHeatmap = {
      mode: "ultra",
      tokens: [
        { text: "removed", score: 0.1, kept: false },
        { text: " ", score: 0.5, kept: true },
        { text: "kept", score: 0.9, kept: true },
      ],
    };
    const container = mount(<SaliencyHeatmap heatmap={heatmap} />);
    const spans = container.querySelectorAll("[data-score]");
    // first span: removed token
    expect(spans[0].getAttribute("data-kept")).toBe("false");
    // third span: kept token
    expect(spans[2].getAttribute("data-kept")).toBe("true");
  });

  it("each span has inline background-color style (gradient coloring)", () => {
    const heatmap: CompressionHeatmap = {
      mode: "ultra",
      tokens: [
        { text: "stopword", score: 0.1, kept: false },
        { text: " ", score: 0.5, kept: true },
        { text: "important", score: 1.0, kept: true },
      ],
    };
    const container = mount(<SaliencyHeatmap heatmap={heatmap} />);
    const spans = container.querySelectorAll<HTMLElement>("[data-score]");
    for (const span of spans) {
      expect(span.style.backgroundColor).toBeTruthy();
    }
  });
});
