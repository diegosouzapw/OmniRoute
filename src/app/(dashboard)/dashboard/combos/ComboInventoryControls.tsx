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

type ComboInventoryControlsProps = {
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
};

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

function StrategyFilterTabs({
  combos,
  activeFilter,
  t,
  onFilterChange,
}: Pick<ComboInventoryControlsProps, "combos" | "activeFilter" | "t" | "onFilterChange">) {
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
  );
}

function InventoryToolbar(props: ComboInventoryControlsProps) {
  if (props.combos.length === 0) return null;
  const summary = props.reorderingAll
    ? getI18nOrFallback(
        props.t,
        "reorderAllDescription",
        `Reordering all ${props.combos.length} combos. Drag handles are enabled.`,
        { count: props.combos.length }
      )
    : getI18nOrFallback(
        props.t,
        "paginationSummary",
        `Showing ${props.pageStart}-${props.pageEnd} of ${props.filteredCount} combos`,
        { start: props.pageStart, end: props.pageEnd, total: props.filteredCount }
      );
  return (
    <div
      className="flex flex-col gap-2 rounded-xl border border-black/8 bg-black/[0.02] p-3 dark:border-white/8 dark:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
      data-testid="combo-list-toolbar"
    >
      <p className="text-xs text-text-muted" aria-live="polite">
        {summary}
      </p>
      {props.combos.length > 1 && (
        <Button
          size="sm"
          variant={props.reorderingAll ? "primary" : "secondary"}
          icon={props.reorderingAll ? "check" : "swap_vert"}
          onClick={props.onReorderToggle}
          disabled={props.savingOrder}
          aria-pressed={props.reorderingAll}
          data-testid="combo-reorder-all-toggle"
        >
          {props.reorderingAll
            ? getI18nOrFallback(props.t, "finishReorder", "Done reordering")
            : getI18nOrFallback(props.t, "reorderAll", "Reorder all")}
        </Button>
      )}
    </div>
  );
}

function FilterEmptyState(props: ComboInventoryControlsProps) {
  const description =
    props.activeFilter === "intelligent"
      ? getI18nOrFallback(
          props.t,
          "filterEmptyIntelligentDescription",
          "Create an auto or LKGP combo to populate the intelligent routing dashboard."
        )
      : getI18nOrFallback(
          props.t,
          "filterEmptyDeterministicDescription",
          "Only auto and LKGP combos exist right now. Switch back to All or create a deterministic combo."
        );
  return (
    <Card padding="sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">filter_alt</span>
          <p className="text-sm font-semibold text-text-main">
            {getI18nOrFallback(
              props.t,
              "filterEmptyTitle",
              "No combos match this strategy filter."
            )}
          </p>
        </div>
        <p className="text-sm text-text-muted">{description}</p>
        <div>
          <Button size="sm" icon="add" onClick={props.onCreateCombo}>
            {props.t("createCombo")}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function InventoryBody(props: ComboInventoryControlsProps) {
  if (props.combos.length === 0) {
    return (
      <EmptyState
        icon="🧩"
        title={props.t("noCombosYet")}
        description={props.t("description")}
        actionLabel={props.t("createCombo")}
        onAction={props.onCreateCombo}
      />
    );
  }
  return !props.reorderingAll && props.filteredCount === 0 ? (
    <FilterEmptyState {...props} />
  ) : (
    props.children
  );
}

function InventoryPagination(props: ComboInventoryControlsProps) {
  if (props.reorderingAll || props.pageCount <= 1 || props.filteredCount <= 0) return null;
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-3 pt-2"
      aria-label={getI18nOrFallback(props.t, "paginationLabel", "Combo pages")}
      data-testid="combo-pagination"
    >
      <Button
        size="sm"
        variant="secondary"
        icon="chevron_left"
        onClick={props.onPreviousPage}
        disabled={props.currentPage <= 1}
        aria-label={getI18nOrFallback(props.t, "previousPage", "Previous combo page")}
        data-testid="combo-pagination-previous"
      >
        {getI18nOrFallback(props.tc, "previous", "Previous")}
      </Button>
      <span className="text-sm tabular-nums text-text-muted" aria-current="page">
        {getI18nOrFallback(
          props.t,
          "paginationPage",
          `Page ${props.currentPage} of ${props.pageCount}`,
          { page: props.currentPage, totalPages: props.pageCount }
        )}
      </span>
      <Button
        size="sm"
        variant="secondary"
        iconRight="chevron_right"
        onClick={props.onNextPage}
        disabled={props.currentPage >= props.pageCount}
        aria-label={getI18nOrFallback(props.t, "nextPage", "Next combo page")}
        data-testid="combo-pagination-next"
      >
        {getI18nOrFallback(props.tc, "next", "Next")}
      </Button>
    </nav>
  );
}

export default function ComboInventoryControls(props: ComboInventoryControlsProps) {
  return (
    <>
      <StrategyFilterTabs {...props} />
      {props.intelligentPanel}
      <InventoryToolbar {...props} />
      <InventoryBody {...props} />
      <InventoryPagination {...props} />
    </>
  );
}
