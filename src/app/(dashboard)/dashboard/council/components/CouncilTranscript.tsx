/**
 * CouncilTranscript — the live deliberation transcript.
 *
 * Renders each debate round (round 0 = initial answers, rounds ≥1 = rebuttals)
 * with its per-model panel answers, and a consensus marker when the debate
 * converged and stopped early. Pure presentational.
 */
"use client";

import { useTranslations } from "next-intl";
import type { CouncilRound } from "../useCouncilStream";

export type CouncilTranscriptProps = {
  rounds: CouncilRound[];
};

export function CouncilTranscript({ rounds }: CouncilTranscriptProps) {
  const t = useTranslations("council");
  if (rounds.length === 0) return null;

  return (
    <div className="space-y-4">
      {rounds.map((round) => (
        <section
          key={round.round}
          className="rounded-lg border border-border bg-surface p-4"
          aria-label={
            round.round === 0
              ? t("initialRoundHeading")
              : t("rebuttalRoundHeading", { round: round.round })
          }
        >
          <header className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">
              {round.round === 0
                ? t("initialRoundHeading")
                : t("rebuttalRoundHeading", { round: round.round })}
            </h2>
            {typeof round.consensusScore === "number" && (
              <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-medium text-green-400">
                {t("consensusReached", { score: round.consensusScore.toFixed(3) })}
              </span>
            )}
          </header>

          <div className="space-y-3">
            {round.answers.map((answer, i) => (
              <article
                key={`${answer.model}-${i}`}
                className="rounded-md border border-border/60 bg-background p-3"
              >
                <p className="mb-1 text-xs font-medium text-text-muted">
                  {t("panelAnswerFrom", { model: answer.model })}
                </p>
                <p className="whitespace-pre-wrap text-sm text-text-main">{answer.text}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
