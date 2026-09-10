// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Capture the onEvent handler the hook registers on the agents channel, and let each test
// control the mocked WS connection state that drives the adaptive poll interval.
let capturedOnEvent: ((p: { channel: string }) => void) | null = null;
const connectionState: { isConnected: boolean } = { isConnected: false };
vi.mock("@/hooks/useLiveDashboard", () => ({
  useLiveDashboard: (opts: { onEvent?: (p: { channel: string }) => void }) => {
    capturedOnEvent = opts.onEvent ?? null;
    return { connection: connectionState, events: [] };
  },
}));

import { useOrchestrationSnapshot } from "@/app/(dashboard)/dashboard/orchestration/hooks/useOrchestrationSnapshot";

function HookProbe({
  onRender,
}: {
  onRender: (v: ReturnType<typeof useOrchestrationSnapshot>) => void;
}) {
  onRender(useOrchestrationSnapshot());
  return null;
}

const okJson = (body: unknown) =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(body) } as Response);

const okFetchMock = () =>
  vi.fn((url: string) => {
    if (url.startsWith("/api/v1/agents/tasks")) return okJson({ data: [] });
    if (url.startsWith("/api/a2a/tasks"))
      return okJson({ tasks: [], total: 0, limit: 200, offset: 0 });
    return okJson({ offline: false, runners: [], tasks: [] });
  });

describe("useOrchestrationSnapshot", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;
  beforeEach(() => {
    vi.useFakeTimers();
    connectionState.isConnected = false;
    capturedOnEvent = null;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("polls the three endpoints and builds a snapshot; a failed source keeps the last good data", async () => {
    let latest: ReturnType<typeof useOrchestrationSnapshot> | null = null;
    const task = {
      id: "t1",
      providerId: "devin",
      status: "running",
      prompt: "p",
      source: { repoName: "r", repoUrl: "https://x" },
      options: {},
      activities: [],
      createdAt: "2026-08-30T10:00:00Z",
      updatedAt: "2026-08-30T10:00:00Z",
    };
    const fetchMock = vi.fn((url: string) => {
      if (url.startsWith("/api/v1/agents/tasks")) return okJson({ data: [task] });
      if (url.startsWith("/api/a2a/tasks"))
        return okJson({ tasks: [], total: 0, limit: 200, offset: 0 });
      return okJson({ offline: false, runners: [], tasks: [] });
    });
    vi.stubGlobal("fetch", fetchMock);

    await act(async () => {
      root.render(
        <HookProbe
          onRender={(v) => {
            latest = v;
          }}
        />
      );
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(latest!.snapshot.nodes.some((n) => n.id === "cloud-agent:t1")).toBe(true);

    // Second tick: cloud agent fails — node must survive from the last good photo, source marked stale.
    fetchMock.mockImplementation((url: string) => {
      if (url.startsWith("/api/v1/agents/tasks")) return Promise.reject(new Error("boom"));
      if (url.startsWith("/api/a2a/tasks"))
        return okJson({ tasks: [], total: 0, limit: 200, offset: 0 });
      return okJson({ offline: false, runners: [], tasks: [] });
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5_100);
    });
    expect(latest!.snapshot.nodes.some((n) => n.id === "cloud-agent:t1")).toBe(true);
    const st = latest!.snapshot.sources.find((s) => s.source === "cloud-agent");
    expect(st?.ok).toBe(false);
  });

  it("an agents-channel WS event triggers a debounced immediate refetch", async () => {
    const fetchMock = okFetchMock();
    vi.stubGlobal("fetch", fetchMock);
    await act(async () => {
      root.render(<HookProbe onRender={() => {}} />);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    const callsAfterMount = fetchMock.mock.calls.length;

    act(() => {
      capturedOnEvent?.({ channel: "agents" });
      capturedOnEvent?.({ channel: "agents" });
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_100);
    });
    // Two burst events → exactly ONE extra round of 3 fetches (debounce), not two.
    expect(fetchMock.mock.calls.length).toBe(callsAfterMount + 3);
  });

  it("a WS event on a different channel does not trigger a refetch", async () => {
    const fetchMock = okFetchMock();
    vi.stubGlobal("fetch", fetchMock);
    await act(async () => {
      root.render(<HookProbe onRender={() => {}} />);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    const callsAfterMount = fetchMock.mock.calls.length;

    act(() => {
      capturedOnEvent?.({ channel: "requests" });
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_100);
    });
    expect(fetchMock.mock.calls.length).toBe(callsAfterMount);
  });

  it("polls every 30s while the WS connection is up", async () => {
    connectionState.isConnected = true;
    const fetchMock = okFetchMock();
    vi.stubGlobal("fetch", fetchMock);
    await act(async () => {
      root.render(<HookProbe onRender={() => {}} />);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    const callsAfterMount = fetchMock.mock.calls.length;

    await act(async () => {
      await vi.advanceTimersByTimeAsync(29_000);
    });
    expect(fetchMock.mock.calls.length).toBe(callsAfterMount);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });
    expect(fetchMock.mock.calls.length).toBe(callsAfterMount + 3);
  });

  it("polls every 5s while the WS connection is down", async () => {
    connectionState.isConnected = false;
    const fetchMock = okFetchMock();
    vi.stubGlobal("fetch", fetchMock);
    await act(async () => {
      root.render(<HookProbe onRender={() => {}} />);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    const callsAfterMount = fetchMock.mock.calls.length;

    await act(async () => {
      await vi.advanceTimersByTimeAsync(4_900);
    });
    expect(fetchMock.mock.calls.length).toBe(callsAfterMount);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });
    expect(fetchMock.mock.calls.length).toBe(callsAfterMount + 3);
  });

  it("reprograms the interval when the WS connection transitions from connected to disconnected", async () => {
    connectionState.isConnected = true;
    let latest: ReturnType<typeof useOrchestrationSnapshot> | null = null;
    const onRender = (v: ReturnType<typeof useOrchestrationSnapshot>) => {
      latest = v;
    };
    const fetchMock = okFetchMock();
    vi.stubGlobal("fetch", fetchMock);
    await act(async () => {
      root.render(<HookProbe onRender={onRender} />);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    const callsAfterMount = fetchMock.mock.calls.length;

    // 10s into the 30s (connected) cycle — no extra poll yet.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });
    expect(fetchMock.mock.calls.length).toBe(callsAfterMount);

    // Connection drops — force a re-render so the hook observes the new value and
    // reprograms its interval effect (deps: [wsConnected]).
    connectionState.isConnected = false;
    await act(async () => {
      root.render(<HookProbe onRender={onRender} />);
    });
    void latest; // keep the probe referenced

    // The old 30s timer would not have fired yet at the 30s mark either way, but the
    // reprogrammed 5s timer must fire on its OWN schedule, starting from the flip —
    // i.e. 5.1s after the flip (well before the original 30s mark at t=30s).
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5_100);
    });
    expect(fetchMock.mock.calls.length).toBe(callsAfterMount + 3);
  });

  it("keeps snapshot referential identity across polls with an unchanged payload, and mints a new one when it changes", async () => {
    let latest: ReturnType<typeof useOrchestrationSnapshot> | null = null;
    const task = {
      id: "t1",
      providerId: "devin",
      status: "running",
      prompt: "p",
      source: { repoName: "r", repoUrl: "https://x" },
      options: {},
      activities: [],
      createdAt: "2026-08-30T10:00:00Z",
      updatedAt: "2026-08-30T10:00:00Z",
    };
    const fetchMock = vi.fn((url: string) => {
      if (url.startsWith("/api/v1/agents/tasks")) return okJson({ data: [task] });
      if (url.startsWith("/api/a2a/tasks"))
        return okJson({ tasks: [], total: 0, limit: 200, offset: 0 });
      return okJson({ offline: false, runners: [], tasks: [] });
    });
    vi.stubGlobal("fetch", fetchMock);

    await act(async () => {
      root.render(
        <HookProbe
          onRender={(v) => {
            latest = v;
          }}
        />
      );
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    const firstSnapshot = latest!.snapshot;
    expect(firstSnapshot.nodes.some((n) => n.id === "cloud-agent:t1")).toBe(true);

    // Same payload next poll tick → `polledAt` advances but content doesn't,
    // so the hook must keep returning the SAME snapshot object.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5_100);
    });
    expect(latest!.snapshot).toBe(firstSnapshot);

    // Payload actually changes → a new snapshot identity is expected.
    fetchMock.mockImplementation((url: string) => {
      if (url.startsWith("/api/v1/agents/tasks"))
        return okJson({ data: [{ ...task, status: "completed" }] });
      if (url.startsWith("/api/a2a/tasks"))
        return okJson({ tasks: [], total: 0, limit: 200, offset: 0 });
      return okJson({ offline: false, runners: [], tasks: [] });
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5_100);
    });
    expect(latest!.snapshot).not.toBe(firstSnapshot);
  });
});
