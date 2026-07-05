"use client";
/**
 * PassthroughModelsSection — Issue #3501 Phase 1e
 *
 * Extracted from ProviderDetailPageClient.tsx. Renders the full "passthrough
 * models" panel for non-compatible providers (OpenRouter, etc.).
 *
 * Preserves the Bug #3610 fix intact:
 *   - autoHideFailed is threaded from the outer component (shared checkbox).
 *   - buildPassthroughTestBody / shouldSwitchToVisibleFilter come from the
 *     leaf helper providerPageHelpers.ts.
 *
 * Never imports from ProviderDetailPageClient.
 */
import React, { useState, useMemo } from "react";
import { Button } from "@/shared/components";
import {
  matchesModelCatalogQuery,
  normalizeModelCatalogSource,
} from "@/shared/utils/modelCatalogSearch";
import { useNotificationStore } from "@/store/notificationStore";
import {
  buildCompatMap,
  getDisplayModelAlias,
  providerText,
  testAllResultsText,
  evaluateTestAllEntry,
  buildPassthroughTestBody,
  shouldSwitchToVisibleFilter,
  type CompatModelRow,
  type CompatByProtocolMap,
} from "../providerPageHelpers";
import { ModelVisibilityToolbar } from "./ModelRow";
import { sortModelsFreeFirst, isFreeModel } from "@/shared/utils/freeModels";
import PassthroughModelRow from "./PassthroughModelRow";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type ModelCompatSavePatchPassthrough = {
  normalizeToolCallId?: boolean;
  preserveDeveloperRole?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
};

export interface PassthroughModelsSectionProps {
  providerAlias: string;
  modelAliases: Record<string, string>;
  availableModels?: CompatModelRow[];
  customModels?: CompatModelRow[];
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onSetAlias: (modelId: string, alias: string) => Promise<void>;
  onDeleteAlias: (alias: string) => void;
  t: (key: string, values?: Record<string, unknown>) => string;
  effectiveModelNormalize: (alias: string) => boolean;
  effectiveModelPreserveDeveloper: (alias: string) => boolean;
  getUpstreamHeadersRecord: (modelId: string, protocol: string) => Record<string, string>;
  saveModelCompatFlags: (modelId: string, flags: ModelCompatSavePatchPassthrough) => Promise<void>;
  compatSavingModelId?: string;
  isModelHidden: (modelId: string) => boolean;
  onToggleHidden: (modelId: string, hidden: boolean) => Promise<void>;
  onBulkToggleHidden: (modelIds: string[], hidden: boolean) => Promise<void>;
  bulkTogglePending?: boolean;
  togglingModelId?: string | null;
  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;
  modelTestStatus?: Record<string, "ok" | "error" | null>;
  /** Report a model's test-all result so the parent updates the green/red icon. */
  onModelTestStatusChange?: (modelId: string, status: "ok" | "error") => void;
  testingModelId?: string | null;
  providerId: string;
  connectionId: string;
  /** Controlled from the outer component so both sections share one checkbox (#3610). */
  autoHideFailed?: boolean;
  onAutoHideFailedChange?: (v: boolean) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PassthroughModelsSection({
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
  onModelTestStatusChange,
  testingModelId,
  providerId,
  connectionId,
  // Bug #3610 fix 1: use the prop value when provided; fall back to local state only
  // when the outer component does not pass the prop (backward-compat / standalone use).
  autoHideFailed: autoHideFailedProp,
  onAutoHideFailedChange,
}: PassthroughModelsSectionProps) {
  const [newModel, setNewModel] = useState("");
  const [adding, setAdding] = useState(false);
  const [modelFilter, setModelFilter] = useState("");
  const [testingAll, setTestingAll] = useState(false);
  const [testProgress, setTestProgress] = useState<{ done: number; total: number } | null>(null);
  const [localAutoHideFailed, setLocalAutoHideFailed] = useState(false);
  const autoHideFailed =
    autoHideFailedProp !== undefined ? autoHideFailedProp : localAutoHideFailed;
  const setAutoHideFailed = onAutoHideFailedChange ?? setLocalAutoHideFailed;
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "visible" | "hidden">("all");
  const [freeFilter, setFreeFilter] = useState<"all" | "free" | "paid">("all");
  const [sortFreeFirst, setSortFreeFirst] = useState(false);
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
          // Bug #3610 fix 2: pass autoHideFailed so the server persists the hide
          body: JSON.stringify(
            buildPassthroughTestBody({
              providerId,
              connectionId,
              modelId: model.modelId,
              autoHideFailed,
            })
          ),
        }).then((r) => r.json());

        const entry = result.results?.[model.modelId];
        const outcome = evaluateTestAllEntry(entry, autoHideFailed);
        // Paint the per-model icon green/red, same as the single-model ▶ test.
        onModelTestStatusChange?.(model.modelId, outcome.status);
        if (outcome.status === "ok") {
          ok++;
        } else {
          error++;
          if (outcome.shouldHide) {
            await onToggleHidden(model.modelId, true);
            hiddenCount++;
          }
        }
      } catch (e) {
        error++;
        onModelTestStatusChange?.(model.modelId, "error");
      }
      setTestProgress((prev) => (prev ? { done: prev.done + 1, total: prev.total } : null));
    }

    notify.info(testAllResultsText(t, ok, ok + error));
    if (hiddenCount > 0) {
      notify.info(providerText(t, "testAllFailedHidden", "{count} hidden", { count: hiddenCount }));
      // Bug #3610 fix 3: switch to "visible" filter so hidden models disappear on-screen
      if (shouldSwitchToVisibleFilter({ autoHideFailed, hiddenCount })) {
        setVisibilityFilter("visible");
      }
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
      const displayAlias = getDisplayModelAlias(modelId, alias as string);
      if (displayAlias) aliasByModelId.set(modelId, displayAlias);
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
          /\bgr[aá]tis\b|\bfree\b/i.test(model.name || "") ||
          isFreeModel(providerId, { id: model.id }),
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
      const displayAlias = getDisplayModelAlias(modelId, alias as string);
      if (!displayAlias) continue;
      const customModel = customModelMap.get(modelId);
      rows.push({
        modelId,
        fullModel: fmStr,
        alias: displayAlias,
        displayName: displayAlias,
        source: customModel ? customModel.source || "custom" : "alias",
        isFree:
          modelId.endsWith(":free") ||
          Boolean((customModel as any)?.free) ||
          /\bgr[aá]tis\b|\bfree\b/i.test(customModel?.name || alias || "") ||
          isFreeModel(providerId, { id: modelId }),
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
    providerId,
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

  // Generate default alias from modelId (last part after /)
  const generateDefaultAlias = (modelId: string) => {
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
            freeFilter={freeFilter}
            onFreeFilterChange={setFreeFilter}
            sortFreeFirst={sortFreeFirst}
            onSortFreeFirstChange={setSortFreeFirst}
          />
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {displayModels.map(({ modelId, fullModel, alias, isHidden, source, isFree }) => (
              <PassthroughModelRow
                key={fullModel as string}
                modelId={modelId}
                fullModel={fullModel}
                alias={alias}
                source={source}
                isFree={isFree}
                isHidden={isHidden}
                copied={copied}
                onCopy={onCopy}
                onDeleteAlias={source === "alias" && alias ? () => onDeleteAlias(alias) : undefined}
                onSetAlias={(a) => onSetAlias(modelId, a)}
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
