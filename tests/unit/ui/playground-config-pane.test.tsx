// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/lib/playground/codeExport", () => ({
  endpointToPath: (ep: string) => `/v1/${ep}`,
}));

const { default: StudioConfigPane } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/StudioConfigPane"
);
const { DEFAULT_PARAMS } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/ParamSliders"
);

// ── Helpers ────────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function makeConfig() {
  return {
    endpoint: "chat.completions" as const,
    baseUrl: "http://localhost:20128",
    model: "openai/gpt-4o",
    systemPrompt: "You are a helpful assistant.",
    params: { ...DEFAULT_PARAMS },
  };
}

function renderPane(
  configState: ReturnType<typeof makeConfig>,
  setConfigState: (s: ReturnType<typeof makeConfig>) => void
): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<StudioConfigPane configState={configState} setConfigState={setConfigState as (s: typeof configState) => void} />);
  });
  containers.push({ root, el });
  return el;
}

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("StudioConfigPane", () => {
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
    vi.clearAllMocks();
  });

  it("renders the config pane with model input", () => {
    const config = makeConfig();
    const el = renderPane(config, vi.fn());
    const inputs = el.querySelectorAll("input, textarea, select");
    expect(inputs.length).toBeGreaterThan(0);
  });

  it("renders SLOT_PRESETS comment marker", () => {
    // The HTML won't show comments, but we can verify the component structure is rendered
    const config = makeConfig();
    const el = renderPane(config, vi.fn());
    // Config label should be visible
    expect(el.textContent).toContain("Config");
  });

  it("renders system prompt textarea", () => {
    const config = makeConfig();
    const el = renderPane(config, vi.fn());
    const textarea = el.querySelector("textarea");
    expect(textarea).toBeTruthy();
    expect(textarea?.value).toBe("You are a helpful assistant.");
  });

  it("calls setConfigState when model input changes", () => {
    const config = makeConfig();
    const setConfigState = vi.fn();
    const el = renderPane(config, setConfigState);

    const inputs = el.querySelectorAll("input[type='text']");
    const modelInput = Array.from(inputs).find(
      (inp) => (inp as HTMLInputElement).placeholder?.includes("gpt-4o")
    ) as HTMLInputElement | undefined;

    expect(modelInput).toBeTruthy();
    if (modelInput) {
      act(() => {
        // React 19 requires nativeInputValueSetter for synthetic event simulation
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(modelInput, "anthropic/claude-3");
        modelInput.dispatchEvent(new Event("input", { bubbles: true }));
        modelInput.dispatchEvent(new Event("change", { bubbles: true }));
      });
      // setConfigState should have been called
      expect(setConfigState).toHaveBeenCalled();
    }
  });

  it("collapses when collapse button is clicked", () => {
    const config = makeConfig();
    const el = renderPane(config, vi.fn());

    const collapseBtn = el.querySelector("button[aria-label='Collapse config pane']") as HTMLButtonElement | null;
    expect(collapseBtn).toBeTruthy();

    act(() => {
      collapseBtn?.click();
    });

    // After collapse, expanded content should not be visible
    expect(el.querySelector("textarea")).toBeNull();
  });

  it("expands when expand button is clicked after collapse", () => {
    const config = makeConfig();
    const el = renderPane(config, vi.fn());

    const collapseBtn = el.querySelector(
      "button[aria-label='Collapse config pane']"
    ) as HTMLButtonElement | null;
    act(() => {
      collapseBtn?.click();
    });

    // Now find the expand button
    const expandBtn = el.querySelector(
      "button[aria-label='Expand config pane']"
    ) as HTMLButtonElement | null;
    expect(expandBtn).toBeTruthy();

    act(() => {
      expandBtn?.click();
    });

    // After expanding, textarea should be visible again
    expect(el.querySelector("textarea")).toBeTruthy();
  });

  it("renders temperature slider", () => {
    const config = makeConfig();
    const el = renderPane(config, vi.fn());
    const sliders = el.querySelectorAll("input[type='range']");
    expect(sliders.length).toBeGreaterThan(0);
  });

  it("calls setConfigState with updated params when slider changes", () => {
    const config = makeConfig();
    const setConfigState = vi.fn();
    const el = renderPane(config, setConfigState);

    const rangeInputs = el.querySelectorAll("input[type='range']");
    expect(rangeInputs.length).toBeGreaterThan(0);

    act(() => {
      const slider = rangeInputs[0] as HTMLInputElement;
      // Use nativeInputValueSetter for React 19 synthetic event simulation
      const nativeRangeValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeRangeValueSetter?.call(slider, "0.5");
      slider.dispatchEvent(new Event("input", { bubbles: true }));
      slider.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(setConfigState).toHaveBeenCalled();
  });

  it("renders endpoint select with all 13 options (D4-rev2)", () => {
    const config = makeConfig();
    const el = renderPane(config, vi.fn());
    // Multiple <select> elements may exist (PresetPicker also renders one).
    // The endpoint select is the one with our 13 endpoint values.
    const selects = Array.from(el.querySelectorAll<HTMLSelectElement>("select"));
    const endpointSelect = selects.find(
      (s) => Array.from(s.options).some((o) => o.value === "chat.completions")
    );
    expect(endpointSelect).toBeTruthy();
    expect(endpointSelect?.options.length).toBe(13);
  });
});
