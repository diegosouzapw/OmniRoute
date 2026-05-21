"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Button } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";
import InfoTooltip from "@/shared/components/InfoTooltip";
import { useTranslations } from "next-intl";

type CoverageFilter = "all" | "lt50" | "gte50lt100" | "full";
type AuthFilter = "all" | "oauth" | "apikey" | "unknown";
type SortKey = "modelsDesc" | "coverageDesc" | "coverageAsc" | "nameAsc";

const INITIAL_VISIBLE = 20;
const VISIBLE_INCREMENT = 30;

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
  const [coverageFilter, setCoverageFilter] = useState<CoverageFilter>("all");
  const [authFilter, setAuthFilter] = useState<AuthFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("modelsDesc");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
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
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = (provider: (typeof allProviders)[number]) => {
      if (!query) return true;
      return (
        provider.alias.toLowerCase().includes(query) ||
        provider.id.toLowerCase().includes(query) ||
        provider.models.some(
          (model) =>
            model.id.toLowerCase().includes(query) || model.name.toLowerCase().includes(query)
        )
      );
    };
    const coveragePct = (p: (typeof allProviders)[number]) =>
      p.modelCount > 0 ? (p.pricedModels / p.modelCount) * 100 : 0;
    const matchesCoverage = (p: (typeof allProviders)[number]) => {
      if (coverageFilter === "all") return true;
      const pct = coveragePct(p);
      if (coverageFilter === "lt50") return pct < 50;
      if (coverageFilter === "gte50lt100") return pct >= 50 && pct < 100;
      return pct >= 100;
    };
    const matchesAuth = (p: (typeof allProviders)[number]) => {
      if (authFilter === "all") return true;
      const auth = (p.authType || "unknown").toLowerCase();
      return (
        auth === authFilter || (authFilter === "unknown" && !["oauth", "apikey"].includes(auth))
      );
    };

    const filtered = allProviders.filter(
      (p) => matchesSearch(p) && matchesCoverage(p) && matchesAuth(p)
    );

    // Sort
    const sorted = [...filtered];
    switch (sortKey) {
      case "modelsDesc":
        sorted.sort((a, b) => b.modelCount - a.modelCount);
        break;
      case "coverageDesc":
        sorted.sort((a, b) => coveragePct(b) - coveragePct(a));
        break;
      case "coverageAsc":
        sorted.sort((a, b) => coveragePct(a) - coveragePct(b));
        break;
      case "nameAsc":
        sorted.sort((a, b) => a.alias.localeCompare(b.alias));
        break;
    }
    return sorted;
  }, [allProviders, searchQuery, coverageFilter, authFilter, sortKey]);

  const authCounts = useMemo(() => {
    const counts = { oauth: 0, apikey: 0, unknown: 0 };
    for (const p of allProviders) {
      const auth = (p.authType || "unknown").toLowerCase();
      if (auth === "oauth") counts.oauth += 1;
      else if (auth === "apikey") counts.apikey += 1;
      else counts.unknown += 1;
    }
    return counts;
  }, [allProviders]);

  const coverageGapCount = useMemo(
    () => allProviders.filter((p) => p.modelCount > 0 && p.pricedModels / p.modelCount < 1).length,
    [allProviders]
  );

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [searchQuery, coverageFilter, authFilter, sortKey]);

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
    const base = selectedProvider
      ? filteredProviders.filter((provider) => provider.alias === selectedProvider)
      : filteredProviders;
    return base.slice(0, visibleCount);
  }, [filteredProviders, selectedProvider, visibleCount]);

  const totalFiltered = selectedProvider
    ? filteredProviders.filter((provider) => provider.alias === selectedProvider).length
    : filteredProviders.length;

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

  const coveragePct =
    stats.totalModels > 0 ? Math.round((stats.pricedCount / stats.totalModels) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Hero — combined header (stats + sync + how-it-works tooltip) */}
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-primary">payments</span>
              {t("modelPricing")}
            </h2>
            <InfoTooltip
              text={`${t("pricingDescInput")} · ${t("pricingDescOutput")} · ${t("pricingDescCached")} · ${t("pricingDescReasoning")} · ${t("pricingDescCacheWrite")} · ${t("pricingDescFormula")}`}
            />
          </div>
          <p className="text-text-muted text-xs hidden sm:block self-center">
            {t("modelPricingDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
          {/* Stats panel with coverage bar */}
          <div className="rounded-lg border border-border/40 bg-bg-subtle/30 p-4">
            <div className="grid grid-cols-4 gap-3 mb-3">
              <HeroStat label={t("providers")} value={stats.providers} />
              <HeroStat label={t("registry")} value={stats.totalModels} />
              <HeroStat label={t("priced")} value={stats.pricedCount} accent="text-emerald-400" />
              <HeroStat
                label={t("pricingSourceUser")}
                value={stats.overriddenCount}
                accent="text-amber-400"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-[11px] text-text-muted mb-1">
                <span className="uppercase tracking-wide font-semibold">
                  {t("priced")} / {t("registry")}
                </span>
                <span className="tabular-nums font-semibold">{coveragePct}%</span>
              </div>
              <div className="h-2 rounded-sm bg-black/[0.08] dark:bg-white/[0.06] overflow-hidden">
                <div
                  className={`h-full transition-[width] duration-300 ${
                    coveragePct >= 90
                      ? "bg-emerald-500"
                      : coveragePct >= 60
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(coveragePct, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sync panel */}
          <div className="rounded-lg border border-border/40 bg-bg-subtle/30 p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-text-muted">
                  {t("pricingSyncTitle")}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      syncStatus?.enabled ? "bg-emerald-500 animate-pulse" : "bg-text-muted"
                    }`}
                  />
                  <span className="text-xs text-text-main font-medium">
                    {syncStatus?.enabled ? t("syncEnabled") : t("syncDisabled")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => void clearSyncedPricing()}
                  loading={syncing}
                >
                  {t("clearSyncedPricing")}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => void triggerSync()}
                  loading={syncing}
                >
                  {syncing ? t("syncing") : t("syncNow")}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <SyncMini
                label={t("lastSync")}
                value={formatSyncDate(syncStatus?.lastSync || null)}
              />
              <SyncMini
                label={t("syncedModels")}
                value={String(syncStatus?.lastSyncModelCount || 0)}
              />
              <SyncMini
                label={t("nextSync")}
                value={formatSyncDate(syncStatus?.nextSync || null)}
              />
            </div>
          </div>
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

      {/* Search + Filters */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center flex-wrap">
          <div className="relative flex-1 min-w-[260px]">
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

          <FilterSelect
            label="Coverage"
            value={coverageFilter}
            onChange={(v) => setCoverageFilter(v as CoverageFilter)}
            options={[
              { value: "all", label: `All (${allProviders.length})` },
              { value: "lt50", label: "<50%" },
              { value: "gte50lt100", label: "50–99%" },
              { value: "full", label: "100%" },
            ]}
          />

          <FilterSelect
            label="Auth"
            value={authFilter}
            onChange={(v) => setAuthFilter(v as AuthFilter)}
            options={[
              { value: "all", label: "All" },
              { value: "oauth", label: `OAuth (${authCounts.oauth})` },
              { value: "apikey", label: `API Key (${authCounts.apikey})` },
              { value: "unknown", label: `Unknown (${authCounts.unknown})` },
            ]}
          />

          <FilterSelect
            label="Sort"
            value={sortKey}
            onChange={(v) => setSortKey(v as SortKey)}
            options={[
              { value: "modelsDesc", label: "Most models" },
              { value: "coverageDesc", label: "Highest coverage" },
              { value: "coverageAsc", label: "Lowest coverage" },
              { value: "nameAsc", label: "Name (A–Z)" },
            ]}
          />
        </div>

        {/* Quick shortcuts */}
        <div className="flex items-center gap-2 flex-wrap text-[11px]">
          <button
            type="button"
            onClick={() => setCoverageFilter(coverageFilter === "lt50" ? "all" : "lt50")}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs transition-colors cursor-pointer ${
              coverageFilter === "lt50"
                ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                : "bg-bg-subtle border-border text-text-muted hover:text-text-main"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">warning</span>
            Coverage gaps ({coverageGapCount})
          </button>
          {(searchQuery ||
            coverageFilter !== "all" ||
            authFilter !== "all" ||
            sortKey !== "modelsDesc" ||
            selectedProvider) && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setCoverageFilter("all");
                setAuthFilter("all");
                setSortKey("modelsDesc");
                setSelectedProvider(null);
              }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-border bg-bg-subtle text-xs text-text-muted hover:text-text-main cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
              Clear filters
            </button>
          )}
          <span className="text-text-muted ml-auto">
            Showing {displayProviders.length} of {totalFiltered}
            {totalFiltered !== allProviders.length && ` (filtered from ${allProviders.length})`}
          </span>
        </div>
      </div>

      {/* Provider list */}
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

        {visibleCount < totalFiltered && (
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + VISIBLE_INCREMENT)}
            className="mt-2 mx-auto px-4 py-2 rounded-md border border-border bg-bg-subtle hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-sm text-text-main cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
            Show {Math.min(VISIBLE_INCREMENT, totalFiltered - visibleCount)} more (
            {totalFiltered - visibleCount} remaining)
          </button>
        )}
      </div>
    </div>
  );
}

function HeroStat({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="text-center">
      <div className="text-[10px] uppercase tracking-wide text-text-muted font-semibold truncate">
        {label}
      </div>
      <div
        className={`text-2xl font-bold tabular-nums leading-tight ${accent || "text-text-main"}`}
      >
        {value}
      </div>
    </div>
  );
}

function SyncMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/30 bg-bg-base/40 px-2 py-1.5">
      <p className="text-[9px] uppercase tracking-wide text-text-muted font-semibold truncate">
        {label}
      </p>
      <p className="text-[11px] font-medium text-text-main mt-0.5 truncate" title={value}>
        {value}
      </p>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="flex items-center gap-1.5 text-xs text-text-muted">
      <span className="font-semibold uppercase tracking-wide">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-bg-base border border-border rounded-md px-2 py-1.5 text-xs text-text-main cursor-pointer focus:outline-none focus:border-primary"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
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
        className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-bg-hover/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span
            className={`material-symbols-outlined text-lg text-text-muted transition-transform shrink-0 ${
              isExpanded ? "rotate-90" : ""
            }`}
          >
            chevron_right
          </span>
          <div className="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden shrink-0 bg-bg-subtle">
            <ProviderIcon providerId={provider.id} size={28} type="color" />
          </div>
          <div className="min-w-0 flex items-center gap-2">
            <span className="font-semibold text-sm truncate">
              {provider.id.charAt(0).toUpperCase() + provider.id.slice(1)}
            </span>
            <span className="text-text-muted text-[11px] truncate">
              ({provider.alias.toUpperCase()})
            </span>
          </div>
          <span
            className={`px-1.5 py-0.5 text-[9px] rounded uppercase font-semibold shrink-0 ${
              provider.authType === "oauth"
                ? "bg-sky-500/15 text-sky-400 border border-sky-500/25"
                : provider.authType === "apikey"
                  ? "bg-violet-500/15 text-violet-400 border border-violet-500/25"
                  : "bg-bg-subtle text-text-muted border border-border/40"
            }`}
          >
            {authBadge}
          </span>
          <span className="px-1.5 py-0.5 bg-bg-subtle text-text-muted text-[9px] rounded uppercase font-semibold shrink-0">
            {provider.format}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {sourceCounts.user > 0 && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400"
              title={`${sourceCounts.user} ${getSourceLabel("user")}`}
            >
              💎 {sourceCounts.user}
            </span>
          )}
          {isEdited && (
            <span className="text-yellow-500 text-[11px] font-semibold">{t("unsaved")}</span>
          )}
          <span className="text-text-muted text-[11px] tabular-nums hidden sm:inline">
            {pricedCount}/{provider.modelCount}
          </span>
          {(() => {
            const pct =
              provider.modelCount > 0 ? Math.round((pricedCount / provider.modelCount) * 100) : 0;
            const barColor =
              pct >= 100 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500";
            const textColor =
              pct >= 100 ? "text-emerald-400" : pct >= 50 ? "text-amber-400" : "text-red-400";
            const icon = pct >= 100 ? "✓" : pct >= 50 ? "◐" : "⚠";
            return (
              <>
                <div className="w-20 h-1.5 bg-bg-subtle rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor} rounded-full transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span
                  className={`text-[11px] font-bold tabular-nums w-10 text-right ${textColor}`}
                  title={`${pricedCount}/${provider.modelCount} ${t("withPricing")}`}
                >
                  {pct}% {icon}
                </span>
              </>
            );
          })()}
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
