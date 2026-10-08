/**
 * #10681: opaque per-invocation combo decision trace.
 *
 * Priority combos can be impossible to audit after a mixed fallback: dispatched
 * attempts are persisted in call_logs, but candidates excluded before dispatch
 * (circuit open, provider cooldown, model lockout, quota cutoff, availability,
 * model not in the live catalog, credential gate, concurrency cap, admission
 * lane, predictive TTFT) leave no
 * correlated decision record. This module records one ordered, allowlisted
 * decision per target per invocation so operators can reconstruct what the
 * chain actually did.
 *
 * SAFETY CONTRACT: the trace contains ONLY routing metadata — invocation id,
 * strategy, combo name, per-target provider/model, decision, allowlisted skip
 * reason, timestamps, terminal status. Never prompts, request/response bodies,
 * headers, credentials, account ids, or raw upstream error strings.
 *
 * Retention: bounded in-memory (TTL + LRU cap) — see TRACE_TTL_MS/MAX_TRACES.
 */
import { randomUUID } from "node:crypto";

export const COMBO_SKIP_REASONS = [
  "circuit_open",
  "provider_cooldown",
  "persisted_cooldown",
  "request_exhaustion",
  "model_lockout",
  "quota_cutoff",
  "availability",
  "model_not_in_catalog",
  "credential_gate",
  "concurrency_cap",
  "admission_lane",
  "predictive_ttft",
  "auto_resilience_filter",
  "auto_strict_zero_cost",
  "auto_constraint_filter",
] as const;

export type ComboSkipReason = (typeof COMBO_SKIP_REASONS)[number];

export type ComboDecision = "dispatched" | "skipped_before_dispatch" | "not_reached";

export interface ComboTraceEntry {
  /** Safe internal identifier of the combo step (execution key). */
  step: string;
  /** Safe routing metadata: "<provider>/<model>". */
  target: string;
  decision: ComboDecision;
  reason?: ComboSkipReason;
  ts: number;
  /**
   * Safe, non-secret elaboration on `reason` (e.g. a cooldown reset ISO
   * timestamp). SAFETY CONTRACT above still applies: never a credential
   * fragment, header, or raw upstream error string.
   */
  detail?: string;
}

export const AUTO_EVALUATION_STAGES = [
  "resilience",
  "paid_only",
  "model_lockout",
  "model_exposure",
  "strict_zero_cost",
  "tos",
  "candidate_override",
  "category_tier",
  "subscription_ladder",
] as const;

export type AutoEvaluationStage = (typeof AUTO_EVALUATION_STAGES)[number];

export interface AutoEvaluationCandidate {
  target: string;
  provider: string;
  model: string;
}

export interface AutoEvaluationTransition {
  target: string;
  stage: AutoEvaluationStage;
  outcome: "excluded" | "survived";
  reason?: ComboSkipReason;
  detail?: string;
  ts: number;
}

export interface AutoEvaluationTrace {
  schemaVersion: 1;
  stages: AutoEvaluationStage[];
  candidates: AutoEvaluationCandidate[];
  transitions: AutoEvaluationTransition[];
}

export interface ComboTrace {
  invocationId: string;
  createdAt: number;
  strategy: string | null;
  comboName: string | null;
  decisions: ComboTraceEntry[];
  autoEvaluation: AutoEvaluationTrace | null;
  terminal: { status: number | null; errorClass: string | null } | null;
}

const TRACE_TTL_MS = 30 * 60 * 1000;
const MAX_TRACES = 2000;
const traces = new Map<string, ComboTrace>();
let forceAutoEvaluationWriteFailureForTests = false;

export function createInvocationId(): string {
  return `combo-${randomUUID()}`;
}

function isComboSkipReason(value: unknown): value is ComboSkipReason {
  return typeof value === "string" && (COMBO_SKIP_REASONS as readonly string[]).includes(value);
}

/** Test hook: clear the in-memory store. */
export function resetComboTraceStore(): void {
  traces.clear();
  forceAutoEvaluationWriteFailureForTests = false;
}

/** Test hook: force best-effort Auto evaluation writes to fail. */
export function setAutoEvaluationWriteFailureForTests(enabled: boolean): void {
  forceAutoEvaluationWriteFailureForTests = enabled;
}

function bestEffortAutoEvaluationWrite(write: () => void): void {
  try {
    if (forceAutoEvaluationWriteFailureForTests) {
      throw new Error("forced Auto evaluation trace write failure");
    }
    write();
  } catch {
    // Diagnostic tracing is deliberately fail-open and must never affect routing.
  }
}

export function startAutoEvaluationTrace(invocationId: string): void {
  bestEffortAutoEvaluationWrite(() => {
    const trace = traces.get(invocationId);
    if (!trace || trace.autoEvaluation) return;
    trace.autoEvaluation = {
      schemaVersion: 1,
      stages: [...AUTO_EVALUATION_STAGES],
      candidates: [],
      transitions: [],
    };
  });
}

function autoCandidateKey(candidate: AutoEvaluationCandidate): string {
  return [candidate.target, candidate.provider, candidate.model].join("\u0000");
}

export function recordAutoEvaluationCandidate(
  invocationId: string,
  candidate: AutoEvaluationCandidate
): void {
  bestEffortAutoEvaluationWrite(() => {
    const evaluation = traces.get(invocationId)?.autoEvaluation;
    if (!evaluation) return;
    const key = autoCandidateKey(candidate);
    if (evaluation.candidates.some((existing) => autoCandidateKey(existing) === key)) return;
    evaluation.candidates.push({ ...candidate });
  });
}

export function recordAutoEvaluationTransition(
  invocationId: string,
  transition: Omit<AutoEvaluationTransition, "ts">
): void {
  bestEffortAutoEvaluationWrite(() => {
    const evaluation = traces.get(invocationId)?.autoEvaluation;
    if (!evaluation) return;
    if (transition.reason !== undefined && !isComboSkipReason(transition.reason)) return;
    if (
      evaluation.transitions.some(
        (existing) =>
          existing.target === transition.target &&
          existing.stage === transition.stage &&
          existing.outcome === transition.outcome
      )
    ) {
      return;
    }
    evaluation.transitions.push({ ...transition, ts: Date.now() });
  });
}

export function startComboTrace(
  invocationId: string,
  meta: { strategy?: string | null; comboName?: string | null }
): void {
  pruneExpired();
  if (traces.size >= MAX_TRACES) {
    // Prefer evicting a FINALIZED trace so in-flight (unfinalized) invocations
    // survive a burst; fall back to the oldest trace overall.
    let victim: ComboTrace | null = null;
    for (const trace of traces.values()) {
      if (trace.terminal !== null && (!victim || trace.createdAt < victim.createdAt)) {
        victim = trace;
      }
    }
    if (!victim) {
      for (const trace of traces.values()) {
        if (!victim || trace.createdAt < victim.createdAt) victim = trace;
      }
    }
    if (victim) traces.delete(victim.invocationId);
  }
  if (!traces.has(invocationId)) {
    traces.set(invocationId, {
      invocationId,
      createdAt: Date.now(),
      strategy: meta.strategy ?? null,
      comboName: meta.comboName ?? null,
      decisions: [],
      autoEvaluation: null,
      terminal: null,
    });
  }
}

export function recordComboDecision(
  invocationId: string,
  entry: Omit<ComboTraceEntry, "ts"> & { reason?: unknown }
): void {
  const trace = traces.get(invocationId);
  if (!trace) return;
  if (entry.reason !== undefined && !isComboSkipReason(entry.reason)) {
    throw new Error(
      `invalid combo skip reason: ${String(entry.reason)} (allowlist: ${COMBO_SKIP_REASONS.join(", ")})`
    );
  }
  trace.decisions.push({
    step: entry.step,
    target: entry.target,
    decision: entry.decision,
    reason: entry.reason as ComboSkipReason | undefined,
    ts: Date.now(),
    detail: entry.detail,
  });
}

/** One skip reason's targets, for the ALL_TARGETS_SKIPPED diagnostics body. */
export interface SkippedTargetGroup {
  reason: ComboSkipReason;
  targets: string[];
  detail?: string;
}

/**
 * #12659: group a trace's skipped-before-dispatch decisions by reason so an
 * ALL_TARGETS_SKIPPED 503 body can report WHY every target was skipped
 * instead of an opaque `excluded: []`. Pure — takes a trace, returns groups;
 * does not read or mutate the in-memory store.
 */
export function summarizeSkippedTargets(trace: ComboTrace | null): SkippedTargetGroup[] {
  if (!trace) return [];
  const byReason = new Map<ComboSkipReason, SkippedTargetGroup>();
  for (const entry of trace.decisions) {
    if (entry.decision !== "skipped_before_dispatch" || !entry.reason) continue;
    const group = byReason.get(entry.reason);
    if (group) {
      group.targets.push(entry.target);
      if (!group.detail && entry.detail) group.detail = entry.detail;
    } else {
      byReason.set(entry.reason, {
        reason: entry.reason,
        targets: [entry.target],
        detail: entry.detail,
      });
    }
  }
  return Array.from(byReason.values());
}

export function finishComboTrace(
  invocationId: string,
  terminal: { status: number | null; errorClass?: string | null }
): void {
  const trace = traces.get(invocationId);
  if (!trace) return;
  trace.terminal = { status: terminal.status, errorClass: terminal.errorClass ?? null };
}

/**
 * Mark every target that received no decision as not_reached and return the
 * trace. Safe to call on success and failure paths; idempotent.
 */
export function finalizeComboTrace(
  invocationId: string,
  orderedTargets: Array<{ executionKey: string; modelStr: string }>
): ComboTrace | null {
  const trace = traces.get(invocationId);
  if (!trace) return null;
  const decided = new Set(trace.decisions.map((d) => d.step));
  for (const t of orderedTargets) {
    if (!decided.has(t.executionKey)) {
      trace.decisions.push({
        step: t.executionKey,
        target: t.modelStr,
        decision: "not_reached",
        ts: Date.now(),
      });
    }
  }
  return trace;
}

export function getComboTrace(invocationId: string): ComboTrace | null {
  const trace = traces.get(invocationId);
  if (!trace) return null;
  if (Date.now() - trace.createdAt > TRACE_TTL_MS) {
    traces.delete(invocationId);
    return null;
  }
  return trace;
}

function pruneExpired(): void {
  const now = Date.now();
  for (const [id, trace] of traces) {
    if (now - trace.createdAt > TRACE_TTL_MS) traces.delete(id);
  }
}
