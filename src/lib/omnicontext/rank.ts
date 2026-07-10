import type { ArtifactSearchHit } from "@/lib/db/omnicontextArtifacts";

const TYPE_WEIGHT: Record<string, number> = {
  handoff: 1.4,
  blocker: 1.3,
  decision: 1.2,
  summary: 1.0,
  snippet: 0.8,
  stable_prefix: 0.5,
};

/**
 * Re-rank FTS hits: type weight × recency × FTS score.
 */
export function rankArtifacts(hits: ArtifactSearchHit[], nowMs = Date.now()): ArtifactSearchHit[] {
  return hits
    .map((hit) => {
      const updated = Date.parse(hit.artifact.updatedAt);
      const ageHours = Number.isFinite(updated)
        ? Math.max(0, (nowMs - updated) / (1000 * 60 * 60))
        : 168;
      const recency = 1 / (1 + ageHours / 24);
      const typeW = TYPE_WEIGHT[hit.artifact.type] ?? 1;
      const trustBoost =
        hit.artifact.trustTier === "stable"
          ? 1.2
          : hit.artifact.trustTier === "lead_approved"
            ? 1.1
            : 1;
      return {
        ...hit,
        rank: hit.rank * typeW * recency * trustBoost,
      };
    })
    .sort((a, b) => b.rank - a.rank);
}
