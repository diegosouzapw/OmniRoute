// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => {
    container.remove();
  });
  return container;
}

describe("AutoRoutingBanner", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.clear();
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
    localStorage.clear();
  });

  it("renders banner on first mount", async () => {
    const { default: AutoRoutingBanner } = await import("@/shared/components/AutoRoutingBanner");
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoRoutingBanner />);
    });
    expect(container.querySelector('[role="banner"]')).toBeTruthy();
    expect(container.textContent).toContain("Auto-Routing Active");
  });

  it("includes link to Combos page", async () => {
    const { default: AutoRoutingBanner } = await import("@/shared/components/AutoRoutingBanner");
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoRoutingBanner />);
    });
    const link = container.querySelector('a[href="/dashboard/combos"]');
    expect(link).toBeTruthy();
  });

  it("can be dismissed by clicking close button", async () => {
    const { default: AutoRoutingBanner } = await import("@/shared/components/AutoRoutingBanner");
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoRoutingBanner />);
    });
    expect(container.querySelector('[role="banner"]')).toBeTruthy();
    const closeButton = container.querySelector('button[aria-label="Dismiss auto-routing banner"]');
    expect(closeButton).toBeTruthy();
    await act(async () => {
      closeButton?.click();
    });
    expect(container.querySelector('[role="banner"]')).toBeFalsy();
  });

  it("persists dismissal to localStorage", async () => {
    const { default: AutoRoutingBanner } = await import("@/shared/components/AutoRoutingBanner");
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoRoutingBanner />);
    });
    const closeButton = container.querySelector('button[aria-label="Dismiss auto-routing banner"]');
    await act(async () => {
      closeButton?.click();
    });
    expect(localStorage.getItem("auto-routing-banner-dismissed")).toBe("true");
  });

  it("remains hidden after dismissal on remount", async () => {
    localStorage.setItem("auto-routing-banner-dismissed", "true");
    const { default: AutoRoutingBanner } = await import("@/shared/components/AutoRoutingBanner");
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AutoRoutingBanner />);
    });
    expect(container.querySelector('[role="banner"]')).toBeFalsy();
  });
});
