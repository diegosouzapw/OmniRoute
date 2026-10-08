"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Button, Card, Input } from "@/shared/components";
import {
  filterCatalogModels,
  flattenCatalog,
  getCatalogPage,
  sortCatalogModels,
  type CatalogModelRow,
  type CatalogSortDirection,
  type CatalogSortField,
} from "./modelCatalogUtils";
import ModelCatalogTable from "./ModelCatalogTable";

const PAGE_SIZE = 50;

type Translator = ((key: string) => string) & { has?: (key: string) => boolean };

function commonText(translator: Translator, key: string, fallback: string): string {
  return typeof translator.has === "function" && translator.has(key) ? translator(key) : fallback;
}

export default function ModelCatalogPage() {
  const commonTranslator = useTranslations("common") as unknown as Translator;
  const providersTranslator = useTranslations("providers") as unknown as Translator;
  const [models, setModels] = useState<CatalogModelRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [providerId, setProviderId] = useState("all");
  const [modelType, setModelType] = useState("all");
  const [sortField, setSortField] = useState<CatalogSortField>("provider");
  const [sortDirection, setSortDirection] = useState<CatalogSortDirection>("asc");
  const [requestedPage, setRequestedPage] = useState(0);
  const requestController = useRef<AbortController | null>(null);

  const loadCatalog = useCallback(async () => {
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;

    try {
      const response = await fetch("/api/models/catalog", { signal: controller.signal });
      if (!response.ok) throw new Error("catalog request failed");
      const payload: unknown = await response.json();
      const catalog =
        typeof payload === "object" && payload !== null && "catalog" in payload
          ? payload.catalog
          : null;
      setModels(flattenCatalog(catalog));
      setError(false);
    } catch {
      if (!controller.signal.aborted) setError(true);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialFetch = window.setTimeout(() => {
      void loadCatalog();
    }, 0);
    return () => {
      window.clearTimeout(initialFetch);
      requestController.current?.abort();
    };
  }, [loadCatalog]);

  const refreshCatalog = useCallback(() => {
    setLoading(true);
    setError(false);
    void loadCatalog();
  }, [loadCatalog]);

  const providerOptions = useMemo(
    () =>
      [...new Map(models.map((model) => [model.providerId, model.provider])).entries()].sort(
        ([left], [right]) => left.localeCompare(right)
      ),
    [models]
  );
  const typeOptions = useMemo(
    () =>
      [...new Set(models.map((model) => model.type))].sort((left, right) =>
        left.localeCompare(right)
      ),
    [models]
  );

  const visibleModels = useMemo(() => {
    const filtered = filterCatalogModels(models, { query, providerId, type: modelType });
    return sortCatalogModels(filtered, sortField, sortDirection);
  }, [models, modelType, providerId, query, sortDirection, sortField]);
  const page = getCatalogPage(visibleModels, requestedPage, PAGE_SIZE);

  const updateQuery = (value: string) => {
    setQuery(value);
    setRequestedPage(0);
  };

  const updateProvider = (value: string) => {
    setProviderId(value);
    setRequestedPage(0);
  };

  const updateType = (value: string) => {
    setModelType(value);
    setRequestedPage(0);
  };

  const handleSort = (field: CatalogSortField) => {
    if (field === sortField) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setRequestedPage(0);
  };

  const text = (key: string, fallback: string) => commonText(commonTranslator, key, fallback);
  const providerText = (key: string, fallback: string) =>
    commonText(providersTranslator, key, fallback);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-text-main">Model catalog</h1>
            <p className="mt-1 max-w-3xl text-sm text-text-muted">
              Browse model metadata from every provider in one place.
            </p>
          </div>
          <Button variant="secondary" icon="refresh" loading={loading} onClick={refreshCatalog}>
            Refresh
          </Button>
        </div>
      </header>

      <Card padding="none" className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-border p-4 lg:flex-row lg:items-end">
          <Input
            label={text("search", "Search models")}
            icon="search"
            placeholder="Search by model, provider, or capability"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            className="min-w-0 flex-1"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:w-[24rem]">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-text-main">
              {text("provider", "Provider")}
              <select
                value={providerId}
                onChange={(event) => updateProvider(event.target.value)}
                className="h-10 w-full rounded-control border border-black/10 bg-white px-3 text-sm text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
              >
                <option value="all">{providerText("allProviders", "All providers")}</option>
                {providerOptions.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-text-main">
              {text("type", "Model type")}
              <select
                value={modelType}
                onChange={(event) => updateType(event.target.value)}
                className="h-10 w-full rounded-control border border-black/10 bg-white px-3 text-sm text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-white/5"
              >
                <option value="all">All types</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type.replaceAll(/[_-]+/g, " ").replace(/^\w/, (first) => first.toUpperCase())}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {loading && models.length === 0 ? (
          <div
            role="status"
            aria-live="polite"
            className="flex min-h-64 items-center justify-center p-8 text-sm text-text-muted"
          >
            {text("loading", "Loading...")}
          </div>
        ) : error && models.length === 0 ? (
          <div
            role="alert"
            className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-center"
          >
            <p className="text-sm text-text-main">Unable to load the model catalog.</p>
            <p className="text-sm text-text-muted">Check the connection and try again.</p>
            <Button variant="secondary" onClick={refreshCatalog}>
              {text("retry", "Retry")}
            </Button>
          </div>
        ) : visibleModels.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-2 p-8 text-center">
            <span className="material-symbols-outlined text-3xl text-text-muted" aria-hidden="true">
              search_off
            </span>
            <p className="font-medium text-text-main">
              {models.length === 0
                ? text("noModelsFound", "No models are available yet.")
                : "No models match these filters."}
            </p>
            {models.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  updateQuery("");
                  updateProvider("all");
                  updateType("all");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <ModelCatalogTable
            rows={page.rows}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            page={page.page + 1}
            pageCount={page.pageCount}
            startIndex={page.page * PAGE_SIZE}
            totalCount={visibleModels.length}
            loading={loading}
            error={error}
            onPrevious={() => setRequestedPage((current) => Math.max(0, current - 1))}
            onNext={() => setRequestedPage((current) => Math.min(page.pageCount - 1, current + 1))}
            labels={{
              provider: text("provider", "Provider"),
              model: text("model", "Model"),
              type: text("type", "Type"),
              capabilities: "Capabilities",
              context: "Context",
              output: text("output", "Max output"),
              flags: "Flags",
              custom: text("custom", "Custom"),
              free: text("free", "Free"),
            }}
          />
        )}
      </Card>
    </div>
  );
}
