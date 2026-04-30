"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";

type TelemetryPayload = {
  count?: number;
  totalRequests?: number;
  avg?: number;
  avgLatencyMs?: number;
  p50?: number;
  p95?: number;
  p99?: number;
  uptime?: number;
  errorRate?: number;
  activeConnections?: number;
  memoryUsage?: {
    rss?: number;
    heapUsed?: number;
    heapTotal?: number;
  };
  sessions?: {
    activeCount?: number;
  };
  quotaMonitor?: {
    errors?: number;
  };
};

type HealthPayload = {
  system?: {
    uptime?: number;
    memoryUsage?: {
      rss?: number;
      heapUsed?: number;
      heapTotal?: number;
    };
  };
  activeConnections?: number;
};

type TelemetrySample = {
  timestamp: number;
  latencyMs: number;
  throughput: number;
  memoryBytes: number;
};

const REFRESH_MS = 30_000;
const MAX_SAMPLES = 24;

function formatDuration(seconds = 0) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function formatBytes(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function formatMs(value?: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return `${Math.round(value)}ms`;
}

function Sparkline({
  samples,
  field,
}: {
  samples: TelemetrySample[];
  field: keyof TelemetrySample;
}) {
  const values = samples
    .map((sample) => Number(sample[field]))
    .filter((value) => Number.isFinite(value));

  if (values.length < 2) {
    return <div className="h-10 rounded-lg bg-sidebar/50" />;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(1, values.length - 1)) * 100;
      const y = 36 - ((value - min) / range) * 32;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 40" role="img" aria-hidden="true" className="h-10 w-full">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        points={points}
        className="text-primary"
      />
    </svg>
  );
}

function getIndicatorTone(value: number, warning: number, critical: number, inverse = false) {
  const healthy = inverse ? value >= warning : value <= warning;
  const criticalHit = inverse ? value < critical : value >= critical;
  if (criticalHit) return "bg-red-500/10 text-red-500";
  if (!healthy) return "bg-amber-500/10 text-amber-500";
  return "bg-emerald-500/10 text-emerald-500";
}

export default function TelemetryCard() {
  const t = useTranslations("telemetry");
  const [telemetry, setTelemetry] = useState<TelemetryPayload | null>(null);
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [samples, setSamples] = useState<TelemetrySample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadTelemetry = useCallback(async () => {
    try {
      const [telemetryResult, healthResult] = await Promise.allSettled([
        fetch("/api/telemetry/summary").then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json() as Promise<TelemetryPayload>;
        }),
        fetch("/api/monitoring/health").then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json() as Promise<HealthPayload>;
        }),
      ]);

      if (telemetryResult.status === "rejected" && healthResult.status === "rejected") {
        throw telemetryResult.reason;
      }

      const nextTelemetry = telemetryResult.status === "fulfilled" ? telemetryResult.value : null;
      const nextHealth = healthResult.status === "fulfilled" ? healthResult.value : null;
      if (nextTelemetry) setTelemetry(nextTelemetry);
      if (nextHealth) setHealth(nextHealth);
      setError(null);
      setLastUpdated(new Date());

      const memoryBytes =
        nextTelemetry?.memoryUsage?.rss || nextHealth?.system?.memoryUsage?.rss || 0;
      const latencyMs =
        nextTelemetry?.avgLatencyMs ?? nextTelemetry?.avg ?? nextTelemetry?.p50 ?? 0;
      const throughput = nextTelemetry?.totalRequests ?? nextTelemetry?.count ?? 0;

      setSamples((prev) => [
        ...prev.slice(Math.max(0, prev.length - MAX_SAMPLES + 1)),
        {
          timestamp: Date.now(),
          latencyMs,
          throughput,
          memoryBytes,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("loadFailed"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadTelemetry();
    const interval = setInterval(() => void loadTelemetry(), REFRESH_MS);
    return () => clearInterval(interval);
  }, [loadTelemetry]);

  const values = useMemo(() => {
    const totalRequests = telemetry?.totalRequests ?? telemetry?.count ?? 0;
    const avgLatency = telemetry?.avgLatencyMs ?? telemetry?.avg ?? telemetry?.p50;
    const p95Latency = telemetry?.p95 ?? avgLatency ?? 0;
    const quotaErrors = telemetry?.quotaMonitor?.errors ?? 0;
    const errorRate =
      typeof telemetry?.errorRate === "number"
        ? telemetry.errorRate
        : totalRequests > 0
          ? (quotaErrors / Math.max(totalRequests, 1)) * 100
          : 0;

    return {
      uptime: telemetry?.uptime ?? health?.system?.uptime ?? 0,
      totalRequests,
      avgLatency,
      p95Latency,
      errorRate,
      activeConnections:
        telemetry?.activeConnections ??
        telemetry?.sessions?.activeCount ??
        health?.activeConnections ??
        0,
      memoryUsage: telemetry?.memoryUsage ?? health?.system?.memoryUsage ?? {},
    };
  }, [health, telemetry]);

  const metricCards = [
    {
      label: t("uptime"),
      value: formatDuration(values.uptime),
      icon: "timer",
      tone: "bg-blue-500/10 text-blue-500",
    },
    {
      label: t("totalRequests"),
      value: values.totalRequests.toLocaleString(),
      icon: "receipt_long",
      tone: "bg-primary/10 text-primary",
    },
    {
      label: t("avgLatency"),
      value: formatMs(values.avgLatency),
      icon: "speed",
      tone: getIndicatorTone(values.p95Latency, 2_000, 10_000),
    },
    {
      label: t("errorRate"),
      value: `${values.errorRate.toFixed(2)}%`,
      icon: "error",
      tone: getIndicatorTone(values.errorRate, 1, 5),
    },
    {
      label: t("activeConnections"),
      value: values.activeConnections.toLocaleString(),
      icon: "hub",
      tone: "bg-cyan-500/10 text-cyan-500",
    },
    {
      label: t("memoryUsage"),
      value: formatBytes(values.memoryUsage.rss ?? values.memoryUsage.heapUsed ?? 0),
      icon: "memory",
      tone: "bg-violet-500/10 text-violet-500",
    },
  ];

  return (
    <Card className="p-5">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-text-main">
            <span className="material-symbols-outlined text-[20px] text-primary">monitoring</span>
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-text-muted">{t("description")}</p>
          {lastUpdated && (
            <p className="mt-2 text-xs text-text-muted">
              {t("updatedAt", { time: lastUpdated.toLocaleTimeString() })}
            </p>
          )}
        </div>
        <button
          onClick={() => void loadTelemetry()}
          disabled={loading}
          title={t("refresh")}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
        >
          <span
            className={`material-symbols-outlined text-[16px] ${loading ? "animate-spin" : ""}`}
          >
            refresh
          </span>
          {t("refresh")}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-600">
          {t("partialData", { error })}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {metricCards.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-border bg-surface/50 p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  {metric.label}
                </p>
                <p className="mt-1 text-xl font-semibold text-text-main">{metric.value}</p>
              </div>
              <span
                className={`material-symbols-outlined rounded-lg p-2 text-[20px] ${metric.tone}`}
              >
                {metric.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface/40 p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
            <span>{t("latencyTrend")}</span>
            <span>{formatMs(values.p95Latency)} p95</span>
          </div>
          <Sparkline samples={samples} field="latencyMs" />
        </div>
        <div className="rounded-xl border border-border bg-surface/40 p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
            <span>{t("throughputTrend")}</span>
            <span>{values.totalRequests.toLocaleString()}</span>
          </div>
          <Sparkline samples={samples} field="throughput" />
        </div>
        <div className="rounded-xl border border-border bg-surface/40 p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
            <span>{t("memoryTrend")}</span>
            <span>{formatBytes(values.memoryUsage.heapUsed ?? 0)}</span>
          </div>
          <Sparkline samples={samples} field="memoryBytes" />
        </div>
      </div>
    </Card>
  );
}
