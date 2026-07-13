"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { PoolUsageSnapshot } from "@/lib/quota/types";

export interface BurnRateChartInnerProps {
  usage: PoolUsageSnapshot | null;
}

export default function BurnRateChartInner({ usage }: BurnRateChartInnerProps) {
  const t = useTranslations("quotaShare");
  const [nowMs] = useState(() => Date.now());

  const burnRate = usage?.burnRate;
  const hasData = burnRate && burnRate.tokensPerSecond > 0;

  if (!hasData) {
    return (
      <div className="h-20 flex items-center justify-center rounded-md bg-bg-subtle/30 border border-border/30">
        <p className="text-[11px] text-text-muted italic">{t("burnRateTitle")} — no data yet</p>
      </div>
    );
  }

  const { tokensPerSecond, timeToExhaustionMs } = burnRate;

  const pointCount = 6;
  const intervalMs = timeToExhaustionMs ? timeToExhaustionMs / pointCount : 60_000 * 60;

  const primaryDim = usage?.dimensions?.[0];
  const currentConsumed = primaryDim?.consumedTotal ?? 0;
  const limit = primaryDim?.limit ?? 0;

  const data = Array.from({ length: pointCount + 1 }, (_, i) => {
    const t2 = nowMs + i * intervalMs;
    const projected = Math.min(
      currentConsumed + tokensPerSecond * ((i * intervalMs) / 1000),
      limit
    );
    return {
      time: new Date(t2).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      consumed: Math.round(projected),
    };
  });

  const exhaustionLabel = timeToExhaustionMs
    ? `${t("burnRateExhaustsIn")} ${fmtDuration(timeToExhaustionMs)}`
    : null;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[10px] text-text-muted">
        <span className="font-semibold uppercase tracking-wide">{t("burnRateTitle")}</span>
        {exhaustionLabel && <span className="text-amber-400 font-semibold">{exhaustionLabel}</span>}
      </div>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "var(--bg-surface, #1e1e2e)",
                border: "1px solid var(--border)",
                fontSize: 10,
              }}
            />
            <Line
              type="monotone"
              dataKey="consumed"
              stroke="#a78bfa"
              strokeWidth={2}
              dot={false}
              strokeDasharray="4 2"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function fmtDuration(ms: number): string {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (h >= 24) {
    const d = Math.floor(h / 24);
    return `${d}d ${h % 24}h`;
  }
  return `${h}h ${m}m`;
}
