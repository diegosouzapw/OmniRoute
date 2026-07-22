/**
 * /dashboard/council — AI Council console.
 *
 * A thin composition over useCouncilStream: a prompt form (question + optional
 * panel/judge/rounds/consensus), a live deliberation transcript (per-round panel
 * answers + consensus markers), and the synthesized final answer. Leaving the
 * panel empty runs the "use every connected model" auto mode.
 *
 * State + streaming live in useCouncilStream.ts; the JSX sections are split into
 * ./components/* so this file stays a thin render function under the
 * complexity/size ratchet.
 */
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCouncilStream } from "./useCouncilStream";
import { CouncilPromptForm } from "./components/CouncilPromptForm";
import { CouncilTranscript } from "./components/CouncilTranscript";
import { CouncilSynthesis } from "./components/CouncilSynthesis";

export default function CouncilPageClient() {
  const t = useTranslations("council");
  const { state, run, stop, clear } = useCouncilStream();

  const [prompt, setPrompt] = useState("");
  const [modelsRaw, setModelsRaw] = useState("");
  const [judge, setJudge] = useState("");
  const [rounds, setRounds] = useState(2);
  const [consensus, setConsensus] = useState(0.85);

  const onRun = () => {
    const models = modelsRaw
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean);
    run({
      prompt: prompt.trim(),
      models,
      judgeModel: judge.trim() || undefined,
      debateRounds: rounds,
      consensusThreshold: consensus,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">{t("pageTitle")}</h1>
        <p className="text-sm text-text-muted mt-1">{t("pageSubtitle")}</p>
      </div>

      <CouncilPromptForm
        prompt={prompt}
        onPrompt={setPrompt}
        modelsRaw={modelsRaw}
        onModels={setModelsRaw}
        judge={judge}
        onJudge={setJudge}
        rounds={rounds}
        onRounds={setRounds}
        consensus={consensus}
        onConsensus={setConsensus}
        running={state.running}
        onRun={onRun}
        onStop={stop}
        onClear={clear}
      />

      {state.error && (
        <div
          role="alert"
          className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {state.error === "panel-failed" ? t("errorPanelFailed") : state.error}
        </div>
      )}

      <CouncilTranscript rounds={state.rounds} />

      <CouncilSynthesis
        synthesis={state.synthesis}
        judge={state.judge}
        done={state.done}
        hasContent={state.rounds.length > 0 || state.synthesis.length > 0}
      />
    </div>
  );
}
