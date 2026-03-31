"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "@/shared/components/Card";
import Badge from "@/shared/components/Badge";
import { Skeleton, Spinner } from "@/shared/components/Loading";
import TimeRangeSelector from "@/shared/components/analytics/TimeRangeSelector";
import type {
  ComboHealthMetrics,
  ComboHealthResponse,
  UtilizationTimeRange,
} from "@/shared/types/utilization";
import { cn } from "@/shared/utils/cn";

function formatPercent(value: number, digits = 0) {
  return `${value.toFixed(digits)}%`;
}

function formatShare(value: number) {
  return formatPercent(value * 100, 1);
}

function formatLatency(value: number) {
  return `${Math.round(value).toLocaleString()}ms`;
}

function getTrendMeta(trend: ComboHealthMetrics["quotaHealth"]["providers"][number]["trend"]) {
  if (trend === "improving") {
    return {
      icon: "trending_up",
      label: "Improving",
      variant: "success" as const,
    };
  }

  if (trend === "declining") {
    return {
      icon: "trending_down",
      label: "Declining",
      variant: "warning" as const,
    };
  }

  return {
    icon: "trending_flat",
    label: "Stable",
    variant: "default" as const,
  };
}

function MetricBlock({
  icon,
  label,
  value,
  subValue,
}: {
  icon: string;
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <div className="rounded-lg border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.02]">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
        <span className="material-symbols-outlined text-[16px]">{icon}</span>
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-text-main">{value}</div>
      {subValue ? <div className="mt-1 text-xs text-text-muted">{subValue}</div> : null}
    </div>
  );
}

function DistributionBar({ label, value, meta }: { label: string; value: number; meta: string }) {
  const width = `${Math.max(value * 100, value > 0 ? 6 : 0)}%`;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-black/5 bg-black/[0.02] p-3 dark:border-white/5 dark:bg-white/[0.02]">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="truncate font-medium text-text-main">{label}</span>
        <span className="shrink-0 text-xs text-text-muted">{meta}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width }} />
      </div>
    </div>
  );
}

function ComboHealthCard({ combo }: { combo: ComboHealthMetrics }) {
  const sortedDistribution = useMemo(
    () =>
      [...combo.usageSkew.modelDistribution].sort(
        (left, right) => right.requestShare - left.requestShare
      ),
    [combo.usageSkew.modelDistribution]
  );

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-black/5 px-6 py-5 dark:border-white/5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-text-main">{combo.comboName}</h3>
              <Badge variant="primary" size="sm">
                {combo.strategy}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-text-muted">
              {combo.models.length} models across {combo.quotaHealth.providers.length} providers
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[420px]">
            <MetricBlock
              icon="battery_status_good"
              label="Worst quota left"
              value={formatPercent(combo.quotaHealth.worstRemainingPct)}
            />
            <MetricBlock
              icon="balance"
              label="Usage skew"
              value={combo.usageSkew.giniCoefficient.toFixed(2)}
              subValue="Gini coefficient"
            />
            <MetricBlock
              icon="bolt"
              label="Success rate"
              value={formatPercent(combo.performance.successRate * 100, 1)}
              subValue={`${combo.performance.totalRequests.toLocaleString()} requests`}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-6 py-5 xl:grid-cols-[1.1fr_1fr_0.95fr]">
        <section className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-semibold text-text-main">Quota health</div>
            <div className="mt-1 text-xs text-text-muted">
              Lowest remaining quota across providers with short trend signals.
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {combo.quotaHealth.providers.map((provider) => {
              const trendMeta = getTrendMeta(provider.trend);
              const width = `${Math.max(provider.remainingPct, provider.remainingPct > 0 ? 6 : 0)}%`;

              return (
                <div
                  key={provider.provider}
                  className="rounded-lg border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.02]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-text-main">{provider.provider}</div>
                      <div className="mt-1 text-xs text-text-muted">
                        Remaining quota {formatPercent(provider.remainingPct, 1)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={trendMeta.variant} size="sm" icon={trendMeta.icon}>
                        {trendMeta.label}
                      </Badge>
                      {provider.isExhausted ? (
                        <Badge variant="error" size="sm">
                          Exhausted
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-semibold text-text-main">Usage skew</div>
            <div className="mt-1 text-xs text-text-muted">
              Model request share and token share within this combo.
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {sortedDistribution.map((entry) => (
              <div
                key={entry.model}
                className="rounded-lg border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.02]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-text-main">{entry.model}</div>
                    <div className="mt-1 text-xs text-text-muted">
                      Request share {formatShare(entry.requestShare)} · Token share{" "}
                      {formatShare(entry.tokenShare)}
                    </div>
                  </div>
                  <Badge size="sm">{formatShare(entry.requestShare)}</Badge>
                </div>

                <div className="mt-3 grid gap-2">
                  <DistributionBar
                    label="Requests"
                    value={entry.requestShare}
                    meta={formatShare(entry.requestShare)}
                  />
                  <DistributionBar
                    label="Tokens"
                    value={entry.tokenShare}
                    meta={formatShare(entry.tokenShare)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-semibold text-text-main">Performance</div>
            <div className="mt-1 text-xs text-text-muted">
              Reliability and throughput for routed combo traffic.
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <MetricBlock
              icon="timer"
              label="Avg latency"
              value={formatLatency(combo.performance.avgLatencyMs)}
            />
            <MetricBlock
              icon="task_alt"
              label="Success rate"
              value={formatPercent(combo.performance.successRate * 100, 1)}
            />
            <MetricBlock
              icon="stacked_line_chart"
              label="Total requests"
              value={combo.performance.totalRequests.toLocaleString()}
            />
          </div>
        </section>
      </div>
    </Card>
  );
}

function ComboHealthSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[0, 1].map((index) => (
        <Card key={index} className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-52" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:min-w-[420px]">
                {[0, 1, 2].map((item) => (
                  <Skeleton key={item} className="h-24 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="grid gap-4 xl:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="space-y-3">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-24 rounded-lg" />
                  <Skeleton className="h-24 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function ComboHealthTab() {
  const [range, setRange] = useState<UtilizationTimeRange>("24h");
  const [data, setData] = useState<ComboHealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  const fetchData = useCallback(
    async (controller: AbortController, isRetry = false) => {
      if (isRetry) {
        setRetrying(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const response = await fetch(`/api/usage/combo-health?range=${range}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch combo health data");
        }

        const result = (await response.json()) as ComboHealthResponse;
        setData(result);
        setError(null);
      } catch (fetchError) {
        if ((fetchError as Error).name === "AbortError") {
          return;
        }
        setError(fetchError instanceof Error ? fetchError.message : "Unknown error");
        if (!isRetry) setData(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          if (isRetry) setRetrying(false);
        }
      }
    },
    [range]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller, false);
    return () => controller.abort();
  }, [fetchData]);

  const combos = data?.combos ?? [];

  const handleRetry = useCallback(() => {
    const controller = new AbortController();
    fetchData(controller, true);
  }, [fetchData]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border border-black/5 bg-surface p-5 shadow-sm dark:border-white/5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-main">Combo health</h2>
          <p className="mt-1 text-sm text-text-muted">
            Monitor quota pressure, skewed model usage, and delivery performance by combo.
          </p>
        </div>
        <TimeRangeSelector value={range} onChange={setRange} />
      </div>

      {loading ? <ComboHealthSkeleton /> : null}

      {!loading && error ? (
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="material-symbols-outlined text-[40px] text-error">sync_problem</span>
            <div className="flex flex-col gap-1">
              <div className="font-medium text-text-main">Unable to load combo health</div>
              <div className="text-sm text-text-muted">{error}</div>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              disabled={retrying}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {retrying ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    progress_activity
                  </span>
                  Retrying…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  Retry
                </>
              )}
            </button>
          </div>
        </Card>
      ) : null}

      {!loading && !error && combos.length === 0 ? (
        <Card className="p-10">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="material-symbols-outlined text-[40px] text-text-muted/70">
              monitor_heart
            </span>
            <div className="text-base font-medium text-text-main">
              No combo health data available
            </div>
            <div className="max-w-md text-sm text-text-muted">
              Combo quota snapshots and routed requests will appear here after traffic starts
              flowing.
            </div>
            <div className="rounded-lg border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.02]">
              <p className="text-xs font-medium text-text-main">Getting started</p>
              <ul className="mt-2 text-left text-xs text-text-muted">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    check_circle
                  </span>
                  <span>
                    Create combos in <strong>Combos</strong> with multiple providers
                  </span>
                </li>
                <li className="mt-1 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    check_circle
                  </span>
                  <span>Send requests to combo endpoints to generate traffic data</span>
                </li>
                <li className="mt-1 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    check_circle
                  </span>
                  <span>Health metrics will appear automatically as requests are routed</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      ) : null}

      {!loading && !error && combos.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Spinner
              size="sm"
              className={cn("text-primary", "[&_.material-symbols-outlined]:text-[16px]")}
            />
            Tracking {combos.length} combos for {range}
          </div>
          {combos.map((combo) => (
            <ComboHealthCard key={combo.comboId} combo={combo} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
