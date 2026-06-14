// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Import component after mocks ──────────────────────────────────────────────

const { default: SearchConceptCard } = await import(
  "../../../src/app/(dashboard)/dashboard/search-tools/components/SearchConceptCard"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderCard(props?: { defaultCollapsed?: boolean }): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(React.createElement(SearchConceptCard, props ?? {}));
  });
  containers.push({ root, el });
  return el;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("SearchConceptCard", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
  });

  it("renders with data-testid", () => {
    const el = renderCard();
    expect(el.querySelector("[data-testid='search-concept-card']")).toBeTruthy();
  });

  it("is expanded by default (defaultCollapsed=false)", () => {
    const el = renderCard({ defaultCollapsed: false });
    const content = el.querySelector("[data-testid='concept-card-content']");
    expect(content).toBeTruthy();
  });

  it("is expanded when no prop is passed", () => {
    const el = renderCard();
    const content = el.querySelector("[data-testid='concept-card-content']");
    expect(content).toBeTruthy();
  });

  it("is collapsed when defaultCollapsed=true", () => {
    const el = renderCard({ defaultCollapsed: true });
    const content = el.querySelector("[data-testid='concept-card-content']");
    expect(content).toBeNull();
  });

  it("toggles collapsed state when header is clicked", () => {
    const el = renderCard({ defaultCollapsed: false });
    const header = el.querySelector("button") as HTMLButtonElement;
    expect(el.querySelector("[data-testid='concept-card-content']")).toBeTruthy();

    act(() => {
      header.click();
    });
    expect(el.querySelector("[data-testid='concept-card-content']")).toBeNull();

    act(() => {
      header.click();
    });
    expect(el.querySelector("[data-testid='concept-card-content']")).toBeTruthy();
  });

  it("renders Search concept item", () => {
    const el = renderCard();
    const searchItem = el.querySelector("[data-testid='concept-item-search']");
    expect(searchItem).toBeTruthy();
    // useTranslations mock returns the key as text, so we assert on the i18n key
    expect(searchItem?.textContent).toContain("searchConceptTitle");
  });

  it("renders Scrape concept item", () => {
    const el = renderCard();
    const scrapeItem = el.querySelector("[data-testid='concept-item-scrape']");
    expect(scrapeItem).toBeTruthy();
    expect(scrapeItem?.textContent).toContain("scrapeConceptTitle");
  });

  it("renders Compare concept item", () => {
    const el = renderCard();
    const compareItem = el.querySelector("[data-testid='concept-item-compare']");
    expect(compareItem).toBeTruthy();
    expect(compareItem?.textContent).toContain("compareConceptTitle");
  });

  it("renders Rerank concept item", () => {
    const el = renderCard();
    const rerankItem = el.querySelector("[data-testid='concept-item-rerank']");
    expect(rerankItem).toBeTruthy();
  });

  it("aria-expanded reflects collapsed state", () => {
    const el = renderCard({ defaultCollapsed: false });
    const header = el.querySelector("button") as HTMLButtonElement;
    expect(header.getAttribute("aria-expanded")).toBe("true");

    act(() => {
      header.click();
    });
    expect(header.getAttribute("aria-expanded")).toBe("false");
  });
});
