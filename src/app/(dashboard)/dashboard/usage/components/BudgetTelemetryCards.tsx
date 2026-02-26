"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect } from "react";
import { Card } from "@/shared/components";

export default function BudgetTelemetryCards() {
  const t = useTranslations("usage");
  const [telemetry, setTelemetry] = useState(null);
  const [cache, setCache] = useState(null);
  const [policies, setPolicies] = useState(null);

  useEffect(() => {
    Promise.allSettled([
      fetch("/api/telemetry/summary").then((r) => r.json()),
      fetch("/api/cache/stats").then((r) => r.json()),
      fetch("/api/policies").then((r) => r.json()),
    ]).then(([t, c, p]) => {
      if (t.status === "fulfilled") setTelemetry(t.value);
      if (c.status === "fulfilled") setCache(c.value);
      if (p.status === "fulfilled") setPolicies(p.value);
    });
  }, []);

  const fmt = (ms) => (ms != null ? `${Math.round(ms)}ms` : "—");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {/* Latency Card */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">speed</span>
          {t("latency")}
        </h3>
        {telemetry ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">p50</span>
              <span className="font-mono">{fmt(telemetry.p50)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">p95</span>
              <span className="font-mono">{fmt(telemetry.p95)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">p99</span>
              <span className="font-mono">{fmt(telemetry.p99)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 mt-2">
              <span className="text-text-muted">{t("totalRequests")}</span>
              <span className="font-mono">{telemetry.totalRequests ?? 0}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-muted">{t("noDataYet")}</p>
        )}
      </Card>

      {/* Cache Card */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">cached</span>
          {t("promptCache")}
        </h3>
        {cache ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">{t("entries")}</span>
              <span className="font-mono">
                {cache.size}/{cache.maxSize}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">{t("hitRate")}</span>
              <span className="font-mono">{cache.hitRate?.toFixed(1) ?? 0}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">{t("hitsMisses")}</span>
              <span className="font-mono">
                {cache.hits ?? 0} / {cache.misses ?? 0}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-muted">{t("noDataYet")}</p>
        )}
      </Card>

      {/* System Health Card */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
          {t("systemHealth")}
        </h3>
        {policies ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">{t("circuitBreakers")}</span>
              <span className="font-mono">
                {t("activeCount", { count: policies.circuitBreakers?.length ?? 0 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">{t("lockedIPs")}</span>
              <span className="font-mono">{policies.lockedIdentifiers?.length ?? 0}</span>
            </div>
            {policies.circuitBreakers?.some((cb) => cb.state === "OPEN") && (
              <div className="mt-2 px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs">
                {t("openCircuitBreakersDetected")}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-text-muted">{t("noDataYet")}</p>
        )}
      </Card>
    </div>
  );
}
