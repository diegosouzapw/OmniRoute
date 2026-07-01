// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DASHBOARD_CSRF_HEADER } from "@/shared/constants/dashboardCsrf";
import {
  __resetDashboardCsrfTokenForTests,
  installDashboardCsrfFetch,
  prefetchDashboardCsrfToken,
} from "@/shared/utils/dashboardCsrf";

let fetchMock: ReturnType<typeof vi.fn>;
let uninstall: (() => void) | null = null;

function csrfResponse(): Response {
  return new Response(
    JSON.stringify({
      token: "csrf-token",
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

beforeEach(() => {
  __resetDashboardCsrfTokenForTests();
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  uninstall = installDashboardCsrfFetch();
});

afterEach(() => {
  uninstall?.();
  uninstall = null;
  __resetDashboardCsrfTokenForTests();
  vi.unstubAllGlobals();
});

describe("installDashboardCsrfFetch", () => {
  it("adds dashboard CSRF to same-origin unsafe requests", async () => {
    fetchMock.mockResolvedValueOnce(csrfResponse()).mockResolvedValueOnce(new Response("{}"));

    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/auth/csrf",
      expect.objectContaining({ cache: "no-store", credentials: "same-origin" })
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/settings",
      expect.objectContaining({ method: "PATCH" })
    );

    const headers = fetchMock.mock.calls[1][1]?.headers as Headers;
    expect(headers.get(DASHBOARD_CSRF_HEADER)).toBe("csrf-token");
    expect(headers.get("Content-Type")).toBe("application/json");
  });

  it("adds dashboard CSRF to explicit top-level management routes", async () => {
    fetchMock.mockResolvedValueOnce(csrfResponse()).mockResolvedValueOnce(new Response("{}"));

    await fetch("/a2a", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toBe("/api/auth/csrf");
    expect(fetchMock.mock.calls[1][0]).toBe("/a2a");
    const headers = fetchMock.mock.calls[1][1]?.headers as Headers;
    expect(headers.get(DASHBOARD_CSRF_HEADER)).toBe("csrf-token");
  });

  it("reuses a prefetched dashboard CSRF token for later unsafe requests", async () => {
    fetchMock.mockResolvedValueOnce(csrfResponse()).mockResolvedValueOnce(new Response("{}"));

    await prefetchDashboardCsrfToken();
    await fetch("/api/settings", { method: "PATCH", body: "{}" });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toBe("/api/auth/csrf");
    expect(fetchMock.mock.calls[1][0]).toBe("/api/settings");
    const headers = fetchMock.mock.calls[1][1]?.headers as Headers;
    expect(headers.get(DASHBOARD_CSRF_HEADER)).toBe("csrf-token");
  });

  it("does not modify safe, cross-origin, or already-protected requests", async () => {
    fetchMock.mockResolvedValue(new Response("{}"));

    await fetch("/api/settings");
    await fetch("https://api.example.test/api/settings", { method: "PATCH" });
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { [DASHBOARD_CSRF_HEADER]: "existing-token" },
    });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual([
      "/api/settings",
      "https://api.example.test/api/settings",
      "/api/settings",
    ]);
  });

  it("does not attach dashboard CSRF to client API aliases or public API routes", async () => {
    fetchMock.mockResolvedValue(new Response("{}"));

    await fetch("/api/v1/rerank", { method: "POST" });
    await fetch("/v1/chat/completions", { method: "POST" });
    await fetch("/v1beta/models", { method: "POST" });
    await fetch("/responses", { method: "POST" });
    await fetch("/codex", { method: "POST" });
    await fetch("/api/auth/logout", { method: "POST" });

    expect(fetchMock).toHaveBeenCalledTimes(6);
    expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual([
      "/api/v1/rerank",
      "/v1/chat/completions",
      "/v1beta/models",
      "/responses",
      "/codex",
      "/api/auth/logout",
    ]);
  });
});
