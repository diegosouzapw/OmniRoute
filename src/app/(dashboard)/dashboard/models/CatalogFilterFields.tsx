"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button, Input } from "@/shared/components";
import { parseNonNegativeInt } from "./catalogUrlState";

// Shared building blocks of the model and combo filter panels; the markup matches what each
// panel rendered inline, so both keep the same DOM, labels and classes.

const FIELD_LABEL_CLASS = "flex flex-col gap-1 text-xs font-medium text-text-main";
const FIELD_CONTROL_CLASS =
  "h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5";

function humanize(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll(/[_-]+/g, " ")
    .replace(/^\w/, (first) => first.toUpperCase());
}

/** Search box, result count and the "clear filters" action above the filter grid. */
export function FilterSearchRow({
  label,
  placeholder,
  query,
  onQueryChange,
  totalCount,
  countLabel,
  hasActiveFilters,
  onClear,
}: {
  label: string;
  placeholder: string;
  query: string;
  onQueryChange: (query: string) => void;
  totalCount: number;
  countLabel: string;
  hasActiveFilters: boolean;
  onClear: () => void;
}) {
  const t = useTranslations("modelCatalog");

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
      <Input
        label={label}
        icon="search"
        placeholder={placeholder}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="min-w-0 flex-1"
      />

      <div className="flex items-center gap-3">
        <span className="text-sm text-text-muted">
          {totalCount} {countLabel}
        </span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            {t("clearFilters")}
          </Button>
        )}
      </div>
    </div>
  );
}

export function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className={FIELD_LABEL_CLASS}>
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={FIELD_CONTROL_CLASS}
      >
        {children}
      </select>
    </label>
  );
}

/** One option per value, labelled with the humanized value. */
export function HumanizedOptions({ values }: { values: string[] }) {
  return (
    <>
      {values.map((value) => (
        <option key={value} value={value}>
          {humanize(value)}
        </option>
      ))}
    </>
  );
}

/** The health-test result choices shared by the model and combo filters. */
export function TestResultOptions() {
  const t = useTranslations("modelCatalog");

  return (
    <>
      <option value="all">{t("allResults")}</option>
      <option value="untested">{t("untested")}</option>
      <option value="ok">{t("statusOk")}</option>
      <option value="slow">{t("statusSlow")}</option>
      <option value="error">{t("statusError")}</option>
    </>
  );
}

/** A numeric filter: empty or invalid input clears it (see `parseNonNegativeInt`). */
export function FilterNumberInput({
  label,
  min,
  step,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  min: number;
  step?: number;
  placeholder: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}) {
  return (
    <label className={FIELD_LABEL_CLASS}>
      {label}
      <input
        type="number"
        min={min}
        step={step}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(parseNonNegativeInt(e.target.value))}
        className={FIELD_CONTROL_CLASS}
      />
    </label>
  );
}
