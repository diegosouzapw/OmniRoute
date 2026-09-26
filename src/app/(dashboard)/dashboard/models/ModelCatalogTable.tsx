"use client";

import { useTranslations } from "next-intl";
import { Badge, Button } from "@/shared/components";
import CatalogTestBadge from "./CatalogTestBadge";
import type { CatalogTestResult } from "./catalogTestStorage";
import { getModelTestKey } from "./catalogTestStorage";
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

function capabilityLabels(
  model: CatalogModelRow,
  labelsByDirection: { input: string; output: string }
): string[] {
  const labels = Object.entries(model.capabilities ?? {}).flatMap(([key, value]) => {
    if (value === true) return [humanize(key)];
    if (Array.isArray(value)) {
      return value.filter((entry): entry is string => typeof entry === "string");
    }
    return [];
  });

  for (const modality of model.input_modalities ?? [])
    labels.push(`${labelsByDirection.input}: ${humanize(modality)}`);
  for (const modality of model.output_modalities ?? [])
    labels.push(`${labelsByDirection.output}: ${humanize(modality)}`);
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
  selectedIds = new Set(),
  onToggleSelect,
  onToggleSelectAll,
  testResults = {},
  activeTestingKeys = new Set<string>(),
  onTestModel,
  renderKeyAccess,
  providerHealthMap = {},
  bulkRunning = false,
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
  selectedIds?: Set<string>;
  onToggleSelect?: (id: string) => void;
  onToggleSelectAll?: () => void;
  testResults?: Record<string, CatalogTestResult>;
  activeTestingKeys?: ReadonlySet<string>;
  renderKeyAccess?: (model: CatalogModelRow) => import("react").ReactNode;
  onTestModel?: (providerId: string, modelId: string) => void;
  providerHealthMap?: Record<string, "healthy" | "degraded" | "down">;
  /** A bulk run owns the runner; per-row tests wait until it ends. */
  bulkRunning?: boolean;
}) {
  const t = useTranslations("modelCatalog");
  const common = useTranslations("common");
  const firstResult = startIndex + 1;
  const lastResult = startIndex + rows.length;

  const rowIds = rows.map((r) => `${r.providerId}:${r.id}`);
  const allOnPageSelected = rowIds.length > 0 && rowIds.every((id) => selectedIds.has(id));
  const someOnPageSelected = rowIds.some((id) => selectedIds.has(id)) && !allOnPageSelected;

  return (
    <>
      <div className="overflow-x-auto" role="region" aria-label={t("tableRegion")} tabIndex={0}>
        <table className="min-w-[1100px] w-full border-collapse text-sm">
          <caption className="sr-only">{t("tableCaption")}</caption>
          <thead className="border-b border-border bg-black/[0.02] dark:bg-white/[0.02]">
            <tr>
              {onToggleSelectAll && (
                <th scope="col" className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someOnPageSelected;
                    }}
                    onChange={onToggleSelectAll}
                    aria-label={t("selectAllModels")}
                    className="rounded border-black/20 text-primary focus:ring-primary dark:border-white/20"
                  />
                </th>
              )}
              <SortableHeading
                field="provider"
                label={labels.provider || t("provider")}
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeading
                field="id"
                label={labels.model || t("model")}
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeading
                field="type"
                label={labels.type || t("type")}
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted"
              >
                {labels.capabilities || t("capabilities")}
              </th>
              <SortableHeading
                field="context_length"
                label={labels.context || t("context")}
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <SortableHeading
                field="max_output_tokens"
                label={labels.output || t("output")}
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              />
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted"
              >
                {labels.flags || t("flags")}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted"
              >
                {t("healthTest")}
              </th>
              {onTestModel && (
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted"
                >
                  {t("actions")}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((model) => {
              const rowId = `${model.providerId}:${model.id}`;
              const isSelected = selectedIds.has(rowId);
              const testKey = getModelTestKey(model.providerId, model.id);
              const isTesting = activeTestingKeys.has(testKey);
              const result = testResults[testKey];
              const providerHealth = providerHealthMap[model.providerId];

              const capabilities = capabilityLabels(model, {
                input: common("input"),
                output: common("output"),
              });
              const additionalCapabilities = capabilities.slice(3);
              return (
                <tr
                  key={rowId}
                  className={`align-top transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] ${
                    isSelected ? "bg-primary/[0.03]" : ""
                  }`}
                >
                  {onToggleSelect && (
                    <td className="w-10 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(rowId)}
                        aria-label={t("selectModel", { name: model.name })}
                        className="rounded border-black/20 text-primary focus:ring-primary dark:border-white/20"
                      />
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-text-main">{model.provider}</span>
                      {providerHealth && providerHealth !== "healthy" && (
                        <Badge
                          size="sm"
                          variant={providerHealth === "degraded" ? "warning" : "error"}
                          dot
                        >
                          {providerHealth === "degraded" ? t("degraded") : t("down")}
                        </Badge>
                      )}
                    </div>
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
                            aria-label={t("additionalCapabilities", {
                              list: additionalCapabilities.join(", "),
                            })}
                            title={additionalCapabilities.join(", ")}
                          >
                            <Badge size="sm" variant="default">
                              +{additionalCapabilities.length}
                            </Badge>
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-text-muted" title={t("noCapabilities")}>
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
                          {labels.custom || t("custom")}
                        </Badge>
                      )}
                      {model.free === true && (
                        <Badge size="sm" variant="success">
                          {labels.free || t("free")}
                        </Badge>
                      )}
                      {model.custom !== true && model.free !== true && (
                        <span className="text-text-muted" title={t("noFlags")}>
                          —
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <CatalogTestBadge result={result} loading={isTesting} />
                  </td>
                  {onTestModel && (
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      {renderKeyAccess?.(model)}
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={isTesting || bulkRunning}
                        onClick={() => onTestModel(model.providerId, model.id)}
                        data-testid={`test-model-${model.id}`}
                      >
                        {t("test")}
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-muted" aria-live="polite">
          {t("showingModels", {
            first: formatCount(firstResult),
            last: formatCount(lastResult),
            total: formatCount(totalCount),
          })}
          {loading && <span className="ml-2">{t("refreshing")}</span>}
          {error && <span className="ml-2 text-red-500">{t("refreshFailed")}</span>}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted">{t("page", { page, pageCount })}</span>
          <Button variant="secondary" size="sm" disabled={page === 1} onClick={onPrevious}>
            {t("previous")}
          </Button>
          <Button variant="secondary" size="sm" disabled={page >= pageCount} onClick={onNext}>
            {t("next")}
          </Button>
        </div>
      </footer>
    </>
  );
}
