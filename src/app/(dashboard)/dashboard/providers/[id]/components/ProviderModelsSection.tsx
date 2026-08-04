"use client";

/**
 * ProviderModelsSection — Issue #3501 Phase 1m
 *
 * Extracted from the renderModelsSection() inline function in
 * ProviderDetailPageClient. Receives all model/compat state + handlers
 * as props (from useModelImportHandlers, useModelVisibilityHandlers,
 * useModelCompatState, useProviderModels).
 *
 * Cycle-safe: no import from ProviderDetailPageClient.
 */

import { useState } from "react";
import { Button } from "@/shared/components";
import { matchesModelCatalogQuery } from "@/shared/utils/modelCatalogSearch";
import { isFreeModel, sortModelsFreeFirst } from "@/shared/utils/freeModels";
import {
  getDisplayModelAlias,
  providerText,
  type ProviderMessageTranslator,
} from "../providerPageHelpers";
import ModelRow, { ModelVisibilityToolbar } from "./ModelRow";
import PassthroughModelsSection from "./PassthroughModelsSection";
import CompatibleModelsSection from "./CompatibleModelsSection";
import type { ModelCompatSavePatch } from "../hooks/useModelVisibilityHandlers";

export interface ProviderModelsSectionProps {
  // Provider identity
  providerId: string;
  providerAlias: string;
  providerStorageAlias: string;
  providerDisplayAlias: string;
  providerInfo: {
    name?: string;
    passthroughModels?: boolean;
  } | null;

  // Provider-type flags
  isCcCompatible: boolean;
  isAnthropicCompatible: boolean;
  isAnthropicProtocolCompatible: boolean;
  isManagedAvailableModelsProvider: boolean;
  compatibleSupportsModelImport: boolean;
  allowModelImport: boolean;

  // Models data
  models: Array<{ id: string; name?: string; source?: string }>;
  modelMeta: { customModels: any[]; modelCompatOverrides?: any[] };
  modelAliases: Record<string, string>;
  syncedAvailableModels: any[];
  compatibleFallbackModels: any[];

  // Clipboard
  copied: string | null;
  onCopy: (text: string) => void;

  // Model alias handlers
  onSetAlias: (modelId: string, alias: string, providerAlias: string) => Promise<void>;
  onDeleteAlias: (alias: string) => Promise<void>;
  fetchProviderModelMeta: () => Promise<void>;

  // Connections
  connections: any[];
  selectedConnection: any;

  // Phase 1k: import handlers
  canImportModels: boolean;
  importingModels: boolean;
  handleImportModels: () => Promise<void>;
  isAutoSyncEnabled: boolean;
  togglingAutoSync: boolean;
  handleToggleAutoSync: () => Promise<void>;
  handleCompatibleImportWithProgress: (connectionId: string) => Promise<void>;

  // Phase 1l: visibility handlers
  compatSavingModelId: string | null;
  togglingModelId: string | null;
  bulkVisibilityAction: "select" | "deselect" | null;
  clearingModels: boolean;
  modelFilter: string;
  testingModelId: string | null;
  modelTestStatus: Record<string, "ok" | "error">;
  onModelTestStatusChange: (modelId: string, status: "ok" | "error") => void;
  testingAll: boolean;
  testProgress: { done: number; total: number } | null;
  autoHideFailed: boolean;
  visibilityFilter: "all" | "visible" | "hidden";
  providerAliasEntries: [string, string][];
  setModelFilter: (v: string) => void;
  setAutoHideFailed: (v: boolean) => void;
  setVisibilityFilter: (v: "all" | "visible" | "hidden") => void;
  saveModelCompatFlags: (modelId: string, patch: ModelCompatSavePatch) => Promise<void>;
  handleToggleModelHidden: (providerKey: string, modelId: string, hidden: boolean) => Promise<void>;
  handleBulkToggleModelHidden: (
    providerKey: string,
    modelIds: string[],
    hidden: boolean
  ) => Promise<void>;
  handleClearAllModels: () => Promise<void>;
  onTestModel: (modelId: string, fullModel: string) => Promise<void>;
  handleTestAll: (targets: Array<{ modelId: string; fullModel: string }>) => Promise<void>;

  // Compat state (from useModelCompatState)
  effectiveModelNormalize: (modelId: string, protocol?: string) => boolean;
  effectiveModelPreserveDeveloper: (modelId: string, protocol?: string) => boolean;
  effectiveModelHidden: (modelId: string) => boolean;
  getUpstreamHeadersRecordForModel: (modelId: string, protocol: string) => Record<string, string>;

  // Translation
  t: ProviderMessageTranslator;
}

export default function ProviderModelsSection({
  providerId,
  providerAlias,
  providerStorageAlias,
  providerDisplayAlias,
  providerInfo,
  isCcCompatible,
  isAnthropicCompatible,
  isAnthropicProtocolCompatible,
  isManagedAvailableModelsProvider,
  compatibleSupportsModelImport,
  allowModelImport,
  models,
  modelMeta,
  modelAliases,
  syncedAvailableModels,
  compatibleFallbackModels,
  copied,
  onCopy,
  onSetAlias,
  onDeleteAlias,
  fetchProviderModelMeta,
  connections,
  selectedConnection,
  canImportModels,
  importingModels,
  handleImportModels,
  isAutoSyncEnabled,
  togglingAutoSync,
  handleToggleAutoSync,
  handleCompatibleImportWithProgress,
  compatSavingModelId,
  togglingModelId,
  bulkVisibilityAction,
  clearingModels,
  modelFilter,
  testingModelId,
  modelTestStatus,
  onModelTestStatusChange,
  testingAll,
  testProgress,
  autoHideFailed,
  visibilityFilter,
  providerAliasEntries,
  setModelFilter,
  setAutoHideFailed,
  setVisibilityFilter,
  saveModelCompatFlags,
  handleToggleModelHidden,
  handleBulkToggleModelHidden,
  handleClearAllModels,
  onTestModel,
  handleTestAll,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  effectiveModelHidden,
  getUpstreamHeadersRecordForModel,
  t,
}: ProviderModelsSectionProps) {
  const [freeFilter, setFreeFilter] = useState<"all" | "free" | "paid">("all");
  const [sortFreeFirst, setSortFreeFirst] = useState(false);
  const autoSyncToggle = allowModelImport && compatibleSupportsModelImport && canImportModels && (
    <button
      onClick={handleToggleAutoSync}
      disabled={togglingAutoSync}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-transparent cursor-pointer text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
      title={t("autoSyncTooltip")}
    >
      <span
        className="material-symbols-outlined text-[16px]"
        style={{ color: isAutoSyncEnabled ? "#22c55e" : "var(--color-text-muted)" }}
      >
        {isAutoSyncEnabled ? "toggle_on" : "toggle_off"}
      </span>
      <span className="text-text-main">{t("autoSync")}</span>
    </button>
  );

  const clearAllButton = (modelMeta.customModels.length > 0 || providerAliasEntries.length > 0) && (
    <button
      onClick={handleClearAllModels}
      disabled={clearingModels}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-red-300 dark:border-red-800 bg-transparent cursor-pointer text-[12px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
      title={t("clearAllModels")}
    >
      <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
      <span>{t("clearAllModels")}</span>
    </button>
  );

  if (isManagedAvailableModelsProvider) {
    const description =
      providerId === "openrouter"
        ? t("openRouterAnyModelHint")
        : isCcCompatible
          ? t("ccCompatibleModelsDescription")
          : t("compatibleModelsDescription", {
              type: isAnthropicCompatible ? t("anthropic") : t("openai"),
            });
    const inputLabel = providerId === "openrouter" ? t("modelIdFromOpenRouter") : t("modelId");
    const inputPlaceholder =
      providerId === "openrouter"
        ? t("openRouterModelPlaceholder")
        : isCcCompatible
          ? "claude-sonnet-4-6"
          : isAnthropicCompatible
            ? t("anthropicCompatibleModelPlaceholder")
            : t("openaiCompatibleModelPlaceholder");

    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          {autoSyncToggle}
          {clearAllButton}
        </div>
        <CompatibleModelsSection
          providerStorageAlias={providerStorageAlias}
          providerDisplayAlias={providerDisplayAlias}
          modelAliases={modelAliases}
          availableModels={syncedAvailableModels}
          customModels={modelMeta.customModels}
          fallbackModels={compatibleFallbackModels}
          description={description}
          inputLabel={inputLabel}
          inputPlaceholder={inputPlaceholder}
          copied={copied}
          onCopy={onCopy}
          onSetAlias={onSetAlias}
          onDeleteAlias={onDeleteAlias}
          connections={connections}
          isAnthropic={isAnthropicProtocolCompatible}
          onImportWithProgress={handleCompatibleImportWithProgress}
          t={t}
          effectiveModelNormalize={effectiveModelNormalize}
          effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
          getUpstreamHeadersRecord={getUpstreamHeadersRecordForModel}
          saveModelCompatFlags={saveModelCompatFlags}
          compatSavingModelId={compatSavingModelId}
          onModelsChanged={fetchProviderModelMeta}
          allowImport={allowModelImport && compatibleSupportsModelImport}
          isModelHidden={effectiveModelHidden}
          onToggleHidden={(modelId, hidden) => handleToggleModelHidden(providerId, modelId, hidden)}
          onBulkToggleHidden={(modelIds, hidden) =>
            handleBulkToggleModelHidden(providerId, modelIds, hidden)
          }
          bulkTogglePending={bulkVisibilityAction !== null}
          togglingModelId={togglingModelId}
          onTestModel={onTestModel}
          modelTestStatus={modelTestStatus}
          testingModelId={testingModelId}
          onTestAll={handleTestAll}
          testingAll={testingAll}
          testProgress={testProgress}
          autoHideFailed={autoHideFailed}
          onAutoHideFailedChange={setAutoHideFailed}
        />
      </div>
    );
  }

  if (providerInfo?.passthroughModels) {
    const passthroughDescription =
      providerId === "openrouter"
        ? t("openRouterAnyModelHint")
        : providerId === "bedrock"
          ? t("bedrockModelsDescription")
          : t("passthroughModelsDescription", { provider: providerInfo?.name || providerId });
    const passthroughInputLabel =
      providerId === "openrouter" ? t("modelIdFromOpenRouter") : t("modelId");
    const passthroughInputPlaceholder =
      providerId === "openrouter"
        ? t("openRouterModelPlaceholder")
        : providerId === "bedrock"
          ? t("bedrockModelPlaceholder")
          : t("openaiCompatibleModelPlaceholder");

    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          {allowModelImport && (
            <Button
              size="sm"
              variant="secondary"
              icon="download"
              onClick={handleImportModels}
              disabled={!canImportModels || importingModels}
            >
              {importingModels ? t("importingModels") : t("importFromModels")}
            </Button>
          )}
          {autoSyncToggle}
          {clearAllButton}
          {allowModelImport && !canImportModels && (
            <span className="text-xs text-text-muted">{t("addConnectionToImport")}</span>
          )}
        </div>
        <PassthroughModelsSection
          providerAlias={providerAlias}
          modelAliases={modelAliases}
          catalogModels={models}
          availableModels={syncedAvailableModels}
          customModels={modelMeta.customModels}
          description={passthroughDescription}
          inputLabel={passthroughInputLabel}
          inputPlaceholder={passthroughInputPlaceholder}
          copied={copied}
          onCopy={onCopy}
          onSetAlias={onSetAlias}
          onDeleteAlias={onDeleteAlias}
          t={t}
          effectiveModelNormalize={effectiveModelNormalize}
          effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
          getUpstreamHeadersRecord={getUpstreamHeadersRecordForModel}
          saveModelCompatFlags={saveModelCompatFlags}
          compatSavingModelId={compatSavingModelId}
          isModelHidden={effectiveModelHidden}
          onToggleHidden={(modelId, hidden) => handleToggleModelHidden(providerId, modelId, hidden)}
          onBulkToggleHidden={(modelIds, hidden) =>
            handleBulkToggleModelHidden(providerId, modelIds, hidden)
          }
          bulkTogglePending={bulkVisibilityAction !== null}
          togglingModelId={togglingModelId}
          onTestModel={onTestModel}
          modelTestStatus={modelTestStatus}
          onModelTestStatusChange={onModelTestStatusChange}
          testingModelId={testingModelId}
          providerId={providerId}
          connectionId={selectedConnection?.id ?? ""}
          autoHideFailed={autoHideFailed}
          onAutoHideFailedChange={setAutoHideFailed}
        />
      </div>
    );
  }

  const importButton = allowModelImport ? (
    <div className="flex items-center gap-2 mb-4">
      <Button
        size="sm"
        variant="secondary"
        icon="download"
        onClick={handleImportModels}
        disabled={!canImportModels || importingModels}
      >
        {importingModels ? t("importingModels") : t("importFromModels")}
      </Button>
      {autoSyncToggle}
      {!canImportModels && (
        <span className="text-xs text-text-muted">{t("addConnectionToImport")}</span>
      )}
    </div>
  ) : null;

  if (models.length === 0) {
    return (
      <div>
        {importButton}
        <p className="text-sm text-text-muted">{t("noModelsConfigured")}</p>
      </div>
    );
  }

  const aliasByModelId = Object.entries(modelAliases).reduce<Record<string, string>>(
    (acc, [alias, fullModel]) => {
      const prefix = `${providerDisplayAlias}/`;
      if (fullModel.startsWith(prefix)) {
        const modelId = fullModel.slice(prefix.length);
        const displayAlias = getDisplayModelAlias(modelId, alias);
        if (displayAlias) acc[modelId] = displayAlias;
      }
      return acc;
    },
    {}
  );

  const modelsWithVisibility = models.map((model) => ({
    ...model,
    isHidden: effectiveModelHidden(model.id),
    isFree: isFreeModel(providerId, { id: model.id }),
  }));
  const filteredModels = modelsWithVisibility.filter((model) => {
    const matchesQuery = matchesModelCatalogQuery(modelFilter, {
      modelId: model.id,
      modelName: model.name,
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
    ? sortModelsFreeFirst(filteredModels, { isFree: (m) => m.isFree, key: (m) => m.id })
    : filteredModels;
  const activeCount = modelsWithVisibility.filter((m) => !m.isHidden).length;
  const hiddenFilteredCount = filteredModels.filter((m) => m.isHidden).length;
  const visibleFilteredCount = filteredModels.length - hiddenFilteredCount;
  const testAllTargets = filteredModels
    .filter((m) => !m.isHidden)
    .map((m) => ({ modelId: m.id, fullModel: `${providerDisplayAlias}/${m.id}` }));

  return (
    <div>
      {importButton}
      {modelsWithVisibility.length > 0 && (
        <ModelVisibilityToolbar
          t={t}
          filterValue={modelFilter}
          onFilterChange={setModelFilter}
          activeCount={activeCount}
          totalCount={modelsWithVisibility.length}
          onSelectAll={() =>
            handleBulkToggleModelHidden(
              providerId,
              filteredModels.map((model) => model.id),
              false
            )
          }
          onDeselectAll={() =>
            handleBulkToggleModelHidden(
              providerId,
              filteredModels.map((model) => model.id),
              true
            )
          }
          selectAllDisabled={hiddenFilteredCount === 0 || bulkVisibilityAction !== null}
          deselectAllDisabled={visibleFilteredCount === 0 || bulkVisibilityAction !== null}
          onTestAll={() => handleTestAll(testAllTargets)}
          testingAll={testingAll}
          testProgress={testProgress}
          visibilityFilter={visibilityFilter}
          onVisibilityFilterChange={setVisibilityFilter}
          autoHideFailed={autoHideFailed}
          onAutoHideFailedChange={setAutoHideFailed}
          freeFilter={freeFilter}
          onFreeFilterChange={setFreeFilter}
          sortFreeFirst={sortFreeFirst}
          onSortFreeFirstChange={setSortFreeFirst}
        />
      )}
      <div className="flex flex-wrap gap-3">
        {displayModels.map((model) => {
          return (
            <ModelRow
              key={model.id}
              model={model}
              fullModel={`${providerDisplayAlias}/${model.id}`}
              provider={providerId}
              alias={aliasByModelId[model.id]}
              copied={copied}
              onCopy={onCopy}
              onSetAlias={(a) => onSetAlias(model.id, a, providerDisplayAlias)}
              onDeleteAlias={
                aliasByModelId[model.id] ? () => onDeleteAlias(aliasByModelId[model.id]) : undefined
              }
              t={t}
              showDeveloperToggle
              effectiveModelNormalize={effectiveModelNormalize}
              effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
              getUpstreamHeadersRecord={(p) => getUpstreamHeadersRecordForModel(model.id, p)}
              saveModelCompatFlags={saveModelCompatFlags}
              compatDisabled={compatSavingModelId === model.id}
              onToggleHidden={(modelId, hidden) =>
                handleToggleModelHidden(providerId, modelId, hidden)
              }
              togglingHidden={togglingModelId === model.id}
              onTestModel={onTestModel}
              testStatus={modelTestStatus[model.id] || null}
              testingModel={testingModelId === model.id}
            />
          );
        })}
        {filteredModels.length === 0 && modelFilter && (
          <p className="text-sm text-text-muted py-2">
            {providerText(t, "noModelsMatch", `No models match "${modelFilter}"`, {
              filter: modelFilter,
            })}
          </p>
        )}
      </div>
    </div>
  );
}
