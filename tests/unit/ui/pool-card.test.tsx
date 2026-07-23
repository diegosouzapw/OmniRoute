// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/dynamic", () => ({
  default: () => () => null,
}));

vi.mock("@/shared/components/Card", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
}));

vi.mock("@/shared/components/ProviderIcon", () => ({
  default: ({ providerId }: { providerId: string }) => (
    <span data-testid={`provider-icon-${providerId}`} />
  ),
}));

// Stub sub-components
vi.mock(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/components/DimensionBar",
  () => ({ default: ({ dimension }: { dimension: { unit: string } }) => <div data-testid="dim-bar">{dimension.unit}</div> })
);
vi.mock(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/components/AllocationTable",
  () => ({ default: () => <div data-testid="alloc-table" /> })
);
vi.mock(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/components/BurnRateChart",
  () => ({ default: () => <div data-testid="burn-rate-chart" /> })
);
vi.mock(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/components/StackedAllocationBar",
  () => ({
    default: ({ allocations }: { allocations: Array<unknown> }) =>
      allocations.length > 0 ? <div data-testid="stacked-alloc-bar" /> : null,
  })
);

const { default: PoolCard } = await import(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/components/PoolCard"
);

const MOCK_POOL = {
  id: "pool_1",
  connectionId: "conn_1",
  name: "Test Pool",
  createdAt: new Date().toISOString(),
  allocations: [{ apiKeyId: "key_1", weight: 60, policy: "hard" as const }],
};

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

async function renderCard(usage = null as null | object) {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container!);
    root.render(
      <PoolCard
        pool={MOCK_POOL}
        usage={usage as never}
        keyLabels={{ key_1: "MyKey" }}
        connectionLabel="My Conn"
        provider="openai"
        onEdit={vi.fn()}
        onRemove={vi.fn()}
      />
    );
  });
}

describe("PoolCard", { timeout: 10000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (root && container) {
      act(() => root!.unmount());
    }
    container?.remove();
    container = null;
    root = null;
  });

  it("renders pool name and connection label", async () => {
    await renderCard();
    expect(document.body.innerHTML).toContain("Test Pool");
    expect(document.body.innerHTML).toContain("My Conn");
  });

  it("renders AllocationTable", async () => {
    await renderCard();
    expect(document.querySelector("[data-testid='alloc-table']")).not.toBeNull();
  });

  it("renders DimensionBar when usage has dimensions", async () => {
    const usage = {
      dimensions: [{ unit: "tokens", window: "daily", limit: 1000, consumedTotal: 500, perKey: [] }],
      burnRate: null,
    };
    await renderCard(usage);
    expect(document.querySelector("[data-testid='dim-bar']")).not.toBeNull();
  });

  it("renders BurnRateChart when usage is non-null", async () => {
    const usage = {
      dimensions: [{ unit: "tokens", window: "daily", limit: 1000, consumedTotal: 200, perKey: [] }],
      burnRate: null,
    };
    await renderCard(usage);
    expect(document.querySelector("[data-testid='burn-rate-chart']")).not.toBeNull();
  });

  it("renders StackedAllocationBar when pool has allocations", async () => {
    await renderCard();
    expect(document.querySelector("[data-testid='stacked-alloc-bar']")).not.toBeNull();
  });

  it("calls onEdit when edit button clicked", async () => {
    const onEdit = vi.fn();
    container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      root = createRoot(container!);
      root.render(
        <PoolCard
          pool={MOCK_POOL}
          usage={null}
          keyLabels={{}}
          connectionLabel="label"
          provider="openai"
          onEdit={onEdit}
          onRemove={vi.fn()}
        />
      );
    });
    const editBtn = document.querySelector("button[title='editAllocations']") as HTMLButtonElement;
    expect(editBtn).not.toBeNull();
    await act(async () => editBtn.click());
    expect(onEdit).toHaveBeenCalledOnce();
  });
});
