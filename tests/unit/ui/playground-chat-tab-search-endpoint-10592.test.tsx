// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/playground/types", () => ({ getModelPricing: () => null }));
vi.mock("@/lib/playground/streamMetrics", () => ({
  computeMetrics: () => ({ ttftMs: 100, totalMs: 500, tokensIn: 10, tokensOut: 20, tps: 40, costUsd: 0.001 }),
}));
vi.mock("remark-gfm", () => ({ default: () => {} }));
vi.mock("react-markdown", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="markdown-content">{children}</div>,
}));
if (typeof Element.prototype.scrollIntoView === "undefined") {
  Object.defineProperty(Element.prototype, "scrollIntoView", { value: () => {}, writable: true, configurable: true });
}
function setInputValue(el: HTMLTextAreaElement | HTMLInputElement, value: string): void {
  const nativeSetter =
    el instanceof HTMLTextAreaElement
      ? Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set
      : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  nativeSetter?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}
const { DEFAULT_PARAMS } = await import("../../../src/app/(dashboard)/dashboard/playground/components/ParamSliders");
const { default: ChatTab } = await import("../../../src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab");
function makeSearchProviderConfig() {
  return {
    endpoint: "search" as const,
    baseUrl: "http://localhost:20128",
    model: "exa-search/web",
    provider: "exa-search",
    systemPrompt: "",
    params: { ...DEFAULT_PARAMS },
  };
}
const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];
function renderChatTab(config: ReturnType<typeof makeSearchProviderConfig>): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ChatTab configState={config} />);
  });
  containers.push({ root, el });
  return el;
}
async function waitFor(fn: () => boolean, timeout = 3000): Promise<void> {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeout) throw new Error("waitFor timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}
describe("ChatTab — search-provider endpoint routing (#10592)", () => {
  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  });
  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });
  it("routes to /api/v1/search (not /api/v1/chat/completions) when configState.endpoint is 'search'", async () => {
    let capturedUrl: string | null = null;
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url) => {
      capturedUrl = String(url);
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
            controller.close();
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    });
    const el = renderChatTab(makeSearchProviderConfig());
    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;
    act(() => {
      setInputValue(textarea, "latest news India");
    });
    const sendBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Send")
    ) as HTMLButtonElement | undefined;
    await act(async () => {
      sendBtn?.click();
    });
    await waitFor(() => capturedUrl !== null);
    expect(capturedUrl).toBe("/api/v1/search");
    fetchSpy.mockRestore();
  });
});
