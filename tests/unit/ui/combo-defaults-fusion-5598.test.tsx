// @vitest-environment jsdom
//
// #5598 — Selecting the "fusion" routing strategy on the Global Routing defaults
// tab previously revealed no fusion-specific config (only the generic resilience
// fields). Fusion's engine knobs (judgeModel + fusionTuning) exist in the schema
// and the per-combo editor, but were never surfaced as global defaults. This
// asserts they now appear when fusion is the selected strategy.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  // identity translator with no `has`, so translateOrFallback uses the English fallbacks
  useTranslations: () => (key: string) => key,
}));

const { default: ComboDefaultsTab } = await import(
  "../../../src/app/(dashboard)/dashboard/settings/components/ComboDefaultsTab"
);

function okJson(data: unknown) {
  return Promise.resolve({ ok: true, json: () => Promise.resolve(data) } as Response);
}

function setupFetch(strategy: string) {
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) => {
      if (String(url).includes("/combo-defaults")) return okJson({ comboDefaults: { strategy } });
      if (String(url).includes("/api/providers")) return okJson({ connections: [] });
      return okJson({}); // /api/settings
    })
  );
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderTab() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ComboDefaultsTab />);
  });
  containers.push({ root, el });
  return el;
}

async function waitFor(fn: () => boolean, timeoutMs = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitFor timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

describe("ComboDefaultsTab fusion config (#5598)", () => {
  it("shows fusion-specific fields when the fusion strategy is selected", async () => {
    setupFetch("fusion");
    const el = renderTab();
    // RED before the fix: fusion had no config block → these labels never render.
    await waitFor(() => el.textContent?.includes("Judge Model") === true);
    expect(el.textContent).toContain("Judge Model");
    expect(el.textContent).toContain("Min Panel");
    expect(el.textContent).toContain("Straggler Grace (ms)");
    expect(el.textContent).toContain("Panel Hard Timeout (ms)");
  });

  it("does not show fusion fields for a non-fusion strategy", async () => {
    setupFetch("priority");
    const el = renderTab();
    // Let the component settle (load + render).
    await new Promise((r) => setTimeout(r, 200));
    expect(el.textContent).not.toContain("Judge Model");
  });
});
