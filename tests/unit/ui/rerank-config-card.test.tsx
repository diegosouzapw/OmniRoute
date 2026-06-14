// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

const defaultSettings = {
  embeddingSource: "auto" as const,
  embeddingProviderModel: null,
  transformersEnabled: false,
  staticEnabled: false,
  rerankEnabled: false,
  rerankProviderModel: null,
};

describe("RerankConfigCard", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
      true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders the enable toggle", async () => {
    const { default: RerankConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/RerankConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <RerankConfigCard
          settings={defaultSettings}
          providers={[]}
          onSave={vi.fn().mockResolvedValue(true)}
        />,
      );
    });
    expect(container.querySelector("[data-testid='rerank-enabled-switch']")).toBeTruthy();
  });

  // Plan 21 D13 fix: providers with hasKey=true are now required to enable
  // rerank. The "happy path" test must pass a configured provider; a separate
  // test (below) covers the new guard that blocks enabling without a provider.
  const providersWithKey = [
    {
      provider: "cohere",
      hasKey: true,
      models: [
        { id: "cohere/rerank-english-v3.0", name: "Rerank English v3", dimensions: null },
      ],
    },
  ];

  it("toggle switch calls onSave with rerankEnabled=true when disabled", async () => {
    const onSave = vi.fn().mockResolvedValue(true);
    const { default: RerankConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/RerankConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <RerankConfigCard
          settings={defaultSettings}
          providers={providersWithKey}
          onSave={onSave}
        />,
      );
    });

    const toggleBtn = container.querySelector(
      "[data-testid='rerank-enabled-switch']",
    ) as HTMLButtonElement | null;
    expect(toggleBtn).toBeTruthy();
    await act(async () => {
      toggleBtn?.click();
    });
    expect(onSave).toHaveBeenCalledWith({ rerankEnabled: true });
  });

  it("toggle is blocked when no provider has a key (rerankEnabled=false)", async () => {
    // Plan 21 D13 fix: trying to enable rerank without a configured provider
    // must NOT call onSave (the guard prevents the state from becoming inconsistent).
    const onSave = vi.fn().mockResolvedValue(true);
    const { default: RerankConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/RerankConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <RerankConfigCard
          settings={defaultSettings}
          providers={[]}
          onSave={onSave}
        />,
      );
    });

    const toggleBtn = container.querySelector(
      "[data-testid='rerank-enabled-switch']",
    ) as HTMLButtonElement | null;
    expect(toggleBtn).toBeTruthy();
    expect(toggleBtn?.hasAttribute("disabled")).toBe(true);
    await act(async () => {
      toggleBtn?.click();
    });
    expect(onSave).not.toHaveBeenCalled();
  });

  it("toggle switch calls onSave with rerankEnabled=false when enabled", async () => {
    const onSave = vi.fn().mockResolvedValue(true);
    const { default: RerankConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/RerankConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <RerankConfigCard
          settings={{ ...defaultSettings, rerankEnabled: true }}
          providers={[]}
          onSave={onSave}
        />,
      );
    });

    const toggleBtn = container.querySelector(
      "[data-testid='rerank-enabled-switch']",
    ) as HTMLButtonElement | null;
    expect(toggleBtn).toBeTruthy();
    await act(async () => {
      toggleBtn?.click();
    });
    expect(onSave).toHaveBeenCalledWith({ rerankEnabled: false });
  });

  it("shows warning banner when rerankEnabled=true", async () => {
    const { default: RerankConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/RerankConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <RerankConfigCard
          settings={{ ...defaultSettings, rerankEnabled: true }}
          providers={[]}
          onSave={vi.fn().mockResolvedValue(true)}
        />,
      );
    });
    expect(container.textContent).toContain("rerank.warning");
  });

  it("does not show warning banner when rerankEnabled=false", async () => {
    const { default: RerankConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/RerankConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <RerankConfigCard
          settings={defaultSettings}
          providers={[]}
          onSave={vi.fn().mockResolvedValue(true)}
        />,
      );
    });
    expect(container.textContent).not.toContain("rerank.warning");
  });

  it("shows no-provider warning when rerankEnabled=true but no providers have keys", async () => {
    const { default: RerankConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/RerankConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <RerankConfigCard
          settings={{ ...defaultSettings, rerankEnabled: true }}
          providers={[{ provider: "cohere", hasKey: false, models: [] }]}
          onSave={vi.fn().mockResolvedValue(true)}
        />,
      );
    });
    expect(container.querySelector("[data-testid='rerank-no-provider-warning']")).toBeTruthy();
    expect(container.textContent).toContain("rerank.noProviderWithKey");
  });

  it("shows provider select (not warning) when rerankEnabled=true and provider with key exists", async () => {
    const { default: RerankConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/RerankConfigCard"
    );
    const providers = [
      {
        provider: "cohere",
        hasKey: true,
        models: [
          { id: "cohere/rerank-english-v3", name: "rerank-english-v3", dimensions: 0 },
        ],
      },
    ];
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <RerankConfigCard
          settings={{ ...defaultSettings, rerankEnabled: true }}
          providers={providers}
          onSave={vi.fn().mockResolvedValue(true)}
        />,
      );
    });
    // No warning
    expect(container.querySelector("[data-testid='rerank-no-provider-warning']")).toBeNull();
    // Provider/model select present
    expect(container.querySelector("[data-testid='rerank-provider-model-select']")).toBeTruthy();
    // Model name visible
    expect(container.textContent).toContain("rerank-english-v3");
  });

  it("selecting a model calls onSave with rerankProviderModel", async () => {
    const onSave = vi.fn().mockResolvedValue(true);
    const providers = [
      {
        provider: "cohere",
        hasKey: true,
        models: [
          { id: "cohere/rerank-english-v3", name: "rerank-english-v3", dimensions: 0 },
        ],
      },
    ];
    const { default: RerankConfigCard } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/RerankConfigCard"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <RerankConfigCard
          settings={{ ...defaultSettings, rerankEnabled: true }}
          providers={providers}
          onSave={onSave}
        />,
      );
    });

    const select = container.querySelector(
      "[data-testid='rerank-provider-model-select']",
    ) as HTMLSelectElement | null;
    expect(select).toBeTruthy();
    await act(async () => {
      if (select) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLSelectElement.prototype,
          "value",
        )?.set;
        nativeSetter?.call(select, "cohere/rerank-english-v3");
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    expect(onSave).toHaveBeenCalledWith({ rerankProviderModel: "cohere/rerank-english-v3" });
  });
});
