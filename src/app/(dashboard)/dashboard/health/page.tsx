"use client";

/**
 * Health Dashboard — Phase 8.3
 *
 * System health overview with cards for:
 * - System status (uptime, version, memory)
 * - Provider health (circuit breaker states)
 * - Rate limit status
 * - Active lockouts
 * - Signature cache stats
 * - Latency telemetry & prompt cache
 */

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components";
import { AI_PROVIDERS } from "@/shared/constants/providers";

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
  const [telemetry, setTelemetry] = useState(null);
  const [cache, setCache] = useState(null);
  const [signatureCache, setSignatureCache] = useState(null);

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

  // Fetch telemetry, cache, and signature cache stats
  const fetchExtras = useCallback(async () => {
    const results = await Promise.allSettled([
      fetch("/api/telemetry/summary").then((r) => r.json()),
      fetch("/api/cache/stats").then((r) => r.json()),
      fetch("/api/rate-limits").then((r) => r.json()),
    ]);
    if (results[0].status === "fulfilled") setTelemetry(results[0].value);
    if (results[1].status === "fulfilled") setCache(results[1].value);
    if (results[2].status === "fulfilled" && results[2].value.cacheStats) {
      setSignatureCache(results[2].value.cacheStats);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    fetchExtras();
    const interval = setInterval(() => {
      fetchHealth();
      fetchExtras();
    }, 15000);
    return () => clearInterval(interval);
  }, [fetchHealth, fetchExtras]);

  const fmtMs = (ms) => (ms != null ? `${Math.round(ms)}ms` : "—");

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
            onClick={() => {
              fetchHealth();
              fetchExtras();
            }}
            className="p-2 rounded-lg bg-surface hover:bg-surface/80 text-text-muted hover:text-text-main transition-colors"
            title="Refresh"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
          </button>
        </div>
      </div>

      {/* Status Banner */}
      <div
        role="status"
        aria-live="polite"
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
            {cbEntries.filter(([, v]: [string, any]) => v.state === "CLOSED").length} healthy
          </p>
        </Card>
      </div>

      {/* Telemetry Cards — Latency & Prompt Cache */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Latency Card */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">speed</span>
            Latency
          </h3>
          {telemetry ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">p50</span>
                <span className="font-mono">{fmtMs(telemetry.p50)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">p95</span>
                <span className="font-mono">{fmtMs(telemetry.p95)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">p99</span>
                <span className="font-mono">{fmtMs(telemetry.p99)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="text-text-muted">Total requests</span>
                <span className="font-mono">{telemetry.totalRequests ?? 0}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-muted">No data yet</p>
          )}
        </Card>

        {/* Prompt Cache Card */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">cached</span>
            Prompt Cache
          </h3>
          {cache ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Entries</span>
                <span className="font-mono">
                  {cache.size}/{cache.maxSize}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Hit Rate</span>
                <span className="font-mono">{cache.hitRate?.toFixed(1) ?? 0}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Hits / Misses</span>
                <span className="font-mono">
                  {cache.hits ?? 0} / {cache.misses ?? 0}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-muted">No data yet</p>
          )}
        </Card>

        {/* Signature Cache Card */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">database</span>
            Signature Cache
          </h3>
          {signatureCache ? (
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Defaults", value: signatureCache.defaultCount, color: "text-text-muted" },
                {
                  label: "Tool",
                  value: `${signatureCache.tool.entries}/${signatureCache.tool.patterns}`,
                  color: "text-blue-400",
                },
                {
                  label: "Family",
                  value: `${signatureCache.family.entries}/${signatureCache.family.patterns}`,
                  color: "text-purple-400",
                },
                {
                  label: "Session",
                  value: `${signatureCache.session.entries}/${signatureCache.session.patterns}`,
                  color: "text-cyan-400",
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="text-center p-2 rounded-lg bg-surface/30 border border-border/30"
                >
                  <p className={`text-lg font-bold tabular-nums ${color}`}>{value}</p>
                  <p className="text-xs text-text-muted mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted">No data yet</p>
          )}
        </Card>
      </div>

      {/* Provider Health */}
      <Card className="p-5" role="region" aria-label="Provider health status">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">
              health_and_safety
            </span>
            Provider Health
          </h2>
          {cbEntries.length > 0 && (
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-green-500" /> Healthy
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-amber-500" /> Recovering
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-red-500" /> Down
              </span>
            </div>
          )}
        </div>
        {cbEntries.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-4">
            No circuit breaker data available. Make some requests first.
          </p>
        ) : (
          (() => {
            const unhealthy = cbEntries.filter(([, cb]: [string, any]) => cb.state !== "CLOSED");
            const healthy = cbEntries.filter(([, cb]: [string, any]) => cb.state === "CLOSED");
            return (
              <div className="space-y-4">
                {/* Unhealthy providers first */}
                {unhealthy.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-red-400 uppercase tracking-wide">
                      Issues Detected
                    </p>
                    {unhealthy.map(([provider, cb]: [string, any]) => {
                      const style = CB_COLORS[cb.state] || CB_COLORS.OPEN;
                      const providerInfo = AI_PROVIDERS[provider];
                      const displayName = providerInfo?.name || provider;
                      return (
                        <div
                          key={provider}
                          className={`rounded-lg p-3 ${style.bg} border border-white/5 flex items-center gap-3`}
                        >
                          <div
                            className="size-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
                            style={{
                              backgroundColor: `${providerInfo?.color || "#888"}15`,
                              color: providerInfo?.color || "#888",
                            }}
                          >
                            {providerInfo?.textIcon || provider.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-text-main truncate">
                                {displayName}
                              </span>
                              <span
                                className={`text-xs font-semibold px-1.5 py-0.5 rounded ${style.bg} ${style.text}`}
                              >
                                {style.label}
                              </span>
                            </div>
                            <div className="text-xs text-text-muted mt-0.5">
                              {cb.failures} failure{cb.failures !== 1 ? "s" : ""}
                              {cb.lastFailure && (
                                <span className="ml-2">
                                  · Last: {new Date(cb.lastFailure).toLocaleTimeString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Healthy providers in compact grid */}
                {healthy.length > 0 && (
                  <div>
                    {unhealthy.length > 0 && (
                      <p className="text-xs font-medium text-green-400 uppercase tracking-wide mb-2">
                        Operational
                      </p>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                      {healthy.map(([provider]) => {
                        const providerInfo = AI_PROVIDERS[provider];
                        const displayName = providerInfo?.name || provider;
                        return (
                          <div
                            key={provider}
                            className="rounded-lg p-2.5 bg-green-500/5 border border-white/5 flex items-center gap-2"
                          >
                            <span className="size-2 rounded-full bg-green-500 shrink-0" />
                            <span
                              className="text-xs font-medium text-text-main truncate"
                              title={displayName}
                            >
                              {displayName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })()
        )}
      </Card>

      {/* Rate Limit Status */}
      {rateLimitStatus &&
        Object.keys(rateLimitStatus).length > 0 &&
        (() => {
          // Parse rate limit keys ("provider:connectionId" or "provider:connectionId:model")
          const parseKey = (key) => {
            const parts = key.split(":");
            const providerId = parts[0];
            const connectionId = parts[1] || "";
            const model = parts.slice(2).join(":") || null;

            // Resolve friendly name
            let displayName;
            let providerInfo = AI_PROVIDERS[providerId];

            if (providerId.startsWith("openai-compatible-")) {
              const customName = providerId.replace("openai-compatible-", "");
              displayName = `OpenAI Compatible`;
              providerInfo = { color: "#10A37F", textIcon: "OC" };
              if (customName.length > 12) displayName += ` (${customName.slice(0, 8)}…)`;
              else if (customName) displayName += ` (${customName})`;
            } else if (providerId.startsWith("anthropic-compatible-")) {
              const customName = providerId.replace("anthropic-compatible-", "");
              displayName = `Anthropic Compatible`;
              providerInfo = { color: "#D97757", textIcon: "AC" };
              if (customName.length > 12) displayName += ` (${customName.slice(0, 8)}…)`;
              else if (customName) displayName += ` (${customName})`;
            } else {
              displayName = providerInfo?.name || providerId;
            }

            return { providerId, displayName, providerInfo, connectionId, model };
          };

          // Group entries by provider for a cleaner display
          const entries = Object.entries(rateLimitStatus).map(([key, status]: [string, any]) => ({
            key,
            ...parseKey(key),
            status,
          }));

          // Sort: active (queued/running > 0) first, then alphabetically
          entries.sort((a, b) => {
            const aActive = (a.status.queued || 0) + (a.status.running || 0);
            const bActive = (b.status.queued || 0) + (b.status.running || 0);
            if (aActive !== bActive) return bActive - aActive;
            return a.displayName.localeCompare(b.displayName);
          });

          return (
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-main flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-amber-500">
                    speed
                  </span>
                  Rate Limit Status
                </h2>
                <span className="text-xs text-text-muted">
                  {entries.length} active limiter{entries.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {entries.map(({ key, displayName, providerInfo, connectionId, model, status }: any) => {
                  const isActive = (status.queued || 0) + (status.running || 0) > 0;
                  const isQueued = (status.queued || 0) > 0;
                  return (
                    <div
                      key={key}
                      className={`rounded-lg p-3 border transition-colors ${
                        isQueued
                          ? "bg-amber-500/5 border-amber-500/20"
                          : isActive
                            ? "bg-blue-500/5 border-blue-500/15"
                            : "bg-surface/30 border-white/5"
                      }`}
                      title={key}
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className="size-7 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold"
                          style={{
                            backgroundColor: `${providerInfo?.color || "#888"}15`,
                            color: providerInfo?.color || "#888",
                          }}
                        >
                          {providerInfo?.textIcon || displayName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-main truncate">
                            {displayName}
                          </p>
                          {connectionId && (
                            <p className="text-[10px] text-text-muted font-mono truncate">
                              {connectionId.length > 12
                                ? connectionId.slice(0, 8) + "…"
                                : connectionId}
                              {model && <span className="ml-1 text-text-muted/60">· {model}</span>}
                            </p>
                          )}
                        </div>
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            isQueued
                              ? "bg-amber-500/15 text-amber-400"
                              : isActive
                                ? "bg-blue-500/15 text-blue-400"
                                : "bg-green-500/10 text-green-400"
                          }`}
                        >
                          {isQueued ? "Queued" : isActive ? "Active" : "OK"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-text-muted">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          {status.queued || 0} queued
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">play_arrow</span>
                          {status.running || 0} running
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })()}

      {/* Active Lockouts */}
      {lockoutEntries.length > 0 && (
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-text-main mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-red-500">lock</span>
            Active Lockouts
          </h2>
          <div className="space-y-2">
            {lockoutEntries.map(([key, lockout]: [string, any]) => (
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
