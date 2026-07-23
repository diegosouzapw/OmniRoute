// @vitest-environment jsdom
/**
 * Tests for BatchConceptCard and FilesConceptCard (F3 UI atoms).
 *
 * Covers:
 * - Mount with i18n mock → renders expected keys
 * - Collapse/expand toggle via button click
 * - localStorage hydration (collapsed state restored)
 * - FilesConceptCard: type pills rendered (input/output/error)
 * - Sanitization: no stack/path in rendered output (these are static components, so trivially OK)
 */

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Import components after mocks ─────────────────────────────────────────────

const { default: BatchConceptCard } = await import(
  "../../../../src/app/(dashboard)/dashboard/batch/components/BatchConceptCard"
);
const { default: FilesConceptCard } = await import(
  "../../../../src/app/(dashboard)/dashboard/batch/components/FilesConceptCard"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderBatchCard(props: { className?: string } = {}) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<BatchConceptCard {...props} />);
  });
  containers.push({ root, el });
  return el;
}

function renderFilesCard(props: { className?: string } = {}) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<FilesConceptCard {...props} />);
  });
  containers.push({ root, el });
  return el;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

// ── BatchConceptCard tests ────────────────────────────────────────────────────

describe("BatchConceptCard", () => {
  it("renders title and subtitle keys", () => {
    const el = renderBatchCard();
    expect(el.textContent).toContain("batchConceptTitle");
    expect(el.textContent).toContain("batchConceptSubtitle");
  });

  it("renders how-it-works button", () => {
    const el = renderBatchCard();
    expect(el.textContent).toContain("batchConceptHowItWorks");
  });

  it("renders expanded content by default (benefit/async/useCases keys visible)", () => {
    const el = renderBatchCard();
    // Default state is expanded (collapsed=false)
    expect(el.textContent).toContain("batchConceptBenefit50pct");
    expect(el.textContent).toContain("batchConceptAsync24h");
    expect(el.textContent).toContain("batchConceptUseCases");
  });

  it("collapses when toggle button is clicked", async () => {
    const el = renderBatchCard();
    const toggleBtn = el.querySelector("button[aria-expanded='true']");
    expect(toggleBtn).not.toBeNull();

    await act(async () => {
      toggleBtn!.click();
    });

    // After collapse: benefit key should not be in the DOM
    expect(el.textContent).not.toContain("batchConceptBenefit50pct");
    // aria-expanded should now be false
    const toggleBtnAfter = el.querySelector("button[aria-expanded='false']");
    expect(toggleBtnAfter).not.toBeNull();
  });

  it("stores collapsed state in localStorage on toggle", async () => {
    const el = renderBatchCard();
    const toggleBtn = el.querySelector("button[aria-expanded='true']");

    await act(async () => {
      toggleBtn!.click();
    });

    expect(localStorage.getItem("omniroute:concept-batch-collapsed")).toBe("true");
  });

  it("expands again when toggled twice", async () => {
    const el = renderBatchCard();
    const toggleBtn = el.querySelector("button");

    await act(async () => {
      toggleBtn!.click(); // collapse
    });
    await act(async () => {
      const btn = el.querySelector("button");
      btn!.click(); // expand again
    });

    expect(el.textContent).toContain("batchConceptBenefit50pct");
    expect(localStorage.getItem("omniroute:concept-batch-collapsed")).toBe("false");
  });

  it("hydrates collapsed state from localStorage (shows collapsed on mount)", async () => {
    // Pre-set collapsed=true in localStorage
    localStorage.setItem("omniroute:concept-batch-collapsed", "true");

    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);

    await act(async () => {
      root.render(<BatchConceptCard />);
    });

    containers.push({ root, el });

    // After hydration, localStorage says collapsed=true — content should not be visible
    // Note: hydration runs in useEffect (async), so we wait a tick
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    expect(el.textContent).not.toContain("batchConceptBenefit50pct");
  });

  it("accepts optional className prop without crashing", () => {
    const el = renderBatchCard({ className: "custom-class" });
    const card = el.firstElementChild as HTMLElement;
    expect(card?.className).toContain("custom-class");
  });

  it("sanitization: no stack trace or file path in rendered output", () => {
    const el = renderBatchCard();
    // Static component — should never contain paths/stacks
    const text = el.textContent ?? "";
    expect(text).not.toMatch(/\/home\//);
    expect(text).not.toMatch(/at \//);
    expect(text).not.toMatch(/route\.ts/);
  });
});

// ── FilesConceptCard tests ────────────────────────────────────────────────────

describe("FilesConceptCard", () => {
  it("renders title and subtitle keys", () => {
    const el = renderFilesCard();
    expect(el.textContent).toContain("filesConceptTitle");
    expect(el.textContent).toContain("filesConceptSubtitle");
  });

  it("renders all three file type pills (input/output/error)", () => {
    const el = renderFilesCard();
    expect(el.textContent).toContain("filesConceptInput");
    expect(el.textContent).toContain("filesConceptOutput");
    expect(el.textContent).toContain("filesConceptError");
  });

  it("renders expanded bullet points by default", () => {
    const el = renderFilesCard();
    // Expanded = expanded content with filesConceptRetention visible
    expect(el.textContent).toContain("filesConceptRetention");
  });

  it("collapses when toggle button is clicked", async () => {
    const el = renderFilesCard();
    const toggleBtn = el.querySelector("button[aria-expanded='true']");
    expect(toggleBtn).not.toBeNull();

    await act(async () => {
      toggleBtn!.click();
    });

    // After collapse: retention key should not be in the dom
    expect(el.textContent).not.toContain("filesConceptRetention");
    expect(el.querySelector("button[aria-expanded='false']")).not.toBeNull();
  });

  it("persists collapsed state in localStorage", async () => {
    const el = renderFilesCard();
    const toggleBtn = el.querySelector("button[aria-expanded='true']");

    await act(async () => {
      toggleBtn!.click();
    });

    expect(localStorage.getItem("omniroute:concept-files-collapsed")).toBe("true");
  });

  it("hydrates from localStorage — collapsed=true persists across remounts", async () => {
    localStorage.setItem("omniroute:concept-files-collapsed", "true");

    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);

    await act(async () => {
      root.render(<FilesConceptCard />);
    });

    containers.push({ root, el });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    // Should not show retention text when collapsed
    expect(el.textContent).not.toContain("filesConceptRetention");
  });

  it("sanitization: no stack trace in rendered output", () => {
    const el = renderFilesCard();
    const text = el.textContent ?? "";
    expect(text).not.toMatch(/\/home\//);
    expect(text).not.toMatch(/at \//);
    expect(text).not.toMatch(/route\.ts/);
  });
});
