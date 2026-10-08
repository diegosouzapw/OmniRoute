"use client";

import { useTranslations } from "next-intl";
import {
  FilterNumberInput,
  FilterSearchRow,
  FilterSelect,
  HumanizedOptions,
  TestResultOptions,
} from "./CatalogFilterFields";
import type { ComboCatalogFilters } from "./comboCatalogUtils";

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
      <FilterSearchRow
        label={t("searchCombos")}
        placeholder={t("searchCombosPlaceholder")}
        query={filters.query}
        onQueryChange={(query) => onChange({ query })}
        totalCount={totalCount}
        countLabel={totalCount === 1 ? t("comboCountSingle") : t("comboCountPlural")}
        hasActiveFilters={hasActiveFilters}
        onClear={onClear}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <FilterSelect
          label={t("strategy")}
          value={filters.strategy}
          onChange={(strategy) => onChange({ strategy })}
        >
          <option value="all">{t("allStrategies")}</option>
          <HumanizedOptions values={strategyOptions} />
        </FilterSelect>

        <FilterSelect
          label={t("status")}
          value={filters.status}
          onChange={(status) => onChange({ status })}
        >
          <option value="all">{t("allStatuses")}</option>
          <option value="active">{t("active")}</option>
          <option value="paused">{t("paused")}</option>
        </FilterSelect>

        <FilterSelect
          label={t("testResult")}
          value={filters.testResult}
          onChange={(testResult) => onChange({ testResult })}
        >
          <TestResultOptions />
        </FilterSelect>

        <FilterNumberInput
          label={t("minMembers")}
          min={1}
          placeholder={t("minMembersPlaceholder")}
          value={filters.minMembers}
          onChange={(minMembers) => onChange({ minMembers })}
        />

        <FilterNumberInput
          label={t("maxMembers")}
          min={1}
          placeholder={t("maxMembersPlaceholder")}
          value={filters.maxMembers}
          onChange={(maxMembers) => onChange({ maxMembers })}
        />
      </div>
    </div>
  );
}
