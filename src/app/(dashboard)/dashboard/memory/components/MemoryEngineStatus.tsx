"use client";

import { useTranslations } from "next-intl";
import type { MemoryEngineStatus } from "@/shared/schemas/memory";

type ConfigureTarget = "embedding" | "qdrant" | "rerank";

interface Props {
  status: MemoryEngineStatus;
  onConfigure?: (target: ConfigureTarget) => void;
}

type ChipColor = "green" | "gray" | "red";

function StatusChip({ color }: { color: ChipColor }) {
  const colorMap: Record<ChipColor, string> = {
    green: "bg-emerald-500",
    gray: "bg-border",
    red: "bg-red-500",
  };
  return (
    <span
      className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${colorMap[color]}`}
      aria-hidden="true"
    />
  );
}

function ConfigureLink({
  onClick,
  label,
  testId,
}: {
  onClick: () => void;
  label: string;
  testId: string;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className="text-xs text-violet-400 hover:text-violet-300 underline-offset-2 hover:underline mt-1 inline-flex items-center gap-0.5"
    >
      {label}
      <span aria-hidden="true">→</span>
    </button>
  );
}

export default function MemoryEngineStatus({ status, onConfigure }: Props) {
  const t = useTranslations("memory");

  const embeddingOff = !status.embedding.available;
  const qdrantOff = !status.qdrant.enabled;
  const qdrantUnhealthy = status.qdrant.enabled && status.qdrant.healthy === false;
  const rerankOff = !status.rerank.enabled || !status.rerank.available;

  const rows: Array<{ label: string; chip: ChipColor; reason: string; cta?: React.ReactNode }> = [
    {
      label: t("engine.keywordLabel"),
      chip: "green",
      reason: t("engine.keywordReason"),
    },
    {
      label: t("engine.embeddingLabel"),
      chip: status.embedding.available ? "green" : "gray",
      reason: status.embedding.reason,
      cta:
        embeddingOff && onConfigure ? (
          <ConfigureLink
            testId="engine-cta-embedding"
            onClick={() => onConfigure("embedding")}
            label={t("engine.configureCta")}
          />
        ) : undefined,
    },
    {
      label: t("engine.vectorStoreLabel"),
      chip:
        status.vectorStore.available
          ? "green"
          : status.vectorStore.backend === "none"
            ? "gray"
            : "red",
      reason: status.vectorStore.reason,
      cta:
        status.vectorStore.backend === "none" ? (
          <span className="text-xs text-amber-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">terminal</span>
            {t("engine.vectorStoreInstallHint")}
          </span>
        ) : status.vectorStore.needsReindex > 0 ? (
          <span className="text-xs text-amber-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">warning</span>
            {t("engine.needsReindex", { count: status.vectorStore.needsReindex })}
          </span>
        ) : undefined,
    },
    {
      label: t("engine.qdrantLabel"),
      chip: !status.qdrant.enabled ? "gray" : status.qdrant.healthy ? "green" : "red",
      reason: !status.qdrant.enabled
        ? t("engine.qdrantDisabled")
        : status.qdrant.healthy
          ? t("engine.qdrantOk", { latencyMs: status.qdrant.latencyMs ?? 0 })
          : (status.qdrant.error ?? t("engine.qdrantError")),
      cta:
        (qdrantOff || qdrantUnhealthy) && onConfigure ? (
          <ConfigureLink
            testId="engine-cta-qdrant"
            onClick={() => onConfigure("qdrant")}
            label={t("engine.configureCta")}
          />
        ) : undefined,
    },
    {
      label: t("engine.rerankLabel"),
      chip: !status.rerank.enabled ? "gray" : status.rerank.available ? "green" : "red",
      reason: status.rerank.reason,
      cta:
        rerankOff && onConfigure ? (
          <ConfigureLink
            testId="engine-cta-rerank"
            onClick={() => onConfigure("rerank")}
            label={t("engine.configureCta")}
          />
        ) : undefined,
    },
  ];

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-lg border border-border/60 bg-surface/30"
        >
          <StatusChip color={row.chip} />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-text-main">{row.label}</span>
            <p className="text-xs text-text-muted mt-0.5">{row.reason}</p>
            {row.cta && <div className="mt-1">{row.cta}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
