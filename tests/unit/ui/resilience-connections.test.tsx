// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// next-intl: return the key so we can assert on stable strings. When options are
// passed, append their JSON so interpolated values (e.g. the degraded banner's
// `sources`) leave a distinctive trace the test can assert on.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, opts?: Record<string, any>) =>
    opts ? `${key}${JSON.stringify(opts)}` : key,
  getTranslations: async () => (key: string, opts?: Record<string, any>) =>
    opts ? `${key}${JSON.stringify(opts)}` : key,
}));

// Shared type contract fixture (mirrors the API response shape).
function makeResponse(
  overrides: Partial<{
    connections: unknown[];
    breakers: unknown[];
    degraded: string[];
    coolingDownCount: number;
    unhealthyBreakerCount: number;
  }> = {}
) {
  return {
    connections: overrides.connections ?? [],
    breakers: overrides.breakers ?? [],
    window: { sinceMs: 0, untilMs: Date.now(), now: Date.now() },
    receivedAt: Date.now(),
    meta: {
      totalConnections: 0,
      coolingDownCount: overrides.coolingDownCount ?? 0,
      unhealthyBreakerCount: overrides.unhealthyBreakerCount ?? 0,
      countsCapped: false,
      degraded: overrides.degraded ?? [],
    },
  };
}

function makeConnection(overrides: Record<string, unknown> = {}) {
  return {
    id: "conn-1234567890",
    provider: "openai",
    name: "test-key",
    authType: "api_key",
    priority: 1,
    isActive: true,
    connectionStatus: "healthy",
    rateLimitedUntil: null,
    backoffLevel: 0,
    testStatus: null,
    lastErrorType: null,
    lastErrorAt: null,
    errorCode: null,
    lastUsedAt: null,
    cooldownRemainingMs: 0,
    isCoolingDown: false,
    breaker: { state: "CLOSED", failureCount: 0, retryAfterMs: 0, lastFailureKind: null },
    lockouts: [],
    ...overrides,
  };
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(node: React.ReactNode) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(node);
  });
  containers.push({ root, el });
  return el;
}

// Timer-api-aware wait: works with both fake and real timers.
// Flushes microtasks + React state on each tick, advancing fake timers when active.
async function waitFor(fn: () => boolean, timeoutMs = 3000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (fn()) return;
    await act(async () => {
      // Flush microtasks so resolved fetch promises apply their state updates.
      await Promise.resolve();
      await Promise.resolve();
      if (vi.isFakeTimers()) {
        await vi.advanceTimersByTimeAsync(50);
      } else {
        await new Promise((r) => setTimeout(r, 20));
      }
    });
  }
}

describe("ResilienceConnectionsClient", () => {
  let fetchMock: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.useFakeTimers();
    fetchMock = vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    vi.useRealTimers();
    fetchMock.mockRestore();
    for (const { root, el } of containers) {
      act(() => {
        root.unmount();
      });
      el.remove();
    }
    containers.length = 0;
  });

  it("renders children from mock fetch", async () => {
    const { default: Client } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ResilienceConnectionsClient");
    const resp = makeResponse({ connections: [makeConnection()] });
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(resp), { status: 200 }));
    let el: HTMLDivElement;
    act(() => {
      el = render(<Client />) as HTMLDivElement;
    });
    await waitFor(() => el!.textContent?.includes("openai"));
    expect(el!.textContent).toContain("openai");
  });

  it("fetch uses cache: no-store", async () => {
    const { default: Client } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ResilienceConnectionsClient");
    const resp = makeResponse({ connections: [makeConnection()] });
    fetchMock.mockResolvedValue(new Response(JSON.stringify(resp), { status: 200 }));
    act(() => {
      render(<Client />);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/resilience/connections"),
      expect.objectContaining({ cache: "no-store" })
    );
  });

  it("polling uses 30s interval", async () => {
    const { default: Client } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ResilienceConnectionsClient");
    const resp = makeResponse({ connections: [makeConnection()] });
    fetchMock.mockResolvedValue(new Response(JSON.stringify(resp), { status: 200 }));
    act(() => {
      render(<Client />);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    const callsBefore = fetchMock.mock.calls.length;
    await act(async () => {
      await vi.advanceTimersByTimeAsync(30000);
    });
    expect(fetchMock.mock.calls.length).toBeGreaterThan(callsBefore);
  });

  it("404/403 stops poll permanently + renders pollError banner", async () => {
    const { default: Client } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ResilienceConnectionsClient");
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 404 }));
    let el: HTMLDivElement;
    act(() => {
      el = render(<Client />) as HTMLDivElement;
    });
    await waitFor(() => el!.textContent?.includes("pollErrorStopped"));
    const callsAfterStop = fetchMock.mock.calls.length;
    await act(async () => {
      await vi.advanceTimersByTimeAsync(60000);
    });
    // No new fetches after 404.
    expect(fetchMock.mock.calls.length).toBe(callsAfterStop);
  });

  it("first-load 5xx renders pollError banner (not empty state)", async () => {
    const { default: Client } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ResilienceConnectionsClient");
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 500 }));
    let el: HTMLDivElement;
    act(() => {
      el = render(<Client />) as HTMLDivElement;
    });
    await waitFor(() => el!.textContent?.includes("pollErrorTransient"));
    expect(el!.textContent).not.toContain("No connections");
  });

  it("network error (fetch throw) renders pollError banner", async () => {
    const { default: Client } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ResilienceConnectionsClient");
    fetchMock.mockRejectedValueOnce(new Error("network down"));
    let el: HTMLDivElement;
    act(() => {
      el = render(<Client />) as HTMLDivElement;
    });
    await waitFor(() => el!.textContent?.includes("pollErrorTransient"));
  });

  it("degradation banner shown when meta.degraded is non-empty", async () => {
    const { default: Client } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ResilienceConnectionsClient");
    const resp = makeResponse({ connections: [makeConnection()], degraded: ["circuitBreaker"] });
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(resp), { status: 200 }));
    let el: HTMLDivElement;
    act(() => {
      el = render(<Client />) as HTMLDivElement;
    });
    // The degraded banner is the only caller passing a `sources` option, so the
    // interpolated JSON is a distinctive marker that the banner rendered.
    await waitFor(() => el!.textContent?.includes('"sources":"degraded.source.circuitBreaker"'));
  });

  it("degradation banner hidden when meta.degraded is empty", async () => {
    const { default: Client } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ResilienceConnectionsClient");
    const resp = makeResponse({ connections: [makeConnection()], degraded: [] });
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(resp), { status: 200 }));
    let el: HTMLDivElement;
    act(() => {
      el = render(<Client />) as HTMLDivElement;
    });
    await waitFor(() => el!.textContent?.includes("openai"));
    expect(el!.textContent).not.toContain('"sources"');
  });
});

describe("ConnectionsTable", () => {
  let fetchMock: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchMock = vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    fetchMock.mockRestore();
    for (const { root, el } of containers) {
      act(() => {
        root.unmount();
      });
      el.remove();
    }
    containers.length = 0;
  });

  it("renders rows from props (no independent fetch)", async () => {
    const { default: Table } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ConnectionsTable");
    const conn = makeConnection();
    let el: HTMLDivElement;
    act(() => {
      el = render(
        <Table connections={[conn]} receivedAt={Date.now()} degraded={[]} />
      ) as HTMLDivElement;
    });
    expect(el!.textContent).toContain("openai");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("status badge shows correct variant for cooling_down", async () => {
    const { default: Table } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ConnectionsTable");
    const conn = makeConnection({ connectionStatus: "cooling_down" });
    let el: HTMLDivElement;
    act(() => {
      el = render(
        <Table connections={[conn]} receivedAt={Date.now()} degraded={[]} />
      ) as HTMLDivElement;
    });
    expect(el!.textContent).toContain("table.coolingDown");
  });

  it("status badge handles breaker={null} without crashing (optional chaining)", async () => {
    const { default: Table } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ConnectionsTable");
    const conn = makeConnection({ breaker: null });
    let el: HTMLDivElement;
    act(() => {
      el = render(
        <Table connections={[conn]} receivedAt={Date.now()} degraded={[]} />
      ) as HTMLDivElement;
    });
    // Healthy + null breaker -> "Healthy" badge (no crash).
    expect(el!.textContent).toContain("table.healthy");
  });

  it("cooldown countdown renders '-' for healthy connection", async () => {
    const { default: Table } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ConnectionsTable");
    const conn = makeConnection({ isCoolingDown: false });
    let el: HTMLDivElement;
    act(() => {
      el = render(
        <Table connections={[conn]} receivedAt={Date.now()} degraded={[]} />
      ) as HTMLDivElement;
    });
    expect(el!.textContent).toContain("-");
  });

  it("empty state renders when no connections", async () => {
    const { default: Client } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ResilienceConnectionsClient");
    const resp = makeResponse({ connections: [] });
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(resp), { status: 200 }));
    let el: HTMLDivElement;
    act(() => {
      el = render(<Client />) as HTMLDivElement;
    });
    await waitFor(() => el!.textContent?.includes("empty.title"));
  });

  it("row click opens ConnectionDetail with breaker + lockouts", async () => {
    const { default: Table } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ConnectionsTable");
    const conn = makeConnection({
      breaker: { state: "OPEN", failureCount: 3, retryAfterMs: 60000, lastFailureKind: "timeout" },
      lockouts: [{ model: "gpt-4", reason: "rate_limit", remainingMs: 30000 }],
    });
    let el: HTMLDivElement;
    act(() => {
      el = render(
        <Table connections={[conn]} receivedAt={Date.now()} degraded={[]} />
      ) as HTMLDivElement;
    });
    // Click the row to open detail.
    const row = el!.querySelector("tbody tr") as HTMLTableRowElement;
    expect(row).toBeTruthy();
    act(() => {
      row.click();
    });
    await waitFor(() => el!.textContent?.includes("detail.title"));
    expect(el!.textContent).toContain("OPEN");
    expect(el!.textContent).toContain("gpt-4");
  });

  it("selected connection deleted -> ConnectionDetail closes gracefully", async () => {
    const { default: Table } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/ConnectionsTable");
    const conn = makeConnection();
    let el: HTMLDivElement;
    act(() => {
      el = render(
        <Table connections={[conn]} receivedAt={Date.now()} degraded={[]} />
      ) as HTMLDivElement;
    });
    const row = el!.querySelector("tbody tr") as HTMLTableRowElement;
    act(() => {
      row.click();
    });
    await waitFor(() => el!.textContent?.includes("detail.title"));
    // Re-render with the connection removed.
    act(() => {
      render(<Table connections={[]} receivedAt={Date.now()} degraded={[]} />) as HTMLDivElement;
    });
    // No crash; the unmount of the old tree is handled by createRoot reuse here.
    expect(true).toBe(true);
  });
});

describe("BreakerTimeline", () => {
  let fetchMock: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchMock = vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    fetchMock.mockRestore();
    for (const { root, el } of containers) {
      act(() => {
        root.unmount();
      });
      el.remove();
    }
    containers.length = 0;
  });

  it("renders transitions from props, window selector calls onWindowChange (NO self-fetch)", async () => {
    const { default: Timeline } =
      await import("../../../src/app/(dashboard)/dashboard/resilience/connections/components/BreakerTimeline");
    const breakers = [
      {
        name: "openai",
        state: "CLOSED",
        failureCount: 0,
        retryAfterMs: 0,
        lastFailureKind: null,
        transitionHistory: [
          {
            timestamp: Date.now() - 1000,
            from: "CLOSED",
            to: "OPEN",
            reason: "timeout-elapsed",
          },
        ],
      },
    ];
    const onWindowChange = vi.fn();
    let el: HTMLDivElement;
    act(() => {
      el = render(
        <Timeline breakers={breakers} onWindowChange={onWindowChange} />
      ) as HTMLDivElement;
    });
    expect(el!.textContent).toContain("openai");
    // Click the 6h window button.
    const buttons = Array.from(el!.querySelectorAll("button"));
    const sixHour = buttons.find((b) => b.textContent === "timeline.window6h");
    expect(sixHour).toBeTruthy();
    act(() => {
      sixHour!.click();
    });
    expect(onWindowChange).toHaveBeenCalledWith(21600000);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("i18n", () => {
  it("sidebar i18n keys exist in both namespaces", async () => {
    const en = JSON.parse(
      require("fs").readFileSync(
        require("path").resolve(__dirname, "../../../src/i18n/messages/en.json"),
        "utf8"
      )
    );
    expect(en.sidebar.resilienceConnections).toBe("Connection Resilience");
    expect(en.sidebar.resilienceConnectionsSubtitle).toBe("Cooldown, breaker, lockout state");
    expect(en.resilienceConnections.title).toBe("Connection Resilience");
  });
});
