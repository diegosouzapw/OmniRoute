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

const CATALOG = {
  claude: {
    provider: "Claude",
    models: [
      {
        id: "cc/claude-a",
        name: "Claude A",
        type: "chat",
        visibility: { modality: "chat", targets: [{ provider: "claude", modelId: "claude-a" }] },
      },
      {
        id: "cc/claude-b",
        name: "Claude B",
        type: "chat",
        hidden: true,
        visibility: { modality: "chat", targets: [{ provider: "cc", modelId: "claude-b" }] },
      },
    ],
  },
  openai: {
    provider: "OpenAI",
    models: [
      {
        id: "openai/gpt-x",
        name: "GPT X",
        type: "chat",
        visibility: { modality: "chat", targets: [{ provider: "openai", modelId: "gpt-x" }] },
      },
    ],
  },
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("Model catalog visibility controls", () => {
  let container: HTMLDivElement;
  let root: Root;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval"] });
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    window.history.replaceState(null, "", "/dashboard/models");
    fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/api/models/catalog"))
        return Promise.resolve(jsonResponse({ catalog: CATALOG }));
      if (url.includes("/api/provider-models")) return Promise.resolve(jsonResponse({ ok: true }));
      if (url.includes("/api/combos")) return Promise.resolve(jsonResponse({ combos: [] }));
      return Promise.resolve(jsonResponse({ providers: [] }));
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  async function flush() {
    await act(async () => {
      await vi.runAllTimersAsync();
    });
  }

  async function renderPage() {
    await act(async () => {
      root.render(<ModelCatalogPage />);
    });
    await flush();
  }

  async function click(element: Element | null) {
    expect(element).not.toBeNull();
    await act(async () => {
      (element as HTMLElement).click();
    });
    await flush();
  }

  function patchCalls() {
    return fetchMock.mock.calls
      .filter(([input]) => String(input).includes("/api/provider-models"))
      .map(([input, init]) => ({
        url: String(input),
        body: JSON.parse(String((init as RequestInit).body)),
      }));
  }

  it("shows counts, marks hidden rows and toggles one model through provider-models", async () => {
    await renderPage();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/models/catalog?includeHidden=1",
      expect.anything()
    );
    expect(container.querySelector("[data-testid='catalog-visibility-counts']")?.textContent).toBe(
      "2 visible · 1 hidden · 3 total"
    );
    const hiddenToggle = container.querySelector("[data-testid='toggle-visibility-cc/claude-b']");
    expect(hiddenToggle?.getAttribute("aria-checked")).toBe("false");

    await click(hiddenToggle);
    expect(patchCalls()).toEqual([
      {
        url: "/api/provider-models?provider=cc",
        body: { isHidden: false, modelIds: ["claude-b"], modality: "chat" },
      },
    ]);
    // The catalog is reloaded after the write.
    const catalogLoads = fetchMock.mock.calls.filter(([input]) =>
      String(input).includes("/api/models/catalog")
    );
    expect(catalogLoads.length).toBe(2);
  });

  it("hides every filtered visible model with one PATCH per provider", async () => {
    await renderPage();

    const hideButton = container.querySelector("[data-testid='hide-filtered-btn']");
    expect(hideButton?.textContent).toContain("Hide filtered (2)");
    expect(container.querySelector("[data-testid='show-filtered-btn']")?.textContent).toContain(
      "Show filtered (1)"
    );

    await click(hideButton);
    expect(patchCalls()).toEqual([
      {
        url: "/api/provider-models?provider=claude",
        body: { isHidden: true, modelIds: ["claude-a"], modality: "chat" },
      },
      {
        url: "/api/provider-models?provider=openai",
        body: { isHidden: true, modelIds: ["gpt-x"], modality: "chat" },
      },
    ]);
  });

  it("filters the table to hidden models from the visibility URL param", async () => {
    window.history.replaceState(null, "", "/dashboard/models?visibility=hidden");
    await renderPage();

    const rows = [...container.querySelectorAll("tbody tr")];
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain("Claude B");
    expect(rows[0].textContent).toContain("Hidden");
  });
});
