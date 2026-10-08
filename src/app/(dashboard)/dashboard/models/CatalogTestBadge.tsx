"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/shared/components";
import type { CatalogTestResult } from "./catalogTestStorage";

type TestAge =
  | { unit: "justNow" }
  | { unit: "minutes"; count: number }
  | { unit: "hours"; count: number }
  | { unit: "date" };

function formatLatency(ms?: number): string {
  if (typeof ms !== "number" || Number.isNaN(ms)) return "";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatAbsoluteTime(timestamp: number): string {
  try {
    return new Date(timestamp).toLocaleString([], {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return "";
  }
}

/** Results are loaded after mount, so this only ever runs in the browser. */
function testAge(testedAt: number, now = Date.now()): TestAge {
  const minutes = Math.floor(Math.max(0, now - testedAt) / 60_000);
  if (minutes < 1) return { unit: "justNow" };
  if (minutes < 60) return { unit: "minutes", count: minutes };
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return { unit: "hours", count: hours };
  return { unit: "date" };
}

function TestingIndicator() {
  const t = useTranslations("modelCatalog");
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

function UntestedMark() {
  const t = useTranslations("modelCatalog");
  return (
    <span className="text-xs text-text-muted/60" title={t("untested")}>
      —
    </span>
  );
}

function TestResultSummary({ result }: { result: CatalogTestResult }) {
  const t = useTranslations("modelCatalog");

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

  // Sanitized API text when the server sent one, otherwise a translated fallback.
  const getErrorDetail = () => {
    if (result.status !== "error") return undefined;
    if (result.error) return result.error;
    if (typeof result.statusCode === "number" && result.statusCode >= 400) {
      return t("httpError", { status: result.statusCode });
    }
    return t("testFailedNoDetail");
  };

  const label = getLabel();
  const errorDetail = getErrorDetail();
  const latencyStr = formatLatency(result.latencyMs);
  const hasTime = typeof result.testedAt === "number" && result.testedAt > 0;
  const absoluteTime = hasTime ? formatAbsoluteTime(result.testedAt) : "";

  const getAgeLabel = () => {
    if (!hasTime) return "";
    const age = testAge(result.testedAt);
    if (age.unit === "justNow") return t("justNow");
    if (age.unit === "minutes") return t("minutesAgo", { count: age.count });
    if (age.unit === "hours") return t("hoursAgo", { count: age.count });
    return absoluteTime;
  };
  const ageLabel = getAgeLabel();

  return (
    <div
      className="inline-flex flex-col gap-0.5"
      title={errorDetail ?? `${label}${latencyStr ? ` (${latencyStr})` : ""}`}
    >
      <div className="flex items-center gap-1.5">
        <Badge variant={variant} size="sm" dot>
          {label}
        </Badge>
        {latencyStr && (
          <span className="font-mono text-[11px] tabular-nums text-text-main">{latencyStr}</span>
        )}
      </div>
      {ageLabel && (
        <time
          dateTime={new Date(result.testedAt).toISOString()}
          title={absoluteTime}
          className="text-[10px] text-text-muted/80"
        >
          {ageLabel}
        </time>
      )}
      {errorDetail && <span className="sr-only">{t("errorDetail", { detail: errorDetail })}</span>}
    </div>
  );
}

export default function CatalogTestBadge({
  result,
  loading = false,
}: {
  result?: CatalogTestResult;
  loading?: boolean;
}) {
  if (loading) {
    return <TestingIndicator />;
  }

  if (!result) {
    return <UntestedMark />;
  }

  return <TestResultSummary result={result} />;
}
