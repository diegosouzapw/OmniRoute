// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { DiffPane } from "@/app/(dashboard)/dashboard/compression/studio/DiffPane";
let container: HTMLElement; let root: Root;
beforeEach(() => { (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true; container = document.createElement("div"); document.body.appendChild(container); root = createRoot(container); });
afterEach(() => { act(() => root.unmount()); container.remove(); document.body.innerHTML = ""; });
describe("DiffPane", () => {
  it("renders removed and same segments with distinct testids", () => {
    act(() => { root.render(<DiffPane segments={[{ type: "same", text: "keep this " }, { type: "removed", text: "drop this" }]} preservedBlocks={[]} />); });
    expect(container.querySelector('[data-testid="diff-removed"]')?.textContent).toContain("drop this");
    expect(container.querySelector('[data-testid="diff-same"]')?.textContent).toContain("keep this");
  });
});
