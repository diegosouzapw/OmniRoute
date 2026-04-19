"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";
import type { SkillsProvider } from "@/lib/skills/providerSettings";

interface MemoryConfig {
  enabled: boolean;
  maxTokens: number;
  retentionDays: number;
  strategy: "recent" | "semantic" | "hybrid";
  skillsEnabled: boolean;
}

const STRATEGIES = [
  { value: "recent", labelKey: "recent", descKey: "recentDesc" },
  { value: "semantic", labelKey: "semantic", descKey: "semanticDesc" },
  { value: "hybrid", labelKey: "hybrid", descKey: "hybridDesc" },
];

export default function MemorySkillsTab() {
  const [config, setConfig] = useState<MemoryConfig>({
    enabled: true,
    maxTokens: 2000,
    retentionDays: 30,
    strategy: "hybrid",
    skillsEnabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [skillsmpApiKey, setSkillsmpApiKey] = useState("");
  const [skillsmpSaving, setSkillsmpSaving] = useState(false);
  const [skillsmpStatus, setSkillsmpStatus] = useState("");
  const [skillsProvider, setSkillsProvider] = useState<SkillsProvider>("skillsmp");
  const [skillsProviderSaving, setSkillsProviderSaving] = useState(false);
  const [skillsProviderStatus, setSkillsProviderStatus] = useState("");
  const t = useTranslations("settings");

  useEffect(() => {
    Promise.all([
      fetch("/api/settings/memory").then((res) => (res.ok ? res.json() : null)),
      fetch("/api/settings").then((res) => (res.ok ? res.json() : null)),
    ])
      .then(([memData, settingsData]) => {
        if (memData) setConfig(memData);
        if (settingsData?.skillsmpApiKey) {
          setSkillsmpApiKey(settingsData.skillsmpApiKey);
        }
        if (
          settingsData?.skillsProvider === "skillsmp" ||
          settingsData?.skillsProvider === "skillssh"
        ) {
          setSkillsProvider(settingsData.skillsProvider);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const saveSkillsmpApiKey = useCallback(async () => {
    setSkillsmpSaving(true);
    setSkillsmpStatus("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillsmpApiKey }),
      });
      if (res.ok) {
        setSkillsmpStatus("saved");
        setTimeout(() => setSkillsmpStatus(""), 2000);
      } else {
        setSkillsmpStatus("error");
      }
    } catch {
      setSkillsmpStatus("error");
    } finally {
      setSkillsmpSaving(false);
    }
  }, [skillsmpApiKey]);

  const saveSkillsProvider = useCallback(async (provider: SkillsProvider) => {
    setSkillsProvider(provider);
    setSkillsProviderSaving(true);
    setSkillsProviderStatus("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillsProvider: provider }),
      });
      if (res.ok) {
        setSkillsProviderStatus("saved");
        setTimeout(() => setSkillsProviderStatus(""), 2000);
      } else {
        setSkillsProviderStatus("error");
      }
    } catch {
      setSkillsProviderStatus("error");
    } finally {
      setSkillsProviderSaving(false);
    }
  }, []);

  const save = async (updates: Partial<MemoryConfig>) => {
    const previousConfig = config;
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings/memory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        const savedConfig = await res.json().catch(() => newConfig);
        setConfig(savedConfig);
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setConfig(previousConfig);
        setStatus("error");
      }
    } catch {
      setConfig(previousConfig);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card data-testid="memory-settings-card">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              psychology
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("memorySkillsTitle")}</h3>
            <p className="text-sm text-text-muted">{t("memorySkillsDesc")}</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-text-muted">{t("loading")}...</div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Memory Settings */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              memory
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("memoryTitle")}</h3>
            <p className="text-sm text-text-muted">{t("memoryDesc")}</p>
          </div>
          {status === "saved" && (
            <span className="ml-auto text-xs font-medium text-emerald-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>{" "}
              {t("saved")}
            </span>
          )}
        </div>

        {/* Enable toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
          <div>
            <p className="text-sm font-medium">{t("memoryEnabled")}</p>
            <p className="text-xs text-text-muted mt-0.5">{t("memoryEnabledDesc")}</p>
          </div>
          <button
            data-testid="memory-enabled-switch"
            onClick={() => save({ enabled: !config.enabled })}
            disabled={saving}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              config.enabled ? "bg-violet-500" : "bg-border"
            }`}
            role="switch"
            aria-checked={config.enabled}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                config.enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Memory config fields */}
        {config.enabled && (
          <>
            {/* Max tokens */}
            <div className="p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">{t("maxTokens")}</p>
                <span className="text-sm font-mono tabular-nums text-violet-400">
                  {config.maxTokens.toLocaleString()} {t("tokens")}
                </span>
              </div>
              <input
                data-testid="memory-max-tokens-slider"
                type="range"
                min="0"
                max="16000"
                step="500"
                value={config.maxTokens}
                onChange={(e) => save({ maxTokens: parseInt(e.target.value) })}
                className="w-full accent-violet-500"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>{t("off")}</span>
                <span>4K</span>
                <span>8K</span>
                <span>16K</span>
              </div>
            </div>

            {/* Retention days */}
            <div className="p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">{t("retentionDays")}</p>
                <span className="text-sm font-mono tabular-nums text-violet-400">
                  {config.retentionDays} {t("days")}
                </span>
              </div>
              <input
                data-testid="memory-retention-slider"
                type="range"
                min="1"
                max="90"
                step="1"
                value={config.retentionDays}
                onChange={(e) => save({ retentionDays: parseInt(e.target.value) })}
                className="w-full accent-violet-500"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>1</span>
                <span>30</span>
                <span>60</span>
                <span>90</span>
              </div>
            </div>

            {/* Strategy selector */}
            <div className="grid grid-cols-3 gap-2">
              {STRATEGIES.map((s) => (
                <button
                  data-testid={`memory-strategy-${s.value}`}
                  key={s.value}
                  onClick={() => save({ strategy: s.value as "recent" | "semantic" | "hybrid" })}
                  disabled={loading || saving}
                  className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                    config.strategy === s.value
                      ? "border-violet-500/50 bg-violet-500/5 ring-1 ring-violet-500/20"
                      : "border-border/50 hover:border-border hover:bg-surface/30"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${config.strategy === s.value ? "text-violet-400" : ""}`}
                  >
                    {t(s.labelKey)}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{t(s.descKey)}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </Card>

      {/* Skills Settings (placeholder) */}
      <Card data-testid="skills-settings-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              handyman
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("skillsTitle")}</h3>
            <p className="text-sm text-text-muted">{t("skillsDesc")}</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/30">
          <div>
            <p className="text-sm font-medium">{t("skillsEnabled")}</p>
            <p className="text-xs text-text-muted mt-0.5">{t("skillsEnabledDesc")}</p>
          </div>
          <button
            data-testid="skills-enabled-switch"
            onClick={() => save({ skillsEnabled: !config.skillsEnabled })}
            disabled={saving}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              config.skillsEnabled ? "bg-amber-500" : "bg-border"
            }`}
            role="switch"
            aria-checked={config.skillsEnabled}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                config.skillsEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </Card>

      {/* SkillsMP Marketplace API Key */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              storefront
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">SkillsMP Marketplace</h3>
            <p className="text-sm text-text-muted">
              Connect to SkillsMP to discover and install skills from the marketplace.
            </p>
          </div>
          {skillsmpStatus === "saved" && (
            <span className="ml-auto text-xs font-medium text-emerald-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>{" "}
              {t("saved")}
            </span>
          )}
          {skillsmpStatus === "error" && (
            <span className="ml-auto text-xs font-medium text-red-500">Failed to save</span>
          )}
        </div>

        <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
          <label className="text-sm font-medium block mb-2">API Key</label>
          <div className="flex gap-2">
            <input
              type="password"
              value={skillsmpApiKey}
              onChange={(e) => setSkillsmpApiKey(e.target.value)}
              placeholder="sk_live_..."
              className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
            <button
              onClick={saveSkillsmpApiKey}
              disabled={skillsmpSaving}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors"
            >
              {skillsmpSaving ? "Saving..." : "Save"}
            </button>
          </div>
          <p className="text-xs text-text-muted mt-2">
            Get your API key from <span className="text-violet-400">skillsmp.com</span>. Rate limit:
            500 requests/day.
          </p>
        </div>
      </Card>

      {/* Active Skills Provider */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              hub
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Active Skills Provider</h3>
            <p className="text-sm text-text-muted">
              Choose which provider the Skills page uses for search and install.
            </p>
          </div>
          {skillsProviderStatus === "saved" && (
            <span className="ml-auto text-xs font-medium text-emerald-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>{" "}
              {t("saved")}
            </span>
          )}
          {skillsProviderStatus === "error" && (
            <span className="ml-auto text-xs font-medium text-red-500">Failed to save</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            type="button"
            disabled={skillsProviderSaving}
            onClick={() => saveSkillsProvider("skillsmp")}
            className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
              skillsProvider === "skillsmp"
                ? "border-indigo-500/50 bg-indigo-500/5 ring-1 ring-indigo-500/20"
                : "border-border/50 hover:border-border hover:bg-surface/30"
            }`}
          >
            <p
              className={`text-sm font-medium ${skillsProvider === "skillsmp" ? "text-indigo-400" : ""}`}
            >
              SkillsMP Marketplace
            </p>
            <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
              Authenticated marketplace (uses your SkillsMP API key).
            </p>
          </button>

          <button
            type="button"
            disabled={skillsProviderSaving}
            onClick={() => saveSkillsProvider("skillssh")}
            className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
              skillsProvider === "skillssh"
                ? "border-indigo-500/50 bg-indigo-500/5 ring-1 ring-indigo-500/20"
                : "border-border/50 hover:border-border hover:bg-surface/30"
            }`}
          >
            <p
              className={`text-sm font-medium ${skillsProvider === "skillssh" ? "text-indigo-400" : ""}`}
            >
              skills.sh Directory
            </p>
            <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
              Public directory provider (no API key required).
            </p>
          </button>
        </div>
      </Card>
    </div>
  );
}
