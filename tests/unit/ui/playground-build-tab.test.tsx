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

// ── BuildWizard navigation helpers ──────────────────────────────────────────
//
// BuildTab now renders behind a 3-step wizard (BuildWizard.tsx):
//   step 1 — pick a mode (Tools / JSON / Both)
//   step 2 — configure tools and/or the JSON schema, depending on the mode
//   step 3 — run + toolbar badges + prompt textarea
//
// next-intl is mocked as a key pass-through above, so every translated label
// renders as its raw i18n key (e.g. "nextButton", "modeToolsTitle").

type BuildMode = "tools" | "json" | "both";

function clickNext(el: HTMLDivElement): void {
  const nextBtn = Array.from(el.querySelectorAll("button")).find((b) =>
    b.textContent?.includes("nextButton"),
  ) as HTMLButtonElement;
  act(() => {
    nextBtn.click();
  });
}

function selectMode(el: HTMLDivElement, mode: BuildMode): void {
  // Step 1's default mode is already "tools" — only click a mode card when a
  // different mode is required.
  if (mode === "tools") return;
  const key = mode === "json" ? "modeJsonTitle" : "modeBothTitle";
  const card = Array.from(el.querySelectorAll("button")).find((b) =>
    b.textContent?.includes(key),
  ) as HTMLButtonElement;
  act(() => {
    card.click();
  });
}

/** Drive the wizard from step 1 to step 2, selecting `mode` along the way. */
function goToStep2(el: HTMLDivElement, mode: BuildMode = "tools"): void {
  selectMode(el, mode);
  clickNext(el);
}

/** Drive the wizard from step 1 all the way to step 3 (run screen). */
function goToStep3(el: HTMLDivElement, mode: BuildMode = "tools"): void {
  goToStep2(el, mode);
  clickNext(el);
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
    goToStep3(el);
    const runBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("runButton"),
    );
    expect(runBtn).not.toBeUndefined();
  });

  it("renders Function calling section", () => {
    const el = renderBuildTab();
    goToStep2(el, "tools");
    expect(el.textContent).toContain("toolsLabel");
    expect(el.textContent).toContain("Add tool");
  });

  it("renders Structured output section", () => {
    const el = renderBuildTab();
    goToStep2(el, "json");
    expect(el.textContent).toContain("structuredOutputLabel");
    expect(el.textContent).toContain("JSON mode");
  });

  it("adds a tool and shows it in function calling UI", async () => {
    const el = renderBuildTab();
    goToStep2(el, "tools");

    // Find add tool form inputs in the tools panel
    const allInputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    // The first input is the function name
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
    goToStep2(el, "tools");

    const allInputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    act(() => setInputValue(allInputs[0], "bad_tool"));

    // The parameters textarea is in the Add tool form section — it has default valid JSON.
    const paramsTextareas = Array.from(el.querySelectorAll("textarea")).filter(
      (t) => t.getAttribute("aria-label") === "JSON schema for parameters",
    );
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
    goToStep2(el, "json");

    const toggle = el.querySelector("[role='switch']") as HTMLButtonElement;
    expect(toggle).not.toBeNull();

    await act(async () => { toggle.click(); });

    // JSON mode should be enabled
    expect(toggle.getAttribute("aria-checked")).toBe("true");
    expect(el.textContent).toContain("JSON schema");
  });

  it("shows tool badge in toolbar when tools are added", async () => {
    const el = renderBuildTab();
    goToStep2(el, "tools");

    const allInputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    act(() => setInputValue(allInputs[0], "my_tool"));

    const addBtns = el.querySelectorAll("button");
    const addToolBtn = Array.from(addBtns).find(
      (b) => b.textContent?.trim() === "+ Add tool",
    ) as HTMLButtonElement;
    await act(async () => { addToolBtn.click(); });

    clickNext(el); // step 2 -> step 3

    // Badge "1 tool" should appear in the step-3 toolbar
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
    goToStep2(el, "tools");

    // Add a tool
    const allInputs = el.querySelectorAll("input[type='text']") as NodeListOf<HTMLInputElement>;
    act(() => setInputValue(allInputs[0], "tool_one"));
    const addBtns = el.querySelectorAll("button");
    const addToolBtn = Array.from(addBtns).find(
      (b) => b.textContent?.trim() === "+ Add tool",
    ) as HTMLButtonElement;
    await act(async () => { addToolBtn.click(); });

    clickNext(el); // step 2 -> step 3

    // Type a prompt (the only textarea left on step 3 is the prompt input)
    const promptTextarea = el.querySelector("textarea") as HTMLTextAreaElement;
    act(() => setInputValue(promptTextarea, "Run this tool"));

    // Click Run (label is "runButton" via mocked t())
    const runBtns = el.querySelectorAll("button");
    const runBtn = Array.from(runBtns).find(
      (b) => b.textContent?.includes("runButton"),
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
    goToStep2(el, "json");
    const toggle = el.querySelector("[role='switch']") as HTMLButtonElement;
    await act(async () => { toggle.click(); });

    clickNext(el); // step 2 -> step 3

    expect(el.textContent).toContain("JSON mode");
  });
});
