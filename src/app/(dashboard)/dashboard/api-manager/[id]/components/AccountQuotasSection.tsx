"use client";

import { useLocale, useTranslations } from "next-intl";
import { getProviderDisplayName } from "@/lib/display/names";
import type { AccountQuotaView } from "../apiKeyDetailsData";
import {
  DetailsSection,
  EmptyNote,
  StatusBadge,
  UtilizationBar,
  formatDateTime,
} from "./DetailsPrimitives";

const UNAVAILABLE_KEYS: Record<string, string> = {
  not_supported: "quotaUnavailableNotSupported",
  not_available: "quotaUnavailableNoData",
  fetch_failed: "quotaUnavailableFetchFailed",
  connection_lookup_failed: "quotaUnavailableLookupFailed",
};

function humanizeWindowName(name: string): string {
  return name.replace(/[_-]+/g, " ").trim() || name;
}

function AccountQuotaCard({ quota }: { quota: AccountQuotaView }) {
  const t = useTranslations("apiKeyDetails");
  const locale = useLocale();
  const fetchedAt = formatDateTime(quota.fetchedAt, locale);
  return (
    <li className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-surface/40 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="break-words text-sm font-semibold text-text-main">{quota.label}</h3>
          <p className="text-xs text-text-muted">{getProviderDisplayName(quota.provider)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {quota.plan && <StatusBadge icon="workspace_premium">{quota.plan}</StatusBadge>}
          {quota.stale && (
            <StatusBadge tone="warn" icon="history">
              {t("quotaStale")}
            </StatusBadge>
          )}
        </div>
      </div>

      {quota.unavailableReason && (
        <p className="rounded-md bg-black/5 px-2 py-1.5 text-xs text-text-muted dark:bg-white/5">
          {t(UNAVAILABLE_KEYS[quota.unavailableReason] ?? "quotaUnavailableGeneric")}
        </p>
      )}

      {quota.quotas.length > 0 && (
        <ul className="flex flex-col gap-2">
          {quota.quotas.map((window) => {
            const name = humanizeWindowName(window.name);
            const used = window.usedPercentage === null ? null : Math.round(window.usedPercentage);
            const resetAt = formatDateTime(window.resetAt, locale);
            return (
              <li key={window.name} className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-medium capitalize text-text-main">{name}</span>
                  <span className="tabular-nums text-text-muted">
                    {used === null
                      ? t("quotaUsedUnknown")
                      : t("quotaUsedPercent", { percent: used })}
                  </span>
                </div>
                {used !== null && (
                  <UtilizationBar
                    value={used / 100}
                    label={t("utilizationAria", { name: `${quota.label} ${name}`, percent: used })}
                  />
                )}
                {resetAt && (
                  <span className="text-[11px] text-text-muted" title={window.resetAt ?? undefined}>
                    {t("resetsAt", { date: resetAt })}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-[11px] text-text-muted" title={quota.fetchedAt ?? undefined}>
        {fetchedAt ? t("quotaFetchedAt", { date: fetchedAt }) : t("quotaNeverFetched")}
      </p>
    </li>
  );
}

/**
 * Admin preview of the shared upstream account quota this key exposes, already
 * filtered by the key's shared-provider setting. Rendered even while the key holder
 * cannot see it (visibility off) so the operator can check before enabling it.
 */
export function AccountQuotasSection({
  quotas,
  visibleToKeyHolder,
}: {
  quotas: AccountQuotaView[];
  visibleToKeyHolder: boolean;
}) {
  const t = useTranslations("apiKeyDetails");
  return (
    <DetailsSection
      title={t("accountQuotasTitle")}
      description={t("accountQuotasDesc")}
      icon="account_balance"
    >
      {!visibleToKeyHolder && (
        <p className="mb-3 text-xs text-amber-700 dark:text-amber-300">
          {t("accountQuotasPreviewOnly")}
        </p>
      )}
      {quotas.length === 0 ? (
        <EmptyNote>{t("accountQuotasEmpty")}</EmptyNote>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {quotas.map((quota) => (
            <AccountQuotaCard key={`${quota.provider}:${quota.connectionId}`} quota={quota} />
          ))}
        </ul>
      )}
    </DetailsSection>
  );
}
