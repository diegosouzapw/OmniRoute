"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Button, EmptyState } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

interface CacheStats {
  semanticCache: {
    memoryEntries: number;
    dbEntries: number;
    hits: number;
    misses: number;
    hitRate: string;
    tokensSaved: number;
  };
  idempotency: {
    activeKeys: number;
    windowMs: number;
  };
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color = "text-text",
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-xl bg-surface-raised border border-border/40">
      <div className="flex items-center gap-2 text-text-muted text-xs">
        <span className="material-symbols-outlined text-base">{icon}</span>
        {label}
      </div>
      <div className={`text-2xl font-semibold tabular-nums ${color}`}>{value}</div>
      {sub && <div className="text-xs text-text-muted">{sub}</div>}
    </div>
  );
}

function HitRateBar({ hitRate }: { hitRate: number }) {
  const color = hitRate >= 70 ? "#22c55e" : hitRate >= 40 ? "#f59e0b" : "#ef4444";
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-muted">Hit Rate</span>
        <span className="font-medium" style={{ color }}>
          {hitRate.toFixed(1)}%
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-surface/50 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(hitRate, 100)}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function CachePage() {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const notify = useNotificationStore();

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/cache");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10_000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const handleClearAll = async () => {
    setClearing(true);
    try {
      const res = await fetch("/api/cache", { method: "DELETE" });
      if (res.ok) {
        const data = await res.json();
        notify.add({
          type: "success",
          message: `Cache cleared. ${data.expiredRemoved} expired entries removed.`,
        });
        await fetchStats();
      } else {
        notify.add({ type: "error", message: "Failed to clear cache." });
      }
    } catch {
      notify.add({ type: "error", message: "Failed to clear cache." });
    } finally {
      setClearing(false);
    }
  };

  const sc = stats?.semanticCache;
  const idp = stats?.idempotency;
  const hitRate = sc ? parseFloat(sc.hitRate) : 0;
  const totalRequests = sc ? sc.hits + sc.misses : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Cache Management</h1>
          <p className="text-sm text-text-muted mt-0.5">
            Monitor and manage semantic response cache, hit rates, and token savings.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon="refresh" onClick={fetchStats} disabled={loading}>
            Refresh
          </Button>
          <Button
            variant="danger"
            icon="delete_sweep"
            onClick={handleClearAll}
            disabled={clearing || loading}
            loading={clearing}
          >
            Clear All
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-surface-raised animate-pulse" />
          ))}
        </div>
      ) : !stats ? (
        <EmptyState
          icon="cached"
          title="Cache unavailable"
          description="Could not fetch cache statistics. Make sure the server is running."
        />
      ) : (
        <>
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon="cached"
              label="Memory Entries"
              value={sc?.memoryEntries ?? 0}
              sub="In-memory LRU"
            />
            <StatCard
              icon="storage"
              label="DB Entries"
              value={sc?.dbEntries ?? 0}
              sub="Persisted (SQLite)"
            />
            <StatCard
              icon="trending_up"
              label="Cache Hits"
              value={sc?.hits ?? 0}
              sub={`of ${totalRequests} total requests`}
              color="text-green-500"
            />
            <StatCard
              icon="token"
              label="Tokens Saved"
              value={(sc?.tokensSaved ?? 0).toLocaleString()}
              sub="Estimated from cache hits"
              color="text-blue-400"
            />
          </div>

          {/* Hit Rate Card */}
          <Card>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-sm">Cache Performance</h2>
                <span className="text-xs text-text-muted">Auto-refreshes every 10s</span>
              </div>
              <HitRateBar hitRate={hitRate} />
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border/30">
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-500">{sc?.hits ?? 0}</div>
                  <div className="text-xs text-text-muted">Hits</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-400">{sc?.misses ?? 0}</div>
                  <div className="text-xs text-text-muted">Misses</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{totalRequests}</div>
                  <div className="text-xs text-text-muted">Total</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Cache Behavior Note */}
          <Card>
            <div className="p-5 flex flex-col gap-3">
              <h2 className="font-medium text-sm">Cache Behavior</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-text-muted">
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-base text-blue-400">info</span>
                  <span>
                    Only <strong className="text-text">non-streaming</strong> requests with{" "}
                    <strong className="text-text">temperature=0</strong> are cached.
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-base text-blue-400">info</span>
                  <span>
                    Bypass cache with header{" "}
                    <code className="bg-surface px-1 rounded text-xs">
                      X-OmniRoute-No-Cache: true
                    </code>
                    .
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-base text-blue-400">info</span>
                  <span>
                    Two-tier cache: in-memory LRU (fast) + SQLite (persistent across restarts).
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-base text-blue-400">info</span>
                  <span>
                    Default TTL: <strong className="text-text">30 minutes</strong>. Configure via{" "}
                    <code className="bg-surface px-1 rounded text-xs">SEMANTIC_CACHE_TTL_MS</code>.
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Idempotency Stats */}
          <Card>
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-text-muted">
                  fingerprint
                </span>
                <h2 className="font-medium text-sm">Idempotency Layer</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-surface/50">
                  <div className="text-lg font-semibold">{idp?.activeKeys ?? 0}</div>
                  <div className="text-xs text-text-muted">Active Dedup Keys</div>
                </div>
                <div className="p-3 rounded-lg bg-surface/50">
                  <div className="text-lg font-semibold">
                    {idp ? (idp.windowMs / 1000).toFixed(0) + "s" : "—"}
                  </div>
                  <div className="text-xs text-text-muted">Dedup Window</div>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
