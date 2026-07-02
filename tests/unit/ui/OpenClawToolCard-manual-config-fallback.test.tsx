// @vitest-environment jsdom
//
// Regression test: when the Open Claw CLI is not detected locally (typical of
// remote OmniRoute deployments where the CLI lives on the user's laptop, not
// on the server), the card must still surface a "Manual Config" button so the
// user can copy the settings.json snippet and paste it into the CLI on their
// local machine. Before this fix the Manual Config button only rendered when
// `cliReady === true`, which made the card useless for remote deployments
// (upstream report: decolua/9router#579, port of decolua/9router#615).
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    const messages: Record<string, string> = {
      cliNotInstalled: "{tool} CLI not detected locally",
      cliNotRunnable: "{tool} CLI installed but not runnable",
      installCliPrompt:
        "Manual configuration is still available if OmniRoute is deployed on a remote server.",
      cliFoundFailedHealthcheck: "{tool} CLI was found but failed runtime healthcheck{reason}.",
      manualConfig: "Manual Config",
      checkingCli: "Checking {tool}...",
      openClawManualConfiguration: "Open Claw Manual Configuration",
      "toolDescriptions.openclaw": "Open Claw CLI",
    };
    const raw = messages[key] ?? key;
    if (!values) return raw;
    return Object.entries(values).reduce(
      (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v ?? "")),
      raw
    );
  },
  useLocale: () => "en",
}));

vi.mock("next/image", () => ({
  default: () => <span data-testid="next-image" />,
}));

vi.mock("@/app/(dashboard)/dashboard/cli-code/components/CliStatusBadge", () => ({
  default: () => <span data-testid="status-badge" />,
}));

// Surface ManualConfigModal as a marker so we can assert it gets rendered with
// isOpen=true after clicking the new Manual Config button.
vi.mock("@/shared/components", async () => {
  const React = await import("react");
  return {
    Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Button: ({
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick?: () => void;
    }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    ModelSelectModal: () => null,
    ManualConfigModal: ({ isOpen, title }: { isOpen: boolean; title?: string }) =>
      isOpen ? <div data-testid="manual-config-modal">{title}</div> : null,
  };
});

// ── Fetch stub ────────────────────────────────────────────────────────────────

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  // Return: CLI not installed (the broken-on-remote case from upstream #579).
  globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input.toString();
    if (url.includes("/api/cli-tools/openclaw-settings")) {
      return new Response(JSON.stringify({ installed: false }), { status: 200 });
    }
    if (url.includes("/api/models/alias")) {
      return new Response(JSON.stringify({ aliases: {} }), { status: 200 });
    }
    if (url.includes("/api/cli-tools/backups")) {
      return new Response(JSON.stringify({ backups: [] }), { status: 200 });
    }
    return new Response("{}", { status: 200 });
  }) as unknown as typeof fetch;
});

const containers: HTMLElement[] = [];

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// ── Import under test (after mocks) ───────────────────────────────────────────

const { default: OpenClawToolCard } = await import(
  "@/app/(dashboard)/dashboard/cli-code/components/OpenClawToolCard"
);

async function renderExpanded() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(
      <OpenClawToolCard
        tool={{ name: "Open Claw", defaultModels: [] }}
        isExpanded={true}
        onToggle={() => {}}
        activeProviders={[]}
        baseUrl="http://localhost:20128"
        hasActiveProviders={false}
        apiKeys={[]}
        cloudEnabled={false}
        batchStatus={null}
        lastConfiguredAt={null}
      />
    );
  });
  // Allow microtasks for the fetch() promise + state update to flush.
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
  return container;
}

describe("OpenClawToolCard — manual-config CTA when CLI is not detected", () => {
  it("renders the Manual Config button when CLI is not installed", async () => {
    const container = await renderExpanded();
    const buttons = Array.from(container.querySelectorAll("button"));
    const labels = buttons.map((b) => b.textContent ?? "");
    expect(labels.some((l) => l.includes("Manual Config"))).toBe(true);
  });

  it("opens the ManualConfigModal when the Manual Config button is clicked", async () => {
    const container = await renderExpanded();
    const manualBtn = Array.from(container.querySelectorAll("button")).find((b) =>
      (b.textContent ?? "").includes("Manual Config")
    );
    expect(manualBtn).toBeTruthy();

    await act(async () => {
      manualBtn!.click();
    });

    expect(container.querySelector("[data-testid='manual-config-modal']")).not.toBeNull();
  });
});
