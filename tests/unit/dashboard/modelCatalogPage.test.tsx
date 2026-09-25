// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const translate = (key: string) => key;
    return Object.assign(translate, { has: () => false });
  },
}));

import ModelCatalogPage from "@/app/(dashboard)/dashboard/models/page";

describe("ModelCatalogPage", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

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
    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 0)));

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
    const modelSort = [...container.querySelectorAll("th button")].find(
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
    await act(async () => new Promise((resolve) => window.setTimeout(resolve, 0)));

    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      "Unable to load the model catalog."
    );
    expect(
      [...container.querySelectorAll("button")].some((button) => button.textContent === "Retry")
    ).toBe(true);
  });
});
