/**
 * Memory reindex — batch vector generation for memories with needs_reindex=1.
 * Used by POST /api/memory/reindex (F6).
 */

import {
  getMemoryReindexQueue,
  countMemoryReindexPending,
  markMemoryNeedsReindex,
} from "@/lib/db/memoryVec";
import { resolveEmbeddingSource, embed, withMeasuredDimensions } from "./embedding";
import type { EmbeddingResolution } from "./embedding/types";
import { getVectorStore } from "./vectorStore";
import { getMemorySettings } from "./settings";
import { logger } from "../../../open-sse/utils/logger.ts";
import { sanitizeErrorMessage } from "../../../open-sse/utils/error.ts";

const log = logger("MEMORY_REINDEX");

type ReindexItem = { id: string; content: string; key: string };
type MemorySettings = Awaited<ReturnType<typeof getMemorySettings>>;
type VectorStore = NonNullable<ReturnType<typeof getVectorStore>>;

function errMsg(err: unknown): string {
  return sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
}

/**
 * Nothing but a returned embedding can supply the vector width for a source the
 * registry does not describe. Spend one embed to measure it and reuse that
 * vector rather than paying for it twice (#12154).
 */
async function measureUnknownWidth(
  resolution: EmbeddingResolution,
  probeItem: ReindexItem | undefined,
  settings: MemorySettings
): Promise<{ effective: EmbeddingResolution; probed: Map<string, Float32Array> }> {
  const probed = new Map<string, Float32Array>();
  if (!probeItem) {
    return { effective: resolution, probed };
  }
  const probe = await embed(probeItem.content, settings);
  if (!("vector" in probe)) {
    return { effective: resolution, probed };
  }
  probed.set(probeItem.id, probe.vector);
  return {
    effective: withMeasuredDimensions(resolution, probe.vector.length),
    probed,
  };
}

/**
 * ensureReady() returns `{ ready: false }` (without throwing) when dimensions
 * are still unknown — abort so we don't burn embed credits upserting into a
 * missing `vec_memories` table (#8074).
 */
async function ensureReindexStoreReady(
  vec: VectorStore,
  effective: EmbeddingResolution,
  resolution: EmbeddingResolution,
  pending: number
): Promise<boolean> {
  try {
    const ready = await vec.ensureReady(effective);
    if (ready.ready) return true;
    log.warn("memory.reindex.ensure_ready.skipped", {
      reason: ready.reason,
      pending,
      model: resolution.model,
      dimensions: resolution.dimensions,
    });
    return false;
  } catch (err: unknown) {
    log.warn("memory.reindex.ensure_ready.fail", { error: errMsg(err) });
    return false;
  }
}

async function reindexOneItem(
  item: ReindexItem,
  settings: MemorySettings,
  vec: VectorStore,
  probed: Map<string, Float32Array>
): Promise<"processed" | "error"> {
  try {
    const reusable = probed.get(item.id);
    const embeddingResult = reusable ? { vector: reusable } : await embed(item.content, settings);

    if (!("vector" in embeddingResult)) {
      log.warn("memory.reindex.embed.fail", {
        id: item.id,
        reason: embeddingResult.reason,
        message: sanitizeErrorMessage(embeddingResult.message),
      });
      return "error";
    }

    await vec.upsertVector(item.id, embeddingResult.vector);
    markMemoryNeedsReindex(item.id, false);
    return "processed";
  } catch (err: unknown) {
    log.warn("memory.reindex.item.fail", {
      id: item.id,
      error: errMsg(err),
    });
    return "error";
  }
}

/**
 * Process up to `limit` memories that are marked needs_reindex=1.
 * Generates embedding + upserts into sqlite-vec for each.
 * Errors on individual items are caught and counted — they do NOT abort the batch.
 *
 * @returns { processed: number; errors: number }
 */
export async function runReindexBatch(limit = 100): Promise<{ processed: number; errors: number }> {
  const queue = getMemoryReindexQueue(limit);

  if (queue.length === 0) {
    return { processed: 0, errors: 0 };
  }

  const settings = await getMemorySettings();
  const resolution = resolveEmbeddingSource(settings);

  if (!resolution.source) {
    log.warn("memory.reindex.no_embedding_source", {
      reason: resolution.reason,
      pending: queue.length,
    });
    return { processed: 0, errors: 0 };
  }

  const vec = getVectorStore();
  if (!vec) {
    log.warn("memory.reindex.no_vector_store", { pending: queue.length });
    return { processed: 0, errors: 0 };
  }

  const probeItem = resolution.dimensions === null ? queue[0] : undefined;
  const { effective, probed } = await measureUnknownWidth(resolution, probeItem, settings);

  const ready = await ensureReindexStoreReady(vec, effective, resolution, queue.length);
  if (!ready) {
    return { processed: 0, errors: 0 };
  }

  let processed = 0;
  let errors = 0;

  for (const item of queue) {
    const outcome = await reindexOneItem(item, settings, vec, probed);
    if (outcome === "processed") processed++;
    else errors++;
  }

  log.info("memory.reindex.batch.complete", { processed, errors, batchSize: queue.length });

  return { processed, errors };
}

/**
 * Returns the number of memories currently pending reindex.
 */
export function getReindexPending(): number {
  return countMemoryReindexPending();
}
