// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ProviderDetailPageClient from "../../src/app/(dashboard)/dashboard/providers/[id]/ProviderDetailPageClient";
import RadarSetupPage from "../../src/app/(dashboard)/dashboard/radar/setup/page";

let providerId = "openai";
let searchParams = new URLSearchParams("action=add-api-key");

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: providerId }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), refresh: vi.fn() }),
  usePathname: () => `/dashboard/providers/${providerId}`,
  useSearchParams: () => searchParams,
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

function response(body: unknown = {}) {
  return {
    ok: true,
    status: 200,
    json: async () => body,
    text: async () => JSON.stringify(body),
    headers: { get: () => null },
  } as unknown as Response;
}

async function renderComponent(element: React.ReactNode): Promise<{
  container: HTMLDivElement;
  root: Root;
}> {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(element);
    await Promise.resolve();
    await Promise.resolve();
  });
  return { container, root };
}

async function renderProviderPage(): Promise<{ container: HTMLDivElement; root: Root }> {
  return renderComponent(<ProviderDetailPageClient />);
}

async function settle(): Promise<void> {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await Promise.resolve();
  });
}

function setInputValue(input: HTMLInputElement, value: string): void {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

describe("Radar guided setup provider action", () => {
  const fetchMock = vi.fn(() => Promise.resolve(response()));

  beforeEach(() => {
    providerId = "openai";
    searchParams = new URLSearchParams("action=add-api-key");
    fetchMock.mockClear();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("localStorage", {
      getItem: () => null,
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
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
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("opens the existing API key modal for a normal provider", async () => {
    const { container, root } = await renderProviderPage();
    expect(container.querySelector('input[type="password"]')).not.toBeNull();
    act(() => root.unmount());
  });

  it("keeps a subscription-risk provider behind the existing acknowledgement gate", async () => {
    providerId = "grok-web";
    const { container, root } = await renderProviderPage();

    expect(container.querySelector('input[type="password"]')).toBeNull();
    expect(container.textContent).toContain("I understand, continue");

    const confirm = [...container.querySelectorAll("button")].find((button) =>
      button.textContent?.includes("I understand, continue")
    );
    expect(confirm).toBeDefined();
    await act(async () => confirm?.click());
    expect(container.querySelector('input[type="password"]')).not.toBeNull();
    act(() => root.unmount());
  });

  it("completes get key, paste, persist, reload, and connection test with a concrete id", async () => {
    providerId = "groq";
    searchParams = new URLSearchParams("provider=groq");
    let connectionExists = false;
    let savedBody: Record<string, unknown> | null = null;
    let testedConnectionId: string | null = null;

    fetchMock.mockImplementation(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url === "/api/radar/catalog") {
        return response({
          entries: [
            {
              provider: "groq",
              setup: {
                keyUrl: "https://console.groq.com/keys",
                steps: [{ en: "Create a project-specific Groq key.", pt: "Crie a chave Groq." }],
              },
            },
          ],
        });
      }
      if (url.startsWith("/api/providers?") || url === "/api/providers") {
        if (init?.method === "POST") {
          savedBody = JSON.parse(String(init.body)) as Record<string, unknown>;
          connectionExists = true;
          return response({ connection: { id: "conn-groq", provider: "groq", isActive: true } });
        }
        return response({
          connections: connectionExists
            ? [{ id: "conn-groq", provider: "groq", isActive: true }]
            : [],
        });
      }
      if (url === "/api/providers/validate") return response({ valid: true });
      if (url === "/api/providers/conn-groq/sync-models") {
        return response({ syncedModels: 0, models: [] });
      }
      if (url === "/api/providers/conn-groq/test") {
        testedConnectionId = "conn-groq";
        return response({ valid: true });
      }
      return response();
    });

    const firstTour = await renderComponent(<RadarSetupPage />);
    await settle();
    expect(firstTour.container.textContent).toContain("https://console.groq.com/keys");
    expect(
      firstTour.container.querySelector('a[href="/dashboard/providers/groq?action=add-api-key"]')
    ).not.toBeNull();
    act(() => firstTour.root.unmount());

    searchParams = new URLSearchParams("action=add-api-key");
    const providerPage = await renderProviderPage();
    const credential = providerPage.container.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement | null;
    expect(credential).not.toBeNull();
    await act(async () => setInputValue(credential as HTMLInputElement, "test-key-not-real"));
    const save = [...providerPage.container.querySelectorAll("button")].find(
      (button) => button.textContent?.trim() === "Save"
    );
    expect(save).toBeDefined();
    await act(async () => save?.click());
    await settle();
    expect(savedBody).toMatchObject({ provider: "groq", apiKey: "test-key-not-real" });
    expect(connectionExists).toBe(true);
    act(() => providerPage.root.unmount());

    searchParams = new URLSearchParams("provider=groq");
    const reloadedTour = await renderComponent(<RadarSetupPage />);
    await settle();
    const testButton = [...reloadedTour.container.querySelectorAll("button")].find((button) =>
      button.textContent?.toLowerCase().includes("test")
    );
    expect(testButton).toBeDefined();
    expect(testButton?.disabled).toBe(false);
    await act(async () => testButton?.click());
    await settle();
    expect(testedConnectionId).toBe("conn-groq");
    expect(reloadedTour.container.textContent).toContain("Connection successful!");
    act(() => reloadedTour.root.unmount());
  });

  it("reports a 200 connection-test response with valid false as a failure", async () => {
    providerId = "groq";
    searchParams = new URLSearchParams("provider=groq");

    fetchMock.mockImplementation(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url === "/api/radar/catalog") {
        return response({
          entries: [{ provider: "groq", setup: { keyUrl: null, steps: [] } }],
        });
      }
      if (url.startsWith("/api/providers?")) {
        return response({
          connections: [{ id: "conn-groq", provider: "groq", isActive: true }],
        });
      }
      if (url === "/api/providers/conn-groq/test") {
        return response({ valid: false, error: "Invalid API key" });
      }
      return response();
    });

    const tour = await renderComponent(<RadarSetupPage />);
    await settle();
    const testButton = [...tour.container.querySelectorAll("button")].find((button) =>
      button.textContent?.toLowerCase().includes("test")
    );
    expect(testButton).toBeDefined();
    await act(async () => testButton?.click());
    await settle();

    expect(tour.container.textContent).toContain("Connection test failed");
    expect(tour.container.textContent).not.toContain("Connection successful!");
    act(() => tour.root.unmount());
  });
});
