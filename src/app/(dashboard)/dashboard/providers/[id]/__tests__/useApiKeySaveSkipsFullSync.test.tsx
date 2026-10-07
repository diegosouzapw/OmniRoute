// @vitest-environment jsdom
// Regression for issue #11324 and the autoFetchModels opt-in contract: adding a
// connection must not force a full upstream /models catalog sync unless the
// connection explicitly enables it.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useApiKeySave } from "../hooks/useApiKeySave";

const t = ((key: string) => key) as Parameters<typeof useApiKeySave>[0]["t"];

function response(ok: boolean, body: unknown): Response {
  return { ok, json: async () => body } as Response;
}

function renderApiKeySaveHook(): {
  hookResult: () => ReturnType<typeof useApiKeySave>;
  root: ReturnType<typeof createRoot>;
  container: HTMLDivElement;
} {
  const container = document.createElement("div");
  document.body.appendChild(container);
  let hookResult: ReturnType<typeof useApiKeySave> | null = null;
  function Wrapper() {
    const result = useApiKeySave({
      providerId: "huge-catalog-openai-compatible",
      fetchConnections: vi.fn().mockResolvedValue(undefined),
      fetchProviderModelMeta: vi.fn().mockResolvedValue(undefined),
      setImportProgress: vi.fn(),
      setShowImportModal: vi.fn(),
      setShowAddApiKeyModal: vi.fn(),
      setSiliconFlowInitialBaseUrl: vi.fn(),
      notify: { success: vi.fn(), error: vi.fn() },
      t,
    });
    React.useEffect(() => {
      hookResult = result;
    }, [result]);
    return null;
  }
  const root = createRoot(container);
  act(() => root.render(<Wrapper />));
  return { hookResult: () => hookResult as ReturnType<typeof useApiKeySave>, root, container };
}

describe("useApiKeySave.handleSaveApiKey — full-sync opt-out (#11324)", () => {
  let roots: ReturnType<typeof createRoot>[] = [];
  let containers: HTMLDivElement[] = [];

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    roots = [];
    containers = [];
  });

  afterEach(() => {
    for (const root of roots) act(() => root.unmount());
    for (const container of containers) container.remove();
    roots = [];
    containers = [];
    vi.unstubAllGlobals();
  });

  it("does not auto-trigger a full /sync-models catalog fetch when the caller asks to add just one manual model", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/providers") return response(true, { connection: { id: "conn-1" } });
      if (url.includes("/sync-models")) {
        return response(true, {
          syncedModels: 1200,
          availableModelsCount: 1200,
          models: Array.from({ length: 1200 }, (_, i) => ({ id: `model-${i}` })),
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const { hookResult, root, container } = renderApiKeySaveHook();
    roots.push(root);
    containers.push(container);

    await act(async () => {
      await hookResult().handleSaveApiKey({ apiKey: "sk-test", skipModelSync: true });
    });

    const syncCalls = fetchMock.mock.calls.filter(([input]) =>
      String(input).includes("/sync-models")
    );
    expect(syncCalls).toHaveLength(0);

    // The opt-out is a client-side intent signal only — it must never leak into the
    // persisted connection payload sent to the server.
    const providersCall = fetchMock.mock.calls.find(
      ([input]) => String(input) === "/api/providers"
    );
    const postedBody = JSON.parse((providersCall?.[1] as RequestInit).body as string);
    expect(postedBody).not.toHaveProperty("skipModelSync");
    expect(new Headers((providersCall?.[1] as RequestInit).headers).get("x-skip-model-sync")).toBe(
      "true"
    );
  });

  it("keeps the full /sync-models catalog fetch off when autoFetchModels is omitted", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/providers") return response(true, { connection: { id: "conn-1" } });
      if (url.includes("/sync-models")) {
        return response(true, { syncedModels: 3, availableModelsCount: 3, models: [] });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const { hookResult, root, container } = renderApiKeySaveHook();
    roots.push(root);
    containers.push(container);

    await act(async () => {
      await hookResult().handleSaveApiKey({ apiKey: "sk-test" });
    });

    const syncCalls = fetchMock.mock.calls.filter(([input]) =>
      String(input).includes("/sync-models")
    );
    expect(syncCalls).toHaveLength(0);
  });

  it("auto-triggers one client-owned sync when autoFetchModels is true", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/providers") return response(true, { connection: { id: "conn-1" } });
      if (url.includes("/sync-models")) {
        return response(true, { syncedModels: 3, availableModelsCount: 3, models: [] });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const { hookResult, root, container } = renderApiKeySaveHook();
    roots.push(root);
    containers.push(container);

    await act(async () => {
      await hookResult().handleSaveApiKey({
        apiKey: "sk-test",
        providerSpecificData: { autoFetchModels: true },
      });
    });

    const syncCalls = fetchMock.mock.calls.filter(([input]) =>
      String(input).includes("/sync-models")
    );
    expect(syncCalls).toHaveLength(1);
    const providersCall = fetchMock.mock.calls.find(
      ([input]) => String(input) === "/api/providers"
    );
    expect(new Headers((providersCall?.[1] as RequestInit).headers).get("x-skip-model-sync")).toBe(
      "true"
    );
  });
});
