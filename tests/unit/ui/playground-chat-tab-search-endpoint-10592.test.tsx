// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/playground/types", () => ({ getModelPricing: () => null }));
vi.mock("@/lib/playground/streamMetrics", () => ({
  computeMetrics: () => ({
    ttftMs: 100,
    totalMs: 500,
    tokensIn: 10,
    tokensOut: 20,
    tps: 40,
    costUsd: 0.001,
  }),
}));
vi.mock("remark-gfm", () => ({ default: () => {} }));
vi.mock("react-markdown", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="markdown-content">{children}</div>
  ),
}));
if (typeof Element.prototype.scrollIntoView === "undefined") {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    value: () => {},
    writable: true,
    configurable: true,
  });
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
const { DEFAULT_PARAMS } =
  await import("../../../src/app/(dashboard)/dashboard/playground/components/ParamSliders");
const { default: ChatTab } =
  await import("../../../src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab");
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
function makeImageProviderConfig() {
  return {
    endpoint: "images" as const,
    baseUrl: "http://localhost:20128",
    model: "image-provider/model-image",
    provider: "image-provider",
    systemPrompt: "",
    params: { ...DEFAULT_PARAMS },
  };
}
function makeChatProviderConfig() {
  return {
    endpoint: "chat.completions" as const,
    baseUrl: "http://localhost:20128",
    model: "text-provider/model-text",
    provider: "text-provider",
    systemPrompt: "",
    params: { ...DEFAULT_PARAMS },
  };
}
function makeWebFetchProviderConfig() {
  return {
    endpoint: "web.fetch" as const,
    baseUrl: "http://localhost:20128",
    model: "fetch-provider/model-fetch",
    provider: "fetch-provider",
    systemPrompt: "",
    params: { ...DEFAULT_PARAMS },
  };
}
const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];
function renderChatTab(
  config: React.ComponentProps<typeof ChatTab>["configState"]
): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ChatTab configState={config} />);
  });
  containers.push({ root, el });
  return el;
}
function rerenderChatTab(
  el: HTMLDivElement,
  config: React.ComponentProps<typeof ChatTab>["configState"]
): void {
  const mounted = containers.find((entry) => entry.el === el);
  if (!mounted) throw new Error("ChatTab root not found");
  act(() => {
    mounted.root.render(<ChatTab configState={config} />);
  });
}
async function sendText(el: HTMLDivElement, value: string): Promise<void> {
  const textarea = el.querySelector("textarea") as HTMLTextAreaElement;
  act(() => {
    setInputValue(textarea, value);
  });
  const sendBtn = Array.from(el.querySelectorAll("button")).find((button) =>
    button.textContent?.includes("Send")
  ) as HTMLButtonElement | undefined;
  await act(async () => {
    sendBtn?.click();
  });
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
    let capturedBody: Record<string, unknown> | null = null;
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url, init) => {
      capturedUrl = String(url);
      capturedBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({ results: [{ title: "Synthetic result" }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });
    const el = renderChatTab(makeSearchProviderConfig());
    await sendText(el, "synthetic search query");
    await waitFor(() => capturedUrl !== null);
    expect(capturedUrl).toBe("/api/v1/search");
    expect(capturedBody).toEqual({ query: "synthetic search query", model: "exa-search/web" });
    expect(el.querySelector("img")).toBeNull();
    fetchSpy.mockRestore();
  });

  it("keeps web.fetch request and response behavior", async () => {
    let capturedBody: Record<string, unknown> | null = null;
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, init) => {
      capturedBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response("Synthetic article text", { status: 200 });
    });
    const el = renderChatTab(makeWebFetchProviderConfig());

    await sendText(el, "https://example.test/article");
    await waitFor(() => capturedBody !== null);

    expect(capturedBody).toEqual({ url: "https://example.test/article" });
    expect(el.textContent).toContain("Synthetic article text");
    expect(el.querySelector("img")).toBeNull();
    fetchSpy.mockRestore();
  });

  it("sends the chat input as prompt for image generation", async () => {
    let capturedUrl: string | null = null;
    let capturedBody: Record<string, unknown> | null = null;
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (url, init) => {
      capturedUrl = String(url);
      capturedBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({ created: 1, data: [] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });
    const el = renderChatTab(makeImageProviderConfig());
    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;
    act(() => {
      setInputValue(textarea, "A synthetic mountain landscape");
    });
    const sendBtn = Array.from(el.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Send")
    ) as HTMLButtonElement | undefined;

    await act(async () => {
      sendBtn?.click();
    });
    await waitFor(() => capturedBody !== null);

    expect(capturedUrl).toBe("/api/v1/images/generations");
    expect(capturedBody).toEqual({
      prompt: "A synthetic mountain landscape",
      model: "image-provider/model-image",
    });
    fetchSpy.mockRestore();
  });

  it("renders multiple safe URL and base64 image results without unsafe links", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          created: 1,
          data: [
            {
              url: "https://images.example.test/generated.png",
              revised_prompt: "Synthetic URL image",
            },
            { b64_json: "QUJDRA==", revised_prompt: "Synthetic base64 image" },
            { url: "javascript:alert(1)", revised_prompt: "Unsafe image" },
            { url: "blob:https://example.test/generated", revised_prompt: "Blob image" },
          ],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      )
    );
    const el = renderChatTab(makeImageProviderConfig());

    await sendText(el, "Render two synthetic images");
    await waitFor(() => el.querySelectorAll("img").length >= 2);

    const images = Array.from(el.querySelectorAll<HTMLImageElement>("img"));
    expect(images.map((image) => image.getAttribute("src"))).toEqual([
      "https://images.example.test/generated.png",
      "data:image/png;base64,QUJDRA==",
    ]);
    expect(images.map((image) => image.alt)).toEqual([
      "Synthetic URL image",
      "Synthetic base64 image",
    ]);
    expect(
      Array.from(el.querySelectorAll<HTMLAnchorElement>("a[download]")).map((link) =>
        link.getAttribute("href")
      )
    ).toEqual(["https://images.example.test/generated.png", "data:image/png;base64,QUJDRA=="]);
    expect(el.querySelector('a[href^="javascript:"]')).toBeNull();
    expect(el.querySelector("[data-testid='markdown-content']")).toBeNull();
    fetchSpy.mockRestore();
  });

  it.each([
    ["empty", { created: 1, data: [], note: "empty image response" }],
    ["invalid", { created: 1, data: [{ url: "javascript:alert(1)" }], note: "invalid image" }],
  ])("falls back to the JSON response for %s image data", async (_label, payload) => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(payload), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    );
    const el = renderChatTab(makeImageProviderConfig());

    await sendText(el, "Render a synthetic image");
    await waitFor(() => el.querySelector("[data-testid='markdown-content']") !== null);

    expect(el.querySelector("img")).toBeNull();
    expect(el.querySelector("[data-testid='markdown-content']")?.textContent).toContain(
      JSON.stringify(payload.note)
    );
    fetchSpy.mockRestore();
  });

  it("does not include base64 image results in a later text-model request", async () => {
    const requestBodies: Array<Record<string, unknown>> = [];
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, init) => {
      requestBodies.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
      if (requestBodies.length === 1) {
        return new Response(JSON.stringify({ data: [{ b64_json: "VEVTVA==" }] }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(
              new TextEncoder().encode(
                `data: ${JSON.stringify({ choices: [{ delta: { content: "Done" } }] })}\n\n`
              )
            );
            controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
            controller.close();
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      );
    });
    const el = renderChatTab(makeImageProviderConfig());
    await sendText(el, "Render a synthetic image");
    await waitFor(() => el.querySelector("img") !== null);

    rerenderChatTab(el, makeChatProviderConfig());
    expect(el.querySelector("img")).not.toBeNull();
    await sendText(el, "Describe the result without image bytes");
    await waitFor(() => requestBodies.length === 2);

    expect(JSON.stringify(requestBodies[1])).not.toContain("VEVTVA==");
    expect(requestBodies[1].messages).toEqual([
      { role: "user", content: "Render a synthetic image" },
      { role: "user", content: "Describe the result without image bytes" },
    ]);
    fetchSpy.mockRestore();
  });
});
