// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  adaptLsPoolToApiSchema,
  useLocalStoragePoolMigration,
} = await import(
  "../../../src/app/(dashboard)/dashboard/costs/quota-share/hooks/useLocalStoragePoolMigration"
);

// ── Unit tests for adaptLsPoolToApiSchema ─────────────────────────────────

describe("adaptLsPoolToApiSchema", () => {
  it("maps connectionId, accountLabel, and allocations", () => {
    const lsPool = {
      id: "old_1",
      connectionId: "conn_abc",
      accountLabel: "My Account",
      policy: "soft" as const,
      allocations: [{ apiKeyId: "k1", percent: 70 }, { apiKeyId: "k2", percent: 30 }],
    };
    const result = adaptLsPoolToApiSchema(lsPool);
    expect(result.connectionId).toBe("conn_abc");
    expect(result.name).toBe("My Account");
    expect(result.allocations).toHaveLength(2);
    expect(result.allocations[0].weight).toBe(70);
    expect(result.allocations[0].policy).toBe("soft");
  });

  it("defaults policy to hard for unknown policy values", () => {
    const lsPool = { connectionId: "c1", policy: "invalid", allocations: [] };
    const result = adaptLsPoolToApiSchema(lsPool);
    expect(result.allocations).toHaveLength(0);
  });

  it("filters allocations without apiKeyId", () => {
    const lsPool = {
      connectionId: "c1",
      allocations: [{ apiKeyId: "k1", percent: 100 }, { percent: 50 }],
    };
    const result = adaptLsPoolToApiSchema(lsPool);
    expect(result.allocations).toHaveLength(1);
    expect(result.allocations[0].apiKeyId).toBe("k1");
  });

  it("clamps weight to 0-100", () => {
    const lsPool = {
      connectionId: "c1",
      allocations: [{ apiKeyId: "k1", percent: 150 }, { apiKeyId: "k2", percent: -10 }],
    };
    const result = adaptLsPoolToApiSchema(lsPool);
    expect(result.allocations[0].weight).toBe(100);
    expect(result.allocations[1].weight).toBe(0);
  });

  it("uses provider as fallback name", () => {
    const lsPool = { connectionId: "conn_xyz", provider: "openai", allocations: [] };
    const result = adaptLsPoolToApiSchema(lsPool);
    expect(result.name).toBe("openai");
  });
});

// ── Integration tests for useLocalStoragePoolMigration hook ───────────────

const LS_KEY = "omniroute:quota-share:pools";

function HookWrapper({
  pools,
  mutate,
}: {
  pools: object[];
  mutate: () => Promise<unknown>;
}) {
  useLocalStoragePoolMigration({ pools: pools as never, mutate });
  return <div />;
}

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

async function renderHook(props: Parameters<typeof HookWrapper>[0]) {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container!);
    root.render(<HookWrapper {...props} />);
  });
}

describe("useLocalStoragePoolMigration", { timeout: 10000 }, () => {
  const mockMutate = vi.fn().mockResolvedValue(undefined);
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localStorage.clear();
    fetchSpy = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as unknown as Response)
    );
    vi.stubGlobal("fetch", fetchSpy);
    mockMutate.mockClear();
  });

  afterEach(() => {
    if (root && container) act(() => root!.unmount());
    container?.remove();
    container = null;
    root = null;
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it("does nothing when localStorage key is absent", async () => {
    await renderHook({ pools: [], mutate: mockMutate });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("does not migrate when DB already has pools (idempotency)", async () => {
    const lsPools = [{ connectionId: "c1", allocations: [] }];
    localStorage.setItem(LS_KEY, JSON.stringify(lsPools));
    const existingPools = [{ id: "p1", connectionId: "c1", name: "Existing", allocations: [] }];
    await renderHook({ pools: existingPools, mutate: mockMutate });
    // fetch not called — pools already exist
    expect(fetchSpy).not.toHaveBeenCalled();
    // localStorage key preserved for user safety
    expect(localStorage.getItem(LS_KEY)).not.toBeNull();
  });

  it("migrates LS pools to API when DB is empty", async () => {
    const lsPools = [
      { connectionId: "c1", accountLabel: "Acme", policy: "hard", allocations: [{ apiKeyId: "k1", percent: 100 }] },
    ];
    localStorage.setItem(LS_KEY, JSON.stringify(lsPools));
    await renderHook({ pools: [], mutate: mockMutate });
    // Small tick to let the Promise chain resolve
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    expect(fetchSpy).toHaveBeenCalledWith(
      "/api/quota/pools",
      expect.objectContaining({ method: "POST" })
    );
    expect(localStorage.getItem(LS_KEY)).toBeNull();
    expect(mockMutate).toHaveBeenCalled();
  });

  it("clears invalid JSON from localStorage", async () => {
    localStorage.setItem(LS_KEY, "{invalid}");
    await renderHook({ pools: [], mutate: mockMutate });
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(localStorage.getItem(LS_KEY)).toBeNull();
  });
});
