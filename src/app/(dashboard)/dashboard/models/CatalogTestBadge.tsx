"use client";

import { Badge } from "@/shared/components";
import type { CatalogTestResult } from "./catalogTestStorage";

function formatLatency(ms?: number): string {
  if (typeof ms !== "number" || Number.isNaN(ms)) return "";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatTimeAgo(timestamp?: number): string {
  if (!timestamp) return "";
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return new Date(timestamp).toLocaleDateString();
}

export default function CatalogTestBadge({
  result,
  loading = false,
}: {
  result?: CatalogTestResult;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-text-muted">
        <span
          className="inline-block size-3 animate-spin rounded-full border-2 border-primary border-t-transparent"
          aria-hidden="true"
        />
        <span>Testing...</span>
      </div>
    );
  }

  if (!result) {
    return (
      <span className="text-xs text-text-muted/60" title="Untested">
        —
      </span>
    );
  }

  const variant =
    result.status === "ok" ? "success" : result.status === "slow" ? "warning" : "error";

  const label =
    result.status === "ok"
      ? "OK"
      : result.status === "slow"
        ? "Slow"
        : result.errorClass
          ? result.errorClass.replace("-", " ")
          : "Error";

  const latencyStr = formatLatency(result.latencyMs);
  const timeStr = formatTimeAgo(result.testedAt);

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
