"use client";

// src/app/(dashboard)/dashboard/playground/components/TokenCostCounter.tsx

interface TokenCostCounterProps {
  tokensIn: number;
  tokensOut: number;
  costUsd: number | null;
}

/**
 * Displays token counts and estimated cost.
 * D13: Cost is labeled "(estimated)" to reflect client-side calculation.
 */
export default function TokenCostCounter({ tokensIn, tokensOut, costUsd }: TokenCostCounterProps) {
  if (tokensIn === 0 && tokensOut === 0 && costUsd === null) {
    return null;
  }

  return (
    <span className="text-xs text-text-muted flex items-center gap-1 font-mono">
      {tokensIn > 0 && <span>{tokensIn}↑</span>}
      {tokensOut > 0 && <span>{tokensOut}↓</span>}
      {costUsd !== null && costUsd > 0 && (
        <span>· ${costUsd.toFixed(4)} (estimated)</span>
      )}
    </span>
  );
}
