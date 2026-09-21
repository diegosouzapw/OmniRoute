/**
 * Shared ReactFlow edge palette + styling, extracted verbatim from
 * `ProviderTopology.tsx` (U0). Reused by the Combo/Routing Studio (Tela B) and
 * the Compression Studio (Tela A) so all three flow graphs speak the same
 * color language: green = active, red = error, amber = last-used, muted = idle.
 */
/**
 * Theme-aware CSS custom properties (light values in `:root`, dark values in `.dark`
 * of `src/app/globals.css`) — the dark values are exactly the old `STATUS_HEX` hexes,
 * so dark mode is byte-identical while light mode finally gets legible contrast.
 * `idle` was already a var, which is the precedent that proves a `var()` resolves in
 * an SVG `stroke` (ReactFlow renders edge `style` onto a real `<path>`).
 *
 * `STATUS_HEX` stays exported for the callers that genuinely need a resolved hex
 * (canvas 2D, string math); it is no longer used here.
 */
export const FLOW_EDGE_COLORS = {
  active: "var(--orch-status-success)",
  error: "var(--orch-status-error)",
  last: "var(--orch-status-warning)",
  idle: "var(--color-text-muted)",
} as const;

/**
 * Translucent variant of a flow color. The palette values are `var()` now, so the old
 * `${hex}30` suffix trick no longer resolves; `color-mix` is the theme-aware equivalent
 * (same precedent as `orchStateBadgeBg` in the orchestration model). Percentages mirror
 * the previous 8-bit alpha suffixes: `20` -> 13%, `30` -> 19%, `40` -> 25%.
 */
export function flowColorAlpha(color: string, percent: number): string {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
}

export interface FlowEdgeStyle {
  stroke: string;
  strokeWidth: number;
  opacity: number;
}

/**
 * Resolve the stroke style for an edge given its state. Precedence is
 * error > active > last-used > healthy > idle — the first three are identical to the
 * original ProviderTopology implementation (do not reorder without updating the home
 * regression). `healthy` is the connection-health base state (a configured provider with
 * a live/healthy connection but no in-flight traffic): a static, dimmer green that makes
 * the map meaningful at rest, distinct from the animated `active` pulse. It is an optional
 * trailing param so existing callers (Combo/Compression studios) stay unaffected.
 */
export function edgeStyle(
  active: boolean,
  last: boolean,
  error: boolean,
  healthy = false
): FlowEdgeStyle {
  if (error) return { stroke: FLOW_EDGE_COLORS.error, strokeWidth: 2, opacity: 0.85 };
  if (active) return { stroke: FLOW_EDGE_COLORS.active, strokeWidth: 2.5, opacity: 1 };
  if (last) return { stroke: FLOW_EDGE_COLORS.last, strokeWidth: 1.5, opacity: 0.6 };
  if (healthy) return { stroke: FLOW_EDGE_COLORS.active, strokeWidth: 1.5, opacity: 0.4 };
  return { stroke: FLOW_EDGE_COLORS.idle, strokeWidth: 1, opacity: 0.3 };
}
