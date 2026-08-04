/**
 * comboFlowModel — pure reducer and flow builder for Combo/Routing Studio (Tela B).
 *
 * Pure functions: no React, no side effects, no Date.now() calls.
 * Converts a stream of `combo.target.*` WS events into:
 *   1. A `ComboRunModel` (typed, serialisable model for UI).
 *   2. A ReactFlow `{ nodes, edges }` graph (left→right cascade view).
 *
 * Design choices:
 * - `ComboEventInput` is a minimal structural type covering the fields we use
 *   (kind/type, provider, model, targetIndex, strategy, latencyMs, error). It is
 *   intentionally compatible with `LiveComboEvent` from `useLiveDashboard.ts`, but
 *   adds the optional `strategy` field that the actual WS payload (`ComboTargetAttemptPayload`)
 *   carries. This avoids importing a "use client" hook file into a pure module.
 * - `classifyFailKind` checks `/circuit/i` first so a combined message like
 *   "circuit open after 429" maps to `circuit-open`, not `rate-limit`.
 * - Targets are kept sorted by `targetIndex`. A `Map<number, TargetNodeModel>` is
 *   used internally and converted to an array on each return — cheap at this scale.
 * - When an `attempt` event arrives for a `targetIndex` that already exists in the run
 *   (rare but possible), it idempotently sets the state back to `attempting`.
 * - Events whose `comboName` does not match the run's are silently ignored so the
 *   caller can safely fan-in all events to a single reducer without filtering.
 * - `comboRunToFlow` produces N+3 nodes: request → strategy → [target×N] → response.
 *   Edge style is derived via `edgeStyle` from the shared flow palette; the edge
 *   *into* each target node carries the target's state colour.
 */

import type { CSSProperties } from "react";
import type { Node, Edge } from "@xyflow/react";
import { edgeStyle } from "@/shared/components/flow/edgeStyles";

// ── Types ─────────────────────────────────────────────────────────────────

export type TargetState = "idle" | "attempting" | "failed" | "succeeded" | "skipped";

export type FailKind = "rate-limit" | "circuit-open" | "cooldown" | "other";

/** Provider-level circuit-breaker state, as reported by the resilience runtime. */
export type CbState = "OPEN" | "HALF_OPEN" | "DEGRADED" | "CLOSED";

export interface TargetNodeModel {
  targetIndex: number;
  provider: string;
  model: string;
  state: TargetState;
  latencyMs?: number;
  error?: string;
  failKind?: FailKind;
  /** Real circuit-breaker state for this target's provider (U1b enrichment).
   * Only set when the breaker is non-healthy (OPEN/HALF_OPEN/DEGRADED). */
  cbState?: CbState;
  /** Milliseconds until the breaker allows a probe again (when cbState is set). */
  cbRetryAfterMs?: number;
  /** Connections for this provider currently in cooldown (U1b Slice 2).
   * Only set when at least one connection is cooling down. */
  cooldownCount?: number;
  /** Total connections configured for this provider (set with cooldownCount). */
  cooldownTotal?: number;
  /** Milliseconds until the first cooling connection recovers (the soonest). */
  cooldownRetryAfterMs?: number;
}

export interface ComboRunModel {
  comboName: string;
  strategy: string;
  /** Ordered by targetIndex ascending. */
  targets: TargetNodeModel[];
  outcome: "running" | "succeeded" | "exhausted";
  startedAt: number;
  finishedAt?: number;
}

/**
 * Minimal structural type for combo WS events. Compatible with `LiveComboEvent`
 * from `useLiveDashboard.ts` but adds the optional `strategy` field that the
 * `combo.target.attempt` payload carries (not surfaced in LiveComboEvent itself).
 */
export interface ComboEventInput {
  comboName: string;
  targetIndex: number;
  provider: string;
  model: string;
  type: "attempt" | "succeeded" | "failed";
  strategy?: string;
  latencyMs?: number;
  error?: string;
  timestamp: number;
}

// ── classifyFailKind ──────────────────────────────────────────────────────

/**
 * Heuristic classification of the failure reason from an error string.
 *
 * Precedence (first match wins):
 *   /circuit/i   → circuit-open
 *   /429|rate/i  → rate-limit
 *   /cooldown/i  → cooldown
 *   any other    → other
 *   absent/empty → undefined
 */
export function classifyFailKind(error?: string): FailKind | undefined {
  if (!error) return undefined;
  if (/circuit/i.test(error)) return "circuit-open";
  if (/429|rate/i.test(error)) return "rate-limit";
  if (/cooldown/i.test(error)) return "cooldown";
  return "other";
}

// ── reduceComboEvent ──────────────────────────────────────────────────────

/**
 * Pure reducer: apply one `ComboEventInput` to the current `ComboRunModel`.
 *
 * - `attempt` → creates a new run (if null) or adds/updates the target.
 *   Strategy is stored from the first attempt event that carries it.
 * - `failed` → marks that target failed with failKind inferred from error.
 * - `succeeded` → marks that target succeeded, closes the run
 *   (outcome "succeeded", finishedAt set).
 * - Events for a different `comboName` than the existing run are ignored.
 *
 * Targets are always returned sorted by targetIndex.
 */
export function reduceComboEvent(run: ComboRunModel | null, ev: ComboEventInput): ComboRunModel {
  // Ignore mismatched combo events
  if (run !== null && ev.comboName !== run.comboName) {
    return run;
  }

  switch (ev.type) {
    case "attempt": {
      const existingTargets = run
        ? new Map(run.targets.map((t) => [t.targetIndex, t]))
        : new Map<number, TargetNodeModel>();

      const updatedTarget: TargetNodeModel = {
        targetIndex: ev.targetIndex,
        provider: ev.provider,
        model: ev.model,
        state: "attempting",
      };

      existingTargets.set(ev.targetIndex, updatedTarget);

      const sortedTargets = [...existingTargets.values()].sort(
        (a, b) => a.targetIndex - b.targetIndex
      );

      return {
        comboName: ev.comboName,
        strategy: run?.strategy || ev.strategy || "",
        targets: sortedTargets,
        outcome: run?.outcome === "succeeded" ? "succeeded" : "running",
        startedAt: run?.startedAt ?? ev.timestamp,
        finishedAt: run?.finishedAt,
      };
    }

    case "failed": {
      if (!run) {
        // Defensive: failed without a prior run — create a minimal one
        const target: TargetNodeModel = {
          targetIndex: ev.targetIndex,
          provider: ev.provider,
          model: ev.model,
          state: "failed",
          latencyMs: ev.latencyMs,
          error: ev.error,
          failKind: classifyFailKind(ev.error),
        };
        return {
          comboName: ev.comboName,
          strategy: "",
          targets: [target],
          outcome: "running",
          startedAt: ev.timestamp,
        };
      }

      const updatedTargets = run.targets.map((t) =>
        t.targetIndex === ev.targetIndex
          ? {
              ...t,
              state: "failed" as TargetState,
              latencyMs: ev.latencyMs,
              error: ev.error,
              failKind: classifyFailKind(ev.error),
            }
          : t
      );

      return {
        ...run,
        targets: updatedTargets,
      };
    }

    case "succeeded": {
      if (!run) {
        const target: TargetNodeModel = {
          targetIndex: ev.targetIndex,
          provider: ev.provider,
          model: ev.model,
          state: "succeeded",
          latencyMs: ev.latencyMs,
        };
        return {
          comboName: ev.comboName,
          strategy: "",
          targets: [target],
          outcome: "succeeded",
          startedAt: ev.timestamp,
          finishedAt: ev.timestamp,
        };
      }

      const updatedTargets = run.targets.map((t) =>
        t.targetIndex === ev.targetIndex
          ? {
              ...t,
              state: "succeeded" as TargetState,
              latencyMs: ev.latencyMs,
            }
          : t
      );

      return {
        ...run,
        targets: updatedTargets,
        outcome: "succeeded",
        finishedAt: ev.timestamp,
      };
    }
  }
}

// ── comboRunToFlow ────────────────────────────────────────────────────────

/**
 * Build a ReactFlow graph from a `ComboRunModel`.
 *
 * Layout (left→right):
 *   Request → StrategyNode → [ProviderCascadeNode × N] → Response
 *
 * Node count: N + 3 (request + strategy + N targets + response)
 * Edge count: N + 2 (one per consecutive node pair)
 *
 * Edge into each target node is styled by the target's state:
 *   succeeded  → active (green)
 *   failed     → error  (red)
 *   attempting → last   (amber — "in-flight")
 *   idle/skip  → idle   (muted)
 *
 * The edge out of the last target into the Response node mirrors the overall
 * outcome: green if succeeded, muted otherwise.
 */
export function comboRunToFlow(run: ComboRunModel): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const X_STEP = 220;

  // ── Request node ─────────────────────────────────────────────────────────
  const requestId = "request";
  nodes.push({
    id: requestId,
    type: "request",
    position: { x: 0, y: 0 },
    data: {
      label: "Request",
      comboName: run.comboName,
    },
  });

  // ── Strategy node ─────────────────────────────────────────────────────────
  const strategyId = "strategy";
  nodes.push({
    id: strategyId,
    type: "strategy",
    position: { x: X_STEP, y: 0 },
    data: {
      label: run.strategy || "combo",
      strategy: run.strategy,
      targetCount: run.targets.length,
    },
  });

  // Edge: request → strategy (always active/idle depending on run state)
  const runActive = run.outcome === "running";
  const reqStratStyle = edgeStyle(runActive, !runActive, false) as unknown as CSSProperties;
  edges.push({
    id: `e-${requestId}-${strategyId}`,
    source: requestId,
    target: strategyId,
    style: reqStratStyle,
  });

  // ── Target nodes ──────────────────────────────────────────────────────────
  let prevId = strategyId;
  for (let i = 0; i < run.targets.length; i++) {
    const t = run.targets[i];
    const nodeId = `target-${t.targetIndex}`;

    nodes.push({
      id: nodeId,
      type: "target",
      position: { x: (i + 2) * X_STEP, y: 0 },
      data: {
        label: `${t.provider}/${t.model}`,
        provider: t.provider,
        model: t.model,
        state: t.state,
        latencyMs: t.latencyMs,
        error: t.error,
        failKind: t.failKind,
        targetIndex: t.targetIndex,
        cbState: t.cbState,
        cbRetryAfterMs: t.cbRetryAfterMs,
        cooldownCount: t.cooldownCount,
        cooldownTotal: t.cooldownTotal,
        cooldownRetryAfterMs: t.cooldownRetryAfterMs,
      },
    });

    // Edge styled by this target's state
    const isError = t.state === "failed";
    const isActive = t.state === "succeeded";
    const isLast = t.state === "attempting";
    const targetEdgeStyle = edgeStyle(isActive, isLast, isError) as unknown as CSSProperties;

    edges.push({
      id: `e-${prevId}-${nodeId}`,
      source: prevId,
      target: nodeId,
      style: targetEdgeStyle,
    });

    prevId = nodeId;
  }

  // ── Response node ─────────────────────────────────────────────────────────
  const responseId = "response";
  nodes.push({
    id: responseId,
    type: "response",
    position: { x: (run.targets.length + 2) * X_STEP, y: 0 },
    data: {
      label: "Response",
      outcome: run.outcome,
      finishedAt: run.finishedAt,
    },
  });

  // Edge: last target → response — green if succeeded, muted otherwise
  const succeeded = run.outcome === "succeeded";
  const responseEdgeStyle = edgeStyle(succeeded, false, false) as unknown as CSSProperties;
  edges.push({
    id: `e-${prevId}-${responseId}`,
    source: prevId,
    target: responseId,
    style: responseEdgeStyle,
  });

  return { nodes, edges };
}

// ── enrichRunWithBreakers (U1b) ───────────────────────────────────────────

/**
 * Per-provider circuit-breaker snapshot, as exposed by GET /api/monitoring/health
 * (`providerHealth[provider]` / `providerBreakers[]`). Only the fields the cascade
 * badge consumes.
 */
export interface ProviderBreakerSnapshot {
  state?: string;
  retryAfterMs?: number;
}

function normalizeCbState(state: string | undefined): CbState | undefined {
  if (typeof state !== "string") return undefined;
  const up = state.toUpperCase();
  if (up === "OPEN" || up === "HALF_OPEN" || up === "DEGRADED" || up === "CLOSED") {
    return up;
  }
  return undefined;
}

/**
 * Overlay real circuit-breaker state onto a combo run's targets (U1b). Returns a
 * new run (pure) only when something changed; otherwise the same reference.
 *
 * A badge is attached only when the breaker is non-healthy (OPEN/HALF_OPEN/
 * DEGRADED); a CLOSED, unknown, or absent breaker clears any stale `cbState` so
 * the cascade reflects recovery. Provider lookup is by `target.provider`.
 *
 * @param run            current combo run model (or null)
 * @param providerHealth `providerHealth` map from /api/monitoring/health
 */
export function enrichRunWithBreakers(
  run: ComboRunModel | null,
  providerHealth: Record<string, ProviderBreakerSnapshot> | null | undefined
): ComboRunModel | null {
  if (!run) return null;
  if (!providerHealth) return run;

  let changed = false;
  const targets = run.targets.map((target) => {
    const snapshot = providerHealth[target.provider];
    const cbState = normalizeCbState(snapshot?.state);

    if (cbState && cbState !== "CLOSED") {
      if (target.cbState === cbState && target.cbRetryAfterMs === snapshot?.retryAfterMs) {
        return target;
      }
      changed = true;
      return { ...target, cbState, cbRetryAfterMs: snapshot?.retryAfterMs };
    }

    // Healthy / unknown / absent → strip any stale breaker badge.
    if (target.cbState !== undefined || target.cbRetryAfterMs !== undefined) {
      changed = true;
      const { cbState: _cbState, cbRetryAfterMs: _cbRetryAfterMs, ...rest } = target;
      return rest;
    }
    return target;
  });

  return changed ? { ...run, targets } : run;
}

// ── enrichRunWithConnectionCooldown (U1b Slice 2) ─────────────────────────────

/**
 * Per-provider connection-cooldown summary, as exposed by GET /api/monitoring/health
 * (`connectionHealth[provider]`). Only providers with at least one cooling connection
 * appear in the map. Only the fields the cascade badge consumes.
 */
export interface ConnectionCooldownSnapshot {
  coolingDown?: number;
  total?: number;
  soonestRetryAfterMs?: number;
}

/**
 * Overlay real per-provider connection-cooldown state onto a combo run's targets
 * (U1b Slice 2). Returns a new run (pure) only when something changed; otherwise the
 * same reference. Composes with {@link enrichRunWithBreakers} — it only touches the
 * `cooldown*` fields, leaving `cbState`/`cbRetryAfterMs` intact.
 *
 * A badge is attached only when the provider has ≥1 connection cooling down; a zero,
 * unknown, or absent summary clears any stale cooldown fields so the cascade reflects
 * recovery. Provider lookup is by `target.provider`.
 *
 * @param run              current combo run model (or null)
 * @param connectionHealth `connectionHealth` map from /api/monitoring/health
 */
export function enrichRunWithConnectionCooldown(
  run: ComboRunModel | null,
  connectionHealth: Record<string, ConnectionCooldownSnapshot> | null | undefined
): ComboRunModel | null {
  if (!run) return null;
  if (!connectionHealth) return run;

  let changed = false;
  const targets = run.targets.map((target) => {
    const snapshot = connectionHealth[target.provider];
    const coolingDown = typeof snapshot?.coolingDown === "number" ? snapshot.coolingDown : 0;

    if (coolingDown > 0) {
      const total = typeof snapshot?.total === "number" ? snapshot.total : coolingDown;
      const retryAfterMs = snapshot?.soonestRetryAfterMs;
      if (
        target.cooldownCount === coolingDown &&
        target.cooldownTotal === total &&
        target.cooldownRetryAfterMs === retryAfterMs
      ) {
        return target;
      }
      changed = true;
      return {
        ...target,
        cooldownCount: coolingDown,
        cooldownTotal: total,
        cooldownRetryAfterMs: retryAfterMs,
      };
    }

    // No cooldown → strip any stale cooldown badge.
    if (
      target.cooldownCount !== undefined ||
      target.cooldownTotal !== undefined ||
      target.cooldownRetryAfterMs !== undefined
    ) {
      changed = true;
      const { cooldownCount: _c, cooldownTotal: _t, cooldownRetryAfterMs: _r, ...rest } = target;
      return rest;
    }
    return target;
  });

  return changed ? { ...run, targets } : run;
}
