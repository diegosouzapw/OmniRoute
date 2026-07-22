"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import type { SearchProviderCatalogItem } from "@/shared/schemas/searchTools";

const MAX_COMPARE_PROVIDERS = 4; // D22: cap at 4 providers running in parallel

export interface CompareResult {
  provider: string;
  latency: number;
  cost: number;
  resultCount: number;
  responseSize: number;
  urls: string[];
  results: { title: string; url: string; snippet: string }[];
  error?: string;
}

interface CompareTabProps {
  providers: SearchProviderCatalogItem[];
  /** Callback to report metrics to parent Studio after comparison runs */
  onMetrics?: (latencyMs: number | null, costUsd: number | null) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function computeOverlap(urlsA: string[], urlsB: string[]): string {
  const setA = new Set(urlsA);
  const overlap = urlsB.filter((u) => setA.has(u)).length;
  return `${overlap}/${urlsB.length}`;
}

function getBestIndex(values: number[], higherIsBetter = false): number {
  if (values.length === 0) return -1;
  return higherIsBetter ? values.indexOf(Math.max(...values)) : values.indexOf(Math.min(...values));
}

function getWorstIndex(values: number[], higherIsBetter = false): number {
  if (values.length === 0) return -1;
  return higherIsBetter ? values.indexOf(Math.min(...values)) : values.indexOf(Math.max(...values));
}

/** Build a map of url → count across all compare results to find overlaps */
function buildUrlCountMap(allResults: CompareResult[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const cr of allResults) {
    for (const r of cr.results) {
      if (r.url) counts.set(r.url, (counts.get(r.url) ?? 0) + 1);
    }
  }
  return counts;
}

export default function CompareTab({ providers, onMetrics }: CompareTabProps) {
  const t = useTranslations("search");
  const activeSearchProviders = providers.filter(
    (p) => p.kind === "search" && p.status === "configured"
  );

  const [query, setQuery] = useState("");
  const [selectedProviderIds, setSelectedProviderIds] = useState<string[]>([]);
  const [results, setResults] = useState<CompareResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const toggleProvider = useCallback((id: string) => {
    setSelectedProviderIds((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= MAX_COMPARE_PROVIDERS) return prev;
      return [...prev, id];
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedProviderIds(activeSearchProviders.slice(0, MAX_COMPARE_PROVIDERS).map((p) => p.id));
  }, [activeSearchProviders]);

  const clearAll = useCallback(() => {
    setSelectedProviderIds([]);
  }, []);

  const handleRun = useCallback(async () => {
    if (!query.trim() || selectedProviderIds.length === 0) return;
    setLoading(true);
    setHasRun(true);
    setResults([]);

    const settled = await Promise.allSettled(
      selectedProviderIds.map(async (providerId) => {
        const start = Date.now();
        try {
          const res = await fetch("/api/v1/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, provider: providerId, max_results: 10 }),
          });
          const data = await res.json();
          const latency = Date.now() - start;

          if (!res.ok) {
            return {
              provider: providerId,
              latency,
              cost: 0,
              resultCount: 0,
              responseSize: 0,
              urls: [],
              results: [],
              error: data?.error?.message ?? t("httpError", { status: res.status }),
            } as CompareResult;
          }

          const respJson = JSON.stringify(data);
          const rawResults = Array.isArray(data.results) ? data.results : [];
          return {
            provider: providerId,
            latency: data.metrics?.response_time_ms ?? latency,
            cost: data.usage?.search_cost_usd ?? 0,
            resultCount: rawResults.length,
            responseSize: respJson.length,
            urls: rawResults.map((r: { url: string }) => r.url),
            results: rawResults.map((r: any) => ({
              title: r.title ?? r.url ?? "",
              url: r.url ?? "",
              snippet: r.snippet ?? r.description ?? "",
            })),
          } as CompareResult;
        } catch (err: unknown) {
          return {
            provider: providerId,
            latency: Date.now() - start,
            cost: 0,
            resultCount: 0,
            responseSize: 0,
            urls: [],
            results: [],
            error: err instanceof Error ? err.message : t("failed"),
          } as CompareResult;
        }
      })
    );

    const resolved = settled.map((s) =>
      s.status === "fulfilled"
        ? s.value
        : ({
            provider: "unknown",
            latency: 0,
            cost: 0,
            resultCount: 0,
            responseSize: 0,
            urls: [],
            results: [],
            error: t("requestFailed"),
          } as CompareResult)
    );
    setResults(resolved);
    setLoading(false);
    // Report best (min) latency and total cost to parent Studio
    const valid = resolved.filter((r) => !r.error);
    if (valid.length > 0) {
      const minLatency = Math.min(...valid.map((r) => r.latency));
      const totalCost = valid.reduce((sum, r) => sum + r.cost, 0);
      onMetrics?.(minLatency, totalCost);
    }
  }, [query, selectedProviderIds, onMetrics, t]);

  // Compute best/worst indices for column header coloring
  const validResults = results.filter((r) => !r.error);
  const latencyValues = validResults.map((r) => r.latency);
  const costValues = validResults.map((r) => r.cost);

  const bestLatencyProvider = validResults[getBestIndex(latencyValues, false)]?.provider;
  const bestCostProvider = validResults[getBestIndex(costValues, false)]?.provider;

  // URL overlap map: url → number of providers that returned it
  const urlCountMap = buildUrlCountMap(results);

  if (activeSearchProviders.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center flex-1 py-16 text-center"
        data-testid="compare-no-providers"
      >
        <span className="text-3xl mb-3" aria-hidden="true">
          ⚖
        </span>
        <p className="text-sm text-text-muted mb-2">{t("noActiveProviderDescription")}</p>
        <Link href="/dashboard/providers" className="text-accent text-sm hover:underline">
          {t("configureProviders")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-4" data-testid="compare-tab">
      {/* Query + provider picker */}
      <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
        <label
          htmlFor="compare-query"
          className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider"
        >
          {t("compareQuery")}
        </label>
        <div className="flex gap-2">
          <input
            id="compare-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("compareQueryPlaceholder")}
            className="flex-1 bg-bg-alt border border-border rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
            onKeyDown={(e) => {
              if (e.key === "Enter") void handleRun();
            }}
            data-testid="compare-query-input"
          />
          <button
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => void handleRun()}
            disabled={loading || selectedProviderIds.length === 0 || !query.trim()}
            data-testid="run-compare-button"
          >
            {loading ? t("compareRunning") : t("compareRun")}
          </button>
        </div>

        {/* Provider picker — capped at MAX_COMPARE_PROVIDERS (D22) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-text-muted">
              {t("selectedProviders", { count: selectedProviderIds.length })}
            </p>
            <div className="flex gap-2">
              <button
                className="text-[10px] px-2 py-0.5 rounded border border-border text-text-muted hover:text-text-main hover:border-primary/30 transition-colors"
                onClick={selectAll}
                data-testid="select-all-providers"
              >
                {t("selectAll")}
              </button>
              <button
                className="text-[10px] px-2 py-0.5 rounded border border-border text-text-muted hover:text-text-main hover:border-primary/30 transition-colors"
                onClick={clearAll}
                data-testid="clear-providers"
              >
                {t("clear")}
              </button>
            </div>
          </div>
          {selectedProviderIds.length >= MAX_COMPARE_PROVIDERS && (
            <p className="text-warning text-[10px] mb-2">
              {t("maxCompareProviders", { count: MAX_COMPARE_PROVIDERS })}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {activeSearchProviders.map((p) => {
              const selected = selectedProviderIds.includes(p.id);
              const atCap = !selected && selectedProviderIds.length >= MAX_COMPARE_PROVIDERS;
              return (
                <button
                  key={p.id}
                  className={[
                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors border",
                    selected
                      ? "bg-primary/15 text-primary border-primary/30"
                      : "text-text-muted border-border hover:text-text-main hover:border-primary/30",
                    atCap ? "opacity-40 cursor-not-allowed" : "",
                  ].join(" ")}
                  onClick={() => toggleProvider(p.id)}
                  disabled={atCap}
                  data-testid={`provider-toggle-${p.id}`}
                  aria-pressed={selected}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-10" data-testid="compare-loading">
          <span
            className="material-symbols-outlined text-[28px] text-primary animate-spin"
            aria-hidden="true"
          >
            progress_activity
          </span>
        </div>
      )}

      {/* Layout A — side-by-side columns */}
      {hasRun && !loading && results.length > 0 && (
        <div
          className="bg-surface border border-border rounded-lg overflow-hidden"
          data-testid="compare-results"
        >
          <div className="px-4 py-2.5 bg-bg-alt border-b border-border">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              {t("compareResults", { query })}
            </span>
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-3 p-3" style={{ minWidth: `${results.length * 296}px` }}>
              {results.map((cr) => {
                const isBestLatency = !cr.error && cr.provider === bestLatencyProvider;
                const isBestCost = !cr.error && cr.provider === bestCostProvider;

                return (
                  <div
                    key={cr.provider}
                    className="min-w-[280px] w-[280px] shrink-0 flex flex-col rounded-lg border border-border bg-surface overflow-hidden"
                    data-testid={`compare-col-${cr.provider}`}
                  >
                    {/* Column header */}
                    <div className="px-3 py-2 bg-bg-alt border-b border-border">
                      <p className="text-xs font-semibold text-text-main truncate mb-1">
                        {cr.provider.replace("-search", "")}
                      </p>
                      {cr.error ? (
                        <p className="text-[10px] text-red-400 truncate">{cr.error}</p>
                      ) : (
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-text-muted">
                          <span className={isBestLatency ? "text-emerald-400 font-medium" : ""}>
                            {cr.latency}ms
                          </span>
                          <span className={isBestCost ? "text-emerald-400 font-medium" : ""}>
                            ${cr.cost.toFixed(4)}
                          </span>
                          <span>{t("resultCount", { count: cr.resultCount })}</span>
                          <span>{formatBytes(cr.responseSize)}</span>
                        </div>
                      )}
                    </div>

                    {/* Results list */}
                    <div className="flex flex-col divide-y divide-border overflow-y-auto max-h-[600px]">
                      {cr.error ? (
                        <div className="p-3">
                          <p className="text-xs text-red-400">{cr.error}</p>
                        </div>
                      ) : cr.results.length === 0 ? (
                        <div className="p-3">
                          <p className="text-xs text-text-muted">{t("noResults")}</p>
                        </div>
                      ) : (
                        cr.results.map((r, idx) => {
                          const isShared = (urlCountMap.get(r.url) ?? 0) > 1;
                          return (
                            <div key={idx} className="p-3 space-y-0.5">
                              <div className="flex items-start gap-1">
                                {isShared && (
                                  <span
                                    className="text-emerald-400 text-[11px] mt-0.5 shrink-0"
                                    title={t("sharedResultTitle")}
                                    aria-label={t("sharedResult")}
                                  >
                                    ⭐
                                  </span>
                                )}
                                <a
                                  href={r.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-sm text-text-main hover:text-primary leading-snug"
                                >
                                  {r.title || r.url}
                                </a>
                              </div>
                              {r.snippet && (
                                <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                                  {r.snippet}
                                </p>
                              )}
                              <p className="text-[10px] text-text-muted truncate">{r.url}</p>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Overlap summary footer */}
          {results.length >= 2 && (
            <div className="px-4 py-2 bg-bg-alt border-t border-border">
              <div className="flex flex-wrap gap-3 text-[10px] text-text-muted">
                {results.slice(1).map((cr) => {
                  const baseUrls = results[0]?.urls ?? [];
                  return (
                    <span key={cr.provider}>
                      {t("overlapSummary", {
                        first: results[0]?.provider.replace("-search", "") ?? "",
                        second: cr.provider.replace("-search", ""),
                        overlap: cr.error ? "—" : computeOverlap(baseUrls, cr.urls),
                      })}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty state — nothing run yet */}
      {!hasRun && !loading && (
        <div
          className="flex flex-col items-center justify-center flex-1 py-12 text-center"
          data-testid="compare-empty-state"
        >
          <span className="text-3xl mb-3" aria-hidden="true">
            ⚖
          </span>
          <p className="text-sm text-text-muted mb-1">{t("compareEmptyTitle")}</p>
          <p className="text-xs text-text-muted">{t("compareEmptyDescription")}</p>
        </div>
      )}
    </div>
  );
}
