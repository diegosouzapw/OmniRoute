// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";

vi.mock("@/hooks/useLiveCompression", () => ({
  useLiveCompression: () => ({ runs: [], lastRun: null, getRunById: () => undefined, isConnected: false, reconnect: () => {} }),
}));
vi.mock("@xyflow/react", async () => {
  const actual = await vi.importActual<any>("@xyflow/react");
  return { ...actual, Handle: () => null };
});

let container: HTMLElement; let root: Root;
beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  (globalThis as any).ResizeObserver ||= class { observe(){} unobserve(){} disconnect(){} };
  container = document.createElement("div"); document.body.appendChild(container); root = createRoot(container);
});
afterEach(() => { act(() => root.unmount()); container.remove(); document.body.innerHTML = ""; vi.restoreAllMocks(); });
describe("live page", () => {
  it("renders the WS cockpit (empty state when no traffic)", async () => {
    const { default: LivePage } = await import("@/app/(dashboard)/dashboard/compression/live/page");
    await act(async () => { root.render(<LivePage />); });
    expect(container.querySelector('[data-testid="compression-cockpit-empty"]')).toBeTruthy();
  });
});
