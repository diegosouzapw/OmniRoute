// @vitest-environment jsdom
//
// Regression for #4887: on OAuth providers (e.g. GLM Coding), "Test all models"
// with auto-hide-failed enabled hid failed models in the DB but they STAYED on
// screen, so it looked like nothing happened. The passthrough path (#3610,
// PassthroughModelsSection) already switches the filter to "visible" after a run
// that hid models, via shouldSwitchToVisibleFilter(...) → setVisibilityFilter.
// The OAuth path (useModelVisibilityHandlers.handleTestAll — consumed by
// ProviderModelsSection, which GLM renders) DID NOT, so just-hidden models stayed
// visible under the "All" filter.
//
// This drives the real hook: a failing model + autoHideFailed on must leave the
// hook's visibilityFilter === "visible" so the just-hidden model disappears.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

const {
  useModelVisibilityHandlers,
} = await import(
  "../../src/app/(dashboard)/dashboard/providers/[id]/hooks/useModelVisibilityHandlers"
);

type Hook = ReturnType<typeof useModelVisibilityHandlers>;

const t = ((key: string) => key) as any;
const notify = { error: vi.fn(), success: vi.fn(), info: vi.fn() } as any;

const baseParams = {
  providerId: "glm",
  modelAliases: {},
  customMap: new Map(),
  providerStorageAlias: "glm",
  fetchProviderModelMeta: async () => {},
  fetchAliases: async () => {},
  notify,
  t,
  selectedConnection: { id: "conn-1", provider: "glm" },
  providerNode: { id: "glm" },
} as any;

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;
let captured: Hook | null = null;

function TestComponent({ onHook }: { onHook: (h: Hook) => void }) {
  const hook = useModelVisibilityHandlers(baseParams);
  const { useEffect } = React;
  useEffect(() => {
    onHook(hook);
  });
  return null;
}

async function renderHook() {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  captured = null;
  await act(async () => {
    root = createRoot(container!);
    root.render(<TestComponent onHook={(h) => (captured = h)} />);
  });
}

/** Mock fetch: test-all returns the configured per-model status; the hide PATCH succeeds. */
function setFetch(perModel: Record<string, "ok" | "error">) {
  mockFetch.mockImplementation(async (url: string, init?: RequestInit) => {
    if (typeof url === "string" && url.startsWith("/api/models/test-all")) {
      const body = JSON.parse((init?.body as string) || "{}");
      const full = body.modelIds?.[0] as string;
      return {
        ok: true,
        json: async () => ({ results: { [full]: { status: perModel[full] ?? "error" } } }),
      };
    }
    return { ok: true, text: async () => "", json: async () => ({}) };
  });
}

describe("useModelVisibilityHandlers.handleTestAll — #4887 visible-filter parity", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    captured = null;
  });
  afterEach(() => {
    if (root && container) act(() => root!.unmount());
    container?.remove();
    container = null;
    root = null;
    captured = null;
  });

  it("switches visibilityFilter to 'visible' when autoHideFailed is on and a model was hidden", async () => {
    setFetch({ "glm/model-ok": "ok", "glm/model-bad": "error" });
    await renderHook();

    expect(captured!.visibilityFilter).toBe("all");

    act(() => captured!.setAutoHideFailed(true));
    expect(captured!.autoHideFailed).toBe(true);

    await act(async () => {
      await captured!.handleTestAll([
        { modelId: "model-ok", fullModel: "glm/model-ok" },
        { modelId: "model-bad", fullModel: "glm/model-bad" },
      ]);
    });

    // The failed model was hidden — the filter must flip so it disappears on-screen.
    expect(captured!.visibilityFilter).toBe("visible");
  });

  it("does NOT switch the filter when autoHideFailed is off (nothing hidden)", async () => {
    setFetch({ "glm/model-bad": "error" });
    await renderHook();
    expect(captured!.autoHideFailed).toBe(false);

    await act(async () => {
      await captured!.handleTestAll([{ modelId: "model-bad", fullModel: "glm/model-bad" }]);
    });

    expect(captured!.visibilityFilter).toBe("all");
  });

  it("does NOT switch the filter when all models pass (nothing hidden)", async () => {
    setFetch({ "glm/model-ok": "ok" });
    await renderHook();

    act(() => captured!.setAutoHideFailed(true));

    await act(async () => {
      await captured!.handleTestAll([{ modelId: "model-ok", fullModel: "glm/model-ok" }]);
    });

    expect(captured!.visibilityFilter).toBe("all");
  });
});
