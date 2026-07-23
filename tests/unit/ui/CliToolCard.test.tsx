// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CliCatalogEntry } from "@/shared/schemas/cliCatalog";
import type { ToolBatchStatus } from "@/shared/types/cliBatchStatus";

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
      "card.detected": "Detected",
      "card.notDetected": "Not detected",
      "card.configure": "Configure →",
      "card.howToInstall": "How to install →",
      "card.baseUrlPartial": "Partial Base URL",
      "card.alsoAcp": "also ACP",
      "card.connectProviderHint": "Connect a provider in Providers",
    };
    return (key: string) => messages[key] ?? key;
  },
  useLocale: () => "en",
}));

// Stub CliStatusBadge so it doesn't need next-intl internals
vi.mock("@/app/(dashboard)/dashboard/cli-code/components/CliStatusBadge", () => ({
  default: ({
    effectiveConfigStatus,
  }: {
    effectiveConfigStatus: string | null;
    batchStatus: null;
    lastConfiguredAt: string | null;
  }) => <span data-testid="status-badge">{effectiveConfigStatus}</span>,
}));

// ── Import after mocks ────────────────────────────────────────────────────────

const { default: CliToolCard } = await import("@/shared/components/cli/CliToolCard");

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makeTool(overrides: Partial<CliCatalogEntry> = {}): CliCatalogEntry {
  return {
    id: "claude",
    name: "Claude Code",
    icon: "terminal",
    color: "#D97757",
    description: "Anthropic Claude Code CLI",
    docsUrl: "https://example.com",
    configType: "env",
    category: "code",
    vendor: "Anthropic",
    acpSpawnable: false,
    baseUrlSupport: "full",
    ...overrides,
  };
}

function makeBatchStatus(overrides: Partial<ToolBatchStatus> = {}): ToolBatchStatus {
  return {
    detection: { installed: true, runnable: true, version: "1.2.3" },
    config: { status: "configured", endpoint: "http://localhost:20128", lastConfiguredAt: null },
    ...overrides,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function renderCard(
  tool: CliCatalogEntry,
  batchStatus: ToolBatchStatus | null,
  detailHref: string,
  hasActiveProviders: boolean
): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(
      <CliToolCard
        tool={tool}
        batchStatus={batchStatus}
        detailHref={detailHref}
        hasActiveProviders={hasActiveProviders}
      />
    );
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

describe("CliToolCard", () => {
  it("renders tool name", () => {
    const container = renderCard(makeTool(), makeBatchStatus(), "/dashboard/cli-code/claude", true);
    expect(container.textContent).toContain("Claude Code");
  });

  it("links to detailHref", () => {
    const container = renderCard(makeTool(), makeBatchStatus(), "/dashboard/cli-code/claude", true);
    const link = container.querySelector("a");
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe("/dashboard/cli-code/claude");
  });

  it("shows version when installed", () => {
    const container = renderCard(makeTool(), makeBatchStatus(), "/detail", true);
    expect(container.textContent).toContain("1.2.3");
  });

  it("shows 'not found' when not installed", () => {
    const status = makeBatchStatus({
      detection: { installed: false, runnable: false, version: undefined },
    });
    const container = renderCard(makeTool(), status, "/detail", true);
    expect(container.textContent).toContain("not found");
  });

  it("shows configure footer when installed", () => {
    const container = renderCard(makeTool(), makeBatchStatus(), "/detail", true);
    expect(container.textContent).toContain("Configure →");
  });

  it("shows install footer when not installed", () => {
    const status = makeBatchStatus({
      detection: { installed: false, runnable: false },
    });
    const container = renderCard(makeTool(), status, "/detail", true);
    expect(container.textContent).toContain("How to install →");
  });

  it("shows partial baseUrl amber badge", () => {
    const tool = makeTool({ baseUrlSupport: "partial" });
    const container = renderCard(tool, makeBatchStatus(), "/detail", true);
    expect(container.textContent).toContain("Partial Base URL");
  });

  it("shows also ACP badge when acpSpawnable is true", () => {
    const tool = makeTool({ acpSpawnable: true });
    const container = renderCard(tool, makeBatchStatus(), "/detail", true);
    expect(container.textContent).toContain("also ACP");
  });

  it("shows provider tooltip text when hasActiveProviders is false", () => {
    const container = renderCard(makeTool(), makeBatchStatus(), "/detail", false);
    expect(container.textContent).toContain("Connect a provider in Providers");
  });

  it("shows install chips when not installed and configType is not guide", () => {
    const status = makeBatchStatus({
      detection: { installed: false, runnable: false },
    });
    const tool = makeTool({ configType: "custom" });
    const container = renderCard(tool, status, "/detail", true);
    expect(container.textContent).toContain("Manual config");
    expect(container.textContent).toContain("Install");
  });

  it("does NOT show install chips when configType is guide", () => {
    const status = makeBatchStatus({
      detection: { installed: false, runnable: false },
    });
    const tool = makeTool({ configType: "guide" });
    const container = renderCard(tool, status, "/detail", true);
    expect(container.textContent).not.toContain("Manual config");
  });

  it("renders gracefully with null batchStatus", () => {
    const container = renderCard(makeTool(), null, "/detail", true);
    expect(container.textContent).toContain("Claude Code");
    expect(container.textContent).toContain("not found");
  });
});
