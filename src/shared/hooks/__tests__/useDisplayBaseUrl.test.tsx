// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_DISPLAY_BASE_URL } from "../useDisplayBaseUrl";

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => {
    container.remove();
  });
  return container;
}

describe("useDisplayBaseUrl", () => {
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
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns env value on first render and after mount when NEXT_PUBLIC_BASE_URL is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://example.com");

    const { useDisplayBaseUrl } = await import("../useDisplayBaseUrl");

    const container = makeContainer();
    const root = createRoot(container);

    function C() {
      const url = useDisplayBaseUrl();
      return <span data-testid="value">{url}</span>;
    }

    // Synchronous act: commits render and flushes synchronous effects.
    // The queueMicrotask in useEffect has not yet fired.
    act(() => {
      root.render(<C />);
    });

    // Env set: first render shows env value (useEffect no-ops when envValue is set)
    expect(container.querySelector('[data-testid="value"]')?.textContent).toBe(
      "https://example.com"
    );

    // Flush microtasks and any remaining async work
    await act(async () => {});

    // Env still wins after mount
    expect(container.querySelector('[data-testid="value"]')?.textContent).toBe(
      "https://example.com"
    );
  });

  it("returns DEFAULT_DISPLAY_BASE_URL on first render and origin after mount when env unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");

    const { useDisplayBaseUrl } = await import("../useDisplayBaseUrl");

    const container = makeContainer();
    const root = createRoot(container);

    function C() {
      const url = useDisplayBaseUrl();
      return <span data-testid="value">{url}</span>;
    }

    // Synchronous act commits render. useEffect fires but queueMicrotask
    // schedules setState for after this act() call returns.
    act(() => {
      root.render(<C />);
    });

    // Pre-microtask: DOM still shows the initial state (DEFAULT_DISPLAY_BASE_URL)
    expect(container.querySelector('[data-testid="value"]')?.textContent).toBe(
      DEFAULT_DISPLAY_BASE_URL
    );

    // Flush queueMicrotask callback (setState) and resulting re-render
    await act(async () => {});

    // After mount: swaps to window.location.origin
    expect(container.querySelector('[data-testid="value"]')?.textContent).toBe(
      window.location.origin
    );
  });

  it("trims and strips trailing slash from env value", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "  https://x.com/  ");

    const { useDisplayBaseUrl } = await import("../useDisplayBaseUrl");

    const container = makeContainer();
    const root = createRoot(container);

    function C() {
      const url = useDisplayBaseUrl();
      return <span data-testid="value">{url}</span>;
    }

    await act(async () => {
      root.render(<C />);
    });

    expect(container.querySelector('[data-testid="value"]')?.textContent).toBe("https://x.com");
  });

  it("strips trailing slash from window.location.origin after mount", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");

    // Stub window.location with trailing slash on origin
    vi.stubGlobal("location", { origin: "http://192.168.13.62:20128/" });

    const { useDisplayBaseUrl } = await import("../useDisplayBaseUrl");

    const container = makeContainer();
    const root = createRoot(container);

    function C() {
      const url = useDisplayBaseUrl();
      return <span data-testid="value">{url}</span>;
    }

    // Render and flush all effects including queueMicrotask
    await act(async () => {
      root.render(<C />);
    });

    expect(container.querySelector('[data-testid="value"]')?.textContent).toBe(
      "http://192.168.13.62:20128"
    );
  });

  it("treats empty-string env as unset and falls through to origin after mount", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");

    const { useDisplayBaseUrl } = await import("../useDisplayBaseUrl");

    const container = makeContainer();
    const root = createRoot(container);

    function C() {
      const url = useDisplayBaseUrl();
      return <span data-testid="value">{url}</span>;
    }

    // Synchronous act: render committed, useEffect fired, microtask queued but not yet run
    act(() => {
      root.render(<C />);
    });

    // Empty env treated as unset → initial state is DEFAULT_DISPLAY_BASE_URL
    expect(container.querySelector('[data-testid="value"]')?.textContent).toBe(
      DEFAULT_DISPLAY_BASE_URL
    );

    // Flush queueMicrotask + re-render
    await act(async () => {});

    // After mount: resolves to origin
    const result = container.querySelector('[data-testid="value"]')?.textContent;
    expect(result).toBe(window.location.origin.replace(/\/+$/, ""));
  });
});
