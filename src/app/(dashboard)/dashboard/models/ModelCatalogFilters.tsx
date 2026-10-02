"use client";

import { useTranslations } from "next-intl";
import {
  FilterNumberInput,
  FilterSearchRow,
  FilterSelect,
  HumanizedOptions,
  TestResultOptions,
} from "./CatalogFilterFields";
import type { CatalogFilters } from "./modelCatalogUtils";

type FilterChange = (patch: Partial<CatalogFilters>) => void;

/** Selects whose choices come from the loaded catalog (provider, type, subtype, capability). */
function ModelCatalogOptionFilters({
  filters,
  onChange,
  providerOptions,
  typeOptions,
  subtypeOptions,
  capabilityOptions,
}: {
  filters: CatalogFilters;
  onChange: FilterChange;
  providerOptions: Array<[string, string]>;
  typeOptions: string[];
  subtypeOptions: string[];
  capabilityOptions: string[];
}) {
  const t = useTranslations("modelCatalog");

  return (
    <>
      <FilterSelect
        label={t("provider")}
        value={filters.providerId}
        onChange={(providerId) => onChange({ providerId })}
      >
        <option value="all">{t("allProviders")}</option>
        {providerOptions.map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect label={t("type")} value={filters.type} onChange={(type) => onChange({ type })}>
        <option value="all">{t("allTypes")}</option>
        <HumanizedOptions values={typeOptions} />
      </FilterSelect>

      <FilterSelect
        label={t("subtype")}
        value={filters.subtype ?? "all"}
        onChange={(subtype) => onChange({ subtype })}
      >
        <option value="all">{t("allSubtypes")}</option>
        <HumanizedOptions values={subtypeOptions} />
      </FilterSelect>

      <FilterSelect
        label={t("capability")}
        value={filters.capability ?? "all"}
        onChange={(capability) => onChange({ capability })}
      >
        <option value="all">{t("allCapabilities")}</option>
        <HumanizedOptions values={capabilityOptions} />
      </FilterSelect>
    </>
  );
}

/** Filters with fixed choices (pricing, provider health, test result) and numeric minimums. */
function ModelCatalogFixedFilters({
  filters,
  onChange,
}: {
  filters: CatalogFilters;
  onChange: FilterChange;
}) {
  const t = useTranslations("modelCatalog");

  return (
    <>
      <FilterSelect
        label={t("pricing")}
        value={filters.pricing ?? "all"}
        onChange={(pricing) => onChange({ pricing })}
      >
        <option value="all">{t("allPricing")}</option>
        <option value="free">{t("freeOnly")}</option>
        <option value="paid">{t("nonFree")}</option>
      </FilterSelect>

      <FilterSelect
        label={t("providerHealth")}
        value={filters.providerHealth ?? "all"}
        onChange={(providerHealth) => onChange({ providerHealth })}
      >
        <option value="all">{t("allHealthStates")}</option>
        <option value="healthy">{t("healthy")}</option>
        <option value="degraded">{t("degraded")}</option>
        <option value="down">{t("down")}</option>
      </FilterSelect>

      <FilterSelect
        label={t("testResult")}
        value={filters.testResult ?? "all"}
        onChange={(testResult) => onChange({ testResult })}
      >
        <TestResultOptions />
      </FilterSelect>

      <FilterNumberInput
        label={t("minContext")}
        min={0}
        step={1000}
        placeholder={t("minContextPlaceholder")}
        value={filters.minContextLength}
        onChange={(minContextLength) => onChange({ minContextLength })}
      />

      <FilterNumberInput
        label={t("minMaxOutput")}
        min={0}
        step={1000}
        placeholder={t("minMaxOutputPlaceholder")}
        value={filters.minMaxOutputTokens}
        onChange={(minMaxOutputTokens) => onChange({ minMaxOutputTokens })}
      />
    </>
  );
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
      <FilterSearchRow
        label={t("searchModels")}
        placeholder={t("searchModelsPlaceholder")}
        query={filters.query}
        onQueryChange={(query) => onChange({ query })}
        totalCount={totalCount}
        countLabel={totalCount === 1 ? t("modelCountSingle") : t("modelCountPlural")}
        hasActiveFilters={hasActiveFilters}
        onClear={onClear}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <ModelCatalogOptionFilters
          filters={filters}
          onChange={onChange}
          providerOptions={providerOptions}
          typeOptions={typeOptions}
          subtypeOptions={subtypeOptions}
          capabilityOptions={capabilityOptions}
        />
        <ModelCatalogFixedFilters filters={filters} onChange={onChange} />
      </div>
    </div>
  );
}
