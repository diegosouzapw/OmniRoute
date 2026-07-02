// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CliConceptType } from "@/shared/components/cli/CliConceptCard";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const messages: Record<string, string> = {
      "comparison.thisPage": "This page",
      "comparison.open": "Open →",
      "comparison.code.title": "Code tool",
      "comparison.agent.title": "Broad autonomous agent",
      "comparison.acp.title": "CLI used as backend by Omni",
    };
    return (key: string) => messages[key] ?? key;
  },
}));

// ── Import after mocks ────────────────────────────────────────────────────────

const { default: CliComparisonCard } = await import("@/shared/components/cli/CliComparisonCard");

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function renderCard(currentType: CliConceptType): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(<CliComparisonCard currentType={currentType} />);
  });
  return container;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("CliComparisonCard", () => {
  it("renders 3 columns for all types", () => {
    const container = renderCard("code");
    expect(container.textContent).toContain("Code tool");
    expect(container.textContent).toContain("Broad autonomous agent");
    expect(container.textContent).toContain("CLI used as backend by Omni");
  });

  it("shows current page badge for currentType=code column", () => {
    const container = renderCard("code");
    expect(container.textContent).toContain("This page");
    expect(container.textContent).toContain("✓");
  });

  it("shows current page badge for currentType=agent column", () => {
    const container = renderCard("agent");
    expect(container.textContent).toContain("This page");
    expect(container.textContent).toContain("✓");
  });

  it("shows current page badge for currentType=acp column", () => {
    const container = renderCard("acp");
    expect(container.textContent).toContain("This page");
    expect(container.textContent).toContain("✓");
  });

  it("renders Open → links for the non-current columns", () => {
    const container = renderCard("code");
    const links = container.querySelectorAll("a");
    const texts = Array.from(links).map((a) => a.textContent);
    const verLinks = texts.filter((t) => t?.includes("Open →"));
    // 2 non-current columns → 2 links
    expect(verLinks).toHaveLength(2);
  });

  it("for currentType=code, Ver → links point to agent and acp hrefs", () => {
    const container = renderCard("code");
    const links = container.querySelectorAll("a");
    const hrefs = Array.from(links).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/dashboard/cli-agents");
    expect(hrefs).toContain("/dashboard/acp-agents");
  });

  it("current column has primary styling class", () => {
    const container = renderCard("code");
    // The current column div has bg-primary/10 class
    const currentCol = container.querySelector('[class*="primary"]');
    expect(currentCol).not.toBeNull();
  });
});
