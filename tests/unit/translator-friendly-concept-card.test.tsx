// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Minimal i18n stub — returns the key so tests can assert on fallback rendering
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Minimal shared component stubs — Card wraps children, Tooltip passes through
vi.mock("@/shared/components", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div data-testid="card" className={className}>{children}</div>,
}));

vi.mock("@/shared/components/Tooltip", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
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

describe("TranslatorConceptCard", () => {
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
  });

  it("exports a default function component", { timeout: 30000 }, async () => {
    const mod = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslatorConceptCard"
    );
    expect(typeof mod.default).toBe("function");
  });

  it("renders the card with info icon and headline", async () => {
    const { default: TranslatorConceptCard } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslatorConceptCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslatorConceptCard />);
    });
    // Card should be in the DOM
    expect(container.querySelector("[data-testid='card']")).toBeTruthy();
    // Info icon should be present
    const icons = container.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
    expect(iconTexts).toContain("info");
  });

  it("renders the flow diagram with 4 FlowNode elements (app, source, hub, target)", async () => {
    const { default: TranslatorConceptCard } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslatorConceptCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslatorConceptCard />);
    });
    // The diagram grid should contain 4 node icons (smart_toy, psychology, hub, auto_awesome)
    const icons = container.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
    expect(iconTexts).toContain("smart_toy");
    expect(iconTexts).toContain("psychology");
    expect(iconTexts).toContain("hub");
    expect(iconTexts).toContain("auto_awesome");
  });

  it("renders the diagram with arrow_forward separators", async () => {
    const { default: TranslatorConceptCard } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslatorConceptCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslatorConceptCard />);
    });
    const icons = container.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
    // Three arrows between 4 nodes
    expect(iconTexts.filter((t) => t === "arrow_forward").length).toBeGreaterThanOrEqual(3);
  });

  it("toggle button starts collapsed (aria-expanded=false)", async () => {
    const { default: TranslatorConceptCard } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslatorConceptCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslatorConceptCard />);
    });
    const toggleBtn = container.querySelector(
      "button[aria-controls='translator-concept-how-it-works']",
    );
    expect(toggleBtn).toBeTruthy();
    expect(toggleBtn?.getAttribute("aria-expanded")).toBe("false");
    // Collapsed panel should not be in the DOM yet
    expect(container.querySelector("#translator-concept-how-it-works")).toBeNull();
  });

  it("toggle expands 'Como funciona' section and sets aria-expanded=true", async () => {
    const { default: TranslatorConceptCard } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslatorConceptCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslatorConceptCard />);
    });
    const toggleBtn = container.querySelector(
      "button[aria-controls='translator-concept-how-it-works']",
    ) as HTMLButtonElement | null;
    expect(toggleBtn).toBeTruthy();

    // Click to expand
    await act(async () => {
      toggleBtn?.click();
    });

    expect(toggleBtn?.getAttribute("aria-expanded")).toBe("true");
    const panel = container.querySelector("#translator-concept-how-it-works");
    expect(panel).toBeTruthy();
  });

  it("toggle collapses section on second click and restores aria-expanded=false", async () => {
    const { default: TranslatorConceptCard } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslatorConceptCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslatorConceptCard />);
    });
    const toggleBtn = container.querySelector(
      "button[aria-controls='translator-concept-how-it-works']",
    ) as HTMLButtonElement | null;

    // Expand
    await act(async () => {
      toggleBtn?.click();
    });
    expect(toggleBtn?.getAttribute("aria-expanded")).toBe("true");

    // Collapse
    await act(async () => {
      toggleBtn?.click();
    });
    expect(toggleBtn?.getAttribute("aria-expanded")).toBe("false");
    expect(container.querySelector("#translator-concept-how-it-works")).toBeNull();
  });

  it("toggle button icon changes between expand_more and expand_less", async () => {
    const { default: TranslatorConceptCard } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslatorConceptCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslatorConceptCard />);
    });

    const toggleBtn = container.querySelector(
      "button[aria-controls='translator-concept-how-it-works']",
    ) as HTMLButtonElement | null;

    // Initially collapsed: should show expand_more
    const btnIcons = toggleBtn?.querySelectorAll(".material-symbols-outlined");
    const btnIconTexts = Array.from(btnIcons ?? []).map((el) => el.textContent?.trim());
    expect(btnIconTexts).toContain("expand_more");
    expect(btnIconTexts).not.toContain("expand_less");

    // After click: should show expand_less
    await act(async () => {
      toggleBtn?.click();
    });
    const btnIconsAfter = toggleBtn?.querySelectorAll(".material-symbols-outlined");
    const btnIconTextsAfter = Array.from(btnIconsAfter ?? []).map((el) => el.textContent?.trim());
    expect(btnIconTextsAfter).toContain("expand_less");
    expect(btnIconTextsAfter).not.toContain("expand_more");
  });
});

describe("TranslateFlowDiagram", () => {
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
  });

  it("exports a default function component", async () => {
    const mod = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateFlowDiagram"
    );
    expect(typeof mod.default).toBe("function");
  });

  it("renders all 4 flow node icons (app, source, hub, target)", async () => {
    const { default: TranslateFlowDiagram } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateFlowDiagram"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslateFlowDiagram />);
    });
    const icons = container.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
    // 4 nodes: app, source format, OpenAI hub, target provider
    expect(iconTexts).toContain("smart_toy");
    expect(iconTexts).toContain("psychology");
    expect(iconTexts).toContain("hub");
    expect(iconTexts).toContain("auto_awesome");
  });

  it("renders exactly 3 arrow_forward separators between 4 nodes", async () => {
    const { default: TranslateFlowDiagram } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateFlowDiagram"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslateFlowDiagram />);
    });
    const icons = container.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
    expect(iconTexts.filter((t) => t === "arrow_forward")).toHaveLength(3);
  });

  it("renders a responsive grid container", async () => {
    const { default: TranslateFlowDiagram } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateFlowDiagram"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslateFlowDiagram />);
    });
    // The grid wrapper should have grid class and responsive columns
    const grid = container.querySelector(".grid");
    expect(grid).toBeTruthy();
    // Responsive class for sm breakpoint
    expect(grid?.className).toContain("sm:grid-cols-");
  });

  it("i18n fallback: renders labels using fallback strings when translations return keys", async () => {
    const { default: TranslateFlowDiagram } = await import(
      "@/app/(dashboard)/dashboard/translator/components/TranslateFlowDiagram"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<TranslateFlowDiagram />);
    });
    // When mock returns key, tr() detects key === translation and uses fallback
    // The fallback text should appear in the DOM
    const text = container.textContent ?? "";
    expect(text).toContain("Sua app");
    expect(text).toContain("ex: SDK Anthropic");
    expect(text).toContain("Formato origem");
    expect(text).toContain("claude");
    // 4th node: OpenAI hub
    expect(text).toContain("OpenAI (hub)");
    expect(text).toContain("Provider destino");
    expect(text).toContain("Gemini");
  });
});
