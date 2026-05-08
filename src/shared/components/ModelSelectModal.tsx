"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import Modal from "./Modal";
import { getModelsByProviderId, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { getCompatibleFallbackModels } from "@/lib/providers/managedAvailableModels";
import {
  getModelCatalogSourceLabel,
  matchesModelCatalogQuery,
  normalizeModelCatalogSource,
} from "@/shared/utils/modelCatalogSearch";
import {
  OAUTH_PROVIDERS,
  FREE_PROVIDERS,
  APIKEY_PROVIDERS,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";

// Provider order: OAuth first, then Free, then API Key (matches dashboard/providers)
const PROVIDER_ORDER = [
  ...Object.keys(OAUTH_PROVIDERS),
  ...Object.keys(FREE_PROVIDERS),
  ...Object.keys(APIKEY_PROVIDERS),
];

type ModelSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (model: unknown) => void;
  selectedModel?: string;
  selectedModels?: string[];
  activeProviders?: Array<{ provider: string }>;
  title?: string;
  modelAliases?: Record<string, string>;
  addedModelValues?: string[];
  multiSelect?: boolean;
  showCombos?: boolean;
};

export default function ModelSelectModal({
  isOpen,
  onClose,
  onSelect,
  selectedModel,
  selectedModels = [],
  activeProviders = [],
  title,
  modelAliases = {},
  addedModelValues = [],
  multiSelect = false,
  showCombos = true,
}: ModelSelectModalProps) {
  const t = useTranslations("common");
  const resolvedTitle = title ?? t("selectModel");
  const [searchQuery, setSearchQuery] = useState("");
  const [combos, setCombos] = useState<any[]>([]);
  const [providerNodes, setProviderNodes] = useState<any[]>([]);
  const [customModels, setCustomModels] = useState<Record<string, any>>({});

  const fetchCombos = async () => {
    try {
      const res = await fetch("/api/combos");
      if (!res.ok) throw new Error(`Failed to fetch combos: ${res.status}`);
      const data = await res.json();
      setCombos(data.combos || []);
    } catch (error) {
      console.error("Error fetching combos:", error);
      setCombos([]);
    }
  };

  useEffect(() => {
    if (isOpen) fetchCombos();
  }, [isOpen]);

  const fetchProviderNodes = async () => {
    try {
      const res = await fetch("/api/provider-nodes");
      if (!res.ok) throw new Error(`Failed to fetch provider nodes: ${res.status}`);
      const data = await res.json();
      setProviderNodes(data.nodes || []);
    } catch (error) {
      console.error("Error fetching provider nodes:", error);
      setProviderNodes([]);
    }
  };

  useEffect(() => {
    if (isOpen) fetchProviderNodes();
  }, [isOpen]);

  const fetchCustomModels = async () => {
    try {
      const res = await fetch("/api/provider-models");
      if (!res.ok) throw new Error(`Failed to fetch custom models: ${res.status}`);
      const data = await res.json();
      setCustomModels(data.models || {});
    } catch (error) {
      console.error("Error fetching custom models:", error);
      setCustomModels({});
    }
  };

  useEffect(() => {
    if (isOpen) fetchCustomModels();
  }, [isOpen]);

  const allProviders = useMemo(
    () => ({ ...OAUTH_PROVIDERS, ...FREE_PROVIDERS, ...APIKEY_PROVIDERS }),
    []
  );

  // Group models by provider with priority order
  const groupedModels = useMemo(() => {
    const groups: Record<string, any> = {};

    // Get all active provider IDs from connections
    const activeConnectionIds = activeProviders.map((p) => p.provider);

    // Only show connected providers (including both standard and custom)
    const providerIdsToShow = new Set([
      ...activeConnectionIds, // Only connected providers
    ]);

    // Sort by PROVIDER_ORDER
    const sortedProviderIds = [...providerIdsToShow].sort((a, b) => {
      const indexA = PROVIDER_ORDER.indexOf(a);
      const indexB = PROVIDER_ORDER.indexOf(b);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    sortedProviderIds.forEach((providerId) => {
      const alias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
      const providerInfo = allProviders[providerId] || { name: providerId, color: "#666" };
      const isCustomProvider =
        isOpenAICompatibleProvider(providerId) || isAnthropicCompatibleProvider(providerId);

      // Get user-added custom models for this provider (if any)
      const providerCustomModels = customModels[providerId] || [];

      if (providerInfo.passthroughModels) {
        const aliasModels = Object.entries(modelAliases as Record<string, string>)
          .filter(([, fullModel]: [string, string]) => fullModel.startsWith(`${alias}/`))
          .map(([aliasName, fullModel]: [string, string]) => ({
            id: fullModel.replace(`${alias}/`, ""),
            name: aliasName,
            value: fullModel,
            source: "alias",
          }));

        // Merge custom models for passthrough providers
        const customEntries = providerCustomModels
          .filter((cm) => !aliasModels.some((am) => am.id === cm.id))
          .map((cm) => ({
            id: cm.id,
            name: cm.name || cm.id,
            value: `${alias}/${cm.id}`,
            isCustom: true,
            source: normalizeModelCatalogSource(cm.source) === "imported" ? "imported" : "custom",
          }));

        const allModels = [...aliasModels, ...customEntries];

        if (allModels.length > 0) {
          const matchedNode = providerNodes.find((node) => node.id === providerId);
          const displayName = matchedNode?.name || providerInfo.name;

          groups[providerId] = {
            name: displayName,
            alias: alias,
            color: providerInfo.color,
            models: allModels,
          };
        }
      } else if (isCustomProvider) {
        const matchedNode = providerNodes.find((node) => node.id === providerId);
        const displayName = matchedNode?.name || providerInfo.name;
        const nodePrefix = matchedNode?.prefix || providerId; // Consider a more user-friendly fallback if providerId is a UUID

        const nodeModels = Object.entries(modelAliases as Record<string, string>)
          .filter(([, fullModel]: [string, string]) => fullModel.startsWith(`${providerId}/`))
          .map(([aliasName, fullModel]: [string, string]) => ({
            id: fullModel.replace(`${providerId}/`, ""),
            name: aliasName,
            value: `${nodePrefix}/${fullModel.replace(`${providerId}/`, "")}`,
            source: "alias",
          }));

        const fallbackEntries = (
          getCompatibleFallbackModels(providerId, providerCustomModels) || []
        )
          .filter((fm) => !nodeModels.some((nm) => nm.id === fm.id))
          .map((fm) => ({
            id: fm.id,
            name: fm.name || fm.id,
            value: `${nodePrefix}/${fm.id}`,
            isFallback: true,
            source: "fallback",
          }));

        // Merge custom models for custom providers
        const customEntries = providerCustomModels
          .filter(
            (cm) =>
              !nodeModels.some((nm) => nm.id === cm.id) &&
              !fallbackEntries.some((fm) => fm.id === cm.id)
          )
          .map((cm) => ({
            id: cm.id,
            name: cm.name || cm.id,
            value: `${nodePrefix}/${cm.id}`,
            isCustom: true,
            source: normalizeModelCatalogSource(cm.source) === "imported" ? "imported" : "custom",
          }));

        const allModels = [...nodeModels, ...fallbackEntries, ...customEntries];

        if (allModels.length > 0) {
          groups[providerId] = {
            name: displayName,
            alias: nodePrefix,
            color: providerInfo.color,
            models: allModels,
            isCustom: true,
            hasModels: true,
          };
        }
      } else {
        const systemModels = getModelsByProviderId(providerId);

        // Merge system models with user-added custom models
        const systemEntries = systemModels.map((m) => ({
          id: m.id,
          name: m.name,
          value: `${alias}/${m.id}`,
          source: "system",
        }));

        const customEntries = providerCustomModels
          .filter((cm) => !systemModels.some((sm) => sm.id === cm.id))
          .map((cm) => ({
            id: cm.id,
            name: cm.name || cm.id,
            value: `${alias}/${cm.id}`,
            isCustom: true,
            source: normalizeModelCatalogSource(cm.source) === "imported" ? "imported" : "custom",
          }));

        const allModels = [...systemEntries, ...customEntries];

        if (allModels.length > 0) {
          groups[providerId] = {
            name: providerInfo.name,
            alias: alias,
            color: providerInfo.color,
            models: allModels,
          };
        }
      }
    });

    return groups;
  }, [activeProviders, modelAliases, allProviders, providerNodes, customModels]);

  // Filter combos by search query
  const filteredCombos = useMemo(() => {
    if (!searchQuery.trim()) return combos;
    const query = searchQuery.toLowerCase();
    return combos.filter((c) => c.name.toLowerCase().includes(query));
  }, [combos, searchQuery]);

  // Filter models by search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groupedModels;

    const query = searchQuery.toLowerCase();
    const filtered: Record<string, any> = {};

    Object.entries(groupedModels).forEach(([providerId, group]: [string, any]) => {
      const matchedModels = group.models.filter((model) =>
        matchesModelCatalogQuery(query, {
          modelId: model.id,
          modelName: model.name,
          source: model.source,
        })
      );

      const providerNameMatches = group.name.toLowerCase().includes(query);

      if (matchedModels.length > 0 || providerNameMatches) {
        filtered[providerId] = {
          ...group,
          models: matchedModels.length > 0 ? matchedModels : group.models,
        };
      }
    });

    return filtered;
  }, [groupedModels, searchQuery]);

  const resolvedSelectedModels = multiSelect
    ? selectedModels
    : selectedModel
      ? [selectedModel]
      : [];

  const isValueSelected = (value: string) => resolvedSelectedModels.includes(value);

  const handleSelect = (model: any) => {
    onSelect(model);
    if (!multiSelect) {
      onClose();
      setSearchQuery("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSearchQuery("");
      }}
      title={resolvedTitle}
      size="md"
      className="p-4!"
    >
      {/* Search - compact */}
      <div className="mb-3">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-[16px]">
            search
          </span>
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-surface border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Models grouped by provider - compact */}
      <div className="max-h-[300px] overflow-y-auto space-y-3">
        {/* Combos section - always first */}
        {showCombos && filteredCombos.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-1.5 sticky top-0 bg-surface py-0.5">
              <span className="material-symbols-outlined text-primary text-[14px]">layers</span>
              <span className="text-xs font-medium text-primary">{t("combos")}</span>
              <span className="text-[10px] text-text-muted">({filteredCombos.length})</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filteredCombos.map((combo) => {
                const isSelected = isValueSelected(combo.name);
                return (
                  <button
                    key={combo.id}
                    onClick={() =>
                      handleSelect({ id: combo.name, name: combo.name, value: combo.name })
                    }
                    className={`
                      px-2 py-1 rounded-xl text-xs font-medium transition-all border hover:cursor-pointer
                      ${
                        isSelected
                          ? "bg-primary text-white border-primary"
                          : "bg-surface border-border text-text-main hover:border-primary/50 hover:bg-primary/5"
                      }
                    `}
                  >
                    {combo.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Provider models */}
        {Object.entries(filteredGroups).map(([providerId, group]: [string, any]) => (
          <div key={providerId}>
            {/* Provider header */}
            <div className="flex items-center gap-1.5 mb-1.5 sticky top-0 bg-surface py-0.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
              <span className="text-xs font-medium text-primary">{group.name}</span>
              <span className="text-[10px] text-text-muted">({group.models.length})</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {group.models.map((model) => {
                const isSelected = isValueSelected(model.value);
                const isAdded = addedModelValues.includes(model.value);
                return (
                  <button
                    key={model.id}
                    onClick={() => handleSelect(model)}
                    className={`
                      px-2 py-1 rounded-xl text-xs font-medium transition-all border hover:cursor-pointer
                      ${
                        isSelected
                          ? "bg-primary text-white border-primary"
                          : isAdded
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                            : "bg-surface border-border text-text-main hover:border-primary/50 hover:bg-primary/5"
                      }
                    `}
                  >
                    {isAdded && <span className="mr-0.5 opacity-70">✓</span>}
                    {model.name}
                    {model.source && (
                      <span className="ml-1 text-[10px] uppercase opacity-70">
                        {getModelCatalogSourceLabel(model.source)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {Object.keys(filteredGroups).length === 0 && filteredCombos.length === 0 && (
          <div className="text-center py-4 text-text-muted">
            <span className="material-symbols-outlined text-2xl mb-1 block">search_off</span>
            <p className="text-xs">{t("noModelsFound")}</p>
          </div>
        )}
      </div>
      {multiSelect && (
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
          <span className="text-xs text-text-muted">{resolvedSelectedModels.length} selected</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="px-2 py-1 text-xs rounded border border-border bg-surface hover:bg-primary/5"
            >
              {t("clear")}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                setSearchQuery("");
              }}
              className="px-2 py-1 text-xs rounded border border-border bg-surface hover:bg-primary/5"
            >
              {t("done")}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
