"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useRef } from "react";
import { Card, Badge } from "@/shared/components";
import { FORMAT_META } from "../exampleTemplates";

/**
 * Live Monitor Mode:
 * Shows recent translation activity from the proxy in real-time.
 * Polls /api/translator/history for translation events.
 */
export default function LiveMonitorMode() {
  const t = useTranslations("translator");
  const tc = useTranslations("common");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const intervalRef = useRef(null);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/translator/history?limit=50");
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    if (autoRefresh) {
      intervalRef.current = setInterval(fetchHistory, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh]);

  // Stats
  const successCount = events.filter((e) => e.status === "success").length;
  const errorCount = events.filter((e) => e.status === "error").length;
  const avgLatency =
    events.length > 0
      ? Math.round(events.reduce((sum, e) => sum + (e.latency || 0), 0) / events.length)
      : 0;

  return (
    <div className="space-y-5">
      {/* Info Banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted">
        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
          info
        </span>
        <div>
          <p className="font-medium text-text-main mb-0.5">{t("realtime")}</p>
          <p>
            {t("liveMonitorDescription")}{" "}
            <strong className="text-text-main">{t("chatTester")}</strong>,{" "}
            <strong className="text-text-main">{t("testBench")}</strong>, {t("or")}{" "}
            {t("externalApiCalls").toLowerCase()} {t("toGenerateEvents")}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon="translate"
          label={t("totalTranslations")}
          value={events.length}
          color="blue"
        />
        <StatCard icon="check_circle" label={t("successful")} value={successCount} color="green" />
        <StatCard icon="error" label={t("errors")} value={errorCount} color="red" />
        <StatCard icon="speed" label={t("avgLatency")} value={`${avgLatency}ms`} color="purple" />
      </div>

      {/* Controls */}
      <Card>
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-[18px] ${autoRefresh ? "text-green-500 animate-pulse" : "text-text-muted"}`}
            >
              {autoRefresh ? "radio_button_checked" : "radio_button_unchecked"}
            </span>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="text-sm text-text-main hover:text-primary transition-colors"
            >
              {autoRefresh ? t("liveAutoRefreshing") : t("paused")}
            </button>
          </div>
          <button
            onClick={fetchHistory}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            {tc("refresh")}
          </button>
        </div>
      </Card>

      {/* Events Table */}
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-text-main mb-3">{t("recentTranslations")}</h3>

          {loading ? (
            <div className="flex items-center justify-center py-12 text-text-muted">
              <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
              {tc("loading")}
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
              <span className="material-symbols-outlined text-[48px] mb-3 opacity-30">
                monitoring
              </span>
              <p className="text-sm font-medium mb-1">{t("noTranslations")}</p>
              <p className="text-xs text-center max-w-sm">
                {t("eventsAppearHint")}
              </p>
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                <span className="px-2 py-1 rounded-md bg-bg-subtle border border-border">
                  {t("chatTesterTab")}
                </span>
                <span className="px-2 py-1 rounded-md bg-bg-subtle border border-border">
                  {t("testBenchTab")}
                </span>
                <span className="px-2 py-1 rounded-md bg-bg-subtle border border-border">
                  {t("externalApiCalls")}
                </span>
                <span className="px-2 py-1 rounded-md bg-bg-subtle border border-border">
                  {t("ideCliIntegrations")}
                </span>
              </div>
              <p className="text-[10px] mt-3 text-text-muted/70">{t("inMemoryNote")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-text-muted border-b border-border">
                    <th className="pb-2 pr-4">{t("time")}</th>
                    <th className="pb-2 pr-4">{t("source")}</th>
                    <th className="pb-2 pr-4"></th>
                    <th className="pb-2 pr-4">{t("target")}</th>
                    <th className="pb-2 pr-4">{t("model")}</th>
                    <th className="pb-2 pr-4">{t("status")}</th>
                    <th className="pb-2 text-right">{t("latency")}</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, i) => {
                    const srcMeta = FORMAT_META[event.sourceFormat] || {
                      label: event.sourceFormat || "?",
                      color: "gray",
                    };
                    const tgtMeta = FORMAT_META[event.targetFormat] || {
                      label: event.targetFormat || "?",
                      color: "gray",
                    };

                    return (
                      <tr
                        key={event.id || i}
                        className="border-b border-border/50 hover:bg-bg-subtle/50 transition-colors"
                      >
                        <td className="py-2 pr-4 text-xs text-text-muted whitespace-nowrap">
                          {event.timestamp ? new Date(event.timestamp).toLocaleTimeString() : "—"}
                        </td>
                        <td className="py-2 pr-4">
                          <Badge variant="default" size="sm">
                            {srcMeta.label}
                          </Badge>
                        </td>
                        <td className="py-2 pr-4 text-text-muted">
                          <span className="material-symbols-outlined text-[14px]">
                            arrow_forward
                          </span>
                        </td>
                        <td className="py-2 pr-4">
                          <Badge variant="primary" size="sm">
                            {tgtMeta.label}
                          </Badge>
                        </td>
                        <td className="py-2 pr-4 text-xs font-mono text-text-muted">
                          {event.model || "—"}
                        </td>
                        <td className="py-2 pr-4">
                          {event.status === "success" ? (
                            <Badge variant="success" size="sm" dot>
                              {t("ok")}
                            </Badge>
                          ) : (
                            <Badge variant="error" size="sm" dot>
                              {event.statusCode || t("errorShort")}
                            </Badge>
                          )}
                        </td>
                        <td className="py-2 text-right text-xs text-text-muted">
                          {event.latency ? `${event.latency}ms` : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <Card>
      <div className="p-4 flex items-center gap-3">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-${color}-500/10`}>
          <span className={`material-symbols-outlined text-[22px] text-${color}-500`}>{icon}</span>
        </div>
        <div>
          <p className="text-lg font-bold text-text-main">{value}</p>
          <p className="text-[10px] text-text-muted uppercase tracking-wider">{label}</p>
        </div>
      </div>
    </Card>
  );
}
