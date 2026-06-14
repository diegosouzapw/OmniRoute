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
  useTranslations: () => (key: string) => key,
}));

// ── Import after mocks ────────────────────────────────────────────────────────

const { default: CliConceptCard } = await import("@/shared/components/cli/CliConceptCard");

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function renderCard(currentType: CliConceptType): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(<CliConceptCard currentType={currentType} />);
  });
  return container;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("CliConceptCard", () => {
  it("renders with currentType=code", () => {
    const container = renderCard("code");
    // The card renders (concept keys are shown as raw key strings from mock)
    expect(container.textContent).toContain("concept.code.title");
  });

  it("renders with currentType=agent", () => {
    const container = renderCard("agent");
    expect(container.textContent).toContain("concept.agent.title");
  });

  it("renders with currentType=acp", () => {
    const container = renderCard("acp");
    expect(container.textContent).toContain("concept.acp.title");
  });

  it("for currentType=code, card has primary bg class", () => {
    const container = renderCard("code");
    // The root card div should have primary/5 styling
    const card = container.firstElementChild as HTMLElement;
    expect(card?.className ?? "").toContain("primary");
  });

  it("for currentType=code, renders chips for agent and acp (not code)", () => {
    const container = renderCard("code");
    const links = container.querySelectorAll("a");
    const hrefs = Array.from(links).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/dashboard/cli-agents");
    expect(hrefs).toContain("/dashboard/acp-agents");
    // Should NOT link to itself
    expect(hrefs).not.toContain("/dashboard/cli-code");
  });

  it("for currentType=agent, renders chips for code and acp", () => {
    const container = renderCard("agent");
    const links = container.querySelectorAll("a");
    const hrefs = Array.from(links).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/dashboard/cli-code");
    expect(hrefs).toContain("/dashboard/acp-agents");
    expect(hrefs).not.toContain("/dashboard/cli-agents");
  });

  it("for currentType=acp, renders chips for code and agent", () => {
    const container = renderCard("acp");
    const links = container.querySelectorAll("a");
    const hrefs = Array.from(links).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/dashboard/cli-code");
    expect(hrefs).toContain("/dashboard/cli-agents");
    expect(hrefs).not.toContain("/dashboard/acp-agents");
  });
});
