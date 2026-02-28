"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";

const PRICING_FIELDS = ["input", "output", "cached", "reasoning", "cache_creation"] as const;
const FIELD_LABEL_KEYS: Record<(typeof PRICING_FIELDS)[number], string> = {
  input: "input",
  output: "output",
  cached: "cached",
  reasoning: "reasoning",
  cache_creation: "cacheCreation",
};

export default function PricingTab() {
  const [catalog, setCatalog] = useState({});
  const [pricingData, setPricingData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [expandedProviders, setExpandedProviders] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [editedProviders, setEditedProviders] = useState(new Set());
  const t = useTranslations("settings");

  // Load catalog + pricing
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [catalogRes, pricingRes] = await Promise.all([
        fetch("/api/pricing/models"),
        fetch("/api/pricing"),
      ]);
      if (catalogRes.ok) setCatalog(await catalogRes.json());
      if (pricingRes.ok) setPricingData(await pricingRes.json());
    } catch (error) {
      console.error("Failed to load pricing data:", error);
    } finally {
      setLoading(false);
    }
  };

  // All providers sorted by model count (desc)
  const allProviders = useMemo(() => {
    const providers = Object.entries(catalog)
      .map(([alias, info]: [string, any]) => ({
        alias,
        ...info,
        pricedModels: pricingData[alias] ? Object.keys(pricingData[alias]).length : 0,
      }))
      .sort((a, b) => b.modelCount - a.modelCount);
    return providers;
  }, [catalog, pricingData]);

  // Filter providers by search
  const filteredProviders = useMemo(() => {
    if (!searchQuery.trim()) return allProviders;
    const q = searchQuery.toLowerCase();
    return allProviders.filter(
      (p) =>
        p.alias.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.models.some((m) => m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q))
    );
  }, [allProviders, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const totalModels = allProviders.reduce((s, p) => s + p.modelCount, 0);
    const pricedCount = Object.values(pricingData).reduce(
      (s: number, models: any) => s + Object.keys(models).length,
      0
    );
    return {
      providers: allProviders.length,
      totalModels,
      pricedCount,
    };
  }, [allProviders, pricingData]);

  const toggleProvider = useCallback((alias) => {
    setExpandedProviders((prev) => {
      const next = new Set(prev);
      if (next.has(alias)) next.delete(alias);
      else next.add(alias);
      return next;
    });
  }, []);

  const handlePricingChange = useCallback((provider, model, field, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;

    setPricingData((prev) => {
      const next = { ...prev };
      if (!next[provider]) next[provider] = {};
      if (!next[provider][model])
        next[provider][model] = { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 };
      next[provider][model] = { ...next[provider][model], [field]: numValue };
      return next;
    });
    setEditedProviders((prev) => new Set(prev).add(provider));
  }, []);

  const saveProvider = useCallback(
    async (providerAlias) => {
      setSaving(true);
      setSaveStatus("");
      try {
        const providerPricing = pricingData[providerAlias] || {};
        const response = await fetch("/api/pricing", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [providerAlias]: providerPricing }),
        });

        if (response.ok) {
          setSaveStatus(`✅ ${providerAlias.toUpperCase()} ${t("saved")}`);
          setEditedProviders((prev) => {
            const next = new Set(prev);
            next.delete(providerAlias);
            return next;
          });
          setTimeout(() => setSaveStatus(""), 3000);
        } else {
          const err = await response.json();
          setSaveStatus(`❌ ${t("errorOccurred")}: ${err.error}`);
        }
      } catch (error) {
        setSaveStatus(`❌ ${t("saveFailed")}: ${error.message}`);
      } finally {
        setSaving(false);
      }
    },
    [pricingData, t]
  );

  const resetProvider = useCallback(
    async (providerAlias) => {
      if (!confirm(t("resetPricingConfirm", { provider: providerAlias.toUpperCase() }))) return;
      try {
        const response = await fetch(`/api/pricing?provider=${providerAlias}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const updated = await response.json();
          setPricingData(updated);
          setSaveStatus(`🔄 ${providerAlias.toUpperCase()} ${t("resetDefaults")}`);
          setEditedProviders((prev) => {
            const next = new Set(prev);
            next.delete(providerAlias);
            return next;
          });
          setTimeout(() => setSaveStatus(""), 3000);
        }
      } catch (error) {
        setSaveStatus(`❌ ${t("resetFailed")}: ${error.message}`);
      }
    },
    [t]
  );

  const selectProviderFilter = useCallback((alias) => {
    setSelectedProvider((prev) => (prev === alias ? null : alias));
  }, []);

  // Which providers to display in the main area
  const displayProviders = useMemo(() => {
    if (selectedProvider) {
      return filteredProviders.filter((p) => p.alias === selectedProvider);
    }
    return filteredProviders;
  }, [filteredProviders, selectedProvider]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-text-muted animate-pulse">{t("loadingPricing")}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header + Stats */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold">{t("modelPricing")}</h2>
          <p className="text-text-muted text-sm mt-1">{t("modelPricingDesc")}</p>
        </div>
        <div className="flex gap-3 text-sm">
          <div className="bg-bg-subtle rounded-lg px-3 py-2 text-center">
            <div className="text-text-muted text-xs font-semibold">{t("providers")}</div>
            <div className="text-lg font-bold">{stats.providers}</div>
          </div>
          <div className="bg-bg-subtle rounded-lg px-3 py-2 text-center">
            <div className="text-text-muted text-xs font-semibold">{t("registry")}</div>
            <div className="text-lg font-bold">{stats.totalModels}</div>
          </div>
          <div className="bg-bg-subtle rounded-lg px-3 py-2 text-center">
            <div className="text-text-muted text-xs font-semibold">{t("priced")}</div>
            <div className="text-lg font-bold text-success">{stats.pricedCount as number}</div>
          </div>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <div className="px-3 py-2 rounded-lg bg-bg-subtle border border-border text-sm">
          {saveStatus}
        </div>
      )}

      {/* Search + Provider Filter */}
      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">
            search
          </span>
          <input
            type="text"
            placeholder={t("searchProvidersModels")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-bg-base border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
          />
        </div>
        {selectedProvider && (
          <button
            onClick={() => setSelectedProvider(null)}
            className="px-3 py-2 text-xs bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">close</span>
            {selectedProvider.toUpperCase()} — {t("showAll")}
          </button>
        )}
      </div>

      {/* Provider Pills (quick filter) */}
      <div className="flex flex-wrap gap-1.5">
        {allProviders.map((p) => (
          <button
            key={p.alias}
            onClick={() => selectProviderFilter(p.alias)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              selectedProvider === p.alias
                ? "bg-primary text-white shadow-sm"
                : editedProviders.has(p.alias)
                  ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                  : "bg-bg-subtle text-text-muted hover:bg-bg-hover border border-transparent"
            }`}
          >
            {p.alias.toUpperCase()} <span className="opacity-60">({p.modelCount})</span>
          </button>
        ))}
      </div>

      {/* Provider Sections */}
      <div className="flex flex-col gap-2">
        {displayProviders.map((provider) => (
          <ProviderSection
            key={provider.alias}
            provider={provider}
            pricingData={pricingData[provider.alias] || {}}
            isExpanded={expandedProviders.has(provider.alias)}
            isEdited={editedProviders.has(provider.alias)}
            onToggle={() => toggleProvider(provider.alias)}
            onPricingChange={(model, field, value) =>
              handlePricingChange(provider.alias, model, field, value)
            }
            onSave={() => saveProvider(provider.alias)}
            onReset={() => resetProvider(provider.alias)}
            saving={saving}
          />
        ))}

        {displayProviders.length === 0 && (
          <div className="text-center py-12 text-text-muted">{t("noProvidersMatch")}</div>
        )}
      </div>

      {/* Info Box */}
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

// ── Provider Section (collapsible) ──────────────────────────────────────

function ProviderSection({
  provider,
  pricingData,
  isExpanded,
  isEdited,
  onToggle,
  onPricingChange,
  onSave,
  onReset,
  saving,
}) {
  const t = useTranslations("settings");
  const tGlobal = useTranslations();
  const pricedCount = Object.keys(pricingData).length;
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
      {/* Header (click to expand) */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-hover/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span
            className={`material-symbols-outlined text-lg transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          >
            chevron_right
          </span>
          <div>
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

      {/* Expanded: models table */}
      {isExpanded && (
        <div className="border-t border-border">
          {/* Actions bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-bg-subtle/50">
            <span className="text-xs text-text-muted">
              {provider.modelCount} {t("models")} • {pricedCount} {t("withPricing")}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReset();
                }}
                className="px-2.5 py-1 text-[11px] text-red-400 hover:bg-red-500/10 rounded border border-red-500/20 transition-colors"
              >
                {t("resetDefaults")}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSave();
                }}
                disabled={saving || !isEdited}
                className="px-2.5 py-1 text-[11px] bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-40"
              >
                {saving ? t("saving") : t("saveProvider")}
              </button>
            </div>
          </div>

          {/* Table */}
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

// ── Model Row ────────────────────────────────────────────────────────────

function ModelRow({ model, pricing, onPricingChange }) {
  const t = useTranslations("settings");
  const hasPricing = pricing && Object.values(pricing).some((v: any) => v > 0);

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
            onChange={(e) => onPricingChange(field, e.target.value)}
            className="w-full px-2 py-1 text-right text-xs bg-transparent border border-transparent hover:border-border focus:border-primary focus:bg-bg-base rounded transition-colors outline-none tabular-nums"
          />
        </td>
      ))}
    </tr>
  );
}
