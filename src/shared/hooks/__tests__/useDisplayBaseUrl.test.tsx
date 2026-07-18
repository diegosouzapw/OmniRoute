// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_DISPLAY_BASE_URL,
  isPublicDisplayBaseUrl,
  resolveDisplayBaseUrl,
} from "../useDisplayBaseUrl";

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

  it("classifies public domains separately from local and private addresses", () => {
    expect(isPublicDisplayBaseUrl("https://api.example.com")).toBe(true);
    expect(isPublicDisplayBaseUrl("http://localhost:20128")).toBe(false);
    expect(isPublicDisplayBaseUrl("http://192.168.1.25:20128")).toBe(false);
    expect(isPublicDisplayBaseUrl("http://100.88.4.55:20128")).toBe(false);
    expect(isPublicDisplayBaseUrl("http://[::1]:20128")).toBe(false);
  });

  it("classifies IPv4 private ranges at their exact boundaries", () => {
    const cases: Array<[host: string, expectedPublic: boolean]> = [
      // 0.0.0.0/8 ("this" network) vs just above it
      ["0.0.0.1", false],
      ["1.0.0.1", true],
      // RFC1918 10.0.0.0/8 vs just outside
      ["9.255.255.255", true],
      ["10.0.0.1", false],
      ["11.0.0.0", true],
      // loopback 127.0.0.0/8 vs just outside
      ["126.255.255.255", true],
      ["127.0.0.1", false],
      ["128.0.0.0", true],
      // multicast/reserved 224.0.0.0+ vs just below
      ["223.255.255.255", true],
      ["224.0.0.1", false],
      // CGNAT RFC6598 100.64.0.0/10 vs just outside
      ["100.63.255.255", true],
      ["100.64.0.0", false],
      ["100.127.255.255", false],
      ["100.128.0.0", true],
      // link-local 169.254.0.0/16 vs just outside
      ["169.253.255.255", true],
      ["169.254.0.1", false],
      ["169.255.0.0", true],
      // RFC1918 172.16.0.0/12 vs just outside
      ["172.15.255.255", true],
      ["172.16.0.0", false],
      ["172.31.255.255", false],
      ["172.32.0.0", true],
      // RFC1918 192.168.0.0/16 vs just outside
      ["192.167.255.255", true],
      ["192.168.0.1", false],
      ["192.169.0.0", true],
    ];

    for (const [host, expectedPublic] of cases) {
      expect(isPublicDisplayBaseUrl(`http://${host}:20128`)).toBe(expectedPublic);
    }
  });

  it("classifies IPv6 special ranges while keeping the check scoped to actual IPv6 hosts", () => {
    expect(isPublicDisplayBaseUrl("http://[::]:20128")).toBe(false);
    expect(isPublicDisplayBaseUrl("http://[::1]:20128")).toBe(false);
    expect(isPublicDisplayBaseUrl("http://[fc00::1]:20128")).toBe(false);
    expect(isPublicDisplayBaseUrl("http://[fd12::1]:20128")).toBe(false);
    expect(isPublicDisplayBaseUrl("http://[fe80::1]:20128")).toBe(false);
    expect(isPublicDisplayBaseUrl("http://[2001:db8::1]:20128")).toBe(true);
    // A hostname that merely STARTS WITH "fd"/"fc" must stay public — the ULA/
    // link-local checks are IPv6-only and must not leak into hostname matching.
    expect(isPublicDisplayBaseUrl("http://fdroid.example.com:20128")).toBe(true);
    expect(isPublicDisplayBaseUrl("http://fcbar.example.com:20128")).toBe(true);
  });

  it("keeps a configured public URL when the browser is on a local address", () => {
    expect(resolveDisplayBaseUrl("https://api.example.com/", "http://localhost:20128")).toBe(
      "https://api.example.com"
    );
  });

  it("prefers the currently reachable public origin over another configured URL", () => {
    expect(resolveDisplayBaseUrl("https://old.example.com", "https://api.example.com/")).toBe(
      "https://api.example.com"
    );
  });

  it("prefers a public browser origin over a loopback build-time value", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "http://localhost:20128");
    vi.stubGlobal("location", { origin: "https://api.example.com" });

    const { useDisplayBaseUrl } = await import("../useDisplayBaseUrl");
    const container = makeContainer();
    const root = createRoot(container);

    function C() {
      const url = useDisplayBaseUrl();
      return <span data-testid="value">{url}</span>;
    }

    act(() => {
      root.render(<C />);
    });

    expect(container.querySelector('[data-testid="value"]')?.textContent).toBe(
      DEFAULT_DISPLAY_BASE_URL
    );

    await act(async () => {});

    expect(container.querySelector('[data-testid="value"]')?.textContent).toBe(
      "https://api.example.com"
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
