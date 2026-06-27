// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";

let container: HTMLElement; let root: Root;

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div"); document.body.appendChild(container); root = createRoot(container);
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: any) => {
    if (url.includes("/compression/preview")) {
      const body = JSON.parse(init.body);
      return { ok: true, json: async () => ({ original: "user: x", compressed: `c-${body.engineId}`,
        originalTokens: 10, compressedTokens: 5, savingsPct: 50, mode: "stacked", durationMs: 1,
        engineBreakdown: [], diff: [], preservedBlocks: [], ruleRemovals: [] }) } as any;
    }
    if (url.includes("/compression/compare/verify")) {
      const body = JSON.parse(init.body);
      return { ok: true, json: async () => ({
        results: body.items.map((it: any) => ({ id: it.id, verdict: "same", usdCost: 0.001, skippedCapped: false })),
        totalUsd: 0.001 * body.items.length, capped: false }) } as any;
    }
    // /compression/compare
    return { ok: true, json: async () => ({ rows: [
      { engine: "rtk", meanSavingsPercent: 43, meanRetention: 0.98, totalCompressedTokens: 700 },
      { engine: "lite", meanSavingsPercent: 1, meanRetention: 1.0, totalCompressedTokens: 1230 },
    ] }) } as any;
  }));
});
afterEach(() => { act(() => root.unmount()); container.remove(); document.body.innerHTML = ""; vi.restoreAllMocks(); });

describe("CompareView", () => {
  it("renders best-first ranked rows after load", async () => {
    const { CompareView } = await import("@/app/(dashboard)/dashboard/compression/studio/CompareView");
    await act(async () => { root.render(<CompareView text="$ npm install\n..." />); });
    await act(async () => { (container.querySelector('[data-testid="compare-load"]') as HTMLButtonElement).dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    const rows = container.querySelectorAll('[data-testid="compare-row"]');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain("rtk");
  });

  it("verify button is disabled until a judge model is entered, then renders verdicts on demand", async () => {
    const { CompareView } = await import("@/app/(dashboard)/dashboard/compression/studio/CompareView");
    await act(async () => { root.render(<CompareView text="$ npm install" />); });
    await act(async () => { (container.querySelector('[data-testid="compare-load"]') as HTMLButtonElement).dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    const verifyBtn = container.querySelector('[data-testid="verify-all"]') as HTMLButtonElement;
    expect(verifyBtn.disabled).toBe(true); // no judge model yet
    const modelInput = container.querySelector('[data-testid="verify-model"]') as HTMLInputElement;
    await act(async () => { setInputValue(modelInput, "claude-haiku"); });
    expect((container.querySelector('[data-testid="verify-all"]') as HTMLButtonElement).disabled).toBe(false);
    await act(async () => { (container.querySelector('[data-testid="verify-all"]') as HTMLButtonElement).dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    const verdicts = Array.from(container.querySelectorAll('[data-testid="verify-verdict"]')).map((c) => c.textContent);
    expect(verdicts.filter((t) => t === "same").length).toBe(2);
  });
});
