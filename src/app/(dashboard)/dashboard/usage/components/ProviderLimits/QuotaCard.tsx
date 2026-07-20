"use client";

import { useMemo, useState } from "react";
import Card from "@/shared/components/Card";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import {
  normalizePlanTier,
  resolvePlanValue,
  worstStatus,
  filterQuotasByVisibility,
  getHiddenQuotaRows,
  computeCanEditCutoff,
  computeCanRedeemResetCredit,
  hasQuotaCutoffOverrides,
  type CardStatus,
} from "./utils";
import QuotaCardHeader from "./parts/QuotaCardHeader";
import QuotaCardExpanded from "./parts/QuotaCardExpanded";
import ProviderUsdCostModal from "./ProviderUsdCostModal";

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
  onOpenResetCredits?: () => void;
  onToggleActive: (nextActive: boolean) => void;
  togglingActive: boolean;
  redeemingResetCredit?: boolean;
  loadingResetCredits?: boolean;
  /** Per-operator quota row visibility (upstream 9router#2371 port). */
  quotaVisibility?: Record<string, { hidden?: string[] }>;
  onHideQuota?: (quota: any) => void;
  onShowQuota?: (quota: any) => void;
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
  onOpenResetCredits,
  onToggleActive,
  togglingActive,
  redeemingResetCredit = false,
  loadingResetCredits = false,
  quotaVisibility,
  onHideQuota,
  onShowQuota,
}: QuotaCardProps) {
  const isActive = connection.isActive ?? true;
  const [costModalOpen, setCostModalOpen] = useState(false);
  const rawQuotas = quota?.quotas ?? EMPTY_QUOTAS;
  const quotas = useMemo(
    () => filterQuotasByVisibility(connection.provider, rawQuotas, quotaVisibility),
    [connection.provider, rawQuotas, quotaVisibility]
  );
  const hiddenQuotaRows = useMemo(
    () => getHiddenQuotaRows(connection.provider, rawQuotas, quotaVisibility),
    [connection.provider, rawQuotas, quotaVisibility]
  );
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
  const accountLabel = useMemo(
    () =>
      pickDisplayValue(
        [connection.name, connection.displayName, connection.email],
        emailsVisible,
        connection.provider
      ) ||
      connection.id ||
      connection.provider,
    [connection, emailsVisible]
  );

  const hasOverrides = hasQuotaCutoffOverrides(connection);
  const hasStaleData = !!quota?.stale;
  const displayRefreshedAt = quota?.stale?.since || refreshedAt;
  const canEditCutoff = computeCanEditCutoff(quotas);
  const canRedeemResetCredit = computeCanRedeemResetCredit(connection.provider, quotas);

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
        providerId={connection.provider}
        loading={loading}
        error={error}
        message={quota?.message ?? null}
        refreshedAt={displayRefreshedAt}
        hasStaleData={hasStaleData}
        onRefresh={onRefresh}
        onOpenCutoff={onOpenCutoff}
        onOpenCost={() => setCostModalOpen(true)}
        onOpenResetCredits={onOpenResetCredits}
        hiddenQuotaRows={hiddenQuotaRows}
        onHideQuota={onHideQuota}
        onShowQuota={onShowQuota}
        canEditCutoff={canEditCutoff}
        hasCutoffOverrides={hasOverrides}
        canRedeemResetCredit={canRedeemResetCredit}
        redeemingResetCredit={redeemingResetCredit}
        loadingResetCredits={loadingResetCredits}
      />
      <ProviderUsdCostModal
        isOpen={costModalOpen}
        onClose={() => setCostModalOpen(false)}
        connection={connection}
        providerLabel={providerLabel}
        accountLabel={accountLabel}
      />
    </Card>
  );
}
