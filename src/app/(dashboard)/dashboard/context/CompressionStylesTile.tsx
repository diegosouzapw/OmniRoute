"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

interface Summary {
  totalRuns: number;
  totalTokensSaved: number;
  runsWithStyles: number;
  bypassCount: number;
  totalOutputTokens: number;
  appliedStyleCounts: Record<string, number>;
}

const EMPTY: Summary = {
  totalRuns: 0,
  totalTokensSaved: 0,
  runsWithStyles: 0,
  bypassCount: 0,
  totalOutputTokens: 0,
  appliedStyleCounts: {},
};

export default function CompressionStylesTile() {
  const t = useTranslations("settings");
  const locale = useLocale();
  const [summary, setSummary] = useState<Summary>(EMPTY);

  useEffect(() => {
    fetch("/api/settings/compression/run-telemetry")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Summary | null) => {
        if (data) setSummary(data);
      })
      .catch(() => {});
  }, []);

  const styles = Object.entries(summary.appliedStyleCounts);

  return (
    <div
      data-testid="compression-styles-tile"
      className="rounded-lg border border-border/40 bg-surface p-4"
    >
      <p className="text-sm font-medium text-text-main">{t("compressionStylesTileTitle")}</p>
      <p className="mt-1 text-2xl font-semibold text-text-main">
        {summary.totalTokensSaved.toLocaleString(locale, { useGrouping: false })}
      </p>
      <p className="text-xs text-text-muted">
        {t("compressionStylesTileSummary", {
          tokens: summary.totalTokensSaved,
          runs: summary.runsWithStyles,
        })}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {styles.length === 0 ? (
          <span className="text-xs text-text-muted">{t("compressionStylesTileEmpty")}</span>
        ) : (
          styles.map(([id, count]) => (
            <span key={id} className="rounded bg-border/30 px-2 py-0.5 text-xs text-text-main">
              {id} · {count}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
