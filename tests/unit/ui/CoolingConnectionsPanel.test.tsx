// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Regression guard for the base-red introduced by #6061: CoolingConnectionsPanel
// imported `Card` from a non-existent `@/components/ui/card`, which passed the
// PR→release fast-gates (they don't run `next build`) but broke `next build`
// with `Module not found: Can't resolve '@/components/ui/card'`. Importing the
// component here fails at module-load if that broken import ever comes back,
// so this test fails-without-the-fix.

// `formatResetCountdown` lives in the client-safe `@/shared/utils/formatting`
// module (imported directly by the panel — never via the server-only localDb
// barrel, which would drag ioredis/node:net into the browser bundle). Stub it so
// the countdown text is deterministic.
vi.mock("@/shared/utils/formatting", () => ({
  formatResetCountdown: (v: string | number | null | undefined) => (v == null ? null : "in 5m"),
}));

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

const PANEL_PATH = "@/app/(dashboard)/dashboard/providers/[id]/components/CoolingConnectionsPanel";

describe("CoolingConnectionsPanel", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
  });

  it("module loads and exports a default component (guards the import path)", async () => {
    const mod = await import(PANEL_PATH);
    expect(typeof mod.default).toBe("function");
  });

  it("renders the panel with a countdown for a cooling connection", async () => {
    const { default: CoolingConnectionsPanel } = await import(PANEL_PATH);
    const container = makeContainer();
    const root = createRoot(container);
    const future = new Date(Date.now() + 5 * 60_000).toISOString();
    await act(async () => {
      root.render(
        React.createElement(CoolingConnectionsPanel, {
          connections: [{ id: "conn-abc12345", displayName: "My Key", rateLimitedUntil: future }],
        })
      );
    });
    const panel = container.querySelector("[data-testid='cooling-connections-panel']");
    expect(panel).toBeTruthy();
    expect(container.querySelector("[data-testid='cooling-countdown']")?.textContent).toContain(
      "in 5m"
    );
    expect(panel?.textContent).toContain("My Key");
  });

  it("renders nothing when no connection is cooling", async () => {
    const { default: CoolingConnectionsPanel } = await import(PANEL_PATH);
    const container = makeContainer();
    const root = createRoot(container);
    const past = new Date(Date.now() - 60_000).toISOString();
    await act(async () => {
      root.render(
        React.createElement(CoolingConnectionsPanel, {
          connections: [{ id: "conn-old", displayName: "Expired", rateLimitedUntil: past }],
        })
      );
    });
    expect(container.querySelector("[data-testid='cooling-connections-panel']")).toBeNull();
  });
});
