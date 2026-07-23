// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, afterEach } from "vitest";

// ── Import component ──────────────────────────────────────────────────────────

const { default: ProgressBarBicolor } = await import(
  "../../../../../src/app/(dashboard)/dashboard/batch/components/ProgressBarBicolor"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderBar(props: {
  total: number;
  completed: number;
  failed: number;
  className?: string;
  showLabels?: boolean;
}) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ProgressBarBicolor {...props} />);
  });
  containers.push({ root, el });
  return el;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ProgressBarBicolor", () => {
  it("renders green bar at 50% when total=100, completed=50, failed=0", () => {
    const el = renderBar({ total: 100, completed: 50, failed: 0 });
    // Find the emerald (green) bar segment
    const greenBar = el.querySelector(".bg-emerald-500") as HTMLElement;
    expect(greenBar).not.toBeNull();
    expect(greenBar.style.width).toBe("50%");
    // Red bar should be 0%
    const redBar = el.querySelector(".bg-red-500") as HTMLElement;
    expect(redBar).not.toBeNull();
    expect(redBar.style.width).toBe("0%");
  });

  it("renders green 50% and red 25% when total=100, completed=50, failed=25", () => {
    const el = renderBar({ total: 100, completed: 50, failed: 25 });
    const greenBar = el.querySelector(".bg-emerald-500") as HTMLElement;
    const redBar = el.querySelector(".bg-red-500") as HTMLElement;
    expect(greenBar.style.width).toBe("50%");
    expect(redBar.style.width).toBe("25%");
  });

  it("renders empty bar without crash when total=0 (no NaN)", () => {
    const el = renderBar({ total: 0, completed: 0, failed: 0 });
    const greenBar = el.querySelector(".bg-emerald-500") as HTMLElement;
    const redBar = el.querySelector(".bg-red-500") as HTMLElement;
    expect(greenBar).not.toBeNull();
    expect(redBar).not.toBeNull();
    // Should be 0%, not NaN%
    expect(greenBar.style.width).toBe("0%");
    expect(redBar.style.width).toBe("0%");
  });

  it("shows labels when showLabels=true with correct counts and percent", () => {
    const el = renderBar({ total: 100, completed: 50, failed: 25, showLabels: true });
    const text = el.textContent ?? "";
    // Should show completed count
    expect(text).toContain("50");
    // Should show failed count
    expect(text).toContain("25 err");
    // Should show total
    expect(text).toContain("100");
    // Should show percentage: (50+25)/100 = 75%
    expect(text).toContain("75%");
  });

  it("does not show labels when showLabels=false (default)", () => {
    const el = renderBar({ total: 100, completed: 50, failed: 25, showLabels: false });
    // No label div should be present (just the bar container)
    const labelDiv = el.querySelector(".flex.items-center.justify-between");
    expect(labelDiv).toBeNull();
  });
});
