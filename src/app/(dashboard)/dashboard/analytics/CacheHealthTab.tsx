"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Badge from "@/shared/components/Badge";
import { Skeleton } from "@/shared/components/Loading";
import TimeRangeSelector from "@/shared/components/analytics/TimeRangeSelector";
import type { UtilizationTimeRange } from "@/shared/types/utilization";
import { cn } from "@/shared/utils/cn";

type CacheHealthVerdict = "healthy" | "degraded" | "thrash" | "no-data";

type CacheHealthModel = {
  model: string;
  calls: number;
  cacheReadTotal: number;
  cacheWriteTotal: number;
  writeReadRatio: number;
  heavyWriteCalls: number;
};

type CacheHealthResponse = {
  totalCalls: number;
  cacheReadTotal: number;
  cacheWriteTotal: number;
  writeReadRatio: number;
  warmCalls: number;
  coldCalls: number;
  rewriteCalls: number;
  uncachedCalls: number;
  writeP50: number;
  writeP90: number;
  writeP99: number;
  writeMax: number;
  heavyWriteCalls: number;
  heavyWriteCallShare: number;
  heavyWriteTokenShare: number;
  heavyWriteThreshold: number;
  verdict: CacheHealthVerdict;
  byModel: CacheHealthModel[];
  timeRange: UtilizationTimeRange;
  since: string;
  truncated: boolean;
};

type Translator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

function text(t: Translator, key: string, fallback: string) {
  return typeof t.has === "function" && t.has(key) ? t(key) : fallback;
}

const compact = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

function verdictVariant(v: CacheHealthVerdict) {
  if (v === "thrash") return "error" as const;
  if (v === "degraded") return "warning" as const;
  if (v === "healthy") return "success" as const;
  return "default" as const;
}

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-text-muted">{label}</span>
      <span className="text-2xl font-semibold text-text-main">{value}</span>
      {hint ? <span className="text-xs text-text-muted">{hint}</span> : null}
    </div>
  );
}

export default function CacheHealthTab() {
  const t = useTranslations("analytics") as Translator;
  const [range, setRange] = useState<UtilizationTimeRange>("24h");
  const [data, setData] = useState<CacheHealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (r: UtilizationTimeRange) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/usage/cache-health?range=${r}`);
      if (!res.ok) throw new Error(String(res.status));
      setData((await res.json()) as CacheHealthResponse);
    } catch {
      setError("load-failed");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(range);
  }, [load, range]);

  if (loading) return <Skeleton className="h-64 w-full" />;

  if (error || !data) {
    return (
      <Card>
        <p className="text-sm text-text-muted">
          {text(t, "cacheHealthLoadError", "Could not load the prompt-cache summary.")}
        </p>
      </Card>
    );
  }

  const hasData = data.verdict !== "no-data";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-text-main">
            {text(t, "cacheHealthTitle", "Prompt cache health")}
          </h2>
          <Badge variant={verdictVariant(data.verdict)}>
            {text(t, `cacheHealthVerdict.${data.verdict}`, data.verdict)}
          </Badge>
        </div>
        <TimeRangeSelector value={range} onChange={setRange} />
      </div>

      <p className="text-sm text-text-muted">
        {text(
          t,
          "cacheHealthIntro",
          "A warm loop writes the prefix once and then only pays the delta. When a few calls " +
            "carry most of the writes, the prefix is being rebuilt — usually because the client " +
            "rewrote its history or alternates between two request shapes."
        )}
      </p>

      {!hasData ? (
        <Card>
          <p className="text-sm text-text-muted">
            {text(t, "cacheHealthEmpty", "No calls with cache accounting in this window.")}
          </p>
        </Card>
      ) : (
        <>
          <Card>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <Metric
                label={text(t, "cacheHealthRatio", "Write / read")}
                value={data.writeReadRatio.toFixed(2)}
                hint={text(t, "cacheHealthRatioHint", "below 0.20 is a warm loop")}
              />
              <Metric
                label={text(t, "cacheHealthRead", "Tokens read")}
                value={compact(data.cacheReadTotal)}
              />
              <Metric
                label={text(t, "cacheHealthWrite", "Tokens written")}
                value={compact(data.cacheWriteTotal)}
              />
              <Metric
                label={text(t, "cacheHealthCalls", "Calls")}
                value={compact(data.totalCalls)}
                hint={
                  data.truncated
                    ? text(t, "cacheHealthTruncated", "newest 5000 only")
                    : `${compact(data.warmCalls)} warm · ${compact(data.coldCalls)} cold`
                }
              />
            </div>
          </Card>

          {/* A concentração é o achado que a média esconde — por isso ganha destaque próprio. */}
          <Card>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-text-main">
                  {text(t, "cacheHealthConcentration", "Where the writes are concentrated")}
                </h3>
                <span className="text-xs text-text-muted">
                  {text(t, "cacheHealthThreshold", "outlier above")} {compact(data.heavyWriteThreshold)}{" "}
                  {text(t, "cacheHealthTokens", "tokens")}
                </span>
              </div>
              <p className="text-sm text-text-main">
                <strong>{pct(data.heavyWriteCallShare)}</strong>{" "}
                {text(t, "cacheHealthOfCalls", "of the calls carry")}{" "}
                <strong>{pct(data.heavyWriteTokenShare)}</strong>{" "}
                {text(t, "cacheHealthOfWrites", "of all written tokens")} (
                {compact(data.heavyWriteCalls)} {text(t, "cacheHealthCallsLower", "calls")}).
              </p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-bg-subtle">
                <div
                  className={cn(
                    "h-full rounded-full",
                    data.heavyWriteTokenShare > 0.75 ? "bg-red-500" : "bg-amber-500"
                  )}
                  style={{ width: `${Math.min(100, data.heavyWriteTokenShare * 100)}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-1 md:grid-cols-4">
                <Metric label="p50" value={compact(data.writeP50)} />
                <Metric label="p90" value={compact(data.writeP90)} />
                <Metric label="p99" value={compact(data.writeP99)} />
                <Metric label="max" value={compact(data.writeMax)} />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="mb-3 text-sm font-semibold text-text-main">
              {text(t, "cacheHealthByModel", "By model (worst ratio first)")}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase text-text-muted">
                    <th className="pb-2 pr-4 font-medium">{text(t, "cacheHealthModel", "Model")}</th>
                    <th className="pb-2 pr-4 text-right font-medium">
                      {text(t, "cacheHealthCalls", "Calls")}
                    </th>
                    <th className="pb-2 pr-4 text-right font-medium">
                      {text(t, "cacheHealthRead", "Read")}
                    </th>
                    <th className="pb-2 pr-4 text-right font-medium">
                      {text(t, "cacheHealthWrite", "Written")}
                    </th>
                    <th className="pb-2 pr-4 text-right font-medium">W/R</th>
                    <th className="pb-2 text-right font-medium">
                      {text(t, "cacheHealthHeavy", "Heavy")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.byModel.map((m) => (
                    <tr key={m.model} className="border-b border-border/50 last:border-0">
                      <td className="py-2 pr-4 font-mono text-xs text-text-main">{m.model}</td>
                      <td className="py-2 pr-4 text-right text-text-muted">{compact(m.calls)}</td>
                      <td className="py-2 pr-4 text-right text-text-muted">
                        {compact(m.cacheReadTotal)}
                      </td>
                      <td className="py-2 pr-4 text-right text-text-muted">
                        {compact(m.cacheWriteTotal)}
                      </td>
                      <td
                        className={cn(
                          "py-2 pr-4 text-right font-medium",
                          m.writeReadRatio > 1
                            ? "text-red-500"
                            : m.writeReadRatio > 0.2
                              ? "text-amber-500"
                              : "text-text-main"
                        )}
                      >
                        {m.writeReadRatio.toFixed(2)}
                      </td>
                      <td className="py-2 text-right text-text-muted">
                        {compact(m.heavyWriteCalls)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
