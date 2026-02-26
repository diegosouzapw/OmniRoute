"use client";

/**
 * ModelAvailabilityPanel — Batch B
 *
 * Shows real-time model availability and cooldown status.
 * Fetched from /api/models/availability.
 */

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card, Button } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

export default function ModelAvailabilityPanel() {
  const t = useTranslations("providers");
  const tc = useTranslations("common");

  const STATUS_CONFIG = {
    available: { icon: "check_circle", color: "#22c55e", label: t("available") },
    cooldown: { icon: "schedule", color: "#f59e0b", label: t("cooldown") },
    unavailable: { icon: "error", color: "#ef4444", label: t("unavailable") },
    unknown: { icon: "help", color: "#6b7280", label: t("unknown") },
  };

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState<string | null>(null);
  const notify = useNotificationStore();

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/models/availability");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // silent fail — will retry
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const handleClearCooldown = async (provider: string, model: string) => {
    setClearing(`${provider}:${model}`);
    try {
      const res = await fetch("/api/models/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clearCooldown", provider, model }),
      });
      if (res.ok) {
        notify.success(t("cooldownCleared", { model }));
        await fetchStatus();
      } else {
        notify.error(t("failedClearCooldown"));
      }
    } catch {
      notify.error(t("failedClearCooldown"));
    } finally {
      setClearing(null);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 mt-6">
        <div className="flex items-center gap-2 text-text-muted animate-pulse">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            monitoring
          </span>
          {t("loadingAvailability")}
        </div>
      </Card>
    );
  }

  const models = data?.models || [];
  const unavailableCount =
    data?.unavailableCount || models.filter((m: any) => m.status !== "available").length;

  if (models.length === 0 || unavailableCount === 0) {
    return (
      <Card className="p-6 mt-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              verified
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-main">{t("modelAvailability")}</h3>
            <p className="text-sm text-text-muted">{t("allModelsOperational")}</p>
          </div>
        </div>
      </Card>
    );
  }

  // Group by provider
  const byProvider: Record<string, any[]> = {};
  models.forEach((m: any) => {
    if (m.status === "available") return;
    const key = m.provider || "unknown";
    if (!byProvider[key]) byProvider[key] = [];
    byProvider[key].push(m);
  });

  return (
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              warning
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-main">{t("modelAvailability")}</h3>
            <p className="text-sm text-text-muted">
              {t("modelsWithIssues", { count: unavailableCount })}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={fetchStatus}
          className="text-text-muted"
          title={tc("refresh")}
        >
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            refresh
          </span>
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {Object.entries(byProvider).map(([provider, provModels]) => (
          <div key={provider} className="border border-border/30 rounded-lg p-3">
            <p className="text-sm font-medium text-text-main mb-2 capitalize">{provider}</p>
            <div className="flex flex-col gap-1.5">
              {provModels.map((m) => {
                const status =
                  STATUS_CONFIG[m.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.unknown;
                const isClearing = clearing === `${m.provider}:${m.model}`;
                return (
                  <div
                    key={`${m.provider}-${m.model}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface/30"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ color: status.color }}
                        aria-hidden="true"
                      >
                        {status.icon}
                      </span>
                      <span className="font-mono text-sm text-text-main">{m.model}</span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${status.color}15`,
                          color: status.color,
                        }}
                      >
                        {status.label}
                      </span>
                      {m.cooldownUntil && (
                        <span className="text-xs text-text-muted">
                          {t("until", { time: new Date(m.cooldownUntil).toLocaleTimeString() })}
                        </span>
                      )}
                    </div>
                    {m.status === "cooldown" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleClearCooldown(m.provider, m.model)}
                        disabled={isClearing}
                        className="text-xs"
                      >
                        {isClearing ? t("clearing") : t("clearCooldown")}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
