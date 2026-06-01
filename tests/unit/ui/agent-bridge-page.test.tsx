// @vitest-environment jsdom
/**
 * UI unit tests for AgentBridge page — smoke render + empty state.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement("a", { href }, children),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// Mock fetch for hooks
globalThis.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ data: [] }),
} as unknown as Response);

// ── Helpers ───────────────────────────────────────────────────────────────────

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("EmptyStateNoProviders", () => {
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

  it("renders empty state component with link to providers", async () => {
    const { EmptyStateNoProviders } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/EmptyStateNoProviders"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(React.createElement(EmptyStateNoProviders));
    });

    expect(document.body.innerHTML).toContain("emptyNoProvidersTitle");
    expect(document.body.innerHTML).toContain("/dashboard/providers");
  });
});

describe("RiskNoticeBanner", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
    try { localStorage.clear(); } catch { /* ignore */ }
  });

  it("renders risk notice banner when not dismissed", async () => {
    // Ensure not dismissed
    try { localStorage.removeItem("omniroute-agentbridge-risk-dismissed"); } catch { /* ignore */ }

    const { RiskNoticeBanner } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/RiskNoticeBanner"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(React.createElement(RiskNoticeBanner));
    });

    // Banner is rendered (useEffect fires synchronously in jsdom with act)
    // It shows "riskBannerTitle" i18n key
    expect(document.body.innerHTML).toContain("riskBannerTitle");
  });

  it("does not render risk banner when already dismissed", async () => {
    try {
      localStorage.setItem("omniroute-agentbridge-risk-dismissed", "true");
    } catch { /* ignore */ }

    const { RiskNoticeBanner } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/RiskNoticeBanner"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(React.createElement(RiskNoticeBanner));
    });

    expect(document.body.innerHTML).not.toContain("riskBannerTitle");
  });

  it("dismisses banner on close click", async () => {
    try { localStorage.removeItem("omniroute-agentbridge-risk-dismissed"); } catch { /* ignore */ }

    const { RiskNoticeBanner } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/RiskNoticeBanner"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(React.createElement(RiskNoticeBanner));
    });

    // Click dismiss
    const closeBtn = container.querySelector('button[aria-label]');
    await act(async () => {
      closeBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Banner gone
    expect(document.body.innerHTML).not.toContain("riskBannerTitle");
  });
});

describe("BypassListEditor", () => {
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

  it("renders default bypass patterns", async () => {
    const { BypassListEditor } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/BypassListEditor"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(BypassListEditor, {
          patterns: [],
          onSave: vi.fn(),
        })
      );
    });

    expect(document.body.innerHTML).toContain("*.bank.*");
    expect(document.body.innerHTML).toContain("*.okta.com");
  });

  it("renders initial user patterns in textarea", async () => {
    const { BypassListEditor } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/BypassListEditor"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(BypassListEditor, {
          patterns: ["*.internal.corp"],
          onSave: vi.fn(),
        })
      );
    });

    const textarea = container.querySelector("textarea");
    expect(textarea?.value).toContain("*.internal.corp");
  });
});
