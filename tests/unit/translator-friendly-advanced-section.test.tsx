// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Minimal i18n stub — returns the key so tests can assert on fallback rendering
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Card stub
vi.mock("@/shared/components", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
}));

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("AdvancedSection", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
  });

  it("exports a default function component", async () => {
    const mod = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection"
    );
    expect(typeof mod.default).toBe("function");
  });

  it("renders the card with header icon and title", async () => {
    const { default: AdvancedSection } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AdvancedSection />);
    });
    // Card should be in DOM
    expect(container.querySelector("[data-testid='card']")).toBeTruthy();
    // Header icon
    const icons = container.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
    expect(iconTexts).toContain("tune");
    // h3 heading present
    const h3 = container.querySelector("h3");
    expect(h3).toBeTruthy();
  });

  it("renders children passed to it", async () => {
    const { default: AdvancedSection } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <AdvancedSection>
          <div data-testid="child-accordion">child</div>
        </AdvancedSection>,
      );
    });
    expect(container.querySelector("[data-testid='child-accordion']")).toBeTruthy();
    expect(container.querySelector("[data-testid='child-accordion']")?.textContent).toBe("child");
  });

  it("renders accordion container with data-slug attribute reflecting forceOpenSlug", async () => {
    const { default: AdvancedSection } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AdvancedSection forceOpenSlug="rawjson" />);
    });
    const wrapper = container.querySelector("[data-advanced-container='true']");
    expect(wrapper).toBeTruthy();
    expect(wrapper?.getAttribute("data-slug")).toBe("rawjson");
  });

  it("renders data-slug=none when forceOpenSlug is null", async () => {
    const { default: AdvancedSection } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AdvancedSection forceOpenSlug={null} />);
    });
    const wrapper = container.querySelector("[data-advanced-container='true']");
    expect(wrapper?.getAttribute("data-slug")).toBe("none");
  });

  it("renders data-slug=none when forceOpenSlug is undefined", async () => {
    const { default: AdvancedSection } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AdvancedSection />);
    });
    const wrapper = container.querySelector("[data-advanced-container='true']");
    expect(wrapper?.getAttribute("data-slug")).toBe("none");
  });

  it("renders subtitle text using i18n fallback", async () => {
    const { default: AdvancedSection } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<AdvancedSection />);
    });
    const text = container.textContent ?? "";
    // Fallback subtitle text
    expect(text).toContain("Raw JSON");
    expect(text).toContain("pipeline");
  });

  it("renders multiple children", async () => {
    const { default: AdvancedSection } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <AdvancedSection>
          <div data-testid="accordion-1">RawJson</div>
          <div data-testid="accordion-2">Pipeline</div>
          <div data-testid="accordion-3">Stream</div>
        </AdvancedSection>,
      );
    });
    expect(container.querySelector("[data-testid='accordion-1']")).toBeTruthy();
    expect(container.querySelector("[data-testid='accordion-2']")).toBeTruthy();
    expect(container.querySelector("[data-testid='accordion-3']")).toBeTruthy();
  });
});
