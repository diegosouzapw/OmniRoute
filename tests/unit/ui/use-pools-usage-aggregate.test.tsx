// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mock fetch globally ────────────────────────────────────────────────────
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// ── Lazy import after mocks ────────────────────────────────────────────────
const { usePoolsUsageAggregate } = await import(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/hooks/usePoolsUsageAggregate"
);

// ── Helpers ───────────────────────────────────────────────────────────────

type AggregateState = {
  avgUtilizationPercent: number;
  borrowingKeyCount: number;
  loading: boolean;
  error: string | null;
};

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;
// Mutable ref accessible from outside React render — updated via useEffect to avoid the
// react-hooks/globals lint rule that bans direct assignment inside render bodies.
let capturedState: AggregateState | null = null;

function TestComponent({
  pools,
  onState,
}: {
  pools: { id: string; allocations: unknown[] }[];
  onState: (s: AggregateState) => void;
}) {
  const state = usePoolsUsageAggregate(pools as any);
  // Use useEffect to capture state without triggering react-hooks/globals
  const { useEffect } = React;
  useEffect(() => {
    onState(state);
  });
  return null;
}

async function renderHook(pools: { id: string; allocations: unknown[] }[]) {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
  container = document.createElement("div");
  document.body.appendChild(container);
  capturedState = null;
  await act(async () => {
    root = createRoot(container!);
    root.render(
      <TestComponent
        pools={pools}
        onState={(s) => {
          capturedState = s;
        }}
      />
    );
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

describe("usePoolsUsageAggregate", { timeout: 15000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    capturedState = null;
  });

  afterEach(() => {
    if (root && container) {
      act(() => root!.unmount());
    }
    container?.remove();
    container = null;
    root = null;
    capturedState = null;
  });

  // ── Scenario 1: no pools ────────────────────────────────────────────────
  it("returns zeros immediately and does NOT call fetch when pools is empty", async () => {
    await renderHook([]);
    // Should be synchronously settled after act
    expect(capturedState).not.toBeNull();
    expect(capturedState!.avgUtilizationPercent).toBe(0);
    expect(capturedState!.borrowingKeyCount).toBe(0);
    expect(capturedState!.loading).toBe(false);
    expect(capturedState!.error).toBeNull();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  // ── Scenario 2: 2 pools, fetch resolves with snapshots ──────────────────
  it("aggregates avgUtilizationPercent and borrowingKeyCount across 2 pools", async () => {
    // Pool 1: consumedTotal=50, limit=100 → util=50%; 1 borrowing key
    const pool1Response = {
      usage: {
        dimensions: [
          {
            limit: 100,
            consumedTotal: 50,
            perKey: [{ borrowing: true }, { borrowing: false }],
          },
        ],
      },
    };
    // Pool 2: consumedTotal=75, limit=100 → util=75%; 2 borrowing keys
    const pool2Response = {
      usage: {
        dimensions: [
          {
            limit: 100,
            consumedTotal: 75,
            perKey: [{ borrowing: true }, { borrowing: true }],
          },
        ],
      },
    };

    mockFetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(pool1Response) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(pool2Response) });

    const pools = [
      { id: "pool_1", allocations: [] },
      { id: "pool_2", allocations: [] },
    ];

    await renderHook(pools);

    await act(async () => {
      await waitFor(() => capturedState?.loading === false);
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenCalledWith("/api/quota/pools/pool_1/usage");
    expect(mockFetch).toHaveBeenCalledWith("/api/quota/pools/pool_2/usage");

    // avgUtilizationPercent = (50 + 75) / 2 = 62.5
    expect(capturedState!.avgUtilizationPercent).toBeCloseTo(62.5);
    // borrowingKeyCount = 1 + 2 = 3
    expect(capturedState!.borrowingKeyCount).toBe(3);
    expect(capturedState!.loading).toBe(false);
    expect(capturedState!.error).toBeNull();
  });

  // ── Scenario 3: fetch failure → fail-soft ───────────────────────────────
  it("sets error and loading=false on fetch failure (fail-soft, does not throw)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const pools = [{ id: "pool_fail", allocations: [] }];

    await renderHook(pools);

    await act(async () => {
      await waitFor(() => capturedState?.loading === false);
    });

    expect(capturedState!.loading).toBe(false);
    expect(capturedState!.error).toBeTruthy();
    expect(capturedState!.error).toContain("Network error");
    expect(capturedState!.avgUtilizationPercent).toBe(0);
    expect(capturedState!.borrowingKeyCount).toBe(0);
  });

  // ── Scenario 4: dimensions with limit === 0 are skipped ─────────────────
  it("ignores dimensions with limit === 0 to avoid division by zero", async () => {
    const poolResponse = {
      usage: {
        dimensions: [
          {
            // limit=0 — must be skipped (no util contribution)
            limit: 0,
            consumedTotal: 999,
            perKey: [{ borrowing: true }],
          },
          {
            // limit=100, consumed=40 → util=40%; no borrowing
            limit: 100,
            consumedTotal: 40,
            perKey: [{ borrowing: false }],
          },
        ],
      },
    };

    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(poolResponse) });

    const pools = [{ id: "pool_zero", allocations: [] }];

    await renderHook(pools);

    await act(async () => {
      await waitFor(() => capturedState?.loading === false);
    });

    // Only the valid dimension (limit=100) contributes to util
    expect(capturedState!.avgUtilizationPercent).toBeCloseTo(40);
    // borrowing from the limit=0 dimension still counts (perKey loop is independent)
    expect(capturedState!.borrowingKeyCount).toBe(1);
    expect(capturedState!.loading).toBe(false);
    expect(capturedState!.error).toBeNull();
  });
});
