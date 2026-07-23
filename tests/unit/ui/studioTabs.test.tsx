// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
let container: HTMLElement; let root: Root;
beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  (globalThis as any).ResizeObserver ||= class { observe(){} unobserve(){} disconnect(){} };
  container = document.createElement("div"); document.body.appendChild(container); root = createRoot(container);
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => ({ rows: [] }) } as any)));
});
afterEach(() => { act(() => root.unmount()); container.remove(); document.body.innerHTML = ""; vi.restoreAllMocks(); });
describe("studio page", () => {
  it("shows Play by default and switches to Compare", async () => {
    const { default: StudioPage } = await import("@/app/(dashboard)/dashboard/compression/studio/page");
    await act(async () => { root.render(<StudioPage />); });
    expect(container.querySelector('[data-testid="play-input"]')).toBeTruthy();
    const compareTab = container.querySelector('[data-testid="tab-compare"]') as HTMLButtonElement;
    await act(async () => { compareTab.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(container.querySelector('[data-testid="compare-load"]')).toBeTruthy();
  });
});
