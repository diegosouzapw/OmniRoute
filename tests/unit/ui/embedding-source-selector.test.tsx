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

describe("EmbeddingSourceSelector", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
      true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  const defaultSettings = {
    embeddingSource: "auto" as const,
    embeddingProviderModel: null,
    transformersEnabled: false,
    staticEnabled: false,
    rerankEnabled: false,
    rerankProviderModel: null,
  };

  it("renders all 4 source options", async () => {
    const { default: EmbeddingSourceSelector } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EmbeddingSourceSelector"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EmbeddingSourceSelector
          settings={defaultSettings}
          providers={[]}
          onSave={vi.fn().mockResolvedValue(true)}
        />,
      );
    });
    expect(container.querySelector("[data-testid='embedding-source-auto']")).toBeTruthy();
    expect(container.querySelector("[data-testid='embedding-source-remote']")).toBeTruthy();
    expect(container.querySelector("[data-testid='embedding-source-static']")).toBeTruthy();
    expect(container.querySelector("[data-testid='embedding-source-transformers']")).toBeTruthy();
  });

  it("shows only providers with hasKey=true in remote dropdown", async () => {
    const { default: EmbeddingSourceSelector } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EmbeddingSourceSelector"
    );
    const providers = [
      {
        provider: "openai",
        hasKey: true,
        models: [
          {
            id: "openai/text-embedding-3-small",
            name: "text-embedding-3-small",
            dimensions: 1536,
          },
        ],
      },
      {
        provider: "cohere",
        hasKey: false,
        models: [{ id: "cohere/embed-english-v3", name: "embed-english", dimensions: 1024 }],
      },
    ];
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EmbeddingSourceSelector
          settings={{ ...defaultSettings, embeddingSource: "remote" }}
          providers={providers}
          onSave={vi.fn().mockResolvedValue(true)}
        />,
      );
    });
    // openai should be visible (hasKey=true)
    expect(container.textContent).toContain("text-embedding-3-small");
    // cohere should NOT be visible (hasKey=false)
    expect(container.textContent).not.toContain("embed-english");
  });

  it("shows no-provider warning when remote selected but no providers with key", async () => {
    const { default: EmbeddingSourceSelector } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EmbeddingSourceSelector"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EmbeddingSourceSelector
          settings={{ ...defaultSettings, embeddingSource: "remote" }}
          providers={[{ provider: "cohere", hasKey: false, models: [] }]}
          onSave={vi.fn().mockResolvedValue(true)}
        />,
      );
    });
    expect(container.textContent).toContain("embedding.noRemoteProviders");
  });

  it("shows transformers warning when transformers source selected", async () => {
    const { default: EmbeddingSourceSelector } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EmbeddingSourceSelector"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EmbeddingSourceSelector
          settings={{ ...defaultSettings, embeddingSource: "transformers" }}
          providers={[]}
          onSave={vi.fn().mockResolvedValue(true)}
        />,
      );
    });
    expect(container.textContent).toContain("embedding.transformersWarning");
  });

  it("toggle-static-enabled calls onSave", async () => {
    const { default: EmbeddingSourceSelector } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EmbeddingSourceSelector"
    );
    const onSave = vi.fn().mockResolvedValue(true);
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EmbeddingSourceSelector
          settings={defaultSettings}
          providers={[]}
          onSave={onSave}
        />,
      );
    });
    const toggleBtn = container.querySelector(
      "[data-testid='toggle-static-enabled']",
    ) as HTMLButtonElement | null;
    expect(toggleBtn).toBeTruthy();
    await act(async () => {
      toggleBtn?.click();
    });
    expect(onSave).toHaveBeenCalledWith({ staticEnabled: true });
  });

  it("toggle-transformers-enabled calls onSave", async () => {
    const { default: EmbeddingSourceSelector } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/components/EmbeddingSourceSelector"
    );
    const onSave = vi.fn().mockResolvedValue(true);
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <EmbeddingSourceSelector
          settings={defaultSettings}
          providers={[]}
          onSave={onSave}
        />,
      );
    });
    const toggleBtn = container.querySelector(
      "[data-testid='toggle-transformers-enabled']",
    ) as HTMLButtonElement | null;
    expect(toggleBtn).toBeTruthy();
    await act(async () => {
      toggleBtn?.click();
    });
    expect(onSave).toHaveBeenCalledWith({ transformersEnabled: true });
  });
});
