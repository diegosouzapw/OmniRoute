"use client";

import { Button, Input } from "@/shared/components";
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
  return (
    <div className="flex flex-col gap-4 border-b border-border p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <Input
          label="Search combos"
          icon="search"
          placeholder="Search by combo name, models, or description"
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
          className="min-w-0 flex-1"
        />

        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted">
            {totalCount} {totalCount === 1 ? "combo" : "combos"}
          </span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Strategy
          <select
            value={filters.strategy}
            onChange={(e) => onChange({ strategy: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">All strategies</option>
            {strategyOptions.map((st) => (
              <option key={st} value={st}>
                {humanize(st)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Status
          <select
            value={filters.status}
            onChange={(e) => onChange({ status: e.target.value })}
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Test result
          <select
            value={filters.testResult}
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
          Min members
          <input
            type="number"
            min={1}
            placeholder="e.g. 1"
            value={filters.minMembers ?? ""}
            onChange={(e) =>
              onChange({
                minMembers: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-text-main">
          Max members
          <input
            type="number"
            min={1}
            placeholder="e.g. 10"
            value={filters.maxMembers ?? ""}
            onChange={(e) =>
              onChange({
                maxMembers: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="h-9 w-full rounded-control border border-black/10 bg-white px-2.5 text-xs text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
          />
        </label>
      </div>
    </div>
  );
}
