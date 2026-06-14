/**
 * Memory reindex — batch vector generation for memories with needs_reindex=1.
 * Used by POST /api/memory/reindex (F6).
 */

import {
  getMemoryReindexQueue,
  countMemoryReindexPending,
  markMemoryNeedsReindex,
} from "@/lib/localDb";
import { resolveEmbeddingSource, embed } from "./embedding";
import { getVectorStore } from "./vectorStore";
import { getMemorySettings } from "./settings";
import { logger } from "../../../open-sse/utils/logger.ts";
import { sanitizeErrorMessage } from "../../../open-sse/utils/error.ts";

const log = logger("MEMORY_REINDEX");

/**
 * Process up to `limit` memories that are marked needs_reindex=1.
 * Generates embedding + upserts into sqlite-vec for each.
 * Errors on individual items are caught and counted — they do NOT abort the batch.
 *
 * @returns { processed: number; errors: number }
 */
export async function runReindexBatch(
  limit = 100
): Promise<{ processed: number; errors: number }> {
  const queue = getMemoryReindexQueue(limit);

  if (queue.length === 0) {
    return { processed: 0, errors: 0 };
  }

  // Resolve embedding source and vector store once for the whole batch
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

  // Ensure the vector table is ready before processing
  try {
    await vec.ensureReady(resolution);
  } catch (err: unknown) {
    log.warn("memory.reindex.ensure_ready.fail", {
      error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
    });
    return { processed: 0, errors: 0 };
  }

  let processed = 0;
  let errors = 0;

  for (const item of queue) {
    try {
      const embeddingResult = await embed(item.content, settings);

      if (!("vector" in embeddingResult)) {
        log.warn("memory.reindex.embed.fail", {
          id: item.id,
          reason: embeddingResult.reason,
          message: sanitizeErrorMessage(embeddingResult.message),
        });
        errors++;
        continue;
      }

      await vec.upsertVector(item.id, embeddingResult.vector);
      markMemoryNeedsReindex(item.id, false);
      processed++;
    } catch (err: unknown) {
      log.warn("memory.reindex.item.fail", {
        id: item.id,
        error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
      });
      errors++;
    }
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
