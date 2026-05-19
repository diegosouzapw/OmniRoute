// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => {
    container.remove();
  });
  return container;
}

describe("KiroAuthModal", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("shows Google Account and starts Google social login when clicked", async () => {
    const { default: KiroAuthModal } = await import("@/shared/components/KiroAuthModal");
    const container = makeContainer();
    const root = createRoot(container);
    const onMethodSelect = vi.fn();

    await act(async () => {
      root.render(<KiroAuthModal isOpen onClose={vi.fn()} onMethodSelect={onMethodSelect} />);
    });

    const googleButton = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Google Account")
    );

    expect(googleButton).toBeTruthy();
    expect(googleButton?.className).not.toContain("hidden");

    await act(async () => {
      googleButton?.click();
    });

    expect(onMethodSelect).toHaveBeenCalledWith("social", { provider: "google" });
  });
});
