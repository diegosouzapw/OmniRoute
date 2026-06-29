import React from "react";
import type { RiskGateStats } from "./compressionFlowModel.ts";

export function RiskGateBadge({ stats }: { stats: RiskGateStats | null | undefined }): React.ReactElement | null {
  if (!stats || stats.spansProtected <= 0) return null;
  const cats = Object.entries(stats.categories)
    .filter(([, n]) => (n ?? 0) > 0)
    .map(([k, n]) => `${k} ×${n}`)
    .join(", ");
  return (
    <div data-testid="risk-gate-badge" className="text-sm text-amber-700">
      🛡️ {stats.spansProtected} risky span(s) protected{cats ? ` (${cats})` : ""}
    </div>
  );
}
