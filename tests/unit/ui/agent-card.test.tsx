// @vitest-environment jsdom
/**
 * UI unit tests for AgentCard — DNS toggle + wizard open.
 *
 * Note: AgentCard/SetupWizard import @/mitm/types (zod types only, no DB).
 * We set testTimeout=30000 to handle the initial transform overhead.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement("a", { href }, children),
}));

globalThis.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ data: [] }),
} as unknown as Response);

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

// Minimal mock target (matches MitmTarget shape but no heavy imports)
const mockTarget = {
  id: "copilot" as const,
  name: "GitHub Copilot",
  icon: "code",
  color: "#10B981",
  hosts: ["api.githubcopilot.com"],
  port: 443,
  endpointPatterns: ["/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  setupTutorial: {
    steps: ["Step 1", "Step 2"],
    detection: { command: "which copilot", platform: "all" as const },
  },
  handler: () => Promise.resolve({ default: class {} as never }),
  riskNoticeKey: "providers.riskNotice.oauth",
  viability: "supported" as const,
};

describe("AgentCard", { timeout: 30000 }, () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders agent name and hosts", async () => {
    const { AgentCard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentCard"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(AgentCard, {
          target: mockTarget,
          agentState: undefined,
          serverRunning: false,
          mappings: [],
          onDnsToggle: vi.fn(),
          onMappingsSave: vi.fn(),
        })
      );
    });

    expect(document.body.innerHTML).toContain("GitHub Copilot");
    expect(document.body.innerHTML).toContain("api.githubcopilot.com");
  }, 30000);

  it("expands on click and shows DNS toggle", async () => {
    const { AgentCard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentCard"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(AgentCard, {
          target: mockTarget,
          agentState: undefined,
          serverRunning: true,
          mappings: [],
          onDnsToggle: vi.fn(),
          onMappingsSave: vi.fn(),
        })
      );
    });

    const header = container.querySelector("button[aria-expanded]");
    expect(header).not.toBeNull();

    await act(async () => {
      header?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.body.innerHTML).toContain("startDns");
  }, 30000);

  it("calls onDnsToggle when DNS button clicked", async () => {
    const { AgentCard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentCard"
    );

    // Simulate that the per-agent RiskNoticeModal (Fix4 M5) has already been
    // accepted for this agent — otherwise the DNS click opens the modal first
    // and onDnsToggle is only called after the user accepts. We test the
    // "already accepted" path here; the modal flow is covered by
    // tests/unit/ui/agent-card-risk-modal.test.tsx.
    localStorage.setItem("omniroute-agentbridge-risk-dismissed-copilot", "true");

    const onDnsToggle = vi.fn().mockResolvedValue(undefined);
    const container = makeContainer();

    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(AgentCard, {
          target: mockTarget,
          agentState: {
            agent_id: "copilot",
            dns_enabled: false,
            cert_trusted: false,
            setup_completed: false,
            last_started_at: null,
            last_error: null,
          },
          serverRunning: true,
          mappings: [],
          onDnsToggle,
          onMappingsSave: vi.fn(),
        })
      );
    });

    // Expand card
    const header = container.querySelector("button[aria-expanded]");
    await act(async () => {
      header?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Find and click DNS button
    const dnsButton = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("startDns")
    );
    expect(dnsButton).not.toBeNull();

    await act(async () => {
      dnsButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onDnsToggle).toHaveBeenCalledWith("copilot", true);
  }, 30000);

  it("opens wizard when setup wizard button clicked", async () => {
    const { AgentCard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentCard"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(AgentCard, {
          target: mockTarget,
          agentState: undefined,
          serverRunning: true,
          mappings: [],
          onDnsToggle: vi.fn(),
          onMappingsSave: vi.fn(),
        })
      );
    });

    // Expand card first
    const header = container.querySelector("button[aria-expanded]");
    await act(async () => {
      header?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Find setup wizard button
    const wizardBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("setupWizard")
    );

    await act(async () => {
      wizardBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();
  }, 30000);
});
