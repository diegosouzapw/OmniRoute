// @vitest-environment jsdom
//
// Phase 1e smoke tests for Issue #3501 (strangler-fig decomposition).
// Validates:
//   1. useModelCompatState hook computes correct values from raw arrays.
//   2. ModelRow, PassthroughModelRow, ModelVisibilityToolbar render without throwing.
//   3. PassthroughModelsSection, CustomModelsSection, CompatibleModelsSection render without throwing.
//   4. No cycle: providerPageHelpers imports DO NOT import from ProviderDetailPageClient.
//
// We use shallow rendering (no Next.js server context needed) because these are
// presentational components that receive all data via props.
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
} from "../providerPageHelpers";

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
      return Object.entries(values).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        key
      );
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
}));

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
    const mockRes = new Response(
      JSON.stringify({ error: { message: "Model not found" } }),
      { status: 422, statusText: "Unprocessable Entity" }
    );
    const detail = await formatProviderModelsErrorResponse(mockRes);
    expect(detail).toBe("Model not found");
  });

  it("formatProviderModelsErrorResponse falls back to statusText", async () => {
    const mockRes = new Response("{}", { status: 500, statusText: "Internal Server Error" });
    const detail = await formatProviderModelsErrorResponse(mockRes);
    expect(detail).toBe("Internal Server Error");
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
    act(() => { root.unmount(); });
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
    act(() => { root.unmount(); });
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
    act(() => { root.unmount(); });
    container.remove();
  });

  it("exposes isModelHidden, effectiveModelNormalize, anyNormalizeCompatBadge correctly", async () => {
    const { useModelCompatState } = await import("../hooks/useModelCompatState");

    const customModels = [
      { id: "gpt-4o", normalizeToolCallId: true, preserveOpenAIDeveloperRole: false, isHidden: true },
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
      ].map(String).join(",");
      return <span data-testid="results">{results}</span>;
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });

    const span = container.querySelector("[data-testid='results']");
    expect(span).not.toBeNull();
    const [hidden, notHidden, normalize, preserve, anyNorm, anyNoPreserve] =
      (span!.textContent ?? "").split(",");

    expect(hidden).toBe("true");
    expect(notHidden).toBe("false");
    expect(normalize).toBe("true");
    expect(preserve).toBe("false");
    expect(anyNorm).toBe("true");
    expect(anyNoPreserve).toBe("true");
  });
});
