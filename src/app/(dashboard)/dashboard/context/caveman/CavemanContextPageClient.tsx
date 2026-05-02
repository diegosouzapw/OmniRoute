"use client";

import { useEffect, useState } from "react";
import CompressionSettingsTab from "@/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab";

type AnalyticsSummary = {
  totalRequests: number;
  totalTokensSaved: number;
  avgSavingsPct: number;
  avgDurationMs: number;
  byEngine?: Record<string, { count: number; tokensSaved: number; avgSavingsPct: number }>;
};

export default function CavemanContextPageClient() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    fetch("/api/context/analytics?since=7d")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setAnalytics(data))
      .catch(() => setAnalytics(null));
  }, []);

  const cavemanStats = analytics?.byEngine?.caveman ?? analytics?.byEngine?.standard;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[30px] text-primary">compress</span>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Caveman Engine</h1>
            <p className="text-sm text-text-muted">
              Rule-based message compression, preservation and output mode controls.
            </p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        {[
          ["Requests", cavemanStats?.count ?? analytics?.totalRequests ?? 0],
          ["Tokens saved", cavemanStats?.tokensSaved ?? analytics?.totalTokensSaved ?? 0],
          ["Avg savings", `${cavemanStats?.avgSavingsPct ?? analytics?.avgSavingsPct ?? 0}%`],
          ["Avg latency", `${analytics?.avgDurationMs ?? 0}ms`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs uppercase text-text-muted">{label}</p>
            <p className="mt-1 text-xl font-semibold text-text-main">{value}</p>
          </div>
        ))}
      </section>

      <CompressionSettingsTab />
    </div>
  );
}
