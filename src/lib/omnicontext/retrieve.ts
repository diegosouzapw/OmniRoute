import {
  getStablePrefix,
  searchArtifacts,
  type ArtifactSearchHit,
  type OmniContextArtifact,
} from "@/lib/db/omnicontextArtifacts";
import { listHandoffs, type OmniContextHandoff } from "@/lib/db/omnicontextHandoffs";

export interface RetrieveParams {
  projectId: string;
  query: string;
  limit?: number;
  /** When set, draft artifacts created by this key may be included. */
  viewerApiKeyId?: string | null;
}

export interface RetrieveResult {
  stablePrefix: OmniContextArtifact | null;
  activeHandoff: OmniContextHandoff | null;
  dynamic: ArtifactSearchHit[];
}

/**
 * Keyword-first retrieve for inject / MCP. Does not throw on empty results.
 */
export function retrieveForProject(params: RetrieveParams): RetrieveResult {
  const stable = getStablePrefix(params.projectId);
  const stablePrefix =
    stable && (stable.trustTier === "stable" || stable.trustTier === "lead_approved")
      ? stable
      : stable && stable.trustTier === "member"
        ? stable
        : null;

  const handoffs = listHandoffs({
    projectId: params.projectId,
    status: "active",
    limit: 1,
  });
  const activeHandoff = handoffs[0] ?? null;

  const hits = searchArtifacts({
    projectId: params.projectId,
    query: params.query,
    limit: params.limit ?? 12,
    includeDraft: Boolean(params.viewerApiKeyId),
  });

  const dynamic = hits.filter((hit) => {
    if (hit.artifact.type === "stable_prefix") return false;
    if (hit.artifact.status === "pending" || hit.artifact.trustTier === "draft") {
      return (
        Boolean(params.viewerApiKeyId) && hit.artifact.createdByApiKeyId === params.viewerApiKeyId
      );
    }
    return hit.artifact.status === "active";
  });

  return { stablePrefix, activeHandoff, dynamic };
}
