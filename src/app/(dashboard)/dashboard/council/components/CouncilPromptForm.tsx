/**
 * CouncilPromptForm — the council console's input panel.
 *
 * Question textarea + optional advanced fields (explicit panel, judge, rounds,
 * consensus threshold) + run/stop/clear actions. Pure presentational: all state
 * lives in the parent CouncilPageClient; this component only renders + emits.
 */
"use client";

import { useTranslations } from "next-intl";

export type CouncilPromptFormProps = {
  prompt: string;
  onPrompt: (v: string) => void;
  modelsRaw: string;
  onModels: (v: string) => void;
  judge: string;
  onJudge: (v: string) => void;
  rounds: number;
  onRounds: (v: number) => void;
  consensus: number;
  onConsensus: (v: number) => void;
  running: boolean;
  onRun: () => void;
  onStop: () => void;
  onClear: () => void;
};

export function CouncilPromptForm(props: CouncilPromptFormProps) {
  const t = useTranslations("council");
  const canRun = props.prompt.trim().length > 0 && !props.running;

  return (
    <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
      <div className="space-y-1">
        <label htmlFor="council-prompt" className="text-sm font-medium text-text-main">
          {t("promptLabel")}
        </label>
        <textarea
          id="council-prompt"
          className="w-full min-h-28 resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-text-main focus:border-primary focus:outline-none"
          placeholder={t("promptPlaceholder")}
          value={props.prompt}
          onChange={(e) => props.onPrompt(e.target.value)}
          disabled={props.running}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="council-models" className="text-sm font-medium text-text-main">
            {t("modelsLabel")}
          </label>
          <input
            id="council-models"
            type="text"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-main focus:border-primary focus:outline-none"
            placeholder={t("modelsPlaceholder")}
            value={props.modelsRaw}
            onChange={(e) => props.onModels(e.target.value)}
            disabled={props.running}
          />
          <p className="text-xs text-text-muted">{t("modelsHelp")}</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="council-judge" className="text-sm font-medium text-text-main">
            {t("judgeLabel")}
          </label>
          <input
            id="council-judge"
            type="text"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-main focus:border-primary focus:outline-none"
            placeholder={t("judgePlaceholder")}
            value={props.judge}
            onChange={(e) => props.onJudge(e.target.value)}
            disabled={props.running}
          />
          <p className="text-xs text-text-muted">{t("judgeHelp")}</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="council-rounds" className="text-sm font-medium text-text-main">
            {t("roundsLabel")}
          </label>
          <input
            id="council-rounds"
            type="number"
            min={1}
            max={10}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-main focus:border-primary focus:outline-none"
            value={props.rounds}
            onChange={(e) => props.onRounds(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
            disabled={props.running}
          />
          <p className="text-xs text-text-muted">{t("roundsHelp")}</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="council-consensus" className="text-sm font-medium text-text-main">
            {t("consensusLabel")}
          </label>
          <input
            id="council-consensus"
            type="number"
            min={0}
            max={2}
            step={0.05}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-main focus:border-primary focus:outline-none"
            value={props.consensus}
            onChange={(e) => props.onConsensus(Math.max(0, Math.min(2, Number(e.target.value) || 0)))}
            disabled={props.running}
          />
          <p className="text-xs text-text-muted">{t("consensusHelp")}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          onClick={props.onRun}
          disabled={!canRun}
        >
          {props.running ? t("runningButton") : t("runButton")}
        </button>
        {props.running && (
          <button
            type="button"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-text-main"
            onClick={props.onStop}
          >
            {t("stopButton")}
          </button>
        )}
        <button
          type="button"
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-text-muted disabled:opacity-50"
          onClick={props.onClear}
          disabled={props.running}
        >
          {t("clearButton")}
        </button>
      </div>
    </div>
  );
}
