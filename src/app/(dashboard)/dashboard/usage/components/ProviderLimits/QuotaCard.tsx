"use client";

import { useMemo } from "react";
import Card from "@/shared/components/Card";
import { normalizePlanTier, resolvePlanValue, worstStatus, type CardStatus } from "./utils";
import QuotaCardHeader from "./parts/QuotaCardHeader";
import QuotaCardBody from "./parts/QuotaCardBody";
import QuotaCardExpanded from "./parts/QuotaCardExpanded";

const STATUS_BORDER: Record<CardStatus, string> = {
  critical: "#ef4444",
  alert: "#eab308",
  ok: "#22c55e",
  empty: "transparent",
};

interface QuotaCardProps {
  connection: any;
  quota:
    | {
        quotas?: any[];
        plan?: string | null;
        message?: string | null;
        stale?: { since?: string; reason?: string } | null;
      }
    | undefined;
  loading: boolean;
  error: string | null;
  refreshedAt?: string;
  emailsVisible: boolean;
  providerLabel: string;
  expanded: boolean;
  onToggle: () => void;
  onRefresh: () => void;
  onOpenCutoff: () => void;
}

export default function QuotaCard({
  connection,
  quota,
  loading,
  error,
  refreshedAt,
  emailsVisible,
  providerLabel,
  expanded,
  onToggle,
  onRefresh,
  onOpenCutoff,
}: QuotaCardProps) {
  const quotas = quota?.quotas ?? [];
  const cardStatus = useMemo<CardStatus>(() => worstStatus(quotas), [quotas]);
  const tierMeta = useMemo(
    () =>
      normalizePlanTier(
        resolvePlanValue(quota?.plan ?? null, connection.providerSpecificData ?? null)
      ),
    [quota?.plan, connection.providerSpecificData]
  );
  const resolvedPlan = useMemo(
    () => resolvePlanValue(quota?.plan ?? null, connection.providerSpecificData ?? null),
    [quota?.plan, connection.providerSpecificData]
  );

  const overrides = (connection.quotaWindowThresholds as Record<string, number> | null) || null;
  const hasOverrides = !!overrides && Object.keys(overrides).length > 0;
  const hasStaleData = !!quota?.stale;
  const displayRefreshedAt = quota?.stale?.since || refreshedAt;
  const canEditCutoff = quotas.some((q: any) => q && typeof q.name === "string" && !q.isCredits);

  return (
    <Card
      padding="none"
      className="flex flex-col overflow-hidden cursor-pointer transition-colors hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
      style={{ borderLeft: `3px solid ${STATUS_BORDER[cardStatus]}` }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="text-left w-full"
      >
        <QuotaCardHeader
          connection={connection}
          providerLabel={providerLabel}
          cardStatus={cardStatus}
          tierMeta={tierMeta}
          resolvedPlan={resolvedPlan}
          emailsVisible={emailsVisible}
          hasStaleData={hasStaleData}
          refreshing={loading}
          onRefresh={onRefresh}
          onOpenCutoff={onOpenCutoff}
          hasCutoffOverrides={hasOverrides}
        />
        <QuotaCardBody
          quotas={quotas}
          loading={loading}
          error={error}
          message={quota?.message ?? null}
        />
        <div className="flex items-center justify-end px-3 pb-1.5">
          <span className="material-symbols-outlined text-[14px] text-text-muted">
            {expanded ? "expand_less" : "expand_more"}
          </span>
        </div>
      </button>

      {expanded && (
        <QuotaCardExpanded
          quotas={quotas}
          loading={loading}
          error={error}
          refreshedAt={displayRefreshedAt}
          hasStaleData={hasStaleData}
          onRefresh={onRefresh}
          onOpenCutoff={onOpenCutoff}
          canEditCutoff={canEditCutoff}
        />
      )}
    </Card>
  );
}
