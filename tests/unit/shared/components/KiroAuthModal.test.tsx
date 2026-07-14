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

function setInputValue(input: HTMLInputElement, value: string): void {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
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

  it("notifies API key import success before closing the modal", async () => {
    const { default: KiroAuthModal } = await import("@/shared/components/KiroAuthModal");
    const container = makeContainer();
    const root = createRoot(container);
    const calls: string[] = [];
    const onMethodSelect = vi.fn(() => calls.push("select"));
    const onClose = vi.fn(() => calls.push("close"));
    const originalFetch = globalThis.fetch;

    globalThis.fetch = vi.fn(async () => {
      return new Response(JSON.stringify({ success: true, connection: { id: "conn-1" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;

    try {
      await act(async () => {
        root.render(<KiroAuthModal isOpen onClose={onClose} onMethodSelect={onMethodSelect} />);
      });

      const apiKeyButton = Array.from(container.querySelectorAll("button")).find(
        (button) => button.querySelector("h3")?.textContent === "API Key"
      );

      await act(async () => {
        apiKeyButton?.click();
      });

      const apiKeyInput = container.querySelector("input") as HTMLInputElement;
      const saveButton = Array.from(container.querySelectorAll("button")).find((button) =>
        button.textContent?.includes("Validate and Save API Key")
      );

      await act(async () => {
        setInputValue(apiKeyInput, "ksk_test_key");
      });

      await act(async () => {
        saveButton?.click();
      });

      expect(onMethodSelect).toHaveBeenCalledWith("api-key");
      expect(onClose).toHaveBeenCalled();
      expect(calls).toEqual(["select", "close"]);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
