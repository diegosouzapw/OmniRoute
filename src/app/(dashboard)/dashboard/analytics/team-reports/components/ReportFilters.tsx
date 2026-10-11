"use client";

import { useTranslations } from "next-intl";

import type { AgentSessionReport, ReportBreakdownRow } from "@/lib/usage/agentSessionReports";
import { Input, SegmentedControl, Select } from "@/shared/components";

import { TIME_PRESETS, type ReportFilterState, type TimePreset } from "../reportFilters";

interface ReportFiltersProps {
  filters: ReportFilterState;
  preset: TimePreset | "custom";
  /** Report for the time window only, so every option stays listed while a filter is active. */
  options: AgentSessionReport["breakdowns"] | null;
  onPreset: (preset: TimePreset) => void;
  onChange: (patch: Partial<ReportFilterState>) => void;
  onClear: () => void;
}

const DIMENSION_FILTERS = [
  { field: "apiKeyId", dimension: "members", labelKey: "member" },
  { field: "projectName", dimension: "projects", labelKey: "project" },
  { field: "client", dimension: "clients", labelKey: "client" },
  { field: "provider", dimension: "providers", labelKey: "provider" },
  { field: "connectionId", dimension: "accounts", labelKey: "account" },
] as const;

function optionLabel(row: ReportBreakdownRow): string {
  const name = row.label || row.key;
  return row.detail && row.label ? `${name} (${row.detail})` : name;
}

export default function ReportFilters({
  filters,
  preset,
  options,
  onPreset,
  onChange,
  onClear,
}: ReportFiltersProps) {
  const t = useTranslations("reports");
  const hasDimensionFilter = DIMENSION_FILTERS.some(({ field }) => filters[field]);

  return (
    <div className="space-y-3 rounded-xl border border-border bg-surface/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl
          size="sm"
          aria-label={t("timeRange")}
          value={preset}
          onChange={(value) => onPreset(value as TimePreset)}
          options={TIME_PRESETS.map((value) => ({ value, label: t(`preset_${value}`) }))}
        />
        {hasDimensionFilter && (
          <button type="button" onClick={onClear} className="text-xs text-primary hover:underline">
            {t("clearFilters")}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-7">
        {(["from", "to"] as const).map((field) => (
          <Input
            key={field}
            type="datetime-local"
            label={t(field)}
            value={filters[field]}
            onChange={(event) => onChange({ [field]: event.target.value })}
          />
        ))}
        {DIMENSION_FILTERS.map(({ field, dimension, labelKey }) => {
          const rows = (options?.[dimension] ?? []).filter((row) => row.key);
          const selected = filters[field];
          const listed = rows.some((row) => row.key === selected);
          return (
            <Select
              key={field}
              label={t(labelKey)}
              value={selected}
              placeholder={t("all")}
              placeholderDisabled={false}
              onChange={(event) => onChange({ [field]: event.target.value })}
              options={[
                ...rows.map((row) => ({ value: row.key, label: optionLabel(row) })),
                ...(selected && !listed ? [{ value: selected, label: selected }] : []),
              ]}
            />
          );
        })}
      </div>
    </div>
  );
}
