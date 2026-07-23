// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/lib/playground/types", () => ({
  getModelPricing: () => null,
}));

vi.mock("@/lib/playground/streamMetrics", () => ({
  computeMetrics: (_args: unknown) => ({
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

// ── Setup ──────────────────────────────────────────────────────────────────────

// jsdom does not implement scrollIntoView — mock it globally
if (typeof Element.prototype.scrollIntoView === "undefined") {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    value: () => {},
    writable: true,
    configurable: true,
  });
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Set value on a controlled React textarea/input and fire React synthetic events.
 * React 19 requires using the native prototype setter + dispatching events.
 */
function setInputValue(el: HTMLTextAreaElement | HTMLInputElement, value: string): void {
  const nativeSetter =
    el instanceof HTMLTextAreaElement
      ? Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set
      : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  nativeSetter?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

const { DEFAULT_PARAMS } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/ParamSliders"
);
const { default: ChatTab } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab"
);

function makeConfig(systemPrompt = "You are a helpful assistant.") {
  return {
    endpoint: "chat.completions" as const,
    baseUrl: "http://localhost:20128",
    model: "openai/gpt-4o",
    systemPrompt,
    params: { ...DEFAULT_PARAMS },
  };
}

function buildSseResponse(content: string) {
  const encoder = new TextEncoder();
  const chunks = [
    `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`,
    "data: [DONE]\n\n",
  ];
  let idx = 0;
  const stream = new ReadableStream({
    pull(controller) {
      if (idx < chunks.length) {
        controller.enqueue(encoder.encode(chunks[idx++]));
      } else {
        controller.close();
      }
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderChatTab(
  config = makeConfig(),
  onMetricsUpdate?: (m: unknown) => void
): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <ChatTab configState={config} onMetricsUpdate={onMetricsUpdate} />
    );
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

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("ChatTab", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean })
      .IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("renders the chat input and send button", () => {
    const el = renderChatTab();
    const textarea = el.querySelector("textarea");
    const sendBtn = el.querySelector("button");
    expect(textarea).toBeTruthy();
    expect(sendBtn).toBeTruthy();
  });

  it("shows empty state message when no messages", () => {
    const el = renderChatTab();
    expect(el.textContent).toContain("Start a conversation");
  });

  it("warns when no model is configured", () => {
    const config = makeConfig();
    config.model = "";
    const el = renderChatTab(config);
    expect(el.textContent).toContain("model");
  });

  it("sends message and renders assistant response with markdown", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      buildSseResponse("Hello from assistant!")
    );

    const el = renderChatTab();
    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;

    act(() => {
      setInputValue(textarea, "Hello!");
    });

    // Find and click send button
    const sendBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("Send")
    ) as HTMLButtonElement | undefined;

    await act(async () => {
      sendBtn?.click();
    });

    await waitFor(() => el.querySelector("[data-testid='markdown-content']") !== null);

    const markdown = el.querySelector("[data-testid='markdown-content']");
    expect(markdown).toBeTruthy();

    fetchSpy.mockRestore();
  });

  it("sends system prompt from config pane in the request", async () => {
    const config = makeConfig("Be concise and helpful.");
    let capturedBody: string | null = null;

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (_, init) => {
      capturedBody = (init as RequestInit)?.body as string;
      return buildSseResponse("Response");
    });

    const el = renderChatTab(config);
    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;

    act(() => {
      setInputValue(textarea, "Test message");
    });

    const sendBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("Send")
    ) as HTMLButtonElement | undefined;

    await act(async () => {
      sendBtn?.click();
    });

    await waitFor(() => capturedBody !== null);

    expect(capturedBody).toContain("Be concise and helpful.");
    expect(capturedBody).toContain("system");

    fetchSpy.mockRestore();
  });

  it("calls onMetricsUpdate after stream completes", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      buildSseResponse("Some response text")
    );
    const onMetricsUpdate = vi.fn();

    const el = renderChatTab(makeConfig(), onMetricsUpdate);
    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;

    act(() => {
      setInputValue(textarea, "Hello");
    });

    const sendBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("Send")
    ) as HTMLButtonElement | undefined;

    await act(async () => {
      sendBtn?.click();
    });

    await waitFor(() => onMetricsUpdate.mock.calls.length > 0, 3000);
    expect(onMetricsUpdate).toHaveBeenCalled();

    fetchSpy.mockRestore();
  });

  it("shows regenerate button after first response", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      buildSseResponse("Assistant response")
    );

    const el = renderChatTab();
    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;

    act(() => {
      setInputValue(textarea, "Generate something");
    });

    const sendBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("Send")
    ) as HTMLButtonElement | undefined;

    await act(async () => {
      sendBtn?.click();
    });

    await waitFor(() => el.querySelector("[data-testid='markdown-content']") !== null);

    const regenBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("Regenerate")
    );
    expect(regenBtn).toBeTruthy();

    fetchSpy.mockRestore();
  });

  it("regenerate dispatches a new fetch request", async () => {
    let fetchCount = 0;
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
      fetchCount++;
      return buildSseResponse("Response");
    });

    const el = renderChatTab();
    const textarea = el.querySelector("textarea") as HTMLTextAreaElement;

    act(() => {
      setInputValue(textarea, "Hello");
    });

    const sendBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("Send")
    ) as HTMLButtonElement | undefined;

    await act(async () => {
      sendBtn?.click();
    });

    await waitFor(() => el.querySelector("[data-testid='markdown-content']") !== null);

    const countBefore = fetchCount;

    const regenBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("Regenerate")
    ) as HTMLButtonElement | undefined;

    await act(async () => {
      regenBtn?.click();
    });

    await waitFor(() => fetchCount > countBefore);
    expect(fetchCount).toBeGreaterThan(countBefore);

    fetchSpy.mockRestore();
  });
});
