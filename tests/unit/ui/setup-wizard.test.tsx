// @vitest-environment jsdom
/**
 * UI unit tests for SetupWizard — 3-step flow.
 * Timeout raised to 30000ms to handle initial module transform overhead.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

const mockTarget = {
  id: "kiro" as const,
  name: "Kiro",
  icon: "smart_toy",
  color: "#FF9900",
  hosts: ["prod.kiro.aws"],
  port: 443,
  endpointPatterns: ["/v1/chat/completions"],
  defaultModels: [],
  setupTutorial: {
    steps: ["Install Kiro", "Enable trust cert", "Activate DNS"],
    detection: { command: "which kiro", platform: "all" as const },
  },
  handler: () => Promise.resolve({ default: class {} as never }),
  riskNoticeKey: "providers.riskNotice.oauth",
};

describe("SetupWizard", { timeout: 30000 }, () => {
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

  it("renders step 1 (verify) on open", async () => {
    const { SetupWizard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/SetupWizard"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(SetupWizard, {
          target: mockTarget,
          agentState: undefined,
          serverRunning: false,
          onClose: vi.fn(),
          onDnsToggle: vi.fn(),
        })
      );
    });

    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();
    expect(document.body.innerHTML).toContain("wizardStep1Label");
    expect(document.body.innerHTML).toContain("wizardStep1Desc");
  }, 30000);

  it("navigates to step 2 when Next clicked", async () => {
    const { SetupWizard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/SetupWizard"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(SetupWizard, {
          target: mockTarget,
          agentState: undefined,
          serverRunning: true,
          onClose: vi.fn(),
          onDnsToggle: vi.fn(),
        })
      );
    });

    const nextBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("next")
    );
    expect(nextBtn).not.toBeNull();

    await act(async () => {
      nextBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.body.innerHTML).toContain("wizardStep2Desc");
  }, 30000);

  it("calls onDnsToggle when enabling DNS in step 2", async () => {
    const { SetupWizard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/SetupWizard"
    );

    const onDnsToggle = vi.fn().mockResolvedValue(undefined);
    const container = makeContainer();

    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(SetupWizard, {
          target: mockTarget,
          agentState: {
            agent_id: "kiro",
            dns_enabled: false,
            cert_trusted: false,
            setup_completed: false,
            last_started_at: null,
            last_error: null,
          },
          serverRunning: true,
          onClose: vi.fn(),
          onDnsToggle,
        })
      );
    });

    // Navigate to step 2
    const nextBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("next")
    );
    await act(async () => {
      nextBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const enableDnsBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("wizardEnableDns")
    );
    expect(enableDnsBtn).not.toBeNull();

    await act(async () => {
      enableDnsBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onDnsToggle).toHaveBeenCalledWith("kiro", true);
  }, 30000);

  it("calls onClose when Cancel clicked on step 1", async () => {
    const { SetupWizard } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/SetupWizard"
    );

    const onClose = vi.fn();
    const container = makeContainer();

    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(SetupWizard, {
          target: mockTarget,
          agentState: undefined,
          serverRunning: false,
          onClose,
          onDnsToggle: vi.fn(),
        })
      );
    });

    const cancelBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("cancel")
    );
    await act(async () => {
      cancelBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onClose).toHaveBeenCalled();
  }, 30000);
});
