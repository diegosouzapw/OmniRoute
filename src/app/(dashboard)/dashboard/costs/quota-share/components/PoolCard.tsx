"use client";

import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import ProviderIcon from "@/shared/components/ProviderIcon";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { maskEmailLikeValue } from "@/shared/utils/maskEmail";
import type { QuotaPool } from "@/lib/quota/dimensions";
import type { PoolUsageSnapshot } from "@/lib/quota/types";
import DimensionBar from "./DimensionBar";
import AllocationTable from "./AllocationTable";
import BurnRateChart from "./BurnRateChart";
import StackedAllocationBar from "./StackedAllocationBar";
import AccountQuotaRow from "./AccountQuotaRow";
import UsageLogCard from "./UsageLogCard";

export interface PoolCardProps {
  pool: QuotaPool;
  usage: PoolUsageSnapshot | null;
  /** Map from apiKeyId to display name */
  keyLabels: Record<string, string>;
  /** Connection display label */
  connectionLabel: string;
  /** Primary provider identifier */
  provider: string;
  /** Optional list of all provider identifiers when pool has multiple connections */
  providers?: string[];
  /** Optional list of all connection IDs in this pool — passed to AccountQuotaRow */
  connectionIds?: string[];
  onEdit: () => void;
  onRemove: () => void;
}

function computeStatus(usage: PoolUsageSnapshot | null): "green" | "amber" | "red" {
  const dims = usage?.dimensions ?? [];
  if (dims.length === 0) return "green";
  const utilizations = dims.map((d) =>
    d.limit > 0 ? (d.consumedTotal / d.limit) * 100 : 0
  );
  const avg = utilizations.reduce((s, u) => s + u, 0) / utilizations.length;
  if (avg > 80) return "red";
  if (avg > 50) return "amber";
  return "green";
}

const STATUS_ICONS = {
  green: { icon: "check_circle", cls: "text-emerald-400" },
  amber: { icon: "warning", cls: "text-amber-400" },
  red: { icon: "error", cls: "text-red-400" },
};

export default function PoolCard({
  pool,
  usage,
  keyLabels,
  connectionLabel,
  provider,
  providers,
  connectionIds,
  onEdit,
  onRemove,
}: PoolCardProps) {
  const t = useTranslations("quotaShare");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const status = computeStatus(usage);
  const { icon: statusIcon, cls: statusCls } = STATUS_ICONS[status];

  const displayName = emailsVisible ? pool.name : maskEmailLikeValue(pool.name);
  const displayConnectionLabel = emailsVisible ? connectionLabel : maskEmailLikeValue(connectionLabel);

  // Check for plan dimensions from usage
  const hasDimensions = !!usage?.dimensions?.length;

  return (
    <Card padding="md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          {/* Provider icon(s): show one per provider when multi-connection, else single icon */}
          {providers && providers.length > 1 ? (
            <div className="flex items-center gap-0.5 shrink-0">
              {providers.slice(0, 3).map((p) => (
                <div
                  key={p}
                  className="w-5 h-5 rounded flex items-center justify-center overflow-hidden bg-bg-subtle"
                >
                  <ProviderIcon providerId={p} size={20} type="color" />
                </div>
              ))}
              {providers.length > 3 && (
                <span className="text-[10px] text-text-muted font-semibold ml-0.5">
                  +{providers.length - 3}
                </span>
              )}
            </div>
          ) : (
            <div className="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden shrink-0 bg-bg-subtle">
              <ProviderIcon providerId={provider} size={28} type="color" />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className={`material-symbols-outlined text-[16px] shrink-0 ${statusCls}`}>
                {statusIcon}
              </span>
              <span className="text-sm font-bold text-text-main truncate">
                {displayName} · {displayConnectionLabel}
              </span>
            </div>
            <div className="text-[11px] text-text-muted">
              {t("allocationsCount", { count: pool.allocations.length })} · ID: {pool.id.slice(0, 12)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            title={t("editAllocations")}
            className="p-1.5 rounded-md hover:bg-bg-subtle text-text-muted hover:text-text-main cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>
          <button
            type="button"
            onClick={onRemove}
            title={t("removePool")}
            className="p-1.5 rounded-md hover:bg-red-500/10 text-text-muted hover:text-red-400 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>

      {/* Dimensions side-by-side */}
      {hasDimensions ? (
        <div
          className="grid gap-3 mb-3"
          style={{
            gridTemplateColumns: `repeat(${Math.min(usage?.dimensions?.length ?? 0, 3)}, 1fr)`,
          }}
        >
          {(usage?.dimensions ?? []).map((dim, i) => (
            <DimensionBar
              key={`${dim.unit}-${dim.window}-${i}`}
              dimension={{ unit: dim.unit, window: dim.window, limit: dim.limit }}
              consumedTotal={dim.consumedTotal}
            />
          ))}
        </div>
      ) : (
        <div className="text-[11px] text-text-muted italic mb-3">
          {t("multiDimensionLabel")} — {t("loading")}
        </div>
      )}

      {/* Stacked allocation bar — per-key slices */}
      <StackedAllocationBar
        allocations={pool.allocations}
        usage={usage}
        keyLabels={keyLabels}
      />

      {/* Allocation table */}
      <div className="mb-3">
        <h4 className="text-[10px] uppercase tracking-wide font-bold text-text-muted mb-1.5">
          Allocations
        </h4>
        <AllocationTable
          allocations={pool.allocations}
          usage={usage}
          keyLabels={keyLabels}
        />
      </div>

      {/* Account quota row — read-only upstream quota per connection */}
      <AccountQuotaRow
        provider={provider}
        providers={providers}
        connectionIds={connectionIds}
      />

      {/* Burn rate chart */}
      {usage && (
        <div className="pt-2 border-t border-border/30">
          <BurnRateChart usage={usage} />
        </div>
      )}

      {/* Usage log — collapsible, collapsed by default */}
      <UsageLogCard poolId={pool.id} keyLabels={keyLabels} />
    </Card>
  );
}
