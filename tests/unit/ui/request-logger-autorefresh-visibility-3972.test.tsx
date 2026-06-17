// @vitest-environment jsdom
/**
 * TDD regression for #3972: Logs page auto-refresh is broken — it never polls
 * until the manual Refresh button is clicked.
 *
 * Root cause: the auto-refresh interval gated each tick on `visibleRef.current`,
 * a ref seeded once at mount from `document.visibilityState` and only updated by
 * a `visibilitychange` event. When the logs tab mounts while the document is
 * reported "hidden" (background load, bfcache restore, embedded/proxied webviews)
 * and no `visibilitychange` ever fires, the ref stays `false` forever — the
 * interval ticks but never calls `fetchLogs`, so auto-refresh produces zero
 * requests. The manual button (no gate) still works, matching the report.
 *
 * Fix: the tick reads the live `document.visibilityState` instead of the stale
 * ref, so polling self-heals as soon as the tab is visible.
 *
 * This test mounts hidden, then flips visibility to "visible" WITHOUT dispatching
 * a `visibilitychange` event, and asserts the 10s tick still polls.
 */
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/dashboard/logs",
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => ({ emailsVisible: true }),
}));

const RequestLoggerV2 = (await import("../../../src/shared/components/RequestLoggerV2.tsx")).default;
const { DEFAULT_REFRESH_INTERVAL_SEC } = await import(
  "../../../src/shared/components/requestLoggerPreferences.ts"
);

function setVisibility(state: "visible" | "hidden") {
  Object.defineProperty(document, "visibilityState", { configurable: true, get: () => state });
}

class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

let callLogsRequests = 0;
let container: HTMLElement;
let root: Root;

beforeEach(() => {
  callLogsRequests = 0;
  localStorage.clear();
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith("/api/usage/call-logs")) {
        callLogsRequests += 1;
        return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (url.startsWith("/api/provider-nodes")) {
        return Response.json({ nodes: [] });
      }
      if (url.startsWith("/api/logs/detail")) {
        return Response.json({ enabled: false });
      }
      return Response.json({});
    })
  );
  vi.useFakeTimers();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => {
    root.unmount();
  });
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  setVisibility("visible");
});

describe("RequestLoggerV2 auto-refresh (#3972)", () => {
  it("keeps polling on the interval when the tab becomes visible without a visibilitychange event", async () => {
    // Mounts while the document reports "hidden" → resolveInitialVisibility() = false.
    setVisibility("hidden");

    await act(async () => {
      root.render(<RequestLoggerV2 />);
    });
    // Settle the mount fetches (logs + provider-nodes + detail).
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    const afterMount = callLogsRequests;
    expect(afterMount).toBeGreaterThanOrEqual(1); // initial load fired

    // Tab becomes visible, but NO `visibilitychange` event is dispatched — this is
    // the trap: the old code's visibleRef would stay false forever.
    setVisibility("visible");

    // One auto-refresh interval tick (10s).
    await act(async () => {
      await vi.advanceTimersByTimeAsync(DEFAULT_REFRESH_INTERVAL_SEC * 1000);
    });

    expect(callLogsRequests).toBeGreaterThan(afterMount);
  });

  it("does not poll while the tab stays hidden (preserves the hidden-tab optimization)", async () => {
    setVisibility("hidden");

    await act(async () => {
      root.render(<RequestLoggerV2 />);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    const afterMount = callLogsRequests;

    // Stays hidden across two ticks → must not poll.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(DEFAULT_REFRESH_INTERVAL_SEC * 2000);
    });

    expect(callLogsRequests).toBe(afterMount);
  });
});
