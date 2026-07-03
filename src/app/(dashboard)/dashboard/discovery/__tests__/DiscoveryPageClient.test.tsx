// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { DiscoveryPageClient } from "../DiscoveryPageClient";

// Stable `t` reference: useTranslations must return the SAME function across
// renders, otherwise the `load` useCallback (dep [t]) changes every render and
// the fetch-on-mount useEffect loops forever.
const t = (key: string, vars?: Record<string, unknown>) =>
  vars ? `${key}:${JSON.stringify(vars)}` : key;

vi.mock("next-intl", () => ({
  useTranslations: () => t,
}));

function mockFetchOnce(results: unknown[]) {
  const fetchMock = vi.fn(async () =>
    new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("DiscoveryPageClient", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads and renders discovery results from the API", async () => {
    mockFetchOnce([
      {
        id: 1,
        providerId: "huggingchat",
        method: "free_tier",
        authType: "none",
        feasibility: 5,
        riskLevel: "none",
        status: "verified",
        models: ["mixtral"],
      },
    ]);

    render(<DiscoveryPageClient />);

    await waitFor(() => {
      expect(screen.getByText("huggingchat")).toBeInTheDocument();
    });
    // status + risk badges render (mocked t returns the key)
    expect(screen.getByText("verified")).toBeInTheDocument();
  });

  it("shows the empty state when there are no results", async () => {
    mockFetchOnce([]);

    render(<DiscoveryPageClient />);

    await waitFor(() => {
      expect(screen.getByText("emptyTitle")).toBeInTheDocument();
    });
  });

  it("calls the discovery results endpoint on mount", async () => {
    const fetchMock = mockFetchOnce([]);
    render(<DiscoveryPageClient />);
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/discovery/results");
    });
  });
});
