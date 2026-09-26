"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/shared/components";
import type { CatalogTestResult } from "./catalogTestStorage";

function formatLatency(ms?: number): string {
  if (typeof ms !== "number" || Number.isNaN(ms)) return "";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatTestTime(timestamp?: number): string {
  if (!timestamp) return "";
  try {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function CatalogTestBadge({
  result,
  loading = false,
}: {
  result?: CatalogTestResult;
  loading?: boolean;
}) {
  const t = useTranslations("modelCatalog");

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-text-muted">
        <span
          className="inline-block size-3 animate-spin rounded-full border-2 border-primary border-t-transparent"
          aria-hidden="true"
        />
        <span>{t("testing")}</span>
      </div>
    );
  }

  if (!result) {
    return (
      <span className="text-xs text-text-muted/60" title={t("untested")}>
        —
      </span>
    );
  }

  const variant =
    result.status === "ok" ? "success" : result.status === "slow" ? "warning" : "error";

  const getLabel = () => {
    if (result.status === "ok") return t("statusOk");
    if (result.status === "slow") return t("statusSlow");
    if (result.errorClass === "rate-limited") return t("rateLimited");
    if (result.errorClass === "quota") return t("quotaExceeded");
    if (result.errorClass === "timeout") return t("timeout");
    return t("otherError");
  };

  const label = getLabel();
  const latencyStr = formatLatency(result.latencyMs);
  const timeStr = formatTestTime(result.testedAt);

  return (
    <div
      className="inline-flex flex-col gap-0.5"
      title={result.error ? result.error : `${label}${latencyStr ? ` (${latencyStr})` : ""}`}
    >
      <div className="flex items-center gap-1.5">
        <Badge variant={variant} size="sm" dot>
          {label}
        </Badge>
        {latencyStr && (
          <span className="font-mono text-[11px] tabular-nums text-text-main">{latencyStr}</span>
        )}
      </div>
      {timeStr && <span className="text-[10px] text-text-muted/80">{timeStr}</span>}
    </div>
  );
}
