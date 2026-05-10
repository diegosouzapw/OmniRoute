"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type RtkFilter = {
  id: string;
  name: string;
  description: string;
  commandTypes: string[];
  category: string;
  priority: number;
};

type RtkConfig = {
  enabled: boolean;
  intensity: "minimal" | "standard" | "aggressive";
  applyToToolResults: boolean;
  applyToAssistantMessages: boolean;
  applyToCodeBlocks: boolean;
  enabledFilters: string[];
  disabledFilters: string[];
  maxLinesPerResult: number;
  maxCharsPerResult: number;
  deduplicateThreshold: number;
  customFiltersEnabled: boolean;
  trustProjectFilters: boolean;
  rawOutputRetention: "never" | "failures" | "always";
  rawOutputMaxBytes: number;
};

type AnalyticsSummary = {
  totalRequests: number;
  totalTokensSaved: number;
  avgSavingsPct: number;
  byEngine?: Record<string, { count: number; tokensSaved: number; avgSavingsPct: number }>;
};

type PreviewResult = {
  text?: string;
  compressed?: boolean;
  originalTokens?: number;
  compressedTokens?: number;
  techniquesUsed?: string[];
  detection?: { type: string; confidence: number; category: string };
  error?: string;
};

const SAMPLE_OUTPUT = `$ npm run typecheck
src/lib/example.ts:10:15 - error TS2322: Type 'string' is not assignable to type 'number'.

10 const value: number = "bad";
                 ~~~~~

Found 1 error in src/lib/example.ts:10`;

function formatNumber(value: number | undefined): string {
  return new Intl.NumberFormat().format(value ?? 0);
}

export default function RtkContextPageClient() {
  const t = useTranslations("contextRtk");
  const [filters, setFilters] = useState<RtkFilter[]>([]);
  const [config, setConfig] = useState<RtkConfig | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [sample, setSample] = useState(SAMPLE_OUTPUT);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/context/rtk/filters")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setFilters(Array.isArray(data?.filters) ? data.filters : []))
      .catch(() => {});
    fetch("/api/context/rtk/config")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setConfig(data))
      .catch(() => {});
    fetch("/api/context/analytics?since=7d")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setAnalytics(data))
      .catch(() => {});
  }, []);

  const groupedFilters = useMemo(() => {
    return filters.reduce<Record<string, RtkFilter[]>>((groups, filter) => {
      groups[filter.category] = [...(groups[filter.category] ?? []), filter];
      return groups;
    }, {});
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    if (!config) return 0;
    if (config.enabledFilters.length > 0) return config.enabledFilters.length;
    return filters.filter((filter) => !config.disabledFilters.includes(filter.id)).length;
  }, [config, filters]);

  const saveConfig = async (patch: Partial<RtkConfig>) => {
    if (!config) return;
    const nextConfig = { ...config, ...patch };
    setConfig(nextConfig);
    setSaving(true);
    try {
      const res = await fetch("/api/context/rtk/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) setConfig(await res.json());
    } finally {
      setSaving(false);
    }
  };

  const toggleFilter = (filterId: string, enabled: boolean) => {
    if (!config) return;
    const disabledFilters = enabled
      ? config.disabledFilters.filter((id) => id !== filterId)
      : [...new Set([...config.disabledFilters, filterId])];
    saveConfig({ disabledFilters });
  };

  const runPreview = async () => {
    const res = await fetch("/api/context/rtk/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: sample, config: config ?? undefined }),
    });
    setPreview(res.ok ? await res.json() : { error: await res.text() });
  };

  const rtkStats = analytics?.byEngine?.rtk;
  const statCards = [
    [t("tokensFiltered"), formatNumber(rtkStats?.tokensSaved ?? analytics?.totalTokensSaved)],
    [t("filtersActive"), formatNumber(activeFilterCount)],
    [t("requests"), formatNumber(rtkStats?.count ?? analytics?.totalRequests)],
    [t("avgSavings"), `${rtkStats?.avgSavingsPct ?? analytics?.avgSavingsPct ?? 0}%`],
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[30px] text-primary">filter_alt</span>
          <div>
            <h1 className="text-2xl font-bold text-text-main">{t("title")}</h1>
            <p className="text-sm text-text-muted">{t("description")}</p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs uppercase text-text-muted">{label}</p>
            <p className="mt-1 text-xl font-semibold text-text-main">{value}</p>
          </div>
        ))}
      </section>

      {config && (
        <section className="rounded-lg border border-border bg-surface p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <label className="flex items-center gap-2 text-sm text-text-main">
              <input
                type="checkbox"
                checked={config.enabled}
                disabled={saving}
                onChange={(event) => saveConfig({ enabled: event.target.checked })}
              />
              {t("enabled")}
            </label>
            <label className="flex flex-col gap-1 text-sm text-text-main">
              {t("intensity")}
              <select
                value={config.intensity}
                disabled={saving}
                onChange={(event) =>
                  saveConfig({ intensity: event.target.value as RtkConfig["intensity"] })
                }
                className="rounded border border-border bg-bg px-2 py-1 text-sm"
              >
                <option value="minimal">{t("intensityMinimal")}</option>
                <option value="standard">{t("intensityStandard")}</option>
                <option value="aggressive">{t("intensityAggressive")}</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm text-text-main">
              {t("maxLines")}
              <input
                type="number"
                min={0}
                value={config.maxLinesPerResult}
                onChange={(event) =>
                  saveConfig({ maxLinesPerResult: Number(event.target.value) || 0 })
                }
                className="rounded border border-border bg-bg px-2 py-1 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-text-main">
              {t("maxChars")}
              <input
                type="number"
                min={0}
                value={config.maxCharsPerResult}
                onChange={(event) =>
                  saveConfig({ maxCharsPerResult: Number(event.target.value) || 0 })
                }
                className="rounded border border-border bg-bg px-2 py-1 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-text-main">
              {t("deduplicateThreshold")}
              <input
                type="number"
                min={2}
                max={100}
                value={config.deduplicateThreshold}
                onChange={(event) =>
                  saveConfig({ deduplicateThreshold: Number(event.target.value) || 2 })
                }
                className="rounded border border-border bg-bg px-2 py-1 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-text-main">
              {t("rawOutputMaxBytes")}
              <input
                type="number"
                min={1024}
                value={config.rawOutputMaxBytes}
                onChange={(event) =>
                  saveConfig({ rawOutputMaxBytes: Number(event.target.value) || 1024 })
                }
                className="rounded border border-border bg-bg px-2 py-1 text-sm"
              />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-main">
            {[
              ["applyToToolResults", t("toolResults")],
              ["applyToAssistantMessages", t("assistantMessages")],
              ["applyToCodeBlocks", t("codeBlocks")],
              ["customFiltersEnabled", t("customFilters")],
              ["trustProjectFilters", t("trustProjectFilters")],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(config[key as keyof RtkConfig])}
                  disabled={saving}
                  onChange={(event) =>
                    saveConfig({ [key]: event.target.checked } as Partial<RtkConfig>)
                  }
                />
                {label}
              </label>
            ))}
          </div>
          <div className="mt-4 max-w-sm text-sm text-text-main">
            <label className="flex flex-col gap-1">
              {t("rawOutputRetention")}
              <select
                value={config.rawOutputRetention}
                disabled={saving}
                onChange={(event) =>
                  saveConfig({
                    rawOutputRetention: event.target.value as RtkConfig["rawOutputRetention"],
                  })
                }
                className="rounded border border-border bg-bg px-2 py-1 text-sm"
              >
                <option value="never">{t("rawOutputNever")}</option>
                <option value="failures">{t("rawOutputFailures")}</option>
                <option value="always">{t("rawOutputAlways")}</option>
              </select>
            </label>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">{t("filterTesting")}</h2>
            <button
              onClick={runPreview}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white"
            >
              {t("run")}
            </button>
          </div>
          <textarea
            value={sample}
            onChange={(event) => setSample(event.target.value)}
            placeholder={t("pasteOutput")}
            className="h-72 w-full rounded-lg border border-border bg-bg p-3 font-mono text-xs text-text-main"
          />
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-3 text-sm font-semibold text-text-main">{t("result")}</h2>
          {preview?.detection && (
            <p className="mb-2 text-xs text-text-muted">
              {t("detected")}: {preview.detection.type} (
              {Math.round(preview.detection.confidence * 100)}%)
            </p>
          )}
          <pre className="h-72 overflow-auto rounded-lg border border-border bg-bg p-3 text-xs text-text-main">
            {preview ? JSON.stringify(preview, null, 2) : t("previewEmpty")}
          </pre>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(groupedFilters).map(([category, items]) => (
          <div key={category} className="rounded-lg border border-border bg-surface p-4">
            <h2 className="text-sm font-semibold capitalize text-text-main">{category}</h2>
            <div className="mt-3 space-y-3">
              {items.map((filter) => {
                const enabled = config ? !config.disabledFilters.includes(filter.id) : true;
                return (
                  <div
                    key={filter.id}
                    className="border-t border-border pt-3 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text-main">{filter.name}</p>
                        <p className="mt-1 text-xs text-text-muted">{filter.description}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={enabled}
                        disabled={!config || saving}
                        onChange={(event) => toggleFilter(filter.id, event.target.checked)}
                      />
                    </div>
                    <p className="mt-2 font-mono text-[11px] text-text-muted">
                      {filter.commandTypes.join(", ")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
