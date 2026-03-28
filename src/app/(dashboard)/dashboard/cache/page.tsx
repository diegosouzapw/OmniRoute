"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Button, EmptyState } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SemanticCacheStats {
  memoryEntries: number;
  dbEntries: number;
  hits: number;
  misses: number;
  hitRate: string;
  tokensSaved: number;
}

interface IdempotencyStats {
  activeKeys: number;
  windowMs: number;
}

interface CacheStats {
  semanticCache: SemanticCacheStats;
  idempotency: IdempotencyStats;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  valueClass = "text-text",
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-xl bg-surface-raised border border-border/40">
      <div className="flex items-center gap-1.5 text-text-muted text-xs">
        <span className="material-symbols-outlined text-base leading-none" aria-hidden="true">
          {icon}
        </span>
        {label}
      </div>
      <div className={`text-2xl font-semibold tabular-nums ${valueClass}`}>{value}</div>
      {sub && <div className="text-xs text-text-muted">{sub}</div>}
    </div>
  );
}

function HitRateBar({ hitRate, label }: { hitRate: number; label: string }) {
  const colorClass = hitRate >= 70 ? "bg-green-500" : hitRate >= 40 ? "bg-amber-400" : "bg-red-500";
  const textClass =
    hitRate >= 70 ? "text-green-500" : hitRate >= 40 ? "text-amber-400" : "text-red-500";

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-label={label}
      aria-valuenow={hitRate}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-text-muted">{label}</span>
        <span className={`font-semibold tabular-nums ${textClass}`}>{hitRate.toFixed(1)}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-surface/50 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${Math.min(hitRate, 100)}%` }}
        />
      </div>
    </div>
  );
}

function InfoRow({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-sm text-text-muted">
      <span
        className="material-symbols-outlined text-base leading-5 text-blue-400 shrink-0"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const REFRESH_INTERVAL_MS = 10_000;
const REFRESH_INTERVAL_SECONDS = REFRESH_INTERVAL_MS / 1000;

export default function CachePage() {
  const t = useTranslations("cache");
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const notify = useNotificationStore();

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/cache");
      if (res.ok) {
        const data: CacheStats = await res.json();
        setStats(data);
      }
    } catch (error) {
      // Network error — keep stale stats rather than clearing the UI
      console.error("[CachePage] Failed to fetch cache stats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStats();
    const id = setInterval(() => void fetchStats(), REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchStats]);

  const handleClearAll = async () => {
    setClearing(true);
    try {
      const res = await fetch("/api/cache", { method: "DELETE" });
      if (res.ok) {
        const data = await res.json();
        notify.add({
          type: "success",
          message: t("clearSuccess", { count: data.expiredRemoved ?? 0 }),
        });
        await fetchStats();
      } else {
        notify.add({ type: "error", message: t("clearError") });
      }
    } catch (error) {
      console.error("[CachePage] Failed to clear cache:", error);
      notify.add({ type: "error", message: t("clearError") });
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-text-muted mt-0.5">{t("description")}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="secondary"
            icon="refresh"
            size="sm"
            onClick={() => void fetchStats()}
            disabled={loading}
            aria-label={t("refresh")}
          >
            {t("refresh")}
          </Button>
          <Button
            variant="danger"
            icon="delete_sweep"
            size="sm"
            onClick={() => void handleClearAll()}
            disabled={clearing || loading}
            loading={clearing}
            aria-label={t("clearAll")}
          >
            {t("clearAll")}
          </Button>
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          aria-busy="true"
          aria-label="Loading cache statistics"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-surface-raised animate-pulse" />
          ))}
        </div>
      )}

      {/* Error / empty state */}
      {!loading && !stats && (
        <EmptyState
          icon="cached"
          title={t("unavailable")}
          description={t("unavailableDesc")}
          actionLabel={t("refresh")}
          onAction={() => void fetchStats()}
        />
      )}

      {/* Main content */}
      {!loading && stats && (
        <>
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon="memory"
              label={t("memoryEntries")}
              value={sc?.memoryEntries ?? 0}
              sub={t("memoryEntriesSub")}
            />
            <StatCard
              icon="storage"
              label={t("dbEntries")}
              value={sc?.dbEntries ?? 0}
              sub={t("dbEntriesSub")}
            />
            <StatCard
              icon="trending_up"
              label={t("cacheHits")}
              value={sc?.hits ?? 0}
              sub={t("cacheHitsSub", { total: totalRequests })}
              valueClass="text-green-500"
            />
            <StatCard
              icon="token"
              label={t("tokensSaved")}
              value={(sc?.tokensSaved ?? 0).toLocaleString()}
              sub={t("tokensSavedSub")}
              valueClass="text-blue-400"
            />
          </div>

          {/* Hit rate + breakdown */}
          <Card>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-sm">{t("performance")}</h2>
                <span className="text-xs text-text-muted">
                  {t("autoRefresh", { seconds: REFRESH_INTERVAL_SECONDS })}
                </span>
              </div>
              <HitRateBar hitRate={hitRate} label={t("hitRate")} />
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border/30 text-center">
                <div>
                  <div className="text-lg font-semibold tabular-nums text-green-500">
                    {sc?.hits ?? 0}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">{t("hits")}</div>
                </div>
                <div>
                  <div className="text-lg font-semibold tabular-nums text-red-400">
                    {sc?.misses ?? 0}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">{t("misses")}</div>
                </div>
                <div>
                  <div className="text-lg font-semibold tabular-nums">{totalRequests}</div>
                  <div className="text-xs text-text-muted mt-0.5">{t("total")}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Cache behavior */}
          <Card>
            <div className="p-5 flex flex-col gap-3">
              <h2 className="font-medium text-sm">{t("behavior")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InfoRow icon="info">{t("behaviorDeterministic")}</InfoRow>
                <InfoRow icon="info">
                  {t.rich("behaviorBypass", {
                    header: () => (
                      <code className="bg-surface px-1 py-0.5 rounded text-xs font-mono">
                        X-OmniRoute-No-Cache: true
                      </code>
                    ),
                  })}
                </InfoRow>
                <InfoRow icon="info">{t("behaviorTwoTier")}</InfoRow>
                <InfoRow icon="info">
                  {t.rich("behaviorTtl", {
                    envVar: () => (
                      <code className="bg-surface px-1 py-0.5 rounded text-xs font-mono">
                        SEMANTIC_CACHE_TTL_MS
                      </code>
                    ),
                  })}
                </InfoRow>
              </div>
            </div>
          </Card>

          {/* Idempotency */}
          <Card>
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-base text-text-muted"
                  aria-hidden="true"
                >
                  fingerprint
                </span>
                <h2 className="font-medium text-sm">{t("idempotency")}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-surface/50">
                  <div className="text-lg font-semibold tabular-nums">{idp?.activeKeys ?? 0}</div>
                  <div className="text-xs text-text-muted mt-0.5">{t("activeDedupKeys")}</div>
                </div>
                <div className="p-3 rounded-lg bg-surface/50">
                  <div className="text-lg font-semibold tabular-nums">
                    {idp ? `${(idp.windowMs / 1000).toFixed(0)}s` : "—"}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">{t("dedupWindow")}</div>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
