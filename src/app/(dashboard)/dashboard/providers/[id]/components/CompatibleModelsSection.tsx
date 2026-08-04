"use client";
/**
 * CompatibleModelsSection — Issue #3501 Phase 1e
 *
 * Extracted from ProviderDetailPageClient.tsx. Renders the models panel for
 * compatible providers (OpenAI-compat, Anthropic-compat, CC-compat, OpenRouter).
 *
 * Never imports from ProviderDetailPageClient.
 */
import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/shared/components";
import {
  matchesModelCatalogQuery,
  normalizeModelCatalogSource,
} from "@/shared/utils/modelCatalogSearch";
import { resolveManagedModelAlias } from "@/shared/utils/providerModelAliases";
import { useNotificationStore } from "@/store/notificationStore";
import {
  buildCompatMap,
  getDisplayModelAlias,
  providerText,
  type CompatModelRow,
} from "../providerPageHelpers";
import { ModelVisibilityToolbar } from "./ModelRow";
import { sortModelsFreeFirst, isFreeModel } from "@/shared/utils/freeModels";
import PassthroughModelRow, { type PassthroughModelRowProps } from "./PassthroughModelRow";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type CompatibleModelsSaveFlags = {
  normalizeToolCallId?: boolean;
  preserveDeveloperRole?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  isHidden?: boolean;
};

export interface CompatibleModelsSectionProps {
  providerStorageAlias: string;
  providerDisplayAlias: string;
  modelAliases: Record<string, string>;
  availableModels?: CompatModelRow[];
  customModels?: CompatModelRow[];
  fallbackModels?: CompatModelRow[];
  allowImport: boolean;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onSetAlias: (modelId: string, alias: string, providerStorageAlias?: string) => Promise<void>;
  onDeleteAlias: (alias: string) => void;
  connections: { id?: string; isActive?: boolean }[];
  isAnthropic?: boolean;
  onImportWithProgress: (connectionId: string) => Promise<void>;
  t: (key: string, values?: Record<string, unknown>) => string;
  effectiveModelNormalize: (alias: string) => boolean;
  effectiveModelPreserveDeveloper: (alias: string) => boolean;
  getUpstreamHeadersRecord: (modelId: string, protocol: string) => Record<string, string>;
  saveModelCompatFlags: (modelId: string, flags: CompatibleModelsSaveFlags) => Promise<void>;
  compatSavingModelId?: string;
  onModelsChanged?: () => void;
  isModelHidden: (modelId: string) => boolean;
  onToggleHidden: (modelId: string, hidden: boolean) => Promise<void>;
  onBulkToggleHidden: (modelIds: string[], hidden: boolean) => Promise<void>;
  bulkTogglePending?: boolean;
  togglingModelId?: string | null;
  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;
  modelTestStatus?: Record<string, "ok" | "error" | null>;
  testingModelId?: string | null;
  onTestAll?: (targets: Array<{ modelId: string; fullModel: string }>) => Promise<void>;
  testingAll?: boolean;
  testProgress?: { done: number; total: number } | null;
  autoHideFailed?: boolean;
  onAutoHideFailedChange?: (v: boolean) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CompatibleModelsSection({
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
  const [freeFilter, setFreeFilter] = useState<"all" | "free" | "paid">("all");
  const [sortFreeFirst, setSortFreeFirst] = useState(false);
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
      const displayAlias = getDisplayModelAlias(modelId, alias as string);
      if (displayAlias) aliasByModelId.set(modelId, displayAlias);
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
          /\bgr[aá]tis\b|\bfree\b/i.test(model.name || "") ||
          isFreeModel(providerStorageAlias, { id: model.id }),
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
      const displayAlias = getDisplayModelAlias(modelId, alias as string);
      if (!displayAlias) continue;
      const customModel = customModelMap.get(modelId);
      rows.push({
        modelId,
        alias: displayAlias,
        displayName: displayAlias,
        source: customModel ? customModel.source || "custom" : "alias",
        isFree:
          modelId.endsWith(":free") ||
          Boolean((customModel as any)?.free) ||
          /\bgr[aá]tis\b|\bfree\b/i.test(customModel?.name || alias || "") ||
          isFreeModel(providerStorageAlias, { id: modelId }),
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
    const matchesFreeFilter =
      freeFilter === "all" ? true : freeFilter === "free" ? model.isFree : !model.isFree;
    return matchesQuery && matchesVisibility && matchesFreeFilter;
  });
  const displayModels = sortFreeFirst
    ? sortModelsFreeFirst(filteredModels, { isFree: (m) => m.isFree, key: (m) => m.modelId })
    : filteredModels;
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
            freeFilter={freeFilter}
            onFreeFilterChange={setFreeFilter}
            sortFreeFirst={sortFreeFirst}
            onSortFreeFirstChange={setSortFreeFirst}
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
            {displayModels.map(({ modelId, alias, isHidden, source, isFree }) => {
              const fullModel = `${providerDisplayAlias}/${modelId}`;
              return (
                <PassthroughModelRow
                  key={`${providerStorageAlias}:${modelId}`}
                  modelId={modelId}
                  fullModel={fullModel}
                  alias={alias}
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
                  onSetAlias={(a) => onSetAlias(modelId, a, providerStorageAlias)}
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
