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
