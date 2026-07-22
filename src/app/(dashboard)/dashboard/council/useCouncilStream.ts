/**
 * useCouncilStream — drives the /api/v1/council SSE endpoint from the dashboard.
 *
 * Sends one council request and incrementally folds the SSE event stream
 * (round_start / panel_answer / round_end / consensus / synthesis_start /
 * token / synthesis / done / error) into render-ready state. Streaming judge
 * tokens are appended live; a non-streaming synthesis arrives as one block.
 *
 * The request is abortable (Stop button). All network/parse failures resolve
 * into `error` state — the hook never throws to the caller.
 */
"use client";

import { useCallback, useRef, useState } from "react";

export type CouncilPanelAnswer = { model: string; text: string };

export type CouncilRound = {
  round: number;
  /** Models invited to this round (from round_start). */
  models: string[];
  answers: CouncilPanelAnswer[];
  /** Consensus score if the debate converged and stopped at this round. */
  consensusScore?: number;
};

export type CouncilRunInput = {
  prompt: string;
  /** Explicit panel; empty → auto (every connected model). */
  models: string[];
  judgeModel?: string;
  debateRounds?: number;
  consensusThreshold?: number;
};

export type CouncilDoneSummary = {
  rounds: number;
  totalAnswers: number;
  durationMs: number;
};

export type CouncilStreamState = {
  running: boolean;
  rounds: CouncilRound[];
  judge: string | null;
  /** Live-accumulated final answer (streamed tokens or one synthesis block). */
  synthesis: string;
  done: CouncilDoneSummary | null;
  error: string | null;
};

const INITIAL: CouncilStreamState = {
  running: false,
  rounds: [],
  judge: null,
  synthesis: "",
  done: null,
  error: null,
};

type CouncilEvent = Record<string, unknown>;

/** Extract assistant text from a non-stream OpenAI-shaped completion. "" if none. */
export function extractSynthesisText(completion: unknown): string {
  if (!completion || typeof completion !== "object") return "";
  const choices = (completion as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) return "";
  const message = (choices[0] as { message?: unknown }).message;
  const content = (message as { content?: unknown })?.content;
  return typeof content === "string" ? content : "";
}

/**
 * Fold a single parsed SSE event into prior state, returning the next state.
 * Pure and exported so the reducer is unit-testable without a live stream.
 */
export function reduceCouncilEvent(
  prev: CouncilStreamState,
  ev: CouncilEvent
): CouncilStreamState {
  switch (ev.type) {
    case "round_start": {
      const round = Number(ev.round ?? 0);
      const models = Array.isArray(ev.models) ? (ev.models as string[]) : [];
      if (prev.rounds.some((r) => r.round === round)) return prev;
      return { ...prev, rounds: [...prev.rounds, { round, models, answers: [] }] };
    }
    case "panel_answer": {
      const round = Number(ev.round ?? 0);
      const model = String(ev.model ?? "");
      const text = String(ev.text ?? "");
      return {
        ...prev,
        rounds: prev.rounds.map((r) =>
          r.round === round ? { ...r, answers: [...r.answers, { model, text }] } : r
        ),
      };
    }
    case "consensus": {
      const round = Number(ev.round ?? 0);
      const score = Number(ev.score ?? 0);
      return {
        ...prev,
        rounds: prev.rounds.map((r) =>
          r.round === round ? { ...r, consensusScore: score } : r
        ),
      };
    }
    case "synthesis_start":
      return { ...prev, judge: String(ev.judge ?? "") || null };
    case "token":
      return { ...prev, synthesis: prev.synthesis + String(ev.text ?? "") };
    case "synthesis": {
      if (typeof ev.text === "string") return { ...prev, synthesis: prev.synthesis + ev.text };
      const text = extractSynthesisText(ev.completion);
      return text ? { ...prev, synthesis: prev.synthesis + text } : prev;
    }
    case "done":
      return {
        ...prev,
        done: {
          rounds: Number(ev.rounds ?? 0),
          totalAnswers: Number(ev.totalAnswers ?? 0),
          durationMs: Number(ev.durationMs ?? 0),
        },
      };
    case "error":
      return { ...prev, error: String(ev.message ?? "council error") };
    default:
      return prev;
  }
}

export function useCouncilStream() {
  const [state, setState] = useState<CouncilStreamState>(INITIAL);
  const abortRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState((s) => ({ ...s, running: false }));
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState(INITIAL);
  }, []);

  const run = useCallback(async (input: CouncilRunInput) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ ...INITIAL, running: true });

    const body: Record<string, unknown> = {
      messages: [{ role: "user", content: input.prompt }],
      stream: true,
    };
    if (input.models.length > 0) body.models = input.models;
    if (input.judgeModel) body.judgeModel = input.judgeModel;
    const debateTuning: Record<string, unknown> = {};
    if (typeof input.debateRounds === "number") debateTuning.debateRounds = input.debateRounds;
    if (typeof input.consensusThreshold === "number")
      debateTuning.consensusThreshold = input.consensusThreshold;
    if (Object.keys(debateTuning).length > 0) body.debateTuning = debateTuning;

    try {
      const res = await fetch("/api/v1/council", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        let message = `council request failed (${res.status})`;
        try {
          const j = (await res.json()) as { error?: { message?: string } };
          if (j.error?.message) message = j.error.message;
        } catch {
          // non-JSON error body — keep the status message
        }
        setState((s) => ({ ...s, running: false, error: message }));
        return;
      }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const ev = JSON.parse(data) as CouncilEvent;
            setState((prev) => reduceCouncilEvent(prev, ev));
          } catch {
            // non-JSON SSE line — skip
          }
        }
      }
      setState((s) => ({ ...s, running: false }));
    } catch (err) {
      if (controller.signal.aborted) {
        setState((s) => ({ ...s, running: false }));
        return;
      }
      setState((s) => ({
        ...s,
        running: false,
        error: err instanceof Error ? err.message : "council run failed",
      }));
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, []);

  return { state, run, stop, clear };
}
