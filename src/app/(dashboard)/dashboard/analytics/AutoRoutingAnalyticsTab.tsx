"use client";

import { useEffect, useState } from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";

interface AutoRoutingStats {
  totalRequests: number;
  variantBreakdown: Record<string, number>;
  avgSelectionScore: number;
  topProviders: Array<{ provider: string; count: number }>;
  explorationRate: number;
  lkgpHitRate: number;
}

export default function AutoRoutingAnalyticsTab() {
  const [stats, setStats] = useState<AutoRoutingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("analytics");

  useEffect(() => {
    fetch("/api/analytics/auto-routing")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-border rounded w-1/4"></div>
          <div className="h-20 bg-border rounded"></div>
        </div>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card>
        <div className="text-center py-8 text-text-muted">
          No auto-routing analytics available. Make requests using the auto/ prefix to see metrics.
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <div>
              <p className="text-sm text-text-muted">Total Auto Requests</p>
              <p className="text-2xl font-bold">{stats.totalRequests.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
              <span className="material-symbols-outlined text-[20px]">target</span>
            </div>
            <div>
              <p className="text-sm text-text-muted">Avg Selection Score</p>
              <p className="text-2xl font-bold">{(stats.avgSelectionScore * 100).toFixed(1)}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <span className="material-symbols-outlined text-[20px]">explore</span>
            </div>
            <div>
              <p className="text-sm text-text-muted">Exploration Rate</p>
              <p className="text-2xl font-bold">{(stats.explorationRate * 100).toFixed(1)}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <span className="material-symbols-outlined text-[20px]">history</span>
            </div>
            <div>
              <p className="text-sm text-text-muted">LKGP Hit Rate</p>
              <p className="text-2xl font-bold">{(stats.lkgpHitRate * 100).toFixed(1)}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Variant Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Requests by Variant</h3>
        <div className="space-y-3">
          {Object.entries(stats.variantBreakdown).map(([variant, count]) => {
            const percentage = stats.totalRequests > 0 ? (count / stats.totalRequests) * 100 : 0;
            return (
              <div key={variant} className="flex items-center gap-3">
                <div className="w-32 text-sm font-medium capitalize">{variant || "default"}</div>
                <div className="flex-1 h-3 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-20 text-sm text-text-muted text-right">
                  {count.toLocaleString()} ({percentage.toFixed(1)}%)
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Top Providers */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Routed Providers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-medium">Provider</th>
                <th className="text-right py-2 px-3 font-medium">Requests</th>
                <th className="text-right py-2 px-3 font-medium">Share</th>
              </tr>
            </thead>
            <tbody>
              {stats.topProviders.map((provider, index) => {
                const percentage =
                  stats.totalRequests > 0 ? (provider.count / stats.totalRequests) * 100 : 0;
                return (
                  <tr key={provider.provider} className="border-b border-border/50">
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-text-muted">#{index + 1}</span>
                        <span className="font-medium">{provider.provider}</span>
                      </div>
                    </td>
                    <td className="text-right py-2 px-3">{provider.count.toLocaleString()}</td>
                    <td className="text-right py-2 px-3 text-text-muted">
                      {percentage.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
