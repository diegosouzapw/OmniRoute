"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";
import {
  Button,
  Badge,
  Select
} from "@/shared/components";
import {
  matchesModelCatalogQuery,
  normalizeModelCatalogSource
} from "@/shared/utils/modelCatalogSearch";
import { resolveManagedModelAlias } from "@/shared/utils/providerModelAliases";

import type {
  CompatByProtocolMap,
  ModelCompatSavePatch,
  CompatModelRow,
  CompatModelMap,
  ModelRowProps,
  PassthroughModelRowProps,
  PassthroughModelsSectionProps,
  CustomModelsSectionProps,
  CompatibleModelsSectionProps,
  ProviderMessageTranslator,
  HeaderDraftRow,
  ProviderModelsApiErrorBody,
  CommandCodeAuthFlowState,
  CooldownTimerProps,
  ConnectionRowConnection,
  ConnectionRowProps,
  AddApiKeyModalProps,
  EditConnectionModalConnection,
  EditConnectionModalProps,
  EditCompatibleNodeModalNode,
  EditCompatibleNodeModalProps,
  ImportTopTab,
  ClaudeImportTopTab,
  GeminiImportTopTab,
  LocalProviderMetadata
} from "./types";
import {
  buildCompatMap,
  isModelHidden,
  providerText,
  effectiveNormalizeForProtocol,
  effectivePreserveForProtocol,
  anyNormalizeCompatBadge,
  anyNoPreserveCompatBadge,
  formatProviderModelsErrorResponse,
  effectiveUpstreamHeadersForProtocol,
  anyUpstreamHeadersBadge,
  ModelSourceBadge,
  ModelCompatPopover
} from "./utils";

function ModelRow({
  model,
  fullModel,
  provider,
  copied,
  onCopy,
  t,
  showDeveloperToggle = true,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  compatDisabled,
  onToggleHidden,
  togglingHidden,
  onTestModel,
  testStatus,
  testingModel,
}: ModelRowProps) {
  const isHidden = Boolean(model.isHidden);
  return (
    <div
      className={`flex min-w-[220px] max-w-md items-center gap-2 rounded-lg border border-border px-3 py-2 hover:bg-sidebar/50 transition-opacity ${
        isHidden ? "opacity-50" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <span
          className="material-symbols-outlined shrink-0 text-base"
          style={{ color: isHidden ? "var(--color-text-muted)" : undefined }}
        >
          smart_toy
        </span>
        <code className="rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted">
          {fullModel}
        </code>
        <ModelSourceBadge source={model.source} />
        <button
          onClick={() => onCopy(fullModel, `model-${model.id}`)}
          className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary"
          title={t("copyModel")}
        >
          <span className="material-symbols-outlined text-sm">
            {copied === `model-${model.id}` ? "check" : "content_copy"}
          </span>
        </button>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {onTestModel && (
          <button
            onClick={() => onTestModel(model.id, fullModel)}
            disabled={testingModel}
            className={`rounded p-0.5 hover:bg-sidebar transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${testStatus === "ok" ? "text-green-500" : testStatus === "error" ? "text-red-500" : "text-text-muted hover:text-primary"}`}
            title={
              testingModel
                ? t("testingModel")
                : testStatus === "ok"
                  ? "OK"
                  : testStatus === "error"
                    ? "Error"
                    : t("testModel")
            }
          >
            {testingModel ? (
              <span className="material-symbols-outlined text-sm animate-spin">
                progress_activity
              </span>
            ) : testStatus === "ok" ? (
              <span className="material-symbols-outlined text-sm">check_circle</span>
            ) : testStatus === "error" ? (
              <span className="material-symbols-outlined text-sm">error</span>
            ) : (
              <span className="material-symbols-outlined text-sm">play_circle</span>
            )}
          </button>
        )}
        {onToggleHidden && (
          <button
            onClick={() => onToggleHidden(model.id, !isHidden)}
            disabled={togglingHidden}
            className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed"
            title={
              isHidden
                ? providerText(t, "showModel", "Show model")
                : providerText(t, "hideModel", "Hide model")
            }
          >
            <span className="material-symbols-outlined text-sm">
              {isHidden ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
        <ModelCompatPopover
          t={t}
          effectiveModelNormalize={(p) => effectiveModelNormalize(model.id, p)}
          effectiveModelPreserveDeveloper={(p) => effectiveModelPreserveDeveloper(model.id, p)}
          getUpstreamHeadersRecord={getUpstreamHeadersRecord}
          onCompatPatch={(protocol, payload) =>
            saveModelCompatFlags(model.id, { compatByProtocol: { [protocol]: payload } })
          }
          showDeveloperToggle={showDeveloperToggle}
          disabled={compatDisabled}
        />
      </div>
    </div>
  );
}

function ModelVisibilityToolbar({
  t,
  filterValue,
  onFilterChange,
  activeCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  selectAllDisabled,
  deselectAllDisabled,
  onTestAll,
  testingAll,
  testProgress,
  visibilityFilter,
  onVisibilityFilterChange,
  autoHideFailed,
  onAutoHideFailedChange,
}: {
  t: ((key: string, values?: Record<string, unknown>) => string) & {
    has?: (key: string) => boolean;
  };
  filterValue: string;
  onFilterChange: (value: string) => void;
  activeCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  selectAllDisabled?: boolean;
  deselectAllDisabled?: boolean;
  onTestAll?: () => void;
  testingAll?: boolean;
  testProgress?: { done: number; total: number } | null;
  visibilityFilter?: "all" | "visible" | "hidden";
  onVisibilityFilterChange?: (filter: "all" | "visible" | "hidden") => void;
  autoHideFailed?: boolean;
  onAutoHideFailedChange?: (v: boolean) => void;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <div className="relative min-w-[220px] flex-1">
        <span className="material-symbols-outlined pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[15px] text-text-muted">
          search
        </span>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder={providerText(t, "filterModels", "Filter models…")}
          className="w-full rounded-lg border border-border bg-sidebar/50 py-1.5 pl-7 pr-3 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      {visibilityFilter !== undefined && onVisibilityFilterChange && (
        <div className="flex items-center gap-1 rounded-lg border border-border bg-sidebar/50 p-0.5">
          {(["all", "visible", "hidden"] as const).map((f) => (
            <button
              key={f}
              onClick={() => onVisibilityFilterChange(f)}
              className={`rounded px-2 py-1 text-xs ${
                visibilityFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              {f === "all"
                ? providerText(t, "showAllModels", "All")
                : f === "visible"
                  ? providerText(t, "showVisibleOnly", "Visible")
                  : providerText(t, "showHiddenOnly", "Hidden")}
            </button>
          ))}
        </div>
      )}
      {onAutoHideFailedChange && (
        <label className="flex items-center gap-1.5 text-xs text-text-muted">
          <input
            type="checkbox"
            checked={autoHideFailed ?? false}
            onChange={(e) => onAutoHideFailedChange(e.target.checked)}
            className="rounded border-border bg-sidebar"
          />
          {providerText(t, "hideFailedAuto", "Auto-hide failed")}
        </label>
      )}
      {onTestAll && (
        <button
          onClick={onTestAll}
          disabled={testingAll}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main disabled:cursor-not-allowed disabled:opacity-50"
          title={providerText(t, "testAllModels", "Test all")}
        >
          <span className="material-symbols-outlined text-[16px]">
            {testingAll ? "progress_activity" : "science"}
          </span>
          <span>
            {testingAll && testProgress
              ? providerText(t, "testingAllModels", "Testing {done}/{total}", testProgress)
              : providerText(t, "testAllModels", "Test all")}
          </span>
        </button>
      )}
      <button
        onClick={onSelectAll}
        disabled={selectAllDisabled}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main disabled:cursor-not-allowed disabled:opacity-50"
        title={providerText(t, "showAllModels", "Show all")}
      >
        <span className="material-symbols-outlined text-[16px]">visibility</span>
        <span>{providerText(t, "showAllModels", "Show all")}</span>
      </button>
      <button
        onClick={onDeselectAll}
        disabled={deselectAllDisabled}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main disabled:cursor-not-allowed disabled:opacity-50"
        title={providerText(t, "hideAllModels", "Hide all")}
      >
        <span className="material-symbols-outlined text-[16px]">visibility_off</span>
        <span>{providerText(t, "hideAllModels", "Hide all")}</span>
      </button>
    </div>
  );
}

function PassthroughModelsSection({
  providerAlias,
  modelAliases,
  availableModels = [],
  customModels = [],
  description,
  inputLabel,
  inputPlaceholder,
  copied,
  onCopy,
  onSetAlias,
  onDeleteAlias,
  t,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  compatSavingModelId,
  isModelHidden,
  onToggleHidden,
  onBulkToggleHidden,
  bulkTogglePending,
  togglingModelId,
  onTestModel,
  modelTestStatus,
  testingModelId,
  providerId,
  connectionId,
}: PassthroughModelsSectionProps) {
  const [newModel, setNewModel] = useState("");
  const [adding, setAdding] = useState(false);
  const [modelFilter, setModelFilter] = useState("");
  const [testingAll, setTestingAll] = useState(false);
  const [testProgress, setTestProgress] = useState<{ done: number; total: number } | null>(null);
  const [autoHideFailed, setAutoHideFailed] = useState(true);
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "visible" | "hidden">("all");
  const notify = useNotificationStore();
  const customModelMap = useMemo(() => buildCompatMap(customModels), [customModels]);

  const handleTestAll = async () => {
    const modelsToTest = filteredModels.filter((m) => !m.isHidden);
    if (modelsToTest.length === 0) {
      notify.error(providerText(t, "noModelsToTest", "No models to test"));
      return;
    }
    setTestingAll(true);
    setTestProgress({ done: 0, total: modelsToTest.length });

    let ok = 0;
    let error = 0;
    let hiddenCount = 0;

    for (const model of modelsToTest) {
      try {
        const result: {
          results?: Record<
            string,
            {
              status?: "ok" | "error";
              rateLimited?: boolean;
              isTimeout?: boolean;
              error?: string;
            }
          >;
        } = await fetch("/api/models/test-all", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            providerId,
            connectionId,
            modelIds: [model.modelId],
          }),
        }).then((r) => r.json());

        const entry = result.results?.[model.modelId];
        if (entry?.status === "ok") {
          ok++;
        } else {
          error++;
          if (autoHideFailed && !entry?.rateLimited && !entry?.isTimeout) {
            await onToggleHidden(model.modelId, true);
            hiddenCount++;
          }
        }
      } catch (e) {
        error++;
      }
      setTestProgress((prev) => (prev ? { done: prev.done + 1, total: prev.total } : null));
    }

    notify.info(providerText(t, "testAllResults", "{ok} ok, {error} error", { ok, error }));
    if (hiddenCount > 0) {
      notify.info(providerText(t, "testAllFailedHidden", "{count} hidden", { count: hiddenCount }));
    }
    setTestingAll(false);
    setTestProgress(null);
  };

  const providerAliases = useMemo(
    () =>
      Object.entries(modelAliases).filter(([, model]: [string, any]) =>
        (model as string).startsWith(`${providerAlias}/`)
      ),
    [modelAliases, providerAlias]
  );

  const allModels = useMemo(() => {
    const prefix = `${providerAlias}/`;
    const aliasByModelId = new Map<string, string>();
    const fullModelByModelId = new Map<string, string>();
    const rows: Array<{
      modelId: string;
      fullModel: string;
      alias: string | null;
      displayName: string;
      source: string;
      isFree: boolean;
      isHidden: boolean;
    }> = [];
    const seenModelIds = new Set<string>();

    for (const [alias, fullModel] of providerAliases) {
      const fmStr = fullModel as string;
      const modelId = fmStr.startsWith(prefix) ? fmStr.slice(prefix.length) : fmStr;
      aliasByModelId.set(modelId, alias as string);
      fullModelByModelId.set(modelId, fmStr);
    }

    const addModel = (model: CompatModelRow, source: string) => {
      if (!model?.id || seenModelIds.has(model.id)) return;
      const fullModel = fullModelByModelId.get(model.id) || `${providerAlias}/${model.id}`;
      rows.push({
        modelId: model.id,
        fullModel,
        alias: aliasByModelId.get(model.id) || null,
        displayName: model.name || model.id,
        source,
        isFree:
          Boolean((model as any).free) ||
          model.id.endsWith(":free") ||
          /\bgr[aá]tis\b|\bfree\b/i.test(model.name || ""),
        isHidden: isModelHidden(model.id),
      });
      seenModelIds.add(model.id);
    };

    for (const model of availableModels) {
      addModel(model, "imported");
    }

    for (const model of customModels) {
      addModel(
        model,
        normalizeModelCatalogSource(model.source) === "imported" ? "imported" : "custom"
      );
    }

    for (const [alias, fullModel] of providerAliases) {
      const fmStr = fullModel as string;
      const modelId = fmStr.startsWith(prefix) ? fmStr.slice(prefix.length) : fmStr;
      if (!modelId || seenModelIds.has(modelId)) continue;
      const customModel = customModelMap.get(modelId);
      rows.push({
        modelId,
        fullModel: fmStr,
        alias: alias as string,
        displayName: alias as string,
        source: customModel ? customModel.source || "custom" : "alias",
        isFree:
          modelId.endsWith(":free") ||
          Boolean((customModel as any)?.free) ||
          /\bgr[aá]tis\b|\bfree\b/i.test(customModel?.name || alias || ""),
        isHidden: isModelHidden(modelId),
      });
      seenModelIds.add(modelId);
    }

    return rows;
  }, [
    availableModels,
    customModelMap,
    customModels,
    isModelHidden,
    providerAlias,
    providerAliases,
  ]);
  const filteredModels = allModels.filter((model) => {
    const matchesQuery = matchesModelCatalogQuery(modelFilter, {
      modelId: model.modelId,
      modelName: model.displayName,
      alias: model.alias,
      source: model.source,
    });

    const matchesVisibility =
      visibilityFilter === "all"
        ? true
        : visibilityFilter === "visible"
          ? !model.isHidden
          : model.isHidden;

    return matchesQuery && matchesVisibility;
  });
  const activeCount = allModels.filter((model) => !model.isHidden).length;
  const hiddenFilteredCount = filteredModels.filter((model) => model.isHidden).length;
  const visibleFilteredCount = filteredModels.length - hiddenFilteredCount;

  // Generate default alias from modelId (last part after /)
  const generateDefaultAlias = (modelId) => {
    const parts = modelId.split("/");
    return parts[parts.length - 1];
  };

  const handleAdd = async () => {
    if (!newModel.trim() || adding) return;
    const modelId = newModel.trim();
    const defaultAlias = generateDefaultAlias(modelId);

    // Check if alias already exists
    if (modelAliases[defaultAlias]) {
      alert(t("aliasExistsAlert", { alias: defaultAlias }));
      return;
    }

    setAdding(true);
    try {
      await onSetAlias(modelId, defaultAlias);
      setNewModel("");
    } catch (error) {
      console.error("Error adding model:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-muted">{description}</p>

      {/* Add new model */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label htmlFor="new-model-input" className="text-xs text-text-muted mb-1 block">
            {inputLabel}
          </label>
          <input
            id="new-model-input"
            type="text"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={inputPlaceholder}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
          />
        </div>
        <Button size="sm" icon="add" onClick={handleAdd} disabled={!newModel.trim() || adding}>
          {adding ? t("adding") : t("add")}
        </Button>
      </div>

      {/* Models list */}
      {allModels.length > 0 && (
        <div className="flex flex-col gap-3">
          <ModelVisibilityToolbar
            t={t}
            filterValue={modelFilter}
            onFilterChange={setModelFilter}
            activeCount={activeCount}
            totalCount={allModels.length}
            onSelectAll={() =>
              onBulkToggleHidden(
                filteredModels.map((m) => m.modelId),
                false
              )
            }
            onDeselectAll={() =>
              onBulkToggleHidden(
                filteredModels.map((m) => m.modelId),
                true
              )
            }
            selectAllDisabled={bulkTogglePending || filteredModels.length === 0}
            deselectAllDisabled={bulkTogglePending || filteredModels.length === 0}
            onTestAll={handleTestAll}
            testingAll={testingAll}
            visibilityFilter={visibilityFilter}
            onVisibilityFilterChange={setVisibilityFilter}
            autoHideFailed={autoHideFailed}
            onAutoHideFailedChange={setAutoHideFailed}
          />
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {filteredModels.map(({ modelId, fullModel, alias, isHidden, source, isFree }) => (
              <PassthroughModelRow
                key={fullModel as string}
                modelId={modelId}
                fullModel={fullModel}
                source={source}
                isFree={isFree}
                isHidden={isHidden}
                copied={copied}
                onCopy={onCopy}
                onDeleteAlias={source === "alias" && alias ? () => onDeleteAlias(alias) : undefined}
                t={t}
                showDeveloperToggle
                effectiveModelNormalize={effectiveModelNormalize}
                effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
                getUpstreamHeadersRecord={(p) => getUpstreamHeadersRecord(modelId, p)}
                saveModelCompatFlags={saveModelCompatFlags}
                compatDisabled={compatSavingModelId === modelId}
                onToggleHidden={onToggleHidden}
                togglingHidden={togglingModelId === modelId}
                onTestModel={onTestModel}
                testStatus={modelTestStatus?.[modelId] || null}
                testingModel={testingModelId === modelId}
              />
            ))}
          </div>
          {filteredModels.length === 0 && modelFilter && (
            <p className="py-2 text-sm text-text-muted">
              {providerText(t, "noModelsMatch", `No models match "${modelFilter}"`, {
                filter: modelFilter,
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function PassthroughModelRow({
  modelId,
  fullModel,
  source,
  isFree,
  isHidden,
  copied,
  onCopy,
  onDeleteAlias,
  t,
  showDeveloperToggle = true,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  compatDisabled,
  onToggleHidden,
  togglingHidden,
  onTestModel,
  testStatus,
  testingModel,
}: PassthroughModelRowProps) {
  return (
    <div
      className={`flex min-w-0 flex-col gap-2 rounded-lg border border-border px-3.5 py-3 transition-opacity hover:bg-sidebar/50 ${
        isHidden ? "opacity-50" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="material-symbols-outlined shrink-0 text-base text-text-muted"
          style={{ color: isHidden ? "var(--color-text-muted)" : undefined }}
        >
          smart_toy
        </span>
        <code
          className="min-w-0 truncate rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted"
          title={fullModel}
        >
          {fullModel}
        </code>
      </div>
      <div className="flex min-w-0 items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <ModelSourceBadge source={source} />
          {isFree && (
            <Badge variant="success" className="shrink-0 px-1.5 py-0 text-[10px]">
              {providerText(t, "freeBadge", "Free")}
            </Badge>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => onCopy(fullModel, `model-${modelId}`)}
          className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary"
          title={t("copyModel")}
        >
          <span className="material-symbols-outlined text-sm">
            {copied === `model-${modelId}` ? "check" : "content_copy"}
          </span>
        </button>
        {onTestModel && (
          <button
            onClick={() => onTestModel(modelId, fullModel)}
            disabled={testingModel}
            className={`rounded p-0.5 hover:bg-sidebar transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${testStatus === "ok" ? "text-green-500" : testStatus === "error" ? "text-red-500" : "text-text-muted hover:text-primary"}`}
            title={
              testingModel
                ? t("testingModel")
                : testStatus === "ok"
                  ? "OK"
                  : testStatus === "error"
                    ? "Error"
                    : t("testModel")
            }
          >
            {testingModel ? (
              <span className="material-symbols-outlined text-sm animate-spin">
                progress_activity
              </span>
            ) : testStatus === "ok" ? (
              <span className="material-symbols-outlined text-sm">check_circle</span>
            ) : testStatus === "error" ? (
              <span className="material-symbols-outlined text-sm">error</span>
            ) : (
              <span className="material-symbols-outlined text-sm">play_circle</span>
            )}
          </button>
        )}
        {onToggleHidden && (
          <button
            onClick={() => onToggleHidden(modelId, !isHidden)}
            disabled={togglingHidden}
            className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            title={
              isHidden
                ? providerText(t, "showModel", "Show model")
                : providerText(t, "hideModel", "Hide model")
            }
          >
            <span className="material-symbols-outlined text-sm">
              {isHidden ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
        <ModelCompatPopover
          t={t}
          effectiveModelNormalize={(p) => effectiveModelNormalize(modelId, p)}
          effectiveModelPreserveDeveloper={(p) => effectiveModelPreserveDeveloper(modelId, p)}
          getUpstreamHeadersRecord={getUpstreamHeadersRecord}
          onCompatPatch={(protocol, payload) =>
            saveModelCompatFlags(modelId, { compatByProtocol: { [protocol]: payload } })
          }
          showDeveloperToggle={showDeveloperToggle}
          compact
          disabled={compatDisabled}
        />
        {onDeleteAlias && (
          <button
            onClick={onDeleteAlias}
            className="rounded p-1 text-red-500 hover:bg-red-50"
            title={t("removeModel")}
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        )}
        </div>
      </div>
    </div>
  );
}

function CustomModelsSection({
  providerId,
  providerAlias,
  copied,
  onCopy,
  onModelsChanged,
}: CustomModelsSectionProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [customModels, setCustomModels] = useState<CompatModelRow[]>([]);
  const [modelCompatOverrides, setModelCompatOverrides] = useState<
    Array<CompatModelRow & { id: string }>
  >([]);
  const [newModelId, setNewModelId] = useState("");
  const [newModelName, setNewModelName] = useState("");
  const [newApiFormat, setNewApiFormat] = useState("chat-completions");
  const [newEndpoints, setNewEndpoints] = useState(["chat"]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [editingApiFormat, setEditingApiFormat] = useState("chat-completions");
  const [editingEndpoints, setEditingEndpoints] = useState<string[]>(["chat"]);
  const [savingModelId, setSavingModelId] = useState<string | null>(null);
  const [togglingModelId, setTogglingModelId] = useState<string | null>(null);

  const customMap = useMemo(() => buildCompatMap(customModels), [customModels]);
  const overrideMap = useMemo(() => buildCompatMap(modelCompatOverrides), [modelCompatOverrides]);

  const fetchCustomModels = useCallback(async () => {
    try {
      const res = await fetch(`/api/provider-models?provider=${encodeURIComponent(providerId)}`);
      if (res.ok) {
        const data = await res.json();
        setCustomModels(data.models || []);
        setModelCompatOverrides(data.modelCompatOverrides || []);
      }
    } catch (e) {
      console.error("Failed to fetch custom models:", e);
    } finally {
      setLoading(false);
    }
  }, [providerId]);

  useEffect(() => {
    fetchCustomModels();
  }, [fetchCustomModels]);

  const handleAdd = async () => {
    if (!newModelId.trim() || adding) return;
    setAdding(true);
    try {
      const res = await fetch("/api/provider-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerId,
          modelId: newModelId.trim(),
          modelName: newModelName.trim() || undefined,
          apiFormat: newApiFormat,
          supportedEndpoints: newEndpoints,
        }),
      });
      if (res.ok) {
        setNewModelId("");
        setNewModelName("");
        setNewApiFormat("chat-completions");
        setNewEndpoints(["chat"]);
        await fetchCustomModels();
        onModelsChanged?.();
      }
    } catch (e) {
      console.error("Failed to add custom model:", e);
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (modelId) => {
    try {
      await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerId)}&model=${encodeURIComponent(modelId)}`,
        {
          method: "DELETE",
        }
      );
      await fetchCustomModels();
      onModelsChanged?.();
    } catch (e) {
      console.error("Failed to remove custom model:", e);
    }
  };

  const handleToggleHidden = async (modelId: string, hidden: boolean) => {
    setTogglingModelId(modelId);
    try {
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerId)}&modelId=${encodeURIComponent(modelId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isHidden: hidden }),
        }
      );
      if (res.ok) {
        await fetchCustomModels();
        onModelsChanged?.();
      }
    } catch (e) {
      console.error("Failed to toggle model visibility:", e);
    } finally {
      setTogglingModelId(null);
    }
  };

  const beginEdit = (model) => {
    setEditingModelId(model.id);
    setEditingApiFormat(model.apiFormat || "chat-completions");
    setEditingEndpoints(
      Array.isArray(model.supportedEndpoints) && model.supportedEndpoints.length
        ? model.supportedEndpoints
        : ["chat"]
    );
  };

  const cancelEdit = () => {
    setEditingModelId(null);
    setEditingApiFormat("chat-completions");
    setEditingEndpoints(["chat"]);
    setSavingModelId(null);
  };

  const saveCustomCompat = async (
    modelId: string,
    patch: { compatByProtocol?: CompatByProtocolMap }
  ) => {
    setSavingModelId(modelId);
    try {
      const res = await fetch("/api/provider-models", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: providerId, modelId, ...patch }),
      });
      if (!res.ok) {
        const detail = await formatProviderModelsErrorResponse(res);
        notify.error(
          detail ? `${t("failedSaveCustomModel")} — ${detail}` : t("failedSaveCustomModel")
        );
        return;
      }
    } catch {
      notify.error(t("failedSaveCustomModel"));
      return;
    } finally {
      setSavingModelId(null);
    }
    try {
      await fetchCustomModels();
      onModelsChanged?.();
    } catch {
      /* refresh failure is non-critical — data was already saved */
    }
  };

  const saveEdit = async (modelId) => {
    if (!editingModelId || editingModelId !== modelId) return;
    if (!editingEndpoints.length) {
      notify.error("Select at least one supported endpoint");
      return;
    }

    setSavingModelId(modelId);
    try {
      const model = customModels.find((m) => m.id === modelId);
      const res = await fetch("/api/provider-models", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerId,
          modelId,
          modelName: model?.name || modelId,
          source: model?.source || "manual",
          apiFormat: editingApiFormat,
          supportedEndpoints: editingEndpoints,
        }),
      });

      if (!res.ok) {
        const detail = await formatProviderModelsErrorResponse(res);
        throw new Error(detail || "Failed to save model endpoint settings");
      }

      await fetchCustomModels();
      onModelsChanged?.();
      notify.success("Saved model endpoint settings");
      cancelEdit();
    } catch (e) {
      console.error("Failed to save custom model:", e);
      notify.error(
        e instanceof Error && e.message ? e.message : "Failed to save model endpoint settings"
      );
    } finally {
      setSavingModelId(null);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-base text-primary">tune</span>
        {t("customModels")}
      </h3>
      <p className="text-xs text-text-muted mb-3">{t("customModelsHint")}</p>

      {/* Add form */}
      <div className="flex flex-col gap-3 mb-3">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label htmlFor="custom-model-id" className="text-xs text-text-muted mb-1 block">
              {t("modelId")}
            </label>
            <input
              id="custom-model-id"
              type="text"
              value={newModelId}
              onChange={(e) => setNewModelId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder={t("customModelPlaceholder")}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
          </div>
          <div className="w-40">
            <label htmlFor="custom-model-name" className="text-xs text-text-muted mb-1 block">
              {t("displayName")}
            </label>
            <input
              id="custom-model-name"
              type="text"
              value={newModelName}
              onChange={(e) => setNewModelName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder={t("optional")}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
          </div>
          <Button size="sm" icon="add" onClick={handleAdd} disabled={!newModelId.trim() || adding}>
            {adding ? t("adding") : t("add")}
          </Button>
        </div>

        {/* API Format + Supported Endpoints */}
        <div className="flex items-end gap-4 flex-wrap">
          <div className="w-48">
            <label htmlFor="custom-api-format" className="text-xs text-text-muted mb-1 block">
              API Format
            </label>
            <select
              id="custom-api-format"
              value={newApiFormat}
              onChange={(e) => setNewApiFormat(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="chat-completions">{t("chatCompletions")}</option>
              <option value="responses">{t("responsesApi")}</option>
              <option value="embeddings">{t("embeddings")}</option>
              <option value="rerank">Rerank</option>
              <option value="audio-transcriptions">{t("audioTranscriptions")}</option>
              <option value="audio-speech">{t("audioSpeech")}</option>
              <option value="images-generations">{t("imagesGenerations")}</option>
            </select>
          </div>
          <div className="flex-1">
            <span className="text-xs text-text-muted mb-1 block">
              {t("supportedEndpointsLabel")}
            </span>
            <div className="flex items-center gap-3">
              {["chat", "embeddings", "rerank", "images", "audio"].map((ep) => (
                <label
                  key={ep}
                  className="flex items-center gap-1.5 text-xs text-text-main cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={newEndpoints.includes(ep)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewEndpoints((prev) => [...prev, ep]);
                      } else {
                        setNewEndpoints((prev) => prev.filter((x) => x !== ep));
                      }
                    }}
                    className="rounded border-border"
                  />
                  {ep === "chat"
                    ? `💬 ${t("supportedEndpointChat")}`
                    : ep === "embeddings"
                      ? `📐 ${t("supportedEndpointEmbeddings")}`
                      : ep === "rerank"
                        ? "Rerank"
                        : ep === "images"
                          ? `🖼️ ${t("supportedEndpointImages")}`
                          : `🔊 ${t("supportedEndpointAudio")}`}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-xs text-text-muted">{t("loading")}</p>
      ) : customModels.length > 0 ? (
        <div className="flex flex-col gap-2">
          {customModels.map((model) => {
            const fullModel = `${providerAlias}/${model.id}`;
            const copyKey = `custom-${model.id}`;
            return (
              <div
                key={model.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-sidebar/50"
              >
                {editingModelId !== model.id && (
                  <span className="material-symbols-outlined text-base text-primary shrink-0">
                    tune
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{model.name || model.id}</p>
                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                    <code className="text-xs text-text-muted font-mono bg-sidebar px-1.5 py-0.5 rounded">
                      {fullModel}
                    </code>
                    <button
                      onClick={() => onCopy(fullModel, copyKey)}
                      className="p-0.5 hover:bg-sidebar rounded text-text-muted hover:text-primary"
                      title={t("copyModel")}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copied === copyKey ? "check" : "content_copy"}
                      </span>
                    </button>
                    {model.apiFormat === "responses" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-medium">
                        {t("responses")}
                      </span>
                    )}
                    {model.supportedEndpoints?.includes("embeddings") && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 font-medium">
                        {`📐 ${t("supportedEndpointEmbeddings")}`}
                      </span>
                    )}
                    {model.supportedEndpoints?.includes("images") && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-medium">
                        {`🖼️ ${t("imagesShortLabel")}`}
                      </span>
                    )}
                    {model.supportedEndpoints?.includes("audio") && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 font-medium">
                        {`🔊 ${t("audioShortLabel")}`}
                      </span>
                    )}
                    {anyNormalizeCompatBadge(model.id, customMap, overrideMap) && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-500/15 text-slate-400 font-medium"
                        title={t("normalizeToolCallIdLabel")}
                      >
                        ID×9
                      </span>
                    )}
                    {anyNoPreserveCompatBadge(model.id, customMap, overrideMap) && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 font-medium"
                        title={t("compatDoNotPreserveDeveloper")}
                      >
                        {t("compatBadgeNoPreserve")}
                      </span>
                    )}
                    {anyUpstreamHeadersBadge(model.id, customMap, overrideMap) && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-400 font-medium"
                        title={t("compatUpstreamHeadersLabel")}
                      >
                        {t("compatBadgeUpstreamHeaders")}
                      </span>
                    )}
                  </div>

                  {editingModelId === model.id && (
                    <div className="mt-3 min-w-0 max-w-full rounded-lg border border-border bg-muted p-3 dark:bg-zinc-900">
                      <div className="flex min-w-0 flex-wrap items-end gap-x-3 gap-y-2">
                        <div className="w-[11rem] shrink-0 min-w-0">
                          <label className="text-xs text-text-muted mb-1 block">
                            {t("apiFormatLabel")}
                          </label>
                          <select
                            value={editingApiFormat}
                            onChange={(e) => setEditingApiFormat(e.target.value)}
                            className="w-full px-2.5 py-2 text-xs border border-border rounded-lg bg-background text-text-main focus:outline-none focus:border-primary"
                          >
                            <option value="chat-completions">{t("chatCompletions")}</option>
                            <option value="responses">{t("responsesApi")}</option>
                            <option value="embeddings">{t("embeddings")}</option>
                            <option value="rerank">Rerank</option>
                            <option value="audio-transcriptions">{t("audioTranscriptions")}</option>
                            <option value="audio-speech">{t("audioSpeech")}</option>
                            <option value="images-generations">{t("imagesGenerations")}</option>
                          </select>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 overflow-x-auto overflow-y-visible [scrollbar-width:thin]">
                          <span className="text-xs text-text-muted shrink-0">
                            {t("supportedEndpointsLabel")}
                          </span>
                          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 min-w-0">
                            {["chat", "embeddings", "rerank", "images", "audio"].map((ep) => (
                              <label
                                key={ep}
                                className="flex items-center gap-1.5 text-xs text-text-main cursor-pointer whitespace-nowrap"
                              >
                                <input
                                  type="checkbox"
                                  checked={editingEndpoints.includes(ep)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setEditingEndpoints((prev) =>
                                        prev.includes(ep) ? prev : [...prev, ep]
                                      );
                                    } else {
                                      setEditingEndpoints((prev) => prev.filter((x) => x !== ep));
                                    }
                                  }}
                                  className="rounded border-border"
                                />
                                {ep === "chat"
                                  ? `💬 ${t("supportedEndpointChat")}`
                                  : ep === "embeddings"
                                    ? `📐 ${t("supportedEndpointEmbeddings")}`
                                    : ep === "rerank"
                                      ? "Rerank"
                                      : ep === "images"
                                        ? `🖼️ ${t("supportedEndpointImages")}`
                                        : `🔊 ${t("supportedEndpointAudio")}`}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center gap-2 pb-0.5">
                          <Button
                            size="sm"
                            onClick={() => saveEdit(model.id)}
                            disabled={savingModelId === model.id}
                          >
                            {savingModelId === model.id ? t("saving") : t("save")}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={cancelEdit}>
                            {t("cancel")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => beginEdit(model)}
                    className="rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary"
                    title={t("edit")}
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <ModelCompatPopover
                    t={t}
                    effectiveModelNormalize={(p) =>
                      effectiveNormalizeForProtocol(model.id, p, customMap, overrideMap)
                    }
                    effectiveModelPreserveDeveloper={(p) =>
                      effectivePreserveForProtocol(model.id, p, customMap, overrideMap)
                    }
                    getUpstreamHeadersRecord={(p) =>
                      effectiveUpstreamHeadersForProtocol(model.id, p, customMap, overrideMap)
                    }
                    onCompatPatch={(protocol, payload) =>
                      saveCustomCompat(model.id, {
                        compatByProtocol: { [protocol]: payload },
                      })
                    }
                    showDeveloperToggle
                    disabled={savingModelId === model.id}
                  />
                  <button
                    onClick={() => handleToggleHidden(model.id, !model.isHidden)}
                    disabled={togglingModelId === model.id}
                    className="rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-50"
                    title={model.isHidden ? t("unhideModel") : t("hideModel")}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {model.isHidden ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                  <button
                    onClick={() => handleRemove(model.id)}
                    className="rounded p-1 text-red-500 hover:bg-red-50"
                    title={t("removeCustomModel")}
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-text-muted">{t("noCustomModels")}</p>
      )}
    </div>
  );
}

function CompatibleModelsSection({
  providerStorageAlias,
  providerDisplayAlias,
  modelAliases,
  availableModels = [],
  customModels = [],
  fallbackModels = [],
  description,
  inputLabel,
  inputPlaceholder,
  copied,
  onCopy,
  onSetAlias,
  onDeleteAlias,
  connections,
  isAnthropic,
  onImportWithProgress,
  t,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  compatSavingModelId,
  onModelsChanged,
  allowImport,
  isModelHidden,
  onToggleHidden,
  onBulkToggleHidden,
  bulkTogglePending,
  togglingModelId,
  onTestModel,
  modelTestStatus,
  testingModelId,
  onTestAll,
  testingAll,
  testProgress,
  autoHideFailed,
  onAutoHideFailedChange,
}: CompatibleModelsSectionProps) {
  const [newModel, setNewModel] = useState("");
  const [adding, setAdding] = useState(false);
  const [importing, setImporting] = useState(false);
  const [modelFilter, setModelFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "visible" | "hidden">("all");
  const notify = useNotificationStore();
  const customModelMap = useMemo(() => buildCompatMap(customModels), [customModels]);

  const providerAliases = useMemo(
    () =>
      Object.entries(modelAliases).filter(([, model]: [string, any]) =>
        (model as string).startsWith(`${providerStorageAlias}/`)
      ),
    [modelAliases, providerStorageAlias]
  );

  const allModels = useMemo(() => {
    const prefix = `${providerStorageAlias}/`;
    const aliasByModelId = new Map<string, string>();
    const rows: Array<{
      modelId: string;
      alias: string | null;
      displayName: string;
      source: string;
      isFree: boolean;
      isHidden: boolean;
    }> = [];
    const seenModelIds = new Set<string>();

    for (const [alias, fullModel] of providerAliases) {
      const fmStr = fullModel as string;
      const modelId = fmStr.startsWith(prefix) ? fmStr.slice(prefix.length) : fmStr;
      aliasByModelId.set(modelId, alias as string);
    }

    const addModel = (model: CompatModelRow, source: string) => {
      if (!model?.id || seenModelIds.has(model.id)) return;
      rows.push({
        modelId: model.id,
        alias: aliasByModelId.get(model.id) || null,
        displayName: model.name || model.id,
        source,
        isFree:
          Boolean((model as any).free) ||
          model.id.endsWith(":free") ||
          /\bgr[aá]tis\b|\bfree\b/i.test(model.name || ""),
        isHidden: isModelHidden(model.id),
      });
      seenModelIds.add(model.id);
    };

    for (const model of availableModels) {
      addModel(model, "imported");
    }

    for (const model of customModels) {
      addModel(
        model,
        normalizeModelCatalogSource(model.source) === "imported" ? "imported" : "custom"
      );
    }

    for (const model of fallbackModels) {
      addModel(model, "fallback");
    }

    for (const [alias, fullModel] of providerAliases) {
      const fmStr = fullModel as string;
      const modelId = fmStr.startsWith(prefix) ? fmStr.slice(prefix.length) : fmStr;
      if (!modelId || seenModelIds.has(modelId)) continue;
      const customModel = customModelMap.get(modelId);
      rows.push({
        modelId,
        alias: alias as string,
        displayName: alias as string,
        source: customModel ? customModel.source || "custom" : "alias",
        isFree:
          modelId.endsWith(":free") ||
          Boolean((customModel as any)?.free) ||
          /\bgr[aá]tis\b|\bfree\b/i.test(customModel?.name || alias || ""),
        isHidden: isModelHidden(modelId),
      });
      seenModelIds.add(modelId);
    }

    return rows;
  }, [
    availableModels,
    customModelMap,
    customModels,
    fallbackModels,
    isModelHidden,
    providerAliases,
    providerStorageAlias,
  ]);
  const filteredModels = allModels.filter((model) => {
    const matchesQuery = matchesModelCatalogQuery(modelFilter, {
      modelId: model.modelId,
      modelName: model.displayName,
      alias: model.alias,
      source: model.source,
    });
    const matchesVisibility =
      visibilityFilter === "all"
        ? true
        : visibilityFilter === "visible"
          ? !model.isHidden
          : model.isHidden;
    return matchesQuery && matchesVisibility;
  });
  const activeCount = allModels.filter((model) => !model.isHidden).length;
  const hiddenFilteredCount = filteredModels.filter((model) => model.isHidden).length;
  const visibleFilteredCount = filteredModels.length - hiddenFilteredCount;

  const resolveAlias = useCallback(
    (modelId: string, workingAliases: Record<string, string>) =>
      resolveManagedModelAlias({
        modelId,
        fullModel: `${providerStorageAlias}/${modelId}`,
        providerDisplayAlias,
        existingAliases: workingAliases,
      }),
    [providerDisplayAlias, providerStorageAlias]
  );

  const handleAdd = async () => {
    if (!newModel.trim() || adding) return;
    const modelId = newModel.trim();
    const resolvedAlias = resolveAlias(modelId, modelAliases);
    if (!resolvedAlias) {
      notify.error(t("allSuggestedAliasesExist"));
      return;
    }

    setAdding(true);
    try {
      // Save to customModels DB FIRST - only create alias if this succeeds
      const customModelRes = await fetch("/api/provider-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerStorageAlias,
          modelId,
          modelName: modelId,
          source: "manual",
        }),
      });

      if (!customModelRes.ok) {
        let errorData: { error?: { message?: string } } = {};
        try {
          errorData = await customModelRes.json();
        } catch (jsonError) {
          console.error("Failed to parse error response from custom model API:", jsonError);
        }
        throw new Error(errorData.error?.message || t("failedSaveCustomModel"));
      }

      // Only create alias after customModel is saved successfully
      await onSetAlias(modelId, resolvedAlias, providerStorageAlias);
      setNewModel("");
      notify.success(t("modelAddedSuccess", { modelId }));
      onModelsChanged?.();
    } catch (error) {
      console.error("Error adding model:", error);
      notify.error(error instanceof Error ? error.message : t("failedAddModelTryAgain"));
    } finally {
      setAdding(false);
    }
  };

  const handleImport = async () => {
    if (!allowImport || importing) return;
    const activeConnection = connections.find((conn) => conn.isActive !== false);
    if (!activeConnection?.id) return;

    setImporting(true);
    try {
      await onImportWithProgress(activeConnection.id);
    } catch (error) {
      console.error("Error importing models:", error);
      notify.error(t("failedImportModelsTryAgain"));
    } finally {
      setImporting(false);
    }
  };

  const canImport = connections.some((conn) => conn.isActive !== false);

  // Handle delete: remove from both alias and customModels DB
  const handleDeleteModel = async (modelId: string, alias?: string | null) => {
    try {
      // Remove from customModels DB
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerStorageAlias)}&model=${encodeURIComponent(modelId)}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        throw new Error(t("failedRemoveModelFromDatabase"));
      }
      // Also delete the alias
      if (alias) {
        await onDeleteAlias(alias);
      }
      notify.success(t("modelRemovedSuccess"));
      onModelsChanged?.();
    } catch (error) {
      console.error("Error deleting model:", error);
      notify.error(error instanceof Error ? error.message : t("failedDeleteModelTryAgain"));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-muted">{description}</p>

      <div className="flex items-end gap-2 flex-wrap">
        <div className="flex-1 min-w-[240px]">
          <label
            htmlFor="new-compatible-model-input"
            className="text-xs text-text-muted mb-1 block"
          >
            {inputLabel}
          </label>
          <input
            id="new-compatible-model-input"
            type="text"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={inputPlaceholder}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
          />
        </div>
        <Button size="sm" icon="add" onClick={handleAdd} disabled={!newModel.trim() || adding}>
          {adding ? t("adding") : t("add")}
        </Button>
        {allowImport && (
          <Button
            size="sm"
            variant="secondary"
            icon="download"
            onClick={handleImport}
            disabled={!canImport || importing}
          >
            {importing ? t("importingModels") : t("importFromModels")}
          </Button>
        )}
      </div>

      {allowImport && !canImport && (
        <p className="text-xs text-text-muted">{t("addConnectionToImport")}</p>
      )}

      {allModels.length > 0 && (
        <div className="flex flex-col gap-3">
          <ModelVisibilityToolbar
            t={t}
            filterValue={modelFilter}
            onFilterChange={setModelFilter}
            activeCount={activeCount}
            totalCount={allModels.length}
            onSelectAll={() =>
              onBulkToggleHidden(
                filteredModels.map((model) => model.modelId),
                false
              )
            }
            onDeselectAll={() =>
              onBulkToggleHidden(
                filteredModels.map((model) => model.modelId),
                true
              )
            }
            selectAllDisabled={hiddenFilteredCount === 0 || bulkTogglePending}
            deselectAllDisabled={visibleFilteredCount === 0 || bulkTogglePending}
            visibilityFilter={visibilityFilter}
            onVisibilityFilterChange={setVisibilityFilter}
            onTestAll={() => {
              const targets = filteredModels
                .filter((m) => !m.isHidden)
                .map((m) => ({
                  modelId: m.modelId,
                  fullModel: `${providerDisplayAlias}/${m.modelId}`,
                }));
              return onTestAll?.(targets);
            }}
            testingAll={testingAll}
            testProgress={testProgress}
            autoHideFailed={autoHideFailed}
            onAutoHideFailedChange={onAutoHideFailedChange}
          />
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {filteredModels.map(({ modelId, alias, isHidden, source, isFree }) => {
              const fullModel = `${providerDisplayAlias}/${modelId}`;
              return (
                <PassthroughModelRow
                  key={`${providerStorageAlias}:${modelId}`}
                  modelId={modelId}
                  fullModel={fullModel}
                  source={source}
                  isFree={isFree}
                  isHidden={isHidden}
                  copied={copied}
                  onCopy={onCopy}
                  onDeleteAlias={
                    source === "custom" || source === "manual"
                      ? () => handleDeleteModel(modelId, alias)
                      : source === "alias" && alias
                        ? () => onDeleteAlias(alias)
                        : undefined
                  }
                  t={t}
                  showDeveloperToggle={!isAnthropic}
                  effectiveModelNormalize={effectiveModelNormalize}
                  effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
                  getUpstreamHeadersRecord={(p) => getUpstreamHeadersRecord(modelId, p)}
                  saveModelCompatFlags={saveModelCompatFlags}
                  compatDisabled={compatSavingModelId === modelId}
                  onToggleHidden={onToggleHidden}
                  togglingHidden={togglingModelId === modelId}
                  onTestModel={onTestModel}
                  testStatus={modelTestStatus?.[modelId] || null}
                  testingModel={testingModelId === modelId}
                />
              );
            })}
          </div>
          {filteredModels.length === 0 && modelFilter && (
            <p className="py-2 text-sm text-text-muted">
              {providerText(t, "noModelsMatch", `No models match "${modelFilter}"`, {
                filter: modelFilter,
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
