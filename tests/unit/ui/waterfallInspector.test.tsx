// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { CompressionRunModel } from "@/app/(dashboard)/dashboard/compression/studio/compressionFlowModel";

// ── Import ─────────────────────────────────────────────────────────────────

const { WaterfallInspector } =
  await import("@/app/(dashboard)/dashboard/compression/studio/WaterfallInspector");

// ── Helpers ───────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
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

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Sample run ────────────────────────────────────────────────────────────

const SAMPLE_RUN: CompressionRunModel = {
  requestId: "req-waterfall-001",
  comboId: "stacked-combo",
  mode: "stacked",
  originalTokens: 10000,
  compressedTokens: 5500,
  savingsPercent: 45.0,
  timestamp: 1718000001000,
  steps: [
    {
      engine: "rtk",
      originalTokens: 10000,
      compressedTokens: 8000,
      savingsPercent: 20.0,
      techniquesUsed: ["tool-output-trim"],
      durationMs: 2.1,
    },
    {
      engine: "caveman",
      originalTokens: 8000,
      compressedTokens: 6500,
      savingsPercent: 18.75,
      techniquesUsed: ["filler-drop", "dedup"],
      durationMs: 1.2,
    },
    {
      engine: "headroom",
      originalTokens: 6500,
      compressedTokens: 5500,
      savingsPercent: 15.38,
      techniquesUsed: ["json-compact"],
      durationMs: 0.8,
    },
  ],
};

// ── Tests ─────────────────────────────────────────────────────────────────

describe("WaterfallInspector", () => {
  it("renders the inspector root element", () => {
    const container = mount(<WaterfallInspector run={SAMPLE_RUN} />);
    expect(container.querySelector("[data-testid='waterfall-inspector']")).toBeTruthy();
  });

  it("renders one row per step", () => {
    const container = mount(<WaterfallInspector run={SAMPLE_RUN} />);
    const rows = container.querySelectorAll("[data-testid='waterfall-step-row']");
    expect(rows.length).toBe(SAMPLE_RUN.steps.length);
  });

  it("shows each engine name", () => {
    const container = mount(<WaterfallInspector run={SAMPLE_RUN} />);
    const text = container.textContent ?? "";
    expect(text).toContain("rtk");
    expect(text).toContain("caveman");
    expect(text).toContain("headroom");
  });

  it("shows savings text for each step", () => {
    const container = mount(<WaterfallInspector run={SAMPLE_RUN} />);
    const savingsEls = container.querySelectorAll("[data-testid='waterfall-savings-text']");
    // One savings element per non-skipped step
    expect(savingsEls.length).toBe(SAMPLE_RUN.steps.length);
    // First step savings
    expect(savingsEls[0]?.textContent).toContain("20.0");
  });

  it("shows the total savings in the footer", () => {
    const container = mount(<WaterfallInspector run={SAMPLE_RUN} />);
    const totalEl = container.querySelector("[data-testid='waterfall-total-savings']");
    expect(totalEl).toBeTruthy();
    expect(totalEl?.textContent).toContain("45.0");
  });

  it("marks a skipped step (tokensIn === tokensOut) with 'skip' label", () => {
    const runWithSkip: CompressionRunModel = {
      ...SAMPLE_RUN,
      steps: [
        {
          engine: "llmlingua",
          originalTokens: 5500,
          compressedTokens: 5500, // no change — skipped
          savingsPercent: 0,
          techniquesUsed: [],
        },
      ],
    };
    const container = mount(<WaterfallInspector run={runWithSkip} />);
    expect(container.textContent).toContain("skip");
    // No savings text for a skipped step
    const savingsEls = container.querySelectorAll("[data-testid='waterfall-savings-text']");
    expect(savingsEls.length).toBe(0);
  });

  it("shows the comboId in the summary bar", () => {
    const container = mount(<WaterfallInspector run={SAMPLE_RUN} />);
    expect(container.textContent).toContain("stacked-combo");
  });

  it("shows the mode in the summary bar", () => {
    const container = mount(<WaterfallInspector run={SAMPLE_RUN} />);
    expect(container.textContent).toContain("stacked");
  });
});
