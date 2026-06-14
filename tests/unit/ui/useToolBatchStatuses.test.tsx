// @vitest-environment jsdom
import React, { useState, useEffect } from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useToolBatchStatuses } from "@/shared/hooks/cli/useToolBatchStatuses";
import type { ToolBatchStatusMap } from "@/shared/types/cliBatchStatus";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const MOCK_DATA: ToolBatchStatusMap = {
  claude: {
    detection: { installed: true, runnable: true, version: "1.0.0" },
    config: { status: "configured", endpoint: "http://localhost:20128", lastConfiguredAt: null },
  },
  codex: {
    detection: { installed: false, runnable: false },
    config: { status: "not_installed", endpoint: null, lastConfiguredAt: null },
  },
};

function makeFetch(data: unknown, status = 200): typeof fetch {
  return vi.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
    } as Response)
  );
}

// ── Test harness ──────────────────────────────────────────────────────────────

type HookState = {
  statuses: ToolBatchStatusMap | null;
  loading: boolean;
  error: string | null;
  refetch: (() => void) | null;
};

function HookCapture({ onUpdate }: { onUpdate: (s: HookState) => void }) {
  const { statuses, loading, error, refetch } = useToolBatchStatuses();
  // Use effect to avoid setState-during-render warnings in tests
  useEffect(() => {
    onUpdate({ statuses, loading, error, refetch });
  });
  return null;
}

const containers: HTMLElement[] = [];
const roots: ReturnType<typeof createRoot>[] = [];

async function mountHook(): Promise<{
  getState: () => HookState;
  unmount: () => void;
}> {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  let latest: HookState = { statuses: null, loading: true, error: null, refetch: null };
  const root = createRoot(container);
  roots.push(root);

  await act(async () => {
    root.render(
      <HookCapture
        onUpdate={(s) => {
          latest = s;
        }}
      />
    );
  });

  return {
    getState: () => latest,
    unmount: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
    },
  };
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("useToolBatchStatuses", () => {
  it("starts in loading state then resolves with data", async () => {
    vi.stubGlobal("fetch", makeFetch(MOCK_DATA));

    const { getState } = await mountHook();

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const state = getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.statuses).not.toBeNull();
    expect(state.statuses?.["claude"]).toBeDefined();
  });

  it("sets error on HTTP 401", async () => {
    vi.stubGlobal("fetch", makeFetch("Unauthorized", 401));

    const { getState } = await mountHook();

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const state = getState();
    expect(state.loading).toBe(false);
    expect(state.error).not.toBeNull();
    expect(state.error).toContain("401");
  });

  it("sets error on HTTP 500", async () => {
    vi.stubGlobal("fetch", makeFetch("Internal Server Error", 500));

    const { getState } = await mountHook();

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const state = getState();
    expect(state.error).not.toBeNull();
    expect(state.statuses).toBeNull();
  });

  it("refetch triggers a new fetch call", async () => {
    const mockFetch = makeFetch(MOCK_DATA);
    vi.stubGlobal("fetch", mockFetch);

    const { getState } = await mountHook();

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const callsAfterMount = (mockFetch as ReturnType<typeof vi.fn>).mock.calls.length;
    expect(callsAfterMount).toBeGreaterThan(0);

    await act(async () => {
      getState().refetch?.();
      await new Promise((r) => setTimeout(r, 50));
    });

    expect((mockFetch as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(callsAfterMount);
  });

  it("registers focus event listener on mount", async () => {
    const addEventSpy = vi.spyOn(window, "addEventListener");
    vi.stubGlobal("fetch", makeFetch(MOCK_DATA));

    const { getState } = await mountHook();
    await act(async () => {
      await new Promise((r) => setTimeout(r, 20));
    });
    void getState(); // ensure mounted

    const focusAdds = addEventSpy.mock.calls.filter(([event]) => event === "focus");
    expect(focusAdds.length).toBeGreaterThan(0);
  });

  it("removes focus event listener on unmount", async () => {
    const removeEventSpy = vi.spyOn(window, "removeEventListener");
    vi.stubGlobal("fetch", makeFetch(MOCK_DATA));

    const { unmount } = await mountHook();

    await act(async () => {
      await new Promise((r) => setTimeout(r, 20));
    });

    await act(async () => {
      unmount();
    });

    const focusRemoves = removeEventSpy.mock.calls.filter(([event]) => event === "focus");
    expect(focusRemoves.length).toBeGreaterThan(0);
  });

  it("sets error when fetch throws a network error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network failure")))
    );

    const { getState } = await mountHook();

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const state = getState();
    expect(state.error).not.toBeNull();
    expect(state.error).toContain("Network failure");
  });
});
