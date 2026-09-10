/**
 * Pure domain vocabulary for the Orchestration Canvas — no React, no side effects.
 * Spec: _tasks/superpowers/specs/2026-08-30-orchestration-canvas-design.md
 */

export type OrchState =
  "queued" | "running" | "waiting_approval" | "succeeded" | "failed" | "cancelled";
export type OrchSource = "cloud-agent" | "a2a" | "conductor" | "routing";
export type OrchNodeKind = "orchestrator" | "source" | "work" | "activity" | "overflow";
// SourceNode only: why a source placeholder was materialized — replaces the
// magic-string comparison against `sublabel` ("error"/"offline") with a typed union.
export type SourceIssue = "error" | "offline";

export interface OrchNode {
  id: string; // `${source}:${sourceId}` for work nodes
  kind: OrchNodeKind;
  source?: OrchSource;
  state?: OrchState;
  label: string;
  sublabel?: string;
  startedAt?: string;
  updatedAt?: string;
  endedAt?: string;
  cost?: number;
  counts?: Partial<Record<OrchState, number>>;
  // Overflow nodes only: per-state counts of the work nodes folded into this
  // overflow node when the MAX_WORK_NODES cap engages. overviewProjection folds
  // this into its `counts` totals (never into `columns`) so operators still see
  // TRUE totals even when the canvas caps the rendered node count.
  droppedByState?: Partial<Record<OrchState, number>>;
  mirrorOf?: string;
  raw?: unknown;
  // SourceNode only: set to `true` by orchestrationToFlow's `opts.collapsed` when this
  // source is currently collapsed by the operator. Never set on any other node kind.
  collapsed?: boolean;
  // SourceNode only: set by mergeSnapshot's buildRootAndSourceEdges placeholder for a
  // failed/offline source. `sublabel` still carries the same value for display compat.
  sourceIssue?: SourceIssue;
  // SourceNode only: ISO timestamp mirrored from the originating SourceStatus.staleSince
  // (set only for `sourceIssue === "error"` placeholders — buildSourceStatuses never sets
  // it for the `offline` case). Feeds SourceNode's `sourceStale` ICU message.
  staleSince?: string;
}

export interface OrchEdge {
  id: string;
  from: string;
  to: string;
  kind: "owns" | "mirror";
  active: boolean; // true while the target work is `running`
}

export interface SourceStatus {
  source: OrchSource;
  ok: boolean;
  offline?: boolean;
  error?: string;
  staleSince?: string;
}

export interface OrchSnapshot {
  nodes: OrchNode[];
  edges: OrchEdge[];
  sources: SourceStatus[];
  generatedAt: string;
}

export const ORCH_STATES = [
  "queued",
  "running",
  "waiting_approval",
  "succeeded",
  "failed",
  "cancelled",
] as const satisfies readonly OrchState[];

// Theme-aware CSS custom properties (light values in `:root`, dark values in `.dark`
// of src/app/globals.css) — replaces the previous fixed STATUS_HEX lookup so the
// canvas status colors adapt to the active theme instead of always rendering dark-mode hex.
const STATE_VAR: Record<OrchState, string> = {
  queued: "var(--orch-status-muted)",
  running: "var(--orch-status-warning)",
  waiting_approval: "var(--orch-status-approval)",
  succeeded: "var(--orch-status-success)",
  failed: "var(--orch-status-error)",
  cancelled: "var(--orch-status-muted)",
};

export function orchStateColor(state: OrchState): string {
  return STATE_VAR[state];
}

/** Fundo de badge com alpha — hex+"20" não funciona com var(); color-mix sim. */
export function orchStateBadgeBg(state: OrchState): string {
  return `color-mix(in srgb, ${STATE_VAR[state]} 13%, transparent)`;
}

export const STALE_COMPLETED_MS = 600_000; // completed >10 min ago drop out of the live view
export const MAX_WORK_NODES = 40; // beyond this, per-source overflow nodes take over
