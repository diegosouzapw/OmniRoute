"use client";

import { Badge, Button } from "@/shared/components";
import CatalogTestBadge from "./CatalogTestBadge";
import type { CatalogTestResult } from "./catalogTestStorage";
import { getComboTestKey } from "./catalogTestStorage";
import type { ComboCatalogRow, ComboSortDirection, ComboSortField } from "./comboCatalogUtils";

function formatCount(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function humanize(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll(/[_-]+/g, " ")
    .replace(/^\w/, (first) => first.toUpperCase());
}

function SortableHeading({
  field,
  label,
  activeField,
  direction,
  onSort,
}: {
  field: ComboSortField;
  label: string;
  activeField: ComboSortField;
  direction: ComboSortDirection;
  onSort: (field: ComboSortField) => void;
}) {
  const active = field === activeField;
  return (
    <th
      scope="col"
      aria-sort={active ? (direction === "asc" ? "ascending" : "descending") : "none"}
      className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted"
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex min-h-8 items-center gap-1 rounded-sm text-left hover:text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {label}
        {active && (
          <span className="material-symbols-outlined text-base text-primary" aria-hidden="true">
            {direction === "asc" ? "arrow_upward" : "arrow_downward"}
          </span>
        )}
      </button>
    </th>
  );
}

export default function ComboCatalogTable({
  rows,
  sortField,
  sortDirection,
  onSort,
  page,
  pageCount,
  startIndex,
  totalCount,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  testResults,
  activeTestingKey,
  onTestCombo,
  onPrevious,
  onNext,
}: {
  rows: ComboCatalogRow[];
  sortField: ComboSortField;
  sortDirection: ComboSortDirection;
  onSort: (field: ComboSortField) => void;
  page: number;
  pageCount: number;
  startIndex: number;
  totalCount: number;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  testResults: Record<string, CatalogTestResult>;
  activeTestingKey: string | null;
  onTestCombo: (comboName: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const allOnPageSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.id));
  const someOnPageSelected = rows.some((row) => selectedIds.has(row.id)) && !allOnPageSelected;

  const firstResult = startIndex + 1;
  const lastResult = startIndex + rows.length;

  return (
    <>
      <div className="overflow-x-auto" role="region" aria-label="Combos catalog table" tabIndex={0}>
        <table className="min-w-[900px] w-full border-collapse text-sm">
          <caption className="sr-only">Combos catalog with health test results</caption>
          <thead className="border-b border-border bg-black/[0.02] dark:bg-white/[0.02]">
            <tr>
              <th scope="col" className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allOnPageSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someOnPageSelected;
                  }}
                  onChange={onToggleSelectAll}
                  aria-label="Select all combos on this page"
                  className="rounded border-black/20 text-primary focus:ring-primary dark:border-white/20"
                />
              </th>
              <SortableHeading
                field="name"
                label="Combo"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeading
                field="strategy"
                label="Strategy"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeading
                field="memberCount"
                label="Members"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeading
                field="status"
                label="Status"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted"
              >
                Health Test
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((combo) => {
              const isSelected = selectedIds.has(combo.id);
              const testKey = getComboTestKey(combo.name);
              const isTesting = activeTestingKey === testKey;
              const result = testResults[testKey];

              return (
                <tr
                  key={combo.id}
                  className={`align-top transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] ${
                    isSelected ? "bg-primary/[0.03]" : ""
                  }`}
                >
                  <td className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(combo.id)}
                      aria-label={`Select combo ${combo.name}`}
                      className="rounded border-black/20 text-primary focus:ring-primary dark:border-white/20"
                    />
                  </td>
                  <td className="max-w-sm px-4 py-3">
                    <div className="font-medium text-text-main">{combo.displayName}</div>
                    {combo.displayName !== combo.name && (
                      <span className="font-mono text-xs text-text-muted">{combo.name}</span>
                    )}
                    {combo.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-text-muted">
                        {combo.description}
                      </p>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Badge size="sm" variant="default">
                      {humanize(combo.strategy)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium tabular-nums text-text-main">
                      {combo.memberCount} {combo.memberCount === 1 ? "model" : "models"}
                    </span>
                    {combo.models.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {combo.models.slice(0, 3).map((m, idx) => (
                          <span
                            key={idx}
                            className="inline-block max-w-[150px] truncate rounded bg-black/5 px-1.5 py-0.5 font-mono text-[10px] text-text-muted dark:bg-white/5"
                            title={m.model}
                          >
                            {m.label || m.model.split("/").pop()}
                          </span>
                        ))}
                        {combo.models.length > 3 && (
                          <span className="text-[10px] text-text-muted">
                            +{combo.models.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Badge size="sm" variant={combo.status === "active" ? "success" : "default"}>
                      {combo.status === "active" ? "Active" : "Paused"}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <CatalogTestBadge result={result} loading={isTesting} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={isTesting}
                      onClick={() => onTestCombo(combo.name)}
                      data-testid={`test-combo-${combo.name}`}
                    >
                      Test
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-muted" aria-live="polite">
          Showing {formatCount(firstResult)}–{formatCount(lastResult)} of {formatCount(totalCount)}
          {" combos"}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted">
            Page {page} of {pageCount}
          </span>
          <Button variant="secondary" size="sm" disabled={page === 1} onClick={onPrevious}>
            Previous
          </Button>
          <Button variant="secondary" size="sm" disabled={page >= pageCount} onClick={onNext}>
            Next
          </Button>
        </div>
      </footer>
    </>
  );
}
