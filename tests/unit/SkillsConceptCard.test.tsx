// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Minimal next-intl stub — returns the translation key for inspection.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Minimal next/link stub — renders as a plain anchor element.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => {
    container.remove();
  });
  return container;
}

describe("SkillsConceptCard", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders agent variant with correct i18n keys", async () => {
    const { SkillsConceptCard } = await import(
      "../../src/shared/components/SkillsConceptCard.tsx"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<SkillsConceptCard variant="agent" />);
    });

    const text = container.textContent ?? "";
    // The i18n mock returns the key itself, so these keys should appear.
    expect(text).toContain("conceptCard.agent.title");
    expect(text).toContain("conceptCard.agent.crossLinkLabel");
  });

  it("renders omni variant with correct i18n keys", async () => {
    const { SkillsConceptCard } = await import(
      "../../src/shared/components/SkillsConceptCard.tsx"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<SkillsConceptCard variant="omni" />);
    });

    const text = container.textContent ?? "";
    expect(text).toContain("conceptCard.omni.title");
    expect(text).toContain("conceptCard.omni.crossLinkLabel");
  });

  it("agent variant renders 5 comparison rows (whatIs, direction, executor, storage, tagline)", async () => {
    const { SkillsConceptCard } = await import(
      "../../src/shared/components/SkillsConceptCard.tsx"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<SkillsConceptCard variant="agent" />);
    });

    const rows = container.querySelectorAll("[data-testid^='comparison-row-']");
    expect(rows.length).toBe(5);

    const rowIds = Array.from(rows).map((r) => r.getAttribute("data-testid"));
    expect(rowIds).toContain("comparison-row-whatIs");
    expect(rowIds).toContain("comparison-row-direction");
    expect(rowIds).toContain("comparison-row-executor");
    expect(rowIds).toContain("comparison-row-storage");
    expect(rowIds).toContain("comparison-row-tagline");
  });

  it("omni variant renders 5 comparison rows", async () => {
    const { SkillsConceptCard } = await import(
      "../../src/shared/components/SkillsConceptCard.tsx"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<SkillsConceptCard variant="omni" />);
    });

    const rows = container.querySelectorAll("[data-testid^='comparison-row-']");
    expect(rows.length).toBe(5);
  });

  it("renders data-testid for variant", async () => {
    const { SkillsConceptCard } = await import(
      "../../src/shared/components/SkillsConceptCard.tsx"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<SkillsConceptCard variant="agent" />);
    });

    const card = container.querySelector("[data-testid='skills-concept-card-agent']");
    expect(card).not.toBeNull();
  });

  it("agent variant cross-link points to /dashboard/omni-skills", async () => {
    const { SkillsConceptCard } = await import(
      "../../src/shared/components/SkillsConceptCard.tsx"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<SkillsConceptCard variant="agent" />);
    });

    const link = container.querySelector("a");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe("/dashboard/omni-skills");
  });

  it("omni variant cross-link points to /dashboard/agent-skills", async () => {
    const { SkillsConceptCard } = await import(
      "../../src/shared/components/SkillsConceptCard.tsx"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<SkillsConceptCard variant="omni" />);
    });

    const link = container.querySelector("a");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe("/dashboard/agent-skills");
  });

  it("accepts optional className prop", async () => {
    const { SkillsConceptCard } = await import(
      "../../src/shared/components/SkillsConceptCard.tsx"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<SkillsConceptCard variant="agent" className="my-custom-class" />);
    });

    const el = container.firstElementChild as HTMLElement | null;
    expect(el?.className).toContain("my-custom-class");
  });

  it("renders without crashing when className is omitted", async () => {
    const { SkillsConceptCard } = await import(
      "../../src/shared/components/SkillsConceptCard.tsx"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<SkillsConceptCard variant="agent" />);
    });

    expect(container.children.length).toBeGreaterThan(0);
  });
});
