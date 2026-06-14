// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

const { DEFAULT_PARAMS } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/ParamSliders"
);
const { default: ImprovePromptButton } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/ImprovePromptButton"
);

const BASE_CONFIG = {
  endpoint: "chat.completions" as const,
  baseUrl: "http://localhost:20128",
  model: "openai/gpt-4o",
  systemPrompt: "You are helpful.",
  params: { ...DEFAULT_PARAMS },
};

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderButton(config = BASE_CONFIG, setConfig = vi.fn()): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <ImprovePromptButton configState={config} setConfigState={setConfig} />,
    );
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

describe("ImprovePromptButton", () => {
  it("renders the Improve prompt button", () => {
    const el = renderButton();
    const btn = el.querySelector("[aria-label='Improve prompt using AI']");
    expect(btn).not.toBeNull();
    expect(btn?.textContent).toContain("Improve prompt");
  });

  it("button is disabled when model is empty", () => {
    const config = { ...BASE_CONFIG, model: "" };
    const el = renderButton(config);
    const btn = el.querySelector("[aria-label='Improve prompt using AI']") as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it("button is enabled when model is set", () => {
    const el = renderButton();
    const btn = el.querySelector("[aria-label='Improve prompt using AI']") as HTMLButtonElement;
    expect(btn.disabled).toBe(false);
  });

  it("shows confirmation modal when button is clicked", async () => {
    const el = renderButton();
    const btn = el.querySelector("[aria-label='Improve prompt using AI']") as HTMLButtonElement;

    await act(async () => { btn.click(); });

    const modal = el.querySelector("[role='dialog']");
    expect(modal).not.toBeNull();
    expect(modal?.textContent).toContain("Improve prompt");
  });

  it("confirmation modal shows quota warning message", async () => {
    const el = renderButton();
    const btn = el.querySelector("[aria-label='Improve prompt using AI']") as HTMLButtonElement;

    await act(async () => { btn.click(); });

    const modal = el.querySelector("[role='dialog']");
    expect(modal?.textContent).toContain("quota");
  });

  it("confirmation modal shows the configured model name", async () => {
    const el = renderButton();
    const btn = el.querySelector("[aria-label='Improve prompt using AI']") as HTMLButtonElement;

    await act(async () => { btn.click(); });

    const modal = el.querySelector("[role='dialog']");
    expect(modal?.textContent).toContain("openai/gpt-4o");
  });

  it("cancels modal without calling API when Cancel is clicked", async () => {
    vi.stubGlobal("fetch", vi.fn());
    const el = renderButton();
    const btn = el.querySelector("[aria-label='Improve prompt using AI']") as HTMLButtonElement;

    await act(async () => { btn.click(); });

    const cancelBtn = el.querySelector("[role='dialog'] button:first-child") as HTMLButtonElement;
    await act(async () => { cancelBtn.click(); });

    // Modal should close
    expect(el.querySelector("[role='dialog']")).toBeNull();
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  it("calls useImprovePrompt.improve (POST /api/playground/improve-prompt) on confirm", async () => {
    const mockResponse = {
      improvedSystem: "You are a highly specialized assistant.",
      tokensIn: 50,
      tokensOut: 30,
    };

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify(mockResponse), {
            status: 200,
            headers: { "content-type": "application/json" },
          }),
        ),
      ) as typeof fetch,
    );

    const setConfig = vi.fn();
    const el = renderButton(BASE_CONFIG, setConfig);

    const btn = el.querySelector("[aria-label='Improve prompt using AI']") as HTMLButtonElement;
    await act(async () => { btn.click(); });

    // Click confirm (Improve button)
    const modal = el.querySelector("[role='dialog']");
    const allBtns = modal?.querySelectorAll("button") ?? [];
    const improveBtn = Array.from(allBtns).find(
      (b) => b.textContent?.includes("Improve") && !b.textContent?.includes("Improve prompt"),
    ) as HTMLButtonElement;
    expect(improveBtn).not.toBeNull();

    await act(async () => { improveBtn.click(); });
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    // fetch should have been called with POST to improve-prompt
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1);
    const [url, opts] = (vi.mocked(fetch) as ReturnType<typeof vi.fn>).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("improve-prompt");
    expect(opts.method).toBe("POST");

    // setConfigState should have been called with improved system prompt
    expect(setConfig).toHaveBeenCalledTimes(1);
    const updatedConfig = setConfig.mock.calls[0][0] as typeof BASE_CONFIG;
    expect(updatedConfig.systemPrompt).toBe("You are a highly specialized assistant.");
  });
});
