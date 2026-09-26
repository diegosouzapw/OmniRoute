"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, Button, CardSkeleton } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { getProviderDisplayName } from "@/lib/display/names";
import { compareTr, matchesSearch } from "@/shared/utils/turkishText";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import type { ProviderConnection } from "@/app/(dashboard)/dashboard/api-manager/components/ProviderConnectionPermissionList";
import {
  useApiKeyAccessForm,
  withClaudeCodeDefaultModel,
  type ApiKeyAccessData,
  type AccessEditorTab,
} from "./useApiKeyAccessForm";
import GeneralTab from "./tabs/GeneralTab";
import ModelsTab, { type Model, type ProviderGroup } from "./tabs/ModelsTab";
import CombosTab, { type ComboOption } from "./tabs/CombosTab";
import ConnectionsTab from "./tabs/ConnectionsTab";
import LimitsTab from "./tabs/LimitsTab";
import BehaviourTab from "./tabs/BehaviourTab";

const TABS: Array<{ id: AccessEditorTab; icon: string; labelKey: string }> = [
  { id: "general", icon: "tune", labelKey: "tabGeneral" },
  { id: "models", icon: "psychology", labelKey: "tabModels" },
  { id: "combos", icon: "hub", labelKey: "tabCombos" },
  { id: "connections", icon: "cable", labelKey: "tabConnections" },
  { id: "limits", icon: "speed", labelKey: "tabLimits" },
  { id: "behaviour", icon: "toggle_on", labelKey: "tabBehaviour" },
];

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

interface ApiKeyAccessEditorFormProps {
  apiKey: ApiKeyAccessData;
  setApiKey: (key: ApiKeyAccessData) => void;
  allModels: Model[];
  modelsLoaded: boolean;
  allCombos: ComboOption[];
  allConnections: ProviderConnection[];
  activeTab: AccessEditorTab;
  switchTab: (tab: AccessEditorTab) => void;
}

function ApiKeyAccessEditorForm({
  apiKey,
  setApiKey,
  allModels,
  modelsLoaded,
  allCombos,
  allConnections,
  activeTab,
  switchTab,
}: ApiKeyAccessEditorFormProps) {
  const t = useTranslations("apiManager");
  const { success: successToast, error: errorToast } = useNotificationStore();

  const tabListRef = useRef<HTMLDivElement | null>(null);
  const [searchModel, setSearchModel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form management hook initialized with non-null apiKey
  const form = useApiKeyAccessForm(apiKey, t);

  // Keyboard navigation for tablist
  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      let nextIndex = currentIndex;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % TABS.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = TABS.length - 1;
      }

      if (nextIndex !== currentIndex) {
        const nextTab = TABS[nextIndex].id;
        switchTab(nextTab);
        const button = tabListRef.current?.querySelector<HTMLButtonElement>(`#tab-${nextTab}`);
        button?.focus();
      }
    },
    [switchTab]
  );

  // Dirty navigation guard (browser close / reload)
  useEffect(() => {
    if (!form.isDirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [form.isDirty]);

  // Dirty navigation guard (in-app link clicks)
  useEffect(() => {
    if (!form.isDirty) return;
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.href && !target.target && target.origin === window.location.origin) {
        if (!window.confirm(t("unsavedChangesWarning"))) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };
    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [form.isDirty, t]);

  // Models provider grouping
  const permissionModels = useMemo(() => withClaudeCodeDefaultModel(allModels), [allModels]);
  const debouncedSearchModel = useDebouncedValue(searchModel, 150);

  const modelsByProvider = useMemo((): ProviderGroup[] => {
    const grouped: Record<string, Model[]> = {};
    for (const model of permissionModels) {
      const provider =
        getProviderDisplayName(model.owned_by) || model.owned_by || t("unknownProvider");
      if (!grouped[provider]) grouped[provider] = [];
      grouped[provider].push(model);
    }
    return Object.entries(grouped).sort((a, b) => compareTr(a[0], b[0]));
  }, [permissionModels, t]);

  const filteredModelsByProvider = useMemo((): ProviderGroup[] => {
    if (!debouncedSearchModel.trim()) return modelsByProvider;
    return modelsByProvider
      .map(([provider, models]): ProviderGroup => [
        provider,
        models.filter(
          (m) =>
            matchesSearch(m.id, debouncedSearchModel) ||
            matchesSearch(m.name || "", debouncedSearchModel) ||
            matchesSearch(provider, debouncedSearchModel)
        ),
      ])
      .filter(([, models]) => models.length > 0);
  }, [modelsByProvider, debouncedSearchModel]);

  // Save handler
  const handleSave = async () => {
    if (isSubmitting || form.hasErrors) return;

    setIsSubmitting(true);
    try {
      const payload = form.buildPayload();
      const res = await fetch(`/api/keys/${encodeURIComponent(apiKey.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        successToast(t("accessUpdatedSuccess"));
        const updatedKeyRes = await fetch(`/api/keys/${encodeURIComponent(apiKey.id)}`);
        if (updatedKeyRes.ok) {
          const updatedKey = await updatedKeyRes.json();
          setApiKey(updatedKey);
        }
      } else {
        const errorData = await res.json();
        const msg = extractApiErrorMessage(errorData, t("failedUpdateAccess"));
        errorToast(msg);
      }
    } catch (err) {
      console.error("Error saving API key access:", err);
      errorToast(t("failedUpdateAccess"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Link
            href="/dashboard/api-manager"
            className="hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            {t("keyManagement")}
          </Link>
          <span>/</span>
          <span className="font-mono text-text-main truncate max-w-[200px]">{apiKey.name}</span>
          <span>/</span>
          <span>Access</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-[28px] text-primary">key</span>
              {t("accessEditorTitle", { name: apiKey.name })}
            </h1>
            <p className="text-sm text-text-muted">{t("accessEditorDesc")}</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border">
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="API Key Access Tabs"
          className="flex gap-1 overflow-x-auto scrollbar-none pb-px"
        >
          {TABS.map((tabDef, index) => {
            const isSelected = activeTab === tabDef.id;
            const errorCount = form.getTabErrorCount(tabDef.id);

            return (
              <button
                key={tabDef.id}
                role="tab"
                type="button"
                id={`tab-${tabDef.id}`}
                aria-controls={`panel-${tabDef.id}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => switchTab(tabDef.id)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`relative inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-t-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-text-muted hover:text-text-main hover:bg-surface/50 border-b-2 border-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tabDef.icon}</span>
                <span>{t(tabDef.labelKey)}</span>
                {errorCount > 0 && (
                  <span
                    className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-red-500 text-white"
                    title={`${errorCount} validation error${errorCount > 1 ? "s" : ""}`}
                  >
                    {errorCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Panel */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="focus:outline-none"
      >
        <Card className="p-6">
          {activeTab === "general" && (
            <GeneralTab
              apiKey={apiKey}
              formState={form.formState}
              setName={form.setName}
              setIsActive={form.setIsActive}
              setIsBanned={form.setIsBanned}
              setExpiresAt={form.setExpiresAt}
              setManageEnabled={form.setManageEnabled}
              setSelfUsageEnabled={form.setSelfUsageEnabled}
              setSelfAccountQuotaEnabled={form.setSelfAccountQuotaEnabled}
              setAllowAllEndpoints={form.setAllowAllEndpoints}
              toggleEndpoint={form.toggleEndpoint}
              nameError={form.tabErrors.general[0]}
            />
          )}

          {activeTab === "models" && (
            <ModelsTab
              formState={form.formState}
              allModels={permissionModels}
              modelsByProvider={filteredModelsByProvider}
              modelsLoaded={modelsLoaded}
              searchModel={searchModel}
              onSearchChange={setSearchModel}
              setAllowAll={form.setAllowAll}
              setSelectedModels={form.setSelectedModels}
              toggleModel={form.toggleModel}
              selectAllModels={form.selectAllModels}
              deselectAllModels={form.deselectAllModels}
              blockClaudeCodeFamily={form.blockClaudeCodeFamily}
              setCatalogScope={form.setCatalogScope}
              setDisableNonPublicModels={form.setDisableNonPublicModels}
            />
          )}

          {activeTab === "combos" && (
            <CombosTab
              formState={form.formState}
              allCombos={allCombos}
              setAllowAllCombos={form.setAllowAllCombos}
              setSelectedCombos={form.setSelectedCombos}
              toggleCombo={form.toggleCombo}
              setAllowAutoCombos={form.setAllowAutoCombos}
            />
          )}

          {activeTab === "connections" && (
            <ConnectionsTab
              formState={form.formState}
              allConnections={allConnections}
              setAllowAllConnections={form.setAllowAllConnections}
              setSelectedConnections={form.setSelectedConnections}
            />
          )}

          {activeTab === "limits" && (
            <LimitsTab
              formState={form.formState}
              setMaxSessions={form.setMaxSessions}
              setThrottleDelayMs={form.setThrottleDelayMs}
              addRateLimit={form.addRateLimit}
              removeRateLimit={form.removeRateLimit}
              updateRateLimit={form.updateRateLimit}
              setScheduleEnabled={form.setScheduleEnabled}
              setScheduleFrom={form.setScheduleFrom}
              setScheduleUntil={form.setScheduleUntil}
              setScheduleDays={form.setScheduleDays}
              setScheduleTz={form.setScheduleTz}
              setUsageLimitEnabled={form.setUsageLimitEnabled}
              setDailyUsageLimitUsd={form.setDailyUsageLimitUsd}
              setWeeklyUsageLimitUsd={form.setWeeklyUsageLimitUsd}
            />
          )}

          {activeTab === "behaviour" && (
            <BehaviourTab
              formState={form.formState}
              setNoLog={form.setNoLog}
              setAutoResolve={form.setAutoResolve}
              setStreamDefaultMode={form.setStreamDefaultMode}
              setCompressionEnabled={form.setCompressionEnabled}
              setChaosModeEnabled={form.setChaosModeEnabled}
              setAllowUsageCommand={form.setAllowUsageCommand}
              setBypassProviderQuotaPolicyEnabled={form.setBypassProviderQuotaPolicyEnabled}
            />
          )}
        </Card>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-background/80 backdrop-blur-md border-t border-border shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {form.isDirty ? (
              <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                {t("unsavedChanges")}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="material-symbols-outlined text-[16px] text-emerald-500">
                  check_circle
                </span>
                Saved
              </span>
            )}

            {form.hasErrors && (
              <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {t("fixValidationErrors")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={form.resetForm}
              disabled={!form.isDirty || isSubmitting}
              className="flex-1 sm:flex-none"
            >
              {t("discardChanges")}
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={!form.isDirty || isSubmitting || form.hasErrors}
              className="flex-1 sm:flex-none"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                t("saveChanges")
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ApiKeyAccessEditorClientProps {
  apiKeyId: string;
}

export default function ApiKeyAccessEditorClient({ apiKeyId }: ApiKeyAccessEditorClientProps) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");
  const searchParams = useSearchParams();

  // Deep-linked tab
  const tabParam = searchParams.get("tab") as AccessEditorTab | null;
  const initialTab: AccessEditorTab =
    tabParam && TABS.some((tDef) => tDef.id === tabParam) ? tabParam : "general";
  const [localTab, setLocalTab] = useState<AccessEditorTab>(initialTab);
  const [prevTabParam, setPrevTabParam] = useState(tabParam);

  if (tabParam !== prevTabParam) {
    setPrevTabParam(tabParam);
    if (tabParam && TABS.some((tDef) => tDef.id === tabParam)) {
      setLocalTab(tabParam);
    }
  }

  const activeTab = localTab;

  const switchTab = useCallback((tab: AccessEditorTab) => {
    setLocalTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.toString());
  }, []);

  // Remote data state
  const [apiKey, setApiKey] = useState<ApiKeyAccessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [allModels, setAllModels] = useState<Model[]>([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [allCombos, setAllCombos] = useState<ComboOption[]>([]);
  const [allConnections, setAllConnections] = useState<ProviderConnection[]>([]);

  // Fetch initial data
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setFetchError(null);
      setNotFound(false);

      try {
        const keyRes = await fetch(`/api/keys/${encodeURIComponent(apiKeyId)}`);
        if (cancelled) return;

        if (keyRes.status === 404) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        if (!keyRes.ok) {
          setFetchError(t("failedLoadKey"));
          setLoading(false);
          return;
        }

        const keyData = await keyRes.json();
        if (cancelled) return;
        setApiKey(keyData);
      } catch (err) {
        if (cancelled) return;
        console.error("Error fetching API key:", err);
        setFetchError(t("failedLoadKey"));
      } finally {
        if (!cancelled) setLoading(false);
      }

      // Concurrently fetch models, combos, and connections
      fetchModels();
      fetchCombos();
      fetchConnections();
    }

    async function fetchModels() {
      setModelsLoaded(false);
      try {
        const res = await fetch("/v1/models");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setAllModels(Array.isArray(data.data) ? data.data : []);
          }
          return;
        }

        const [fallbackRes, combosRes] = await Promise.all([
          fetch("/api/models?all=true"),
          fetch("/api/combos"),
        ]);
        if (fallbackRes.ok && !cancelled) {
          const [fallbackData, combosData] = await Promise.all([
            fallbackRes.json(),
            combosRes.ok ? combosRes.json() : Promise.resolve({ combos: [] }),
          ]);
          const fallbackModels = Array.isArray(fallbackData.models) ? fallbackData.models : [];
          const comboModels = (Array.isArray(combosData.combos) ? combosData.combos : [])
            .filter(
              (combo: ComboOption) =>
                combo?.isActive !== false &&
                combo?.isHidden !== true &&
                typeof combo?.name === "string" &&
                combo.name.trim().length > 0
            )
            .map((combo: ComboOption) => ({
              id: combo.name,
              owned_by: "combo",
              name: combo.name,
            }));
          const modelEntries = fallbackModels
            .map(
              (m: { fullModel?: string; provider?: string; model?: string; alias?: string }) => ({
                id: typeof m.fullModel === "string" ? m.fullModel : `${m.provider}/${m.model}`,
                owned_by: typeof m.provider === "string" ? m.provider : "unknown",
                name: typeof m.alias === "string" ? m.alias : m.model || m.fullModel,
              })
            )
            .filter((m: Model) => typeof m.id === "string" && m.id.length > 0);

          const seen = new Set<string>();
          setAllModels(
            [...comboModels, ...modelEntries].filter((m: Model) => {
              if (seen.has(m.id)) return false;
              seen.add(m.id);
              return true;
            })
          );
        }
      } catch (err) {
        console.error("Error fetching models:", err);
      } finally {
        if (!cancelled) setModelsLoaded(true);
      }
    }

    async function fetchCombos() {
      try {
        const res = await fetch("/api/combos");
        if (res.ok && !cancelled) {
          const data = await res.json();
          const combos = Array.isArray(data.combos) ? data.combos : [];
          setAllCombos(
            combos.filter((c: ComboOption) => typeof c?.name === "string" && c.name.trim())
          );
        }
      } catch (err) {
        console.error("Error fetching combos:", err);
      }
    }

    async function fetchConnections() {
      try {
        const res = await fetch("/api/providers");
        if (res.ok && !cancelled) {
          const data = await res.json();
          setAllConnections(data.connections || []);
        }
      } catch (err) {
        console.error("Error fetching connections:", err);
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [apiKeyId, t]);

  // Loading Gate
  if (loading) {
    return (
      <div className="flex flex-col gap-6" role="status" aria-live="polite" aria-busy="true">
        <span className="sr-only">{tc("loading")}</span>
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  // Not Found Gate
  if (notFound) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
          <span className="material-symbols-outlined text-[24px]">key_off</span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-text-main">{t("keyNotFound")}</h2>
          <p className="text-sm text-text-muted">{t("keyNotFoundDesc")}</p>
        </div>
        <Link href="/dashboard/api-manager">
          <Button variant="outline">
            <span className="material-symbols-outlined text-[16px] mr-1.5">arrow_back</span>
            {t("backToApiKeys")}
          </Button>
        </Link>
      </Card>
    );
  }

  // Error Gate
  if (fetchError || !apiKey) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
          <span className="material-symbols-outlined text-[24px]">error</span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-text-main">{fetchError || t("failedLoadKey")}</h2>
        </div>
        <Link href="/dashboard/api-manager">
          <Button variant="outline">
            <span className="material-symbols-outlined text-[16px] mr-1.5">arrow_back</span>
            {t("backToApiKeys")}
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <ApiKeyAccessEditorForm
      apiKey={apiKey}
      setApiKey={setApiKey}
      allModels={allModels}
      modelsLoaded={modelsLoaded}
      allCombos={allCombos}
      allConnections={allConnections}
      activeTab={activeTab}
      switchTab={switchTab}
    />
  );
}
