"use client";

import { useLocale, useTranslations } from "next-intl";
import type { SweepVerdict } from "@/lib/proxyHealth/sweepVerdict";

interface TestResult {
  success: boolean;
  publicIp?: string;
  latencyMs?: number | null;
  error?: string;
}

interface HealthInfo {
  successRate?: number | null;
  avgLatencyMs?: number | null;
  transportRate?: number | null;
  measured?: boolean;
  transportOk?: number;
  transportFailures?: number;
  upstream4xx?: number;
  upstream5xx?: number;
  connectionTests?: number;
  connectionTestSuccess?: number;
  sweep?: SweepVerdict & { ageMs: number };
}

interface ProxyHealthCellProps {
  testResult?: TestResult | null;
  health?: HealthInfo | null;
}

function formatSweepAge(ageMs: number, locale: string): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const minutes = Math.floor(Math.max(0, ageMs) / 60000);
  if (minutes < 1) return rtf.format(0, "second");
  if (minutes < 60) return rtf.format(-minutes, "minute");
  return rtf.format(-Math.floor(minutes / 60), "hour");
}

type SweepLabelKey =
  | "sweepLabel.unproven"
  | "sweepLabel.unclassified"
  | "sweepLabel.ok"
  | "sweepLabel.fail"
  | "sweepLabel.hang"
  | "sweepLabel.inconclusive";

function sweepLabelKey(sweep: NonNullable<HealthInfo["sweep"]>): SweepLabelKey {
  if (sweep.verdict !== "blocked") return `sweepLabel.${sweep.verdict}`;
  return sweep.cause === "unproven" ? "sweepLabel.unproven" : "sweepLabel.unclassified";
}

export function ProxyHealthCell({ testResult, health }: ProxyHealthCellProps) {
  const t = useTranslations("proxyRegistry");
  const locale = useLocale();

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
    return <span className="text-red-400">✗ {testResult.error || t("failed")}</span>;
  }

  if (health) {
    const sweep = health.sweep;
    const upstreamRefusals = (health.upstream4xx ?? 0) + (health.upstream5xx ?? 0);
    return (
      <div className="flex flex-col gap-0.5">
        <span title={t("previousSuccessRate", { rate: health.successRate ?? 0 })}>
          {health.measured === false
            ? t("notMeasured")
            : t("transportRate", { rate: health.transportRate ?? 0 })}
        </span>
        <span>{t("upstreamRefusals", { count: upstreamRefusals })}</span>
        <span>{t("connectionTestsCount", { count: health.connectionTests ?? 0 })}</span>
        <span>{t("avgLatency", { latency: health.avgLatencyMs ?? "-" })}</span>
        {sweep ? (
          <span title={`${sweep.verdict}/${sweep.cause} ${sweep.status ?? "-"} ${sweep.ageMs}ms`}>
            {t("sweepVerdict", {
              cause: t(sweepLabelKey(sweep)),
              code: sweep.status ?? "-",
              age: formatSweepAge(sweep.ageMs, locale),
            })}
          </span>
        ) : (
          <span>{t("sweepNoData")}</span>
        )}
      </div>
    );
  }

  return <span>—</span>;
}
