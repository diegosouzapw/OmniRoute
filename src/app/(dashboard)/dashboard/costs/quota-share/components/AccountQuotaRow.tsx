"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import ProviderIcon from "@/shared/components/ProviderIcon";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { maskEmailLikeValue } from "@/shared/utils/maskEmail";
import {
  parseQuotaData,
  calculatePercentage,
  formatCountdown,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils";

interface AccountQuotaRowProps {
  /** Primary provider identifier (used as fallback when providers is absent) */
  provider: string;
  /** Optional list of all provider identifiers — one per connection in the pool */
  providers?: string[];
  /** Optional list of connection IDs — used to look up cached quota data */
  connectionIds?: string[];
}

interface QuotaSummary {
  pct: number;
  resetAt: string | null;
}

/** Aggregate the worst-remaining quota across all quotas for a connection. */
function summarizeQuotas(provider: string, raw: unknown): QuotaSummary | null {
  if (!raw || typeof raw !== "object") return null;
  const parsed = parseQuotaData(provider, raw);
  if (!Array.isArray(parsed) || parsed.length === 0) return null;

  let worst: number | null = null;
  let closestResetAt: string | null = null;
  let closestResetMs = Number.POSITIVE_INFINITY;
  const now = Date.now();

  for (const q of parsed) {
    if (!q || q.unlimited) continue;
    const pct =
      q.remainingPercentage !== undefined
        ? Number(q.remainingPercentage)
        : calculatePercentage(q.used, q.total);
    if (!Number.isFinite(pct)) continue;
    if (worst === null || pct < worst) worst = pct;

    if (q.resetAt) {
      const ts = new Date(q.resetAt).getTime();
      if (Number.isFinite(ts) && ts > now && ts < closestResetMs) {
        closestResetMs = ts;
        closestResetAt = typeof q.resetAt === "string" ? q.resetAt : new Date(ts).toISOString();
      }
    }
  }

  if (worst === null) return null;
  return { pct: Math.round(worst), resetAt: closestResetAt };
}

function PctDot({ pct }: { pct: number }) {
  const color =
    pct <= 20 ? "bg-red-500" : pct <= 50 ? "bg-yellow-500" : "bg-emerald-500";
  const textColor =
    pct <= 20 ? "text-red-500" : pct <= 50 ? "text-yellow-500" : "text-emerald-500";
  return (
    <span className={`inline-flex items-center gap-1 tabular-nums text-[11px] ${textColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${color}`} aria-hidden />
      {pct}%
    </span>
  );
}

/**
 * AccountQuotaRow — read-only compact section showing each pool connection's
 * upstream account quota, sourced from GET /api/usage/provider-limits (bulk
 * cached endpoint, same as ProviderLimits.tsx uses).
 *
 * Fail-soft: on error / loading / no data → renders a muted "—" line.
 * Never throws; never crashes the parent PoolCard.
 */
export default function AccountQuotaRow({
  provider,
  providers,
  connectionIds,
}: AccountQuotaRowProps) {
  const t = useTranslations("quotaShare");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);

  // Keyed by connectionId
  const [caches, setCaches] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/usage/provider-limits")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        const map = data?.caches;
        setCaches(map && typeof map === "object" ? (map as Record<string, unknown>) : {});
      })
      .catch(() => {
        if (alive) setError(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Resolve the effective connection list to display
  const ids: string[] = Array.isArray(connectionIds) && connectionIds.length > 0
    ? connectionIds
    : [];

  // Resolve provider for each connection (providers[i] matches connectionIds[i])
  const providerFor = (index: number): string =>
    Array.isArray(providers) && providers[index] != null
      ? (providers[index] as string)
      : provider;

  const renderFallback = () => (
    <span className="text-[11px] text-text-muted tabular-nums">
      {t("accountQuotaNone")}
    </span>
  );

  if (error || caches === null) {
    return (
      <div className="mt-2 pt-2 border-t border-border/30">
        <span className="text-[10px] uppercase tracking-wide font-bold text-text-muted block mb-1">
          {t("accountQuotaTitle")}
        </span>
        {renderFallback()}
      </div>
    );
  }

  // If no connectionIds, nothing to display
  if (ids.length === 0) {
    return (
      <div className="mt-2 pt-2 border-t border-border/30">
        <span className="text-[10px] uppercase tracking-wide font-bold text-text-muted block mb-1">
          {t("accountQuotaTitle")}
        </span>
        {renderFallback()}
      </div>
    );
  }

  return (
    <div className="mt-2 pt-2 border-t border-border/30">
      <span className="text-[10px] uppercase tracking-wide font-bold text-text-muted block mb-1.5">
        {t("accountQuotaTitle")}
      </span>
      <div className="flex flex-col gap-1">
        {ids.map((connId, idx) => {
          const raw = caches?.[connId];
          const prov = providerFor(idx);
          const summary = summarizeQuotas(prov, raw);
          const reset = summary?.resetAt ? formatCountdown(summary.resetAt) : null;

          return (
            <div key={connId} className="flex items-center gap-1.5 text-[11px]">
              <span className="shrink-0">
                <ProviderIcon providerId={prov} size={14} />
              </span>
              <span className="text-text-muted truncate max-w-[90px]" title={emailsVisible ? connId : maskEmailLikeValue(connId)}>
                {emailsVisible ? `${connId.slice(0, 8)}…` : maskEmailLikeValue(connId)}
              </span>
              {summary ? (
                <>
                  <PctDot pct={summary.pct} />
                  {reset ? (
                    <span className="text-text-muted">· {reset}</span>
                  ) : null}
                </>
              ) : (
                <span className="text-text-muted">{t("accountQuotaNone")}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
