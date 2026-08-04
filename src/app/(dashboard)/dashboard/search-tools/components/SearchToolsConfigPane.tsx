"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("search");
  const [historyExpanded, setHistoryExpanded] = useState(false);

  const searchProviders = providers.filter((p) => p.kind === "search" && p.status !== "missing");
  const fetchProviders = providers.filter((p) => p.kind === "fetch" && p.status !== "missing");
  const relevantProviders = activeTab === "scrape" ? fetchProviders : searchProviders;

  const selectedProvider = providers.find((p) => p.id === config.provider);

  return (
    <aside
      className="w-[220px] shrink-0 border-l border-border bg-bg-alt overflow-y-auto flex flex-col"
      data-testid="search-tools-config-pane"
      aria-label={t("configurationPane")}
    >
      <div className="p-3 border-b border-border">
        <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
          {t("configuration")}
        </span>
      </div>

      {/* Provider selector */}
      <div className="p-3 border-b border-border space-y-2">
        <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("provider")}
        </label>
        <Select
          value={config.provider}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onConfigChange({ provider: e.target.value })
          }
          options={[
            { value: "auto", label: t("autoProvider") },
            ...relevantProviders.map((p) => ({ value: p.id, label: p.name })),
          ]}
          className="w-full"
        />

        {/* Provider metadata inline */}
        {selectedProvider && (
          <div className="text-[10px] text-text-muted space-y-0.5">
            <div>
              {`${t("cost")}: `}
              <span className="text-text-main font-medium">
                ${selectedProvider.costPerQuery.toFixed(4)}/query
              </span>
            </div>
            {selectedProvider.freeMonthlyQuota > 0 && (
              <div>
                {`${t("freeQuota")}: `}
                <span className="text-text-main font-medium">
                  {selectedProvider.freeMonthlyQuota >= 1000
                    ? `${(selectedProvider.freeMonthlyQuota / 1000).toFixed(0)}k`
                    : selectedProvider.freeMonthlyQuota}
                  /mo
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              {`${t("status")}: `}
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
                  ? t("configuredStatus")
                  : selectedProvider.status === "rate_limited"
                    ? t("rateLimitedStatus")
                    : t("noCredential")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Search tab options */}
      {activeTab === "search" && (
        <div className="p-3 border-b border-border space-y-2">
          <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
            {t("searchType")}
          </label>
          <Select
            value={config.searchType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onConfigChange({ searchType: e.target.value as "web" | "news" })
            }
            options={[
              { value: "web", label: t("searchTypeWeb") },
              { value: "news", label: t("searchTypeNews") },
            ]}
            className="w-full"
          />
        </div>
      )}

      {/* Scrape tab options */}
      {activeTab === "scrape" && (
        <div className="p-3 border-b border-border space-y-2">
          <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
            {t("scrapeFormat")}
          </label>
          <Select
            value={config.fetchFormat}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onConfigChange({ fetchFormat: e.target.value as ConfigState["fetchFormat"] })
            }
            options={[
              { value: "markdown", label: t("formatMarkdown") },
              { value: "html", label: "HTML" },
              { value: "text", label: t("formatText") },
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
            <span className="text-xs text-text-main">{t("scrapeFullPage")}</span>
          </label>
        </div>
      )}

      {/* Compare tab options */}
      {activeTab === "compare" && (
        <div className="p-3 border-b border-border">
          <div className="text-[10px] text-text-muted">{t("compareProviderHint")}</div>
        </div>
      )}

      {/* Rerank model (only for search tab) */}
      {activeTab === "search" && rerankModels.length > 0 && (
        <div className="p-3 border-b border-border space-y-1">
          <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
            {t("rerankModelLabel")}
          </label>
          <Select
            value={config.rerankModel}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onConfigChange({ rerankModel: e.target.value })
            }
            options={[{ value: "", label: t("noneOption") }, ...rerankModels]}
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
            {t("history")}
          </span>
          <span className="text-text-muted text-xs" aria-hidden="true">
            {historyExpanded ? "▼" : "▶"}
          </span>
        </button>
        {historyExpanded && (
          <div className="mt-2 text-[10px] text-text-muted">{t("historyHint")}</div>
        )}
      </div>
    </aside>
  );
}
