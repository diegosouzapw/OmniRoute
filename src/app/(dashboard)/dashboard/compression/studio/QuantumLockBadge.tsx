"use client";

export interface QuantumLockBadgeProps {
  stats?: { fragments: number; categories: Record<string, number> } | null;
}

/** One-line studio badge. Renders nothing when no fragment was stabilized. */
export function QuantumLockBadge({ stats }: QuantumLockBadgeProps) {
  if (!stats || stats.fragments <= 0) return null;
  const detail = Object.entries(stats.categories)
    .filter(([, n]) => n > 0)
    .map(([cat, n]) => `${cat} ×${n}`)
    .join(", ");
  return (
    <span data-testid="quantum-badge" className="text-xs font-mono text-emerald-600">
      🔒 {stats.fragments} volatile fragment(s) stabilized{detail ? ` (${detail})` : ""}
    </span>
  );
}
