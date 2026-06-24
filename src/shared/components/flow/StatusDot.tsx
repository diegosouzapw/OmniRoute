import { FLOW_EDGE_COLORS } from "./edgeStyles";

type StatusDotProps = {
  /** Resolved base color (used when `error` is false). */
  color: string;
  /** When true the dot turns red, overriding `color`. */
  error?: boolean;
  /**
   * Tailwind size class for the dot (e.g. `size-1.5`, `size-2`). Defaults to the
   * value used by ProviderTopology so the home pulse is pixel-identical.
   */
  sizeClass?: string;
};

/**
 * The pulsing presence indicator extracted from `ProviderTopology` (U0). Renders
 * an `animate-ping` halo plus a solid dot. Callers decide *whether* to show it
 * (e.g. only when a node is active or errored); this component only draws it.
 */
export function StatusDot({ color, error = false, sizeClass = "size-1.5" }: StatusDotProps) {
  const dotColor = error ? FLOW_EDGE_COLORS.error : color;
  return (
    <span className={`relative flex ${sizeClass} shrink-0`}>
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
        style={{ backgroundColor: dotColor }}
      />
      <span
        className={`relative inline-flex rounded-full ${sizeClass}`}
        style={{ backgroundColor: dotColor }}
      />
    </span>
  );
}
