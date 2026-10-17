// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import ModelIntelligencePanel from "../components/ModelIntelligencePanel";

const noop = () => {};

function render(ui: React.ReactNode) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(ui));
  return { container, root };
}

describe("ModelIntelligencePanel", () => {
  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    document.body.innerHTML = "";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders the loading state on mount", async () => {
    vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {})) as unknown as typeof fetch);
    const { container } = render(
      <ModelIntelligencePanel providerId="openai" providerName="OpenAI" onClose={noop} />
    );
    expect(container.textContent).toContain("Loading intelligence scores");
  });

  it("renders the error state with a Retry button when fetch rejects", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({ error: "boom" }),
        })
      ) as unknown as typeof fetch
    );
    const { container } = render(
      <ModelIntelligencePanel providerId="openai" providerName="OpenAI" onClose={noop} />
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    expect(container.textContent).toContain("Failed to load intelligence scores.");
    expect(container.textContent).toContain("Retry");
  });

  it("renders the empty state when the provider has no intelligence scores", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve([]),
        })
      ) as unknown as typeof fetch
    );
    const { container } = render(
      <ModelIntelligencePanel providerId="openai" providerName="OpenAI" onClose={noop} />
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    expect(container.textContent).toContain(
      "No intelligence scores available for this provider."
    );
  });

  it("renders the toolbar with Select All, Free-only toggle, search, and close", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve([
              {
                modelId: "kimi-k2.6",
                modelName: "Kimi K2.6",
                score: 0.92,
                eloRaw: 1520,
                confidence: "high",
                category: "chat",
                isFree: true,
              },
            ]),
        })
      ) as unknown as typeof fetch
    );
    const { container } = render(
      <ModelIntelligencePanel providerId="openai" providerName="OpenAI" onClose={noop} />
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    expect(container.textContent).toContain("Select All");
    expect(container.textContent).toContain("Free-only");
    expect(container.querySelector('input[placeholder="Search models…"]')).toBeTruthy();
    expect(container.textContent).toContain("kimi-k2.6");
    expect(container.textContent).toContain("0.920");
  });

  it("calls onClose when the close button is clicked", async () => {
    const onClose = vi.fn();
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve([]),
        })
      ) as unknown as typeof fetch
    );
    const { container } = render(
      <ModelIntelligencePanel providerId="openai" providerName="OpenAI" onClose={onClose} />
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    const closeButtons = Array.from(container.querySelectorAll("button")).filter(
      (b) => b.getAttribute("aria-label") === "Close panel"
    );
    expect(closeButtons.length).toBeGreaterThan(0);
    await act(async () => {
      closeButtons[0].click();
    });
    expect(onClose).toHaveBeenCalled();
  });

  it("filters bars by search string", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve([
              {
                modelId: "kimi-k2.6",
                modelName: "Kimi K2.6",
                score: 0.92,
                eloRaw: 1520,
                confidence: "high",
                category: "chat",
                isFree: true,
              },
              {
                modelId: "glm-4.7",
                modelName: "GLM 4.7",
                score: 0.54,
                eloRaw: 1204,
                confidence: "low",
                category: "chat",
                isFree: false,
              },
            ]),
        })
      ) as unknown as typeof fetch
    );
    const { container } = render(
      <ModelIntelligencePanel providerId="openai" providerName="OpenAI" onClose={noop} />
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    const searchInput = container.querySelector('input[placeholder="Search models…"]') as HTMLInputElement;
    expect(searchInput).toBeTruthy();
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "kimi" } });
    });
    expect(container.textContent).toContain("kimi-k2.6");
    expect(container.textContent).not.toContain("glm-4.7");
  });
});
