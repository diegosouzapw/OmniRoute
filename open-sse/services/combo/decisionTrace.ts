/**
 * #10681: opaque per-invocation combo decision trace.
 *
 * Priority combos can be impossible to audit after a mixed fallback: dispatched
 * attempts are persisted in call_logs, but candidates excluded before dispatch
 * (circuit open, provider cooldown, model lockout, quota cutoff, availability,
 * credential gate, concurrency cap, admission lane, predictive TTFT) leave no
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
  "credential_gate",
  "concurrency_cap",
  "admission_lane",
  "predictive_ttft",
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

export interface ComboTrace {
  invocationId: string;
  createdAt: number;
  strategy: string | null;
  comboName: string | null;
  decisions: ComboTraceEntry[];
  terminal: { status: number | null; errorClass: string | null } | null;
}

const TRACE_TTL_MS = 30 * 60 * 1000;
const MAX_TRACES = 2000;
const traces = new Map<string, ComboTrace>();

export function createInvocationId(): string {
  return `combo-${randomUUID()}`;
}

function isComboSkipReason(value: unknown): value is ComboSkipReason {
  return typeof value === "string" && (COMBO_SKIP_REASONS as readonly string[]).includes(value);
}

/** Test hook: clear the in-memory store. */
export function resetComboTraceStore(): void {
  traces.clear();
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
    detail: entry.detail,
    ts: Date.now(),
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

/**
 * #12294: structured per-target view for the ALL_TARGETS_SKIPPED terminal state.
 * Aggregates every pre-dispatch skip decision into a redacted summary the 503
 * response can carry, plus the earliest future cooldown reset (parsed from
 * persisted-cooldown detail lines) so clients learn when to retry instead of
 * hammering a fully-quota-walled combo.
 * Pure function over the trace — no DB, no clock dependency beyond Date parsing.
 */
/**
 * Parses a `persisted_cooldown` detail line's `until <ISO timestamp>` marker
 * and returns its epoch ms, but only when it is a valid, still-future
 * timestamp (an expired or unparseable reset never becomes `nextRetryAt`).
 * Extracted from summarizeSkippedTargetsWithRetry to keep its cognitive
 * complexity low (sonarjs/cognitive-complexity ratchet).
 */
function parseFuturePersistedCooldownResetMs(detail: string | undefined): number | null {
  if (!detail) return null;
  const match = detail.match(/until (\d{4}-\d{2}-\d{2}T[\d:.]+Z)/);
  if (!match) return null;
  const ms = new Date(match[1]).getTime();
  return Number.isFinite(ms) && ms > Date.now() ? ms : null;
}

export function summarizeSkippedTargetsWithRetry(trace: ComboTrace | null): {
  skippedTargets: Array<{ target: string; reason: ComboSkipReason; detail?: string }>;
  nextRetryAt: string | null;
} {
  if (!trace) return { skippedTargets: [], nextRetryAt: null };
  const skippedTargets: Array<{ target: string; reason: ComboSkipReason; detail?: string }> = [];
  let earliestMs = Number.POSITIVE_INFINITY;
  for (const entry of trace.decisions) {
    if (entry.decision !== "skipped_before_dispatch" || !entry.reason) continue;
    const item: { target: string; reason: ComboSkipReason; detail?: string } = {
      target: entry.target,
      reason: entry.reason,
    };
    if (entry.detail) item.detail = entry.detail;
    skippedTargets.push(item);
    if (entry.reason !== "persisted_cooldown") continue;
    const resetMs = parseFuturePersistedCooldownResetMs(entry.detail);
    if (resetMs !== null && resetMs < earliestMs) earliestMs = resetMs;
  }
  return {
    skippedTargets,
    nextRetryAt: Number.isFinite(earliestMs) ? new Date(earliestMs).toISOString() : null,
  };
}
