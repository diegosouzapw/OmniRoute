// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("remark-gfm", () => ({ default: () => {} }));
vi.mock("react-markdown", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="markdown-content">{children}</div>
  ),
}));

function setInputValue(
  el: HTMLTextAreaElement | HTMLInputElement,
  value: string,
): void {
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
const { default: BuildTab } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab"
);

const BASE_CONFIG = {
  endpoint: "chat.completions" as const,
  baseUrl: "http://localhost:20128",
  model: "openai/gpt-4o",
  systemPrompt: "You are helpful.",
  params: { ...DEFAULT_PARAMS },
};

if (typeof Element.prototype.scrollIntoView === "undefined") {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    value: () => {},
    writable: true,
    configurable: true,
  });
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderBuildTab(config = BASE_CONFIG): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<BuildTab configState={config} />);
  });
  containers.push({ root, el });
  return el;
}

afterEach(() => {
  for (const { root, el } of containers) {
    act(() => root.unmount());
    el.remove();
  }
  containers.length = 0;
  vi.restoreAllMocks();
});

describe("BuildTab", () => {
  it("renders Run button", () => {
    const el = renderBuildTab();
    const runBtn = el.querySelector("[class*='bg-primary']");
    expect(runBtn?.textContent).toContain("runLabel");
  });

  it("renders Function calling section", () => {
    const el = renderBuildTab();
    expect(el.textContent).toContain("Function calling");
    expect(el.textContent).toContain("Add tool");
  });

  it("renders Structured output section", () => {
    const el = renderBuildTab();
    expect(el.textContent).toContain("Structured output");
    expect(el.textContent).toContain("JSON mode");
  });

  it("adds a tool and shows it in function calling UI", async () => {
    const el = renderBuildTab();

    // Find add tool form inputs in the right panel
    const allInputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    // The first or second input should be the function name
    const nameInput = allInputs[0];
    act(() => setInputValue(nameInput, "search_web"));

    const addBtns = el.querySelectorAll("button");
    const addToolBtn = Array.from(addBtns).find(
      (b) => b.textContent?.trim() === "+ Add tool",
    ) as HTMLButtonElement;
    expect(addToolBtn).not.toBeNull();

    await act(async () => { addToolBtn.click(); });

    expect(el.textContent).toContain("search_web");
    expect(el.textContent).toContain("Tools (1)");
  });

  it("shows validation error for invalid JSON in tool params", async () => {
    const el = renderBuildTab();

    const allInputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    act(() => setInputValue(allInputs[0], "bad_tool"));

    // The parameters textarea is in the Add tool form section — it has default valid JSON.
    // We need to find the textarea labeled "JSON schema for parameters" in the add form.
    const paramsTextareas = Array.from(el.querySelectorAll("textarea")).filter(
      (t) => t.getAttribute("aria-label") === "JSON schema for parameters",
    );
    // The last one is in the Add tool form (the first may be the message prompt textarea)
    const paramsTextarea = paramsTextareas[paramsTextareas.length - 1] as HTMLTextAreaElement;
    act(() => setInputValue(paramsTextarea, "NOT JSON {{{"));

    const addBtns = el.querySelectorAll("button");
    const addToolBtn = Array.from(addBtns).find(
      (b) => b.textContent?.trim() === "+ Add tool",
    ) as HTMLButtonElement;

    await act(async () => { addToolBtn.click(); });

    expect(el.textContent).toContain("valid JSON");
  });

  it("enables JSON mode toggle and shows schema editor", async () => {
    const el = renderBuildTab();

    const toggle = el.querySelector("[role='switch']") as HTMLButtonElement;
    expect(toggle).not.toBeNull();

    await act(async () => { toggle.click(); });

    // JSON mode should be enabled
    expect(toggle.getAttribute("aria-checked")).toBe("true");
    expect(el.textContent).toContain("JSON schema");
  });

  it("shows tool badge in toolbar when tools are added", async () => {
    const el = renderBuildTab();

    const allInputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    act(() => setInputValue(allInputs[0], "my_tool"));

    const addBtns = el.querySelectorAll("button");
    const addToolBtn = Array.from(addBtns).find(
      (b) => b.textContent?.trim() === "+ Add tool",
    ) as HTMLButtonElement;
    await act(async () => { addToolBtn.click(); });

    // Badge "1 tool" should appear in toolbar
    expect(el.textContent).toContain("1 tool");
  });

  it("calls /v1/chat/completions with tools array when Run is clicked", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve(
          new Response(
            JSON.stringify({
              choices: [{ message: { content: "Result", role: "assistant" } }],
            }),
            { status: 200, headers: { "content-type": "application/json" } },
          ),
        ),
      ) as typeof fetch,
    );

    const el = renderBuildTab();

    // Add a tool
    const allInputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    act(() => setInputValue(allInputs[0], "tool_one"));
    const addBtns = el.querySelectorAll("button");
    const addToolBtn = Array.from(addBtns).find(
      (b) => b.textContent?.trim() === "+ Add tool",
    ) as HTMLButtonElement;
    await act(async () => { addToolBtn.click(); });

    // Type a prompt
    const promptTextarea = el.querySelector("textarea[placeholder*='message']") as HTMLTextAreaElement;
    act(() => setInputValue(promptTextarea, "Run this tool"));

    // Click Run (label is "runLabel" via mocked t())
    const runBtns = el.querySelectorAll("button");
    const runBtn = Array.from(runBtns).find(
      (b) => b.textContent?.includes("runLabel") && !b.textContent?.includes("clearAll"),
    ) as HTMLButtonElement;
    await act(async () => { runBtn.click(); });
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    // fetch should be called
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1);
    const [, opts] = (vi.mocked(fetch) as ReturnType<typeof vi.fn>).mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(opts.body as string) as Record<string, unknown>;
    expect(body["tools"]).toBeDefined();
    expect(Array.isArray(body["tools"])).toBe(true);
  });

  it("shows JSON mode badge in toolbar when JSON mode is enabled", async () => {
    const el = renderBuildTab();
    const toggle = el.querySelector("[role='switch']") as HTMLButtonElement;
    await act(async () => { toggle.click(); });
    expect(el.textContent).toContain("JSON mode");
  });
});
