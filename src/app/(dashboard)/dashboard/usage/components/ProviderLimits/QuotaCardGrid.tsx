"use client";

import type { ReactNode } from "react";
import QuotaCard from "./QuotaCard";

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
}: Props) {
  if (connections.length === 0) return null;

  // Group connections by provider, preserving the order from sortedConnections.
  const groups = new Map<string, typeof connections>();
  for (const conn of connections) {
    const list = groups.get(conn.provider) ?? [];
    list.push(conn);
    groups.set(conn.provider, list);
  }

  return (
    <div className="columns-1 2xl:columns-2 gap-6 [column-fill:_balance]">
      {[...groups.entries()].map(([provider, conns]) => (
        <div key={provider} className="flex flex-col gap-3 break-inside-avoid mb-6">
          <h3 className="text-sm font-semibold text-text-main flex items-center gap-2">
            {providerLabels[provider] || provider}
            <span className="text-xs font-normal text-text-muted">
              ({conns.length} account{conns.length !== 1 ? "s" : ""})
            </span>
          </h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3">
            {conns.map((conn) => (
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
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
