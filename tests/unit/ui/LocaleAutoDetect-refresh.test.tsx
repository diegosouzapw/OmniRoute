// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Regression guard (release v3.8.44 e2e finding): LocaleAutoDetect called
// router.refresh() on EVERY first visit — even when the detected browser
// locale was exactly the one the server had just rendered — re-navigating the
// page mid-interaction (Playwright: "Execution context was destroyed") and
// flashing for every new visitor. It must refresh ONLY when the detected
// locale differs from <html lang>.

const refresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

describe("LocaleAutoDetect refresh gating", () => {
  const cleanups: Array<() => void> = [];

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    refresh.mockClear();
    // Fresh visit: no locale cookie.
    document.cookie = "NEXT_LOCALE=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    Object.defineProperty(navigator, "languages", { value: ["en-US"], configurable: true });
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
  });

  async function mount() {
    const { LocaleAutoDetect } = await import("@/shared/components/LocaleAutoDetect");
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(React.createElement(LocaleAutoDetect));
    });
    cleanups.push(() => {
      root.unmount();
      container.remove();
    });
  }

  it("does NOT refresh when the detected locale equals the server-rendered <html lang>", async () => {
    document.documentElement.lang = "en";
    await mount();
    expect(refresh).not.toHaveBeenCalled();
  });

  it("refreshes when the detected locale differs from the server-rendered <html lang>", async () => {
    document.documentElement.lang = "fr";
    await mount();
    expect(refresh).toHaveBeenCalledTimes(1);
  });
});
