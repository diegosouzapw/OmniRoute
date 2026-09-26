"use client";

import { useTranslations } from "next-intl";
import { Button, Input } from "@/shared/components";
import { parseNonNegativeInt } from "./catalogUrlState";
import type { CatalogFilters } from "./modelCatalogUtils";

function humanize(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll(/[_-]+/g, " ")
    .replace(/^\w/, (first) => first.toUpperCase());
}

export default function ModelCatalogFiltersComponent({
  filters,
  onChange,
  onClear,
  providerOptions,
  typeOptions,
  subtypeOptions,
  capabilityOptions,
  hasActiveFilters,
  totalCount,
}: {
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onClear: () => void;
  providerOptions: Array<[string, string]>;
  typeOptions: string[];
  subtypeOptions: string[];
  capabilityOptions: string[];
  hasActiveFilters: boolean;
  totalCount: number;
}) {
  const t = useTranslations("modelCatalog");

  return (
    <div className="flex flex-col gap-4 border-b border-border p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <Input
          label={t("searchModels")}
          icon="search"
          placeholder={t("searchModelsPlaceholder")}
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
          className="min-w-0 flex-1"
        />

        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted">
            {totalCount} {totalCount === 1 ? t("modelCountSingle") : t("modelCountPlural")}
          </span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              {t("clearFilters")}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("provider")}
          <select
            value={filters.providerId}
            onChange={(e) => onChange({ providerId: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">{t("allProviders")}</option>
            {providerOptions.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("type")}
          <select
            value={filters.type}
            onChange={(e) => onChange({ type: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">{t("allTypes")}</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {humanize(type)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("subtype")}
          <select
            value={filters.subtype ?? "all"}
            onChange={(e) => onChange({ subtype: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">{t("allSubtypes")}</option>
            {subtypeOptions.map((subtype) => (
              <option key={subtype} value={subtype}>
                {humanize(subtype)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("capability")}
          <select
            value={filters.capability ?? "all"}
            onChange={(e) => onChange({ capability: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">{t("allCapabilities")}</option>
            {capabilityOptions.map((cap) => (
              <option key={cap} value={cap}>
                {humanize(cap)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("pricing")}
          <select
            value={filters.pricing ?? "all"}
            onChange={(e) => onChange({ pricing: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">{t("allPricing")}</option>
            <option value="free">{t("freeOnly")}</option>
            <option value="paid">{t("nonFree")}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("providerHealth")}
          <select
            value={filters.providerHealth ?? "all"}
            onChange={(e) => onChange({ providerHealth: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">{t("allHealthStates")}</option>
            <option value="healthy">{t("healthy")}</option>
            <option value="degraded">{t("degraded")}</option>
            <option value="down">{t("down")}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("testResult")}
          <select
            value={filters.testResult ?? "all"}
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
          {t("minContext")}
          <input
            type="number"
            min={0}
            step={1000}
            placeholder={t("minContextPlaceholder")}
            value={filters.minContextLength ?? ""}
            onChange={(e) =>
              onChange({
                minContextLength: parseNonNegativeInt(e.target.value),
              })
            }
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          {t("minMaxOutput")}
          <input
            type="number"
            min={0}
            step={1000}
            placeholder={t("minMaxOutputPlaceholder")}
            value={filters.minMaxOutputTokens ?? ""}
            onChange={(e) =>
              onChange({
                minMaxOutputTokens: parseNonNegativeInt(e.target.value),
              })
            }
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          />
        </label>
      </div>
    </div>
  );
}
