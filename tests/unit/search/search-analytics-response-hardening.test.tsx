// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const fetchMock = vi.fn<typeof fetch>();

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const translate = (key: string) => key;
    translate.rich = (key: string) => key;
    return translate;
  },
}));

let mounted: boolean;
describe("SearchAnalyticsTab response handling", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
    container = document.createElement("div");
    document.body.appendChild(container);
    mounted = true;
    root = createRoot(container);
  });

  afterEach(async () => {
    if (mounted) await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  async function renderTab() {
    const { default: SearchAnalyticsTab } =
      await import("@/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab");
    await act(async () => {
      root.render(<SearchAnalyticsTab />);
    });
  }

  it("shows the server error state for a non-OK JSON response", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    );

    await renderTab();

    expect(container.textContent).toContain("Internal server error");
    expect(container.textContent).not.toContain("searchAnalyticsTotalSearches");
  });

  it("shows the fallback error state when the error response is not JSON", async () => {
    fetchMock.mockResolvedValue(new Response("upstream unavailable", { status: 502 }));

    await renderTab();

    expect(container.textContent).toContain("searchAnalyticsNoData");
    expect(container.textContent).not.toContain("searchAnalyticsTotalSearches");
  });

  it("rejects a successful response with an invalid statistics shape", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ total: 3 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    await renderTab();

    expect(container.textContent).toContain("searchAnalyticsNoData");
    expect(container.textContent).not.toContain("searchAnalyticsTotalSearches");
  });

  it("rejects malformed provider statistics before rendering", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          total: 1,
          today: 1,
          cached: 0,
          errors: 0,
          totalCostUsd: 0,
          byProvider: { brave: { count: 1 } },
          last24h: [],
          cacheHitRate: 0,
          avgDurationMs: 12,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    );

    await renderTab();

    expect(container.textContent).toContain("searchAnalyticsNoData");
    expect(container.textContent).not.toContain("searchAnalyticsTotalSearches");
  });

  it("rejects an array in place of the provider statistics map", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          total: 1,
          today: 1,
          cached: 0,
          errors: 0,
          totalCostUsd: 0,
          byProvider: [],
          last24h: [],
          cacheHitRate: 0,
          avgDurationMs: 12,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    );

    await renderTab();

    expect(container.textContent).toContain("searchAnalyticsNoData");
    expect(container.textContent).not.toContain("searchAnalyticsTotalSearches");
  });

  it("aborts the analytics request when unmounted", async () => {
    let requestSignal: AbortSignal | undefined;
    fetchMock.mockImplementation(
      (_input, init) =>
        new Promise<Response>(() => {
          requestSignal = init?.signal ?? undefined;
        })
    );

    await renderTab();
    expect(requestSignal?.aborted).toBe(false);

    await act(async () => {
      root.unmount();
    });
    mounted = false;

    expect(requestSignal?.aborted).toBe(true);
  });

  it("renders a valid statistics response", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          total: 3,
          today: 2,
          cached: 1,
          errors: 0,
          totalCostUsd: 0.25,
          byProvider: { brave: { count: 3, costUsd: 0.25 } },
          last24h: [{ hour: "2026-08-26T04:00:00Z", count: 3 }],

          cacheHitRate: 33,
          avgDurationMs: 12,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    );

    await renderTab();

    expect(container.textContent).toContain("searchAnalyticsTotalSearches");
    expect(container.textContent).toContain("brave");
    expect(container.textContent).toContain("$0.2500");
    expect(container.textContent).not.toContain("searchAnalyticsNoDataDescription");
  });
});
