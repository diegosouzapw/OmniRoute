"use client";

import { useMemo } from "react";
import Card from "@/shared/components/Card";
import { normalizePlanTier, resolvePlanValue, worstStatus, type CardStatus } from "./utils";
import QuotaCardHeader from "./parts/QuotaCardHeader";
import QuotaCardExpanded from "./parts/QuotaCardExpanded";

const STATUS_BORDER: Record<CardStatus, string> = {
  critical: "#ef4444",
  alert: "#eab308",
  ok: "#22c55e",
  empty: "transparent",
};

const EMPTY_QUOTAS: any[] = [];

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
  onRefresh: () => void;
  onOpenCutoff: () => void;
  onToggleActive: (nextActive: boolean) => void;
  togglingActive: boolean;
}

export default function QuotaCard({
  connection,
  quota,
  loading,
  error,
  refreshedAt,
  emailsVisible,
  providerLabel,
  onRefresh,
  onOpenCutoff,
  onToggleActive,
  togglingActive,
}: QuotaCardProps) {
  const isActive = connection.isActive ?? true;
  const quotas = quota?.quotas ?? EMPTY_QUOTAS;
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
      className={`flex flex-col overflow-hidden transition-opacity ${isActive ? "" : "opacity-60"}`}
      style={{ borderLeft: `3px solid ${STATUS_BORDER[cardStatus]}` }}
    >
      <QuotaCardHeader
        connection={connection}
        providerLabel={providerLabel}
        cardStatus={cardStatus}
        tierMeta={tierMeta}
        resolvedPlan={resolvedPlan}
        emailsVisible={emailsVisible}
        hasStaleData={hasStaleData}
        onToggleActive={onToggleActive}
        togglingActive={togglingActive}
      />
      <QuotaCardExpanded
        quotas={quotas}
        loading={loading}
        error={error}
        message={quota?.message ?? null}
        refreshedAt={displayRefreshedAt}
        hasStaleData={hasStaleData}
        onRefresh={onRefresh}
        onOpenCutoff={onOpenCutoff}
        canEditCutoff={canEditCutoff}
        hasCutoffOverrides={hasOverrides}
      />
    </Card>
  );
}
