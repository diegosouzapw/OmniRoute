// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import React from "react";
import CachePage from "../page";

const notifications = {
  success: vi.fn(),
  error: vi.fn(),
};

vi.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => {
    const getMessage = (key: string) => {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      const messages: Record<string, string> = {
        "cache.title": "Cache Management",
        "cache.description":
          "Monitor provider prompt cache efficiency and local semantic response reuse.",
        "cache.refresh": "Refresh",
        "cache.promptCache": "Prompt Cache (Provider-Side)",
        "cache.promptCacheSectionDesc": "Prompt cache section",
        "cache.lastUpdated": "Last updated",
        "cache.withCacheControl": "With Cache Control",
        "cache.cacheRateDesc": "of total requests",
        "cache.cacheReuseRatio": "Cache Reuse Ratio",
        "cache.cacheReuseRatioDesc": "Cache read tokens / Total input tokens",
        "cache.cachedTokens": "Cache Read Tokens",
        "cache.cachedTokensRead": "Read from cache",
        "cache.estCostSaved": "Est. Cost Saved",
        "cache.cacheCreationTokens": "Cache Write Tokens",
        "cache.cacheRate": "Cache Rate",
        "cache.requests": "Requests",
        "cache.inputTokens": "Input Tokens",
        "cache.tokensSaved": "Tokens Saved",
        "cache.trend24h": "Cache Trend (24h)",
        "cache.cached": "Cached",
        "cache.byProvider": "Breakdown by Provider",
        "cache.providerCacheRateDesc": "Provider cache rate description",
        "cache.cachedTokensCol": "Cache Read",
        "cache.cacheCreation": "Cache Write",
        "cache.cacheCreationWrite": "Written to cache",
        "cache.inputTokens": "Total Input Tokens",
        "cache.semanticCache": "Semantic Cache",
        "cache.semanticCacheSectionDesc": "Semantic cache section",
        "cache.semanticCacheDisabledDesc": "Semantic cache is disabled.",
        "cache.memoryEntries": "Memory Entries",
        "cache.memoryEntriesSub": "In-memory LRU",
        "cache.dbEntries": "DB Entries",
        "cache.dbEntriesSub": "Persisted (SQLite)",
        "cache.cacheHits": "Cache Hits",
        "cache.cacheHitsSub": "of {total} total",
        "cache.tokensSavedSub": "Estimated from hits",
        "cache.performance": "Cache Performance",
        "cache.autoRefresh": "Auto-refreshes every {seconds}s",
        "cache.hitRate": "Hit Rate",
        "cache.hits": "Hits",
        "cache.misses": "Misses",
        "cache.total": "Total",
        "cache.behavior": "Cache Behavior",
        "cache.behaviorDeterministic": "Only non-streaming requests with temperature=0 are cached.",
        "cache.behaviorTwoTier": "Two-tier storage: in-memory LRU + SQLite.",
        "cache.behaviorTtl": "TTL via {envVar}.",
        "cache.idempotency": "Idempotency Layer",
        "cache.activeDedupKeys": "Active Dedup Keys",
        "cache.dedupWindow": "Dedup Window",
        "cache.entries": "Entries",
        "cache.semanticEntriesDesc": "Semantic entries only.",
        "cache.searchEntries": "Search entries...",
        "cache.search": "Search",
        "cache.loading": "Loading...",
        "cache.noEntries": "No cache entries found",
        "cache.clearAll": "Clear Semantic Cache",
        "settings.enabled": "Enabled",
        disabled: "Disabled",
      };

      return messages[fullKey] ?? key;
    };

    const translate = (key: string, values?: Record<string, unknown>) => {
      let message = getMessage(key);
      if (values) {
        for (const [name, value] of Object.entries(values)) {
          message = message.replace(`{${name}}`, String(value));
        }
      }
      return message;
    };

    translate.rich = (key: string, values?: Record<string, () => React.ReactNode>) => {
      if (key === "behaviorBypass") {
        return <>Bypass with header {values?.header?.()}.</>;
      }
      if (key === "behaviorTtl") {
        return <>TTL via {values?.envVar?.()}.</>;
      }
      return translate(key);
    };

    return translate;
  },
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => notifications,
}));

describe("CachePage", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    notifications.success.mockReset();
    notifications.error.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("switches between prompt and semantic cache views", async () => {
    fetchMock.mockImplementation(async (input: string) => {
      if (input.startsWith("/api/cache/entries")) {
        return {
          ok: true,
          json: async () => ({
            entries: [],
            pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
          }),
        };
      }

      return {
        ok: true,
        json: async () => ({
          semanticCache: {
            memoryEntries: 0,
            dbEntries: 0,
            hits: 0,
            misses: 3,
            hitRate: "0.0",
            tokensSaved: 0,
          },
          promptCache: {
            totalRequests: 10,
            requestsWithCacheControl: 6,
            totalInputTokens: 1000,
            totalCachedTokens: 550,
            totalCacheCreationTokens: 180,
            tokensSaved: 550,
            estimatedCostSaved: 0.12,
            byProvider: {
              claude: {
                requests: 6,
                totalRequests: 10,
                cachedRequests: 6,
                inputTokens: 1000,
                cachedTokens: 550,
                cacheCreationTokens: 180,
              },
            },
            byStrategy: {},
            lastUpdated: "2026-04-11T05:00:00.000Z",
          },
          trend: [
            {
              timestamp: "2026-04-11T05:00:00.000Z",
              requests: 10,
              cachedRequests: 6,
              inputTokens: 1000,
              cachedTokens: 550,
              cacheCreationTokens: 180,
            },
          ],
          idempotency: {
            activeKeys: 2,
            windowMs: 5000,
          },
          config: {
            semanticCacheEnabled: false,
          },
        }),
      };
    });

    render(<CachePage />);

    await waitFor(() => {
      expect(screen.getByText("Prompt Cache (Provider-Side)")).toBeInTheDocument();
    });

    expect(screen.getByText("Breakdown by Provider")).toBeInTheDocument();
    expect(screen.getByText("claude")).toBeInTheDocument();
    expect(screen.getAllByText("60.0%").length).toBeGreaterThan(0);
    expect(screen.queryByText("Semantic cache is disabled.")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Semantic Cache" }));

    await waitFor(() => {
      expect(screen.getByText("Semantic cache is disabled.")).toBeInTheDocument();
    });

    expect(screen.getByText("Entries")).toBeInTheDocument();
    expect(screen.getByText("Active Dedup Keys")).toBeInTheDocument();
  });
});
