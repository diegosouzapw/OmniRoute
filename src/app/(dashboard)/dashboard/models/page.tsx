"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Button, Card, ConfirmModal } from "@/shared/components";
import CatalogBulkActionBar from "./CatalogBulkActionBar";
import {
  BULK_CONFIRM_COMBO_THRESHOLD,
  BULK_CONFIRM_MODEL_THRESHOLD,
  dedupeComboTargets,
  dedupeModelTargets,
  type ComboTestTarget,
  type ModelTestTarget,
} from "./catalogBulkUtils";
import CatalogTabs, { catalogPanelId, catalogTabId } from "./CatalogTabs";
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
import {
  buildCatalogSearchParams,
  DEFAULT_COMBO_FILTERS,
  DEFAULT_MODEL_FILTERS,
  hasActiveComboFilters,
  hasActiveModelFilters,
  parseCatalogTab,
  parseComboFilters,
  parseModelFilters,
  restrictComboFiltersToOptions,
  restrictModelFiltersToOptions,
  type CatalogTab,
} from "./catalogUrlState";
import { useCatalogTestRunner } from "./useCatalogTestRunner";

const PAGE_SIZE = 50;

type PendingBulkRun =
  { kind: "models"; targets: ModelTestTarget[] } | { kind: "combos"; targets: ComboTestTarget[] };

/**
 * Mirror the filters into the URL. Browsers rate-limit history updates (Safari throws a
 * SecurityError after 100 calls in 10 s), so unchanged URLs are skipped and a refused update is
 * ignored: the URL is a shareable convenience, never worth taking the page down.
 */
function setUrlParams(params: URLSearchParams) {
  if (typeof window === "undefined") return;
  const query = params.toString();
  const { pathname, search } = window.location;
  const nextUrl = query ? `${pathname}?${query}` : pathname;
  if (nextUrl === `${pathname}${search}`) return;
  try {
    window.history.replaceState(null, "", nextUrl);
  } catch {
    // Rate-limited or refused: keep the current URL; the next change retries.
  }
}

function useCatalogPageState() {
  const t = useTranslations("modelCatalog");

  // URL-driven state starts from the defaults the server renders; the mount effect below
  // applies the real query string, so hydration never sees browser-only values.
  const [activeTab, setActiveTab] = useState<CatalogTab>("models");
  /** True once the query string has been read; the URL is never written before that. */
  const [urlApplied, setUrlApplied] = useState(false);
  const [pendingBulkRun, setPendingBulkRun] = useState<PendingBulkRun | null>(null);

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

  const [rawModelFilters, setModelFilters] = useState<CatalogFilters>(DEFAULT_MODEL_FILTERS);
  const [rawComboFilters, setComboFilters] = useState<ComboCatalogFilters>(DEFAULT_COMBO_FILTERS);

  const runner = useCatalogTestRunner();
  return {
    ...runner,
    activeTab,
    setActiveTab,
    urlApplied,
    setUrlApplied,
    pendingBulkRun,
    setPendingBulkRun,
    models,
    setModels,
    modelsLoading,
    setModelsLoading,
    modelsError,
    setModelsError,
    modelSortField,
    setModelSortField,
    modelSortDirection,
    setModelSortDirection,
    requestedModelPage,
    setRequestedModelPage,
    selectedModelIds,
    setSelectedModelIds,
    combos,
    setCombos,
    combosLoading,
    setCombosLoading,
    combosError,
    setCombosError,
    comboSortField,
    setComboSortField,
    comboSortDirection,
    setComboSortDirection,
    requestedComboPage,
    setRequestedComboPage,
    selectedComboIds,
    setSelectedComboIds,
    providerHealthMap,
    setProviderHealthMap,
    rawModelFilters,
    setModelFilters,
    rawComboFilters,
    setComboFilters,
    t,
  };
}
// Load provider health matrix
async function fetchCatalogHealth(
  controller: AbortController,
  setProviderHealthMap: React.Dispatch<
    React.SetStateAction<Record<string, "healthy" | "degraded" | "down">>
  >
) {
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
}

function useCatalogPageLoading(state: ReturnType<typeof useCatalogPageState>) {
  const {
    setModels,
    setModelsLoading,
    setModelsError,

    setCombos,
    setCombosLoading,
    setCombosError,
    setProviderHealthMap,
  } = state;
  const requestController = useRef<AbortController | null>(null);
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

    const fetchHealth = () => fetchCatalogHealth(controller, setProviderHealthMap);
    await Promise.allSettled([fetchModels(), fetchCombos(), fetchHealth()]);
  }, [
    requestController,
    setCombos,
    setCombosError,
    setCombosLoading,
    setModels,
    setModelsError,
    setModelsLoading,
    setProviderHealthMap,
  ]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadData();
    }, 0);
    return () => {
      window.clearTimeout(timer);
      requestController.current?.abort();
    };
  }, [loadData, requestController]);

  const refreshAll = useCallback(() => {
    setModelsLoading(true);
    setCombosLoading(true);
    setModelsError(false);
    setCombosError(false);
    void loadData();
  }, [loadData, setCombosError, setCombosLoading, setModelsError, setModelsLoading]);

  return { loadData, refreshAll };
}

function useCatalogPageOptions(state: ReturnType<typeof useCatalogPageState>) {
  const { models, combos, rawModelFilters, rawComboFilters } = state;
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

  // Free-form URL values (provider, type, …) are checked against the loaded options, but only
  // while options exist. Loading flags are not enough: a Refresh keeps the previous rows, and a
  // failed load has no options at all, so gating on them would flash an empty table or drop
  // perfectly valid filters from the URL.
  const modelOptionsKnown = models.length > 0;
  const comboOptionsKnown = combos.length > 0;
  const modelFilters = useMemo(
    () =>
      modelOptionsKnown
        ? restrictModelFiltersToOptions(rawModelFilters, {
            providerIds: providerOptions.map(([id]) => id),
            types: typeOptions,
            subtypes: subtypeOptions,
            capabilities: capabilityOptions,
          })
        : rawModelFilters,
    [
      rawModelFilters,
      modelOptionsKnown,
      providerOptions,
      typeOptions,
      subtypeOptions,
      capabilityOptions,
    ]
  );
  const comboFilters = useMemo(
    () =>
      comboOptionsKnown
        ? restrictComboFiltersToOptions(rawComboFilters, strategyOptions)
        : rawComboFilters,
    [rawComboFilters, comboOptionsKnown, strategyOptions]
  );

  return {
    providerOptions,
    typeOptions,
    subtypeOptions,
    capabilityOptions,
    strategyOptions,
    modelOptionsKnown,
    comboOptionsKnown,
    modelFilters,
    comboFilters,
  };
}

function useCatalogPageSelection(
  state: ReturnType<typeof useCatalogPageState> & {
    modelPage: ReturnType<typeof getCatalogPage<CatalogModelRow>>;
    comboPage: ReturnType<typeof getComboCatalogPage<ComboCatalogRow>>;
  }
) {
  const {
    selectedModelIds,
    setSelectedModelIds,

    selectedComboIds,
    setSelectedComboIds,
    modelPage,
    comboPage,
  } = state;
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

  return {
    toggleSelectModel,
    toggleSelectAllModelsOnPage,
    toggleSelectCombo,
    toggleSelectAllCombosOnPage,
  };
}

function useCatalogUrlRead(state: ReturnType<typeof useCatalogPageState>) {
  const { setActiveTab, setComboFilters, setModelFilters, setUrlApplied } = state;
  // Deep links and Back/Forward: read the query string after mount (DashboardLayout pattern).
  useEffect(() => {
    const applyUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      setActiveTab(parseCatalogTab(params));
      setModelFilters(parseModelFilters(params));
      setComboFilters(parseComboFilters(params));
      setUrlApplied(true);
    };
    const timer = window.setTimeout(applyUrlState, 0);
    window.addEventListener("popstate", applyUrlState);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("popstate", applyUrlState);
    };
  }, [setActiveTab, setComboFilters, setModelFilters, setUrlApplied]);
}
function useCatalogPageActions(
  state: ReturnType<typeof useCatalogPageState>,
  options: ReturnType<typeof useCatalogPageOptions>
) {
  const {
    activeTab,
    urlApplied,
    setActiveTab,
    setModelFilters,
    setComboFilters,
    setRequestedModelPage,
    setRequestedComboPage,
    models,
    combos,
    providerHealthMap,
    testResults,
    modelSortField,
    modelSortDirection,
    comboSortField,
    comboSortDirection,
    requestedModelPage,
    requestedComboPage,
  } = state;
  const { modelFilters, comboFilters } = options;
  // The only URL writer: one write per change of tab or (normalised) filters, never before the
  // query string has been read, and skipped when the URL already matches.
  useEffect(() => {
    if (!urlApplied) return;
    setUrlParams(buildCatalogSearchParams(activeTab, modelFilters, comboFilters));
  }, [urlApplied, activeTab, modelFilters, comboFilters]);

  const switchTab = (tab: CatalogTab) => {
    setActiveTab(tab);
  };

  const updateModelFilters = (patch: Partial<CatalogFilters>) => {
    setModelFilters({ ...modelFilters, ...patch });
    setRequestedModelPage(0);
  };

  const clearModelFilters = () => {
    setModelFilters(DEFAULT_MODEL_FILTERS);
    setRequestedModelPage(0);
  };

  const updateComboFilters = (patch: Partial<ComboCatalogFilters>) => {
    setComboFilters({ ...comboFilters, ...patch });
    setRequestedComboPage(0);
  };

  const clearComboFilters = () => {
    setComboFilters(DEFAULT_COMBO_FILTERS);
    setRequestedComboPage(0);
  };

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

  const selection = useCatalogPageSelection({ ...state, modelPage, comboPage });
  return {
    ...selection,
    switchTab,
    updateModelFilters,
    clearModelFilters,
    updateComboFilters,
    clearComboFilters,
    visibleModels,
    visibleCombos,
    modelPage,
    comboPage,
  };
}
function useCatalogPageBulkActions(
  state: ReturnType<typeof useCatalogPageState>,
  actions: ReturnType<typeof useCatalogPageActions>
) {
  const {
    testBulkModels,
    testBulkCombos,
    pendingBulkRun,
    setPendingBulkRun,
    activeTab,
    models,
    combos,
    selectedModelIds,
    selectedComboIds,
  } = state;
  const { visibleModels, visibleCombos } = actions;
  // Bulk test triggers: exact duplicates are dropped before counting, and large runs are
  // confirmed first because every test spends provider quota.
  const startBulkRun = (run: PendingBulkRun) => {
    if (run.kind === "models") void testBulkModels(run.targets);
    else void testBulkCombos(run.targets);
  };

  const requestBulkRun = (run: PendingBulkRun) => {
    if (run.targets.length === 0) return;
    const threshold =
      run.kind === "models" ? BULK_CONFIRM_MODEL_THRESHOLD : BULK_CONFIRM_COMBO_THRESHOLD;
    if (run.targets.length > threshold) setPendingBulkRun(run);
    else startBulkRun(run);
  };

  const confirmPendingBulkRun = () => {
    const run = pendingBulkRun;
    setPendingBulkRun(null);
    if (run) startBulkRun(run);
  };

  const toModelTargets = (rows: CatalogModelRow[]) =>
    dedupeModelTargets(rows.map((m) => ({ providerId: m.providerId, modelId: m.id })));
  const toComboTargets = (rows: ComboCatalogRow[]) =>
    dedupeComboTargets(rows.map((c) => ({ comboName: c.name })));

  const handleTestSelected = () => {
    if (activeTab === "models") {
      const selected = models.filter((m) => selectedModelIds.has(`${m.providerId}:${m.id}`));
      requestBulkRun({ kind: "models", targets: toModelTargets(selected) });
    } else {
      const selected = combos.filter((c) => selectedComboIds.has(c.id));
      requestBulkRun({ kind: "combos", targets: toComboTargets(selected) });
    }
  };

  const handleTestAllFiltered = () => {
    if (activeTab === "models") {
      requestBulkRun({ kind: "models", targets: toModelTargets(visibleModels) });
    } else {
      requestBulkRun({ kind: "combos", targets: toComboTargets(visibleCombos) });
    }
  };

  return { confirmPendingBulkRun, handleTestSelected, handleTestAllFiltered };
}
function useCatalogPageContext() {
  const state = useCatalogPageState();
  useCatalogUrlRead(state);
  const loading = useCatalogPageLoading(state);
  const options = useCatalogPageOptions(state);
  const actions = useCatalogPageActions(state, options);
  const bulk = useCatalogPageBulkActions(state, actions);
  return {
    ...state,
    ...loading,
    ...options,
    ...actions,
    ...bulk,
    hasModelFiltersActive: hasActiveModelFilters(options.modelFilters),
    hasComboFiltersActive: hasActiveComboFilters(options.comboFilters),
    hasTestResults: Object.keys(state.testResults).length > 0,
  };
}
type CatalogPageContext = ReturnType<typeof useCatalogPageContext>;
function CatalogHeader({ context }: { context: CatalogPageContext }) {
  const { t, refreshAll, switchTab, activeTab, models, modelsLoading, combos, combosLoading } =
    context;
  return (
    <>
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-text-main">{t("title")}</h1>
            <p className="mt-1 max-w-3xl text-sm text-text-muted">{t("subtitle")}</p>
          </div>
          <Button
            variant="secondary"
            icon="refresh"
            loading={modelsLoading || combosLoading}
            onClick={refreshAll}
          >
            {t("refresh")}
          </Button>
        </div>

        <CatalogTabs
          activeTab={activeTab}
          onSelect={switchTab}
          ariaLabel={t("catalogSections")}
          labels={{
            models: `${t("modelsTab")} (${models.length})`,
            combos: `${t("combosTab")} (${combos.length})`,
          }}
        />
      </header>
    </>
  );
}

function CatalogModelsPanel({ context }: { context: CatalogPageContext }) {
  const { activeTab } = context;
  return (
    <>
      {/* Models Tab Content */}
      {activeTab === "models" && (
        <section
          role="tabpanel"
          id={catalogPanelId("models")}
          aria-labelledby={catalogTabId("models")}
          className="flex flex-col gap-4"
        >
          <Card padding="none" className="overflow-hidden">
            <CatalogModelsFilters context={context} />

            <CatalogModelsBulkActions context={context} />

            <CatalogModelsContent context={context} />
          </Card>
        </section>
      )}
    </>
  );
}

function CatalogModelsFilters({ context }: { context: CatalogPageContext }) {
  const {
    providerOptions,
    typeOptions,
    subtypeOptions,
    capabilityOptions,
    modelFilters,
    updateModelFilters,
    clearModelFilters,
    visibleModels,
    hasModelFiltersActive,
  } = context;
  return (
    <>
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
    </>
  );
}

function CatalogModelsBulkActions({ context }: { context: CatalogPageContext }) {
  const {
    visibleModels,
    handleTestSelected,
    handleTestAllFiltered,
    hasTestResults,
    selectedModelIds,
    running,
    progress,
    cancelTest,
    clearResults,
  } = context;
  return (
    <>
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
      />
    </>
  );
}

function CatalogModelsContent({ context }: { context: CatalogPageContext }) {
  const { t, refreshAll, clearModelFilters, visibleModels, models, modelsLoading, modelsError } =
    context;
  return (
    <>
      {modelsLoading && models.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-64 items-center justify-center p-8 text-sm text-text-muted"
        >
          {t("loading")}
        </div>
      ) : modelsError && models.length === 0 ? (
        <div
          role="alert"
          className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-center"
        >
          <p className="text-sm text-text-main">{t("unableToLoad")}</p>
          <p className="text-sm text-text-muted">{t("checkConnection")}</p>
          <Button variant="secondary" onClick={refreshAll}>
            {t("retry")}
          </Button>
        </div>
      ) : visibleModels.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-2 p-8 text-center">
          <span className="material-symbols-outlined text-3xl text-text-muted" aria-hidden="true">
            search_off
          </span>
          <p className="font-medium text-text-main">
            {models.length === 0 ? t("noModelsAvailable") : t("noModelsMatch")}
          </p>
          {models.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearModelFilters}>
              {t("clearFilters")}
            </Button>
          )}
        </div>
      ) : (
        <CatalogModelsResults context={context} />
      )}
    </>
  );
}

function CatalogModelsResults({ context }: { context: CatalogPageContext }) {
  const {
    t,
    visibleModels,
    modelPage,
    toggleSelectModel,
    toggleSelectAllModelsOnPage,
    modelsLoading,
    modelsError,
    modelSortField,
    setModelSortField,
    modelSortDirection,
    setModelSortDirection,
    setRequestedModelPage,
    selectedModelIds,
    providerHealthMap,
    testResults,
    running,
    activeItemKeys,
    testSingleModel,
  } = context;
  return (
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
      onNext={() => setRequestedModelPage((c) => Math.min(modelPage.pageCount - 1, c + 1))}
      labels={{
        provider: t("provider"),
        model: t("model"),
        type: t("type"),
        capabilities: t("capabilities"),
        context: t("context"),
        output: t("output"),
        flags: t("flags"),
        custom: t("custom"),
        free: t("free"),
      }}
      selectedIds={selectedModelIds}
      onToggleSelect={toggleSelectModel}
      onToggleSelectAll={toggleSelectAllModelsOnPage}
      testResults={testResults}
      activeTestingKeys={activeItemKeys}
      onTestModel={testSingleModel}
      providerHealthMap={providerHealthMap}
      bulkRunning={running}
    />
  );
}

function CatalogCombosPanel({ context }: { context: CatalogPageContext }) {
  const { activeTab } = context;
  return (
    <>
      {/* Combos Tab Content */}
      {activeTab === "combos" && (
        <section
          role="tabpanel"
          id={catalogPanelId("combos")}
          aria-labelledby={catalogTabId("combos")}
          className="flex flex-col gap-4"
        >
          <Card padding="none" className="overflow-hidden">
            <CatalogCombosFilters context={context} />

            <CatalogCombosBulkActions context={context} />

            <CatalogCombosContent context={context} />
          </Card>
        </section>
      )}
    </>
  );
}

function CatalogCombosFilters({ context }: { context: CatalogPageContext }) {
  const {
    strategyOptions,
    comboFilters,
    updateComboFilters,
    clearComboFilters,
    visibleCombos,
    hasComboFiltersActive,
  } = context;
  return (
    <>
      <ComboCatalogFiltersComponent
        filters={comboFilters}
        onChange={updateComboFilters}
        onClear={clearComboFilters}
        strategyOptions={strategyOptions}
        hasActiveFilters={hasComboFiltersActive}
        totalCount={visibleCombos.length}
      />
    </>
  );
}

function CatalogCombosBulkActions({ context }: { context: CatalogPageContext }) {
  const {
    visibleCombos,
    handleTestSelected,
    handleTestAllFiltered,
    hasTestResults,
    selectedComboIds,
    running,
    progress,
    cancelTest,
    clearResults,
  } = context;
  return (
    <>
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
      />
    </>
  );
}

function CatalogCombosContent({ context }: { context: CatalogPageContext }) {
  const { t, refreshAll, clearComboFilters, visibleCombos, combos, combosLoading, combosError } =
    context;
  return (
    <>
      {combosLoading && combos.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-64 items-center justify-center p-8 text-sm text-text-muted"
        >
          {t("loading")}
        </div>
      ) : combosError && combos.length === 0 ? (
        <div
          role="alert"
          className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-center"
        >
          <p className="text-sm text-text-main">{t("unableToLoadCombos")}</p>
          <p className="text-sm text-text-muted">{t("checkConnection")}</p>
          <Button variant="secondary" onClick={refreshAll}>
            {t("retry")}
          </Button>
        </div>
      ) : visibleCombos.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-2 p-8 text-center">
          <span className="material-symbols-outlined text-3xl text-text-muted" aria-hidden="true">
            search_off
          </span>
          <p className="font-medium text-text-main">
            {combos.length === 0 ? t("noCombosAvailable") : t("noCombosMatch")}
          </p>
          {combos.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearComboFilters}>
              {t("clearFilters")}
            </Button>
          )}
        </div>
      ) : (
        <CatalogCombosResults context={context} />
      )}
    </>
  );
}

function CatalogCombosResults({ context }: { context: CatalogPageContext }) {
  const {
    visibleCombos,
    comboPage,
    toggleSelectCombo,
    toggleSelectAllCombosOnPage,
    comboSortField,
    setComboSortField,
    comboSortDirection,
    setComboSortDirection,
    setRequestedComboPage,
    selectedComboIds,
    testResults,
    running,
    activeItemKeys,
    testSingleCombo,
  } = context;
  return (
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
      activeTestingKeys={activeItemKeys}
      onTestCombo={testSingleCombo}
      onPrevious={() => setRequestedComboPage((c) => Math.max(0, c - 1))}
      onNext={() => setRequestedComboPage((c) => Math.min(comboPage.pageCount - 1, c + 1))}
      bulkRunning={running}
    />
  );
}

function CatalogBulkConfirmation({ context }: { context: CatalogPageContext }) {
  const { t, confirmPendingBulkRun, pendingBulkRun, setPendingBulkRun } = context;
  return (
    <>
      <ConfirmModal
        isOpen={pendingBulkRun !== null}
        onClose={() => setPendingBulkRun(null)}
        onConfirm={confirmPendingBulkRun}
        title={t("bulkConfirmTitle")}
        message={
          pendingBulkRun?.kind === "combos"
            ? t("bulkConfirmCombos", { count: pendingBulkRun.targets.length })
            : t("bulkConfirmModels", { count: pendingBulkRun?.targets.length ?? 0 })
        }
        confirmText={t("bulkConfirmStart")}
        variant="primary"
      />
    </>
  );
}
export default function ModelCatalogPage() {
  const context = useCatalogPageContext();
  return (
    <div className="flex flex-col gap-6">
      <CatalogHeader context={context} />
      <CatalogModelsPanel context={context} />
      <CatalogCombosPanel context={context} />
      <CatalogBulkConfirmation context={context} />
    </div>
  );
}
