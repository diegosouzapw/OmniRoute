"use client";

import { useTranslations } from "next-intl";
import type { QuotaRefreshState } from "../hooks/providerQuotaRefresh";

interface Props {
  refreshing?: boolean;
  state?: QuotaRefreshState;
  onRefresh: () => void;
}

const statusKeys = {
  loading: "quotaRefreshing",
  fresh: "quotaRefreshFresh",
  partial: "quotaRefreshPartial",
  stale: "quotaRefreshStale",
  error: "quotaRefreshFailed",
} as const;

/** One explicit read action. Availability and recovery remain server decisions. */
export default function ConnectionQuotaRefreshButton({ refreshing, state, onRefresh }: Props) {
  const t = useTranslations("providers");
  return (
    <span className="inline-flex flex-wrap items-center gap-1 text-xs">
      <button
        type="button"
        onClick={onRefresh}
        disabled={refreshing}
        aria-busy={!!refreshing}
        title={t("quotaRefreshCurrentHint")}
        className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-text-muted hover:text-primary disabled:cursor-wait disabled:opacity-60"
      >
        <span
          aria-hidden="true"
          className={`material-symbols-outlined text-[13px] ${refreshing ? "animate-spin" : ""}`}
        >
          refresh
        </span>
        {t(refreshing ? "quotaRefreshing" : "quotaRefreshCurrent")}
      </button>
      {state && (
        <span role="status" aria-live="polite" className="text-text-muted">
          {t(statusKeys[state.status])}
          {state.missingWindows?.map((window) => (
            <span key={window}>
              {" "}
              {t("quotaWindowUnavailable", { window: window === "session" ? "5h" : "7d" })}.
            </span>
          ))}
          {state.connectionsRefreshFailed && <span> {t("quotaConnectionRefreshFailed")}</span>}
        </span>
      )}
    </span>
  );
}
