"use client";

import React from "react";
import { Card } from "@/shared/components";

interface CachePerformanceProps {
  hits?: number;
  misses?: number;
  hitRate?: string;
  avgLatencyMs?: number;
  p95LatencyMs?: number;
  totalRequests?: number;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
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

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      data-testid="skeleton"
      className={`animate-pulse rounded bg-surface/50 ${className ?? ""}`}
    />
  );
}

// ─── CachePerformance ─────────────────────────────────────────────────────────

export default function CachePerformance({
  hits = 0,
  misses = 0,
  hitRate,
  avgLatencyMs,
  p95LatencyMs,
  totalRequests = 0,
  loading = false,
  error = null,
  onRetry,
  stats,
}: CachePerformanceProps) {
  // Parse hitRate string (e.g. "85.0%") to number for the bar
  const hitRateNum = hitRate ? parseFloat(hitRate) : 0;

  return (
    <Card>
      <div data-testid="cache-performance" className="p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-sm">Performance</h2>
        </div>

        {/* Error state */}
        {error && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-red-400">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="self-start text-xs px-3 py-1.5 rounded bg-surface border border-border/50 hover:bg-surface/80 transition-colors"
                aria-label="Retry"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {/* Loading state */}
        {loading && !error && (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-full" />
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border/30">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            {(avgLatencyMs !== undefined || p95LatencyMs !== undefined) && (
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
              </div>
            )}
          </div>
        )}

        {/* Data state — hidden while loading */}
        {!loading && !error && stats !== null && (
          <>
            {/* Hit rate bar */}
            {hitRate !== undefined && <HitRateBar hitRate={hitRateNum} label="Hit Rate" />}

            {/* Hit / Miss / Total breakdown */}
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border/30 text-center">
              <div>
                <div className="text-lg font-semibold tabular-nums text-green-500">{hits}</div>
                <div className="text-xs text-text-muted mt-0.5">Hits</div>
              </div>
              <div>
                <div className="text-lg font-semibold tabular-nums text-red-400">{misses}</div>
                <div className="text-xs text-text-muted mt-0.5">Misses</div>
              </div>
              <div>
                <div className="text-lg font-semibold tabular-nums">{totalRequests}</div>
                <div className="text-xs text-text-muted mt-0.5">Total</div>
              </div>
            </div>

            {/* Latency metrics */}
            {(avgLatencyMs !== undefined || p95LatencyMs !== undefined) && (
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/30 text-center">
                {avgLatencyMs !== undefined && (
                  <div>
                    <div className="text-lg font-semibold tabular-nums">{avgLatencyMs}</div>
                    <div className="text-xs text-text-muted mt-0.5">Avg Latency (ms)</div>
                  </div>
                )}
                {p95LatencyMs !== undefined && (
                  <div>
                    <div className="text-lg font-semibold tabular-nums">{p95LatencyMs}</div>
                    <div className="text-xs text-text-muted mt-0.5">P95 Latency (ms)</div>
                  </div>
                )}
              </div>
            )}

            {/* hitRate as text for test assertions */}
            {hitRate !== undefined && (
              <div className="text-center">
                <span className="text-sm font-semibold tabular-nums">{hitRate}</span>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
