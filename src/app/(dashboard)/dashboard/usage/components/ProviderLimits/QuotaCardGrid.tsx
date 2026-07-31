"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { PROVIDER_ORDER } from "./constants";
import QuotaCard from "./QuotaCard";
import { worstStatus, type CardStatus } from "./utils";

interface Props {
  connections: any[];
  quotaData: Record<string, any>;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
  lastRefreshedAt: Record<string, string | undefined>;
  emailsVisible: boolean;
  providerLabels: Record<string, string>;
  renderInlineQuotaSummary?: (quota: any) => ReactNode;
  onRefresh: (id: string, provider: string) => void;
  onOpenCutoff: (connection: any) => void;
  onOpenResetCredits?: (id: string, provider: string) => void;
  onToggleActive: (id: string, nextActive: boolean) => void;
  togglingActiveId: string | null;
  redeemingResetCreditId?: string | null;
  loadingResetCreditsId?: string | null;
  /** Per-operator quota row visibility (upstream 9router#2371 port). */
  quotaVisibility?: Record<string, { hidden?: string[] }>;
  onHideQuota?: (provider: string, quota: any) => void;
  onShowQuota?: (provider: string, quota: any) => void;
}

const STATUS_RANK: Record<CardStatus, number> = {
  critical: 0,
  alert: 1,
  ok: 2,
  empty: 3,
};

function getSoonestResetMs(quotas: any[] | undefined): number {
  if (!Array.isArray(quotas) || quotas.length === 0) return Number.POSITIVE_INFINITY;
  const now = Date.now();
  let soonest = Number.POSITIVE_INFINITY;
  for (const quota of quotas) {
    if (!quota?.resetAt) continue;
    const ts = new Date(quota.resetAt).getTime();
    if (Number.isFinite(ts) && ts > now && ts < soonest) soonest = ts;
  }
  return soonest;
}

function getRemainingPercentage(quota: any): number {
  if (quota?.unlimited) return 100;
  if (typeof quota?.remainingPercentage === "number") return quota.remainingPercentage;
  if (typeof quota?.total === "number" && quota.total > 0) {
    const used = typeof quota.used === "number" ? quota.used : 0;
    return Math.max(0, Math.min(100, Math.round(((quota.total - used) / quota.total) * 100)));
  }
  return 100;
}

function getLowestRemainingPercentage(quotas: any[] | undefined): number {
  if (!Array.isArray(quotas) || quotas.length === 0) return 100;
  let lowest = 100;
  for (const quota of quotas) {
    lowest = Math.min(lowest, getRemainingPercentage(quota));
  }
  return lowest;
}

function hasUsableQuota(quotas: any[] | undefined): boolean {
  if (!Array.isArray(quotas) || quotas.length === 0) return true;
  return quotas.some((quota) => quota?.unlimited || getRemainingPercentage(quota) > 0);
}

function getConnectionLabel(connection: any): string {
  return String(
    connection.name || connection.displayName || connection.email || connection.id || ""
  );
}

export function sortProviderConnectionsByPriority(
  connections: any[],
  quotaData: Record<string, any>
) {
  return [...connections].sort((a, b) => {
    const aActive = a.isActive ?? true;
    const bActive = b.isActive ?? true;
    if (aActive !== bActive) return aActive ? -1 : 1;

    const aQuotas = quotaData[a.id]?.quotas;
    const bQuotas = quotaData[b.id]?.quotas;
    const aUsable = hasUsableQuota(aQuotas);
    const bUsable = hasUsableQuota(bQuotas);
    if (aUsable !== bUsable) return aUsable ? -1 : 1;

    const statusDiff = STATUS_RANK[worstStatus(aQuotas)] - STATUS_RANK[worstStatus(bQuotas)];
    if (statusDiff !== 0) return statusDiff;

    const resetDiff = getSoonestResetMs(aQuotas) - getSoonestResetMs(bQuotas);
    if (resetDiff !== 0) return resetDiff;

    const remainingDiff =
      getLowestRemainingPercentage(aQuotas) - getLowestRemainingPercentage(bQuotas);
    if (remainingDiff !== 0) return remainingDiff;

    return getConnectionLabel(a).localeCompare(getConnectionLabel(b));
  });
}

function buildProviderGroups(
  connections: any[],
  quotaData: Record<string, any>,
  providerLabels: Record<string, string>
) {
  const groups = new Map<string, typeof connections>();
  for (const conn of connections) {
    const list = groups.get(conn.provider) ?? [];
    list.push(conn);
    groups.set(conn.provider, list);
  }

  return [...groups.entries()]
    .map(([provider, conns]) => ({
      provider,
      connections: sortProviderConnectionsByPriority(conns, quotaData),
    }))
    .sort((a, b) => {
      const orderDiff = (PROVIDER_ORDER[a.provider] || 99) - (PROVIDER_ORDER[b.provider] || 99);
      if (orderDiff !== 0) return orderDiff;
      return (providerLabels[a.provider] || a.provider).localeCompare(
        providerLabels[b.provider] || b.provider
      );
    });
}

interface ProviderQuotaSectionProps extends Omit<Props, "connections"> {
  provider: string;
  connections: any[];
  defaultOpen?: boolean;
}

function ProviderQuotaSection({
  provider,
  connections,
  defaultOpen = true,
  quotaData,
  loading,
  errors,
  lastRefreshedAt,
  emailsVisible,
  providerLabels,
  onRefresh,
  onOpenCutoff,
  onOpenResetCredits,
  onToggleActive,
  togglingActiveId,
  redeemingResetCreditId = null,
  loadingResetCreditsId = null,
  quotaVisibility,
  onHideQuota,
  onShowQuota,
}: ProviderQuotaSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const activeCount = connections.filter((conn) => conn.isActive ?? true).length;
  const providerLabel = providerLabels[provider] || provider;

  return (
    <details
      open={open}
      onToggle={(event) => setOpen((event.target as HTMLDetailsElement).open)}
      className="rounded-lg border border-border bg-surface overflow-hidden"
    >
      <summary className="flex items-center gap-3 px-3 py-2.5 cursor-pointer select-none hover:bg-white/[0.03] [&::-webkit-details-marker]:hidden">
        <span className="material-symbols-outlined text-[16px] text-text-muted">
          {open ? "expand_less" : "expand_more"}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-text-main leading-5 truncate">
            {providerLabel}
          </h3>
          <p className="text-[11px] text-text-muted tabular-nums">
            {activeCount} active / {connections.length} account
            {connections.length !== 1 ? "s" : ""}
          </p>
        </div>
      </summary>
      <div className="px-3 pb-3">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3">
          {connections.map((conn) => (
            <QuotaCard
              key={conn.id}
              connection={conn}
              quota={quotaData[conn.id]}
              loading={!!loading[conn.id]}
              error={errors[conn.id] || null}
              refreshedAt={lastRefreshedAt[conn.id]}
              emailsVisible={emailsVisible}
              providerLabel={providerLabels[conn.provider] || conn.provider}
              onRefresh={() => onRefresh(conn.id, conn.provider)}
              onOpenCutoff={() => onOpenCutoff(conn)}
              onOpenResetCredits={() => onOpenResetCredits?.(conn.id, conn.provider)}
              onToggleActive={(nextActive) => onToggleActive(conn.id, nextActive)}
              togglingActive={togglingActiveId === conn.id}
              redeemingResetCredit={redeemingResetCreditId === conn.id}
              loadingResetCredits={loadingResetCreditsId === conn.id}
              quotaVisibility={quotaVisibility}
              onHideQuota={onHideQuota ? (q) => onHideQuota(conn.provider, q) : undefined}
              onShowQuota={onShowQuota ? (q) => onShowQuota(conn.provider, q) : undefined}
            />
          ))}
        </div>
      </div>
    </details>
  );
}

export default function QuotaCardGrid({
  connections,
  quotaData,
  loading,
  errors,
  lastRefreshedAt,
  emailsVisible,
  providerLabels,
  renderInlineQuotaSummary: _renderInlineQuotaSummary,
  onRefresh,
  onOpenCutoff,
  onOpenResetCredits,
  onToggleActive,
  togglingActiveId,
  redeemingResetCreditId = null,
  loadingResetCreditsId = null,
  quotaVisibility,
  onHideQuota,
  onShowQuota,
}: Props) {
  if (connections.length === 0) return null;

  const groups = buildProviderGroups(connections, quotaData, providerLabels);

  return (
    <div className="space-y-4">
      {groups.map(({ provider, connections: conns }) => (
        <ProviderQuotaSection
          key={provider}
          provider={provider}
          connections={conns}
          quotaData={quotaData}
          loading={loading}
          errors={errors}
          lastRefreshedAt={lastRefreshedAt}
          emailsVisible={emailsVisible}
          providerLabels={providerLabels}
          onRefresh={onRefresh}
          onOpenCutoff={onOpenCutoff}
          onOpenResetCredits={onOpenResetCredits}
          onToggleActive={onToggleActive}
          togglingActiveId={togglingActiveId}
          quotaVisibility={quotaVisibility}
          onHideQuota={onHideQuota}
          onShowQuota={onShowQuota}
          redeemingResetCreditId={redeemingResetCreditId}
          loadingResetCreditsId={loadingResetCreditsId}
          defaultOpen
        />
      ))}
    </div>
  );
}
