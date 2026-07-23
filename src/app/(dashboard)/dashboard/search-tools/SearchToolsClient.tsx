"use client";

import { useState, useEffect } from "react";
import type { SearchProviderCatalogItem } from "@/shared/schemas/searchTools";
import type { PlaygroundState } from "@/lib/playground/codeExport";

import SearchToolsTopBar, { type ActiveTab } from "./components/SearchToolsTopBar";
import SearchToolsConfigPane, { type ConfigState } from "./components/SearchToolsConfigPane";
import SearchConceptCard from "./components/SearchConceptCard";

import dynamic from "next/dynamic";

const SearchTab = dynamic(() => import("./components/tabs/SearchTab"), { ssr: false });
const ScrapeTab = dynamic(() => import("./components/tabs/ScrapeTab"), { ssr: false });
const CompareTab = dynamic(() => import("./components/tabs/CompareTab"), { ssr: false });

/** Minimal legacy-compatible shape used by SearchTab (fetched from /api/search/providers). */
interface SearchProvider {
  id: string;
  name: string;
  status: "active" | "no_credentials";
  cost_per_query: number;
}

const DEFAULT_CONFIG: ConfigState = {
  provider: "auto",
  searchType: "web",
  fetchFormat: "markdown",
  fullPage: false,
  rerankModel: "",
};

export default function SearchToolsClient() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("search");
  const [configState, setConfigState] = useState<ConfigState>(DEFAULT_CONFIG);
  const [catalogProviders, setCatalogProviders] = useState<SearchProviderCatalogItem[]>([]);
  const [legacyProviders, setLegacyProviders] = useState<SearchProvider[]>([]);
  // Metrics shared across tabs (updated by active tab)
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [costUsd, setCostUsd] = useState<number | null>(null);

  useEffect(() => {
    globalThis
      .fetch("/api/search/providers")
      .then((res) => res.json())
      .then((data: { providers?: SearchProviderCatalogItem[] }) => {
        const providers = data.providers ?? [];
        setCatalogProviders(providers);
        // Build legacy-compatible list for SearchTab/SearchForm
        const legacy: SearchProvider[] = providers
          .filter((p) => p.kind === "search")
          .map((p) => ({
            id: p.id,
            name: p.name,
            status: p.status === "configured" ? "active" : "no_credentials",
            cost_per_query: p.costPerQuery,
          }));
        setLegacyProviders(legacy);
      })
      .catch(() => {});
  }, []);

  const handleConfigChange = (patch: Partial<ConfigState>) => {
    setConfigState((prev) => ({ ...prev, ...patch }));
  };

  // Build export state from current config (passed to TopBar for ExportCodeModal)
  const exportState: PlaygroundState = {
    endpoint: activeTab === "scrape" ? "web.fetch" : "search",
    baseUrl: typeof window !== "undefined" ? window.location.origin : "http://localhost:20128",
    searchProvider: configState.provider,
    searchType: configState.searchType,
    fetchFormat: configState.fetchFormat as PlaygroundState["fetchFormat"],
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]" data-testid="search-tools-studio">
      {/* Top bar: tabs + metrics + export */}
      <SearchToolsTopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        latencyMs={latencyMs}
        costUsd={costUsd}
        exportState={exportState}
      />

      {/* Concept card — always visible, collapsible */}
      <div className="px-4 pt-3 pb-0">
        <SearchConceptCard />
      </div>

      {/* Main area: tab content + config pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Tab content */}
        <div className="flex-1 overflow-y-auto" role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {activeTab === "search" && (
            <SearchTab
              configState={configState}
              providers={legacyProviders}
              catalogProviders={catalogProviders}
              onMetrics={(lMs, cUsd) => {
                setLatencyMs(lMs);
                setCostUsd(cUsd);
              }}
            />
          )}
          {activeTab === "scrape" && (
            <ScrapeTab
              configState={configState}
              onMetrics={(lMs, cUsd) => {
                setLatencyMs(lMs);
                setCostUsd(cUsd);
              }}
            />
          )}
          {activeTab === "compare" && (
            <CompareTab
              providers={catalogProviders}
              onMetrics={(lMs, cUsd) => {
                setLatencyMs(lMs);
                setCostUsd(cUsd);
              }}
            />
          )}
        </div>

        {/* Config pane */}
        <SearchToolsConfigPane
          config={configState}
          onConfigChange={handleConfigChange}
          providers={catalogProviders}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}
