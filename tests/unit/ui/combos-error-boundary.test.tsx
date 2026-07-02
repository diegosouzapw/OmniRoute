// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("CombosError boundary", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders a recoverable fallback instead of throwing", async () => {
    const { default: CombosError } =
      await import("../../../src/app/(dashboard)/dashboard/combos/error");
    const container = makeContainer();
    const root = createRoot(container);
    const reset = vi.fn();
    const error = Object.assign(new Error("boom"), { digest: "abc123" });

    await act(async () => {
      root.render(<CombosError error={error} reset={reset} />);
    });

    expect(container.querySelector("[role='alert']")).toBeTruthy();
    expect(container.textContent).toContain("Failed to load combos");
  });

  it("calls reset() exactly once when Try Again is clicked", async () => {
    const { default: CombosError } =
      await import("../../../src/app/(dashboard)/dashboard/combos/error");
    const container = makeContainer();
    const root = createRoot(container);
    const reset = vi.fn();
    const error = Object.assign(new Error("boom"), { digest: undefined });

    await act(async () => {
      root.render(<CombosError error={error} reset={reset} />);
    });

    const button = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "Try Again"
    ) as HTMLButtonElement | undefined;
    expect(button).toBeTruthy();

    await act(async () => {
      button?.click();
    });

    expect(reset).toHaveBeenCalledTimes(1);
  });
});
