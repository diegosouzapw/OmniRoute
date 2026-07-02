// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DASHBOARD_CSRF_HEADER } from "@/shared/constants/dashboardCsrf";
import { __resetDashboardCsrfTokenForTests } from "@/shared/utils/dashboardCsrf";
import {
  useModelVisibilityHandlers,
  type UseModelVisibilityHandlersReturn,
} from "../hooks/useModelVisibilityHandlers";

type HookResult = UseModelVisibilityHandlersReturn;

const t = ((key: string) => key) as ((key: string) => string) & {
  has: (key: string) => boolean;
};
t.has = () => false;

const notify = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
};

const baseProps = {
  providerId: "anthropic-compatible-cc-test",
  modelAliases: {},
  customMap: new Map<string, unknown>(),
  providerStorageAlias: "anthropic-compatible-cc-test",
  fetchProviderModelMeta: vi.fn().mockResolvedValue(undefined),
  fetchAliases: vi.fn().mockResolvedValue(undefined),
  notify,
  t,
  selectedConnection: { id: "conn-1", provider: "anthropic-compatible-cc-test" },
  providerNode: { id: "anthropic-compatible-cc-test" },
};

function renderHook(): { get: () => HookResult } {
  let latestResult: HookResult | null = null;

  function Wrapper() {
    const result = useModelVisibilityHandlers(baseProps);
    React.useEffect(() => {
      latestResult = result;
    });
    return null;
  }

  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);

  act(() => {
    root.render(<Wrapper />);
  });

  roots.push({ root, el });

  return {
    get: () => {
      if (!latestResult) throw new Error("Hook did not render");
      return latestResult;
    },
  };
}

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  __resetDashboardCsrfTokenForTests();
  vi.stubGlobal("fetch", vi.fn());
  vi.clearAllMocks();
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

describe("useModelVisibilityHandlers", () => {
  it("defaults auto-hide failed models to off", () => {
    const hook = renderHook();

    expect(hook.get().autoHideFailed).toBe(false);
  });

  it("does not hide a model when a single-model test fails", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            token: "csrf-token",
            expiresAt: new Date(Date.now() + 60_000).toISOString(),
          }),
      } as Response)
      .mockResolvedValueOnce({
        ok: false,
        json: () =>
          Promise.resolve({
            status: "error",
            error: "model unavailable",
          }),
      } as Response);

    const hook = renderHook();

    await act(async () => {
      await hook
        .get()
        .onTestModel("claude-opus-4-8", "anthropic-compatible-cc-test/claude-opus-4-8");
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/auth/csrf", expect.any(Object));
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/models/test",
      expect.objectContaining({ method: "POST" })
    );
    const [, modelTestInit] = fetchMock.mock.calls[1];
    expect((modelTestInit?.headers as Headers).get(DASHBOARD_CSRF_HEADER)).toBe("csrf-token");
    expect(
      fetchMock.mock.calls.some(([url]) => String(url).startsWith("/api/provider-models"))
    ).toBe(false);
    expect(hook.get().modelTestStatus["claude-opus-4-8"]).toBe("error");
  });
});
