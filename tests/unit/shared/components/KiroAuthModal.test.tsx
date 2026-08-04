// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { NextIntlClientProvider } from "next-intl";
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

function withIntl(children: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="en" messages={{ common: { close: "Close" } }}>
      {children}
    </NextIntlClientProvider>
  );
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
      root.render(
        withIntl(<KiroAuthModal isOpen onClose={vi.fn()} onMethodSelect={onMethodSelect} />)
      );
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
        root.render(
          withIntl(<KiroAuthModal isOpen onClose={onClose} onMethodSelect={onMethodSelect} />)
        );
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

      expect(apiKeyInput.type).toBe("password");

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

  it("treats successful auto-import as completed instead of importing twice", async () => {
    const { default: KiroAuthModal } = await import("@/shared/components/KiroAuthModal");
    const container = makeContainer();
    const root = createRoot(container);
    const calls: string[] = [];
    const onMethodSelect = vi.fn(() => calls.push("select"));
    const onClose = vi.fn(() => calls.push("close"));
    const originalFetch = globalThis.fetch;

    globalThis.fetch = vi.fn(async () => {
      return new Response(JSON.stringify({ found: true, source: "kiro-cli-sqlite" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;

    try {
      await act(async () => {
        root.render(
          withIntl(<KiroAuthModal isOpen onClose={onClose} onMethodSelect={onMethodSelect} />)
        );
      });

      const importButton = Array.from(container.querySelectorAll("button")).find(
        (button) => button.querySelector("h3")?.textContent === "Import Token"
      );
      await act(async () => {
        importButton?.click();
      });

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "/api/oauth/kiro/auto-import?targetProvider=kiro"
      );
      expect(onMethodSelect).toHaveBeenCalledWith("import");
      expect(calls).toEqual(["select", "close"]);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("does not restart an active social login when the wrapper rerenders", async () => {
    const { default: KiroOAuthWrapper } = await import("@/shared/components/KiroOAuthWrapper");
    const container = makeContainer();
    const root = createRoot(container);
    const originalFetch = globalThis.fetch;
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/social-authorize")) {
        return new Response(
          JSON.stringify({
            userCode: "ABCD-EFGH",
            authUrl: "https://example.test/authorize",
            deviceCode: "device-code",
            interval: 60,
            expiresIn: 300,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    globalThis.fetch = fetchMock as typeof fetch;

    try {
      await act(async () => {
        root.render(withIntl(<KiroOAuthWrapper isOpen onClose={vi.fn()} onSuccess={vi.fn()} />));
      });

      const googleButton = Array.from(container.querySelectorAll("button")).find((button) =>
        button.textContent?.includes("Google Account")
      );
      await act(async () => {
        googleButton?.click();
      });

      await act(async () => {
        root.render(withIntl(<KiroOAuthWrapper isOpen onClose={vi.fn()} onSuccess={vi.fn()} />));
      });

      expect(
        fetchMock.mock.calls.filter(([input]) => String(input).includes("/social-authorize"))
      ).toHaveLength(1);
    } finally {
      await act(async () => root.unmount());
      globalThis.fetch = originalFetch;
    }
  });
});
