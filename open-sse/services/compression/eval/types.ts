export type ContentKind = "tool-output-json" | "logs" | "code" | "prose" | "multi-turn";

export interface EvalCase {
  id: string;
  kind: ContentKind;
  /** The raw context to compress (one user turn's worth of context). */
  context: string;
  /** The question asked against the context. */
  question: string;
  /** Optional gold answer; when present, both answers are graded against it. */
  gold?: string;
  /** true => a curated seed case; false/undefined => an anonymized captured case. */
  captured?: boolean;
}

export interface ChatTurn { role: "system" | "user" | "assistant"; content: string; }

export interface ModelCallResult { text: string; usdCost?: number; }

/** Narrow seam the runner depends on; production adapter wraps the executor, tests use a stub. */
export interface ModelClient {
  /** Single non-stream completion. `model` selects answer-model vs judge-model. */
  complete(model: string, messages: ChatTurn[]): Promise<ModelCallResult>;
}

export type JudgeVerdict = "same" | "materially-differs" | "unparseable";
export interface GradeVerdict { correct: boolean; raw: string; }

export interface RunStamps { answerModel: string; judgeModel: string; corpusHash: string; sampleSize: number | "all"; }

import type { SavingsResult } from "./savings.ts";

export interface EvalRecord {
  id: string;
  kind: ContentKind;
  fidelity: JudgeVerdict;
  /** null when the case has no gold; otherwise whether that answer graded correct. */
  goldFull: boolean | null;
  goldCompressed: boolean | null;
  savings: SavingsResult;
  errored: boolean;
  errorDetail?: string;
}

export interface KindSummary {
  kind: ContentKind;
  casesScored: number;
  fidelityPreservedPct: number; // same / scored
  goldAccuracyDeltaPct: number | null; // compressed-correct% − full-correct% over gold cases (null if none)
  meanRatio: number;
}

export interface EvalReport {
  stamps: RunStamps;
  partial: boolean;
  totalCostUsd: number;
  overall: {
    casesScored: number;
    casesErrored: number;
    fidelityPreservedPct: number;
    goldAccuracyDeltaPct: number | null;
    meanRatio: number;
  };
  perKind: KindSummary[];
}
