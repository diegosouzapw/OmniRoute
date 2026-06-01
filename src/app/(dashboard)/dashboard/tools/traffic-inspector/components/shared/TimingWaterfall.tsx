"use client";

import { useTranslations } from "next-intl";
import type { InterceptedRequest } from "@/mitm/inspector/types";

interface TimingWaterfallProps {
  request: InterceptedRequest;
}

export function TimingWaterfall({ request }: TimingWaterfallProps) {
  const t = useTranslations("trafficInspector");
  const { proxyLatencyMs, upstreamLatencyMs, totalLatencyMs } = request;
  const total = totalLatencyMs ?? (proxyLatencyMs ?? 0) + (upstreamLatencyMs ?? 0);

  if (!total) {
    return <p className="text-sm text-text-muted">{t("timingNoData")}</p>;
  }

  const segments: Array<{ label: string; ms: number; color: string }> = [
    {
      label: t("timingProxyOverhead"),
      ms: proxyLatencyMs ?? 0,
      color: "bg-blue-500",
    },
    {
      label: t("timingUpstreamResponse"),
      ms: upstreamLatencyMs ?? 0,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {segments.map((seg) => {
          const pct = total > 0 ? (seg.ms / total) * 100 : 0;
          return (
            <div key={seg.label} className="space-y-1">
              <div className="flex justify-between text-xs text-text-muted">
                <span>{seg.label}</span>
                <span>{seg.ms}ms ({pct.toFixed(1)}%)</span>
              </div>
              <div className="h-4 w-full rounded bg-bg-subtle">
                <div
                  className={`h-full rounded ${seg.color}`}
                  style={{ width: `${Math.max(pct, 0.5)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs font-medium text-text-main border-t border-border pt-2">
        <span>{t("timingTotalLatency")}</span>
        <span>{total}ms</span>
      </div>
    </div>
  );
}
