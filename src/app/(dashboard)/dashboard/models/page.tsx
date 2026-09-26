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
  type CatalogTab,
} from "./catalogUrlState";
import { useCatalogTestRunner } from "./useCatalogTestRunner";
import { useApiKeyAccessIndex } from "./useApiKeyAccessIndex";
import CatalogKeyAssignDialog from "./CatalogKeyAssignDialog";
import CatalogKeyAccessButton from "./CatalogKeyAccessButton";

const PAGE_SIZE = 50;

type PendingBulkRun =
  { kind: "models"; targets: ModelTestTarget[] } | { kind: "combos"; targets: ComboTestTarget[] };

function setUrlParams(params: URLSearchParams) {
  if (typeof window !== "undefined") {
    const query = params.toString();
    const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }
}

export default function ModelCatalogPage() {
  const keyIndex = useApiKeyAccessIndex();
  const [assignKind, setAssignKind] = useState<CatalogTab | null>(null);
  const openAssign = (kind: CatalogTab) => {
    setAssignKind(kind);
    void keyIndex.ensureLoaded();
  };
  const t = useTranslations("modelCatalog");

  // URL-driven state starts from the defaults the server renders; the mount effect below
  // applies the real query string, so hydration never sees browser-only values.
  const [activeTab, setActiveTab] = useState<CatalogTab>("models");
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

  // Test Runner Hook
  const {
    testResults,
    running,
    activeItemKeys,
    progress,
    testSingleModel,
    testSingleCombo,
    testBulkModels,
    testBulkCombos,
    cancelTest,
    clearResults,
  } = useCatalogTestRunner();

  const requestController = useRef<AbortController | null>(null);

  // Deep links and Back/Forward: read the query string after mount (DashboardLayout pattern).
  useEffect(() => {
    const applyUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      setActiveTab(parseCatalogTab(params));
      setModelFilters(parseModelFilters(params));
      setComboFilters(parseComboFilters(params));
    };
    const timer = window.setTimeout(applyUrlState, 0);
    window.addEventListener("popstate", applyUrlState);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("popstate", applyUrlState);
    };
  }, []);

  // Sync state to URL search parameters
  const syncUrlParams = useCallback(
    (tab: CatalogTab, mFilters: CatalogFilters, cFilters: ComboCatalogFilters) => {
      setUrlParams(buildCatalogSearchParams(tab, mFilters, cFilters));
    },
    []
  );

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

  const modelFilters = useMemo(
    () => ({
      ...rawModelFilters,
      providerId:
        modelsLoading || providerOptions.some(([id]) => id === rawModelFilters.providerId)
          ? rawModelFilters.providerId
          : "all",
      type:
        modelsLoading || typeOptions.includes(rawModelFilters.type) ? rawModelFilters.type : "all",
      subtype:
        modelsLoading || subtypeOptions.includes(rawModelFilters.subtype || "all")
          ? rawModelFilters.subtype
          : "all",
      capability:
        modelsLoading || capabilityOptions.includes(rawModelFilters.capability || "all")
          ? rawModelFilters.capability
          : "all",
    }),
    [
      rawModelFilters,
      modelsLoading,
      providerOptions,
      typeOptions,
      subtypeOptions,
      capabilityOptions,
    ]
  );
  const comboFilters = useMemo(
    () => ({
      ...rawComboFilters,
      strategy:
        combosLoading || strategyOptions.includes(rawComboFilters.strategy)
          ? rawComboFilters.strategy
          : "all",
    }),
    [rawComboFilters, combosLoading, strategyOptions]
  );

  useEffect(() => {
    if (modelsLoading || combosLoading) return;
    syncUrlParams(activeTab, modelFilters, comboFilters);
  }, [activeTab, modelFilters, comboFilters, modelsLoading, combosLoading, syncUrlParams]);

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
    setModelFilters(DEFAULT_MODEL_FILTERS);
    setRequestedModelPage(0);
    syncUrlParams("models", DEFAULT_MODEL_FILTERS, comboFilters);
  };

  const updateComboFilters = (patch: Partial<ComboCatalogFilters>) => {
    const updated = { ...comboFilters, ...patch };
    setComboFilters(updated);
    setRequestedComboPage(0);
    syncUrlParams("combos", modelFilters, updated);
  };

  const clearComboFilters = () => {
    setComboFilters(DEFAULT_COMBO_FILTERS);
    setRequestedComboPage(0);
    syncUrlParams("combos", modelFilters, DEFAULT_COMBO_FILTERS);
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

  const hasModelFiltersActive = hasActiveModelFilters(modelFilters);
  const hasComboFiltersActive = hasActiveComboFilters(comboFilters);
  const hasTestResults = Object.keys(testResults).length > 0;

  return (
    <div className="flex min-w-0 flex-col gap-6">
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

      {/* Models Tab Content */}
      {activeTab === "models" && (
        <section
          role="tabpanel"
          id={catalogPanelId("models")}
          aria-labelledby={catalogTabId("models")}
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
              onAssign={() => openAssign("models")}
            />

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
                <span
                  className="material-symbols-outlined text-3xl text-text-muted"
                  aria-hidden="true"
                >
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
                renderKeyAccess={(id) => (
                  <CatalogKeyAccessButton kind="models" id={id} index={keyIndex} />
                )}
              />
            )}
          </Card>
        </section>
      )}

      {/* Combos Tab Content */}
      {activeTab === "combos" && (
        <section
          role="tabpanel"
          id={catalogPanelId("combos")}
          aria-labelledby={catalogTabId("combos")}
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
              onAssign={() => openAssign("combos")}
            />

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
                <span
                  className="material-symbols-outlined text-3xl text-text-muted"
                  aria-hidden="true"
                >
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
                onNext={() =>
                  setRequestedComboPage((c) => Math.min(comboPage.pageCount - 1, c + 1))
                }
                bulkRunning={running}
                renderKeyAccess={(id) => (
                  <CatalogKeyAccessButton kind="combos" id={id} index={keyIndex} />
                )}
              />
            )}
          </Card>
        </section>
      )}

      {assignKind && (
        <CatalogKeyAssignDialog
          kind={assignKind}
          items={
            assignKind === "models"
              ? models
                  .filter((model) => selectedModelIds.has(`${model.providerId}:${model.id}`))
                  .map((model) => model.id)
              : combos.filter((combo) => selectedComboIds.has(combo.id)).map((combo) => combo.name)
          }
          index={keyIndex}
          onClose={() => setAssignKind(null)}
        />
      )}

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
    </div>
  );
}
