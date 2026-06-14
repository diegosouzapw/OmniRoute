// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// ── Mock next-intl (CompressionSettingsTab calls useTranslations) ──────────
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Helpers ───────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function mountInContainer(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
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

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// ── Mock fetch ────────────────────────────────────────────────────────────
// CompressionSettingsTab fetches:
//   GET /api/settings/compression  → returns CompressionConfig (or null)
//   GET /api/compression/rules     → returns { rules: RuleMetadata[] }

function setupFetchMock() {
  vi.spyOn(globalThis, "fetch").mockImplementation(async (input: RequestInfo | URL) => {
    const url = input.toString();
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
  it("mounts without throwing and renders content", async () => {
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
