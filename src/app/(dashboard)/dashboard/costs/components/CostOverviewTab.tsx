"use client";

import { useState, useEffect } from "react";
import { Card } from "@/shared/components";
import { useTranslations, useLocale } from "next-intl";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"];

export default function CostOverviewTab() {
  const [data1d, setData1d] = useState<any>(null);
  const [data7d, setData7d] = useState<any>(null);
  const [data30d, setData30d] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const tc = useTranslations("costs");
  const locale = useLocale();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [res1d, res7d, res30d] = await Promise.all([
          fetch("/api/usage/analytics?range=1d"),
          fetch("/api/usage/analytics?range=7d"),
          fetch("/api/usage/analytics?range=30d"),
        ]);
        if (res1d.ok) setData1d(await res1d.json());
        if (res7d.ok) setData7d(await res7d.json());
        if (res30d.ok) setData30d(await res30d.json());
      } catch (e) {
        console.error("Failed to load analytics data", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value || 0));

  if (loading) {
    return <div className="animate-pulse p-8 text-text-muted">{tc("loadingOverviewData")}</div>;
  }

  const todaySpend = data1d?.summary?.totalCost || 0;
  const weekSpend = data7d?.summary?.totalCost || 0;
  const monthSpend = data30d?.summary?.totalCost || 0;
  const pieData = Object.entries(data30d?.byProvider || {})
    .map(([name, stats]: [string, any]) => ({
      name,
      value: stats.totalCost || 0,
    }))
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-surface/20 border-border/30">
          <p className="text-sm text-text-muted mb-2">{tc("totalSpendToday")}</p>
          <p className="text-3xl font-bold text-text-main">{formatCurrency(todaySpend)}</p>
        </Card>
        <Card className="p-6 bg-surface/20 border-border/30">
          <p className="text-sm text-text-muted mb-2">{tc("totalSpendThisWeek")}</p>
          <p className="text-3xl font-bold text-text-main">{formatCurrency(weekSpend)}</p>
        </Card>
        <Card className="p-6 bg-surface/20 border-border/30">
          <p className="text-sm text-text-muted mb-2">{tc("totalSpendThisMonth")}</p>
          <p className="text-3xl font-bold text-text-main">{formatCurrency(monthSpend)}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{tc("spendByProvider")}</h3>
        {pieData.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => formatCurrency(val)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-text-muted text-sm py-12 text-center">
            {tc("noCostDataAvailable")}
          </div>
        )}
      </Card>
    </div>
  );
}
