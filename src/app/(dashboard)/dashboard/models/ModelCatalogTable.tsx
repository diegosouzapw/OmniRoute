import { Badge, Button } from "@/shared/components";
import type { CatalogModelRow, CatalogSortDirection, CatalogSortField } from "./modelCatalogUtils";

function formatCount(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function formatOptionalCount(value: number | undefined): string {
  return typeof value === "number" ? formatCount(value) : "—";
}

function humanize(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll(/[_-]+/g, " ")
    .replace(/^\w/, (first) => first.toUpperCase());
}

function capabilityLabels(model: CatalogModelRow): string[] {
  const labels = Object.entries(model.capabilities ?? {}).flatMap(([key, value]) => {
    if (value === true) return [humanize(key)];
    if (Array.isArray(value)) {
      return value.filter((entry): entry is string => typeof entry === "string");
    }
    return [];
  });

  for (const modality of model.input_modalities ?? []) labels.push(`${humanize(modality)} input`);
  for (const modality of model.output_modalities ?? []) labels.push(`${humanize(modality)} output`);
  return [...new Set(labels)];
}

function SortableHeading({
  field,
  label,
  activeField,
  direction,
  onSort,
}: {
  field: CatalogSortField;
  label: string;
  activeField: CatalogSortField;
  direction: CatalogSortDirection;
  onSort: (field: CatalogSortField) => void;
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

export default function ModelCatalogTable({
  rows,
  sortField,
  sortDirection,
  onSort,
  page,
  pageCount,
  startIndex,
  totalCount,
  loading,
  error,
  onPrevious,
  onNext,
  labels,
}: {
  rows: CatalogModelRow[];
  sortField: CatalogSortField;
  sortDirection: CatalogSortDirection;
  onSort: (field: CatalogSortField) => void;
  page: number;
  pageCount: number;
  startIndex: number;
  totalCount: number;
  loading: boolean;
  error: boolean;
  onPrevious: () => void;
  onNext: () => void;
  labels: {
    provider: string;
    model: string;
    type: string;
    capabilities: string;
    context: string;
    output: string;
    flags: string;
    custom: string;
    free: string;
  };
}) {
  const firstResult = startIndex + 1;
  const lastResult = startIndex + rows.length;

  return (
    <>
      <div className="overflow-x-auto" role="region" aria-label="Model catalog table" tabIndex={0}>
        <table className="min-w-[1040px] w-full border-collapse text-sm">
          <caption className="sr-only">Model catalog across all providers</caption>
          <thead className="border-b border-border bg-black/[0.02] dark:bg-white/[0.02]">
            <tr>
              <SortableHeading
                field="provider"
                label={labels.provider}
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeading
                field="id"
                label={labels.model}
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeading
                field="type"
                label={labels.type}
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted"
              >
                {labels.capabilities}
              </th>
              <SortableHeading
                field="context_length"
                label={labels.context}
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeading
                field="max_output_tokens"
                label={labels.output}
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted"
              >
                {labels.flags}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((model) => {
              const capabilities = capabilityLabels(model);
              const additionalCapabilities = capabilities.slice(3);
              return (
                <tr
                  key={`${model.providerId}:${model.id}`}
                  className="align-top hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-text-main">{model.provider}</span>
                    <span className="mt-0.5 block font-mono text-xs text-text-muted">
                      {model.providerId}
                    </span>
                  </td>
                  <td className="max-w-sm px-4 py-3">
                    <span className="block break-words font-medium text-text-main">
                      {model.name}
                    </span>
                    <span className="mt-0.5 block break-all font-mono text-xs text-text-muted">
                      {model.id}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-main">
                    {humanize(model.type)}
                    {model.subtype && (
                      <span className="mt-0.5 block text-xs text-text-muted">
                        {humanize(model.subtype)}
                      </span>
                    )}
                  </td>
                  <td className="max-w-xs px-4 py-3">
                    {capabilities.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {capabilities.slice(0, 3).map((capability) => (
                          <Badge key={capability} size="sm" variant="default">
                            {capability}
                          </Badge>
                        ))}
                        {additionalCapabilities.length > 0 && (
                          <span
                            role="img"
                            aria-label={`Additional capabilities: ${additionalCapabilities.join(", ")}`}
                            title={additionalCapabilities.join(", ")}
                          >
                            <Badge size="sm" variant="default">
                              +{additionalCapabilities.length}
                            </Badge>
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-text-muted" title="No capability metadata reported">
                        —
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-text-main">
                    {formatOptionalCount(model.context_length)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-text-main">
                    {formatOptionalCount(model.max_output_tokens)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {model.custom === true && (
                        <Badge size="sm" variant="info">
                          {labels.custom}
                        </Badge>
                      )}
                      {model.free === true && (
                        <Badge size="sm" variant="success">
                          {labels.free}
                        </Badge>
                      )}
                      {model.custom !== true && model.free !== true && (
                        <span className="text-text-muted" title="No price or source flag reported">
                          —
                        </span>
                      )}
                    </div>
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
          {" models"}
          {loading && <span className="ml-2">Refreshing…</span>}
          {error && (
            <span className="ml-2 text-red-500">
              Refresh failed. Showing the last loaded catalog.
            </span>
          )}
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
