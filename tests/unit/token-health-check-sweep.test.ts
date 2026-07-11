import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

// ── Mocks ──────────────────────────────────────────────────────────────────────

vi.mock("@/lib/localDb", () => ({
  getProviderConnections: vi.fn(),
  getProviderConnectionById: vi.fn(),
  updateProviderConnection: vi.fn(),
  getSettings: vi.fn(),
  resolveProxyForConnection: vi.fn(),
}));

vi.mock("@omniroute/open-sse/services/tokenRefresh.ts", () => ({
  getAccessToken: vi.fn(),
  supportsTokenRefresh: vi.fn(),
  isUnrecoverableRefreshError: vi.fn(),
  refreshCopilotToken: vi.fn(),
}));

import { sweep } from "../../src/lib/tokenHealthCheck";
import * as localDb from "@/lib/localDb";

// ── Helpers ────────────────────────────────────────────────────────────────────

function controlledPromise(): { promise: Promise<void>; resolve: () => void } {
  const { promise, resolve } = Promise.withResolvers<void>();
  return { promise, resolve };
}

function getStateSweeping(): boolean {
  const hc = (globalThis as Record<string, unknown>).__omnirouteTokenHC as
    { sweeping: boolean } | undefined;
  return hc?.sweeping ?? false;
}

// ── Setup ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  // Reset sweeping flag on global state
  const hc = (globalThis as Record<string, unknown>).__omnirouteTokenHC as
    { sweeping: boolean } | undefined;
  if (hc) hc.sweeping = false;
  process.env.HEALTHCHECK_STAGGER_MS = "0";
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("sweep re-entrancy guard", () => {
  test("skips when a previous sweep is still in flight", async () => {
    const gate = controlledPromise();

    const mockGetPC = vi.mocked(localDb.getProviderConnections);
    mockGetPC.mockReturnValueOnce(gate.promise.then(() => [] as never));

    // Start first sweep — sets sweeping=true then awaits the gate
    const first = sweep();

    // Second call should see sweeping=true and return early
    await sweep();

    expect(mockGetPC).toHaveBeenCalledTimes(1);

    // Release the gate so first sweep can finish
    gate.resolve();
    await first;
  });

  test("resets sweeping flag after normal completion", async () => {
    const mockGetPC = vi.mocked(localDb.getProviderConnections);
    mockGetPC.mockResolvedValue([]);

    await sweep();

    // Flag should be false — second call proceeds normally
    mockGetPC.mockResolvedValue([]);
    await sweep();

    expect(mockGetPC).toHaveBeenCalledTimes(2);
  });

  test("resets sweeping flag on empty connections", async () => {
    const mockGetPC = vi.mocked(localDb.getProviderConnections);
    mockGetPC.mockResolvedValue([]);

    await sweep();

    expect(getStateSweeping()).toBe(false);
  });
});
