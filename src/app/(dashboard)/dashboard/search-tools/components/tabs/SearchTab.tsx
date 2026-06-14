"use client";

import dynamic from "next/dynamic";
import type { ConfigState } from "../SearchToolsConfigPane";
import type { SearchFormData } from "../SearchForm";
import type { SearchProviderCatalogItem } from "@/shared/schemas/searchTools";

const SearchForm = dynamic(() => import("../SearchForm"), { ssr: false });
const ResultsPanel = dynamic(() => import("../ResultsPanel"), { ssr: false });
const RerankPanel = dynamic(() => import("../RerankPanel"), { ssr: false });
const SearchHistory = dynamic(() => import("../SearchHistory"), { ssr: false });

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  score?: number;
}

interface SearchResponse {
  id: string;
  provider: string;
  query: string;
  answer?: string;
  results: SearchResult[];
  cached: boolean;
  usage: { queries_used: number; search_cost_usd: number };
  metrics: { response_time_ms: number; upstream_latency_ms: number; total_results_available: number | null };
}

interface SearchProvider {
  id: string;
  name: string;
  status: "active" | "no_credentials";
  cost_per_query: number;
}

interface SearchTabProps {
  configState: ConfigState;
  providers: SearchProvider[];
  /** Catalog providers for metadata badges in SearchForm */
  catalogProviders?: SearchProviderCatalogItem[];
  /** Callback to report latency/cost to parent Studio */
  onMetrics?: (latencyMs: number | null, costUsd: number | null) => void;
}

import { useState, useRef } from "react";

export default function SearchTab({ configState, providers, catalogProviders, onMetrics }: SearchTabProps) {
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [rawJson, setRawJson] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastQuery, setLastQuery] = useState<SearchFormData | null>(null);
  const [showRerank, setShowRerank] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleSearch = async (formData: SearchFormData) => {
    setLoading(true);
    setError("");
    setResponse(null);
    setRawJson("");
    setStatusCode(0);
    setShowRerank(false);

    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15_000);
    const start = Date.now();

    try {
      const body: Record<string, unknown> = { ...formData };
      if (!body.provider) delete body.provider;
      // Override with configState if set
      if (configState.searchType) body.search_type = configState.searchType;

      const res = await fetch("/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      setDuration(Date.now() - start);
      setStatusCode(res.status);

      const data = await res.json();
      setRawJson(JSON.stringify(data, null, 2));
      setLastQuery(formData);

      if (res.ok) {
        setResponse(data);
        onMetrics?.(data.metrics?.response_time_ms ?? duration, data.usage?.search_cost_usd ?? null);
      } else {
        setError(data.error?.message || data.error || `Error ${res.status}`);
        onMetrics?.(duration, null);
      }
    } catch (err: unknown) {
      setDuration(Date.now() - start);
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out after 15s");
      } else {
        setError(err instanceof Error ? err.message : "Network error");
      }
    } finally {
      setLoading(false);
      clearTimeout(timeout);
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
  };

  const handleHistoryReplay = (entry: { query: string; provider: string; filters: Record<string, unknown> }) => {
    handleSearch({
      query: entry.query,
      provider: entry.provider || "",
      search_type: (entry.filters?.search_type as string) || "web",
      max_results: (entry.filters?.max_results as number) || 5,
    });
  };

  return (
    <div className="flex h-full" data-testid="search-tab">
      {/* Left: form + history */}
      <div className="w-[300px] shrink-0 border-r border-border overflow-y-auto flex flex-col bg-bg-alt">
        <SearchForm
          onSearch={handleSearch}
          loading={loading}
          onCancel={handleCancel}
          providers={providers}
          catalogProviders={catalogProviders}
        />
        <SearchHistory onReplay={handleHistoryReplay} />
      </div>

      {/* Right: results + rerank */}
      <div className="flex-1 overflow-y-auto p-1">
        <ResultsPanel
          response={response}
          rawJson={rawJson}
          loading={loading}
          error={error}
          statusCode={statusCode}
          duration={duration}
          noProvidersConfigured={providers.filter((p) => p.status === "active").length === 0}
        />

        {response && (
          <div className="px-4 py-2 flex gap-2">
            <button
              className="flex-1 bg-surface border border-border rounded-lg p-2 text-center hover:border-primary/30 transition-colors flex items-center justify-center gap-2"
              onClick={() => setShowRerank(!showRerank)}
            >
              <span className="text-primary text-sm" aria-hidden="true">
                &#8645;
              </span>
              <span className="text-xs text-text-muted">Rerank</span>
            </button>
          </div>
        )}

        {showRerank && response && (
          <div className="px-4 pb-3">
            <RerankPanel
              query={response.query}
              results={response.results}
              onClose={() => setShowRerank(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
