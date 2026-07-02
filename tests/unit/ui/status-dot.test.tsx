// @vitest-environment jsdom
/**
 * F5.1 coverage gap (F0.2): the StatusDot U0 sub-component had no dedicated test.
 * Pins the error-override + sizeClass behavior.
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { StatusDot } from "@/shared/components/flow/StatusDot";
import { FLOW_EDGE_COLORS } from "@/shared/components/flow/edgeStyles";

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

/** Normalize a CSS color the way jsdom does (hex → rgb(...)) for stable comparison. */
function normalizeColor(c: string): string {
  const probe = document.createElement("span");
  probe.style.backgroundColor = c;
  return probe.style.backgroundColor;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (containers.length > 0) containers.pop()?.remove();
  document.body.innerHTML = "";
});

describe("StatusDot (U0 — pulsing presence indicator)", () => {
  it("uses the provided color when not errored", () => {
    const container = mount(<StatusDot color="rgb(1, 2, 3)" />);
    const dots = container.querySelectorAll<HTMLElement>("span[style]");
    expect(dots.length).toBe(2); // ping halo + solid dot
    for (const d of dots) expect(d.style.backgroundColor).toBe("rgb(1, 2, 3)");
  });

  it("overrides color with the error color when error=true", () => {
    const container = mount(<StatusDot color="rgb(1, 2, 3)" error />);
    const dots = container.querySelectorAll<HTMLElement>("span[style]");
    const expected = normalizeColor(FLOW_EDGE_COLORS.error);
    for (const d of dots) {
      expect(d.style.backgroundColor).toBe(expected);
      expect(d.style.backgroundColor).not.toBe("rgb(1, 2, 3)");
    }
  });

  it("applies the sizeClass to the wrapper (defaults to size-1.5)", () => {
    const dflt = mount(<StatusDot color="rgb(1, 2, 3)" />);
    expect(dflt.querySelector(".size-1\\.5")).toBeTruthy();

    const custom = mount(<StatusDot color="rgb(1, 2, 3)" sizeClass="size-3" />);
    expect(custom.querySelector(".size-3")).toBeTruthy();
  });
});
