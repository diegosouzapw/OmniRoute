"use client";
import type { CompressionHeatmap } from "@omniroute/open-sse/services/compression/diffHelper";

/**
 * Converts a saliency score (0–1) to an RGBA background color.
 * Low score (0) → red tint; high score (1) → green tint.
 * Whitespace tokens (score 0.5 in ultra) get a neutral transparent bg.
 */
function scoreToBackground(score: number, kept: boolean): string {
  if (!kept) {
    // Removed token: red tint proportional to how low the score is
    const intensity = Math.round((1 - score) * 120);
    return `rgba(${intensity + 135}, 40, 40, 0.35)`;
  }
  // Kept token: green tint proportional to score
  const intensity = Math.round(score * 120);
  return `rgba(40, ${intensity + 100}, 40, 0.25)`;
}

interface SaliencyHeatmapProps {
  heatmap: CompressionHeatmap | undefined;
}

export function SaliencyHeatmap({ heatmap }: SaliencyHeatmapProps): React.ReactElement | null {
  if (!heatmap || heatmap.tokens.length === 0) return null;

  return (
    <div
      data-testid="saliency-heatmap"
      className="rounded border p-2 font-mono text-xs leading-relaxed"
      aria-label={`Saliency heatmap — ${heatmap.mode} mode`}
    >
      {heatmap.tokens.map((token, idx) => (
        <span
          key={idx}
          data-score={token.score}
          data-kept={String(token.kept)}
          style={{ backgroundColor: scoreToBackground(token.score, token.kept) }}
        >
          {token.text}
        </span>
      ))}
    </div>
  );
}
