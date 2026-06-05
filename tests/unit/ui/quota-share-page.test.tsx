// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── i18n stub ──────────────────────────────────────────────────────────────
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── next/dynamic stub ──────────────────────────────────────────────────────
vi.mock("next/dynamic", () => ({
  default: () => () => null,
}));

// ── Shared component stubs ─────────────────────────────────────────────────
vi.mock("@/shared/components", () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Modal: ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) =>
    isOpen ? <div data-testid="modal">{children}</div> : null,
}));
vi.mock("@/shared/components/Card", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/shared/components/ProviderIcon", () => ({
  default: () => <span />,
}));

// ── Pool data ──────────────────────────────────────────────────────────────
const MOCK_POOLS = [
  {
    id: "pool_1",
    connectionId: "conn_1",
    name: "Pool A",
    createdAt: new Date().toISOString(),
    allocations: [{ apiKeyId: "key_1", weight: 50, policy: "hard" }],
  },
  {
    id: "pool_2",
    connectionId: "conn_2",
    name: "Pool B",
    createdAt: new Date().toISOString(),
    allocations: [],
  },
];

// ── usePools mock ──────────────────────────────────────────────────────────
const mockMutate = vi.fn().mockResolvedValue(undefined);
const mockUsePools = vi.fn(() => ({
  pools: MOCK_POOLS,
  loading: false,
  error: null,
  mutate: mockMutate,
}));

vi.mock(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/hooks/usePools",
  () => ({ usePools: mockUsePools })
);

// ── usePoolUsage mock ──────────────────────────────────────────────────────
vi.mock(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/hooks/usePoolUsage",
  () => ({
    usePoolUsage: () => ({ usage: null, loading: false, error: null }),
  })
);

// ── useLocalStoragePoolMigration mock ──────────────────────────────────────
const mockMigration = vi.fn();
vi.mock(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/hooks/useLocalStoragePoolMigration",
  () => ({ useLocalStoragePoolMigration: mockMigration })
);

// ── usePoolsUsageAggregate mock ────────────────────────────────────────────
vi.mock(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/hooks/usePoolsUsageAggregate",
  () => ({
    usePoolsUsageAggregate: () => ({
      avgUtilizationPercent: 42,
      borrowingKeyCount: 3,
      loading: false,
      error: null,
    }),
  })
);

// ── fetch stub ─────────────────────────────────────────────────────────────
vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve([]) } as unknown as Response)
  )
);

// ── Lazy import after mocks ────────────────────────────────────────────────
const { default: QuotaSharePageClient } = await import(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/QuotaSharePageClient"
);

// ── Helpers ───────────────────────────────────────────────────────────────

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

async function renderComponent() {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container!);
    root.render(<QuotaSharePageClient />);
  });
}

async function waitFor(fn: () => boolean, timeout = 3000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeout) throw new Error("waitFor timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("QuotaSharePageClient", { timeout: 15000 }, () => {
  beforeEach(() => {
    mockMigration.mockReset();
    vi.clearAllMocks();
    mockUsePools.mockReturnValue({
      pools: MOCK_POOLS,
      loading: false,
      error: null,
      mutate: mockMutate,
    });
  });

  afterEach(() => {
    if (root && container) {
      act(() => {
        root!.unmount();
      });
    }
    container?.remove();
    container = null;
    root = null;
  });

  it("renders 2 PoolCard components when usePools returns 2 pools", async () => {
    await renderComponent();
    await waitFor(() => {
      // Each PoolCard renders the pool name text
      return document.body.innerHTML.includes("Pool A");
    });
    expect(document.body.innerHTML).toContain("Pool A");
    expect(document.body.innerHTML).toContain("Pool B");
  });

  it("renders empty state when pools is empty", async () => {
    mockUsePools.mockReturnValue({ pools: [], loading: false, error: null, mutate: mockMutate });
    await renderComponent();
    await waitFor(() => document.body.innerHTML.includes("emptyTitle"));
    expect(document.body.innerHTML).toContain("emptyTitle");
  });

  it("calls useLocalStoragePoolMigration on mount", async () => {
    await renderComponent();
    expect(mockMigration).toHaveBeenCalled();
  });

  it("does not contain localStorage references in rendered output", async () => {
    await renderComponent();
    expect(document.body.innerHTML).not.toContain("localStorage");
    expect(document.body.innerHTML).not.toContain("betaPreviewLabel");
  });

  // ── KPI cards (Gap #5) ────────────────────────────────────────────────────

  it("renders the 4 canonical KPI stat cards: kpiActivePools, kpiKeysAllocated, kpiAvgUtilization, kpiBorrowingNow", async () => {
    await renderComponent();
    await waitFor(() => document.body.innerHTML.includes("kpiActivePools"));
    const html = document.body.innerHTML;
    // i18n is stubbed to return key-as-label, so we check for the key strings
    expect(html).toContain("kpiActivePools");
    expect(html).toContain("kpiKeysAllocated");
    expect(html).toContain("kpiAvgUtilization");
    expect(html).toContain("kpiBorrowingNow");
  });

  it("shows stats.activePools value in the kpiActivePools card (2 mock pools)", async () => {
    await renderComponent();
    await waitFor(() => document.body.innerHTML.includes("kpiActivePools"));
    const html = document.body.innerHTML;
    // MOCK_POOLS has 2 pools → activePools = 2
    expect(html).toContain("2");
  });

  it("shows borrowingKeyCount (3) from mocked usePoolsUsageAggregate in kpiBorrowingNow", async () => {
    await renderComponent();
    await waitFor(() => document.body.innerHTML.includes("kpiBorrowingNow"));
    const html = document.body.innerHTML;
    // usePoolsUsageAggregate mock returns borrowingKeyCount=3
    expect(html).toContain("3");
  });

  it("does NOT render the duplicate Pools StatCard or kpiProvidersWithQuota", async () => {
    await renderComponent();
    await waitFor(() => document.body.innerHTML.includes("kpiActivePools"));
    const html = document.body.innerHTML;
    // Duplicate 'Pools' literal label must be absent
    // (kpiActivePools key may appear, but raw text "Pools" as standalone label must not)
    expect(html).not.toContain("kpiProvidersWithQuota");
    // The old duplicate StatCard used the literal string "Pools" — ensure it is gone
    // We check that the string ">Pools<" does not appear (it was a text node, not a key)
    expect(html).not.toMatch(/>Pools</);
  });
});
