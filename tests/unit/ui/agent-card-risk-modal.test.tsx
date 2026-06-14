// @vitest-environment jsdom
/**
 * Tests for AgentCard — per-agent RiskNoticeModal on first DNS activation.
 *
 * Covers:
 * - First toggle opens modal (does NOT call onDnsToggle immediately)
 * - Accept closes modal + calls onDnsToggle with true
 * - Second activation does NOT open modal (localStorage flag set)
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

// Button.tsx exposes a default export — match the real module shape so
// RiskNoticeModal (which uses `import Button from ...`) resolves correctly.
// Round 3 had this as a named-export mock, which masked the production
// `import { Button }` bug fixed in R4 #1.
vi.mock("@/shared/components/Button", () => ({
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string;
  }) => React.createElement("button", { type: "button", onClick }, children),
}));

globalThis.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ data: [] }),
} as unknown as Response);

const RISK_KEY_PREFIX = "omniroute-agentbridge-risk-dismissed-";

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

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
  riskNoticeKey: "oauth",
  viability: "supported" as const,
};

const baseAgentState = {
  agent_id: "copilot",
  dns_enabled: false,
  cert_trusted: true,
  setup_completed: true,
  last_started_at: null,
  last_error: null,
};

describe("AgentCard RiskNoticeModal", { timeout: 30000 }, () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    // Clear localStorage risk key before each test
    try {
      localStorage.removeItem(RISK_KEY_PREFIX + "copilot");
    } catch {
      // ignore
    }
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
    try {
      localStorage.removeItem(RISK_KEY_PREFIX + "copilot");
    } catch {
      // ignore
    }
  });

  it("first DNS activation opens risk modal (does NOT call onDnsToggle yet)", async () => {
    const { AgentCard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentCard"
    );

    const onDnsToggle = vi.fn().mockResolvedValue(undefined);
    const container = makeContainer();

    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(AgentCard, {
          target: mockTarget,
          agentState: baseAgentState,
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

    // Click DNS toggle (Start DNS)
    const dnsBtn = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("startDns")
    );
    expect(dnsBtn).not.toBeNull();

    await act(async () => {
      dnsBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Risk modal should be open (dialog element present)
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();

    // onDnsToggle should NOT have been called yet
    expect(onDnsToggle).not.toHaveBeenCalled();
  }, 30000);

  it("accepting risk modal closes modal and calls onDnsToggle with true", async () => {
    const { AgentCard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentCard"
    );

    const onDnsToggle = vi.fn().mockResolvedValue(undefined);
    const container = makeContainer();

    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(AgentCard, {
          target: mockTarget,
          agentState: baseAgentState,
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

    // Click DNS toggle to open modal
    const dnsBtn = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("startDns")
    );
    await act(async () => {
      dnsBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Modal should be open
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();

    // Click "I understand" (accept) button — uses t("understand") key
    const acceptBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("understand")
    );
    expect(acceptBtn).not.toBeNull();

    await act(async () => {
      acceptBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Modal should be closed
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();

    // onDnsToggle should have been called with true
    expect(onDnsToggle).toHaveBeenCalledWith("copilot", true);

    // localStorage flag should be set
    const stored = localStorage.getItem(RISK_KEY_PREFIX + "copilot");
    expect(stored).toBe("true");
  }, 30000);

  it("accepting risk writes localStorage exactly once (RiskNoticeModal is sole writer)", async () => {
    const { AgentCard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentCard"
    );

    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    const onDnsToggle = vi.fn().mockResolvedValue(undefined);
    const container = makeContainer();

    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(AgentCard, {
          target: mockTarget,
          agentState: baseAgentState,
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

    // Click DNS toggle to open modal
    const dnsBtn = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("startDns")
    );
    await act(async () => {
      dnsBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Accept modal
    const acceptBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("understand")
    );
    await act(async () => {
      acceptBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const riskKey = "omniroute-agentbridge-risk-dismissed-copilot";
    const riskWrites = setItemSpy.mock.calls.filter(([key]) => key === riskKey);
    // Must be exactly ONE write — RiskNoticeModal is the sole persistence owner (D16)
    expect(riskWrites).toHaveLength(1);
    expect(riskWrites[0][1]).toBe("true");

    setItemSpy.mockRestore();
  }, 30000);

  it("second DNS activation does NOT open modal when localStorage flag is set", async () => {
    // Pre-set the localStorage flag (simulates accepted risk on previous session)
    try {
      localStorage.setItem(RISK_KEY_PREFIX + "copilot", "true");
    } catch {
      // ignore
    }

    const { AgentCard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentCard"
    );

    const onDnsToggle = vi.fn().mockResolvedValue(undefined);
    const container = makeContainer();

    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(AgentCard, {
          target: mockTarget,
          agentState: baseAgentState,
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

    // Click DNS toggle
    const dnsBtn = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("startDns")
    );
    await act(async () => {
      dnsBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Risk modal should NOT appear
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();

    // onDnsToggle should have been called directly (no modal gate)
    expect(onDnsToggle).toHaveBeenCalledWith("copilot", true);
  }, 30000);

  it("cancelling risk modal keeps modal closed and does NOT call onDnsToggle", async () => {
    const { AgentCard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentCard"
    );

    const onDnsToggle = vi.fn().mockResolvedValue(undefined);
    const container = makeContainer();

    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(AgentCard, {
          target: mockTarget,
          agentState: baseAgentState,
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

    // Click DNS toggle to open modal
    const dnsBtn = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("startDns")
    );
    await act(async () => {
      dnsBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Modal should be open
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();

    // Click Cancel button
    const cancelBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("cancel")
    );
    expect(cancelBtn).not.toBeNull();

    await act(async () => {
      cancelBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Modal should be closed
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();

    // onDnsToggle should NOT have been called
    expect(onDnsToggle).not.toHaveBeenCalled();

    // localStorage flag should NOT be set (user cancelled)
    const stored = localStorage.getItem(RISK_KEY_PREFIX + "copilot");
    expect(stored).toBeNull();
  }, 30000);
});
