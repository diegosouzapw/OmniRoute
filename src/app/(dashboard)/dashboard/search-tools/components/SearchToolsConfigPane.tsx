"use client";

import { useState } from "react";
import { Select } from "@/shared/components";
import type { SearchProviderCatalogItem } from "@/shared/schemas/searchTools";
import type { ActiveTab } from "./SearchToolsTopBar";

export interface ConfigState {
  provider: string;
  searchType: "web" | "news";
  fetchFormat: "markdown" | "html" | "text";
  fullPage: boolean;
  rerankModel: string;
}

interface SearchToolsConfigPaneProps {
  config: ConfigState;
  onConfigChange: (patch: Partial<ConfigState>) => void;
  providers: SearchProviderCatalogItem[];
  activeTab: ActiveTab;
  rerankModels?: { value: string; label: string }[];
}

export default function SearchToolsConfigPane({
  config,
  onConfigChange,
  providers,
  activeTab,
  rerankModels = [],
}: SearchToolsConfigPaneProps) {
  const [historyExpanded, setHistoryExpanded] = useState(false);

  const searchProviders = providers.filter((p) => p.kind === "search" && p.status !== "missing");
  const fetchProviders = providers.filter((p) => p.kind === "fetch" && p.status !== "missing");
  const relevantProviders = activeTab === "scrape" ? fetchProviders : searchProviders;

  const selectedProvider = providers.find((p) => p.id === config.provider);

  return (
    <aside
      className="w-[220px] shrink-0 border-l border-border bg-bg-alt overflow-y-auto flex flex-col"
      data-testid="search-tools-config-pane"
      aria-label="Configuration pane"
    >
      <div className="p-3 border-b border-border">
        <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
          Configuration
        </span>
      </div>

      {/* Provider selector */}
      <div className="p-3 border-b border-border space-y-2">
        <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
          Provider
        </label>
        <Select
          value={config.provider}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onConfigChange({ provider: e.target.value })
          }
          options={[
            { value: "auto", label: "Auto (cheapest)" },
            ...relevantProviders.map((p) => ({ value: p.id, label: p.name })),
          ]}
          className="w-full"
        />

        {/* Provider metadata inline */}
        {selectedProvider && (
          <div className="text-[10px] text-text-muted space-y-0.5">
            <div>
              Cost:{" "}
              <span className="text-text-main font-medium">
                ${selectedProvider.costPerQuery.toFixed(4)}/query
              </span>
            </div>
            {selectedProvider.freeMonthlyQuota > 0 && (
              <div>
                Free quota:{" "}
                <span className="text-text-main font-medium">
                  {selectedProvider.freeMonthlyQuota >= 1000
                    ? `${(selectedProvider.freeMonthlyQuota / 1000).toFixed(0)}k`
                    : selectedProvider.freeMonthlyQuota}
                  /mo
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              Status:{" "}
              <span
                className={
                  selectedProvider.status === "configured"
                    ? "text-success font-medium"
                    : selectedProvider.status === "rate_limited"
                      ? "text-warning font-medium"
                      : "text-text-muted font-medium"
                }
              >
                {selectedProvider.status === "configured"
                  ? "Configured"
                  : selectedProvider.status === "rate_limited"
                    ? "Rate limited"
                    : "Missing credential"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Search tab options */}
      {activeTab === "search" && (
        <div className="p-3 border-b border-border space-y-2">
          <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
            Search type
          </label>
          <Select
            value={config.searchType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onConfigChange({ searchType: e.target.value as "web" | "news" })
            }
            options={[
              { value: "web", label: "Web" },
              { value: "news", label: "News" },
            ]}
            className="w-full"
          />
        </div>
      )}

      {/* Scrape tab options */}
      {activeTab === "scrape" && (
        <div className="p-3 border-b border-border space-y-2">
          <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
            Format
          </label>
          <Select
            value={config.fetchFormat}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onConfigChange({ fetchFormat: e.target.value as ConfigState["fetchFormat"] })
            }
            options={[
              { value: "markdown", label: "Markdown" },
              { value: "html", label: "HTML" },
              { value: "text", label: "Text" },
            ]}
            className="w-full"
          />
          <label className="flex items-center gap-2 cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={config.fullPage}
              onChange={(e) => onConfigChange({ fullPage: e.target.checked })}
              className="rounded"
            />
            <span className="text-xs text-text-main">Full page</span>
          </label>
        </div>
      )}

      {/* Compare tab options */}
      {activeTab === "compare" && (
        <div className="p-3 border-b border-border">
          <div className="text-[10px] text-text-muted">
            Select up to 4 providers on the Compare tab to compare them side by side.
          </div>
        </div>
      )}

      {/* Rerank model (only for search tab) */}
      {activeTab === "search" && rerankModels.length > 0 && (
        <div className="p-3 border-b border-border space-y-1">
          <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
            Rerank model
          </label>
          <Select
            value={config.rerankModel}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onConfigChange({ rerankModel: e.target.value })
            }
            options={[{ value: "", label: "None" }, ...rerankModels]}
            className="w-full"
          />
        </div>
      )}

      {/* History section (collapsible placeholder) */}
      <div className="p-3 flex-1">
        <button
          className="flex justify-between items-center w-full"
          onClick={() => setHistoryExpanded((e) => !e)}
          aria-expanded={historyExpanded}
        >
          <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
            History
          </span>
          <span className="text-text-muted text-xs" aria-hidden="true">
            {historyExpanded ? "▼" : "▶"}
          </span>
        </button>
        {historyExpanded && (
          <div className="mt-2 text-[10px] text-text-muted">
            History is available on the Search tab.
          </div>
        )}
      </div>
    </aside>
  );
}
