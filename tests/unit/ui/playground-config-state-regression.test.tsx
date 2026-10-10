// @vitest-environment jsdom
import React, { useState } from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { ConfigState } from "../../../src/app/(dashboard)/dashboard/playground/components/StudioConfigPane";

const catalog = vi.hoisted(() => ({
  providers: [
    { value: "reason-provider", label: "Reason provider", modelPrefix: "reason-provider" },
    { value: "image-provider", label: "Image provider", modelPrefix: "image-provider" },
  ],
  models: {
    "reason-provider": ["reason-provider/model-thinking"],
    "image-provider": ["image-provider/model-image"],
  } as Record<string, string[]>,
  capabilities: {
    "reason-provider/model-thinking": {
      supportsThinking: true,
      effort_tiers: ["low", "high"],
    },
    "image-provider/model-image": { supportsThinking: false },
  },
}));
const presetControls = vi.hoisted(() => ({
  list: vi.fn(),
  create: vi.fn(),
  remove: vi.fn(),
}));

vi.mock("@/lib/playground/codeExport", () => ({
  endpointToPath: (endpoint: string) => `/v1/${endpoint}`,
}));

vi.mock("@/app/(dashboard)/dashboard/translator/hooks/useProviderOptions", async () => {
  const { useState } = await import("react");
  return {
    useProviderOptions: (initialProvider = "") => {
      const [provider, setProvider] = useState(initialProvider || catalog.providers[0].value);
      return {
        provider,
        setProvider,
        providerOptions: catalog.providers,
        loading: false,
      };
    },
  };
});

vi.mock("@/app/(dashboard)/dashboard/translator/hooks/useAvailableModels", () => ({
  useAvailableModels: (provider?: string) => ({
    availableModels: provider
      ? (catalog.models[provider] ?? [])
      : Object.values(catalog.models).flat(),
    modelCapabilities: catalog.capabilities,
    loading: false,
  }),
}));

vi.mock("@/app/(dashboard)/dashboard/playground/hooks/usePresets", () => ({
  usePresets: () => ({
    presets: [],
    loading: false,
    ...presetControls,
  }),
}));

const { default: StudioConfigPane } =
  await import("../../../src/app/(dashboard)/dashboard/playground/components/StudioConfigPane");
const { DEFAULT_PARAMS } =
  await import("../../../src/app/(dashboard)/dashboard/playground/components/ParamSliders");

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function makeConfig(overrides: Partial<ConfigState>): ConfigState {
  return {
    endpoint: "chat.completions",
    baseUrl: "http://localhost:20128",
    model: "",
    systemPrompt: "Synthetic system prompt",
    params: { ...DEFAULT_PARAMS },
    ...overrides,
  };
}

function ConfigHarness({ initialConfig }: { initialConfig: ConfigState }) {
  const [configState, setConfigState] = useState(initialConfig);
  return (
    <>
      <output data-testid="config-state">{JSON.stringify(configState)}</output>
      <StudioConfigPane configState={configState} setConfigState={setConfigState} />
    </>
  );
}

function renderHarness(initialConfig: ConfigState): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ConfigHarness initialConfig={initialConfig} />);
  });
  containers.push({ root, el });
  return el;
}

function readConfig(el: HTMLDivElement): ConfigState {
  const content = el.querySelector("[data-testid='config-state']")?.textContent ?? "{}";
  return JSON.parse(content) as ConfigState;
}

function findProviderSelect(el: HTMLDivElement): HTMLSelectElement {
  const select = Array.from(el.querySelectorAll<HTMLSelectElement>("select")).find((candidate) =>
    Array.from(candidate.options).some((option) => option.value === "image-provider")
  );
  if (!select) throw new Error("Provider select not found");
  return select;
}

describe("StudioConfigPane state updates", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("keeps the auto-selected model when reasoning state initializes in the same effect pass", () => {
    const el = renderHarness(makeConfig({ provider: "image-provider" }));

    expect(readConfig(el)).toMatchObject({
      provider: "image-provider",
      model: "image-provider/model-image",
      reasoning: { show: false, effortOptions: [] },
    });
  });

  it("commits provider, default model, and reasoning together when the provider changes", () => {
    const initialConfig = makeConfig({
      provider: "reason-provider",
      model: "reason-provider/model-thinking",
      reasoning: { show: true, effortOptions: ["low", "high"] },
    });
    const el = renderHarness(initialConfig);
    const providerSelect = findProviderSelect(el);

    act(() => {
      providerSelect.value = "image-provider";
      providerSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });

    const nextConfig = readConfig(el);
    expect(nextConfig).toMatchObject({
      provider: "image-provider",
      model: "image-provider/model-image",
      reasoning: { show: false, effortOptions: [] },
    });
    expect(nextConfig.baseUrl).toBe(initialConfig.baseUrl);
    expect(nextConfig.systemPrompt).toBe(initialConfig.systemPrompt);
    expect(nextConfig.params).toEqual(initialConfig.params);
  });
});
