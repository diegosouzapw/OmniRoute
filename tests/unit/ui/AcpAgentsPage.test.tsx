// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

let capturedTranslationsNamespace = "";

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
  useTranslations: (ns: string) => {
    capturedTranslationsNamespace = ns;
    return (key: string) => key;
  },
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  ),
  Button: ({
    children,
    onClick,
    loading,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) => (
    <button onClick={onClick} disabled={loading} {...props}>
      {children}
    </button>
  ),
  Input: ({
    label,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => (
    <input aria-label={label} {...props} />
  ),
}));

vi.mock("@/shared/components/ProviderIcon", () => ({
  default: ({ providerId }: { providerId: string; size?: number; type?: string }) => (
    <span data-testid="provider-icon" data-provider={providerId} />
  ),
}));

vi.mock("@/shared/components/cli", () => ({
  CliConceptCard: ({ currentType }: { currentType: string }) => (
    <div data-testid="cli-concept-card" data-current-type={currentType} />
  ),
  CliComparisonCard: ({ currentType }: { currentType: string }) => (
    <div data-testid="cli-comparison-card" data-current-type={currentType} />
  ),
}));

// ── Fetch mock ────────────────────────────────────────────────────────────────

const mockAgents = [
  {
    id: "claude-code",
    name: "Claude Code",
    binary: "claude",
    version: "1.2.3",
    installed: true,
    protocol: "stdio",
    isCustom: false,
  },
  {
    id: "codex",
    name: "Codex",
    binary: "codex",
    version: null,
    installed: false,
    protocol: "stdio",
    isCustom: false,
  },
];

const mockSummary = {
  total: 2,
  installed: 1,
  notFound: 1,
  builtIn: 2,
  custom: 0,
};

const mockFetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ agents: mockAgents, summary: mockSummary }),
});

(globalThis as typeof globalThis & { fetch: typeof fetch }).fetch = mockFetch;

// ── Import after mocks ────────────────────────────────────────────────────────

const { default: AcpAgentsPage } = await import(
  "@/app/(dashboard)/dashboard/acp-agents/page"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

async function renderPage(): Promise<HTMLElement> {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  await act(async () => {
    root.render(<AcpAgentsPage />);
  });
  // Allow data-fetching effects to resolve
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
  return container;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  capturedTranslationsNamespace = "";
  mockFetch.mockClear();
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("AcpAgentsPage", () => {
  it("smoke: renders without crashing", async () => {
    const container = await renderPage();
    expect(container).toBeTruthy();
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("calls useTranslations with 'acpAgents' namespace", async () => {
    await renderPage();
    expect(capturedTranslationsNamespace).toBe("acpAgents");
  });

  it("renders <CliConceptCard currentType='acp' />", async () => {
    const container = await renderPage();
    const card = container.querySelector("[data-testid='cli-concept-card']");
    expect(card).not.toBeNull();
    expect(card?.getAttribute("data-current-type")).toBe("acp");
  });

  it("renders <CliComparisonCard currentType='acp' />", async () => {
    const container = await renderPage();
    const card = container.querySelector("[data-testid='cli-comparison-card']");
    expect(card).not.toBeNull();
    expect(card?.getAttribute("data-current-type")).toBe("acp");
  });

  it("cross-link points to /dashboard/cli-code (not /dashboard/cli-tools)", async () => {
    const container = await renderPage();
    const links = container.querySelectorAll("a");
    const hrefs = Array.from(links).map((a) => a.getAttribute("href"));
    const cliCodeLinks = hrefs.filter((h) => h === "/dashboard/cli-code");
    const cliToolsLinks = hrefs.filter((h) => h === "/dashboard/cli-tools");
    expect(cliCodeLinks.length).toBeGreaterThan(0);
    expect(cliToolsLinks).toHaveLength(0);
  });

  it("agent grid renders with mocked /api/acp/agents response", async () => {
    const container = await renderPage();
    expect(mockFetch).toHaveBeenCalledWith("/api/acp/agents");
    // Agent names from mock should appear somewhere in the rendered output
    expect(container.textContent).toContain("Claude Code");
    expect(container.textContent).toContain("Codex");
  });
});
