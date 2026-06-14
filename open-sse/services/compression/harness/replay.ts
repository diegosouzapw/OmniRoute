import { runCompressionEval, type CompressFn, type EvalCase, type EvalReport } from "./runner.ts";

/**
 * Replay-bench over real transcripts (TV3). Instead of synthetic prompts, feed
 * captured conversation turns through a compression function and measure ratio +
 * retention per turn, grouped by transcript. This catches regressions that only
 * show up on real-world inputs (tool dumps, long histories, mixed content).
 */

export interface TranscriptTurn {
  role: string;
  content: string;
}

export interface Transcript {
  id: string;
  turns: TranscriptTurn[];
}

/** Flatten transcripts into eval cases — one per non-empty turn, grouped by transcript id. */
export function transcriptsToCorpus(transcripts: Transcript[]): EvalCase[] {
  const corpus: EvalCase[] = [];
  for (const transcript of transcripts) {
    transcript.turns.forEach((turn, index) => {
      if (turn.content?.trim()) {
        corpus.push({ id: `${transcript.id}#${index}`, input: turn.content, task: transcript.id });
      }
    });
  }
  return corpus;
}

export function replayTranscripts(
  transcripts: Transcript[],
  compress: CompressFn
): Promise<EvalReport> {
  return runCompressionEval(transcriptsToCorpus(transcripts), compress);
}
