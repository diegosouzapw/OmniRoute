import type { CompressionStats } from "@omniroute/open-sse/services/compression/types";

export interface CompressionAnnotationProps {
  stats: CompressionStats;
}

/**
 * Renders a token-savings badge (`847→312`) plus per-rule count pills when
 * rulesApplied is non-empty. Returns null when there are no rules to display.
 */
export function CompressionAnnotation({ stats }: CompressionAnnotationProps) {
  const rules = stats.rulesApplied;
  if (!rules || rules.length === 0) return null;

  const counts = new Map<string, number>();
  for (const rule of rules) {
    counts.set(rule, (counts.get(rule) ?? 0) + 1);
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  return (
    <div className="flex items-center gap-2 flex-wrap" data-testid="compression-annotation">
      <span className="text-xs font-mono text-muted">
        {stats.originalTokens}→{stats.compressedTokens}
      </span>
      {sorted.map(([name, n]) => (
        <span
          key={name}
          className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20"
        >
          {name}×{n}
        </span>
      ))}
    </div>
  );
}
