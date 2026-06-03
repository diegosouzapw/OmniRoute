"use client";

// src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx

import { useState } from "react";
import { useTranslations } from "next-intl";
import TokenCostCounter from "./TokenCostCounter";
import ExportCodeModal from "./ExportCodeModal";
import type { StreamMetrics } from "@/shared/schemas/playground";
import type { PlaygroundState } from "@/lib/playground/codeExport";

export type StudioTab = "chat" | "compare" | "api" | "build";

interface StudioTopBarProps {
  activeTab: StudioTab;
  onTabChange: (tab: StudioTab) => void;
  metrics: StreamMetrics;
  /** Optional playground state for the Export code modal. If omitted, a minimal state is used. */
  exportState?: PlaygroundState;
}

interface TabConfig {
  id: StudioTab;
  labelKey: "tabChat" | "tabCompare" | "tabApi" | "tabBuild";
  icon: string;
}

const TABS: TabConfig[] = [
  { id: "chat", labelKey: "tabChat", icon: "chat" },
  { id: "compare", labelKey: "tabCompare", icon: "compare" },
  { id: "api", labelKey: "tabApi", icon: "api" },
  { id: "build", labelKey: "tabBuild", icon: "build" },
];

/**
 * Top bar with tab switcher, token/cost counter, and export code button.
 * Export code modal uses ExportCodeModal (F7) when exportState is provided.
 */
export default function StudioTopBar({ activeTab, onTabChange, metrics, exportState }: StudioTopBarProps) {
  const t = useTranslations("playground");
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-bg-alt shrink-0">
        {/* Tabs */}
        <div className="flex items-center gap-1" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{t(tab.labelKey)}</span>
            </button>
          ))}
        </div>

        {/* Right side: token counter + export button */}
        <div className="flex items-center gap-3">
          <TokenCostCounter
            tokensIn={metrics.tokensIn}
            tokensOut={metrics.tokensOut}
            costUsd={metrics.costUsd}
          />

          <button
            onClick={() => setExportOpen(true)}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded border border-border hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
            title={t("exportCode")}
            aria-label={t("exportCode")}
          >
            <span className="font-mono text-[11px]">&lt;/&gt;</span>
            <span>{t("exportShort")}</span>
          </button>
        </div>
      </div>

      {/* Export code modal — uses ExportCodeModal (F7) */}
      {exportOpen && exportState != null && (
        <ExportCodeModal state={exportState} onClose={() => setExportOpen(false)} />
      )}
      {exportOpen && exportState == null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setExportOpen(false)}
        >
          <div
            className="bg-surface border border-border rounded-xl p-6 w-[480px] max-w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-text-main">{t("exportCodeTitle")}</h2>
              <button
                onClick={() => setExportOpen(false)}
                className="text-text-muted hover:text-text-main"
                aria-label={t("closeExportModal")}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-sm text-text-muted">
              {t("noStateToExport")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
