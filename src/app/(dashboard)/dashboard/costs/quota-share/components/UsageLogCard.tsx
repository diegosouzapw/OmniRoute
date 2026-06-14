"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { ConsumptionEvent } from "@/lib/db/quotaConsumption";

export interface UsageLogCardProps {
  poolId: string;
  /** Optional map from apiKeyId to display label */
  keyLabels?: Record<string, string>;
}

function formatTime(epochMs: number): string {
  try {
    return new Date(epochMs).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return String(epochMs);
  }
}

/**
 * UsageLogCard — collapsible footer card that shows the N most-recent
 * quota_consumption events for a pool, sourced from
 * GET /api/quota/pools/[id]/log.
 *
 * Fail-soft: on error / loading / no data → renders an empty-state message.
 * Never throws; never crashes the parent PoolCard.
 *
 * Collapsed by default so pool cards stay compact.
 */
export default function UsageLogCard({ poolId, keyLabels }: UsageLogCardProps) {
  const t = useTranslations("quotaShare");
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<ConsumptionEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    fetch(`/api/quota/pools/${poolId}/log`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        const raw: unknown = data?.events;
        setEvents(Array.isArray(raw) ? (raw as ConsumptionEvent[]) : [] ?? []);
        setLoaded(true);
      })
      .catch(() => {
        if (alive) {
          setEvents([] ?? []);
          setLoaded(true);
        }
      });
    return () => {
      alive = false;
    };
  }, [open, poolId]);

  const keyLabel = (apiKeyId: string): string =>
    keyLabels?.[apiKeyId] ?? apiKeyId.slice(0, 10) + "…";

  return (
    <div className="mt-2 pt-2 border-t border-border/30">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-[10px] uppercase tracking-wide font-bold text-text-muted hover:text-text-main w-full text-left cursor-pointer"
      >
        <span
          className={`material-symbols-outlined text-[13px] transition-transform ${open ? "rotate-90" : ""}`}
        >
          chevron_right
        </span>
        {t("logTitle")}
      </button>

      {open && (
        <div className="mt-1.5">
          {!loaded ? (
            <div className="text-[11px] text-text-muted italic">{t("loading")}</div>
          ) : events.length === 0 ? (
            <div className="text-[11px] text-text-muted italic">{t("logEmpty")}</div>
          ) : (
            <div className="flex flex-col gap-0.5 max-h-48 overflow-y-auto pr-1">
              {events.map((ev, i) => (
                <div
                  key={`${ev.apiKeyId}-${ev.dimensionKey}-${ev.bucketIndex}-${i}`}
                  className="flex items-center gap-1.5 text-[11px] text-text-muted"
                >
                  <span className="tabular-nums text-text-muted/60 shrink-0 w-[52px]">
                    {formatTime(ev.updatedAt)}
                  </span>
                  <span className="truncate max-w-[80px]" title={ev.apiKeyId}>
                    {keyLabel(ev.apiKeyId)}
                  </span>
                  <span className="text-text-muted/50">·</span>
                  <span className="truncate max-w-[80px]">{ev.unit}</span>
                  <span className="text-text-muted/50">·</span>
                  <span className="tabular-nums text-text-main/80">
                    {ev.consumed.toFixed(0)} {ev.window}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
