// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const { default: TokenCostCounter } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/TokenCostCounter"
);

// ── Helpers ────────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderCounter(
  tokensIn: number,
  tokensOut: number,
  costUsd: number | null
): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<TokenCostCounter tokensIn={tokensIn} tokensOut={tokensOut} costUsd={costUsd} />);
  });
  containers.push({ root, el });
  return el;
}

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("TokenCostCounter", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean })
      .IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
  });

  it("renders nothing when all values are zero/null", () => {
    const el = renderCounter(0, 0, null);
    expect(el.textContent).toBe("");
  });

  it("shows tokens in with ↑ arrow", () => {
    const el = renderCounter(142, 0, null);
    expect(el.textContent).toContain("142↑");
  });

  it("shows tokens out with ↓ arrow", () => {
    const el = renderCounter(0, 38, null);
    expect(el.textContent).toContain("38↓");
  });

  it("shows both token counts", () => {
    const el = renderCounter(142, 38, null);
    expect(el.textContent).toContain("142↑");
    expect(el.textContent).toContain("38↓");
  });

  it("shows cost with (estimated) label", () => {
    const el = renderCounter(100, 50, 0.002);
    expect(el.textContent).toContain("(estimated)");
    expect(el.textContent).toContain("0.0020");
  });

  it("does not show cost when costUsd is null", () => {
    const el = renderCounter(100, 50, null);
    expect(el.textContent).not.toContain("estimated");
  });

  it("does not show cost when costUsd is 0", () => {
    const el = renderCounter(100, 50, 0);
    expect(el.textContent).not.toContain("estimated");
  });

  it("updates when props change", () => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    containers.push({ root, el });

    act(() => {
      root.render(<TokenCostCounter tokensIn={10} tokensOut={5} costUsd={null} />);
    });
    expect(el.textContent).toContain("10↑");
    expect(el.textContent).toContain("5↓");

    act(() => {
      root.render(<TokenCostCounter tokensIn={200} tokensOut={80} costUsd={0.001} />);
    });
    expect(el.textContent).toContain("200↑");
    expect(el.textContent).toContain("80↓");
    expect(el.textContent).toContain("(estimated)");
  });
});
