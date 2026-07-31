// Cursor renewal plan, Task 6 — useProviderConnections' handleRefreshToken()
// now branches on provider === "cursor" to POST the dedicated /refresh-cursor
// route (Task 4) instead of the generic /refresh route, which always silently
// 502s for Cursor connections (no refresh_token by design).
//
// NOTE ON LOCATION: per tests/unit/ui/connectionsSearchFilter.test.tsx's own
// documented finding, vitest.mcp.config.ts's
// `src/app/(dashboard)/**/__tests__/**/*.test.tsx` glob never actually matches
// (tinyglobby treats the literal `(dashboard)` segment as an empty extglob
// group) — confirmed independently during this plan's Task 5 testing via a
// direct fast-glob probe. This file lives under tests/unit/ui/ instead,
// mirroring connectionsSearchFilter.test.tsx exactly, which IS collected by
// vitest.config.ts (`tests/unit/**/*.test.tsx`) and run via `npm run
// test:vitest:ui`.
import React, { act, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "cursor" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/providers/cursor",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const notify = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
};
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => notify,
}));

const CURSOR_CONNECTION = {
  id: "conn-cursor-1",
  provider: "cursor",
  name: "Cursor Account",
  email: "cursor@example.com",
};
const OPENAI_CONNECTION = {
  id: "conn-openai-1",
  provider: "openai",
  name: "OpenAI Account",
  email: "openai@example.com",
};

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
    headers: { get: () => null },
  } as Response;
}

interface FetchCall {
  url: string;
  method: string;
}

function installFetchMock(
  connectionsFixture: unknown[],
  refreshResponse: { status: number; body: unknown }
) {
  const calls: FetchCall[] = [];
  const fn = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const method = (init?.method || "GET").toUpperCase();
    calls.push({ url, method });

    if (url === "/api/providers" && method === "GET") {
      return jsonResponse(200, { connections: connectionsFixture });
    }
    if (url === "/api/provider-nodes" && method === "GET") {
      return jsonResponse(200, { nodes: [] });
    }
    if (/\/api\/providers\/[^/]+\/(refresh-cursor|refresh)$/.test(url) && method === "POST") {
      return jsonResponse(refreshResponse.status, refreshResponse.body);
    }
    return jsonResponse(200, {});
  });
  vi.stubGlobal("fetch", fn);
  return { fn, calls };
}

describe("useProviderConnections — handleRefreshToken Cursor branching (Task 6)", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    notify.success.mockClear();
    notify.error.mockClear();
    notify.info.mockClear();
    notify.warning.mockClear();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    vi.unstubAllGlobals();
  });

  async function mountHook(providerId: string) {
    const { useProviderConnections } =
      await import("@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderConnections");
    type HookResult = ReturnType<typeof useProviderConnections>;
    let result: HookResult | null = null;

    function TestWrapper() {
      // isCompatible=false: this test exercises handleRefreshToken, not node
      // compatibility. isCompatible=true makes fetchConnections() retry
      // /api/provider-nodes 3x with a real 150ms setTimeout each when no
      // matching node is found (which our fixture never provides) — under
      // heavy parallel test-suite load that real delay stretches enough to
      // make this file flaky/slow. false skips that retry loop entirely.
      const hookResult = useProviderConnections(providerId, false, false);
      useEffect(() => {
        result = hookResult;
      }, [hookResult]);
      return <span />;
    }

    await act(async () => {
      root.render(<TestWrapper />);
    });
    // Let the initial fetchConnections() effect settle before returning.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    return () => result as HookResult;
  }

  it("a Cursor connection triggers a POST to /refresh-cursor, not /refresh", async () => {
    const { calls } = installFetchMock([CURSOR_CONNECTION], {
      status: 200,
      body: { success: true, unchanged: true, message: "Cursor session is already current" },
    });
    const getResult = await mountHook("cursor");

    await act(async () => {
      await getResult().handleRefreshToken(CURSOR_CONNECTION.id);
    });

    const refreshCall = calls.find((c) => c.method === "POST");
    expect(refreshCall?.url).toBe(`/api/providers/${CURSOR_CONNECTION.id}/refresh-cursor`);
  });

  it("a non-Cursor connection still posts to the generic /refresh route (regression)", async () => {
    const { calls } = installFetchMock([OPENAI_CONNECTION], {
      status: 200,
      body: { success: true },
    });
    const getResult = await mountHook("openai");

    await act(async () => {
      await getResult().handleRefreshToken(OPENAI_CONNECTION.id);
    });

    const refreshCall = calls.find((c) => c.method === "POST");
    expect(refreshCall?.url).toBe(`/api/providers/${OPENAI_CONNECTION.id}/refresh`);
  });

  it('"renewed" -> notify.success(tokenRefreshed) and calls fetchConnections()', async () => {
    const { calls } = installFetchMock([CURSOR_CONNECTION], {
      status: 200,
      body: {
        success: true,
        connectionId: CURSOR_CONNECTION.id,
        provider: "cursor",
        expiresAt: "x",
      },
    });
    const getResult = await mountHook("cursor");
    const getCallsBefore = calls.filter(
      (c) => c.url === "/api/providers" && c.method === "GET"
    ).length;

    await act(async () => {
      await getResult().handleRefreshToken(CURSOR_CONNECTION.id);
    });

    expect(notify.success).toHaveBeenCalledWith("tokenRefreshed");
    expect(notify.info).not.toHaveBeenCalled();
    expect(notify.error).not.toHaveBeenCalled();
    const getCallsAfter = calls.filter(
      (c) => c.url === "/api/providers" && c.method === "GET"
    ).length;
    expect(getCallsAfter).toBeGreaterThan(getCallsBefore); // fetchConnections() re-ran
  });

  it('"unchanged" -> notify.info(cursorSessionUnchanged) WITHOUT calling fetchConnections()', async () => {
    const { calls } = installFetchMock([CURSOR_CONNECTION], {
      status: 200,
      body: {
        success: true,
        unchanged: true,
        connectionId: CURSOR_CONNECTION.id,
        provider: "cursor",
        message: "Cursor session is already current — no newer token found on this host.",
      },
    });
    const getResult = await mountHook("cursor");
    const getCallsBefore = calls.filter(
      (c) => c.url === "/api/providers" && c.method === "GET"
    ).length;

    await act(async () => {
      await getResult().handleRefreshToken(CURSOR_CONNECTION.id);
    });

    expect(notify.info).toHaveBeenCalledWith("cursorSessionUnchanged");
    expect(notify.success).not.toHaveBeenCalled();
    expect(notify.error).not.toHaveBeenCalled();
    const getCallsAfter = calls.filter(
      (c) => c.url === "/api/providers" && c.method === "GET"
    ).length;
    expect(getCallsAfter).toBe(getCallsBefore); // fetchConnections() must NOT re-run
  });

  it('"error" (502) -> notify.error(data.error) WITHOUT calling fetchConnections()', async () => {
    const { calls } = installFetchMock([CURSOR_CONNECTION], {
      status: 502,
      body: {
        error: "Token refresh failed — provider returned no new token",
        details: "sanitized",
      },
    });
    const getResult = await mountHook("cursor");
    const getCallsBefore = calls.filter(
      (c) => c.url === "/api/providers" && c.method === "GET"
    ).length;

    await act(async () => {
      await getResult().handleRefreshToken(CURSOR_CONNECTION.id);
    });

    expect(notify.error).toHaveBeenCalledWith(
      "Token refresh failed — provider returned no new token"
    );
    expect(notify.success).not.toHaveBeenCalled();
    expect(notify.info).not.toHaveBeenCalled();
    const getCallsAfter = calls.filter(
      (c) => c.url === "/api/providers" && c.method === "GET"
    ).length;
    expect(getCallsAfter).toBe(getCallsBefore); // fetchConnections() must NOT re-run
  });
});
