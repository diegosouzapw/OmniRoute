// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) return `${key}:${JSON.stringify(values)}`;
    return key;
  },
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { className: "card" }, children),
  Button: ({
    children,
    onClick,
    disabled,
    loading,
    "data-testid": testId,
    variant,
    size,
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    "data-testid"?: string;
    variant?: string;
    size?: string;
  }) =>
    React.createElement(
      "button",
      { onClick, disabled: disabled || loading, "data-testid": testId, "data-variant": variant },
      children,
    ),
}));

// Mock the hooks directly to avoid swr dependency resolution issues
vi.mock(
  "../../../src/app/(dashboard)/dashboard/memory/hooks/useEngineStatus",
  () => ({
    useEngineStatus: () => ({
      status: {
        keyword: { available: true, backend: "FTS5" },
        embedding: {
          source: "remote",
          model: "openai/text-embedding-3-small",
          dimensions: 1536,
          available: true,
          reason: "provider openai with key configured",
          cacheStats: { hits: 0, misses: 0, size: 0 },
        },
        vectorStore: {
          backend: "sqlite-vec",
          available: true,
          rowCount: 10,
          needsReindex: 0,
          reason: "sqlite-vec loaded",
        },
        qdrant: { enabled: false, healthy: null, latencyMs: null, error: null },
        rerank: {
          enabled: false,
          provider: null,
          model: null,
          available: false,
          reason: "rerank disabled",
        },
      },
      isLoading: false,
      isError: false,
      mutate: vi.fn(),
    }),
  }),
);

const mockSave = vi.fn().mockResolvedValue(true);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/memory/hooks/useMemorySettings",
  () => ({
    useMemorySettings: () => ({
      settings: {
        enabled: true,
        maxTokens: 2000,
        retentionDays: 30,
        strategy: "hybrid",
        skillsEnabled: false,
        embeddingSource: "auto",
        embeddingProviderModel: null,
        transformersEnabled: false,
        staticEnabled: false,
        rerankEnabled: false,
        rerankProviderModel: null,
        vectorStore: "auto",
      },
      isLoading: false,
      isError: false,
      mutate: vi.fn(),
      save: mockSave,
    }),
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/memory/components/MemoryEngineStatus",
  () => ({
    default: ({ status }: { status: { embedding: { available: boolean } } }) =>
      React.createElement(
        "div",
        { "data-testid": "engine-status-panel" },
        status.embedding.available ? "embedding:available" : "embedding:unavailable",
      ),
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/memory/components/EmbeddingSourceSelector",
  () => ({
    default: ({
      onSave,
    }: {
      settings: unknown;
      providers: unknown[];
      onSave: (u: unknown) => Promise<boolean>;
      saving?: boolean;
    }) =>
      React.createElement(
        "div",
        { "data-testid": "embedding-selector" },
        React.createElement(
          "button",
          {
            "data-testid": "toggle-transformers-btn",
            onClick: () => onSave({ transformersEnabled: true }),
          },
          "toggle-transformers",
        ),
      ),
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/memory/components/QdrantConfigCard",
  () => ({
    default: () => React.createElement("div", { "data-testid": "qdrant-config-card" }, "QdrantCard"),
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/memory/components/RerankConfigCard",
  () => ({
    default: () => React.createElement("div", { "data-testid": "rerank-config-card" }, "RerankCard"),
  }),
);

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("EngineTab", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
      true;
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ providers: [] }),
    });
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders the engine status panel", async () => {
    const { default: EngineTab } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/tabs/EngineTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<EngineTab />);
    });
    expect(container.querySelector("[data-testid='engine-status-panel']")).toBeTruthy();
    expect(container.textContent).toContain("embedding:available");
  });

  it("renders QdrantConfigCard and RerankConfigCard", async () => {
    const { default: EngineTab } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/tabs/EngineTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<EngineTab />);
    });
    expect(container.querySelector("[data-testid='qdrant-config-card']")).toBeTruthy();
    expect(container.querySelector("[data-testid='rerank-config-card']")).toBeTruthy();
  });

  it("renders Reindex Now button", async () => {
    const { default: EngineTab } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/tabs/EngineTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<EngineTab />);
    });
    expect(container.querySelector("[data-testid='reindex-now-button']")).toBeTruthy();
  });

  it("calls save() when EmbeddingSourceSelector calls onSave", async () => {
    mockSave.mockClear();

    const { default: EngineTab } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/tabs/EngineTab"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<EngineTab />);
    });

    const toggleBtn = container.querySelector(
      "[data-testid='toggle-transformers-btn']",
    ) as HTMLButtonElement | null;
    expect(toggleBtn).toBeTruthy();
    await act(async () => {
      toggleBtn?.click();
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    expect(mockSave).toHaveBeenCalledWith({ transformersEnabled: true });
  });
});
