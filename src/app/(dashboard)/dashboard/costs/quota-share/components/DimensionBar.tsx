"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { QuotaDimension } from "@/lib/quota/dimensions";

interface DimensionBarProps {
  dimension: QuotaDimension;
  consumedTotal: number;
  /** ISO string for next reset, or null */
  resetAt?: string | null;
}

function fmtCountdown(ms: number): string {
  if (ms <= 0) return "now";
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (h >= 24) {
    const d = Math.floor(h / 24);
    return `${d}d ${h % 24}h`;
  }
  return `${h}h ${m}m`;
}

export default function DimensionBar({ dimension, consumedTotal, resetAt }: DimensionBarProps) {
  const t = useTranslations("quotaShare");
  // Capture mount time once — avoids impure Date.now() call on every render
  const [now] = useState(() => Date.now());
  const usedPct =
    dimension.limit > 0 ? Math.min((consumedTotal / dimension.limit) * 100, 100) : 0;

  const barColor =
    usedPct >= 90
      ? "bg-red-500"
      : usedPct >= 70
        ? "bg-amber-400"
        : "bg-primary";

  const resetMs = resetAt ? new Date(resetAt).getTime() - now : null;
  const countdown = resetMs !== null && resetMs > 0 ? fmtCountdown(resetMs) : null;

  return (
    <div className="flex flex-col gap-1 min-w-0">
      <div className="flex items-center justify-between text-[10px] text-text-muted">
        <span className="font-semibold uppercase tracking-wide">
          {dimension.unit} / {dimension.window}
        </span>
        <span className="tabular-nums font-bold" style={{ color: usedPct >= 90 ? "#f87171" : usedPct >= 70 ? "#fbbf24" : undefined }}>
          {Math.round(usedPct)}%
        </span>
      </div>
      <div className="h-1.5 rounded-sm bg-black/6 dark:bg-white/6 overflow-hidden">
        <div className={`h-full rounded-sm transition-all ${barColor}`} style={{ width: `${usedPct}%` }} />
      </div>
      {countdown && (
        <div className="text-[10px] text-text-muted">
          {t("dimensionResetIn")} {countdown}
        </div>
      )}
    </div>
  );
}
