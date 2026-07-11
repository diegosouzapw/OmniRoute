import { getArtifactById } from "@/lib/db/omnicontextArtifacts";
import {
  cosineSimilarity,
  listProjectEmbeddings,
  upsertArtifactEmbedding,
} from "@/lib/db/omnicontextEmbeddings";
import { localHashEmbed, LOCAL_EMBED_MODEL } from "./localEmbed";
import { searchArtifacts, type ArtifactSearchHit } from "@/lib/db/omnicontextArtifacts";
import { rankArtifacts } from "./rank";
import { retrieveForProject, type RetrieveParams, type RetrieveResult } from "./retrieve";

/** Embed + persist artifact text for hybrid retrieve. */
export function indexArtifactEmbedding(artifactId: string): boolean {
  const art = getArtifactById(artifactId);
  if (!art || art.status === "deleted") return false;
  const vector = localHashEmbed(`${art.title}\n${art.body}`);
  upsertArtifactEmbedding({
    artifactId: art.id,
    projectId: art.projectId,
    model: LOCAL_EMBED_MODEL,
    vector,
  });
  return true;
}

/**
 * Hybrid retrieve: FTS keyword hits merged with embedding cosine scores.
 * Falls back to FTS-only when no embeddings exist.
 */
export function retrieveHybrid(params: RetrieveParams): RetrieveResult {
  const base = retrieveForProject(params);
  const query = (params.query || "").trim();
  if (!query) return base;

  const qVec = localHashEmbed(query);
  const embeddings = listProjectEmbeddings(params.projectId);
  if (embeddings.length === 0) return base;

  const byId = new Map<string, ArtifactSearchHit>();
  for (const hit of base.dynamic) {
    byId.set(hit.artifact.id, hit);
  }

  for (const emb of embeddings) {
    const sim = cosineSimilarity(qVec, emb.vector);
    if (sim < 0.15) continue;
    const existing = byId.get(emb.artifactId);
    if (existing) {
      existing.rank = existing.rank * 0.6 + sim * 0.4;
      continue;
    }
    const art = getArtifactById(emb.artifactId);
    if (!art || art.status !== "active" || art.type === "stable_prefix") continue;
    if (art.trustTier === "draft") {
      if (!params.viewerApiKeyId || art.createdByApiKeyId !== params.viewerApiKeyId) continue;
    }
    byId.set(art.id, { artifact: art, rank: sim });
  }

  // Also boost pure FTS misses that keyword search found
  const fts = searchArtifacts({
    projectId: params.projectId,
    query,
    limit: params.limit ?? 12,
    includeDraft: Boolean(params.viewerApiKeyId),
  });
  for (const hit of fts) {
    if (hit.artifact.type === "stable_prefix") continue;
    const existing = byId.get(hit.artifact.id);
    if (existing) {
      existing.rank = Math.max(existing.rank, hit.rank);
    } else {
      byId.set(hit.artifact.id, hit);
    }
  }

  const dynamic = rankArtifacts([...byId.values()]).slice(0, params.limit ?? 12);
  return { ...base, dynamic };
}
