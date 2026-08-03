"use client";

import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { getProviderDisplayName } from "@/lib/display/names";
import { Input } from "@/shared/components";
import {
  isModelIndividuallyToggleable,
  restoreProviderScopeSelection,
  toggleProviderWildcardSelection,
} from "../apiManagerPageUtils";
import type { ProviderModelRef } from "../apiManagerPageUtils";

export interface ProviderPermissionModel {
  id: string;
  owned_by: string;
  name?: string;
}

/** Tuple type for models grouped by provider display label. */
export type ProviderGroup = [provider: string, models: ProviderPermissionModel[]];

interface ProviderModelPermissionListProps {
  /** Search-filtered groups to render. */
  modelsByProvider: ProviderGroup[];
  /** Unfiltered catalog (provider selection spans the full provider, not just filtered rows). */
  allModels: ProviderPermissionModel[];
  selectedModels: string[];
  expandedProviders: Set<string>;
  searchModel: string;
  onSearchChange: (value: string) => void;
  onToggleExpand: (provider: string) => void;
  onSelectionChange: (next: string[]) => void;
  getModelDisplayName: (modelId: string) => string;
  onClaudeCodeDefaultDeselected?: () => void;
}

/**
 * Resolve the single canonical provider owner for a visible group, or null
 * when the group merges multiple owners (e.g. shared display label) or is
 * combo-owned — those groups keep the legacy snapshot-selection behavior.
 */
function resolveGroupProviderOwner(models: ProviderPermissionModel[]): string | null {
  let owner: string | null = null;
  for (const model of models) {
    const modelOwner = model.owned_by;
    if (!modelOwner || modelOwner === "combo") return null;
    if (owner === null) owner = modelOwner;
    else if (modelOwner !== owner) return null;
  }
  return owner;
}

function getModelRef(model: ProviderPermissionModel): ProviderModelRef {
  return { id: model.id, owned_by: model.owned_by };
}

function ProviderSelectionCheckbox({
  provider,
  checked,
  indeterminate,
  onChange,
}: {
  provider: string;
  checked: boolean;
  indeterminate: boolean;
  onChange: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={inputRef}
      type="checkbox"
      aria-label={`${provider} model access`}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-border accent-[var(--color-primary)] cursor-pointer shrink-0"
    />
  );
}

const ProviderModelPermissionList = memo(function ProviderModelPermissionList({
  modelsByProvider,
  allModels,
  selectedModels,
  expandedProviders,
  searchModel,
  onSearchChange,
  onToggleExpand,
  onSelectionChange,
  getModelDisplayName,
  onClaudeCodeDefaultDeselected,
}: ProviderModelPermissionListProps) {
  const t = useTranslations("apiManager");

  const providerModelRefs = useMemo(() => allModels.map(getModelRef), [allModels]);

  const allModelsByOwner = useMemo(() => {
    const grouped = new Map<string, ProviderModelRef[]>();
    for (const model of allModels) {
      const list = grouped.get(model.owned_by);
      const ref = getModelRef(model);
      if (list) list.push(ref);
      else grouped.set(model.owned_by, [ref]);
    }
    return grouped;
  }, [allModels]);

  const { providerWildcards } = useMemo(
    () => restoreProviderScopeSelection(selectedModels),
    [selectedModels]
  );
  const selectedProviderScopes = useMemo(() => new Set(providerWildcards), [providerWildcards]);

  const groupOwners = useMemo(
    () =>
      new Map<string, string | null>(
        modelsByProvider.map(([provider, models]) => [provider, resolveGroupProviderOwner(models)])
      ),
    [modelsByProvider]
  );

  const handleProviderCheckedChange = useCallback(
    (provider: string) => {
      const owner = groupOwners.get(provider);
      if (!owner) return;
      const next = toggleProviderWildcardSelection(selectedModels, owner, {
        providerId: owner,
        providerModels: allModelsByOwner.get(owner) ?? providerModelRefs,
      });
      onSelectionChange(next);
    },
    [groupOwners, selectedModels, allModelsByOwner, providerModelRefs, onSelectionChange]
  );

  const handleSnapshotToggleProvider = useCallback(
    (provider: string, models: ProviderPermissionModel[]) => {
      // Legacy behavior for groups without a single real owner: toggle the
      // exact ids across the full unfiltered catalog for that display label,
      // not just the currently search-filtered subset.
      const ownerModels = allModels.filter(
        (model) => (getProviderDisplayName(model.owned_by) || model.owned_by) === provider
      );
      const modelIds = (ownerModels.length > 0 ? ownerModels : models).map((model) => model.id);
      const allSelected = modelIds.every((id) => selectedModels.includes(id));
      if (allSelected) {
        onSelectionChange(selectedModels.filter((id) => !modelIds.includes(id)));
      } else {
        onSelectionChange([...new Set([...selectedModels, ...modelIds])]);
      }
    },
    [allModels, selectedModels, onSelectionChange]
  );

  const handleToggleModel = useCallback(
    (model: ProviderPermissionModel) => {
      if (!isModelIndividuallyToggleable(selectedModels, model.id, { ownedBy: model.owned_by }))
        return;
      if (selectedModels.includes(model.id)) {
        if (onClaudeCodeDefaultDeselected) onClaudeCodeDefaultDeselected();
        onSelectionChange(selectedModels.filter((id) => id !== model.id));
      } else {
        onSelectionChange([...selectedModels, model.id]);
      }
    },
    [selectedModels, onSelectionChange, onClaudeCodeDefaultDeselected]
  );

  return (
    <>
      <div className="relative">
        <Input
          value={searchModel}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("searchModels")}
          icon="search"
        />
        {searchModel && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      <div className="max-h-[280px] overflow-y-auto border border-border rounded-lg divide-y divide-border">
        {modelsByProvider.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-text-muted">
            <span className="material-symbols-outlined text-2xl mb-1">search_off</span>
            <p className="text-xs">{t("noModelsFound")}</p>
          </div>
        ) : (
          modelsByProvider.map(([provider, models]) => {
            const owner = groupOwners.get(provider) ?? null;
            const useProviderScope = owner !== null;
            const providerScopeSelected = useProviderScope
              ? selectedProviderScopes.has(`${owner}/*`)
              : false;
            const selectedInProvider = selectedModels.filter((m) =>
              models.some((model) => model.id === m)
            ).length;
            const allSelected = useProviderScope
              ? providerScopeSelected
              : models.every((m) => selectedModels.includes(m.id));
            const someSelected = !allSelected && (selectedInProvider > 0 || providerScopeSelected);
            const selectedCount = useProviderScope ? models.length : selectedInProvider;

            return (
              <div key={provider} className="group">
                <div className="w-full flex items-center gap-2 px-3 py-2 hover:bg-surface/50 transition-colors text-left">
                  <button
                    type="button"
                    onClick={() => onToggleExpand(provider)}
                    className="flex items-center shrink-0"
                    aria-label={provider}
                  >
                    <span
                      className={`material-symbols-outlined text-base transition-transform duration-200 ${
                        expandedProviders.has(provider) ? "rotate-90" : ""
                      }`}
                    >
                      chevron_right
                    </span>
                  </button>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <ProviderSelectionCheckbox
                      provider={provider}
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={() => {
                        if (useProviderScope) handleProviderCheckedChange(provider);
                        else handleSnapshotToggleProvider(provider, models);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => onToggleExpand(provider)}
                      className="text-xs font-semibold text-text-main truncate"
                    >
                      {provider}
                    </button>
                    <span className="text-[10px] text-text-muted bg-surface px-1 py-0.5 rounded shrink-0">
                      {models.length}
                    </span>
                  </div>
                  {selectedCount > 0 && (
                    <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full shrink-0">
                      {selectedCount}
                    </span>
                  )}
                </div>

                {/* Expandable model list */}
                {expandedProviders.has(provider) && (
                  <div className="px-3 pb-2 pl-9">
                    <div className="flex flex-wrap gap-1">
                      {models.map((model) => {
                        const isSelected =
                          providerScopeSelected || selectedModels.includes(model.id);
                        const isToggleable = isModelIndividuallyToggleable(
                          selectedModels,
                          model.id,
                          { ownedBy: model.owned_by }
                        );
                        return (
                          <button
                            key={model.id}
                            type="button"
                            disabled={!isToggleable}
                            onClick={() => handleToggleModel(model)}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono transition-all ${
                              isSelected
                                ? "bg-primary text-white"
                                : "bg-surface border border-border text-text-muted hover:border-primary/50 hover:text-text-main"
                            } ${isToggleable ? "" : "opacity-70 cursor-not-allowed"}`}
                            title={model.id}
                          >
                            {getModelDisplayName(model.id)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
});

export default ProviderModelPermissionList;
