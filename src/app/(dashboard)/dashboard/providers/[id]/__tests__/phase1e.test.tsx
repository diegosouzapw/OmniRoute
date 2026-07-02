// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  buildCompatMap,
  isModelHiddenFn,
  effectiveNormalizeForProtocol,
  effectivePreserveForProtocol,
  anyNormalizeCompatBadge,
  anyNoPreserveCompatBadge,
  formatProviderModelsErrorResponse,
  providerText,
} from "../providerPageHelpers";
import {
  effectiveModelCapabilitiesFromRows,
  hasModelConfigOverride,
  modelCapabilitiesFromRow,
} from "../modelConfigHelpers";

// ---------------------------------------------------------------------------
// Global mocks required by the extracted components
// ---------------------------------------------------------------------------

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "test-provider" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/providers/test-provider",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) {
      return Object.entries(values).reduce((acc, [k, v]) => acc.replace(`{${k}}`, String(v)), key);
    }
    return key;
  },
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));

vi.mock("@/shared/components", () => ({
  Badge: ({ children }: any) => <span>{children}</span>,
  Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
  Input: (props: any) => <input {...props} />,
  Toggle: ({ checked, disabled, label, onChange }: any) => (
    <label>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
      {label}
    </label>
  ),
}));

function setInputValue(input: HTMLInputElement, value: string) {
  const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  valueSetter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

async function openFirstCompatPopover() {
  await act(async () => {
    document.querySelector<HTMLButtonElement>('button[title="compatAdjustmentsTitle"]')?.click();
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function expectCapabilityMode(label: string, mode: "Unknown" | "Supported" | "Unsupported") {
  expect(
    document
      .querySelector<HTMLButtonElement>(`button[role="radio"][aria-label="${label}: ${mode}"]`)
      ?.getAttribute("aria-checked")
  ).toBe("true");
}

function expectCapabilityRowHasNoResolvedText(label: string) {
  const button = document.querySelector<HTMLButtonElement>(
    `button[role="radio"][aria-label="${label}: Unknown"]`
  );
  expect(button?.parentElement?.parentElement?.textContent).not.toContain("Resolved:");
}

// ---------------------------------------------------------------------------
// Pure-function tests for model-compat helpers (moved to providerPageHelpers)
// ---------------------------------------------------------------------------

describe("providerPageHelpers — model-compat pure functions", () => {
  const customRow = {
    id: "gpt-4o",
    normalizeToolCallId: true,
    preserveOpenAIDeveloperRole: false,
    isHidden: true,
  };
  const customModels = [customRow];
  const overrideModels: any[] = [];

  it("buildCompatMap produces a Map keyed by id", () => {
    const map = buildCompatMap(customModels);
    expect(map.size).toBe(1);
    expect(map.get("gpt-4o")).toEqual(customRow);
  });

  it("isModelHiddenFn reads from customMap first", () => {
    const customMap = buildCompatMap(customModels);
    const overrideMap = buildCompatMap(overrideModels);
    expect(isModelHiddenFn("gpt-4o", customMap, overrideMap)).toBe(true);
    expect(isModelHiddenFn("unknown-model", customMap, overrideMap)).toBe(false);
  });

  it("effectiveNormalizeForProtocol returns correct flag", () => {
    const customMap = buildCompatMap(customModels);
    const overrideMap = buildCompatMap(overrideModels);
    expect(effectiveNormalizeForProtocol("gpt-4o", "openai", customMap, overrideMap)).toBe(true);
    expect(effectiveNormalizeForProtocol("unknown", "openai", customMap, overrideMap)).toBe(false);
  });

  it("effectivePreserveForProtocol returns correct flag", () => {
    const customMap = buildCompatMap(customModels);
    const overrideMap = buildCompatMap(overrideModels);
    expect(effectivePreserveForProtocol("gpt-4o", "openai", customMap, overrideMap)).toBe(false);
    // Unknown model defaults to true
    expect(effectivePreserveForProtocol("unknown", "openai", customMap, overrideMap)).toBe(true);
  });

  it("anyNormalizeCompatBadge returns true when flag is set", () => {
    const customMap = buildCompatMap(customModels);
    const overrideMap = buildCompatMap(overrideModels);
    expect(anyNormalizeCompatBadge("gpt-4o", customMap, overrideMap)).toBe(true);
    expect(anyNormalizeCompatBadge("unknown", customMap, overrideMap)).toBe(false);
  });

  it("anyNoPreserveCompatBadge returns true when preserve=false", () => {
    const customMap = buildCompatMap(customModels);
    const overrideMap = buildCompatMap(overrideModels);
    expect(anyNoPreserveCompatBadge("gpt-4o", customMap, overrideMap)).toBe(true);
    expect(anyNoPreserveCompatBadge("unknown", customMap, overrideMap)).toBe(false);
  });

  it("formatProviderModelsErrorResponse extracts error.message", async () => {
    const mockRes = new Response(JSON.stringify({ error: { message: "Model not found" } }), {
      status: 422,
      statusText: "Unprocessable Entity",
    });
    const detail = await formatProviderModelsErrorResponse(mockRes);
    expect(detail).toBe("Model not found");
  });

  it("formatProviderModelsErrorResponse falls back to statusText", async () => {
    const mockRes = new Response("{}", { status: 500, statusText: "Internal Server Error" });
    const detail = await formatProviderModelsErrorResponse(mockRes);
    expect(detail).toBe("Internal Server Error");
  });

  it("providerText falls back when locale entries are missing markers", () => {
    const translator = ((key: string) => `__MISSING__:${key}`) as ((key: string) => string) & {
      has: (key: string) => boolean;
    };
    translator.has = () => true;

    expect(providerText(translator, "targetFormatLabel", "Target format")).toBe("Target format");
  });

  it("model config helpers preserve explicit null as Unknown overrides", async () => {
    expect(
      (
        modelCapabilitiesFromRow({
          id: "local",
          capabilities: { supportsVision: null } as any,
        }) as any
      ).supportsVision
    ).toBeNull();
    expect(
      (
        modelCapabilitiesFromRow({
          id: "local",
          capabilities: { supportsVision: true, contextWindow: 128000 } as any,
          capabilityOverrides: { supportsVision: null, inputTokenLimit: null } as any,
        }) as any
      ).supportsVision
    ).toBeNull();
    expect(
      (
        modelCapabilitiesFromRow({
          id: "local",
          capabilities: { supportsVision: true, contextWindow: 128000 } as any,
          capabilityOverrides: { supportsVision: null, inputTokenLimit: null } as any,
        }) as any
      ).contextWindow
    ).toBeNull();

    const effective = effectiveModelCapabilitiesFromRows(
      "claude",
      "claude-opus-4-7",
      { id: "claude-opus-4-7" },
      {
        id: "claude-opus-4-7",
        capabilities: { supportsXHighEffort: null } as any,
      }
    ) as any;
    expect(Object.prototype.hasOwnProperty.call(effective, "supportsXHighEffort")).toBe(true);
    expect(effective.supportsXHighEffort).toBeNull();

    expect(
      hasModelConfigOverride(
        {
          id: "claude-opus-4-7",
          capabilityOverrides: { supportsXHighEffort: null } as any,
          baseline: {
            id: "claude-opus-4-7",
            capabilities: { supportsXHighEffort: true },
          },
        },
        undefined
      )
    ).toBe(true);
  });

  it("resolves Claude Code compatible capabilities from the shared CC catalog", async () => {
    const { effectiveModelCapabilitiesFromRows } = await import("../modelConfigHelpers");

    expect(
      effectiveModelCapabilitiesFromRows(
        "anthropic-compatible-cc-free-anthropic",
        "claude-fable-5",
        { id: "claude-fable-5", source: "manual" },
        undefined
      )
    ).toMatchObject({
      contextWindow: 1000000,
      maxOutputTokens: 128000,
      supportsXHighEffort: true,
      supportsMaxEffort: true,
    });
    const genericOpenAiCompatible = effectiveModelCapabilitiesFromRows(
      "openai-compatible-demo",
      "claude-fable-5",
      { id: "claude-fable-5", source: "manual" },
      undefined
    );
    expect(genericOpenAiCompatible).not.toHaveProperty("supportsXHighEffort");
    expect(genericOpenAiCompatible).not.toHaveProperty("supportsMaxEffort");
    expect(
      effectiveModelCapabilitiesFromRows(
        "anthropic-compatible-cc-free-anthropic",
        "claude-opus-4-6",
        { id: "claude-opus-4-6" },
        undefined
      )
    ).toMatchObject({
      supportsXHighEffort: false,
      supportsMaxEffort: true,
    });
    expect(
      effectiveModelCapabilitiesFromRows(
        "cc-compatible",
        "free-anthropic/claude-opus-4-6",
        { id: "free-anthropic/claude-opus-4-6" },
        undefined
      )
    ).toMatchObject({
      supportsXHighEffort: false,
      supportsMaxEffort: true,
    });
  });
});

// ---------------------------------------------------------------------------
// Component render smoke tests
// ---------------------------------------------------------------------------

describe("ModelRow — render smoke test", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("renders without throwing", async () => {
    // Dynamic import to keep top-level mock resolution clean
    const { default: ModelRow } = await import("../components/ModelRow");

    await act(async () => {
      root.render(
        <ModelRow
          model={{ id: "gpt-4o", name: "GPT-4o", source: "system", isHidden: false }}
          fullModel="openai/gpt-4o"
          provider="openai"
          t={(k) => k}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          saveModelCompatFlags={vi.fn()}
          getUpstreamHeadersRecord={() => ({})}
        />
      );
    });

    expect(container.textContent).toContain("openai/gpt-4o");
  });

  it("does not display inherited capability numbers as editable overrides", async () => {
    const { default: ModelRow } = await import("../components/ModelRow");

    await act(async () => {
      root.render(
        <ModelRow
          model={{ id: "gpt-4o", inputTokenLimit: 128000, outputTokenLimit: 8192 }}
          fullModel="openai/gpt-4o"
          provider="openai"
          capabilities={{}}
          t={(k) => k}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          saveModelCompatFlags={vi.fn()}
          getUpstreamHeadersRecord={() => ({})}
        />
      );
    });
    await act(async () => {
      document.querySelector<HTMLButtonElement>('button[title="compatAdjustmentsTitle"]')?.click();
      await Promise.resolve();
    });

    const values = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="number"]'))
      .map((input) => input.value)
      .filter(Boolean);
    expect(values).toEqual([]);
  });

  it("renders capability booleans as Unknown/Supported/Unsupported and clears overrides with null", async () => {
    const { default: ModelCompatPopover } = await import("../components/ModelCompatPopover");
    const onCapabilitiesPatch = vi.fn();

    await act(async () => {
      root.render(
        <ModelCompatPopover
          t={(k) => k}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => ({})}
          capabilities={{}}
          configuredCapabilities={{ supportsVision: true }}
          onCapabilitiesPatch={onCapabilitiesPatch}
          onCompatPatch={vi.fn()}
        />
      );
    });
    await act(async () => {
      document.querySelector<HTMLButtonElement>('button[title="compatAdjustmentsTitle"]')?.click();
      await Promise.resolve();
    });

    expectCapabilityMode("Vision", "Supported");
    expectCapabilityRowHasNoResolvedText("Vision");
    const visionUnknown = document.querySelector<HTMLButtonElement>(
      'button[role="radio"][aria-label="Vision: Unknown"]'
    );
    expect(visionUnknown).toBeTruthy();
    await act(async () => {
      visionUnknown?.click();
    });

    expect(onCapabilitiesPatch).toHaveBeenCalledWith({ supportsVision: null });

    onCapabilitiesPatch.mockClear();
    const visionSupported = document.querySelector<HTMLButtonElement>(
      'button[role="radio"][aria-label="Vision: Supported"]'
    );
    expect(visionSupported).toBeTruthy();
    await act(async () => {
      visionSupported?.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })
      );
    });
    expect(onCapabilitiesPatch).toHaveBeenCalledWith({ supportsVision: false });
  });

  it("uses effective capability booleans when no explicit override is configured", async () => {
    const { default: ModelCompatPopover } = await import("../components/ModelCompatPopover");

    await act(async () => {
      root.render(
        <ModelCompatPopover
          t={(k) => k}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => ({})}
          capabilities={{
            supportsVision: true,
            supportsTools: false,
            supportsReasoning: true,
            supportsXHighEffort: false,
            supportsMaxEffort: true,
          }}
          configuredCapabilities={{}}
          onCapabilitiesPatch={vi.fn()}
          onCompatPatch={vi.fn()}
        />
      );
    });
    await act(async () => {
      document.querySelector<HTMLButtonElement>('button[title="compatAdjustmentsTitle"]')?.click();
      await Promise.resolve();
    });

    expectCapabilityMode("Vision", "Supported");
    expectCapabilityMode("Tool calling", "Unsupported");
    expectCapabilityMode("Thinking", "Supported");
    expectCapabilityMode("xhigh", "Unsupported");
    expectCapabilityMode("max", "Supported");
    expectCapabilityRowHasNoResolvedText("Vision");
    expectCapabilityRowHasNoResolvedText("Tool calling");
    expectCapabilityRowHasNoResolvedText("Thinking");
    expectCapabilityRowHasNoResolvedText("xhigh");
    expectCapabilityRowHasNoResolvedText("max");
  });

  it("highlights Unknown only for explicit null capability overrides", async () => {
    const { default: ModelCompatPopover } = await import("../components/ModelCompatPopover");

    await act(async () => {
      root.render(
        <ModelCompatPopover
          t={(k) => k}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => ({})}
          capabilities={{ supportsVision: true }}
          configuredCapabilities={{ supportsVision: null }}
          onCapabilitiesPatch={vi.fn()}
          onCompatPatch={vi.fn()}
        />
      );
    });
    await act(async () => {
      document.querySelector<HTMLButtonElement>('button[title="compatAdjustmentsTitle"]')?.click();
      await Promise.resolve();
    });

    expectCapabilityMode("Vision", "Unknown");
    expectCapabilityRowHasNoResolvedText("Vision");
  });

  it("localizes empty resolved unsupported params", async () => {
    const { default: ModelCompatPopover } = await import("../components/ModelCompatPopover");

    await act(async () => {
      root.render(
        <ModelCompatPopover
          t={(key) => {
            const labels: Record<string, string> = {
              modelCapabilityResolvedPrefix: "当前解析",
              none: "无",
            };
            return labels[key] ?? key;
          }}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => ({})}
          unsupportedParams={[]}
          configuredUnsupportedParams={[]}
          onModelConfigPatch={vi.fn()}
          onCompatPatch={vi.fn()}
        />
      );
    });
    await openFirstCompatPopover();

    expect(document.body.textContent).toContain("当前解析: 无");
    expect(document.body.textContent).not.toContain("Resolved: none");
  });
});

describe("PassthroughModelRow — render smoke test", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("renders without throwing", async () => {
    const { default: PassthroughModelRow } = await import("../components/PassthroughModelRow");

    await act(async () => {
      root.render(
        <PassthroughModelRow
          modelId="some-model"
          fullModel="openrouter/some-model"
          t={(k) => k}
          onCopy={vi.fn()}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          saveModelCompatFlags={vi.fn()}
          getUpstreamHeadersRecord={() => ({})}
        />
      );
    });

    expect(container.textContent).toContain("openrouter/some-model");
  });
});

describe("ModelVisibilityToolbar — render smoke test", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("renders without throwing", async () => {
    const { ModelVisibilityToolbar } = await import("../components/ModelRow");

    await act(async () => {
      root.render(
        <ModelVisibilityToolbar
          t={(k) => k}
          filterValue=""
          onFilterChange={vi.fn()}
          activeCount={5}
          totalCount={10}
          onSelectAll={vi.fn()}
          onDeselectAll={vi.fn()}
        />
      );
    });

    // toolbar renders filter input
    expect(container.querySelector("input")).not.toBeNull();
  });
});

describe("useModelCompatState — hook unit test via component wrapper", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("exposes isModelHidden, effectiveModelNormalize, anyNormalizeCompatBadge correctly", async () => {
    const { useModelCompatState } = await import("../hooks/useModelCompatState");

    const customModels = [
      {
        id: "gpt-4o",
        normalizeToolCallId: true,
        preserveOpenAIDeveloperRole: false,
        isHidden: true,
      },
    ];
    const modelCompatOverrides: any[] = [];

    // Capture results via a data-testid attribute on a span to avoid hook-mutation rules
    function TestWrapper() {
      const compat = useModelCompatState(customModels, modelCompatOverrides);
      const results = [
        compat.isModelHidden("gpt-4o"),
        compat.isModelHidden("unknown"),
        compat.effectiveModelNormalize("gpt-4o"),
        compat.effectiveModelPreserveDeveloper("gpt-4o"),
        compat.anyNormalizeCompatBadge("gpt-4o"),
        compat.anyNoPreserveCompatBadge("gpt-4o"),
      ]
        .map(String)
        .join(",");
      return <span data-testid="results">{results}</span>;
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });

    const span = container.querySelector("[data-testid='results']");
    expect(span).not.toBeNull();
    const [hidden, notHidden, normalize, preserve, anyNorm, anyNoPreserve] = (
      span!.textContent ?? ""
    ).split(",");

    expect(hidden).toBe("true");
    expect(notHidden).toBe("false");
    expect(normalize).toBe("true");
    expect(preserve).toBe("false");
    expect(anyNorm).toBe("true");
    expect(anyNoPreserve).toBe("true");
  });
});

describe("CustomModelsSection — add payload", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }
      return new Response(JSON.stringify({ models: [], modelCompatOverrides: [] }), {
        status: 200,
      });
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    vi.unstubAllGlobals();
  });

  it("does not send default capability values when none were selected", async () => {
    const { default: CustomModelsSection } = await import("../components/CustomModelsSection");

    await act(async () => {
      root.render(
        <CustomModelsSection providerId="openai" providerAlias="OpenAI" onCopy={vi.fn()} />
      );
    });

    const modelInput = container.querySelector<HTMLInputElement>("#custom-model-id");
    expect(modelInput).not.toBeNull();
    await act(async () => {
      setInputValue(modelInput!, "local-model");
    });

    const addButton = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "add"
    );
    expect(addButton).not.toBeUndefined();
    await act(async () => {
      addButton!.click();
    });

    const postCall = fetchMock.mock.calls.find(
      ([url, init]) => url === "/api/provider-models" && init?.method === "POST"
    );
    expect(postCall).toBeDefined();
    const payload = JSON.parse(String(postCall![1]?.body));
    expect(payload.modelId).toBe("local-model");
    expect(payload.capabilities).toBeUndefined();
  });
});
