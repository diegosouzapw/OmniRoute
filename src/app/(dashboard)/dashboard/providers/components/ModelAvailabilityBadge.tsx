"use client";

/**
 * ModelAvailabilityBadge — compact inline status indicator
 *
 * Replaces the full ModelAvailabilityPanel card with a small badge
 * that shows green when all models are operational, or amber/red
 * when there are issues, with a hover popover for details.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

export default function ModelAvailabilityBadge() {
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
  const [expanded, setExpanded] = useState(false);
  const [clearing, setClearing] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
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

  // Close popover on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    if (expanded) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [expanded]);

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

  if (loading) return null;

  const models = data?.models || [];
  const unavailableCount =
    data?.unavailableCount || models.filter((m: any) => m.status !== "available").length;
  const isHealthy = unavailableCount === 0;

  // Group unhealthy models by provider
  const byProvider: Record<string, any[]> = {};
  models.forEach((m: any) => {
    if (m.status === "available") return;
    const key = m.provider || "unknown";
    if (!byProvider[key]) byProvider[key] = [];
    byProvider[key].push(m);
  });

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
          isHealthy
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/15"
            : "bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500/15"
        }`}
      >
        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
          {isHealthy ? "verified" : "warning"}
        </span>
        {isHealthy ? t("allModelsOperational") : t("modelsWithIssues", { count: unavailableCount })}
      </button>

      {/* Expanded popover */}
      {expanded && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ color: isHealthy ? "#22c55e" : "#f59e0b" }}
                aria-hidden="true"
              >
                {isHealthy ? "verified" : "warning"}
              </span>
              <span className="text-sm font-semibold text-text-main">{t("modelStatus")}</span>
            </div>
            <button
              onClick={fetchStatus}
              className="p-1 rounded-lg hover:bg-surface text-text-muted hover:text-text-main transition-colors"
              title={tc("refresh")}
            >
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                refresh
              </span>
            </button>
          </div>

          <div className="px-4 py-3 max-h-60 overflow-y-auto">
            {isHealthy ? (
              <p className="text-sm text-text-muted text-center py-2">{t("allModelsNormal")}</p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {Object.entries(byProvider).map(([provider, provModels]) => (
                  <div key={provider}>
                    <p className="text-xs font-semibold text-text-main mb-1.5 capitalize">
                      {provider}
                    </p>
                    <div className="flex flex-col gap-1">
                      {provModels.map((m) => {
                        const status =
                          STATUS_CONFIG[m.status as keyof typeof STATUS_CONFIG] ||
                          STATUS_CONFIG.unknown;
                        const isClearing = clearing === `${m.provider}:${m.model}`;
                        return (
                          <div
                            key={`${m.provider}-${m.model}`}
                            className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-surface/30"
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span
                                className="material-symbols-outlined text-[14px] shrink-0"
                                style={{ color: status.color }}
                                aria-hidden="true"
                              >
                                {status.icon}
                              </span>
                              <span className="font-mono text-xs text-text-main truncate">
                                {m.model}
                              </span>
                            </div>
                            {m.status === "cooldown" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleClearCooldown(m.provider, m.model)}
                                disabled={isClearing}
                                className="text-[10px] px-1.5! py-0.5! ml-2"
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
