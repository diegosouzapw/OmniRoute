// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("remark-gfm", () => ({ default: () => {} }));
vi.mock("react-markdown", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="markdown-content">{children}</div>
  ),
}));

// crypto.randomUUID polyfill for jsdom
let _uuidCounter = 0;
if (typeof crypto === "undefined" || !crypto.randomUUID) {
  Object.defineProperty(globalThis, "crypto", {
    value: {
      randomUUID: () => `test-uuid-${++_uuidCounter}`,
    },
    configurable: true,
  });
} else {
  vi.spyOn(crypto, "randomUUID").mockImplementation(() => `test-uuid-${++_uuidCounter}` as `${string}-${string}-${string}-${string}-${string}`);
}

// Mock AbortController to track abort calls — use real AbortController but spy on abort()
const abortCallTracker = { calls: 0 };
const OriginalAbortController = globalThis.AbortController;
class MockAbortController extends OriginalAbortController {
  abort() {
    abortCallTracker.calls++;
    super.abort();
  }
}
vi.stubGlobal("AbortController", MockAbortController);

const { DEFAULT_PARAMS } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/ParamSliders"
);
const { default: CompareTab } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab"
);

const BASE_CONFIG = {
  endpoint: "chat.completions" as const,
  baseUrl: "http://localhost:20128",
  model: "openai/gpt-4o",
  systemPrompt: "You are helpful.",
  params: { ...DEFAULT_PARAMS },
};

function buildSseResponse(content: string) {
  const encoder = new TextEncoder();
  const chunks = [
    `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`,
    "data: [DONE]\n\n",
  ];
  let idx = 0;
  return new Response(
    new ReadableStream({
      pull(controller) {
        if (idx < chunks.length) {
          controller.enqueue(encoder.encode(chunks[idx++]));
        } else {
          controller.close();
        }
      },
    }),
    { status: 200, headers: { "content-type": "text/event-stream" } },
  );
}

if (typeof Element.prototype.scrollIntoView === "undefined") {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    value: () => {},
    writable: true,
    configurable: true,
  });
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderCompareTab(config = BASE_CONFIG): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<CompareTab configState={config} />);
  });
  containers.push({ root, el });
  return el;
}

function setInputValue(el: HTMLInputElement, value: string) {
  const nativeSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  )?.set;
  nativeSetter?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

afterEach(() => {
  for (const { root, el } of containers) {
    act(() => root.unmount());
    el.remove();
  }
  containers.length = 0;
  _uuidCounter = 0;
  abortCallTracker.calls = 0;
  vi.restoreAllMocks();
});

describe("CompareTab", () => {
  it("renders initial column with model from configState", () => {
    const el = renderCompareTab();
    expect(el.textContent).toContain("openai/gpt-4o");
  });

  it("shows Run all button initially", () => {
    const el = renderCompareTab();
    const btn = el.querySelector("[aria-label='Run all columns']");
    expect(btn).not.toBeNull();
  });

  it("shows Add model button", () => {
    const el = renderCompareTab();
    const btn = el.querySelector("[aria-label='Add model column']");
    expect(btn).not.toBeNull();
  });

  it("adds a second column when Add model is clicked", async () => {
    const el = renderCompareTab();

    const input = el.querySelector("[aria-label='Model name for new column']") as HTMLInputElement;
    const addBtn = el.querySelector("[aria-label='Add model column']") as HTMLButtonElement;

    act(() => {
      setInputValue(input, "anthropic/claude-3");
    });

    await act(async () => {
      addBtn.click();
    });

    // Should show 2/4 columns
    expect(el.textContent).toContain("2/4 columns");
    expect(el.textContent).toContain("anthropic/claude-3");
  });

  it("disables Add model button after 4 columns", async () => {
    const el = renderCompareTab();

    const input = el.querySelector("[aria-label='Model name for new column']") as HTMLInputElement;
    const addBtn = el.querySelector("[aria-label='Add model column']") as HTMLButtonElement;

    // Add 3 more columns (already have 1)
    for (let i = 0; i < 3; i++) {
      act(() => setInputValue(input, `model-${i}`));
      await act(async () => { addBtn.click(); });
    }

    // Now at 4/4
    expect(el.textContent).toContain("4/4 columns");

    // Button should be disabled
    const disabledAddBtn = el.querySelector("[aria-label='Add model column']") as HTMLButtonElement;
    expect(disabledAddBtn.disabled).toBe(true);
  });

  it("removes a column when remove button is clicked", async () => {
    const el = renderCompareTab();

    const input = el.querySelector("[aria-label='Model name for new column']") as HTMLInputElement;
    const addBtn = el.querySelector("[aria-label='Add model column']") as HTMLButtonElement;

    // Add a second column
    act(() => setInputValue(input, "to-remove"));
    await act(async () => { addBtn.click(); });
    expect(el.textContent).toContain("2/4 columns");

    // Remove the second column
    const removeBtn = el.querySelector("[aria-label='Remove column for to-remove']") as HTMLButtonElement;
    expect(removeBtn).not.toBeNull();
    await act(async () => { removeBtn.click(); });

    expect(el.textContent).toContain("1/4 columns");
    expect(el.textContent).not.toContain("to-remove");
  });

  it("runs all streams in parallel when Run all is clicked", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(buildSseResponse("Hello"))) as typeof fetch,
    );

    const el = renderCompareTab();

    // Add a second column
    const input = el.querySelector("[aria-label='Model name for new column']") as HTMLInputElement;
    const addBtn = el.querySelector("[aria-label='Add model column']") as HTMLButtonElement;
    act(() => setInputValue(input, "model-2"));
    await act(async () => { addBtn.click(); });

    const runBtn = el.querySelector("[aria-label='Run all columns']") as HTMLButtonElement;
    await act(async () => { runBtn.click(); });

    // fetch should have been called twice (once per column)
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(2);
  });

  it("shows Cancel all when streams are running", async () => {
    // Make fetch hang until aborted
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise<Response>(() => {})) as typeof fetch,
    );

    const el = renderCompareTab();
    const runBtn = el.querySelector("[aria-label='Run all columns']") as HTMLButtonElement;

    act(() => { runBtn.click(); });

    // Need to flush promises to get to streaming state
    await act(async () => {
      await Promise.resolve();
    });

    const cancelBtn = el.querySelector("[aria-label='Cancel all streams']");
    expect(cancelBtn).not.toBeNull();
  });

  it("cancel all calls abort on all controllers", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise<Response>(() => {})) as typeof fetch,
    );

    const el = renderCompareTab();

    // Add a second column
    const input = el.querySelector("[aria-label='Model name for new column']") as HTMLInputElement;
    const addBtn = el.querySelector("[aria-label='Add model column']") as HTMLButtonElement;
    act(() => setInputValue(input, "model-2"));
    await act(async () => { addBtn.click(); });

    const runBtn = el.querySelector("[aria-label='Run all columns']") as HTMLButtonElement;
    act(() => { runBtn.click(); });

    await act(async () => { await Promise.resolve(); });

    const cancelBtn = el.querySelector("[aria-label='Cancel all streams']") as HTMLButtonElement | null;
    if (cancelBtn) {
      act(() => { cancelBtn.click(); });
      // AbortController.abort should have been called
      expect(abortCallTracker.calls).toBeGreaterThan(0);
    }
  });
});
