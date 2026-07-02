"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef, useCallback } from "react";
import { Card, Badge, EmptyState } from "@/shared/components";
import { FORMAT_META } from "../exampleTemplates";

interface MonitorTabProps {
  // F9 passes callback for empty state CTA.
  onGoToTranslate?: () => void;
}

interface TranslationEvent {
  id?: string;
  timestamp?: string | number;
  provider?: string;
  model?: string;
  sourceFormat?: string;
  targetFormat?: string;
  status?: string;
  statusCode?: number | string;
  latency?: number;
  endpoint?: string;
  isComboRouted?: boolean;
  routeEndpoint?: string;
  routeProvider?: string;
  routeCombo?: string;
  routeConnectionShortId?: string;
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color: "blue" | "green" | "red" | "purple" | "amber" | "cyan";
}

const COLOR_MAP: Record<StatCardProps["color"], { shell: string; icon: string }> = {
  blue: { shell: "bg-blue-500/10", icon: "text-blue-500" },
  green: { shell: "bg-green-500/10", icon: "text-green-500" },
  red: { shell: "bg-red-500/10", icon: "text-red-500" },
  purple: { shell: "bg-purple-500/10", icon: "text-purple-500" },
  amber: { shell: "bg-amber-500/10", icon: "text-amber-500" },
  cyan: { shell: "bg-cyan-500/10", icon: "text-cyan-500" },
};

function StatCard({ icon, label, value, color }: StatCardProps) {
  const resolved = COLOR_MAP[color] ?? COLOR_MAP.blue;

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

/**
 * MonitorTab
 *
 * Refactor of LiveMonitorMode with 100% functional parity + additions:
 * - monitorOriginHint header always visible (explains event origin)
 * - empty state CTA with "Ir para Translate" button (onGoToTranslate)
 * - preserves 3s polling, auto-refresh toggle, 6 stat cards, events table
 * - cleanup useEffect: clearInterval on unmount
 */
export default function MonitorTab({ onGoToTranslate }: MonitorTabProps) {
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

  const [events, setEvents] = useState<TranslationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const notAvailable = t("notAvailableSymbol");
  const formatLatency = (value: number) => t("millisecondsShort", { value });

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/translator/history?limit=50");
      if (res.ok) {
        const data = (await res.json()) as { events?: TranslationEvent[] };
        setEvents(data.events ?? []);
      }
    } catch {
      // ignore fetch errors in polling context — do not leak stack traces
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchHistory();
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        void fetchHistory();
      }, 3000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoRefresh, fetchHistory]);

  // Computed stats
  const successCount = events.filter((e) => e.status === "success").length;
  const errorCount = events.filter((e) => e.status === "error").length;
  const comboCount = events.filter((e) => e.isComboRouted).length;
  const uniqueEndpoints = new Set(events.map((e) => e.routeEndpoint ?? e.endpoint).filter(Boolean))
    .size;
  const avgLatency =
    events.length > 0
      ? Math.round(events.reduce((sum, e) => sum + (e.latency ?? 0), 0) / events.length)
      : 0;

  return (
    <div className="space-y-5 min-w-0">
      {/* Origin hint — always visible (monitorOriginHint) */}
      <div
        className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted"
        data-testid="monitor-origin-hint"
      >
        <span
          className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0"
          aria-hidden="true"
        >
          info
        </span>
        <p>
          {translateOrFallback(
            "monitorOriginHint",
            "Eventos gerados pelo Translate ou pelo pipeline principal aparecem aqui em tempo real."
          )}
        </p>
      </div>

      {/* Stat Cards — 6 cards: total, success, errors, avg latency, combo-routed, unique endpoints */}
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

      {/* Memory note */}
      <div className="flex items-center gap-2 rounded-lg border border-amber-500/10 bg-amber-500/5 px-3 py-2 text-xs text-amber-600 dark:text-amber-400">
        <span className="material-symbols-outlined text-[14px]">memory</span>
        <p>
          {t("liveMonitorMemoryNote")}{" "}
          <span className="text-text-muted">{t("liveMonitorMemoryCapNote")}</span>
        </p>
      </div>

      {/* Auto-refresh controls */}
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
              type="button"
              onClick={() => setAutoRefresh((prev) => !prev)}
              className="text-sm text-text-main hover:text-primary transition-colors"
              aria-label={
                autoRefresh
                  ? translateOrFallback("pauseAutoRefresh", "Pause auto-refresh")
                  : translateOrFallback("resumeAutoRefresh", "Resume auto-refresh")
              }
              data-testid="auto-refresh-toggle"
            >
              {autoRefresh
                ? translateOrFallback("liveAutoRefreshing", "Atualizando ao vivo")
                : translateOrFallback("paused", "Pausado")}
            </button>
          </div>
          <div className="flex items-center gap-2">
            {/* Live/Paused badge */}
            <Badge variant={autoRefresh ? "success" : "default"} size="sm" dot>
              {autoRefresh
                ? translateOrFallback("live", "Live")
                : translateOrFallback("paused", "Paused")}
            </Badge>
            <button
              type="button"
              onClick={() => void fetchHistory()}
              className="flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors"
              aria-label={tc("refresh")}
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                refresh
              </span>
              {tc("refresh")}
            </button>
          </div>
        </div>
      </Card>

      {/* Events table */}
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
            /* Empty state with CTA (new in MonitorTab) */
            <div data-testid="monitor-empty-state">
              <EmptyState
                icon="📊"
                title={translateOrFallback("noTranslations", "No translations yet")}
                description={translateOrFallback(
                  "monitorEmptyCta",
                  "Go back to the Translate tab and send a request. It will appear here."
                )}
                actionLabel={translateOrFallback("monitorOpenTranslateButton", "Go to Translate")}
                onAction={onGoToTranslate ?? null}
              />
            </div>
          ) : (
            <div className="overflow-x-auto" data-testid="monitor-events-table">
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
                    const srcMeta = FORMAT_META[event.sourceFormat as keyof typeof FORMAT_META] ?? {
                      label: event.sourceFormat ?? "?",
                      color: "gray",
                    };
                    const tgtMeta = FORMAT_META[event.targetFormat as keyof typeof FORMAT_META] ?? {
                      label: event.targetFormat ?? "?",
                      color: "gray",
                    };

                    return (
                      <tr
                        key={event.id ?? i}
                        className="border-b border-border/50 hover:bg-bg-subtle/50 transition-colors"
                        data-testid="monitor-event-row"
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
                                {event.routeProvider ?? event.provider ?? notAvailable}
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
                                {event.routeEndpoint ?? event.endpoint ?? notAvailable}
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
                          {event.model ?? notAvailable}
                        </td>
                        <td className="py-2 pr-4">
                          {event.status === "success" ? (
                            <Badge variant="success" size="sm" dot>
                              {t("ok")}
                            </Badge>
                          ) : (
                            <Badge variant="error" size="sm" dot>
                              {event.statusCode ?? t("errorShort")}
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
