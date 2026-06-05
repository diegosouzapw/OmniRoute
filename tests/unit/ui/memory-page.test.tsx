// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mutable state for controlling what tab the navigation mock returns
let mockTabValue: string | null = null;

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === "tab" ? mockTabValue : null),
    toString: () => (mockTabValue ? `tab=${mockTabValue}` : ""),
  }),
  useRouter: () => ({
    replace: vi.fn(),
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) {
      return `${key}:${JSON.stringify(values)}`;
    }
    return key;
  },
  getTranslations: () => async (key: string) => key,
}));

vi.mock("swr", () => ({
  default: () => ({ data: null, error: null, isLoading: false, mutate: vi.fn() }),
}));

// Mock all child tab components + concept card
vi.mock(
  "../../../src/app/(dashboard)/dashboard/memory/components/MemoryConceptCard",
  () => ({
    default: () => React.createElement("div", { "data-testid": "concept-card" }, "ConceptCard"),
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/memory/components/tabs/MemoriesTab",
  () => ({
    default: () =>
      React.createElement("div", { "data-testid": "memories-tab-content" }, "MemoriesTab"),
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/memory/components/tabs/PlaygroundTab",
  () => ({
    default: () =>
      React.createElement("div", { "data-testid": "playground-tab-content" }, "PlaygroundTab"),
  }),
);

vi.mock(
  "../../../src/app/(dashboard)/dashboard/memory/components/tabs/EngineTab",
  () => ({
    default: () =>
      React.createElement("div", { "data-testid": "engine-tab-content" }, "EngineTab"),
  }),
);

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("MemoryPage", () => {
  beforeEach(() => {
    mockTabValue = null;
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
      true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders the concept card", async () => {
    const { default: MemoryPage } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/page"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<MemoryPage />);
    });
    expect(container.querySelector("[data-testid='concept-card']")).toBeTruthy();
  });

  it("renders 3 tab buttons", async () => {
    const { default: MemoryPage } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/page"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<MemoryPage />);
    });
    const tabs = ["memories", "playground", "engine"];
    for (const tab of tabs) {
      expect(container.querySelector(`[data-testid='tab-${tab}']`)).toBeTruthy();
    }
  });

  it("defaults to memories tab (tab=null)", async () => {
    mockTabValue = null;
    const { default: MemoryPage } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/page"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<MemoryPage />);
    });
    expect(container.querySelector("[data-testid='memories-tab-content']")).toBeTruthy();
    expect(container.querySelector("[data-testid='playground-tab-content']")).toBeNull();
    expect(container.querySelector("[data-testid='engine-tab-content']")).toBeNull();
  });

  it("shows playground tab when ?tab=playground", async () => {
    mockTabValue = "playground";
    const { default: MemoryPage } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/page"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<MemoryPage />);
    });
    expect(container.querySelector("[data-testid='playground-tab-content']")).toBeTruthy();
    expect(container.querySelector("[data-testid='memories-tab-content']")).toBeNull();
  });

  it("shows engine tab when ?tab=engine", async () => {
    mockTabValue = "engine";
    const { default: MemoryPage } = await import(
      "../../../src/app/(dashboard)/dashboard/memory/page"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<MemoryPage />);
    });
    expect(container.querySelector("[data-testid='engine-tab-content']")).toBeTruthy();
  });
});
