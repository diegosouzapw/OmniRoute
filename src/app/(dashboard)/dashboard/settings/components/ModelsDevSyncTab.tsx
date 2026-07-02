"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";

interface ModelsDevStatus {
  enabled: boolean;
  lastSync: string | null;
  lastSyncModelCount: number;
  lastSyncCapabilityCount: number;
  nextSync: string | null;
  intervalMs: number;
  providerCount: number;
  modelCount: number;
  capabilityCount: number;
}

interface SyncResult {
  success: boolean;
  modelCount: number;
  providerCount: number;
  capabilityCount: number;
  error?: string;
}

export default function ModelsDevSyncTab() {
  const t = useTranslations("settings");
  const [status, setStatus] = useState<ModelsDevStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [intervalHours, setIntervalHours] = useState(24);
  const [draftIntervalHours, setDraftIntervalHours] = useState(24);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/settings/models-dev?action=status");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch {
      // Silently fail — sync may not be initialized yet
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    Promise.all([fetchStatus(), fetch("/api/settings").then((r) => (r.ok ? r.json() : null))])
      .then(([, settingsData]) => {
        if (settingsData) {
          setEnabled(settingsData.modelsDevSyncEnabled === true);
          const intervalMs = settingsData.modelsDevSyncInterval || 86400000;
          const hours = Math.round(intervalMs / 3600000);
          setIntervalHours(hours);
          setDraftIntervalHours(hours);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch models.dev settings:", err);
        setFeedback({ type: "error", message: "Failed to load settings" });
      });
  }, [fetchStatus]);

  const triggerSync = async () => {
    setSyncing(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/settings/models-dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync" }),
      });
      if (res.ok) {
        const result: SyncResult = await res.json();
        if (result.success) {
          setFeedback({
            type: "success",
            message: `Synced ${result.modelCount.toLocaleString()} pricing entries, ${result.capabilityCount.toLocaleString()} capabilities`,
          });
          fetchStatus();
        } else {
          setFeedback({ type: "error", message: result.error || "Sync failed" });
        }
      } else {
        setFeedback({ type: "error", message: "Sync request failed" });
      }
    } catch {
      setFeedback({ type: "error", message: "Network error" });
    } finally {
      setSyncing(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  const toggleEnabled = async () => {
    const newVal = !enabled;
    setEnabled(newVal);
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelsDevSyncEnabled: newVal }),
      });
      if (!res.ok) {
        setEnabled(!newVal);
        setFeedback({ type: "error", message: t("enableSyncError") || "Failed to update" });
      } else {
        setFeedback({ type: "success", message: "Settings saved" });
      }
    } catch {
      setEnabled(!newVal);
      setFeedback({ type: "error", message: "Network error" });
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const updateInterval = async (hours: number) => {
    const oldInterval = intervalHours;
    setIntervalHours(hours);
    setDraftIntervalHours(hours);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelsDevSyncInterval: hours * 3600000 }),
      });
      if (!res.ok) {
        setIntervalHours(oldInterval);
        setDraftIntervalHours(oldInterval);
        setFeedback({ type: "error", message: t("enableSyncError") || "Failed to update" });
      } else {
        setFeedback({ type: "success", message: "Interval updated" });
      }
    } catch {
      setIntervalHours(oldInterval);
      setDraftIntervalHours(oldInterval);
      setFeedback({ type: "error", message: "Network error" });
    } finally {
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  if (loading) {
    return (
      <Card>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              sync
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("modelsDevTitle")}</h3>
            <p className="text-sm text-text-muted">{t("modelsDevDesc")}</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-text-muted">{t("loading")}...</div>
      </Card>
    );
  }

  const formatLastSync = (iso: string | null) => {
    if (!iso) return t("never");
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return t("justNow");
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Main sync card */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              database
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("modelsDevTitle")}</h3>
            <p className="text-sm text-text-muted">{t("modelsDevDesc")}</p>
          </div>
          {feedback && (
            <span
              className={`ml-auto text-xs font-medium flex items-center gap-1 ${
                feedback.type === "success" ? "text-emerald-500" : "text-red-500"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {feedback.type === "success" ? "check_circle" : "error"}
              </span>{" "}
              {feedback.message}
            </span>
          )}
        </div>

        {/* Enable toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
          <div>
            <p className="text-sm font-medium">{t("modelsDevEnabled")}</p>
            <p className="text-xs text-text-muted mt-0.5">{t("modelsDevEnabledDesc")}</p>
          </div>
          <button
            onClick={toggleEnabled}
            disabled={saving}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              enabled ? "bg-blue-500" : "bg-border"
            }`}
            role="switch"
            aria-checked={enabled}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Sync interval */}
        {enabled && (
          <div className="p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium">{t("modelsDevInterval")}</p>
              <span className="text-sm font-mono tabular-nums text-blue-400">
                {draftIntervalHours}h
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="168"
              step="1"
              value={draftIntervalHours}
              onChange={(e) => setDraftIntervalHours(parseInt(e.target.value))}
              onMouseUp={(e) => updateInterval(parseInt((e.target as HTMLInputElement).value))}
              onBlur={(e) => updateInterval(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>1h</span>
              <span>6h</span>
              <span>24h</span>
              <span>7d</span>
            </div>
          </div>
        )}

        {/* Manual sync button */}
        <div className="flex items-center gap-3">
          <button
            onClick={triggerSync}
            disabled={syncing}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${syncing ? "animate-spin" : ""}`}
            >
              sync
            </span>
            {syncing ? t("syncing") : t("syncNow")}
          </button>
          {status?.lastSync && (
            <span className="text-xs text-text-muted">
              {t("lastSync")}: {formatLastSync(status.lastSync)}
            </span>
          )}
        </div>
      </Card>

      {/* Stats card */}
      {status && (status.providerCount > 0 || status.modelCount > 0) && (
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                bar_chart
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("modelsDevStats")}</h3>
              <p className="text-sm text-text-muted">{t("modelsDevStatsDesc")}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-surface/30 border border-border/30 text-center">
              <p className="text-2xl font-bold text-blue-400">
                {status.providerCount.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted mt-1">{t("providers")}</p>
            </div>
            <div className="p-4 rounded-lg bg-surface/30 border border-border/30 text-center">
              <p className="text-2xl font-bold text-emerald-400">
                {status.modelCount.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted mt-1">{t("modelsWithPricing")}</p>
            </div>
            <div className="p-4 rounded-lg bg-surface/30 border border-border/30 text-center">
              <p className="text-2xl font-bold text-violet-400">
                {status.capabilityCount.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted mt-1">{t("capabilities")}</p>
            </div>
            <div className="p-4 rounded-lg bg-surface/30 border border-border/30 text-center">
              <p className="text-2xl font-bold text-amber-400">
                {status.lastSyncModelCount > 0 ? status.lastSyncModelCount.toLocaleString() : "—"}
              </p>
              <p className="text-xs text-text-muted mt-1">{t("lastSyncCount")}</p>
            </div>
          </div>

          {status.lastSync && (
            <div className="mt-4 text-xs text-text-muted text-center">
              {t("lastSyncFull")}: {new Date(status.lastSync).toLocaleString()}
            </div>
          )}
        </Card>
      )}

      {/* Info card */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              info
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("modelsDevInfo")}</h3>
          </div>
        </div>
        <div className="text-sm text-text-muted space-y-2">
          <p>{t("modelsDevInfoDesc")}</p>
          <p>{t("modelsDevInfoResolution")}</p>
          <p className="text-xs font-mono bg-surface/50 p-2 rounded">{t("modelsDevInfoOrder")}</p>
        </div>
      </Card>
    </div>
  );
}
