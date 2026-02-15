"use client";

/**
 * Health Dashboard — Phase 8.3
 *
 * System health overview with cards for:
 * - System status (uptime, version, memory)
 * - Provider health (circuit breaker states)
 * - Rate limit status
 * - Active lockouts
 */

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components";

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const CB_COLORS = {
  CLOSED: { bg: "bg-green-500/10", text: "text-green-500", label: "Healthy" },
  OPEN: { bg: "bg-red-500/10", text: "text-red-500", label: "Open" },
  HALF_OPEN: { bg: "bg-amber-500/10", text: "text-amber-500", label: "Half-Open" },
};

export default function HealthPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  const fetchHealth = useCallback(async () => {
    try {
      const res = await fetch("/api/monitoring/health");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, [fetchHealth]);

  if (!data && !error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="text-text-muted mt-4">Loading health data...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <span className="material-symbols-outlined text-red-500 text-[32px] mb-2">error</span>
          <p className="text-red-400">Failed to load health data: {error}</p>
          <button
            onClick={fetchHealth}
            className="mt-4 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { system, providerHealth, rateLimitStatus, lockouts } = data;
  const cbEntries = Object.entries(providerHealth || {});
  const lockoutEntries = Object.entries(lockouts || {});

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">System Health</h1>
          <p className="text-sm text-text-muted mt-1">
            Real-time monitoring of your OmniRoute instance
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastRefresh && (
            <span className="text-xs text-text-muted">
              Updated {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchHealth}
            className="p-2 rounded-lg bg-surface hover:bg-surface/80 text-text-muted hover:text-text-main transition-colors"
            title="Refresh"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
          </button>
        </div>
      </div>

      {/* Status Banner */}
      <div
        className={`rounded-xl p-4 flex items-center gap-3 ${
          data.status === "healthy"
            ? "bg-green-500/10 border border-green-500/20"
            : "bg-red-500/10 border border-red-500/20"
        }`}
      >
        <span
          className={`material-symbols-outlined text-[24px] ${
            data.status === "healthy" ? "text-green-500" : "text-red-500"
          }`}
        >
          {data.status === "healthy" ? "check_circle" : "error"}
        </span>
        <span className={data.status === "healthy" ? "text-green-400" : "text-red-400"}>
          {data.status === "healthy" ? "All systems operational" : "System issues detected"}
        </span>
      </div>

      {/* System Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[18px]">timer</span>
            </div>
            <span className="text-sm text-text-muted">Uptime</span>
          </div>
          <p className="text-xl font-semibold text-text-main">{formatUptime(system.uptime)}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-blue-500/10 text-blue-500">
              <span className="material-symbols-outlined text-[18px]">info</span>
            </div>
            <span className="text-sm text-text-muted">Version</span>
          </div>
          <p className="text-xl font-semibold text-text-main">v{system.version}</p>
          <p className="text-xs text-text-muted mt-1">Node {system.nodeVersion}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-purple-500/10 text-purple-500">
              <span className="material-symbols-outlined text-[18px]">memory</span>
            </div>
            <span className="text-sm text-text-muted">Memory (RSS)</span>
          </div>
          <p className="text-xl font-semibold text-text-main">
            {formatBytes(system.memoryUsage?.rss || 0)}
          </p>
          <p className="text-xs text-text-muted mt-1">
            Heap: {formatBytes(system.memoryUsage?.heapUsed || 0)} /{" "}
            {formatBytes(system.memoryUsage?.heapTotal || 0)}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-amber-500/10 text-amber-500">
              <span className="material-symbols-outlined text-[18px]">dns</span>
            </div>
            <span className="text-sm text-text-muted">Providers</span>
          </div>
          <p className="text-xl font-semibold text-text-main">{cbEntries.length}</p>
          <p className="text-xs text-text-muted mt-1">
            {cbEntries.filter(([, v]) => v.state === "CLOSED").length} healthy
          </p>
        </Card>
      </div>

      {/* Provider Health */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-text-main mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary">
            health_and_safety
          </span>
          Provider Health
        </h2>
        {cbEntries.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-4">
            No circuit breaker data available. Make some requests first.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cbEntries.map(([provider, cb]) => {
              const style = CB_COLORS[cb.state] || CB_COLORS.CLOSED;
              return (
                <div key={provider} className={`rounded-lg p-3 ${style.bg} border border-white/5`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text-main">{provider}</span>
                    <span className={`text-xs font-semibold ${style.text}`}>{style.label}</span>
                  </div>
                  <div className="text-xs text-text-muted">
                    Failures: {cb.failures || 0}
                    {cb.lastFailure && (
                      <span className="ml-2">
                        Last: {new Date(cb.lastFailure).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Rate Limit Status */}
      {rateLimitStatus && Object.keys(rateLimitStatus).length > 0 && (
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-text-main mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-amber-500">speed</span>
            Rate Limit Status
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-text-muted text-left border-b border-white/5">
                  <th className="pb-2 font-medium">Provider</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Requests</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(rateLimitStatus).map(([provider, status]) => (
                  <tr key={provider} className="border-b border-white/5 last:border-0">
                    <td className="py-2 text-text-main">{provider}</td>
                    <td className="py-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          status.limited
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {status.limited ? "Limited" : "OK"}
                      </span>
                    </td>
                    <td className="py-2 text-text-muted">
                      {status.requestsInWindow || 0} / {status.limit || "∞"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Active Lockouts */}
      {lockoutEntries.length > 0 && (
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-text-main mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-red-500">lock</span>
            Active Lockouts
          </h2>
          <div className="space-y-2">
            {lockoutEntries.map(([key, lockout]) => (
              <div
                key={key}
                className="rounded-lg p-3 bg-red-500/5 border border-red-500/10 flex items-center justify-between"
              >
                <div>
                  <span className="text-sm font-medium text-text-main">{key}</span>
                  {lockout.reason && (
                    <span className="text-xs text-text-muted ml-2">({lockout.reason})</span>
                  )}
                </div>
                {lockout.until && (
                  <span className="text-xs text-red-400">
                    Until {new Date(lockout.until).toLocaleTimeString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
