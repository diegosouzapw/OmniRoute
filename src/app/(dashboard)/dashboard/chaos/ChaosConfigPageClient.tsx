/**
 * /dashboard/chaos — Chaos Mode Configuration Page
 *
 * Allows users to:
 * - Enable/disable chaos mode globally
 * - Set default mode (parallel/collaborative)
 * - Override provider models for chaos mode
 * - Set custom system prompt
 * - Configure timeout
 * - Test chaos mode with a simple task
 */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import * as log from "@/sse/utils/logger";

interface ProviderInfo {
  id: string;
  name: string;
  provider: string;
  defaultModel: string | null;
}

interface ProviderOverride {
  providerId: string;
  modelId?: string;
  enabled: boolean;
}

interface ChaosConfig {
  enabled: boolean;
  defaultMode: "parallel" | "collaborative";
  providerOverrides: ProviderOverride[];
  systemPrompt?: string;
  timeoutMs: number;
}

interface ModelResult {
  providerId: string;
  providerName: string;
  modelId: string;
  status: "success" | "error" | "skipped";
  content: string | null;
  error?: string;
  durationMs: number;
}

interface ChaosTestResult {
  task: string;
  mode: string;
  startedAt: string;
  totalProviders: number;
  totalResults: number;
  models: ModelResult[];
  summary?: string;
}

const DEFAULT_CONFIG: ChaosConfig = {
  enabled: false,
  defaultMode: "parallel",
  providerOverrides: [],
  systemPrompt: "",
  timeoutMs: 120_000,
};

export default function ChaosConfigPage() {
  const t = useTranslations("chaosConfig");

  const [config, setConfig] = useState<ChaosConfig>(DEFAULT_CONFIG);
  const [providers, setProviders] = useState<ProviderInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<ChaosTestResult | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch current config + providers on mount
  useEffect(() => {
    async function load() {
      try {
        const [configRes, providersRes] = await Promise.all([
          fetch("/api/chaos/config"),
          fetch("/api/keys"),
        ]);

        if (configRes.ok) {
          const data = await configRes.json();
          setConfig(data.config || DEFAULT_CONFIG);
        }

        if (providersRes.ok) {
          // We'll just rely on provider info from the providers page
        }
      } catch (err) {
        log.error("chaos", "Failed to load config", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const saveConfig = useCallback(async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/chaos/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        const data = await res.json();
        setConfig(data.config);
        setMessage({ type: "success", text: t("configSaved") });
      } else {
        setMessage({ type: "error", text: t("configError") });
      }
    } catch {
      setMessage({ type: "error", text: t("configError") });
    } finally {
      setSaving(false);
    }
  }, [config, t]);

  const resetConfig = useCallback(async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/chaos/config", { method: "DELETE" });
      if (res.ok) {
        const data = await res.json();
        setConfig(data.config);
        setMessage({ type: "success", text: "Config reset to defaults" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to reset config" });
    } finally {
      setSaving(false);
    }
  }, []);

  const testChaos = useCallback(async () => {
    setTesting(true);
    setTestResult(null);
    setMessage(null);
    try {
      const res = await fetch("/api/skills/collect/chaos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: t("testTask"),
          mode: config.defaultMode,
        }),
      });

      if (res.ok) {
        const data: ChaosTestResult = await res.json();
        setTestResult(data);
      } else {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        setMessage({ type: "error", text: err.error || "Test failed" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Test failed" });
    } finally {
      setTesting(false);
    }
  }, [config.defaultMode, t]);

  const addOverride = () => {
    setConfig((prev) => ({
      ...prev,
      providerOverrides: [
        ...prev.providerOverrides,
        { providerId: "", modelId: "", enabled: true },
      ],
    }));
  };

  const updateOverride = (index: number, field: keyof ProviderOverride, value: any) => {
    setConfig((prev) => {
      const overrides = [...prev.providerOverrides];
      overrides[index] = { ...overrides[index], [field]: value };
      return { ...prev, providerOverrides: overrides };
    });
  };

  const removeOverride = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      providerOverrides: prev.providerOverrides.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-muted animate-pulse">{t("loadingProviderModels")}</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-main">{t("pageTitle")}</h1>
        <p className="text-sm text-text-muted mt-1">{t("pageSubtitle")}</p>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`p-3 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20"
              : "bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Enable/Disable Toggle */}
      <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("enableChaos")}</p>
          <p className="text-xs text-text-muted">{t("enableChaosDesc")}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={config.enabled}
          onClick={() => setConfig((prev) => ({ ...prev, enabled: !prev.enabled }))}
          className={`inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            config.enabled
              ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
              : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {config.enabled ? "toggle_on" : "toggle_off"}
          </span>
          {config.enabled ? "Enabled" : "Disabled"}
        </button>
      </div>

      {/* Default Mode Selector */}
      <div className="p-3 rounded-lg border border-border bg-surface/40">
        <p className="text-sm font-medium text-text-main mb-2">{t("mode")}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setConfig((prev) => ({ ...prev, defaultMode: "parallel" }))}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
              config.defaultMode === "parallel"
                ? "bg-primary text-white"
                : "bg-black/5 dark:bg-white/5 text-text-muted hover:bg-black/10 dark:hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined text-[16px] align-middle mr-1">
              call_split
            </span>
            {t("modeParallel")}
            <p className="text-[10px] opacity-70 mt-0.5">{t("modeParallelDesc")}</p>
          </button>
          <button
            type="button"
            onClick={() => setConfig((prev) => ({ ...prev, defaultMode: "collaborative" }))}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
              config.defaultMode === "collaborative"
                ? "bg-primary text-white"
                : "bg-black/5 dark:bg-white/5 text-text-muted hover:bg-black/10 dark:hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined text-[16px] align-middle mr-1">merge</span>
            {t("modeCollaborative")}
            <p className="text-[10px] opacity-70 mt-0.5">{t("modeCollaborativeDesc")}</p>
          </button>
        </div>
      </div>

      {/* Timeout */}
      <div className="p-3 rounded-lg border border-border bg-surface/40">
        <p className="text-sm font-medium text-text-main">{t("timeout")}</p>
        <p className="text-xs text-text-muted mb-2">{t("timeoutDesc")}</p>
        <input
          type="number"
          min={5000}
          max={600000}
          step={5000}
          value={config.timeoutMs}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              timeoutMs: Math.max(5000, Math.min(600000, Number(e.target.value) || 120000)),
            }))
          }
          className="w-full px-3 py-1.5 rounded-md border border-border bg-surface text-sm text-text-main"
        />
      </div>

      {/* System Prompt */}
      <div className="p-3 rounded-lg border border-border bg-surface/40">
        <p className="text-sm font-medium text-text-main">{t("systemPrompt")}</p>
        <p className="text-xs text-text-muted mb-2">{t("systemPromptDesc")}</p>
        <textarea
          value={config.systemPrompt || ""}
          onChange={(e) => setConfig((prev) => ({ ...prev, systemPrompt: e.target.value }))}
          rows={3}
          className="w-full px-3 py-1.5 rounded-md border border-border bg-surface text-sm text-text-main resize-y"
          placeholder="Optional: override the default chaos mode system prompt..."
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={saveConfig}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {saving ? (
            <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
          ) : (
            <span className="material-symbols-outlined text-[16px]">save</span>
          )}
          {t("saveConfig")}
        </button>
        <button
          type="button"
          onClick={resetConfig}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-text-muted text-sm hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          {t("configReset")}
        </button>
      </div>

      {/* Test Button */}
      <div className="p-3 rounded-lg border border-border bg-surface/40">
        <p className="text-sm font-medium text-text-main mb-2">{t("testButton")}</p>
        <button
          type="button"
          onClick={testChaos}
          disabled={testing || !config.enabled}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-sm font-semibold hover:bg-amber-500/25 disabled:opacity-50"
        >
          {testing ? (
            <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
          ) : (
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
          )}
          {testing ? "Running..." : t("testButton")}
        </button>
      </div>

      {/* Test Results */}
      {testResult && (
        <div className="p-3 rounded-lg border border-border bg-surface/40 space-y-3">
          <h3 className="text-sm font-bold text-text-main">
            Test Results — {testResult.mode} mode ({testResult.totalProviders} providers)
          </h3>
          <div className="text-xs text-text-muted">
            Started: {new Date(testResult.startedAt).toLocaleTimeString()}
          </div>
          {testResult.models.map((model, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md text-xs ${
                model.status === "success"
                  ? "bg-green-500/5 border border-green-500/20"
                  : "bg-red-500/5 border border-red-500/20"
              }`}
            >
              <div className="font-medium text-text-main">
                [{idx + 1}] {model.providerName} / {model.modelId}
                <span className="ml-2 text-text-muted">({model.durationMs}ms)</span>
                <span
                  className={`ml-2 ${
                    model.status === "success" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {model.status}
                </span>
              </div>
              {model.status === "success" && model.content && (
                <div className="mt-1 text-text-muted line-clamp-3 whitespace-pre-wrap">
                  {model.content.slice(0, 300)}
                  {model.content.length > 300 ? "..." : ""}
                </div>
              )}
              {model.error && <div className="mt-1 text-red-500">{model.error}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Provider Overrides */}
      <div className="p-3 rounded-lg border border-border bg-surface/40 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-main">{t("providerOverrides")}</p>
            <p className="text-xs text-text-muted">{t("providerOverridesDesc")}</p>
          </div>
          <button
            type="button"
            onClick={addOverride}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            {t("addProvider")}
          </button>
        </div>

        {config.providerOverrides.length === 0 && (
          <p className="text-xs text-text-muted italic">
            No overrides — all active providers will participate with their default models
          </p>
        )}

        {config.providerOverrides.map((override, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 p-2 rounded-md bg-black/5 dark:bg-white/5"
          >
            <input
              type="text"
              placeholder="Provider ID"
              value={override.providerId}
              onChange={(e) => updateOverride(idx, "providerId", e.target.value)}
              className="flex-1 px-2 py-1 rounded border border-border bg-surface text-xs text-text-main"
            />
            <input
              type="text"
              placeholder="Model ID (optional)"
              value={override.modelId || ""}
              onChange={(e) => updateOverride(idx, "modelId", e.target.value)}
              className="flex-1 px-2 py-1 rounded border border-border bg-surface text-xs text-text-main"
            />
            <button
              type="button"
              onClick={() => updateOverride(idx, "enabled", !override.enabled)}
              className={`px-2 py-1 rounded text-xs ${
                override.enabled ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
              }`}
            >
              {override.enabled ? "ON" : "OFF"}
            </button>
            <button
              type="button"
              onClick={() => removeOverride(idx)}
              className="px-2 py-1 rounded text-xs text-red-500 hover:bg-red-500/10"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
