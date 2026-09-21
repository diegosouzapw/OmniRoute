"use client";

import type { ReactNode } from "react";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import EmptyState from "@/shared/components/EmptyState";
import {
  getStrategyCategory,
  type IntelligentRoutingFilter,
} from "@/lib/combos/intelligentRouting";

type Translator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

type ComboSummary = { strategy?: unknown };

function getI18nOrFallback(
  t: Translator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  try {
    if (typeof t.has === "function" && t.has(key)) return t(key, values);
  } catch {}
  return fallback;
}

export default function ComboInventoryControls({
  combos,
  activeFilter,
  filteredCount,
  pageStart,
  pageEnd,
  currentPage,
  pageCount,
  reorderingAll,
  savingOrder,
  intelligentPanel,
  children,
  t,
  tc,
  onFilterChange,
  onReorderToggle,
  onPreviousPage,
  onNextPage,
  onCreateCombo,
}: {
  combos: ComboSummary[];
  activeFilter: IntelligentRoutingFilter;
  filteredCount: number;
  pageStart: number;
  pageEnd: number;
  currentPage: number;
  pageCount: number;
  reorderingAll: boolean;
  savingOrder: boolean;
  intelligentPanel?: ReactNode;
  children: ReactNode;
  t: Translator;
  tc: Translator;
  onFilterChange: (filter: IntelligentRoutingFilter) => void;
  onReorderToggle: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onCreateCombo: () => void;
}) {
  const tabs = [
    {
      id: "all" as const,
      icon: "layers",
      label: getI18nOrFallback(t, "filterAll", "All"),
      count: combos.length,
    },
    {
      id: "intelligent" as const,
      icon: "auto_awesome",
      label: getI18nOrFallback(t, "filterIntelligent", "Intelligent"),
      count: combos.filter((combo) => getStrategyCategory(combo.strategy) === "intelligent").length,
    },
    {
      id: "deterministic" as const,
      icon: "sort",
      label: getI18nOrFallback(t, "filterDeterministic", "Deterministic"),
      count: combos.filter((combo) => getStrategyCategory(combo.strategy) === "deterministic")
        .length,
    },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-1">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onFilterChange(tab.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                isActive
                  ? "border border-primary/20 bg-primary/10 text-primary"
                  : "border border-transparent text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
              <span className="rounded-full bg-black/5 dark:bg-white/5 px-1.5 py-0.5 text-[11px] text-text-muted">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {intelligentPanel}

      {combos.length > 0 && (
        <div
          className="flex flex-col gap-2 rounded-xl border border-black/8 bg-black/[0.02] p-3 dark:border-white/8 dark:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
          data-testid="combo-list-toolbar"
        >
          <p className="text-xs text-text-muted" aria-live="polite">
            {reorderingAll
              ? getI18nOrFallback(
                  t,
                  "reorderAllDescription",
                  `Reordering all ${combos.length} combos. Drag handles are enabled.`,
                  { count: combos.length }
                )
              : getI18nOrFallback(
                  t,
                  "paginationSummary",
                  `Showing ${pageStart}-${pageEnd} of ${filteredCount} combos`,
                  { start: pageStart, end: pageEnd, total: filteredCount }
                )}
          </p>
          {combos.length > 1 && (
            <Button
              size="sm"
              variant={reorderingAll ? "primary" : "secondary"}
              icon={reorderingAll ? "check" : "swap_vert"}
              onClick={onReorderToggle}
              disabled={savingOrder}
              aria-pressed={reorderingAll}
              data-testid="combo-reorder-all-toggle"
            >
              {reorderingAll
                ? getI18nOrFallback(t, "finishReorder", "Done reordering")
                : getI18nOrFallback(t, "reorderAll", "Reorder all")}
            </Button>
          )}
        </div>
      )}

      {combos.length === 0 ? (
        <EmptyState
          icon="🧩"
          title={t("noCombosYet")}
          description={t("description")}
          actionLabel={t("createCombo")}
          onAction={onCreateCombo}
        />
      ) : !reorderingAll && filteredCount === 0 ? (
        <Card padding="sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">filter_alt</span>
              <p className="text-sm font-semibold text-text-main">
                {getI18nOrFallback(t, "filterEmptyTitle", "No combos match this strategy filter.")}
              </p>
            </div>
            <p className="text-sm text-text-muted">
              {activeFilter === "intelligent"
                ? getI18nOrFallback(
                    t,
                    "filterEmptyIntelligentDescription",
                    "Create an auto or LKGP combo to populate the intelligent routing dashboard."
                  )
                : getI18nOrFallback(
                    t,
                    "filterEmptyDeterministicDescription",
                    "Only auto and LKGP combos exist right now. Switch back to All or create a deterministic combo."
                  )}
            </p>
            <div>
              <Button size="sm" icon="add" onClick={onCreateCombo}>
                {t("createCombo")}
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        children
      )}

      {!reorderingAll && pageCount > 1 && filteredCount > 0 && (
        <nav
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
          aria-label={getI18nOrFallback(t, "paginationLabel", "Combo pages")}
          data-testid="combo-pagination"
        >
          <Button
            size="sm"
            variant="secondary"
            icon="chevron_left"
            onClick={onPreviousPage}
            disabled={currentPage <= 1}
            aria-label={getI18nOrFallback(t, "previousPage", "Previous combo page")}
            data-testid="combo-pagination-previous"
          >
            {getI18nOrFallback(tc, "previous", "Previous")}
          </Button>
          <span className="text-sm tabular-nums text-text-muted" aria-current="page">
            {getI18nOrFallback(t, "paginationPage", `Page ${currentPage} of ${pageCount}`, {
              page: currentPage,
              totalPages: pageCount,
            })}
          </span>
          <Button
            size="sm"
            variant="secondary"
            iconRight="chevron_right"
            onClick={onNextPage}
            disabled={currentPage >= pageCount}
            aria-label={getI18nOrFallback(t, "nextPage", "Next combo page")}
            data-testid="combo-pagination-next"
          >
            {getI18nOrFallback(tc, "next", "Next")}
          </Button>
        </nav>
      )}
    </>
  );
}
