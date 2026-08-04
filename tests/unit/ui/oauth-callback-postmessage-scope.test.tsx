// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock next-intl translations (the page imports useTranslations("auth")).
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

import CallbackPage from "@/app/callback/page";

/**
 * Regression guard for ported upstream PR decolua/9router#998 (security):
 * the OAuth callback page must never relay {code, state} to a wildcard
 * postMessage target ("*"), as a hostile opener can read the code/state and
 * complete the OAuth flow as the user. Only the same-origin parent and
 * Codex's fixed loopback helper (127.0.0.1:1455) are trusted targets.
 */
describe("OAuth callback page — postMessage target origin scope (#998)", () => {
  let container: HTMLDivElement;
  let root: Root;
  let postMessageSpy: ReturnType<typeof vi.fn>;
  let originalOpener: typeof window.opener;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    postMessageSpy = vi.fn();
    originalOpener = window.opener;

    // Set the callback URL with OAuth params (triggers the postMessage send).
    window.history.replaceState({}, "", "/callback?code=test_code_abc123&state=test_state_xyz789");

    // Stub window.opener as a CROSS-ORIGIN opener: same-origin probe must throw
    // (mimics a real cross-origin window.opener), which means the page falls into
    // the fallback path that previously used a wildcard "*" target origin.
    Object.defineProperty(window, "opener", {
      configurable: true,
      writable: true,
      value: {
        postMessage: postMessageSpy,
        get location(): never {
          throw new Error("cross-origin access blocked");
        },
      },
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    Object.defineProperty(window, "opener", {
      configurable: true,
      writable: true,
      value: originalOpener,
    });
    vi.clearAllMocks();
  });

  it("never targets the wildcard '*' origin even when opener is cross-origin", async () => {
    await act(async () => {
      root.render(<CallbackPage />);
    });
    // Give useEffect a microtask to flush.
    await act(async () => {
      await Promise.resolve();
    });

    const targetOrigins = postMessageSpy.mock.calls.map((call) => call[1]);
    expect(targetOrigins).not.toContain("*");
  });

  it("only targets trusted origins (same-origin + Codex 127.0.0.1:1455)", async () => {
    await act(async () => {
      root.render(<CallbackPage />);
    });
    await act(async () => {
      await Promise.resolve();
    });

    const trusted = new Set([window.location.origin, "http://localhost:1455", "http://127.0.0.1:1455"]);
    const targetOrigins = postMessageSpy.mock.calls.map((call) => call[1]);
    expect(targetOrigins.length).toBeGreaterThan(0);
    for (const origin of targetOrigins) {
      expect(trusted.has(origin)).toBe(true);
    }
  });

  it("delivers the OAuth code/state payload at least once via postMessage", async () => {
    await act(async () => {
      root.render(<CallbackPage />);
    });
    await act(async () => {
      await Promise.resolve();
    });

    // Sanity: the scoped postMessage path still actually attempts delivery.
    expect(postMessageSpy).toHaveBeenCalled();
    const firstCall = postMessageSpy.mock.calls[0];
    expect(firstCall[0]).toMatchObject({
      type: "oauth_callback",
      data: expect.objectContaining({
        code: "test_code_abc123",
        state: "test_state_xyz789",
      }),
    });
  });
});
