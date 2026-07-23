"use client";

import { useTranslations } from "next-intl";

interface TestResult {
  success: boolean;
  publicIp?: string;
  latencyMs?: number | null;
  error?: string;
}

interface HealthInfo {
  successRate?: number;
  avgLatencyMs?: number;
}

interface ProxyHealthCellProps {
  testResult?: TestResult | null;
  health?: HealthInfo | null;
}

export function ProxyHealthCell({ testResult, health }: ProxyHealthCellProps) {
  const t = useTranslations("proxyRegistry");

  if (testResult) {
    if (testResult.success) {
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-emerald-400">{t("testPassed")}</span>
          {testResult.latencyMs != null && (
            <span
              className={
                testResult.latencyMs < 1000
                  ? "text-emerald-400"
                  : testResult.latencyMs < 3000
                    ? "text-amber-400"
                    : "text-red-400"
              }
            >
              {testResult.latencyMs}ms
            </span>
          )}
        </div>
      );
    }
    return (
      <span className="text-red-400">✗ {testResult.error || t("failed")}</span>
    );
  }

  if (health) {
    return (
      <div className="flex flex-col gap-0.5">
        <span>{t("successRate", { rate: health.successRate ?? 0 })}</span>
        <span>{t("avgLatency", { latency: health.avgLatencyMs ?? "-" })}</span>
      </div>
    );
  }

  return <span>—</span>;
}
