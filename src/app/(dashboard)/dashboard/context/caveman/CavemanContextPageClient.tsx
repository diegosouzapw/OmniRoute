"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import CompressionSettingsTab from "@/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab";

type AnalyticsSummary = {
  totalRequests: number;
  totalTokensSaved: number;
  avgSavingsPct: number;
  avgDurationMs: number;
  byEngine?: Record<string, { count: number; tokensSaved: number; avgSavingsPct: number }>;
  byMode?: Record<string, { count: number; tokensSaved: number; avgSavingsPct: number }>;
  last24h?: Array<{ hour: string; count: number; tokensSaved: number }>;
};

type LanguageConfig = {
  enabled: boolean;
  defaultLanguage: string;
  autoDetect: boolean;
  enabledPacks: string[];
};

type OutputModeConfig = {
  enabled: boolean;
  intensity: "lite" | "full" | "ultra";
  autoClarity: boolean;
};

type CompressionSettings = {
  languageConfig?: LanguageConfig;
  cavemanOutputMode?: OutputModeConfig;
};

type LanguagePack = { language: string; ruleCount: number; categories?: string[] };

function formatNumber(value: number | undefined): string {
  return new Intl.NumberFormat().format(value ?? 0);
}

export default function CavemanContextPageClient() {
  const t = useTranslations("contextCaveman");
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [settings, setSettings] = useState<CompressionSettings | null>(null);
  const [languagePacks, setLanguagePacks] = useState<LanguagePack[]>([]);
  const [saving, setSaving] = useState(false);

  const refreshSettings = () => {
    fetch("/api/context/caveman/config")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setSettings(data))
      .catch(() => setSettings(null));
  };

  useEffect(() => {
    fetch("/api/context/analytics?since=7d")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setAnalytics(data))
      .catch(() => setAnalytics(null));
    fetch("/api/compression/language-packs")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setLanguagePacks(Array.isArray(data?.packs) ? data.packs : []))
      .catch(() => setLanguagePacks([]));
    refreshSettings();
  }, []);

  const languageConfig: LanguageConfig = settings?.languageConfig ?? {
    enabled: false,
    defaultLanguage: "en",
    autoDetect: true,
    enabledPacks: ["en"],
  };
  const outputMode: OutputModeConfig = settings?.cavemanOutputMode ?? {
    enabled: false,
    intensity: "full",
    autoClarity: true,
  };

  const saveSettings = async (patch: Partial<CompressionSettings>) => {
    setSaving(true);
    try {
      const res = await fetch("/api/context/caveman/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) setSettings(await res.json());
    } finally {
      setSaving(false);
    }
  };

  const updateLanguageConfig = (patch: Partial<LanguageConfig>) => {
    saveSettings({ languageConfig: { ...languageConfig, ...patch } });
  };

  const updateOutputMode = (patch: Partial<OutputModeConfig>) => {
    saveSettings({ cavemanOutputMode: { ...outputMode, ...patch } });
  };

  const togglePack = (language: string, enabled: boolean) => {
    const enabledPacks = enabled
      ? [...new Set([...languageConfig.enabledPacks, language])]
      : languageConfig.enabledPacks.filter((pack) => pack !== language && pack !== "en");
    updateLanguageConfig({ enabledPacks });
  };

  const cavemanStats = analytics?.byEngine?.caveman ?? analytics?.byEngine?.standard;
  const modeBreakdown = useMemo(() => Object.entries(analytics?.byMode ?? {}), [analytics]);
  const statCards = [
    [t("requests"), formatNumber(cavemanStats?.count ?? analytics?.totalRequests)],
    [t("tokensSaved"), formatNumber(cavemanStats?.tokensSaved ?? analytics?.totalTokensSaved)],
    [t("savingsPercent"), `${cavemanStats?.avgSavingsPct ?? analytics?.avgSavingsPct ?? 0}%`],
    [t("avgLatency"), `${analytics?.avgDurationMs ?? 0}ms`],
  ];
  const previewPrompt = `[OmniRoute Caveman Output Mode]\n${t(`preview.${outputMode.intensity}`)}`;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[30px] text-primary">compress</span>
          <div>
            <h1 className="text-2xl font-bold text-text-main">{t("title")}</h1>
            <p className="text-sm text-text-muted">{t("description")}</p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        {statCards.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs uppercase text-text-muted">{label}</p>
            <p className="mt-1 text-xl font-semibold text-text-main">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-border bg-surface p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-text-main">{t("languagePacks")}</h2>
          <p className="text-xs text-text-muted">{t("languagePacksDesc")}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-main">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={languageConfig.enabled}
              disabled={saving}
              onChange={(event) => updateLanguageConfig({ enabled: event.target.checked })}
            />
            {t("enabled")}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={languageConfig.autoDetect}
              disabled={saving}
              onChange={(event) => updateLanguageConfig({ autoDetect: event.target.checked })}
            />
            {t("autoDetect")}
          </label>
          <select
            value={languageConfig.defaultLanguage}
            disabled={saving || languageConfig.autoDetect}
            onChange={(event) => updateLanguageConfig({ defaultLanguage: event.target.value })}
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm"
          >
            {languagePacks.map((pack) => (
              <option key={pack.language} value={pack.language}>
                {pack.language}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {languagePacks.map((pack) => (
            <label
              key={pack.language}
              className="flex items-center justify-between rounded-lg border border-border bg-bg p-3 text-sm text-text-main"
            >
              <span>
                {pack.language} - {t("rulesCount", { count: pack.ruleCount })}
              </span>
              <input
                type="checkbox"
                checked={languageConfig.enabledPacks.includes(pack.language)}
                disabled={saving || pack.language === "en"}
                onChange={(event) => togglePack(pack.language, event.target.checked)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="text-sm font-semibold text-text-main">{t("analyticsTitle")}</h2>
          <div className="mt-3 space-y-2 text-sm text-text-main">
            {modeBreakdown.length === 0 ? (
              <p className="text-text-muted">{t("noAnalytics")}</p>
            ) : (
              modeBreakdown.map(([mode, stats]) => (
                <div key={mode} className="flex items-center justify-between gap-3">
                  <span>{mode}</span>
                  <span className="font-mono text-xs text-text-muted">
                    {formatNumber(stats.tokensSaved)} / {stats.avgSavingsPct}%
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="text-sm font-semibold text-text-main">{t("outputModeTitle")}</h2>
          <p className="mt-1 text-xs text-text-muted">{t("outputModeDesc")}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-text-main">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={outputMode.enabled}
                disabled={saving}
                onChange={(event) => updateOutputMode({ enabled: event.target.checked })}
              />
              {t("enabled")}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={outputMode.autoClarity}
                disabled={saving}
                onChange={(event) => updateOutputMode({ autoClarity: event.target.checked })}
              />
              {t("autoClarity")}
            </label>
            <select
              value={outputMode.intensity}
              disabled={saving}
              onChange={(event) =>
                updateOutputMode({ intensity: event.target.value as OutputModeConfig["intensity"] })
              }
              className="rounded-lg border border-border bg-bg px-3 py-2 text-sm"
            >
              <option value="lite">lite</option>
              <option value="full">full</option>
              <option value="ultra">ultra</option>
            </select>
          </div>
          <pre className="mt-3 overflow-auto rounded-lg border border-border bg-bg p-3 text-xs text-text-main">
            {previewPrompt}
          </pre>
          <p className="mt-3 text-xs text-text-muted">
            {t("bypassConditions")}: {t("bypassConditionsList")}
          </p>
        </div>
      </section>

      <CompressionSettingsTab />
    </div>
  );
}
