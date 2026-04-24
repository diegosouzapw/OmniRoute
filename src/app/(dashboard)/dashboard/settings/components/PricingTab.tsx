"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Button } from "@/shared/components";
import { useTranslations } from "next-intl";

const PRICING_FIELDS = ["input", "output", "cached", "reasoning", "cache_creation"] as const;
const FIELD_LABEL_KEYS: Record<(typeof PRICING_FIELDS)[number], string> = {
  input: "input",
  output: "output",
  cached: "cached",
  reasoning: "reasoning",
  cache_creation: "cacheCreation",
};

type PricingField = (typeof PRICING_FIELDS)[number];
type PricingSource = "default" | "litellm" | "modelsDev" | "user";

interface SyncStatus {
  enabled: boolean;
  lastSync: string | null;
  lastSyncModelCount: number;
  nextSync: string | null;
  intervalMs: number;
  sources: string[];
}

interface PricingCatalogModel {
  id: string;
  name: string;
  custom?: boolean;
}

interface PricingCatalogProvider {
  id: string;
  alias: string;
  authType: string;
  format: string;
  modelCount: number;
  models: PricingCatalogModel[];
}

function getSourceTone(source: PricingSource): string {
  switch (source) {
    case "user":
      return "bg-amber-500/15 text-amber-400 border border-amber-500/25";
    case "modelsDev":
      return "bg-sky-500/15 text-sky-400 border border-sky-500/25";
    case "litellm":
      return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25";
    default:
      return "bg-bg-subtle text-text-muted border border-border/40";
  }
}

export default function PricingTab() {
  const [catalog, setCatalog] = useState<Record<string, PricingCatalogProvider>>({});
  const [pricingData, setPricingData] = useState<
    Record<string, Record<string, Record<string, number>>>
  >({});
  const [pricingSources, setPricingSources] = useState<
    Record<string, Record<string, PricingSource>>
  >({});
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [editedProviders, setEditedProviders] = useState<Set<string>>(new Set());
  const [statusMessage, setStatusMessage] = useState<{
    tone: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const t = useTranslations("settings");

  const showStatus = useCallback((tone: "success" | "error" | "info", message: string) => {
    setStatusMessage({ tone, message });
    window.setTimeout(() => setStatusMessage(null), 4000);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [catalogRes, pricingRes, syncRes] = await Promise.all([
        fetch("/api/pricing/models"),
        fetch("/api/pricing?includeSources=1"),
        fetch("/api/pricing/sync"),
      ]);

      if (catalogRes.ok) {
        setCatalog((await catalogRes.json()) as Record<string, PricingCatalogProvider>);
      }

      if (pricingRes.ok) {
        const pricingPayload = (await pricingRes.json()) as {
          pricing?: Record<string, Record<string, Record<string, number>>>;
          sourceMap?: Record<string, Record<string, PricingSource>>;
        };
        setPricingData(pricingPayload.pricing || {});
        setPricingSources(pricingPayload.sourceMap || {});
      }

      if (syncRes.ok) {
        setSyncStatus((await syncRes.json()) as SyncStatus);
      }
    } catch (error) {
      console.error("Failed to load pricing data:", error);
      showStatus("error", t("pricingLoadFailed"));
    } finally {
      setLoading(false);
    }
  }, [showStatus, t]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const allProviders = useMemo(() => {
    return Object.entries(catalog)
      .map(([alias, info]) => ({
        ...info,
        alias,
        pricedModels: pricingData[alias] ? Object.keys(pricingData[alias]).length : 0,
      }))
      .sort((left, right) => right.modelCount - left.modelCount);
  }, [catalog, pricingData]);

  const filteredProviders = useMemo(() => {
    if (!searchQuery.trim()) return allProviders;

    const query = searchQuery.toLowerCase();
    return allProviders.filter(
      (provider) =>
        provider.alias.toLowerCase().includes(query) ||
        provider.id.toLowerCase().includes(query) ||
        provider.models.some(
          (model) =>
            model.id.toLowerCase().includes(query) || model.name.toLowerCase().includes(query)
        )
    );
  }, [allProviders, searchQuery]);

  const stats = useMemo(() => {
    const totalModels = allProviders.reduce((sum, provider) => sum + provider.modelCount, 0);
    const pricedCount = Object.values(pricingData).reduce(
      (sum, models) => sum + Object.keys(models).length,
      0
    );
    const overriddenCount = Object.values(pricingSources).reduce(
      (sum, models) => sum + Object.values(models).filter((source) => source === "user").length,
      0
    );
    return {
      providers: allProviders.length,
      totalModels,
      pricedCount,
      overriddenCount,
    };
  }, [allProviders, pricingData, pricingSources]);

  const displayProviders = useMemo(() => {
    if (!selectedProvider) return filteredProviders;
    return filteredProviders.filter((provider) => provider.alias === selectedProvider);
  }, [filteredProviders, selectedProvider]);

  const formatSyncDate = useCallback(
    (value: string | null) => {
      if (!value) return t("never");
      try {
        return new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(value));
      } catch {
        return value;
      }
    },
    [t]
  );

  const getSourceLabel = useCallback(
    (source: PricingSource) => {
      switch (source) {
        case "user":
          return t("pricingSourceUser");
        case "modelsDev":
          return t("pricingSourceModelsDev");
        case "litellm":
          return t("pricingSourceLiteLLM");
        default:
          return t("pricingSourceDefault");
      }
    },
    [t]
  );

  const toggleProvider = useCallback((alias: string) => {
    setExpandedProviders((previous) => {
      const next = new Set(previous);
      if (next.has(alias)) {
        next.delete(alias);
      } else {
        next.add(alias);
      }
      return next;
    });
  }, []);

  const handlePricingChange = useCallback(
    (provider: string, model: string, field: PricingField, value: string) => {
      const numValue = Number.parseFloat(value);
      if (Number.isNaN(numValue) || numValue < 0) return;

      setPricingData((previous) => {
        const next = { ...previous };
        if (!next[provider]) next[provider] = {};
        if (!next[provider][model]) {
          next[provider][model] = {
            input: 0,
            output: 0,
            cached: 0,
            reasoning: 0,
            cache_creation: 0,
          };
        }
        next[provider][model] = { ...next[provider][model], [field]: numValue };
        return next;
      });

      setEditedProviders((previous) => new Set(previous).add(provider));
    },
    []
  );

  const saveProvider = useCallback(
    async (providerAlias: string) => {
      setSaving(true);
      try {
        const response = await fetch("/api/pricing", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [providerAlias]: pricingData[providerAlias] || {} }),
        });

        if (!response.ok) {
          const errorPayload = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(errorPayload.error || t("saveFailed"));
        }

        setEditedProviders((previous) => {
          const next = new Set(previous);
          next.delete(providerAlias);
          return next;
        });
        await loadData();
        showStatus("success", t("pricingSavedProvider", { provider: providerAlias.toUpperCase() }));
      } catch (error: any) {
        showStatus(
          "error",
          t("pricingSaveFailedWithReason", {
            reason: error?.message || t("unknownError"),
          })
        );
      } finally {
        setSaving(false);
      }
    },
    [loadData, pricingData, showStatus, t]
  );

  const resetProvider = useCallback(
    async (providerAlias: string) => {
      if (!confirm(t("resetPricingConfirm", { provider: providerAlias.toUpperCase() }))) return;

      try {
        const response = await fetch(`/api/pricing?provider=${providerAlias}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorPayload = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(errorPayload.error || t("resetFailed"));
        }

        setEditedProviders((previous) => {
          const next = new Set(previous);
          next.delete(providerAlias);
          return next;
        });
        await loadData();
        showStatus("success", t("pricingResetProvider", { provider: providerAlias.toUpperCase() }));
      } catch (error: any) {
        showStatus(
          "error",
          t("pricingResetFailedWithReason", {
            reason: error?.message || t("unknownError"),
          })
        );
      }
    },
    [loadData, showStatus, t]
  );

  const triggerSync = useCallback(async () => {
    setSyncing(true);
    try {
      const response = await fetch("/api/pricing/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        modelCount?: number;
        error?: string;
      };

      if (!response.ok || payload.success === false) {
        throw new Error(payload.error || t("pricingSyncFailed"));
      }

      await loadData();
      showStatus("success", t("pricingSyncSuccess", { count: payload.modelCount || 0 }));
    } catch (error: any) {
      showStatus(
        "error",
        t("pricingSyncFailedWithReason", {
          reason: error?.message || t("unknownError"),
        })
      );
    } finally {
      setSyncing(false);
    }
  }, [loadData, showStatus, t]);

  const clearSyncedPricing = useCallback(async () => {
    if (!confirm(t("clearSyncedPricingConfirm"))) return;

    setSyncing(true);
    try {
      const response = await fetch("/api/pricing/sync", { method: "DELETE" });
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error || t("clearSyncedPricingFailed"));
      }

      await loadData();
      showStatus("info", t("clearSyncedPricingSuccess"));
    } catch (error: any) {
      showStatus(
        "error",
        t("clearSyncedPricingFailedWithReason", {
          reason: error?.message || t("unknownError"),
        })
      );
    } finally {
      setSyncing(false);
    }
  }, [loadData, showStatus, t]);

  const selectProviderFilter = useCallback((alias: string) => {
    setSelectedProvider((previous) => (previous === alias ? null : alias));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-text-muted animate-pulse">{t("loadingPricing")}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold">{t("modelPricing")}</h2>
          <p className="text-text-muted text-sm mt-1">{t("modelPricingDesc")}</p>
        </div>
        <div className="flex gap-3 text-sm">
          <StatPill label={t("providers")} value={stats.providers} />
          <StatPill label={t("registry")} value={stats.totalModels} />
          <StatPill label={t("priced")} value={stats.pricedCount} accent="text-success" />
          <StatPill
            label={t("pricingSourceUser")}
            value={stats.overriddenCount}
            accent="text-amber-400"
          />
        </div>
      </div>

      <Card className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
              {t("pricingSyncTitle")}
            </h3>
            <p className="text-sm text-text-muted mt-1">{t("pricingSyncDescription")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => void clearSyncedPricing()} loading={syncing}>
              {t("clearSyncedPricing")}
            </Button>
            <Button variant="primary" onClick={() => void triggerSync()} loading={syncing}>
              {syncing ? t("syncing") : t("syncNow")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mt-4">
          <SyncMetric
            label={t("pricingSyncStatus")}
            value={syncStatus?.enabled ? t("syncEnabled") : t("syncDisabled")}
          />
          <SyncMetric label={t("lastSync")} value={formatSyncDate(syncStatus?.lastSync || null)} />
          <SyncMetric
            label={t("syncedModels")}
            value={String(syncStatus?.lastSyncModelCount || 0)}
          />
          <SyncMetric label={t("nextSync")} value={formatSyncDate(syncStatus?.nextSync || null)} />
        </div>
      </Card>

      {statusMessage && (
        <div
          className={`px-3 py-2 rounded-lg border text-sm ${
            statusMessage.tone === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : statusMessage.tone === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-sky-500/10 border-sky-500/20 text-sky-400"
          }`}
        >
          {statusMessage.message}
        </div>
      )}

      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">
            search
          </span>
          <input
            type="text"
            placeholder={t("searchProvidersModels")}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-bg-base border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
          />
        </div>
        {selectedProvider && (
          <button
            onClick={() => setSelectedProvider(null)}
            className="px-3 py-2 text-xs bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">close</span>
            {selectedProvider.toUpperCase()} - {t("showAll")}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {allProviders.map((provider) => (
          <button
            key={provider.alias}
            onClick={() => selectProviderFilter(provider.alias)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              selectedProvider === provider.alias
                ? "bg-primary text-white shadow-sm"
                : editedProviders.has(provider.alias)
                  ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                  : "bg-bg-subtle text-text-muted hover:bg-bg-hover border border-transparent"
            }`}
          >
            {provider.alias.toUpperCase()}{" "}
            <span className="opacity-60">({provider.modelCount})</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {displayProviders.map((provider) => (
          <ProviderSection
            key={provider.alias}
            provider={provider}
            pricingData={pricingData[provider.alias] || {}}
            sourceMap={pricingSources[provider.alias] || {}}
            isExpanded={expandedProviders.has(provider.alias)}
            isEdited={editedProviders.has(provider.alias)}
            onToggle={() => toggleProvider(provider.alias)}
            onPricingChange={(model, field, value) =>
              handlePricingChange(provider.alias, model, field, value)
            }
            onSave={() => void saveProvider(provider.alias)}
            onReset={() => void resetProvider(provider.alias)}
            saving={saving}
            getSourceLabel={getSourceLabel}
          />
        ))}

        {displayProviders.length === 0 && (
          <div className="text-center py-12 text-text-muted">{t("noProvidersMatch")}</div>
        )}
      </div>

      <Card className="p-4 mt-2">
        <h3 className="text-sm font-semibold mb-2">
          <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
          {t("howPricingWorks")}
        </h3>
        <div className="text-xs text-text-muted space-y-1">
          <p>
            {t("pricingDescInput")} • {t("pricingDescOutput")} • {t("pricingDescCached")} •{" "}
            {t("pricingDescReasoning")} • {t("pricingDescCacheWrite")}
          </p>
          <p>{t("pricingDescFormula")}</p>
        </div>
      </Card>
    </div>
  );
}

function StatPill({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="bg-bg-subtle rounded-lg px-3 py-2 text-center">
      <div className="text-text-muted text-xs font-semibold">{label}</div>
      <div className={`text-lg font-bold ${accent || ""}`}>{value}</div>
    </div>
  );
}

function SyncMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">{label}</p>
      <p className="text-sm font-medium text-text-main mt-1">{value}</p>
    </div>
  );
}

function ProviderSection({
  provider,
  pricingData,
  sourceMap,
  isExpanded,
  isEdited,
  onToggle,
  onPricingChange,
  onSave,
  onReset,
  saving,
  getSourceLabel,
}: {
  provider: PricingCatalogProvider;
  pricingData: Record<string, Record<string, number>>;
  sourceMap: Record<string, PricingSource>;
  isExpanded: boolean;
  isEdited: boolean;
  onToggle: () => void;
  onPricingChange: (model: string, field: PricingField, value: string) => void;
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
  getSourceLabel: (source: PricingSource) => string;
}) {
  const t = useTranslations("settings");
  const tGlobal = useTranslations();
  const pricedCount = Object.keys(pricingData).length;
  const sourceCounts = Object.values(sourceMap).reduce(
    (counts, source) => {
      counts[source] = (counts[source] || 0) + 1;
      return counts;
    },
    { default: 0, litellm: 0, modelsDev: 0, user: 0 } as Record<PricingSource, number>
  );
  const authBadge =
    provider.authType === "oauth"
      ? tGlobal("providers.oauthLabel")
      : provider.authType === "apikey"
        ? tGlobal("providers.apiKeyLabel")
        : provider.authType;

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-colors ${
        isEdited ? "border-yellow-500/40 bg-yellow-500/5" : "border-border"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-hover/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`material-symbols-outlined text-lg transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          >
            chevron_right
          </span>
          <div className="min-w-0">
            <span className="font-semibold text-sm">
              {provider.id.charAt(0).toUpperCase() + provider.id.slice(1)}
            </span>
            <span className="text-text-muted text-xs ml-2">({provider.alias.toUpperCase()})</span>
          </div>
          <span className="px-1.5 py-0.5 bg-bg-subtle text-text-muted text-[10px] rounded uppercase font-semibold">
            {authBadge}
          </span>
          <span className="px-1.5 py-0.5 bg-bg-subtle text-text-muted text-[10px] rounded uppercase font-semibold">
            {provider.format}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-1.5">
            {sourceCounts.user > 0 && (
              <span className={`px-1.5 py-0.5 rounded text-[10px] ${getSourceTone("user")}`}>
                {sourceCounts.user} {getSourceLabel("user")}
              </span>
            )}
            {sourceCounts.modelsDev > 0 && (
              <span className={`px-1.5 py-0.5 rounded text-[10px] ${getSourceTone("modelsDev")}`}>
                {sourceCounts.modelsDev} {getSourceLabel("modelsDev")}
              </span>
            )}
            {sourceCounts.litellm > 0 && (
              <span className={`px-1.5 py-0.5 rounded text-[10px] ${getSourceTone("litellm")}`}>
                {sourceCounts.litellm} {getSourceLabel("litellm")}
              </span>
            )}
          </div>
          {isEdited && <span className="text-yellow-500 text-xs font-medium">{t("unsaved")}</span>}
          <span className="text-text-muted text-xs">
            {pricedCount}/{provider.modelCount} {t("withPricing")}
          </span>
          <div className="w-16 h-1.5 bg-bg-subtle rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{
                width: `${
                  provider.modelCount > 0
                    ? Math.round((pricedCount / provider.modelCount) * 100)
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-border">
          <div className="flex items-center justify-between px-4 py-2 bg-bg-subtle/50">
            <span className="text-xs text-text-muted">
              {provider.modelCount} {t("models")} • {pricedCount} {t("withPricing")}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onReset();
                }}
                className="px-2.5 py-1 text-[11px] text-red-400 hover:bg-red-500/10 rounded border border-red-500/20 transition-colors"
              >
                {t("resetDefaults")}
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onSave();
                }}
                disabled={saving || !isEdited}
                className="px-2.5 py-1 text-[11px] bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-40"
              >
                {saving ? t("saving") : t("saveProvider")}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[11px] text-text-muted uppercase bg-bg-subtle/30">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">{t("model")}</th>
                  {PRICING_FIELDS.map((field) => (
                    <th key={field} className="px-2 py-2 text-right font-semibold w-24">
                      {t(FIELD_LABEL_KEYS[field])}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {provider.models.map((model) => (
                  <ModelRow
                    key={model.id}
                    model={model}
                    pricing={pricingData[model.id]}
                    source={sourceMap[model.id] || "default"}
                    getSourceLabel={getSourceLabel}
                    onPricingChange={(field, value) => onPricingChange(model.id, field, value)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function ModelRow({
  model,
  pricing,
  source,
  getSourceLabel,
  onPricingChange,
}: {
  model: PricingCatalogModel;
  pricing?: Record<string, number>;
  source: PricingSource;
  getSourceLabel: (source: PricingSource) => string;
  onPricingChange: (field: PricingField, value: string) => void;
}) {
  const t = useTranslations("settings");
  const hasPricing = Boolean(pricing && Object.values(pricing).some((value) => Number(value) > 0));

  return (
    <tr className="hover:bg-bg-hover/30 group">
      <td className="px-4 py-1.5">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${hasPricing ? "bg-success" : "bg-text-muted/30"}`}
          />
          <span className="font-medium text-xs">{model.name}</span>
          {model.custom && (
            <span className="px-1 py-0.5 text-[8px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/20 rounded uppercase">
              {t("custom")}
            </span>
          )}
          <span className={`px-1.5 py-0.5 rounded text-[9px] ${getSourceTone(source)}`}>
            {getSourceLabel(source)}
          </span>
          <span className="text-text-muted text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
            {model.id}
          </span>
        </div>
      </td>
      {PRICING_FIELDS.map((field) => (
        <td key={field} className="px-2 py-1.5">
          <input
            type="number"
            step="0.01"
            min="0"
            value={pricing?.[field] || 0}
            onChange={(event) => onPricingChange(field, event.target.value)}
            className="w-full px-2 py-1 text-right text-xs bg-transparent border border-transparent hover:border-border focus:border-primary focus:bg-bg-base rounded transition-colors outline-none tabular-nums"
          />
        </td>
      ))}
    </tr>
  );
}
