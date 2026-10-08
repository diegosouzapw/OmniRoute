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

describe("ModelCatalogPage", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval"] });
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    window.history.replaceState(null, "", "/dashboard/models");
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  /** Mount effects are deferred with setTimeout; run them and settle the fetch promises. */
  async function flush() {
    await act(async () => {
      await vi.runAllTimersAsync();
    });
  }

  it("loads all provider models and only labels flags the API actually reports", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
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
                  free: true,
                  context_length: 128_000,
                  capabilities: {
                    tools: true,
                    vision: true,
                    reasoning: true,
                    audio: true,
                    structured_output: true,
                  },
                },
              ],
            },
            beta: {
              provider: "Beta AI",
              models: [{ id: "beta-vision", name: "Beta Vision", type: "chat" }],
            },
          },
        }),
      })
    );

    act(() => {
      root.render(<ModelCatalogPage />);
    });
    await flush();

    expect(fetch).toHaveBeenCalledWith("/api/models/catalog", expect.anything());
    expect(container.textContent).toContain("Alpha Labs");
    expect(container.textContent).toContain("Beta AI");
    expect(container.textContent).toContain("Free");
    expect(container.textContent).not.toContain("Paid");
    expect(container.querySelector('[role="img"]')?.getAttribute("aria-label")).toBe(
      "Additional capabilities: Audio, Structured output"
    );
    expect(container.querySelectorAll("tbody tr")).toHaveLength(2);

    const providerFilter = container.querySelector("select")!;
    act(() => {
      providerFilter.value = "beta";
      providerFilter.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(container.querySelectorAll("tbody tr")).toHaveLength(1);
    expect(container.querySelector("tbody")?.textContent).toContain("Beta Vision");

    act(() => {
      providerFilter.value = "all";
      providerFilter.dispatchEvent(new Event("change", { bubbles: true }));
    });
    const modelSort = [...container.querySelectorAll<HTMLButtonElement>("th button")].find(
      (button) => button.textContent === "Model"
    )!;
    act(() => modelSort.click());
    act(() => modelSort.click());
    expect(modelSort.closest("th")?.getAttribute("aria-sort")).toBe("descending");
    expect(container.querySelector("tbody tr")?.textContent).toContain("Beta Vision");
  });

  it("shows a retry action after the catalog request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network unavailable")));

    act(() => {
      root.render(<ModelCatalogPage />);
    });
    await flush();

    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      "Unable to load the model catalog."
    );
    expect(
      [...container.querySelectorAll("button")].some((button) => button.textContent === "Retry")
    ).toBe(true);
  });
});
