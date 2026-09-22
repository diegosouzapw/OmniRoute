import {
  recordAutoEvaluationCandidate,
  recordAutoEvaluationStage,
  recordAutoEvaluationTransition,
  type AutoEvaluationStage,
  type ComboSkipReason,
} from "../combo/decisionTrace.ts";

export interface AutoTraceCandidate {
  provider: string;
  model: string;
  modelStr?: string;
}

type TraceDetail = string | (() => string);

function candidateTarget(candidate: AutoTraceCandidate): string {
  return candidate.modelStr ?? `${candidate.provider}/${candidate.model}`;
}

function bestEffortTrace(
  invocationId: string | undefined,
  write: (traceInvocationId: string) => void
): void {
  if (!invocationId) return;
  try {
    write(invocationId);
  } catch {
    // Diagnostic tracing must never alter routing.
  }
}

export function recordAutoCandidatePool(
  invocationId: string | undefined,
  pool: readonly AutoTraceCandidate[]
): void {
  bestEffortTrace(invocationId, (traceInvocationId) => {
    for (const candidate of pool) {
      recordAutoEvaluationCandidate(traceInvocationId, {
        target: candidateTarget(candidate),
        provider: candidate.provider,
        model: candidate.model,
      });
    }
  });
}

export function recordAutoStage(
  invocationId: string | undefined,
  stage: AutoEvaluationStage
): void {
  bestEffortTrace(invocationId, (traceInvocationId) => {
    recordAutoEvaluationStage(traceInvocationId, stage);
  });
}

export function recordAutoExclusion(
  invocationId: string | undefined,
  candidate: AutoTraceCandidate,
  stage: AutoEvaluationStage,
  reason: ComboSkipReason,
  detail?: TraceDetail
): void {
  bestEffortTrace(invocationId, (traceInvocationId) => {
    recordAutoEvaluationStage(traceInvocationId, stage);
    recordAutoEvaluationTransition(traceInvocationId, {
      target: candidateTarget(candidate),
      stage,
      outcome: "excluded",
      reason,
      ...(detail === undefined
        ? {}
        : { detail: typeof detail === "function" ? detail() : detail }),
    });
  });
}

export function recordAutoDroppedCandidates(
  invocationId: string | undefined,
  before: readonly AutoTraceCandidate[],
  after: readonly AutoTraceCandidate[],
  stage: AutoEvaluationStage
): void {
  bestEffortTrace(invocationId, (traceInvocationId) => {
    recordAutoEvaluationStage(traceInvocationId, stage);
    if (before === after) return;
    const surviving = new Set(after.map(candidateTarget));
    for (const candidate of before) {
      if (!surviving.has(candidateTarget(candidate))) {
        recordAutoEvaluationTransition(traceInvocationId, {
          target: candidateTarget(candidate),
          stage,
          outcome: "excluded",
          reason: "auto_candidate_filter",
        });
      }
    }
  });
}

export function recordAutoSurvivors(
  invocationId: string | undefined,
  pool: readonly AutoTraceCandidate[]
): void {
  bestEffortTrace(invocationId, (traceInvocationId) => {
    for (const candidate of pool) {
      recordAutoEvaluationTransition(traceInvocationId, {
        target: candidateTarget(candidate),
        stage: "dispatch",
        outcome: "retained",
      });
    }
  });
}
