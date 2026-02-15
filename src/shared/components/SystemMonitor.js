"use client";

/**
 * SystemMonitor — Real-time system metrics widget
 *
 * Displays CPU/memory/uptime and token throughput metrics.
 * Fetches from /api/monitoring/health periodically.
 *
 * @module shared/components/SystemMonitor
 */

import { useState, useEffect, useRef } from "react";
import Card from "./Card";

const REFRESH_INTERVAL = 10000; // 10s

function formatUptime(seconds) {
  if (!seconds) return "N/A";
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let val = bytes;
  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }
  return `${val.toFixed(1)} ${units[i]}`;
}

function MetricRow({ icon, label, value, color = "text-text-main" }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2 text-text-muted">
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
          {icon}
        </span>
        <span className="text-sm">{label}</span>
      </div>
      <span className={`text-sm font-mono font-medium ${color}`}>{value}</span>
    </div>
  );
}

export default function SystemMonitor({ compact = false }) {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    async function poll() {
      try {
        const res = await fetch("/api/monitoring/health");
        if (!mountedRef.current) return;
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!mountedRef.current) return;
        setMetrics(data);
        setError(false);
      } catch {
        if (mountedRef.current) setError(true);
      }
    }

    poll();
    const interval = setInterval(poll, REFRESH_INTERVAL);
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  if (error && !metrics) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <span className="material-symbols-outlined text-[18px] text-red-400">error</span>
          <span>Unable to load system metrics</span>
        </div>
      </Card>
    );
  }

  if (!metrics) {
    return (
      <Card className="p-4 animate-pulse">
        <div className="h-24 bg-surface rounded-lg" />
      </Card>
    );
  }

  const memUsed = metrics.memory?.heapUsed || metrics.memoryUsage?.heapUsed || 0;
  const memTotal = metrics.memory?.heapTotal || metrics.memoryUsage?.heapTotal || 1;
  const memPercent = Math.round((memUsed / memTotal) * 100);
  const memColor =
    memPercent > 80 ? "text-red-400" : memPercent > 60 ? "text-amber-400" : "text-green-400";

  if (compact) {
    return (
      <div
        className="flex items-center gap-4 text-xs text-text-muted"
        role="status"
        aria-label="System metrics"
      >
        <span title={`Memory: ${memPercent}%`}>
          <span className={`font-mono font-medium ${memColor}`}>{memPercent}%</span> mem
        </span>
        <span title={`Uptime: ${formatUptime(metrics.uptime)}`}>
          ⏱ {formatUptime(metrics.uptime)}
        </span>
      </div>
    );
  }

  return (
    <Card className="p-4" role="region" aria-label="System monitoring">
      <h3 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden="true">
          monitoring
        </span>
        System Monitor
      </h3>

      <div className="space-y-0.5">
        <MetricRow icon="timer" label="Uptime" value={formatUptime(metrics.uptime)} />
        <MetricRow
          icon="memory"
          label="Memory"
          value={`${formatBytes(memUsed)} / ${formatBytes(memTotal)} (${memPercent}%)`}
          color={memColor}
        />
        {metrics.version && (
          <MetricRow icon="info" label="Version" value={metrics.version} color="text-primary" />
        )}
        {metrics.activeConnections !== undefined && (
          <MetricRow icon="lan" label="Connections" value={String(metrics.activeConnections)} />
        )}
        {metrics.circuitBreakers && (
          <MetricRow
            icon="health_and_safety"
            label="Circuit Breakers"
            value={`${metrics.circuitBreakers.open || 0} open`}
            color={metrics.circuitBreakers.open > 0 ? "text-amber-400" : "text-green-400"}
          />
        )}
      </div>

      {/* Memory bar */}
      <div className="mt-3">
        <div className="h-1.5 bg-surface rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              memPercent > 80 ? "bg-red-400" : memPercent > 60 ? "bg-amber-400" : "bg-green-400"
            }`}
            style={{ width: `${memPercent}%` }}
            role="progressbar"
            aria-valuenow={memPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Memory usage: ${memPercent}%`}
          />
        </div>
      </div>
    </Card>
  );
}
