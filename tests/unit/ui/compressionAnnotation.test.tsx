// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CompressionAnnotation } from "@/app/(dashboard)/dashboard/compression/studio/CompressionAnnotation";
import type { CompressionStats } from "@omniroute/open-sse/services/compression/types";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
});

function render(ui: React.ReactElement) {
  act(() => {
    createRoot(container).render(ui);
  });
}

function makeStats(overrides: Partial<CompressionStats> = {}): CompressionStats {
  return {
    originalTokens: 847,
    compressedTokens: 312,
    savingsPercent: 63.16,
    techniquesUsed: ["caveman"],
    mode: "standard",
    timestamp: 0,
    ...overrides,
  };
}

describe("CompressionAnnotation", () => {
  it("renders token range badge", () => {
    const stats = makeStats({
      rulesApplied: ["filler", "filler", "dedup"],
    });
    render(<CompressionAnnotation stats={stats} />);
    expect(container.textContent).toContain("847→312");
  });

  it("renders rule pills", () => {
    const stats = makeStats({
      rulesApplied: ["filler", "filler", "dedup"],
    });
    render(<CompressionAnnotation stats={stats} />);
    expect(container.textContent).toContain("filler×2");
    expect(container.textContent).toContain("dedup×1");
  });

  it("returns null when no rules applied", () => {
    const stats = makeStats({ rulesApplied: [], techniquesUsed: [] });
    render(<CompressionAnnotation stats={stats} />);
    expect(container.innerHTML).toBe("");
  });

  it("returns null when rulesApplied is absent", () => {
    const stats = makeStats({ rulesApplied: undefined, techniquesUsed: [] });
    render(<CompressionAnnotation stats={stats} />);
    expect(container.innerHTML).toBe("");
  });
});
