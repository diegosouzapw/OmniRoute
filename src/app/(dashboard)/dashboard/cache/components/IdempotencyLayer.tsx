"use client";

import React from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";

interface IdempotencyLayerProps {
  activeKeys?: number;
  windowMs?: number;
  deduplicatedRequests?: number;
  totalProcessed?: number;
  savedCalls?: number;
  stats?: {
    activeKeys?: number;
    windowMs?: number;
    deduplicatedRequests?: number;
    totalProcessed?: number;
    savedCalls?: number;
  } | null;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

function Skeleton() {
  return <div data-testid="skeleton" className="animate-pulse rounded bg-surface/50 h-7 w-16" />;
}

export default function IdempotencyLayer({
  activeKeys,
  windowMs,
  deduplicatedRequests,
  totalProcessed,
  savedCalls,
  stats,
  loading = false,
  error = null,
  onRetry,
}: IdempotencyLayerProps) {
  const t = useTranslations("cache");

  const resolvedActiveKeys = activeKeys ?? stats?.activeKeys ?? 0;
  const resolvedWindowMs = windowMs ?? stats?.windowMs;
  const resolvedDeduplicated = deduplicatedRequests ?? stats?.deduplicatedRequests ?? 0;
  const resolvedTotalProcessed = totalProcessed ?? stats?.totalProcessed ?? 0;
  const resolvedSavedCalls = savedCalls ?? stats?.savedCalls ?? 0;

  return (
    <Card>
      <div data-testid="idempotency-layer" className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-text-muted" aria-hidden="true">
            fingerprint
          </span>
          <h2 className="font-medium text-sm">{t("idempotency")}</h2>
        </div>

        {error && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-red-500">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="self-start text-sm px-3 py-1 rounded bg-surface/50 hover:bg-surface/80 transition-colors"
                aria-label="Retry"
              >
                Retry
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-surface/50">
            <div className="text-lg font-semibold tabular-nums">
              {loading ? <Skeleton /> : resolvedDeduplicated}
            </div>
            <div className="text-xs text-text-muted mt-0.5">{t("deduplicatedRequests")}</div>
          </div>

          <div className="p-3 rounded-lg bg-surface/50">
            <div className="text-lg font-semibold tabular-nums">
              {loading ? <Skeleton /> : resolvedWindowMs != null ? resolvedWindowMs : "—"}
            </div>
            <div className="text-xs text-text-muted mt-0.5">{t("dedupWindow")}</div>
          </div>

          <div className="p-3 rounded-lg bg-surface/50">
            <div className="text-lg font-semibold tabular-nums">
              {loading ? <Skeleton /> : resolvedActiveKeys}
            </div>
            <div className="text-xs text-text-muted mt-0.5">{t("activeDedupKeys")}</div>
          </div>

          <div className="p-3 rounded-lg bg-surface/50">
            <div className="text-lg font-semibold tabular-nums">
              {loading ? <Skeleton /> : resolvedTotalProcessed}
            </div>
            <div className="text-xs text-text-muted mt-0.5">{t("totalProcessed")}</div>
          </div>
        </div>

        {!loading && resolvedSavedCalls > 0 && (
          <div className="p-3 rounded-lg bg-surface/50">
            <div className="text-lg font-semibold tabular-nums">{resolvedSavedCalls}</div>
            <div className="text-xs text-text-muted mt-0.5">{t("savedCalls")}</div>
          </div>
        )}
      </div>
    </Card>
  );
}
