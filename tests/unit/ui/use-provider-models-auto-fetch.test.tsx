import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The shared translator has stable identity like real next-intl. Returning a
// fresh function on every render restarts the hook's load effect indefinitely.

const mountedCleanups = new Set<() => void>();

const { useProviderModels } =
  await import("@/app/(dashboard)/dashboard/providers/hooks/useProviderModels");

function createResponse(body: unknown, ok = true): Response {
  return {
    ok,
    json: async () => body,
  } as Response;
}

function connection(id: string, autoFetchModels: boolean, isActive = true) {
  return {
    id,
    provider: "custom-provider",
    isActive,
    providerSpecificData: { autoFetchModels },
  };
}

async function renderProviderModels(providerId = "custom-provider") {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  function TestHook() {
    useProviderModels(providerId);
    return null;
  }

  await act(async () => {
    root.render(<TestHook />);
  });
  const unmount = () => {
    if (!mountedCleanups.delete(unmount)) return;
    act(() => root.unmount());
    container.remove();
  };
  mountedCleanups.add(unmount);
  return { unmount };
}

async function flushQueuedSync() {
  await act(async () => {
    await vi.runAllTimersAsync();
  });
}

describe("useProviderModels upstream auto-fetch", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"], loopLimit: 30 });
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  });
  afterEach(() => {
    for (const cleanup of [...mountedCleanups]) cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("loads a populated catalog once without restarting on state updates", async () => {
    const fetchMock = vi.fn(async (input: string) => {
      if (input === "/api/v1/providers/custom-provider/models") {
        return createResponse({ data: [{ id: "fixture-model" }] });
      }
      throw new Error(`Unexpected request: ${input}`);
    });
    vi.stubGlobal("fetch", fetchMock);
    const mounted = await renderProviderModels();
    await flushQueuedSync();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    mounted.unmount();
  });

  it("does not synchronize upstream models when autoFetchModels is omitted", async () => {
    const fetchMock = vi.fn(async (input: string) => {
      if (input.startsWith("/api/v1/providers/")) {
        return createResponse({ data: [] });
      }
      if (input === "/api/providers") {
        return createResponse({
          connections: [{ id: "connection-1", provider: "custom-provider", isActive: true }],
        });
      }
      throw new Error(`Unexpected request: ${input}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const mounted = await renderProviderModels();
    await flushQueuedSync();

    // Drain controlled timers and unmount before releasing the fetch stub.
    mounted.unmount();

    expect(fetchMock).not.toHaveBeenCalledWith(
      "/api/providers/connection-1/sync-models?mode=sync",
      expect.anything()
    );
  });

  it("synchronizes upstream models only when autoFetchModels is explicitly true", async () => {
    const fetchMock = vi.fn(async (input: string) => {
      if (input.startsWith("/api/v1/providers/")) {
        return createResponse({ data: [] });
      }
      if (input === "/api/providers") {
        return createResponse({
          connections: [
            {
              id: "connection-1",
              provider: "custom-provider",
              isActive: true,
              providerSpecificData: { autoFetchModels: true },
            },
          ],
        });
      }
      if (input === "/api/providers/connection-1/sync-models?mode=sync") {
        return createResponse({});
      }
      throw new Error(`Unexpected request: ${input}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const mounted = await renderProviderModels();
    await flushQueuedSync();

    expect(fetchMock).toHaveBeenCalledWith("/api/providers/connection-1/sync-models?mode=sync", {
      method: "POST",
    });
    mounted.unmount();
  });

  it.each([
    [
      "enabled connection first",
      [connection("connection-on", true), connection("connection-off", false)],
    ],
    [
      "disabled connection first",
      [connection("connection-off", false), connection("connection-on", true)],
    ],
  ])("does not synchronize a mixed provider when the %s", async (_name, connections) => {
    const fetchMock = vi.fn(async (input: string) => {
      if (input.startsWith("/api/v1/providers/")) {
        return createResponse({ data: [] });
      }
      if (input === "/api/providers") {
        return createResponse({ connections });
      }
      throw new Error(`Unexpected request: ${input}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const mounted = await renderProviderModels();
    try {
      await flushQueuedSync();

      expect(fetchMock).not.toHaveBeenCalledWith(
        expect.stringContaining("/sync-models?mode=sync"),
        expect.anything()
      );
    } finally {
      mounted.unmount();
    }
  });

  it("ignores inactive opt-outs when every active connection is enabled", async () => {
    const fetchMock = vi.fn(async (input: string) => {
      if (input.startsWith("/api/v1/providers/")) {
        return createResponse({ data: [] });
      }
      if (input === "/api/providers") {
        return createResponse({
          connections: [
            connection("connection-inactive", false, false),
            connection("connection-active", true),
          ],
        });
      }
      if (input === "/api/providers/connection-active/sync-models?mode=sync") {
        return createResponse({});
      }
      throw new Error(`Unexpected request: ${input}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const mounted = await renderProviderModels();
    await flushQueuedSync();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/providers/connection-active/sync-models?mode=sync",
      { method: "POST" }
    );
    mounted.unmount();

    expect(fetchMock).not.toHaveBeenCalledWith(
      "/api/providers/connection-inactive/sync-models?mode=sync",
      expect.anything()
    );
  });
});
