"use client";

import { useTranslations } from "next-intl";
import { Button, Input } from "@/shared/components";
import { parseNonNegativeInt } from "./catalogUrlState";
import type { ComboCatalogFilters } from "./comboCatalogUtils";

function humanize(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll(/[_-]+/g, " ")
    .replace(/^\w/, (first) => first.toUpperCase());
}

export default function ComboCatalogFiltersComponent({
  filters,
  onChange,
  onClear,
  strategyOptions,
  hasActiveFilters,
  totalCount,
}: {
  filters: ComboCatalogFilters;
  onChange: (patch: Partial<ComboCatalogFilters>) => void;
  onClear: () => void;
  strategyOptions: string[];
  hasActiveFilters: boolean;
  totalCount: number;
}) {
  const t = useTranslations("modelCatalog");

  return (
    <div className="flex flex-col gap-4 border-b border-border p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <Input
          label={t("searchCombos")}
          icon="search"
          placeholder={t("searchCombosPlaceholder")}
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
          className="min-w-0 flex-1"
        />

        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted">
            {totalCount} {totalCount === 1 ? t("comboCountSingle") : t("comboCountPlural")}
          </span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              {t("clearFilters")}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("strategy")}
          <select
            value={filters.strategy}
            onChange={(e) => onChange({ strategy: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">{t("allStrategies")}</option>
            {strategyOptions.map((st) => (
              <option key={st} value={st}>
                {humanize(st)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("status")}
          <select
            value={filters.status}
            onChange={(e) => onChange({ status: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">{t("allStatuses")}</option>
            <option value="active">{t("active")}</option>
            <option value="paused">{t("paused")}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("testResult")}
          <select
            value={filters.testResult}
            onChange={(e) => onChange({ testResult: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">{t("allResults")}</option>
            <option value="untested">{t("untested")}</option>
            <option value="ok">{t("statusOk")}</option>
            <option value="slow">{t("statusSlow")}</option>
            <option value="error">{t("statusError")}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("minMembers")}
          <input
            type="number"
            min={1}
            placeholder={t("minMembersPlaceholder")}
            value={filters.minMembers ?? ""}
            onChange={(e) =>
              onChange({
                minMembers: parseNonNegativeInt(e.target.value),
              })
            }
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("maxMembers")}
          <input
            type="number"
            min={1}
            placeholder={t("maxMembersPlaceholder")}
            value={filters.maxMembers ?? ""}
            onChange={(e) =>
              onChange({
                maxMembers: parseNonNegativeInt(e.target.value),
              })
            }
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          />
        </label>
      </div>
    </div>
  );
}
