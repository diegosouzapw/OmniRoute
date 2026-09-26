"use client";

import { Button, Input } from "@/shared/components";
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
  return (
    <div className="flex flex-col gap-4 border-b border-border p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <Input
          label="Search models"
          icon="search"
          placeholder="Search by model, provider, or capability"
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
          className="min-w-0 flex-1"
        />

        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted">
            {totalCount} {totalCount === 1 ? "model" : "models"}
          </span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Provider
          <select
            value={filters.providerId}
            onChange={(e) => onChange({ providerId: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">All providers</option>
            {providerOptions.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Type
          <select
            value={filters.type}
            onChange={(e) => onChange({ type: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">All types</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {humanize(type)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Subtype
          <select
            value={filters.subtype ?? "all"}
            onChange={(e) => onChange({ subtype: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">All subtypes</option>
            {subtypeOptions.map((subtype) => (
              <option key={subtype} value={subtype}>
                {humanize(subtype)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Capability
          <select
            value={filters.capability ?? "all"}
            onChange={(e) => onChange({ capability: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">All capabilities</option>
            {capabilityOptions.map((cap) => (
              <option key={cap} value={cap}>
                {humanize(cap)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Pricing
          <select
            value={filters.pricing ?? "all"}
            onChange={(e) => onChange({ pricing: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">All pricing</option>
            <option value="free">Free only</option>
            <option value="paid">Standard / Non-free</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Provider health
          <select
            value={filters.providerHealth ?? "all"}
            onChange={(e) => onChange({ providerHealth: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">All health states</option>
            <option value="healthy">Healthy</option>
            <option value="degraded">Degraded</option>
            <option value="down">Down</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Test result
          <select
            value={filters.testResult ?? "all"}
            onChange={(e) => onChange({ testResult: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">All results</option>
            <option value="untested">Untested</option>
            <option value="ok">OK</option>
            <option value="slow">Slow</option>
            <option value="error">Error</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Min context
          <input
            type="number"
            min={0}
            step={1000}
            placeholder="e.g. 32000"
            value={filters.minContextLength ?? ""}
            onChange={(e) =>
              onChange({
                minContextLength: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          />
        </label>
      </div>
    </div>
  );
}
