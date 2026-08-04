// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// #4086: the raw Playground model <select> had no search/filter, forcing users to scroll
// a flat list (e.g. 50+ OpenRouter models). Regression guard for the search box added to
// StudioConfigPane's model picker.

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/lib/playground/codeExport", () => ({
  endpointToPath: (ep: string) => `/v1/${ep}`,
}));

const AVAILABLE_MODELS = ["openai/gpt-4o", "anthropic/claude-3", "openrouter/mistral-large"];

vi.mock("@/app/(dashboard)/dashboard/translator/hooks/useAvailableModels", () => ({
  useAvailableModels: () => ({
    availableModels: AVAILABLE_MODELS,
    modelCapabilities: {},
    loading: false,
  }),
}));

vi.mock("@/app/(dashboard)/dashboard/translator/hooks/useProviderOptions", () => ({
  useProviderOptions: () => ({
    provider: "",
    setProvider: vi.fn(),
    providerOptions: [],
    loading: false,
  }),
}));

const { default: StudioConfigPane } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/StudioConfigPane"
);
const { DEFAULT_PARAMS } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/ParamSliders"
);

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
    root.render(
      <StudioConfigPane
        configState={configState}
        setConfigState={setConfigState as (s: typeof configState) => void}
      />
    );
  });
  containers.push({ root, el });
  return el;
}

function setInputValue(input: HTMLInputElement, value: string) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;
  nativeInputValueSetter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

describe("StudioConfigPane model search (#4086)", () => {
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

  it("renders a search input above the model select", () => {
    const config = makeConfig();
    const el = renderPane(config, vi.fn());
    const searchInput = el.querySelector(
      "input[type='text'][placeholder='search']"
    ) as HTMLInputElement | null;
    expect(searchInput).toBeTruthy();
  });

  it("shows all models in the select when the search box is empty", () => {
    const config = makeConfig();
    const el = renderPane(config, vi.fn());
    const modelSelect = Array.from(el.querySelectorAll<HTMLSelectElement>("select")).find((s) =>
      Array.from(s.options).some((o) => o.value === "openai/gpt-4o")
    );
    expect(modelSelect).toBeTruthy();
    expect(modelSelect?.options.length).toBe(AVAILABLE_MODELS.length);
  });

  it("filters the model select options as the user types", () => {
    const config = makeConfig();
    const el = renderPane(config, vi.fn());

    const searchInput = el.querySelector(
      "input[type='text'][placeholder='search']"
    ) as HTMLInputElement;
    expect(searchInput).toBeTruthy();

    act(() => {
      setInputValue(searchInput, "claude");
    });

    const modelSelect = Array.from(el.querySelectorAll<HTMLSelectElement>("select")).find((s) =>
      Array.from(s.options).some((o) => o.value === "anthropic/claude-3")
    );
    expect(modelSelect).toBeTruthy();
    // The non-matching "openrouter/mistral-large" model is filtered out. The currently
    // selected "openai/gpt-4o" stays pinned (see the dedicated test below) even though it
    // doesn't match "claude" — so the matched model plus the pinned selection remain.
    const values = Array.from(modelSelect?.options ?? []).map((o) => o.value);
    expect(values).toContain("anthropic/claude-3");
    expect(values).not.toContain("openrouter/mistral-large");
  });

  it("keeps a currently selected model visible even when it doesn't match the query", () => {
    const config = makeConfig(); // model = "openai/gpt-4o"
    const el = renderPane(config, vi.fn());

    const searchInput = el.querySelector(
      "input[type='text'][placeholder='search']"
    ) as HTMLInputElement;

    act(() => {
      setInputValue(searchInput, "claude");
    });

    const modelSelect = Array.from(el.querySelectorAll<HTMLSelectElement>("select")).find((s) =>
      Array.from(s.options).some((o) => o.value === "anthropic/claude-3")
    );
    const values = Array.from(modelSelect?.options ?? []).map((o) => o.value);
    expect(values).toContain("openai/gpt-4o");
  });
});
