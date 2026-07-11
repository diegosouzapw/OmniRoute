import { getArtifactById } from "@/lib/db/omnicontextArtifacts";
import {
  cosineSimilarity,
  listProjectEmbeddings,
  upsertArtifactEmbedding,
} from "@/lib/db/omnicontextEmbeddings";
import { LOCAL_EMBED_MODEL } from "./localEmbed";
import { embedForOmniContext, embedLocalHash } from "./embed";
import { searchArtifacts, type ArtifactSearchHit } from "@/lib/db/omnicontextArtifacts";
import { rankArtifacts } from "./rank";
import { retrieveForProject, type RetrieveParams, type RetrieveResult } from "./retrieve";

/** Sync index using local hash only (tests / fail-open publish path). */
export function indexArtifactEmbedding(artifactId: string): boolean {
  const art = getArtifactById(artifactId);
  if (!art || art.status === "deleted") return false;
  const embedded = embedLocalHash(`${art.title}\n${art.body}`);
  upsertArtifactEmbedding({
    artifactId: art.id,
    projectId: art.projectId,
    model: embedded.model,
    vector: embedded.vector,
  });
  return true;
}

/**
 * Index with configured embed source (`local` or Memory `embed()` via `memory-auto`).
 * Falls back to local hash when Memory has no source.
 */
export async function indexArtifactEmbeddingAsync(artifactId: string): Promise<boolean> {
  const art = getArtifactById(artifactId);
  if (!art || art.status === "deleted") return false;
  const embedded = await embedForOmniContext(`${art.title}\n${art.body}`);
  upsertArtifactEmbedding({
    artifactId: art.id,
    projectId: art.projectId,
    model: embedded.model,
    vector: embedded.vector,
  });
  return true;
}

function mergeHybridHits(
  params: RetrieveParams,
  base: RetrieveResult,
  qVec: number[],
  qModel: string
): RetrieveResult {
  const query = (params.query || "").trim();
  if (!query) return base;

  const embeddings = listProjectEmbeddings(params.projectId).filter(
    (emb) => emb.model === qModel && emb.vector.length === qVec.length
  );
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

  const fts = searchArtifacts({
    projectId: params.projectId,
    query,
    limit: params.limit ?? 12,
    includeDraft: Boolean(params.viewerApiKeyId),
  });
  for (const hit of fts) {
    if (hit.artifact.type === "stable_prefix") continue;
    if (hit.artifact.status === "pending" || hit.artifact.trustTier === "draft") {
      if (!params.viewerApiKeyId || hit.artifact.createdByApiKeyId !== params.viewerApiKeyId) {
        continue;
      }
    } else if (hit.artifact.status !== "active") {
      continue;
    }
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

/**
 * Hybrid retrieve (sync): FTS + local-hash cosine.
 * Prefer `retrieveHybridAsync` when `embedSource` may be `memory-auto`.
 */
export function retrieveHybrid(params: RetrieveParams): RetrieveResult {
  const base = retrieveForProject(params);
  const query = (params.query || "").trim();
  if (!query) return base;
  const embedded = embedLocalHash(query);
  return mergeHybridHits(params, base, embedded.vector, embedded.model || LOCAL_EMBED_MODEL);
}

/**
 * Hybrid retrieve with configured embed source (Memory stack when `memory-auto`).
 */
export async function retrieveHybridAsync(params: RetrieveParams): Promise<RetrieveResult> {
  const base = retrieveForProject(params);
  const query = (params.query || "").trim();
  if (!query) return base;
  const embedded = await embedForOmniContext(query);
  return mergeHybridHits(params, base, embedded.vector, embedded.model);
}
