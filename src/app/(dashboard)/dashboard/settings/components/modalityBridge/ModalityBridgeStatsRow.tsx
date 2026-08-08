"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type BridgeKind = "vision" | "audio";

interface BridgeStats {
  bridged: number;
  cacheHits: number;
  failures: number;
  lastUsedAt: string | null;
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
  return {
    bridged: record.bridged,
    cacheHits: record.cacheHits,
    failures: record.failures,
    lastUsedAt: typeof lastUsedAt === "string" ? lastUsedAt : null,
  };
}

export default function ModalityBridgeStatsRow({ kind }: ModalityBridgeStatsRowProps) {
  const t = useTranslations("settings");
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
        {stats.bridged} {t("modalityBridgeStatsBridged")}
      </span>
      <span>
        {stats.cacheHits} {t("modalityBridgeStatsCacheHits")}
      </span>
      <span>
        {stats.failures} {t("modalityBridgeStatsFailures")}
      </span>
      <span>
        {t("modalityBridgeStatsLastUsed")}: {lastUsed}
      </span>
    </div>
  );
}
