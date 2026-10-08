"use client";

import {
  useMemo,
  useState,
  useCallback,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useTranslations } from "next-intl";
import {
  formatProviderModelPermissionSummary,
  restoreProviderScopeSelection,
} from "@/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils";
import ProviderModelPermissionList, {
  type ProviderGroup,
  type ProviderPermissionModel as Model,
} from "@/app/(dashboard)/dashboard/api-manager/components/ProviderModelPermissionList";
import { ApiKeyCatalogScopeSelect } from "@/app/(dashboard)/dashboard/api-manager/components/ApiKeyCatalogScopeSelect";
import type { CatalogScope } from "@/app/(dashboard)/dashboard/api-manager/components/ApiKeyCatalogScopeSelect";
import {
  CLAUDE_CODE_DEFAULT_MODEL_ID,
  CLAUDE_CODE_DEFAULT_MODEL_NAME,
  CLAUDE_CODE_DEFAULT_FAMILIES,
  type ClaudeCodeBlockableFamilyId,
  type ApiKeyAccessFormState,
} from "../useApiKeyAccessForm";
import TabErrorList from "./TabErrorList";

export type { Model, ProviderGroup };

interface ModelsTabProps {
  formState: ApiKeyAccessFormState;
  allModels: Model[];
  modelsByProvider: ProviderGroup[];
  modelsLoaded: boolean;
  searchModel: string;
  onSearchChange: (search: string) => void;
  setAllowAll: (allow: boolean) => void;
  setSelectedModels: (models: string[]) => void;
  toggleModel: (modelId: string) => void;
  selectAllModels: (allModelIds: string[]) => void;
  deselectAllModels: () => void;
  blockClaudeCodeFamily: (familyId: ClaudeCodeBlockableFamilyId) => void;
  setCatalogScope: (scope: CatalogScope) => void;
  setDisableNonPublicModels: (disabled: boolean) => void;
  errors?: string[];
}

/** What the key currently allows, split into provider wildcards and exact models. */
interface SelectedScopeSummary {
  selectedProviderCount: number;
  selectedModelCount: number;
  selectedCount: number;
  selectedPermissionSummary: string;
  selectedExactModels: string[];
  orderedSelectedProviderScopes: string[];
}

function getModelDisplayName(modelId: string) {
  return modelId === CLAUDE_CODE_DEFAULT_MODEL_ID ? CLAUDE_CODE_DEFAULT_MODEL_NAME : modelId;
}

function useSelectedScopeSummary(formState: ApiKeyAccessFormState): SelectedScopeSummary {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  const { providerWildcards: selectedProviderScopes, exactModels: selectedExactModels } = useMemo(
    () => restoreProviderScopeSelection(formState.selectedModels),
    [formState.selectedModels]
  );

  const selectedProviderCount = selectedProviderScopes.length;
  const selectedModelCount = selectedExactModels.length;

  const hasClaudeCodeDefaultSelected =
    !formState.allowAll && formState.selectedModels.includes(CLAUDE_CODE_DEFAULT_MODEL_ID);

  const orderedSelectedProviderScopes = useMemo(() => {
    if (!hasClaudeCodeDefaultSelected) return selectedProviderScopes;
    return [
      CLAUDE_CODE_DEFAULT_MODEL_ID,
      ...selectedProviderScopes.filter((scope) => scope !== CLAUDE_CODE_DEFAULT_MODEL_ID),
    ];
  }, [hasClaudeCodeDefaultSelected, selectedProviderScopes]);

  return {
    selectedProviderCount,
    selectedModelCount,
    selectedCount: formState.selectedModels.length,
    selectedPermissionSummary: formatProviderModelPermissionSummary(
      selectedProviderCount,
      selectedModelCount,
      t,
      tc
    ),
    selectedExactModels,
    orderedSelectedProviderScopes,
  };
}

/**
 * Expanded provider groups. The key and the catalog load in parallel, so the provider list may
 * still be empty when this tab mounts. Decide once, on the first non-empty list: a key that
 * already has selections opens with every group expanded (as the old modal did); later collapses
 * are left alone.
 */
function useProviderGroupExpansion(modelsByProvider: ProviderGroup[], hasSelectedModels: boolean) {
  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(() => new Set());
  const [initialExpansionDone, setInitialExpansionDone] = useState(false);
  if (!initialExpansionDone && modelsByProvider.length > 0) {
    setInitialExpansionDone(true);
    if (hasSelectedModels) {
      setExpandedProviders(new Set(modelsByProvider.map(([p]) => p)));
    }
  }

  const expandAllProviders = useCallback(() => {
    setExpandedProviders(new Set(modelsByProvider.map(([p]) => p)));
  }, [modelsByProvider]);

  const handleToggleExpand = useCallback((provider: string) => {
    setExpandedProviders((prev) => {
      const next = new Set(prev);
      if (next.has(provider)) {
        next.delete(provider);
      } else {
        next.add(provider);
      }
      return next;
    });
  }, []);

  return { expandedProviders, expandAllProviders, handleToggleExpand };
}

/** Allow-all / restrict switching, and the disclosure of the Claude Code default families. */
function useModelAccessModeHandlers(
  setAllowAll: ModelsTabProps["setAllowAll"],
  expandAllProviders: () => void
) {
  const [claudeCodeFamiliesExpanded, setClaudeCodeFamiliesExpanded] = useState(false);

  const handleSelectAll = useCallback(() => {
    setAllowAll(true);
    setClaudeCodeFamiliesExpanded(false);
  }, [setAllowAll]);

  const handleRestrictMode = useCallback(() => {
    setAllowAll(false);
    expandAllProviders();
  }, [setAllowAll, expandAllProviders]);

  const handleClaudeCodeDefaultDeselected = useCallback(() => {
    setClaudeCodeFamiliesExpanded(false);
  }, []);

  return {
    claudeCodeFamiliesExpanded,
    setClaudeCodeFamiliesExpanded,
    handleSelectAll,
    handleRestrictMode,
    handleClaudeCodeDefaultDeselected,
  };
}

function ModelAccessModeToggle({
  allowAll,
  onSelectAll,
  onRestrict,
}: {
  allowAll: boolean;
  onSelectAll: () => void;
  onRestrict: () => void;
}) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex gap-2 p-1 bg-surface rounded-lg">
      {/* Access Mode Toggle */}
      <button
        type="button"
        onClick={onSelectAll}
        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
          allowAll
            ? "bg-primary text-white"
            : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">lock_open</span>
        {t("allowAll")}
      </button>
      <button
        type="button"
        onClick={onRestrict}
        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
          !allowAll
            ? "bg-primary text-white"
            : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">lock</span>
        {t("restrict")}
      </button>
    </div>
  );
}

function ModelAccessInfoBanner({
  formState,
  modelsLoaded,
  scopeSummary,
  totalModels,
}: {
  formState: ApiKeyAccessFormState;
  modelsLoaded: boolean;
  scopeSummary: SelectedScopeSummary;
  totalModels: number;
}) {
  const t = useTranslations("apiManager");
  const { selectedProviderCount, selectedPermissionSummary, selectedCount } = scopeSummary;

  return (
    <div
      className={`flex items-start gap-2 p-3 rounded-lg ${
        formState.allowAll
          ? "bg-green-500/10 border border-green-500/30"
          : "bg-amber-500/10 border border-amber-500/30"
      }`}
    >
      {/* Info Banner */}
      <span
        className={`material-symbols-outlined text-[18px] ${
          formState.allowAll ? "text-green-500" : "text-amber-500"
        }`}
      >
        {formState.allowAll ? "info" : "warning"}
      </span>
      <p
        className={`text-xs ${
          formState.allowAll
            ? "text-green-700 dark:text-green-300"
            : "text-amber-700 dark:text-amber-300"
        }`}
      >
        {formState.allowAll
          ? t("allowAllDesc")
          : !modelsLoaded
            ? t("restrictLoading")
            : selectedProviderCount > 0
              ? selectedPermissionSummary
              : totalModels === 0
                ? t("restrictCatalogUnavailable", { selectedCount })
                : t("restrictDesc", { selectedCount, totalModels })}
      </p>
    </div>
  );
}

function CatalogVisibilitySettings({
  formState,
  setCatalogScope,
  setDisableNonPublicModels,
}: Pick<ModelsTabProps, "formState" | "setCatalogScope" | "setDisableNonPublicModels">) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  return (
    <>
      {/* Catalog Scope */}
      <ApiKeyCatalogScopeSelect value={formState.catalogScope} onChange={setCatalogScope} />

      {/* Disable Non-Public Models Toggle */}
      <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("disableNonPublicModels")}</p>
          <p className="text-xs text-text-muted">{t("disableNonPublicModelsDesc")}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={formState.disableNonPublicModels}
          onClick={() => setDisableNonPublicModels(!formState.disableNonPublicModels)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            formState.disableNonPublicModels
              ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
              : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {formState.disableNonPublicModels ? "shield_lock" : "shield"}
          </span>
          {formState.disableNonPublicModels ? tc("yes") : tc("no")}
        </button>
      </div>
    </>
  );
}

interface ClaudeCodeFamilyState {
  claudeCodeFamiliesExpanded: boolean;
  setClaudeCodeFamiliesExpanded: Dispatch<SetStateAction<boolean>>;
}

type SelectedModelsSummaryProps = ClaudeCodeFamilyState &
  Pick<
    ModelsTabProps,
    "formState" | "allModels" | "toggleModel" | "selectAllModels" | "deselectAllModels"
  > &
  Pick<ModelsTabProps, "blockClaudeCodeFamily"> & { scopeSummary: SelectedScopeSummary };

function SelectedModelsSummary({
  formState,
  allModels,
  scopeSummary,
  toggleModel,
  selectAllModels,
  deselectAllModels,
  blockClaudeCodeFamily,
  claudeCodeFamiliesExpanded,
  setClaudeCodeFamiliesExpanded,
}: SelectedModelsSummaryProps) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");
  const {
    selectedPermissionSummary,
    selectedProviderCount,
    selectedModelCount,
    orderedSelectedProviderScopes,
    selectedExactModels,
  } = scopeSummary;

  return (
    <div className="flex flex-col gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
      {/* Selected Models Summary (only in restrict mode) */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-primary">{selectedPermissionSummary}</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => selectAllModels(allModels.map((m) => m.id))}
            className="text-[10px] text-primary hover:bg-primary/10 px-1.5 py-0.5 rounded transition-colors"
          >
            {tc("all")}
          </button>
          <button
            type="button"
            onClick={deselectAllModels}
            className="text-[10px] text-red-500 hover:bg-red-500/10 px-1.5 py-0.5 rounded transition-colors"
          >
            {t("clear")}
          </button>
        </div>
      </div>

      {selectedProviderCount > 0 && (
        <SelectedChipGroup label={tc("providers")} listClassName="flex flex-wrap gap-1">
          {orderedSelectedProviderScopes.map((scope) =>
            scope === CLAUDE_CODE_DEFAULT_MODEL_ID ? (
              <ClaudeCodeDefaultScopeChip
                key={scope}
                scope={scope}
                blockedClaudeCodeFamilies={formState.blockedClaudeCodeFamilies}
                toggleModel={toggleModel}
                blockClaudeCodeFamily={blockClaudeCodeFamily}
                claudeCodeFamiliesExpanded={claudeCodeFamiliesExpanded}
                setClaudeCodeFamiliesExpanded={setClaudeCodeFamiliesExpanded}
              />
            ) : (
              <ProviderScopeChip key={scope} scope={scope} toggleModel={toggleModel} />
            )
          )}
        </SelectedChipGroup>
      )}

      {selectedModelCount > 0 && (
        <SelectedChipGroup
          label={tc("models")}
          listClassName="flex flex-wrap gap-1 max-h-36 overflow-y-auto content-start"
        >
          {selectedExactModels.map((modelId) => (
            <SelectedModelChip key={modelId} modelId={modelId} toggleModel={toggleModel} />
          ))}
        </SelectedChipGroup>
      )}
    </div>
  );
}

function SelectedChipGroup({
  label,
  listClassName,
  children,
}: {
  label: string;
  listClassName: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </span>
      <div className={listClassName}>{children}</div>
    </div>
  );
}

function ClaudeCodeDefaultScopeChip({
  scope,
  blockedClaudeCodeFamilies,
  toggleModel,
  blockClaudeCodeFamily,
  claudeCodeFamiliesExpanded,
  setClaudeCodeFamiliesExpanded,
}: ClaudeCodeFamilyState &
  Pick<ModelsTabProps, "toggleModel" | "blockClaudeCodeFamily"> & {
    scope: string;
    blockedClaudeCodeFamilies: ClaudeCodeBlockableFamilyId[];
  }) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col gap-1 basis-full">
      <span className="inline-flex w-fit items-center gap-0.5 px-1.5 py-0.5 bg-primary/10 text-text-main text-[10px] rounded border border-primary/35">
        <button
          type="button"
          onClick={() => setClaudeCodeFamiliesExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1 font-mono text-text-main"
          title={t("expandClaudeCodeFamilies")}
          aria-expanded={claudeCodeFamiliesExpanded}
        >
          <span className="truncate max-w-[140px]" title={scope}>
            {CLAUDE_CODE_DEFAULT_MODEL_NAME}
          </span>
          <span className="material-symbols-outlined text-[12px] text-primary">
            {claudeCodeFamiliesExpanded ? "expand_less" : "expand_more"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => toggleModel(scope)}
          className="text-text-muted hover:text-red-500 transition-colors"
          title={t("removeClaudeCodeDefault")}
        >
          <span className="material-symbols-outlined text-[12px]">close</span>
        </button>
      </span>

      {claudeCodeFamiliesExpanded && (
        <ClaudeCodeFamilyChips
          blockedClaudeCodeFamilies={blockedClaudeCodeFamilies}
          blockClaudeCodeFamily={blockClaudeCodeFamily}
        />
      )}
    </div>
  );
}

function ClaudeCodeFamilyChips({
  blockedClaudeCodeFamilies,
  blockClaudeCodeFamily,
}: Pick<ModelsTabProps, "blockClaudeCodeFamily"> & {
  blockedClaudeCodeFamilies: ClaudeCodeBlockableFamilyId[];
}) {
  const visibleClaudeCodeFamilies = useMemo(
    () =>
      CLAUDE_CODE_DEFAULT_FAMILIES.filter(
        (family) =>
          family.id === "other" ||
          !blockedClaudeCodeFamilies.includes(family.id as ClaudeCodeBlockableFamilyId)
      ),
    [blockedClaudeCodeFamilies]
  );

  return (
    <div className="relative ml-2 flex flex-wrap gap-1 pl-5 animate-in fade-in slide-in-from-top-1 duration-150">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1.5 top-0 bottom-1 w-px bg-primary/25"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1.5 top-3 h-px w-3 bg-primary/25"
      />
      {visibleClaudeCodeFamilies.map((family) => {
        const canBlock = family.id !== "other";
        return (
          <span
            key={family.id}
            className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] rounded border ${
              canBlock
                ? "bg-white dark:bg-surface text-text-main border-border"
                : "bg-black/5 dark:bg-white/5 text-text-muted border-border"
            }`}
            title={
              canBlock
                ? `Allow ${family.label} family through Claude Code default`
                : "Catch-all for other Claude Code models"
            }
          >
            <span className="font-mono">{family.label}</span>
            {canBlock && (
              <button
                type="button"
                onClick={() => blockClaudeCodeFamily(family.id as ClaudeCodeBlockableFamilyId)}
                className="text-text-muted hover:text-red-500 transition-colors"
                title={`Block ${family.label} family`}
              >
                <span className="material-symbols-outlined text-[12px]">close</span>
              </button>
            )}
          </span>
        );
      })}
    </div>
  );
}

function ProviderScopeChip({
  scope,
  toggleModel,
}: Pick<ModelsTabProps, "toggleModel"> & { scope: string }) {
  const provider = scope.slice(0, -2);
  return (
    <span
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/10 text-text-main text-[10px] rounded border border-primary/35"
      title={scope}
    >
      <span className="font-mono truncate max-w-[120px]">{provider}</span>
      <button
        type="button"
        onClick={() => toggleModel(scope)}
        className="text-text-muted hover:text-red-500 transition-colors"
      >
        <span className="material-symbols-outlined text-[12px]">close</span>
      </button>
    </span>
  );
}

function SelectedModelChip({
  modelId,
  toggleModel,
}: Pick<ModelsTabProps, "toggleModel"> & { modelId: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white dark:bg-surface text-text-main text-[10px] rounded border border-border">
      <span className="font-mono truncate max-w-[120px]" title={modelId}>
        {getModelDisplayName(modelId)}
      </span>
      <button
        type="button"
        onClick={() => toggleModel(modelId)}
        className="text-text-muted hover:text-red-500 transition-colors"
      >
        <span className="material-symbols-outlined text-[12px]">close</span>
      </button>
    </span>
  );
}

export default function ModelsTab({
  formState,
  allModels,
  modelsByProvider,
  modelsLoaded,
  searchModel,
  onSearchChange,
  setAllowAll,
  setSelectedModels,
  toggleModel,
  selectAllModels,
  deselectAllModels,
  blockClaudeCodeFamily,
  setCatalogScope,
  setDisableNonPublicModels,
  errors,
}: ModelsTabProps) {
  const { expandedProviders, expandAllProviders, handleToggleExpand } = useProviderGroupExpansion(
    modelsByProvider,
    formState.selectedModels.length > 0
  );
  const accessMode = useModelAccessModeHandlers(setAllowAll, expandAllProviders);
  const scopeSummary = useSelectedScopeSummary(formState);

  return (
    <div className="flex flex-col gap-5">
      <TabErrorList errors={errors} />
      <ModelAccessModeToggle
        allowAll={formState.allowAll}
        onSelectAll={accessMode.handleSelectAll}
        onRestrict={accessMode.handleRestrictMode}
      />
      <ModelAccessInfoBanner
        formState={formState}
        modelsLoaded={modelsLoaded}
        scopeSummary={scopeSummary}
        totalModels={allModels.length}
      />
      <CatalogVisibilitySettings
        formState={formState}
        setCatalogScope={setCatalogScope}
        setDisableNonPublicModels={setDisableNonPublicModels}
      />
      {!formState.allowAll && scopeSummary.selectedCount > 0 && (
        <SelectedModelsSummary
          formState={formState}
          allModels={allModels}
          scopeSummary={scopeSummary}
          toggleModel={toggleModel}
          selectAllModels={selectAllModels}
          deselectAllModels={deselectAllModels}
          blockClaudeCodeFamily={blockClaudeCodeFamily}
          claudeCodeFamiliesExpanded={accessMode.claudeCodeFamiliesExpanded}
          setClaudeCodeFamiliesExpanded={accessMode.setClaudeCodeFamiliesExpanded}
        />
      )}

      {/* Model Selection List (only in restrict mode) */}
      {!formState.allowAll && (
        <ProviderModelPermissionList
          modelsByProvider={modelsByProvider}
          allModels={allModels}
          selectedModels={formState.selectedModels}
          expandedProviders={expandedProviders}
          searchModel={searchModel}
          onSearchChange={onSearchChange}
          onToggleExpand={handleToggleExpand}
          onSelectionChange={setSelectedModels}
          getModelDisplayName={getModelDisplayName}
          onClaudeCodeDefaultDeselected={accessMode.handleClaudeCodeDefaultDeselected}
        />
      )}
    </div>
  );
}
