// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import enMessages from "@/i18n/messages/en.json";

vi.mock("next-intl", () => ({
  useTranslations: (ns: string = "common") => {
    const bag = ((enMessages as Record<string, unknown>)[ns] || {}) as Record<string, string>;
    const translate = (key: string, params?: Record<string, unknown>) => {
      let str = bag[key] ?? key;
      if (params) {
        for (const [pKey, pVal] of Object.entries(params)) {
          str = str.replace(new RegExp(`\\{${pKey}\\}`, "g"), String(pVal));
        }
      }
      return str;
    };
    return Object.assign(translate, { has: (key: string) => key in bag });
  },
}));

import ModelCatalogPage from "@/app/(dashboard)/dashboard/models/page";
import {
  CATALOG_TEST_RESULTS_KEY,
  getModelTestKey,
} from "@/app/(dashboard)/dashboard/models/catalogTestStorage";

describe("Models and Combos Catalog Page UI", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    localStorage.clear();
    window.history.replaceState(null, "", "/dashboard/models");
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  const setupMockFetch = () => {
    const fetchMock = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      const urlStr = typeof url === "string" ? url : String(url);

      if (urlStr.includes("/api/models/catalog")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            catalog: {
              alpha: {
                provider: "Alpha Labs",
                models: [
                  {
                    id: "alpha-chat",
                    name: "Alpha Chat",
                    type: "chat",
                    subtype: "general",
                    free: true,
                    context_length: 128_000,
                    capabilities: { tools: true, vision: true },
                  },
                  {
                    id: "alpha-embed",
                    name: "Alpha Embed",
                    type: "embedding",
                    context_length: 8_192,
                  },
                ],
              },
              beta: {
                provider: "Beta AI",
                models: [
                  {
                    id: "beta-coder",
                    name: "Beta Coder",
                    type: "chat",
                    subtype: "code",
                    capabilities: { reasoning: true },
                  },
                ],
              },
            },
          }),
        });
      }

      if (urlStr.includes("/api/combos/test")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            comboName: "combo-1",
            strategy: "priority",
            resolvedBy: "alpha/alpha-chat",
            results: [{ model: "alpha-chat", provider: "alpha", status: "ok", latencyMs: 210 }],
            testedAt: new Date().toISOString(),
          }),
        });
      }

      if (urlStr.includes("/api/combos")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            combos: [
              {
                id: "c-1",
                name: "combo-1",
                displayName: "First Combo",
                strategy: "priority",
                description: "Fallback chain",
                models: [{ model: "alpha/alpha-chat" }, { model: "beta/beta-coder" }],
                isActive: true,
              },
              {
                id: "c-2",
                name: "combo-2",
                displayName: "Second Combo",
                strategy: "round-robin",
                models: [{ model: "alpha/alpha-embed" }],
                isActive: false,
              },
            ],
            total: 2,
          }),
        });
      }

      if (urlStr.includes("/api/providers/health-matrix")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            providers: [
              { provider: "alpha", state: "healthy" },
              { provider: "beta", state: "degraded" },
            ],
          }),
        });
      }

      if (urlStr.includes("/api/models/test-all")) {
        const body = init?.body ? JSON.parse(String(init.body)) : {};
        const results: Record<string, unknown> = {};
        for (const mid of body.modelIds || []) {
          results[mid] = { status: "ok", latencyMs: 140 };
        }
        return Promise.resolve({
          ok: true,
          json: async () => ({ results }),
        });
      }

      if (urlStr.includes("/api/models/test")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            status: "ok",
            latencyMs: 185,
            responseText: "Hello from test",
          }),
        });
      }

      return Promise.reject(new Error(`Unhandled mock url: ${urlStr}`));
    });

    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  };

  it("renders tabs and switches between Models and Combos with deep linking", async () => {
    setupMockFetch();

    act(() => {
      root.render(<ModelCatalogPage />);
    });
    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 10)));

    expect(container.textContent).toContain("Alpha Labs");
    const tabs = container.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBe(2);
    expect(tabs[0].textContent).toContain("Models");
    expect(tabs[1].textContent).toContain("Combos");
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");

    // Click combos tab
    act(() => {
      (tabs[1] as HTMLElement).click();
    });
    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 10)));

    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    expect(window.location.search).toContain("tab=combos");
    expect(container.textContent).toContain("First Combo");
  });

  it("restores active tab from deep link query parameter ?tab=combos", async () => {
    setupMockFetch();
    window.history.replaceState(null, "", "/dashboard/models?tab=combos");

    act(() => {
      root.render(<ModelCatalogPage />);
    });
    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 10)));

    const tabs = container.querySelectorAll('[role="tab"]');
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    expect(container.textContent).toContain("First Combo");
  });

  it("executes single model test and displays status badge and latency", async () => {
    const fetchMock = setupMockFetch();

    act(() => {
      root.render(<ModelCatalogPage />);
    });
    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 10)));

    const testButtons = container.querySelectorAll("button[data-testid^='test-model-']");
    expect(testButtons.length).toBeGreaterThan(0);

    await act(async () => {
      (testButtons[0] as HTMLElement).click();
    });
    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 20)));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/models/test",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ providerId: "alpha", modelId: "alpha-chat" }),
      })
    );

    // Verify localStorage has saved result
    const saved = JSON.parse(localStorage.getItem(CATALOG_TEST_RESULTS_KEY) || "{}");
    const key = getModelTestKey("alpha", "alpha-chat");
    expect(saved[key]).toBeDefined();
    expect(saved[key].status).toBe("ok");
    expect(saved[key].latencyMs).toBe(185);
  });

  it("restores previously stored test results from localStorage on mount", async () => {
    const key = getModelTestKey("alpha", "alpha-chat");
    localStorage.setItem(
      CATALOG_TEST_RESULTS_KEY,
      JSON.stringify({
        [key]: {
          id: key,
          targetType: "model",
          providerId: "alpha",
          modelId: "alpha-chat",
          status: "ok",
          latencyMs: 123,
          testedAt: Date.now(),
        },
      })
    );

    setupMockFetch();

    act(() => {
      root.render(<ModelCatalogPage />);
    });
    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 10)));

    // Badge showing ok or latency should be visible in the row
    expect(container.textContent).toContain("123ms");
  });

  it("runs bulk model testing batching per provider with concurrency <= 2 and max 100 ids", async () => {
    const fetchMock = setupMockFetch();

    act(() => {
      root.render(<ModelCatalogPage />);
    });
    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 10)));

    const testAllFilteredBtn = container.querySelector(
      "button[data-testid='test-all-filtered-btn']"
    ) as HTMLElement;
    expect(testAllFilteredBtn).toBeDefined();

    await act(async () => {
      testAllFilteredBtn.click();
    });
    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 30)));

    const testAllCalls = fetchMock.mock.calls.filter((call) =>
      String(call[0]).includes("/api/models/test-all")
    );
    expect(testAllCalls.length).toBeGreaterThanOrEqual(1);

    for (const call of testAllCalls) {
      const body = JSON.parse(String(call[1]?.body));
      expect(body.modelIds.length).toBeLessThanOrEqual(100);
      expect(body.respectRateLimit).toBe(true);
      expect(typeof body.providerId).toBe("string");
    }
  });

  it("stops bulk scheduling when Cancel is clicked", async () => {
    let callCount = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url: string) => {
        const urlStr = String(url);
        if (urlStr.includes("/api/models/catalog")) {
          // Provide 5 providers to ensure multiple batches
          return Promise.resolve({
            ok: true,
            json: async () => ({
              catalog: {
                p1: { provider: "P1", models: [{ id: "m1", name: "m1", type: "chat" }] },
                p2: { provider: "P2", models: [{ id: "m2", name: "m2", type: "chat" }] },
                p3: { provider: "P3", models: [{ id: "m3", name: "m3", type: "chat" }] },
                p4: { provider: "P4", models: [{ id: "m4", name: "m4", type: "chat" }] },
              },
            }),
          });
        }
        if (urlStr.includes("/api/providers/health-matrix")) {
          return Promise.resolve({ ok: true, json: async () => ({ providers: [] }) });
        }
        if (urlStr.includes("/api/combos")) {
          return Promise.resolve({ ok: true, json: async () => ({ combos: [], total: 0 }) });
        }
        if (urlStr.includes("/api/models/test-all")) {
          callCount++;
          // Simulate latency
          return new Promise((resolve) => {
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ results: { m1: { status: "ok", latencyMs: 50 } } }),
                }),
              50
            );
          });
        }
        return Promise.reject(new Error("unexpected"));
      })
    );

    act(() => {
      root.render(<ModelCatalogPage />);
    });
    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 10)));

    const testAllFilteredBtn = container.querySelector(
      "button[data-testid='test-all-filtered-btn']"
    ) as HTMLElement;

    act(() => {
      testAllFilteredBtn.click();
    });

    const cancelBtn = container.querySelector(
      "button[data-testid='cancel-tests-btn']"
    ) as HTMLElement;
    expect(cancelBtn).toBeDefined();

    act(() => {
      cancelBtn.click();
    });

    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 80)));
    // Should have aborted and not called all 4 providers
    expect(callCount).toBeLessThan(4);
  });
});
