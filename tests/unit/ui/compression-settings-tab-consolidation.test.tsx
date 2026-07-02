// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// next-intl → echo the key so we can assert on stable identifiers.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  Button: ({ children, onClick }: { children?: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

const CONFIG = {
  enabled: true,
  defaultMode: "standard",
  autoTriggerTokens: 0,
  cacheMinutes: 5,
  preserveSystemPrompt: true,
  comboOverrides: {},
  cavemanConfig: {
    enabled: true,
    compressRoles: ["user"],
    skipRules: [],
    minMessageLength: 50,
    preservePatterns: [],
    intensity: "full",
  },
  cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
  rtkConfig: { enabled: true, intensity: "standard" },
};

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot> | undefined;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) => {
      const u = String(url);
      if (u.includes("/api/settings/compression")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(CONFIG) });
      }
      if (u.includes("/api/compression/rules")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ rules: [] }) });
      }
      return Promise.resolve({ ok: false, json: () => Promise.resolve(null) });
    })
  );
});

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  container.remove();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

async function renderTab() {
  const { default: CompressionSettingsTab } =
    await import("@/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab");
  await act(async () => {
    root = createRoot(container);
    root.render(<CompressionSettingsTab />);
  });
  // Drain the on-mount fetch → json → setState microtask chain.
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe("CompressionSettingsTab — compression controls consolidation (T11)", () => {
  it("renders the read-only TokenSaver summary that links to the unified panel", async () => {
    await renderTab();
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/dashboard/context/settings");
    expect(container.textContent).toContain("tokenSaverTitle");
  });

  it("does not render a duplicate caveman engine on/off toggle (panel owns on/off)", async () => {
    await renderTab();
    const note = container.querySelector('[data-testid="caveman-panel-note"]');
    expect(note).not.toBeNull();
    // The note points users to the single-source panel...
    expect(note?.textContent).toContain("/dashboard/context/settings");
    // ...and the caveman header no longer carries its own enable toggle button.
    expect(note?.querySelector("button")).toBeNull();
  });

  it("keeps the advanced caveman tuning the panel does not expose", async () => {
    await renderTab();
    expect(container.textContent).toContain("compressionRoleUser");
    expect(container.textContent).toContain("compressionSkipRules");
    expect(container.textContent).toContain("compressionPreservePatterns");
  });
});
