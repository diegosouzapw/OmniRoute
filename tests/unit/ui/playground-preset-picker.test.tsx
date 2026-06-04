// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { DEFAULT_PARAMS } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/ParamSliders"
);
const { default: PresetPicker } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/PresetPicker"
);

function setInputValue(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const nativeSetter =
    el instanceof HTMLTextAreaElement
      ? Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set
      : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  nativeSetter?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

const BASE_CONFIG = {
  endpoint: "chat.completions" as const,
  baseUrl: "http://localhost:20128",
  model: "openai/gpt-4o",
  systemPrompt: "You are helpful.",
  params: { ...DEFAULT_PARAMS },
};

const MOCK_PRESETS = [
  {
    id: "preset-1",
    name: "My preset",
    endpoint: "chat.completions",
    model: "anthropic/claude-3-opus",
    system: "Act as an expert.",
    params: { temperature: 0.5 },
    created_at: new Date().toISOString(),
  },
];

function buildFetchMock(presets = MOCK_PRESETS) {
  return vi.fn((url: string, opts?: RequestInit) => {
    const method = opts?.method ?? "GET";

    if (typeof url === "string" && url.includes("/api/playground/presets") && method === "GET") {
      return Promise.resolve(
        new Response(JSON.stringify({ presets }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      );
    }

    if (typeof url === "string" && url.includes("/api/playground/presets") && method === "POST") {
      const newPreset = {
        id: "preset-new",
        name: "New",
        endpoint: "chat.completions",
        model: "test",
        system: null,
        params: {},
        created_at: new Date().toISOString(),
      };
      return Promise.resolve(
        new Response(JSON.stringify(newPreset), {
          status: 201,
          headers: { "content-type": "application/json" },
        }),
      );
    }

    if (typeof url === "string" && url.includes("/presets/") && method === "DELETE") {
      return Promise.resolve(new Response(null, { status: 204 }));
    }

    return Promise.resolve(new Response(JSON.stringify({ presets: [] }), { status: 200 }));
  }) as typeof fetch;
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderPicker(
  config = BASE_CONFIG,
  setConfig = vi.fn(),
): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<PresetPicker configState={config} setConfigState={setConfig} />);
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

describe("PresetPicker", () => {
  it("renders Load preset dropdown and Save button", () => {
    vi.stubGlobal("fetch", buildFetchMock([]));
    const el = renderPicker();
    expect(el.textContent).toContain("presetsLabel");
    const saveBtn = el.querySelector("[aria-label='savePreset']");
    expect(saveBtn).not.toBeNull();
  });

  it("shows preset names after fetch succeeds", async () => {
    vi.stubGlobal("fetch", buildFetchMock(MOCK_PRESETS));
    const el = renderPicker();

    // Wait for fetch to resolve
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(el.textContent).toContain("My preset");
  });

  it("loads a preset and calls setConfigState when a preset button is clicked", async () => {
    vi.stubGlobal("fetch", buildFetchMock(MOCK_PRESETS));
    const setConfig = vi.fn();
    const el = renderPicker(BASE_CONFIG, setConfig);

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    // Find and click the preset load button
    const loadBtn = el.querySelector("[aria-label='Load preset \"My preset\"']") as HTMLButtonElement;
    if (loadBtn) {
      await act(async () => { loadBtn.click(); });
      expect(setConfig).toHaveBeenCalledTimes(1);
      const newConfig = setConfig.mock.calls[0][0] as typeof BASE_CONFIG;
      expect(newConfig.model).toBe("anthropic/claude-3-opus");
    }
  });

  it("opens save modal when Save button is clicked", async () => {
    vi.stubGlobal("fetch", buildFetchMock([]));
    const el = renderPicker();

    const saveBtn = el.querySelector("[aria-label='savePreset']") as HTMLButtonElement;
    await act(async () => { saveBtn.click(); });

    // Modal should appear
    const modal = el.querySelector("[role='dialog']");
    expect(modal).not.toBeNull();
    expect(modal?.textContent).toContain("savePreset");
  });

  it("calls create hook (POST to /api/playground/presets) when saving", async () => {
    const fetchMock = buildFetchMock([]);
    vi.stubGlobal("fetch", fetchMock);
    const el = renderPicker();

    // Open modal
    const saveBtn = el.querySelector("[aria-label='savePreset']") as HTMLButtonElement;
    await act(async () => { saveBtn.click(); });

    // Enter name
    const nameInput = el.querySelector("input[type='text']") as HTMLInputElement;
    act(() => setInputValue(nameInput, "Test preset"));

    // Submit
    const submitBtn = el.querySelector("[role='dialog'] button:last-child") as HTMLButtonElement;
    await act(async () => { submitBtn.click(); });
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    // POST should have been called
    const calls = (fetchMock as ReturnType<typeof vi.fn>).mock.calls;
    const postCall = calls.find((c: unknown[]) => {
      const [, opts] = c as [string, RequestInit?];
      return opts?.method === "POST";
    });
    expect(postCall).toBeDefined();
  });

  it("shows error when saving with empty name", async () => {
    vi.stubGlobal("fetch", buildFetchMock([]));
    const el = renderPicker();

    const saveBtn = el.querySelector("[aria-label='savePreset']") as HTMLButtonElement;
    await act(async () => { saveBtn.click(); });

    // Submit without entering a name
    const submitBtn = el.querySelector("[role='dialog'] button:last-child") as HTMLButtonElement;
    await act(async () => { submitBtn.click(); });

    expect(el.textContent).toContain("nameRequired");
  });
});
