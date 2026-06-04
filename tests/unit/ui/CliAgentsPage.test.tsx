// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ToolBatchStatusMap } from "@/shared/types/cliBatchStatus";

// ── Mocks (declared before any imports that depend on them) ───────────────────

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

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// Stub CliStatusBadge so it doesn't depend on next-intl internals
vi.mock("@/app/(dashboard)/dashboard/cli-code/components/CliStatusBadge", () => ({
  default: ({
    effectiveConfigStatus,
  }: {
    effectiveConfigStatus: string | null;
    batchStatus: null;
    lastConfiguredAt: string | null;
  }) => <span data-testid="status-badge">{effectiveConfigStatus}</span>,
}));

// ── Static imports after mocks ────────────────────────────────────────────────

const { default: CliAgentsPageClient } = await import(
  "@/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient"
);

// ── Fixtures ──────────────────────────────────────────────────────────────────

/** 6 agent tool ids from the catalog (§3.2 of plan-14) */
const AGENT_IDS = [
  "openclaw",
  "hermes-agent",
  "goose",
  "interpreter",
  "warp",
  "agent-deck",
] as const;

function makeBatchStatusMap(overrides: Partial<ToolBatchStatusMap> = {}): ToolBatchStatusMap {
  const base: ToolBatchStatusMap = {};
  for (const id of AGENT_IDS) {
    base[id] = {
      detection: { installed: true, runnable: true, version: "1.0.0" },
      config: { status: "configured", endpoint: "http://localhost:20128", lastConfiguredAt: null },
    };
  }
  return { ...base, ...overrides };
}

function makeFetch(data: unknown, status = 200): typeof fetch {
  return vi.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(String(data)),
    } as Response)
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];
const roots: ReturnType<typeof createRoot>[] = [];

async function renderPage(mockFetchFn?: typeof fetch): Promise<HTMLElement> {
  vi.stubGlobal("fetch", mockFetchFn ?? makeFetch(makeBatchStatusMap()));

  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  roots.push(root);

  await act(async () => {
    root.render(<CliAgentsPageClient machineId="test-machine" />);
    await new Promise((r) => setTimeout(r, 100));
  });

  return container;
}

function countAgentCards(container: HTMLElement): number {
  return Array.from(container.querySelectorAll<HTMLAnchorElement>("a[href]")).filter((a) =>
    a.getAttribute("href")?.startsWith("/dashboard/cli-agents/")
  ).length;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  act(() => {
    while (roots.length > 0) {
      roots.pop()?.unmount();
    }
  });
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("CliAgentsPageClient", () => {
  it("1. smoke render — mounts without crash and shows page title key", async () => {
    const container = await renderPage();
    expect(container.textContent).toContain("pageTitle");
  }, 15000);

  it("2. renders exactly 6 agent tool cards", async () => {
    const container = await renderPage();
    expect(countAgentCards(container)).toBe(6);
  }, 15000);

  it("3. search filter — 'hermes' shows 1 card (hermes-agent)", async () => {
    const container = await renderPage();

    const input = container.querySelector("input[type='search']") as HTMLInputElement;
    expect(input).not.toBeNull();

    await act(async () => {
      // Use native value setter to trigger React's synthetic onChange
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeSetter?.call(input, "hermes");
      input.dispatchEvent(new Event("change", { bubbles: true }));
      await new Promise((r) => setTimeout(r, 50));
    });

    const visibleCards = countAgentCards(container);
    expect(visibleCards).toBe(1);

    const remainingHrefs = Array.from(
      container.querySelectorAll<HTMLAnchorElement>("a[href]")
    )
      .filter((a) => a.getAttribute("href")?.startsWith("/dashboard/cli-agents/"))
      .map((a) => a.getAttribute("href") ?? "");

    expect(remainingHrefs[0]).toContain("hermes");
  }, 15000);

  it("4. detection filter 'not_installed' — shows only non-installed tools", async () => {
    // Only hermes-agent is not installed
    const map = makeBatchStatusMap({
      "hermes-agent": {
        detection: { installed: false, runnable: false },
        config: { status: "not_installed", endpoint: null, lastConfiguredAt: null },
      },
    });
    const container = await renderPage(makeFetch(map));

    const select = container.querySelector("select") as HTMLSelectElement;
    expect(select).not.toBeNull();

    await act(async () => {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLSelectElement.prototype,
        "value"
      )?.set;
      nativeSetter?.call(select, "not_installed");
      select.dispatchEvent(new Event("change", { bubbles: true }));
      await new Promise((r) => setTimeout(r, 50));
    });

    expect(countAgentCards(container)).toBe(1);
    const href = Array.from(container.querySelectorAll<HTMLAnchorElement>("a[href]"))
      .find((a) => a.getAttribute("href")?.startsWith("/dashboard/cli-agents/"))
      ?.getAttribute("href");
    expect(href).toContain("hermes-agent");
  }, 15000);

  it("5. empty state — shows data-testid='empty-state' when no tools match search", async () => {
    const container = await renderPage();

    await act(async () => {
      const input = container.querySelector("input[type='search']") as HTMLInputElement;
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeSetter?.call(input, "zzznothingmatchesxyz");
      input.dispatchEvent(new Event("change", { bubbles: true }));
      await new Promise((r) => setTimeout(r, 50));
    });

    const emptyState = container.querySelector("[data-testid='empty-state']");
    expect(emptyState).not.toBeNull();
  }, 15000);

  it("6. CliConceptCard currentType='agent' — concept.agent.title key is present", async () => {
    const container = await renderPage();
    // CliConceptCard renders "concept.agent.title" via the mock translator
    expect(container.textContent).toContain("concept.agent.title");
  }, 15000);

  it("7. CliComparisonCard currentType='agent' — comparison.agent.title + Esta página ✓", async () => {
    const container = await renderPage();
    // CliComparisonCard renders comparison.agent.title for the current column
    expect(container.textContent).toContain("comparison.agent.title");
    // thisPage badge appears for the agent column
    expect(container.textContent).toContain("comparison.thisPage");
    expect(container.textContent).toContain("✓");
  }, 15000);

  it("8. refresh button calls refetch — triggers additional fetch call", async () => {
    const mockFetchFn = makeFetch(makeBatchStatusMap());
    const container = await renderPage(mockFetchFn);

    const callsAfterMount = (mockFetchFn as ReturnType<typeof vi.fn>).mock.calls.length;
    expect(callsAfterMount).toBeGreaterThan(0);

    const refreshBtn = container.querySelector<HTMLButtonElement>("button[aria-label]");
    expect(refreshBtn).not.toBeNull();

    await act(async () => {
      refreshBtn!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await new Promise((r) => setTimeout(r, 100));
    });

    expect((mockFetchFn as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(
      callsAfterMount
    );
  }, 15000);
});
