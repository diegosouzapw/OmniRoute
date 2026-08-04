"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { StatusDot } from "@/shared/components/flow/StatusDot";
import { FLOW_EDGE_COLORS } from "@/shared/components/flow/edgeStyles";
import type { TargetState, FailKind, CbState } from "../comboFlowModel";

// ── State → visual mapping ────────────────────────────────────────────────

function getStateBorderColor(state: TargetState): string {
  switch (state) {
    case "attempting":
      return FLOW_EDGE_COLORS.last; // amber
    case "failed":
      return FLOW_EDGE_COLORS.error; // red
    case "succeeded":
      return FLOW_EDGE_COLORS.active; // green
    case "idle":
    case "skipped":
    default:
      return "var(--color-border)";
  }
}

function getStateGlow(state: TargetState): string {
  switch (state) {
    case "attempting":
      return `0 0 12px ${FLOW_EDGE_COLORS.last}40`;
    case "failed":
      return `0 0 12px ${FLOW_EDGE_COLORS.error}40`;
    case "succeeded":
      return `0 0 12px ${FLOW_EDGE_COLORS.active}40`;
    default:
      return "none";
  }
}

const FAIL_KIND_LABELS: Record<FailKind, string> = {
  "rate-limit": "rate-limit",
  "circuit-open": "circuit-open",
  cooldown: "cooldown",
  other: "error",
};

// Non-healthy circuit-breaker states → badge colour (U1b). OPEN is the hard
// stop (red); HALF_OPEN/DEGRADED are recovering/partial (amber).
const CB_BADGE_COLORS: Partial<Record<CbState, string>> = {
  OPEN: FLOW_EDGE_COLORS.error,
  HALF_OPEN: FLOW_EDGE_COLORS.last,
  DEGRADED: FLOW_EDGE_COLORS.last,
};

/** Connection-cooldown badge colour (U1b Slice 2) — amber: a partial/recovering state. */
const COOLDOWN_BADGE_COLOR = FLOW_EDGE_COLORS.last;

/** Format a relative duration as "28s" or "1m05s"; "" when unknown/elapsed. */
function formatRetryHint(retryAfterMs?: number): string {
  if (typeof retryAfterMs !== "number" || !Number.isFinite(retryAfterMs) || retryAfterMs <= 0) {
    return "";
  }
  const seconds = Math.round(retryAfterMs / 1000);
  return seconds >= 60 ? `${Math.floor(seconds / 60)}m${seconds % 60}s` : `${seconds}s`;
}

/** "CB: OPEN · 41s" — the retry hint is omitted when unknown/elapsed. */
function formatCbBadge(cbState: CbState, retryAfterMs?: number): string {
  const hint = formatRetryHint(retryAfterMs);
  return hint ? `CB: ${cbState} · ${hint}` : `CB: ${cbState}`;
}

/** "cooldown 2/3 · 28s" — N of M connections cooling down; retry hint omitted when unknown. */
function formatCooldownBadge(count: number, total?: number, retryAfterMs?: number): string {
  const ratio = typeof total === "number" && total > 0 ? `${count}/${total}` : `${count}`;
  const hint = formatRetryHint(retryAfterMs);
  return hint ? `cooldown ${ratio} · ${hint}` : `cooldown ${ratio}`;
}

// ── Node data shape ───────────────────────────────────────────────────────

export interface ProviderCascadeNodeData {
  label: string;
  provider: string;
  model: string;
  state: TargetState;
  latencyMs?: number;
  error?: string;
  failKind?: FailKind;
  targetIndex: number;
  /** Real circuit-breaker state for this provider (U1b); only set when non-healthy. */
  cbState?: CbState;
  cbRetryAfterMs?: number;
  /** Connection-cooldown summary for this provider (U1b Slice 2); set when ≥1 cooling. */
  cooldownCount?: number;
  cooldownTotal?: number;
  cooldownRetryAfterMs?: number;
  [key: string]: unknown;
}

// ── Component ─────────────────────────────────────────────────────────────

/**
 * ProviderCascadeNode — one node per combo target in the routing cascade.
 *
 * Coloured by `state`:
 *   idle/skipped  → muted gray border
 *   attempting    → amber border + StatusDot pulse
 *   failed        → red border + failKind badge
 *   succeeded     → green border
 *
 * Has Left (target) and Right (source) Handles for the cascade flow.
 */
export function ProviderCascadeNode({ data }: NodeProps) {
  const {
    provider,
    model,
    state,
    latencyMs,
    failKind,
    targetIndex,
    cbState,
    cbRetryAfterMs,
    cooldownCount,
    cooldownTotal,
    cooldownRetryAfterMs,
  } = data as ProviderCascadeNodeData;

  const borderColor = getStateBorderColor(state as TargetState);
  const glow = getStateGlow(state as TargetState);
  const isAttempting = state === "attempting";
  const isFailed = state === "failed";
  const isSucceeded = state === "succeeded";

  return (
    <div
      className="flex flex-col rounded-lg border-2 bg-bg transition-all duration-300 min-w-[150px] max-w-[190px]"
      style={{ borderColor, boxShadow: glow }}
      data-testid={`provider-cascade-node-${targetIndex}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-transparent !border-0 !w-0 !h-0"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !border-0 !w-0 !h-0"
      />

      {/* Header: provider icon + name */}
      <div
        className="flex items-center gap-1.5 px-2.5 pt-2 pb-1"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <ProviderIcon providerId={provider as string} size={14} />
        <span
          className="text-xs font-semibold truncate flex-1"
          title={provider as string}
          data-testid="provider-name"
        >
          {provider as string}
        </span>
        {isAttempting && <StatusDot color={FLOW_EDGE_COLORS.last} sizeClass="size-1.5" />}
        {isFailed && <StatusDot color={FLOW_EDGE_COLORS.error} error sizeClass="size-1.5" />}
        {isSucceeded && (
          <span className="text-[9px] font-bold" style={{ color: FLOW_EDGE_COLORS.active }}>
            ✓
          </span>
        )}
      </div>

      {/* Body: model + latency */}
      <div className="px-2.5 py-1.5 flex flex-col gap-0.5">
        <span
          className="text-[10px] text-muted font-mono truncate"
          title={model as string}
          data-testid="model-name"
        >
          {model as string}
        </span>
        {latencyMs != null && (
          <span className="text-[10px] text-muted">{(latencyMs as number).toFixed(0)}ms</span>
        )}
      </div>

      {/* Footer: failKind badge when failed */}
      {isFailed && failKind && (
        <div className="px-2.5 pb-2">
          <span
            className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: `${FLOW_EDGE_COLORS.error}20`,
              color: FLOW_EDGE_COLORS.error,
            }}
            data-testid="fail-kind-badge"
          >
            {FAIL_KIND_LABELS[failKind as FailKind]}
          </span>
        </div>
      )}

      {/* Footer: real circuit-breaker state (U1b) — independent of target state,
          since a provider's breaker can be OPEN while this target is skipped. */}
      {cbState && CB_BADGE_COLORS[cbState] && (
        <div className="px-2.5 pb-2">
          <span
            className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: `${CB_BADGE_COLORS[cbState]}20`,
              color: CB_BADGE_COLORS[cbState],
            }}
            data-testid="cb-state-badge"
          >
            {formatCbBadge(cbState, cbRetryAfterMs)}
          </span>
        </div>
      )}

      {/* Footer: real connection-cooldown state (U1b Slice 2) — N of M connections
          for this provider are in cooldown. Independent of target state and of the
          provider breaker (a key can be cooling while the provider breaker is closed). */}
      {typeof cooldownCount === "number" && cooldownCount > 0 && (
        <div className="px-2.5 pb-2">
          <span
            className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: `${COOLDOWN_BADGE_COLOR}20`,
              color: COOLDOWN_BADGE_COLOR,
            }}
            data-testid="cooldown-badge"
          >
            {formatCooldownBadge(cooldownCount, cooldownTotal, cooldownRetryAfterMs)}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProviderCascadeNode;
