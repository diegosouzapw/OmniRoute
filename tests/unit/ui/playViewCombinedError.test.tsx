// @vitest-environment jsdom
// Regression for #12061: when the COMBINED-pipeline preview request fails
// (while per-lane requests succeed), PlayView must surface a visible error
// instead of silently rendering nothing for the combined result section.
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  (globalThis as any).ResizeObserver ||= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  // Per-lane requests (body.engineId set) succeed; the combined pipeline
  // request (body.pipeline set) fails -- e.g. an auth/backend error on the
  // combined-stack call specifically.
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_u: string, init: any) => {
      const body = JSON.parse(init.body);
      if (body.pipeline) {
        return { ok: false, status: 500, json: async () => ({ error: "internal error" }) } as any;
      }
      const engine = body.engineId ?? "combo";
      return {
        ok: true,
        json: async () => ({
          original: "o",
          compressed: "c",
          originalTokens: 10,
          compressedTokens: 6,
          savingsPct: 40,
          mode: "stacked",
          durationMs: 1,
          engineBreakdown: [
            { engine, originalTokens: 10, compressedTokens: 6, savingsPercent: 40, techniquesUsed: [] },
          ],
          diff: [],
          preservedBlocks: [],
          ruleRemovals: [],
          validation: { valid: true, errors: [], warnings: [], fallbackApplied: false },
        }),
      } as any;
    })
  );
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("PlayView combined-pipeline run failure (#12061)", () => {
  it("shows a visible error for the combined result instead of nothing", async () => {
    const { PlayView } = await import(
      "@/app/(dashboard)/dashboard/compression/studio/PlayView"
    );
    await act(async () => {
      root.render(
        <PlayView text="TEST INPUT" onText={() => {}} laneEngines={["rtk", "caveman"]} />
      );
    });
    const runBtn = container.querySelector('[data-testid="play-run"]') as HTMLButtonElement;
    expect(runBtn).toBeTruthy();
    await act(async () => {
      runBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });

    // Per-lane previews succeeded -- lanes should show savings, not "error".
    const laneRows = Array.from(container.querySelectorAll('[data-testid="play-lane"]'));
    expect(laneRows.length).toBe(2);
    for (const row of laneRows) {
      expect(row.textContent ?? "").not.toMatch(/error/i);
    }

    // The combined section (success branch) never renders since the
    // combined request failed.
    const combinedSection = container.querySelector('[data-testid="play-combined"]');
    expect(combinedSection).toBeNull();

    const hasErrorTestId = !!container.querySelector(
      '[data-testid="play-run-error"], [data-testid="play-combined-error"], [data-testid="play-error"]'
    );
    const text = container.textContent ?? "";
    const hasHumanReadableError = /error|failed|falhou|erro/i.test(text);

    expect(hasErrorTestId || hasHumanReadableError).toBe(true);
  });
});
