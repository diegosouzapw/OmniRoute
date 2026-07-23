"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ExportCodeModal from "@/app/(dashboard)/dashboard/playground/components/ExportCodeModal";
import type { PlaygroundState } from "@/lib/playground/codeExport";

export type ActiveTab = "search" | "scrape" | "compare";

interface SearchToolsTopBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  latencyMs?: number | null;
  costUsd?: number | null;
  exportState?: PlaygroundState;
}

const TABS: { id: ActiveTab; icon: string; labelKey: "tabSearch" | "tabScrape" | "tabCompare" }[] = [
  { id: "search", icon: "🔍", labelKey: "tabSearch" },
  { id: "scrape", icon: "📄", labelKey: "tabScrape" },
  { id: "compare", icon: "⚖", labelKey: "tabCompare" },
];

export default function SearchToolsTopBar({
  activeTab,
  onTabChange,
  latencyMs,
  costUsd,
  exportState,
}: SearchToolsTopBarProps) {
  const t = useTranslations("search");
  const tPlayground = useTranslations("playground");
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-bg-alt"
        data-testid="search-tools-topbar"
      >
        {/* Tab switcher */}
        <div className="flex gap-1" role="tablist" aria-label={t("searchTools")}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary/15 text-primary"
                  : "text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5",
              ].join(" ")}
              onClick={() => onTabChange(tab.id)}
              data-testid={`tab-${tab.id}`}
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span>{t(tab.labelKey)}</span>
            </button>
          ))}
        </div>

        {/* Metrics + export */}
        <div className="flex items-center gap-3">
          {latencyMs != null && (
            <span className="text-[11px] text-text-muted" data-testid="metric-latency">
              {latencyMs}ms
            </span>
          )}
          {costUsd != null && (
            <span className="text-[11px] text-text-muted" data-testid="metric-cost">
              ${costUsd.toFixed(4)}
            </span>
          )}
          <button
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-surface border border-border text-text-muted hover:text-text-main hover:border-border-hover transition-colors"
            onClick={() => setExportOpen(true)}
            aria-label={tPlayground("exportCode")}
            data-testid="export-code-button"
          >
            <span className="font-mono text-[11px]">{"/>"}</span>
            <span>{tPlayground("exportShort")}</span>
          </button>
        </div>
      </div>

      {exportOpen && exportState != null && (
        <ExportCodeModal onClose={() => setExportOpen(false)} state={exportState} />
      )}
    </>
  );
}
