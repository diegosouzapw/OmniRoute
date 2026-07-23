"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { useTranslations } from "next-intl";
import type { InterceptedRequest } from "@/mitm/inspector/types";

interface StatsChartsProps {
  requests: InterceptedRequest[];
}

export default function StatsCharts({ requests }: StatsChartsProps) {
  const t = useTranslations("trafficInspector");

  const statusDist = requests.reduce<Record<string, number>>((acc, r) => {
    const key =
      typeof r.status === "number" ? `${Math.floor(r.status / 100)}xx` : String(r.status);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusDist).map(([name, count]) => ({ name, count }));

  const latencyData = requests
    .filter((r) => r.totalLatencyMs != null)
    .slice(-50)
    .map((r, i) => ({ i, ms: r.totalLatencyMs }));

  return (
    <div className="h-full overflow-auto p-4 space-y-6">
      <div>
        <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
          {t("statsStatusDistribution")}
        </h3>
        <div style={{ height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {latencyData.length > 1 && (
        <div>
          <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
            {t("statsLatency")}
          </h3>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyData}>
                <XAxis dataKey="i" hide />
                <YAxis tick={{ fontSize: 11 }} unit="ms" />
                <Tooltip formatter={(v: unknown) => [`${String(v)}ms`, "latency"]} />
                <Line
                  type="monotone"
                  dataKey="ms"
                  stroke="#10b981"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded border border-border bg-bg-subtle p-3">
          <div className="text-2xl font-bold text-text-main">{requests.length}</div>
          <div className="text-xs text-text-muted mt-1">{t("statsTotalRequests")}</div>
        </div>
        <div className="rounded border border-border bg-bg-subtle p-3">
          <div className="text-2xl font-bold text-green-400">
            {requests.filter((r) => typeof r.status === "number" && r.status < 400).length}
          </div>
          <div className="text-xs text-text-muted mt-1">{t("statsSuccessful")}</div>
        </div>
        <div className="rounded border border-border bg-bg-subtle p-3">
          <div className="text-2xl font-bold text-red-400">
            {
              requests.filter(
                (r) =>
                  r.status === "error" || (typeof r.status === "number" && r.status >= 400),
              ).length
            }
          </div>
          <div className="text-xs text-text-muted mt-1">{t("statsErrors")}</div>
        </div>
      </div>
    </div>
  );
}
