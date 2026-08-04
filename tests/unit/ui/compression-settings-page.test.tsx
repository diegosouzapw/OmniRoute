// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// ── Mock next-intl (CompressionSettingsTab calls useTranslations) ──────────
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// ── Helpers ───────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

function mountInContainer(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => {
    root.render(ui);
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(async () => {
  vi.restoreAllMocks();
  await act(async () => {
    while (roots.length > 0) {
      roots.pop()?.unmount();
    }
  });
  for (let i = 0; i < 10; i++) {
    await Promise.resolve();
  }
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Mock fetch ────────────────────────────────────────────────────────────
// CompressionSettingsTab fetches:
//   GET /api/settings/compression  → returns CompressionConfig (or null)
//   GET /api/compression/rules     → returns { rules: RuleMetadata[] }

function setupFetchMock() {
  vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
    const url = input.toString();
    // D0 tile reads this; it must resolve to a valid Summary BEFORE the generic
    // /api/settings/compression match (the run-telemetry URL contains that prefix).
    if (url.includes("/run-telemetry")) {
      return new Response(
        JSON.stringify({
          totalRuns: 0,
          totalTokensSaved: 0,
          runsWithStyles: 0,
          bypassCount: 0,
          totalOutputTokens: 0,
          appliedStyleCounts: {},
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (url.includes("/api/settings/compression")) {
      return new Response(
        JSON.stringify({
          enabled: false,
          defaultMode: "off",
          autoTriggerTokens: 0,
          cacheMinutes: 5,
          preserveSystemPrompt: true,
          comboOverrides: {},
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (url.includes("/api/compression/rules")) {
      return new Response(JSON.stringify({ rules: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({}), { status: 404 });
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("CompressionSettingsPage", () => {
  it("mounts without throwing and renders content", { timeout: 15000 }, async () => {
    setupFetchMock();
    const { default: CompressionSettingsPage } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/page");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionSettingsPage />);
    });

    // Flush any pending microtasks from effects
    await act(async () => {
      await Promise.resolve();
    });

    expect(container).toBeTruthy();
    expect(container.children.length).toBeGreaterThan(0);
    // D0: the read-only telemetry tile is mounted alongside the panel.
    expect(container.querySelector('[data-testid="compression-styles-tile"]')).toBeTruthy();
  });

  it("does not crash when fetch calls fail (fail-soft)", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));

    const { default: CompressionSettingsPage } =
      await import("../../../src/app/(dashboard)/dashboard/context/settings/page");

    let container!: HTMLElement;
    await act(async () => {
      container = mountInContainer(<CompressionSettingsPage />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    // Component should still be mounted (not crashed)
    expect(container).toBeTruthy();
    expect(container.parentNode).toBeTruthy();
  });
});
