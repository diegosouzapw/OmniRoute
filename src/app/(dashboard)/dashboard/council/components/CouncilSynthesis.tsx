/**
 * CouncilSynthesis — the judge's final synthesized answer.
 *
 * Shows the accumulated final answer (live-streamed tokens or one block), the
 * judge model that produced it, and a run summary once the stream completes.
 * Renders an empty-state hint before any deliberation has started.
 */
"use client";

import { useTranslations } from "next-intl";
import type { CouncilDoneSummary } from "../useCouncilStream";

export type CouncilSynthesisProps = {
  synthesis: string;
  judge: string | null;
  done: CouncilDoneSummary | null;
  /** True once at least one round or synthesis text exists. */
  hasContent: boolean;
};

export function CouncilSynthesis({ synthesis, judge, done, hasContent }: CouncilSynthesisProps) {
  const t = useTranslations("council");

  if (!hasContent) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-surface/50 p-8 text-center text-sm text-text-muted">
        {t("emptyState")}
      </div>
    );
  }

  if (synthesis.length === 0) return null;

  return (
    <section
      className="rounded-lg border border-primary/40 bg-primary/5 p-4"
      aria-label={t("synthesisHeading")}
    >
      <header className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-main">{t("synthesisHeading")}</h2>
        {judge && (
          <span className="text-xs text-text-muted">{t("synthesisJudge", { judge })}</span>
        )}
      </header>
      <p className="whitespace-pre-wrap text-sm text-text-main">{synthesis}</p>
      {done && (
        <p className="mt-3 border-t border-border/60 pt-2 text-xs text-text-muted">
          {t("doneSummary", {
            rounds: done.rounds,
            answers: done.totalAnswers,
            seconds: (done.durationMs / 1000).toFixed(1),
          })}
        </p>
      )}
    </section>
  );
}
