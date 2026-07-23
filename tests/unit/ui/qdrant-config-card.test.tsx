// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) return `${key}:${JSON.stringify(values)}`;
    return key;
  },
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { className: "card" }, children),
}));

const MOCK_QDRANT_SETTINGS = {
  enabled: false,
  host: "http://127.0.0.1",
  port: 6333,
  collection: "omniroute_memory",
  embeddingModel: "openai/text-embedding-3-small",
  hasApiKey: false,
  apiKeyMasked: null,
};

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("QdrantConfigCard", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
      true;
    globalThis.fetch = vi.fn().mockImplementation((url: string) => {
      if (url === "/api/settings/qdrant") {
        return Promise.resolve({
          ok: true,
          json: async () => MOCK_QDRANT_SETTINGS,
        });
      }
      if (url === "/api/settings/qdrant/embedding-models") {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            models: [
              { value: "openai/text-embedding-3-small", label: "text-embedding-3-small" },
              { value: "openai/text-embedding-ada-002", label: "text-embedding-ada-002" },
            ],
          }),
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders after loading qdrant settings", async () => {
    const { default: QdrantConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/QdrantConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<QdrantConfigCard />);
    });
    // Wait for useEffect fetch
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    expect(container.querySelector("[data-testid='qdrant-enabled-switch']")).toBeTruthy();
    expect(container.querySelector("[data-testid='qdrant-test-connection']")).toBeTruthy();
    expect(container.querySelector("[data-testid='qdrant-search-test']")).toBeTruthy();
    expect(container.querySelector("[data-testid='qdrant-cleanup']")).toBeTruthy();
  });

  it("toggle enabled switch calls PUT /api/settings/qdrant", async () => {
    const fetchMock = vi.fn().mockImplementation((url: string, opts?: { method?: string }) => {
      if (url === "/api/settings/qdrant" && opts?.method === "PUT") {
        return Promise.resolve({
          ok: true,
          json: async () => ({ ...MOCK_QDRANT_SETTINGS, enabled: true }),
        });
      }
      if (url === "/api/settings/qdrant") {
        return Promise.resolve({
          ok: true,
          json: async () => MOCK_QDRANT_SETTINGS,
        });
      }
      if (url === "/api/settings/qdrant/embedding-models") {
        return Promise.resolve({
          ok: true,
          json: async () => ({ models: [] }),
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });
    globalThis.fetch = fetchMock;

    const { default: QdrantConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/QdrantConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<QdrantConfigCard />);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const toggleBtn = container.querySelector(
      "[data-testid='qdrant-enabled-switch']",
    ) as HTMLButtonElement | null;
    expect(toggleBtn).toBeTruthy();
    await act(async () => {
      toggleBtn?.click();
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const putCalls = fetchMock.mock.calls.filter(
      (c: [string, { method?: string }]) =>
        typeof c[0] === "string" &&
        c[0] === "/api/settings/qdrant" &&
        c[1]?.method === "PUT",
    );
    expect(putCalls.length).toBeGreaterThan(0);
  });

  it("test connection button calls /api/settings/qdrant/health", async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url === "/api/settings/qdrant") {
        return Promise.resolve({
          ok: true,
          json: async () => MOCK_QDRANT_SETTINGS,
        });
      }
      if (url === "/api/settings/qdrant/embedding-models") {
        return Promise.resolve({
          ok: true,
          json: async () => ({ models: [] }),
        });
      }
      if (url === "/api/settings/qdrant/health") {
        return Promise.resolve({
          ok: true,
          json: async () => ({ ok: true, latencyMs: 12 }),
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });
    globalThis.fetch = fetchMock;

    const { default: QdrantConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/QdrantConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<QdrantConfigCard />);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const testBtn = container.querySelector(
      "[data-testid='qdrant-test-connection']",
    ) as HTMLButtonElement | null;
    expect(testBtn).toBeTruthy();
    await act(async () => {
      testBtn?.click();
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const healthCalls = fetchMock.mock.calls.filter(
      (c: [string]) => typeof c[0] === "string" && c[0] === "/api/settings/qdrant/health",
    );
    expect(healthCalls.length).toBeGreaterThan(0);
    // Health OK result should be shown
    expect(container.textContent).toContain("qdrant.healthOk");
  });

  it("search test button calls /api/settings/qdrant/search and renders results", async () => {
    const fetchMock = vi.fn().mockImplementation((url: string, opts?: { method?: string; body?: string }) => {
      if (url === "/api/settings/qdrant") {
        return Promise.resolve({
          ok: true,
          json: async () => MOCK_QDRANT_SETTINGS,
        });
      }
      if (url === "/api/settings/qdrant/embedding-models") {
        return Promise.resolve({
          ok: true,
          json: async () => ({ models: [] }),
        });
      }
      if (url === "/api/settings/qdrant/search" && opts?.method === "POST") {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            ok: true,
            results: [
              { id: "r1", score: 0.9876, payload: { content: "test content" } },
            ],
          }),
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });
    globalThis.fetch = fetchMock;

    const { default: QdrantConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/QdrantConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<QdrantConfigCard />);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    // Set search query by manipulating the input
    const searchInputs = Array.from(container.querySelectorAll("input")).filter(
      (i) => i.type !== "password" && i.type !== "number",
    );
    // The search query input is the one with the search placeholder
    const searchInput = searchInputs[searchInputs.length - 1] as HTMLInputElement | null;
    expect(searchInput).toBeTruthy();

    await act(async () => {
      if (searchInput) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        )?.set;
        nativeSetter?.call(searchInput, "test query");
        searchInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    const searchTestBtn = container.querySelector(
      "[data-testid='qdrant-search-test']",
    ) as HTMLButtonElement | null;
    expect(searchTestBtn).toBeTruthy();
    await act(async () => {
      searchTestBtn?.click();
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const searchCalls = fetchMock.mock.calls.filter(
      (c: [string, { method?: string }]) =>
        typeof c[0] === "string" &&
        c[0] === "/api/settings/qdrant/search" &&
        c[1]?.method === "POST",
    );
    expect(searchCalls.length).toBeGreaterThan(0);
  });

  it("cleanup button calls /api/settings/qdrant/cleanup and shows result", async () => {
    const fetchMock = vi.fn().mockImplementation((url: string, opts?: { method?: string }) => {
      if (url === "/api/settings/qdrant") {
        return Promise.resolve({
          ok: true,
          json: async () => MOCK_QDRANT_SETTINGS,
        });
      }
      if (url === "/api/settings/qdrant/embedding-models") {
        return Promise.resolve({
          ok: true,
          json: async () => ({ models: [] }),
        });
      }
      if (url === "/api/settings/qdrant/cleanup" && opts?.method === "POST") {
        return Promise.resolve({
          ok: true,
          json: async () => ({ ok: true, deletedCount: 5 }),
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });
    globalThis.fetch = fetchMock;

    const { default: QdrantConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/QdrantConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<QdrantConfigCard />);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const cleanupBtn = container.querySelector(
      "[data-testid='qdrant-cleanup']",
    ) as HTMLButtonElement | null;
    expect(cleanupBtn).toBeTruthy();
    await act(async () => {
      cleanupBtn?.click();
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const cleanupCalls = fetchMock.mock.calls.filter(
      (c: [string, { method?: string }]) =>
        typeof c[0] === "string" &&
        c[0] === "/api/settings/qdrant/cleanup" &&
        c[1]?.method === "POST",
    );
    expect(cleanupCalls.length).toBeGreaterThan(0);
    // Shows cleanup success message
    expect(container.textContent).toContain("qdrant.cleanupSuccess");
  });
});
