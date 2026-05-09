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

interface QdrantSettings {
  enabled: boolean;
  host: string;
  port: number;
  collection: string;
  embeddingModel: string;
  hasApiKey: boolean;
  apiKeyMasked: string | null;
}

interface EmbeddingModelOption {
  value: string;
  label: string;
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

  const [qdrant, setQdrant] = useState<QdrantSettings>({
    enabled: false,
    host: "",
    port: 6333,
    collection: "omniroute_memory",
    embeddingModel: "openai/text-embedding-3-small",
    hasApiKey: false,
    apiKeyMasked: null,
  });
  const [qdrantApiKeyInput, setQdrantApiKeyInput] = useState("");
  const [qdrantSaving, setQdrantSaving] = useState(false);
  const [qdrantStatus, setQdrantStatus] = useState<"" | "saved" | "error">("");
  const [qdrantHealth, setQdrantHealth] = useState<{
    ok: boolean;
    latencyMs: number;
    error?: string;
  } | null>(null);
  const [qdrantChecking, setQdrantChecking] = useState(false);
  const [qdrantQuery, setQdrantQuery] = useState("");
  const [qdrantSearching, setQdrantSearching] = useState(false);
  const [qdrantResults, setQdrantResults] = useState<
    Array<{ id: string; score: number; payload?: Record<string, unknown> }>
  >([]);
  const [qdrantCleanupLoading, setQdrantCleanupLoading] = useState(false);
  const [qdrantCleanupMsg, setQdrantCleanupMsg] = useState("");
  const [embeddingOptions, setEmbeddingOptions] = useState<EmbeddingModelOption[]>([]);
  const [qdrantHelpOpen, setQdrantHelpOpen] = useState(false);

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
      fetch("/api/settings/qdrant").then((res) => (res.ok ? res.json() : null)),
      fetch("/api/settings/qdrant/embedding-models").then((res) => (res.ok ? res.json() : null)),
    ])
      .then(([memData, settingsData, qdrantData, embeddingData]) => {
        if (memData) setConfig(memData);
        if (settingsData?.skillsmpApiKey) {
          setSkillsmpApiKey(settingsData.skillsmpApiKey);
        }
        if (qdrantData) {
          setQdrant(qdrantData);
          setQdrantApiKeyInput("");
        }
        if (embeddingData?.models && Array.isArray(embeddingData.models)) {
          setEmbeddingOptions(embeddingData.models);
        }
        if (
          settingsData?.skillsProvider === "skillsmp" ||
          settingsData?.skillsProvider === "skillssh"
        ) {
          setSkillsProvider(settingsData.skillsProvider);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const saveQdrant = useCallback(
    async (updates: Partial<QdrantSettings> & { apiKey?: string }) => {
      const previous = qdrant;
      const next = { ...qdrant, ...updates };
      setQdrant(next);
      setQdrantSaving(true);
      setQdrantStatus("");
      try {
        const res = await fetch("/api/settings/qdrant", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enabled: next.enabled,
            host: next.host,
            port: next.port,
            collection: next.collection,
            embeddingModel: next.embeddingModel,
            ...(updates.apiKey !== undefined ? { apiKey: updates.apiKey } : {}),
          }),
        });
        if (res.ok) {
          const data = await res.json().catch(() => next);
          setQdrant(data);
          setQdrantApiKeyInput("");
          setQdrantStatus("saved");
          setTimeout(() => setQdrantStatus(""), 2000);
        } else {
          setQdrant(previous);
          setQdrantStatus("error");
        }
      } catch {
        setQdrant(previous);
        setQdrantStatus("error");
      } finally {
        setQdrantSaving(false);
      }
    },
    [qdrant]
  );

  const checkQdrant = useCallback(async () => {
    setQdrantChecking(true);
    try {
      const res = await fetch("/api/settings/qdrant/health");
      if (res.ok) setQdrantHealth(await res.json());
      else setQdrantHealth({ ok: false, latencyMs: 0, error: "HTTP error" });
    } catch (e) {
      setQdrantHealth({
        ok: false,
        latencyMs: 0,
        error: e instanceof Error ? e.message : String(e),
      });
    } finally {
      setQdrantChecking(false);
    }
  }, []);

  const testQdrantSearch = useCallback(async () => {
    const q = qdrantQuery.trim();
    if (!q) return;
    setQdrantSearching(true);
    setQdrantResults([]);
    try {
      const res = await fetch("/api/settings/qdrant/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, topK: 5 }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setQdrantResults(Array.isArray(data.results) ? data.results : []);
      } else {
        setQdrantResults([]);
      }
    } catch {
      setQdrantResults([]);
    } finally {
      setQdrantSearching(false);
    }
  }, [qdrantQuery]);

  const runQdrantCleanup = useCallback(async () => {
    setQdrantCleanupLoading(true);
    setQdrantCleanupMsg("");
    try {
      const res = await fetch("/api/settings/qdrant/cleanup", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setQdrantCleanupMsg(
          `OK: removeu ${data.deletedCount ?? 0} ponto(s) (retencao: ${data.retentionDays} dias)`
        );
      } else {
        const err = data?.error || "Falha na limpeza";
        setQdrantCleanupMsg(`Erro: ${String(err)}`);
      }
    } catch (e) {
      setQdrantCleanupMsg(`Erro: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setQdrantCleanupLoading(false);
    }
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

      {/* Qdrant (optional semantic memory index) */}
      <Card data-testid="qdrant-settings-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              database
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("qdrantTitle")}</h3>
            <p className="text-sm text-text-muted">{t("qdrantDesc")}</p>
          </div>

          <span
            className={`ml-auto inline-flex items-center gap-2 text-xs font-medium ${
              qdrant.enabled
                ? qdrantHealth?.ok
                  ? "text-emerald-500"
                  : "text-red-500"
                : "text-text-muted"
            }`}
          >
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${
                qdrant.enabled ? (qdrantHealth?.ok ? "bg-emerald-500" : "bg-red-500") : "bg-border"
              }`}
              aria-hidden="true"
            />
            {qdrant.enabled
              ? qdrantHealth?.ok
                ? t("qdrantStatusActive")
                : t("qdrantStatusError")
              : t("qdrantStatusDisabled")}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
          <div>
            <p className="text-sm font-medium">{t("qdrantEnable")}</p>
            <p className="text-xs text-text-muted mt-0.5">{t("qdrantEnableDesc")}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={checkQdrant}
              disabled={qdrantChecking || qdrantSaving}
              className="px-3 h-8 text-xs font-medium rounded-lg bg-white/5 border border-border/60 hover:bg-white/10 disabled:opacity-50 transition-colors"
            >
              {qdrantChecking ? t("qdrantTesting") : t("qdrantTestConnection")}
            </button>
            <button
              data-testid="qdrant-enabled-switch"
              onClick={() => saveQdrant({ enabled: !qdrant.enabled })}
              disabled={qdrantSaving}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                qdrant.enabled ? "bg-emerald-500" : "bg-border"
              }`}
              role="switch"
              aria-checked={qdrant.enabled}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  qdrant.enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {qdrantStatus === "saved" && (
          <div className="mb-4 text-xs font-medium text-emerald-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>{" "}
            {t("qdrantSaved")}
          </div>
        )}
        {qdrantStatus === "error" && (
          <div className="mb-4 text-xs font-medium text-red-500">{t("qdrantSaveError")}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
            <label className="text-sm font-medium block mb-2">Host</label>
            <input
              value={qdrant.host}
              onChange={(e) => setQdrant((s) => ({ ...s, host: e.target.value }))}
              placeholder="http://127.0.0.1"
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <p className="text-xs text-text-muted mt-2">{t("qdrantHostHint")}</p>
          </div>

          <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
            <label className="text-sm font-medium block mb-2">{t("qdrantPort")}</label>
            <input
              value={qdrant.port}
              onChange={(e) =>
                setQdrant((s) => ({
                  ...s,
                  port: Math.max(1, Math.min(65535, Number(e.target.value) || 0)),
                }))
              }
              placeholder="6333"
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <p className="text-xs text-text-muted mt-2">{t("qdrantPortHint")}</p>
          </div>

          <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
            <label className="text-sm font-medium block mb-2">Collection</label>
            <input
              value={qdrant.collection}
              onChange={(e) => setQdrant((s) => ({ ...s, collection: e.target.value }))}
              placeholder="omniroute_memory"
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <p className="text-xs text-text-muted mt-2">{t("qdrantCollectionHint")}</p>
          </div>

          <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium block">{t("qdrantEmbeddingModel")}</label>
              <button
                type="button"
                onClick={() => setQdrantHelpOpen((v) => !v)}
                className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-border/70 text-xs text-text-muted hover:bg-white/10"
                title={t("qdrantHelpTitle")}
                aria-label={t("qdrantHelpTitle")}
              >
                ?
              </button>
            </div>
            {qdrantHelpOpen && (
              <div className="mb-3 p-3 rounded-lg bg-background/60 border border-border/60 text-xs text-text-muted leading-relaxed">
                <p className="font-medium text-white mb-1">{t("qdrantHelpQuickTitle")}</p>
                <p>{t("qdrantHelpStep1")}</p>
                <p>{t("qdrantHelpStep2")}</p>
                <p>{t("qdrantHelpStep3")}</p>
                <p>{t("qdrantHelpStep4")}</p>
              </div>
            )}
            <select
              value=""
              onChange={(e) => {
                const value = e.target.value;
                if (value) setQdrant((s) => ({ ...s, embeddingModel: value }));
              }}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">{t("qdrantEmbeddingQuickSelect")}</option>
              {embeddingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value}
                </option>
              ))}
            </select>
            <input
              value={qdrant.embeddingModel}
              onChange={(e) => setQdrant((s) => ({ ...s, embeddingModel: e.target.value }))}
              placeholder={t("qdrantEmbeddingInputPlaceholder")}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <p className="text-xs text-text-muted mt-2">{t("qdrantEmbeddingHint")}</p>
          </div>

          <div className="p-4 rounded-lg bg-surface/30 border border-border/30 md:col-span-2">
            <label className="text-sm font-medium block mb-2">
              API Key ({t("optional")}){" "}
              {qdrant.hasApiKey && qdrant.apiKeyMasked ? (
                <span className="text-xs text-text-muted font-mono">
                  {t("current")}: {qdrant.apiKeyMasked}
                </span>
              ) : null}
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={qdrantApiKeyInput}
                onChange={(e) => setQdrantApiKeyInput(e.target.value)}
                placeholder={
                  qdrant.hasApiKey
                    ? t("qdrantApiKeyPlaceholderKeep")
                    : t("qdrantApiKeyPlaceholderOptional")
                }
                className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {qdrant.hasApiKey && (
                <button
                  onClick={() => saveQdrant({ apiKey: "" })}
                  disabled={qdrantSaving}
                  className="px-3 py-2 text-sm font-medium rounded-lg bg-white/5 border border-border/60 hover:bg-white/10 disabled:opacity-50 transition-colors"
                >
                  {t("remove")}
                </button>
              )}
              <button
                onClick={() =>
                  saveQdrant(
                    qdrantApiKeyInput.trim().length > 0 ? { apiKey: qdrantApiKeyInput } : {}
                  )
                }
                disabled={qdrantSaving}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 transition-colors"
              >
                {qdrantSaving ? t("saving") : t("save")}
              </button>
            </div>
            <p className="text-xs text-text-muted mt-2">{t("qdrantSaveHint")}</p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-surface/30 border border-border/30">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium">{t("qdrantSearchTestTitle")}</p>
              <p className="text-xs text-text-muted mt-0.5">{t("qdrantSearchTestDesc")}</p>
            </div>
            <button
              onClick={testQdrantSearch}
              disabled={qdrantSearching}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-white/5 border border-border/60 hover:bg-white/10 disabled:opacity-50 transition-colors"
            >
              {qdrantSearching ? t("searching") : t("search")}
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={qdrantQuery}
              onChange={(e) => setQdrantQuery(e.target.value)}
              placeholder={t("qdrantSearchPlaceholder")}
              className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          {qdrantResults.length > 0 && (
            <div className="mt-3 space-y-2">
              {qdrantResults.map((r) => (
                <div key={r.id} className="p-3 rounded-lg bg-background/40 border border-border/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-text-muted">{r.id}</span>
                    <span className="text-xs font-mono text-emerald-400">
                      score {r.score.toFixed(4)}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-text-muted">
                    {(r.payload?.key as string) ? `key: ${String(r.payload?.key)}` : null}
                  </div>
                </div>
              ))}
            </div>
          )}
          {qdrantResults.length === 0 && qdrantQuery.trim().length > 0 && !qdrantSearching && (
            <p className="mt-3 text-xs text-text-muted">{t("qdrantNoResults")}</p>
          )}
        </div>

        <div className="mt-4 p-4 rounded-lg bg-surface/30 border border-border/30">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium">{t("qdrantCleanupTitle")}</p>
              <p className="text-xs text-text-muted mt-0.5">
                {t("qdrantCleanupDesc")} {t("retentionDays")} ({config.retentionDays} {t("days")}).
              </p>
            </div>
            <button
              onClick={runQdrantCleanup}
              disabled={qdrantCleanupLoading}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-white/5 border border-border/60 hover:bg-white/10 disabled:opacity-50 transition-colors"
            >
              {qdrantCleanupLoading ? t("cleaning") : t("cleanNow")}
            </button>
          </div>
          {qdrantCleanupMsg && <p className="mt-2 text-xs text-text-muted">{qdrantCleanupMsg}</p>}
        </div>
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
