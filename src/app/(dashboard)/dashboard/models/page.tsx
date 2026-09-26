"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Button, Card } from "@/shared/components";
import CatalogBulkActionBar from "./CatalogBulkActionBar";
import ComboCatalogFiltersComponent from "./ComboCatalogFilters";
import ComboCatalogTable from "./ComboCatalogTable";
import {
  filterCatalogCombos,
  flattenCombos,
  getComboCatalogPage,
  sortCatalogCombos,
  type ComboCatalogFilters,
  type ComboCatalogRow,
  type ComboSortDirection,
  type ComboSortField,
} from "./comboCatalogUtils";
import ModelCatalogFiltersComponent from "./ModelCatalogFilters";
import ModelCatalogTable from "./ModelCatalogTable";
import {
  extractCatalogCapabilities,
  filterCatalogModels,
  flattenCatalog,
  getCatalogPage,
  sortCatalogModels,
  type CatalogFilters,
  type CatalogModelRow,
  type CatalogSortDirection,
  type CatalogSortField,
} from "./modelCatalogUtils";
import { useCatalogTestRunner } from "./useCatalogTestRunner";

const PAGE_SIZE = 50;

type Translator = ((key: string) => string) & { has?: (key: string) => boolean };

function commonText(translator: Translator, key: string, fallback: string): string {
  return typeof translator.has === "function" && translator.has(key) ? translator(key) : fallback;
}

type CatalogTab = "models" | "combos";

function getUrlParams(): URLSearchParams {
  if (typeof window !== "undefined") {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
}

function setUrlParams(params: URLSearchParams) {
  if (typeof window !== "undefined") {
    const query = params.toString();
    const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }
}

function parseInitialModelFilters(params: URLSearchParams): CatalogFilters {
  return {
    query: params.get("query") || "",
    providerId: params.get("provider") || "all",
    type: params.get("type") || "all",
    subtype: params.get("subtype") || "all",
    capability: params.get("capability") || "all",
    pricing: params.get("pricing") || "all",
    providerHealth: params.get("health") || "all",
    testResult: params.get("testResult") || "all",
    minContextLength: params.get("minContext") ? Number(params.get("minContext")) : undefined,
    minMaxOutputTokens: params.get("minOutput") ? Number(params.get("minOutput")) : undefined,
  };
}

function parseInitialComboFilters(
  params: URLSearchParams,
  tabParam: string | null
): ComboCatalogFilters {
  return {
    query: params.get("cQuery") || (tabParam === "combos" ? params.get("query") || "" : ""),
    strategy: params.get("strategy") || "all",
    status: params.get("status") || "all",
    testResult:
      params.get("cTestResult") ||
      (tabParam === "combos" ? params.get("testResult") || "all" : "all"),
    minMembers: params.get("minMembers") ? Number(params.get("minMembers")) : undefined,
    maxMembers: params.get("maxMembers") ? Number(params.get("maxMembers")) : undefined,
  };
}

export default function ModelCatalogPage() {
  const commonTranslator = useTranslations("common") as unknown as Translator;

  // Active Tab
  const [activeTab, setActiveTab] = useState<CatalogTab>(() => {
    const params = getUrlParams();
    const tabParam = params.get("tab");
    return tabParam === "combos" ? "combos" : "models";
  });

  // Models State
  const [models, setModels] = useState<CatalogModelRow[]>([]);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [modelsError, setModelsError] = useState(false);
  const [modelSortField, setModelSortField] = useState<CatalogSortField>("provider");
  const [modelSortDirection, setModelSortDirection] = useState<CatalogSortDirection>("asc");
  const [requestedModelPage, setRequestedModelPage] = useState(0);
  const [selectedModelIds, setSelectedModelIds] = useState<Set<string>>(new Set());

  // Combos State
  const [combos, setCombos] = useState<ComboCatalogRow[]>([]);
  const [combosLoading, setCombosLoading] = useState(true);
  const [combosError, setCombosError] = useState(false);
  const [comboSortField, setComboSortField] = useState<ComboSortField>("name");
  const [comboSortDirection, setComboSortDirection] = useState<ComboSortDirection>("asc");
  const [requestedComboPage, setRequestedComboPage] = useState(0);
  const [selectedComboIds, setSelectedComboIds] = useState<Set<string>>(new Set());

  // Provider Health State
  const [providerHealthMap, setProviderHealthMap] = useState<
    Record<string, "healthy" | "degraded" | "down">
  >({});

  // Model Filters
  const [modelFilters, setModelFilters] = useState<CatalogFilters>(() =>
    parseInitialModelFilters(getUrlParams())
  );

  // Combo Filters
  const [comboFilters, setComboFilters] = useState<ComboCatalogFilters>(() => {
    const params = getUrlParams();
    return parseInitialComboFilters(params, params.get("tab"));
  });

  // Test Runner Hook
  const {
    testResults,
    running,
    activeItemKey,
    progress,
    testSingleModel,
    testSingleCombo,
    testBulkModels,
    testBulkCombos,
    cancelTest,
    clearResults,
  } = useCatalogTestRunner();

  const requestController = useRef<AbortController | null>(null);

  // Sync state with browser navigation (Back / Forward)
  useEffect(() => {
    const handlePopState = () => {
      const params = getUrlParams();
      const tabParam = params.get("tab");
      setActiveTab(tabParam === "combos" ? "combos" : "models");
      setModelFilters(parseInitialModelFilters(params));
      setComboFilters(parseInitialComboFilters(params, tabParam));
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Sync state to URL search parameters
  const syncUrlParams = useCallback(
    (tab: CatalogTab, mFilters: CatalogFilters, cFilters: ComboCatalogFilters) => {
      const params = new URLSearchParams();
      if (tab === "combos") {
        params.set("tab", "combos");
      }

      if (tab === "models") {
        if (mFilters.query) params.set("query", mFilters.query);
        if (mFilters.providerId !== "all") params.set("provider", mFilters.providerId);
        if (mFilters.type !== "all") params.set("type", mFilters.type);
        if (mFilters.subtype && mFilters.subtype !== "all") params.set("subtype", mFilters.subtype);
        if (mFilters.capability && mFilters.capability !== "all")
          params.set("capability", mFilters.capability);
        if (mFilters.pricing && mFilters.pricing !== "all") params.set("pricing", mFilters.pricing);
        if (mFilters.providerHealth && mFilters.providerHealth !== "all")
          params.set("health", mFilters.providerHealth);
        if (mFilters.testResult && mFilters.testResult !== "all")
          params.set("testResult", mFilters.testResult);
        if (typeof mFilters.minContextLength === "number")
          params.set("minContext", String(mFilters.minContextLength));
        if (typeof mFilters.minMaxOutputTokens === "number")
          params.set("minOutput", String(mFilters.minMaxOutputTokens));
      } else {
        if (cFilters.query) params.set("query", cFilters.query);
        if (cFilters.strategy !== "all") params.set("strategy", cFilters.strategy);
        if (cFilters.status !== "all") params.set("status", cFilters.status);
        if (cFilters.testResult !== "all") params.set("testResult", cFilters.testResult);
        if (typeof cFilters.minMembers === "number")
          params.set("minMembers", String(cFilters.minMembers));
        if (typeof cFilters.maxMembers === "number")
          params.set("maxMembers", String(cFilters.maxMembers));
      }

      setUrlParams(params);
    },
    []
  );

  const switchTab = (tab: CatalogTab) => {
    setActiveTab(tab);
    syncUrlParams(tab, modelFilters, comboFilters);
  };

  const updateModelFilters = (patch: Partial<CatalogFilters>) => {
    const updated = { ...modelFilters, ...patch };
    setModelFilters(updated);
    setRequestedModelPage(0);
    syncUrlParams("models", updated, comboFilters);
  };

  const clearModelFilters = () => {
    const cleared: CatalogFilters = {
      query: "",
      providerId: "all",
      type: "all",
      subtype: "all",
      capability: "all",
      pricing: "all",
      providerHealth: "all",
      testResult: "all",
      minContextLength: undefined,
      minMaxOutputTokens: undefined,
    };
    setModelFilters(cleared);
    setRequestedModelPage(0);
    syncUrlParams("models", cleared, comboFilters);
  };

  const updateComboFilters = (patch: Partial<ComboCatalogFilters>) => {
    const updated = { ...comboFilters, ...patch };
    setComboFilters(updated);
    setRequestedComboPage(0);
    syncUrlParams("combos", modelFilters, updated);
  };

  const clearComboFilters = () => {
    const cleared: ComboCatalogFilters = {
      query: "",
      strategy: "all",
      status: "all",
      testResult: "all",
      minMembers: undefined,
      maxMembers: undefined,
    };
    setComboFilters(cleared);
    setRequestedComboPage(0);
    syncUrlParams("combos", modelFilters, cleared);
  };

  // Data Loading
  const loadData = useCallback(async () => {
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;

    // Load models
    const fetchModels = async () => {
      try {
        const response = await fetch("/api/models/catalog", { signal: controller.signal });
        if (!response.ok) throw new Error("catalog request failed");
        const payload: unknown = await response.json();
        const catalog =
          typeof payload === "object" && payload !== null && "catalog" in payload
            ? (payload as { catalog: unknown }).catalog
            : null;
        setModels(flattenCatalog(catalog));
        setModelsError(false);
      } catch {
        if (!controller.signal.aborted) setModelsError(true);
      } finally {
        if (!controller.signal.aborted) setModelsLoading(false);
      }
    };

    // Load combos
    const fetchCombos = async () => {
      try {
        const response = await fetch("/api/combos", { signal: controller.signal });
        if (!response.ok) throw new Error("combos request failed");
        const payload: unknown = await response.json();
        const rawCombos =
          typeof payload === "object" && payload !== null && "combos" in payload
            ? (payload as { combos: unknown }).combos
            : null;
        setCombos(flattenCombos(rawCombos));
        setCombosError(false);
      } catch {
        if (!controller.signal.aborted) setCombosError(true);
      } finally {
        if (!controller.signal.aborted) setCombosLoading(false);
      }
    };

    // Load provider health matrix
    const fetchHealth = async () => {
      try {
        const response = await fetch("/api/providers/health-matrix", { signal: controller.signal });
        if (!response.ok) return;
        const payload: unknown = await response.json();
        if (typeof payload === "object" && payload !== null && "providers" in payload) {
          const list = (
            payload as {
              providers: Array<{ provider: string; state: "healthy" | "degraded" | "down" }>;
            }
          ).providers;
          const map: Record<string, "healthy" | "degraded" | "down"> = {};
          for (const item of list || []) {
            if (item.provider) map[item.provider] = item.state;
          }
          setProviderHealthMap(map);
        }
      } catch {
        // Soft fail
      }
    };

    await Promise.allSettled([fetchModels(), fetchCombos(), fetchHealth()]);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadData();
    }, 0);
    return () => {
      window.clearTimeout(timer);
      requestController.current?.abort();
    };
  }, [loadData]);

  const refreshAll = useCallback(() => {
    setModelsLoading(true);
    setCombosLoading(true);
    setModelsError(false);
    setCombosError(false);
    void loadData();
  }, [loadData]);

  // Derived filter options for models
  const providerOptions = useMemo(
    () =>
      [...new Map(models.map((m) => [m.providerId, m.provider])).entries()].sort(
        ([left], [right]) => left.localeCompare(right)
      ),
    [models]
  );
  const typeOptions = useMemo(
    () => [...new Set(models.map((m) => m.type))].sort((a, b) => a.localeCompare(b)),
    [models]
  );
  const subtypeOptions = useMemo(
    () =>
      [...new Set(models.map((m) => m.subtype).filter((s): s is string => Boolean(s)))].sort(
        (a, b) => a.localeCompare(b)
      ),
    [models]
  );
  const capabilityOptions = useMemo(() => extractCatalogCapabilities(models), [models]);

  // Derived filter options for combos
  const strategyOptions = useMemo(
    () => [...new Set(combos.map((c) => c.strategy))].sort((a, b) => a.localeCompare(b)),
    [combos]
  );

  // Filtered & Sorted Models
  const visibleModels = useMemo(() => {
    const filtered = filterCatalogModels(models, modelFilters, {
      providerHealthMap,
      testResults,
    });
    return sortCatalogModels(filtered, modelSortField, modelSortDirection);
  }, [models, modelFilters, providerHealthMap, testResults, modelSortField, modelSortDirection]);
  const modelPage = getCatalogPage(visibleModels, requestedModelPage, PAGE_SIZE);

  // Filtered & Sorted Combos
  const visibleCombos = useMemo(() => {
    const filtered = filterCatalogCombos(combos, comboFilters, testResults);
    return sortCatalogCombos(filtered, comboSortField, comboSortDirection);
  }, [combos, comboFilters, testResults, comboSortField, comboSortDirection]);
  const comboPage = getComboCatalogPage(visibleCombos, requestedComboPage, PAGE_SIZE);

  // Selection handlers for models
  const toggleSelectModel = (id: string) => {
    setSelectedModelIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllModelsOnPage = () => {
    const pageIds = modelPage.rows.map((r) => `${r.providerId}:${r.id}`);
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedModelIds.has(id));
    setSelectedModelIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        for (const id of pageIds) next.delete(id);
      } else {
        for (const id of pageIds) next.add(id);
      }
      return next;
    });
  };

  // Selection handlers for combos
  const toggleSelectCombo = (id: string) => {
    setSelectedComboIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllCombosOnPage = () => {
    const pageIds = comboPage.rows.map((r) => r.id);
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedComboIds.has(id));
    setSelectedComboIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        for (const id of pageIds) next.delete(id);
      } else {
        for (const id of pageIds) next.add(id);
      }
      return next;
    });
  };

  // Bulk test triggers
  const handleTestSelected = () => {
    if (activeTab === "models") {
      const selected = models
        .filter((m) => selectedModelIds.has(`${m.providerId}:${m.id}`))
        .map((m) => ({ providerId: m.providerId, modelId: m.id }));
      void testBulkModels(selected);
    } else {
      const selected = combos
        .filter((c) => selectedComboIds.has(c.id))
        .map((c) => ({ comboName: c.name }));
      void testBulkCombos(selected);
    }
  };

  const handleTestAllFiltered = () => {
    if (activeTab === "models") {
      const toTest = visibleModels.map((m) => ({
        providerId: m.providerId,
        modelId: m.id,
      }));
      void testBulkModels(toTest);
    } else {
      const toTest = visibleCombos.map((c) => ({ comboName: c.name }));
      void testBulkCombos(toTest);
    }
  };

  const hasModelFiltersActive =
    modelFilters.query !== "" ||
    modelFilters.providerId !== "all" ||
    modelFilters.type !== "all" ||
    (modelFilters.subtype && modelFilters.subtype !== "all") ||
    (modelFilters.capability && modelFilters.capability !== "all") ||
    (modelFilters.pricing && modelFilters.pricing !== "all") ||
    (modelFilters.providerHealth && modelFilters.providerHealth !== "all") ||
    (modelFilters.testResult && modelFilters.testResult !== "all") ||
    typeof modelFilters.minContextLength === "number" ||
    typeof modelFilters.minMaxOutputTokens === "number";

  const hasComboFiltersActive =
    comboFilters.query !== "" ||
    comboFilters.strategy !== "all" ||
    comboFilters.status !== "all" ||
    comboFilters.testResult !== "all" ||
    typeof comboFilters.minMembers === "number" ||
    typeof comboFilters.maxMembers === "number";

  const hasTestResults = Object.keys(testResults).length > 0;

  const text = (key: string, fallback: string) => commonText(commonTranslator, key, fallback);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-text-main">Models & Combos</h1>
            <p className="mt-1 max-w-3xl text-sm text-text-muted">
              Browse and health-test models and combo routing pipelines across every provider.
            </p>
          </div>
          <Button
            variant="secondary"
            icon="refresh"
            loading={modelsLoading || combosLoading}
            onClick={refreshAll}
          >
            Refresh
          </Button>
        </div>

        {/* Tab Navigation */}
        <div
          role="tablist"
          aria-label="Catalog Sections"
          className="mt-2 flex border-b border-border"
        >
          <button
            role="tab"
            id="tab-models"
            aria-selected={activeTab === "models"}
            aria-controls="panel-models"
            tabIndex={activeTab === "models" ? 0 : -1}
            onClick={() => switchTab("models")}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === "models"
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            Models ({models.length})
          </button>
          <button
            role="tab"
            id="tab-combos"
            aria-selected={activeTab === "combos"}
            aria-controls="panel-combos"
            tabIndex={activeTab === "combos" ? 0 : -1}
            onClick={() => switchTab("combos")}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === "combos"
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            Combos ({combos.length})
          </button>
        </div>
      </header>

      {/* Models Tab Content */}
      {activeTab === "models" && (
        <section
          role="tabpanel"
          id="panel-models"
          aria-labelledby="tab-models"
          className="flex flex-col gap-4"
        >
          <Card padding="none" className="overflow-hidden">
            <ModelCatalogFiltersComponent
              filters={modelFilters}
              onChange={updateModelFilters}
              onClear={clearModelFilters}
              providerOptions={providerOptions}
              typeOptions={typeOptions}
              subtypeOptions={subtypeOptions}
              capabilityOptions={capabilityOptions}
              hasActiveFilters={hasModelFiltersActive}
              totalCount={visibleModels.length}
            />

            <CatalogBulkActionBar
              selectedCount={selectedModelIds.size}
              filteredCount={visibleModels.length}
              running={running}
              progress={progress}
              hasTestResults={hasTestResults}
              onTestSelected={handleTestSelected}
              onTestFiltered={handleTestAllFiltered}
              onCancel={cancelTest}
              onClearResults={clearResults}
              entityLabel="models"
            />

            {modelsLoading && models.length === 0 ? (
              <div
                role="status"
                aria-live="polite"
                className="flex min-h-64 items-center justify-center p-8 text-sm text-text-muted"
              >
                {text("loading", "Loading...")}
              </div>
            ) : modelsError && models.length === 0 ? (
              <div
                role="alert"
                className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-center"
              >
                <p className="text-sm text-text-main">Unable to load the model catalog.</p>
                <p className="text-sm text-text-muted">Check the connection and try again.</p>
                <Button variant="secondary" onClick={refreshAll}>
                  {text("retry", "Retry")}
                </Button>
              </div>
            ) : visibleModels.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-2 p-8 text-center">
                <span
                  className="material-symbols-outlined text-3xl text-text-muted"
                  aria-hidden="true"
                >
                  search_off
                </span>
                <p className="font-medium text-text-main">
                  {models.length === 0
                    ? text("noModelsFound", "No models are available yet.")
                    : "No models match these filters."}
                </p>
                {models.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearModelFilters}>
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              <ModelCatalogTable
                rows={modelPage.rows}
                sortField={modelSortField}
                sortDirection={modelSortDirection}
                onSort={(field) => {
                  if (field === modelSortField) {
                    setModelSortDirection((curr) => (curr === "asc" ? "desc" : "asc"));
                  } else {
                    setModelSortField(field);
                    setModelSortDirection("asc");
                  }
                  setRequestedModelPage(0);
                }}
                page={modelPage.page + 1}
                pageCount={modelPage.pageCount}
                startIndex={modelPage.page * PAGE_SIZE}
                totalCount={visibleModels.length}
                loading={modelsLoading}
                error={modelsError}
                onPrevious={() => setRequestedModelPage((c) => Math.max(0, c - 1))}
                onNext={() =>
                  setRequestedModelPage((c) => Math.min(modelPage.pageCount - 1, c + 1))
                }
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
                selectedIds={selectedModelIds}
                onToggleSelect={toggleSelectModel}
                onToggleSelectAll={toggleSelectAllModelsOnPage}
                testResults={testResults}
                activeTestingKey={activeItemKey}
                onTestModel={testSingleModel}
                providerHealthMap={providerHealthMap}
              />
            )}
          </Card>
        </section>
      )}

      {/* Combos Tab Content */}
      {activeTab === "combos" && (
        <section
          role="tabpanel"
          id="panel-combos"
          aria-labelledby="tab-combos"
          className="flex flex-col gap-4"
        >
          <Card padding="none" className="overflow-hidden">
            <ComboCatalogFiltersComponent
              filters={comboFilters}
              onChange={updateComboFilters}
              onClear={clearComboFilters}
              strategyOptions={strategyOptions}
              hasActiveFilters={hasComboFiltersActive}
              totalCount={visibleCombos.length}
            />

            <CatalogBulkActionBar
              selectedCount={selectedComboIds.size}
              filteredCount={visibleCombos.length}
              running={running}
              progress={progress}
              hasTestResults={hasTestResults}
              onTestSelected={handleTestSelected}
              onTestFiltered={handleTestAllFiltered}
              onCancel={cancelTest}
              onClearResults={clearResults}
              entityLabel="combos"
            />

            {combosLoading && combos.length === 0 ? (
              <div
                role="status"
                aria-live="polite"
                className="flex min-h-64 items-center justify-center p-8 text-sm text-text-muted"
              >
                {text("loading", "Loading...")}
              </div>
            ) : combosError && combos.length === 0 ? (
              <div
                role="alert"
                className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-center"
              >
                <p className="text-sm text-text-main">Unable to load combos.</p>
                <p className="text-sm text-text-muted">Check the connection and try again.</p>
                <Button variant="secondary" onClick={refreshAll}>
                  {text("retry", "Retry")}
                </Button>
              </div>
            ) : visibleCombos.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-2 p-8 text-center">
                <span
                  className="material-symbols-outlined text-3xl text-text-muted"
                  aria-hidden="true"
                >
                  search_off
                </span>
                <p className="font-medium text-text-main">
                  {combos.length === 0
                    ? "No combos are available yet."
                    : "No combos match these filters."}
                </p>
                {combos.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearComboFilters}>
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              <ComboCatalogTable
                rows={comboPage.rows}
                sortField={comboSortField}
                sortDirection={comboSortDirection}
                onSort={(field) => {
                  if (field === comboSortField) {
                    setComboSortDirection((curr) => (curr === "asc" ? "desc" : "asc"));
                  } else {
                    setComboSortField(field);
                    setComboSortDirection("asc");
                  }
                  setRequestedComboPage(0);
                }}
                page={comboPage.page + 1}
                pageCount={comboPage.pageCount}
                startIndex={comboPage.page * PAGE_SIZE}
                totalCount={visibleCombos.length}
                selectedIds={selectedComboIds}
                onToggleSelect={toggleSelectCombo}
                onToggleSelectAll={toggleSelectAllCombosOnPage}
                testResults={testResults}
                activeTestingKey={activeItemKey}
                onTestCombo={testSingleCombo}
                onPrevious={() => setRequestedComboPage((c) => Math.max(0, c - 1))}
                onNext={() =>
                  setRequestedComboPage((c) => Math.min(comboPage.pageCount - 1, c + 1))
                }
              />
            )}
          </Card>
        </section>
      )}
    </div>
  );
}
