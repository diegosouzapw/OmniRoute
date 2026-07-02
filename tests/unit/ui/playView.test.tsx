// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
let container: HTMLElement; let root: Root;
beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  (globalThis as any).ResizeObserver ||= class { observe(){} unobserve(){} disconnect(){} };
  container = document.createElement("div"); document.body.appendChild(container); root = createRoot(container);
  vi.stubGlobal("fetch", vi.fn(async (_u: string, init: any) => {
    const body = JSON.parse(init.body); const engine = body.engineId ?? "combo";
    return { ok: true, json: async () => ({ original: "o", compressed: "c", originalTokens: 10, compressedTokens: 6, savingsPct: 40, mode: "stacked", durationMs: 1,
      engineBreakdown: [{ engine, originalTokens: 10, compressedTokens: 6, savingsPercent: 40, techniquesUsed: [] }],
      diff: [], preservedBlocks: [], ruleRemovals: [], validation: { valid: true, errors: [], warnings: [], fallbackApplied: false } }) } as any;
  }));
});
afterEach(() => { act(() => root.unmount()); container.remove(); document.body.innerHTML = ""; vi.restoreAllMocks(); });
describe("PlayView", () => {
  it("populates per-engine lanes after Run", async () => {
    const { PlayView } = await import("@/app/(dashboard)/dashboard/compression/studio/PlayView");
    await act(async () => { root.render(<PlayView text="$ git status" onText={() => {}} laneEngines={["rtk", "caveman"]} />); });
    const runBtn = container.querySelector('[data-testid="play-run"]') as HTMLButtonElement;
    await act(async () => { runBtn.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    const lanes = container.querySelectorAll('[data-testid="play-lane"]');
    expect(lanes.length).toBe(2);
  });
});
