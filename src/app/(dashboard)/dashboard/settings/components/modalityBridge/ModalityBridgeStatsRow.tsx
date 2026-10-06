"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type BridgeKind = "vision" | "audio" | "video";

interface BridgeStats {
  attempts: number;
  averageLatencyMs: number;
  bridged: number;
  cacheHits: number;
  failures: number;
  lastUsedAt: string | null;
  latencySamples: number;
  successes: number;
  totalLatencyMs: number;
}

interface ModalityBridgeStatsRowProps {
  kind: BridgeKind;
}

function parseStats(value: unknown): BridgeStats | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const lastUsedAt = record.lastUsedAt;
  if (lastUsedAt !== null && typeof lastUsedAt !== "string") return null;
  if (
    typeof record.bridged !== "number" ||
    typeof record.cacheHits !== "number" ||
    typeof record.failures !== "number"
  ) {
    return null;
  }
  const attempts =
    typeof record.attempts === "number" ? record.attempts : record.bridged + record.failures;
  const averageLatencyMs =
    typeof record.averageLatencyMs === "number" ? record.averageLatencyMs : 0;
  const totalLatencyMs =
    typeof record.totalLatencyMs === "number" ? record.totalLatencyMs : averageLatencyMs * attempts;
  // Compatibility with pre-latencySamples servers: positive latency data was
  // sampled, while the legacy all-zero shape means timing was never recorded.
  const latencySamples =
    typeof record.latencySamples === "number"
      ? Math.max(0, Math.floor(record.latencySamples))
      : totalLatencyMs > 0
        ? Math.max(
            1,
            averageLatencyMs > 0 ? Math.round(totalLatencyMs / averageLatencyMs) : attempts
          )
        : 0;
  return {
    attempts,
    averageLatencyMs,
    bridged: record.bridged,
    cacheHits: record.cacheHits,
    failures: record.failures,
    lastUsedAt: typeof lastUsedAt === "string" ? lastUsedAt : null,
    latencySamples,
    successes: typeof record.successes === "number" ? record.successes : record.bridged,
    totalLatencyMs,
  };
}

export default function ModalityBridgeStatsRow({ kind }: ModalityBridgeStatsRowProps) {
  const t = useTranslations("settings");
  const tProviderStats = useTranslations("providerStats");
  const tRoot = useTranslations();
  const [stats, setStats] = useState<BridgeStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/modality-bridge/stats")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("fetch"))))
      .then((data: unknown) => {
        if (cancelled || !data || typeof data !== "object") return;
        setStats(parseStats((data as Record<string, unknown>)[kind]));
      })
      .catch(() => {
        if (!cancelled) setStats(null);
      });
    return () => {
      cancelled = true;
    };
  }, [kind]);

  if (!stats) return null;

  const lastUsed = stats.lastUsedAt
    ? new Date(stats.lastUsedAt).toLocaleString()
    : t("modalityBridgeStatsNever");

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-muted" aria-live="polite">
      <span>
        {stats.attempts} {tRoot("requestLogger.attempts").toLowerCase()}
      </span>
      <span>
        {stats.successes} {t("modalityBridgeStatsBridged")}
      </span>
      <span>
        {stats.cacheHits} {t("modalityBridgeStatsCacheHits")}
      </span>
      <span>
        {stats.failures} {t("modalityBridgeStatsFailures")}
      </span>
      <span>
        {tRoot("trafficInspector.timingTotalLatency")}:{" "}
        {stats.latencySamples > 0 ? `${Math.round(stats.totalLatencyMs)} ms` : "—"}
      </span>
      <span>
        {tProviderStats("avgLatency")}:{" "}
        {stats.latencySamples > 0 ? `${Math.round(stats.averageLatencyMs)} ms` : "—"}
      </span>
      <span>
        {t("modalityBridgeStatsLastUsed")}: {lastUsed}
      </span>
    </div>
  );
}
