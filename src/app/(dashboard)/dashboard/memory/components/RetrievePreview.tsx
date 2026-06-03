"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/shared/components";
import type { RetrievePreviewResult } from "@/shared/schemas/memory";

interface Props {
  result: RetrievePreviewResult;
}

const TIER_VARIANT: Record<string, "info" | "success" | "warning" | "default"> = {
  fts5: "info",
  vector: "success",
  "hybrid-rrf": "warning",
  qdrant: "default",
};

export default function RetrievePreview({ result }: Props) {
  const t = useTranslations("memory");
  const { memories, resolution, totalTokensUsed, budgetMaxTokens } = result;

  return (
    <div className="space-y-4">
      {/* Resolution panel */}
      <div className="p-3 rounded-lg bg-surface/30 border border-border/60 text-xs text-text-muted space-y-1">
        <p className="font-medium text-text-main text-sm">{t("playground.resolutionTitle")}</p>
        <p>
          {t("playground.resolutionEmbedding")}:{" "}
          <span className="font-mono text-text-main">
            {resolution.embeddingModel ?? t("playground.none")}
          </span>
        </p>
        <p>
          {t("playground.resolutionStore")}:{" "}
          <span className="font-mono text-text-main">{resolution.vectorStore}</span>
        </p>
        <p>
          {t("playground.resolutionStrategy")}:{" "}
          <span className="font-mono text-text-main">{resolution.strategyUsed}</span>
        </p>
        {resolution.rerankApplied && (
          <p className="text-emerald-400">
            <span className="material-symbols-outlined text-[12px] align-middle mr-1">check</span>
            {t("playground.rerankApplied")}
          </p>
        )}
        {resolution.fallbackReason && (
          <p className="text-amber-400">
            <span className="material-symbols-outlined text-[12px] align-middle mr-1">warning</span>
            {t("playground.fallback")}: {resolution.fallbackReason}
          </p>
        )}
      </div>

      {/* Results list */}
      {memories.length === 0 ? (
        <div className="p-6 text-center text-sm text-text-muted">
          {t("playground.noResults")}
        </div>
      ) : (
        <div className="space-y-2">
          {memories.map((m) => (
            <div
              key={m.id}
              className="p-3 rounded-lg border border-border/60 bg-surface/30 space-y-1"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={TIER_VARIANT[m.tier] ?? "default"} size="sm">
                  {m.tier}
                </Badge>
                <span className="text-xs font-medium text-text-main">{m.key}</span>
                <span className="ml-auto text-xs text-text-muted font-mono">
                  score {m.score.toFixed(3)}
                </span>
                <span className="text-xs text-text-muted">{m.tokens} tok</span>
              </div>
              <p className="text-xs text-text-muted truncate">{m.content}</p>
              <div className="flex gap-3 text-[10px] text-text-muted/70 font-mono">
                {m.vecScore !== null && <span>vec: {m.vecScore.toFixed(3)}</span>}
                {m.ftsScore !== null && <span>fts: {m.ftsScore.toFixed(3)}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer budget */}
      <div className="flex items-center justify-end gap-2 text-xs text-text-muted">
        <span>
          {totalTokensUsed.toLocaleString()} / {budgetMaxTokens.toLocaleString()}{" "}
          {t("playground.tokensUsed")}
        </span>
        <div className="h-1.5 w-24 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{
              width: `${Math.min(100, (totalTokensUsed / Math.max(1, budgetMaxTokens)) * 100).toFixed(1)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
