// @vitest-environment jsdom
//
// Phase 0 smoke test for Issue #3501 (strangler-fig decomposition of the
// 12.8K-LOC providers/[id] god-component). Before any code is moved out of the
// component, this proves the freshly-extracted ProviderDetailPageClient still
// mounts and renders its loading shell without throwing — the safety net that
// every later extraction phase (1..6) is diffed against. Hard Rule #8: the page
// had ZERO tests before this; this is the first.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProviderDetailPageClient from "../ProviderDetailPageClient";

function getRequestPath(input: RequestInfo | URL) {
  return typeof input === "string" ? input : input instanceof URL ? input.pathname : input.url;
}

function emptyJsonResponse() {
  return {
    ok: true,
    status: 200,
    json: async () => ({}),
    text: async () => "",
    headers: { get: () => null },
  } as unknown as Response;
}

const cleanupCallbacks: Array<() => void> = [];

function installLocalStorageStub() {
  const store = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
    clear: () => store.clear(),
  });
}

// next/navigation — the client reads the route id via useParams() and never
// receives props from the thin page.tsx wrapper, so this mock is what supplies it.
vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "openai" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/dashboard/providers/openai",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next-intl", () => ({
  // Echo the key back so assertions don't depend on a full message catalog.
  useTranslations: (namespace?: string) => (key: string) => (namespace ? `${namespace}.${key}` : key),
}));

function renderProviderPage() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  let mounted = true;

  act(() => {
    root.render(<ProviderDetailPageClient />);
  });

  const unmount = () => {
    if (!mounted) return;
    act(() => root.unmount());
    container.remove();
    mounted = false;
  };
  cleanupCallbacks.push(unmount);
  return { container, unmount };
}

describe("ProviderDetailPageClient (Phase 0 smoke)", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockImplementation(() => Promise.resolve(emptyJsonResponse()));
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }))
    );
    installLocalStorageStub();
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("mounts and renders the loading shell without throwing", () => {
    const { container } = renderProviderPage();
    // Mount succeeded (no throw) and produced DOM — the loading skeleton renders
    // synchronously while the on-mount fetches are still pending.
    expect(container.childNodes.length).toBeGreaterThan(0);
    expect(container.querySelector("*")).not.toBeNull();
  });

  it("kicks off provider data loading on mount", async () => {
    renderProviderPage();
    // Let the mount effects schedule their fetches.
    await act(async () => {
      await Promise.resolve();
    });
    expect(fetchMock).toHaveBeenCalled();
    const paths = fetchMock.mock.calls.map(([input]) => getRequestPath(input as RequestInfo | URL));
    // The provider id from useParams() drives the connection/provider lookups.
    expect(paths.some((p) => p.includes("openai") || p.includes("/api/"))).toBe(true);
  });

  it("unmounts cleanly during the initial load", () => {
    const { unmount } = renderProviderPage();
    expect(() => unmount()).not.toThrow();
  });
});
