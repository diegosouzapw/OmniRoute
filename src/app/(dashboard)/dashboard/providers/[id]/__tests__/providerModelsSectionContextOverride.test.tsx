// @vitest-environment jsdom
//
// Catalog models of native providers get the context-window override editor.
// The override is stored under the CANONICAL provider id (the key the chat
// pipeline's capability resolver and the PUT guard both use) — never under the
// storage alias — so a provider whose alias differs from its id ("kg" vs
// "kilo-gateway") must read and write under the id.

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../components/ModelCompatPopover", () => ({ default: () => null }));

const notifyError = vi.fn();
const notifySuccess = vi.fn();
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({ error: notifyError, success: notifySuccess }),
}));

import ProviderModelsSection, {
  type ProviderModelsSectionProps,
} from "../components/ProviderModelsSection";

const t = ((key: string) => key) as ProviderModelsSectionProps["t"];
const PROVIDER_ID = "kilo-gateway";
const STORAGE_ALIAS = "kg";
const MODEL_ID = "some-model";

function buildProps(overrides: Partial<ProviderModelsSectionProps> = {}) {
  return {
    providerId: PROVIDER_ID,
    providerAlias: STORAGE_ALIAS,
    providerStorageAlias: STORAGE_ALIAS,
    providerDisplayAlias: STORAGE_ALIAS,
    providerInfo: { name: "Kilo Gateway" },
    isCcCompatible: false,
    isAnthropicCompatible: false,
    isAnthropicProtocolCompatible: false,
    isManagedAvailableModelsProvider: false,
    compatibleSupportsModelImport: false,
    allowModelImport: true,
    models: [{ id: MODEL_ID, name: "Some Model", source: "system" }],
    modelMeta: { customModels: [], modelCompatOverrides: [] },
    modelAliases: {},
    syncedAvailableModels: [],
    compatibleFallbackModels: [],
    copied: null,
    onCopy: vi.fn(),
    onSetAlias: vi.fn().mockResolvedValue(undefined),
    onDeleteAlias: vi.fn().mockResolvedValue(undefined),
    fetchProviderModelMeta: vi.fn().mockResolvedValue(undefined),
    connections: [],
    selectedConnection: null,
    canImportModels: false,
    importingModels: false,
    handleImportModels: vi.fn().mockResolvedValue(undefined),
    isAutoSyncEnabled: false,
    togglingAutoSync: false,
    handleToggleAutoSync: vi.fn().mockResolvedValue(undefined),
    isAutoFetchModelsEnabled: false,
    togglingAutoFetchModels: false,
    handleToggleAutoFetchModels: vi.fn().mockResolvedValue(undefined),
    handleCompatibleImportWithProgress: vi.fn().mockResolvedValue(undefined),
    compatSavingModelId: null,
    togglingModelId: null,
    bulkVisibilityAction: null,
    clearingModels: false,
    modelFilter: "",
    testingModelId: null,
    modelTestStatus: {},
    onModelTestStatusChange: vi.fn(),
    testingAll: false,
    testProgress: null,
    autoHideFailed: false,
    visibilityFilter: "all",
    providerAliasEntries: [],
    setModelFilter: vi.fn(),
    setAutoHideFailed: vi.fn(),
    setVisibilityFilter: vi.fn(),
    saveModelCompatFlags: vi.fn().mockResolvedValue(undefined),
    handleToggleModelHidden: vi.fn().mockResolvedValue(undefined),
    handleBulkToggleModelHidden: vi.fn().mockResolvedValue(undefined),
    handleClearAllModels: vi.fn().mockResolvedValue(undefined),
    onTestModel: vi.fn().mockResolvedValue(undefined),
    handleTestAll: vi.fn().mockResolvedValue(undefined),
    effectiveModelNormalize: () => false,
    effectiveModelPreserveDeveloper: () => false,
    effectiveModelHidden: () => false,
    getUpstreamHeadersRecordForModel: () => ({}),
    t,
    ...overrides,
  } as ProviderModelsSectionProps;
}

type FetchCall = { url: string; init?: RequestInit };
let calls: FetchCall[] = [];
let stored: Array<{ modelId: string; contextWindowOverride: number }> = [];

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

async function render(props: ProviderModelsSectionProps) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(<ProviderModelsSection {...props} />);
  });
  roots.push({ root, el });
  return el;
}

const setInputValue = (input: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  calls = [];
  stored = [{ modelId: MODEL_ID, contextWindowOverride: 750000 }];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      calls.push({ url: String(url), init });
      if (init?.method === "PUT") {
        const body = JSON.parse(String(init.body));
        stored =
          body.contextWindowOverride == null
            ? []
            : [{ modelId: body.modelId, contextWindowOverride: body.contextWindowOverride }];
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }
      return new Response(JSON.stringify({ models: [], modelContextOverrides: stored }), {
        status: 200,
      });
    })
  );
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("ProviderModelsSection catalog context-window override", () => {
  it("reads the overrides under the canonical provider id and shows the badge", async () => {
    const el = await render(buildProps());
    const get = calls.find((c) => !c.init?.method || c.init.method === "GET");
    expect(get?.url).toBe(`/api/provider-models?provider=${PROVIDER_ID}`);
    expect(el.textContent).toContain("🪟 750,000");
  });

  it("saves via PUT with {provider, modelId, contextWindowOverride} under the provider id", async () => {
    const el = await render(buildProps());
    const edit = [...el.querySelectorAll("button")].find(
      (b) => b.getAttribute("title") === "contextWindowOverrideLabel"
    )!;
    expect(edit).toBeDefined();
    act(() => edit.click());
    const input = el.querySelector(
      'input[aria-label="contextWindowOverrideLabel"]'
    ) as HTMLInputElement;
    await act(async () => setInputValue(input, "1000000"));
    await act(async () => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });

    const put = calls.find((c) => c.init?.method === "PUT");
    expect(put?.url).toBe("/api/provider-models");
    expect(JSON.parse(String(put?.init?.body))).toEqual({
      provider: PROVIDER_ID,
      modelId: MODEL_ID,
      contextWindowOverride: 1000000,
    });
    // Refreshed from the server after the save.
    expect(el.textContent).toContain("🪟 1,000,000");
    expect(notifySuccess).toHaveBeenCalled();
  });

  it("turns invalid input into an error toast without a PUT", async () => {
    const el = await render(buildProps());
    const edit = [...el.querySelectorAll("button")].find(
      (b) => b.getAttribute("title") === "contextWindowOverrideLabel"
    )!;
    act(() => edit.click());
    const input = el.querySelector(
      'input[aria-label="contextWindowOverrideLabel"]'
    ) as HTMLInputElement;
    await act(async () => setInputValue(input, "abc"));
    await act(async () => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    expect(calls.some((c) => c.init?.method === "PUT")).toBe(false);
    expect(notifyError).toHaveBeenCalledWith("contextWindowOverrideInvalid");
  });
});
