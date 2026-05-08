"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const translateOrFallback = useCallback(
    (key: string, fallback: string, values?: Record<string, unknown>) => {
      try {
        const translated = t(key, values);
        return translated === key || translated === `translator.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t]
  );
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const intervalRef = useRef(null);
  const notAvailable = t("notAvailableSymbol");
  const formatLatency = (value) => t("millisecondsShort", { value });

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
  const comboCount = events.filter((e) => e.isComboRouted).length;
  const uniqueEndpoints = new Set(events.map((e) => e.routeEndpoint || e.endpoint).filter(Boolean))
    .size;
  const avgLatency =
    events.length > 0
      ? Math.round(events.reduce((sum, e) => sum + (e.latency || 0), 0) / events.length)
      : 0;

  return (
    <div className="space-y-5 min-w-0">
      {/* Info Banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted">
        <span
          className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0"
          aria-hidden="true"
        >
          info
        </span>
        <div>
          <p className="font-medium text-text-main mb-0.5">{t("realtime")}</p>
          <p>
            {t("liveMonitorDescriptionPrefix")}{" "}
            <strong className="text-text-main">{t("chatTester")}</strong>,{" "}
            <strong className="text-text-main">{t("testBench")}</strong>
            {t("liveMonitorDescriptionSuffix")}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard
          icon="translate"
          label={t("totalTranslations")}
          value={events.length}
          color="blue"
        />
        <StatCard icon="check_circle" label={t("successful")} value={successCount} color="green" />
        <StatCard icon="error" label={t("errors")} value={errorCount} color="red" />
        <StatCard
          icon="speed"
          label={t("avgLatency")}
          value={formatLatency(avgLatency)}
          color="purple"
        />
        <StatCard
          icon="hub"
          label={translateOrFallback("comboRouted", "Combo-routed")}
          value={comboCount}
          color="amber"
        />
        <StatCard
          icon="lan"
          label={translateOrFallback("uniqueEndpoints", "Unique endpoints")}
          value={uniqueEndpoints}
          color="cyan"
        />
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-amber-500/10 bg-amber-500/5 px-3 py-2 text-xs text-amber-600 dark:text-amber-400">
        <span className="material-symbols-outlined text-[14px]">memory</span>
        <p>
          {t("liveMonitorMemoryNote")}{" "}
          <span className="text-text-muted">{t("liveMonitorMemoryCapNote")}</span>
        </p>
      </div>

      {/* Controls */}
      <Card>
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-[18px] ${autoRefresh ? "text-green-500 animate-pulse" : "text-text-muted"}`}
              aria-hidden="true"
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
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              refresh
            </span>
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
              <span className="material-symbols-outlined animate-spin mr-2" aria-hidden="true">
                progress_activity
              </span>
              {tc("loading")}
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
              <span
                className="material-symbols-outlined text-[48px] mb-3 opacity-30"
                aria-hidden="true"
              >
                monitoring
              </span>
              <p className="text-sm font-medium mb-1">{t("noTranslations")}</p>
              <p className="text-xs text-center max-w-sm">{t("eventsAppearHint")}</p>
              <div className="mt-3 rounded-lg border border-border/40 bg-bg-subtle/50 px-4 py-3 text-left">
                <p className="text-[10px] font-semibold text-text-muted">
                  {t("eventSourcesLabel")}
                </p>
                <ul className="mt-1 space-y-1 text-[10px] text-text-muted">
                  <li>{t("eventSourceTranslatorPage")}</li>
                  <li>{t("eventSourceMainPipeline")}</li>
                </ul>
              </div>
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
                    <th className="pb-2 pr-4">{translateOrFallback("routeDetails", "Route")}</th>
                    <th className="pb-2 pr-4">{t("source")}</th>
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
                          {event.timestamp
                            ? new Date(event.timestamp).toLocaleTimeString()
                            : notAvailable}
                        </td>
                        <td className="py-2 pr-4 min-w-[220px]">
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <Badge variant="default" size="sm">
                                {event.routeProvider || event.provider || notAvailable}
                              </Badge>
                              {event.routeCombo ? (
                                <Badge variant="primary" size="sm">
                                  {translateOrFallback("comboBadge", "Combo")}: {event.routeCombo}
                                </Badge>
                              ) : null}
                            </div>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-muted">
                              <span>
                                {translateOrFallback("routeEndpointLabel", "Endpoint")}:{" "}
                                {event.routeEndpoint || event.endpoint || notAvailable}
                              </span>
                              {event.routeConnectionShortId ? (
                                <span>
                                  {translateOrFallback("routeConnectionLabel", "Conn")}:{" "}
                                  <span className="font-mono">{event.routeConnectionShortId}</span>
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td className="py-2 pr-4">
                          <Badge variant="default" size="sm">
                            {srcMeta.label}
                          </Badge>
                        </td>
                        <td className="py-2 pr-4">
                          <Badge variant="primary" size="sm">
                            {tgtMeta.label}
                          </Badge>
                        </td>
                        <td className="py-2 pr-4 text-xs font-mono text-text-muted break-all">
                          {event.model || notAvailable}
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
                          {event.latency ? formatLatency(event.latency) : notAvailable}
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
  const colorMap = {
    blue: { shell: "bg-blue-500/10", icon: "text-blue-500" },
    green: { shell: "bg-green-500/10", icon: "text-green-500" },
    red: { shell: "bg-red-500/10", icon: "text-red-500" },
    purple: { shell: "bg-purple-500/10", icon: "text-purple-500" },
    amber: { shell: "bg-amber-500/10", icon: "text-amber-500" },
    cyan: { shell: "bg-cyan-500/10", icon: "text-cyan-500" },
  };
  const resolved = colorMap[color as keyof typeof colorMap] || colorMap.blue;

  return (
    <Card>
      <div className="p-4 flex items-center gap-3">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${resolved.shell}`}>
          <span
            className={`material-symbols-outlined text-[22px] ${resolved.icon}`}
            aria-hidden="true"
          >
            {icon}
          </span>
        </div>
        <div>
          <p className="text-lg font-bold text-text-main">{value}</p>
          <p className="text-[10px] text-text-muted uppercase tracking-wider">{label}</p>
        </div>
      </div>
    </Card>
  );
}
