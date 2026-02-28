"use client";

import { useTranslations } from "next-intl";

/**
 * TokenHealthBadge — Batch G
 *
 * Small badge in the Header showing token health status.
 * Polls /api/token-health every 60s.
 */

import { useState, useEffect } from "react";

const STATUS_MAP = {
  healthy: { icon: "check_circle", color: "#22c55e", tooltip: "All tokens healthy" },
  warning: { icon: "warning", color: "#f59e0b", tooltip: "Some tokens need attention" },
  error: { icon: "error", color: "#ef4444", tooltip: "Token refresh failures detected" },
  unknown: { icon: "help", color: "#6b7280", tooltip: "Health status unknown" },
};

export default function TokenHealthBadge() {
  const t = useTranslations("stats");
  const [health, setHealth] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch("/api/token-health");
        if (res.ok) {
          const data = await res.json();
          setHealth(data);
        }
      } catch {
        // silent
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!health || health.total === 0) return null;

  const status = STATUS_MAP[health.status] || STATUS_MAP.unknown;

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-surface/30 transition-colors"
        title={status.tooltip}
      >
        <span className="material-symbols-outlined text-[18px]" style={{ color: status.color }}>
          {status.icon}
        </span>
        {health.errored > 0 && (
          <span className="text-xs font-medium" style={{ color: status.color }}>
            {health.errored}
          </span>
        )}
      </button>

      {showTooltip && (
        <div
          className="absolute top-full right-0 mt-1 z-50 min-w-[200px] p-3 rounded-lg shadow-lg"
          style={{
            background: "rgba(15, 15, 25, 0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <p className="text-xs font-medium text-text-main mb-2">{t("tokenHealth")}</p>
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">{t("totalOAuth")}</span>
              <span className="text-text-main">{health.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-400">{t("healthy")}</span>
              <span className="text-text-main">{health.healthy}</span>
            </div>
            {health.errored > 0 && (
              <div className="flex justify-between">
                <span className="text-red-400">{t("errored")}</span>
                <span className="text-text-main">{health.errored}</span>
              </div>
            )}
            {health.warning > 0 && (
              <div className="flex justify-between">
                <span className="text-amber-400">{t("warning")}</span>
                <span className="text-text-main">{health.warning}</span>
              </div>
            )}
            {health.lastCheckAt && (
              <div className="flex justify-between mt-1 pt-1 border-t border-white/5">
                <span className="text-text-muted">{t("lastCheck")}</span>
                <span className="text-text-muted">
                  {new Date(health.lastCheckAt).toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
