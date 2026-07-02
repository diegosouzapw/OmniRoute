// @vitest-environment jsdom
//
// Regression test for the per-model visibility toggle key bug.
//
// ProviderModelsSection renders three model UIs (CompatibleModelsSection,
// PassthroughModelsSection, ModelRow) and wires their onToggleHidden /
// onBulkToggleHidden callbacks to handleToggleModelHidden /
// handleBulkToggleModelHidden. Those handlers PATCH
// `/api/provider-models?provider=<key>&...`, and the hidden flag is stored under
// that key in modelCompatOverrides. EVERY reader (the /v1/models catalog
// builder, the dashboard's own fetchProviderModelMeta, auto-combo candidate
// filtering) keys hidden-state on the CANONICAL providerId — never on the
// provider's storage alias.
//
// The Compatible and Passthrough sections used to pass `providerStorageAlias`
// instead of `providerId`. For providers whose alias === id (every
// openai/anthropic-compatible provider, OpenRouter) the bug was masked. It only
// surfaced when alias !== id — e.g. Kilo Gateway (alias "kg", id
// "kilo-gateway"): the toggle wrote modelCompatOverrides["kg"] while every
// reader looked under "kilo-gateway", so the eye toggle silently no-op'd.
//
// This test renders the section with providerStorageAlias !== providerId and
// asserts the toggle/bulk handlers are invoked with the canonical providerId.
// It fails against the pre-fix wiring (providerStorageAlias) and passes after.

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ---------------------------------------------------------------------------
// Mock the three child model UIs. Each mock immediately invokes the visibility
// callbacks it receives so the test can assert on the key the parent passed,
// without depending on the children's internal DOM or interaction details.
// ---------------------------------------------------------------------------

const MODEL_ID = "some-model";

vi.mock("../components/CompatibleModelsSection", () => ({
  default: (props: {
    onToggleHidden: (modelId: string, hidden: boolean) => void;
    onBulkToggleHidden: (modelIds: string[], hidden: boolean) => void;
  }) => {
    props.onToggleHidden(MODEL_ID, true);
    props.onBulkToggleHidden([MODEL_ID], true);
    return <div data-testid="compatible-section" />;
  },
}));

vi.mock("../components/PassthroughModelsSection", () => ({
  default: (props: {
    onToggleHidden: (modelId: string, hidden: boolean) => void;
    onBulkToggleHidden: (modelIds: string[], hidden: boolean) => void;
  }) => {
    props.onToggleHidden(MODEL_ID, true);
    props.onBulkToggleHidden([MODEL_ID], true);
    return <div data-testid="passthrough-section" />;
  },
}));

vi.mock("../components/ModelRow", () => ({
  default: () => <div data-testid="model-row" />,
  ModelVisibilityToolbar: () => <div data-testid="visibility-toolbar" />,
}));

import ProviderModelsSection, {
  type ProviderModelsSectionProps,
} from "../components/ProviderModelsSection";

const t = ((key: string) => key) as ProviderModelsSectionProps["t"];

const PROVIDER_ID = "kilo-gateway";
const STORAGE_ALIAS = "kg";

function buildProps(overrides: Partial<ProviderModelsSectionProps>): ProviderModelsSectionProps {
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
    models: [{ id: MODEL_ID }],
    modelMeta: { customModels: [], modelCompatOverrides: [] },
    modelAliases: {},
    syncedAvailableModels: [{ id: MODEL_ID }],
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

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(props: ProviderModelsSectionProps) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ProviderModelsSection {...props} />);
  });
  roots.push({ root, el });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.clearAllMocks();
});

describe("ProviderModelsSection visibility-toggle key (alias !== id)", () => {
  it("passes the canonical providerId to the passthrough section toggles", () => {
    const handleToggleModelHidden = vi.fn().mockResolvedValue(undefined);
    const handleBulkToggleModelHidden = vi.fn().mockResolvedValue(undefined);

    render(
      buildProps({
        providerInfo: { name: "Kilo Gateway", passthroughModels: true },
        handleToggleModelHidden,
        handleBulkToggleModelHidden,
      })
    );

    // The bug wrote under providerStorageAlias ("kg"); every reader keys on the
    // canonical providerId ("kilo-gateway"), so the alias write was orphaned.
    expect(handleToggleModelHidden).toHaveBeenCalledWith(PROVIDER_ID, MODEL_ID, true);
    expect(handleToggleModelHidden).not.toHaveBeenCalledWith(STORAGE_ALIAS, MODEL_ID, true);
    expect(handleBulkToggleModelHidden).toHaveBeenCalledWith(PROVIDER_ID, [MODEL_ID], true);
    expect(handleBulkToggleModelHidden).not.toHaveBeenCalledWith(STORAGE_ALIAS, [MODEL_ID], true);
  });

  it("passes the canonical providerId to the compatible section toggles", () => {
    const handleToggleModelHidden = vi.fn().mockResolvedValue(undefined);
    const handleBulkToggleModelHidden = vi.fn().mockResolvedValue(undefined);

    render(
      buildProps({
        isManagedAvailableModelsProvider: true,
        handleToggleModelHidden,
        handleBulkToggleModelHidden,
      })
    );

    expect(handleToggleModelHidden).toHaveBeenCalledWith(PROVIDER_ID, MODEL_ID, true);
    expect(handleToggleModelHidden).not.toHaveBeenCalledWith(STORAGE_ALIAS, MODEL_ID, true);
    expect(handleBulkToggleModelHidden).toHaveBeenCalledWith(PROVIDER_ID, [MODEL_ID], true);
    expect(handleBulkToggleModelHidden).not.toHaveBeenCalledWith(STORAGE_ALIAS, [MODEL_ID], true);
  });
});
