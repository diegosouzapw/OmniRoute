"use client";

import { useEffect, useState } from "react";
import { Card } from "@/shared/components";

interface DiversityProviderStat {
  share: number;
}

interface DiversityReport {
  score: number;
  providers: Record<string, DiversityProviderStat>;
  windowSize: number;
  ttlMs: number;
}

export default function DiversityScoreCard() {
  const [data, setData] = useState<DiversityReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDiversity() {
      try {
        const res = await fetch("/api/analytics/diversity");
        if (!res.ok) {
          throw new Error(`Failed to fetch diversity analytics: ${res.status}`);
        }

        const json = (await res.json()) as DiversityReport;
        if (!cancelled) {
          setData(json);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadDiversity();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || !data) {
    return (
      <Card className="p-5 flex flex-col justify-center items-center min-h-[220px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </Card>
    );
  }

  const scorePercentage = Math.round((data.score || 0) * 100);

  let riskColor = "text-green-500";
  let gaugeColor = "bg-green-500";
  let riskLabel = "Healthy Distribution";

  if (scorePercentage < 40) {
    riskColor = "text-red-500";
    gaugeColor = "bg-red-500";
    riskLabel = "High Vendor Lock-in Risk";
  } else if (scorePercentage < 70) {
    riskColor = "text-amber-500";
    gaugeColor = "bg-amber-500";
    riskLabel = "Moderate Distribution";
  }

  return (
    <Card className="p-5 flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">pie_chart</span>
            <h3 className="font-semibold text-text-main">Provider Diversity</h3>
          </div>
          <p className="text-sm text-text-muted mt-1">
            Provider concentration snapshot for the recent traffic window.
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            scorePercentage < 40
              ? "bg-red-500/10 text-red-500"
              : scorePercentage < 70
                ? "bg-amber-500/10 text-amber-500"
                : "bg-green-500/10 text-green-500"
          }`}
        >
          Shannon entropy
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-[112px_minmax(0,1fr)] sm:items-center">
        <div className="relative mx-auto h-28 w-28">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-border/70"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={riskColor}
              strokeWidth="3.5"
              strokeDasharray={`${scorePercentage}, 100`}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-semibold tabular-nums ${riskColor}`}>
              {scorePercentage}%
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-text-muted">score</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border/30 bg-surface/20 px-4 py-3">
            <div className={`text-sm font-medium ${riskColor}`}>{riskLabel}</div>
            <div className="text-xs text-text-muted mt-1">
              Higher values indicate traffic is spread across multiple providers instead of
              clustering on one vendor.
            </div>
          </div>

          {Object.keys(data.providers || {}).length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/50 px-4 py-5 text-sm text-text-muted">
              No recent usage data available.
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(data.providers)
                .sort(([, a], [, b]) => b.share - a.share)
                .slice(0, 4)
                .map(([provider, stat]) => (
                  <div key={provider} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-text-main capitalize">{provider}</span>
                      <span className="tabular-nums text-text-muted">
                        {Math.round(stat.share * 100)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-surface/50 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${gaugeColor}`}
                        style={{ width: `${Math.round(stat.share * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-border/30 pt-4 text-xs text-text-muted">
        <div className="rounded-lg bg-surface/20 px-3 py-2">Window: {data.windowSize} reqs</div>
        <div className="rounded-lg bg-surface/20 px-3 py-2 text-right">
          Based on last {Math.round(data.ttlMs / 60000)} mins
        </div>
      </div>
    </Card>
  );
}
